---
name: observation-signals
description: |
  Patterns and signals that suggest undocumented observations or learning moments 
  in software repositories. Use when analyzing repos to find observation opportunities
  for the Alchemist workflow.
---

# Observation Signals

This skill teaches you to recognize patterns in git repositories that suggest undocumented observations - moments where teams tried something, learned something, or experienced outcomes worth documenting.

## What Are Observation Signals?

Observation signals are artifacts in a repository's history that indicate:

1. **Something was tried** - A deliberate approach or change
2. **Something was learned** - An outcome, expected or unexpected
3. **Something is worth documenting** - Evidence that could inform methods

## Signal Categories

### 1. Commit Patterns
Commits reveal team behavior under pressure, learning moments, and approach changes.

**Key patterns:**
- Debugging crunches (clusters of fix/debug commits)
- Refactoring waves (large-scale changes)
- Revert patterns (try → fail → undo)
- Emergency indicators (late night, weekend, "hotfix")

See: `references/commit-patterns.md`

### 2. Issue Patterns
Issues capture explicit acknowledgments of problems, learnings, and intentions.

**Key patterns:**
- Retrospective issues ("we should have...", "next time...")
- Bug clusters on specific dates
- Technical debt acknowledgments
- Test/documentation improvement requests

See: `references/issue-patterns.md`

### 3. FOE Violation Markers
Signals that indicate violations of Flow Optimized Engineering principles.

**Understanding violations:**
- Knowledge concentrated in few people
- Complex code with no documentation
- "Ask [person]" patterns

**Feedback violations:**
- No tests until after production issues
- Manual deployment processes
- "Works on my machine" indicators

**Confidence violations:**
- Frequent reverts
- "Temporarily disabled" commits
- Feature flags that never get removed

See: `references/foe-violations.md`

## Evidence Strength

Not all signals are equal. Rate evidence by:

| Strength | Criteria |
|----------|----------|
| **High** | Multiple sources corroborate, clear timeline, explicit acknowledgment |
| **Medium** | Single strong source, or multiple weak sources |
| **Low** | Inference from patterns, no explicit acknowledgment |

See: `references/evidence-strength.md`

## Using This Skill

When analyzing a repository:

1. **Load this skill** to understand what patterns to look for
2. **Run analysis** across commits, issues, PRs, CI, tests, docs, deps
3. **Correlate findings** - same event from multiple angles is stronger evidence
4. **Prioritize opportunities** by evidence strength and FOE alignment
5. **Package for Alchemist** using the opportunity template

## References

- `references/commit-patterns.md` - Detailed commit signal patterns
- `references/issue-patterns.md` - GitHub issue signal patterns  
- `references/foe-violations.md` - FOE principle violation markers
- `references/evidence-strength.md` - How to rate evidence quality

## Assets

- `assets/opportunity-template.md` - Template for structuring findings
