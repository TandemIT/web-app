---
name: security-review
description: Use when reviewing SvelteKit code for security issues, especially SSR boundaries, secrets handling, form/input safety, and safe server/client separation.
---

# Security Review Agent

## Purpose

Identify and remediate security risks in SvelteKit and Paraglide-integrated code before merge.

## Rules To Enforce

- Keep secrets and private environment variables strictly server-side.
- Ensure server-only modules are not imported into client-executed code.
- Validate and sanitize all user input in server handlers and form actions.
- Enforce least-privilege data exposure in `load` return payloads.
- Avoid unsafe HTML rendering and sanitize any required rich content.
- Use framework error/redirect utilities rather than exposing stack traces.
- Review auth/session access in hooks and protected routes for bypass paths.

## Anti-Patterns To Detect

- Using private env vars in `+page.ts` or component code.
- Returning sensitive records/fields directly from `+page.server.ts`.
- Trusting client-side validation without server-side validation.
- Raw `{@html ...}` from untrusted content without sanitization.
- Custom auth checks duplicated inconsistently across routes.
- Logging sensitive values (tokens, cookies, credentials, PII).
- Broad catch blocks that swallow security-relevant failures.
- `innerHTML =` or `insertAdjacentHTML()` with unsanitized content (XSS vector).
- External links using `target="_blank"` without `rel="noopener noreferrer"`.
- `eval()` or `new Function()` called with dynamic string input.
- Server-side `fetch()` using unchecked, user-supplied URLs (SSRF vector).

## Preferred Implementations

- Store and read sensitive config from server-only env access patterns.
- Perform schema validation in form actions and server loads.
- Return minimal DTO-style data to the client.
- Centralize auth/session checks in hooks and reusable server utilities.
- Use explicit allow-lists for redirect targets and external callbacks.
- Keep audit-friendly error handling with safe user-facing messages.
- Sanitize HTML content before any `{@html}` injection or `innerHTML` assignment.
- Apply `rel="noopener noreferrer"` to all anchor elements with `target="_blank"`.
- Run `pnpm audit` to detect vulnerable packages in the dependency tree.

## Refactor Guidance

When risks are found:

1. Classify issue by severity and exploitability.
2. Move sensitive logic/data into server-only modules.
3. Add input validation and output filtering.
4. Replace unsafe patterns (`{@html}`, raw redirects, broad data returns).
5. Add tests for auth boundaries and invalid input paths.
6. Re-run lint/type/security checks before completion.

## Repository Scanning

When invoked, scan the entire repository:

- All `src/**/*.svelte` templates for unsafe HTML injection and link safety.
- All `+page.server.ts` and `+server.ts` files for data exposure and validation gaps.
- All `+page.ts` and client modules for misplaced private environment variable access.

## Validation Commands

```
pnpm audit
pnpm run check
```

## Expected Output Style

- Report findings ordered by severity.
- Include file location, risk statement, exploit scenario, and concrete fix.
- Include follow-up hardening steps if a full fix is not in current scope.
