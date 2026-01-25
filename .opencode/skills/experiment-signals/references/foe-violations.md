# FOE Violation Markers

This reference details signals that indicate violations of Flow Optimized Engineering principles.

## The Three FOE Principles

1. **Optimize for Understanding** - Team should understand what they're building on
2. **Optimize for Fast Feedback** - Problems should be caught early, not in production
3. **Optimize for Confidence** - Team should be confident in changes they make

## Understanding Violations

### Knowledge Concentration

**Signal:** Only 2-3 people can work on certain areas of the codebase.

**How to detect:**
```bash
# Commits per author per directory
git log --format="%ae" -- src/complex-module/ | sort | uniq -c | sort -rn

# If 80%+ of commits come from 1-2 people, knowledge is concentrated
```

**Issue patterns:**
- "Ask [person] about this"
- "Only [person] knows how this works"
- "Waiting for [person] to review"

**What it suggests:** Knowledge distribution problem. If those people leave or are unavailable, the system becomes unsupportable.

### Protocol/Technology Misunderstanding

**Signal:** Bugs or issues that stem from conceptual misunderstanding, not coding errors.

**Commit patterns:**
- Fixes that address symptoms, not root causes
- Multiple attempts to fix the same area
- Comments indicating confusion: "not sure why this works"

**Issue patterns:**
- Security issues from misunderstood isolation models
- Performance issues from misused APIs
- Integration bugs from protocol assumptions

**Example from Prima:**
```
#156: "Hotfix: Stop token/workspace inheritance in MCP hypervisor to prevent header leakage"
```
This wasn't a coding error - it was a conceptual error about MCP's workspace isolation model.

### Undocumented Complexity

**Signal:** Complex code with no documentation or comments.

**How to detect:**
```bash
# Files with high complexity (many lines, few comments)
find . -name "*.ts" -exec wc -l {} \; | sort -rn | head -20

# Then check comment ratio in those files
```

**What it suggests:** Understanding exists only in the heads of authors. New team members can't onboard effectively.

## Feedback Violations

### No Tests Until Production Issues

**Signal:** Test files created after bugs were found in production.

**How to detect:**
```bash
# Compare test file creation dates to when features shipped
git log --diff-filter=A --name-only -- "**/*.test.*" --format="%ai"

# Look for tests added right after bug fixes
git log --grep="fix" --oneline | head -10
# Then check if tests were added in same or following commits
```

**What it suggests:** Feedback loops weren't established early. Team relied on production for validation.

### Manual Deployment Processes

**Signal:** No CI/CD, or CI/CD added late.

**How to detect:**
```bash
# When was CI config added?
git log --diff-filter=A --name-only -- ".github/workflows/*" --format="%ai"
git log --diff-filter=A --name-only -- ".gitlab-ci.yml" --format="%ai"
git log --diff-filter=A --name-only -- "Jenkinsfile" --format="%ai"
```

**What it suggests:** "Works on my machine" was the standard for too long.

### "Works on My Machine" Pattern

**Signal:** Environment-specific bugs, configuration issues discovered in deployment.

**Commit patterns:**
- "fix: ensure X works in production"
- "config: add missing env var for prod"
- "fix deployment issue"

**Issue patterns:**
- "Works locally but not in staging/prod"
- "Environment variable missing"
- "Configuration mismatch"

### Debugging in Production

**Signal:** Debug code committed, then removed. Or debug logs left in.

**Commit patterns:**
- "prod debugging logs"
- "more debug"
- "remove debug statements"
- "cleanup debug code"

**What it suggests:** Team couldn't reproduce issues locally. No proper debugging environment.

## Confidence Violations

### Frequent Reverts

**Signal:** High ratio of revert commits.

**How to detect:**
```bash
# Count reverts vs total commits
git log --grep="revert" --oneline | wc -l
git log --oneline | wc -l
# If reverts > 5% of commits, something's wrong
```

**What it suggests:** Team isn't confident in changes before merging. Changes are deployed and then undone.

### "Temporarily Disabled" Features

**Signal:** Features turned off rather than fixed.

**Commit patterns:**
- "temporarily disabled X"
- "disable feature flag for Y"
- "comment out Z until we fix it"

**What it suggests:** Team lacks confidence to fix properly under time pressure.

### Stale Feature Flags

**Signal:** Feature flags that were "temporary" but never removed.

**How to detect:**
```bash
# Find feature flag patterns
grep -r "FEATURE_FLAG" --include="*.ts" --include="*.js"
grep -r "isEnabled" --include="*.ts" --include="*.js"

# Check when they were added
git log -p --all -S "FEATURE_FLAG_NAME" -- "*.ts"
```

**What it suggests:** Team doesn't trust the code enough to remove the escape hatch.

### Low PR Review Engagement

**Signal:** PRs merged without meaningful review.

**How to detect (via gh CLI):**
```bash
# PRs with no review comments
gh pr list --state merged --json number,reviewDecision,comments --limit 50
```

**What it suggests:** Team may be rubber-stamping, or only one person understands changes.

## Mapping Violations to Experiment Opportunities

| Violation | FOE Principle | Experiment Hypothesis Template |
|-----------|---------------|-------------------------------|
| Knowledge concentration | Understanding | "If we actively distributed knowledge about X, then we would reduce single-point-of-failure risk" |
| Protocol misunderstanding | Understanding | "If we invested time to understand Y's model before building, then we would avoid conceptual errors" |
| No early tests | Feedback | "If we established test infrastructure before features, then we would catch issues earlier" |
| Manual deployment | Feedback | "If we automated deployment validation, then we would eliminate 'works on my machine' issues" |
| Frequent reverts | Confidence | "If we improved our pre-merge validation, then we would reduce production rollbacks" |
| Disabled features | Confidence | "If we allocated time to fix rather than disable, then we would build system confidence" |

## Evidence Strength for FOE Violations

| Strength | Criteria |
|----------|----------|
| **High** | Explicit acknowledgment in issues/commits, clear impact (bugs, incidents) |
| **Medium** | Pattern visible in data, but no explicit acknowledgment |
| **Low** | Inferred from absence (no tests, no docs) rather than presence |
