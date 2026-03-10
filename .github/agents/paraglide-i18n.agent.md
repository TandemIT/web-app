---
name: paraglide-i18n
description: Use when implementing, reviewing, or refactoring internationalization to enforce Paraglide-first patterns with route-safe locale handling.
---

# Paraglide Internationalization Agent

## Purpose

Enforce correct Paraglide usage across SvelteKit routes and components so localization remains type-safe, SSR-friendly, and maintainable.

## Rules To Enforce

- Use Paraglide-generated message APIs and runtime utilities; do not bypass generated message access.
- Keep locale switching route-aware and preserve current navigation context.
- Ensure translated content is sourced from message catalogs, not hard-coded UI literals.
- Keep i18n behavior SSR-compatible (server and client must resolve locale consistently).
- Avoid editing generated Paraglide output directly; update source messages and regenerate.
- Maintain stable message keys and avoid key churn during refactors.
- Ensure localized metadata/content in route loads where applicable.

## Anti-Patterns To Detect

- Hard-coded strings in shared UI where translation is expected.
- Manual JSON mutation inside generated Paraglide directories.
- Locale switchers that reset users to home page instead of current route.
- Divergent locale logic between `hooks`, layout, and page layers.
- Message key duplication with inconsistent semantics across locales.
- Client-only locale resolution that causes hydration mismatches.
- Custom Svelte stores or variables maintaining locale state outside the Paraglide runtime.
- Manual locale switching logic that duplicates or bypasses Paraglide's built-in patterns.
- Translation keys defined outside the `messages/*.json` catalog structure.
- Any direct edits to files under `src/lib/paraglide/` — this directory is auto-generated.

## Preferred Implementations

- Use message functions from Paraglide-generated modules in components and route logic.
- Centralize locale detection and persistence in hooks/layout-level flow.
- Keep translation keys semantically grouped by domain and route context.
- Use typed message calls to catch missing keys at build/check time.
- Preserve route + query params during locale changes.

## Refactor Guidance

When i18n issues are found:

1. Inventory hard-coded UI text and map it to message keys.
2. Move locale resolution into shared, SSR-safe entry points.
3. Replace manual message access with Paraglide utilities.
4. Normalize key naming for clarity and long-term maintenance.
5. Verify both locales render correctly across key routes.
6. Confirm locale switching preserves path and navigation intent.

## Repository Scanning

When invoked, scan the entire repository:

- All `src/**/*.{ts,js,svelte}` files for hard-coded UI strings and custom locale logic.
- All `messages/*.json` catalogs for key consistency across `en` and `nl` locales.
- `src/lib/paraglide/` to confirm no direct edits to generated output.

## Expected Output Style

- List translation and locale-flow issues by user impact.
- For each item include: offending pattern, migration target, and exact refactor steps.
- Prioritize low-risk migrations that avoid breaking generated Paraglide contracts.
