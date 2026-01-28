---
sidebar_position: 8
title: Domain Event
pillar: tactical-design
description: A record of something significant that happened in the domain.
---

# Domain Event

**Pillar:** Tactical Design

A Domain Event is a record of something significant that happened in the domain. Events capture facts about the past and are named in past tense to reflect that they describe something that has already occurred.

## Definition

> A domain event is a full-fledged part of the domain model, a representation of something that happened in the domain. Ignore irrelevant domain activity while making explicit the events that the domain experts want to track or be notified of, or which are associated with state change in the other model objects.
>
> — Eric Evans, DDD Reference

## Why It Matters

Domain Events are essential because:

- **Capture business significance** - Events represent what matters to the business
- **Enable loose coupling** - Publishers don't need to know about subscribers
- **Support eventual consistency** - Events can trigger updates across bounded contexts
- **Provide audit trail** - Events are a natural record of what happened
- **Enable event sourcing** - State can be reconstructed from event history

## Naming Conventions

Events are named in **past tense** because they describe something that already happened:

| Good (Past Tense) | Bad (Present/Imperative) |
|-------------------|--------------------------|
| OrderPlaced | PlaceOrder |
| PaymentReceived | ReceivePayment |
| CustomerRegistered | RegisterCustomer |
| ShipmentDelivered | DeliverShipment |

## Event Structure

A domain event typically contains:

```typescript
interface OrderPlaced {
  // Identity
  eventId: EventId;
  occurredAt: Timestamp;
  
  // Aggregate reference
  orderId: OrderId;
  
  // Relevant data at time of event
  customerId: CustomerId;
  orderTotal: Money;
  lineItems: OrderLineSnapshot[];
  
  // Metadata
  correlationId?: CorrelationId;
  causationId?: EventId;
}
```

## Event Characteristics

| Characteristic | Description |
|----------------|-------------|
| **Immutable** | Events never change once created |
| **Past tense** | Named as something that happened |
| **Self-contained** | Contains all data needed to understand what happened |
| **Timestamped** | Records when the event occurred |
| **Identified** | Has a unique event ID |

## Publishing Events

Events are typically published by aggregates after state changes:

```typescript
class Order {
  private events: DomainEvent[] = [];

  place(): void {
    // Change state
    this.status = OrderStatus.Placed;
    this.placedAt = Timestamp.now();
    
    // Record event
    this.events.push(new OrderPlaced({
      orderId: this.id,
      customerId: this.customerId,
      orderTotal: this.calculateTotal(),
      lineItems: this.lineItems.map(li => li.toSnapshot())
    }));
  }

  pullEvents(): DomainEvent[] {
    const events = [...this.events];
    this.events = [];
    return events;
  }
}
```

## Event Handling Patterns

| Pattern | Description | Use Case |
|---------|-------------|----------|
| **In-process** | Handlers in same process | Updating read models, sending notifications |
| **Message queue** | Events published to queue | Cross-service communication |
| **Event store** | Events persisted as source of truth | Event sourcing |

## Common Mistakes

- **Present tense naming** - Events describe the past, not commands
- **Missing data** - Events should be self-contained
- **Mutable events** - Events are facts and cannot change
- **Too granular** - Not every state change needs an event
- **Coupling to handlers** - Publishers shouldn't know about subscribers

## Relationship to Other Patterns

- **Aggregate** - Aggregates publish domain events
- **Bounded Context** - Events often cross context boundaries
- **Context Mapping** - Events are a form of Published Language
- **Application Service** - Often responsible for dispatching events

## FOE Alignment

Domain Events strongly support **Fast Feedback Loops**. Events enable reactive architectures where changes propagate immediately to interested parties. Instead of polling or batch processing, systems can respond to events in real-time. Events also support understanding by making implicit domain concepts explicit—if something is important enough to be an event, it's visible in the codebase.
