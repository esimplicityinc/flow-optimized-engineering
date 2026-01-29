---
displayed_sidebar: fieldGuideSidebar
sidebar_position: 10
title: "Team Topologies: Inverse Conway Maneuver"
status: completed
source_type: external
source:
  authors: ["Matthew Skelton", "Manuel Pais"]
  organization: "IT Revolution Press"
  year: 2019
  url: "https://teamtopologies.com"
methods:
  - architecture/methods/established/true-microservices
---

import RelatedMethods from '@site/src/components/RelatedMethods';

# Team Topologies: Inverse Conway Maneuver

> **Source:** Skelton & Pais (2019) | IT Revolution Press

Team Topologies provides a systematic framework for organizing teams around flow of value, using Conway's Law intentionally rather than fighting against it. The book demonstrates that service boundaries should align with team boundaries, and that independent deployment capability requires organizational alignment.

## Context

**Environment:**
- Organization: IT Revolution / Independent consultants
- Timeline: Published 2019, based on years of consulting experience
- Sample: Case studies from multiple organizations across industries

**The Problem:**
Organizations often create architectures that conflict with their team structures, creating constant friction. Teams are organized one way, services another, and the mismatch creates coordination overhead that kills flow.

**Research Questions:**
- How should teams be organized to optimize for fast flow of value?
- How can organizations use Conway's Law intentionally?
- What team types and interaction modes enable independent delivery?

## Hypothesis

> "If organizations deliberately design team structures to match their desired architecture (the Inverse Conway Maneuver), then they will achieve faster flow with less coordination overhead because team boundaries naturally become service boundaries."

## Approach

### Methodology
- **Design:** Synthesis of practitioner experience and case studies
- **Framework:** Four fundamental team types + three interaction modes
- **Validation:** Adopted by thousands of organizations; referenced in DORA research

### The Four Team Types

| Team Type | Purpose | Relationship to Microservices |
|-----------|---------|------------------------------|
| **Stream-aligned** | Delivers value for a single business capability | Owns one or more services end-to-end |
| **Platform** | Provides shared capabilities via self-service APIs | Provides platform services (auth, messaging) |
| **Enabling** | Helps stream-aligned teams acquire capabilities | Temporary assistance, not ownership |
| **Complicated-subsystem** | Handles complex technical domains | Owns specialized services requiring deep expertise |

### Three Interaction Modes

| Mode | Description | When Used |
|------|-------------|-----------|
| **Collaboration** | Working closely together | Discovery phases, tight integration |
| **X-as-a-Service** | One team provides, another consumes | Stable APIs, independent deployment |
| **Facilitating** | Helping/coaching | Capability building |

## Results

### Key Finding: Conway's Law as a Tool

The book's central insight is that Conway's Law should be embraced, not fought:

> "Organizations which design systems are constrained to produce designs which are copies of the communication structures of these organizations." — Melvin Conway, 1968

Rather than viewing this as a constraint, the Inverse Conway Maneuver uses it intentionally:

> "The organization should evolve its team structures to match the architecture it wants to achieve."

### Stream-Aligned Teams Enable Independent Deployment

| Characteristic | Description |
|---------------|-------------|
| End-to-end ownership | Team owns from idea to production |
| Minimal dependencies | Works independently most of the time |
| Fast flow | No waiting on other teams for delivery |
| Clear purpose | Aligned to business capability or customer journey |

### Platform Teams Enable Shared Services

The book distinguishes between accidental coupling (shared databases) and intentional sharing (platform APIs):

> "A good platform is 'just big enough.' It should provide only the capabilities needed to enable stream-aligned teams to move quickly."

Platform teams provide:
- Self-service APIs (not shared implementations)
- Clear service boundaries
- Independent evolution with backward compatibility

### Cognitive Load as Constraint

Teams cannot effectively own too much. The book introduces cognitive load as a key constraint:

> "When cognitive load isn't considered, teams are spread thin trying to cover too much, and their architecture and code suffer."

This supports the claim that service boundaries should be scoped to what a team can own end-to-end.

## Analysis

### What the Book Establishes

1. **Conway's Law is a tool** - Organizational structure should drive architecture, not fight it
2. **Team ownership = service ownership** - Stream-aligned teams own services end-to-end
3. **Platform services are intentional** - Shared capabilities through APIs, not shared databases
4. **Cognitive load limits scope** - Services should be sized to what teams can effectively own
5. **X-as-a-Service enables independence** - Stable APIs between teams enable independent deployment

### FOE Insights

**Understanding:**
Team Topologies provides clarity on why "distributed monoliths" fail—they violate Conway's Law by having architectural boundaries that don't match team boundaries. The cognitive load concept helps teams understand when services are too big or too interconnected.

**Feedback:**
Stream-aligned teams enable fast feedback because they can change their services without coordinating with other teams. The X-as-a-Service interaction mode creates clear boundaries that enable independent iteration cycles.

**Confidence:**
When team boundaries align with service boundaries, teams have clear ownership and accountability. This reduces ambiguity about who fixes problems and who makes architectural decisions. Platform teams' backward-compatible APIs provide confidence that changes won't break consumers.

## Limitations

- **Practitioner synthesis:** Based on consulting experience and case studies, not controlled research
- **Organizational change required:** Implementing Team Topologies often requires significant reorganization
- **Cultural prerequisites:** Requires organizational buy-in to team autonomy principles
- **Context-dependent:** Optimal team structures vary by organization size and domain

### Authors' Own Caveat

> "Team Topologies is a model, not a strict rulebook. Organizations need to adapt the ideas to their specific context."

## Conclusion

### Verdict
**Strongly Supported** - Team Topologies provides a coherent framework that directly supports the True Microservices method's claims about service boundaries aligning with team boundaries and Conway's Law as a tool.

### Key Learnings

1. **Inverse Conway Maneuver:** Design team structure to achieve desired architecture
2. **Stream-aligned teams own services end-to-end:** No hand-offs, full accountability
3. **Platform services via APIs:** Intentional sharing, not accidental coupling
4. **Cognitive load constrains scope:** Services sized to team capacity

### FOE Application

Team Topologies directly supports the True Microservices method by providing:
- The organizational "why" behind service boundaries
- Clear distinction between platform services (intentional) and distributed monoliths (accidental)
- The Inverse Conway Maneuver as explicit strategy

| True Microservices Claim | Team Topologies Support |
|--------------------------|------------------------|
| Service boundaries align with team ownership | Stream-aligned teams own end-to-end |
| Shared services accessed via stable APIs | Platform teams provide X-as-a-Service |
| Conway's Law is a tool, not a problem | Inverse Conway Maneuver |
| "Can a team deploy without talking to anyone?" | Stream-aligned team definition |

---

## References

- Skelton, M., & Pais, M. (2019). *Team Topologies: Organizing Business and Technology Teams for Fast Flow*. IT Revolution Press.
- Conway, M. (1968). "How Do Committees Invent?" *Datamation*.
- Team Topologies website: [teamtopologies.com](https://teamtopologies.com)

---

<RelatedMethods />
