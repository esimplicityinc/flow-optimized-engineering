---
methodId: M247
displayed_sidebar: fieldGuideSidebar
sidebar_position: 27
title: "Event Replay"
sidebar_label: "Event Replay"
description: "Reprocessing events for debugging, testing, or migration"
external_method:
  framework: event-sourcing
  method: event-replay
  id: M247
foe_maturity: hypothesized
observations: []
---

import ExternalMethodHeader from '@site/src/components/ExternalMethodHeader';

# Event Replay

<ExternalMethodHeader />

## Why This Matters for Software Architecture

Event replay enables rebuilding state, debugging issues, testing changes, and migrating data. It's a unique capability of event-sourced systems that provides resilience and flexibility.

**Architecture Benefits:**
- Rebuild projections from scratch
- Debug production issues
- Test with historical data
- Schema migration
- Disaster recovery

**FOE Alignment:**
- **Understanding** - Replay shows exactly how state evolved
- **Confidence** - Can rebuild if something goes wrong
- **Fast Feedback** - Fast recovery from failures

## Adaptations for Software Architecture

### Projection Replay

```typescript
async function replayProjections(): Promise<void> {
  // Clear projections
  await projectionStore.clearAll();
  
  // Read all events
  const events = await eventStore.readAllEvents({
    orderBy: 'position',
    ascending: true
  });
  
  console.log(`Replaying ${events.length} events...`);
  
  // Apply to projections
  for (const event of events) {
    for (const projection of projections) {
      await projection.handle(event);
    }
  }
}
```

### Testing with Replay

```typescript
describe('Event Replay Compatibility', () => {
  it('should handle all production events', async () => {
    const productionEvents = await loadProductionSample(1000);
    
    for (const event of productionEvents) {
      expect(() => {
        const order = new Order();
        order.applyEvent(event);
      }).not.toThrow();
    }
  });
});
```

## Questions We're Exploring

- How long does replay take for production-sized systems?
- How do we handle side effects during replay?
- What are the operational procedures for production replays?

## Supporting Evidence

