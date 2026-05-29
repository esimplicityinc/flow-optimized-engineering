---
methodId: M318
sidebar_position: 19
title: "Retrieval Evaluation with RAGAS"
maturity: hypothesized
priority: recommended
observations: []
---

import InternalMethodHeader from '@site/src/components/InternalMethodHeader';
import RelatedObservations from '@site/src/components/RelatedObservations';

# Retrieval Evaluation with RAGAS

<InternalMethodHeader />

Apply the RAGAS framework's three core metrics — Context Precision, Context Recall, and Faithfulness — to mathematically validate the quality of the semantic layer's retrieval pipeline and ground truth alignment.

:::caution Early Stage
This method is still being validated through observations.
:::

## Overview

The greatest threat to a functional semantic layer is over-fetching — retrieving excessive, low-relevance context that pollutes the agent's reasoning through "Lost in the Middle" syndrome. The agent sees 20 chunks, focuses on the ones at the beginning and end, and misses the critical information buried in the middle.

RAGAS (Retrieval-Augmented Generation Assessment) provides a mathematical framework for measuring retrieval quality. Unlike qualitative evaluation ("does this seem right?"), RAGAS produces numeric scores that can be tracked over time, compared across configurations, and used to drive systematic improvement.

The three core metrics address different failure modes:

**Context Precision (Pc)** — Signal-to-noise ratio. Are the top-K retrieved chunks actually relevant?

```
Pc = (Relevant Chunks in top K) / K
```

Low precision means the retriever is surfacing noise alongside signal. The agent must work harder to find the relevant content, and may be distracted by irrelevant material.

**Context Recall (Rc)** — Coverage. Did the semantic layer provide all the information needed to answer the query?

```
Rc = (Relevant Attributes found in Context) / (Attributes in Ground Truth)
```

Low recall means the semantic layer is missing information the agent needs. The agent may hallucinate to fill the gap or produce an incomplete answer.

**Faithfulness ($F$)** — Grounding. Is the agent's answer derived from the retrieved context, or is it fabricating?

High faithfulness means the agent is reasoning from what it was given. Low faithfulness is a hallucination signal.

## When to Use

Use this method when:

- Establishing a baseline for retrieval quality before optimization
- Comparing retrieval configurations (chunk size, embedding model, K value, re-ranker)
- Investigating degraded agent output quality — RAGAS scores diagnose whether the problem is in retrieval (precision/recall) or reasoning (faithfulness)
- Building a continuous evaluation pipeline for the semantic layer

## When NOT to Use

Avoid this method when:

- You don't have ground truth data (RAGAS requires labeled query-answer pairs for recall measurement)
- The domain is too open-ended for meaningful ground truth definition
- Evaluating on a sample so small it isn't statistically meaningful

## How It Works

### Prerequisites

Before starting:
- Build a ground truth dataset: query-answer pairs where the correct answer and the source documents are known
- Have the retrieval pipeline instrumented to return chunk-level metadata
- Choose a RAGAS implementation (the open-source `ragas` Python library or an evaluation platform like Braintrust or Arize)

### Step 1: Build the Ground Truth Dataset

For each query in your test set, define:
- The expected answer
- The source documents that should be retrieved to produce that answer
- The specific attributes from those sources that the answer requires

Ground truth quality drives everything. Poor ground truth produces misleading RAGAS scores.

### Step 2: Measure Context Precision

Run your retriever on each test query. For each query, check what fraction of the top-K retrieved chunks are actually relevant (appear in the ground truth source set). A precision score below 0.6 indicates significant noise in retrieval.

### Step 3: Measure Context Recall

For each query, check what fraction of the attributes needed to answer the question are present in the retrieved context. A recall score below 0.7 indicates the semantic layer is missing information and the agent will have to fill gaps with inference or hallucination.

### Step 4: Measure Faithfulness

Run the full agent pipeline and, for each answer produced, measure what fraction of the claims in the answer can be traced back to the retrieved context. A faithfulness score below 0.8 is a significant hallucination risk signal.

### Step 5: Use Scores to Drive Targeted Improvement

| Low Score | Root Cause | Intervention |
|---|---|---|
| Low Precision | Retriever surfacing noise | Tune K, improve re-ranker, refine chunking |
| Low Recall | Missing content or poor coverage | Improve distillation (M309), expand knowledge layer |
| Low Faithfulness | Agent reasoning beyond context | Strengthen harness (M316), add faithfulness gate (M317) |

## Example

Baseline evaluation before optimization:
- Context Precision: 0.45 (9 of 20 retrieved chunks relevant)
- Context Recall: 0.72 (agent has 72% of information needed)
- Faithfulness: 0.68 (32% of claims not grounded in retrieved context)

Intervention: reduce K from 20 to 8, add a relevance re-ranker, strengthen citation instructions.

Post-optimization:
- Context Precision: 0.81 (+80% improvement — noise eliminated)
- Context Recall: 0.74 (slight improvement from better chunking)
- Faithfulness: 0.89 (+31% improvement from reduced context noise and stronger harness)

## Common Pitfalls

1. **Small ground truth sets** — evaluating on 10 queries produces noisy scores. Aim for at least 50-100 queries per domain for meaningful measurement.
2. **Static ground truth** — ground truth that doesn't evolve with the knowledge layer produces misleading scores over time. Review and update ground truth when the semantic layer changes significantly.
3. **Optimizing one metric at the expense of others** — reducing K too aggressively improves precision but destroys recall. Treat the three metrics as a balanced scorecard.

## How You Can Help

If you're testing this method:

1. Share your ground truth construction approach and how you sized the dataset
2. Document which metric was lowest and what intervention improved it most
3. Measure the correlation between RAGAS scores and user-reported answer quality

## Supporting Evidence

<RelatedObservations />
