---
methodId: M248
displayed_sidebar: fieldGuideSidebar
sidebar_position: 28
title: "CQRS Integration"
sidebar_label: "CQRS Integration"
description: "Separating command (write) and query (read) responsibilities"
external_method:
  framework: event-sourcing
  method: cqrs-integration
  id: M248
foe_maturity: hypothesized
observations: []
---

import ExternalMethodHeader from '@site/src/components/ExternalMethodHeader';

# CQRS Integration

<ExternalMethodHeader />

## Why This Matters for Software Architecture

CQRS (Command Query Responsibility Segregation) separates read and write models. Combined with Event Sourcing, this enables optimized models for each purpose while maintaining a single source of truth in events.

**Architecture Benefits:**
- Optimized write model for business logic
- Optimized read models for queries
- Independent scaling
- Multiple read views from single source

**FOE Alignment:**
- **Understanding** - Separate models are simpler and clearer
- **Confidence** - Write model enforces invariants
- **Fast Feedback** - Fast reads from optimized read models

## Adaptations for Software Architecture

### Architecture Overview

```
Commands ──▶ Write Model (Aggregates) ──▶ Event Store ──▶ Projections ──▶ Read Models ──▶ Queries
                                              │
                                              ▼
                                         Event Bus
                                              │
                                              ▼
                                    Other Systems / Analytics
```

### Write Model

```typescript
class OrderCommandHandler {
  async handle(command: SubmitOrderCommand): Promise<void> {
    // Load aggregate
    const events = await eventStore.readStream(command.orderId);
    const order = events.reduce(
      (o, e) => o.applyEvent(e),
      new Order()
    );
    
    // Execute business logic
    const newEvents = order.submit(command);
    
    // Store events
    await eventStore.append(command.orderId, newEvents);
    
    // Publish
    await eventBus.publish(newEvents);
  }
}
```

### Read Model

```typescript
class OrderQueryHandler {
  async getOrderSummary(orderId: string): Promise<OrderSummary> {
    // Direct query on denormalized read model
    return await readModel.findById(orderId);
  }
  
  async searchOrders(criteria: SearchCriteria): Promise<OrderSearchResult> {
    // Use read model indexes
    return await readModel.search(criteria);
  }
}
```

### Event Sourcing vs CQRS

| Aspect | Event Sourcing | CQRS |
|--------|---------------|------|
| **Focus** | How state is stored | Separating reads/writes |
| **Requires Other?** | No | No |
| **Common Use** | Often together | Often without ES |

**Key Point:** They are independent patterns that complement each other well, but neither requires the other.

## Questions We're Exploring

- When is CQRS overkill for a system?
- How do we handle eventual consistency in the UI?
- What are the operational challenges of maintaining separate models?

## Supporting Evidence

