---
sidebar_position: 1
title: "Prima: Enterprise AI Platform via OSS Fork Strategy"
status: completed
source_type: internal
methods:
  - agentic-coding/methods/emerging/understanding-first-protocol-adoption
  - agentic-coding/methods/emerging/early-feedback-loop-investment
  - agentic-coding/methods/emerging/knowledge-distribution-as-reliability
---

import RelatedMethods from '@site/src/components/RelatedMethods';

# Prima: Enterprise AI Platform via OSS Fork Strategy

> **Status:** Completed

A case study of eSimplicity's IRAD project building an enterprise AI platform by forking established OSS tools (OpenAI Codex CLI, AnythingLLM). The project shipped but demonstrated how velocity pressure without understanding investment creates compounding technical and knowledge debt.

## Context

**Environment:**
- Project: Prima - Enterprise-grade agentic AI platform for government/enterprise security requirements
- Organization: eSimplicity Inc
- Team: 8+ contributors including Thomas Mason, Aaron West, Kevin Song, David Greene, Tom Martz, Vraj Patel, Lada Semicheva
- Timeline: June 2025 - January 2026

**The Problem:**
eSimplicity needed to create a secure, enterprise-grade AI platform that could meet government security requirements while maintaining good developer experience. Rather than building from scratch, the team chose to fork established OSS projects:

- **OpenAI Codex CLI** → prima-code (terminal coding agent)
- **AnythingLLM** → prima-web (document management & chat UI)
- Custom components: Prima Engine (AiOx), Control Tower (auth/SSO), Helm charts

**Constraints:**
- Aggressive delivery timeline
- Government/enterprise security requirements
- Large, complex OSS codebases to understand
- Emerging protocol (MCP) with limited documentation
- Team needed to deliver while learning

## Hypothesis

This is a retrospective case study, not a designed experiment. However, the implicit hypothesis was:

> "If we fork established OSS AI tools and adapt them for enterprise requirements, then we can deliver a secure AI platform faster than building from scratch, because the core functionality already exists and we only need to add security layers."

**Variables:**
- Independent (approach chosen): Fork OSS vs. build from scratch
- Dependent (what happened): Delivery timeline, system stability, team understanding, support burden

## Approach

### Strategy
1. Fork OpenAI Codex CLI for terminal-based coding agent (prima-code)
2. Fork AnythingLLM for document management and chat UI (prima-web)
3. Build custom integration layer using MCP (Model Context Protocol)
4. Add enterprise security features (SSO, auth via Control Tower)
5. Package for deployment via Helm charts

### Execution
- Development proceeded under velocity pressure
- No significant investment in testing or deployment infrastructure
- MCP protocol used for integration without deep understanding of the protocol
- Knowledge concentrated in few team members who could navigate the large codebases

### Measurement
This is observational data from:
- Git commit history and issue tracker
- Team retrospective feedback
- Production incident patterns
- First user onboarding experience

## Results

### Timeline Outcomes

| Milestone | Target | Actual | Notes |
|-----------|--------|--------|-------|
| Platform deployed | On schedule | Late | Delivered but behind timeline |
| First users onboarded | January 2026 | January 12, 2026 | Achieved with significant support burden |
| System stability | Production-ready | Flakey | Requires ongoing heroics |

### Quantitative Evidence

**January 12, 2026 - First Production Day:**
7 production bugs filed in a single day:
- #185: Embedding Word Docs isn't working (500 error)
- #186: After embedding a document chat comes back with empty responses
- #187: Just chatting is getting a 404
- #188: Threads are not sticking after refreshing the page
- #189: DEV - Prima Web Error
- #190: LOCAL - Empty Responses on Regular Chats
- #184: Switching model during agent mode does not work

**December 20-31, 2025 - Production Debugging Crunch:**
Commit messages revealing firefighting pattern:
- "prod debugging logs"
- "more debug"
- "temporarily disabled tool toggle feature"
- "ensuring tool function name length meets openai compatible length" (discovered in production)
- "forcing env var LLM_PROVIDER to always be 'prima'"
- "removing corrupted migration file"

### Security Incident

**December 23, 2025 - Issue #156:**
"Hotfix: Stop token/workspace inheritance in MCP hypervisor to prevent header leakage"

This security issue--headers leaking between workspaces--directly resulted from not understanding the MCP protocol's workspace isolation model.

### Technical Debt Recognition

**December 29, 2025 - Retrospective Issues Created:**
- #166: Improve Tests
- #167: Remove Unused Dependencies
- #168: JavaScript to TypeScript (Epic)
- #169: Organize Env Variables

The timing suggests these were identified during a retrospective, acknowledging debt accumulated during the push to ship.

### Team Self-Assessment

Direct quotes from team reflection:

1. **On MCP understanding:** "The team didn't understand MCP well enough to make good architectural decisions. They couldn't distinguish between using MCP as a standard for integrating systems, using it to integrate different systems, or building their own bespoke integration."

