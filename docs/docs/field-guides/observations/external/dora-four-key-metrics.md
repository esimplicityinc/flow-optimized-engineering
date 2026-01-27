---
sidebar_position: 1
title: "DORA Four Key Metrics Research"
status: completed
source_type: external
source:
  authors: ["Nicole Forsgren", "Jez Humble", "Gene Kim"]
  organization: "DORA / Google Cloud"
  year: 2018
  url: "https://dora.dev"
methods:
  - external-frameworks/dora/methods/deployment-frequency
  - external-frameworks/dora/methods/lead-time-for-changes
  - external-frameworks/dora/methods/change-failure-rate
  - external-frameworks/dora/methods/time-to-restore-service
---

import RelatedMethods from '@site/src/components/RelatedMethods';

# DORA Four Key Metrics Research

> **Source:** Forsgren, Humble & Kim (2018) | DORA Research Program

The DORA (DevOps Research and Assessment) program's multi-year study of 39,000+ technology professionals demonstrates that software delivery performance is measurable through four key metrics, and that high performers achieve dramatically better outcomes without sacrificing stability for speed.

## Context

**Environment:**
- Organization: DORA (now part of Google Cloud)
- Lead Researcher: Dr. Nicole Forsgren, PhD
- Timeline: 2014-2025 (11+ years of continuous research)
- Sample: 39,000+ professionals across the program; 23,000+ data points analyzed for the Accelerate book

**The Problem:**
The software industry lacked rigorous, empirical evidence for what actually predicts delivery performance and organizational outcomes. Claims about DevOps practices were often anecdotal or vendor-driven rather than research-backed.

**Research Questions:**
- What measurable factors predict software delivery performance?
- Is there a trade-off between speed and stability?
- What practices correlate with high performance?

## Hypothesis

> "If organizations optimize for deployment frequency, lead time, change failure rate, and mean time to recovery, then they will achieve better business outcomes because these metrics capture the essential dimensions of software delivery capability."

**Variables:**
- Independent: Software delivery practices (24 capabilities identified)
- Dependent: Four key metrics + organizational performance

## Approach

### Methodology
- **Design:** Quasi-observational field research using psychometric surveys
- **Analysis:** Structural Equation Modeling (SEM), cluster analysis
- **Validation:** Uses scientifically validated, reliable survey measures
- **Academic Rigor:** Lead researcher holds PhD in Management Information Systems; research affiliate at Clemson University and Florida International University

### The Four Key Metrics

| Metric | Definition | Elite Performance |
|--------|------------|-------------------|
| **Deployment Frequency** | How often code is deployed to production | On-demand (multiple per day) |
| **Lead Time for Changes** | Time from commit to production | Less than 1 hour |
| **Change Failure Rate** | Percentage of deployments causing failures | 0-15% |
| **Mean Time to Recovery** | Time to restore service after failure | Less than 1 hour |

### Data Collection
- Annual State of DevOps surveys
- 11+ years of longitudinal data
- Cross-industry sample (technology, finance, retail, government, etc.)

## Results

### Quantitative Results: Performance Differentials

| Comparison | High vs. Low Performers |
|------------|------------------------|
| Deployment Frequency | **208x** more frequent |
| Lead Time | **106x** faster |
| Change Failure Rate | **7x** lower |
| Mean Time to Recovery | **2,604x** faster |

*Source: State of DevOps Reports 2015-2019*

### Key Finding: Speed and Stability Are NOT Trade-offs

The research conclusively demonstrates that high performers achieve both speed AND stability:

> "The idea that developers have to choose between speed and stability is a false dichotomy."

| Performance Tier | Speed | Stability |
|-----------------|-------|-----------|
| Elite | High | High |
| Low | Low | Low |

This refutes the common belief that "moving fast" requires "breaking things."

### Business Outcomes Correlation

High-performing teams are:
- **2x as likely** to exceed profitability goals
- **2x as likely** to exceed market share goals  
- **2x as likely** to exceed productivity goals

### 24 Capabilities Identified

The research identified 24 capabilities that predict high performance across five categories:

**Continuous Delivery (8):** Version control, deployment automation, CI, trunk-based development, test automation, test data management, shift-left security, CD

**Architecture (2):** Loosely coupled architecture, empowered teams

**Product & Process (4):** Customer feedback, value stream visibility, small batches, team observationation

**Lean Management (5):** Lightweight change approval, monitoring, proactive health checks, WIP limits, work visualization

