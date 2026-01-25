# Maturity Model for Methods

Methods progress through maturity levels as they accumulate supporting evidence from experiments.

## Maturity Levels

| Level | Value | Description | Evidence Required |
|-------|-------|-------------|-------------------|
| **Hypothesized** | 1 | Proposed approach, not yet tested | None - this is the starting point |
| **Experimenting** | 2 | Active experiments underway | At least one in-progress experiment |
| **Validated** | 3 | Supporting evidence exists | Completed experiments with positive results |
| **Proven** | 4 | Multiple experiments confirm effectiveness | Multiple experiments across different contexts |

## How Experiments Affect Maturity

### Hypothesized → Experimenting
**Trigger:** First experiment is created (even if in-progress)

A method moves from "idea" to "being tested" when someone actually tries it and starts documenting the results.

### Experimenting → Validated
**Trigger:** Completed experiment(s) show positive results

Requirements:
- At least one completed experiment
- Results support the method's claims
- Honest limitations documented

### Validated → Proven
**Trigger:** Multiple confirming experiments across contexts

Requirements:
- Multiple completed experiments (typically 3+)
- Experiments from different teams/projects/contexts
- Consistent positive results
- No significant contradicting evidence

### Downgrade Scenarios

Methods can also move backwards:

- **Contradicting experiments** may move Proven → Validated
- **Failed replications** may move Validated → Experimenting
- **Methods with only stale experiments** may regress

## Guide Maturity Calculation

A guide's overall maturity is calculated as the average of its method maturity values:

```
Guide Maturity = Sum(Method Values) / Number of Methods
```

### Thresholds

| Average | Guide Level |
|---------|-------------|
| < 1.5 | Hypothesized |
| 1.5 - 2.5 | Experimenting |
| 2.5 - 3.5 | Validated |
| > 3.5 | Proven |

## Implications for Experiment Authors

### When documenting an experiment:

1. **Check existing methods** - Does your experiment support an existing method?
2. **Consider maturity implications** - Could this push a method to the next level?
3. **Be honest about limitations** - Weak experiments shouldn't inflate maturity
4. **Link appropriately** - Use the `methods:` frontmatter to connect

### Quality over quantity:

One rigorous experiment is worth more than several weak ones. Maturity advancement should reflect genuine confidence, not just experiment count.

## Method-Experiment Relationship

```
┌─────────────────────────────────────────────┐
│  Method (maturity: validated)               │
│  ─────────────────────────────              │
│  experiments:                               │
│    - experiment-1                           │
│    - experiment-2                           │
└─────────────────────────────────────────────┘
              ▲                    ▲
              │                    │
    ┌─────────┴───────┐   ┌───────┴─────────┐
    │ Experiment 1    │   │ Experiment 2    │
    │ ────────────    │   │ ────────────    │
    │ methods:        │   │ methods:        │
    │   - this-method │   │   - this-method │
    │   - other-method│   │   - another     │
    └─────────────────┘   └─────────────────┘
```

Experiments can support multiple methods. Methods list their supporting experiments.

## Reviewing Maturity Changes

Before advancing a method's maturity:

1. **Review linked experiments** - Are they rigorous? Honest about limitations?
2. **Consider context diversity** - Same team doing multiple experiments ≠ broad validation
3. **Check for contradicting evidence** - Any experiments that challenge the method?
4. **Assess practical applicability** - Does the evidence translate to real-world adoption?

Maturity is a signal of confidence. Treat it accordingly.
