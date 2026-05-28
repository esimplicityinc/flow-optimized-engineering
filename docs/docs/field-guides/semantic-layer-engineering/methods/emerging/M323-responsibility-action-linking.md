---
methodId: M323
sidebar_position: 24
title: "Responsibility-Action Linking"
maturity: hypothesized
priority: recommended
observations: []
---

import InternalMethodHeader from '@site/src/components/InternalMethodHeader';
import RelatedObservations from '@site/src/components/RelatedObservations';

# Responsibility-Action Linking

<InternalMethodHeader />

Explicitly connect meaning to responsibility and responsibility to permitted action in the semantic model, so agents can reason about what they are allowed to do — not just what data says — before taking consequential actions.

:::caution Early Stage
This method is still being validated through observations.
:::

## Overview

AI systems do not become trustworthy because they can access more data. They become trustworthy when data is organized into meaning, meaning is connected to responsibility, and responsibility is connected to action.

This is the governance chain that makes agentic systems safe. Without it, an agent that can retrieve and reason is also an agent that can act on incomplete authority, violate access controls, or trigger downstream effects it wasn't authorized to trigger.

Responsibility-Action Linking makes the chain explicit in the semantic model:

1. **Meaning**: what this data represents (ontology, M322)
2. **Responsibility**: who owns it, who governs it, who is accountable (operating model, M321)
3. **Action**: what an agent can do with it, under what conditions, with what authorization (action graph)

The action graph is the new element: a formal model of which entity types support which actions, what authority is required for each action, and what preconditions must be satisfied.

## When to Use

Use this method when:

- Agents will take actions with organizational consequences (not just answer questions)
- Operating in environments with explicit authorization requirements (government, regulated industry, enterprise security)
- Multiple agents with different permission levels will operate against the same semantic layer
- Building auditable AI systems where "why did the agent do that?" must be answerable

## When NOT to Use

Avoid this method when:

- Agents are read-only (answering questions, not taking actions) — simpler authority checks suffice
- The permission model is so simple that a harness gate (M316) covers it without formal modeling
- Still in early prototyping where action governance is premature

## How It Works

### Prerequisites

Before starting:
- Semantic operating model (M321) must be in place — it defines the entities and responsibilities
- Identify all actions agents will be permitted to take
- Map existing authorization policies to the action model

### Step 1: Enumerate Agent Actions

For each agent deployment, enumerate all possible actions:
- Read actions: retrieve, summarize, compare, report
- Write actions: create, update, annotate, classify
- Workflow actions: notify, assign, approve, escalate
- Integration actions: call external API, trigger pipeline, submit to system

### Step 2: Model Action Permissions

For each action, define:
```yaml
action: share_dataset_externally
  target_entity: Dataset
  required_authority: [ISSO, DataOwner]
  preconditions:
    - dataset.classification != "TOP_SECRET"
    - data_use_agreement.status == "executed"
    - recipient.clearance >= dataset.classification
  requires_human_approval: true
  audit_required: true
```

### Step 3: Implement Authority Resolution

At action time, the agent must resolve whether it has authority to act:
1. Identify the target entity
2. Look up the action permissions for that entity type
3. Check whether the agent's context (session, user, role) satisfies the required authority
4. Verify preconditions against the operating model
5. If human approval is required, surface the request rather than acting

### Step 4: Log All Authorization Decisions

Every authorization check — granted or denied — must be logged with:
- The agent, the action, the target entity
- The authority check performed
- The preconditions evaluated
- The outcome (granted, denied, escalated)

This creates the audit trail that demonstrates responsible agent behavior.

## Example

Agent is asked: "Send the Q2 financial results to the external board members."

Without responsibility-action linking: Agent composes the email and sends it. The financial results are material non-public information. Sending to external parties before the earnings call is an SEC violation.

With responsibility-action linking:
1. Action: `send_document_externally`, target: Q2 financial results document
2. Operating model: document classified as `MNPI` (Material Non-Public Information)
3. Action permission check: `send_document_externally` on `MNPI` documents requires `IR_APPROVED: true` and `TRADING_WINDOW_OPEN: true`
4. Precondition check: `IR_APPROVED: false` (no IR approval on file for this distribution)
5. Agent response: "I cannot send these materials externally without IR approval. This document is classified as MNPI and requires IR sign-off before external distribution. I've flagged this request for review by the IR team."

The agent's refusal is principled, explainable, and auditable.

## Common Pitfalls

1. **Action permissions as a prompt** — telling the agent "don't send MNPI externally" in a prompt is probabilistic. The permission model must be enforced by the harness (M316), not by instruction.
2. **Incomplete action enumeration** — agents that can compose and send emails have an `email` action whether or not it's been formally modeled. Enumerate all integration capabilities the agent has access to.
3. **Authority model lag** — when org structures change, the authority model must update. Stale authority models either block legitimate actions or allow unauthorized ones.

## How You Can Help

If you're testing this method:

1. Document the action types you modeled and the most complex authority chains
2. Share instances where the action permission model prevented an incorrect agent action
3. Measure the false denial rate — legitimate actions blocked by overly restrictive permissions

## Supporting Evidence

<RelatedObservations />
