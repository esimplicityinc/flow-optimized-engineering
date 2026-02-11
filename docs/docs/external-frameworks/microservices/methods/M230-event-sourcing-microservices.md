---
methodId: M230
displayed_sidebar: fieldGuideSidebar
sidebar_position: 8
title: Event Sourcing (Microservices)
description: Persists the state of an application as a sequence of events, enabling audit trails, temporal queries, and natural integration between microservices.
framework: microservices
framework_url: https://microservices.io/patterns/data/event-sourcing.html
foe_alignment:
  primary: Understanding
  secondary: Confidence
status: well-established
pillar: data-patterns
---

# Event Sourcing

**Pillar:** Data Patterns

Event Sourcing persists the state of an application as a sequence of events rather than storing only the current state. Each change to the application state is captured as an immutable event appended to an event store. The current state is derived by replaying these events. This pattern naturally integrates with microservices through event-driven communication.

## Definition

> "Event sourcing persists the state of a business entity, such as an Order or a Customer, as a stream of state-changing events. Whenever the state of a business entity changes, a new event is appended to the list of events. Since saving an event is a single operation, it is inherently atomic."
> — Chris Richardson, Microservices Patterns

## Why It Matters

Traditional state storage has limitations:

- **No history** - Only current state is stored, past states are lost
- **Audit challenges** - Difficult to track who changed what and when
- **Debugging difficulty** - Hard to understand how system reached current state
- **Integration friction** - Services must poll or query for changes

Event Sourcing provides:
- **Complete audit trail** - Every change recorded with context
- **Temporal queries** - Query state at any point in time
- **Natural event publishing** - Events already exist for integration
- **Replay capability** - Reconstruct state or debug by replaying events
- **Event-driven architecture** - Native integration with microservices

## How It Works

### Core Concept

```
Traditional State Storage          Event Sourcing
┌──────────────────┐              ┌──────────────────┐
│  Current State   │              │   Event Stream   │
│                  │              │                  │
│ Order:           │              │ 1. OrderCreated  │
│   id: 123        │              │ 2. ItemAdded     │
│   items: [...]   │  ←── vs ──▶  │ 3. ItemAdded     │
│   status: paid   │              │ 4. PaymentMade   │
│   total: $99     │              │ 5. OrderShipped  │
└──────────────────┘              └──────────────────┘
                                          │
                                          ▼
                                   ┌──────────────────┐
                                   │  Replay events   │
                                   │  to get state    │
                                   └──────────────────┘
```

### Event Structure

```javascript
{
  // Event identity
  eventId: "evt_abc123",
  eventType: "OrderItemAdded",
  
  // Temporal information
  timestamp: "2024-01-15T10:30:00Z",
  version: 3,  // Sequence in the aggregate's stream
  
  // Domain data
  aggregateId: "order_123",
  aggregateType: "Order",
  
  // Event payload
  payload: {
    productId: "prod_456",
    quantity: 2,
    unitPrice: 29.99
  },
  
  // Metadata
  metadata: {
    userId: "user_789",
    correlationId: "corr_xyz",
    causationId: "evt_prev456"
  }
}
```

### Reconstructing State

```javascript
class Order {
  constructor(events) {
    this.status = 'PENDING';
    this.items = [];
    this.total = 0;
    
    // Replay events to build current state
    events.forEach(event => this.apply(event));
  }
  
  apply(event) {
    switch (event.eventType) {
      case 'OrderCreated':
        this.id = event.aggregateId;
        this.customerId = event.payload.customerId;
        this.createdAt = event.timestamp;
        break;
        
      case 'OrderItemAdded':
        this.items.push({
          productId: event.payload.productId,
          quantity: event.payload.quantity,
          unitPrice: event.payload.unitPrice
        });
        this.total += event.payload.quantity * event.payload.unitPrice;
        break;
        
      case 'PaymentMade':
        this.status = 'PAID';
        this.paymentId = event.payload.paymentId;
        break;
        
      case 'OrderShipped':
        this.status = 'SHIPPED';
        this.shippedAt = event.timestamp;
        break;
    }
  }
}

// Load order from event store
const events = await eventStore.getEvents('order_123');
const order = new Order(events);
```

## Architecture

### Components

```
┌─────────────────────────────────────────────────────────────┐
│                      Command Handler                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │
│  │   Validate   │  │  Create      │  │   Persist    │       │
│  │   Command    │─▶│   Events     │─▶│   Events     │       │
│  └──────────────┘  └──────────────┘  └──────────────┘       │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                       Event Store                            │
│  ┌─────────────────────────────────────────────────────────┐│
│  │ Aggregate Stream: "order_123"                           ││
│  │ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐        ││
│  │ │ Created │ │ ItemAdd │ │ Payment │ │ Shipped │        ││
│  │ │  v1     │ │  v2     │ │  v3     │ │  v4     │        ││
│  │ └─────────┘ └─────────┘ └─────────┘ └─────────┘        ││
│  └─────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────┘
                              │
              ┌───────────────┼───────────────┐
              ▼               ▼               ▼
┌──────────────────┐ ┌──────────────────┐ ┌──────────────────┐
│   Projections    │ │   Event Bus      │ │   Snapshots      │
│  ┌────────────┐  │ │                  │ │                  │
│  │ Read Model │  │ │ Publish to       │ │ Periodic state   │
│  │  Updates   │  │ │ other services   │ │ caching for perf │
│  └────────────┘  │ │                  │ │                  │
└──────────────────┘ └──────────────────┘ └──────────────────┘
```

