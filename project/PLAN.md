# Bootstrap proposal

Status: Gate A approved by the Engineering Manager on 2026-09-22 UTC with
"go ahead" in response to the explicit stack and integer-slice approval request.

## Repository assessment

Inspected on 2026-09-22 UTC (2026-09-21 in Toronto).

- Remote: https://github.com/dolasai-t/CyMas, public repository.
- Baseline: `54435a96ba1dace1ad49ff9d96e8deeef232ea5c`, `Create agents.md`.
- One branch (`main`), one commit, one file (`agents.md`, 1,028 lines, read fully).
- No README, selected technology, source, package manifest, tests, workflows,
  deployment configuration, or prior handoff existed.
- Public GitHub pages showed zero open/closed issues, no pull requests, zero
  milestones, and the Actions getting-started page.
- Repository settings, branch protection, Actions permissions, and Pages settings
  could not be inspected from the signed-out browser. Do not infer their values.
- This checkout is in `Calculator/CyMas`; the parent `Calculator` is a separate,
  empty Git repository. Run project Git commands inside `CyMas`.
- Some examples in `agents.md` are blank. Its explicit prose remains authoritative;
  this proposal fills practical details without rewriting the manager's rules.

## Product requirement and first slice

Audience: a person who wants a quick arithmetic result in a browser, and an
Engineering Manager learning how a small feature moves from requirement to review.

Recommended first slice: enter two signed whole numbers, submit an Add form,
and see their sum or a clear validation error. This is a complete user workflow
across UI, validation, arithmetic, and result rendering.

Approved acceptance criteria (CALC-002):

1. Two visibly labeled inputs and an Add button work with keyboard and pointer.
   Enter submits the form. A heading identifies the calculator.
2. Accept optional `+` or `-` followed by ASCII digits, after trimming surrounding
   whitespace; leading zeros are allowed. Each operand must be between
   -1,000,000 and 1,000,000 inclusive. This bound keeps this slice's integer
   calculations exact with ordinary JavaScript numbers.
3. `2 + 3` displays `5`; `-7 + 2` displays `-5`; `0 + 0` displays `0`;
   `1000000 + 1000000` displays `2000000`; negative zero displays `0`.
4. Blank input, decimals, exponent notation, separators, letters, Infinity,
   expressions such as `2+3`, and out-of-range values produce an explanatory
   error. Blank input must never silently become zero.
5. Invalid submissions clear any previous result, identify the affected input,
   and retain typed values for correction. Editing an operand clears stale
   result/error feedback; correcting inputs and resubmitting succeeds.
6. Results and errors are announced accessibly; focus is visible. The layout
   remains usable at a 320 CSS-pixel viewport and at desktop width.
7. Calculation happens locally with no account, network API, storage, telemetry,
   or `eval`. Automated logic tests and recorded browser verification cover the
   examples, input boundaries, invalid input, and recovery.

The first slice excludes subtraction, multiplication, division, decimal input,
expression parsing, calculator-style keypad/state, history, memory, themes,
authentication, and deployment. These exclusions are part of the approved first
slice. Decimal representation and rounding require a later
explicit requirement before implementation.

## Technology decision (approved recommendation)

| Option | Benefit | Cost / consequence |
| --- | --- | --- |
| Plain HTML/CSS/JavaScript (recommended) | Direct browser fundamentals; no application packages; static hosting | DOM updates and validation are explicit; introduces a small amount of manual UI wiring |
| React and TypeScript | Component and type-system practice from day one | More dependencies, build configuration, and concepts for a two-input form |
| Python command-line calculator | Smallest non-browser implementation | No browser UI or Pages application; changes the proposed product experience |

Approved architecture: one semantic HTML form, a stylesheet, a pure JavaScript
validation/addition module, and a thin DOM adapter. Input text → validation → sum
→ text output. Render using text content, not HTML interpolation. No backend or
data storage is needed. Use Node.js 24 for development and its built-in test
runner; the browser does not need Node. No bundler is needed. Runtime 24.21.0 was
verified from Node's official distribution, SHA-256 checked locally, and pinned
in `.nvmrc`. No global Node installation was changed.

Application layout: `index.html`, `src/calculator.js`, `src/app.js`,
`src/styles.css`, and `test/calculator.test.js`. Checks: Node syntax
checks, behavioral unit tests, and a documented browser smoke test. A test framework,
formatter, or linter dependency can be evaluated when it solves a concrete need.
The bootstrap CI uses Bash/Git; CALC-002 adds a separate application job for syntax
and behavioral tests. The local Node server uses an asset allowlist and loopback.

## Roadmap

| Milestone | Outcome and learning | Gate |
| --- | --- | --- |
| M0: Engineering foundation | Assessment, requirements, work items, PR template, repository CI; learn ready versus done | Manager decides scope/stack; review bootstrap PR |
| M1: Add two integers | First working vertical slice, validation, tests, browser demonstration; learn tracing criteria to evidence | CALC-002 scope/stack approval, green CI, manager merge approval |
| M2: Basic calculator | Small follow-on slices for decimals and other operations, including divide-by-zero behavior | Refine and approve numeric/error behavior before implementation |
| M3: First hosted release | GitHub Pages workflow, smoke test, release notes, rollback instructions | Explicit production deployment approval |

This is a directional sequence, not a schedule or permission to implement M2/M3.

## Ready, done, and approval gates

Ready means a clear user problem, behavior, acceptance criteria, known
dependencies/risks, and recorded manager decisions for material scope/stack
choices. CALC-002 met this gate after the manager approved the documented scope
and stack; implementation proceeds on `codex/calc-002-integer-addition`.

Done means criteria met, relevant checks and tests passed, demonstrated UI where
applicable, documentation and handoff current, security considered, self-review
completed with no blocking findings, a linked PR, verified CI, and manager approval
before integration. Record the merge before closing the work item. Deployed work
also requires verified deployment. Mark non-applicable checks explicitly.

Gate A (approved): browser delivery, the recommended stack, and the
CALC-002 whole-number addition contract. Alternative: start with decimals or a
keypad, which requires more numeric/state rules and a larger first review.

Gate B: review each PR's criteria, test evidence, remaining risks, and verified CI;
approve integration. A local commit or draft PR is not merge approval.

Gate C: approve GitHub Pages production configuration and publication once the
application is deployable. Do not enable automatic deployment in this bootstrap.

Manager decision record: **Gate A approved, 2026-09-22 UTC**. The manager replied
"go ahead" to the recommendation of plain HTML/CSS/JavaScript, Node's built-in
test runner, and two labeled inputs with an Add button and the bounded signed
integer contract. Gates B (integration) and C (production deployment) remain pending.

## References

- [GitHub Actions workflow syntax](https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax)
- [Official checkout action](https://github.com/actions/checkout): bootstrap pins
  verified tag `v7.0.1` to commit `3d3c42e5aac5ba805825da76410c181273ba90b1`.
- [Node.js release information](https://nodejs.org/en/about/previous-releases)
