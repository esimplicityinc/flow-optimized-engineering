---
sidebar_position: 1
title: Team Topologies
status: well-established
source:
  url: https://teamtopologies.com
  authors:
    - Matthew Skelton
    - Manuel Pais
  publication_year: 2019
  organization: Team Topologies Ltd.
version: "2019"
pillars:
  - team-types
  - interaction-modes
  - core-concepts
related_frameworks:
  - dora
  - domain-driven-design
  - accelerate
description: A practical, adaptive approach for organizational design and team interactions based on four fundamental team types and three team interaction patterns, treating teams as the fundamental means of delivery for fast flow of value.
---

# Team Topologies

Team Topologies is a practical, adaptive approach for organizational design and team interactions, developed by Matthew Skelton and Manuel Pais. First published in 2019, the framework provides a systematic way to organize teams for fast flow of value by treating teams—not individuals—as the fundamental means of delivery.

The core insight of Team Topologies is that organizational structure directly shapes software architecture (Conway's Law), and this relationship can be used intentionally. Rather than fighting against Conway's Law, organizations can design team structures that produce the architecture they want—the "Inverse Conway Maneuver."

## Key Concepts

Team Topologies is built on three foundational ideas:

**1. Four Fundamental Team Types**

Every team in an organization should be one of four types: Stream-aligned (the primary type, delivering business value), Platform (providing internal services), Enabling (helping other teams build capabilities), or Complicated-subsystem (handling specialist technical domains). This constraint simplifies organizational design and clarifies team purpose.

**2. Three Interaction Modes**

Teams interact in one of three ways: Collaboration (working closely together), X-as-a-Service (one team consuming another's API), or Facilitating (one team helping another). These modes should evolve over time—collaboration during discovery, then X-as-a-Service for stable interfaces.

**3. Cognitive Load as Constraint**

Teams have limited cognitive capacity. When teams are responsible for too much, quality suffers. Team Topologies uses cognitive load as a key constraint for sizing teams and their responsibilities, ensuring teams can truly own what they're responsible for.

## Team Types

| Team Type | Purpose | Typical Size |
|-----------|---------|--------------|
| **Stream-aligned** | Delivers value for a business domain segment | 5-9 people |
| **Platform** | Provides internal products to accelerate delivery | 5-9 people |
| **Enabling** | Helps teams overcome obstacles and build capabilities | 3-5 people |
| **Complicated-subsystem** | Handles components requiring deep expertise | 3-8 people |

## Interaction Modes

| Mode | Description | Duration |
|------|-------------|----------|
| **Collaboration** | Two teams working closely together | Time-boxed (weeks to months) |
| **X-as-a-Service** | One team provides, another consumes via API | Ongoing |
| **Facilitating** | One team helps/mentors another | Time-boxed (weeks to months) |

## Why Team Topologies Matters for FOE

Team Topologies aligns strongly with all three Flow Optimized Engineering principles:

- **Optimize for Understanding** - Cognitive load management ensures teams can truly understand what they own. Stream-aligned teams have clear purpose. The four team types and three interaction modes create shared vocabulary for organizational design.

- **Fast Feedback Loops** - Stream-aligned teams can deploy independently without waiting on other teams. X-as-a-Service mode creates stable boundaries enabling independent iteration. Platform teams reduce friction by providing self-service capabilities.

- **Confidence to Act** - Clear team ownership means clear accountability. When team boundaries align with service boundaries (Inverse Conway Maneuver), teams can change their systems confidently. Platform teams' stable APIs provide confidence that shared capabilities won't break.

## Methods

See the [Methods section](./methods) for detailed documentation of each Team Topologies concept.

## Existing FOE Observations

Team Topologies concepts are already referenced in FOE observations:

- **Team Topologies: Inverse Conway Maneuver** - Supports the True Microservices method
- **Team Topologies: Bounded Contexts** - Links to DDD strategic design patterns

## Further Reading

- [Team Topologies Website](https://teamtopologies.com) - Official website with resources
- [Team Topologies Book](https://teamtopologies.com/book) - "Team Topologies: Organizing Business and Technology Teams for Fast Flow" (2019)
- [Key Concepts](https://teamtopologies.com/key-concepts) - Summary of core ideas
- [Team Topologies Academy](https://academy.teamtopologies.com/) - Training and certification
