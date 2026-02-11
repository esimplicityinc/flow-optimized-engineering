---
displayed_sidebar: fieldGuideSidebar
sidebar_position: 1
title: Software Architecture
adopted_methods:
  - framework: domain-driven-design
    method: bounded-context
    foe_maturity: hypothesized
  - framework: domain-driven-design
    method: aggregate
    foe_maturity: hypothesized
  - framework: domain-driven-design
    method: repository
    foe_maturity: hypothesized
  - framework: domain-driven-design
    method: context-mapping
    foe_maturity: hypothesized
  - framework: domain-driven-design
    method: domain-event
    foe_maturity: hypothesized
  - framework: domain-driven-design
    method: application-service
    foe_maturity: hypothesized
  - framework: domain-driven-design
    method: subdomains
    foe_maturity: hypothesized
  - framework: domain-driven-design
    method: value-object
    foe_maturity: hypothesized
  - framework: domain-driven-design
    method: entity
    foe_maturity: hypothesized
  - framework: domain-driven-design
    method: domain-service
    foe_maturity: hypothesized
  - framework: event-sourcing
    method: domain-event-modeling
    foe_maturity: hypothesized
  - framework: event-sourcing
    method: event-stream-storage
    foe_maturity: hypothesized
  - framework: event-sourcing
    method: state-reconstruction
    foe_maturity: hypothesized
  - framework: event-sourcing
    method: projection-building
    foe_maturity: hypothesized
  - framework: event-sourcing
    method: snapshotting
    foe_maturity: hypothesized
  - framework: event-sourcing
    method: event-versioning
    foe_maturity: hypothesized
  - framework: event-sourcing
    method: temporal-queries
    foe_maturity: hypothesized
  - framework: event-sourcing
    method: event-replay
    foe_maturity: hypothesized
  - framework: event-sourcing
    method: cqrs-integration
    foe_maturity: hypothesized
  - framework: layered-architecture
    method: layer-responsibility-definition
    foe_maturity: validated
  - framework: layered-architecture
    method: dependency-direction-enforcement
    foe_maturity: validated
  - framework: layered-architecture
    method: inter-layer-interface-design
    foe_maturity: validated
  - framework: layered-architecture
    method: data-transfer-object-pattern
    foe_maturity: validated
  - framework: layered-architecture
    method: repository-pattern
    foe_maturity: validated
  - framework: layered-architecture
    method: service-layer-pattern
    foe_maturity: validated
  - framework: layered-architecture
    method: layer-isolation-testing
    foe_maturity: validated
---

import GuideMaturitySummary from '@site/src/components/GuideMaturitySummary';
import MethodList from '@site/src/components/MethodList';

# Software Architecture

A collection of flow-optimized methods for internal code design, data architecture, and architecture decision-making.

## What This Guide Covers

Software architecture shapes how code is organized within applications and services. Design patterns, layering strategies, data modeling, and API design all determine how easily code can be understood, tested, and modified. This guide collects methods for making these internal design decisions in ways that optimize for flow.

Good software architecture isn't about following trends—it's about choosing patterns that make code intention clear, dependencies explicit, and changes safe through well-defined boundaries and testable components.

### Internal Code Architecture

Design patterns, SOLID principles, clean architecture, hexagonal architecture, and modular monolith patterns that organize code for maintainability and testability.

### Data & API Architecture

Database design principles, API design (REST, GraphQL, RPC trade-offs), event-driven patterns, and caching strategies that balance performance with simplicity.

### Architecture Decision Making

Architecture Decision Records (ADRs), C4 diagrams, documentation practices, and technical debt management approaches that capture and communicate architectural choices.

## Methods

This guide draws on methods from Domain-Driven Design, a well-established approach to software architecture that aligns well with FOE principles. As we gather internal observations, methods will be promoted to internal status with FOE-specific guidance.

### From Domain-Driven Design

#### Strategic Design

Methods for decomposing systems and managing boundaries:

- [Bounded Context](/docs/external-frameworks/domain-driven-design/methods/M103-bounded-context) - A boundary within which a domain model is defined and applicable
- [Context Mapping](/docs/external-frameworks/domain-driven-design/methods/M108-context-mapping) - Documenting relationships between bounded contexts
- [Subdomains](/docs/external-frameworks/domain-driven-design/methods/M134-subdomains) - Categorizing domain areas by strategic importance (Core, Supporting, Generic)

