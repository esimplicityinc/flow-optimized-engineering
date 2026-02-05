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

## Getting Started

1. Browse the methods above
2. Check their maturity level to understand how well-tested they are
3. Review the supporting observations to understand the evidence
4. Try the methods that fit your context
5. Consider [contributing your own observations](../contributing-observations)
