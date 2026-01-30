---
methodId: M126
displayed_sidebar: fieldGuideSidebar
sidebar_position: 5
title: "Gherkin"
sidebar_label: "Gherkin"
description: "How Gherkin syntax enhances AI prompting and verification"
external_method:
  framework: bdd
  method: gherkin
  id: M126
foe_maturity: hypothesized
observations: []
---

import ExternalMethodHeader from '@site/src/components/ExternalMethodHeader';
import RelatedObservations from '@site/src/components/RelatedObservations';

# Gherkin

<ExternalMethodHeader />

## Why This Matters for Agentic Coding

Gherkin provides a formal syntax for behavior specifications that AI can both read and write reliably. The structured format reduces ambiguity in prompts and enables automated verification of AI output.

**Formal Structure Benefits:**
- AI can parse Gherkin reliably (it's a well-defined DSL)
- Keywords (Feature, Scenario, Given, When, Then) provide clear markers
- Existing Gherkin parsers can validate AI-generated specs

**Ubiquitous Understanding:**
- Gherkin appears extensively in AI training data
- AI can generate syntactically correct Gherkin with high reliability
- The format bridges human requirements and automated tests

## Adaptations for Agentic Coding

### Gherkin as Prompt Input

Feed Gherkin files directly to AI as implementation context:

```gherkin
Feature: Shopping Cart
  As a shopper
  I want to add items to my cart
  So that I can purchase them later

  Scenario: Add single item
    Given an empty shopping cart
    When I add a product priced at $10
    Then the cart total should be $10
    And the cart should contain 1 item
```

Then prompt: "Implement the shopping cart to satisfy these scenarios."

### AI-Generated Gherkin

Ask AI to convert requirements to Gherkin:

```
Convert this user story to Gherkin scenarios:

"Users should be able to filter products by price range. 
They set a min and max price, and only products within 
that range appear."
```

AI produces structured scenarios you can review and automate.

### Gherkin for Test Generation

Use Gherkin scenarios to generate step definitions:

1. Write or approve Gherkin scenarios
2. Ask AI to generate step implementations
3. Review and run the generated tests
4. Fix any failures with AI assistance

## Best Practices in Agentic Context

| Practice | Why It Helps |
|----------|--------------|
| Use concrete values | "priced at $10" not "priced at some amount" - gives AI specific test data |
| Include edge cases | AI may skip edges unless scenarios specify them |
| Background for setup | Reduces repetition AI might get wrong |
| Tags for organization | Helps AI understand context when given partial feature files |

## Questions We're Exploring

- Is Gherkin the optimal format for AI prompting, or are other DSLs better?
- Can AI maintain Gherkin quality as requirements evolve?
- How do we handle Gherkin scenarios that AI struggles to implement?

## Supporting Evidence

<RelatedObservations />