#### Tactical Design - Consistency & State

Methods for managing data consistency and state:

- [Aggregate](/docs/external-frameworks/domain-driven-design/methods/M100-aggregate) - A cluster of objects treated as a single unit for data changes
- [Entity](/docs/external-frameworks/domain-driven-design/methods/M119-entity) - Objects defined by identity rather than attributes
- [Value Object](/docs/external-frameworks/domain-driven-design/methods/M143-value-object) - Immutable objects defined by their attributes
- [Repository](/docs/external-frameworks/domain-driven-design/methods/M132-repository) - Collection-like interface for accessing aggregates

#### Tactical Design - Behavior & Events

Methods for organizing behavior and communication:

- [Application Service](/docs/external-frameworks/domain-driven-design/methods/M101-application-service) - Use case orchestration coordinating domain objects
- [Domain Service](/docs/external-frameworks/domain-driven-design/methods/M117-domain-service) - Stateless operations representing domain concepts
- [Domain Event](/docs/external-frameworks/domain-driven-design/methods/M116-domain-event) - A record of something significant that happened in the domain

### From Event Sourcing

Methods for building systems that store state as a sequence of immutable events:

#### Core Concepts

- [Domain Event Modeling](/docs/external-frameworks/event-sourcing/methods/M240-domain-event-modeling) - Modeling business activities as discrete events using ubiquitous language
- [Event Stream Storage](/docs/external-frameworks/event-sourcing/methods/M241-event-stream-storage) - Storing events in append-only, ordered streams per aggregate
- [State Reconstruction](/docs/external-frameworks/event-sourcing/methods/M242-state-reconstruction) - Rebuilding entity state by replaying events (left fold)

#### Operational Patterns

- [Projection Building](/docs/external-frameworks/event-sourcing/methods/M243-projection-building) - Creating read-optimized views from event streams
- [Snapshotting](/docs/external-frameworks/event-sourcing/methods/M244-snapshotting) - Periodic state snapshots to optimize reconstruction performance
- [Event Versioning](/docs/external-frameworks/event-sourcing/methods/M245-event-versioning) - Managing schema evolution of events over time

#### Advanced Patterns

- [Temporal Queries](/docs/external-frameworks/event-sourcing/methods/M246-temporal-queries) - Querying state at any point in time
- [Event Replay](/docs/external-frameworks/event-sourcing/methods/M247-event-replay) - Reprocessing events for debugging, testing, or migration
- [CQRS Integration](/docs/external-frameworks/event-sourcing/methods/M248-cqrs-integration) - Separating command (write) and query (read) responsibilities

### From Layered Architecture

The foundational pattern for organizing code into distinct layers with clear responsibilities. These methods provide the basis for Clean Architecture, Hexagonal Architecture, and other modern approaches.

#### Layer Organization

- [Layer Responsibility Definition](/docs/external-frameworks/layered-architecture/methods/M209-layer-responsibility-definition) - Assigning clear responsibilities to Presentation, Business Logic, and Data Access layers
- [Dependency Direction Enforcement](/docs/external-frameworks/layered-architecture/methods/M210-dependency-direction-enforcement) - Ensuring dependencies only point inward toward the domain

#### Communication Patterns

- [Inter-Layer Interface Design](/docs/external-frameworks/layered-architecture/methods/M211-inter-layer-interface-design) - Defining contracts between layers
- [Data Transfer Object Pattern](/docs/external-frameworks/layered-architecture/methods/M212-data-transfer-object-pattern) - Managing data flow between layers without exposing domain internals

#### Implementation Patterns

- [Repository Pattern](/docs/external-frameworks/layered-architecture/methods/M213-repository-pattern) - Abstracting data access within the persistence layer
- [Service Layer Pattern](/docs/external-frameworks/layered-architecture/methods/M214-service-layer-pattern) - Orchestrating business logic operations

#### Testing

- [Layer Isolation Testing](/docs/external-frameworks/layered-architecture/methods/M215-layer-isolation-testing) - Unit testing within layer boundaries

## Getting Started

1. Browse the methods above
2. Check their maturity level to understand how well-tested they are
3. Review the supporting observations to understand the evidence
4. Try the methods that fit your context
5. Consider [contributing your own observations](../contributing-observations)
