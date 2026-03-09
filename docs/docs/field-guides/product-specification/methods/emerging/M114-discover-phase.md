---
methodId: M114
displayed_sidebar: fieldGuideSidebar
sidebar_position: 10
title: "Discover Phase"
sidebar_label: "Discover Phase"
description: "Divergent exploration to understand the problem space before specifying"
external_method:
  framework: double-diamond
  method: discover-phase
  id: M114
foe_maturity: hypothesized
observations:
  - O116
---

import ExternalMethodHeader from '@site/src/components/ExternalMethodHeader';
import RelatedObservations from '@site/src/components/RelatedObservations';

# Discover Phase

<ExternalMethodHeader />

## Why This Matters for Product Specification

The Discover Phase prevents the most expensive specification mistake: solving the wrong problem. Before any requirements are written, teams need to explore the problem space broadly -- talking to users, observing behavior, and gathering data. Specifications written without discovery are based on assumptions, not evidence.

**Evidence-Based Specifications:**
- User research replaces stakeholder assumptions
- Multiple perspectives surface before convergence begins
- The problem is understood before solutions are proposed

**Avoiding Premature Specification:**
- Resist the urge to write acceptance criteria before understanding the problem
- Discovery outputs inform what should be specified, not how
- Time invested in discovery reduces specification rework

## Adaptations for Product Specification

### Discovery Before Specification

Make discovery a prerequisite for specification work:

| Phase | Activity | Output |
|-------|----------|--------|
| Discover | User interviews, data analysis, observation | Problem statement, user needs |
| Define | Synthesize findings into clear problem | Design brief, success criteria |
| Specify | Write acceptance criteria | Given-When-Then scenarios |

### Lightweight Discovery for Smaller Features

Not every feature needs extensive research. Scale discovery to match risk:

- **High risk/uncertainty** - Full user research, data analysis, stakeholder interviews
- **Medium risk** - Quick user conversations, analytics review
- **Low risk** - Team discussion, review of existing feedback

### Capture Discovery Artifacts

Discovery outputs feed directly into specifications:

- **User quotes** become context for feature descriptions
- **Behavioral patterns** become scenarios
- **Pain points** become acceptance criteria priorities

## Questions We're Exploring

- What's the minimum viable discovery for different feature sizes?
- How should discovery findings be stored for future specification reference?
- Can AI assist in synthesizing discovery data into specification inputs?

## Supporting Evidence

<RelatedObservations />
