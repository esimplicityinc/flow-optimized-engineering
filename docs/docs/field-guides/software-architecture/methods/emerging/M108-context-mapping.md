---
methodId: M108
displayed_sidebar: fieldGuideSidebar
sidebar_position: 4
title: "Context Mapping"
sidebar_label: "Context Mapping"
description: "Documenting relationships between bounded contexts"
external_method:
  framework: domain-driven-design
  method: context-mapping
  id: M108
foe_maturity: hypothesized
observations:
  - O115
  - O121
---

import ExternalMethodHeader from '@site/src/components/ExternalMethodHeader';

# Context Mapping

<ExternalMethodHeader />

## Why This Matters for Software Architecture

Context Mapping documents how bounded contexts relate to each other. It makes integration patterns explicit and helps teams understand dependencies and communication needs.

**Architecture Benefits:**
- Visualizes system-wide architecture
- Makes integration patterns explicit
- Identifies coupling and dependency direction
- Guides API design between contexts

**FOE Alignment:**
- **Understanding** - Maps make relationships visible
- **Confidence** - Explicit contracts between contexts
- **Fast Feedback** - Clear ownership enables independent testing

## Adaptations for Software Architecture

### Common Relationship Patterns

| Pattern | Description | Use When |
|---------|-------------|----------|
| **Shared Kernel** | Shared model between contexts | Tight collaboration needed |
| **Customer-Supplier** | Upstream serves downstream | Clear dependency direction |
| **Conformist** | Downstream adopts upstream model | No influence over upstream |
| **Anti-Corruption Layer** | Translation layer | Protecting from external model |
| **Open Host Service** | Well-defined API | Multiple consumers |
| **Published Language** | Shared interchange format | Many integrations |

### Context Map Diagram

```
┌─────────────────┐     ACL     ┌─────────────────┐
│    Ordering     │◄───────────►│    Inventory    │
│    Context      │             │    Context      │
└────────┬────────┘             └────────┬────────┘
         │                               │
         │  Customer-Supplier            │
         ▼                               ▼
┌─────────────────┐             ┌─────────────────┐
│    Billing      │             │    Shipping     │
│    Context      │             │    Context      │
└─────────────────┘             └─────────────────┘
```

## Questions We're Exploring

- How do context maps evolve as systems grow?
- When should you introduce an anti-corruption layer?
- How do context maps relate to team boundaries?

## Supporting Evidence

