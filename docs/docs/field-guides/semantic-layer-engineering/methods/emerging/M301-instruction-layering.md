---
methodId: M301
sidebar_position: 2
title: "Instruction Layering"
maturity: hypothesized
priority: recommended
observations: []
---

import InternalMethodHeader from '@site/src/components/InternalMethodHeader';
import RelatedObservations from '@site/src/components/RelatedObservations';

# Instruction Layering

<InternalMethodHeader />

Separate system-level, domain-level, and task-level context into composable layers rather than monolithic prompts, enabling reuse, auditability, and targeted updates without full-prompt rewrites.

:::caution Early Stage
This method is still being validated through observations.
:::

## Overview

A monolithic prompt that combines "you are an AI assistant" with "here are our company policies" with "the user wants to know X" is fragile. Change the company policy section and you risk breaking the persona. Add a new use case and you rewrite the entire prompt. Audit what the agent was told about a specific domain and you grep through an undifferentiated wall of text.

Instruction Layering treats the context delivered to an AI agent as a structured stack with distinct layers, each with its own purpose, owner, and update cadence:

- **System layer** — immutable behavioral constraints, tone, safety rails (changes rarely, owned by platform team)
- **Domain layer** — business rules, terminology, policy constraints for a specific domain (changes when policy changes, owned by domain experts)
- **Task layer** — the specific request, retrieved context, and user input for this interaction (changes every request, assembled dynamically)

Each layer is authored, versioned, and tested independently. They are composed at runtime, but their concerns remain separated.

## When to Use

Use this method when:

- Building agents that serve multiple use cases sharing common behavior
- Operating in domains where policy changes frequently and you need surgical prompt updates
- Auditing is required — you need to be able to show exactly what the agent was told about a specific domain at a specific point in time
- Multiple teams contribute to agent behavior (platform, domain experts, application developers)

## When NOT to Use

Avoid this method when:

- Building a single-purpose, short-lived agent where layering overhead isn't justified
- The domain and system contexts are so tightly coupled they can't meaningfully be separated
- Your LLM provider's context window is so constrained that layered composition creates token budget problems

## How It Works

### Prerequisites

Before starting:
- Identify the distinct audiences/owners for each layer in your context
- Map your existing prompts to identify which content belongs in which layer
- Establish a versioning convention for prompt artifacts (treat them as code)

### Step 1: Define Layer Boundaries

For each agent you're building, explicitly declare what belongs in each layer:

| Layer | Content | Update Trigger | Owner |
|---|---|---|---|
| System | Persona, safety rails, output format | Platform decision | Platform team |
| Domain | Business rules, terminology, policy | Policy change | Domain experts |
| Task | User query, retrieved chunks, current context | Every request | Application |

### Step 2: Author Each Layer as a Separate Artifact

Store system and domain layers as versioned files in source control — not embedded in application code. This makes them auditable, diffable, and independently testable.

### Step 3: Compose at Runtime

At inference time, assemble the stack programmatically. Most LLM APIs support multi-message construction that maps naturally to layers (system message, domain context injection, user message).

### Step 4: Test Layers in Isolation

Each layer should be testable independently. The domain layer should be evaluable with a fixed system layer and synthetic task inputs. A change to the domain layer should trigger regression tests for that domain — not a full end-to-end suite.

## Example

**Without layering:**
```
You are a helpful financial advisor AI. You follow SEC regulations. You speak formally. 
When asked about retirement planning, always mention tax implications. The user's question 
is: What should I invest in? Here are some relevant documents: [retrieved chunks]
```

**With layering:**
```
[System layer] You are a helpful financial advisor AI. You speak formally. Never provide 
specific investment recommendations without surfacing relevant risk disclosures.

[Domain layer] This agent operates under SEC compliance requirements for retail investors. 
When discussing retirement planning, always address tax implications. Applicable regulation: 
version 2025-Q1 of the retail-investor-compliance policy.

[Task layer] User query: "What should I invest in?" 
Retrieved context: [chunks with context contracts attached]
```

## Common Pitfalls

1. **Layer bleed** — domain-specific rules creeping into the system layer, or task-specific context polluting the domain layer. Enforce layer boundaries with review.
2. **Versioning neglect** — treating prompt layers as configuration rather than code. Version them, diff them, review changes.
3. **Composition order matters** — later layers can inadvertently override earlier ones. Test layer composition explicitly for behavioral conflicts.

## How You Can Help

If you're testing this method:

1. Try separating an existing monolithic prompt into layers
2. Document how many layers you ended up with and whether 3 was the right number
3. Note whether the separation made updates easier or harder in practice

## Supporting Evidence

<RelatedObservations />
