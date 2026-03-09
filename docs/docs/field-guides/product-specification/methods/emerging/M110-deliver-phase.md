---
methodId: M110
displayed_sidebar: fieldGuideSidebar
sidebar_position: 13
title: "Deliver Phase"
sidebar_label: "Deliver Phase"
description: "Convergent validation through testing before release"
external_method:
  framework: double-diamond
  method: deliver-phase
  id: M110
foe_maturity: hypothesized
observations:
  - O116
---

import ExternalMethodHeader from '@site/src/components/ExternalMethodHeader';
import RelatedObservations from '@site/src/components/RelatedObservations';

# Deliver Phase

<ExternalMethodHeader />

## Why This Matters for Product Specification

The Deliver Phase validates that what was built matches what was specified. For product specification, this means closing the feedback loop -- specifications aren't just documents that launch development, they're the criteria against which the delivered product is validated.

**Specification Validation:**
- Executable specifications verify the implementation automatically
- Manual acceptance testing uses the same scenarios as acceptance criteria
- Gap between spec and delivery is measured, not assumed

**Iterative Refinement:**
- Delivery feedback updates specifications for the next iteration
- Specifications that proved wrong are corrected, not ignored
- The specification evolves to match real-world usage

## Adaptations for Product Specification

### Use Specifications as Acceptance Criteria

Delivery acceptance is defined by specification pass/fail:

| Validation Level | Method | Who |
|-----------------|--------|-----|
| Automated | Executable specifications run in CI | Engineering |
| Manual | Scenario walkthrough against specs | Product + QA |
| User | Beta testing against success criteria | Real users |

### Capture Delivery Learnings

What changes during delivery should feed back into specifications:

- **Scenarios that were wrong** - Update the specification
- **Missing scenarios discovered** - Add them for the next iteration
- **User feedback** - Create new user stories for the backlog
- **Technical constraints found** - Add as context to future specifications

### Progressive Delivery with Specification Gates

Release progressively, validating specifications at each stage:

1. **Dev complete** - All automated specifications pass
2. **QA validation** - Manual scenario walkthrough passes
3. **Beta release** - Subset of users validate success criteria
4. **General release** - Full rollout with monitoring against success metrics

## Questions We're Exploring

- How should specifications handle behavior changes discovered during delivery?
- What percentage of specifications should be automated vs. manual?
- How do delivery learnings flow into the next discovery cycle?

## Supporting Evidence

<RelatedObservations />
