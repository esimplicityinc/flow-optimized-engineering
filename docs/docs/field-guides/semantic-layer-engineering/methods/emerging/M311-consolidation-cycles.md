---
methodId: M311
sidebar_position: 12
title: "Consolidation Cycles"
maturity: hypothesized
priority: recommended
observations: []
---

import InternalMethodHeader from '@site/src/components/InternalMethodHeader';
import RelatedObservations from '@site/src/components/RelatedObservations';

# Consolidation Cycles

<InternalMethodHeader />

Run periodic asynchronous summarization processes that compress raw interaction history and domain data into high-density memory objects, reducing token costs and improving reasoning accuracy over time.

:::caution Early Stage
This method is still being validated through observations.
:::

## Overview

Memory accumulates. Raw interaction logs, document updates, and streaming data grow continuously. If an agent must read 100 emails to understand a client's current situation, that's 100 emails of context budget spent before the actual question is processed.

The Consolidation Cycle pattern — inspired by sleep-based memory consolidation in human cognition — runs a background process that periodically reviews raw data and distills it into high-density "Condensed Insights" or memory objects. Instead of reading 100 emails, the agent reads a single memory object: "Client sentiment has shifted negative over the past 3 weeks, primarily driven by the delayed deliverable on SOW-2026-04 and two unanswered support tickets."

This asynchronous consolidation can reduce effective token costs by 80–90% for context-heavy domains while simultaneously improving reasoning quality — condensed insights are better structured for reasoning than raw conversational history.

## When to Use

Use this method when:

- Agents operate in domains with high-volume, continuously-updating information (email, tickets, logs, feeds)
- Context costs are a material operational concern
- Agent reasoning quality degrades as raw history grows
- Users expect agents to "remember" and synthesize past interactions without re-reading everything

## When NOT to Use

Avoid this method when:

- Raw data volume is low enough that consolidation overhead exceeds the benefit
- Lossless access to raw data is required at all times (consolidation is always lossy — design accordingly)
- The cadence of queries is too low to justify background processing infrastructure

## How It Works

### Prerequisites

Before starting:
- Define the consolidation unit: what gets consolidated together (by user, by project, by time window, by entity)
- Choose a consolidation trigger: time-based (nightly), event-based (session end, document update), or volume-based (every N new items)
- Define the target memory object schema: what fields a condensed insight must contain

### Step 1: Define Consolidation Scope

Specify what the consolidation process reads and what output it produces:
- Input: raw interaction logs, new documents, event streams for a given scope (user × project × time window)
- Output: a structured memory object with summary, key findings, sentiment/status signals, open items, and provenance pointers

### Step 2: Implement the Consolidation Summarizer

Build a background LLM process that executes the consolidation:
1. Retrieve all raw inputs for the consolidation scope
2. Prompt the summarizer with explicit instructions for what to preserve vs. compress
3. Produce the structured memory object
4. Store it in the memory layer with metadata (scope, time range, source count)

### Step 3: Chain Consolidations

As consolidations accumulate, run higher-order consolidations that synthesize the synthesizers. A daily consolidation produces a daily summary; a weekly consolidation of daily summaries produces a weekly view; a monthly consolidation produces the strategic picture. This hierarchy prevents memory object proliferation.

### Step 4: Preserve Provenance

Condensed insights must include pointers back to their source raw data. "Client sentiment is negative" must reference the specific emails and tickets that support that conclusion. This satisfies source attribution (M313) even for synthesized insights.

## Example

Domain: enterprise account management

Raw data after 3 months: 847 emails, 156 support tickets, 23 meeting transcripts, 12 status reports.

Without consolidation: Agent retrieves as much raw data as fits in the context window to answer "What's the current client relationship status?" It gets a partial, unbalanced view.

With consolidation cycles:
- Daily consolidation: "New support ticket #1423 opened, no new emails, meeting transcript processed — key decision: Q3 timeline extension approved."
- Weekly consolidation: "Week of May 19: 3 tickets opened, 2 resolved, 1 pending. Client mentioned delivery risk twice. Relationship health: cautious."
- Monthly consolidation: "Q2 relationship status: Delivery tension around SOW-2026-04 is primary risk factor. Technical satisfaction remains high. Key open item: timeline renegotiation initiated May 28."

Agent answers from the monthly summary supplemented by the weekly details. Total context: ~800 tokens instead of ~150,000.

## Common Pitfalls

1. **Lossy consolidation of critical details** — summarization can compress away specific facts that later become important. Design consolidation prompts to preserve identifiers, dates, decisions, and open items explicitly.
2. **Stale top-level summaries** — monthly summaries that aren't refreshed when weekly summaries update silently serve outdated views. Invalidate parent summaries when child summaries update.
3. **Consolidation bias** — the summarizer LLM will make editorial choices about what's important. Review consolidated outputs regularly to detect systematic bias in what's being compressed away.

## How You Can Help

If you're testing this method:

1. Measure token cost per query before and after implementing consolidation
2. Document your consolidation triggers and the scope/schema you used
3. Note any information types that were lossy consolidated in ways that mattered

## Supporting Evidence

<RelatedObservations />
