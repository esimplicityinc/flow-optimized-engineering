# Method Template

This is the complete template for method documentation.

## Frontmatter

```yaml
---
methodId: M###
sidebar_position: 1
title: "Method Name"
maturity: observing    # hypothesized | observing | validated | proven
priority: recommended  # essential | recommended | supplemental
observations:
  - observation-slug
  - another-observation-slug
---
```

### Frontmatter Fields

| Field | Required | Values | Description |
|-------|----------|--------|-------------|
| `methodId` | Yes | M### | Unique method identifier matching filename |
| `sidebar_position` | Yes | Number | Order in sidebar |
| `title` | Yes | String | Human-readable title |
| `maturity` | Yes | See levels | Current maturity level |
| `priority` | No | `essential` / `recommended` / `supplemental` | Importance to the guide (default: `recommended`) |
| `observations` | No | Array of slugs | Linked observation file names (without .md) |

## Complete Template (Emerging Method)

```markdown
---
methodId: M###
sidebar_position: 1
title: "Method Name"
maturity: observing
priority: recommended
observations:
  - observation-slug
---

import MaturityBadge from '@site/src/components/MaturityBadge';
import RelatedObservations from '@site/src/components/RelatedObservations';

# Method Name

<MaturityBadge maturity="observing" />

[1-2 sentence description of what this method is and why it matters]

:::caution Early Stage
This method is still being validated through observations. Results may vary and 
the approach may evolve as we learn more.
:::

## Overview

[Expanded description of the method - 2-3 paragraphs covering:
- What problem it solves
- The core insight or approach
- Why it works (theory)]

## When to Use

Use this method when:

- [Situation 1 where this applies]
- [Situation 2 where this applies]
- [Situation 3 where this applies]

## When NOT to Use

Avoid this method when:

- [Counter-indication 1]
- [Counter-indication 2]

## How It Works

### Prerequisites

Before starting:
- [Prerequisite 1]
- [Prerequisite 2]

### Step 1: [First Step Name]

[Detailed description of what to do]

### Step 2: [Second Step Name]

[Detailed description of what to do]

### Step 3: [Third Step Name]

[Detailed description of what to do]

## Example

[Concrete example of applying this method - could include code, process flows, 
or before/after comparisons]

## Common Pitfalls

1. **[Pitfall Name]** - [Description and how to avoid]
2. **[Pitfall Name]** - [Description and how to avoid]

## How You Can Help

If you're testing this method:

1. Review the current approach
2. Try it in your context  
3. Document your observation

## Supporting Evidence

<RelatedObservations />
```

## Complete Template (Established Method)

```markdown
---
methodId: M###
sidebar_position: 1
title: "Method Name"
maturity: validated
priority: recommended
observations:
  - observation-1
  - observation-2
  - observation-3
---

import MaturityBadge from '@site/src/components/MaturityBadge';
import RelatedObservations from '@site/src/components/RelatedObservations';

# Method Name

<MaturityBadge maturity="validated" />

[1-2 sentence description of what this method is and why it matters]

## Overview

[Expanded description - can be more confident in tone since this is validated]

## When to Use

Use this method when:

- [Situation 1]
- [Situation 2]
- [Situation 3]

## When NOT to Use

Avoid this method when:

- [Counter-indication 1]
- [Counter-indication 2]

## How It Works

### Step 1: [First Step Name]

[Detailed description]

### Step 2: [Second Step Name]

[Detailed description]

### Step 3: [Third Step Name]

[Detailed description]

## Example

[Concrete example - more polished since method is established]

## Common Pitfalls

1. **[Pitfall Name]** - [Description and how to avoid]
2. **[Pitfall Name]** - [Description and how to avoid]

## Variations

[If there are common variations of this method, describe them here]

## Supporting Evidence

<RelatedObservations />
```

## Writing Guidelines

### Method Names
- Use action-oriented names when possible: "Parallelize CI Tests" not "Parallel Testing"
- Be specific: "Trunk-Based Development" not "Better Branching"

### Overview Section
- Lead with the problem, then the solution
- Keep theory grounded in practice
- Avoid jargon unless necessary

### How It Works
- Be specific enough that someone could follow the steps
- Include concrete examples, not just abstract descriptions
- Mention tools only when they're essential to the method

### Maturity Badge
- Always include the `<MaturityBadge>` component after the title
- The maturity prop must match the frontmatter `maturity` value

### Caution/Note Blocks
- Use `:::caution Early Stage` for emerging methods
- Use `:::tip` for helpful additional information
- Use `:::warning` for important caveats
