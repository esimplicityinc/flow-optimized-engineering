---
methodId: M163
displayed_sidebar: fieldGuideSidebar
sidebar_position: 1
title: "Red-Green-Refactor"
sidebar_label: "Red-Green-Refactor"
description: "The core TDD cycle for building tested code incrementally"
external_method:
  framework: tdd
  method: red-green-refactor
  id: M163
foe_maturity: hypothesized
observations: []
---

import ExternalMethodHeader from '@site/src/components/ExternalMethodHeader';

# Red-Green-Refactor

<ExternalMethodHeader />

## Why This Matters for Testing

Red-Green-Refactor is the fundamental rhythm that transforms testing from an afterthought into a design tool. By writing tests first, you ensure every piece of functionality has verification from the start.

**Testing Benefits:**
- Tests are written before code exists, ensuring testability
- Small cycles provide immediate feedback on test design
- Refactor phase includes improving test code, not just production code
- Each cycle adds to your regression test suite

**FOE Alignment:**
- **Fast Feedback** - Each cycle takes minutes, revealing issues immediately
- **Confidence** - Growing test suite proves the code works
- **Understanding** - Tests serve as executable documentation

## Adaptations for the Testing Guide

### Apply to Test Infrastructure

Use red-green-refactor when building test utilities:

1. Write a test for the helper function you need
2. Implement the helper minimally
3. Refactor for reusability

### Use for Debugging

When a bug is reported:

1. **Red** - Write a failing test that reproduces the bug
2. **Green** - Fix the bug
3. **Refactor** - Ensure the fix is clean

This ensures the bug stays fixed.

## Questions We're Exploring

- What cycle duration is optimal for different types of tests?
- How does red-green-refactor change when writing integration vs unit tests?
- Can AI effectively participate in the red-green-refactor cycle?

## Supporting Evidence

