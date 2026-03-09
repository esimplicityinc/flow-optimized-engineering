---
methodId: M109
displayed_sidebar: fieldGuideSidebar
sidebar_position: 11
title: "Define Phase"
sidebar_label: "Define Phase"
description: "Convergent synthesis to frame the right problem before specifying solutions"
external_method:
  framework: double-diamond
  method: define-phase
  id: M109
foe_maturity: hypothesized
observations:
  - O116
---

import ExternalMethodHeader from '@site/src/components/ExternalMethodHeader';
import RelatedObservations from '@site/src/components/RelatedObservations';

# Define Phase

<ExternalMethodHeader />

## Why This Matters for Product Specification

The Define Phase narrows divergent discovery into a focused problem statement. This is where raw research becomes a clear brief that specifications can be written against. Without a well-defined problem, specifications tend to be unfocused -- trying to solve everything at once and solving nothing well.

**Focused Specifications:**
- A clear problem statement constrains what should be specified
- Success criteria provide measurable acceptance criteria
- Scope is defined before detailed specification begins

**Stakeholder Alignment:**
- The problem definition is agreed upon before solutions are proposed
- Trade-offs are explicit, not discovered during development
- Priority is set by the problem definition, not by the loudest voice

## Adaptations for Product Specification

### Write a Problem Brief Before Specifications

Every significant feature should have a brief problem statement:

```
Problem: Customers abandon checkout at the shipping address step.

Evidence: 34% drop-off rate at step 3, up from 12% last quarter.

Success criteria: Reduce step 3 drop-off rate to under 20%.

Constraints: Must work with existing address validation service.

Out of scope: International shipping (separate initiative).
```

### Use "How Might We" to Bridge to Specification

Translate problem statements into specification-ready questions:

- Problem: "Customers can't find their past orders"
- HMW: "How might we make order history accessible within 2 clicks?"
- Specification: "Given a logged-in customer, When they click 'My Orders', Then their last 20 orders are displayed"

### Define Phase Gates for Specification Readiness

| Gate | Criteria | Artifact |
|------|----------|----------|
| Problem defined | Clear statement with evidence | Problem brief |
| Success measurable | Quantitative criteria exist | Success metrics |
| Scope bounded | In/out of scope explicit | Scope document |
| Ready to specify | All gates passed | Green light for BDD sessions |

## Questions We're Exploring

- How formal should problem definitions be for different feature sizes?
- Should problem definitions be versioned alongside specifications?
- How do teams know when they've converged enough to start specifying?

## Supporting Evidence

<RelatedObservations />
