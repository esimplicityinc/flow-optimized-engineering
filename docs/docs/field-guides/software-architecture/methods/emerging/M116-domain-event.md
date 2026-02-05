---
methodId: M116
displayed_sidebar: fieldGuideSidebar
sidebar_position: 5
title: "Domain Event"
sidebar_label: "Domain Event"
description: "A record of something significant that happened in the domain"
external_method:
  framework: domain-driven-design
  method: domain-event
  id: M116
foe_maturity: hypothesized
observations: []
---

import ExternalMethodHeader from '@site/src/components/ExternalMethodHeader';

# Domain Event

<ExternalMethodHeader />

## Why This Matters for Software Architecture

Domain Events capture significant business occurrences as first-class objects. They enable loose coupling between components, support eventual consistency, and make system behavior explicit and auditable.

**Architecture Benefits:**
- Decouples producers from consumers
- Enables event-driven architecture
- Supports eventual consistency across aggregates
- Creates audit trail of business activity

**FOE Alignment:**
- **Understanding** - Events document what happened and why
- **Confidence** - Event handlers can be tested independently
- **Fast Feedback** - Async processing keeps main flow fast

## Adaptations for Software Architecture

### Event Design

Name events in past tense - they represent facts:

```typescript
// Good: Past tense, captures what happened
class OrderPlaced {
  orderId: string;
  customerId: string;
  items: OrderItem[];
  placedAt: Date;
}

// Bad: Command-like, imperative
class PlaceOrder { ... }
```

### Event Flow Patterns

```
┌─────────────┐    OrderPlaced    ┌─────────────┐
│   Order     │─────────────────►│  Inventory  │
│   Service   │                   │  Service    │
└─────────────┘                   └─────────────┘
       │                                 │
       │         OrderPlaced             │
       ▼                                 ▼
┌─────────────┐                   ┌─────────────┐
│   Billing   │                   │   Shipping  │
│   Service   │                   │   Service   │
└─────────────┘                   └─────────────┘
```

## Questions We're Exploring

- When should events be synchronous vs asynchronous?
- How do you handle event ordering and idempotency?
- What's the relationship between domain events and event sourcing?

## Supporting Evidence

