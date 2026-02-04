---
observationId: O160
displayed_sidebar: fieldGuideSidebar
sidebar_position: 31
title: "ReAct: Synergizing Reasoning and Acting in Language Models"
status: completed
source_type: external
source:
  authors: ["Shunyu Yao", "Jeffrey Zhao", "Dian Yu", "Nan Du", "Izhak Shafran", "Karthik Narasimhan", "Yuan Cao"]
  organization: "Princeton University & Google Research"
  year: 2022
  url: "https://arxiv.org/abs/2210.03629"
methods:
  - M160
---

# ReAct: Synergizing Reasoning and Acting in Language Models

> **Source:** Yao et al. (2022), Princeton & Google Research - ICLR 2023

Landmark research demonstrating that interleaving reasoning traces with actions outperforms either approach alone. With 6,700+ citations, ReAct provides direct evidence that the plan-then-execute paradigm improves AI agent outcomes.

## Context

**Environment:**
- Organization: Princeton University & Google Research
- Researchers: Yao, Zhao, Yu, Du, Shafran, Narasimhan, Cao
- Timeline: Published October 2022, presented at ICLR 2023
- Sample: Multiple benchmarks including HotpotQA, Fever, ALFWorld, WebShop

**The Problem:**
Prior work treated reasoning (chain-of-thought) and acting (tool use, API calls) as separate capabilities. Chain-of-thought excels at reasoning but hallucinates facts. Action-only approaches can interact with environments but lack reasoning to plan effectively.

**Research Questions:**
1. Can reasoning and acting be synergistically combined in a single framework?
2. Does interleaving thought and action improve performance over either alone?
3. How does the combined approach affect hallucination and error recovery?

## Hypothesis

> "The researchers hypothesized that interleaving reasoning traces (thoughts) with task-specific actions would create synergy: reasoning helps induce, track, and update action plans, while actions allow gathering additional information from external sources or environments."

**Variables:**
- Independent: Approach type (Reasoning only, Acting only, ReAct combined)
- Dependent: Task success rate, factual accuracy, interpretability

## Approach

### Methodology

- **Design:** Comparative study across knowledge-intensive and decision-making tasks
- **Analysis:** Success rate comparison between reasoning-only, action-only, and ReAct
- **Validation:** Human evaluation of reasoning traces for interpretability

### Data Collection

- Knowledge tasks: HotpotQA (multi-hop QA), Fever (fact verification)
- Decision-making tasks: ALFWorld (text-based game), WebShop (web navigation)
- Actions: Wikipedia search, page lookup, buy, click, search, etc.
- Evaluated on both few-shot prompting and fine-tuning settings

## Results

### Key Quantitative Findings

| Benchmark | Act-Only | CoT-Only | ReAct | Improvement |
|-----------|----------|----------|-------|-------------|
| HotpotQA | 25.7% | 29.4% | 35.1% | +34% vs best |
| Fever | 57.1% | 56.3% | 64.6% | +13% vs best |
| ALFWorld | 45% | n/a | 71% | +57% vs Act |
| WebShop | 30.1% | n/a | 40.0% | +33% vs Act |

### Major Conclusions

1. **ReAct outperforms both reasoning-only and action-only** - The combined approach beats either individual approach across all benchmarks
2. **Reasoning reduces hallucination** - On HotpotQA, ReAct's hallucination rate was significantly lower than action-only
3. **Actions ground reasoning** - External information retrieval prevents reasoning from going off-track
4. **Interpretability preserved** - Human annotators could follow ReAct's reasoning traces

### Surprising Findings

- ReAct improved performance even when combined with self-consistency and chain-of-thought methods
- The reasoning traces made it possible to edit and correct agent behavior mid-task
- On ALFWorld, ReAct achieved 71% success vs 45% for action-only—a 57% relative improvement

## Analysis

### What the Research Establishes

1. **Planning and execution synergize** - Neither reasoning alone nor acting alone achieves optimal results; the combination is key
2. **Explicit reasoning improves action quality** - Thinking before acting leads to better action selection
3. **Actions provide feedback for reasoning** - Grounding thoughts in real observations prevents hallucination
4. **Interpretability is maintained** - The approach doesn't sacrifice explainability for performance

### FOE Insights

**Understanding:**
ReAct demonstrates that making reasoning explicit improves outcomes. The interleaved traces (Thought → Action → Observation) create an inspectable record of the agent's decision-making process. This directly supports FOE's "Optimize for Understanding"—when we can see the reasoning, we can verify it, debug it, and learn from it.

**Feedback:**
The ReAct paradigm creates a tight feedback loop: Thought → Action → Observation → Thought. Each action generates observations that inform the next reasoning step. This prevents the agent from proceeding with incorrect assumptions—problems are caught and corrected during execution rather than accumulating. This is "Fast Feedback" in action.

**Confidence:**
The substantial improvements (34-57% across benchmarks) with rigorous academic methodology provide high confidence in the plan-then-act approach. The fact that ReAct also reduces hallucination (a major AI reliability concern) further supports confidence in the method.

## Limitations

- **Prompt engineering required** - ReAct requires carefully crafted few-shot examples
- **Increased complexity** - The approach is more complex than simple prompting
- **Benchmark focus** - Testing was on specific benchmarks, not general software development
- **Token cost** - Reasoning traces add to prompt/completion length
- **Sequential dependency** - Errors in early reasoning can cascade

## Conclusion

### Verdict
**Strongly Supported** - This is heavily-cited, peer-reviewed research (ICLR 2023) demonstrating that combining planning/reasoning with execution outperforms either alone.

### Key Learnings

1. **Neither pure planning nor pure action is optimal** - The synergy between reasoning and acting is crucial
2. **Explicit reasoning reduces errors** - Thinking before acting catches mistakes earlier
3. **Actions provide reality checks** - Observations prevent reasoning from hallucinating
4. **The approach scales** - Benefits seen across diverse task types (QA, decision-making, web interaction)

### Recommendation

**Apply this when:**
- Building AI agents that need to plan and execute
- Tasks require multiple steps with intermediate decisions
- Reliability and interpretability are important
- Hallucination is a concern that needs mitigation

**Watch out for:**
- Overhead for simple, single-step tasks
- The need for carefully designed prompts/few-shot examples
- Error propagation if early reasoning steps are wrong
- Token costs for verbose reasoning traces

### FOE Application

| Finding | FOE Implication |
|---------|-----------------|
| ReAct outperforms Act-only by 34-57% | Strong support for "Plan Mode First" |
| Reasoning reduces hallucination | Planning catches errors before they compound |
| Observations ground reasoning | Feedback loops keep plans aligned with reality |
| Traces are interpretable | Supports "Optimize for Understanding" |

---

## References

- Yao, S., Zhao, J., Yu, D., Du, N., Shafran, I., Narasimhan, K., & Cao, Y. (2022). ReAct: Synergizing Reasoning and Acting in Language Models. *International Conference on Learning Representations (ICLR)*. https://arxiv.org/abs/2210.03629

---

