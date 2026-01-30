---
methodId: M139
displayed_sidebar: fieldGuideSidebar
sidebar_position: 4
title: Time to Restore Service
pillar: stability
description: How long it takes to recover from a failure in production.
---

# Time to Restore Service

**Pillar:** Stability

Time to Restore Service (also known as Mean Time to Recovery or MTTR) measures how quickly an organization can recover from a failure in production. It is a key DORA stability metric.

## Definition

> The time it takes to restore service when a service incident or a defect that impacts users occurs.

## Why It Matters

Fast time to restore indicates:

- **Operational excellence** in incident response
- **Good observability** for fast detection
- **Reliable rollback** and recovery mechanisms
- **Resilient architecture** limiting blast radius

## Performance Benchmarks

| Performance Level | Time to Restore Service |
|-------------------|------------------------|
| Elite | Less than one hour |
| High | Less than one day |
| Medium | Between one day and one week |
| Low | More than six months |

## How to Measure

1. **Start timer** when a production incident is detected (or reported)
2. **Stop timer** when service is restored to normal operation
3. **Calculate median** time across all incidents
4. **Segment by severity** if useful (P1 vs. P2 incidents)

## Components of Recovery Time

```
Incident → Detect → Diagnose → Fix → Deploy → Verify
    |        |         |        |       |        |
    +--------+---------+--------+-------+--------+
               Total Time to Restore
```

Each phase is an opportunity for improvement.

## Improving Time to Restore

Common practices that reduce time to restore:

- **Observability** - Metrics, logs, traces for fast detection and diagnosis
- **Runbooks** - Documented procedures for common failure modes
- **Automated Rollback** - One-click or automatic reversion
- **Feature Flags** - Instant disable without deployment
- **Incident Response Process** - Clear roles, communication, escalation
- **Chaos Engineering** - Practice recovery before real incidents

## Relationship to Other Metrics

- **Change Failure Rate** - Fewer failures means fewer recovery events
- **Deployment Frequency** - Fast deployment enables fast recovery
- **Lead Time** - Similar pipeline that enables fast fixes

## FOE Alignment

Time to Restore Service reflects the **Confidence** principle - knowing that even if something goes wrong, you can recover quickly. This confidence enables more experimentation and faster iteration.
