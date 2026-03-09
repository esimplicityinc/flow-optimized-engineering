---
methodId: M120
displayed_sidebar: fieldGuideSidebar
sidebar_position: 3
title: "Example Mapping"
sidebar_label: "Example Mapping"
description: "Structured decomposition of stories into rules, examples, and questions"
external_method:
  framework: bdd
  method: example-mapping
  id: M120
foe_maturity: hypothesized
observations:
  - O104
  - O107
---

import ExternalMethodHeader from '@site/src/components/ExternalMethodHeader';
import RelatedObservations from '@site/src/components/RelatedObservations';

# Example Mapping

<ExternalMethodHeader />

## Why This Matters for Product Specification

Example Mapping provides a visual, structured technique for decomposing user stories into their component parts. The four-color card system (story, rules, examples, questions) makes the completeness of a specification immediately visible -- if a rule has no examples, it's under-specified; if there are many red question cards, the story isn't ready.

**Specification Completeness:**
- Every rule must have at least one concrete example
- Questions are captured rather than ignored or hand-waved
- The visual format makes gaps obvious at a glance

**Right-Sizing Stories:**
- Too many rules signal the story should be split
- Too many questions signal more research is needed
- The technique naturally reveals story complexity

## Adaptations for Product Specification

### Use as a Specification Readiness Check

Before a story enters development, run an Example Mapping session:

| Card Color | Content | Minimum Threshold |
|------------|---------|-------------------|
| Yellow | User story | 1 per session |
| Blue | Business rules | At least 2-3 per story |
| Green | Concrete examples | At least 1 per rule |
| Red | Open questions | Should be 0 before dev starts |

### Digital Example Mapping

For remote teams, translate the card format to digital tools:

- Use a shared board with colored sticky notes
- Each column represents one story
- Rules, examples, and questions nest under the story
- Questions get assigned owners and due dates

### Feed Examples into Given-When-Then

Example Mapping outputs feed directly into structured acceptance criteria:

1. **Rule** (blue card) becomes the scenario title
2. **Example** (green card) becomes a Given-When-Then scenario
3. **Questions** (red cards) become research tasks before the scenario is finalized

## Questions We're Exploring

- What's the optimal number of stories per Example Mapping session?
- How should Example Mapping adapt for technical stories vs. user-facing stories?
- Can AI generate candidate examples from a story description?

## Supporting Evidence

<RelatedObservations />
