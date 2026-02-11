---
displayed_sidebar: fieldGuideSidebar
sidebar_position: 1
title: Layered Architecture
status: well-established
source:
  url: https://en.wikipedia.org/wiki/Multilayered_architecture
  authors:
    - Frank Buschmann
    - Regine Meunier
    - Hans Rohnert
    - Peter Sommerlad
    - Michael Stal
  publication_year: 1996
  organization: Pattern-Oriented Software Architecture (POSA1)
version: "1996"
pillars:
  - separation-of-concerns
  - dependency-management
  - abstraction-layers
related_frameworks:
  - domain-driven-design
  - clean-architecture
  - hexagonal-architecture
description: A classic architectural pattern organizing code into horizontal layers, each with specific responsibilities and dependencies pointing inward toward the domain.
---

# Layered Architecture

Layered Architecture is one of the most fundamental and widely-used architectural patterns in software engineering. First formally described in the seminal *Pattern-Oriented Software Architecture* (POSA1) by Buschmann et al. (1996), it organizes software components into horizontal layers, each with a specific responsibility and role within the application.

This pattern remains relevant today as the foundation for many modern architectural approaches, including Clean Architecture and Hexagonal Architecture, which can be seen as evolutions that address some of layered architecture's limitations.

## Key Concepts

### Separation of Concerns
Each layer has a distinct responsibility:
- **Presentation Layer**: User interface, API endpoints, view rendering
- **Business Logic Layer**: Domain rules, use cases, application services
- **Data Access Layer**: Database access, external API clients, file systems

### The Dependency Rule
Dependencies should only point inward. The domain layer at the center knows nothing about the presentation or data layers. This inversion of dependency direction is crucial for testability and flexibility.

### Layer Isolation
Layers communicate through well-defined interfaces. The implementation details of one layer should not leak into another.

## Methods

import FrameworkMethodList from '@site/src/components/FrameworkMethodList';

<FrameworkMethodList framework="layered-architecture" />

## From Layered to Modern Architecture

Layered Architecture evolved into more sophisticated patterns:

- **Hexagonal Architecture** (Ports & Adapters) - Makes dependencies explicit through ports
- **Clean Architecture** (Onion Architecture) - Emphasizes the dependency rule more strictly
- **Vertical Slice Architecture** - Organizes by feature rather than technical concern

These modern approaches address the "Lasagna Architecture" anti-pattern—excessive layering that creates unnecessary complexity.

## FOE Alignment

Layered Architecture supports FOE principles:

- **Understanding** - Clear separation makes code organization obvious; developers know where to find specific functionality
- **Fast Feedback** - Layer isolation enables targeted testing; changes in one layer don't require testing others
- **Confidence** - Well-defined boundaries prevent unintended coupling; the dependency rule makes dependencies explicit

## Further Reading

- [Pattern-Oriented Software Architecture (POSA1)](https://www.amazon.com/Pattern-Oriented-Software-Architecture-System-Patterns/dp/0471958697) - The foundational text
- [Martin Fowler - Patterns of Enterprise Application Architecture](https://martinfowler.com/books/eaa.html) - Repository and Service Layer patterns
- [Clean Architecture by Robert C. Martin](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html) - Evolution of layered principles
