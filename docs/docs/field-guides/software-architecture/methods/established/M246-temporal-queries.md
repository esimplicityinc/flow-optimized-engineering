---
methodId: M246
displayed_sidebar: fieldGuideSidebar
sidebar_position: 26
title: "Temporal Queries"
sidebar_label: "Temporal Queries"
description: "Querying state at any point in time"
external_method:
  framework: event-sourcing
  method: temporal-queries
  id: M246
foe_maturity: hypothesized
observations: []
---

import ExternalMethodHeader from '@site/src/components/ExternalMethodHeader';

# Temporal Queries

<ExternalMethodHeader />

## Why This Matters for Software Architecture

Temporal queries allow asking "what was the state at time X?" - a capability impossible in traditional CRUD systems. This enables auditing, debugging, and compliance features.

**Architecture Benefits:**
- Complete audit trail
- Time-travel debugging
- Compliance and legal discovery
- Historical analytics

**FOE Alignment:**
- **Understanding** - Visibility into state evolution
- **Confidence** - Can answer "what happened when" questions
- **Fast Feedback** - Historical analysis supports decision-making

## Adaptations for Software Architecture

### Temporal Query Implementation

```typescript
async function getStateAtTime<T>(
  aggregateId: string,
  timestamp: Date,
  aggregateClass: new () => T
): Promise<T | null> {
  const allEvents = await eventStore.readStream(aggregateId);
  
  // Filter to events up to timestamp
  const relevantEvents = allEvents.filter(
    e => e.occurredAt <= timestamp
  );
  
  // Reconstruct state
  return relevantEvents.reduce(
    (agg, event) => agg.applyEvent(event),
    new aggregateClass()
  );
}
```

### Business Time vs System Time

```typescript
interface DomainEvent {
  occurredAt: Date;  // Business time - when it happened
  recordedAt: Date;  // System time - when we recorded it
}
```

Use business time for domain queries, system time for technical troubleshooting.

## Questions We're Exploring

- How do we handle performance of temporal queries on large streams?
- When should we pre-compute temporal projections?
- What are the storage implications of time-series queries?

## Supporting Evidence

