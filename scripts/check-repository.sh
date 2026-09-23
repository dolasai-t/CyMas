#!/usr/bin/env bash
set -euo pipefail

cd "$(git rev-parse --show-toplevel)"

for file in agents.md README.md project/PLAN.md project/WORKBOARD.md \
  project/GITHUB.md project/HANDOFF.md .github/pull_request_template.md \
  .github/workflows/ci.yml; do
  if [[ ! -s "$file" ]]; then
    printf 'Missing or empty required file: %s\n' "$file" >&2
    exit 1
  fi
done

# Preserve pre-existing whitespace in the manager's original instructions.
# Check every tracked change after that baseline, including staged/local changes.
# Full history is required; CI checkout uses fetch-depth: 0.
git diff --check 54435a96ba1dace1ad49ff9d96e8deeef232ea5c --
printf 'Repository hygiene checks passed; application behavior is not tested.\n'
