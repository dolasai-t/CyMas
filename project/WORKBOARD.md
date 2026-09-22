# Work board

GitHub Issues will be canonical when published. These are local draft identifiers;
no GitHub issue numbers or PR links have been assigned.

| ID | Work | State | Depends on |
| --- | --- | --- | --- |
| CALC-001 | Bootstrap engineering process and repository CI | Prepared locally; review and publication pending | GitHub write access |
| CALC-002 | Add two signed whole numbers in a browser | Locally verified; publication/remote CI/review pending | CALC-001 foundation (available locally) |
| CALC-003 | Refine remaining basic-calculator requirements | Backlog; not ready | M1 learning and manager priorities |
| CALC-004 | Prepare first GitHub Pages release | Backlog; not approved for deployment | Working application and Gate C |

States: Draft → Awaiting approval → Ready → In progress → In review → Done.
Blocked work retains a reason. Publish using `project/GITHUB.md`, then replace
draft status with actual issue URLs. Keep proposals clearly labeled in GitHub.

## CALC-001 — Bootstrap engineering process and repository CI

Problem: the repository contains only operating instructions; work cannot yet be
reproduced, reviewed, or tracked through a lightweight lifecycle.

Scope: assessment, proposed requirements and design options, roadmap, ready/done
criteria, initial work items, PR template, stack-neutral repository CI, and handoff.
Owner: senior engineer. Manager: dolasai-t. Suggested label: documentation.

Acceptance criteria:
- [ ] Assessment distinguishes inspected state from inaccessible settings.
- [ ] Requirements, roadmap, and approval gates are recorded.
- [ ] Initial issues exist on GitHub and the local board links to them.
- [ ] Repository check passes locally and in GitHub Actions on the bootstrap PR.
- [ ] Self-review and manager review instructions accompany a focused PR.
- [ ] No calculator implementation, main merge, or deployment occurs prematurely.

Verification: inspect documents and PR template, run the repository check, inspect
the actual Actions result. Risks: publication/authentication unavailable; this
check does not establish application correctness. No application build applies.

## CALC-002 — Add two signed whole numbers in a browser

Problem: a user needs to enter two numbers and obtain their sum in one simple
browser interaction. This is the first smallest useful vertical slice.

Status: implemented and locally verified; manager approved scope and technology in Gate A on
2026-09-22 UTC ("go ahead"). Integration and deployment approval remain pending.
Owner: senior engineer. Suggested label: enhancement. Dependency: CALC-001.
Branch: `codex/calc-002-integer-addition`, based on the unmerged bootstrap branch.
Evidence and prepared PR body: `project/CALC-002-PR.md`.

Acceptance criteria: all seven numbered criteria in `project/PLAN.md` under
"Product requirement and first slice". Copy that approved contract into the issue
when publishing so the GitHub work item is self-contained. Include unit tests for
signed/zero/boundary inputs, invalid syntax and range; demonstrate keyboard use,
stale-result clearing, correction/retry, and narrow layout in a browser.

Design: approved plain-browser option uses separate pure logic and DOM wiring.
No runtime dependencies or expression evaluation. Add Node tooling and behavioral
tests to CI in the same slice. No placeholder passing tests before behavior exists.

Done: requirements satisfied, tests and CI verified, demo recorded, README updated,
self-review complete, PR reviewed and integration explicitly approved by manager.
Risks: remote publication pending; numeric expansion needs separate decisions.

## CALC-003 — Refine remaining basic-calculator requirements

Problem: the first slice intentionally cannot handle decimal input or all four
basic operations. Define those behaviors before growing the application.

Owner: senior engineer with Engineering Manager. Suggested label: enhancement.
Dependency: CALC-002. This is a requirements item, not authorization to build a
complete calculator.

Acceptance criteria:
- [ ] Manager prioritizes subtraction, multiplication, division, and decimals.
- [ ] Document precision, rounding, accepted syntax/range, overflow, negative
      zero, divide-by-zero, clear/reset behavior, and keyboard expectations.
- [ ] Decide whether to retain a two-input form or introduce a keypad/state model.
- [ ] Split approved behavior into small issues with examples and test criteria.

Verification: manager reviews examples and confirms decisions. Risks: premature
expression parsing or decimal libraries could expand scope; escalate dependencies.

## CALC-004 — Prepare first GitHub Pages release

Problem: once an approved browser slice works, users need a reproducible hosted
version and the team needs deployment and rollback practice.

Owner: senior engineer. Suggested label: enhancement. Dependency: deployable
application, passing CI, manager deployment approval. Production approval pending.

Acceptance criteria:
- [ ] Record manager approval of Pages configuration and public deployment.
- [ ] Version-control a least-permission deployment workflow and document setup.
- [ ] Run quality checks before publishing; verify assets under the repository
      subpath and verify the addition/error/retry workflow at the actual URL.
- [ ] Document rollback to the previous known-good revision and release evidence.
- [ ] Record real Actions and deployment links; update README and handoff.

Verification: actual deployment and browser smoke test. Risks: repository settings,
Pages availability and permissions remain unverified; do not add external hosting
or incur cost without manager approval.
