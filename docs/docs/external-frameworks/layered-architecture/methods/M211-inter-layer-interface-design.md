---
methodId: M211
displayed_sidebar: fieldGuideSidebar
sidebar_position: 3
title: Inter-Layer Interface Design
pillar: abstraction-layers
description: Defining contracts between layers
---

# Inter-Layer Interface Design

**Pillar:** Abstraction Layers

Interfaces between layers are contracts that define how components communicate. Well-designed interfaces hide implementation details, enable testing, and allow layers to evolve independently.

## Definition

> Inter-layer interfaces should be designed from the perspective of the calling layer, expressing what it needs rather than what the providing layer has. Interfaces should be stable, coarse-grained, and expressive of domain concepts rather than implementation details.
>
> — Based on Interface Segregation Principle and POSA1 patterns

## Principles

1. **Design from consumer perspective** - What does the caller need?
2. **Use domain language** - Speak in business terms, not technical
3. **Be intention-revealing** - Method names express intent, not mechanism
4. **Coarse-grained** - Avoid chatty interfaces across layers

## Interface Types

### Presentation → Application
- Command/Query objects
- DTOs for data transfer
- Application service interfaces

### Application → Domain
- Domain service interfaces
- Repository interfaces (defined in domain)

### Application → Infrastructure
- Gateway interfaces
- Client abstractions

## Why It Matters

- **Clear contracts** - Explicit boundaries between layers
- **Testability** - Can mock interfaces for testing
- **Flexibility** - Implementation can change without affecting callers
- **Team independence** - Layer owners can change internals freely

## FOE Alignment

Supports **Understanding** by documenting layer contracts, **Confidence** through stable interfaces, and **Fast Feedback** via interface-driven testing.

## References

- Martin, R. C. (2002). *Agile Software Development*. Prentice Hall.
- Fowler, M. (2002). *Patterns of Enterprise Application Architecture*. Addison-Wesley.
