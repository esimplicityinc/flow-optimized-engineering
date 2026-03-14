---
name: foe-method-framework
description: |
  Framework for creating and managing Flow Optimized Engineering methods. Use when creating 
  new methods, updating method maturity levels, linking observations to methods, adding
  methods from external frameworks, or understanding the method structure. Methods are 
  practices backed by observations within Field Guides.
---

# FOE Method Framework

This skill provides the structure and principles for creating and managing methods in the Flow Optimized Engineering Field Guides system.

## What is a Method?

A method is a documented practice or approach that solves a specific engineering challenge. Methods are:
- **Actionable** - They describe something you can do
- **Evidence-backed** - They link to observations that support them
- **Maturity-tracked** - They have a maturity level indicating how well-tested they are

## Method Dimensions

Methods have three orthogonal dimensions:

| Dimension | Values | Meaning |
|-----------|--------|---------|
| **Acceptance** | Emerging / Established | How validated is it within this Field Guide? |
| **Origin** | Internal / External | Where did it come from? |
| **Priority** | Essential / Recommended / Supplemental | How important is it to this guide? |

### Origin: Internal vs External

- **Internal methods** - Methods created within FOE (no `external_method` in frontmatter)
- **External methods** - Methods sourced from external frameworks like DORA, BDD, Team Topologies (have `external_method` in frontmatter, show `ExternalMethodHeader`)

### Acceptance: Emerging vs Established

- **Emerging** - Methods being validated (hypothesized or observing maturity)
- **Established** - Methods with strong evidence (validated or proven maturity)

### Priority: Essential / Recommended / Supplemental

Priority indicates how important a method is to a particular field guide. The same method can have different priorities in different guides.

- **Essential** - Foundational practice everyone using this guide should adopt
- **Recommended** - High-value practice worth adopting (the default if not specified)
- **Supplemental** - Useful addition for specific contexts or advanced use cases

Priority is set per-guide in the overview page's `MethodMaturityTable` props and optionally in individual method frontmatter. If omitted, defaults to `recommended`.

## Method Locations

All methods live together, organized by acceptance level:

```
docs/docs/field-guides/
└── [guide-name]/
    └── methods/
        ├── emerging/       # Hypothesized or Observing methods
        │   ├── internal-method.md      (no external_method)
        │   └── external-method.md      (has external_method)
        └── established/    # Validated or Proven methods
            ├── internal-method.md
            └── external-method.md
```

## Maturity Levels

| Level | Value | Folder | Description |
|-------|-------|--------|-------------|
| Hypothesized | 1 | `emerging/` | Proposed, not yet tested |
| Observing | 2 | `emerging/` | Active observations underway |
| Validated | 3 | `established/` | Supporting evidence exists |
| Proven | 4 | `established/` | Multiple confirming observations |

## Creating an Internal Method

1. Determine the maturity level (usually starts at `hypothesized` or `observing`)
2. Choose the correct folder (`emerging/` or `established/`)
3. Create the markdown file with proper frontmatter
4. Link any supporting observations
5. Include the `<RelatedObservations />` component

See `references/method-template.md` for the complete template.

## Creating an External Method

External methods have a different creation path - they're sourced from external frameworks and adapted for Field Guide context.

### 1. Create the Method File

Create a file in `field-guides/[guide]/methods/emerging/[method-slug].md`:

```yaml
---
methodId: M111
sidebar_position: 1
title: "Deployment Frequency"
sidebar_label: "Deployment Frequency"
description: "How deployment frequency applies to this Field Guide's context"
external_method:
  framework: dora
  method: deployment-frequency
  id: M111
foe_maturity: hypothesized
priority: recommended
observations: []
---

import ExternalMethodHeader from '@site/src/components/ExternalMethodHeader';
import RelatedObservations from '@site/src/components/RelatedObservations';

# Deployment Frequency

<ExternalMethodHeader />

## Why This Matters for [This Field Guide]

[Explain how this external method specifically applies to the Field Guide's context]

## Adaptations

[Any modifications or considerations for using this method in this context]

## Supporting Evidence

<RelatedObservations />
```

### 2. Update the Overview's MethodMaturityTable

Add the external method to the `methods` prop in the guide's overview:

```jsx
<MethodMaturityTable 
  guideId="your-guide"
  methods={[
    // ... internal methods
    {
      id: 'M111',
      framework: 'dora',
      method: 'deployment-frequency',
      maturity: 'hypothesized',
      title: 'Deployment Frequency',
      description: 'How often code is deployed to production',
      frameworkTitle: 'DORA',
      slug: 'deployment-frequency',
    },
  ]}
/>
```

The `MethodMaturityTable` links to the method page. External methods show the `ExternalMethodHeader` which links to the canonical definition.

### 3. Sidebar Auto-Discovery

The sidebar automatically discovers all methods via the `autogenerated` directive - no separate category needed:

```js
{
  type: 'category',
  label: 'Emerging Methods',
  items: [
    {
      type: 'autogenerated',
      dirName: 'field-guides/[guide]/methods/emerging',
    },
  ],
}
```

## Maturity Transitions

### Emerging → Established

When a method advances from Observing to Validated:
1. Move the file from `emerging/` to `established/`
2. Update the `foe_maturity` frontmatter
3. Update the guide overview to reflect the change

### Graduation Criteria

| Transition | Criteria |
|------------|----------|
| Hypothesized → Observing | First observation created |
| Observing → Validated | Completed observation(s) with positive results |
| Validated → Proven | Multiple observations across different contexts |

## External Frameworks

External Frameworks are established industry methodologies (e.g., DORA, BDD, Team Topologies) that contain well-defined methods.

### Framework Location

```
docs/docs/external-frameworks/
├── overview.md
└── [framework-slug]/
    ├── overview.md         # Framework metadata and description
    └── methods/
        └── method-name.md  # Canonical method definitions
```

### Framework Status Levels

| Status | Description |
|--------|-------------|
| Emerging Standard | Gaining traction, early adoption |
| Well-Established | Widely recognized, significant adoption |
| Industry Standard | De facto standard in the industry |

### Key Principles

- **External methods provide context** - Explain how the method applies to this specific Field Guide
- **Canonical method is the source** - The external framework method is the authoritative definition
- **Independent FOE maturity** - Track your own maturity separate from framework status
- **Link observations** - Observations validate the method in your specific context
- **Cherry-pick** - Add individual methods, not entire frameworks

### Creating a New External Framework

See `references/external-frameworks.md` for the full template.

## References

- `references/method-template.md` - Full template for internal methods
- `references/external-method-template.md` - Template for external methods
- `references/maturity-levels.md` - Detailed maturity criteria
- `references/external-frameworks.md` - External framework template

## Assets

- `assets/method-scaffold.md` - Minimal copy-paste scaffold for internal methods
- `assets/external-method-scaffold.md` - Minimal scaffold for external methods
