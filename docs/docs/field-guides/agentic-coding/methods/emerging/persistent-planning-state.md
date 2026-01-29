---
displayed_sidebar: fieldGuideSidebar
sidebar_position: 6
title: "Persistent Planning State"
maturity: hypothesized
observations: []
---

import MaturityBadge from '@site/src/components/MaturityBadge';
import RelatedObservations from '@site/src/components/RelatedObservations';

# Persistent Planning State

<MaturityBadge maturity="hypothesized" />

Maintain explicit planning state in markdown files that agents read before every decision. This keeps goals in the attention window and prevents context drift during long sessions.

:::caution Early Stage
This method is derived from external evidence (Manus pattern, planning-with-files repo 11k stars, Reddit discussions). Internal FOE observations are needed to validate it in our context.
:::

## Overview

AI coding assistants lose context over long sessions. They start strong but gradually drift from the original goals, forget constraints, or repeat work already done. The longer the session, the worse the drift.

The **Persistent Planning State** pattern (popularized by the Manus agent that led to a $2B acquisition) solves this by externalizing state into markdown files that the agent reads before every decision. The key insight: *"Agent reads plan before every decision to keep goals in attention window."*

This creates a simple but powerful feedback loop:
1. Human and agent agree on a plan (written to file)
2. Agent reads the plan before each action
3. Agent updates progress after each action
4. Drift is impossible because the plan is always in context

## When to Use

Use this method when:

- Working on multi-step tasks that span long sessions
- The AI has shown goal drift or forgotten earlier context
- Multiple people (or future you) need to understand progress
- Tasks have complex dependencies or sequencing

## When NOT to Use

Avoid this method when:

- Simple, single-step tasks that complete quickly
- Exploratory work where the plan is genuinely unknown
- The overhead of file management exceeds the benefit

## How It Works

### Prerequisites

Before starting:
- A workspace where the agent can read/write markdown files
- Agreement on the overall goal or deliverable
- Willingness to pause and plan before diving into code

### Step 1: Create the Three Planning Files

Create three markdown files at the root of your workspace:

**`task_plan.md`** - The master plan with phases and checkboxes:

```markdown
# Task Plan: [Goal Description]

## Phase 1: Setup
- [x] Initialize project structure
- [x] Configure dependencies
- [ ] Set up test framework

## Phase 2: Core Implementation
- [ ] Implement data models
- [ ] Create API endpoints
- [ ] Add validation logic

## Phase 3: Polish
- [ ] Error handling
- [ ] Documentation
- [ ] Final testing
```

**`findings.md`** - Research and decisions storage:

```markdown
# Findings

## Architecture Decisions
- Using PostgreSQL over MongoDB because [reason]
- Chose Express over Fastify because [reason]

## Research Notes
- API rate limits: 100 req/min
- Auth token format: JWT with 24h expiry

## Open Questions
- Should we cache user profiles?
```

**`progress.md`** - Session log with timestamps:

```markdown
# Progress Log

## 2026-01-27 Session 1
- [10:30] Started Phase 1 setup
- [10:45] Completed project initialization
- [11:00] Hit issue with dependency conflict, resolved by pinning version
- [11:15] Paused - next: set up test framework

## 2026-01-27 Session 2
- [14:00] Resumed from test framework setup
- ...
```

### Step 2: Instruct Agent to Read Before Acting

Add to your CLAUDE.md or session instructions:

```markdown
## Working Memory

Before taking any action, read these files:
- task_plan.md - Current plan and progress
- findings.md - Decisions and research
- progress.md - Session history

After completing any task:
1. Update task_plan.md checkboxes
2. Add any findings to findings.md
3. Log the action in progress.md
```

### Step 3: Review Plan Before Every Decision

When working with the agent, periodically prompt:

```
"Before we continue, check task_plan.md. What's the next uncompleted item?"
```

This forces the agent to re-ground in the plan, preventing drift.

### Step 4: Update State After Every Action

After completing work:

```
"Update the planning files:
1. Check off what we completed in task_plan.md
2. Add any decisions we made to findings.md  
3. Log this in progress.md with timestamp"
```

### Step 5: Use Progress for Session Handoff

When starting a new session:

```
"Read progress.md to understand where we left off, then check 
task_plan.md for the next item."
```

The files provide complete context even across session boundaries.

## Example

**Session 1: Planning**
```
You: Let's build a REST API for user management. Create a task_plan.md 
with the phases we need.

AI: [Creates task_plan.md with phases: Setup, Models, Endpoints, Auth, Testing]

You: Good. Let's start with Setup.
```

**Session 1: Working**
```
AI: [Completes setup tasks, updates checkboxes]
AI: [Logs findings about chosen libraries to findings.md]
AI: [Records progress with timestamps to progress.md]
```

**Session 2: Resuming (hours later)**
```
You: Read the planning files and tell me where we are.

AI: Reading files...
- task_plan.md: Phase 1 (Setup) complete, Phase 2 (Models) not started
- findings.md: We chose Express + Prisma, PostgreSQL for persistence
- progress.md: Last action was completing test framework setup at 11:15

Next uncompleted item: "Implement data models" in Phase 2.
```

No context lost. No drift. Work continues exactly where it stopped.

## Common Pitfalls

1. **Forgetting to update files** - The system only works if files are kept current. Build the update habit or automate it.

2. **Plans that are too detailed** - Over-planning creates maintenance burden. Keep phases high-level with 3-7 items each.

3. **Not reading before acting** - If the agent doesn't read the files, they don't help. Make reading explicit in your workflow.

4. **Treating files as append-only** - It's okay to reorganize the plan as you learn. The plan should evolve.

## FOE Alignment

This method directly supports **Optimize for Understanding**:
- Explicit state prevents hidden assumptions
- Written plans force clarity of thought
- Session handoffs preserve understanding across time

Also supports **Incremental Development**:
- Checkbox-driven progress makes increments visible
- Each phase is a natural checkpoint

## External Evidence

- **Manus agent pattern** (led to $2B acquisition): Core workflow uses this 3-file structure
- **planning-with-files** (GitHub, 11k stars): Open source implementation of the pattern
- **Reddit r/ClaudeAI** (1049 upvotes): Thread discussing the pattern's effectiveness

## How You Can Help

If you're testing this method:

1. Apply the 3-file pattern to a multi-session project
2. Track how often it prevents context drift
3. Document your experience as an observation

## Supporting Evidence

<RelatedObservations />
