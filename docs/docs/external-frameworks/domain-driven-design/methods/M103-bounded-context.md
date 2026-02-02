---
methodId: M103
displayed_sidebar: fieldGuideSidebar
sidebar_position: 1
title: Bounded Context
pillar: strategic-design
description: A boundary within which a particular domain model is defined and applicable.
observations:
  - O115
  - O121
---

# Bounded Context

**Pillar:** Strategic Design

A Bounded Context is the central pattern in Domain-Driven Design's strategic design. It explicitly defines the boundary within which a particular domain model is defined and applicable. Within a bounded context, terms have precise, unambiguous meanings.

## Definition

> A description of a boundary (typically a subsystem, or the work of a particular team) within which a particular model is defined and applicable.
>
> — Eric Evans, DDD Reference

## Why It Matters

Bounded Contexts are essential because:

- **Prevents model corruption** - Different parts of a system can use the same term with different meanings without conflict
- **Enables team autonomy** - Teams can evolve their models independently within their context
- **Supports microservices** - Each microservice typically represents one bounded context
- **Reduces cognitive load** - Developers only need to understand the model within their context
- **Clarifies integration points** - Relationships between contexts are explicit and managed

## How to Identify Bounded Contexts

Look for these signals when identifying context boundaries:

1. **Linguistic boundaries** - The same term means different things to different groups (e.g., "Account" in billing vs. authentication)
2. **Team boundaries** - Different teams own different parts of the system
3. **Business capability boundaries** - Distinct business functions (ordering, shipping, billing)
4. **Legacy system boundaries** - Existing systems that have their own models
5. **Consistency requirements** - Areas that need strong transactional consistency

## Common Mistakes

- **Too large** - A bounded context that encompasses the entire system provides no benefit
- **Too small** - Creating a context for every entity leads to excessive integration overhead
- **Ignoring linguistic differences** - Forcing a single model when terms have different meanings
- **Coupling contexts** - Sharing databases or models across context boundaries

## Relationship to Other Patterns

- **Ubiquitous Language** - Each bounded context has its own ubiquitous language
- **Context Mapping** - Documents relationships between bounded contexts
- **Aggregates** - Live within a single bounded context
- **Anti-Corruption Layer** - Protects a context from external model corruption

## FOE Alignment

Bounded Context strongly supports the FOE principle of **Optimize for Understanding**. By limiting the scope of any single model, it reduces the cognitive load on developers. You don't need to understand the entire system—just your context. This constraint enables faster onboarding, clearer code ownership, and more confident changes within the boundary.

## Related Observations

- [DDD Bounded Contexts Observation](/docs/field-guides/observations/external/O108-ddd-bounded-contexts) - External observation linking Bounded Contexts to the True Microservices method
