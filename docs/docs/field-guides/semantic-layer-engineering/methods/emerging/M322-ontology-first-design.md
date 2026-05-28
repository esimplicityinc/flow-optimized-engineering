---
methodId: M322
sidebar_position: 23
title: "Ontology-First Design"
maturity: hypothesized
priority: essential
observations: []
---

import InternalMethodHeader from '@site/src/components/InternalMethodHeader';
import RelatedObservations from '@site/src/components/RelatedObservations';

# Ontology-First Design

<InternalMethodHeader />

Design the formal ontology of a domain — its entity types, relationship types, properties, and constraints — before building retrieval pipelines or agent prompts, so that the semantic architecture has a stable, principled foundation.

:::caution Early Stage
This method is still being validated through observations.
:::

## Overview

Data by itself is inert. Files, rows, tables, tickets, docs, logs, embeddings, chunks — an agent can retrieve and summarize this material, but without a formal ontology, it doesn't know what the data *means* inside the organization.

Ontology is the layer that says:
- This thing is a dataset
- This dataset is owned by this team
- This team serves this mission
- This job transforms this source into this product
- This control protects this risk
- This requirement is satisfied by this evidence
- This agent may use this tool, but not mutate that resource
- This output is not just a file — it is a regulated deliverable

Ontology-First Design means making these definitions explicit before building anything. The ontology becomes the contract that all other semantic layer components — retrieval pipelines, context contracts, entity resolution, graph structure, agent prompts — must conform to.

This is the same principle as domain modeling in DDD (Domain-Driven Design), applied to the knowledge layer: define the ubiquitous language and entity model before writing code.

## When to Use

Use this method when:

- Starting a new semantic layer project — establish the ontology before the first document is ingested
- The domain has complex entity relationships that will determine retrieval quality
- Multiple teams will contribute to or consume the semantic layer — the ontology is the shared contract
- Agent reasoning quality is poor despite good retrieval — often a symptom of missing ontological structure

## When NOT to Use

Avoid this method when:

- Rapid prototyping where ontology formalism is premature (use a lightweight schema; formalize later)
- The domain is genuinely unstructured and entity relationships can't be meaningfully pre-defined
- The ontology already exists in another form (data catalog, CMDB) — integrate rather than duplicate

## How It Works

### Prerequisites

Before starting:
- Identify the domain owner(s) who can validate entity definitions
- Have taxonomy anchoring (M308) in place — the taxonomy provides the vocabulary the ontology uses
- Scope the ontology to a single domain — full enterprise ontology is a multi-year project

### Step 1: Define Entity Classes

For the target domain, enumerate the entity classes and their core properties:

```yaml
entity_classes:
  Dataset:
    properties: [name, owner, classification, schema, update_cadence]
    description: "A named collection of data with defined ownership and schema"
  
  Team:
    properties: [name, mission, lead, members, systems_owned]
    description: "An organizational unit responsible for a set of systems and datasets"
  
  Control:
    properties: [id, type, description, owner, applicable_standards]
    description: "A policy or procedure that governs behavior to mitigate risk"
```

### Step 2: Define Relationship Types

For each pair of entity classes that can be related, define the relationship:

```yaml
relationships:
  owns:
    from: Team
    to: [Dataset, System]
    description: "The team is accountable for this asset"
  
  satisfies:
    from: Evidence
    to: Control
    description: "This artifact demonstrates compliance with this control"
  
  governs:
    from: Control
    to: [Dataset, System, Action]
    description: "This control applies rules to this entity"
```

### Step 3: Define Constraints

Express the rules that make the ontology useful for reasoning:
- A Dataset must have exactly one owning Team
- An Action that modifies a Dataset classified as CUI requires an Authority entity with `can_approve_cui_actions: true`
- A Control without any Evidence entities is flagged as `unattested`

### Step 4: Validate the Ontology with Real Queries

Before building anything on top of the ontology, validate it by attempting to answer the real queries agents will face:
- "Can I answer 'what datasets does Team X own?' with this ontology?" → yes, via `Team -owns-> Dataset`
- "Can I answer 'what evidence exists for Control Z?' with this ontology?" → yes, via `Control <-satisfies- Evidence`
- "Can I answer 'who needs to approve sharing Dataset Y externally?' with this ontology?" → requires checking authority chain

If a critical query can't be answered, the ontology is incomplete. Add the missing entities, relationships, or constraints before proceeding.

## Example

Domain: data engineering platform

Without ontology-first design: The semantic layer ingests pipeline documentation, data dictionaries, and Jira tickets. Agents can find documents about pipelines. They cannot answer "what is the data lineage for the customer_360 dataset?" because lineage relationships were never modeled.

With ontology-first design: Before ingestion, the ontology defines:
- `PipelineJob` entities with `reads_from` and `writes_to` Dataset relationships
- `Dataset` entities with `derived_from` Dataset relationships
- `DataProduct` entities with `produced_by` PipelineJob relationships

Now "what is the data lineage for customer_360?" traverses: `customer_360 Dataset <-writes_to- CustomerMergeJob PipelineJob -reads_from- crm_contacts Dataset, erp_accounts Dataset`.

The answer is computable because the ontology made the relationships explicit.

## Common Pitfalls

1. **Ontology as academic exercise** — an ontology that isn't used by retrieval, agents, or governance is a documentation artifact. The ontology must be the backbone of the semantic layer, not a side document.
2. **Over-specification upfront** — defining every possible entity class and relationship before validation produces a complex, wrong ontology. Start minimal, validate with real queries, expand iteratively.
3. **Ontology without ownership** — an ontology that no one is responsible for maintaining becomes stale rapidly. Assign ontology stewardship to a named role (Knowledge Architect or equivalent).

## How You Can Help

If you're testing this method:

1. Document the entity classes and relationship types you defined for your domain
2. Share which queries were impossible without the ontology and became possible with it
3. Measure how often ontology-guided retrieval (via graph traversal) outperformed flat retrieval for relational queries

## Supporting Evidence

<RelatedObservations />
