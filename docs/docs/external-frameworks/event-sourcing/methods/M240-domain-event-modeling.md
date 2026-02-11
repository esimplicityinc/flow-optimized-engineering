---
methodId: M240
displayed_sidebar: fieldGuideSidebar
sidebar_position: 1
title: Domain Event Modeling
pillar: core-concepts
description: Modeling business activities as discrete events using ubiquitous language from Domain-Driven Design.
---

# Domain Event Modeling

**Pillar:** Core Concepts

Domain Event Modeling is the practice of identifying and defining business activities as discrete events using ubiquitous language from Domain-Driven Design. These events represent facts about the domain that have already occurred.

## Definition

> A domain event is a full-fledged part of the domain model, a representation of something that happened in the domain. Events capture facts about the past and are named in past tense to reflect that they describe something that has already occurred.
>
> — Eric Evans, Domain-Driven Design

In Event Sourcing, domain events are not just notifications—they are the **fundamental building blocks** of the system. Every state change is represented by one or more domain events.

## Why It Matters

Domain Event Modeling is critical because:

- **Captures business intent** - Events describe *why* something happened, not just *what* changed
- **Enables temporal reasoning** - The sequence of events tells the story of the domain
- **Supports audit requirements** - Complete history of business activities
- **Decouples systems** - Publishers don't need to know about subscribers
- **Enables event replay** - Events can be reprocessed for various purposes

## Naming Conventions

Events must be named in **past tense** because they describe something that already happened:

| Good (Past Tense) | Bad (Present/Imperative) |
|-------------------|--------------------------|
| OrderPlaced | PlaceOrder |
| PaymentReceived | ReceivePayment |
| CustomerRegistered | RegisterCustomer |
| InventoryAllocated | AllocateInventory |
| ShipmentDelivered | DeliverShipment |

## Event Structure

A well-modeled domain event contains:

```typescript
interface DomainEvent {
  // Identity and timing
  eventId: UUID;           // Unique identifier for this event occurrence
  occurredAt: Timestamp;   // When the event happened in business time
  
  // Aggregate reference
  aggregateId: UUID;       // Which aggregate produced this event
  aggregateVersion: number; // Version of aggregate after this event
  
  // Event data (the payload)
  // ... domain-specific attributes
  
  // Metadata
  correlationId: UUID;     // Traces related operations
  causationId: UUID;       // The event/command that caused this event
}
```

## Identifying Events

### Event Storming

Event Storming is a collaborative workshop technique for discovering domain events:

1. **Gather domain experts and developers** together
2. **Write events on sticky notes** in past tense (orange stickies)
3. **Arrange chronologically** to discover process flow
4. **Identify aggregates** that produce events (yellow stickies)
5. **Find commands** that trigger events (blue stickies)

### Event Discovery Questions

Ask the business:
- "What are the important things that happen in this process?"
- "What would you want to be notified about?"
- "What do you need to track for compliance/audit?"
- "When would you say 'this has happened'?"

## Event Granularity

| Granularity | Description | Example |
|-------------|-------------|---------|
| **Fine-grained** | Many small events | `ItemAddedToCart`, `QuantityChanged`, `CouponApplied` |
| **Coarse-grained** | Fewer, richer events | `CartModified` with full cart state |
| **Business-significant** | Events that matter to business | `OrderPlaced`, `PaymentConfirmed` |

**Recommendation:** Start with business-significant events. Add finer-grained events only when needed for specific requirements.

## Event Content Guidelines

### DO Include:

- **All data needed to understand what happened** - Events should be self-contained
- **Identifiers, not full objects** - Reference IDs rather than embedding full aggregates
- **Values at the time of the event** - Capture data as it was when the event occurred
- **Business timestamps** - When it happened in business time, not just system time

### DON'T Include:

- **Derived data** - Can be calculated from other event data
- **External system state** - Don't embed data owned by other systems
- **Mutable references** - Never include objects that can change

## Common Mistakes

### 1. CRUD Events

**Bad:** `CustomerUpdated`, `OrderModified`

**Good:** `CustomerEmailChanged`, `ShippingAddressUpdated`, `OrderLineAdded`

CRUD events lose business intent. Always name events after the specific business occurrence.

### 2. Including Too Much Data

Events should be lean. Include only what's needed to understand what happened. Large events:
- Increase storage costs (especially important in ES)
- Make the system harder to understand
- Create coupling to data that may change

### 3. Mutable Event Data

Events must be immutable. Never design events where the payload can change after the event is created.

## Relationship to CQRS

Domain Event Modeling is **independent of CQRS**:
- You can model domain events without Event Sourcing
- You can use Event Sourcing without separating read/write models
- CQRS is often used with Event Sourcing to optimize queries, but it's not required

## FOE Alignment

Domain Event Modeling supports **Understanding** by making implicit domain concepts explicit. When business activities are named and structured as events, the code reflects the actual business process. This shared language between developers and domain experts reduces miscommunication and makes the system more comprehensible.

The explicit modeling of events also supports **Fast Feedback Loops** - when events are well-defined, it's easier to build reactive systems that respond immediately to business occurrences.
