---
methodId: M115
displayed_sidebar: fieldGuideSidebar
sidebar_position: 1
title: "Discovery Workshops"
sidebar_label: "Discovery Workshops"
description: "Collaborative sessions to explore requirements through concrete examples"
external_method:
  framework: bdd
  method: discovery-workshops
  id: M115
foe_maturity: hypothesized
observations:
  - O104
  - O105
  - O107
---

import ExternalMethodHeader from '@site/src/components/ExternalMethodHeader';
import RelatedObservations from '@site/src/components/RelatedObservations';

# Discovery Workshops

<ExternalMethodHeader />

## Why This Matters for Product Specification

Discovery Workshops are the primary mechanism for turning vague requirements into concrete, shared understanding. Before any specification is written, the team needs to explore what the software should actually do -- and Discovery Workshops surface assumptions, edge cases, and missing requirements that would otherwise be discovered late in development.

**Specification Quality:**
- Concrete examples replace abstract requirements
- Edge cases emerge through collaborative exploration
- Assumptions are surfaced and resolved before development starts

**Product-Engineering Alignment:**
- Business stakeholders and engineers explore requirements together
- Shared understanding replaces document handoffs
- Disagreements surface early when they're cheap to resolve

## Adaptations for Product Specification

### Run Before Sprint Planning

Schedule Discovery Workshops as the bridge between product ideas and sprint-ready work:

1. Product brings a user story or feature idea
2. The team explores it through concrete examples
3. Examples become acceptance criteria
4. Stories enter the sprint with shared understanding

### Focus on Examples, Not Solutions

Keep workshops focused on *what* the system should do, not *how*:

- "When a user submits an order over $100, they get free shipping" (good)
- "We need a discount service that checks order totals" (too technical)

### Capture Questions as First-Class Output

Questions that can't be answered in the workshop are valuable signals:

- They identify areas where requirements are incomplete
- They prevent premature specification of uncertain behavior
- They create a backlog of research needed before implementation

## Questions We're Exploring

- What's the optimal workshop duration for different complexity levels?
- How should workshops adapt when product and engineering are remote?
- Can AI assist in generating example scenarios during workshops?

## Supporting Evidence

<RelatedObservations />
