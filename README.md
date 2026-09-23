# CyMas

A calculator learning project managed through requirements, small work items,
tests, pull requests, and Engineering Manager review.

**Status:** engineering bootstrap prepared; application scope and stack await
manager approval. There is no runnable calculator yet.

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

## Current checks

Run from the repository root with Git and Bash installed:

```sh
bash scripts/check-repository.sh
```

The initial CI runs this same repository-hygiene check on PRs and pushes to `main`
and `codex/**`. It checks required engineering documents and whitespace in tracked
changes since the initial commit. Stage new files before running locally.
It does not validate calculator behavior. Application tests and development
commands will arrive with the approved first slice.

No application dependencies, build system, backend, persistence, or deployment
are configured. The proposed browser application will remain suitable for a
later GitHub Pages deployment.
