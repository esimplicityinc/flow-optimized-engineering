---
methodId: M209
displayed_sidebar: fieldGuideSidebar
sidebar_position: 1
title: Layer Responsibility Definition
pillar: separation-of-concerns
description: Assigning clear responsibilities to Presentation, Business Logic, and Data Access layers
---

# Layer Responsibility Definition

**Pillar:** Separation of Concerns

Clear layer responsibility definition is the foundation of maintainable software. Without explicit boundaries, code becomes a "big ball of mud" where business logic leaks into controllers, database queries appear in UI code, and testing becomes nearly impossible.

## Definition

> Each layer in the architecture should have a single, well-defined responsibility. The Presentation Layer handles user interface and interaction concerns, the Business Logic Layer contains domain rules and workflows, and the Data Access Layer manages persistence and external data sources.
>
> — Based on POSA1 Layered Architecture Pattern

## The Three Classic Layers

### Presentation Layer
**Responsibility:** Handle all user interface and interaction concerns

**Contains:**
- Controllers/API endpoints
- View models/DTOs for UI
- Input validation
- Response formatting
- Authentication/authorization checks

**Does NOT contain:**
- Business rules or calculations
- Direct database queries
- External service calls (except through abstractions)

### Business Logic Layer
**Responsibility:** Encapsulate domain rules, workflows, and use cases

**Contains:**
- Domain models and entities
- Business rules and validations
- Use case orchestration
- Domain services
- Application services

**Does NOT contain:**
- UI framework code
- Database-specific queries
- External API implementations

### Data Access Layer
**Responsibility:** Abstract persistence and external data operations

**Contains:**
- Repository implementations
- Database queries
- ORM mappings
- External API clients
- File system access
- Cache implementations

**Does NOT contain:**
- Business rules
- Use case logic
- UI concerns

## Why It Matters

- **Clear ownership** - Each component has a defined purpose
- **Predictable locations** - Developers know where to find code
- **Parallel development** - Teams can work on different layers simultaneously
- **Easier maintenance** - Changes are isolated to appropriate layers

## Common Mistakes

### The "Smart UI" Anti-Pattern
Putting business logic directly in controllers or views.

### The "Anemic Domain Model"
Putting all logic in services, leaving entities as data bags.

### The "Lasagna Architecture"
Creating too many layers with minimal value, adding indirection without clear benefit.

## FOE Alignment

This method directly supports **Optimize for Understanding** by making code location predictable and reducing cognitive load through clear boundaries. It supports **Fast Feedback Loops** through layer-specific unit testing and **Confidence Through Evidence** by making dependencies explicit.

## References

- Buschmann, F., et al. (1996). *Pattern-Oriented Software Architecture, Volume 1*. Wiley.
- Fowler, M. (2002). *Patterns of Enterprise Application Architecture*. Addison-Wesley.
