---
agent: sveltekit-compliance
description: Full repository audit. Runs all compliance agents sequentially across the entire codebase, then validates with lint and type checks. No arguments required.
---

Run a full repository governance audit using all compliance agents in sequence.

---

## Step 1 — SvelteKit Compliance

Use the `sveltekit-compliance` agent.

Scan all files under `src/routes/`, `src/components/`, and `src/lib/`.

Detect and fix:

- Routing violations and manual navigation patterns (`window.location`, `history.pushState`).
- Browser globals used outside safe guards (`browser` from `$app/environment`).
- Data fetching in components that should be in `load` functions.
- Large page files with mixed concerns.

---

## Step 2 — Security Review

Use the `security-review` agent.

Scan all `.svelte` templates, `+page.server.ts`, `+server.ts`, and hook files.

Detect and fix:

- XSS vectors: `{@html}` from untrusted sources, `innerHTML` assignments.
- External links missing `rel="noopener noreferrer"`.
- Secrets or private env vars in client-accessible code.
- Missing server-side validation in form actions and server loads.

Then run:

```
pnpm audit
```

---

## Step 3 — Paraglide i18n

Use the `paraglide-i18n` agent.

Scan all source files and `messages/*.json` catalogs.

Detect and fix:

- Hard-coded UI strings that should use Paraglide message functions.
- Custom locale state management outside the Paraglide runtime.
- Translation keys missing between `en` and `nl` catalogs.
- Manual edits to `src/lib/paraglide/` (auto-generated, must not be edited directly).

---

## Step 4 — Import Hygiene

Use the `import-hygiene` agent.

Scan all source files for:

- Deep relative import chains (`../../../`) where `$lib` aliases are available.
- Circular dependencies between route, component, and service layers.
- Server-only exports accidentally included in client-accessible barrels.
- Unused imports and duplicate specifiers.

---

## Step 5 — Lint Compliance

Use the `lint-compliance` agent.

Scan all `src/**/*.{ts,js,svelte}` files for:

- ESLint and TypeScript violations.
- Blanket `eslint-disable` comments without justification.
- a11y issues in Svelte markup.

Apply auto-fixes:

```
pnpm run lint:fix
```

---

## Final Validation

After all agents complete, run both commands and fix any remaining errors:

```
pnpm run lint
pnpm run check
```

Repeat until both commands exit cleanly.

---

## Final Report

Deliver a consolidated summary with:

- Total issues found per agent (SvelteKit / Security / i18n / Import / Lint).
- Count of auto-fixed vs manually resolved issues.
- Any issues deferred for follow-up with justification.
- Final status of `pnpm run lint` and `pnpm run check`.
