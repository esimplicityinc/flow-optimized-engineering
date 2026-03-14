---
sidebar_position: 4
title: "SWE-Bench Mobile: 12% Success Rate on Industry Tasks"
status: completed
source_type: external
source:
  authors: ["Muxin Tian", "Zhe Wang", "Blair Yang", "Zhenwei Tang", "Kunlun Zhu", "Honghua Dong", "Hanchen Li", "Xinni Xie", "Guangjing Wang", "Jiaxuan You"]
  organization: "Multiple Institutions"
  year: 2026
  url: "https://arxiv.org/abs/2602.09540"
methods:
  - M152
  - M155
---

import RelatedMethods from '@site/src/components/RelatedMethods';

# SWE-Bench Mobile: 12% Success Rate on Industry Tasks

> **Source:** Tian et al. (February 2026), arxiv.org/abs/2602.09540

A comprehensive benchmark evaluating AI coding agents on realistic iOS development tasks found best-performing agents achieve only 12% task success rate. The study reveals that agent design matters as much as model capability, with 6x performance variance using the same model across different agent configurations.

## Context

**Environment:**
- **Research Team:** Multi-institutional collaboration
- **Timeline:** Research conducted 2025, published February 10, 2026
- **Sample:** 22 agent-model configurations across multiple platforms
- **Tasks:** Realistic iOS development with multi-modal inputs (PRDs and Figma designs)

**The Problem:**
Existing benchmarks measured agent performance on simplified tasks. Real-world software engineering requires handling complex, mixed-language codebases (Swift/Objective-C), multi-modal inputs, and nuanced implementation decisions. How do agents perform on industry-realistic tasks?

**Research Questions:**
- What is the success rate of agents on realistic industry tasks?
- How much does agent design matter vs. model capability?
- Which prompt strategies are most effective?
- What is the gap between current capabilities and industrial requirements?

## Hypothesis

The researchers hypothesized that:
1. Agents would achieve moderate success rates on realistic tasks
2. Model capability would be the primary success factor
3. Complex prompt strategies would outperform simple ones
4. Commercial agents would significantly outperform open-source alternatives

## Approach

### Methodology
- **Design:** Benchmark evaluation across 22 agent-model configurations
- **Tools Tested:** Cursor, Codex, Claude Code, OpenCode
- **Metrics:** Task completion rate, code quality, implementation accuracy
- **Validation:** Multi-modal inputs (Figma designs + PRDs), mixed codebase evaluation

### Data Collection
- 22 agent-model configuration evaluations
- Commercial and open-source agent comparisons
- Prompt strategy effectiveness testing
- Real-world iOS development task completion

## Results

### Key Quantitative Findings

| Finding | Result |
|---------|--------|
| Best agent success rate | **12%** on industry tasks |
| Agent configurations tested | 22 |
| Performance variance (same model) | **6x** gap across agents |
| Simple prompt advantage | **7.4%** better than complex prompts |
| Commercial vs open-source | Commercial agents consistently outperform |
| Industrial gap | Significant gap between capabilities and requirements |

### Major Conclusions

1. **88% failure rate** - Agents fail on nearly 9 out of 10 realistic industry tasks
2. **Agent design > model capability** - Same model shows 6x performance variance
3. **Simple prompts win** - "Defensive Programming" prompts outperform complex ones
4. **Commercial advantage** - Open-source alternatives significantly behind
5. **Industrial gap remains** - Current capabilities far from production requirements

### Surprising or Notable Findings

- **12% is the BEST rate** - Top-performing configuration only succeeds 12% of the time
- **6x variance is massive** - Shows agent architecture matters more than raw model power
- **Simple > Complex** - Counter-intuitive finding that basic prompts beat sophisticated ones
- **Multi-modal is hard** - Agents struggle with Figma designs + code simultaneously

## Analysis

### What the Research Establishes

1. **Current agents are not production-ready** - 12% success rate is unacceptable for industrial use
2. **Agent architecture is critical** - The 6x variance proves implementation matters as much as models
3. **Complexity is the enemy** - Simple, defensive approaches outperform sophisticated strategies
4. **Testing is essential** - Without verification, 88% of agent outputs fail

### FOE Insights

**Understanding:**
This research fundamentally reframes agent capabilities. The 12% success rate reveals that current agents are demo-quality tools, not production systems. The 6x performance variance shows that how you use agents matters more than which model you use. This validates FOE's emphasis on methodical, verified approaches over "vibe coding."

**Feedback:**
The 88% failure rate shows that current AI workflows have broken feedback loops. Developers generate code that appears correct but fails validation 88% of the time. Fast generation without verification provides false feedback. Real feedback comes from testing and validation.

**Confidence:**
This research severely undermines confidence in agentic coding for production tasks. However, it validates FOE's cautious approach. The 12% success rate proves that verification (M155) and test-driven development (M152) are not optional best practices but essential for the 12% of cases that actually work.

## Limitations

- **Domain:** iOS development specifically; results may vary for other domains
- **Task complexity:** Industry-realistic tasks are complex by design
- **Benchmark recency:** Rapid agent improvement may close gaps quickly
- **Commercial bias:** Commercial tools had advantages beyond model capability

## Conclusion

### Verdict

**Strongly Supported** - The 12% success rate and 6x performance variance provide compelling evidence that current agents require rigorous testing and verification practices. This is not a matter of improvement but of fundamental capability gaps.

### Key Learnings

1. **Agents fail 88% of the time** - Verification is not optional; it's essential
2. **Agent design matters most** - The 6x variance shows implementation trumps model choice
3. **Simple > complex** - Defensive, straightforward approaches outperform sophisticated ones
4. **Production gap is massive** - Current agents are demo tools, not production systems
5. **Testing is the bottleneck** - Without verification, agent output is unreliable

### Recommendation

**Apply this when:**
- Evaluating agent tools for production use
- Setting expectations for AI-assisted development
- Designing agent-assisted workflows
- Measuring AI tool effectiveness

**Watch out for:**
- Assuming agents can handle production tasks without verification
- Choosing agents based on model hype rather than architecture
- Over-engineering prompts and strategies
- Deploying agents without robust testing pipelines

### FOE Application

| FOE Principle | Application |
|--------------|-------------|
| **Understanding** | Agents have fundamental capability limitations; understanding these is critical |
| **Fast Feedback** | 88% failure rate means testing must be immediate and comprehensive |
| **Confidence** | Without verification, confidence in agent output is dangerously misplaced |

This observation strongly supports:

**M152: Test-Driven Agent Development** - With only 12% success rate, testing is the difference between working and non-working code. TDD is not a nice-to-have but essential for agentic development.

**M155: Verification Before Completion** - The 88% failure rate proves that claiming completion without verification is claiming something that's wrong 88% of the time.

---

## References

- Tian, M., et al. (2026). "SWE-Bench Mobile: Can Large Language Model Agents Develop Industry-Level Mobile Applications?" arxiv.org/abs/2602.09540
- Scout Report: Agentic Coding Trends, February 11, 2026

---

<RelatedMethods />
