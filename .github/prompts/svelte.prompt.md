---
agent: sveltekit-compliance
description: Run SvelteKit compliance scan across the entire repository. Detects routing violations, browser API misuse, SSR anti-patterns, and missing goto() usage.
---

Use the `sveltekit-compliance` agent.

Scan the entire repository without requiring any arguments:

- All route files under `src/routes/**/*.{ts,js,svelte}`
- All components under `src/components/**/*.svelte` and `src/lib/components/**/*.svelte`
- All shared modules under `src/lib/**/*.{ts,js,svelte}`

For each file found:

1. Detect every anti-pattern listed in the sveltekit-compliance agent definition.
2. Flag any use of `window.location`, `history.pushState`, or `document.querySelector` where SvelteKit alternatives exist.
3. Report violations with file path, line context, and the recommended fix.
4. Apply fixes where safe to do so without changing observable behavior.
5. Prioritize SSR safety, idiomatic SvelteKit patterns, and clean data-loading architecture.

Report a summary of all findings grouped by severity before applying any fixes.
