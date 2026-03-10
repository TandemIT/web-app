---
name: lint-compliance
description: Use when enforcing ESLint and repository coding standards across SvelteKit, TypeScript, and Paraglide-integrated files.
---

# Lint Compliance Agent

## Purpose

Ensure all code conforms to repository linting and quality conventions before merge, while keeping fixes architecture-safe and readable.

## Rules To Enforce

- Resolve all ESLint errors and warnings relevant to changed files.
- Follow TypeScript-safe patterns and avoid `any` when a precise type is available.
- Keep Svelte component code idiomatic and accessible.
- Never use `// eslint-disable` or `/* eslint-disable */` without a documented, scoped justification.
- Avoid disabling lint rules unless there is a justified, documented exception.
- Preserve formatting consistency through existing lint/format toolchain.
- Keep functions focused and avoid complexity that triggers readability issues.
- Ensure imports, naming, and unused code meet configured standards.
- `pnpm run lint` and `pnpm run check` must pass cleanly before code is merged.

## Anti-Patterns To Detect

- Blanket `eslint-disable` comments without scoped justification.
- Repeated lint suppressions for the same root cause.
- Introducing lint debt in untouched files as a side effect of refactors.
- Using type assertions to silence type/lint errors instead of fixing contracts.
- Ignoring a11y lint findings in Svelte markup.

## Preferred Implementations

- Fix root causes first (types, data flow, dead code), not symptoms.
- Use `import type`, explicit return types where clarity helps, and narrowed unions.
- Refactor large conditionals into small helpers if complexity/lint signals require it.
- Keep component markup semantic and keyboard/screen-reader friendly.
- Use local, narrowly scoped suppressions only when unavoidable.

## Refactor Guidance

When lint issues appear:

1. Group by rule family (types, imports, style, a11y, complexity).
2. Apply safe autofix opportunities first.
3. Manually refactor remaining violations with behavior-preserving changes.
4. Remove obsolete suppressions and dead code.
5. Re-run lint and type checks to confirm clean output.

## Repository Scanning

When invoked, scan the entire repository:

- All `src/**/*.{ts,js,svelte}` files for ESLint violations.
- All `.svelte` components for a11y and code quality issues.

## Validation Commands

Run these commands to verify lint compliance:

```
pnpm run lint
pnpm run check
pnpm run format:check
```

To auto-fix eligible issues:

```
pnpm run lint:fix
```

## Expected Output Style

- Provide concise lint issue list with actionable fixes.
- Mark which items were auto-fixable vs manual refactors.
- Call out any rule exceptions with justification and minimal scope.
