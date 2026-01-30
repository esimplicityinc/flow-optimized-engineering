---
methodId: M112
displayed_sidebar: fieldGuideSidebar
sidebar_position: 1
title: Deployment Pipeline
description: An automated process that takes changes from version control through build, test, and deployment stages.
framework: continuous-delivery
framework_url: https://continuousdelivery.com
foe_alignment:
  primary: Feedback
  secondary: Confidence
status: industry-standard
---

# Deployment Pipeline

**Pillar:** Patterns

A Deployment Pipeline is an automated process that takes every change from version control through build, test, and deployment stages, providing increasing confidence at each stage. It's the central pattern of Continuous Delivery.

## Definition

> "A deployment pipeline is, in essence, an automated implementation of your application's build, deploy, test, and release process."
>
> — Humble & Farley, Continuous Delivery

## Why It Matters

The deployment pipeline is the backbone of Continuous Delivery because it:

- **Makes delivery visible** - Everyone can see where a change is in the process
- **Provides progressive confidence** - Each stage increases confidence in production readiness
- **Enables fast feedback** - Early stages run quickly; slow tests come later
- **Creates reproducibility** - Same process for every change
- **Removes manual steps** - Automation reduces human error

## FOE Framing

**Primary: Fast Feedback Loops**

The pipeline provides fast feedback through staged execution. The commit stage (compile, unit tests, static analysis) runs in minutes, giving immediate feedback. Later stages provide deeper validation. Developers learn quickly if their change breaks something.

**Secondary: Confidence to Act**

Each stage that passes increases confidence. By the time a change reaches production, it has passed multiple automated validation gates. Teams can deploy with confidence because the pipeline has verified the change works.

## How It Works

### Pipeline Stages

| Stage | Purpose | Typical Duration |
|-------|---------|------------------|
| **Commit** | Compile, unit tests, static analysis | 5-10 minutes |
| **Acceptance** | Automated acceptance tests | 30-60 minutes |
| **Performance** | Load testing, stress testing | Hours |
| **Manual** | Exploratory testing, UAT | Variable |
| **Production** | Deploy to production | Minutes |

### Key Principles

1. **Only build packages once** - Don't rebuild for each environment
2. **Deploy the same way everywhere** - Same process for dev, staging, production
3. **Smoke test deployments** - Verify the deployment worked
4. **Keep environments similar** - Minimize differences between stages
5. **If it hurts, do it more often** - Frequent deployment reveals problems

### Pipeline Anti-Patterns

- **Manual gates** - Requiring human approval for routine changes
- **Rebuilding artifacts** - Building different packages for each environment
- **Skipping stages** - "We don't have time to test"
- **Environment drift** - Production differs significantly from staging
- **Long-running stages** - Commit stage taking 30+ minutes

## Relationship to DORA Metrics

The deployment pipeline directly enables:

- **Lead Time for Changes** - Pipeline automation reduces time from commit to production
- **Deployment Frequency** - Reliable pipelines enable frequent deployments
- **Change Failure Rate** - Automated testing catches problems before production

## Relationship to Other Methods

- **Trunk-Based Development** - Pipeline runs on every commit to trunk
- **Blue-Green Deployment** - Final stage of the pipeline
- **Feature Flags** - Enable deploying incomplete features through the pipeline
- **Infrastructure as Code** - Environment provisioning is part of the pipeline

## Related FOE Methods

- **Early Feedback Loop Investment** - The deployment pipeline IS the feedback loop infrastructure

## Citations

- Humble, J., & Farley, D. (2010). *Continuous Delivery*. Addison-Wesley.
- Humble, J., Read, C., & North, D. (2006). "The Deployment Production Line." Agile 2006.
- [Deployment Pipeline - Martin Fowler](https://martinfowler.com/bliki/DeploymentPipeline.html)
