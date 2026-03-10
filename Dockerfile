# syntax=docker/dockerfile:1

ARG NODE_VERSION=24.9.0
ARG PNPM_VERSION=9.14.4
ARG ALPINE_VERSION=3.22

################################################################################
# Base image — pinned Node.js + Alpine for deterministic builds
FROM node:${NODE_VERSION}-alpine${ALPINE_VERSION} AS base

# Set working directory
WORKDIR /usr/src/app

# Use corepack to activate a pinned pnpm version instead of global npm install
ENV PNPM_HOME=/pnpm
ENV PATH=${PNPM_HOME}:${PATH}

# Cache corepack artifacts and keep pnpm version deterministic
RUN --mount=type=cache,target=/root/.cache/node/corepack \
    corepack enable && corepack prepare pnpm@${PNPM_VERSION} --activate

################################################################################
# Dependencies layer (only installs production dependencies)
FROM base AS deps

# Install production dependencies only
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=pnpm-lock.yaml,target=pnpm-lock.yaml \
    --mount=type=cache,target=/pnpm/store \
    pnpm install --prod --frozen-lockfile --store-dir /pnpm/store

################################################################################
# Build layer — installs all dependencies and compiles app
FROM base AS build

# Install all dependencies (including devDependencies)
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=pnpm-lock.yaml,target=pnpm-lock.yaml \
    --mount=type=cache,target=/pnpm/store \
    pnpm install --frozen-lockfile --store-dir /pnpm/store

# Copy project files and build
COPY . .
RUN pnpm run build

################################################################################
# Final runtime layer — pinned, minimal, and non-root
FROM node:${NODE_VERSION}-alpine${ALPINE_VERSION} AS final

# Set environment
ENV NODE_ENV=production

# Install only runtime packages required by cron + getMembers.sh
RUN apk add --no-cache \
    bash \
    curl \
    jq \
    dcron

# Create non-root user/group explicitly for deterministic UID/GID ownership
RUN addgroup -S -g 10001 appgroup && adduser -S -u 10001 -G appgroup appuser

# Set working directory
WORKDIR /usr/src/app

# Copy only necessary runtime artifacts with correct ownership
COPY --from=deps --chown=appuser:appgroup /usr/src/app/node_modules ./node_modules
COPY --from=build --chown=appuser:appgroup /usr/src/app/build ./build
COPY --chown=appuser:appgroup package.json ./

# Copy scripts and cron configuration
COPY --chown=appuser:appgroup getMembers.sh ./getMembers.sh
COPY cronjobs /etc/crontabs/appuser

# Ensure cron job file, script permissions, and log file are writable for app user
RUN chmod 600 /etc/crontabs/appuser \
    && chmod 755 ./getMembers.sh \
    && touch /var/log/cron.log \
    && chown appuser:appgroup /var/log/cron.log

# Switch to non-root user
USER appuser

# Expose application port
EXPOSE 3000

# Start cron in background and run the app
CMD ["sh", "-c", "crond && node build/index.js"]
