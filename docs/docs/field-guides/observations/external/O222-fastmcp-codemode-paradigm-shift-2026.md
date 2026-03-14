---
observationId: O222
sidebar_position: 22
title: "FastMCP CodeMode: Agents Write Programs Instead of Making Individual Tool Calls"
status: completed
source_type: external
source:
  authors: ["Jeremiah Lowin", "FastMCP Contributors"]
  organization: "FastMCP / jlowin"
  year: 2026
  url: "https://github.com/jlowin/fastmcp"
methods:
  - M158
---

import RelatedMethods from '@site/src/components/RelatedMethods';

# FastMCP CodeMode: Agents Write Programs Instead of Making Individual Tool Calls

> **Source:** Jeremiah Lowin / FastMCP Contributors (March 2026), FastMCP / jlowin

FastMCP 3.1 introduced CodeMode: instead of making individual tool calls (one round-trip per operation), LLMs write Python code that chains multiple tool calls in a sandboxed environment. This pattern appeared independently in three frameworks during the same 22-day period, signaling genuine convergence toward a new agent-tool interaction model. CodeMode changes the fundamental relationship between agents and tools — from "call one tool at a time" to "write a program that uses tools" — with implications for constrained autonomy, token efficiency, and the shared abstraction model.

## Context

**Environment:**
- **FastMCP 3.1:** Released ~March 2026, introducing CodeMode as a new agent-tool interaction paradigm
- **Convergence signal:** Three independent frameworks implemented code-based tool composition in the same period
- **Ecosystem context:** The ex-Manus lead publicly abandoned typed function calling for shell commands; mcp2cli demonstrated 96-99% token reduction by converting MCP to CLI; the PI agent adopted a bash-first approach
- **Timeline:** February 20 – March 14, 2026

