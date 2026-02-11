---
methodId: M243
displayed_sidebar: fieldGuideSidebar
sidebar_position: 4
title: Projection Building
pillar: operational-patterns
description: Creating read-optimized views from event streams for efficient querying.
---

# Projection Building

**Pillar:** Operational Patterns

Projection Building is the process of creating read-optimized views from event streams. These projections (also called read models) enable efficient querying while maintaining the event store as the source of truth.

## Definition

> A projection is a read-optimized representation of event stream data, built by processing events and materializing views optimized for specific query patterns. Projections are derived data that can be rebuilt from the event store at any time.

## Why It Matters

Event stores are terrible for querying:
- **Sequential access only** - No indexes on event data
- **Stream-per-aggregate** - Can't query across aggregates easily
- **Immutable events** - Can't update for changing query needs

Projections solve these problems:
- **Optimized for queries** - Proper indexing, denormalization
- **Multiple views** - Different projections for different use cases
- **Eventually consistent** - Async building doesn't block writes
- **Reproducible** - Can rebuild from events if corrupted

## Projection Types

### 1. Standard Projections (Single Stream)

Project from one aggregate stream:

```typescript
// Projection: Order Summary
interface OrderSummary {
  orderId: string;
  customerId: string;
  totalAmount: number;
  status: OrderStatus;
  itemCount: number;
  lastUpdated: Date;
}

class OrderSummaryProjection {
  async handle(event: DomainEvent): Promise<void> {
    switch (event.type) {
      case 'OrderCreated':
        await this.db.insert('order_summaries', {
          orderId: event.orderId,
          customerId: event.customerId,
          status: 'pending',
          totalAmount: 0,
          itemCount: 0,
          lastUpdated: event.occurredAt
        });
        break;
        
      case 'OrderLineAdded':
        await this.db.update('order_summaries', 
          { orderId: event.orderId },
          { 
            $inc: { 
              totalAmount: event.lineItem.price * event.lineItem.quantity,
              itemCount: event.lineItem.quantity 
            },
            $set: { lastUpdated: event.occurredAt }
          }
        );
        break;
        
      case 'OrderSubmitted':
        await this.db.update('order_summaries',
          { orderId: event.orderId },
          { 
            status: 'submitted',
            lastUpdated: event.occurredAt 
          }
        );
        break;
    }
  }
}
```

### 2. Cross-Aggregate Projections

Combine events from multiple streams:

```typescript
// Projection: Customer Order History
class CustomerOrderHistoryProjection {
  async handle(event: DomainEvent): Promise<void> {
    switch (event.type) {
      case 'OrderCreated':
        await this.db.insert('customer_orders', {
          customerId: event.customerId,
          orderId: event.orderId,
          createdAt: event.occurredAt,
          status: 'pending'
        });
        break;
        
      case 'PaymentReceived':
        await this.db.update('customer_orders',
          { orderId: event.orderId },
          { 
            status: 'paid',
            paidAt: event.occurredAt,
            amount: event.amount
          }
        );
        break;
        
      case 'ShipmentDelivered':
        await this.db.update('customer_orders',
          { orderId: event.orderId },
          { 
            status: 'delivered',
            deliveredAt: event.occurredAt
          }
        );
        break;
    }
  }
}
```

### 3. Temporal Projections

Projections that capture state at specific times:

```typescript
// Projection: Daily Order Totals
class DailyOrderTotalsProjection {
  async handle(event: DomainEvent): Promise<void> {
    if (event.type === 'OrderSubmitted') {
      const date = event.occurredAt.toISOString().split('T')[0];
      
      await this.db.update('daily_totals',
        { date },
        { $inc: { orderCount: 1, totalRevenue: event.orderTotal } },
        { upsert: true }
      );
    }
  }
}
```

## Building Projections

### Synchronous Building

Projections updated in the same transaction as events:

```typescript
async function handleCommand(command): Promise<void> {
  const events = aggregate.process(command);
  
  await transaction.begin();
  try {
    // Store events
    await eventStore.append(events);
    
    // Update projections
    for (const event of events) {
      await projectionHandler.handle(event);
    }
    
    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
}
```

**Pros:** Strong consistency between events and projections  
**Cons:** Slower writes, projection errors block command processing

### Asynchronous Building

Projections updated via event subscription:

```typescript
class ProjectionConsumer {
  async consume(event: DomainEvent): Promise<void> {
    // Run in separate process/thread
    await projectionHandler.handle(event);
    
    // Track position for recovery
    await checkpointStore.save(event.position);
  }
}

// Subscribe to event store
eventStore.subscribe({
  fromPosition: await checkpointStore.getLastPosition(),
  onEvent: (event) => projectionConsumer.consume(event)
});
```

**Pros:** Doesn't block writes, can scale independently  
**Cons:** Eventual consistency, need recovery mechanisms

## Projection Consistency

### Strong Consistency

Projections updated in same transaction as events:
- Use when read-after-write consistency is required
- Adds latency to commands
- Limits scalability

### Eventual Consistency

Projections updated asynchronously:
- Acceptable for most read models
- Users see stale data briefly
- Need UI patterns for handling (loading states, optimistic updates)

## Projection Rebuilding

When projections are corrupted or schema changes:

```typescript
async function rebuildProjection(projectionName: string): Promise<void> {
  // Clear existing projection
  await projectionStore.clear(projectionName);
  
  // Read all events from beginning
  const events = await eventStore.readAllEvents();
  
  // Reapply to projection
  for (const event of events) {
    await projectionHandler.handle(event);
  }
  
  console.log(`Rebuilt ${projectionName} from ${events.length} events`);
}
```

## Common Mistakes

### 1. Projection Logic in Aggregates

**Bad:**
```typescript
class Order {
  submit() {
    this.events.push(new OrderSubmitted());
    this.updateSearchIndex(); // Don't do this!
  }
}
```

Projections should be separate from aggregates.

### 2. Writing to Projections Directly

Never let users write to projection databases directly. All changes must go through the event store.

### 3. Ignoring Event Ordering

Projections must process events in order. Out-of-order events cause incorrect state.

### 4. Not Handling Duplicates

Projection consumers must be idempotent. Handle duplicate events gracefully.

## Relationship to CQRS

Projection Building is **where CQRS becomes valuable**:
- Write model stores events
- Read models are projections optimized for queries
- Different storage technologies for each (event store for writes, SQL/NoSQL for reads)
- Allows independent scaling and optimization

You can use CQRS without Event Sourcing, but Event Sourcing almost always benefits from CQRS for queries.

## FOE Alignment

Projection Building supports **Fast Feedback Loops** by enabling real-time read models that respond to events as they occur. Users see changes immediately rather than waiting for batch processing.

The ability to rebuild projections from events provides **Confidence** - even if a projection is corrupted or needs schema changes, it can be regenerated from the immutable event history without data loss.
