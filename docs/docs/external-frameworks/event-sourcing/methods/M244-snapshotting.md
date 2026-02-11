---
methodId: M244
displayed_sidebar: fieldGuideSidebar
sidebar_position: 5
title: Snapshotting
pillar: operational-patterns
description: Periodic state snapshots to optimize reconstruction performance for aggregates with many events.
---

# Snapshotting

**Pillar:** Operational Patterns

Snapshotting is the practice of periodically saving aggregate state to avoid replaying all events during reconstruction. This optimization reduces load time for aggregates with long event histories.

## Definition

> A snapshot is a serialized representation of an aggregate's state at a specific version. Snapshots allow reconstruction to start from the snapshot version rather than from event zero, reducing the number of events that must be replayed.

## Why It Matters

Without snapshots:
- Long-lived aggregates take longer to load as they accumulate events
- Performance degrades over time
- Memory usage grows with event count

With snapshots:
- Reconstruction reads snapshot + recent events only
- Performance remains constant regardless of aggregate age
- Older events can be archived

## How Snapshotting Works

```
Without Snapshotting:
Events: [1, 2, 3, ..., 997, 998, 999, 1000]
Load: Replay all 1000 events

With Snapshotting:
Snapshot: State at version 900
Events: [901, 902, ..., 999, 1000] 
Load: Deserialize snapshot + replay 100 events
```

## Snapshot Structure

```typescript
interface Snapshot {
  aggregateId: string;
  aggregateType: string;
  version: number;          // Version of aggregate when snapshot taken
  state: SerializedState;   // Serialized aggregate state
  timestamp: Date;          // When snapshot was created
}
```

## Implementation

### Taking Snapshots

```typescript
class SnapshotManager {
  constructor(
    private eventStore: EventStore,
    private snapshotStore: SnapshotStore,
    private snapshotFrequency: number = 100  // Every N events
  ) {}

  async shouldTakeSnapshot(aggregate: Aggregate): Promise<boolean> {
    const lastSnapshot = await this.snapshotStore.read(aggregate.id);
    const eventsSinceSnapshot = aggregate.version - (lastSnapshot?.version ?? 0);
    return eventsSinceSnapshot >= this.snapshotFrequency;
  }

  async takeSnapshot(aggregate: Aggregate): Promise<void> {
    const snapshot: Snapshot = {
      aggregateId: aggregate.id,
      aggregateType: aggregate.constructor.name,
      version: aggregate.version,
      state: this.serialize(aggregate),
      timestamp: new Date()
    };

    await this.snapshotStore.save(snapshot);
  }

  private serialize(aggregate: Aggregate): Buffer {
    // Use efficient serialization (protobuf, msgpack, etc.)
    return serialize(aggregate);
  }
}
```

### Loading with Snapshots

```typescript
async function loadAggregate(aggregateId: string): Promise<Aggregate> {
  // Try to load snapshot first
  const snapshot = await snapshotStore.read(aggregateId);
  
  let aggregate: Aggregate;
  let fromVersion: number;
  
  if (snapshot) {
    // Start from snapshot
    aggregate = deserialize(snapshot.state);
    fromVersion = snapshot.version + 1;
  } else {
    // No snapshot - start from beginning
    aggregate = createEmptyAggregate(aggregateId);
    fromVersion = 1;
  }
  
  // Load events after snapshot
  const events = await eventStore.readStream(aggregateId, { 
    fromVersion 
  });
  
  // Apply remaining events
  for (const event of events) {
    aggregate = applyEvent(aggregate, event);
  }
  
  return aggregate;
}
```

## Snapshot Storage Options

### 1. Same Database as Events

Store snapshots in the same database:

```sql
CREATE TABLE snapshots (
    aggregate_id VARCHAR(255) PRIMARY KEY,
    version BIGINT NOT NULL,
    state BYTEA NOT NULL,
    created_at TIMESTAMP NOT NULL
);
```

**Pros:** Transactional consistency, simple backup  
**Cons:** Database size grows with snapshots

