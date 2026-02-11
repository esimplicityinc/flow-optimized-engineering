---
sidebar_position: 6
title: "SWE-AGI: Specification-Driven Development Viability"
status: completed
source_type: external
source:
  authors: ["Zhirui Zhang", "Hongbo Zhang", "Haoxiang Fei", "Zhiyuan Bao", "Yubin Chen", "Zhengyu Lei", "Ziyue Liu", "Yixuan Sun", "Mingkun Xiao", "Zihang Ye", "Yu Zhang", "Hongcheng Zhu", "Yuxiang Wen", "Heung-Yeung Shum"]
  organization: "Multiple Institutions"
  year: 2026
  url: "https://arxiv.org/abs/2602.09447"
methods:
  - agentic-coding/methods/emerging/M160-plan-mode-first
  - agentic-coding/methods/emerging/M148-persistent-planning-state
---

import RelatedMethods from '@site/src/components/RelatedMethods';

# SWE-AGI: Specification-Driven Development Viability

> **Source:** Zhang et al. (February 2026), arxiv.org/abs/2602.09447

The SWE-AGI benchmark evaluates agents on specification-driven software construction from formal specifications (RFCs). GPT-5.3-codex achieved 86.4% success and Claude-opus-4.6 achieved 68.2% on tasks requiring 1,000-10,000 lines of core logic. The critical finding: code reading, not writing, becomes the dominant bottleneck as codebases scale.

## Context

**Environment:**
- **Research Team:** Multi-institutional collaboration
- **Timeline:** Research conducted 2025, published February 10, 2026
- **Benchmark:** SWE-AGI (22 tasks from RFCs)
- **Code Volume:** 1,000-10,000 lines of core logic per task

**The Problem:**
Most agent benchmarks test code generation from informal descriptions. Real software engineering often requires implementing formal specifications (RFCs, protocols, standards). Can agents work from precise specifications rather than natural language prompts?

**Research Questions:**
- Can agents implement software from formal specifications (RFCs)?
- What success rates are achievable on complex, specification-driven tasks?
- Where do agents fail as task complexity increases?
- What is the bottleneck: generation or comprehension?

## Hypothesis

The researchers hypothesized that:
1. Agents would struggle with formal specification comprehension
2. Success rates would decrease with task complexity
3. Code generation would be the primary bottleneck
4. Larger models would significantly outperform smaller ones

## Approach

### Methodology
- **Design:** Benchmark evaluation on specification-driven tasks
- **Tasks:** 22 tasks from RFCs (parsers, interpreters, decoders, SAT solvers)
- **Models Tested:** GPT-5.3-codex, Claude-opus-4.6
- **Code Volume:** 1,000-10,000 lines per task (weeks/months of human effort)
- **Platform:** MoonBit ecosystem (minimizes data leakage)

### Task Characteristics
- No baseline code provided
- Implementations from formal RFC specifications
- Complex logic: parsers, interpreters, binary decoders
- Production-scale: thousands of lines of code

## Results

### Key Quantitative Findings

| Finding | Result |
|---------|--------|
| GPT-5.3-codex success rate | **86.4%** (19/22 tasks) |
| Claude-opus-4.6 success rate | **68.2%** (15/22 tasks) |
| Code volume per task | 1,000-10,000 lines |
| Human effort equivalent | Weeks to months |
| Critical bottleneck | **Code reading**, not writing |
| Performance degradation | Sharp decline with increasing difficulty |

### Major Conclusions

1. **Specification-driven is viable** - 68-86% success on complex RFC implementations
2. **Reading is the bottleneck** - Code comprehension, not generation, limits performance
3. **Complexity degrades performance** - Success rates drop sharply with task difficulty
4. **Scale matters** - GPT-5.3 significantly outperforms Claude-opus on these tasks
5. **Agents can handle production scale** - Thousands of lines of logic successfully implemented

### Surprising or Notable Findings

