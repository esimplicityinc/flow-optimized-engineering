---
methodId: M241
displayed_sidebar: fieldGuideSidebar
sidebar_position: 21
title: "Event Stream Storage"
sidebar_label: "Event Stream Storage"
description: "Storing events in append-only, ordered streams per aggregate"
external_method:
  framework: event-sourcing
  method: event-stream-storage
  id: M241
foe_maturity: hypothesized
observations: []
---

import ExternalMethodHeader from '@site/src/components/ExternalMethodHeader';

# Event Stream Storage

<ExternalMethodHeader />

## Why This Matters for Software Architecture

The way events are stored determines system reliability, performance, and capabilities. Proper event stream storage provides ordering guarantees, optimistic concurrency control, and append-only semantics.

**Architecture Benefits:**
- Immutable audit trail
- Optimistic concurrency control
- Temporal ordering guarantees
- Scalable append-only writes

**FOE Alignment:**
- **Understanding** - Stream structure reflects aggregate boundaries
- **Confidence** - Append-only prevents data loss
- **Fast Feedback** - Optimistic concurrency detects conflicts early

## Adaptations for Software Architecture

### Storage Technology Choices

| Store Type | Examples | Best For |
|------------|----------|----------|
| **Specialized** | EventStoreDB, Axon | Production ES systems |
| **Relational** | PostgreSQL, SQL Server | Teams with DB expertise |
| **Document** | MongoDB, DynamoDB | High write throughput |

### Schema Example (PostgreSQL)

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

## Questions We're Exploring

- When is a specialized event store worth the operational cost?
- How do we handle storage growth over time?
- What are the backup and recovery strategies?

## Supporting Evidence

