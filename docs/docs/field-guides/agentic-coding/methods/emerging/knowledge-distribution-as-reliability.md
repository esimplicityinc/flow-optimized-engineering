---
sidebar_position: 4
title: "Knowledge Distribution as Reliability"
maturity: experimenting
experiments:
  - prima-oss-fork-strategy
---

import MaturityBadge from '@site/src/components/MaturityBadge';
import RelatedExperiments from '@site/src/components/RelatedExperiments';

# Knowledge Distribution as Reliability

<MaturityBadge maturity="experimenting" />

Treat concentrated knowledge as a reliability risk and actively distribute understanding across the team.

:::caution Early Stage
This method is derived from negative evidence--an experiment showing what happens when you *don't* follow this approach. We're seeking experiments that demonstrate positive outcomes when this method is applied.
:::

## Overview

When only 2-3 people understand a system, those people become:
- **Bottlenecks**: Every decision routes through them
- **Single points of failure**: Their absence breaks the team
- **Heroics dependencies**: Support and debugging require their intervention

This method reframes knowledge concentration as a **reliability metric**, not just a team health concern. If your system can only be supported by specific individuals, it has a reliability problem--regardless of how well the code is written.

## Hypothesis

> If we actively distribute knowledge across the team (not just documentation, but understanding), then system reliability will improve because more people can diagnose, support, and evolve the system.

## When to Use

- When support requires "heroics" from specific individuals
- When certain team members are always the ones debugging issues
- When new team members take months to become productive
- When "the expert" being on vacation creates anxiety

## When NOT to Use

- Early prototyping where knowledge concentration is temporary
- Specialized domains requiring deep expertise (though even here, distribution helps)

## Current Approach

### Step 1: Measure Knowledge Concentration

Ask yourself:
- How many people can debug a production issue in this subsystem?
- If the top 2 contributors left, could the team continue?
- Who gets called when things break?

If the answer is consistently "1-2 people," you have concentrated knowledge.

### Step 2: Treat It as a Risk

Add knowledge concentration to your risk register. Track it like you would:
- Single points of failure in infrastructure
- Bus factor calculations
- On-call load distribution

### Step 3: Actively Distribute

Techniques that work:
- **Pair on incidents**: When the expert debugs, someone shadows and asks questions
- **Rotate ownership**: Periodically rotate who owns subsystems
- **Document decisions, not just code**: Explain *why*, not just *what*
- **Require reviews from non-experts**: Force knowledge transfer through review

### Step 4: Verify Distribution

Periodically test:
- Can someone other than the usual expert handle an incident?
- Can a new team member explain the architecture?
- Is on-call load actually distributed?

## What We're Learning

### From Prima (Negative Evidence)

The Prima project concentrated knowledge in a few team members:

**What happened:**
- Only 2-3 people deeply understood the MCP integration
- Support required "heroics by the few that understood"
- Team struggled to support first clients
- Low understanding led to low confidence across the team

**The pattern:**
Low understanding → Low confidence → Concentrated heroics → Fragility

**Team reflection:** *"The main limitation was understanding and lack of confidence, not technical capability."*

The team had the technical capability. The problem was that capability was concentrated, which meant:
- Others couldn't help
- The experts became bottlenecks
- Confidence couldn't be distributed because understanding wasn't

### The Heroics Trap

"Heroics" sounds positive--individuals going above and beyond. But heroics as a pattern indicates:
- The system cannot be supported normally
- Reliability depends on individual effort, not system design
- Burnout risk for the heroes
- Fragility when heroes are unavailable

### Open Questions

- How do you distribute knowledge for genuinely specialized domains?
- What's the right balance between expertise depth and distribution?
- How do you measure knowledge distribution quantitatively?

## How You Can Help

We're seeking experiments that demonstrate:

1. Teams that successfully distributed knowledge--what techniques worked? How long did it take?
2. Metrics for measuring knowledge distribution (beyond gut feel)
3. Cases where knowledge concentration was acceptable and why

If you have experience, [document your experiment](/docs/field-guides/contributing-experiments).

## Supporting Evidence

<RelatedExperiments />
