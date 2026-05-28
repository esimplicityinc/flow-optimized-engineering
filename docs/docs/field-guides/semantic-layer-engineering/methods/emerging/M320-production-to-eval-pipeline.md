---
methodId: M320
sidebar_position: 21
title: "Production-to-Eval Pipeline"
maturity: hypothesized
priority: recommended
observations: []
---

import InternalMethodHeader from '@site/src/components/InternalMethodHeader';
import RelatedObservations from '@site/src/components/RelatedObservations';

# Production-to-Eval Pipeline

<InternalMethodHeader />

Promote production trace failures directly into the evaluation test suite so that real-world semantic layer failures become automated regression tests, driving continuous improvement of the knowledge layer.

:::caution Early Stage
This method is still being validated through observations.
:::

## Overview

The best strategy for improving a semantic layer is not a "set-it-and-forget-it" ingestion script. It is a continuous feedback loop where production failures become the test suite.

The Production-to-Eval pipeline works like this: when an agent fails to answer a query correctly in production — whether detected by a quality gate, reported by a user, or identified through observability analysis — that failure is captured as a test case. The test case includes the query, the expected answer, the source documents that should have been retrieved, and the failure mode. The semantic layer is then iterated until the test passes. The test permanently joins the regression suite, ensuring the failure can never silently recur.

This creates a virtuous cycle: the semantic layer gets better precisely at the things it gets wrong in practice, not at synthetic benchmark queries that may not reflect real usage.

## When to Use

Use this method when:

- The semantic layer is in production and accumulating real usage
- You have observability (M319) in place to capture production failures
- The semantic layer is being actively iterated (chunking, distillation, retrieval config)
- You want the eval suite to reflect actual user needs, not just hypothetical scenarios

## When NOT to Use

Avoid this method when:

- Still pre-production — build a synthetic eval suite first, then supplement with production failures
- Privacy constraints prevent using production queries as test cases (design anonymization)

## How It Works

### Prerequisites

Before starting:
- Semantic observability (M319) must be in place — traces are the raw material
- Quality gates (M317) must be logging failures — these are the detection mechanism
- A test suite infrastructure must exist for the eval framework

### Step 1: Define Failure Capture Criteria

Not every suboptimal answer is a test case candidate. Define criteria:
- Quality gate failure after max retries
- Faithfulness score below 0.7
- User-reported "wrong answer" feedback
- Retrieval recall below 0.5 (query where semantic layer provably lacked necessary information)

### Step 2: Capture the Failure as a Structured Test Case

For each qualifying failure, automatically capture:
```json
{
  "query": "...",
  "expected_answer": "...",
  "expected_sources": ["DOC-ID-1", "DOC-ID-2"],
  "failure_mode": "retrieval_miss | hallucination | stale_context | scope_violation",
  "trace_id": "...",
  "captured_at": "2026-05-28T14:30:00Z"
}
```

Expected sources and expected answer may require human annotation for complex failures. Build a lightweight review workflow for the Knowledge Architect.

### Step 3: Iterate the Semantic Layer Against the Test Case

With the test case captured, diagnose the root cause and implement a fix:
- **Retrieval miss**: improve distillation (M309), add to entity registry (M307), adjust chunking
- **Hallucination**: improve faithfulness gate threshold (M317), check context quality
- **Stale context**: update context contract recency (M300), refresh the knowledge layer
- **Scope violation**: tighten harness scope gate (M316)

The test case passes when the semantic layer correctly answers the query with the expected sources.

### Step 4: Add to Regression Suite

Once passing, the test case becomes a permanent regression test. Any change to the semantic layer (new chunking strategy, embedding model update, distillation pipeline change) must pass the full regression suite before deployment.

### Step 5: Report Regression Suite Coverage

Track the suite as an asset:
- Total test cases: N
- Cases by failure mode: distribution
- Cases added per week: velocity
- Regression pass rate: health signal

A growing suite with a maintained 100% pass rate is evidence that the semantic layer is improving without regressing.

## Example

Week 1: User reports the agent couldn't find the vendor compliance status for DataFlow Inc. despite the assessment existing in the knowledge layer.

Trace analysis: assessment document was ingested but entity "DataFlow Inc." wasn't resolved to canonical entity `VENDOR-0089-DATAFLOW` — the document used the alias "DataFlow Incorporated." Retrieval miss.

Test case captured:
- Query: "What is the compliance status of DataFlow Inc.?"
- Expected sources: [VAR-2025-0089]
- Failure mode: retrieval_miss
- Root cause: entity alias not in registry

Fix: add "DataFlow Incorporated" to entity registry as alias for VENDOR-0089-DATAFLOW. Re-ingest document with entity linking.

Test passes. Case added to regression suite.

Week 4: New embedding model deployed. Regression suite runs. The DataFlow test case passes — the entity resolution fix is durable across the model change.

## Common Pitfalls

1. **Test cases without expected answers** — a test case that only captures the query without the expected answer can only test that the pipeline doesn't crash, not that it produces the right answer. Always capture expected answer and sources.
2. **Manual-only capture** — requiring human review for every failure before it becomes a test case creates a bottleneck. Automate capture for clear-cut failures (gate failures, zero-retrieval queries); require human review for nuanced cases.
3. **Regression suite as compliance theater** — a suite that's never run against real changes provides no protection. Integrate the suite into the deployment pipeline.

## How You Can Help

If you're testing this method:

1. Document how many test cases you accumulated in the first month of production
2. Share the distribution of failure modes in your captured cases
3. Measure whether regression suite coverage correlated with improved RAGAS scores over time

## Supporting Evidence

<RelatedObservations />