**Culture (5):** Generative culture (Westrum), learning support, collaboration, meaningful work, transformational leadership

### Culture Findings (2023 Report)

| Cultural Factor | Performance Impact |
|-----------------|-------------------|
| Generative organizational culture | +30% organizational performance |
| User-centricity focus | +40% organizational performance |
| High-quality documentation | Dramatically increases capability effectiveness |

## Analysis

### What the Research Establishes

1. **Measurement is possible:** Software delivery performance can be measured objectively through four metrics
2. **Speed enables stability:** Contrary to intuition, deploying more frequently correlates with fewer failures
3. **Culture predicts performance:** Technical practices alone are insufficient; generative culture is essential
4. **Capabilities compound:** The 24 capabilities work together; no single practice is sufficient

### What Surprised the Industry

- **Heavy change approval processes correlate with WORSE outcomes** - Not better risk management
- **Elite performers now make up 26% of teams** (2021) - High performance is achievable, not rare
- **Documentation is foundational** - Often dismissed as overhead, but dramatically improves capability effectiveness

### FOE Insights

**Understanding:**
The DORA research provides a shared vocabulary and measurement framework for understanding software delivery. The four metrics make abstract concepts like "delivery performance" concrete and measurable. The 24 capabilities provide a map of what to improve.

**Feedback:**
The research itself embodies fast feedback principles - annual surveys that track industry changes allow the model to evolve. The metrics prioritize feedback loops: deployment frequency measures how often you can learn from production; lead time measures how quickly you can test hypotheses; MTTR measures how fast you detect and correct problems.

**Confidence:**
The research provides evidence-based confidence in practices that might otherwise seem risky. Deploying more frequently feels dangerous until you see data showing it correlates with stability. The longitudinal nature (11+ years) and sample size (39,000+) provide high confidence in the findings.

## Limitations

- **Survey-based:** Self-reported data introduces potential bias
- **Correlation, not causation:** The research establishes correlations but cannot prove causality
- **Cross-sectional snapshots:** Each year is a point-in-time measurement, not a longitudinal cohort
- **Context variation:** Results may vary by industry, company size, or technology stack
- **Metric gaming:** Organizations may optimize for metrics rather than underlying performance
- **Publication bias:** The research warns against using metrics for team-by-team comparison

### DORA's Own Warning (2023)
> "Metrics should be used for improvement, not comparison or competition between teams."

## Conclusion

### Verdict
**Strongly Supported** - The DORA research provides the most rigorous empirical evidence available for software delivery performance factors. The multi-year study, large sample size, and academic methodology establish high confidence in the findings.

### Key Learnings

1. **Four metrics capture delivery performance:** Deployment frequency, lead time, change failure rate, and MTTR together measure what matters
2. **Speed and stability reinforce each other:** High performers excel at both; the trade-off is a myth
3. **Culture is the foundation:** Technical practices without generative culture will underperform
4. **Measurement enables improvement:** What gets measured can be improved; the metrics provide a baseline

### Recommendation

**Apply this when:**
- Establishing delivery performance metrics for your organization
- Building the case for DevOps/CI-CD investment
- Identifying which capabilities to prioritize
- Countering the "we can't move fast AND be stable" objection

**Watch out for:**
- Using metrics punitively or for team comparison
- Focusing on metrics without addressing underlying culture
- Cherry-picking capabilities without understanding their interactions
- Assuming correlation implies your specific context will match

### FOE Application

The DORA research directly supports FOE's core thesis that optimizing for flow (fast feedback, understanding, confidence) leads to better outcomes than optimizing for output. The four key metrics are essentially measurements of flow:

| DORA Metric | FOE Principle |
|-------------|---------------|
| Deployment Frequency | Fast Feedback (how often can you learn?) |
| Lead Time | Fast Feedback (how quickly can you verify?) |
| Change Failure Rate | Confidence (how safe is change?) |
| MTTR | Fast Feedback + Confidence (how fast can you recover?) |

---

## References

- Forsgren, N., Humble, J., & Kim, G. (2018). *Accelerate: The Science of Lean Software and DevOps*. IT Revolution Press.
- State of DevOps Reports (2014-2025). Available at [dora.dev/research](https://dora.dev/research)
- DORA Quick Check: [dora.dev/quickcheck](https://dora.dev/quickcheck)
- Four Keys Open Source Project: [github.com/GoogleCloudPlatform/fourkeys](https://github.com/GoogleCloudPlatform/fourkeys)

---

<RelatedMethods />
