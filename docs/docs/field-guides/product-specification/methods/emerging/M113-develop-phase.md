---
methodId: M113
displayed_sidebar: fieldGuideSidebar
sidebar_position: 12
title: "Develop Phase"
sidebar_label: "Develop Phase"
description: "Divergent ideation and prototyping to explore potential solutions"
external_method:
  framework: double-diamond
  method: develop-phase
  id: M113
foe_maturity: hypothesized
observations:
  - O116
---

import ExternalMethodHeader from '@site/src/components/ExternalMethodHeader';
import RelatedObservations from '@site/src/components/RelatedObservations';

# Develop Phase

<ExternalMethodHeader />

## Why This Matters for Product Specification

The Develop Phase is where multiple solution approaches are explored through ideation and rapid prototyping. For product specification, this phase prevents premature commitment to a single approach. Specifications written after exploring multiple options are better because the team understands the trade-offs.

**Better Solution Selection:**
- Multiple approaches are explored before committing
- Prototypes validate feasibility before detailed specification
- Trade-offs are understood, not discovered during development

**Specification Confidence:**
- Specifications are based on validated prototypes, not assumptions
- Technical feasibility is confirmed before acceptance criteria are finalized
- User feedback on prototypes shapes the specification

## Adaptations for Product Specification

### Prototype Before Specifying in Detail

For complex features, validate the approach before writing detailed specs:

1. **Sketch** multiple solution approaches (wireframes, flow diagrams)
2. **Prototype** the most promising 2-3 options (low-fidelity is fine)
3. **Validate** with users or stakeholders
4. **Specify** the chosen approach with detailed Given-When-Then scenarios

### Use Spikes for Technical Uncertainty

When technical feasibility is uncertain, run time-boxed spikes:

- Spike output informs specification constraints
- "We can't do X because of Y" becomes a specification boundary
- Spike learnings are captured as context for the specification

### Parallel Exploration with Specification

For features with both UX and technical uncertainty:

| Track | Activity | Output |
|-------|----------|--------|
| Design | Wireframes, user flows, usability testing | Validated interaction patterns |
| Engineering | Technical spikes, API exploration | Feasibility constraints |
| Product | Example Mapping, scenario drafting | Draft acceptance criteria |

All three tracks converge into the final specification.

## Questions We're Exploring

- What's the right fidelity for prototypes before specification?
- How should prototype learnings be captured in specification format?
- Can AI accelerate the prototyping phase for product teams?

## Supporting Evidence

<RelatedObservations />
