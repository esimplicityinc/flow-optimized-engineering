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
import MethodMaturityTable from '@site/src/components/MethodMaturityTable';

# Testing

A collection of flow-optimized methods for testing strategies, test design, and quality assurance practices.

<GuideMaturitySummary 
  guideId="testing" 
  methods={[
    { maturity: 'validated' },
    { maturity: 'hypothesized' },
    { maturity: 'hypothesized' },
    { maturity: 'hypothesized' },
    { maturity: 'hypothesized' },
    { maturity: 'hypothesized' },
    { maturity: 'hypothesized' },
    { maturity: 'hypothesized' },
    { maturity: 'hypothesized' },
  ]} 
/>

## Methods at a Glance

<MethodMaturityTable
  guideId="testing"
  methods={[
    { id: 'M163', title: 'Red-Green-Refactor', maturity: 'hypothesized', priority: 'essential', slug: 'red-green-refactor', framework: 'tdd', frameworkTitle: 'TDD', description: 'The core TDD cycle of writing a failing test, making it pass, then improving the code' },
    { id: 'M164', title: 'Test Pyramid', maturity: 'hypothesized', priority: 'essential', slug: 'test-pyramid', framework: 'tdd', frameworkTitle: 'TDD', description: 'A model for balancing unit, integration, and E2E tests' },
    { id: 'M165', title: 'Test List', maturity: 'hypothesized', slug: 'test-list', framework: 'tdd', frameworkTitle: 'TDD', description: 'Writing out test cases before coding to guide development' },
    { id: 'M121', title: 'Executable Specifications', maturity: 'hypothesized', priority: 'essential', slug: 'executable-specifications', framework: 'bdd', frameworkTitle: 'BDD', description: 'Automated tests from human-readable specs that serve as living documentation' },
    { id: 'M127', title: 'Given-When-Then', maturity: 'validated', slug: 'given-when-then', framework: 'bdd', frameworkTitle: 'BDD', description: 'Template for expressing acceptance criteria as structured scenarios' },
    { id: 'M126', title: 'Gherkin', maturity: 'hypothesized', slug: 'gherkin', framework: 'bdd', frameworkTitle: 'BDD', description: 'DSL for writing executable specifications in human-readable format' },
    { id: 'M112', title: 'Deployment Pipeline', maturity: 'hypothesized', slug: 'deployment-pipeline', framework: 'continuous-delivery', frameworkTitle: 'Continuous Delivery', description: 'Automated build/test/deploy process that provides progressive confidence' },
    { id: 'M105', title: 'Change Failure Rate', maturity: 'hypothesized', slug: 'change-failure-rate', framework: 'dora', frameworkTitle: 'DORA', description: 'Measuring test effectiveness at catching issues before production' },
    { id: 'M139', title: 'Time to Restore Service', maturity: 'hypothesized', slug: 'time-to-restore-service', framework: 'dora', frameworkTitle: 'DORA', description: 'Measuring recovery speed when issues reach production' },
  ]}
/>

## What This Guide Covers

Testing provides the fast feedback and confidence that enables flow. Test strategy, test design, and test automation all determine how quickly developers can validate changes and ship with confidence. This guide collects methods for building and maintaining test suites that optimize for flow.

Good testing isn't about maximizing coverage metrics -- it's about building confidence through fast, reliable feedback that catches real problems without creating maintenance burden or slowing down development.

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

## Emerging Patterns

### Scenario-Based Validation Without Human Review

Recent observations from StrongDM's "Software Factory" approach (February 2026) suggest a radical shift in testing philosophy: treating code as probabilistic artifacts validated through external behavioral scenarios rather than human inspection. Their approach uses:

- **Executable Specifications** (M121) stored outside the codebase as "holdout sets"
- **Given-When-Then** (M127) scenarios validated probabilistically via "satisfaction" metrics
- **Digital Twin Universe**: Behavioral clones of external services for high-volume testing

While this approach requires significant token costs ($1,000/day per engineer), it demonstrates how AI-generated code can achieve production quality through comprehensive scenario validation rather than traditional code review.

**Key Insight:** The line between "test" and "production validation" blurs when agents can generate thousands of scenario runs per hour against realistic service simulations.

## Getting Started

1. Browse the methods in the table above
2. Start with the **Essential** methods -- Red-Green-Refactor, Test Pyramid, and Executable Specifications
3. Review the supporting observations to understand the evidence
4. Try the methods that fit your context
5. Consider [contributing your own observations](../contributing-observations)
