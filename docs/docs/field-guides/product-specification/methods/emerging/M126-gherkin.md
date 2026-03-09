---
methodId: M126
displayed_sidebar: fieldGuideSidebar
sidebar_position: 6
title: "Gherkin"
sidebar_label: "Gherkin"
description: "Domain-specific language for writing executable specifications"
external_method:
  framework: bdd
  method: gherkin
  id: M126
foe_maturity: hypothesized
observations:
  - O104
  - O106
  - O107
---

import ExternalMethodHeader from '@site/src/components/ExternalMethodHeader';
import RelatedObservations from '@site/src/components/RelatedObservations';

# Gherkin

<ExternalMethodHeader />

## Why This Matters for Product Specification

Gherkin provides a formal syntax for writing specifications that are both human-readable and machine-parseable. By using keywords like Feature, Scenario, Given, When, and Then, specifications become structured documents that can be automatically executed as tests -- closing the loop between what product specifies and what gets built.

**Living Documentation:**
- Gherkin files serve as both specification and test suite
- Specifications that pass are proven to match system behavior
- Out-of-date specs fail automatically, forcing updates

**Accessibility:**
- Natural language format is readable by non-technical stakeholders
- Keywords provide just enough structure for automation
- Scenarios can be reviewed in pull requests alongside code

## Adaptations for Product Specification

### Organize by Feature, Not by Sprint

Structure Gherkin files around features, not delivery timelines:

```gherkin
Feature: Password Reset
  Customers who forget their password can regain access
  through a secure email-based reset flow.

  Scenario: Successful password reset request
    Given a registered customer with email "user@example.com"
    When they submit a password reset request
    Then a reset email is sent to "user@example.com"

  Scenario: Reset with unregistered email
    Given no account exists for "unknown@example.com"
    When they submit a password reset request
    Then no email is sent
    And the same success message is displayed
```

### Use Feature Descriptions as Context

The Feature block in Gherkin supports a free-text description -- use it to capture the "why":

```gherkin
Feature: Order Cancellation
  Customers need to cancel orders before they ship.
  This reduces support tickets and improves satisfaction.
  Business rule: orders can only be cancelled before shipment.
```

### Background for Shared Preconditions

Use the `Background` keyword to avoid repeating common setup:

```gherkin
Feature: Shopping Cart
  Background:
    Given a logged-in customer
    And the product catalog is available

  Scenario: Add item to cart
    When they add "Widget A" to their cart
    Then the cart contains 1 item
```

## Questions We're Exploring

- Should product teams write Gherkin directly or convert from Given-When-Then?
- What tooling best supports Gherkin authoring by non-engineers?
- How should Gherkin specs be versioned relative to code changes?

## Supporting Evidence

<RelatedObservations />
