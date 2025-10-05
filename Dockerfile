# syntax=docker/dockerfile:1

ARG NODE_VERSION=24.9.0
ARG PNPM_VERSION=9.14.4

################################################################################
# Base image — lightweight Node.js environment
FROM node:${NODE_VERSION}-alpine AS base

# Install essential packages
RUN apk add --no-cache \
    curl \
    jq \
    bash \
    git \
    dcron

# Set working directory
WORKDIR /usr/src/app

# Install pnpm globally with caching
RUN --mount=type=cache,target=/root/.npm \
    npm install -g pnpm@${PNPM_VERSION}

################################################################################
# Dependencies layer (only installs production dependencies)
FROM base AS deps

# Install production dependencies only
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=pnpm-lock.yaml,target=pnpm-lock.yaml \
    --mount=type=cache,target=/root/.local/share/pnpm/store \
    pnpm install --prod --frozen-lockfile

################################################################################
# Build layer — installs all dependencies and compiles app
FROM base AS build

# Install all dependencies (including devDependencies)
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=pnpm-lock.yaml,target=pnpm-lock.yaml \
    --mount=type=cache,target=/root/.local/share/pnpm/store \
    pnpm install --frozen-lockfile

# Copy project files and build
COPY . .
RUN pnpm run build

################################################################################
# Final runtime layer — minimal and secure
FROM node:${NODE_VERSION}-alpine AS final

# Set environment
ENV NODE_ENV=production

# Create non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Set working directory
WORKDIR /usr/src/app

# Copy only necessary build output + production dependencies
COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/dist ./dist
COPY package.json ./

# Copy scripts and cron configuration
COPY getMembers.sh ./getMembers.sh
COPY cronjobs ./cronjobs

# Create log file for cron
RUN touch /var/log/cron.log && chown appuser:appgroup /var/log/cron.log

# Apply cron job
RUN crontab ./cronjobs

# Switch to non-root user
USER appuser

# Expose application port
EXPOSE 3000

# Start cron in background and run the app
CMD ["sh", "-c", "crond && node dist/index.js"]
