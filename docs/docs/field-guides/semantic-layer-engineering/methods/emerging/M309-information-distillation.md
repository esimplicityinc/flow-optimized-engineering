---
methodId: M309
sidebar_position: 10
title: "Information Distillation"
maturity: hypothesized
priority: recommended
observations: []
---

import InternalMethodHeader from '@site/src/components/InternalMethodHeader';
import RelatedObservations from '@site/src/components/RelatedObservations';

# Information Distillation

<InternalMethodHeader />

Transform raw documents through a structured pipeline of normalization, structural conversion, entity linking, and metadata enrichment before they enter the semantic layer, so every artifact is maximally legible to both humans and AI systems.

:::caution Early Stage
This method is still being validated through observations.
:::

## Overview

Raw data is noisy. A PDF contract contains headers, footers, page numbers, and formatting artifacts that confuse models. A spreadsheet stores structured data in a visual format that LLMs struggle to parse accurately. An email thread buries key decisions in conversational noise.

Information Distillation is the disciplined process of transforming raw artifacts into clean, semantically rich forms before they enter the knowledge layer. It is not just preprocessing — it is a meaning-preserving transformation that makes structure explicit, entities linkable, and metadata auditable.

The distillation pipeline has three stages: **normalization** (remove noise, convert structure to LLM-readable formats), **semantic enrichment** (entity linking, relationship extraction, taxonomy alignment), and **metadata attachment** (context contracts, provenance, classification).

## When to Use

Use this method when:

- Ingesting documents from heterogeneous sources with inconsistent formatting
- The corpus includes structured data (spreadsheets, databases) that needs to be made text-readable
- Retrieval quality is poor despite seemingly relevant content existing — often a distillation problem
- Building a knowledge layer that must be maintained over time (distillation standards ensure consistency)

## When NOT to Use

Avoid this method when:

- The source corpus is already clean and consistently formatted
- One-time retrieval task where investment in distillation pipeline isn't justified
- Source documents cannot be transformed without losing legally significant meaning (e.g., signed contracts that must preserve exact formatting)

## How It Works

### Prerequisites

Before starting:
- Inventory source document types and their characteristic noise patterns
- Define target formats for each source type (what "clean" looks like)
- Have entity registry (M307) and taxonomy (M308) available for enrichment steps

### Step 1: Normalize and Clean

For each document type, remove non-semantic elements:
- PDF: strip headers, footers, page numbers; preserve headings as markdown H1/H2/H3
- Tables: convert to markdown table or JSON — never pass raw HTML tables to LLMs
- Spreadsheets: extract row-per-record structure; attach column headers to each value
- Email threads: strip signatures, disclaimers, quoted replies; preserve threading structure

### Step 2: Convert Structure to LLM-Readable Format

LLMs parse structured text far better than visual structures. Convert all structured data to formats that preserve semantic relationships:
- Tables → markdown tables (with headers)
- Key-value records → structured text or JSON
- Hierarchical data → indented markdown or nested JSON
- Date/time values → ISO 8601 format consistently

### Step 3: Enrich with Entity Links

Run entity detection (M307) against the normalized content. Annotate entity mentions with canonical IDs. This creates the links the knowledge graph needs and improves retrieval precision.

### Step 4: Attach Context Contracts

For each distilled artifact, generate and attach the context contract (M300): authority level, recency metadata, scope/access controls. This is part of distillation, not a separate step — contracts attached at distillation time are more reliable than retroactive attachment.

### Step 5: Store Distilled Artifact

Store the distilled artifact alongside (not replacing) the original. Provenance requires the ability to trace a distilled artifact back to its raw source. The distilled version is what the semantic layer uses; the original is the ground truth for audits.

## Example

Raw input: 45-page PDF vendor assessment with cover page, headers/footers on every page, a 12-column Excel-style table of evaluated criteria, and an appended chain of approval signatures.

After distillation:
- Cover page metadata extracted to frontmatter (vendor name, assessment date, assessor)
- Body normalized to clean markdown with headings preserved
- 12-column table converted to markdown table with headers, individual criteria extractable
- Approval chain extracted to a structured JSON array (approver, role, date, decision)
- Entity links: vendor name → canonical entity ID, assessor → canonical person ID
- Context contract attached: authority=official-assessment, recency=valid until next assessment cycle, scope=internal/restricted

The distilled artifact is both human-readable and maximally parseable by LLMs and retrieval systems.

## Common Pitfalls

1. **Lossy normalization** — stripping "non-semantic" elements that actually carry meaning (e.g., document revision history in footers). Review what's stripped against domain needs.
2. **Table format mismatch** — different table conversion approaches (markdown vs JSON) suit different downstream uses. Choose based on how the table will be consumed.
3. **Distillation pipeline drift** — as source formats evolve, distillation pipelines that aren't maintained produce inconsistently enriched artifacts. Treat distillation pipelines as production code.

## How You Can Help

If you're testing this method:

1. Document the source document types you handled and the transformations applied to each
2. Measure whether retrieval quality improved after distillation vs. raw ingestion
3. Share any normalization patterns or conversion utilities you built

## Supporting Evidence

<RelatedObservations />
