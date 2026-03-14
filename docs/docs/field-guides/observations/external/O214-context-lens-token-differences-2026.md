---
observationId: O214
sidebar_position: 14
title: "Context Lens: 10x Token Differences Across AI Coding Tools"
status: completed
source_type: external
source:
  authors: ["Lars de Ridder"]
  organization: "The Red Beard (theredbeard.io)"
  year: 2026
  url: "https://theredbeard.io/blog/i-intercepted-3177-api-calls-across-4-ai-coding-tools"
methods:
  - M156
  - M154
---

import RelatedMethods from '@site/src/components/RelatedMethods';

# Context Lens: 10x Token Differences Across AI Coding Tools

> **Source:** Lars de Ridder (February 2026), theredbeard.io

Lars de Ridder built Context Lens, an open-source tool that intercepts LLM API calls to reveal context window composition. Comparing Claude Code (Opus 4.6), Claude Code (Sonnet 4.5), Codex CLI (GPT-5.3), and Gemini CLI on the same Express.js bug, he found 10x token usage differences. The critical insight: efficiency differences come entirely from investigation strategy, not deliberate context management. No tool actively manages its context budget.

## Context

**Environment:**
- **Researcher:** Lars de Ridder, developer and technical writer
- **Timeline:** Published February 19, 2026
- **Sample:** 3,177 API calls across 4 AI coding tools on identical task
- **Discussion Forum:** Reddit r/programming (213 upvotes)

**The Problem:**
AI coding tools consume vastly different amounts of tokens on identical tasks, but users have no visibility into why. The context window — what the model actually sees — is a black box. Without understanding context composition, developers cannot optimize their workflows or evaluate tool efficiency.

**Research Questions:**
- What do AI coding tools actually put in the context window?
- Why do different tools consume vastly different token amounts on the same task?
- Do tools actively manage their context budgets?
- What determines investigation efficiency?

## Hypothesis

De Ridder hypothesized that significant differences in context window composition would explain performance and cost variations between tools. He expected to find deliberate context management strategies that could be studied and optimized.

> "Context management, on the tool side, is basically nonexistent. The efficiency differences come entirely from investigation strategy."

## Approach

### Methodology
- **Design:** Controlled comparison — same Express.js bug, same codebase, 4 different tools
- **Tool:** Context Lens (open-source API call interceptor built for this study)
- **Analysis:** Token composition breakdown by category (tool definitions, tool results, system prompts, user messages)
- **Validation:** Identical task ensures fair comparison

### Data Collection
- 3,177 intercepted API calls
- Token usage per turn and per session
- Context composition breakdown by category
- Investigation strategy analysis (which files accessed, in what order)
- Task completion time and approach

## Results

### Key Quantitative Findings

| Tool | Total Tokens | Strategy | Completion Time |
|------|-------------|----------|-----------------|
| Claude Code (Opus 4.6) | 23K | Surgical git-first | Moderate |
| Claude Code (Sonnet 4.5) | ~50K | Broader exploration | Moderate |
| Codex CLI (GPT-5.3) | ~40K | Parallel grep-and-sed | 34 seconds (fastest) |
| Gemini CLI | 350K | Dump entire git histories | Slowest |

| Finding | Result |
|---------|--------|
| Token usage range | 23K to 350K (15x difference) |
| Opus context composition | 69% tool definitions, 6% tool results |
| Gemini context composition | 96% tool results (file dumps) |
| Codex unique capability | Parallel shell commands in same turn |
| Active context management | **None** — no tool manages its context budget |

### Major Conclusions

1. **15x token usage difference** on identical tasks — Opus used 23K tokens while Gemini consumed 350K
2. **No tool actively manages context** — Efficiency differences come entirely from investigation strategy, not deliberate context management
3. **Investigation strategy is the key variable** — Opus's surgical git-first approach vs. Gemini's brute-force file dumping explains the entire difference
4. **Tool definitions dominate Opus context** — 69% of Opus's context is tool definitions (16.4K tokens every turn), leaving little room for actual code
5. **Codex parallelizes uniquely** — Fires off parallel shell commands in the same turn, which no other tool does

### Surprising or Notable Findings

