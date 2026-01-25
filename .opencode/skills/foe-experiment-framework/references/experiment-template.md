# Experiment Template

This is the complete template for experiment documentation.

## Frontmatter

```yaml
---
sidebar_position: 1
title: "Your Experiment Title"
status: completed    # or: in-progress
methods:
  - guide-name/methods/established/method-slug
  - guide-name/methods/emerging/method-slug
---
```

### Frontmatter Fields

| Field | Required | Values | Description |
|-------|----------|--------|-------------|
| `sidebar_position` | Yes | Number | Order in sidebar |
| `title` | Yes | String | Human-readable title |
| `status` | Yes | `in-progress` or `completed` | Current state |
| `methods` | No | Array of paths | Methods this supports |

## Complete Template

```markdown
---
sidebar_position: 1
title: "Your Experiment Title"
status: completed
methods:
  - guide-name/methods/established/method-slug
---

import RelatedMethods from '@site/src/components/RelatedMethods';

# Your Experiment Title

> **Status:** Completed

[1-2 sentence summary: What was tried and what was the key learning?]

## Context

What situation led to this experiment? What problem were you solving?

**Environment:**
- Project/system: [What were you working on?]
- Team: [Who was involved?]
- Timeline: [When did this happen?]

**The Problem:**
[Describe the challenge or opportunity that prompted this experiment]

**Constraints:**
- [Constraint 1]
- [Constraint 2]

## Hypothesis

What did you expect would happen?

> "If we [specific action], then [expected outcome] because [reasoning]."

**Variables:**
- Independent (what you changed): [X]
- Dependent (what you measured): [Y]

## Approach

How did you run the experiment? Be specific enough that others could replicate it.

### Setup
1. [Preparation step]
2. [Preparation step]

### Execution
1. [Action taken]
2. [Action taken]
3. [Action taken]

### Measurement
- How you collected data: [Method]
- Duration of observation: [Time period]
- Tools used: [Tools]

## Results

What actually happened?

### Quantitative Results

| Metric | Before | After | Change |
|--------|--------|-------|--------|
| [Metric 1] | [Value] | [Value] | [+/-X%] |
| [Metric 2] | [Value] | [Value] | [+/-X%] |

### Qualitative Observations

- [Observation 1]
- [Observation 2]
- [Observation 3]

### Unexpected Findings

- [Anything surprising that emerged]

## Analysis

What do the results mean?

### What Worked
- [Specific success 1]
- [Specific success 2]

### What Didn't Work
- [Specific failure or underperformance]

### What Surprised Us
- [Unexpected finding and its implications]

### FOE Insights

**Understanding:** 
[What did this reveal about how the system actually works?]

**Feedback:** 
[How did this affect feedback loops? What became faster/slower to detect?]

**Confidence:** 
[What risks does this reduce? What confidence level do you have in these results?]

## Limitations

Be honest about the experiment's constraints:

- **Sample size:** [e.g., "Only tested with one team"]
- **Duration:** [e.g., "Observed for 2 weeks, long-term effects unknown"]
- **Context specificity:** [e.g., "May not apply to teams with different tech stacks"]
- **Uncontrolled variables:** [e.g., "Team also changed sprint length during this period"]

## Conclusion

Did your hypothesis hold? What should others take away from this?

### Verdict
[Supported / Partially Supported / Not Supported / Inconclusive]

### Key Learnings
1. [Most important takeaway]
2. [Second takeaway]
3. [Third takeaway]

### Recommendation
[Should others try this? Under what conditions? What should they watch out for?]

### Future Experiments
[What follow-up experiments would strengthen this evidence?]

---

<RelatedMethods />
```

## Writing Tips

### Hypothesis Format
Always use: "If we [X], then [Y] because [Z]"

Good: "If we run tests in parallel, then CI time will decrease by 40% because the bottleneck is sequential test execution."

Weak: "Parallel tests might be faster."

### Results Section
Include numbers whenever possible. Even rough estimates are better than vague statements.

Good: "Deploy time decreased from ~15 minutes to ~4 minutes (73% reduction)"
Weak: "Deploys got faster"

### Limitations
Be genuinely honest. Acknowledging limitations increases credibility.

Good: "This was tested on a team of 5 senior engineers. Results may differ for larger or less experienced teams."
Weak: "Results may vary."

### FOE Insights
Connect back to the three principles:
- Understanding: Mental models, system knowledge
- Feedback: Speed of learning, detection of problems
- Confidence: Risk reduction, reliability
