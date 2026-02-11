---
methodId: M247
displayed_sidebar: fieldGuideSidebar
sidebar_position: 8
title: Event Replay
pillar: advanced-patterns
description: Reprocessing events for debugging, testing, migration, or rebuilding read models.
---

# Event Replay

**Pillar:** Advanced Patterns

Event Replay is the practice of reprocessing historical events to rebuild state, debug issues, test changes, or migrate data. It's a powerful capability unique to event-sourced systems.

## Definition

> Event replay is the process of reading events from the event store and processing them through handlers, projections, or aggregates as if they were happening again. This enables reconstruction of state, rebuilding of read models, and testing of system behavior.

## Why It Matters

Event replay provides capabilities impossible in traditional systems:

- **Rebuild projections** - Fix corrupted read models without data loss
- **Debug production issues** - Replay events to reproduce bugs
- **Test changes** - Verify new code works with historical data
- **Migrate schemas** - Rebuild data with new structures
- **Analytics** - Process historical events for new insights
- **Disaster recovery** - Restore from events after failures

## Types of Event Replay

### 1. Projection Replay

Rebuild read models from scratch:

```typescript
async function replayProjections(
  projectionNames?: string[]
): Promise<void> {
  // Clear existing projections
  for (const name of projectionNames ?? allProjections) {
    await projectionStore.clear(name);
  }
  
  // Read all events in order
  const events = await eventStore.readAllEvents({
    orderBy: 'position',
    ascending: true
  });
  
  console.log(`Replaying ${events.length} events...`);
  
  // Reapply each event to projections
  for (const event of events) {
    for (const projection of projectionHandlers) {
      await projection.handle(event);
    }
    
    // Progress indicator for long replays
    if (event.position % 10000 === 0) {
      console.log(`Processed ${event.position} events...`);
    }
  }
  
  console.log('Replay complete');
}
```

### 2. Debug Replay

Replay specific events to understand behavior:

```typescript
async function replayForDebug(
  aggregateId: string,
  fromVersion?: number,
  toVersion?: number
): Promise<void> {
  const events = await eventStore.readStream(aggregateId, {
    fromVersion: fromVersion ?? 1,
    toVersion: toVersion
  });
  
  console.log(`Replaying ${events.length} events for ${aggregateId}`);
  
  let aggregate = createEmptyAggregate(aggregateId);
  
  for (const event of events) {
    console.log(`\nEvent ${event.version}: ${event.type}`);
    console.log('Before:', aggregate.toJSON());
    
    // Apply with detailed logging
    aggregate = aggregate.applyEvent(event);
    
    console.log('After:', aggregate.toJSON());
    console.log('---');
  }
}

// Usage
await replayForDebug('order-123', 1, 10);
```

### 3. Testing Replay

Verify new code handles old events correctly:

```typescript
describe('Event Replay Compatibility', () => {
  it('should handle all production events', async () => {
    // Load sample of production events
    const productionEvents = await loadProductionEventSample(1000);
    
    for (const event of productionEvents) {
      // Should not throw
      expect(() => {
        const aggregate = new Order();
        aggregate.applyEvent(event);
      }).not.toThrow();
    }
  });
  
  it('should produce same state after replay', async () => {
    const aggregateId = 'order-test-456';
    
    // Load original state from production
    const originalState = await loadProductionState(aggregateId);
    
    // Replay events
    const events = await eventStore.readStream(aggregateId);
    const replayedState = events.reduce(
      (agg, event) => agg.applyEvent(event),
      new Order()
    );
    
    // Should match
    expect(replayedState.toJSON()).toEqual(originalState);
  });
});
```

### 4. Migration Replay

Migrate to new projection schemas:

```typescript
async function migrateToNewSchema(): Promise<void> {
  // Create new projection tables
  await db.execute(`
    CREATE TABLE orders_v2 (
      id VARCHAR(255) PRIMARY KEY,
      customer_id VARCHAR(255),
      total_amount DECIMAL(10,2),
      status VARCHAR(50),
      created_at TIMESTAMP
    )
  `);
  
  // Create new projection handler
  const newProjection = new OrderProjectionV2();
  
  // Replay all events
  const events = await eventStore.readAllEvents();
  
  for (const event of events) {
    await newProjection.handle(event);
  }
  
  // Switch read queries to new table
  await activateNewProjection('orders_v2');
  
  // Drop old table after verification
  await db.execute('DROP TABLE orders_v1');
}
```

## Replay Strategies

### 1. Full Replay

Process all events from the beginning:

**When to use:**
- Initial system setup
- Major projection changes
- Disaster recovery

