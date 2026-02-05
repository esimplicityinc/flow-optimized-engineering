---
displayed_sidebar: fieldGuideSidebar
sidebar_position: 1
title: Testing
adopted_methods:
  - framework: tdd
    method: red-green-refactor
    foe_maturity: hypothesized
  - framework: tdd
    method: test-pyramid
    foe_maturity: hypothesized
  - framework: tdd
    method: test-list
    foe_maturity: hypothesized
  - framework: bdd
    method: executable-specifications
    foe_maturity: hypothesized
  - framework: bdd
    method: given-when-then
    foe_maturity: hypothesized
  - framework: bdd
    method: gherkin
    foe_maturity: hypothesized
  - framework: continuous-delivery
    method: deployment-pipeline
    foe_maturity: hypothesized
  - framework: dora
    method: change-failure-rate
    foe_maturity: hypothesized
  - framework: dora
    method: time-to-restore-service
    foe_maturity: hypothesized
---

import GuideMaturitySummary from '@site/src/components/GuideMaturitySummary';
import MethodList from '@site/src/components/MethodList';

# Testing

A collection of flow-optimized methods for testing strategies, test design, and quality assurance practices.

## What This Guide Covers

Testing provides the fast feedback and confidence that enables flow. Test strategy, test design, and test automation all determine how quickly developers can validate changes and ship with confidence. This guide collects methods for building and maintaining test suites that optimize for flow.

Good testing isn't about maximizing coverage metrics—it's about building confidence through fast, reliable feedback that catches real problems without creating maintenance burden or slowing down development.

### Unit Testing Strategies

Test isolation, mocking strategies, fixture design, and test organization patterns that make unit tests fast, reliable, and maintainable.

### Integration & E2E Testing

Testing across service boundaries, browser testing, API testing, and strategies for balancing coverage with speed and reliability.

### TDD/BDD Practices

Test-first development, behavior-driven design, red-green-refactor cycles, and practices that use tests to drive better design.

### Testing in CI/CD

Test automation, pipeline integration, test parallelization, flaky test management, and strategies for keeping builds fast and green.

### Performance & Security Testing

Load testing, benchmarking, security scanning, and practices for validating non-functional requirements without slowing down delivery.

## Methods

This guide draws on methods from established testing frameworks. As we gather internal observations, methods will be promoted to internal status with FOE-specific guidance.

### From External Frameworks

#### TDD (Test-Driven Development)

- [Red-Green-Refactor](/docs/external-frameworks/tdd/methods/M163-red-green-refactor) - The core TDD cycle of writing a failing test, making it pass, then improving the code
- [Test Pyramid](/docs/external-frameworks/tdd/methods/M164-test-pyramid) - A model for balancing unit, integration, and E2E tests
- [Test List](/docs/external-frameworks/tdd/methods/M165-test-list) - Writing out test cases before coding to guide development

#### BDD (Behavior-Driven Development)

- [Executable Specifications](/docs/external-frameworks/bdd/methods/M121-executable-specifications) - Automated tests from human-readable specs that serve as living documentation
- [Given-When-Then](/docs/external-frameworks/bdd/methods/M127-given-when-then) - Template for expressing acceptance criteria as structured scenarios
- [Gherkin](/docs/external-frameworks/bdd/methods/M126-gherkin) - DSL for writing executable specifications in human-readable format

#### Continuous Delivery

- [Deployment Pipeline](/docs/external-frameworks/continuous-delivery/methods/M112-deployment-pipeline) - Automated build/test/deploy process that provides progressive confidence

#### DORA Metrics

- [Change Failure Rate](/docs/external-frameworks/dora/methods/M105-change-failure-rate) - Measuring test effectiveness at catching issues before production
- [Time to Restore Service](/docs/external-frameworks/dora/methods/M139-time-to-restore-service) - Measuring recovery speed when issues reach production

### Related Internal Methods

- [Consumer Contract Testing](/docs/field-guides/system-architecture/methods/established/M145-consumer-contract-testing) - Validate service integration points through consumer-driven contracts (in System Architecture guide)

## Getting Started

1. Browse the methods above
2. Check their maturity level to understand how well-tested they are
3. Review the supporting observations to understand the evidence
4. Try the methods that fit your context
5. Consider [contributing your own observations](../contributing-observations)
