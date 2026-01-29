---
displayed_sidebar: fieldGuideSidebar
sidebar_position: 3
title: "Given-When-Then"
sidebar_label: "Given-When-Then"
description: "How structured acceptance criteria improve AI code generation"
external_method:
  framework: bdd
  method: given-when-then
foe_maturity: hypothesized
observations: []
---

import ExternalMethodHeader from '@site/src/components/ExternalMethodHeader';
import RelatedObservations from '@site/src/components/RelatedObservations';

# Given-When-Then

<ExternalMethodHeader />

## Why This Matters for Agentic Coding

Given-When-Then is a structured format that translates remarkably well to AI prompting. The explicit preconditions, actions, and outcomes give AI clear constraints for code generation:

**AI Benefits from Structure:**
- Unambiguous requirements reduce AI hallucination
- Each clause becomes a verification point
- The format naturally separates setup, action, and assertion

**Prompt-to-Test Pipeline:**
- Given-When-Then scenarios can be fed directly to AI as implementation specs
- AI can generate both the test and the implementation from the same scenario
- The scenario serves as the contract between human intent and AI output

## Adaptations for Agentic Coding

### Use Given-When-Then as Prompt Structure

When asking AI to implement features, structure your prompts as scenarios:

```
Implement the following behavior:

Given a user with email "test@example.com" exists
And the user's account is locked after 3 failed attempts
When the user attempts to login with correct password
Then the login should fail
And the message "Account locked" should be displayed
```

This gives AI clear success criteria for implementation.

### Generate Tests First, Then Implementation

Apply Test-Driven Agent Development with Given-When-Then:

1. Write scenarios in Given-When-Then format
2. Ask AI to generate tests from scenarios
3. Run tests and see them fail
4. Ask AI to implement code to pass the tests

### Use Scenarios as Verification Checklist

After AI generates code, use scenarios as a manual checklist:
- Can you verify each Given condition is handled?
- Does the code respond to the When trigger?
- Are all Then outcomes observable?

## Common Pitfalls in Agentic Context

1. **Vague Thens** - "Then it works correctly" gives AI no verification target
2. **Missing edge cases** - AI may only implement the happy path if scenarios don't cover errors
3. **Implementation leak** - Avoid "Given the database has row X" - keep it behavioral

## Questions We're Exploring

- Do Given-When-Then prompts produce more reliable AI output than unstructured prompts?
- Can AI help generate Given-When-Then scenarios from user stories?
- What's the optimal level of detail in scenarios for AI consumption?

## Supporting Evidence

<RelatedObservations />
