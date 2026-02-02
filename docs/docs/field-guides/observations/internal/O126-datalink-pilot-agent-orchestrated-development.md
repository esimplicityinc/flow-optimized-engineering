---
observationId: O126
displayed_sidebar: fieldGuideSidebar
sidebar_position: 2
title: "Data Link Pilot: Solo Developer Ships Full Application in 22 Days via Agent-Orchestrated TDD"
status: completed
source_type: internal
methods:
  - M148
  - M152
  - M156
---


# Data Link Pilot: Solo Developer Ships Full Application in 22 Days via Agent-Orchestrated TDD

> **Status:** Completed

A single developer built a complete data link portal application (113 commits, 625 BDD scenarios) in 22 days using a 14-agent orchestration system that combined persistent planning state, test-driven development enforcement, and agent-mediated access. The integrated system enabled one person to maintain coherence across architect, designer, product owner, and tester roles—with zero reverts and immediate productivity for a second developer who joined on day 21.

## Context

**Environment:**
- Project: Data Link Portal (datalink-pilot)
- Team: Aaron West (primary developer), Rajesh Pandian (joined day 21)
- Timeline: January 8-30, 2026 (22 days)
- Tech stack: Bun, Elysia, Astro, React, PostgreSQL, Playwright

**The Problem:**
Building a full-featured application typically requires multiple specialists: architects for system design, product owners for requirements, QA engineers for testing, and developers for implementation. A solo developer attempting all roles faces context-switching overhead, decision fatigue, and the risk of losing coherence as the codebase grows. Traditional AI coding assistants help with individual tasks but don't maintain the cross-role consistency needed for a complete system.

**Constraints:**
- Single developer responsible for all roles
- Need to maintain architectural consistency across 22 days
- Quality standards requiring comprehensive test coverage
- No existing team knowledge to draw from
- System needed to be portable for organizational reuse

## Hypothesis

> "If a single developer uses an agent orchestration system with persistent planning state and TDD enforcement, then they can maintain quality and coherence across multiple traditional roles (architect, designer, product, tester) because: (1) specialized agents provide role-specific expertise on demand, (2) persistent state prevents context drift across sessions, (3) BDD scenarios serve as executable requirements and progress tracking, and (4) approval gates keep humans in control of critical decisions."

**Variables:**
- Independent (what changed): Agent orchestration system design (14 agents, session state, TDD enforcement, approval gates)
- Dependent (what measured): Commit velocity, revert rate, test coverage, onboarding speed, role coherence

## Approach

### Setup (January 8-10, 2026)

The agent system was built incrementally over the first few days:

1. **Core orchestrator agent** (`orchestrator.md`, 133 lines):
   - Coordinates the Red→Green→Refactor cycle
   - Manages session state in `.sessions/{session_id}/log.md`
   - Delegates to specialized subagents at appropriate phases
   - Uses question tool for all developer interactions

2. **Specialized subagents** (14 total, 2,481 lines of specifications):
   | Agent | Purpose | Phase |
   |-------|---------|-------|
   | orchestrator | Coordinates cycle, writes implementation | All |
   | app-runner | Docker health, restart | Initialize |
   | test-writer | Tests, BDD, lint, format | Red, Green |
   | architect | Pattern/hexagonal/DRY check | Plan, Refactor |
   | critic | Code review, visual inspection | Review |
   | ddd-critic | Domain alignment | Review |
   | git-manager | Commit recommendations | Commit |
   | doc-generator | CI documentation | Commit |
   | explorer | Codebase research | Plan |
   | domain-extractor | Deep analysis orchestrator | Analysis |
   | type-extractor | Types, entities, value objects | Analysis |
   | behavior-extractor | Tests → BDD scenarios | Analysis |
   | capability-extractor | APIs, auth, integrations | Analysis |
   | ui-extractor | Browser UI exploration | Analysis |

3. **Session state structure** (`.sessions/{session_id}/log.md`):
   ```markdown
   # Session: {session_id}
   Started: {ISO timestamp}

   ## Current State
   - **Phase**: PLAN | RED | GREEN | REFACTOR | REVIEW | COMMIT
   - **Scenario**: {feature_file}:{line} "{scenario_name}"
   - **Attempt**: {n}/10

   ## Progress
   | Scenario | Unit Tests | Lint | BDD | Committed |
   |----------|------------|------|-----|-----------|

   ## Attempt Log
   | # | Action | Result |
   |---|--------|--------|
   ```

