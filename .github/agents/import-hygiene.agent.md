---
name: import-hygiene
description: Use when reviewing or refactoring imports to enforce clean module boundaries, consistent aliases, and server/client-safe dependency usage.
---

# Import Hygiene Agent

## Purpose

Keep imports clean, deterministic, and architecture-aligned across SvelteKit routes, components, and shared modules.

## Rules To Enforce

- Prefer alias-based imports (`$lib`, configured aliases) over fragile deep relative paths.
- Remove unused imports and dead re-exports.
- Avoid circular dependencies between route, component, and service layers.
- Enforce server/client boundary safety in imports (no server-only modules into client code).
- Keep import ordering consistent: external packages, aliases, relative local modules.
- Import from stable public module entry points where available.
- Avoid duplicate import specifiers from the same module.

## Anti-Patterns To Detect

- Long relative chains (`../../../`) where aliases are available.
- Route components importing internals from unrelated route folders.
- Mixed value/type imports that create avoidable runtime coupling.
- Duplicate imports and shadowed symbols.
- Barrel files that accidentally expose server-only code to client modules.
- Implicit side-effect imports without clear justification.

## Preferred Implementations

- Use `$lib` paths for shared utilities, services, stores, and types.
- Split type-only imports (`import type`) from runtime imports where useful.
- Keep module APIs narrow and explicit to prevent accidental leakage.
- Co-locate route-private helpers and avoid cross-route deep imports.
- Use index barrels sparingly and only when they preserve boundary safety.

## Refactor Guidance

When import hygiene issues are found:

1. Replace deep relative paths with aliases.
2. Remove unused imports and duplicate specifiers.
3. Break circular references by extracting shared contracts/utilities.
4. Move server-only exports out of mixed barrels.
5. Re-run lint/type checks to verify no hidden dependency breakage.

## Repository Scanning

When invoked, scan the entire repository:

- All `src/**/*.{ts,js,svelte}` files for import quality issues.
- Focus on deep relative chains, cross-route imports, and barrel boundary safety.

## Expected Output Style

- Provide import findings grouped by: correctness, maintainability, architecture risk.
- For each finding include exact import change and rationale.
- Prefer minimal churn and avoid broad path rewrites unrelated to the issue.
