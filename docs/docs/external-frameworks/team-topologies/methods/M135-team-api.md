---
methodId: M135
displayed_sidebar: fieldGuideSidebar
sidebar_position: 12
title: Team API
description: A clear definition of how a team interacts with other teams.
framework: team-topologies
framework_url: https://teamtopologies.com/key-concepts
foe_alignment:
  primary: Understanding
  secondary: Feedback
status: well-established
---

# Team API

**Pillar:** Core Concepts

A Team API is a clear, documented definition of how a team interacts with other teams. It includes the team's purpose, services provided, communication channels, working agreements, and expectations. Team APIs make team interactions explicit and reduce ambiguity.

## Definition

> "The Team API includes: code, documentation, user experience, ways of working, communication channels, work information, and other information that codifies how the team can be worked with."
>
> — Skelton & Pais, Team Topologies

## Why It Matters

Team APIs matter because:

- **Reduce ambiguity** - Clear expectations for how to interact
- **Enable self-service** - Other teams can find what they need
- **Scale communication** - Documentation reduces ad-hoc questions
- **Clarify ownership** - Explicit about what the team provides and doesn't
- **Support X-as-a-Service** - Essential for low-coordination interaction modes

## FOE Framing

**Primary: Optimize for Understanding**

Team APIs improve understanding by making team interactions explicit. Instead of relying on tribal knowledge or discovering through trial and error how to work with a team, the Team API documents it clearly.

**Secondary: Fast Feedback Loops**

Clear Team APIs enable faster feedback by clarifying communication channels and response expectations. Teams know where to ask questions and what response time to expect.

## When to Use

- **All teams** - Every team benefits from a clear API
- **Platform teams** - Especially important for teams serving many consumers
- **New teams** - Establishes clear expectations from the start
- **Reorganizations** - Clarifies new team boundaries and interactions
- **Scaling** - More teams means more need for explicit interfaces

## What's in a Team API

### Core Components

| Component | Description |
|-----------|-------------|
| **Team mission** | What the team exists to do |
| **Services provided** | What capabilities the team offers |
| **Communication channels** | Slack, email, office hours, etc. |
| **Ways of working** | How the team operates (sprints, kanban, etc.) |
| **Response expectations** | Expected turnaround times |
| **Documentation** | Links to relevant docs and runbooks |

### Extended Components

| Component | Description |
|-----------|-------------|
| **Roadmap** | What the team is working on next |
| **SLOs/SLAs** | Service level commitments |
| **On-call** | How to reach the team during incidents |
| **Office hours** | When the team is available for questions |
| **Feedback channels** | How to provide input on team services |
| **Team members** | Who's on the team and their roles |

### Example Team API Template

```markdown
# [Team Name] Team API

## Mission
What this team exists to accomplish.

## Services Provided
- Service 1: Description
- Service 2: Description

## Communication
- **Slack:** #team-name
- **Email:** team-name@company.com
- **Office Hours:** Tuesdays 2-3pm

## Working With Us
- Requests via: [Jira board / Slack / etc.]
- Expected response time: [24 hours / etc.]
- For urgent issues: [escalation path]

## Documentation
- [Service docs link]
- [API docs link]
- [Runbooks link]

## Roadmap
- [Link to public roadmap]

## Team Members
- [Name] - [Role]
- [Name] - [Role]
```

## Team API Anti-Patterns

- **Undocumented** - Relying on tribal knowledge
- **Outdated** - Documentation doesn't match reality
- **Too detailed** - So much detail it's never read
- **Hidden** - Exists but hard to find
- **No feedback channel** - One-way communication only

## Relationship to Other Methods

- **X-as-a-Service Mode** - Team API enables self-service interaction
- **Platform Team** - Team APIs are essential for platform teams
- **Stream-Aligned Team** - Even internal teams benefit from clear APIs
- **Fast Flow** - Clear APIs reduce coordination overhead
- **Team Cognitive Load** - Team APIs externalize knowledge

## Citations

- Skelton, M., & Pais, M. (2019). *Team Topologies: Organizing Business and Technology Teams for Fast Flow*. IT Revolution Press.
- [Team Topologies Key Concepts](https://teamtopologies.com/key-concepts)
