---
methodId: M304
sidebar_position: 5
title: "Semantic Vector Search"
maturity: hypothesized
priority: recommended
observations: []
---

import InternalMethodHeader from '@site/src/components/InternalMethodHeader';
import RelatedObservations from '@site/src/components/RelatedObservations';

# Semantic Vector Search

<InternalMethodHeader />

Use dense vector embeddings to retrieve content by intent and meaning rather than keyword overlap, enabling queries to find relevant content even when no exact terms match.

:::caution Early Stage
This method is still being validated through observations.
:::

## Overview

Vector search maps text into a high-dimensional space where semantic similarity corresponds to geometric proximity. When a user searches for "financial struggles," a vector search can find documents about "liquidity crisis" or "cash flow problems" — without any shared keywords — because the concepts are geometrically close in embedding space.

This makes semantic search the workhorse for intent-based queries where users may not know the exact terminology used in source documents. It is the "vibe layer" of the retriever ensemble — broad, fuzzy, and powerful for natural language queries.

## When to Use

Use this method when:

- Users query in natural language that may differ from document terminology
- The domain has rich synonymy (multiple terms for the same concept)
- You need to find conceptually related content across documents that don't share keywords
- Query intent matters more than exact phrasing

## When NOT to Use

Avoid this method when:

- Queries require exact matching of identifiers, codes, or regulated terminology (use M305 Lexical Precision Search)
- Embedding quality for your domain's vocabulary is poor (test before deploying)
- Hallucination risk from "close enough" matches is unacceptable in your domain

## How It Works

### Prerequisites

Before starting:
- Select an embedding model appropriate for your domain (general-purpose models work for most text; domain-specific models for specialized vocabulary)
- Decide on chunk size — smaller chunks (256-512 tokens) improve precision; larger chunks (512-1024 tokens) preserve more context per retrieval

### Step 1: Chunk and Embed at Ingestion

When documents enter the semantic layer, split them into chunks and generate embeddings for each chunk. Store embeddings alongside chunk content and context contracts (M300) in a vector database.

### Step 2: Embed the Query at Retrieval Time

Generate an embedding for the user's query using the same model used for document embedding. Consistency of embedding model between ingestion and retrieval is mandatory.

### Step 3: Retrieve Top-K by Cosine Similarity

Query the vector database for the K chunks with highest cosine similarity to the query embedding. K is a tunable parameter — start with K=10 and measure whether more or fewer chunks improve answer quality.

### Step 4: Pass Results to Ensemble

Return chunks with their similarity scores to the retriever ensemble (M303) for merging with other retrieval mode outputs.

## Example

Document corpus contains "Q3 liquidity position deteriorated by 12% against covenant thresholds."

User query: "Is the company in financial trouble?"

Keyword search: no match (none of: financial, trouble appear in the document)
Vector search: high similarity (financial trouble ≈ liquidity deterioration in embedding space)

## Common Pitfalls

1. **Chunk boundary artifacts** — splitting documents at fixed token counts can cut sentences mid-thought. Use semantic chunking (split at paragraph/section boundaries) or overlapping windows.
2. **Embedding model mismatch** — re-embedding queries with a different model version than was used for documents silently degrades retrieval quality. Version your embedding model explicitly.
3. **Over-reliance on top-1** — the highest similarity result isn't always the most relevant. Retrieve more candidates (K=10–20) and let the ensemble or re-ranker select.

## How You Can Help

If you're testing this method:

1. Measure retrieval precision and recall on a labeled query set
2. Document which chunk size and embedding model you used
3. Note whether semantic search alone was sufficient or required ensemble augmentation

## Supporting Evidence

<RelatedObservations />
