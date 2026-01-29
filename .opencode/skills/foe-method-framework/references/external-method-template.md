# External Method Template

Use this template when adding an external framework method to a Field Guide. External method files provide Field Guide-specific context while linking to the canonical method definition.

## File Location

External methods live alongside internal methods, organized by maturity:

```
docs/docs/field-guides/[guide-name]/methods/
├── emerging/           # Hypothesized or Observing methods
│   └── [method-slug].md
└── established/        # Validated or Proven methods
    └── [method-slug].md
```

The method slug should match the external method's slug (e.g., `deployment-frequency`).

## Complete Template

```yaml
---
sidebar_position: 1
title: "[Method Name]"
sidebar_label: "[Method Name]"
description: "[Brief description of how this method applies to the Field Guide]"
external_method:
  framework: [framework-slug]  # e.g., dora, bdd, team-topologies
  method: [method-slug]        # e.g., deployment-frequency
foe_maturity: hypothesized     # hypothesized | observing | validated | proven
observations: []               # Array of observation slugs when linked
---

import ExternalMethodHeader from '@site/src/components/ExternalMethodHeader';
import RelatedObservations from '@site/src/components/RelatedObservations';

# [Method Name]

<ExternalMethodHeader />

## Why This Matters for [Field Guide Name]

[Explain the specific relevance of this method to the Field Guide's domain.
- What problems does it solve in this context?
- Why is it particularly important here?
- What unique considerations apply?]

## Adaptations for [Field Guide Context]

[Describe any modifications or specific considerations for applying this method 
in the Field Guide's context:
- Modified practices or workflows
- Context-specific examples
- Integration with other Field Guide methods]

## Questions We're Exploring

[List open questions that observations should help answer:
- Does this method behave as expected in this context?
- What modifications might be needed?
- How does it interact with other methods?]

## Supporting Evidence

<RelatedObservations />
```

## Frontmatter Fields

| Field | Required | Description |
|-------|----------|-------------|
| `sidebar_position` | Yes | Order in sidebar (number) |
| `title` | Yes | Full method name |
| `sidebar_label` | Yes | Short name for sidebar |
| `description` | Yes | Brief description for SEO/previews |
| `external_method.framework` | Yes | Framework slug (e.g., `dora`) |
| `external_method.method` | Yes | Method slug (e.g., `deployment-frequency`) |
| `foe_maturity` | Yes | FOE maturity level (determines folder: emerging or established) |
| `observations` | Yes | Array of linked observation slugs |

## Framework Slugs

| Framework | Slug |
|-----------|------|
| DORA | `dora` |
| BDD | `bdd` |
| Team Topologies | `team-topologies` |
| Continuous Delivery | `continuous-delivery` |
| Domain-Driven Design | `domain-driven-design` |
| Double Diamond | `double-diamond` |

## ExternalMethodHeader Component

The `<ExternalMethodHeader />` component:
- Reads `external_method` and `foe_maturity` from frontmatter
- Displays the source framework name
- Shows the FOE maturity badge
- Provides a link to the canonical method definition

No props are needed - it reads from the page's frontmatter automatically.

## Example: DORA Deployment Frequency in Agentic Coding

```yaml
---
sidebar_position: 1
title: "Deployment Frequency"
sidebar_label: "Deployment Frequency"
description: "How deployment frequency applies to AI-assisted development workflows"
external_method:
  framework: dora
  method: deployment-frequency
foe_maturity: hypothesized
observations: []
---

import ExternalMethodHeader from '@site/src/components/ExternalMethodHeader';
import RelatedObservations from '@site/src/components/RelatedObservations';

# Deployment Frequency

<ExternalMethodHeader />

## Why This Matters for Agentic Coding

Deployment frequency takes on special significance when working with AI coding 
assistants. The combination of faster code generation and the need for rapid 
verification creates both opportunities and risks...

## Adaptations for Agentic Coding

### Measure AI-Assisted vs Manual Deployments

Consider tracking:
- Deployments containing AI-generated code
- Time from AI code generation to production deployment
- Deployment success rate for AI-assisted vs manual changes

## Questions We're Exploring

- Does AI-assisted development naturally lead to higher deployment frequency?
- What deployment frequency is sustainable when AI is generating significant code volume?

## Supporting Evidence

<RelatedObservations />
```

## Linking Observations

When an observation supports this external method:

1. Add the observation slug to the `observations` array in frontmatter
2. The `<RelatedObservations />` component will automatically display linked observations
3. Update the method's maturity level as evidence accumulates
4. Move file from `emerging/` to `established/` when maturity reaches validated
