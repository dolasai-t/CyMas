# GitHub publication and review

Status: issues [#1](https://github.com/dolasai-t/CyMas/issues/1),
[#2](https://github.com/dolasai-t/CyMas/issues/2),
[#3](https://github.com/dolasai-t/CyMas/issues/3), and
[#4](https://github.com/dolasai-t/CyMas/issues/4) are published. Do not run the issue
creation commands again. Branch pushes, PR publication, and remote CI still await
completion of GitHub CLI authentication. Browser sign-in succeeded. CLI OAuth
scopes were explicitly approved; the fresh login awaits GitHub email verification.
The first token exchange failed with a connection reset. No merge, deployment,
branch protection, or Pages setting has been changed.

## Proposed setup

- Use Issues, the existing `documentation`/`enhancement`/`bug` labels where present,
  focused `codex/` branches, and PRs into `main`. Check available labels before use.
- Keep the local board synchronized with issue links and actual lifecycle states.
- A separate GitHub Project is unnecessary for four work items.
- Recommend protecting `main` against direct pushes and requiring the
  `Repository checks` CI job after its first verified run. Add application checks
  with CALC-002. Repository rules have not been configured.
- Require manager integration approval in the work record. If the manager is also
  the PR author, GitHub does not allow self-approval; do not create an impossible
  reviewer requirement. Use recorded manager authorization, or a distinct reviewer
  account when available. Do not bypass existing repository protections.
- GitHub Pages is planned for CALC-004, after deployment approval. No deployment
  workflow is part of this bootstrap.

## Exact publication commands

Prerequisite: install the official [GitHub CLI](https://cli.github.com/), then
authenticate interactively. Do not paste tokens into source or chat.
These commands are prepared instructions, not evidence they have been executed.

```sh
cd /Users/dolasai/Documents/ChatGPT/Calculator/CyMas
gh auth login --hostname github.com --git-protocol https --web
gh auth status
gh repo view dolasai-t/CyMas
gh issue list --repo dolasai-t/CyMas --state all --limit 100
gh pr list --repo dolasai-t/CyMas --state all --limit 100
gh label list --repo dolasai-t/CyMas
```

Inspect these lists before creating work to avoid duplicates. Create missing
labels only if needed; label creation is unnecessary to publish the issues below.

Generate issue bodies from the local board, including the self-contained first
slice contract. This writes temporary draft files only:

```sh
python3 - <<'PY'
from pathlib import Path
import re
import tempfile

board = Path('project/WORKBOARD.md').read_text()
plan = Path('project/PLAN.md').read_text()
draft_dir = Path(tempfile.mkdtemp(prefix='cymas-github-'))
for match in re.finditer(r'^## (CALC-\d+) — ([^\n]+)\n(.*?)(?=^## |\Z)', board, re.M | re.S):
    key, title, body = match.groups()
    if key == 'CALC-002':
        contract = plan.split('## Product requirement and first slice\n', 1)[1]
        contract = contract.split('## Technology decision', 1)[0]
        body += '\n## Approved acceptance contract (Gate A approved)\n' + contract
    (draft_dir / (key + '.md')).write_text(body.strip() + '\n')
print('Draft directory:', draft_dir)
PY
```

Set `draft_dir` to the printed directory. Run each create command once; keep the
returned URLs and record them in WORKBOARD.md and HANDOFF.md. If interrupted,
inspect the issue list before retrying. Initial requirements are explicitly
recorded in PLAN.md; CALC-002 Gate A is approved. Publishing an issue does not
constitute integration or deployment approval.

```sh
read -r draft_dir
gh issue create --repo dolasai-t/CyMas --title 'CALC-001: Bootstrap engineering process and repository CI' --body-file "$draft_dir/CALC-001.md"
gh issue create --repo dolasai-t/CyMas --title 'CALC-002: Add two signed whole numbers in a browser' --body-file "$draft_dir/CALC-002.md"
gh issue create --repo dolasai-t/CyMas --title 'CALC-003: Refine remaining basic-calculator requirements' --body-file "$draft_dir/CALC-003.md"
gh issue create --repo dolasai-t/CyMas --title 'CALC-004: Prepare first GitHub Pages release' --body-file "$draft_dir/CALC-004.md"
gh issue list --repo dolasai-t/CyMas --state all --limit 100
```

The `read` command waits for the printed directory path followed by Enter.
Review and commit any issue-link documentation updates, then publish the branch
and draft bootstrap PR. Use the actual CALC-001 URL in the prompted field:

```sh
git status --short --branch
git diff
git add project/WORKBOARD.md project/HANDOFF.md
git diff --cached --quiet || git commit -m 'docs: link published bootstrap work items'
bash scripts/check-repository.sh
git push -u origin codex/bootstrap-engineering
read -r bootstrap_issue_url
cat > "$draft_dir/bootstrap-pr.md" <<EOF
## Problem and result
The repository had only operating instructions. This bootstrap adds a reviewable
requirements and architecture proposal, four work-item drafts, roadmap, ready/done
criteria, PR template, repository hygiene CI, and a resumable handoff.

Related work: $bootstrap_issue_url

## Scope and verification
This bootstrap branch contains no calculator behavior. The manager has since
approved the stack and CALC-002 scope, implemented on a separate dependent branch.
No merge or deployment is authorized here.

Local verification: run bash scripts/check-repository.sh and inspect the result
before marking this PR ready. Application tests/build: not applicable yet.
Remote CI: pending; inspect the actual Actions run after creation.

## Manager review
Review project/PLAN.md: browser delivery, plain HTML/CSS/JavaScript, and the bounded
integer-addition acceptance contract. Inspect that the workflow has read-only
permissions and no deployment. Confirm the next implementation issue is small
enough to demonstrate and review. Approve scope/stack separately from integration.

## Risks and self-review
The hygiene check does not test application behavior. Numeric behavior beyond
integers and repository protection/Pages settings remain undecided or unverified.
Self-review covered scope boundaries, check behavior, workflow permissions,
documentation links, and truthful work status; no blocking local findings remain.
EOF
gh pr create --repo dolasai-t/CyMas --base main --head codex/bootstrap-engineering --draft --title 'Bootstrap calculator engineering process and repository CI' --body-file "$draft_dir/bootstrap-pr.md"
gh pr view --repo dolasai-t/CyMas codex/bootstrap-engineering --json number,url,state,headRefName
gh pr checks --repo dolasai-t/CyMas codex/bootstrap-engineering
```

Record the actual PR URL and CI evidence in the handoff. Keep the PR in draft until
the review package and checks are ready. Do not merge until manager approval.
If publishing through Codex, attach the created PR to the task as well.

References: [creating issues](https://cli.github.com/manual/gh_issue_create),
[creating PRs](https://cli.github.com/manual/gh_pr_create),
[required reviews](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches).

## Publish the first slice as a dependent PR

The feature branch includes the unmerged bootstrap. Create the bootstrap PR
against `main` and the CALC-002 PR against the bootstrap branch for focused reviews.
The feature workflow checks PRs targeting either branch. After bootstrap approval
and merge, retarget the feature PR to `main`, inspect its diff, and rerun checks.
If the bootstrap is squash-merged, reconcile its ancestry before retargeting so
the feature diff does not repeat bootstrap changes. Do not merge without approval.

From `codex/calc-002-integer-addition`, after issues and the bootstrap PR exist:

```sh
git push -u origin codex/calc-002-integer-addition
gh pr create --repo dolasai-t/CyMas --base codex/bootstrap-engineering --head codex/calc-002-integer-addition --draft --title 'CALC-002: Add two signed whole numbers in the browser' --body-file project/CALC-002-PR.md
gh pr view --repo dolasai-t/CyMas codex/calc-002-integer-addition --json number,url,state,headRefName
gh pr checks --repo dolasai-t/CyMas codex/calc-002-integer-addition
```

Add the actual CALC-002 issue link to the PR and record both PR URLs in the work
board and handoff. The prepared PR body intentionally contains no invented number.
