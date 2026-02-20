---
observationId: O211
sidebar_position: 11
title: "Harness Over Model: One Tool Change Improved 15 LLMs"
status: completed
source_type: external
source:
  authors: ["Can Boluk"]
  organization: "Independent Security Researcher"
  year: 2026
  url: "https://can.ac/2026/02/12/the-harness-problem/"
methods:
  - M155
  - M152
---

import RelatedMethods from '@site/src/components/RelatedMethods';

# Harness Over Model: One Tool Change Improved 15 LLMs

> **Source:** Can Boluk (February 2026), Independent Security Researcher

Security researcher Can Boluk demonstrated that by changing only the edit tool in the coding harness, he improved 15 different LLMs' coding performance in a single afternoon. The finding reframes the industry's "which model is best?" question toward "which harness/tooling is best?" — suggesting that development environment optimization is higher-leverage than model selection.

## Context

**Environment:**
- **Researcher:** Can Boluk, security researcher
- **Timeline:** Published February 12, 2026
- **Sample:** 15 different LLMs tested with identical harness change
- **Discussion Forum:** Hacker News (825 points, 296 comments)

**The Problem:**
The agentic coding industry focuses heavily on model comparison — which LLM generates the best code. Benchmarks like SWE-Bench rank models against each other, driving a narrative that model selection is the primary lever for coding performance. But what if the tooling around the model matters more than the model itself?

**Research Questions:**
- Does the coding harness (tooling) affect LLM performance more than model selection?
- Can a single tool change improve performance across multiple different models?
- Is the industry asking the wrong question about AI coding performance?

## Hypothesis

Boluk hypothesized that the edit tool design in the coding harness was a bottleneck affecting all models equally. If the harness was the constraint, then improving it should lift performance across all models regardless of their individual capabilities.

> "The industry is asking 'which model is best at coding?' when the real question is 'which harness/tooling is best?'"

## Approach

### Methodology
- **Design:** Controlled experiment varying only the edit tool across 15 LLMs
- **Analysis:** Before/after performance comparison on identical coding tasks
- **Validation:** Same tasks, same models, only the edit tool changed

### Data Collection
- Performance metrics for 15 LLMs with original edit tool
- Performance metrics for same 15 LLMs with improved edit tool
- Comparison of improvement magnitude across models

## Results

### Key Quantitative Findings

| Finding | Result |
|---------|--------|
| Models tested | 15 different LLMs |
| Tool changes made | 1 (edit tool only) |
| Models that improved | All 15 |
| Time to implement change | One afternoon |
| HN engagement | 825 points, 296 comments |

### Major Conclusions

1. **A single tool change improved all 15 models** — The edit tool was a universal bottleneck
2. **Harness design matters more than model selection** — The same improvement lifted all models
3. **The industry is optimizing the wrong variable** — Model comparison benchmarks miss the tooling dimension
4. **Tooling improvements are high-leverage** — One afternoon of harness work outperformed months of model training

### Surprising or Notable Findings

- The magnitude of improvement from a single tool change was unexpected
- The improvement was universal across all 15 models, suggesting the bottleneck was entirely in the harness
- 825 HN points indicates massive resonance — this challenged a deeply held industry assumption
- The finding implies that SWE-Bench rankings may be measuring harness quality as much as model quality

## Analysis

### What the Research Establishes

1. **Tooling is the primary lever** — When a single tool change improves 15 different models, the tool is the bottleneck, not the model. This is analogous to how a better compiler improves all programs, not just one.

2. **Model comparison is incomplete** — Benchmarks that rank models without controlling for harness design are measuring a confounded variable. The "best model" may simply have the best default tooling.

3. **Environment optimization is underinvested** — The industry spends billions on model training but relatively little on harness design. This finding suggests the ROI on tooling improvement is dramatically higher.

4. **Verification infrastructure matters** — The edit tool is part of the verification loop — how the model proposes changes and how those changes are validated. Better verification tooling improves all models.

### FOE Insights

**Understanding:**
This research reveals that the development environment — not the model — is the primary determinant of AI coding performance. This validates FOE's emphasis on optimizing for understanding through better tooling, not just better models. The harness is the lens through which the model sees the code; a better lens helps any model see more clearly.

**Feedback:**
The edit tool is a feedback mechanism — it determines how the model proposes changes and receives confirmation. A better edit tool creates tighter feedback loops between the model's intent and the code's reality. This finding suggests that investing in feedback infrastructure (test runners, linters, type checkers) may yield similar universal improvements.

**Confidence:**
This research increases confidence that FOE's focus on development environment optimization is the right strategy. Rather than chasing the latest model, teams should invest in harness quality — better edit tools, better context management, better verification pipelines. These investments compound across all models.

## Limitations

- **Reproducibility:** Specific edit tool changes not fully detailed in the blog post
- **Scope:** Focused on the edit tool; other harness components not tested
- **Benchmarks:** Performance improvement magnitude not precisely quantified in public post
- **Generalizability:** May not apply equally to all types of coding tasks
- **Single researcher:** Not yet independently replicated

## Conclusion

### Verdict

**Supported with Caveats** — The finding that one tool change improved 15 models is compelling and resonated strongly with the developer community (825 HN points). However, the specific improvement magnitudes and methodology details are limited in the public post. The principle is sound even if the precise measurements need independent verification.

### Key Learnings

1. **Optimize the harness, not just the model** — Development environment quality is the primary lever for AI coding performance
2. **Universal improvements exist** — Some tooling changes lift all models, suggesting shared bottlenecks
3. **Verification tooling is high-leverage** — The edit tool is part of the verification loop; better verification helps all models
4. **Benchmarks are confounded** — Model rankings may reflect harness quality as much as model capability
5. **Small changes, large impact** — One afternoon of tooling work can outperform months of model training

### Recommendation

**Apply this when:**
- Choosing between investing in model upgrades vs. tooling improvements
- Designing coding agent harnesses and development environments
- Evaluating AI coding benchmarks and model comparisons
- Setting up team development environments for AI-assisted coding

**Watch out for:**
- Over-indexing on model selection at the expense of tooling
- Benchmarks that don't control for harness design
- Assuming the latest model will solve tooling problems
- Neglecting edit tool, context management, and verification pipeline design

### FOE Application

| FOE Principle | Application |
|--------------|-------------|
| **Understanding** | The harness is the lens through which models see code; better tooling improves understanding for all models |
| **Fast Feedback** | Edit tools and verification pipelines are feedback mechanisms; better feedback helps all models |
| **Confidence** | Investing in harness quality is a more reliable strategy than chasing model upgrades |

This observation supports:

**M155: Verification Before Completion** — The edit tool is part of the verification loop. Better verification tooling improves all models universally, confirming that verification infrastructure is higher-leverage than model selection.

**M152: Test-Driven Agent Development** — If harness design matters more than model selection, then test infrastructure (part of the harness) is a primary lever for AI coding quality. TDD provides the verification feedback loop that all models benefit from.

---

## References

- Can Boluk: "The Harness Problem" (February 12, 2026), can.ac
- Hacker News discussion: 825 points, 296 comments
- Scout Report: Agentic Coding Trends, February 20, 2026

---

<RelatedMethods />
