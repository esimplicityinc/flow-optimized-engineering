---
methodId: M243
displayed_sidebar: fieldGuideSidebar
sidebar_position: 23
title: "Projection Building"
sidebar_label: "Projection Building"
description: "Creating read-optimized views from event streams"
external_method:
  framework: event-sourcing
  method: projection-building
  id: M243
foe_maturity: hypothesized
observations: []
---

import ExternalMethodHeader from '@site/src/components/ExternalMethodHeader';

# Projection Building

<ExternalMethodHeader />

## Why This Matters for Software Architecture

Event stores are terrible for querying. Projections transform event streams into read-optimized views that support efficient queries while maintaining the event store as the source of truth.

**Architecture Benefits:**
- Optimized read models for each use case
- Multiple views from same events
- Rebuildable from event history
- Supports CQRS naturally

**FOE Alignment:**
- **Understanding** - Separate models for different concerns
- **Confidence** - Can rebuild if corrupted
- **Fast Feedback** - Fast queries on read models

## Adaptations for Software Architecture

### Projection Types

```typescript
// Standard projection
class OrderSummaryProjection {
  async handle(event: DomainEvent): Promise<void> {
    switch (event.type) {
      case 'OrderCreated':
        await db.insert('order_summaries', {
          orderId: event.orderId,
          status: 'pending'
        });
        break;
      case 'OrderSubmitted':
        await db.update('order_summaries',
          { orderId: event.orderId },
          { status: 'submitted' }
        );
        break;
    }
  }
}
```

### Synchronous vs Asynchronous

| Approach | Consistency | Use Case |
|----------|-------------|----------|
| **Synchronous** | Strong | User expects immediate read-after-write |
| **Asynchronous** | Eventual | Most read models, analytics |

## Questions We're Exploring

- How many projections should a system have?
- How do we handle eventual consistency in the UI?
- What are the operational challenges of managing projections?

## Supporting Evidence

