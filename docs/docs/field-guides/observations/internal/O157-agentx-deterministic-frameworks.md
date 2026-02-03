---
observationId: O157
displayed_sidebar: fieldGuideSidebar
sidebar_position: 2
title: "AgentX: Deterministic Frameworks Enable Safe Agent Autonomy"
status: in-progress
source_type: internal
methods:
  - agentic-coding/methods/emerging/M156-agent-mediated-access
  - agentic-coding/methods/established/M121-executable-specifications
  - agentic-coding/methods/emerging/M152-test-driven-agent-development
  - agentic-coding/methods/emerging/M146-early-feedback-loop-investment
  - M158
---

# AgentX: Deterministic Frameworks Enable Safe Agent Autonomy

> **Status:** In Progress (Medium confidence - promising preliminary evidence, needs cross-org replication)

Giving AI agents access to the same deterministic abstractions (make/just targets, typed schemas, frameworks) that humans and CI/CD use creates shared interfaces that provide safety boundaries, fast feedback, and discoverable capabilities without requiring agent-specific tooling.

## Context

**Environment:**
- Organization: eSimplicity
- Projects: Prima platform (prima-code, prima-engine, prima-control_tower, prima-delivery), DataLink pilot, Content Portal
- Team: Aaron West (lead), Kyle Hogan (product owner), development team
- Timeline: July 2025 - February 2026 (7 months)

**The Problem:**
AI agents need to perform autonomous actions in production systems, but traditional approaches create a dilemma: either restrict agents so heavily they can't be useful, or give them broad access and risk catastrophic failures. Teams often respond by building agent-specific tooling, creating parallel infrastructure that duplicates existing CI/CD and developer workflows.

**Constraints:**
- Agents must not have access to credentials or destructive commands
- Changes must be safe enough to run without human review
- Developers shouldn't need to maintain separate agent-specific infrastructure
- Agents need to discover capabilities without hardcoded knowledge

## Hypothesis

> "If we give AI agents access to the same deterministic abstractions (make/just targets, typed schemas, frameworks) that humans and CI/CD use, then agents can operate safely and autonomously because these battle-tested abstractions provide natural boundaries, fast feedback, and discoverable interfaces without requiring agent-specific tooling."

**Variables:**
- Independent (what changed): Agent access model—from direct tool access to framework-mediated access
- Dependent (what measured): Commit volume, revert rate, agent autonomy level, developer intervention frequency

## Approach

### Setup (July 2025 - January 2026)

The team built deterministic frameworks across multiple projects with these key patterns:

1. **Shared Abstractions Between Agents, Developers, and CI/CD:**
   - `make`/`just` targets as bounded interfaces (e.g., `just test`, `just deploy`)
   - Typed schemas (Prisma, Zod, JSON Schema) for compile-time validation
   - BDD scenarios as executable specifications
   - Framework-level conventions encoded in `AGENTS.md` files

2. **Security Through Hiding Dangerous Details:**
   - Credentials stored in environment variables, never exposed to agents
   - Destructive commands wrapped in safe targets (e.g., `just db-reset` instead of raw SQL)
   - File system boundaries enforced by framework structure

3. **Two-Tier Permission System:**
   - **Pre-approved paths:** Agent can execute without asking (e.g., running tests, reading docs)
   - **Exception handling:** Agent must request permission for operations outside approved paths

4. **Type Systems for Compile-Time Validation:**
   - MCP (Model Context Protocol) with Rust for type-safe tool definitions
   - Prisma schemas for database operations
   - Zod schemas for API validation

### Execution

**Prima Platform (July 2025 - February 2026):**
- Multiple repositories with shared framework patterns
- Agents used for feature development, testing, and deployment
- Framework evolution tracked across repos

**DataLink Pilot (November 2025 - January 2026):**
- 113 commits over ~3 months
- Zero reverts (0% revert rate)
- 625 BDD scenarios as executable specifications
- Agent autonomy for feature implementation

**Content Portal (January 2026):**
- 42 commits in 7 days by product owner (Kyle Hogan) via agent
- 54% of all repository commits
- Agent-mediated access through constrained framework

### Measurement

- Git commit history (volume, authors, reverts)
- BDD scenario coverage
- Agent permission configurations
- Developer intervention frequency (qualitative)
- Framework evolution patterns

## Results

### Quantitative Results

