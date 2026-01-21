# Trunk-Based Development: Good vs Bad

## Description
A comparison of two Git branching patterns showing good (frequent small merges) vs bad (long-lived branches).

## Visual Elements

**Good Pattern (top):**
- Main branch line with many small circles (commits)
- Multiple short branches forking off and merging back quickly
- Annotation: "frequent, small commits"
- Looks like: `--o--o--o--o--o--o--o--o--` with tiny loops

**Bad Pattern (bottom):**
- Main branch line with one large merge at the end
- One long branch diverging for a long time
- Annotation: "weeks of divergence" and "one big merge"
- Shows the pain of late integration

## Context
Used in: `docs/docs/reference/pattern-library.md`

This illustrates trunk-based development: work on short-lived branches, merge frequently, vs. the anti-pattern of long-lived feature branches.

## ASCII Reference
```
Good:
  main --o--o--o--o--o--o--o--o-- (frequent, small commits)
        |  |  |  |  |  |  |  |
        '--'  '--'  '--'  '--'

Bad:
  main --------------------------o-- (one big merge)
        |                        |
        '------------------------'
         (weeks of divergence)
```

## Suggested Style
- Clean Git-style branch visualization
- Good pattern in green with checkmark
- Bad pattern in red with X
- Clear timeline indication
- Use circles for commits, lines for branches
