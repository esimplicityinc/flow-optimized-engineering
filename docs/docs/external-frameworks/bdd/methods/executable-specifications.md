---
sidebar_position: 6
title: Executable Specifications
pillar: automation
description: Connecting formulated examples to the system as automated tests that guide development and verify behavior.
---

# Executable Specifications

**Pillar:** Automation

Executable Specifications are the automation layer of BDD, where formulated Gherkin scenarios are connected to the actual system through step definitions. This creates living documentation that verifies the system behaves as specified while serving as always-up-to-date documentation.

## Definition

> Automated tests derived from human-readable specifications (Gherkin scenarios) that both verify system behavior and serve as living documentation, staying in sync with the actual system through continuous execution.

## Why It Matters

Executable Specifications provide:

- **Living documentation** - Specs that can't become outdated because they're verified continuously
- **Fast feedback** - Immediate notification when behavior changes unexpectedly
- **Regression protection** - Automated verification that existing behavior still works
- **Development guidance** - Red-green-refactor cycle driven by business examples

## How It Works

### The Connection: Step Definitions

Step definitions are code that connects Gherkin steps to system actions:

**Gherkin Step:**
```gherkin
Given a user "alice" with password "secret123"
```

**Step Definition (JavaScript/Cucumber):**
```javascript
Given('a user {string} with password {string}', async function(username, password) {
  await userService.createUser(username, password);
});
```

**Step Definition (Python/Behave):**
```python
@given('a user "{username}" with password "{password}"')
def step_create_user(context, username, password):
    context.user = UserService.create(username, password)
```

### The Automation Pyramid

Executable specifications typically operate at the acceptance test level:

```
        /\
       /  \  UI Tests (few)
      /----\
     /      \  Acceptance Tests ← BDD scenarios live here
    /--------\
   /          \  Integration Tests
  /------------\
 /              \  Unit Tests (many)
/________________\
```

## Implementation Patterns

### Outside-In Development

1. **Write the scenario** (Red) - Scenario fails because feature doesn't exist
2. **Implement step definitions** - Connect steps to (non-existent) code
3. **Write the code** (Green) - Implement until scenario passes
4. **Refactor** - Clean up while keeping scenarios green

### Step Definition Organization

```
features/
├── shopping_cart.feature
├── checkout.feature
└── step_definitions/
    ├── common_steps.js      # Shared steps (login, navigation)
    ├── cart_steps.js        # Cart-specific steps
    ├── checkout_steps.js    # Checkout-specific steps
    └── support/
        ├── world.js         # Test context/state
        └── hooks.js         # Before/After hooks
```

### Reusable Steps

Write steps that can be reused across scenarios:

```javascript
// Generic step that works for any item
Given('the cart contains {string}', async function(itemName) {
  await this.cart.addItem(itemName);
});

// Can be used in multiple scenarios:
// Given the cart contains "Blue T-Shirt"
// Given the cart contains "Wireless Mouse"
// Given the cart contains "Coffee Mug"
```

## Best Practices

### Step Definition Guidelines

| Practice | Example |
|----------|---------|
| Keep steps declarative | `Given I am logged in` not `Given I enter credentials and click submit` |
| Use parameters | `{string}`, `{int}` for flexibility |
| Share state via context | Store data in `this` or `context` object |
| Handle async properly | Use `async/await` or promises |

### Maintaining Living Documentation

| Practice | Rationale |
|----------|-----------|
| Run specs in CI/CD | Catch failures immediately |
| Fix broken specs immediately | Don't let them become ignored |
| Review specs in PRs | Ensure they still make sense |
| Generate reports | Make documentation accessible |

## Common Challenges

### Flaky Tests

**Symptoms:** Tests pass sometimes, fail sometimes

**Solutions:**
- Wait for elements/conditions explicitly
- Isolate test data
- Reset state between scenarios
- Avoid time-dependent tests

### Slow Test Suites

**Symptoms:** Feedback takes too long

**Solutions:**
- Run at appropriate level (not everything through UI)
- Parallelize execution
- Use tags to run subsets
- Optimize setup/teardown

### Brittle Step Definitions

**Symptoms:** Small changes break many tests

**Solutions:**
- Use page objects or screen objects
- Abstract implementation details
- Keep steps at behavior level

## Tools and Frameworks

| Language | Framework | Notes |
|----------|-----------|-------|
| JavaScript | Cucumber.js | Official Cucumber for Node |
| Java | Cucumber-JVM | Enterprise-grade, Spring integration |
| Python | Behave | Pythonic BDD framework |
| Ruby | Cucumber | Original implementation |
| .NET | SpecFlow | Visual Studio integration |
| Go | Godog | Official Cucumber for Go |

## Example: Complete Flow

**Feature File:**
```gherkin
Feature: User Registration

  Scenario: Successful registration
    Given I am on the registration page
    When I register with:
      | email    | alice@example.com |
      | password | SecurePass123!    |
    Then I should see "Welcome, alice!"
    And a confirmation email should be sent to "alice@example.com"
```

**Step Definitions:**
```javascript
const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('chai');

Given('I am on the registration page', async function() {
  await this.page.goto('/register');
});

When('I register with:', async function(dataTable) {
  const data = dataTable.rowsHash();
  await this.page.fill('#email', data.email);
  await this.page.fill('#password', data.password);
  await this.page.click('#submit');
  this.registeredEmail = data.email;
});

Then('I should see {string}', async function(expectedText) {
  const content = await this.page.textContent('body');
  expect(content).to.include(expectedText);
});

Then('a confirmation email should be sent to {string}', async function(email) {
  const emails = await this.emailService.getEmailsTo(email);
  expect(emails).to.have.lengthOf(1);
  expect(emails[0].subject).to.include('Confirm your registration');
});
```

## FOE Alignment

Executable Specifications strongly support FOE principles:

- **Fast Feedback Loops** - Automated execution provides immediate feedback on behavior changes
- **Build Confidence** - Passing specs prove the system does what it's supposed to do
- **Optimize for Understanding** - Living documentation that stakeholders can read and trust

## References

- Cucumber Documentation. "Step Definitions." https://cucumber.io/docs/cucumber/step-definitions/
- Smart, J.F. (2014). "BDD in Action." Manning Publications.
- Wynne, M. & Hellesøy, A. "The Cucumber Book." Pragmatic Bookshelf.
- Adzic, G. (2011). "Specification by Example." Manning Publications.
