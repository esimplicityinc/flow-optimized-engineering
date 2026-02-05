---
methodId: M165
displayed_sidebar: fieldGuideSidebar
sidebar_position: 3
title: "Test List"
sidebar_label: "Test List"
description: "Planning test cases before coding to guide development"
external_method:
  framework: tdd
  method: test-list
  id: M165
foe_maturity: hypothesized
observations: []
---

import ExternalMethodHeader from '@site/src/components/ExternalMethodHeader';

# Test List

<ExternalMethodHeader />

## Why This Matters for Testing

The Test List is the planning step that makes TDD effective. Without it, developers often forget edge cases or get lost in implementation details. The list provides a roadmap for comprehensive coverage.

**Testing Benefits:**
- Captures edge cases before you forget them
- Provides clear progress tracking
- Helps sequence tests from simple to complex
- Reduces cognitive load during implementation

**FOE Alignment:**
- **Understanding** - The list makes test strategy explicit
- **Confidence** - Comprehensive lists ensure nothing is forgotten
- **Fast Feedback** - Proper sequencing gives feedback on core functionality first

## Adaptations for the Testing Guide

### Template for Test Lists

```markdown
## Feature: [Feature Name]

### Happy Path
- [ ] Basic success case
- [ ] Variation A
- [ ] Variation B

### Error Cases
- [ ] Invalid input type
- [ ] Missing required field
- [ ] Boundary exceeded

### Edge Cases
- [ ] Empty input
- [ ] Maximum size
- [ ] Concurrent access
```

### Use for Test Planning

Before implementing a feature:
1. Brainstorm all test cases
2. Sequence from simple to complex
3. Estimate effort
4. Identify gaps in understanding

## Questions We're Exploring

- Should test lists be persistent artifacts or throwaway planning tools?
- How detailed should list items be?
- Can AI help generate comprehensive test lists?

## Supporting Evidence

