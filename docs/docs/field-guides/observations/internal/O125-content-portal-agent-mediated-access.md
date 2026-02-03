---
observationId: O125
displayed_sidebar: fieldGuideSidebar
sidebar_position: 1
title: "Content Portal: Product Owner Makes 42 Commits in 7 Days via Agent-Mediated Access"
status: completed
source_type: internal
methods:
  - M156
  - M158
---


# Content Portal: Product Owner Makes 42 Commits in 7 Days via Agent-Mediated Access

> **Status:** Completed

A product owner (Kyle Hogan) made 42 commits over 7 days—54% of all repository commits—through a deliberately constrained agent system ("Super Kyle"), demonstrating that agent-mediated access can enable non-technical contributors to make real feature contributions when backed by proper scaffolding.

## Context

**Environment:**
- Project: Content Portal (content-portal)
- Team: Aaron West (developer), Kyle Hogan (product owner)
- Timeline: January 22-29, 2026

**The Problem:**
Product owners frequently have ideas for content, navigation, and UI improvements but are blocked by the developer handoff bottleneck. Simple changes that take minutes to implement can sit in backlogs for days waiting for developer availability. This creates frustration for product owners and interrupts developer flow.

**Constraints:**
- Kyle has no coding experience
- Changes need to be safe—can't break production
- Developer time is limited; can't review every small change
- Kyle needs to maintain autonomy without feeling "stuck"

## Hypothesis

> "If we create a deliberately constrained agent system with wizard-style interaction patterns, then a non-technical product owner can make safe, real feature contributions directly to the codebase, because the scaffolding prevents dangerous actions while the agent translates intent into valid code."

**Variables:**
- Independent (what changed): Agent system design (permissions, interaction patterns, language abstraction)
- Dependent (what measured): Commit volume, commit quality, contribution scope, error recovery capability

## Approach

### Setup (January 22-23, 2026)

Aaron West invested approximately 24 hours building the "Super Kyle" agent system with the following components:

1. **Primary orchestrator agent** (`super-kyle.md`, 398 lines):
   - Deliberately restricted permissions: `write: false`, `edit: false`, `bash: false`
   - Must delegate all file operations to constrained subagents
   - Wizard-style interaction pattern encoded in behavior

2. **Supporting skills**:
   - `kyle-wizard`: One question at a time, multiple-choice format, plain language
   - `kyle-git`: Abstracts git operations ("save" instead of "commit", "share" instead of "push")
   - `kyle-status`: Traffic light dashboard for system status
   - `improvement-queue`: Queues non-blocking suggestions for later

3. **Supporting agents**:
   - `code-critic`: Reviews code before changes
   - `git-helper`: Handles version control operations
   - `deployer`: Manages deployment
   - `ux-critic`: Reviews UI/UX changes

4. **Multi-level domain rules**:
   - Repository-level `AGENTS.md` encoding project conventions
   - Directory-level rules for specific domains

### Execution (January 23-29, 2026)

Kyle Hogan began using the Super Kyle agent system for real feature work:

1. Kyle describes what he wants in plain language
2. Super Kyle asks clarifying questions (wizard-style, one at a time)
3. Super Kyle delegates investigation to explorer subagent
4. Results presented back in plain language with multiple-choice options
5. Kyle makes decision; Super Kyle delegates implementation to appropriate constrained subagent
6. Quality gates run automatically before saving
7. Changes committed with Kyle as author

### Measurement

- Git commit history (author, timestamp, content)
- Session logs capturing agent interactions
- Commit categorization (config vs. feature vs. fix)
- Agent permission configurations

## Results

### Quantitative Results

| Metric | Value | Notes |
|--------|-------|-------|
| Total commits by Kyle | 42 | Over 7 days (Jan 23-29) |
| % of all repo commits | 54% | Kyle contributed more than half |
| Scaffolding investment | ~24 hours | One-time setup cost |
| Fix/recovery commits | 14+ | Kyle could troubleshoot through agent |

### Qualitative Observations

**Commit Scope Extended Beyond Config:**
Kyle's commits were not limited to simple configuration changes. They included:
- Analytics dashboards (real feature implementation)
- UI/UX redesigns
- Navigation restructuring
- Content updates

**Session Log Evidence (ses_3ffc):**
Captured interaction showing the system working as designed:
- Kyle asking about navigation icons
- Super Kyle delegating investigation to explorer subagent
- Results presented in plain language with multiple-choice questions
- Kyle able to defer gracefully ("hold off on icons") without friction

**Error Recovery:**
The 14+ fix commits demonstrate Kyle could identify and resolve issues through the agent interface without requiring developer intervention. This suggests the system supports iterative refinement, not just initial creation.

### Unexpected Findings

