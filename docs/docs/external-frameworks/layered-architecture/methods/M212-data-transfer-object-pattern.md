---
methodId: M212
displayed_sidebar: fieldGuideSidebar
sidebar_position: 4
title: Data Transfer Object Pattern
pillar: abstraction-layers
description: Managing data flow between layers
---

# Data Transfer Object Pattern

**Pillar:** Abstraction Layers

Layers need to exchange data, but exposing domain entities directly creates coupling problems: lazy loading exceptions, serialization issues, and leaking internal state. DTOs provide a clean separation by carrying data between layers.

## Definition

> A Data Transfer Object (DTO) is an object that carries data between processes or across layer boundaries. DTOs contain no business logic, only storage, accessors, and possibly serialization. They decouple the internal domain model from external representations.
>
> — Fowler, Patterns of Enterprise Application Architecture (2002)

## DTO Types

### Request DTOs (Inbound)
- Validation annotations
- Primitive or value types
- No domain logic
- Immutable

### Response DTOs (Outbound)
- Flattened structure (no lazy loading)
- Formatted for clients
- Calculated fields included
- No circular references

### Query/Filter DTOs
- Parameterize data retrieval
- Pagination and sorting
- Search criteria

## Why It Matters

- **Prevents lazy loading issues** - No surprises in serialization
- **Shapes data** - Return exactly what's needed
- **Hides internals** - Domain structure can evolve independently
- **Enables optimization** - Projection queries for performance

## Common Mistakes

- Leaky abstractions (exposing entities with lazy loading)
- DTO explosion (too many variations)
- Anemic domain model (using DTOs everywhere)
- Putting business logic in DTOs

## FOE Alignment

Supports **Understanding** by making data contracts explicit, **Confidence** through no serialization surprises, and **Fast Feedback** via compile-time type safety.

## References

- Fowler, M. (2002). *Patterns of Enterprise Application Architecture*. Addison-Wesley.
- Gamma, E., et al. (1994). *Design Patterns*. Addison-Wesley.
