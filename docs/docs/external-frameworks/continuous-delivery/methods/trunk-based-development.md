---
displayed_sidebar: fieldGuideSidebar
sidebar_position: 2
title: Trunk-Based Development
description: A branching model where developers collaborate on code in a single branch, avoiding long-lived feature branches.
framework: continuous-delivery
framework_url: https://trunkbaseddevelopment.com
foe_alignment:
  primary: Feedback
  secondary: Understanding
status: industry-standard
---

# Trunk-Based Development

**Pillar:** Patterns

Trunk-Based Development is a source-control branching model where developers collaborate on code in a single branch called "trunk" (or main/master), resisting the creation of long-lived feature branches. It's a prerequisite for true Continuous Integration.

## Definition

> "A source-control branching model, where developers collaborate on code in a single branch called 'trunk', resist any pressure to create other long-lived development branches by employing documented techniques. They therefore avoid merge hell, do not break the build, and live happily ever after."
>
> — trunkbaseddevelopment.com

## Why It Matters

Trunk-based development enables continuous integration because:

- **Avoids merge hell** - Small, frequent integrations are easier than large merges
- **Provides rapid feedback** - Changes are integrated and tested immediately
- **Maintains a single source of truth** - Trunk is always the current state
- **Enables deployment at any time** - Trunk should always be deployable
- **Scales** - Google uses this with 35,000+ developers in a single monorepo

## FOE Framing

**Primary: Fast Feedback Loops**

When developers commit to trunk daily (or more frequently), they get rapid feedback on integration issues. Problems are discovered when they're small and easy to fix, not weeks later during a painful merge.

**Secondary: Optimize for Understanding**

With a single trunk, there's one source of truth for the codebase state. Developers don't need to understand which branch has which features. The codebase state is always clear.

## How It Works

### Core Practices

| Practice | Description |
|----------|-------------|
| **Commit to trunk daily** | At minimum daily; ideally multiple times per day |
| **Short-lived branches only** | Feature branches live < 1 day if used at all |
| **Feature flags** | Hide incomplete features rather than using branches |
| **Branch by abstraction** | Introduce abstractions for large refactorings |

### Scaling Trunk-Based Development

| Scale | Approach |
|-------|----------|
| **Small teams** | Direct commits to trunk |
| **Medium teams** | Short-lived feature branches (< 1 day) |
| **Large teams** | Short-lived branches + feature flags + modular architecture |

### Why Not Long-Lived Feature Branches?

Long-lived branches create problems:

1. **Merge conflicts accumulate** - The longer you wait, the harder the merge
2. **Integration is delayed** - Problems aren't discovered until merge
3. **Code reviews are huge** - Large PRs are hard to review well
4. **Deployment risk increases** - Big-bang integrations are risky

### Making It Work

To succeed with trunk-based development:

1. **Strong automated testing** - Confidence that commits won't break trunk
2. **Feature flags** - Hide incomplete work from users
3. **Small commits** - Each commit is a complete, tested unit
4. **Fast builds** - Quick feedback enables frequent commits

## Relationship to DORA Metrics

Trunk-based development directly enables:

- **Deployment Frequency** - Trunk is always deployable
- **Lead Time for Changes** - No merge delays

## Relationship to Other Methods

- **Feature Flags** - Enable trunk-based development by hiding incomplete features
- **Deployment Pipeline** - Runs on every commit to trunk
- **Continuous Integration** - TBD is how you actually achieve CI

## Anti-Patterns

- **GitFlow** - Long-lived develop, release, hotfix branches delay integration
- **Feature branch per sprint** - Branches that live for weeks
- **Code freeze periods** - Indicates trunk isn't always deployable

## Citations

- Humble, J., & Farley, D. (2010). *Continuous Delivery*. Addison-Wesley.
- [Trunk Based Development](https://trunkbaseddevelopment.com) - Paul Hammant
- Forsgren, N., Humble, J., & Kim, G. (2018). *Accelerate*. IT Revolution Press.
