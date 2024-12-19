# syntax=docker/dockerfile:1

ARG NODE_VERSION=23.2.0
ARG PNPM_VERSION=9.14.4

################################################################################
# Use node image for base image for all stages.
FROM node:${NODE_VERSION}-alpine AS base

RUN apk add --no-cache \
    curl \
    jq \
    bash \
    git \
    dcron \
    && mkdir -p /usr/src/app
# Set working directory for all build stages.
WORKDIR /usr/src/app

# Install pnpm.
RUN --mount=type=cache,target=/root/.npm \
    npm install -g pnpm@${PNPM_VERSION}

################################################################################
# Create a stage for installing production dependencies.
FROM base as deps

# Download dependencies as a separate step to take advantage of Docker's caching.
# Leverage a cache mount to /root/.local/share/pnpm/store to speed up subsequent builds.
# Leverage bind mounts to package.json and pnpm-lock.yaml to avoid having to copy them
# into this layer.
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=pnpm-lock.yaml,target=pnpm-lock.yaml \
    --mount=type=cache,target=/root/.local/share/pnpm/store \
    pnpm install --prod --frozen-lockfile

################################################################################
# Create a stage for building the application.
FROM deps as build

# Download additional development dependencies before building, as some projects require
# "devDependencies" to be installed to build. If you don't need this, remove this step.
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=pnpm-lock.yaml,target=pnpm-lock.yaml \
    --mount=type=cache,target=/root/.local/share/pnpm/store \
    pnpm install --frozen-lockfile

# Copy the rest of the source files into the image.
COPY . .
# Run the build script.
RUN pnpm run build

################################################################################
# Create a new stage to run the application with minimal runtime dependencies
# where the necessary files are copied from the build stage.
FROM base AS final

# Set production environment
ENV NODE_ENV=production

# Create non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Copy necessary files
COPY --from=build --chown=appuser:appgroup /usr/src/app/ ./
COPY --chown=appuser:appgroup package.json ./

# Copy the bash script into the container
COPY getMembers.sh /usr/local/bin/getMembers.sh

# Give execution rights on the scripts
RUN chmod +x /usr/local/bin/getMembers.sh && crond
# Create the log file to be able to run tail
RUN touch /var/log/cron.log && \
    chown appuser:appgroup /var/log/cron.log

# Add the cron job (run every 24 hours)
RUN echo "0 0 * * * /usr/src/app/getMembers.sh >> /var/log/cron.log 2>&1" > /etc/cron.d/getMembers && \
    chmod 0644 /etc/cron.d/getMembers

# Apply cron job
RUN crontab /etc/cron.d/getMembers

# Expose the port
EXPOSE 4173

# Set user to non-root
USER appuser

# start the service and the server
CMD ["sh", "-c", "sh getMembers.sh && \
    pnpm run preview --host 0.0.0.0"]
