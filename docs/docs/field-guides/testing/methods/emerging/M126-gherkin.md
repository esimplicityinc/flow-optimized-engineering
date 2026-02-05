---
methodId: M126
displayed_sidebar: fieldGuideSidebar
sidebar_position: 6
title: "Gherkin"
sidebar_label: "Gherkin"
description: "Domain-specific language for executable specifications"
external_method:
  framework: bdd
  method: gherkin
  id: M126
foe_maturity: hypothesized
observations: []
---

import ExternalMethodHeader from '@site/src/components/ExternalMethodHeader';

# Gherkin

<ExternalMethodHeader />

## Why This Matters for Testing

Gherkin is the language that makes BDD specifications executable. It provides keywords (Feature, Scenario, Given, When, Then) that tools like Cucumber can parse and connect to test automation.

**Testing Benefits:**
- Human-readable test specifications
- Executable by automation frameworks
- Supports data tables and scenario outlines for comprehensive coverage
- Tags enable flexible test organization and execution

**FOE Alignment:**
- **Understanding** - Plain language readable by all stakeholders
- **Fast Feedback** - Automated execution on every commit
- **Confidence** - Living documentation that proves behavior

## Adaptations for the Testing Guide

### Gherkin Best Practices

Write declarative, not imperative:

**Good:**
```gherkin
Given I am logged in as an admin
When I create a new user
Then the user should receive a welcome email
```

**Bad:**
```gherkin
Given I navigate to login page
And I enter "admin" in username field
And I enter "password" in password field
And I click login button
```

### Use Tags for Test Organization

```gherkin
@smoke @authentication
Feature: User Login

  @happy-path
  Scenario: Successful login
    ...

  @security @edge-case
  Scenario: Account lockout after failed attempts
    ...
```

## Questions We're Exploring

- What's the optimal ratio of Gherkin acceptance tests to unit tests?
- How do you keep step definitions DRY as scenarios multiply?
- When should you use Scenario Outline vs multiple scenarios?

## Supporting Evidence

