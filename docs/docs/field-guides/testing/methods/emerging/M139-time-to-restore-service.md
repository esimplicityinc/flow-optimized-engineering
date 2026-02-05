---
methodId: M139
displayed_sidebar: fieldGuideSidebar
sidebar_position: 9
title: "Time to Restore Service"
sidebar_label: "Time to Restore Service"
description: "Measuring recovery speed and test reliability for debugging"
external_method:
  framework: dora
  method: time-to-restore-service
  id: M139
foe_maturity: hypothesized
observations: []
---

import ExternalMethodHeader from '@site/src/components/ExternalMethodHeader';

# Time to Restore Service

<ExternalMethodHeader />

## Why This Matters for Testing

Time to Restore Service reflects how quickly you can identify and fix issues. Good tests accelerate this - they help pinpoint the problem and verify the fix.

**Testing Benefits:**
- Tests help diagnose production issues faster
- Existing test suite verifies fixes work
- Test failures can alert before users notice
- Regression tests prevent reintroducing fixed bugs

**FOE Alignment:**
- **Fast Feedback** - Good tests reduce diagnosis time
- **Confidence** - Tests verify fixes before redeployment
- **Understanding** - Test failures explain what went wrong

## Adaptations for the Testing Guide

### Tests for Fast Recovery

Write tests that support incident response:

| Test Type | Recovery Benefit |
|-----------|-----------------|
| Health checks | Fast detection |
| Smoke tests | Quick verification |
| Unit tests | Precise diagnosis |
| Rollback tests | Safe reversion |

### Bug Fix Protocol

When fixing production issues:
1. Write test that reproduces the bug
2. Verify test fails
3. Implement fix
4. Verify test passes
5. Deploy with confidence

## Questions We're Exploring

- How do test suites impact MTTR?
- What test types are most valuable during incidents?
- How do you balance comprehensive testing with fast recovery?

## Supporting Evidence

