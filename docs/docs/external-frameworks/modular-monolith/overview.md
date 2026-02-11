---
displayed_sidebar: fieldGuideSidebar
sidebar_position: 1
title: Modular Monolith Architecture
status: well-established
source:
  url: https://github.com/kgrzybek/modular-monolith-with-ddd
  authors:
    - Simon Brown
    - Kamil Grzybek
    - Martin Fowler
  publication_year: 2015
  organization: Independent
version: "2024"
pillars:
  - modularity
  - boundaries
  - evolution
related_frameworks:
  - domain-driven-design
  - clean-architecture
  - microservices
description: An architectural approach that combines the simplicity of monolithic deployment with the maintainability of modular internal structure, providing a pragmatic middle ground between monoliths and microservices.
---

# Modular Monolith Architecture

The Modular Monolith architecture pattern represents a pragmatic middle ground between traditional monolithic applications and distributed microservices systems. Rather than accepting the operational complexity of microservices from day one, this approach advocates for building a single deployable unit that maintains strict internal modularity—allowing teams to defer distribution decisions until they are truly necessary.

This pattern has gained significant traction as organizations experience the hidden costs of premature microservices adoption and seek a more evolutionary path to system architecture.

## Key Concepts

### The Premise: Monolith First

Martin Fowler's influential 2015 article "Monolith First" established the foundational principle: start with a monolithic architecture and only extract services when the boundaries and responsibilities are well understood. The Modular Monolith extends this idea by ensuring the monolith is built with clear internal boundaries from the start, making future extraction straightforward rather than traumatic.

### Internal Modularity

The core innovation of this pattern is treating modules within a monolith as if they were separate services—complete with:

- **Clear ownership** of data and business logic
- **Explicit interfaces** between modules
- **Enforced boundaries** preventing tight coupling
- **Independent deployability preparation** even while deployed together

### The Gradual Extraction Path

Unlike a "big ball of mud" monolith, a modular monolith provides a clear evolutionary path:

1. **Start Modular**: Build with bounded contexts and clear module boundaries
2. **Validate Boundaries**: Run as a monolith while proving the boundaries are correct
3. **Extract When Ready**: Move modules to separate services only when there's clear justification
4. **Preserve Optionality**: Maintain the ability to keep modules in-process if distribution isn't needed

## The "Back from Microservices" Trend

Recent high-profile cases have validated the modular monolith approach:

- **Amazon Prime Video** (2023): Migrated from microservices back to a monolith, achieving 90% cost reduction
- **Shopify** (2022): Re-architected their Rails monolith using modular principles to scale without service explosion
- **Segment** (2020): Documented their migration from microservices back to a monolith due to operational overhead

These cases demonstrate that microservices aren't always the right answer—and that a well-designed modular monolith can scale further than many assume.

## Relationship to Domain-Driven Design

Modular Monolith architecture heavily leverages Domain-Driven Design concepts:

- **Bounded Contexts** define natural module boundaries
- **Aggregates** enforce data ownership within modules
- **Domain Events** enable loose coupling between modules
- **Anti-Corruption Layers** protect module boundaries

The pattern essentially implements DDD's strategic design patterns within a single deployment unit.

## Methods

import FrameworkMethodList from '@site/src/components/FrameworkMethodList';

<FrameworkMethodList framework="modular-monolith" />

## FOE Alignment

The Modular Monolith pattern strongly aligns with Flow Optimized Engineering principles:

### Understanding
- **Clear module boundaries** create mental models that developers can reason about
- **Enforced architecture** prevents "accidental complexity" from creeping in
- **Explicit dependencies** make system interactions visible and comprehensible

### Fast Feedback
- **Single deployment unit** eliminates distributed system debugging complexity
- **In-process communication** provides immediate feedback during development
- **Faster test execution** compared to integration testing distributed services

### Confidence
- **Compilation-time boundary enforcement** catches violations early
- **Gradual extraction path** reduces risk of architectural changes
- **Preserved optionality** means you're never locked into a distribution decision

## When to Use

**Ideal for:**
- New products where domain boundaries aren't yet clear
- Teams without extensive distributed systems experience
- Organizations wanting to delay operational complexity
- Systems where modules need tight coordination
- Cases where network latency would impact user experience

**Consider alternatives when:**
- Teams are geographically distributed and need independent deployment
- Different modules have radically different scaling requirements
- Regulatory requirements mandate strict service isolation
- The organization has mature platform engineering capabilities

## Further Reading

- [Simon Brown - Modular Monoliths (GOTO 2018)](https://www.youtube.com/watch?v=5OjqD-ow8GE)
- [Kamil Grzybek - Modular Monolith Series](https://github.com/kgrzybek/modular-monolith-with-ddd)
- [Martin Fowler - Monolith First (2015)](https://martinfowler.com/bliki/MonolithFirst.html)
- [Amazon Prime Video - Scaling up the Prime Video audio/video monitoring service](https://www.primevideotech.com/video-streaming/scaling-up-the-prime-video-audio-video-monitoring-service-and-reducing-costs-by-90)
- [Shopify - Deconstructing the Monolith](https://shopify.engineering/deconstructing-monolith-designing-software-maximizes-developer-productivity)
- [ThoughtWorks Technology Radar - Modular Monolith](https://www.thoughtworks.com/radar/techniques/modular-monolith)
