---
methodId: M312
sidebar_position: 13
title: "Stateful Agent Design"
maturity: hypothesized
priority: recommended
observations: []
---

import InternalMethodHeader from '@site/src/components/InternalMethodHeader';
import RelatedObservations from '@site/src/components/RelatedObservations';

# Stateful Agent Design

<InternalMethodHeader />

Architect agents as stateful systems that maintain persistent understanding across sessions and tasks, rather than stateless query-response machines that lose all context between interactions.

:::caution Early Stage
This method is still being validated through observations.
:::

## Overview

The default model for AI agents is stateless: each interaction starts fresh, retrieves context from the knowledge layer, produces a response, and discards all working state. This is adequate for simple Q&A but fails for agents that must act with the "full weight of the organization's intelligence."

A stateful agent maintains three kinds of persistent state:
- **Interaction state** — what has been discussed, decided, and discovered across sessions (via memory objects, M310)
- **Task state** — the current status of multi-step tasks, including progress, blockers, and next actions (via explicit state documents)
- **Learning state** — patterns, preferences, and domain-specific insights accumulated across many interactions (via consolidation cycles, M311)

Stateful design is the architectural prerequisite for agents that feel like colleagues rather than search engines.

## When to Use

Use this method when:

- Agents support ongoing relationships (account management, project support, advisory roles)
- Tasks span multiple sessions and require continuity of context
- Agent effectiveness is expected to improve over time through accumulated experience
- Users should not have to re-establish context on every interaction

## When NOT to Use

Avoid this method when:

- Privacy requirements prohibit persistent state across sessions
- Each interaction is genuinely independent (transaction processing, one-shot lookups)
- The overhead of state management isn't justified by the interaction pattern

## How It Works

### Prerequisites

Before starting:
- Define the state scope: what is the unit of stateful context (user, project, organization, conversation thread)?
- Choose a state persistence mechanism (vector DB for memory objects, document store for task state)
- Establish state lifecycle rules (how long is state retained, when is it archived, when is it deleted)

### Step 1: Define State Schema

For each state type, define an explicit schema:

Interaction state:
```json
{
  "scope_id": "project-aurora-user-1042",
  "last_interaction": "2026-05-28T14:30:00Z",
  "summary": "...",
  "open_items": [],
  "key_facts": {}
}
```

Task state:
```json
{
  "task_id": "compliance-review-q2",
  "status": "in-progress",
  "completed_steps": [],
  "current_step": "...",
  "blockers": [],
  "next_actions": []
}
```

### Step 2: Load State at Session Start

At the beginning of each agent session, retrieve relevant state objects. This primes the agent's working memory (M310) with accumulated context before the user's first message.

### Step 3: Update State During Interaction

As the interaction proceeds, update state continuously — not just at session end. Key decision points, discovered facts, completed steps, and new open items should be persisted incrementally. A crashed session should lose minimal state.

### Step 4: Archive and Transition State

Define explicit lifecycle transitions: active state → consolidated memory objects → archived history. Don't grow state indefinitely — apply consolidation cycles (M311) to compress and archive.

## Example

Stateless agent:
User (Monday): "Can you help me prepare for the client review on Friday? Here's the context: [5 paragraphs of background]"
User (Wednesday): "Following up — what were the key risks we identified?"
Stateless agent: "I don't have context from our Monday conversation. Could you re-share the background?"

Stateful agent:
User (Monday): Agent stores session state: project background, identified risks, prep plan, Friday agenda.
User (Wednesday): Agent loads state at session start. Responds: "Based on our Monday discussion, the three key risks were: [list]. We had planned to address [X] before Friday. Two of the prep tasks are complete — [Y] and [Z] still need attention. Want to work through those now?"

## Common Pitfalls

1. **State bloat** — accumulating all state without compression or archival makes retrieval slow and context noisy. Apply consolidation cycles (M311) aggressively.
2. **Stale state as authoritative** — state that hasn't been updated may reflect an outdated picture. Always timestamp state and surface recency when presenting state-derived information.
3. **Missing state isolation** — in multi-user or multi-tenant systems, state isolation is a security requirement. Enforce scope boundaries at the persistence layer, not just the application layer.

## How You Can Help

If you're testing this method:

1. Measure the reduction in context re-establishment overhead across sessions
2. Document your state schema and what triggered state updates
3. Note any state management edge cases (crashes, concurrent sessions, long-dormant accounts)

## Supporting Evidence

<RelatedObservations />
