---
agent: security-review
description: Run security review across the entire repository. Detects XSS vectors, unsafe HTML injection, missing rel attributes, secrets exposure, and dependency vulnerabilities.
---

Use the `security-review` agent.

Scan the entire repository without requiring any arguments:

- All `src/**/*.svelte` templates for unsafe HTML injection and external link safety.
- All `+page.server.ts` and `+server.ts` files for data exposure and server-side validation gaps.
- All `+page.ts` and client modules for misplaced private environment variable access.
- All `hooks.server.ts` files for auth/session bypass risks.

For each file found:

1. Detect every anti-pattern listed in the security-review agent definition.
2. Flag `{@html}` usage, `innerHTML` assignments, and `target="_blank"` links missing `rel="noopener noreferrer"`.
3. Report findings with severity (critical / high / medium / low), file path, exploit scenario, and concrete fix.
4. Apply safe fixes where possible.
5. Flag issues requiring manual review clearly.

After scanning all source files, run:

```
pnpm audit
```

Report any vulnerable dependencies found and recommend remediation steps.

Deliver a final report ordered by severity before applying any changes.
