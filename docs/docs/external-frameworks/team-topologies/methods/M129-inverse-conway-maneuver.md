---
methodId: M129
displayed_sidebar: fieldGuideSidebar
sidebar_position: 9
title: Inverse Conway Maneuver
description: Deliberately designing team structures to produce a desired software architecture.
framework: team-topologies
framework_url: https://teamtopologies.com/key-concepts
foe_alignment:
  primary: Understanding
  secondary: Feedback
status: well-established
---

# Inverse Conway Maneuver

**Pillar:** Core Concepts

The Inverse Conway Maneuver is the deliberate design of team structures to produce a desired software architecture. Rather than fighting against Conway's Law—which states that organizations produce systems that mirror their communication structures—the Inverse Conway Maneuver uses it as a tool for intentional architectural design.

## Definition

> "Organizations which design systems are constrained to produce designs which are copies of the communication structures of these organizations."
>
> — Melvin Conway, 1968

The Inverse Conway Maneuver reverses this: instead of letting organizational structure accidentally shape architecture, deliberately design organizational structure to achieve the architecture you want.

## Why It Matters

The Inverse Conway Maneuver matters because:

- **Architecture follows organization** - Whether intentional or not, your team structure shapes your system structure
- **Fighting Conway's Law fails** - Attempting to build architecture that conflicts with team structure creates constant friction
- **Intentional design works** - Organizations that align teams with desired architecture achieve it faster
- **Reduces coordination overhead** - When team boundaries match system boundaries, less cross-team coordination is needed

## FOE Framing

**Primary: Optimize for Understanding**

The Inverse Conway Maneuver creates clarity about why systems are structured the way they are—they reflect team structure. This makes architectural decisions more understandable and predictable. Teams understand their boundaries because those boundaries match organizational boundaries.

**Secondary: Fast Feedback Loops**

When team boundaries align with system boundaries, teams can change their systems independently. This enables faster feedback loops because changes don't require coordination across team boundaries. Each team can iterate on their part of the system without waiting for others.

## When to Use

- **Greenfield architecture** - Design team structure before or alongside system architecture
- **Architecture evolution** - Reorganize teams to enable desired architectural changes
- **Microservices adoption** - Align teams with service boundaries
- **Reducing coupling** - Split teams to split tightly coupled systems
- **Platform creation** - Create platform teams to enable platform architecture

## How It Works

### The Process

1. **Define desired architecture** - What system structure do you want?
2. **Map to team structure** - What team structure would naturally produce this?
3. **Identify gaps** - Where does current team structure conflict?
4. **Evolve organization** - Change team structure to match desired architecture
5. **Let architecture follow** - System structure will naturally align over time

### Examples

| Desired Architecture | Team Structure Change |
|---------------------|----------------------|
| Independent microservices | Stream-aligned teams per service |
| Shared platform capabilities | Dedicated platform team |
| Reduced coupling between domains | Separate teams per domain |
| Better API boundaries | Teams own APIs end-to-end |

### Common Mistakes

- **Changing architecture without changing teams** - Architecture will drift back to match team structure
- **Too many teams** - Creates excessive coordination overhead
- **Ignoring cognitive load** - Teams can't own more than they can understand
- **Forcing collaboration** - Some boundaries should be X-as-a-Service, not collaboration

## Relationship to Other Methods

- **Stream-Aligned Team** - The primary team type that owns business capabilities
- **Platform Team** - Enables shared capabilities without coupling
- **Team Cognitive Load** - Constrains how much any team can own
- **Bounded Context (DDD)** - Natural unit for team ownership
- **Fast Flow** - The goal that Inverse Conway Maneuver enables
- **True Microservices (FOE)** - Architecture method that applies this principle

## Related FOE Observations

The Inverse Conway Maneuver is already referenced in FOE:

- **Team Topologies: Inverse Conway Maneuver** observation supports the True Microservices method

## Citations

- Conway, M. (1968). "How Do Committees Invent?" *Datamation*.
- Skelton, M., & Pais, M. (2019). *Team Topologies: Organizing Business and Technology Teams for Fast Flow*. IT Revolution Press.
- [Team Topologies Key Concepts](https://teamtopologies.com/key-concepts)
