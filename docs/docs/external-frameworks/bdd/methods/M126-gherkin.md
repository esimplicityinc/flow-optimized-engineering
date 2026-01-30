---
methodId: M126
displayed_sidebar: fieldGuideSidebar
sidebar_position: 5
title: Gherkin
pillar: formulation
description: A domain-specific language for writing executable specifications in a human-readable format.
---

# Gherkin

**Pillar:** Formulation

Gherkin is a domain-specific language (DSL) for writing executable specifications in a human-readable format. Created for the Cucumber testing framework by Aslak Hellesøy, Gherkin provides the syntax that makes BDD scenarios both readable by stakeholders and executable by automation tools.

## Definition

> A business-readable, domain-specific language that uses a structured syntax of keywords (Feature, Scenario, Given, When, Then) to describe software behavior in a way that can be automatically parsed and executed as tests.

## Why It Matters

Gherkin provides:

- **Single source of truth** - Specifications that are both documentation and tests
- **Stakeholder accessibility** - Non-technical team members can read and write specs
- **Tool ecosystem** - Supported by Cucumber, SpecFlow, Behave, and many others
- **Internationalization** - Available in 70+ languages

## Gherkin Keywords

### Feature

Describes a feature of the system. One feature per `.feature` file.

```gherkin
Feature: Shopping Cart
  As a customer
  I want to manage items in my cart
  So that I can purchase what I need
```

### Scenario

A concrete example of the feature's behavior.

```gherkin
Scenario: Add item to empty cart
  Given the cart is empty
  When I add "Blue T-Shirt" to the cart
  Then the cart contains 1 item
```

### Given / When / Then / And / But

The steps that make up a scenario (see [Given-When-Then](./M127-given-when-then.md) for details).

### Background

Steps that run before each scenario in a feature. Use for common setup.

```gherkin
Feature: Checkout Process

  Background:
    Given a registered user is logged in
    And the cart contains at least one item

  Scenario: Successful checkout
    When the user completes checkout
    Then an order confirmation is displayed

  Scenario: Failed payment
    When the payment is declined
    Then an error message is shown
```

### Scenario Outline

A template for running the same scenario with different data.

```gherkin
Scenario Outline: Discount tiers
  Given an order totaling <amount>
  When the discount is calculated
  Then the discount should be <discount>

  Examples:
    | amount | discount |
    | $50    | $0       |
    | $100   | $10      |
    | $200   | $30      |
    | $500   | $100     |
```

### Tags

Metadata for organizing and filtering scenarios.

```gherkin
@smoke @checkout
Feature: Checkout Process

  @happy-path
  Scenario: Successful checkout
    ...

  @edge-case @payment
  Scenario: Expired credit card
    ...
```

Common tag uses:
- `@smoke` - Quick sanity tests
- `@wip` - Work in progress
- `@slow` - Long-running tests
- `@manual` - Cannot be automated
- `@feature-name` - Group by feature area

## File Structure

```
features/
├── shopping_cart.feature
├── checkout.feature
├── user_authentication.feature
└── step_definitions/
    ├── cart_steps.js
    ├── checkout_steps.js
    └── auth_steps.js
```

## Complete Example

```gherkin
@shopping
Feature: Shopping Cart Management
  As an online shopper
  I want to manage items in my shopping cart
  So that I can review and modify my purchases before checkout

  Background:
    Given I am logged in as "customer@example.com"

  @smoke
  Scenario: Add item to cart
    Given my cart is empty
    When I add "Wireless Mouse" to my cart
    Then my cart should contain 1 item
    And the cart total should be $29.99

  @smoke
  Scenario: Remove item from cart
    Given my cart contains "Wireless Mouse"
    When I remove "Wireless Mouse" from my cart
    Then my cart should be empty

  Scenario Outline: Quantity limits
    Given my cart contains <initial> "USB Cable"
    When I change the quantity to <requested>
    Then the quantity should be <result>
    And I should see "<message>"

    Examples:
      | initial | requested | result | message              |
      | 1       | 5         | 5      |                      |
      | 1       | 0         | 0      | Item removed         |
      | 1       | 100       | 10     | Maximum quantity: 10 |
      | 1       | -1        | 1      | Invalid quantity     |
```

## Best Practices

### Do

| Practice | Rationale |
|----------|-----------|
| Use declarative steps | "Given I am logged in" not "Given I enter username and password and click login" |
| Keep scenarios independent | Each scenario should run in isolation |
| Use meaningful names | Scenario titles should describe the behavior |
| Leverage Background | Reduce duplication for common setup |
| Use tags strategically | Enable flexible test execution |

### Don't

| Anti-Pattern | Problem |
|--------------|---------|
| Imperative steps | Too detailed, brittle, hard to read |
| Scenario dependencies | Tests that must run in order |
| Too many steps | Scenarios become hard to understand |
| Incidental details | Including data that doesn't affect the outcome |

## Internationalization

Gherkin supports 70+ languages. Example in French:

```gherkin
# language: fr
Fonctionnalité: Panier d'achat
  
  Scénario: Ajouter un article
    Soit un panier vide
    Quand j'ajoute "T-shirt bleu" au panier
    Alors le panier contient 1 article
```

## Relationship to Other Methods

- **Given-When-Then** - The template that Gherkin implements
- **Executable Specifications** - Gherkin files become executable through step definitions
- **Example Mapping** - Output from mapping sessions is formulated in Gherkin

## FOE Alignment

Gherkin supports the FOE principle of **Optimize for Understanding**:

- Plain language syntax is accessible to all team members
- Structured format ensures consistency across the codebase
- Living documentation stays in sync with system behavior

## References

- Cucumber Documentation. "Gherkin Reference." https://cucumber.io/docs/gherkin/reference/
- Hellesøy, A. "The Cucumber Book." Pragmatic Bookshelf.
- Smart, J.F. (2014). "BDD in Action." Manning Publications.
