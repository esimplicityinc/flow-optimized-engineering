---
displayed_sidebar: fieldGuideSidebar
sidebar_position: 5
title: Aggregate
pillar: tactical-design
description: A cluster of domain objects treated as a single unit for data changes.
---

# Aggregate

**Pillar:** Tactical Design

An Aggregate is a cluster of domain objects that are treated as a single unit for the purpose of data changes. Each aggregate has a root entity (the Aggregate Root) that controls access to the aggregate and ensures consistency.

## Definition

> A cluster of associated objects that are treated as a unit for the purpose of data changes. External references are restricted to one member of the Aggregate, designated as the root. A set of consistency rules applies within the Aggregate's boundaries.
>
> — Eric Evans, DDD Reference

## Why It Matters

Aggregates are essential because:

- **Define consistency boundaries** - All invariants within an aggregate are enforced
- **Simplify concurrency** - Only one aggregate is locked per transaction
- **Enable scalability** - Aggregates can be distributed independently
- **Clarify ownership** - The aggregate root is the single entry point
- **Guide transaction scope** - One transaction should modify one aggregate

## Design Rules

1. **Reference by identity** - Aggregates reference other aggregates by ID, not direct object reference
2. **Keep aggregates small** - Prefer smaller aggregates; large ones cause contention
3. **One aggregate per transaction** - Modify only one aggregate in a single transaction
4. **Protect invariants** - All business rules within the aggregate must be satisfied after any change
5. **Delete as a unit** - When the root is deleted, everything inside goes with it

## Aggregate Root Responsibilities

The aggregate root:
- Is the only member accessible from outside
- Ensures all invariants are satisfied
- Controls all modifications to the aggregate
- Generates domain events for significant changes
- Has a globally unique identity

## Example

```
┌─────────────────────────────────────────┐
│              Order (Root)               │
│  - orderId                              │
│  - customerId (reference by ID)         │
│  - status                               │
│  - placedAt                             │
│                                         │
│  ┌─────────────────────────────────┐    │
│  │         OrderLine               │    │
│  │  - productId (reference by ID)  │    │
│  │  - quantity                     │    │
│  │  - unitPrice                    │    │
│  └─────────────────────────────────┘    │
│                                         │
│  Invariant: Order total must be > 0     │
│  Invariant: Cannot modify after shipped │
└─────────────────────────────────────────┘
```

## Common Mistakes

- **Too large** - Including too many entities causes lock contention and complexity
- **Cross-aggregate transactions** - Trying to modify multiple aggregates atomically
- **Direct references** - Holding object references to other aggregates instead of IDs
- **Anemic aggregates** - Aggregates without behavior, just data containers
- **Exposing internals** - Allowing direct access to entities inside the aggregate

## Sizing Guidelines

| Indicator | Suggests |
|-----------|----------|
| High contention on updates | Aggregate too large |
| Frequent cross-aggregate transactions | Boundaries may be wrong |
| Invariants span multiple aggregates | Consider merging or redesigning |
| Large object graphs loaded together | May need to split |

## Relationship to Other Patterns

- **Entity** - The aggregate root is always an entity
- **Value Object** - Aggregates often contain value objects
- **Repository** - One repository per aggregate root
- **Domain Event** - Aggregates publish events for significant changes
- **Factory** - Complex aggregates may need factories for creation

## FOE Alignment

Aggregates support both **Confidence** and **Fast Feedback**. By defining clear consistency boundaries, aggregates ensure that business rules are always enforced—you can trust that an aggregate is in a valid state. The constraint of one aggregate per transaction keeps transactions small and fast, enabling quick feedback cycles and reducing the blast radius of failures.
