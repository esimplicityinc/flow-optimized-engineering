---
observationId: O121
displayed_sidebar: fieldGuideSidebar
sidebar_position: 15
title: "Team Topologies: Bounded Contexts and Cognitive Load"
status: completed
source_type: external
source:
  authors: ["Matthew Skelton", "Manuel Pais"]
  organization: "IT Revolution Press"
  year: 2019
  url: "https://teamtopologies.com/book"
methods:
  - M103
  - M108
  - M134
  - M153
---

import RelatedMethods from '@site/src/components/RelatedMethods';

# Team Topologies: Bounded Contexts and Cognitive Load

> **Source:** Skelton & Pais (2019) | IT Revolution Press

Team Topologies explicitly references Domain-Driven Design's Bounded Contexts as the ideal unit for team ownership, providing empirical and organizational backing for DDD's strategic design principles. The book's cognitive load framework explains *why* bounded contexts should be sized to what a team can understand, while its treatment of Conway's Law reinforces that software boundaries should align with team boundaries.

## Context

**Environment:**
- Organization: IT Revolution / Independent consultants
- Timeline: Published 2019, based on years of consulting experience
- Sample: Case studies from multiple organizations across industries
- Quality: Industry research, widely adopted, referenced by DORA

**The Problem:**
Organizations struggle to determine the right size and scope for teams and their owned services. DDD provides the *what* (bounded contexts) but less guidance on the *how much*—how big should a context be? Team Topologies answers this with cognitive load science.

**Research Questions:**
- How should bounded contexts be sized for team ownership?
- How do team interaction patterns map to DDD context mapping?
- What organizational structures best support DDD strategic design?

## Hypothesis

> "If teams are organized around bounded contexts and sized according to cognitive load limits, then they will achieve faster flow with clearer ownership because team boundaries naturally reinforce context boundaries."

## Approach

### Methodology
- **Design:** Synthesis of practitioner experience, case studies, and cognitive science
- **Framework:** Four team types + three interaction modes + cognitive load constraints
- **Validation:** Adopted by thousands of organizations; referenced in DORA research

### Explicit DDD References

The book directly references DDD bounded contexts:

> "A stream-aligned team is a team aligned to a single valuable stream of work... this might be a single product or service, a single set of features, a single user journey, or a single user persona. Further, the team is empowered to build and deliver customer or user value as quickly, safely, and independently as possible, without requiring hand-offs to other teams to perform parts of the work."

This maps directly to bounded context ownership—one team, one context, end-to-end responsibility.

### Cognitive Load as Context Sizing

Team Topologies introduces cognitive load as the key constraint for context size:

> "When cognitive load isn't considered, teams are spread thin trying to cover too much, and their architecture and code suffer."

The book references cognitive science research showing humans can hold approximately 4 items in working memory at once, arguing that bounded contexts must be sized accordingly.

## Results

### Key Finding: Team-Context Alignment

| Team Topologies Concept | DDD Pattern | Relationship |
|------------------------|-------------|--------------|
| Stream-aligned team | Bounded Context owner | Direct mapping—team owns context end-to-end |
| Cognitive load limit | Context size constraint | Empirical basis for "how big" a context should be |
| Team API | Published Language | How contexts expose capabilities to others |
| Conway's Law | Team-Context alignment | Software boundaries follow team boundaries |
| Platform team | Supporting/Generic subdomain | Shared capabilities via self-service APIs |
| Interaction modes | Context Mapping patterns | How teams/contexts relate to each other |

### Interaction Modes as Context Mapping

The three interaction modes parallel DDD context mapping patterns:

| Interaction Mode | DDD Context Map Pattern | When Used |
|-----------------|------------------------|-----------|
| **Collaboration** | Partnership | Discovery phases, evolving boundaries |
| **X-as-a-Service** | Published Language / Customer-Supplier | Stable APIs, independent deployment |
| **Facilitating** | (No direct equivalent) | Capability building, temporary |

### Cognitive Load Types

Team Topologies distinguishes three types of cognitive load:

| Load Type | Description | DDD Implication |
|-----------|-------------|-----------------|
| **Intrinsic** | Fundamental complexity of the domain | Core domain complexity |
| **Extraneous** | Unnecessary complexity from poor design | Accidental complexity from unclear boundaries |
| **Germane** | Productive learning about the domain | Building ubiquitous language understanding |

The goal is to minimize extraneous load (clear boundaries) so teams can focus on intrinsic and germane load (domain understanding).

### Platform Teams as Generic Subdomains

The book's platform team concept maps to DDD's subdomain classification:

> "A good platform is 'just big enough.' It should provide only the capabilities needed to enable stream-aligned teams to move quickly."

