---
sidebar_position: 3
title: "Early Feedback Loop Investment"
maturity: experimenting
experiments:
  - prima-oss-fork-strategy
---

import MaturityBadge from '@site/src/components/MaturityBadge';
import RelatedExperiments from '@site/src/components/RelatedExperiments';

# Early Feedback Loop Investment

<MaturityBadge maturity="experimenting" />

Establish testing and deployment validation infrastructure early, even when the codebase feels too large or complex to test.

:::caution Early Stage
This method is derived from negative evidence--an experiment showing what happens when you *don't* follow this approach. We're seeking experiments that demonstrate positive outcomes when this method is applied.
:::

## Overview

When working with large codebases (especially forked OSS), teams often delay testing infrastructure because:
- The codebase feels too large to understand
- Adding tests feels "monumental"
- Velocity pressure prioritizes features over infrastructure
- "It works on my machine" seems sufficient for now

This method argues that the psychological barrier to testing **grows over time**. The longer you wait, the harder it becomes. Early investment--even small--creates a foundation that compounds.

## Hypothesis

> If we establish feedback loops (testing, CI/CD, deployment validation) early in a project, then we will catch problems in development rather than production, reducing debugging time and user-facing bugs.

## When to Use

- Starting a new project or fork
- Joining a codebase without testing infrastructure
- When "it works on my machine" is the primary validation method
- When velocity pressure is pushing you to skip tests

## When NOT to Use

- True throwaway prototypes (< 1 week lifespan)
- Exploratory spikes where the code will be rewritten

## Current Approach

### Step 1: Start with One Test

Don't try to achieve coverage. Write **one test** that:
- Exercises a critical path
- Can run in CI
- Proves the testing infrastructure works

The goal is breaking the psychological barrier, not achieving coverage.

### Step 2: Add CI Before You Need It

Set up CI/CD that runs your one test. This:
- Forces you to understand the build/deploy process
- Creates a place to add more tests later
- Makes "it works on my machine" visibly insufficient

### Step 3: Test What Breaks

When something breaks in production:
1. Fix it
2. Add a test that would have caught it
3. That test now prevents regression

This is reactive, but it builds coverage where it matters.

### Step 4: Make Deployment Observable

Before first deployment:
- Define what "working" means (health checks, smoke tests)
- Ensure you can verify deployment succeeded
- Automate at least one validation

## What We're Learning

### From Prima (Negative Evidence)

The Prima team prioritized velocity over feedback loops:

**What happened:**
- No significant testing infrastructure invested
- "Works on my machine" became the norm
- OSS codebase was so large that "adding BDD tests felt monumental"
- Feedback came from production, not development

**The cost:**
- 7 production bugs filed on first user day (January 12, 2026)
- December debugging crunch with commits like "prod debugging logs", "more debug"
- Problems discovered in production that could have been caught in CI

**Team reflection:** *"Velocity pressure meant no investment in testing/deployment infrastructure. 'Works on my machine' became the norm. The OSS was so large that adding BDD tests felt monumental."*

### The Compounding Effect

The Prima experiment reveals a compounding pattern:
1. Skip tests early because codebase is large
2. Codebase grows, barrier to testing grows
3. Eventually testing feels impossible
4. All feedback comes from production
5. Production issues consume time that could have built tests

### Open Questions

- What's the minimum viable feedback loop for a new project?
- How do you add tests to a large codebase you don't understand?
- When is it too late to invest? (Is it ever?)

## How You Can Help

We're seeking experiments that demonstrate:

1. Teams that invested in CI/CD early despite velocity pressure--what did you do? What was the ROI?
2. Teams that successfully added tests to large unfamiliar codebases--what techniques worked?
3. Specific metrics on time-to-feedback and production bug rates

If you have experience, [document your experiment](/docs/field-guides/contributing-experiments).

## Supporting Evidence

<RelatedExperiments />
