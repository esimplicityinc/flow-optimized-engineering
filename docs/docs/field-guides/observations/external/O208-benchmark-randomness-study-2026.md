---
sidebar_position: 8
title: "On Randomness in Agentic Evals: Benchmark Reliability Concerns"
status: completed
source_type: external
source:
  authors: ["Research Team"]
  organization: "Academic Research"
  year: 2026
  url: "https://arxiv.org/abs/2602.07150"
methods:
  - M155
---

import RelatedMethods from '@site/src/components/RelatedMethods';

# On Randomness in Agentic Evals: Benchmark Reliability Concerns

> **Source:** Academic Research Team (February 2026), arxiv.org/abs/2602.07150
> 
> **Discussion:** Reddit r/MachineLearning (February 9, 2026)

Research on randomness in agentic evaluations reveals that single-run benchmark scores can vary by 2.2 to 6.0 percentage points between runs. This variance is large enough that small claimed improvements may be indistinguishable from noise, raising concerns about evidence quality in agent research.

## Context

**Environment:**
- **Publication:** arXiv paper (February 2026)
- **Discussion Forum:** Reddit r/MachineLearning (February 9, 2026)
- **Focus:** SWE-Bench-Verified benchmark reliability
- **Community:** Academic and industry researchers

**The Problem:**
Agent benchmark results drive research priorities, funding decisions, and tool adoption. However, the statistical reliability of these benchmarks has received limited scrutiny. If benchmarks are noisy, decisions based on small score differences may not be supported by evidence.

**Research Questions:**
- How much variance exists between benchmark runs?
- Are small reported improvements statistically meaningful?
- How should benchmark reliability affect research and business decisions?
- What evaluation practices ensure robust evidence?

## Hypothesis

The researchers hypothesized that:
1. Single-run evaluations would show significant variance
2. Reported improvements might be within noise margins
3. Current evaluation practices may be insufficient for decision-making
4. Multiple runs would be necessary for reliable comparisons

## Approach

### Methodology
- **Design:** Statistical analysis of benchmark variance
- **Benchmark:** SWE-Bench-Verified
- **Analysis:** Multiple run comparison, variance quantification
- **Focus:** Score stability and statistical significance

### Measurement
- Multiple benchmark runs with identical configurations
- Score variance calculation
- Confidence interval estimation
- Practical significance assessment

## Results

### Key Quantitative Findings

| Finding | Result |
|---------|--------|
| Score variance (SWE-Bench-Verified) | **2.2 to 6.0 percentage points** between runs |
| Evaluation reliability | Single-run evaluations are "far noisier than most people realize" |
| Decision risk | Deployment, funding, and tool decisions may lack evidence support |
| Improvement detection | Small improvements hard to distinguish from noise |

### Major Conclusions

1. **Significant run-to-run variance** - 2.2-6.0 point swings between identical runs
2. **Single-run insufficient** - One evaluation cannot provide reliable evidence
3. **Small improvements suspect** - Claims of 2-3% gains may be statistical noise
4. **Decision risk** - Business and research decisions based on unreliable evidence
5. **Methodology gap** - Current practices don't ensure statistical rigor

### Surprising or Notable Findings

- **Variance is larger than expected** - 6 percentage points is substantial
- **Common practice flawed** - Single-run evaluations are standard but unreliable
- **Improvement claims questionable** - Many reported gains may be noise
- **Evidence standards low** - Field may be making decisions on shaky ground

## Analysis

### What the Research Establishes

1. **Benchmarks are noisy** - Single-run scores can vary by up to 6 percentage points
2. **Statistical rigor is lacking** - Current evaluation practices are insufficient
3. **Evidence quality is poor** - Many claims rest on unreliable measurements
4. **Multiple runs required** - Robust evaluation requires replication

### FOE Insights

**Understanding:**
This research reveals a fundamental problem in agent research: the evidence base is shakier than assumed. The 2.2-6.0 point variance means that many "improvements" are actually noise. This validates FOE's emphasis on rigorous evidence and multiple observations. Understanding requires reliable measurement.

**Feedback:**
The research shows that current feedback loops (benchmark scores) are noisy and potentially misleading. Developers may optimize for benchmarks that vary randomly. Real feedback requires multiple measurements and statistical confidence. Fast feedback doesn't mean single-run; it means confident, replicated measurement.

**Confidence:**
This research both reduces and increases confidence. It reduces confidence in existing benchmark claims (many are noise). However, it increases confidence in FOE's evidence standards. By requiring multiple observations and statistical rigor, FOE methods are more robust than standard practice.

## Limitations

- **Benchmark scope:** SWE-Bench-Verified specifically; other benchmarks may differ
- **Variance sources:** Unknown which factors drive run-to-run differences
- **Mitigation strategies:** Best practices for reducing variance not yet established
- **Field evolution:** Rapid changes may affect variance characteristics

## Conclusion

### Verdict

**Strongly Supported** - The quantified variance (2.2-6.0 points) and its implications for decision-making provide compelling evidence for rigorous evaluation practices.

### Key Learnings

1. **Single-run is insufficient** - Variance of 2.2-6.0 points makes single evaluations unreliable
2. **Small improvements are suspect** - Gains under 6 points may be noise
3. **Statistical rigor required** - Current practices lack necessary methodology
4. **Evidence quality matters** - Decisions based on noisy data are risky
5. **Replication is essential** - Multiple runs needed for confidence

### Recommendation

**Apply this when:**
- Evaluating agent tool performance claims
- Making tool selection decisions
- Publishing or reviewing research
- Setting up evaluation pipelines

**Watch out for:**
- Single-run benchmark claims
- Small reported improvements (under 6 points)
- Overconfidence in benchmark scores
- Ignoring statistical variance

### FOE Application

| FOE Principle | Application |
|--------------|-------------|
| **Understanding** | Reliable measurement is essential for true understanding; noisy data misleads |
| **Fast Feedback** | Fast doesn't mean single-run; confident feedback requires replication |
| **Confidence** | Statistical rigor builds confidence; single-run claims undermine it |

This observation supports:

**M155: Verification Before Completion** - The 2.2-6.0 point variance shows why verification must be rigorous and repeated. A single verification run is as unreliable as a single benchmark run.

**General FOE Evidence Standards** - This research validates FOE's emphasis on multiple observations and statistical rigor. The field's reliance on single-run evaluations is insufficient.

---

## References

- Research Paper: "On Randomness in Agentic Evals" (February 2026), arxiv.org/abs/2602.07150
- Reddit r/MachineLearning discussion (February 9, 2026)
- Scout Report: Agentic Coding Trends, February 11, 2026

---

<RelatedMethods />
