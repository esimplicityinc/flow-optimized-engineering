---
displayed_sidebar: fieldGuideSidebar
sidebar_position: 1
title: Domain-Driven Design
status: industry-standard
source:
  url: https://www.domainlanguage.com/ddd/
  authors:
    - Eric Evans
  publication_year: 2003
  organization: Domain Language, Inc.
version: "2015-03"
pillars:
  - strategic-design
  - tactical-design
related_frameworks:
  - event-sourcing
  - cqrs
  - microservices
  - hexagonal-architecture
description: An approach to software development that centers development on programming a domain model with a rich understanding of the processes and rules of a domain.
---

# Domain-Driven Design

Domain-Driven Design (DDD) is an approach to software development that centers the development process on programming a domain model that has a rich understanding of the processes and rules of a domain. Originally introduced by Eric Evans in his 2003 book *Domain-Driven Design: Tackling Complexity in the Heart of Software*, DDD has become an industry-standard approach for building complex software systems.

The core premise of DDD is that the most significant complexity in software projects is not technical—it's in the domain itself. By focusing on the domain and building a model that reflects deep understanding of business processes, teams can create software that is both more maintainable and more aligned with business needs.

## Strategic vs Tactical Design

DDD patterns are organized into two categories:

| Category | Focus | Patterns |
|----------|-------|----------|
| **Strategic Design** | System boundaries & team organization | Bounded Context, Ubiquitous Language, Context Mapping, Subdomains |
| **Tactical Design** | Implementation patterns within a context | Aggregate, Entity, Value Object, Domain Event, Repository, Domain Service, Application Service, Factory |

**Strategic Design** addresses the big picture: how to divide a large system into bounded contexts, how teams communicate, and where to invest modeling effort. These patterns are essential for microservices architecture and team autonomy.

**Tactical Design** provides building blocks for implementing a rich domain model within a bounded context. These patterns help create code that expresses domain concepts clearly and maintains consistency.

## Why DDD Matters for FOE

Domain-Driven Design aligns strongly with Flow Optimized Engineering principles:

- **Optimize for Understanding** - Ubiquitous Language creates shared vocabulary between developers and domain experts. Bounded Contexts limit cognitive scope. The domain model itself becomes executable documentation.

- **Fast Feedback Loops** - Domain Events enable reactive architectures and event-driven systems. Small, focused Aggregates support fast testing. Clear boundaries enable independent team deployment.

- **Confidence to Act** - Aggregates define consistency boundaries that prevent invalid states. Value Objects eliminate entire categories of bugs through immutability. Repositories provide consistent data access patterns that are easy to test.

## Methods

import FrameworkMethodList from '@site/src/components/FrameworkMethodList';

<FrameworkMethodList framework="domain-driven-design" />

## Further Reading

- [Domain Language](https://www.domainlanguage.com/ddd/) - Eric Evans' official DDD resources
- [DDD Reference](https://www.domainlanguage.com/ddd/reference/) - Free PDF summarizing DDD patterns
- [Domain-Driven Design: Tackling Complexity in the Heart of Software](https://www.dddcommunity.org/book/evans_2003/) - The original "Blue Book"
- [Implementing Domain-Driven Design](https://www.informit.com/store/implementing-domain-driven-design-9780321834577) - Vaughn Vernon's practical guide (the "Red Book")
- [Martin Fowler's DDD articles](https://martinfowler.com/tags/domain%20driven%20design.html) - Accessible explanations of key concepts
