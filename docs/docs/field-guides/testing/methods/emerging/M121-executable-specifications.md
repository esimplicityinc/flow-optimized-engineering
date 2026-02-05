---
methodId: M121
displayed_sidebar: fieldGuideSidebar
sidebar_position: 4
title: "Executable Specifications"
sidebar_label: "Executable Specifications"
description: "Living documentation that verifies system behavior"
external_method:
  framework: bdd
  method: executable-specifications
  id: M121
foe_maturity: hypothesized
observations:
  - O100
  - O104
  - O105
  - O106
  - O107
  - O120
  - O124
  - O157
---

import ExternalMethodHeader from '@site/src/components/ExternalMethodHeader';

# Executable Specifications

<ExternalMethodHeader />

## Why This Matters for Testing

Executable specifications solve the documentation problem - they're tests that can't become outdated because they're run continuously. When the system changes, either the spec passes or it fails, forcing synchronization.

**Testing Benefits:**
- Documentation that stays in sync with code
- Acceptance tests readable by non-technical stakeholders
- Clear mapping from requirements to verification
- Regression protection for business-critical behavior

**FOE Alignment:**
- **Understanding** - Plain language specs are accessible to everyone
- **Fast Feedback** - Automated execution catches behavior changes immediately
- **Confidence** - Passing specs prove the system does what it should

## Adaptations for the Testing Guide

### Acceptance Test Organization

Structure executable specifications by feature:

```
features/
├── user_registration.feature
├── checkout.feature
├── payment_processing.feature
└── step_definitions/
    ├── user_steps.js
    ├── checkout_steps.js
    └── payment_steps.js
```

### Integration with CI/CD

Run executable specifications as part of the deployment pipeline:
- After unit tests pass
- Before deployment to staging
- As smoke tests after deployment

## Questions We're Exploring

- What's the right granularity for executable specifications?
- How do you maintain step definitions as the codebase evolves?
- When should executable specifications replace or supplement unit tests?

## Supporting Evidence

