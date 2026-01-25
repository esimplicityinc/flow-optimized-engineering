---
sidebar_position: 3
title: Contributing Experiments
---

# Contributing Experiments

Experiments are the evidence behind our methods. When you try something new and learn from it, documenting that experiment helps everyone.

## What Makes a Good Experiment?

An experiment doesn't need to be a formal scientific study. It needs to:

1. **Have a clear hypothesis** - What did you expect to happen?
2. **Document the approach** - What did you actually do?
3. **Record the results** - What happened?
4. **Share the learning** - What does this mean for others?

Failed experiments are just as valuable as successful ones. Learning that something *doesn't* work saves others from the same dead end.

## Experiment Template

Create a new markdown file in `/docs/field-guides/experiments/` using this structure:

```markdown
---
sidebar_position: 1
title: "Your Experiment Title"
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

## Linking to Methods

The `methods` field in frontmatter connects your experiment to the methods it supports. Use the path relative to `/docs/field-guides/`:

```yaml
methods:
  - agentic-coding/methods/established/some-method
  - agentic-coding/methods/emerging/another-method
```

Your experiment can support multiple methods - that's encouraged!

## Experiment Status

| Status | When to Use |
|--------|-------------|
| `in-progress` | Experiment is ongoing, results are preliminary |
| `completed` | Experiment is done, conclusions are drawn |

## How Experiments Affect Method Maturity

When you add an experiment that supports a method:

- **Hypothesized methods** with experiments may advance to **Experimenting**
- **Experimenting methods** with completed experiments may advance to **Validated**
- **Validated methods** with multiple confirming experiments may advance to **Proven**

Method authors review linked experiments when considering maturity changes.

## Submitting Your Experiment

1. Create your experiment file following the template above
2. Submit a pull request to the repository
3. In your PR description, note which methods your experiment supports
4. A maintainer will review and merge

## Questions?

Open an issue if you're unsure whether your experiment fits or need help structuring it.
