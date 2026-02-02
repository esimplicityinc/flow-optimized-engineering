---
methodId: M124
displayed_sidebar: fieldGuideSidebar
sidebar_position: 6
title: "Fast Flow"
sidebar_label: "Fast Flow"
description: "How AI-assisted development impacts organizational flow"
external_method:
  framework: team-topologies
  method: fast-flow
  id: M124
foe_maturity: hypothesized
observations: []
---

import ExternalMethodHeader from '@site/src/components/ExternalMethodHeader';

# Fast Flow

<ExternalMethodHeader />

## Why This Matters for Agentic Coding

Fast Flow measures how quickly work moves from idea to customer value. AI-assisted development promises to accelerate the coding phase, but flow is determined by the slowest stage. Understanding where AI helps (and doesn't) is crucial.

**Where AI Accelerates Flow:**
- Code generation - dramatically faster initial implementation
- Boilerplate reduction - AI handles repetitive patterns quickly
- Documentation - AI can generate docs alongside code

**Where AI May Not Help (or Hurts):**
- Review bottlenecks - more code to review, same reviewers
- Verification time - AI output requires checking
- Coordination overhead - unchanged by AI

## Adaptations for Agentic Coding

### Map Your Value Stream with AI

Identify where AI fits in your flow:

```
Idea → Requirements → [AI: Code] → [Human: Review] → Test → Deploy → Value
         ↓                              ↓
    (AI can help)              (potential bottleneck)
```

### Invest in Review Efficiency

With AI generating more code faster:
- Use smaller, atomic changes that are quick to review
- Consider pair programming with AI to reduce async review need
- Automate review checks (lint, type-check, security scan)

### Watch for Inventory Buildup

AI speed creates a risk of inventory (undeployed code):
- Code sitting in review queues
- Features waiting for integration
- Changes that haven't reached production

Track and minimize this inventory.

## Team Topologies Implications

### Stream-Aligned Teams with AI

Stream-aligned teams gain from AI because:
- End-to-end ownership means AI-generated code deploys faster
- No hand-offs where AI speed gains get lost
- Direct feedback on AI output quality

### Cognitive Load Considerations

AI can help manage cognitive load:
- AI handles routine implementation
- Humans focus on design and verification
- But teams must learn AI collaboration patterns

### Platform Teams

Platform teams can multiply AI benefits:
- Self-service AI tooling for all teams
- Consistent AI prompts and patterns
- Shared verification infrastructure

## Questions We're Exploring

- Does AI primarily accelerate flow or shift bottlenecks?
- What team structures best support AI-assisted development?
- How should handoff points change when AI is involved?

## Supporting Evidence