- No tool has any deliberate context management strategy — the efficiency is entirely emergent from investigation approach
- Opus carries 16.4K tokens of tool definitions every single turn — "like a surgeon performing brain surgery wearing a backpack with garden equipment"
- Gemini's approach is described as "a semi-truck — you don't know which Gemini is going to show up, you only know it will eat all your snacks"
- The fastest tool (Codex at 34 seconds) was not the most token-efficient (Opus at 23K)

## Analysis

### What the Research Establishes

1. **Context management is an unsolved problem** — Despite being the primary cost and quality driver, no major AI coding tool actively manages its context budget. This is a massive optimization opportunity.

2. **Investigation strategy determines efficiency** — The 15x difference between tools comes from how they investigate the codebase (surgical vs. brute-force), not from model capability or context management.

3. **Tool overhead is significant** — Opus spends 69% of its context on tool definitions that are identical every turn. This overhead reduces the space available for actual code understanding.

4. **Speed and efficiency are different axes** — Codex was fastest (34s) but not most token-efficient. Opus was most token-efficient but not fastest. These are independent optimization dimensions.

### FOE Insights

**Understanding:**
This research reveals that AI coding tools have fundamentally different approaches to understanding codebases. Opus's surgical git-first strategy builds understanding incrementally; Gemini's brute-force approach dumps everything and hopes the model can sort it out. The investigation strategy is a proxy for how well the tool helps the model understand the code.

**Feedback:**
The absence of context management means there's no feedback loop between token usage and investigation quality. Tools don't know when they've gathered enough context or when they're wasting tokens on irrelevant information. Building context-aware feedback mechanisms is a major opportunity.

**Confidence:**
The 15x token difference on identical tasks should reduce confidence in any single tool's approach and increase confidence in the value of understanding context composition. Teams that understand what their tools put in the context window can make better decisions about tool selection and configuration.

## Limitations

- **Single task:** One Express.js bug; results may differ for other task types
- **Tool versions:** Specific versions tested; behavior may change with updates
- **No statistical analysis:** Single run per tool, no variance measurement
- **Task simplicity:** A single bug fix may not represent complex development workflows
- **Open-source tool:** Context Lens is new and may have measurement artifacts

## Conclusion

### Verdict

**Supported** — The methodology is sound (identical task, controlled comparison, open-source tooling), and the findings are specific and quantified. The single-task limitation is significant, but the 15x difference is large enough to be meaningful even with variance.

### Key Learnings

1. **No tool manages context** — Efficiency is emergent from investigation strategy, not deliberate management
2. **Investigation strategy is the primary lever** — How a tool explores the codebase matters more than model capability
3. **Tool overhead is substantial** — 69% of Opus's context is tool definitions, not code
4. **Speed ≠ efficiency** — Fastest (Codex) and most efficient (Opus) are different tools
5. **Context visibility is essential** — Without tools like Context Lens, developers are blind to what their AI tools actually see

### Recommendation

**Apply this when:**
- Evaluating AI coding tools for team adoption
- Optimizing token costs in AI-assisted development
- Designing context management strategies for coding agents
- Understanding why AI tools perform differently on the same task

**Watch out for:**
- Assuming all AI coding tools use context similarly
- Ignoring token costs as a proxy for investigation quality
- Tools that dump entire codebases into context (brute-force approach)
- Tool definition overhead consuming context budget

### FOE Application

| FOE Principle | Application |
|--------------|-------------|
| **Understanding** | Investigation strategy determines how well the model understands the code; surgical beats brute-force |
| **Fast Feedback** | No context management = no feedback on investigation quality; context visibility enables optimization |
| **Confidence** | Understanding context composition enables informed tool selection and configuration |

This observation supports:

**M156: Agent-Mediated Access** — The finding that investigation strategy (how the agent accesses the codebase) determines efficiency validates the importance of structured, mediated access patterns over brute-force approaches.

**M154: Conceptual Debt Prevention** — Opus's surgical git-first strategy prevents conceptual debt by building understanding incrementally rather than dumping everything into context. The 15x efficiency difference between surgical and brute-force approaches demonstrates the cost of skipping genuine comprehension.

---

## References

- Lars de Ridder: "I traced 3,177 API calls to see what 4 AI coding tools put in the context window" (February 19, 2026), theredbeard.io
- Context Lens: Open-source API call interceptor
- Reddit r/programming discussion: 213 upvotes
- Scout Report: Agentic Coding Trends, February 20, 2026

---

<RelatedMethods />
