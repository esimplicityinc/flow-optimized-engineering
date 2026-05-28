---
methodId: M316
sidebar_position: 17
title: "Harness Engineering"
maturity: hypothesized
priority: essential
observations: []
---

import InternalMethodHeader from '@site/src/components/InternalMethodHeader';
import RelatedObservations from '@site/src/components/RelatedObservations';

# Harness Engineering

<InternalMethodHeader />

Wrap AI agents in a structured harness of constraints, quality gates, and verification loops so they operate safely in enterprise environments — shifting from probabilistic compliance to deterministic enforcement.

:::caution Early Stage
This method is still being validated through observations.
:::

## Overview

The formula for a production-grade AI agent is: **Agent = Model + Harness**. The model provides reasoning. The harness provides the safety cage that makes that reasoning trustworthy in a consequential environment.

Prompting an agent to "be accurate" is probabilistic compliance — the agent may or may not follow the instruction depending on context pressure, conflicting signals, and the inherent stochasticity of language models. Harness engineering replaces probabilistic compliance with deterministic constraints: structural checks that run regardless of what the model produces.

A harness intercepts the agent's output before it reaches the user or triggers downstream actions. It validates citations, checks that retrieved context is relevant, enforces output schema, detects out-of-scope claims, and forces retries when quality gates fail. The harness is not a prompt — it is code.

This is especially critical for semantic layer systems where the agent's quality depends on retrieval quality. A harness that validates retrieval before reasoning begins, and validates reasoning before output is delivered, creates a two-stage defense against the compounding failure modes of RAG systems.

## When to Use

Use this method when:

- Agents operate in regulated environments where output errors have compliance consequences
- Agent outputs trigger downstream actions (approvals, transactions, notifications)
- Retrieval quality is variable and needs systematic enforcement rather than prompt-based encouragement
- Building trust incrementally — harnesses make agent behavior auditable and correctable

## When NOT to Use

Avoid this method when:

- The agent is purely exploratory and errors are low-stakes
- Harness overhead is prohibitive for your latency requirements (profile first; most harness operations are fast)
- The system is still in early prototyping — add the harness when moving toward production

## How It Works

### Prerequisites

Before starting:
- Have a retrieval pipeline and agent in place
- Define what "valid output" means for your domain (schema, citation requirements, scope boundaries)
- Identify the highest-risk failure modes to address first

### Step 1: Define the Harness Contract

Specify what the harness enforces:
- **Input validation**: Is the query in scope? Does it contain prohibited content?
- **Retrieval validation**: Are citations present? Are retrieved chunks relevant to the query?
- **Output validation**: Does the output match the required schema? Are all claims cited?
- **Action gating**: For agentic actions, are preconditions met?

### Step 2: Implement Quality Gates as Code

Build each gate as a discrete, testable function. Gates should be:
- **Deterministic**: same input always produces same pass/fail
- **Composable**: gates chain in a pipeline, each receiving the output of the previous
- **Logged**: every gate decision is recorded for observability (M319)

### Step 3: Define Retry and Reset Strategies

When a gate fails, the harness must know what to do:
- **Context Reset**: discard retrieved context and re-retrieve with a modified query
- **Retry with escalation**: retry with a stronger model or more context
- **Hard fail**: surface a structured error rather than a bad answer
- **Human escalation**: route to human review when automated recovery fails

### Step 4: Test the Harness Independently

The harness is production code. Test it with:
- Known-good outputs (should pass all gates)
- Known-bad outputs (hallucinated citations, out-of-scope claims, schema violations)
- Edge cases (partial citations, borderline relevance)

## Example

**Without harness:**
Agent retrieves 3 chunks, synthesizes an answer citing "policy document 2024-Q3" (which doesn't exist in the knowledge layer). Answer reaches user. User makes a decision based on a hallucinated source.

**With harness:**
Agent synthesizes answer with the hallucinated citation. Harness runs citation validation gate: `DOC-2024-Q3` not found in knowledge layer index → gate fails. Harness triggers Context Reset: re-retrieve with query adjusted for specificity. Second attempt finds the actual policy document `SEC-POL-2024-Q3-v2`. Harness validates citation → gate passes. Answer delivered with valid source.

## Common Pitfalls

1. **Harness as prompt supplement** — a harness that just adds more instructions to the prompt is still probabilistic. Real harnesses run code against outputs, not instructions.
2. **Infinite retry loops** — without a retry budget, a failing harness can loop indefinitely. Cap retries (2-3 maximum) and define graceful degradation.
3. **Silent gate suppression** — gates that swallow failures without logging make the system opaque. Every gate decision must be observable.

## How You Can Help

If you're testing this method:

1. Document which gate types you implemented first and why
2. Measure the retry rate and what fraction of retries succeeded
3. Share your gate composition approach and any ordering dependencies you discovered

## Supporting Evidence

<RelatedObservations />
