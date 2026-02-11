---
methodId: M210
displayed_sidebar: fieldGuideSidebar
sidebar_position: 2
title: Dependency Direction Enforcement
pillar: dependency-management
description: Ensuring dependencies only point inward (toward the domain/core)
---

# Dependency Direction Enforcement

**Pillar:** Dependency Management

The direction of dependencies determines how easily your code can change. When dependencies point outward from the domain, business logic becomes coupled to frameworks, databases, and UI libraries. When dependencies point inward, the domain remains pure and stable.

## Definition

> Dependencies in a layered architecture should only point inward, toward the core domain. Outer layers may depend on inner layers, but inner layers must never depend on outer layers. This is achieved through the Dependency Inversion Principle—depending on abstractions rather than concretions.
>
> — Based on Dependency Inversion Principle (Martin, 1996)

## The Dependency Rule

Dependencies should point inward:
```
Presentation → Application → Domain ← Infrastructure
                                    ↓
                              (Domain knows nothing of outer layers)
```

## Implementation Strategies

1. **Define interfaces in inner layers** - Domain defines what it needs
2. **Implement in outer layers** - Infrastructure provides implementations
3. **Use dependency injection** - Framework injects concrete implementations
4. **Enforce with architecture tests** - ArchUnit or similar tools

## Why It Matters

- **Framework independence** - Core logic remains pure
- **Testability** - Can test domain without database setup
- **Flexibility** - Swap technologies without rewriting domain code
- **Stability** - Domain changes less frequently than frameworks

## Common Mistakes

- Direct dependency on framework annotations in domain
- Service locator pattern hiding dependencies
- Framework events published directly from domain

## FOE Alignment

Supports **Understanding** by making coupling visible, **Confidence** through contained changes, and **Fast Feedback** via fast domain tests without infrastructure.

## References

- Martin, R. C. (1996). The Dependency Inversion Principle. C++ Report.
- Buschmann, F., et al. (1996). *Pattern-Oriented Software Architecture, Volume 1*. Wiley.
