---
methodId: M142
displayed_sidebar: fieldGuideSidebar
sidebar_position: 4
title: "User Story Template"
sidebar_label: "User Story Template"
description: "Expressing requirements as role-feature-benefit statements"
external_method:
  framework: bdd
  method: user-story-template
  id: M142
foe_maturity: hypothesized
observations:
  - O107
---

import ExternalMethodHeader from '@site/src/components/ExternalMethodHeader';
import RelatedObservations from '@site/src/components/RelatedObservations';

# User Story Template

<ExternalMethodHeader />

## Why This Matters for Product Specification

The User Story Template ("As a [role], I want [feature], so that [benefit]") forces every requirement to answer three questions: who needs it, what they need, and why they need it. This prevents the common specification failure mode of documenting features without connecting them to user value.

**Value-Driven Specifications:**
- The "so that" clause forces articulation of business value
- The "as a" clause identifies the user segment
- Requirements without clear benefit are flagged for discussion

**Conversation Starter, Not Contract:**
- User stories are intentionally lightweight -- they're prompts for conversation
- The real specification emerges from Discovery Workshops and Three Amigos
- Stories that need pages of detail may need to be decomposed

## Adaptations for Product Specification

### Enforce the "So That" Clause

The most commonly skipped part of the template is "so that" -- make it mandatory:

| Story Component | Purpose | Anti-Pattern |
|----------------|---------|--------------|
| As a [role] | Who benefits | "As a user" (too vague) |
| I want [feature] | What they need | "I want a button" (solution, not need) |
| So that [benefit] | Why it matters | Omitting this entirely |

### Use Stories as Entry Points

User stories are the starting point for the specification workflow:

1. **Product writes** the user story
2. **Three Amigos** explores it through examples
3. **Example Mapping** decomposes it into rules and examples
4. **Given-When-Then** formalizes the acceptance criteria
5. **Executable Specifications** automate verification

### INVEST Criteria for Story Quality

Use the INVEST checklist to evaluate story quality:

- **I**ndependent - Can be developed without other stories
- **N**egotiable - Details emerge through conversation
- **V**aluable - Delivers user or business value
- **E**stimable - Team can roughly size it
- **S**mall - Fits within a single iteration
- **T**estable - Has clear acceptance criteria

## Questions We're Exploring

- Should AI-generated stories follow the same template?
- How do technical stories (no direct user) fit the template?
- What's the right level of detail before a story enters Discovery Workshops?

## Supporting Evidence

<RelatedObservations />
