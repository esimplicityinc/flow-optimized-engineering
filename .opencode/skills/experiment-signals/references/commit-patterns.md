# Commit Pattern Signals

This reference details commit patterns that suggest experiment opportunities.

## Analysis Commands

```bash
# Recent commit messages
git log --oneline -100

# Commits in a date range
git log --since="2025-12-01" --until="2025-12-31" --oneline

# Commits by time of day (pressure indicator)
git log --format="%H %ai %s" | awk '{print $2, $3, $4}'

# Commits with specific keywords
git log --grep="fix" --oneline
git log --grep="debug" --oneline
git log --grep="hotfix" --oneline

# Commit frequency by day
git log --format="%ai" | cut -d' ' -f1 | sort | uniq -c

# Authors and their commit counts
git shortlog -sn --no-merges
```

## High-Signal Patterns

### Debugging Crunches

**Pattern:** Clusters of commits with debugging-related messages in a short timeframe.

**Keywords to search:**
- "debug", "debugging"
- "fix", "fixing", "fixed"
- "hotfix", "hot fix"
- "patch"
- "prod", "production"
- "urgent", "emergency"

**Example:**
```
abc123 prod debugging logs
def456 more debug  
ghi789 fix: ensure tool function name length meets openai compatible length
jkl012 temporarily disabled tool toggle feature
```

**What it suggests:** Team discovered issues in production that could have been caught earlier. Potential experiment around feedback loop investment.

### Revert Patterns

**Pattern:** Commits followed by reverts, indicating something was tried and didn't work.

**Commands:**
```bash
git log --grep="revert" --oneline
git log --grep="Revert" --oneline
```

**What it suggests:** Failed approach worth documenting. What was tried? Why did it fail? What was learned?

### Refactoring Waves

**Pattern:** Large number of commits touching many files in a short period, often with "refactor" in messages.

**Keywords:**
- "refactor", "refactoring"
- "reorganize", "restructure"
- "cleanup", "clean up"
- "migrate", "migration"

**What it suggests:** Team recognized need for structural change. What triggered it? What was learned?

### Emergency Indicators

**Pattern:** Commits at unusual hours or with urgency markers.

**Analysis:**
```bash
# Weekend commits
git log --format="%ai %s" | grep -E "Sat|Sun"

# Late night commits (adjust timezone as needed)
git log --format="%ai %s" | awk -F' ' '{split($2,t,":"); if(t[1]>=22 || t[1]<=6) print}'
```

**Keywords:**
- "urgent", "emergency", "critical"
- "ASAP", "immediately"
- "hotfix"

**What it suggests:** Pressure situation worth documenting. What caused the pressure? What would have prevented it?

### "Temporarily Disabled" Pattern

**Pattern:** Commits that disable features rather than fix them.

**Keywords:**
- "temporarily disabled"
- "disable", "disabled"
- "comment out", "commented out"
- "skip", "skipping"
- "TODO", "FIXME", "HACK"

**What it suggests:** Team couldn't solve a problem in time. Why? What understanding was missing?

## Medium-Signal Patterns

### Documentation Additions

**Pattern:** Documentation commits after feature commits.

```bash
git log --grep="doc" --oneline
git log --grep="README" --oneline
```

**What it suggests:** Knowledge that needed to be captured. Was it reactive (after confusion) or proactive?

### Test Additions After Features

**Pattern:** Test commits that come significantly after the feature commits.

**What it suggests:** Feedback loop wasn't established early. What triggered the test addition?

### Configuration Changes

**Pattern:** Multiple config/env changes in sequence.

**Keywords:**
- "config", "configuration"
- "env", "environment"
- "settings"

**What it suggests:** Discovery of requirements not understood upfront.

## Low-Signal Patterns

### Version Bumps

**Pattern:** Dependency version updates.

**What it suggests:** May indicate response to issues, but weak signal alone.

### Merge Commits

**Pattern:** Merge conflict resolutions.

**What it suggests:** Integration challenges, but common in any project.

## Correlating with Other Sources

Commit patterns become stronger evidence when correlated with:

- **Issues:** Bug reports on the same dates as debugging crunches
- **PRs:** Discussions explaining why changes were needed
- **CI:** Build failures preceding fix commits

Always look for corroboration across multiple sources.
