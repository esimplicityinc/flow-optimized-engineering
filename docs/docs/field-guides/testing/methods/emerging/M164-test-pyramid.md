---
methodId: M164
displayed_sidebar: fieldGuideSidebar
sidebar_position: 2
title: "Test Pyramid"
sidebar_label: "Test Pyramid"
description: "A model for balancing different types of automated tests"
external_method:
  framework: tdd
  method: test-pyramid
  id: M164
foe_maturity: hypothesized
observations: []
---

import ExternalMethodHeader from '@site/src/components/ExternalMethodHeader';

# Test Pyramid

<ExternalMethodHeader />

## Why This Matters for Testing

The Test Pyramid provides a framework for building a balanced, maintainable test portfolio. Without this guidance, teams often over-invest in slow, brittle E2E tests while under-investing in fast, focused unit tests.

**Testing Benefits:**
- Fast feedback from unit tests (the base)
- Confidence from integration tests (the middle)
- User journey validation from E2E tests (the top)
- Sustainable maintenance burden

**FOE Alignment:**
- **Fast Feedback** - Unit-heavy portfolio keeps CI fast
- **Confidence** - Each layer catches different types of issues
- **Understanding** - The pyramid model creates shared vocabulary

## Adaptations for the Testing Guide

### Assess Your Current Shape

Audit your test suite:

| Metric | Healthy | Warning |
|--------|---------|---------|
| Unit test % | 60-80% | \<50% |
| E2E runtime | \<15 min | \>30 min |
| Flaky rate | \<1% | \>5% |

### Push Down Rule

When a high-level test fails:
1. Write a unit test that catches the same bug
2. Fix the bug
3. Both tests now pass
4. You've improved your pyramid shape

## Questions We're Exploring

- How does the pyramid apply to different architectures (monolith vs microservices)?
- What's the right balance for API-heavy applications?
- How do contract tests fit into the pyramid?

## Supporting Evidence

