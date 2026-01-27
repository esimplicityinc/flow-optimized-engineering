---
name: foe-observation-framework
description: |
  Framework for creating Flow Optimized Engineering observations. Use when documenting 
  evidence for methods, creating new observation files, understanding the observation 
  structure, or validating observation format. Embeds FOE principles (optimize for 
  understanding, fast feedback, confidence) into observation design and evaluation.
  Supports both internal observations (our own learnings) and literature evidence 
  (published research).
---

# FOE Observation Framework

This skill provides the structure and principles for documenting observations in the Flow Optimized Engineering Field Guides system.

## Two Types of Observations

FOE distinguishes between two types of documented evidence:

### Internal Observations

First-person observations documented by our teams. These document:
- What **we** tried
- Why **we** tried it
- What happened
- What **we** learned

**Location:** `docs/docs/field-guides/observations/internal/`

### Literature Evidence

Published research, case studies, and external evidence that supports FOE methods. These document:
- What **researchers** studied
- Their methodology and findings
- How their evidence supports FOE principles

**Location:** `docs/docs/field-guides/observations/literature/`

## Key Differences

| Aspect | Internal Observations | Literature Evidence |
|--------|---------------------|---------------------|
| **Who ran it** | Our team | External researchers |
| **Hypothesis format** | "If we [X], then [Y]..." | "The researchers hypothesized..." |
| **Approach section** | Our specific steps | Summary of their methodology |
| **Results** | Our measurements | Their published findings |
| **Limitations** | Our honest assessment | Acknowledged from source |
| **Purpose** | Document our learnings | Borrow established evidence |

## Internal Observation Structure

See `references/observation-template.md` for the complete template.

**Frontmatter:**
```yaml
---
title: "Your Observation Title"
status: completed    # or: in-progress
source_type: internal
methods:
  - guide-name/methods/established/method-slug
---
```

**Key sections:**
1. **Context** - The situation that led to this observation
2. **Hypothesis** - What you expected (use "If we [X], then [Y] because [Z]" format)
3. **Approach** - How you ran the work (replicable steps)
4. **Results** - What actually happened (with data if possible)
5. **Analysis** - What it means, including FOE insights
6. **Limitations** - Honest assessment of constraints
7. **Conclusion** - Key takeaways and recommendations

## Literature Evidence Structure

See `references/literature-template.md` for the complete template.

**Frontmatter:**
```yaml
---
title: "Research Study Title"
status: completed
source_type: literature
source:
  authors: ["Name 1", "Name 2"]
  organization: "Organization Name"
  year: 2018
  url: "https://..."
methods: []
---
```

**Key sections:**
1. **Context** - Research background and questions
2. **Hypothesis** - What the researchers expected
3. **Approach** - Summary of their methodology
4. **Results** - Key quantitative findings
5. **Analysis** - What the research establishes + FOE insights
6. **Limitations** - Acknowledged constraints (from source and our assessment)
7. **Conclusion** - Key learnings and FOE application

## FOE Alignment

Every observation (internal or literature) should consider the three FOE principles:

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

Both types of observations affect method maturity:

| Method State | What Observations Do |
|--------------|---------------------|
| Hypothesized | First observation moves it to Observing |
| Observing | Completed observations can support Validated |
| Validated | Multiple confirming observations support Proven |
| Proven | Contradicting observations may lower confidence |

Literature evidence can provide stronger support for maturity advancement due to larger sample sizes, academic rigor, and replication across organizations.

## Quality Checklist

### Internal Observations
- [ ] Hypothesis uses "If we [X], then [Y] because [Z]" format
- [ ] Approach is specific enough to replicate
- [ ] Results include concrete data or observations
- [ ] Limitations are honestly stated
- [ ] FOE insights are included in Analysis
- [ ] `source_type: internal` in frontmatter

### Literature Evidence
- [ ] Source details complete (authors, organization, year, URL)
- [ ] Methodology summarized accurately
- [ ] Key quantitative findings included
- [ ] Limitations acknowledged (both theirs and ours)
- [ ] FOE application explained in Analysis
- [ ] `source_type: literature` in frontmatter

## References

- `references/observation-template.md` - Internal observation template
- `references/literature-template.md` - Literature evidence template
- `references/foe-principles.md` - Deep dive on FOE principles
- `references/maturity-model.md` - How maturity levels work

## Assets

- `assets/observation-scaffold.md` - Minimal scaffold for internal observations
- `assets/literature-scaffold.md` - Minimal scaffold for literature evidence