### 2. Separate Storage

Store snapshots in a different system (S3, Redis, etc.):

**Pros:** Cheaper storage, can use specialized systems  
**Cons:** Eventual consistency between events and snapshots

### 3. In-Memory with Persistence

Keep recent snapshots in memory, persist periodically:

**Pros:** Fast access  
**Cons:** Risk of data loss if not persisted

## Snapshot Strategies

### 1. Version-Based

Take snapshot every N events:

```typescript
if (aggregate.version % 100 === 0) {
  await snapshotManager.takeSnapshot(aggregate);
}
```

**Pros:** Predictable frequency  
**Cons:** May snapshot unnecessarily for small aggregates

### 2. Time-Based

Take snapshot if last snapshot is older than threshold:

```typescript
if (Date.now() - lastSnapshot.timestamp > ONE_HOUR) {
  await snapshotManager.takeSnapshot(aggregate);
}
```

**Pros:** Adapts to access patterns  
**Cons:** May miss high-activity periods

### 3. On-Demand

Take snapshot when loading takes too long:

```typescript
async function loadAggregate(aggregateId: string): Promise<Aggregate> {
  const startTime = Date.now();
  const aggregate = await loadWithOptionalSnapshot(aggregateId);
  
  if (Date.now() - startTime > 100) {  // Took > 100ms
    await snapshotManager.takeSnapshot(aggregate);
  }
  
  return aggregate;
}
```

**Pros:** Only snapshots when needed  
**Cons:** First slow load isn't prevented

## Snapshot Frequency Trade-offs

| Frequency | Pros | Cons |
|-----------|------|------|
| **High** (every 10 events) | Fast reconstruction | More storage, overhead |
| **Medium** (every 100 events) | Balanced | Occasional slow loads |
| **Low** (every 1000 events) | Less overhead | Slower reconstruction |

**Recommendation:** Start with 100 events and adjust based on performance metrics.

## Snapshot Versioning

When aggregate structure changes, snapshots may become incompatible:

```typescript
interface Snapshot {
  aggregateId: string;
  aggregateType: string;
  version: number;
  state: SerializedState;
  timestamp: Date;
  schemaVersion: number;  // Add schema version for migrations
}

async function loadSnapshot(id: string): Promise<Aggregate | null> {
  const snapshot = await snapshotStore.read(id);
  
  if (!snapshot) return null;
  
  // Migrate if old schema version
  if (snapshot.schemaVersion < CURRENT_SCHEMA_VERSION) {
    snapshot.state = migrateSnapshot(snapshot.state, snapshot.schemaVersion);
  }
  
  return deserialize(snapshot.state);
}
```

## Common Mistakes

### 1. Not Handling Missing Snapshots

Code must work whether snapshots exist or not. Don't assume snapshots are always present.

### 2. Snapshot/Event Mismatch

Ensure snapshot version aligns with events. If snapshot is at v100, load events from v101.

### 3. Stale Snapshots

Don't use snapshots if events have been deleted or the event store has been reset.

### 4. Snapshotting Too Often

Frequent snapshots add overhead. Find the right balance for your access patterns.

## When NOT to Use Snapshots

- **Short-lived aggregates** - Shopping carts, sessions that don't accumulate many events
- **Small domains** - If aggregates rarely exceed 50-100 events, snapshots add complexity without benefit
- **Debugging scenarios** - Sometimes you want to see the full event history

## Relationship to CQRS

Snapshotting is **independent of CQRS**:
- Used in the write model to speed up aggregate loading
- Read models (projections) don't typically use snapshots
- Can be used with or without CQRS

## FOE Alignment

Snapshotting supports **Fast Feedback Loops** by maintaining consistent response times as the system grows. Without snapshots, performance degrades over time as aggregates accumulate events, eventually impacting user experience.

The optimization also demonstrates **Understanding** - by measuring and addressing performance characteristics, teams make informed decisions about when and how to snapshot.
