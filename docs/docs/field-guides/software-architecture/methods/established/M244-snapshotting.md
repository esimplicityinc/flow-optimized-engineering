---
methodId: M244
displayed_sidebar: fieldGuideSidebar
sidebar_position: 24
title: "Snapshotting"
sidebar_label: "Snapshotting"
description: "Periodic state snapshots to optimize reconstruction performance"
external_method:
  framework: event-sourcing
  method: snapshotting
  id: M244
foe_maturity: hypothesized
observations: []
---

import ExternalMethodHeader from '@site/src/components/ExternalMethodHeader';

# Snapshotting

<ExternalMethodHeader />

## Why This Matters for Software Architecture

Without snapshots, long-lived aggregates become slower to load as they accumulate events. Snapshotting maintains consistent performance regardless of aggregate age.

**Architecture Benefits:**
- Constant-time aggregate loading
- Reduces replay overhead
- Enables archiving old events
- Supports long-lived aggregates

**FOE Alignment:**
- **Understanding** - Performance characteristics remain predictable
- **Confidence** - System performance doesn't degrade over time
- **Fast Feedback** - Fast aggregate loading for command processing

## Adaptations for Software Architecture

### Snapshot Strategy

```typescript
class SnapshotManager {
  async shouldSnapshot(aggregate: Aggregate): Promise<boolean> {
    const lastSnapshot = await this.getLastSnapshot(aggregate.id);
    const eventsSince = aggregate.version - (lastSnapshot?.version ?? 0);
    return eventsSince >= 100;  // Every 100 events
  }
  
  async takeSnapshot(aggregate: Aggregate): Promise<void> {
    await snapshotStore.save({
      aggregateId: aggregate.id,
      version: aggregate.version,
      state: serialize(aggregate),
      timestamp: new Date()
    });
  }
}
```

### Loading with Snapshots

```typescript
async function loadAggregate(id: string): Promise<Order> {
  // Try snapshot first
  const snapshot = await snapshotStore.read(id);
  
  const fromVersion = snapshot ? snapshot.version + 1 : 1;
  const events = await eventStore.readStream(id, { fromVersion });
  
  // Start from snapshot or empty
  let order = snapshot 
    ? deserialize(snapshot.state) 
    : new Order(id);
  
  // Apply remaining events
  for (const event of events) {
    order = order.applyEvent(event);
  }
  
  return order;
}
```

## Questions We're Exploring

- What is the optimal snapshot frequency?
- How do we handle snapshot storage costs?
- When should we skip snapshotting entirely?

## Supporting Evidence

