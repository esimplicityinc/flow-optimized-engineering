---
methodId: M121
displayed_sidebar: fieldGuideSidebar
sidebar_position: 7
title: "Executable Specifications"
sidebar_label: "Executable Specifications"
description: "Automated tests that serve as living documentation of product intent"
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
  - O124
---

import ExternalMethodHeader from '@site/src/components/ExternalMethodHeader';
import RelatedObservations from '@site/src/components/RelatedObservations';

# Executable Specifications

<ExternalMethodHeader />

## Why This Matters for Product Specification

Executable Specifications close the gap between what product specifies and what the system actually does. Traditional specifications become stale the moment they're written. Executable specifications run automatically -- if the system's behavior drifts from the spec, the spec fails and the drift is caught immediately.

**Specification Integrity:**
- Specifications that pass are guaranteed to match system behavior
- Stale specs fail, forcing them to be updated or removed
- Product intent is captured in a form that verifies itself

**Reduced Rework:**
- Misunderstandings between product and engineering surface as failing specs
- Acceptance criteria are verified automatically, not manually
- Regression is caught immediately when existing specs fail

## Adaptations for Product Specification

### Specification as the Source of Truth

Shift from documents to executable specifications as the authoritative record of product intent:

| Traditional | Executable Specifications |
|------------|---------------------------|
| Confluence page describing behavior | Gherkin feature file that runs as a test |
| Acceptance criteria in Jira ticket | Automated scenarios in the codebase |
| Manual QA checklist | CI pipeline that validates every commit |
| "I think it works like..." | "The spec passes, so it works like..." |

### Product Owns the Specification, Engineering Owns the Automation

Divide responsibility clearly:

1. **Product** writes Gherkin scenarios describing desired behavior
2. **Engineering** writes the step definitions that connect scenarios to code
3. **CI** runs specifications on every commit
4. **Product** reviews specification reports for coverage and accuracy

### Use Specification Reports as Product Documentation

Generate HTML reports from spec runs that serve as living product documentation:

- Feature-level summaries show what the system does
- Passing scenarios prove current behavior
- Failing scenarios highlight known gaps or regressions

## Questions We're Exploring

- How much of the specification can product maintain without engineering support?
- What's the right granularity for product-facing vs. engineering-facing specs?
- How should specifications handle behavior that's intentionally changed?

## Supporting Evidence

<RelatedObservations />