| Metric | DataLink | Content Portal | Notes |
|--------|----------|----------------|-------|
| Total commits | 113 | 42 (in 7 days) | Agent-assisted development |
| Revert rate | 0% | Not measured | Zero reverts in DataLink |
| BDD scenarios | 625 | Not measured | Executable specifications |
| Non-technical contributor commits | N/A | 54% of repo | Product owner via agent |

### Qualitative Observations

**Pattern 1: Shared Abstractions Work Across Contexts**
The same `make`/`just` targets used by developers and CI/CD were successfully used by agents. No agent-specific tooling was required—agents discovered and used existing interfaces.

**Pattern 2: Type Systems Provide Compile-Time Safety**
Typed schemas (Prisma, Zod, MCP with Rust) caught errors before execution. Agents received immediate feedback on invalid operations without needing to run code.

**Pattern 3: Frameworks Hide Dangerous Details**
Agents never saw credentials or destructive commands directly. Framework abstractions (e.g., `just deploy` instead of raw kubectl commands) provided safe interfaces.

**Pattern 4: Discoverable Capabilities**
`make`/`just` targets with help text made capabilities discoverable. Agents could list available operations without hardcoded knowledge.

**Pattern 5: Two-Tier Permissions Enable Autonomy**
Pre-approved paths (running tests, reading docs) allowed agents to work autonomously. Exception handling for operations outside approved paths maintained safety.

### Unexpected Findings

- **Zero reverts in DataLink:** 113 commits with 0% revert rate exceeded expectations for agent-assisted development
- **Non-technical contributor success:** Product owner made 42 commits (54% of repo) through agent-mediated access
- **Framework evolution:** Patterns emerged organically across projects without central coordination
- **No agent-specific tooling needed:** The same abstractions that keep junior developers safe also kept agents safe

## Analysis

### What Worked

1. **Shared abstractions eliminated duplicate infrastructure:** Agents, developers, and CI/CD used the same `make`/`just` targets, typed schemas, and frameworks. No parallel agent-specific tooling was needed.

2. **Type systems provided fast feedback:** Compile-time validation (MCP with Rust, Prisma schemas) caught errors before execution, enabling agent self-correction.

3. **Security through abstraction:** Hiding credentials and destructive commands in framework layers prevented agent access to dangerous operations.

4. **Discoverable capabilities:** `make`/`just` targets with help text made operations discoverable without hardcoded agent knowledge.

5. **Two-tier permissions balanced safety and autonomy:** Pre-approved paths enabled autonomous operation while exception handling maintained safety boundaries.

### What Didn't Work

- **Not yet identified in short-term observation:** The 7-month window showed consistent success across projects
- **Long-term maintenance burden unknown:** Framework evolution costs not yet measured
- **Edge cases not catalogued:** Situations requiring developer intervention not systematically tracked

### What Surprised Us

- **Zero reverts in DataLink:** 113 commits with no rollbacks suggests frameworks provide stronger safety than expected
- **Cross-project pattern emergence:** Similar framework patterns emerged in Prima, DataLink, and Content Portal without central coordination
- **Non-technical contributor success:** Product owner's 42 commits (54% of repo) demonstrated frameworks enable broader participation than anticipated

### FOE Insights

**Understanding:**
Deterministic frameworks make system behavior predictable and discoverable. Typed schemas document valid operations at compile time. `make`/`just` targets with help text create self-documenting interfaces. `AGENTS.md` files encode domain knowledge explicitly rather than keeping it tribal. This shared understanding works for agents, junior developers, and CI/CD systems—the same abstractions that help humans understand systems help agents understand them.

**Feedback:**
Framework-mediated access provides multiple feedback loops:
- **Compile-time validation:** Type systems catch errors before execution (fastest feedback)
- **Test execution:** BDD scenarios provide immediate validation of behavior
- **Bounded interfaces:** `make`/`just` targets fail fast with clear error messages
- **Zero reverts:** The 0% revert rate in DataLink suggests feedback loops caught issues before merge

**Confidence:**
Confidence comes from battle-tested abstractions, not from trusting agents:
- **Proven patterns:** The same frameworks that keep junior developers safe keep agents safe
- **Security through hiding:** Agents can't access what they can't see (credentials, destructive commands)
- **Type safety:** Compile-time validation prevents entire classes of errors
- **Revert rate:** Zero reverts in 113 commits demonstrates framework effectiveness
- **Reproducibility:** Deterministic output enables verification and self-correction

## Limitations

### Methodological Limitations

