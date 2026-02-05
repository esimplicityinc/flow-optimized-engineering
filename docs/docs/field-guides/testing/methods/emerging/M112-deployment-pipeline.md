---
methodId: M112
displayed_sidebar: fieldGuideSidebar
sidebar_position: 7
title: "Deployment Pipeline"
sidebar_label: "Deployment Pipeline"
description: "Automated test execution through build, test, and deploy stages"
external_method:
  framework: continuous-delivery
  method: deployment-pipeline
  id: M112
foe_maturity: hypothesized
observations: []
---

import ExternalMethodHeader from '@site/src/components/ExternalMethodHeader';

# Deployment Pipeline

<ExternalMethodHeader />

## Why This Matters for Testing

The deployment pipeline is where tests prove their value. A well-designed pipeline runs tests at each stage, providing progressive confidence that changes are safe to deploy.

**Testing Benefits:**
- Automated test execution on every commit
- Progressive validation (unit → integration → E2E)
- Fast feedback on breaking changes
- Gate to prevent bad code from reaching production

**FOE Alignment:**
- **Fast Feedback** - Pipeline provides feedback within minutes
- **Confidence** - Each passing stage increases deployment confidence
- **Understanding** - Pipeline makes test results visible to all

## Adaptations for the Testing Guide

### Test Stage Organization

Structure tests to match pipeline stages:

| Stage | Tests | Duration |
|-------|-------|----------|
| Commit | Unit tests, linting | \<5 min |
| Acceptance | Integration, API tests | \<15 min |
| Performance | Load tests | \<30 min |
| Production | Smoke tests | \<5 min |

### Optimize for Fast Feedback

- Parallelize test execution
- Run fast tests first
- Fail fast on obvious errors
- Cache test dependencies

## Questions We're Exploring

- What's the optimal test distribution across pipeline stages?
- How do you handle flaky tests in the pipeline?
- When should tests block deployment vs warn?

## Supporting Evidence

