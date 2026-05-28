---
methodId: M307
sidebar_position: 8
title: "Entity Resolution & Linking"
maturity: hypothesized
priority: essential
observations: []
---

import InternalMethodHeader from '@site/src/components/InternalMethodHeader';
import RelatedObservations from '@site/src/components/RelatedObservations';

# Entity Resolution & Linking

<InternalMethodHeader />

Assign persistent, unique identifiers to real-world entities and resolve all aliases, abbreviations, and contextual references to their canonical form so AI agents treat distributed references as a single, coherent entity.

:::caution Early Stage
This method is still being validated through observations.
:::

## Overview

"Project Phoenix," "PHX-Init," "PHX-2026-Q3," and "the Phoenix initiative" are four strings that refer to one thing. In a large enterprise corpus, a single entity may be mentioned hundreds of times under different names, codes, and contextual references. Without resolution, an AI agent treating these as four distinct things will produce fragmented, incomplete, and potentially contradictory answers.

Entity Resolution & Linking (ERL) is a Master Data Management (MDM) approach applied to AI systems. Each real-world entity is assigned a persistent, canonical identifier. Every mention of that entity — in any document, system, or format — is linked to the canonical ID. When an agent queries about "Phoenix," the entity graph surfaces all linked mentions regardless of how they were expressed.

This is not a nice-to-have. It is the prerequisite for graph-based reasoning (M306), reliable global context assembly (M302), and accurate source attribution (M313). Without ERL, the semantic layer produces a catalog of text chunks; with it, it produces a knowledge base.

## When to Use

Use this method when:

- The domain corpus contains the same entities referred to by multiple names, codes, or abbreviations
- Building knowledge graphs that require canonical entity nodes
- Answering questions that require aggregating information about an entity from multiple sources
- Providing source attribution requires identifying which canonical entity a source discusses

## When NOT to Use

Avoid this method when:

- The corpus is small and homogeneous enough that ambiguity is not a practical problem
- The cost of entity extraction and resolution exceeds the quality improvement in your domain
- You're building a narrow, single-document Q&A system where cross-document entity linking isn't needed

## How It Works

### Prerequisites

Before starting:
- Inventory the entity types in your domain (people, organizations, projects, products, policies, locations)
- Define canonical ID formats for each entity type (use existing internal IDs where they exist)
- Establish an entity registry — the authoritative record of canonical entities and their aliases

### Step 1: Build the Entity Registry

Create or integrate with an entity registry that maps canonical IDs to all known aliases. This may be seeded from existing MDM systems, project management tools, HR systems, or constructed from corpus analysis. The registry is a living artifact — it grows as new aliases are discovered.

### Step 2: Resolve During Ingestion

At document ingestion time, run entity detection against the entity registry. Replace or annotate all recognized aliases with their canonical ID. This creates explicit links between the document and the canonical entities it discusses.

### Step 3: Handle New Entities

When an entity mention doesn't match any existing canonical ID, flag it for review. New entities may be genuinely new (create a new canonical ID) or may be aliases of existing entities (update the registry). Automate detection; require human review for disambiguation decisions.

### Step 4: Maintain Resolution Quality

Measure resolution precision and recall against a labeled sample of your corpus. Resolution quality degrades as the corpus evolves — run periodic audits and update the registry when new aliases or entities emerge.

## Example

Corpus contains:
- 2022 kickoff doc: "Project Phoenix will deliver..."
- 2023 budget spreadsheet: "PHX-Init allocation: $2.4M"
- 2024 risk register: "PHX-2026-Q3: medium risk, vendor dependency"
- 2025 board memo: "the Phoenix initiative is on track"

Without ERL: four queries about Phoenix return different result sets. The risk register entry is missed for "Project Phoenix" queries because "PHX-2026-Q3" doesn't match.

With ERL: all four are linked to canonical entity `PROJECT-0042-PHOENIX`. Any query about Phoenix surfaces all four sources plus all graph edges connected to the canonical entity.

## Common Pitfalls

1. **Premature automation** — fully automated entity resolution has meaningful error rates. Human review of ambiguous matches is essential, especially early in registry construction.
2. **Registry staleness** — a registry that isn't updated as new aliases emerge silently degrades resolution quality. Build alias discovery into your ingestion pipeline.
3. **Over-resolution** — "Phoenix" might refer to the city and the project in the same corpus. Context-sensitive resolution is harder but necessary in domains with common-word entity names.

## How You Can Help

If you're testing this method:

1. Document the entity types and alias patterns you found in your domain
2. Measure what percentage of entity mentions resolved correctly against a labeled sample
3. Share what tooling you used for entity extraction and resolution

## Supporting Evidence

<RelatedObservations />
