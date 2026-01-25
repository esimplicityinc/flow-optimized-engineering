---
sidebar_position: 3
title: Contributing Experiments
---

# Contributing Experiments

Experiments are the evidence behind our methods. We collect two types of evidence:

1. **Internal Experiments** - First-hand experiments conducted by teams
2. **Literature Evidence** - Published research, studies, and documented practices from external sources

Both types are valuable and help establish method maturity.

## Internal Experiments

These are experiments you or your team conducted directly. You have first-hand access to context, data, and observations.

### What Makes a Good Internal Experiment?

An experiment doesn't need to be a formal scientific study. It needs to:

1. **Have a clear hypothesis** - What did you expect to happen?
2. **Document the approach** - What did you actually do?
3. **Record the results** - What happened?
4. **Share the learning** - What does this mean for others?

Failed experiments are just as valuable as successful ones. Learning that something *doesn't* work saves others from the same dead end.

### Internal Experiment Template

Create a new markdown file in `/docs/field-guides/experiments/internal/` using this structure:

```markdown
---
sidebar_position: 1
title: "Your Experiment Title"
source_type: internal
status: completed    # or: in-progress
methods:
  - guide-name/methods/established/method-slug
  - guide-name/methods/emerging/other-method-slug
---

# Your Experiment Title

> **Status:** Completed (or In Progress)

## Context

What situation led to this experiment? What problem were you solving?

## Hypothesis

What did you expect would happen?

> "If we [do X], then [Y will happen] because [Z]."

## Approach

How did you run the experiment? Be specific enough that others could replicate it.

1. Step one
2. Step two
3. Step three

## Results

What actually happened? Include data where possible.

| Metric | Before | After | Change |
|--------|--------|-------|--------|
| Relevant metric | X | Y | +/-% |

## Analysis

What do the results mean?

- What worked?
- What didn't?
- What surprised you?

## Conclusion

Did your hypothesis hold? What should others take away from this?
```

## Literature Evidence

These are research studies, industry reports, and documented practices from external sources that provide evidence for FOE methods.

### What Makes Good Literature Evidence?

Literature evidence should:

1. **Be credible** - Published research, reputable organizations, peer-reviewed studies
2. **Have clear methodology** - Documented approach that can be evaluated
3. **Include measurable outcomes** - Data and findings, not just opinions
4. **Be relevant to FOE** - Connects to understanding, feedback, or confidence

### Literature Evidence Template

Create a new markdown file in `/docs/field-guides/experiments/literature/` using this structure:

```markdown
---
sidebar_position: 1
title: "Study/Research Title"
source_type: literature
source:
  authors:
    - "Author Name"
    - "Second Author"
  organization: "Organization Name"
  year: 2024
  url: "https://source-url.com"
status: completed
methods:
  - guide-name/methods/established/method-slug
---

# Study/Research Title

> **Source:** [Organization/Authors], [Year]

Brief summary of what this research demonstrates and why it matters.

## Study Overview

- **Researchers:** Who conducted this study?
- **Scope:** Sample size, duration, organizations involved
- **Methodology:** How was the research conducted?

## Key Findings

What did the research discover?

| Finding | Evidence |
|---------|----------|
| Finding 1 | Supporting data |
| Finding 2 | Supporting data |

## FOE Relevance

### Understanding
What does this teach us about how software development works?

### Feedback
What does this reveal about effective feedback loops?

### Confidence
How does this help us build confidence in our practices?

## Limitations

Be honest about the study's limitations:
- Methodological constraints
- Context-specific factors
- Generalizability concerns

## Application

How should teams apply these findings?

## References

- [Primary source](url)
- [Related research](url)
```

## Linking to Methods

The `methods` field in frontmatter connects your experiment to the methods it supports. Use the path relative to `/docs/field-guides/`:

```yaml
methods:
  - agentic-coding/methods/established/some-method
  - agentic-coding/methods/emerging/another-method
```

Both internal experiments and literature evidence can support multiple methods.

## Experiment Status

| Status | When to Use |
|--------|-------------|
| `in-progress` | Experiment is ongoing, results are preliminary |
| `completed` | Experiment is done, conclusions are drawn |

## How Evidence Affects Method Maturity

When you add evidence that supports a method:

- **Hypothesized methods** with experiments may advance to **Experimenting**
- **Experimenting methods** with completed experiments may advance to **Validated**
- **Validated methods** with multiple confirming experiments may advance to **Proven**

Literature evidence from large-scale studies (like DORA research) can provide strong support for method advancement.

## Submitting Your Evidence

1. Create your experiment file following the appropriate template above
2. Place it in the correct folder:
   - Internal experiments: `/docs/field-guides/experiments/internal/`
   - Literature evidence: `/docs/field-guides/experiments/literature/`
3. Submit a pull request to the repository
4. In your PR description, note which methods your experiment supports
5. A maintainer will review and merge

## Questions?

Open an issue if you're unsure whether your evidence fits or need help structuring it.
