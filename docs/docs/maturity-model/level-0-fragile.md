---
sidebar_position: 2
title: "Level 0: Fragile"
---

# Level 0: Fragile

> **Theme: "We find out late"**

At Level 0, delivery outcomes are unpredictable. Problems surface at milestones rather than during development. Knowledge lives in people's heads, and confidence depends entirely on who's in the room.

## Executive Experience

- Delivery timelines are unreliable—estimates rarely match reality
- Risk surfaces at milestones, not during work
- Confidence in outcomes depends on specific individuals
- Status updates require meetings, and the answers change based on who you ask
- "Green" status can flip to "red" without warning

## Engineering Reality

- Tribal knowledge dominates—critical information isn't written down
- Changes are scary because consequences are unclear
- Debugging is forensic—finding problems means reconstructing history
- New team members take months to become productive
- Technical debt is invisible until it blocks work

## Government View

- Assurance comes from documents, not evidence
- Late surprises are common at delivery reviews
- Compliance is demonstrated through narrative, not data
- Questions about system behavior require research to answer
- Risk assessments are based on opinion, not observation

## Optimization Breakdown

| Optimization | State | Characteristics |
|--------------|-------|-----------------|
| **Understanding** | Fragmented, person-dependent | Knowledge exists but isn't shared. Understanding disappears when people leave. Documentation is stale or missing. |
| **Fast Feedback** | Slow, manual, end-loaded | Problems are discovered late. Testing happens at the end. Feedback requires human effort to gather. |
| **Confidence** | Low, decisions avoided or escalated | Teams hesitate to make changes. Decisions get pushed up the chain. Risk is managed by not acting. |

## Key Smell

> "Don't touch that — only Alex knows how it works."

When knowledge is locked inside individuals, every change becomes a negotiation with the knowledge holder. The system can't teach you anything because the system isn't the source of truth—people are.

:::info What This Looks Like
- Deploy processes that exist only in someone's memory
- Incident response that depends on finding the right person
- Architecture decisions that no one can explain
- Tests that pass or fail unpredictably
- "It works on my machine" as a common phrase
:::

## Movement Indicators

You're moving beyond Level 0 when:
- Someone can explain the deployment process without being the person who does it
- Basic metrics exist (even if they're not comprehensive)
- Work items are tracked somewhere visible
- At least some knowledge has been written down
