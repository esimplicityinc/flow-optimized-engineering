# Maturity Model for Methods

Methods progress through maturity levels as they accumulate supporting evidence from observations.

## Maturity Levels

| Level | Value | Description | Evidence Required |
|-------|-------|-------------|-------------------|
| **Hypothesized** | 1 | Proposed approach, not yet tested | None - this is the starting point |
| **Observing** | 2 | Active observations underway | At least one in-progress observation |
| **Validated** | 3 | Supporting evidence exists | Completed observations with positive results |
| **Proven** | 4 | Multiple observations confirm effectiveness | Multiple observations across different contexts |

## How Observations Affect Maturity

### Hypothesized → Observing
**Trigger:** First observation is created (even if in-progress)

A method moves from "idea" to "being tested" when someone actually tries it and starts documenting the results.

### Observing → Validated
**Trigger:** Completed observation(s) show positive results

Requirements:
- At least one completed observation
- Results support the method's claims
- Honest limitations documented

### Validated → Proven
**Trigger:** Multiple confirming observations across contexts

Requirements:
- Multiple completed observations (typically 3+)
- Observations from different teams/projects/contexts
- Consistent positive results
- No significant contradicting evidence

### Downgrade Scenarios

Methods can also move backwards:

- **Contradicting observations** may move Proven → Validated
- **Failed replications** may move Validated → Observing
- **Methods with only stale observations** may regress

## Guide Maturity Calculation

A guide's overall maturity is calculated as the average of its method maturity values:

```
Guide Maturity = Sum(Method Values) / Number of Methods
```

### Thresholds

| Average | Guide Level |
|---------|-------------|
| < 1.5 | Hypothesized |
| 1.5 - 2.5 | Observing |
| 2.5 - 3.5 | Validated |
| > 3.5 | Proven |

## Implications for Observation Authors

### When documenting an observation:

1. **Check existing methods** - Does your observation support an existing method?
2. **Consider maturity implications** - Could this push a method to the next level?
3. **Be honest about limitations** - Weak observations shouldn't inflate maturity
4. **Link appropriately** - Use the `methods:` frontmatter to connect

### Quality over quantity:

One rigorous observation is worth more than several weak ones. Maturity advancement should reflect genuine confidence, not just observation count.

## Method-Observation Relationship

```
┌─────────────────────────────────────────────┐
│  Method (maturity: validated)               │
│  ─────────────────────────────              │
│  observations:                              │
│    - observation-1                          │
│    - observation-2                          │
└─────────────────────────────────────────────┘
              ▲                    ▲
              │                    │
    ┌─────────┴───────┐   ┌───────┴─────────┐
    │ Observation 1   │   │ Observation 2   │
    │ ────────────    │   │ ────────────    │
    │ methods:        │   │ methods:        │
    │   - this-method │   │   - this-method │
    │   - other-method│   │   - another     │
    └─────────────────┘   └─────────────────┘
```

Observations can support multiple methods. Methods list their supporting observations.

## Reviewing Maturity Changes

Before advancing a method's maturity:

1. **Review linked observations** - Are they rigorous? Honest about limitations?
2. **Consider context diversity** - Same team doing multiple observations ≠ broad validation
3. **Check for contradicting evidence** - Any observations that challenge the method?
4. **Assess practical applicability** - Does the evidence translate to real-world adoption?

Maturity is a signal of confidence. Treat it accordingly.
