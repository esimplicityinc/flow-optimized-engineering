---
methodId: M105
displayed_sidebar: fieldGuideSidebar
sidebar_position: 8
title: "Change Failure Rate"
sidebar_label: "Change Failure Rate"
description: "Measuring test effectiveness at catching issues before production"
external_method:
  framework: dora
  method: change-failure-rate
  id: M105
foe_maturity: hypothesized
observations:
  - O110
---

import ExternalMethodHeader from '@site/src/components/ExternalMethodHeader';

# Change Failure Rate

<ExternalMethodHeader />

## Why This Matters for Testing

Change Failure Rate is the ultimate measure of test effectiveness. If tests are catching bugs, failures should be rare. A high failure rate indicates gaps in your test coverage or strategy.

**Testing Benefits:**
- Quantifies test suite effectiveness
- Identifies coverage gaps (repeated failure patterns)
- Justifies investment in test infrastructure
- Balances speed vs quality trade-offs

**FOE Alignment:**
- **Confidence** - Low failure rate means high confidence in changes
- **Fast Feedback** - Tracking failures reveals where feedback is missing
- **Understanding** - Metric creates shared quality vocabulary

## Adaptations for the Testing Guide

### Track and Analyze Failures

For each production failure:
1. Why didn't tests catch it?
2. What test would have caught it?
3. Why wasn't that test written?

### Failure Categories

| Category | Test Response |
|----------|--------------|
| Logic error | Add unit test |
| Integration issue | Add integration test |
| Edge case | Add to test list |
| Performance | Add load test |

## Questions We're Exploring

- What's an acceptable change failure rate for different domains?
- How do you attribute failures to specific test gaps?
- Does more testing always reduce failure rate?

## Supporting Evidence

