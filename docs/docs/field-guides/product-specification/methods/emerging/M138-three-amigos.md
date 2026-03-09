---
methodId: M138
displayed_sidebar: fieldGuideSidebar
sidebar_position: 2
title: "Three Amigos"
sidebar_label: "Three Amigos"
description: "Cross-functional conversations to define acceptance criteria"
external_method:
  framework: bdd
  method: three-amigos
  id: M138
foe_maturity: hypothesized
observations:
  - O104
  - O105
  - O107
---

import ExternalMethodHeader from '@site/src/components/ExternalMethodHeader';
import RelatedObservations from '@site/src/components/RelatedObservations';

# Three Amigos

<ExternalMethodHeader />

## Why This Matters for Product Specification

Three Amigos brings together the three essential perspectives for writing good specifications: business (what do we need?), development (how will we build it?), and testing (how will we verify it?). Without all three perspectives, specifications tend to be incomplete, untestable, or technically infeasible.

**Reducing Rework:**
- Business perspective ensures specifications capture real user needs
- Development perspective catches technical constraints early
- Testing perspective ensures every requirement is verifiable

**Shared Ownership:**
- Specifications aren't "thrown over the wall" from product to engineering
- All three roles co-own the acceptance criteria
- Ambiguity is resolved in conversation, not in code

## Adaptations for Product Specification

### Make It a Regular Cadence

Schedule Three Amigos sessions as a recurring meeting rather than ad-hoc:

1. Product prepares 2-3 stories for discussion
2. 30-minute session with one representative from each role
3. Output: refined acceptance criteria and identified unknowns
4. Stories that pass Three Amigos are "specification-ready"

### Use Example Mapping as the Format

Combine Three Amigos with Example Mapping for structured output:

- **Yellow cards** - The user story being discussed
- **Blue cards** - Business rules identified by each perspective
- **Green cards** - Concrete examples that illustrate the rules
- **Red cards** - Questions that need research

### Define "Done" for Specifications

A specification isn't ready for development until:
- All three perspectives have reviewed it
- Acceptance criteria use Given-When-Then format
- Edge cases have been identified
- Open questions have been logged

## Questions We're Exploring

- How should Three Amigos adapt for teams without dedicated QA?
- What's the right ratio of preparation to conversation time?
- Can asynchronous Three Amigos work for distributed teams?

## Supporting Evidence

<RelatedObservations />