## Implementation

### Aggregate Root

```javascript
class OrderAggregate {
  constructor(id) {
    this.id = id;
    this.version = 0;
    this.uncommittedEvents = [];
    
    // State
    this.status = 'PENDING';
    this.items = [];
    this.customerId = null;
  }
  
  // Factory method with events
  static loadFromHistory(id, events) {
    const order = new OrderAggregate(id);
    events.forEach(event => {
      order.apply(event);
      order.version = event.version;
    });
    return order;
  }
  
  // Command handlers
  addItem(productId, quantity, unitPrice) {
    if (this.status !== 'PENDING') {
      throw new Error('Cannot modify non-pending order');
    }
    
    this.raiseEvent('OrderItemAdded', {
      productId,
      quantity,
      unitPrice
    });
  }
  
  makePayment(paymentId, amount) {
    if (this.status !== 'PENDING') {
      throw new Error('Order already paid');
    }
    
    this.raiseEvent('PaymentMade', {
      paymentId,
      amount
    });
  }
  
  // Internal: create and apply event
  raiseEvent(eventType, payload) {
    const event = {
      eventId: generateId(),
      eventType,
      aggregateId: this.id,
      aggregateType: 'Order',
      version: ++this.version,
      timestamp: new Date().toISOString(),
      payload
    };
    
    this.apply(event);
    this.uncommittedEvents.push(event);
  }
  
  // State mutation
  apply(event) {
    switch (event.eventType) {
      case 'OrderItemAdded':
        this.items.push(event.payload);
        break;
      case 'PaymentMade':
        this.status = 'PAID';
        break;
    }
  }
}
```

### Event Store

```javascript
class EventStore {
  async appendEvents(aggregateId, expectedVersion, events) {
    // Optimistic concurrency control
    const currentVersion = await this.getCurrentVersion(aggregateId);
    
    if (currentVersion !== expectedVersion) {
      throw new ConcurrencyException(
        `Expected version ${expectedVersion} but found ${currentVersion}`
      );
    }
    
    // Atomically append all events
    await this.db.events.insertMany(
      events.map((event, index) => ({
        ...event,
        version: expectedVersion + index + 1,
        sequenceNumber: await this.getNextGlobalSequence()
      }))
    );
    
    // Publish to event bus
    for (const event of events) {
      await this.eventBus.publish(event);
    }
  }
  
  async getEvents(aggregateId, fromVersion = 0) {
    return await this.db.events
      .find({ aggregateId, version: { $gt: fromVersion } })
      .sort({ version: 1 })
      .toArray();
  }
}
```

### Projections (Read Models)

```javascript
// Projection handler
eventBus.on('OrderItemAdded', async (event) => {
  await readDb.orderItems.insert({
    orderId: event.aggregateId,
    productId: event.payload.productId,
    quantity: event.payload.quantity,
    addedAt: event.timestamp
  });
  
  // Update order summary
  await readDb.orderSummaries.updateOne(
    { orderId: event.aggregateId },
    { 
      $inc: { itemCount: event.payload.quantity },
      $set: { lastUpdated: event.timestamp }
    }
  );
});

// Multiple projections for different use cases
eventBus.on('OrderCreated', async (event) => {
  // Projection for customer dashboard
  await readDb.customerOrders.insert({
    orderId: event.aggregateId,
    customerId: event.payload.customerId,
    createdAt: event.timestamp,
    status: 'PENDING'
  });
  
  // Projection for analytics
  await analyticsDb.orders.insert({
    orderId: event.aggregateId,
    region: event.payload.region,
    createdAt: event.timestamp,
    hourOfDay: new Date(event.timestamp).getHours()
  });
});
```

## FOE Alignment

**Primary: Optimize for Understanding**

Event Sourcing makes system behavior fully transparent. Every state change is recorded with context—what happened, when, and why. This complete history enables developers to understand exactly how the system reached its current state, making debugging and auditing straightforward. The event stream tells the story of the domain.

**Secondary: Confidence to Act**

The immutable event log provides confidence that no data is ever truly lost. Even if current projections are corrupted, they can be rebuilt from the event store. The audit trail ensures compliance requirements are met. Temporal queries enable analysis of historical states, supporting confident decision-making about the future.

## Benefits

- ✅ **Complete audit trail** - Every change recorded with full context
- ✅ **Temporal queries** - Query state at any point in time
- ✅ **Debugging capability** - Replay events to understand bugs
- ✅ **Natural integration** - Events drive microservice communication
- ✅ **Event-driven architecture** - Native support for reactive systems
- ✅ **Immutable history** - Events never change, ensuring data integrity

## Trade-offs

