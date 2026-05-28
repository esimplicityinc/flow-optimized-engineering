---
methodId: M300
sidebar_position: 1
title: "Context Contract Design"
maturity: hypothesized
priority: essential
observations: []
---

import InternalMethodHeader from '@site/src/components/InternalMethodHeader';
import RelatedObservations from '@site/src/components/RelatedObservations';

# Context Contract Design

<InternalMethodHeader />

Attach a structured metadata sidecar to every piece of ingested information, declaring its authority, recency, and scope so AI agents can reason about trustworthiness before acting on content.

:::caution Early Stage
This method is still being validated through observations.
:::

## Overview

When an AI agent retrieves information, it faces an implicit question it cannot answer without help: *should I trust this?* A document from a 2019 policy memo and one from last week's board meeting may look identical to a retrieval system but carry radically different weight.

The Context Contract pattern solves this by treating metadata as a first-class citizen of data ingestion. Every artifact — document, database row, email, API response — receives a structured "sidecar" that declares three properties: **authority** (how much to trust this source), **recency** (whether this information is still valid), and **scope** (who is permitted to see and act on it).

This isn't just good data hygiene. It's the foundation that makes all other semantic layer methods reliable. Without context contracts, retrieval ensembles surface content but cannot weigh it. Memory consolidation compresses meaning but cannot preserve trust signals. Source attribution can point to a node but cannot communicate whether that node should have been trusted.

## When to Use

Use this method when:

- Ingesting documents from sources with varying authority levels (official policy vs. informal notes)
- Building systems where data freshness materially affects decision quality
- Operating in regulated environments where access controls must be enforced at the content level
- Designing RAG pipelines where retrieved content will be used to make consequential decisions

## When NOT to Use

Avoid this method when:

- All data comes from a single, homogeneous, always-current source (authority and recency are uniform)
- The system is purely exploratory / low-stakes and the overhead of metadata design outweighs the benefit
- You don't yet have a taxonomy of authority levels — establish that first (see M308 Taxonomy Anchoring)

## How It Works

### Prerequisites

Before starting:
- Identify all data sources that will be ingested into the semantic layer
- Define an authority taxonomy for your domain (e.g., official policy > meeting notes > informal email)
- Determine your recency model (TTL-based, version-based, or event-triggered invalidation)

### Step 1: Define the Contract Schema

Design a metadata schema that captures the three dimensions. A minimal contract:

```json
{
  "authority": "official-policy",
  "recency": {
    "valid_from": "2025-01-01",
    "valid_until": "2026-12-31",
    "is_current": true
  },
  "scope": {
    "visibility": "internal",
    "permitted_roles": ["analyst", "manager"],
    "classification": "confidential"
  }
}
```

### Step 2: Attach Contracts at Ingestion Time

At the point data enters the semantic layer — not after — attach the contract sidecar. This is critical: retrofitting contracts onto already-ingested data is error-prone and often incomplete. Build contract attachment into the ingestion pipeline as a required step, not an optional enrichment.

### Step 3: Propagate Contracts Through Transformations

When a derived artifact is created (a summary, an embedding, a graph node), it inherits the most restrictive contract properties of its source material. A summary derived from one confidential document and one public document is confidential. Implement this inheritance rule explicitly in your transformation pipelines.

### Step 4: Surface Contracts to Consuming Agents

Make the contract readable by downstream agents at query time. When a retriever returns a chunk, the contract travels with it. Agents can then apply trust weighting: lower confidence in older content, refuse to surface restricted content to unauthorized requesters.

## Example

**Without context contracts:**
An agent retrieves three documents to answer "What is our current data retention policy?" It gets a 2019 policy document, a 2023 amendment memo, and an informal Slack thread from last month. It has no way to know which to weight. It synthesizes all three and produces an answer that blends an outdated policy with informal conversation.

**With context contracts:**
The 2019 document carries `authority: superseded, is_current: false`. The 2023 amendment carries `authority: official-policy, is_current: true`. The Slack thread carries `authority: informal-communication`. The agent weights accordingly: the 2023 amendment dominates, the 2019 document is surfaced only as historical context, the Slack thread is omitted from the authoritative answer.

## Common Pitfalls

1. **Attaching contracts after ingestion** — retroactively adding metadata is unreliable. Build contracts into the ingestion pipeline at the source.
2. **Too many authority levels** — a taxonomy with 15 authority levels creates decision paralysis. Start with 3-5 well-defined levels (official, working, informal, superseded).
3. **Static recency** — "valid until 2026" is only useful if someone updates it in 2026. Design recency for automatic invalidation wherever possible.
4. **Orphaned scope controls** — contracts that declare access restrictions but aren't enforced at query time are theater. Wire scope checks into the retrieval layer.

## How You Can Help

If you're testing this method:

1. Review the contract schema design
2. Try it in an ingestion pipeline
3. Document what authority taxonomy you used and whether 3 dimensions were sufficient

## Supporting Evidence

<RelatedObservations />
