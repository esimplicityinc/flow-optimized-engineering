---
displayed_sidebar: fieldGuideSidebar
sidebar_position: 3
title: "System Over Individuals"
maturity: observing
observations:
  - external/nummi-plant-transformation
---

import MaturityBadge from '@site/src/components/MaturityBadge';
import RelatedObservations from '@site/src/components/RelatedObservations';

# System Over Individuals

<MaturityBadge maturity="observing" />

When performance is poor, optimize the system before blaming the people. The same individuals can produce dramatically different outcomes depending on the system they operate within.

:::info Observing
This method has supporting external evidence from manufacturing. We're seeking internal 
observations to validate it in software engineering contexts.
:::

## Overview

When teams underperform, organizations often reach for the same solution: replace the people. Hire better developers. Fire the underperformers. Bring in consultants. But this response ignores a fundamental insight: **outcomes are determined primarily by system design, not individual capability**.

The NUMMI plant transformation provides the clearest evidence. GM's Fremont plant—described by UAW leadership as having "the worst workforce in the automobile industry"—was closed in 1982 due to rampant absenteeism, sabotage, and quality problems. When Toyota reopened it in 1984 with the Toyota Production System, **85%+ of the same workers** achieved quality levels matching Toyota's Japanese plants.

The workers didn't change. The system did.

This principle applies directly to software engineering. When bugs escape to production, when deployments fail, when teams miss deadlines—the instinct to blame individuals is usually wrong. Instead, ask: What about the system made this outcome likely? What would prevent it from happening again regardless of who's working?

## FOE Framing

This method is foundational to FOE's approach:

- **Understanding:** Make work visible so everyone can see and improve the system
- **Feedback:** Tighten feedback loops so problems surface early (NUMMI's andon cord)
- **Confidence:** Build psychological safety so people can report problems and suggest improvements

## When to Use

Use this method when:

- **Performance problems are blamed on individuals** — "If only we had better developers..."
- **The same problems recur despite personnel changes** — New people hit the same walls
- **Heroics are required for normal operation** — The system depends on exceptional individual effort
- **Fear prevents honesty** — People hide problems rather than surface them
- **Process improvement stalls** — Teams resist change because they fear blame

## When NOT to Use

Avoid this method when:

- **Genuine skill gaps exist** — Sometimes training or hiring is the right answer
- **Individual misconduct requires response** — Not every problem is systemic
- **The system is already well-designed** — Don't over-engineer working systems
- **Quick individual fixes are sufficient** — Not every problem needs systemic analysis

## How It Works

### Prerequisites

Before starting:
- A team or system experiencing performance problems
- Willingness to look beyond individual blame
- Authority to change processes, not just people

### Step 1: Observe the System, Not the People

When problems occur, resist the urge to identify "who failed." Instead, ask:
- What about the system made this outcome possible?
- Would a different person in this role have done better? Why or why not?
- What information was missing? What feedback was delayed?

Map the system: inputs, processes, handoffs, feedback loops, constraints.

### Step 2: Identify System Failures

Look for patterns that transcend individuals:
- **Missing feedback loops:** Problems discovered late (in production, by customers)
- **Information silos:** People lack context to make good decisions
- **Misaligned incentives:** The system rewards behaviors that hurt outcomes
- **Excessive coordination:** Progress requires too many approvals or handoffs
- **Fear-based culture:** Problems are hidden rather than surfaced

### Step 3: Design System Improvements

For each system failure, design a systemic fix:

| System Failure | Systemic Fix |
|----------------|--------------|
| Problems found late | Add earlier validation (tests, reviews, staging) |
| Information silos | Make work visible (dashboards, standups, documentation) |
| Misaligned incentives | Reward outcomes, not activity |
| Excessive coordination | Reduce dependencies, increase team autonomy |
| Fear-based culture | Model psychological safety, celebrate problem-finding |

### Step 4: Implement with Worker Input

The people doing the work understand the system best. NUMMI succeeded partly because Toyota involved workers in process design—every worker could suggest improvements, and many were implemented.

Don't design systems for people. Design systems with people.

### Step 5: Measure System Outcomes

Track whether the system is improving:
- Defect rates (are problems decreasing?)
- Cycle time (is work flowing faster?)
- Worker satisfaction (do people feel effective?)
- Problem visibility (are issues surfacing earlier?)

If outcomes improve without changing personnel, the system was the problem.

## Example

**Before (GM Fremont):**
- Workers passed defects down the line for later repair
- No authority to stop production for quality issues
- Adversarial management-labor relations
- Fear of layoffs prevented honest problem reporting
- Separate cafeterias, parking by rank

**After (NUMMI with same workers):**
- Any worker could pull the andon cord to stop the line for defects
- Problems fixed at source, not downstream
- Collaborative management-labor relations
- No-layoff policy enabled honest feedback
- Same uniforms, parking, cafeterias for all

**Result:** Quality went from among GM's worst to matching Toyota Japan—with 85%+ of the same employees.

## Common Pitfalls

1. **Stopping at blame** — "The deploy failed because Bob didn't test" is not analysis. Why didn't the system catch the problem before Bob?

2. **Designing systems without worker input** — Systems imposed from above often miss crucial context. Involve the people doing the work.

3. **Expecting instant results** — System change takes time. The improvement comes from compounding small changes.

4. **Ignoring culture** — Tools and processes aren't enough. NUMMI's transformation required cultural changes: no-layoff policy, equal treatment, worker voice.

5. **Over-applying the principle** — Not every problem is systemic. Sometimes training, coaching, or personnel changes are appropriate. Use judgment.

## How You Can Help

This method is hypothesized based on external evidence (NUMMI, Toyota Production System). We need software engineering observations to validate it:

1. Have you seen a team improve dramatically with system changes (not personnel changes)?
2. Have you seen the same people fail in one environment and succeed in another?
3. What system changes had the biggest impact on your team's outcomes?

Document your observation and link it to this method.

## Supporting Evidence

<RelatedObservations />
