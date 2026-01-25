# Literature Evidence Template

This is the complete template for documenting external research as literature evidence.

## Frontmatter

```yaml
---
sidebar_position: 1
title: "Research Study Title"
status: completed
source_type: literature
source:
  authors: ["Author 1", "Author 2"]
  organization: "Organization Name"
  year: 2018
  url: "https://..."
methods:
  - guide-name/methods/established/method-slug
---
```

### Frontmatter Fields

| Field | Required | Values | Description |
|-------|----------|--------|-------------|
| `sidebar_position` | Yes | Number | Order in sidebar |
| `title` | Yes | String | Human-readable title |
| `status` | Yes | `completed` | Literature evidence is always completed |
| `source_type` | Yes | `literature` | Marks this as external research |
| `source.authors` | Yes | Array | Research authors |
| `source.organization` | Yes | String | Research organization |
| `source.year` | Yes | Number | Publication year |
| `source.url` | Yes | String | Link to source |
| `methods` | No | Array of paths | Methods this supports |

## Complete Template

```markdown
---
sidebar_position: 1
title: "Research Study Title"
status: completed
source_type: literature
source:
  authors: ["Author 1", "Author 2"]
  organization: "Organization Name"
  year: 2018
  url: "https://..."
methods: []
---

import RelatedMethods from '@site/src/components/RelatedMethods';

# Research Study Title

> **Source:** Authors (Year), Organization

Brief 1-2 sentence summary of the research and its key finding.

## Context

**Environment:**
- Organization: [Research organization]
- Lead Researcher: [Name, credentials if notable]
- Timeline: [When the research was conducted]
- Sample: [Sample size and composition]

**The Problem:**
What research question(s) did the study address? What gap in knowledge existed?

**Research Questions:**
- [Question 1]
- [Question 2]

## Hypothesis

What did the researchers expect to find?

> "The researchers hypothesized that [X] would lead to [Y] because [Z]."

**Variables:**
- Independent (what they manipulated/measured): [X]
- Dependent (what outcomes they measured): [Y]

## Approach

### Methodology
Summarize the research design:
- **Design:** [e.g., Quasi-experimental, longitudinal survey, case study]
- **Analysis:** [e.g., Statistical methods used]
- **Validation:** [How they ensured rigor]

### Data Collection
- How data was collected
- Duration of study
- Tools/instruments used

## Results

### Key Quantitative Findings

| Finding | Result |
|---------|--------|
| [Finding 1] | [Specific number/percentage] |
| [Finding 2] | [Specific number/percentage] |

### Major Conclusions
- [Conclusion 1]
- [Conclusion 2]
- [Conclusion 3]

### Surprising or Notable Findings
- [Anything that challenged conventional wisdom]

## Analysis

### What the Research Establishes

1. [Key established finding 1]
2. [Key established finding 2]
3. [Key established finding 3]

### FOE Insights

**Understanding:** 
[How does this research improve our understanding of how systems work?]

**Feedback:** 
[What does this reveal about feedback loops, detection, or learning speed?]

**Confidence:** 
[What risks does this research help us understand? What confidence does it provide?]

## Limitations

Acknowledge constraints from the source and our own assessment:

- **Methodology:** [e.g., Survey-based, correlation not causation]
- **Sample:** [e.g., Single organization, specific industry]
- **Context:** [e.g., May not generalize to all settings]
- **Time period:** [e.g., Research from specific era]

## Conclusion

### Verdict
**[Strongly Supported / Supported / Supported with Caveats]** - Brief explanation of evidence strength.

### Key Learnings

1. [Most important takeaway for FOE practitioners]
2. [Second takeaway]
3. [Third takeaway]

### Recommendation

**Apply this when:**
- [Situation 1]
- [Situation 2]

**Watch out for:**
- [Caveat 1]
- [Caveat 2]

### FOE Application

[How does this research connect to and support FOE principles? Include a table if helpful.]

---

## References

- [Full academic citation 1]
- [Full academic citation 2]
- [URL to source]

---

<RelatedMethods />
```

## Writing Tips

### Source Attribution
Always clearly attribute findings to the original researchers:
- Good: "Forsgren et al. found that high performers deploy 200x more frequently"
- Weak: "High performers deploy 200x more frequently"

### Quantitative Findings
Include specific numbers from the research:
- Good: "Teams with psychological safety were 2x more likely to be rated effective by executives"
- Weak: "Teams with psychological safety performed better"

### Limitations
Be honest about what the research does and doesn't establish:
- Good: "This study establishes correlation but cannot prove causation"
- Weak: "This proves that X causes Y"

### FOE Application
Explicitly connect the research to FOE principles:
- How does this support the Understanding pillar?
- What does it reveal about Fast Feedback?
- How does it relate to Confidence?
