# CyMas

A calculator learning project managed through requirements, small work items,
tests, pull requests, and Engineering Manager review.

**Status:** the approved integer-addition slice works and is verified locally.
GitHub publication, remote CI, and manager integration review remain pending.

## Start here

- Read [agents.md](agents.md) completely before working.
- Review [the bootstrap proposal](project/PLAN.md) for assessment, requirements,
  architecture options, roadmap, and approval gates.
- Use [the work board](project/WORKBOARD.md) for issue drafts and current status.
- Read [the handoff](project/HANDOFF.md) when resuming work.
- Follow [GitHub setup](project/GITHUB.md) to publish the prepared work.

## Engineering workflow

Issue with acceptance criteria → manager approval where required → focused
`codex/` branch → implementation and tests → self-review → PR and CI → manager
integration approval → merge. Deployment needs separate approval and verification.

GitHub Issues become the canonical work items when published. The local board
records drafts and mirrors status; local identifiers are not GitHub issue numbers.

## Run locally

Use Node.js **24.21.0**, pinned in `.nvmrc`. If you use nvm, run `nvm install`
and `nvm use`. There are no npm dependencies to install.

```sh
npm start
```

Open http://127.0.0.1:4173. Stop with Ctrl+C. If the port is busy, stop your earlier
preview first. The server binds only to loopback and serves an explicit list of
application assets. Use HTTP; opening `index.html` directly is unsuitable for modules.

Enter `2` and `3`, then click Add numbers or press Enter to get `5`. Each operand
must be a whole number between -1,000,000 and 1,000,000. Signs, surrounding
whitespace, and leading zeros are accepted. Invalid entries show field errors.

## Checks and structure

```sh
npm run validate
```

With Node.js, Git, and Bash available, this runs syntax checks, 32 behavioral tests,
and repository hygiene checks. Stage new files before the hygiene check. CI runs
the same checks on PRs and pushes to `main` and `codex/**`, including PRs targeting
the bootstrap branch while the feature is stacked on it.

- `src/calculator.js`: pure validation and exact bounded-integer addition.
- `src/app.js`: DOM events, errors, and result rendering through text.
- `src/styles.css` and `index.html`: responsive semantic UI.
- `test/calculator.test.js`: syntax, ranges, sums, and invalid input coverage.
- `scripts/serve.js`: local preview server, not production infrastructure.

[Slice review and browser evidence](project/CALC-002-PR.md) includes reproducible
demo steps. Browser smoke checks are manual, not CI end-to-end tests. Accessibility
semantics and focus were verified; screen-reader speech has not been tested.

No bundle/build step, runtime dependencies, backend, persistence, or analytics are
needed. Decimals, other operations, and deployment remain outside this slice.
GitHub Pages is a separately approved future work item.
