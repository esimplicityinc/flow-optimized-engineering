---
methodId: M240
displayed_sidebar: fieldGuideSidebar
sidebar_position: 20
title: "Domain Event Modeling"
sidebar_label: "Domain Event Modeling"
description: "Modeling business activities as discrete events using ubiquitous language"
external_method:
  framework: event-sourcing
  method: domain-event-modeling
  id: M240
foe_maturity: hypothesized
observations: []
---

import ExternalMethodHeader from '@site/src/components/ExternalMethodHeader';

# Domain Event Modeling

<ExternalMethodHeader />

## Why This Matters for Software Architecture

Domain Event Modeling is the foundation of Event Sourcing. Properly modeled events capture business intent and enable powerful capabilities like audit trails, temporal queries, and system evolution.

**Architecture Benefits:**
- Events become the system contract
- Temporal reasoning is built-in
- Complete audit history
- Enables event-driven architecture

**FOE Alignment:**
- **Understanding** - Events make business concepts explicit
- **Confidence** - Immutable events prevent data corruption
- **Fast Feedback** - Events enable reactive systems

## Adaptations for Software Architecture

### Event Granularity

Choose event granularity based on architectural needs:

| Granularity | Use Case | Example |
|-------------|----------|---------|
| **Fine-grained** | Analytics, debugging | `ItemAddedToCart`, `QuantityChanged` |
| **Business-significant** | Integration, workflows | `OrderPlaced`, `PaymentReceived` |
| **Coarse-grained** - Simple notifications | `OrderModified` |

### Event Schema Design

```typescript
interface DomainEvent {
  // Identity
  eventId: UUID;
  occurredAt: Timestamp;
  
  // Context
  aggregateId: UUID;
  aggregateVersion: number;
  
  // Data
  // ... domain-specific fields
  
  // Correlation
  correlationId: UUID;
  causationId: UUID;
}
```

## Questions We're Exploring

- When should we use Event Sourcing vs simple domain events?
- How do we handle event schema evolution in practice?
- What are the performance implications of fine-grained events?

## Supporting Evidence

