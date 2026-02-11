---
methodId: M246
displayed_sidebar: fieldGuideSidebar
sidebar_position: 7
title: Temporal Queries
pillar: advanced-patterns
description: Querying state at any point in time by reconstructing from events up to a specific timestamp.
---

# Temporal Queries

**Pillar:** Advanced Patterns

Temporal Queries allow you to query the state of the system at any point in time by replaying events up to a specific timestamp. This capability turns the event store into a time machine for your domain.

## Definition

> A temporal query retrieves the state of an aggregate or the entire system as it existed at a specific point in time. This is achieved by filtering events to only those that occurred at or before the specified timestamp and reconstructing state from that subset.

## Why It Matters

Temporal queries provide capabilities impossible with traditional CRUD systems:

- **Audit and compliance** - "What did the order look like when it was approved?"
- **Debugging** - Reconstruct state at the time of a bug
- **Analytics** - "How many orders were pending on March 15th?"
- **Legal discovery** - Prove state at specific times
- **Undo/restore** - See state before a change

## How Temporal Queries Work

```
All Events: [E1@t1, E2@t2, E3@t3, E4@t4, E5@t5]

Query at t3: [E1@t1, E2@t2, E3@t3] → State at t3
Query at t4: [E1@t1, E2@t2, E3@t3, E4@t4] → State at t4
```

## Implementing Temporal Queries

### Single Aggregate Query

```typescript
async function getAggregateAtTime<T extends Aggregate>(
  aggregateId: string,
  timestamp: Date,
  aggregateClass: new () => T
): Promise<T | null> {
  // Load all events for this aggregate
  const allEvents = await eventStore.readStream(aggregateId);
  
  // Filter to events up to specified time
  const relevantEvents = allEvents.filter(
    e => e.occurredAt <= timestamp
  );
  
  if (relevantEvents.length === 0) {
    return null; // Aggregate didn't exist at that time
  }
  
  // Reconstruct state from filtered events
  let aggregate = new aggregateClass();
  for (const event of relevantEvents) {
    aggregate = aggregate.applyEvent(event);
  }
  
  return aggregate;
}

// Usage
const order = await getAggregateAtTime(
  'order-123',
  new Date('2024-03-15T10:30:00Z'),
  Order
);
```

### System-Wide Query

Query across multiple aggregates:

```typescript
async function getSystemStateAtTime(timestamp: Date): Promise<SystemSnapshot> {
  // Read all events up to timestamp
  const events = await eventStore.readAllEvents({
    toTimestamp: timestamp
  });
  
  // Group by aggregate
  const eventsByAggregate = groupBy(events, e => e.aggregateId);
  
  // Reconstruct each aggregate
  const aggregates: Map<string, Aggregate> = new Map();
  for (const [aggregateId, aggregateEvents] of eventsByAggregate) {
    const aggregate = await reconstructAggregate(aggregateEvents);
    aggregates.set(aggregateId, aggregate);
  }
  
  return { aggregates, timestamp };
}
```

### Query Specific Projections

Some read models naturally support temporal queries:

```typescript
// Temporal projection: Account Balance History
interface BalanceSnapshot {
  accountId: string;
  timestamp: Date;
  balance: Money;
}

async function getBalanceAtTime(
  accountId: string, 
  timestamp: Date
): Promise<Money> {
  // Query projection table with time-based index
  const snapshot = await db.query(`
    SELECT balance FROM account_balance_snapshots
    WHERE account_id = ?
    AND timestamp <= ?
    ORDER BY timestamp DESC
    LIMIT 1
  `, [accountId, timestamp]);
  
  return snapshot?.balance ?? Money.zero();
}
```

## Temporal Query Patterns

### 1. Point-in-Time Query

"What was the state at exactly 2:30 PM on March 15th?"

```typescript
const state = await getStateAtTime(aggregateId, new Date('2024-03-15T14:30:00Z'));
```

### 2. Time Range Query

"How did the state change between Monday and Friday?"

```typescript
const mondayState = await getStateAtTime(aggregateId, monday);
const fridayState = await getStateAtTime(aggregateId, friday);

const changes = compareStates(mondayState, fridayState);
```

### 3. "As Of" Query for Related Data

"Show me the order as it appeared when the payment was processed."

