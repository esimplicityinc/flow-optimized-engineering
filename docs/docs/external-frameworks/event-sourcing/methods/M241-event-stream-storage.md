---
methodId: M241
displayed_sidebar: fieldGuideSidebar
sidebar_position: 2
title: Event Stream Storage
pillar: core-concepts
description: Storing events in append-only, ordered streams per aggregate.
---

# Event Stream Storage

**Pillar:** Core Concepts

Event Stream Storage is the practice of persisting domain events in append-only, ordered streams, where each stream corresponds to an aggregate instance.

## Definition

> An event stream is a sequence of events that represent the complete history of a single aggregate. Events are stored in append-only fashion and ordered by their occurrence within the aggregate's lifecycle.

Each aggregate has its own stream, identified by the aggregate ID. Events within a stream are ordered and immutable.

## Why It Matters

Proper event stream storage is essential because:

- **Enables state reconstruction** - The aggregate's state can be rebuilt by reading its stream
- **Provides optimistic concurrency control** - Expected version checking prevents lost updates
- **Supports temporal queries** - Access to any point in the aggregate's history
- **Ensures ordering guarantees** - Events are processed in the order they occurred

## Stream Structure

```
Stream: order-123
├─ Event 1: OrderCreated (version 1)
├─ Event 2: OrderLineAdded (version 2)
├─ Event 3: ShippingAddressSet (version 3)
├─ Event 4: OrderSubmitted (version 4)
└─ Event 5: PaymentReceived (version 5)
```

Each event in a stream has:
- **Stream ID** - The aggregate identifier
- **Event Number** - Position within the stream (1, 2, 3...)
- **Event Data** - The domain event payload
- **Metadata** - Timestamps, correlation IDs, etc.

## Storage Requirements

### Functional Requirements

| Requirement | Description |
|-------------|-------------|
| **Append-only** | Events can only be added, never modified or deleted |
| **Ordered** | Events within a stream maintain their sequence |
| **Atomic appends** | Events from a single operation are stored atomically |
| **Optimistic concurrency** | Expected version checking for concurrent writes |
| **Read by stream** | Efficient retrieval of all events for a specific aggregate |

### Non-Functional Requirements

| Requirement | Description |
|-------------|-------------|
| **High write throughput** | Event stores are write-heavy |
| **Horizontal scalability** | Ability to distribute streams across nodes |
| **Durability** - Events must survive hardware failures |
| **Low read latency** - Fast stream reconstruction |

## Storage Options

### 1. Specialized Event Stores

**Examples:** EventStoreDB, Axon Server, Marten

**Pros:**
- Optimized for event storage patterns
- Built-in projection support
- Strong consistency guarantees

**Cons:**
- Additional infrastructure to manage
- Team learning curve

### 2. Relational Databases

**Schema:**
```sql
CREATE TABLE events (
    stream_id VARCHAR(255) NOT NULL,
    event_number BIGINT NOT NULL,
    event_type VARCHAR(255) NOT NULL,
    event_data JSONB NOT NULL,
    metadata JSONB,
    occurred_at TIMESTAMP NOT NULL,
    PRIMARY KEY (stream_id, event_number)
);

CREATE INDEX idx_events_stream ON events(stream_id, event_number);
```

**Pros:**
- Familiar technology
- Existing operational expertise
- ACID transactions

**Cons:**
- Not optimized for event patterns
- May need custom optimistic concurrency

### 3. Document/NoSQL Stores

**Examples:** MongoDB, DynamoDB, Cassandra

**Pros:**
- Scalable
- Flexible schema
- Good for high write throughput

**Cons:**
- Eventual consistency in some systems
- May need custom ordering guarantees

## Optimistic Concurrency Control

### The Problem

Two users load the same aggregate (version 5) and make changes:
- User A appends event at version 6
- User B appends event at version 6

Without control, events overwrite or corrupt the stream.

### The Solution

Store events with **expected version checking**:

```typescript
interface AppendOptions {
  streamId: string;
  events: DomainEvent[];
  expectedVersion: number;  // What we think the current version is
}

// If expectedVersion doesn't match actual, throw concurrency exception
await eventStore.append({
  streamId: 'order-123',
  events: [new OrderSubmitted({...})],
  expectedVersion: 5  // We loaded at version 5
});
```

### Handling Conflicts

When `expectedVersion` doesn't match:

1. **Reload the aggregate** - Get current state including new events
2. **Re-apply business logic** - Re-evaluate if the operation is still valid
3. **Retry the append** - With updated expected version

## Event Stream Partitioning

### By Aggregate ID

Most event stores partition by aggregate ID for:
- **Consistency** - Single aggregate operations are atomic
- **Ordering** - Events for one aggregate are processed in order
- **Reconstruction** - Easy to read complete aggregate history

### Global Ordering

Some use cases need global event ordering:
- **Cross-aggregate consistency** - Processing related aggregates
- **Projection building** - Building read models in order
- **Audit trails** - Complete system history

**Approach:** Maintain a global sequence number across all streams.

## Storage Growth Considerations

:::caution Storage Growth

Event streams grow indefinitely. Consider:

1. **Storage costs** - Calculate long-term storage needs
2. **Archive strategy** - Move old events to cold storage
3. **Snapshotting** - Reduce replay time (see M244 Snapshotting)
4. **Data retention** - Legal requirements for data retention

:::

## Common Mistakes

### 1. Using Database Auto-Increment for Global Ordering

Database sequences become bottlenecks in distributed systems. Use logical timestamps or vector clocks instead.

### 2. Deleting Events

Never delete events from the store. If you need to "undo," create a compensating event.

### 3. Embedding Large Binary Data

Don't store files, images, or large blobs in events. Store references (URLs, IDs) instead.

### 4. Ignoring Backups

Event store backups are critical. Test restore procedures regularly.

## FOE Alignment

Event Stream Storage supports **Confidence** by providing durable, immutable records of all changes. The append-only nature eliminates entire categories of bugs related to data mutation and race conditions.

The optimistic concurrency model provides **Fast Feedback** - conflicts are detected immediately rather than causing silent data corruption.
