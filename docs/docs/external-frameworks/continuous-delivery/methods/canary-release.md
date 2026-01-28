---
sidebar_position: 5
title: Canary Release
description: Reduce risk by slowly rolling out changes to a small subset of users before full deployment.
framework: continuous-delivery
framework_url: https://continuousdelivery.com
foe_alignment:
  primary: Feedback
  secondary: Confidence
status: industry-standard
aliases:
  - Phased Rollout
  - Incremental Rollout
  - Progressive Delivery
---

# Canary Release

**Pillar:** Patterns

A Canary Release is a technique to reduce the risk of introducing a new software version in production by slowly rolling out the change to a small subset of users before rolling it out to the entire infrastructure.

## Definition

> "Canary release is a technique to reduce the risk of introducing a new software version in production by slowly rolling out the change to a small subset of users before rolling it out to the entire infrastructure and making it available to everybody."
>
> — Danilo Sato

The term comes from coal mining, where canaries were used to detect toxic gases—the canary would be affected before miners, providing early warning.

## Why It Matters

Canary releases reduce deployment risk by:

- **Limiting blast radius** - Problems affect only a small percentage of users
- **Providing real feedback** - Actual production traffic validates the release
- **Enabling gradual rollout** - Increase exposure as confidence grows
- **Allowing comparison** - Compare metrics between canary and baseline
- **Detecting problems early** - Issues surface before full exposure

## FOE Framing

**Primary: Fast Feedback Loops**

Canary releases provide real production feedback from actual users. Unlike staging environments, canary traffic is real—real load patterns, real data, real user behavior. This feedback is faster and more accurate than any test environment.

**Secondary: Confidence to Act**

The gradual rollout approach builds confidence incrementally. Starting at 1% and gradually increasing to 100% means any problems are caught early when they affect few users. Teams can deploy more confidently knowing the blast radius is limited.

## How It Works

### Rollout Progression

| Phase | Traffic % | Duration | Action |
|-------|-----------|----------|--------|
| **Canary** | 1-5% | 15-30 min | Monitor closely |
| **Early** | 10-25% | 1-2 hours | Compare metrics |
| **Mid** | 50% | 2-4 hours | Validate at scale |
| **Full** | 100% | - | Complete rollout |

### Canary Selection Strategies

| Strategy | Description | Use Case |
|----------|-------------|----------|
| **Random sample** | Random percentage of all users | General releases |
| **Internal first** | Employees before external users | High-risk changes |
| **Geographic** | Specific regions first | Latency-sensitive changes |
| **User segments** | Power users, beta testers | Feature validation |

### Metrics to Monitor

During canary rollout, compare these metrics between canary and baseline:

- **Error rates** - 5xx errors, exceptions, timeouts
- **Latency** - p50, p95, p99 response times
- **Business metrics** - Conversion rates, engagement
- **Resource usage** - CPU, memory, network
- **User behavior** - Feature usage, flows

### Automated Canary Analysis

Modern systems automate canary evaluation:

1. **Baseline** - Capture metrics from current version
2. **Canary** - Capture metrics from new version
3. **Compare** - Statistical comparison of metrics
4. **Decide** - Automatic promotion or rollback

## Comparison with Blue-Green

| Aspect | Canary | Blue-Green |
|--------|--------|------------|
| **Risk exposure** | Gradual | All-or-nothing |
| **Feedback quality** | Real traffic | Smoke tests only |
| **Infrastructure** | Shared | 2x capacity |
| **Rollback** | Route traffic away | Switch environments |
| **Best for** | Validating changes | Quick, safe switches |

## Relationship to DORA Metrics

Canary releases improve:

- **Change Failure Rate** - Problems caught before full rollout
- **Time to Restore** - Rollback by routing traffic to baseline

## Relationship to Other Methods

- **Blue-Green Deployment** - Canary can run on green before full switch
- **Feature Flags** - Flags provide feature-level control; canary is deployment-level
- **Deployment Pipeline** - Canary is an advanced deployment stage
- **Trunk-Based Development** - Enables frequent releases worth canarying

## Anti-Patterns

- **No monitoring** - Deploying canary without watching metrics
- **Too fast** - Increasing percentage before validating
- **Ignoring metrics** - Proceeding despite warning signs
- **Manual comparison** - Not automating metric analysis

## Citations

- Humble, J., & Farley, D. (2010). *Continuous Delivery*. Addison-Wesley.
- [Canary Release](https://martinfowler.com/bliki/CanaryRelease.html) - Danilo Sato
- Sato, D. (2014). "Canary Release." martinfowler.com.