- Kyle's contribution scope expanded naturally beyond initial expectations (config changes) to include substantial feature work
- The wizard-style interaction pattern reduced decision paralysis
- Language abstraction ("save/share" vs "commit/push") lowered cognitive load more than anticipated

## Analysis

### What Worked

1. **Two-layer architecture**: Deterministic scaffolding + agent interface created safety without friction
2. **Deliberately restricted permissions**: Super Kyle having `write: false` forces delegation to constrained subagents
3. **Wizard-style interaction**: One question at a time with multiple choice reduced overwhelm
4. **Language abstraction**: "Save" and "share" mapped to developer concepts without requiring developer knowledge
5. **Quality gates**: Automatic validation before saving caught errors early

### What Didn't Work

- Not yet identified—the 7-day window showed consistent success
- Long-term maintenance burden of agent configurations is unknown
- Edge cases requiring developer intervention not yet catalogued

### What Surprised Us

- The volume of contributions (42 commits, 54% of repo) exceeded expectations
- Kyle made real features, not just config tweaks
- Error recovery worked through the agent—Kyle didn't need to escalate most issues

### FOE Insights

**Understanding:**
The agent system explicitly encodes domain knowledge that would otherwise be tribal. The 398-line `super-kyle.md` and supporting skills document how the project works, what patterns to follow, and what's allowed. This makes the rules visible and teachable rather than implicit. The multi-level `AGENTS.md` files create layered understanding from repository-wide conventions down to directory-specific patterns.

**Feedback:**
Removing the developer bottleneck created near-instant feedback for Kyle. Changes that would have sat in a backlog for days were implemented in minutes. The wizard-style interaction also provides feedback at each decision point—Kyle knows what's happening and what comes next. Quality gates provide immediate feedback on validity before changes are saved.

**Confidence:**
Confidence comes from the scaffolding, not from trusting the agent. The permission restrictions (`write: false`, `edit: false`, `bash: false`) mean Super Kyle literally cannot make dangerous changes directly—it must work through constrained subagents that enforce boundaries. The 14+ fix commits show the system is resilient to errors; mistakes can be caught and corrected through the same interface that made them.

## Limitations

- **Single contributor:** Only tested with one product owner (Kyle Hogan)
- **Short duration:** 7 days of data; long-term sustainability unknown
- **Specific domain:** Content portal may have simpler patterns than other systems
- **High scaffolding investment:** 24 hours of developer time may not be justified for all repos
- **Survivorship bias:** We see Kyle's successful commits but don't know what he wanted to do but couldn't
- **No comparison baseline:** We don't have data on Kyle's contribution rate through traditional channels
- **Maintenance burden unknown:** The agent configurations may require ongoing updates as the project evolves

## Conclusion

### Verdict
**Supported** — The hypothesis that a deliberately constrained agent system can enable non-technical contributors to make safe, real feature contributions is supported by this observation. Kyle made 42 commits (54% of repo activity) including substantial features, not just config changes, with demonstrated error recovery capability.

### Key Learnings

1. **Scaffolding investment enables ongoing returns:** 24 hours of setup enabled 42 commits over 7 days. If this pattern continues, the ROI is substantial.

2. **Permission design is crucial:** Super Kyle's restricted permissions (`write: false`, `edit: false`, `bash: false`) force all changes through constrained subagents. This is the safety mechanism—the agent can't bypass it.

3. **Language abstraction matters:** Mapping developer concepts to accessible language ("save" not "commit") reduces cognitive load and makes the system approachable for non-technical users.

4. **Wizard-style interaction reduces paralysis:** One question at a time with multiple choice options keeps users moving forward without overwhelm.

5. **Non-technical contributors can make real features:** Kyle's commits went beyond config changes to include analytics dashboards, UI redesigns, and navigation restructuring.

### Recommendation

**Try this when:**
- You have a product owner or cross-functional team member bottlenecked by developer availability
- The repository has clear patterns that can be encoded in agent configurations
- You can invest 1-2 days in scaffolding setup
- The contributor will make ongoing changes (not a one-time need)

**Watch out for:**
- **Scaffolding maintenance:** Agent configurations need to evolve with the project
- **Edge cases:** Document what requires developer escalation
- **Permission creep:** Resist the temptation to give the agent more permissions over time
- **Overconfidence:** The system catches errors through scaffolding, not agent intelligence

### Future Observations

1. **Long-term sustainability:** Track Kyle's contribution rate over 3+ months
2. **Maintenance burden:** Document time spent updating agent configurations
3. **Edge case catalogue:** Track requests that required developer escalation
4. **Replication:** Apply the pattern to another non-technical contributor to test generalizability
5. **Velocity comparison:** Measure lead time for changes before/after agent-mediated access

---

