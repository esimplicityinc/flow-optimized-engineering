---
methodId: M127
displayed_sidebar: fieldGuideSidebar
sidebar_position: 5
title: "Given-When-Then"
sidebar_label: "Given-When-Then"
description: "Structured template for expressing test scenarios"
external_method:
  framework: bdd
  method: given-when-then
  id: M127
foe_maturity: hypothesized
observations: []
---

import ExternalMethodHeader from '@site/src/components/ExternalMethodHeader';

# Given-When-Then

<ExternalMethodHeader />

## Why This Matters for Testing

Given-When-Then provides a consistent structure that makes tests readable and complete. The format naturally separates setup, action, and verification - the three essential parts of any test.

**Testing Benefits:**
- Consistent test structure across the codebase
- Clear separation of concerns (setup vs action vs assertion)
- Readable by both technical and non-technical team members
- Forces explicit preconditions and expected outcomes

**FOE Alignment:**
- **Understanding** - Plain language format is accessible to all
- **Confidence** - Complete scenarios with explicit outcomes
- **Fast Feedback** - Structure makes failures easy to diagnose

## Adaptations for the Testing Guide

### Apply to Unit Tests

Even unit tests benefit from Given-When-Then thinking:

```javascript
describe('calculateDiscount', () => {
  it('applies 10% discount for orders over $100', () => {
    // Given
    const order = { total: 150 };
    
    // When
    const discount = calculateDiscount(order);
    
    // Then
    expect(discount).toBe(15);
  });
});
```

### Use for Test Documentation

When documenting test cases, use Given-When-Then as the format:

| Scenario | Given | When | Then |
|----------|-------|------|------|
| Valid login | Registered user | Correct credentials | Access granted |
| Invalid login | Registered user | Wrong password | Access denied |

## Questions We're Exploring

- Does Given-When-Then structure improve test quality metrics?
- How detailed should Given clauses be?
- When is Given-When-Then overkill for simple tests?

## Supporting Evidence

