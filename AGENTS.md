# Purpose

This document defines how AI coding agents should operate in this repository.

It supplements the **official Svelte MCP instructions** with repository-specific rules so that automated agents (Copilot, Cursor, Claude Code, etc.) can safely modify the project without breaking framework conventions or deployment infrastructure.

Agents must prioritize:

- minimal changes
- architectural consistency
- adherence to official SvelteKit patterns
- compatibility with the existing runtime environment.

---

# Svelte MCP Integration

This repository uses the **Svelte MCP server** installed via:

```
npx sv add mcp
```

Agents must use the MCP tools whenever working with Svelte or SvelteKit functionality.

The following instructions are provided by the official Svelte tooling and must be followed exactly.

---

## Official MCP Instructions

You are able to use the Svelte MCP server, where you have access to comprehensive Svelte 5 and SvelteKit documentation. Here's how to use the available tools effectively:

### Available MCP Tools:

#### 1. list-sections

Use this FIRST to discover all available documentation sections. Returns a structured list with titles, use_cases, and paths.
When asked about Svelte or SvelteKit topics, ALWAYS use this tool at the start of the chat to find relevant sections.

#### 2. get-documentation

Retrieves full documentation content for specific sections. Accepts single or multiple sections.
After calling the list-sections tool, you MUST analyze the returned documentation sections (especially the use_cases field) and then use the get-documentation tool to fetch ALL documentation sections that are relevant for the user's task.

#### 3. svelte-autofixer

Analyzes Svelte code and returns issues and suggestions.
You MUST use this tool whenever writing Svelte code before sending it to the user. Keep calling it until no issues or suggestions are returned.

#### 4. playground-link

Generates a Svelte Playground link with the provided code.
After completing the code, ask the user if they want a playground link. Only call this tool after user confirmation and NEVER if code was written to files in their project.

---

# Project Overview

This repository is a SvelteKit web application for Tandem IT.

- **Framework**: SvelteKit `^2.53.4` on Svelte `^5.53.8`
- **Build tool**: Vite `^6.4.1`
- **Language**: TypeScript `^5.9.3`
- **Adapter/runtime**: `@sveltejs/adapter-node` (`adapter-node`)
- **Deployment**: Docker images and Compose files (`Dockerfile`, `Dockerfile.dev`, `compose.yml`, `dev.compose.yml`)

Documentation reference:

