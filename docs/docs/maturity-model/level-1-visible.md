---
sidebar_position: 3
title: "Level 1: Visible"
---

# Level 1: Visible

> **Theme: "We can see what's happening"**

At Level 1, basic observability exists. Work is traceable after the fact. Teams can explain what happened—though not always why. The improvement from Level 0 is significant: you're no longer operating blind.

## What Changed

- Basic observability is in place—logs, metrics, or dashboards exist
- Work is traceable after the fact, even if not in real-time
- Teams can explain what happened (though not always why)
- Some documentation exists and is occasionally updated
- There's a shared understanding of where to look for information

## Executive Experience

- Status can be determined, though it takes effort
- Problems are still discovered late, but at least they're explainable
- Delivery is more predictable than Level 0, but surprises still happen
- Some metrics exist, though they may not tell a complete story
- Accountability is clearer because work is visible

## Engineering Reality

- Logs and basic monitoring help with debugging
- New team members can find some documentation to get started
- Changes are still risky, but the blast radius is somewhat understood
- There's a difference between "we don't know" and "we can find out"
- Tribal knowledge is starting to become team knowledge

## Government View

- Evidence exists, though it may require assembly
- Questions about the system can be answered with research
- Audit trails are available but may be incomplete
- Compliance demonstrations require preparation but are possible
- Risk is more observable, even if not yet actively managed

## Optimization Breakdown

| Optimization | State | Characteristics |
|--------------|-------|-----------------|
| **Understanding** | Recoverable but fragile | Knowledge can be reconstructed, but it takes effort. Documentation exists but may be out of date. Understanding depends on investigation. |
| **Fast Feedback** | Exists but slow | Feedback loops exist but aren't fast. You learn about problems eventually. Detection is often manual. |
| **Confidence** | Conditional | Teams can act with confidence in familiar territory. New situations still create hesitation. Decisions are possible but require verification. |

## Key Smell

> "We can explain it — but it takes a meeting."

When understanding requires synchronous conversation, you have visibility but not accessibility. The information exists, but getting to it has friction.

:::info What This Looks Like
- Dashboards that show current state (even if basic)
- Incident postmortems that can reconstruct what happened
- Onboarding documentation (even if incomplete)
- A shared ticket system for tracking work
- Some automated tests (even if coverage is low)
:::

## Movement Indicators

You're moving beyond Level 1 when:
- Explanations don't require the person who did the work
- Feedback starts arriving before work is "done"
- Patterns become recognizable across different changes
- Teams start saying "we've seen this before"