2. **On feedback loops:** "Velocity pressure meant no investment in testing/deployment infrastructure. 'Works on my machine' became the norm. The OSS was so large that adding BDD tests felt monumental."

3. **On confidence:** "The main limitation was understanding and lack of confidence, not technical capability."

4. **On support:** "Team struggled to support first clients because they didn't understand the system well."

## Analysis

### What Worked
- Platform was built and deployed
- Enterprise security features were implemented
- First users were successfully onboarded
- The fork strategy did provide a foundation faster than building from scratch

### What Didn't Work
- Delivered late despite using existing OSS
- System remained flakey and unstable post-launch
- Support required heroics from the few who understood
- Knowledge remained concentrated rather than distributed
- Security issues emerged from protocol misunderstanding

### What Surprised Us
- The size of the OSS codebases made adding tests feel "monumental"--the very thing that should have helped became psychologically daunting
- Understanding debt compounded: not understanding MCP led to architectural decisions that led to security issues that led to hotfixes that led to more complexity
- "Works on my machine" wasn't just a deployment problem--it was a symptom of no shared understanding

### FOE Insights

**Understanding:**
The team explicitly identified understanding as their core limitation. They forked large codebases without investing time to understand them. They adopted MCP without understanding the protocol's model. This created a situation where only a few people could navigate the system, and even they lacked confidence.

The header leakage security issue (#156) is a concrete example: it wasn't a coding error, it was a *conceptual* error about how MCP workspaces should be isolated.

**Feedback:**
The absence of testing and deployment infrastructure meant feedback came from production, not development. Problems that could have been caught in CI were discovered by users. The December debugging crunch and January 12 bug flood demonstrate this pattern.

The team recognized this in retrospect (Issue #166: Improve Tests), but by then the codebase was large and intimidating.

**Confidence:**
Low understanding → low confidence → heroics. The team stated this directly: "The main limitation was understanding and lack of confidence, not technical capability."

When only a few people understand the system, those people become bottlenecks. When they're not confident, they can't effectively delegate or document. The system becomes fragile not because of technical limitations but because of knowledge concentration.

### FOE Principles Violated

| Principle | Violation | Evidence |
|-----------|-----------|----------|
| Optimize for Understanding | Forked without understanding MCP protocol | Header leakage hotfix, protocol confusion |
| Optimize for Fast Feedback | No testing/deployment infrastructure | 7 PROD bugs day one, "works on my machine" |
| Optimize for Confidence | Low understanding → low confidence → heroics | Few people could support the system |

## Limitations

This case study has significant methodological limitations:

- **Observational, not experimental:** This is retrospective analysis of a development project, not a designed experiment. Causal claims are tentative.

- **No control group:** We cannot know what would have happened with different choices (e.g., building from scratch, investing in understanding upfront). The counterfactual is speculative.

- **Confounding variables:** Time pressure, OSS selection, MCP protocol immaturity, team composition, and scope all varied simultaneously. We cannot isolate which factors caused which outcomes.

- **Survivorship bias:** This is a team that shipped. Teams that failed completely might have different lessons. We're analyzing a qualified success, not a failure.

- **Self-reported data:** Team assessments of their own understanding and confidence are subjective. The commit history and issue tracker provide some objective evidence, but interpretation is still subjective.

## Conclusion

### Verdict
**Partially Supported** - The fork strategy did enable faster initial progress than building from scratch, but the expected time savings were consumed by understanding debt, debugging, and support burden.

### Key Learnings

1. **Protocol understanding before integration:** Understanding MCP upfront would have prevented architectural confusion and the header leakage security issue. The time "saved" by not learning was spent on hotfixes.

2. **"Works on my machine" is understanding debt:** The lack of deployment validation wasn't just a process gap--it indicated that no one understood the full system well enough to specify what "working" meant.

3. **Large OSS forks require understanding investment:** The size of the OSS codebase made adding tests feel monumental, but the alternative (no tests) was worse. The psychological barrier to testing was a symptom of not understanding the code.

4. **Knowledge distribution is a reliability concern:** Concentrating understanding in few team members creates fragility. When those people are unavailable or uncertain, the system becomes unsupportable.

### Recommendation

**For teams considering OSS fork strategies:**

- Invest in understanding the forked codebase *before* making architectural decisions
- If using emerging protocols (like MCP), allocate explicit time to understand the protocol's model, not just its API
- Establish feedback loops (tests, deployment validation) early, even if the codebase is large--the psychological barrier grows over time
- Actively distribute knowledge; if only 2-3 people understand the system, that's a risk to address, not a fact to accept

**When this approach might work better:**
- Smaller, well-documented OSS projects
- Mature, well-understood protocols
- Teams with existing expertise in the technology stack
- Projects with realistic timelines that include understanding investment

### Future Experiments

To strengthen this evidence, future experiments could:

1. Compare two teams: one that invests in understanding before forking, one that doesn't
2. Measure the relationship between early testing investment and production bug rates in fork projects
3. Track knowledge distribution metrics and correlate with support burden
4. Study MCP adoption specifically to understand common misunderstanding patterns

---

<RelatedMethods />
