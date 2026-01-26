---
sidebar_position: 1
title: DORA
status: industry-standard
source:
  url: https://dora.dev
  authors:
    - Nicole Forsgren
    - Jez Humble
    - Gene Kim
  publication_year: 2018
  organization: Google Cloud / DORA Team
version: "2024"
pillars:
  - throughput
  - stability
related_frameworks:
  - accelerate
  - space
description: Research-backed metrics for measuring software delivery and operational performance.
---

# DORA Metrics

DORA (DevOps Research and Assessment) provides research-backed metrics for measuring software delivery and operational performance. Originally developed through the State of DevOps reports and the book *Accelerate*, DORA metrics have become the industry standard for assessing engineering team effectiveness.

## The Four Key Metrics

DORA defines four key metrics that predict software delivery performance:

| Metric | Pillar | What It Measures |
|--------|--------|------------------|
| **Deployment Frequency** | Throughput | How often code is deployed to production |
| **Lead Time for Changes** | Throughput | Time from commit to production |
| **Change Failure Rate** | Stability | Percentage of deployments causing failures |
| **Time to Restore Service** | Stability | Time to recover from incidents |

## Performance Levels

DORA categorizes teams into performance levels based on these metrics:

| Level | Deployment Frequency | Lead Time | Change Failure Rate | MTTR |
|-------|---------------------|-----------|---------------------|------|
| **Elite** | On-demand (multiple/day) | < 1 hour | 0-15% | < 1 hour |
| **High** | Weekly to monthly | 1 day - 1 week | 16-30% | < 1 day |
| **Medium** | Monthly to 6 months | 1 week - 6 months | 16-30% | 1 day - 1 week |
| **Low** | > 6 months | > 6 months | 16-30% | > 6 months |

## Why DORA Matters for FOE

DORA metrics align well with Flow Optimized Engineering principles:

- **Fast Feedback** - Lead time and deployment frequency directly measure feedback loop speed
- **Confidence** - Change failure rate and MTTR measure confidence in the system
- **Understanding** - The metrics themselves create shared understanding of team performance

## Methods

import FrameworkMethodList from '@site/src/components/FrameworkMethodList';

<FrameworkMethodList framework="dora" />

## Further Reading

- [DORA.dev](https://dora.dev) - Official DORA website
- [Accelerate](https://itrevolution.com/product/accelerate/) - The foundational book
- [State of DevOps Reports](https://dora.dev/research/) - Annual research findings
