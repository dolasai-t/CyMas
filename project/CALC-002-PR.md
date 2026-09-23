# CALC-002: Add two signed whole numbers in the browser

Work item: [#2](https://github.com/dolasai-t/CyMas/issues/2).
Draft PR: [#6](https://github.com/dolasai-t/CyMas/pull/6).
Base: `codex/bootstrap-engineering` (bootstrap approval/merge pending).
Head: `codex/calc-002-integer-addition`.

## Problem and resulting behavior

CyMas previously had no working application. A user can now enter two signed
whole numbers and submit with the button or Enter to see their exact sum. Each
operand is limited to -1,000,000 through 1,000,000. Invalid syntax or range produces
field-specific errors, focuses the first invalid field, preserves typed input,
and clears stale results. Editing clears stale feedback; corrected input succeeds.

The Engineering Manager approved the stack and scope with "go ahead" on
2026-09-22 UTC. Integration and production deployment remain unapproved.

## Implementation

- Static HTML/CSS/JavaScript with separate pure logic and DOM adapter.
- Labeled fields, visible keyboard focus, error associations, a persistent alert
  region, and a polite result region; responsive layout down to 320 pixels.
- No runtime dependencies, network API, storage, telemetry, or expression
  evaluation. Local preview uses Node built-ins and an asset allowlist.
- Node 24.21.0 pinned for tooling and CI. Actions gains syntax and behavioral
  checks using the verified pinned `setup-node` v7.0.0 action.
- No decimal input, other operations, keypad, history, or deployment.

## Verification actually performed

- Node v24.21.0: `npm run check` passed; `npm test` passed all 32 tests.
- Combined `npm run validate`, workflow YAML parsing, local documentation links,
  issue-draft generation, and staged whitespace checks passed.
- Tests cover approved examples, both bounds, negative zero, whitespace, optional
  plus, leading zeros, invalid syntax/ranges in either field, both invalid fields,
  and a corrected calculation after failure.
- Browser: `2 + 3 = 5`, `-7 + 2 = -5`, zero, positive/negative boundary sums,
  negative zero, and whitespace/leading-zero input displayed correctly.
- Browser: decimal rejection, blank and out-of-range errors together, first-error
  focus, retained input, stale-result/error clearing, and successful retry verified.
- Keyboard: Tab moved from first to second with visible focus; Enter submitted.
- Mobile: at 320 CSS pixels, document width remained 320 with both errors visible;
  correction to `-1000000 + -1000000` displayed `-2000000` without horizontal overflow.
- Desktop and narrow layouts visually inspected. Browser error/warning logs empty.
- Accessibility verification covers DOM semantics/focus, not screen-reader speech.
- Build: not applicable to directly served static assets.
- Remote CI: repository and application checks passed at `f52ecf8` in
  [run 35931547776](https://github.com/dolasai-t/CyMas/actions/runs/35931547776).
  Consult PR checks for revisions after this documentation synchronization.

## Self-review and limitations

Reviewed validation, zero normalization, exactness, safe text rendering, module
separation, keyboard behavior, static-server exposure, CI permissions, docs, and
scope. Fixed the empty alert region being hidden with `display: none`; it now
remains present for live-region announcements. No blocking local findings remain.
CI covers logic; recorded browser checks are manual. No end-to-end dependency was
introduced. Screen-reader speech and cross-browser/device coverage remain limited.

## Manager review

Run `npm start` and inspect the happy path, invalid input, correction, and narrow
layout. Compare behavior with PLAN.md's seven approved acceptance criteria.
Review the diff against the bootstrap branch and the test cases. Inspect actual CI on both PRs before approving integration.
This input → logic → feedback slice demonstrates how testable logic can preserve
arithmetic behavior while the UI evolves.

Work board and handoff updated. Integration approval: pending.
Production deployment approval: pending; no deployment changes included.
