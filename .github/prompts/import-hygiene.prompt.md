---
agent: import-hygiene
description: Run import hygiene scan across the entire repository. Detects deep relative imports, circular dependencies, server/client boundary leaks, and duplicate imports.
---

Use the `import-hygiene` agent.

Scan the entire repository without requiring any arguments:

- All `src/**/*.{ts,js,svelte}` files for import quality issues.
- Focus on deep relative chains, cross-route imports, and barrel boundary safety.

For each file found:

1. Detect every anti-pattern listed in the import-hygiene agent definition.
2. Flag deep relative import chains (`../../../`) when `$lib` aliases are available.
3. Detect possible circular dependencies between routes, components, services, and stores.
4. Identify server-only exports imported by client-executed modules.
5. Remove duplicate and unused imports where safe.

For each issue, provide:

- File path and import statement.
- Risk type (correctness, maintainability, architecture boundary).
- Exact replacement import and rationale.

Apply safe, minimal fixes while preserving behavior.

After changes, run:

```
pnpm run lint
pnpm run check
```

Report the final status of both commands.
