---
methodId: M214
displayed_sidebar: fieldGuideSidebar
sidebar_position: 6
title: Service Layer Pattern
pillar: abstraction-layers
description: Orchestrating business logic operations
---

# Service Layer Pattern

**Pillar:** Abstraction Layers

Business operations often span multiple domain objects, repositories, and external services. The Service Layer provides a clean boundary for use case orchestration, coordinating domain objects to fulfill application operations.

## Definition

> A Service Layer defines an application's boundary and its set of available operations from the perspective of the interfacing client layers. It encapsulates the application's business logic, transaction control, and coordination of responses.
>
> — Fowler, Patterns of Enterprise Application Architecture (2002)

## Types of Services

### Application Services
- Orchestrate use cases
- Coordinate domain objects
- Transaction boundaries
- No business logic (just coordination)

### Domain Services
- Stateless business logic
- Operations involving multiple aggregates
- Pure domain, no infrastructure

### Infrastructure Services
- Technical implementations
- Abstract external concerns

## Why It Matters

- **Thin controllers** - HTTP concerns only in presentation
- **Reusable operations** - Same logic across UIs
- **Transaction boundaries** - Clear atomic operations
- **Testable units** - Services are cohesive and focused

## Common Mistakes

- Anemic service (just passing through to repository)
- God service (too many responsibilities)
- Business logic in services (should be in domain)
- Missing transaction boundaries

## FOE Alignment

Supports **Understanding** by making use cases explicit, **Confidence** through testable orchestration, and **Fast Feedback** via service-level unit testing.

## References

- Fowler, M. (2002). *Patterns of Enterprise Application Architecture*. Addison-Wesley.
- Evans, E. (2003). *Domain-Driven Design*. Addison-Wesley.
