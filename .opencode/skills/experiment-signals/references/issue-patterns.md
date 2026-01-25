# Issue Pattern Signals

This reference details GitHub issue patterns that suggest experiment opportunities.

## Analysis Commands (using gh CLI)

```bash
# List recent issues
gh issue list --limit 100

# Issues with specific labels
gh issue list --label "bug"
gh issue list --label "tech-debt"
gh issue list --label "retrospective"

# Issues created in a date range
gh issue list --search "created:2025-12-01..2025-12-31"

# Issues mentioning specific terms
gh issue list --search "in:title,body retrospective"
gh issue list --search "in:title,body 'we learned'"

# View issue details
gh issue view 123

# Get issue JSON for analysis
gh issue list --json number,title,body,labels,createdAt,closedAt
```

## High-Signal Patterns

### Retrospective Issues

**Pattern:** Issues explicitly capturing learnings or post-mortems.

**Search terms:**
- "retrospective", "retro"
- "post-mortem", "postmortem"
- "lessons learned"
- "what went wrong"
- "root cause"

**Labels to look for:**
- `retrospective`
- `post-mortem`
- `incident`
- `learning`

**Example:**
```
#166: Improve Tests
Created: Dec 29, 2025
"After the production issues this week, we need to improve our test coverage..."
```

**What it suggests:** Team recognized a gap and explicitly acknowledged it. Prime experiment material.

### Bug Clusters

**Pattern:** Multiple bug issues created on the same day or in rapid succession.

**Analysis:**
```bash
gh issue list --label "bug" --json number,title,createdAt | \
  jq 'group_by(.createdAt | split("T")[0]) | map(select(length > 3))'
```

**Example:**
```
Jan 12, 2026:
#185: Embedding Word Docs isn't working (500 error)
#186: After embedding a document chat comes back with empty responses
#187: Just chatting is getting a 404
#188: Threads are not sticking after refreshing the page
#189: DEV - Prima Web Error
#190: LOCAL - Empty Responses on Regular Chats
#184: Switching model during agent mode does not work
```

**What it suggests:** Significant event (launch, deployment, migration) revealed systemic issues.

### Technical Debt Acknowledgments

**Pattern:** Issues explicitly calling out technical debt.

**Search terms:**
- "tech debt", "technical debt"
- "refactor needed"
- "cleanup needed"
- "we should have"
- "next time we should"

**Labels to look for:**
- `tech-debt`
- `refactor`
- `improvement`
- `cleanup`

**What it suggests:** Team recognizes accumulated problems. What caused them? What would prevent them?

### Test/Documentation Improvement Requests

**Pattern:** Issues requesting better tests or documentation.

**Example titles:**
- "Improve Tests"
- "Add integration tests for X"
- "Document the Y workflow"
- "README is outdated"

**What it suggests:** Knowledge or feedback gaps recognized. Why now? What triggered recognition?

## Medium-Signal Patterns

### "Temporarily" Issues

**Pattern:** Issues marked as temporary fixes or workarounds.

**Search terms:**
- "temporary", "temporarily"
- "workaround"
- "hack"
- "bandaid", "band-aid"

**What it suggests:** Team knowingly chose suboptimal solution. Why? What was the tradeoff?

### Recurring Issues

**Pattern:** Issues about the same problem reopened or duplicated.

**Analysis:**
```bash
# Find issues with similar titles
gh issue list --json title | jq '[.[] | .title] | group_by(.) | map(select(length > 1))'
```

**What it suggests:** Problem wasn't fully solved. What understanding is missing?

### Blocked Issues

**Pattern:** Issues that sat open for long periods or were blocked.

**Search terms:**
- "blocked"
- "waiting on"
- "depends on"
- "can't proceed"

**What it suggests:** Dependencies or knowledge gaps that slowed progress.

## Low-Signal Patterns

### Feature Requests

**Pattern:** Standard feature requests without learning context.

**What it suggests:** Normal product evolution, weak experiment signal.

### Question Issues

**Pattern:** Issues asking "how do I...?" questions.

**What it suggests:** May indicate documentation gaps, but weak signal alone.

## Extracting Evidence

When you find a high-signal issue:

1. **Read the full issue body** - Often contains context and reasoning
2. **Check comments** - Discussion may reveal more learnings
3. **Note the timeline** - When created vs. when resolved
4. **Check linked PRs** - Implementation details
5. **Look for related issues** - Same timeframe, same author, same labels

## Correlating with Other Sources

Issue patterns become stronger evidence when correlated with:

- **Commits:** Debugging crunches on same dates as bug clusters
- **PRs:** PRs that reference the issues
- **CI:** Build failures around the same time

Issues often provide the "why" that commits don't explain.