- ⚠️ **Complexity** - Different paradigm from CRUD requires learning
- ⚠️ **Event schema evolution** - Changing event structures is challenging
- ⚠️ **Query complexity** - Current state must be projected from events
- ⚠️ **Storage growth** - Event store grows indefinitely
- ⚠️ **Learning curve** - Team must understand event-driven thinking

## When to Use

✅ **Use when:**
- Audit trails are critical (financial, healthcare, compliance)
- You need to analyze historical states
- Event-driven architecture is already in use
- Debugging complex state changes is important
- You need temporal queries ("what was the state on X date?")

❌ **Avoid when:**
- Simple CRUD operations dominate
- Storage costs are a major concern
- Team is new to distributed systems
- Query performance is critical (without projections)
- Event schema stability cannot be guaranteed

## Event Schema Evolution

Events are immutable—once stored, they cannot change. But schemas evolve:

### Versioning Strategies

```javascript
// 1. Schema Version in Event
{
  eventType: 'OrderCreated',
  schemaVersion: 2,
  payload: {
    orderId: '123',
    customerId: '456',
    // New field added in v2
    priority: 'HIGH'
  }
}

// 2. Upcasting (transform on read)
function upcastEvent(event) {
  if (event.eventType === 'OrderCreated' && !event.schemaVersion) {
    // v1 to v2 migration
    return {
      ...event,
      schemaVersion: 2,
      payload: {
        ...event.payload,
        priority: 'NORMAL' // Default for old events
      }
    };
  }
  return event;
}

// 3. Multiple Event Types
// Old events stay as-is, new events use new type
'OrderCreated'      // v1
'OrderCreatedV2'    // v2 with new fields
```

### Best Practices

1. **Design events carefully upfront** - Changes are expensive
2. **Use schema registries** - Enforce event contracts
3. **Add fields, don't remove** - Maintain backward compatibility
4. **Event types for breaking changes** - New type instead of breaking old
5. **Test upcasters** - Ensure old events still process correctly

## Snapshots

Replaying thousands of events to get current state is slow. Snapshots cache state:

```javascript
class SnapshotStore {
  async saveSnapshot(aggregateId, version, state) {
    await this.db.snapshots.updateOne(
      { aggregateId },
      {
        aggregateId,
        version,
        state,
        createdAt: new Date()
      },
      { upsert: true }
    );
  }
  
  async loadAggregate(aggregateId) {
    // Load latest snapshot
    const snapshot = await this.db.snapshots.findOne({ aggregateId });
    
    // Load events after snapshot
    const events = await this.eventStore.getEvents(
      aggregateId,
      snapshot ? snapshot.version : 0
    );
    
    // Reconstruct from snapshot + events
    return OrderAggregate.loadFromSnapshot(snapshot, events);
  }
}

// Create snapshot every N events
if (aggregate.uncommittedEvents.length > 0 &&
    aggregate.version % 100 === 0) {
  await snapshotStore.saveSnapshot(
    aggregate.id,
    aggregate.version,
    aggregate.getState()
  );
}
```

## Anti-Patterns

### ❌ Event Sourcing Everything

Not all data needs event sourcing:

```javascript
// WRONG: Event sourcing for simple lookup tables
// RIGHT: Use event sourcing for core domain aggregates only
```

### ❌ Command-Event Confusion

Don't record commands as events:

```javascript
// WRONG: Record the command
{
  eventType: 'CreateOrderCommand',
  payload: { customerId: '123', items: [...] }
}

// RIGHT: Record what happened
{
  eventType: 'OrderCreated',
  payload: { orderId: '456', customerId: '123', items: [...] }
}
```

### ❌ External System State in Events

Events should capture your domain's decisions, not external states:

```javascript
// WRONG: Capturing external API response
{
  eventType: 'PaymentProcessed',
  payload: {
    gatewayResponse: { /* huge external payload */ }
  }
}

// RIGHT: Capture only what your domain needs
{
  eventType: 'PaymentMade',
  payload: {
    paymentId: 'pay_123',
    amount: 99.99,
    gatewayReference: 'ref_abc'
  }
}
```

## Known Uses

- **Event Store** - Purpose-built event sourcing database
- **Axon Framework** - Java framework for event sourcing
- **Spotify** - Event sourcing for playlist and playback data
- **Greg Young's Event Store** - Open-source event store
- **Linedata** - Financial systems with full audit requirements
- **Kansas City Development** - Government compliance tracking

## References

- Young, G. (2010). [Why use Event Sourcing?](https://codebetter.com/gregyoung/2010/02/20/why-use-event-sourcing/)
- Fowler, M. (2005). [Event Sourcing](https://martinfowler.com/eaaDev/EventSourcing.html).
- Richardson, C. (2018). *Microservices Patterns*. Chapter 6: Developing Business Logic with Event Sourcing.
- [Event Sourcing - microservices.io](https://microservices.io/patterns/data/event-sourcing.html)
- [Microsoft: Event Sourcing Pattern](https://docs.microsoft.com/en-us/azure/architecture/patterns/event-sourcing)
- [Vaughn Vernon: Implementing Domain-Driven Design](https://www.oreilly.com/library/view/implementing-domain-driven-design/9780133039900/)
- [Event Store Documentation](https://developers.eventstore.com/)