- **Single organization:** All evidence from eSimplicity—no cross-org replication
- **No baseline comparison:** No measurement of same teams/projects without frameworks
- **Confounded variables:** Prima platform had multiple simultaneous changes (architecture, testing, frameworks)
- **Short duration:** 7 months maximum observation period—long-term effects unknown
- **Survivorship bias:** We see successful commits but not what agents attempted and couldn't do

### Context Limitations

- **Domain specificity:** All projects are API-centric (Prima platform, DataLink, Content Portal)
- **Team experience:** Team already familiar with deterministic frameworks and BDD
- **Project maturity:** Observations during active development, not long-term maintenance
- **Agent sophistication:** Results may depend on specific agent capabilities (Claude, GPT-4)

### Measurement Limitations

- **Metrics without context:** 
  - 0% revert rate: No baseline to compare against (what's normal for this team?)
  - 113 commits: Is this more or less than without frameworks?
  - 625 BDD scenarios: How does coverage compare to similar projects?
- **Qualitative observations:** Developer intervention frequency not quantified
- **Missing failure modes:** Edge cases requiring escalation not systematically catalogued

### Generalizability Concerns

- **Framework investment required:** Setup costs not measured—may be prohibitive for some teams
- **Domain applicability:** May not generalize beyond API-centric projects
- **Team skill requirements:** Requires team familiarity with deterministic frameworks
- **Agent capability dependency:** Results may vary with different AI models

## Conclusion

### Verdict
**Partially Supported with Medium Confidence** — The hypothesis that deterministic frameworks enable safe agent autonomy is supported by promising preliminary evidence (0% revert rate, 113 commits, non-technical contributor success), but significant limitations prevent stronger conclusions. The single-organization context, lack of baseline comparisons, and short observation period mean this is suggestive evidence, not conclusive proof.

### Key Learnings

1. **"You don't need agent-specific tooling"** — The same abstractions that keep junior developers safe (make/just targets, typed schemas, frameworks) also keep agents safe. No parallel infrastructure required.

2. **Shared interfaces create safety boundaries** — Agents, developers, and CI/CD using the same deterministic abstractions means battle-tested patterns provide natural safety without restricting agent capabilities.

3. **Type systems enable fast feedback** — Compile-time validation (MCP with Rust, Prisma schemas) catches errors before execution, enabling agent self-correction without running code.

4. **Security through hiding dangerous details** — Framework abstractions prevent agent access to credentials and destructive commands by hiding them in environment variables and safe wrapper targets.

5. **Discoverable capabilities reduce hardcoding** — `make`/`just` targets with help text make operations discoverable, eliminating need for agents to have hardcoded knowledge of system capabilities.

6. **Zero reverts suggest strong safety** — DataLink's 0% revert rate across 113 commits suggests framework-mediated access provides stronger safety than expected, though baseline comparison is needed.

### Recommendation

**Try this when:**
- You're building systems where agents need autonomous action capabilities
- Your team already uses deterministic frameworks (make/just, typed schemas, BDD)
- You want to avoid building parallel agent-specific infrastructure
- You need safety boundaries without restricting agent capabilities

**Watch out for:**
- **Framework investment costs:** Setup time not measured—may be significant
- **Domain applicability:** Evidence is API-centric—may not generalize to other domains
- **Baseline comparison needed:** Measure same team/project without frameworks to isolate effect
- **Long-term maintenance:** Framework evolution costs unknown beyond 7 months
- **Overconfidence:** This is preliminary evidence from one organization, not proven practice

**Don't assume:**
- This will work the same in your organization (needs replication)
- The 0% revert rate is due to frameworks alone (confounded variables)
- Results will hold long-term (only 7 months of data)
- This applies beyond API-centric domains (limited evidence)

### Future Observations

To strengthen this evidence and move toward validated/proven status:

1. **Cross-organization replication:** Apply pattern in different organizations with different teams, domains, and agent capabilities

2. **Baseline comparison:** Measure same team/project with and without frameworks to isolate effect

3. **Long-term tracking:** Follow projects for 6+ months to measure maintenance burden and framework evolution costs

4. **Domain expansion:** Test pattern in non-API domains (UI-heavy apps, data pipelines, infrastructure)

5. **Failure mode catalogue:** Systematically track and categorize situations requiring developer intervention

6. **Quantify developer intervention:** Measure frequency and types of escalations to understand autonomy boundaries

7. **Framework investment measurement:** Track setup costs and ongoing maintenance to understand ROI

8. **Agent capability variation:** Test with different AI models to understand dependency on agent sophistication

---