Platform teams own **generic subdomains**—capabilities that are necessary but not differentiating (authentication, messaging, infrastructure). Stream-aligned teams own **core subdomains**—the business capabilities that provide competitive advantage.

## Analysis

### What the Book Establishes

1. **Bounded contexts should be team-sized** - Cognitive load provides empirical basis for context sizing
2. **Stream-aligned teams = bounded context owners** - Direct mapping between organizational and architectural patterns
3. **Team APIs = Published Language** - How contexts expose capabilities follows DDD patterns
4. **Conway's Law reinforces DDD** - Team boundaries should match context boundaries
5. **Platform teams own generic subdomains** - Shared capabilities via APIs, not shared implementations
6. **Interaction modes parallel context mapping** - Organizational patterns mirror integration patterns

### FOE Insights

**Understanding:**
Cognitive load science explains *why* bounded contexts improve understanding—humans can only hold ~4 items in working memory, so contexts must be sized accordingly. When a team can hold the entire context in their heads, they can reason about it effectively. This provides empirical backing for DDD's intuition about context boundaries.

**Feedback:**
Stream-aligned teams with clear bounded contexts can deploy independently, enabling faster feedback loops without cross-team coordination. The X-as-a-Service interaction mode creates stable boundaries that enable independent iteration cycles—changes within a context don't require changes in consuming contexts.

**Confidence:**
Organizational alignment with software architecture (Conway's Law) provides structural confidence that changes can be made safely within team/context boundaries. When the team that understands the context is also the team that owns it, there's higher confidence in changes. Platform teams' backward-compatible APIs provide confidence that shared capabilities won't break consumers.

## Limitations

- **Practitioner synthesis:** Based on consulting experience and case studies, not controlled research
- **Organizational change required:** Implementing Team Topologies often requires significant reorganization
- **DDD knowledge assumed:** Teams need DDD understanding to fully leverage the mapping
- **Context-dependent:** Optimal team structures vary by organization size and domain
- **Cognitive load measurement:** The book doesn't provide precise measurement methods for cognitive load

### Authors' Own Caveat

> "Team Topologies is a model, not a strict rulebook. Organizations need to adapt the ideas to their specific context."

## Conclusion

### Verdict
**Strongly Supported** - Team Topologies provides organizational and empirical backing for DDD strategic design patterns. The explicit references to bounded contexts, combined with cognitive load science, strengthen the case for DDD methods.

### Key Learnings

1. **Cognitive load sizes bounded contexts** - Contexts should be small enough for a team to hold in their heads
2. **Stream-aligned teams own bounded contexts** - One team, one context, end-to-end ownership
3. **Team APIs implement Published Language** - How contexts expose capabilities to consumers
4. **Conway's Law is a DDD tool** - Use organizational structure to reinforce context boundaries
5. **Platform teams own generic subdomains** - Shared capabilities via self-service APIs

### FOE Application

Team Topologies strengthens DDD methods by providing:
- Empirical basis (cognitive load) for context sizing
- Organizational patterns that reinforce architectural patterns
- Interaction modes that parallel context mapping
- Conway's Law as intentional design tool

| DDD Method | Team Topologies Support |
|------------|------------------------|
| Bounded Context | Stream-aligned team ownership + cognitive load sizing |
| Context Mapping | Interaction modes (Collaboration, X-as-a-Service, Facilitating) |
| Subdomains | Platform teams (generic), Stream-aligned teams (core/supporting) |
| Published Language | Team API concept |

---

## See Also

- [Bounded Context](/docs/external-frameworks/domain-driven-design/methods/M103-bounded-context) - The DDD pattern for explicit model boundaries
- [Context Mapping](/docs/external-frameworks/domain-driven-design/methods/M108-context-mapping) - How bounded contexts relate to each other
- [Subdomains](/docs/external-frameworks/domain-driven-design/methods/M134-subdomains) - Classifying domain areas by strategic importance
- [Team Topologies: Inverse Conway Maneuver](/docs/field-guides/observations/external/O122-team-topologies-inverse-conway) - Related observation on Conway's Law

## References

- Skelton, M., & Pais, M. (2019). *Team Topologies: Organizing Business and Technology Teams for Fast Flow*. IT Revolution Press.
- Evans, E. (2003). *Domain-Driven Design: Tackling Complexity in the Heart of Software*. Addison-Wesley.
- Team Topologies website: [teamtopologies.com](https://teamtopologies.com)
- Sweller, J. (1988). "Cognitive Load During Problem Solving: Effects on Learning." *Cognitive Science*.

---

<RelatedMethods />
