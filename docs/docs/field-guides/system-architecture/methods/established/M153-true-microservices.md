---
methodId: M153
displayed_sidebar: fieldGuideSidebar
sidebar_position: 1
title: "True Microservices"
maturity: validated
observations:
  - internal/O101-prima-microservices-architecture
  - internal/O103-prima-presidio-containerization
  - external/O122-team-topologies-inverse-conway
  - external/O121-team-topologies-bounded-contexts
  - external/O113-fowler-lewis-microservices-definition
  - external/O108-ddd-bounded-contexts
  - external/O111-dora-loosely-coupled-architecture
  - external/O110-dora-four-key-metrics
---

import InternalMethodHeader from '@site/src/components/InternalMethodHeader';

# True Microservices

<InternalMethodHeader />

Design service architectures that enable independent team deployment—not distributed monoliths wearing microservices clothing.

## Overview

Microservices have become synonymous with modern architecture, but most "microservices" are actually distributed monoliths—services that share databases, require coordinated deployments, or communicate through chatty synchronous calls. These architectures inherit the operational complexity of distributed systems without the flow benefits of true service independence.

True microservices optimize for independent team flow through **thoughtful service composition**. Each business service can be understood, changed, tested, and deployed without coordinating with other teams. But independence doesn't mean isolation—services compose with **shared platform services** (authentication, messaging, observability) and **capability services** (search, payments, notifications) that do one thing well. The difference from a distributed monolith: these shared services are accessed through stable APIs, not shared databases or synchronized deployments.

The boundaries aren't arbitrary technical splits—they align with team ownership and business capabilities. When Service A deploys, Service B shouldn't notice. When Service B fails, Service A degrades gracefully. The litmus test is simple: **Can a team deploy their service without talking to anyone else?** If the answer is no—because of shared databases, API contracts that require synchronized changes, or deployment ordering requirements—you have a distributed monolith wearing microservices clothing.

## FOE Framing

This method optimizes across all three FOE dimensions:

- **Understanding:** Services aligned to business capabilities are easier to reason about than services split by technical layers
- **Feedback:** Independent deployment enables faster iteration cycles without coordination overhead
- **Confidence:** Blast radius containment and graceful degradation mean changes can be made safely

## When to Use

- **Multiple teams working on the same system** — Independent deployment becomes valuable when coordination costs grow
- **Business capabilities with different change rates** — Some areas evolve rapidly, others are stable
- **Scaling requirements vary by component** — Parts of the system have different load characteristics
- **Need to experiment or fail safely** — Blast radius containment enables bolder changes
- **Team ownership is clear or can be made clear** — Services work best when owned end-to-end

## When NOT to Use

- **Small team, single deployment** — The coordination overhead doesn't exist yet
- **Greenfield without clear boundaries** — Start monolithic, extract when boundaries emerge
- **Latency-critical request paths** — Network hops add latency; measure if it matters
- **Tight transactional requirements** — Distributed transactions are hard; shared-nothing isn't always possible
- **You can't invest in platform capabilities** — True microservices need deployment pipelines, observability, and service discovery

## How It Works

### Prerequisites

Before starting:
- Multiple teams or anticipated team growth
- Investment capacity in platform capabilities (CI/CD, observability, service discovery)
- Clear business domains or capability map

### Step 1: Map Business Capabilities

Before drawing service boundaries, understand your business domains. What distinct capabilities does your system provide? Who owns them conceptually? Services should align with these capabilities, not technical layers.

Don't split by UI/API/Data—split by what the business cares about: Orders, Payments, Inventory, Notifications.

### Step 2: Apply the Independence Litmus Test

For each proposed service boundary, ask: "Can the team owning this service deploy without coordinating with other teams?"

If the answer is "no" because of:
- Shared databases requiring schema coordination
- API changes requiring synchronized deployments  
- Cross-service transactions requiring distributed locks

...then you don't have a real service boundary. Redraw it or accept the coupling.

### Step 3: Design Shared Services Intentionally

Not everything should be independent. Identify what should be shared:

- **Platform services:** Authentication, authorization, observability, messaging infrastructure
- **Capability services:** Cross-cutting business capabilities used by multiple domains (search, notifications, payments)

These shared services need stable APIs, backward compatibility commitments, and clear ownership. They're explicitly shared, not accidentally coupled.

### Step 4: Establish Team Ownership

Each service needs an owner. "Owned by everyone" means "owned by no one."

- Single team owns each business service end-to-end
- Platform teams own shared infrastructure
- Ownership includes on-call, roadmap, and API contracts

Conway's Law isn't a problem to solve—it's a tool to use.

### Step 5: Build for Independent Deployment

Technical enablers for true independence:
- Separate repos or clear boundaries within a monorepo
- Independent CI/CD pipelines per service
- Backward-compatible API evolution (or explicit versioning)
- Health checks and circuit breakers for dependent services
- Per-service observability dashboards

### Step 6: Accept Graceful Degradation

Design for partial failure. When Service B is down, Service A should:
- Serve cached data if possible
- Return degraded responses clearly
- Fail fast with circuit breakers
- Never take the whole system down

The goal: deploy Service A without worrying about Service B's state.

## Example

The **Prima Platform** architecture demonstrates both the benefits and the gaps of pursuing true microservices:

**What worked:**
- Control Tower, Engine, and Web as independent subsystems with separate repos and CI/CD
- Platform services (Kong, Redis, Auth0) accessed via stable APIs
- ADRs documenting architectural decisions for security reviewers

**What revealed distributed monolith characteristics:**
- Engine's readiness check requires Control Tower to be healthy
- 773-line adapter with intimate knowledge of Control Tower's API structure
- Issue #397 raised "merge to monorepo" due to deployment friction

**Key insight:** True microservices require more than just service separation—they require investment in resilience infrastructure (circuit breakers, graceful degradation, API versioning). Without this investment, teams experience the complexity of distribution without the benefits of independence.

## Common Pitfalls

1. **Database sharing** — The most common distributed monolith pattern. If services share a database, they share deployment timing. Extract data ownership with each service.

2. **Synchronous dependency chains** — Long chains of synchronous calls couple services at runtime. Consider async patterns or accept the coupling explicitly.

3. **"Microservices from day one"** — Starting with microservices before understanding boundaries leads to wrong cuts. Start monolithic, extract when natural boundaries emerge.

4. **Platform underinvestment** — Independent deployment requires independent pipelines, observability, and discovery. Without platform investment, microservices become a liability.

5. **Orphaned services** — Services without clear ownership accumulate tech debt and become coordination bottlenecks. Every service needs an owner.

6. **Missing resilience infrastructure** — Circuit breakers, graceful degradation, and API versioning aren't optional. Without them, distributed systems have distributed complexity but coupled operations.

## Supporting Evidence

This method is validated by:

**External Research:**
- DORA research shows loosely coupled architecture correlates with 208x more frequent deployment and 106x faster lead time
- Fowler & Lewis (2014) established independent deployability as the defining characteristic of microservices
- Team Topologies demonstrates that team boundaries should align with service boundaries (Inverse Conway Maneuver)
- Domain-Driven Design's Bounded Contexts provide the theoretical foundation for service boundaries

**Internal Observations:**
- Prima Platform architecture shows both benefits (independent repos, ADRs, platform services) and gaps (runtime coupling, heavy adapters)
- Presidio containerization demonstrates service boundary extraction improving dependency management
