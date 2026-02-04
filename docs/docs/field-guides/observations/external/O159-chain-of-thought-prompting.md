---
observationId: O159
displayed_sidebar: fieldGuideSidebar
sidebar_position: 30
title: "Chain-of-Thought Prompting Elicits Reasoning in LLMs"
status: completed
source_type: external
source:
  authors: ["Jason Wei", "Xuezhi Wang", "Dale Schuurmans", "Maarten Bosma", "Brian Ichter", "Fei Xia", "Ed Chi", "Quoc Le", "Denny Zhou"]
  organization: "Google Research, Brain Team"
  year: 2022
  url: "https://arxiv.org/abs/2201.11903"
methods:
  - M160
---

# Chain-of-Thought Prompting Elicits Reasoning in LLMs

> **Source:** Wei et al. (2022), Google Research - NeurIPS 2022

Foundational research demonstrating that prompting LLMs to generate intermediate reasoning steps dramatically improves performance on complex tasks. With 25,000+ citations, this paper establishes the theoretical basis for separating planning/reasoning from execution.

## Context

**Environment:**
- Organization: Google Research, Brain Team
- Researchers: Wei, Wang, Schuurmans, Bosma, Ichter, Xia, Chi, Le, Zhou
- Timeline: Published January 2022, presented at NeurIPS 2022
- Sample: Multiple LLM model sizes (8B to 540B parameters), multiple benchmarks

**The Problem:**
Large language models struggle with multi-step reasoning tasks like arithmetic, commonsense reasoning, and symbolic manipulation. Standard prompting methods provide only input-output pairs, giving models no guidance on intermediate reasoning steps.

**Research Questions:**
1. Can prompting models to show their reasoning steps improve performance?
2. Does this technique work across different reasoning task types?
3. Is there a relationship between model size and chain-of-thought effectiveness?

## Hypothesis

> "The researchers hypothesized that augmenting exemplars with chain-of-thought annotations—intermediate reasoning steps leading to the final answer—would enable LLMs to decompose complex problems into manageable steps, improving reasoning accuracy."

**Variables:**
- Independent: Prompting method (standard vs. chain-of-thought)
- Dependent: Task accuracy on arithmetic, commonsense, and symbolic reasoning benchmarks

## Approach

### Methodology

- **Design:** Comparative study of prompting methods across multiple benchmarks
- **Analysis:** Accuracy comparison between standard few-shot prompting and chain-of-thought prompting
- **Validation:** Testing across multiple model sizes and three categories of reasoning tasks

### Data Collection

- Arithmetic reasoning: GSM8K (grade school math), SVAMP, ASDiv, AQuA, MAWPS
- Commonsense reasoning: CommonsenseQA, StrategyQA
- Symbolic reasoning: Last letter concatenation, coin flip tracking
- Model sizes tested: 8B, 62B, 540B parameters (PaLM)

## Results

### Key Quantitative Findings

| Benchmark | Standard Prompting | Chain-of-Thought | Improvement |
|-----------|-------------------|------------------|-------------|
| GSM8K (540B) | 17.9% | 58.1% | +40.2 pts |
| SVAMP (540B) | 69.2% | 79.0% | +9.8 pts |
| ASDiv (540B) | 71.3% | 74.5% | +3.2 pts |
| CommonsenseQA (540B) | 79.0% | 73.5% | -5.5 pts |

### Major Conclusions

1. **Chain-of-thought prompting dramatically improves multi-step reasoning** - On GSM8K, accuracy improved from 17.9% to 58.1%
2. **Benefits emerge at scale** - CoT provides minimal benefit for models under 100B parameters
3. **State-of-the-art achieved** - 540B parameter model with CoT surpassed fine-tuned GPT-3 with verifier on GSM8K
4. **Works across reasoning types** - Improvements seen on arithmetic, symbolic, and many commonsense tasks

### Surprising Findings

- Chain-of-thought prompting requires only 8 examples to achieve strong results
- The technique enables models to solve problems that require many sequential reasoning steps
- On some tasks (CommonsenseQA), CoT showed minimal or negative effects—reasoning steps don't always help

## Analysis

### What the Research Establishes

1. **Reasoning benefits from explicit intermediate steps** - Generating step-by-step reasoning before final answers improves accuracy on complex tasks
2. **Decomposition enables scaling** - Breaking problems into steps allows models to handle multi-step reasoning they otherwise couldn't
3. **Model scale matters** - Benefits emerge primarily in very large models (100B+ parameters)
4. **Task type matters** - Not all tasks benefit equally; tasks requiring sequential reasoning show largest gains

### FOE Insights

**Understanding:**
This research directly supports FOE's emphasis on explicit reasoning and understanding. Chain-of-thought prompting makes the model's reasoning visible and inspectable—exactly what "Optimize for Understanding" advocates. When an AI shows its reasoning steps, humans can verify the logic and catch errors before they propagate to implementation.

**Feedback:**
The intermediate steps create feedback opportunities. Instead of waiting for the final answer to evaluate correctness, each reasoning step can be validated. This aligns with "Fast Feedback"—detecting problems at the reasoning stage is faster than detecting them in implementation.

**Confidence:**
The dramatic accuracy improvements (17.9% → 58.1% on GSM8K) provide strong evidence that reasoning-first approaches work. This builds confidence in "Plan Mode First" as a method—there's rigorous academic evidence that separating reasoning from action improves outcomes.

## Limitations

- **Model scale dependency:** Benefits primarily appear in 100B+ parameter models
- **Not universal:** Some tasks (certain commonsense reasoning) don't benefit from CoT
- **Benchmark focus:** Research focused on specific benchmark tasks, not real-world coding
- **Computational cost:** Generating reasoning steps increases inference time and cost
- **Correctness of steps:** Models can generate plausible-sounding but incorrect reasoning chains

## Conclusion

### Verdict
**Strongly Supported** - This is foundational, heavily-cited research (25,000+ citations) that establishes the theoretical and empirical basis for reasoning-before-action approaches in LLMs.

### Key Learnings

1. **Explicit reasoning steps improve complex task performance** - The core insight underlying "Plan Mode First"
2. **Decomposition is powerful** - Breaking complex problems into steps enables solutions that monolithic approaches miss
3. **Scale matters** - With smaller/older models, the overhead may not be worth it
4. **Task fit matters** - Not every task benefits; choose when to apply planning deliberately

### Recommendation

**Apply this when:**
- Working with capable models (GPT-4 class and above)
- Facing complex, multi-step tasks
- The task involves sequential reasoning or multiple decisions
- You want to inspect and validate the reasoning before commitment

**Watch out for:**
- Overhead on simple tasks that don't require multi-step reasoning
- Models that may generate plausible-but-incorrect reasoning chains
- Tasks where intuitive processing works better than deliberate reasoning

### FOE Application

| Finding | FOE Implication |
|---------|-----------------|
| CoT improves reasoning accuracy | Supports "Plan Mode First" for complex tasks |
| Intermediate steps are inspectable | Aligns with "Optimize for Understanding" |
| Benefits scale with model capability | Adjust method based on available model |
| Not universal—task type matters | Include "When NOT to Use" guidance |

---

## References

- Wei, J., Wang, X., Schuurmans, D., Bosma, M., Ichter, B., Xia, F., Chi, E., Le, Q., & Zhou, D. (2022). Chain-of-Thought Prompting Elicits Reasoning in Large Language Models. *Advances in Neural Information Processing Systems (NeurIPS)*. https://arxiv.org/abs/2201.11903

---

