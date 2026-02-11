---
methodId: M242
displayed_sidebar: fieldGuideSidebar
sidebar_position: 22
title: "State Reconstruction"
sidebar_label: "State Reconstruction"
description: "Rebuilding entity state by replaying events (left fold)"
external_method:
  framework: event-sourcing
  method: state-reconstruction
  id: M242
foe_maturity: hypothesized
observations: []
---

import ExternalMethodHeader from '@site/src/components/ExternalMethodHeader';

# State Reconstruction

<ExternalMethodHeader />

## Why This Matters for Software Architecture

State reconstruction is the mechanism that makes Event Sourcing work. Understanding how to efficiently rebuild state from events is critical for performance and correctness.

**Architecture Benefits:**
- State is derived, not stored
- Enables temporal queries
- Supports debugging and auditing
- Allows aggregate logic evolution

**FOE Alignment:**
- **Understanding** - Explicit state transitions
- **Confidence** - Reproducible state from events
- **Fast Feedback** - Fast state loading with snapshots

## Adaptations for Software Architecture

### Reconstruction Pattern

```typescript
async function loadAggregate(id: string): Promise<Order> {
  // Load events
  const events = await eventStore.readStream(id);
  
  // Fold events into state
  return events.reduce(
    (order, event) => order.applyEvent(event),
    new Order(id)
  );
}
```

### Pure Apply Functions

```typescript
class Order {
  applyEvent(event: DomainEvent): Order {
    switch (event.type) {
      case 'OrderCreated':
        return new Order({
          id: event.orderId,
          status: 'pending'
        });
      case 'OrderSubmitted':
        return new Order({
          ...this,
          status: 'submitted'
        });
      default:
        return this;
    }
  }
}
```

## Questions We're Exploring

- How do we handle long event streams efficiently?
- When should we use snapshots vs full replay?
- How do we test reconstruction logic?

## Supporting Evidence