- **Reading > Writing** - Contrary to intuition, comprehension is the bottleneck, not generation
- **Formal specs work** - Agents perform well on precise RFCs vs. informal descriptions
- **Production scale achievable** - 1,000-10,000 line implementations are within scope
- **Model differences matter** - 18 percentage point gap between top models

## Analysis

### What the Research Establishes

1. **Agents can work from formal specs** - 68-86% success on RFC-driven tasks shows specification-driven development is viable
2. **Planning and comprehension are critical** - The "reading bottleneck" finding validates understanding-first approaches
3. **Scale is achievable** - Agents can implement production-scale systems (thousands of lines)
4. **But complexity matters** - Performance degrades sharply with difficulty, showing limits

### FOE Insights

**Understanding:**
This research reveals that agent capabilities are different than assumed. The "reading bottleneck" finding is profound: agents can generate code but struggle to understand complex existing codebases. This validates FOE's emphasis on understanding over generation. Specification-driven development works because it provides clear, formal understanding before implementation begins.

**Feedback:**
The 68-86% success rate shows that specification-driven workflows provide effective feedback loops. When agents work from formal specs, they have clear success criteria. This is fast feedback: implement spec → verify against spec → done. The sharp performance degradation with complexity suggests that feedback loops break down when understanding is incomplete.

**Confidence:**
The research increases confidence in specification-driven and planning-first approaches. If agents can implement 1,000-10,000 line systems from RFCs with 68-86% success, then methodical, specification-driven approaches are viable. However, the "reading bottleneck" reduces confidence in approaches that assume agents can easily work with existing complex codebases.

## Limitations

- **Language:** MoonBit ecosystem specifically; generalizability to other languages unknown
- **Task type:** RFC implementation may differ from other development tasks
- **Model evolution:** Rapid improvement may change these findings
- **Selection bias:** 22 tasks may not represent full spectrum of software engineering

## Conclusion

### Verdict

**Strongly Supported** - The 68-86% success rates on complex, specification-driven tasks provide compelling evidence for planning-first approaches. The "reading bottleneck" finding is particularly valuable as it reframes where agent capabilities are limited.

### Key Learnings

1. **Specification-driven works** - Agents can implement from formal specs with 68-86% success
2. **Understanding is the bottleneck** - Reading/comprehension limits performance, not generation
3. **Planning is essential** - Clear specifications enable agent success
4. **Scale is achievable** - Production-scale implementations (1,000-10,000 lines) are viable
5. **Complexity degrades performance** - Success drops sharply as understanding requirements increase

### Recommendation

**Apply this when:**
- Designing agent-assisted workflows
- Writing specifications for agent implementation
- Evaluating agent capabilities for your use case
- Planning complex implementation tasks

**Watch out for:**
- Assuming agents understand existing complex codebases
- Skipping formal specification steps
- Underestimating the comprehension bottleneck
- Expecting agents to work effectively without clear specs

### FOE Application

| FOE Principle | Application |
|--------------|-------------|
| **Understanding** | Comprehension (not generation) is the critical capability; formal specs maximize understanding |
| **Fast Feedback** | Specification-driven workflows provide clear success criteria and fast verification |
| **Confidence** | 68-86% success rates with specs vs. 12% without shows planning builds confidence |

This observation strongly supports:

**M160: Plan Mode First** - The 68-86% success rate on specification-driven tasks validates planning-first approaches. Agents work better with clear specifications than informal prompts.

**M148: Persistent Planning State** - The "reading bottleneck" finding shows that maintaining context and understanding across large codebases is critical. Persistent planning state helps agents maintain comprehension.

---

## References

- Zhang, Z., et al. (2026). "SWE-AGI: Benchmarking Specification-Driven Software Construction with MoonBit in the Era of Autonomous Agents." arxiv.org/abs/2602.09447
- Scout Report: Agentic Coding Trends, February 11, 2026

---

<RelatedMethods />
