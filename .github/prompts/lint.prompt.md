---
agent: lint-compliance
description: Run lint compliance agent. Fixes ESLint errors, TypeScript type errors, and formatting issues across the entire repository using pnpm.
---

Use the `lint-compliance` agent.

Scan the entire repository without requiring any arguments:

- All `src/**/*.{ts,js,svelte}` files for ESLint violations.
- All `.svelte` components for a11y and code quality issues.
- Flag any `// eslint-disable` or `/* eslint-disable */` comments that lack documented justification.

Then run the following commands to assess the current state:

```
pnpm run lint
pnpm run check
```

For each error or warning found:

1. Apply auto-fixes where safe:
    ```
    pnpm run lint:fix
    ```
2. Manually resolve remaining violations — never suppress a lint rule to make the error go away.
3. Fix the root cause (type contracts, data flow, dead code) before touching suppress directives.

Re-run both commands after fixes and repeat until they pass cleanly:

```
pnpm run lint
pnpm run check
```

Report a summary of: total issues found, issues auto-fixed, issues requiring manual resolution, and final command status.
