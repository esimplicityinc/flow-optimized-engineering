# External Frameworks Reference

This document provides templates and guidance for creating external frameworks and adopting their methods into Field Guides.

## Framework Overview Template

Create at `docs/docs/external-frameworks/[framework-slug]/overview.md`:

```yaml
---
sidebar_position: 1
title: Framework Name
status: well-established    # emerging-standard | well-established | industry-standard
source:
  url: https://framework-source.com
  authors:
    - Author One
    - Author Two
  publication_year: 2020
  organization: Organization Name
version: "2024"              # Optional: version or year of framework
pillars:                     # Optional: logical groupings within framework
  - pillar-one
  - pillar-two
related_frameworks:          # Optional: related frameworks
  - other-framework
description: Brief description of the framework.
---

# Framework Name

Introduction to the framework and its purpose.

## Key Concepts

Explain the core ideas behind the framework.

## Methods

import FrameworkMethodList from '@site/src/components/FrameworkMethodList';

<FrameworkMethodList framework="framework-slug" />

## Further Reading

- [Official Website](https://...)
- [Key Publication](https://...)
```

## Framework Method Template

Create at `docs/docs/external-frameworks/[framework-slug]/methods/[method-slug].md`:

```yaml
---
sidebar_position: 1
title: Method Name
pillar: pillar-name          # Optional: links to framework pillar
description: Brief description of the method.
---

# Method Name

**Pillar:** Pillar Name (if applicable)

Introduction to the method.

## Definition

> Formal definition from the framework source.

## Why It Matters

Explain the importance and benefits.

## How to Measure / Implement

Practical guidance on applying the method.

## FOE Alignment

How this method aligns with FOE principles:
- **Fast Feedback** - ...
- **Confidence** - ...
- **Understanding** - ...
```

## Category Configuration

### Framework Category (`_category_.json`)

```json
{
  "label": "Framework Name",
  "position": 1,
  "collapsible": true,
  "collapsed": false,
  "link": {
    "type": "doc",
    "id": "external-frameworks/framework-slug/overview"
  }
}
```

### Methods Category (`methods/_category_.json`)

```json
{
  "label": "Methods",
  "position": 2,
  "collapsible": true,
  "collapsed": false,
  "link": {
    "type": "generated-index",
    "title": "Framework Methods",
    "description": "Methods from the Framework Name."
  }
}
```

## Adopting Methods in Field Guides

### Frontmatter Schema

In the field guide's `overview.md`:

```yaml
---
title: Guide Name
adopted_methods:
  - framework: framework-slug
    method: method-slug
    foe_maturity: hypothesized   # hypothesized | experimenting | validated | proven
    experiments:                  # Optional: FOE experiments supporting this adoption
      - internal/experiment-slug
---
```

### MethodList Component Usage

```jsx
import MethodList from '@site/src/components/MethodList';

<MethodList 
  guideId="guide-name"
  methods={[/* native methods */]}
  adoptedMethods={[
    {
      framework: 'framework-slug',
      method: 'method-slug',
      foe_maturity: 'hypothesized',
      title: 'Method Display Name',
      description: 'Brief description for the card',
      frameworkTitle: 'FRAMEWORK',  // Display name for badge
      experiments: [],
    },
  ]}
/>
```

## TypeScript Types

Located in `docs/src/lib/fieldGuides.ts`:

```typescript
type FrameworkStatus = 'emerging-standard' | 'well-established' | 'industry-standard';

interface AdoptedMethod {
  framework: string;
  method: string;
  foe_maturity: MaturityLevel;
  experiments?: string[];
}

interface FrameworkFrontmatter {
  title: string;
  status: FrameworkStatus;
  source: {
    url: string;
    authors?: string[];
    publication_year?: number;
    organization?: string;
  };
  version?: string;
  pillars?: string[];
  related_frameworks?: string[];
  description?: string;
}
```

## Example: DORA Framework

The DORA framework is included as a reference implementation:

- Location: `docs/docs/external-frameworks/dora/`
- Status: `industry-standard`
- Methods: Deployment Frequency, Lead Time for Changes, Change Failure Rate, Time to Restore Service
- Pillars: throughput, stability

See the DORA implementation for a complete working example.
