---
displayed_sidebar: fieldGuideSidebar
sidebar_position: 10
title: "Trunk-Based Development"
sidebar_label: "Trunk-Based Development"
description: "How trunk-based development supports AI-assisted workflows"
external_method:
  framework: continuous-delivery
  method: trunk-based-development
foe_maturity: hypothesized
observations: []
---

import ExternalMethodHeader from '@site/src/components/ExternalMethodHeader';
import RelatedObservations from '@site/src/components/RelatedObservations';

# Trunk-Based Development

<ExternalMethodHeader />

## Why This Matters for Agentic Coding

Trunk-based development keeps everyone on a single main branch with short-lived feature branches. This approach aligns well with AI-assisted development's emphasis on fast feedback and small changes.

**AI Enables Smaller Changes:**
- AI can complete small features quickly
- Short branches are more practical when AI accelerates implementation
- Less context for AI means more accurate output

**Fast Feedback Alignment:**
- Trunk-based means frequent integration
- Each integration is a verification point for AI output
- Problems surface quickly rather than in large merge conflicts

## Adaptations for Agentic Coding

### Atomic AI Changes

Use AI for small, atomic changes that integrate easily:

```
Instead of:
  "Build the entire user management module"

Prefer:
  "Add the User model with email and name fields"
  → integrate
  "Add email validation to User model"  
  → integrate
  "Add user creation endpoint"
  → integrate
```

Each AI task integrates immediately to trunk.

### Feature Flags for AI-Generated Features

AI can help implement features quickly, but safety requires incremental rollout:

1. AI generates feature behind feature flag
2. Code integrates to trunk (flag off)
3. Testing with flag on
4. Gradual rollout to users
5. Flag cleanup

This keeps trunk releasable while AI features are validated.

### Short-Lived Branch Best Practices

With AI, branches can be even shorter:

| Without AI | With AI |
|------------|---------|
| 2-3 days | Same day |
| Multiple commits | 1-3 commits |
| Async review | Often synchronous review possible |

### Continuous Integration Requirements

Trunk-based development requires:
- Fast build and test (~10 minutes max)
- Comprehensive automated tests
- Clear ownership and quick response to breaks

AI-assisted development makes these even more important.

## Trunk-Based Anti-Patterns with AI

| Anti-Pattern | Problem |
|--------------|---------|
| **Large AI-generated PRs** | Trunk-based requires small changes |
| **Unverified AI commits** | Every commit should pass CI |
| **Deferred integration** | AI enables fast work; integrate immediately |
| **Skipping tests** | AI speed doesn't justify skipping verification |

## The AI-Trunk Development Flow

```
1. Pull latest from trunk
2. Create short-lived branch
3. AI generates small change
4. Run local verification
5. Create PR (should be quick to review)
6. Merge to trunk
7. Repeat
```

This flow maximizes feedback frequency and minimizes integration risk.

## Questions We're Exploring

- How short can branches be with AI assistance?
- Does trunk-based development change the optimal size of AI tasks?
- How do we handle AI-generated changes that break trunk?

## Supporting Evidence

<RelatedObservations />
