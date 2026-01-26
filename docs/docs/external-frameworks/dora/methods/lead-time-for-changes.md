---
sidebar_position: 2
title: Lead Time for Changes
pillar: throughput
description: Time from code commit to running in production.
---

# Lead Time for Changes

**Pillar:** Throughput

Lead Time for Changes measures how long it takes for committed code to reach production. It is a key DORA throughput metric that reflects the efficiency of your entire delivery pipeline.

## Definition

> The amount of time it takes for a commit to get into production.

## Why It Matters

Short lead times enable:

- **Faster experimentation** and learning cycles
- **Quick response** to customer needs and market changes
- **Reduced risk** through smaller, more frequent changes
- **Higher developer satisfaction** from seeing work deployed quickly

## Performance Benchmarks

| Performance Level | Lead Time for Changes |
|-------------------|----------------------|
| Elite | Less than one hour |
| High | Between one day and one week |
| Medium | Between one week and one month |
| Low | Between one month and six months |

## How to Measure

1. **Start timer** when code is committed to the main branch
2. **Stop timer** when that code is successfully running in production
3. **Track the median** rather than average (less sensitive to outliers)
4. **Segment by change type** if useful (features vs. fixes)

## Components of Lead Time

Lead time is composed of several stages:

```
Commit → Build → Test → Review → Deploy → Production
   |       |       |       |        |
   +-------+-------+-------+--------+
           Total Lead Time
```

Each stage is an opportunity for improvement.

## Improving Lead Time

Common practices that reduce lead time:

- **Automated CI/CD Pipelines** - Eliminate manual handoffs
- **Parallel Testing** - Run test suites concurrently
- **Fast Build Systems** - Incremental builds, caching
- **Streamlined Review** - Pair programming, small PRs
- **Progressive Deployment** - Canary releases, feature flags

## Relationship to Other Metrics

- **Deployment Frequency** - High frequency requires short lead times
- **Change Failure Rate** - Monitor to ensure speed doesn't sacrifice quality
- **Time to Restore** - Similar pipeline improvements help both metrics

## FOE Alignment

Lead Time for Changes is the most direct measure of **Fast Feedback Loops** - shorter lead times mean faster learning from production.