4. **Approval gates** (explicit human checkpoints):
   - Git commits require developer approval
   - Domain documentation changes require approval
   - BDD scenario modifications require approval
   - 10-attempt limit triggers escalation with options

### Execution (January 10-30, 2026)

The development followed a consistent daily pattern:

1. **Session initialization**: Orchestrator creates/loads session state, app-runner verifies Docker health
2. **Scenario selection**: Developer picks next BDD scenario (or orchestrator recommends)
3. **Red phase**: Test-writer runs BDD (expects fail), writes unit tests (expects fail)
4. **Green phase**: Orchestrator writes minimum code, test-writer verifies (max 10 attempts)
5. **Refactor phase**: Architect reviews compliance, fixes applied, tests re-verified
6. **Review phase**: Critic and DDD-critic run in parallel for quality and domain alignment
7. **Commit phase**: Doc-generator creates CI documentation, git-manager recommends commit, developer approves

**Key refinements during project:**
- Agent specialization evolved—started with fewer agents, added specialists as patterns emerged
- Session state format refined to better track per-scenario progress with attempt counts
- Portability refactor on day 11 (January 19) extracted agent system for reuse

### Measurement

- Git commit history (author, timestamp, message content, revert count)
- BDD scenario counts from feature files
- Agent specification line counts
- Session logs capturing phase transitions and attempt counts
- Onboarding observation (Rajesh's productivity on days 21-22)

## Results

### Quantitative Results

| Metric | Value | Notes |
|--------|-------|-------|
| Total commits | 113 | Over 22 days |
| Commits by Aaron | 96 | 85% of total |
| Commits by Rajesh | 17 | 15%, joined day 21 |
| Revert commits | 0 | Zero rollbacks needed |
| BDD scenarios | 625 | API, UI, and hybrid tests |
| Agent specifications | 2,481 lines | Across 14 agents |
| Peak velocity | 27 commits | January 11 (single day) |
| Time on agent config | 10-20% | Majority on feature development |

### Qualitative Observations

**Role Consolidation Worked:**
The agent system successfully provided role-specific expertise on demand:
- **Architect role**: Hexagonal architecture patterns enforced by architect agent
- **Product role**: BDD scenarios served as executable requirements (625 scenarios = backlog)
- **QA role**: Test-writer enforced Red→Green→Refactor, critic provided visual review
- **Designer role**: DDD-critic maintained ubiquitous language consistency

**Session State Prevented Drift:**
The `.sessions/log.md` files maintained context across sessions:
- Progress tables showed per-scenario status with attempt counts
- Phase tracking (PLAN→RED→GREEN→REFACTOR→REVIEW→COMMIT) kept work focused
- Findings documented in ADRs and domain docs for long-term reference

**TDD Enforcement Caught Issues Early:**
- Zero reverts across 113 commits suggests issues caught before commit
- 10-attempt limit with escalation prevented infinite loops
- "One BDD scenario = one commit" rule maintained atomic changes
- Test counts tracked in commit messages (e.g., "207 → 217 tests")

**Onboarding Validated the System:**
Rajesh joined on day 21 and contributed 17 commits over 2 days:
- Used mixed approach (some agent-assisted, some direct coding)
- Extended existing patterns without requiring agent system knowledge
- Immediate productivity suggests the codebase was understandable

### Unexpected Findings

- **BDD-as-backlog eliminated issue tracking**: Zero GitHub issues created; 625 BDD scenarios served as the complete backlog
- **Portability emerged naturally**: The agent system was extracted for reuse (new/ directory) without significant refactoring
- **Peak velocity was sustainable**: 27 commits in one day (January 11) without quality degradation
- **Domain language enforcement worked**: Ubiquitous language with "NEVER USE" alternatives prevented terminology drift

## Analysis

### What Worked

1. **Integrated three-method system**: M148 (persistent state) + M152 (TDD enforcement) + M156 (agent-mediated access) created synergy—each method reinforced the others

2. **Specialized agents with clear boundaries**: 14 agents with distinct responsibilities prevented confusion about which agent handles what

3. **Approval gates at critical points**: Human approval for commits, domain changes, and BDD modifications kept control where it mattered

4. **BDD scenarios as single source of truth**: Using scenarios as both requirements and tests eliminated the requirements-code gap

5. **Session state as working memory**: Reading state before every decision prevented the context drift common in long AI sessions

### What Didn't Work

- **Initial agent count was too low**: Started with fewer agents and had to add specialists as patterns emerged; would start with more agents initially
- **Session state format evolved**: Initial format didn't track per-scenario attempts well; refined during project

### What Surprised Us

- **10-20% agent configuration time**: Expected higher overhead; most time was actual feature development
- **Zero reverts**: The TDD enforcement was more effective than anticipated at catching issues pre-commit
- **Immediate second-developer productivity**: Rajesh's quick onboarding suggests the system creates understandable codebases, not just fast ones

### FOE Insights

**Understanding:**
The agent system explicitly encodes architectural knowledge that would otherwise be tribal:
- AGENTS.md (401 lines) documents project conventions, naming patterns, and domain terms
- Hexagonal architecture patterns checked by architect agent before every commit
- Ubiquitous language with "NEVER USE" alternatives prevents terminology confusion
- Session logs create an audit trail of decisions and their rationale

The result: Rajesh could contribute immediately because the rules were visible, not implicit.

**Feedback:**
Multiple feedback loops operate at different timescales:
- **Immediate**: Test-writer runs tests after every code change (seconds)
- **Per-scenario**: Red→Green→Refactor cycle completes in minutes
- **Per-commit**: Critic + DDD-critic review before commit (minutes)
- **Per-session**: Progress tables show cumulative status

The 10-attempt limit with escalation prevents infinite loops while the "one scenario = one commit" rule keeps changes atomic and reviewable.

**Confidence:**
Confidence comes from layered verification, not agent trust:
- TDD enforcement means code is tested before it's committed
- Architect agent checks patterns before critic review
- DDD-critic validates domain alignment before git-manager
- Human approval gates for commits, domain changes, and BDD modifications
- Zero reverts across 113 commits demonstrates the system catches issues early

## Limitations

- **Single primary developer**: 96 of 113 commits were from one person; team dynamics untested
- **Greenfield project**: No legacy code constraints; may not apply to existing codebases
- **Specific tech stack**: Bun/Elysia/Astro/React; patterns may differ for other stacks
- **Short duration**: 22 days; long-term maintenance patterns unknown
- **Prior experience**: Developer had some agent system experience; true novice results may differ
- **No baseline comparison**: Don't know how long the same work would take without agent orchestration
- **Rajesh's mixed approach**: Second developer didn't fully use agent system; pure agent-mediated onboarding untested

## Conclusion

### Verdict
**Supported** — The hypothesis that an agent orchestration system with persistent state and TDD enforcement enables a solo developer to maintain quality and coherence across multiple roles is supported. The evidence shows: 113 commits with zero reverts, 625 BDD scenarios, immediate second-developer productivity, and successful extraction for organizational reuse.

### Key Learnings

1. **Three methods work better together**: M148 (persistent state), M152 (TDD enforcement), and M156 (agent-mediated access) create synergy. State prevents drift, TDD catches errors, agents provide expertise—each reinforces the others.

2. **BDD scenarios can replace issue tracking**: 625 scenarios served as requirements, tests, and progress tracking. Zero GitHub issues needed.

3. **Approval gates are essential**: Human approval for commits, domain changes, and BDD modifications keeps control where it matters without blocking flow.

4. **Start with more specialized agents**: The refinement from fewer to more agents suggests starting with specialization is better than consolidating later.

5. **10-20% configuration overhead is sustainable**: Most time was feature development, not agent management.

### Recommendation

**Try this when:**
- Building a new application where one person needs to cover multiple roles
- You can invest initial time in agent configuration (expect 10-20% ongoing)
- BDD/TDD practices are acceptable for your project
- You want the codebase to be immediately understandable to new team members

**Watch out for:**
- **Agent proliferation**: 14 agents worked here, but start with clear boundaries
- **Session state maintenance**: The format will evolve; plan for refinement
- **Approval gate fatigue**: Too many gates slow flow; too few lose control
- **Legacy code complexity**: This was greenfield; existing codebases may need different patterns

### Future Observations

1. **Long-term maintenance**: Track how the agent system evolves over 3+ months
2. **Team scaling**: Observe what happens when 3+ developers use the system simultaneously
3. **Legacy application**: Apply the pattern to an existing codebase with technical debt
4. **Pure agent-mediated onboarding**: Test a new developer using only the agent system
5. **Cross-organization reuse**: Track adoption of the extracted template (new/ directory)

---

