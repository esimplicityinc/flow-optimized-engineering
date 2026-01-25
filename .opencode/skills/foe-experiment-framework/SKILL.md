---
name: foe-experiment-framework
description: |
  Framework for creating Flow Optimized Engineering experiments. Use when documenting 
  evidence for methods, creating new experiment files, understanding the experiment 
  structure, or validating experiment format. Embeds FOE principles (optimize for 
  understanding, fast feedback, confidence) into experiment design and evaluation.
---

# FOE Experiment Framework

This skill provides the structure and principles for documenting experiments in the Flow Optimized Engineering Field Guides system.

## What is an Experiment?

An experiment is documented evidence that supports (or refutes) a method. It captures:
- What was tried
- Why it was tried
- What happened
- What we learned

Experiments don't need to be formal scientific studies. They can be:
- A team trying a new practice
- A before/after comparison
- An observation of what worked (or didn't)
- A failure that taught something valuable

## Experiment File Location

All experiments live in: `docs/docs/field-guides/experiments/`

## File Structure

See `references/experiment-template.md` for the complete template.

Key sections:
1. **Frontmatter** - Metadata including status and linked methods
2. **Context** - The situation that led to the experiment
3. **Hypothesis** - What you expected (use "If X, then Y because Z" format)
4. **Approach** - How you ran the experiment
5. **Results** - What actually happened (with data if possible)
6. **Analysis** - What it means, including FOE insights
7. **Limitations** - Honest assessment of experiment constraints
8. **Conclusion** - Key takeaways and recommendations

## FOE Alignment

Every experiment should consider the three FOE principles:

### Optimize for Understanding
- What did this reveal about how systems actually work?
- What mental models were confirmed or challenged?
- What would this teach someone new?

### Optimize for Fast Feedback
- What feedback loops were affected?
- How quickly could problems be detected?
- What became faster (or slower)?

### Optimize for Confidence
- How confident are you in the results?
- What risks does this reduce or reveal?
- What would increase confidence?

## Maturity Implications

Experiments affect method maturity:

| Method State | What Experiments Do |
|--------------|---------------------|
| Hypothesized | First experiment moves it to Experimenting |
| Experimenting | Completed experiments can support Validated |
| Validated | Multiple confirming experiments support Proven |
| Proven | Contradicting experiments may lower confidence |

## Quality Checklist

Before finalizing an experiment, verify:

- [ ] Hypothesis uses "If X, then Y because Z" format
- [ ] Approach is specific enough to replicate
- [ ] Results include concrete data or observations
- [ ] Limitations are honestly stated
- [ ] FOE insights are included in Analysis
- [ ] Methods frontmatter lists relevant methods (or is empty if none yet)

## References

- `references/experiment-template.md` - Full template with examples
- `references/foe-principles.md` - Deep dive on FOE principles
- `references/maturity-model.md` - How maturity levels work

## Assets

- `assets/experiment-scaffold.md` - Minimal copy-paste scaffold