**The Problem:**
The standard agent-tool interaction model requires one round-trip per operation: the agent requests a tool call, the framework executes it, returns the result, and the agent decides the next call. For complex workflows requiring multiple coordinated operations, this creates latency (many round-trips), token overhead (each call/response cycle consumes tokens), and compositional limitations (agents can't express multi-step workflows as coherent programs). The question: is there a better interaction model?

**Research Questions:**
- Can agents compose tool calls as programs rather than individual requests?
- Does code-based tool composition reduce latency and token overhead?
- What safety mechanisms are needed for agents writing executable code?
- Is the convergence across three frameworks a genuine paradigm shift or coincidence?

## Hypothesis

FastMCP's CodeMode hypothesis is that agents are more effective when they write programs that use tools rather than making individual tool calls. The reasoning: LLMs are trained on vast amounts of code and are naturally better at expressing complex logic as programs than as sequences of isolated function calls.

> "This is a paradigm shift in how agents interact with tools — from 'call one tool at a time' to 'write a program that uses tools.'" — Scout Report, March 14, 2026

**Variables:**
- Independent (what changed): Agent-tool interaction model (individual calls → code composition)
- Dependent (what outcomes indicate): Round-trip reduction, token efficiency, workflow expressiveness, safety characteristics

## Approach

### Methodology
- **Design:** Product launch of CodeMode in FastMCP 3.1, with sandboxed Python execution for tool composition
- **Analysis:** Architectural comparison of individual tool calls vs. code-based composition; convergence analysis across three independent implementations
- **Validation:** Cross-referenced with mcp2cli token reduction data (96-99%), ex-Manus lead's public abandonment of typed function calling, and PI agent's bash-first approach

### Data Collection
- FastMCP 3.1 release documentation and architectural design
- mcp2cli token reduction measurements (96-99% fewer tokens than native MCP)
- Three independent implementations of code-based tool composition identified
- Ex-Manus lead's public statement on abandoning typed function calling
- PI agent (17K YouTube views) demonstrating bash-first agent architecture
- Community discussion on Reddit and Hacker News

## Results

### Key Quantitative Findings

| Finding | Result |
|---------|--------|
| Independent implementations | 3 frameworks in 22 days |
| mcp2cli token reduction | 96-99% fewer tokens than native MCP |
| PI agent YouTube views | 17K views |
| FastMCP release | v3.1 with CodeMode |
| Ex-Manus lead signal | Publicly abandoned typed function calling |

### Major Conclusions

1. **Code-based tool composition is a convergent discovery.** Three independent frameworks implemented the same pattern in 22 days. When multiple teams independently arrive at the same solution, the underlying problem is real and the solution is likely sound.

2. **Token efficiency gains are dramatic.** mcp2cli's 96-99% token reduction demonstrates that the individual-tool-call model is extraordinarily wasteful. CodeMode addresses this by allowing agents to express multi-step workflows as single code blocks rather than multiple call/response cycles.

3. **Sandboxed execution solves the safety problem.** CodeMode runs agent-written Python in a sandbox, providing safety without sacrificing capability. The agent can compose arbitrarily complex tool chains, but execution is contained. This is constrained autonomy (M158) applied to the tool interaction layer.

4. **The shift is from "agents call functions" to "agents write programs."** This is a fundamental change in the agent-tool interaction model. Individual tool calls treat agents as API consumers; CodeMode treats agents as programmers. Given that LLMs are trained on vast code corpora, the latter is a more natural interaction model.

### Surprising or Notable Findings

- The ex-Manus lead's public abandonment of typed function calling is a strong signal — Manus was a $2B acquisition, and its lead architect now advocates for the opposite approach
- The convergence of CodeMode, mcp2cli, and the bash-first PI agent all point in the same direction: agents should write code/commands, not call functions
- Sandboxed execution is the critical enabler — without it, agents writing arbitrary code would be a security nightmare; with it, the pattern is both powerful and safe
- The pattern aligns with how developers actually use tools: they write scripts that chain commands, not individual API calls

## Analysis

### What the Evidence Establishes

1. **The individual tool call model is a bottleneck.** The convergence of three independent solutions, combined with mcp2cli's 96-99% token reduction data, establishes that the standard one-call-at-a-time model creates measurable inefficiency in latency, tokens, and expressiveness.

2. **Code-based composition is the emerging replacement.** CodeMode, bash-first agents, and mcp2cli all converge on the same insight: agents should express complex workflows as programs (Python, bash, CLI commands) rather than sequences of individual tool calls. The convergence across independent teams strengthens this conclusion.

3. **Sandboxed execution enables safe code composition.** FastMCP's sandbox approach demonstrates that agents can write and execute arbitrary code safely. This resolves the tension between capability (agents need to compose complex workflows) and safety (agents shouldn't execute arbitrary code unsupervised).

### FOE Insights

**Understanding:**
CodeMode changes what teams need to understand about agent-tool interaction. The mental model shifts from "the agent calls tools one at a time" to "the agent writes programs that use tools." This is a simpler model for developers to reason about — it maps directly to how they already think about scripting and automation. However, it requires understanding the sandbox boundaries: what can the agent's code access, and what are the failure modes of sandboxed execution?

**Feedback:**
CodeMode dramatically improves feedback loop speed by reducing round-trips. In the individual call model, each tool call requires: agent generates call → framework executes → result returned → agent processes → agent generates next call. In CodeMode: agent writes program → framework executes entire program → results returned. For a 10-step workflow, this reduces from 10 round-trips to 1. Faster execution means faster feedback on whether the workflow succeeded.

**Confidence:**
Sandboxed execution provides structural confidence — the agent's code runs in a contained environment where it can't cause damage outside the sandbox. This is the same principle as M158's shared abstractions: safety comes from the scaffolding, not from trusting the agent. CodeMode's sandbox is a constrained autonomy mechanism at the tool interaction layer, complementing M158's constrained autonomy at the workflow layer.

## Limitations

