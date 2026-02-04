---
methodId: M160
displayed_sidebar: fieldGuideSidebar
sidebar_position: 7
title: "Plan Mode First"
maturity: observing
observations:
  - O159
  - O160
  - O161
---

import InternalMethodHeader from '@site/src/components/InternalMethodHeader';

# Plan Mode First

<InternalMethodHeader />

Use dedicated planning mode with a stronger reasoning model before implementation. This separates high-level thinking from execution, improving outcomes while potentially reducing costs.

## Overview

AI coding assistants can operate in different modes: planning (thinking through approach) vs. implementation (writing code). Many developers jump straight to implementation, missing the benefits of explicit planning.

The **Plan Mode First** method advocates using planning mode before any significant implementation. Key benefits:

1. **Stronger reasoning** - Planning can use more capable (thinking) models optimized for analysis
2. **Cost efficiency** - Cheaper models can handle implementation once the plan is clear
3. **Better outcomes** - Separating planning from execution improves both
4. **Human checkpoint** - Plans can be reviewed and adjusted before work begins

## When to Use

Use this method when:

- Starting a new feature or significant change
- The task involves multiple files or components
- Architectural decisions need to be made
- You want to review the approach before code is written
- Working with tiered model access (strong planner, efficient implementer)

## When NOT to Use

Avoid this method when:

- Making trivial changes (typo fixes, simple renames)
- Exploratory debugging where the problem isn't yet understood
- The plan is already crystal clear in your head
- Time pressure makes planning overhead unacceptable
- **Using modern reasoning models** (o1, o3, Claude with extended thinking) that have built-in planning capabilities—explicit planning prompts may add only 2-3% improvement while increasing time by 20-80% ([Wharton study, 2025](https://gail.wharton.upenn.edu/research-and-insights/tech-report-chain-of-thought/))
- **Pattern-matching tasks** where intuitive processing works better than deliberation—research shows CoT can *reduce* performance by up to 36% on such tasks ([Liu et al., 2024](https://openreview.net/forum?id=rpbzBXdo4x))
- **Emergent design situations** where you're intentionally using XP-style refactoring to discover the design through iteration

:::tip Planning Has Diminishing Returns
Donald Reinertsen's research on product development flow shows that planning follows a U-curve: some planning is valuable, but excessive planning delays feedback and increases cycle time. Find the sweet spot for your context.
:::

## How It Works

### Prerequisites

Before starting:
- Access to an AI assistant with distinct planning/implementation modes (or the ability to prompt for planning)
- Understanding of which model tiers are available to you
- A task that's complex enough to benefit from planning

### Step 1: Enter Planning Mode

Start by explicitly requesting planning, not implementation:

```
"Before we write any code, let's plan this out. What's the approach 
for implementing [feature]? Consider: architecture, files involved, 
sequence of changes, and potential risks."
```

Or if your tool has explicit modes:
```
/plan Add user authentication with JWT tokens
```

### Step 2: Review and Refine the Plan

Read the proposed plan critically:

- Does it address all requirements?
- Are there edge cases it missed?
- Is the sequencing logical?
- Are there simpler alternatives?

Iterate on the plan before proceeding:

```
"The plan looks good but I'm concerned about [X]. How would we 
handle [scenario]? Also, can we simplify step 3?"
```

### Step 3: Approve and Switch to Implementation

Once satisfied with the plan:

```
"The plan looks good. Now implement it, starting with step 1."
```

Or with explicit modes:
```
/implement
```

### Step 4: Reference Plan During Implementation

If the agent drifts from the plan:

```
"Let's pause. Check the plan - we should be working on [X] but 
you're doing [Y]. Let's get back on track."
```

## Example

**Without Plan Mode First:**
```
You: Add user authentication

AI: [Immediately starts writing auth code, makes architectural 
decisions on the fly, may not consider all requirements]
```

**With Plan Mode First:**
```
You: Let's plan out user authentication before implementing.

AI: Here's my proposed approach:
1. Add User model with email, password_hash, created_at
2. Create auth middleware for route protection
3. Implement /register, /login, /logout endpoints
4. Add JWT token generation and validation
5. Update existing routes to require auth where needed

Considerations:
- Password hashing with bcrypt (12 rounds)
- JWT expiry: 24h access token, 7d refresh token
- Rate limiting on auth endpoints to prevent brute force

You: Good plan. But let's use 1h access tokens for security. 
Also, add /refresh endpoint for token renewal.

AI: Updated plan:
[...]

You: Approved. Implement starting with the User model.
```

## Why This Works

### Cognitive Load Separation

Planning and implementing use different cognitive skills:
- **Planning**: Abstract reasoning, system thinking, risk assessment
- **Implementing**: Concrete details, syntax, edge cases

Separating them lets each mode focus on what it does best.

### Model Optimization

Modern AI systems offer tiered models:
- Stronger models (e.g., Claude Opus, GPT-4) excel at reasoning
- Faster models (e.g., Claude Sonnet, GPT-4o-mini) excel at execution

Plan Mode First lets you use the right model for each phase.

### Error Prevention

Many implementation errors stem from unclear plans:
- Missed requirements
- Poor architectural choices
- Inconsistent approaches

By catching these in planning, you avoid costly rework.

## Common Pitfalls

1. **Over-planning** - Don't plan every detail. Focus on architecture, sequencing, and risks. Leave implementation details for implementation.

2. **Ignoring the plan** - A plan only helps if you follow it. Reference it during implementation.

3. **Planning trivial tasks** - Know when to skip planning. Not every change needs a formal plan.

4. **Not iterating** - The first plan is rarely perfect. Refine it before implementing.

## FOE Alignment

This method directly supports **Optimize for Understanding**:
- Explicit plans make thinking visible
- Separating phases clarifies what we're trying to achieve
- Reviews catch misunderstandings before they become code

Also supports **Fast Feedback**:
- Reviewing plans is faster than reviewing implementations
- Catch mistakes before investing in code

## How You Can Help

If you're testing this method:

1. Try explicit planning mode on your next significant task
2. Compare outcomes vs. jumping straight to implementation
3. Track time spent and quality of results
4. Document your experience as an observation

## Supporting Evidence

### Academic Research

**Chain-of-Thought Prompting** (Wei et al., 2022) - The foundational research showing that generating intermediate reasoning steps before final answers dramatically improves LLM performance on complex tasks. 25,000+ citations. [arXiv](https://arxiv.org/abs/2201.11903)

**ReAct: Synergizing Reasoning and Acting** (Yao et al., 2022) - Demonstrates that interleaving reasoning (planning) with action outperforms either alone, achieving 34% improvement on decision-making benchmarks. [arXiv](https://arxiv.org/abs/2210.03629)

**Tree of Thoughts** (Yao et al., 2023) - Shows that deliberate exploration of multiple reasoning paths before committing improves success rates from 4% to 74% on complex planning tasks. [arXiv](https://arxiv.org/abs/2305.10601)

### Industry Validation

**Building Effective AI Agents** (Anthropic, 2024) - Recommends orchestrator-worker patterns where agents plan before operating. "Once the task is clear, agents plan and operate independently." [anthropic.com](https://www.anthropic.com/research/building-effective-agents)

### Cognitive Science Foundation

**Thinking, Fast and Slow** (Kahneman) - System 1 vs System 2 thinking provides the cognitive foundation for separating deliberate planning from intuitive execution.

**The Programmer's Brain** (Hermans) - Working memory limitations in programmers support the claim that simultaneous design+implementation is error-prone.

### Contradicting Evidence

Research also shows limitations—see "When NOT to Use" section for conditions where planning overhead may not be worth the cost.

