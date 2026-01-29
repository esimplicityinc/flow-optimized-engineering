---
displayed_sidebar: fieldGuideSidebar
sidebar_position: 1
title: Deployment Frequency
pillar: throughput
description: How often code is successfully deployed to production.
---

# Deployment Frequency

**Pillar:** Throughput

Deployment Frequency measures how often an organization successfully releases to production. It is one of the two DORA throughput metrics and serves as a leading indicator of engineering capability.

## Definition

> The frequency with which software is deployed to production or released to end users.

## Why It Matters

High deployment frequency enables:

- **Faster feedback** from real users
- **Smaller batch sizes** reducing risk per deployment
- **More practice** with the deployment process itself
- **Quicker time to value** for new features

## Performance Benchmarks

| Performance Level | Deployment Frequency |
|-------------------|---------------------|
| Elite | On-demand (multiple deploys per day) |
| High | Between once per day and once per week |
| Medium | Between once per week and once per month |
| Low | Between once per month and once every six months |

## How to Measure

1. **Count production deployments** over a time period (typically 30 days)
2. **Include all deployment types** - features, fixes, infrastructure changes
3. **Exclude** failed deployments that were immediately rolled back
4. **Calculate frequency** as deployments per day/week/month

## Improving Deployment Frequency

Common practices that improve deployment frequency:

- **Continuous Integration** - Automated build and test on every commit
- **Trunk-Based Development** - Short-lived branches, frequent integration
- **Feature Flags** - Decouple deployment from release
- **Automated Testing** - Fast, reliable test suites
- **Infrastructure as Code** - Reproducible, version-controlled environments

## Relationship to Other Metrics

- **Lead Time for Changes** - Often improves alongside deployment frequency
- **Change Failure Rate** - Must be monitored to ensure quality isn't sacrificed
- **Time to Restore** - Fast deployments enable fast recovery

## FOE Alignment

Deployment Frequency directly supports the FOE principle of **Fast Feedback Loops**. Higher frequency means faster cycles of learning from production.