- [https://svelte.dev/docs/kit](https://svelte.dev/docs/kit)
- [https://svelte.dev/docs/cli/mcp](https://svelte.dev/docs/cli/mcp)

---

# Runtime Environment

## SvelteKit runtime behavior

- Global route setting: `src/routes/+layout.ts` exports `prerender = true`.
- Dynamic exception: `src/routes/contact/+page.server.ts` exports `prerender = false` because it uses form actions.
- Catch-all 404 route: `src/routes/[...catchall]/+page.ts` throws a 404 error.
- Locale middleware is implemented in `src/hooks.server.ts` using Paraglide's `paraglideMiddleware`.
- URL locale rerouting is handled in `src/hooks.ts` via `deLocalizeUrl`.
- Public env vars are consumed in `src/routes/+layout.svelte` using `$env/dynamic/public`.

## Environment usage

- `PUBLIC_SHOW_DEV_BANNER` and `PUBLIC_DEV_BANNER_MESSAGE` control the dev banner UI.
- `GITHUB_TOKEN` is used by `getMembers.sh` and passed in Compose environment entries.

## Container runtime

- `Dockerfile` builds the app and runs `node build/index.js` (with `crond` started in the same container).
- `Dockerfile.dev` runs `pnpm run dev --host 0.0.0.0`.
- Do not change Dockerfiles, compose files, cron configuration, or container entry commands unless explicitly instructed.

SSR and action handling must remain functional after changes.

---

# Tooling

Only include tooling that is present in this repository configuration.

- **Package manager**: `pnpm` (`packageManager` is pinned in `package.json`).
- **Type checking**: `svelte-check` + `svelte-kit sync` via `pnpm run check`.
- **Formatting/lint workflow**: Prettier (`pnpm run format`, `pnpm run lint` where `lint` is Prettier check).
- **E2E tests**: Playwright (`@playwright/test`, `playwright.config.ts`, `pnpm run test:e2e`).
- **Styling**: Tailwind CSS v4 via PostCSS (`@tailwindcss/postcss`, typography/forms/container-queries plugins).
- **Internationalization**: Paraglide JS (`@inlang/paraglide-js`) with generated output in `src/lib/paraglide`.
- **Content tooling**: `mdsvex` is installed and enabled in `svelte.config.js` (`.svx` extension supported).

Notes:

- `eslint.config.js` exists, but repository scripts currently run Prettier for lint checks.

---

# Development Commands

Commands are sourced from `package.json` scripts:

```
pnpm run dev
pnpm run build
pnpm run preview
pnpm run prepare
pnpm run check
pnpm run check:watch
pnpm run format
pnpm run lint
pnpm run test:e2e
pnpm run test
```

Before completing significant changes, verify:

```
pnpm run check
pnpm run lint
```

---

# Repository Architecture

Current structure and conventions:

```
src/
  routes/                # SvelteKit routes and page/server modules
  components/            # Reusable UI and page-specific components
    projects/            # Project showcase components
    ui/                  # Shared UI primitives
  lib/
    api/                 # JSON data files (member snapshots/reports)
    services/            # Domain/service layer (e.g., team service)
    stores/              # Client stores (navigation state)
    types/               # Shared TS interfaces
    paraglide/           # GENERATED i18n runtime/messages (do not hand-edit)
  hooks.server.ts        # Locale middleware
  hooks.ts               # URL reroute behavior for locales
```

## Route patterns

- Page routes are file-based in `src/routes/**/+page.svelte`.
- Server form actions live in `+page.server.ts` (currently contact form only).
- There are currently no `+server.ts` endpoint handlers.

## Component patterns

- Base components are in `src/components`.
- Shared primitives are in `src/components/ui`.
- Route pages compose these components rather than duplicating markup.

## Data and service patterns

- Shared business/data shaping logic belongs in `src/lib/services`.
- `src/lib/services/team.ts` reads raw JSON from `src/lib/api` and normalizes it for UI consumption.
- Prefer reusing service-layer functions from page `load` functions (e.g., `src/routes/about/+page.ts`) instead of duplicating transforms in route components.

## API/data files

- `src/lib/api/listMembers.json` and `src/lib/api/summaryReport.json` are data artifacts.
- `src/lib/api/members/*.json` stores per-member snapshots.
- `getMembers.sh` is the update pipeline for those files and may be run by cron in containerized runtime.

---

# Internationalization

Internationalization uses **Paraglide JS**.

- Source message files: `messages/en.json`, `messages/nl.json`.
- inlang config: `project.inlang/settings.json`.
- Compiled output: `src/lib/paraglide/*` (generated).
- Runtime integration:
  - `src/hooks.server.ts` applies locale middleware and updates `%lang%` / `%dir%` placeholders.
  - `src/hooks.ts` reroutes localized URLs.
  - `src/app.html` uses `%lang%` and `%dir%` placeholders.
- Message usage example:

```
import { hello_user } from '$lib/paraglide/messages'
```

Locale behavior is URL-aware (Paraglide strategy includes `url`, `cookie`, `globalVariable`, `baseLocale`).

Do not manually edit generated Paraglide output unless explicitly requested.

---

# Testing Strategy

End-to-end testing uses **Playwright**.

- Config file: `playwright.config.ts`.
- Test directory: `e2e`.
- Test command: `pnpm run test:e2e`.

Agents must not modify Playwright infrastructure/configuration unless explicitly requested.

---

# Safe Modification Rules

Agents must:

- prefer minimal, targeted changes
- maintain TypeScript and SvelteKit correctness
- preserve prerender/action behavior (`+layout.ts` and `contact/+page.server.ts` constraints)
- preserve Paraglide locale flow in hooks and app template placeholders
- keep route boundaries and file-based routing intact
- use or extend service-layer logic in `src/lib/services` when shaping shared data
- treat `src/lib/paraglide` as generated output unless regeneration is explicitly required
- validate with `pnpm run check` and `pnpm run lint` before finalizing significant changes
- Never use costum shell functions or scripts to change, edit or verify anything in the files.

Major structural changes require explicit justification.

---

# Dangerous Changes

Do not automatically modify the following without explicit user instruction:

- Dockerfiles (`Dockerfile`, `Dockerfile.dev`)
- Compose files (`compose.yml`, `dev.compose.yml`)
- cron and ingestion scripts (`cronjobs`, `getMembers.sh`)
- adapter/runtime wiring in `svelte.config.js`
- generated build output (`build/`)
- generated Paraglide runtime/messages (`src/lib/paraglide/`)
- Playwright configuration/infrastructure

---

# Change Validation

Before finalizing modifications agents must verify:

```
pnpm run check
pnpm run lint
```

Resolve errors before completing work.
