---
methodId: M242
displayed_sidebar: fieldGuideSidebar
sidebar_position: 3
title: State Reconstruction
pillar: core-concepts
description: Rebuilding entity state by replaying events (left fold/reduction).
---

# State Reconstruction

**Pillar:** Core Concepts

State Reconstruction is the process of rebuilding an aggregate's current state by reading all events from its event stream and applying them in sequence. This is fundamentally a **left fold** (or reduce) operation over the event history.

## Definition

> State reconstruction is the process of deriving current state by applying a sequence of state transition functions (events) to an initial state. Each event represents a function that transforms the state from one version to the next.

```
CurrentState = foldl(applyEvent, InitialState, [Event1, Event2, ..., EventN])
```

## Why It Matters

State reconstruction is the core mechanism of Event Sourcing:

- **Derives current state** - The state is not stored, it's computed
- **Enables temporal queries** - Can reconstruct state at any point in time
- **Supports debugging** - Replay events to understand how state evolved
- **Allows state evolution** - Aggregate logic can change while preserving history

## The Reconstruction Process

### 1. Load Event Stream

```typescript
async function loadAggregate(aggregateId: string): Promise<Aggregate> {
  // Read all events for this aggregate
  const events = await eventStore.readStream(aggregateId);
  
  // Start with empty aggregate
  let aggregate = createEmptyAggregate(aggregateId);
  
  // Apply each event in order
  for (const event of events) {
    aggregate = applyEvent(aggregate, event);
  }
  
  return aggregate;
}
```

### 2. Apply Each Event

```typescript
function applyEvent(aggregate: Order, event: DomainEvent): Order {
  switch (event.type) {
    case 'OrderCreated':
      return new Order({
        id: event.orderId,
        customerId: event.customerId,
        status: OrderStatus.Pending,
        lineItems: []
      });
      
    case 'OrderLineAdded':
      return new Order({
        ...aggregate,
        lineItems: [...aggregate.lineItems, event.lineItem]
      });
      
    case 'OrderSubmitted':
      return new Order({
        ...aggregate,
        status: OrderStatus.Submitted,
        submittedAt: event.occurredAt
      });
      
    default:
      return aggregate;
  }
}
```

## Implementation Patterns

### Pattern 1: Aggregate Methods

Each event type has a corresponding method on the aggregate:

```typescript
class Order {
  applyEvent(event: DomainEvent): void {
    switch (event.type) {
      case 'OrderCreated':
        this.applyOrderCreated(event);
        break;
      case 'OrderLineAdded':
        this.applyOrderLineAdded(event);
        break;
      // ... etc
    }
  }
  
  private applyOrderCreated(event: OrderCreated): void {
    this.id = event.orderId;
    this.customerId = event.customerId;
    this.status = OrderStatus.Pending;
  }
  
  private applyOrderLineAdded(event: OrderLineAdded): void {
    this.lineItems.push(new LineItem(event));
  }
}
```

### Pattern 2: External Reducer Function

Pure function that takes state and event, returns new state:

```typescript
function orderReducer(order: Order | null, event: DomainEvent): Order {
  switch (event.type) {
    case 'OrderCreated':
      return createOrder(event);
    case 'OrderLineAdded':
      return addLineItem(order!, event);
    case 'OrderSubmitted':
      return submitOrder(order!, event);
    default:
      return order!;
  }
}

// Usage
const order = events.reduce(orderReducer, null);
```

### Pattern 3: Event Handlers Registry

Register handlers for each event type:

```typescript
class AggregateRebuilder {
  private handlers = new Map<string, EventHandler>();
  
  register(eventType: string, handler: EventHandler): void {
    this.handlers.set(eventType, handler);
  }
  
  rebuild(events: DomainEvent[]): Aggregate {
    return events.reduce((aggregate, event) => {
      const handler = this.handlers.get(event.type);
      return handler ? handler(aggregate, event) : aggregate;
    }, createEmptyAggregate());
  }
}
```

## Reconstruction at Specific Points

### Historical State

To get state at a specific point in time:

```typescript
async function loadAggregateAtTime(
  aggregateId: string, 
  timestamp: Date
): Promise<Aggregate> {
  const events = await eventStore.readStream(aggregateId);
  
  // Filter events up to timestamp
  const relevantEvents = events.filter(e => e.occurredAt <= timestamp);
  
  return relevantEvents.reduce(applyEvent, createEmptyAggregate());
}
```

### Specific Version

To get state at a specific version:

```typescript
async function loadAggregateAtVersion(
  aggregateId: string, 
  version: number
): Promise<Aggregate> {
  const events = await eventStore.readStream(aggregateId, { 
    maxVersion: version 
  });
  
  return events.reduce(applyEvent, createEmptyAggregate());
}
```

## Performance Considerations

### The Problem

Long-lived aggregates may have thousands of events. Replaying all events becomes slow.

### Solutions

1. **Snapshotting** - Periodically save aggregate state (see M244)
2. **Lazy loading** - Only load events when needed
3. **Caching** - Cache reconstructed aggregates
4. **Event stream size limits** - Consider aggregate boundaries if streams grow too large

## Common Mistakes

### 1. Side Effects in Apply Methods

**Bad:**
```typescript
applyOrderSubmitted(event) {
  this.status = OrderStatus.Submitted;
  sendEmailToCustomer(); // Side effect!
}
```

**Good:**
```typescript
applyOrderSubmitted(event) {
  this.status = OrderStatus.Submitted; // Only state changes
  this.submittedAt = event.occurredAt;
}
```

Apply methods must be pure functions that only mutate state. Side effects happen after reconstruction.

### 2. Conditional Logic in Apply Methods

**Bad:**
```typescript
applyOrderSubmitted(event) {
  if (this.lineItems.length > 0) { // Conditional!
    this.status = OrderStatus.Submitted;
  }
}
```

**Good:**
```typescript
applyOrderSubmitted(event) {
  this.status = OrderStatus.Submitted; // Always apply
}
```

Business validation happens before events are created, not during apply. Events represent facts that already passed validation.

### 3. Missing Event Handlers

When adding new event types, ensure all aggregates that may receive them have handlers. Use exhaustive switch statements with compile-time checks.

## Relationship to CQRS

State reconstruction is **independent of CQRS**:
- Reconstruction happens in the write model to validate commands
- Read models may use projections instead of reconstruction
- CQRS allows optimizing read models separately from the event store

## FOE Alignment

State Reconstruction supports **Understanding** by making the evolution of state completely transparent. Developers can trace exactly how an aggregate reached its current state by examining the event sequence. This eliminates mystery about data changes.

The explicit nature of state transitions also supports **Confidence** - there's never ambiguity about how state changed because every transition is recorded as an immutable event.