- **Early-stage pattern:** CodeMode shipped in FastMCP 3.1 but production adoption data is not yet available; the pattern is demonstrated, not proven at scale
- **Token reduction from mcp2cli, not CodeMode directly:** The 96-99% token reduction was measured for mcp2cli (MCP-to-CLI conversion), not CodeMode specifically; CodeMode's token savings may differ
- **Sandbox limitations unknown:** The boundaries and failure modes of CodeMode's sandbox are not fully documented; edge cases in sandboxed execution could create unexpected behaviors
- **Three implementations ≠ three validations:** Three independent implementations confirm the idea is compelling, but none have published controlled experiments comparing code-based composition to individual tool calls
- **Security surface area:** Agents writing executable code, even sandboxed, creates a larger attack surface than individual tool calls; security implications are not yet fully explored
- **LLM code quality variance:** The pattern assumes agents write correct Python; code generation errors in the composed program could create harder-to-debug failures than individual tool call errors

## Conclusion

### Verdict

**Supported** — The convergence of three independent implementations, combined with mcp2cli's token reduction data and the ex-Manus lead's architectural signal, provides strong evidence that code-based tool composition is a genuine paradigm shift in agent-tool interaction. The pattern is demonstrated and architecturally sound, though production-scale validation is still needed.

### Key Learnings

1. **Agents are more natural as programmers than as API consumers** — LLMs trained on code corpora express complex workflows more effectively as programs than as sequences of individual tool calls
2. **Sandboxed execution enables safe code composition** — The safety concern (agents writing arbitrary code) is resolved by containment, not restriction
3. **Token efficiency gains are dramatic** — The individual tool call model wastes 96-99% of tokens on protocol overhead that code composition eliminates
4. **Convergence across three frameworks validates the pattern** — Independent discovery by multiple teams is the strongest signal that a pattern addresses a real problem

### Recommendation

**Apply this when:**
- Designing agent-tool interaction architectures for complex, multi-step workflows
- Evaluating token efficiency of agent systems (CodeMode may dramatically reduce costs)
- Building sandboxed execution environments for agent-generated code
- Updating M158 (Constrained Autonomy) to include tool-interaction-layer constraints

**Watch out for:**
- Sandbox escape risks — ensure the execution environment is properly isolated
- Debugging complexity — errors in composed programs may be harder to diagnose than errors in individual tool calls
- LLM code quality — the pattern's effectiveness depends on the agent writing correct code; poor code generation undermines the benefits
- Over-composition — not every workflow benefits from being expressed as a program; simple single-tool operations don't need CodeMode

### FOE Application

| FOE Principle | Evidence | Strength |
|---------------|----------|----------|
| **Fast Feedback** | Reduces round-trips from N to 1 for N-step workflows; dramatically faster execution | Strong |
| **Confidence** | Sandboxed execution provides structural safety; constrained autonomy at the tool layer | Strong |
| **Understanding** | Simpler mental model (agents write programs) maps to developer intuition | Moderate |

This observation supports **M158: AgentX: Constrained Autonomy Through Shared Abstractions** by demonstrating constrained autonomy at a new layer: the agent-tool interaction. M158 focuses on constraining agent autonomy through shared abstractions (task runners, typed schemas, quality gates) at the workflow level. CodeMode extends this principle to the tool interaction level: agents have autonomy to compose arbitrary tool chains, but execution is constrained by the sandbox. The sandbox is a shared abstraction — it provides the same safety boundary for all agent-generated code, just as task runners provide the same safety boundary for all agent-executed commands.

---

## References

- Lowin, J.: FastMCP 3.1 release with CodeMode (March 2026), https://github.com/jlowin/fastmcp
- mcp2cli: MCP-to-CLI conversion with 96-99% token reduction (March 2026)
- Ex-Manus lead: Public statement on abandoning typed function calling (March 2026, Reddit)
- PI agent: Bash-first agent architecture (YouTube, 17K views, March 2026)
- Scout Report: Agentic Coding Trends, March 14, 2026 (finding-002, finding-005)

---

<RelatedMethods />