**Considerations:**
- Can take hours for large systems
- Plan for downtime or dual-run
- Test on copy of production first

### 2. Partial Replay

Process events from a specific point:

```typescript
async function replayFromPosition(
  fromPosition: bigint
): Promise<void> {
  const events = await eventStore.readAllEvents({
    fromPosition,
    orderBy: 'position'
  });
  
  for (const event of events) {
    await projection.handle(event);
  }
}
```

**When to use:**
- Fixing recent projection errors
- Catching up after downtime
- Incremental migration

### 3. Selective Replay

Replay only specific event types:

```typescript
async function replayEventsOfType(
  eventTypes: string[]
): Promise<void> {
  const events = await eventStore.readAllEvents({
    filter: { eventTypes }
  });
  
  for (const event of events) {
    await projection.handle(event);
  }
}
```

**When to use:**
- Adding projection for specific feature
- Fixing bugs in specific event handlers
- Analytics on specific event types

### 4. Parallel Replay

Speed up replay by processing in parallel:

```typescript
async function parallelReplay(
  projection: ProjectionHandler,
  concurrency: number = 4
): Promise<void> {
  const events = await eventStore.readAllEvents();
  
  // Process chunks in parallel
  const chunks = chunk(events, events.length / concurrency);
  
  await Promise.all(
    chunks.map(async (chunk) => {
      for (const event of chunk) {
        await projection.handle(event);
      }
    })
  );
}
```

**When to use:**
- Large event stores
- Stateless projections
- Initial load scenarios

**Caution:** Only use if projection handler is thread-safe and events can be processed out of order.

## Best Practices

### 1. Test Replays in Staging

Always test replay on a copy of production data:
```typescript
// Copy production events to staging
await copyEventsToStaging();

// Run replay
await replayProjectionsInStaging();

// Verify results
await verifyProjectionAccuracy();
```

### 2. Track Replay Progress

For long replays, track progress to enable resumption:
```typescript
interface ReplayState {
  startedAt: Date;
  lastProcessedPosition: bigint;
  totalEvents: number;
  processedEvents: number;
}

async function resumeReplay(): Promise<void> {
  const state = await loadReplayState();
  
  await replayFromPosition(state.lastProcessedPosition);
}
```

### 3. Validate After Replay

Always verify projections after replay:
```typescript
async function validateReplay(): Promise<boolean> {
  // Check row counts
  const eventCount = await eventStore.count();
  const projectionCount = await projectionStore.count();
  
  // Check specific aggregates
  const sampleAggregates = await getSampleAggregates(100);
  
  for (const aggregateId of sampleAggregates) {
    const reconstructed = await reconstructAggregate(aggregateId);
    const projected = await projectionStore.get(aggregateId);
    
    if (!statesMatch(reconstructed, projected)) {
      console.error(`Mismatch for ${aggregateId}`);
      return false;
    }
  }
  
  return true;
}
```

### 4. Handle Side Effects Carefully

Replay should not trigger external side effects:
```typescript
class ProjectionHandler {
  async handle(event: DomainEvent): Promise<void> {
    // Update read model
    await this.updateReadModel(event);
    
    // ❌ Don't do this during replay
    // await this.sendNotification(event);
    
    // ✓ Only in live mode
    if (this.mode === 'live') {
      await this.sendNotification(event);
    }
  }
}
```

## Common Mistakes

### 1. Replaying Side Effects

**Bad:**
```typescript
async handle(event) {
  await updateProjection(event);
  await sendEmail(event);  // Sent again on replay!
}
```

**Good:**
```typescript
async handle(event, context) {
  await updateProjection(event);
  if (context.mode === 'live') {
    await sendEmail(event);
  }
}
```

### 2. Not Handling Event Version Changes

Ensure replay uses upcasters for old event versions:
```typescript
const event = upcasters.upcast(rawEvent);
await projection.handle(event);
```

### 3. Ignoring Event Ordering

Events must be processed in order. Parallel replay only works for specific scenarios.

### 4. No Progress Tracking

Long replays that fail require starting over. Always track progress.

## Relationship to CQRS

Event Replay is **essential for CQRS**:
- Projections are rebuilt via replay
- Read models can be recreated at any time
- Allows schema changes without data migration
- Enables projection optimization experiments

Without Event Sourcing, CQRS requires complex data migration strategies.

## FOE Alignment

Event Replay provides **Confidence** through the ability to reconstruct and verify system state. If projections become corrupted or need schema changes, they can be rebuilt from the immutable event history without data loss.

The practice also supports **Understanding** - being able to replay events to reproduce bugs or understand system behavior provides deep insight into how the domain actually works.
