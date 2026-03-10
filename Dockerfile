# syntax=docker/dockerfile:1

ARG NODE_VERSION=24.9.0
ARG PNPM_VERSION=10.32.0
ARG ALPINE_VERSION=3.22

################################################################################
# Base image — pinned Node.js + Alpine for deterministic builds
FROM node:${NODE_VERSION}-alpine${ALPINE_VERSION} AS base

# Use corepack to activate a pinned pnpm version instead of global npm install
ENV PNPM_HOME=/pnpm
ENV PNPM_STORE_DIR=/pnpm/store
ENV PATH=${PNPM_HOME}:${PATH}

# Set working directory
WORKDIR /usr/src/app

# Cache corepack artifacts and keep pnpm version deterministic
RUN --mount=type=cache,target=/root/.cache/node/corepack \
    corepack enable && corepack prepare pnpm@${PNPM_VERSION} --activate

################################################################################
# Build layer — installs all dependencies and compiles app
FROM base AS build

# Install all dependencies (including devDependencies)
RUN --mount=type=bind,source=package.json,target=package.json,readonly \
    --mount=type=bind,source=pnpm-lock.yaml,target=pnpm-lock.yaml,readonly \
    --mount=type=cache,target=/pnpm/store \
    pnpm install --frozen-lockfile --store-dir ${PNPM_STORE_DIR}

# Copy project files and build
COPY . .
RUN pnpm run build

################################################################################
# Runtime layer — pinned, minimal, and non-root
FROM node:${NODE_VERSION}-alpine${ALPINE_VERSION} AS runtime

# Set environment
ENV NODE_ENV=production

# Install only runtime packages required by cron + getMembers.sh, then create
# a deterministic non-root user/group for the runtime container.
RUN apk add --no-cache \
    curl \
    jq \
    dcron \
    && addgroup -S -g 10001 appgroup \
    && adduser -S -u 10001 -G appgroup appuser

# Set working directory
WORKDIR /usr/src/app

# Copy only necessary runtime artifacts with correct ownership
COPY --from=build --chown=appuser:appgroup /usr/src/app/build ./build

# Copy scripts and cron configuration
COPY --chown=appuser:appgroup getMembers.sh ./getMembers.sh
COPY --chown=appuser:appgroup cronjobs /etc/crontabs/appuser

# Ensure cron job file, script permissions, and log file are writable for app user
RUN chmod 755 /usr/sbin/crond \
    && chmod 600 /etc/crontabs/appuser \
    && chmod 755 ./getMembers.sh \
    && touch /var/run/crond.pid \
    && touch /var/log/cron.log \
    && chown appuser:appgroup /var/run/crond.pid /var/log/cron.log

# Switch to non-root user
USER appuser

# Expose application port
EXPOSE 3000

# Start cron in background and run the app
CMD ["sh", "-c", "crond && node build/index.js"]
