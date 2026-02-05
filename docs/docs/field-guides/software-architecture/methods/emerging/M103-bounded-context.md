---
methodId: M103
displayed_sidebar: fieldGuideSidebar
sidebar_position: 1
title: "Bounded Context"
sidebar_label: "Bounded Context"
description: "Defining boundaries within which a domain model is consistent"
external_method:
  framework: domain-driven-design
  method: bounded-context
  id: M103
foe_maturity: hypothesized
observations: []
---

import ExternalMethodHeader from '@site/src/components/ExternalMethodHeader';

# Bounded Context

<ExternalMethodHeader />

## Why This Matters for Software Architecture

Bounded Context is the foundational pattern for decomposing complex systems. It establishes explicit boundaries where terms have precise meanings, preventing the "big ball of mud" that emerges when everything shares one model.

**Architecture Benefits:**
- Clear module boundaries with explicit interfaces
- Terms have unambiguous meanings within each context
- Teams can work independently on different contexts
- Enables both modular monolith and microservices patterns

**FOE Alignment:**
- **Understanding** - Boundaries make system structure explicit
- **Confidence** - Changes within a context don't ripple unexpectedly
- **Fast Feedback** - Smaller, focused contexts are easier to test

## Adaptations for Software Architecture

### Identifying Bounded Contexts

Look for natural boundaries:
- Different language/terms for similar concepts
- Different rates of change
- Different team ownership
- Different data storage needs

### Context as Code Organization

Map bounded contexts to code structure:

```
src/
├── billing/          # Billing Context
│   ├── domain/
│   ├── application/
│   └── infrastructure/
├── inventory/        # Inventory Context
│   ├── domain/
│   ├── application/
│   └── infrastructure/
└── shipping/         # Shipping Context
    └── ...
```

## Questions We're Exploring

- How do you identify bounded context boundaries in legacy systems?
- What's the right size for a bounded context?
- How do bounded contexts map to team structure?

## Supporting Evidence

