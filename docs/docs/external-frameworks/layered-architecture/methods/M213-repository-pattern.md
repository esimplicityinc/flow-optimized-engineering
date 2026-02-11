---
methodId: M213
displayed_sidebar: fieldGuideSidebar
sidebar_position: 5
title: Repository Pattern
pillar: abstraction-layers
description: Abstracting data access within the persistence layer
---

# Repository Pattern

**Pillar:** Abstraction Layers

Database access code scattered throughout business logic creates unmaintainable code that's hard to test. The Repository pattern provides a clean abstraction that makes persistence look like an in-memory collection.

## Definition

> Mediates between the domain and data mapping layers using a collection-like interface for accessing domain objects. A Repository encapsulates the set of objects persisted in a data store and the operations performed over them.
>
> — Fowler, Patterns of Enterprise Application Architecture (2002)

## Repository Contract

### Collection-Like Interface
- `save(entity)` - Persist or update
- `findById(id)` - Retrieve by identifier
- `delete(entity)` - Remove
- `findBySpecification(spec)` - Query with criteria
- Domain-specific query methods

### Key Characteristics
- Interface defined in domain layer
- Implementation in infrastructure layer
- Works with full aggregates only
- Returns domain objects, not database rows

## Why It Matters

- **Persistence ignorance** - Domain code doesn't know about databases
- **Testability** - Swap repositories for testing
- **Flexibility** - Change databases without touching domain
- **Query optimization** - Centralized in one place

## Common Mistakes

- Repository per entity instead of per aggregate
- Business logic in repository
- Generic repository losing domain intent
- Exposing database details through interface

## FOE Alignment

Supports **Understanding** by centralizing data access, **Confidence** through test substitution, and **Fast Feedback** via in-memory test repositories.

## References

- Fowler, M. (2002). *Patterns of Enterprise Application Architecture*. Addison-Wesley.
- Evans, E. (2003). *Domain-Driven Design*. Addison-Wesley.
