---
displayed_sidebar: fieldGuideSidebar
sidebar_position: 1
title: Clean Architecture / Hexagonal Architecture
status: well-established
source:
  url: https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html
  authors:
    - Alistair Cockburn
    - Robert C. Martin
  publication_year: 2005
  organization: Independent
version: "2017"
pillars:
  - dependency-management
  - layer-organization
  - testability
  - technology-independence
related_frameworks:
  - domain-driven-design
  - solid-principles
  - test-driven-development
description: Architectural patterns that emphasize separation of concerns, dependency direction, and testability through concentric layers or ports and adapters.
---

# Clean Architecture / Hexagonal Architecture

Clean Architecture (Robert C. Martin, 2012) and Hexagonal Architecture (Alistair Cockburn, 2005) are closely related architectural patterns that organize code to maximize maintainability, testability, and independence from external concerns. While they use different metaphors—concentric circles versus hexagons with ports—they share the same fundamental principles.

## Key Concepts

### The Dependency Rule

The core principle of both architectures: **dependencies must point inward**. Inner layers (business logic) know nothing about outer layers (frameworks, UI, databases). Outer layers depend on inner layers through abstractions (interfaces/ports).

### Layer Organization

Clean Architecture organizes code into concentric layers:

1. **Entities** - Enterprise-wide business objects and rules
2. **Use Cases** - Application-specific business rules
3. **Interface Adapters** - Converters between use cases and external formats
4. **Frameworks & Drivers** - External tools and frameworks (UI, database, web)

Hexagonal Architecture uses a similar structure with:
- **Domain** (inside) - Business logic
- **Ports** - Interfaces for external communication
- **Adapters** - Implementations of ports for specific technologies

### Technology Independence

Both architectures decouple business logic from:
- UI frameworks (React, Angular, mobile)
- Database technologies (SQL, NoSQL)
- External services (REST, gRPC, message queues)
- Testing frameworks

This allows swapping technologies without changing business logic.

## Methods

import FrameworkMethodList from '@site/src/components/FrameworkMethodList';

<FrameworkMethodList framework="clean-architecture" />

## FOE Alignment

Clean/Hexagonal Architecture strongly aligns with Flow Optimized Engineering principles:

- **Understanding** - Clear separation of concerns makes code intent explicit; each layer has a single responsibility
- **Fast Feedback** - Business logic can be tested without external dependencies; tests run fast and reliably
- **Confidence** - Dependency rule prevents accidental coupling; changes in outer layers can't break inner layers

## Further Reading

- [The Clean Architecture (Robert C. Martin, 2012)](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [Hexagonal Architecture (Alistair Cockburn, 2005)](https://alistair.cockburn.us/hexagonal-architecture/)
- [Clean Architecture: A Craftsman's Guide to Software Structure and Design (Robert C. Martin, 2017)](https://www.amazon.com/Clean-Architecture-Craftsmans-Software-Structure/dp/0134494164)
- [Hexagonal Architecture Explained (2024)](https://medium.com/idealo-tech-blog/hexagonal-ports-adapters-architecture-e3617bcf00a)
