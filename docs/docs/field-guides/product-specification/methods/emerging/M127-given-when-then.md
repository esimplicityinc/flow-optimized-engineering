---
methodId: M127
displayed_sidebar: fieldGuideSidebar
sidebar_position: 5
title: "Given-When-Then"
sidebar_label: "Given-When-Then"
description: "Structured template for expressing testable acceptance criteria"
external_method:
  framework: bdd
  method: given-when-then
  id: M127
foe_maturity: hypothesized
observations:
  - O100
  - O104
  - O105
  - O106
  - O107
---

import ExternalMethodHeader from '@site/src/components/ExternalMethodHeader';
import RelatedObservations from '@site/src/components/RelatedObservations';

# Given-When-Then

<ExternalMethodHeader />

## Why This Matters for Product Specification

Given-When-Then transforms vague acceptance criteria into precise, testable specifications. Each clause serves a specific purpose: Given establishes preconditions, When describes the trigger, Then defines the expected outcome. This structure eliminates the ambiguity that causes rework.

**Precision in Specification:**
- Preconditions are explicit, not assumed
- Actions are specific and singular
- Expected outcomes are observable and verifiable

**Bridge Between Product and Engineering:**
- Product owners can write and read Given-When-Then
- Engineers can implement directly from scenarios
- QA can derive test cases without interpretation

## Adaptations for Product Specification

### Use as the Standard Acceptance Criteria Format

Replace bullet-point acceptance criteria with Given-When-Then scenarios:

**Before (ambiguous):**
> - Users can reset their password
> - Email is sent

**After (precise):**
```gherkin
Given a registered user with email "user@example.com"
When they request a password reset
Then a reset email is sent to "user@example.com"
And the reset link expires after 24 hours
```

### Layer Scenarios by Priority

Not all scenarios are equally important. Layer them:

1. **Happy path** - The primary flow (must have)
2. **Business rules** - Constraints and validations (must have)
3. **Edge cases** - Unusual but valid scenarios (should have)
4. **Error handling** - What happens when things go wrong (should have)

### Connect to Example Mapping Output

Given-When-Then is the formalization step after Example Mapping:

- Each **rule** (blue card) generates one or more scenarios
- Each **example** (green card) becomes a specific Given-When-Then
- **Questions** (red cards) become scenarios once answered

## Questions We're Exploring

- What level of technical detail should Given-When-Then contain in product specs?
- How should Given-When-Then handle non-functional requirements?
- Can product owners maintain scenario quality without technical coaching?

## Supporting Evidence

<RelatedObservations />
