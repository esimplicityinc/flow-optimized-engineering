---
methodId: M245
displayed_sidebar: fieldGuideSidebar
sidebar_position: 6
title: Event Versioning
pillar: operational-patterns
description: Managing schema evolution of events over time while maintaining backward compatibility.
---

# Event Versioning

**Pillar:** Operational Patterns

Event Versioning is the practice of managing schema evolution of events over time. Since events are immutable and stored forever, the system must handle reading old event formats while supporting new event structures.

## Definition

> Event versioning is the set of practices and patterns that allow event schemas to evolve over time without breaking existing event streams. It ensures that events written in old formats can still be read and processed by current code.

## Why It Matters

Events are immutable and stored forever:
- **Can't update old events** - They're append-only
- **Can't delete events** - Would break event sourcing
- **Long-lived systems** - Events may be decades old
- **Multiple consumers** - Different projections may need different formats

Without proper versioning, schema changes break the system.

## Versioning Strategies

### 1. Schema Evolution (Additive Changes)

**DO:** Add optional fields, don't remove or rename:

```typescript
// Version 1
interface OrderCreated {
  orderId: string;
  customerId: string;
}

// Version 2 - ADD optional field
interface OrderCreated {
  orderId: string;
  customerId: string;
  orderTotal?: Money;  // Optional, null for old events
}
```

**Pros:** Simple, backward compatible  
**Cons:** Can't remove fields, limited evolution

### 2. Upcasting (Transform on Read)

Transform old events to current format when reading:

```typescript
interface EventUpcaster {
  canUpcast(event: EventEnvelope): boolean;
  upcast(event: EventEnvelope): DomainEvent;
}

class OrderCreatedUpcaster implements EventUpcaster {
  canUpcast(event: EventEnvelope): boolean {
    return event.type === 'OrderCreated' && event.version === 1;
  }
  
  upcast(event: EventEnvelope): DomainEvent {
    const oldData = event.data as OrderCreatedV1;
    
    // Transform to current version
    return new OrderCreated({
      orderId: oldData.orderId,
      customerId: oldData.customerId,
      orderTotal: null,  // Default for new field
      currency: 'USD'    // Sensible default
    });
  }
}

// Usage in event store
async function readEvent(envelope: EventEnvelope): Promise<DomainEvent> {
  for (const upcaster of upcasters) {
    if (upcaster.canUpcast(envelope)) {
      return upcaster.upcast(envelope);
    }
  }
  return deserialize(envelope);
}
```

**Pros:** Events always in current format in application code  
**Cons:** Adds overhead on read, must maintain upcasters forever

### 3. Event Migration (Copy-on-Write)

Create new streams with migrated events:

```typescript
async function migrateStream(streamId: string): Promise<void> {
  const oldEvents = await eventStore.readStream(streamId);
  const newEvents = oldEvents.map(upcastEvent);
  
  // Write to new stream
  await eventStore.createStream(streamId + '-v2', newEvents);
}
```

**Pros:** Clean separation, no read-time overhead  
**Cons:** Duplicates data, complex to manage

### 4. Polyglot Persistence

Store different event formats separately:

```typescript
interface EventEnvelope {
  type: string;
  version: number;  // Schema version
  data: unknown;    // Format depends on version
  metadata: EventMetadata;
}
```

Application code handles multiple versions:

```typescript
function applyOrderCreated(aggregate: Order, event: OrderCreated): void {
  // Handle both v1 and v2
  const orderTotal = 'orderTotal' in event 
    ? event.orderTotal 
    : calculateDefaultTotal();
    
  // ...
}
```

**Pros:** Flexible, explicit versioning  
**Cons:** More complex application code

## Best Practices

### 1. Version Your Events

Always include version information:

```typescript
interface EventEnvelope {
  type: 'OrderCreated';
  version: 2;  // Schema version
  data: OrderCreatedData;
  metadata: {
    occurredAt: Date;
    correlationId: string;
  };
}
```

### 2. Prefer Additive Changes

Instead of renaming:
```typescript
// BAD: Rename field
// Old: { customerName: string }
// New: { customerFullName: string }

// GOOD: Add new, deprecate old
interface CustomerUpdated {
  customerName?: string;      // Deprecated
  customerFullName?: string;  // New field
}
```

### 3. Use Meaningful Defaults

When adding required fields, provide sensible defaults:

```typescript
function upcastOrderCreated(old: OrderCreatedV1): OrderCreatedV2 {
  return {
    ...old,
    currency: 'USD',  // Sensible default for existing data
    orderTotal: calculateFromLineItems(old.lineItems)
  };
}
```

### 4. Test with Old Events

Maintain test fixtures with old event formats:

```typescript
describe('Event Versioning', () => {
  it('should handle OrderCreated v1', () => {
    const oldEvent = loadFixture('order-created-v1.json');
    const aggregate = rebuildAggregate([oldEvent]);
    expect(aggregate.status).toBe('pending');
  });
  
  it('should handle OrderCreated v2', () => {
    const newEvent = loadFixture('order-created-v2.json');
    const aggregate = rebuildAggregate([newEvent]);
    expect(aggregate.currency).toBe('EUR');
  });
});
```

## Common Breaking Changes

### Renaming Fields

**Problem:** Old events have old field names

**Solution:** Keep old field as alias or use upcasting

```typescript
// Store both names during transition
interface OrderCreated {
  customerName: string;      // Old name
  customerFullName: string;  // New name (alias)
}
```

### Changing Field Types

**Problem:** String to number, date format changes, etc.

**Solution:** Upcasting with conversion logic

```typescript
// Old: timestamp: "2024-01-15"
// New: timestamp: 1705276800000

function upcastTimestamp(old: string): number {
  return new Date(old).getTime();
}
```

### Removing Fields

**Problem:** Old events have data you no longer need

**Solution:** Mark as deprecated but keep in schema

```typescript
interface OrderCreated {
  orderId: string;
  customerId: string;
  legacyField?: string;  // Deprecated, optional
}
```

### Restructuring Events

**Problem:** Complete event structure changes

**Solution:** Split into multiple events or use complex upcasting

```typescript
// Old: Single OrderModified event
// New: OrderLineAdded, OrderLineRemoved, ShippingAddressChanged

function upcastOrderModified(old: OrderModifiedV1): DomainEvent[] {
  // Split into multiple new events
  return [
    new OrderLineAdded({...}),
    new ShippingAddressChanged({...})
  ];
}
```

## Event Versioning Checklist

When changing event schemas:

- [ ] Will old events still be readable?
- [ ] Do all projections handle the change?
- [ ] Are upcasters written and tested?
- [ ] Can I roll back if there's a problem?
- [ ] Are event consumers (other services) affected?

## Relationship to CQRS

Event Versioning is **independent of CQRS** but affects both sides:
- **Write model** - Must handle old events during reconstruction
- **Read models** - Projections may need to handle multiple event versions
- **Integration** - Events published to other systems need careful versioning

## FOE Alignment

Event Versioning supports **Understanding** by making schema evolution explicit and manageable. Teams can reason about how their event schemas change over time and plan for long-term maintenance.

The practice also provides **Confidence** - knowing that old events can still be read and processed gives confidence to evolve the domain model without fear of data loss or system breakage.
