---
name: sveltekit-compliance
description: Use when reviewing, generating, or refactoring SvelteKit code to enforce routing conventions, SSR-safe patterns, and repository architecture.
---

# SvelteKit Compliance Agent

## Purpose

Ensure all route, data-loading, and component changes follow SvelteKit conventions used in this repository, with clear server/client boundaries and maintainable architecture.

## Rules To Enforce

- Keep route concerns in `src/routes` and reusable UI in `src/components` or `src/lib/components`.
- Use `+page.ts` or `+page.server.ts` `load` functions for data loading rather than fetching in component markup.
- Put server-only logic in server files (`+page.server.ts`, hooks server files, or `$lib/server`-style modules).
- Keep page components focused on rendering; extract reusable logic into `src/lib` services/actions/stores.
- Preserve SSR compatibility and avoid browser-only APIs without guards.
- Follow generated route types (`./$types`) for load/action signatures and returned data.
- Keep accessibility intact in route-level UI (semantic HTML, keyboard support, alt/label usage).

## Anti-Patterns To Detect

- Direct database/secrets access from `+page.svelte` or client code.
- Business logic duplicated across multiple route files.
- Route files importing browser globals (`window`, `document`) without client-only guards.
- Data fetching moved into `onMount` when SSR-safe `load` should be used.
- Large page files that combine layout, API orchestration, and rendering in one place.
- Unused or stale route modules that no longer map to active navigation.
- `window.location.href =` or `window.location.replace()` used for navigation instead of `goto()`.
- `history.pushState()` or `history.replaceState()` used for routing outside SvelteKit.
- `document.querySelector()` or `document.getElementById()` when Svelte bindings are available.
- Direct DOM manipulation outside `use:` actions or `$effect` blocks.

## Preferred Implementations

- Use `load` in `+page.ts` for public/read-only data that can run on server and client.
- Use `load` in `+page.server.ts` for private data, secrets, cookies, and server-only dependencies.
- Use route `actions` for form writes instead of ad-hoc POST fetch logic in components.
- Keep shared utilities in `src/lib` and route-specific helpers co-located under route directories.
- Use typed imports from `./$types` for robust refactors and predictable data contracts.
- Keep UI components composable and free of transport/storage concerns.
- Use `goto()` from `$app/navigation` for all programmatic client-side navigation.
- Use `$page` from `$app/state` (or `$app/stores` for legacy code) to access current page state.
- Use Svelte bindings (`bind:value`, `bind:this`) instead of direct DOM queries.
- Guard browser-only code with `import { browser } from '$app/environment'`.

## Refactor Guidance

When code violates architecture:

1. Identify route concern vs reusable concern.
2. Move data access to `load` or server modules.
3. Move repeated logic to `src/lib/services` or `src/lib/actions`.
4. Reduce page component to typed props + rendering.
5. Validate SSR safety (no unguarded browser APIs).
6. Re-check route behavior and accessibility after extraction.

## Repository Scanning

When invoked, scan the entire repository:

- All files under `src/routes/**/*.{ts,js,svelte}`
- All files under `src/components/**/*.svelte`
- All files under `src/lib/**/*.{ts,js,svelte}`

Report every violation found, not just the first occurrence.

## Expected Output Style

- Provide a prioritized list of compliance issues.
- For each issue, include: impact, exact fix, and target file(s).
- Prefer small, reviewable patches that preserve current behavior while improving architecture.
