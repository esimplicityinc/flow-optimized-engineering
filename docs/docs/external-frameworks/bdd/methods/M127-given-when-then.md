---
methodId: M127
displayed_sidebar: fieldGuideSidebar
sidebar_position: 4
title: Given-When-Then
pillar: formulation
description: A template for expressing acceptance criteria as structured scenarios readable by humans and computers.
---

# Given-When-Then

**Pillar:** Formulation

Given-When-Then is a template for writing acceptance criteria as structured scenarios. Developed by Dan North and Chris Matts, it provides a consistent format that is readable by both humans and computers, bridging the gap between business requirements and automated tests.

## Definition

> A structured template for expressing a scenario as a sequence of preconditions (Given), an action (When), and expected outcomes (Then), creating specifications that serve as both documentation and automated tests.

## Why It Matters

The Given-When-Then format provides:

- **Ubiquitous language** - Business and technical teams use the same vocabulary
- **Clear structure** - Consistent format makes scenarios easy to read and write
- **Testable specifications** - Scenarios can be directly automated
- **Living documentation** - Tests that describe behavior in plain language

## The Template

### Given (Preconditions)

Describes the initial context or state of the system before the action occurs.

- Sets up the scenario
- Establishes what already exists
- Can include multiple Given clauses connected with "And"

**Examples:**
- Given a registered user "alice@example.com"
- Given the shopping cart contains 3 items
- Given today is December 25th

### When (Action)

Describes the action or event that triggers the behavior being specified.

- Usually a single action
- Represents what the user or system does
- The pivot point of the scenario

**Examples:**
- When the user clicks "Submit Order"
- When the payment is processed
- When midnight passes

### Then (Outcome)

Describes the expected result or observable change after the action.

- Verifiable outcomes
- Can include multiple Then clauses connected with "And"
- Should be observable, not internal state

**Examples:**
- Then the order confirmation is displayed
- Then an email is sent to "alice@example.com"
- Then the inventory is reduced by 3

## Connectors: And / But

Use "And" and "But" to add additional clauses without repeating Given/When/Then:

```gherkin
Given a user is logged in
And the user has items in their cart
And the user has a valid payment method
When the user clicks "Checkout"
Then the order is created
And the cart is emptied
But the wishlist remains unchanged
```

## Example Scenarios

### Simple Scenario

```gherkin
Scenario: Successful login
  Given a registered user with email "user@example.com"
  And the password is "correct-password"
  When the user submits the login form
  Then the user is redirected to the dashboard
  And a welcome message is displayed
```

### Scenario with Business Rules

```gherkin
Scenario: Discount applied for orders over $100
  Given a shopping cart with items totaling $150
  And a discount code "SAVE10" for 10% off orders over $100
  When the user applies the discount code
  Then the order total becomes $135
  And the discount is shown as "$15 off"
```

### Edge Case Scenario

```gherkin
Scenario: Cannot checkout with empty cart
  Given the user is logged in
  And the shopping cart is empty
  When the user navigates to checkout
  Then an error message "Your cart is empty" is displayed
  And the checkout process does not proceed
```

## Writing Good Scenarios

### Do

| Practice | Example |
|----------|---------|
| Use domain language | "Given a premium subscriber" not "Given user.type = 'premium'" |
| Be specific | "Given 3 items in cart" not "Given some items in cart" |
| Focus on behavior | "Then error is displayed" not "Then exception is thrown" |
| One scenario, one behavior | Test one thing per scenario |

### Don't

| Anti-Pattern | Problem |
|--------------|---------|
| Implementation details | "Given the database has a row..." |
| UI mechanics | "When user clicks the blue button at coordinates..." |
| Multiple behaviors | Testing login AND checkout in one scenario |
| Vague outcomes | "Then it works correctly" |

## Origins and Influences

Given-When-Then was influenced by Hoare logic's precondition-action-postcondition pattern from computer science. Dan North and Chris Matts adapted this formal concept into a human-readable format that could serve as both specification and test.

The format has since been adopted beyond BDD into general acceptance criteria writing, even when not automated.

## Relationship to Other Methods

- **Gherkin** - The language that implements Given-When-Then syntax
- **Example Mapping** - Green cards become Given-When-Then scenarios
- **Executable Specifications** - Given-When-Then scenarios become automated tests

## FOE Alignment

Given-When-Then supports multiple FOE principles:

- **Optimize for Understanding** - Plain language format is accessible to all stakeholders
- **Build Confidence** - Structured format ensures scenarios are complete and testable
- **Fast Feedback** - Automated scenarios provide immediate verification

## References

- North, D. (2006). "Introducing BDD." Better Software Magazine. https://dannorth.net/introducing-bdd/
- North, D. & Matts, C. "Given-When-Then" origin story
- Hoare, C.A.R. (1969). "An Axiomatic Basis for Computer Programming." Communications of the ACM.