```typescript
const paymentEvent = await findPaymentEvent(orderId, paymentId);
const orderState = await getStateAtTime(
  orderId, 
  paymentEvent.occurredAt
);
```

### 4. Temporal Join

"Show me all orders that were in 'pending' status on March 1st."

```typescript
const allOrders = await getAllOrders();
const pendingOrders = [];

for (const orderId of allOrders) {
  const order = await getStateAtTime(orderId, marchFirst);
  if (order?.status === 'pending') {
    pendingOrders.push(order);
  }
}
```

## Performance Considerations

### The Problem

Temporal queries require reading and replaying events. For old timestamps, this means many events.

### Solutions

1. **Temporal Projections** - Pre-compute common temporal queries
   ```typescript
   // Maintain a time-series projection
   CREATE TABLE daily_order_counts (
     date DATE PRIMARY KEY,
     pending_count INT,
     completed_count INT
   );
   ```

2. **Periodic State Snapshots** - Store aggregate state at intervals
   ```typescript
   interface TemporalSnapshot {
     aggregateId: string;
     timestamp: Date;
     state: SerializedState;
   }
   ```

3. **Event Store Indexing** - Index events by timestamp for faster filtering
   ```sql
   CREATE INDEX idx_events_timestamp ON events(occurred_at);
   ```

4. **Caching** - Cache frequently accessed temporal states

## Business Time vs System Time

### Business Time

When the business says something happened:
```typescript
interface DomainEvent {
  occurredAt: Date;  // Business timestamp
  recordedAt: Date;  // System timestamp
}
```

### System Time

When the system recorded the event:

**Use Cases:**
- **Business time** - "What was the inventory when the sale occurred?"
- **System time** - "What did we know at midnight during the batch process?"

**Recommendation:** Store both timestamps. Use business time for domain logic, system time for technical concerns.

## Common Mistakes

### 1. Ignoring Time Zones

Always store timestamps in UTC, convert for display:
```typescript
// Store
occurredAt: new Date().toISOString()  // UTC

// Display
formatInTimeZone(occurredAt, userTimeZone)
```

### 2. Not Handling Non-Existent Aggregates

At a past time, an aggregate might not have existed yet:
```typescript
const state = await getStateAtTime(id, pastTime);
if (!state) {
  // Aggregate didn't exist at that time
}
```

### 3. Confusing Event Time with Processing Time

```typescript
// Wrong: Using processing time
const state = await getStateAtTime(id, event.processedAt);

// Right: Using occurrence time
const state = await getStateAtTime(id, event.occurredAt);
```

## Temporal Query UI Patterns

### Time Travel Interface

```
┌─────────────────────────────────────┐
│ Order #12345          [◀] [▶]     │
│ Time: March 15, 2024 2:30 PM        │
├─────────────────────────────────────┤
│ Status: PENDING                     │
│ Customer: Acme Corp                 │
│ Total: $1,250.00                    │
│                                     │
│ [View at different time]            │
└─────────────────────────────────────┘
```

### Audit Trail View

```
┌──────────────────────────────────────────┐
│ Order History                            │
├──────────────────────────────────────────┤
│ [Now] Current State                      │
│   Status: SHIPPED                        │
├──────────────────────────────────────────┤
│ [Mar 18] ShipmentDelivered               │
│   View state at this time →              │
├──────────────────────────────────────────┤
│ [Mar 16] PaymentReceived                 │
│   View state at this time →              │
├──────────────────────────────────────────┤
│ [Mar 15] OrderSubmitted                  │
│   View state at this time →              │
└──────────────────────────────────────────┘
```

## Relationship to CQRS

Temporal Queries are **enhanced by CQRS**:
- Write model handles event storage
- Read models can be optimized for temporal queries
- Different projections can serve different temporal query patterns
- Eventual consistency is acceptable for historical queries

Without CQRS, temporal queries must reconstruct from the event store directly, which is slower.

## FOE Alignment

Temporal Queries provide unprecedented **Understanding** of system behavior. The ability to see exactly what happened at any point in time eliminates guesswork when debugging or investigating issues.

This capability also builds **Confidence** - teams can answer questions about past state with certainty, support compliance requirements, and provide accurate audit trails.
