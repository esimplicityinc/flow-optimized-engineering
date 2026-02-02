---
title: "Self-Assessment Tools"
appendix: "D"
status: draft
word_count: 3726
---

# Appendix D: Self-Assessment Tools

Honest assessment is the prerequisite for progress. Organizations routinely overestimate their capabilities because aspiration feels like achievement, because tools suggest competence even when disciplines don't exist, because admitting current state feels like admitting failure.

It isn't failure. It's diagnosis.

A doctor doesn't judge a patient for having symptoms. The symptoms are information. Accurate diagnosis enables effective treatment. Inaccurate diagnosis, pretending the symptoms don't exist or misidentifying them, leads to interventions that don't help and may harm.

The same logic applies to organizational transformation. You cannot improve what you cannot see. You cannot plan a journey without knowing your starting point. These assessment tools exist to create that visibility, honestly, without judgment, for the purpose of progress.

Three tools follow:

1. **Phase Assessment**: Where are you in the transformation model?
2. **Maturity Level Assessment**: How well are you operating at your current phase?
3. **Transformation Readiness Assessment**: Are you prepared to advance?

Use them honestly. Share results with appropriate stakeholders. Resist the temptation to optimize for the assessment rather than the underlying capability. The goal is not a high score. The goal is accurate information that enables effective action.

---

## Tool 1: Phase Assessment

### Purpose

The Phase Assessment determines where your organization sits in the transformation model described in Chapter 14. The six phases represent a progression from manual, artisanal operations toward standardized, automated, self-healing systems:

- **Phase 0**: On-Prem (manual provisioning, tribal knowledge, pets)
- **Phase 1**: Lift & Shift (cloud without cloud-native)
- **Phase 2**: Awkward Middle (tools changed, disciplines didn't)
- **Phase 3**: Cloud Native Infrastructure (standardized, declarative, enforced)
- **Phase 4**: Agentic Coding (AI agents, code abundance)
- **Phase 5**: Cloud Native Code (standardized, composable, policy-governed code)

Most organizations claiming Phase 3 are actually in Phase 2. The gap between having tools and practicing disciplines is invisible to those inside it. This assessment makes that gap visible.

### Instructions

For each indicator below, identify which column best describes your organization's *actual behavior*, not your aspirations, not your tools, not your plans. What actually happens when someone needs to provision infrastructure, deploy a change, or respond to a failure?

Be specific. Think of recent examples. If the answer varies across teams or systems, assess the median case, not the best case.

### Assessment Questions

| Indicator | Phase 0-1 | Phase 2 | Phase 3+ |
|-----------|-----------|---------|----------|
| **Provisioning approach** | Tickets filed, manual configuration, or console clicking. Each request is handled individually. | IaC exists but is applied inconsistently. Some teams use Terraform; others don't. Manual changes happen alongside automated ones. | Declarative, continuously reconciled. Infrastructure state is the source of truth. Manual changes are detected and reverted automatically. |
| **Environment consistency** | Each environment is a unique snowflake. Production differs from staging in undocumented ways. "Works in dev, fails in prod" is common. | Templated but drifts over time. Environments start similar but diverge. Periodic "refresh" projects to re-synchronize. | Identical and ephemeral. Environments are created from the same source. Drift is impossible because state is continuously reconciled. |
| **Change process** | Heroic individuals who know the system. Specific people must be involved for specific changes. Knowledge is in heads, not systems. | Tools plus heroes. Pipelines exist but require interpretation. "The pipeline passed, but let's have Alex review it anyway." | Automated pipelines, trusted. Changes flow through automation without human intervention for routine work. Exceptions are rare and documented. |
| **Failure response** | "Who can fix this?" Incident response requires finding the person who understands this system. Recovery depends on individual expertise. | "Check the runbook, then call someone." Documentation exists but may be incomplete. Escalation is common. | "System will reconcile" or "Automation will handle it." Self-healing mechanisms exist. Human intervention is for novel situations only. |
| **Knowledge location** | Tribal, in heads. Critical information isn't written down. When key people leave, capability leaves with them. | Documented but stale. Documentation exists but may not reflect current state. "Don't trust the wiki, ask Sarah." | Encoded in automation. The system is the documentation. Runbooks are executable code, not prose instructions. |
| **Exception handling** | Exceptions are common and accepted. "Legacy systems" work differently. Special cases are normal. | Exceptions reduced but present. Standards exist but have known violations. "We'll fix that eventually." | No exceptions. If something needs to be different, the standard changes. One system of record, universally applied. |
| **Metrics and decisions** | Descriptive or absent. Metrics describe what happened, if they exist at all. Decisions are based on intuition or experience. | Dashboards exist but don't drive decisions. "We track deployment frequency, but we don't act on it." | Metrics drive automated decisions. Alerts trigger automated responses. Dashboards are for insight, not for decision-making. |

### Scoring

Count how many indicators fall into each column:

- **Predominantly Phase 0-1**: Your organization operates with traditional, manual approaches. Cloud may be present but cloud-native disciplines are not.
- **Predominantly Phase 2**: Your organization has adopted modern tools but not modern disciplines. This is the most common state and the most dangerous, you have the complexity of new tools without the benefits of new practices.
- **Predominantly Phase 3+**: Your organization has achieved true cloud-native operations. Disciplines match tools. Automation is trusted. Self-healing is real.

**Mixed results** (roughly even across columns) indicate inconsistent adoption. Different teams or systems are at different phases. This creates friction at boundaries and prevents the organization from realizing the benefits of any particular phase.

### Honest Check Questions

Answer these yes or no:

| Question | What "Yes" Indicates |
|----------|---------------------|
| Do you ever kubectl directly against production? | Not operating GitOps, tools exist but practices don't |
| Can teams deploy without platform team involvement? | If no, you have gatekeepers, not a platform |
| Is infrastructure state continuously reconciled to code? | If no, IaC is for provisioning, not source of truth |
| Do policy violations get prevented or just reported? | If reported, enforcement isn't real |
| What percentage of systems have exceptions to standards? | If >0%, you're in Phase 2 regardless of tools |
| When was the last manual change to production infrastructure? | If recent, automation isn't trusted |

### Interpreting Your Results

**If you're in Phase 0-1**: This is a valid starting point. The path forward is clear: adopt cloud-native tools AND the disciplines to use them. Don't rush to Phase 3 tools without Phase 2 learning.

**If you're in Phase 2**: This is where most organizations stall. The danger is not knowing it. You have modern tools but pre-modern disciplines. The gap creates complexity without benefit. Priority: close the discipline gap before adopting more tools.

**If you're in Phase 3+**: You have the foundation for AI-augmented delivery. Your disciplines can scale to machine-speed change. Priority: maintain discipline while absorbing new capabilities.

**If you're inconsistent**: Different phases across teams creates friction. Work toward convergence. Identify which teams are ahead and understand why. Identify which teams are behind and address blockers.

---

## Tool 2: Maturity Level Assessment

### Purpose

The Maturity Level Assessment determines how well you're operating at your current phase. Phase describes *what* capabilities you have. Level describes *how well* you use them.

The five levels represent a progression from reactive chaos toward proactive stability:

- **Level 0: Fragile**, "We find out late"
- **Level 1: Visible**, "We can see what's happening"
- **Level 2: Repeatable**, "We can change things safely"
- **Level 3: Flowing**, "The system teaches us as we use it"
- **Level 4: Adaptive**, "We can absorb change without destabilizing"

An organization can be Phase 3 with Level 1 maturity, cloud-native tools operating chaotically. It can be Phase 1 with Level 3 maturity, simple architecture operating smoothly. Level matters independently of phase.

### Instructions

Assess your organization across the three FOE optimizations: Understanding, Fast Feedback, and Confidence. For each optimization, identify the level that best describes your *actual behavior*, not aspirations, not on good days, but typical operations.

Different optimizations may be at different levels. That's useful information about where investment would have the most impact.

### Understanding Assessment

| Level | Behavioral Indicators | Assessment |
|-------|----------------------|------------|
| **0: Fragile** | Knowledge is locked in individuals. "Only Alex knows that." New team members take months to become productive. Questions require finding the right person. Documentation, if it exists, is distrusted. | ___ |
| **1: Visible** | Knowledge can be recovered but takes effort. "Let me dig into that." Documentation exists but may be outdated. Answers exist but aren't immediately accessible. | ___ |
| **2: Repeatable** | Knowledge is shared and current. Multiple people can answer the same question the same way. Documentation is updated as part of work. New team members become productive in weeks, not months. | ___ |
| **3: Flowing** | Knowledge is generated by the system. Documentation stays current automatically. The system reveals its own state. Learning happens through operation, not separate study. | ___ |
| **4: Adaptive** | Knowledge survives scale and change. Growth doesn't fragment understanding. Personnel changes don't create capability gaps. Understanding is a system property, not a people property. | ___ |

**Diagnostic question**: If you asked three different people how a particular system works, would you get the same answer?

### Fast Feedback Assessment

| Level | Behavioral Indicators | Assessment |
|-------|----------------------|------------|
| **0: Fragile** | Problems discovered late. Testing happens at the end. "We'll find out in production." Feedback requires human effort to gather. Issues surface at milestones, not during work. | ___ |
| **1: Visible** | Feedback exists but is slow. Problems are discovered eventually. Detection often requires manual investigation. "We found it in QA" (but QA is at the end). | ___ |
| **2: Repeatable** | Problems surface during development. CI catches issues before merge. Feedback loops are short enough to be actionable. "We caught that in the pipeline." | ___ |
| **3: Flowing** | Feedback is continuous, not episodic. Problems surface immediately. The system reveals its own state in real time. "We knew within minutes." | ___ |
| **4: Adaptive** | Feedback is faster than human reaction time. Problems are detected and often resolved automatically. Self-healing mechanisms work. "The system handled it before we noticed." | ___ |

**Diagnostic question**: When was the last time you found a problem before it reached production? How long did it take?

### Confidence Assessment

| Level | Behavioral Indicators | Assessment |
|-------|----------------------|------------|
| **0: Fragile** | Teams hesitate to make changes. Risk is managed by not acting. Decisions are escalated. Friday deployments are forbidden. "We'll wait until we have more information." | ___ |
| **1: Visible** | Confidence exists in familiar territory. Routine changes are comfortable. Novel changes trigger caution. "We know how to handle that, but this is different." | ___ |
| **2: Repeatable** | High confidence for routine work. Decisions made without escalation. Process is trusted for standard changes. "We've done this before; we know it works." | ___ |
| **3: Flowing** | Confidence comes from evidence, not individuals. Trust is in the system, not just the team. Friday deployments are unremarkable because rollback is automatic. "The system will tell us if something's wrong." | ___ |
| **4: Adaptive** | Confidence persists through change. New situations don't trigger defensive slowdowns. Strategic pivots don't destabilize delivery. "We can handle whatever comes." | ___ |

**Diagnostic question**: What changes would the team refuse to make on a Friday afternoon? Why?

### Interpreting Your Results

**Record your levels:**
- Understanding: Level ___
- Fast Feedback: Level ___
- Confidence: Level ___

**Pattern analysis:**

| Pattern | Interpretation | Priority Focus |
|---------|---------------|----------------|
| All at same level | Balanced development | Continue current trajectory |
| Understanding lower than others | Knowledge isn't captured | Documentation, knowledge management, onboarding |
| Fast Feedback lower than others | Problems discovered late | Observability, testing, CI/CD improvement |
| Confidence lower than others | Teams won't act | Rollback capability, blast radius limits, deployment safety |
| All low (0-1) | Foundation gaps | Start with visibility, you can't improve what you can't see |
| Mixed (varies by team) | Uneven adoption | Standardization, platform investment, best practice sharing |

**Important**: The goal is not Level 4. Level 4 is appropriate for organizations facing high volatility and change. Many organizations operate successfully at Level 2 or Level 3 for years. The goal is the level appropriate for your context, operated honestly.

---

## Tool 3: Transformation Readiness Assessment

### Purpose

The Transformation Readiness Assessment determines whether your organization is prepared to advance, to move to a higher phase or level. Transformation requires more than desire. It requires leadership commitment, institutional capability, investment, and cultural readiness.

Many transformation efforts fail not because the destination was wrong but because the organization wasn't ready to travel. This assessment identifies readiness gaps before you begin.

### Instructions

For each category, rate each indicator from 0-3:

- **0 = Not present**: This doesn't exist in our organization
- **1 = Emerging**: Early signs exist but inconsistent
- **2 = Established**: Consistently present across most of the organization
- **3 = Embedded**: Deeply integrated into how we operate

Be honest. Aspirations don't count. Rate what exists today.

### Leadership Commitment Indicators

| Indicator | Description | Score (0-3) |
|-----------|-------------|-------------|
| **Executive sponsorship** | A named executive owns the transformation with authority over budget, staffing, and organizational decisions. Not just "support" actual ownership. | ___ |
| **Sustained attention** | Leadership commits to the transformation for 18+ months, not just the next quarter. Transformation is discussed regularly at executive level. | ___ |
| **Resource protection** | Transformation investment is protected from reallocation when short-term pressures arise. "We need those people for the deadline" doesn't drain the effort. | ___ |
| **Visible modeling** | Leaders demonstrate the new behaviors themselves. They use the dashboards, follow the processes, cite the metrics. | ___ |
| **Tolerance for the dip** | Leadership understands and accepts the J-curve, performance may temporarily decrease before it improves. They won't panic and reverse course. | ___ |
| **Enforcement willingness** | Leaders enforce standards even when exceptions would be easier. They say no to shortcuts that undermine the transformation. | ___ |

**Category total: ___ / 18**

### Institutional Capability Indicators

| Indicator | Description | Score (0-3) |
|-----------|-------------|-------------|
| **Platform team existence** | A dedicated team (or capacity) exists to build internal developer experience. Not just operations, product thinking about internal tools. | ___ |
| **Standards authority** | Someone has authority to set and enforce standards across teams. Standards aren't suggestions that teams can ignore. | ___ |
| **Learning mechanisms** | Structured ways to capture and share lessons learned exist and are used. Post-mortems happen, and insights flow back into practice. | ___ |
| **Measurement infrastructure** | Ability to measure what matters (DORA metrics, flow metrics) exists. Data is collected, accessible, and trusted. | ___ |
| **Change capacity** | The organization can absorb change without breaking. Processes exist for rolling out new practices. People have time for learning. | ___ |
| **Technical foundation** | Basic technical prerequisites exist: version control, CI, some automation. You're not starting from zero. | ___ |

**Category total: ___ / 18**

### Investment Readiness Indicators

| Indicator | Description | Score (0-3) |
|-----------|-------------|-------------|
| **Budget allocated** | Specific budget exists for transformation activities, training, tooling, dedicated staff, external expertise if needed. | ___ |
| **Time allocated** | People have time carved out for transformation work. It's not "in addition to your regular job." | ___ |
| **Parallel systems accepted** | Organization accepts that old and new will run in parallel during transition, with associated costs. | ___ |
| **Productivity dip accepted** | Investment in transformation means accepting temporary productivity decrease. This is budgeted, not resented. | ___ |
| **Training investment** | Resources exist for skill development. People can learn new tools and practices without sacrificing delivery. | ___ |
| **Long-term horizon** | Investment decisions consider 18-month outcomes, not just next-quarter impact. | ___ |

**Category total: ___ / 18**

### Cultural Readiness Indicators

| Indicator | Description | Score (0-3) |
|-----------|-------------|-------------|
| **Psychological safety** | People can admit problems, ask questions, and acknowledge gaps without fear. Honest assessment is safe. | ___ |
| **Learning orientation** | Failure is treated as learning opportunity, not blame assignment. Post-mortems are blameless in practice, not just policy. | ___ |
| **Collaboration norm** | Teams work together across boundaries. Information flows. Silos are minimized or actively broken down. | ___ |
| **Change tolerance** | People accept that practices will evolve. "We've always done it this way" doesn't block improvement. | ___ |
| **Evidence respect** | Decisions are based on data rather than opinion or seniority. "What does the data show?" is a normal question. | ___ |
| **Improvement motivation** | People want to get better. Improvement is intrinsically motivated, not just mandated. | ___ |

**Category total: ___ / 18**

### Interpreting Your Results

**Calculate your total score: ___ / 72**

| Score Range | Readiness Level | Guidance |
|-------------|-----------------|----------|
| **54-72** | High Readiness | Conditions support transformation. Proceed with confidence but monitor for regression. |
| **36-53** | Moderate Readiness | Conditions partially support transformation. Address gaps before or during early phases. |
| **18-35** | Low Readiness | Significant gaps exist. Attempting transformation without addressing readiness will likely fail or regress. |
| **0-17** | Not Ready | Foundational conditions are missing. Focus on readiness building before transformation. |

**Category analysis** (identify your lowest category):

| Lowest Category | What It Means | What to Do |
|-----------------|---------------|------------|
| Leadership Commitment | Transformation lacks the authority and protection it needs | Secure genuine executive ownership before proceeding |
| Institutional Capability | Organization lacks mechanisms to execute transformation | Build basic capabilities (platform team, standards authority) first |
| Investment Readiness | Resources won't be available when needed | Secure commitments and budgets; set realistic timelines |
| Cultural Readiness | People aren't prepared to change | Invest in psychological safety and learning culture first |

### Specific Gap Analysis

For any indicator scored 0 or 1, document:

| Gap | Current State | Required State | Blocker | Mitigation |
|-----|--------------|----------------|---------|------------|
| ___ | ___ | ___ | ___ | ___ |
| ___ | ___ | ___ | ___ | ___ |
| ___ | ___ | ___ | ___ | ___ |

---

## Using These Assessments Together

The three assessments provide a complete picture:

1. **Phase Assessment** tells you *where* you are
2. **Maturity Assessment** tells you *how well* you're operating there
3. **Readiness Assessment** tells you *whether* you can move forward

**Recommended sequence:**

1. Complete Phase Assessment first, establish your current location
2. Complete Maturity Assessment, understand how well you're operating
3. Complete Readiness Assessment, determine if you're prepared to advance

**Common patterns and implications:**

| Pattern | Implication |
|---------|-------------|
| Phase 2 + Low Maturity + Low Readiness | You have tools but not disciplines, and you're not ready to build them. Focus on readiness first. |
| Phase 2 + Low Maturity + High Readiness | You're ready to transform. Focus on closing the discipline gap at Phase 2 before advancing to Phase 3. |
| Phase 3 + High Maturity + High Readiness | You're positioned for Phase 4/5. Your disciplines will scale to AI-augmented delivery. |
| Phase 3 + Low Maturity + Any Readiness | You have cloud-native tools but aren't operating them well. Maturity improvement is priority over phase advancement. |

**Reassessment cadence:**

- Phase Assessment: Every 6-12 months
- Maturity Assessment: Every 3-6 months
- Readiness Assessment: Before any major transformation initiative

---

## Facilitating Assessment Sessions

These assessments work best when conducted with the right people in the right way.

### Who Should Participate

**Phase Assessment**: Include people who actually provision infrastructure, deploy code, and respond to incidents. Technical leads and platform engineers are essential. Managers who don't touch the systems directly should listen but not dominate.

**Maturity Assessment**: Include representatives from across the three optimizations, people who document and share knowledge (understanding), people who build and run feedback systems (fast feedback), and people who make deployment decisions (confidence). Different perspectives reveal different realities.

**Readiness Assessment**: Include leadership (for commitment indicators), platform/infrastructure leads (for capability indicators), finance or program management (for investment indicators), and team leads (for cultural indicators). This assessment requires cross-functional participation.

### How to Facilitate

1. **Establish psychological safety first.** Emphasize that honest assessment is the goal. There are no wrong answers, only accurate and inaccurate ones.

2. **Use specific examples.** When someone claims Phase 3, ask: "Can you give me an example from the last month?" Specificity reveals reality.

3. **Welcome disagreement.** If two people rate the same indicator differently, explore why. The disagreement often reveals inconsistent adoption or different interpretations worth resolving.

4. **Document evidence, not just scores.** For each indicator, note the specific examples that support the rating. This creates a foundation for improvement planning.

5. **Separate assessment from action planning.** Complete the assessment first. Resist the urge to solve problems mid-assessment. Diagnosis and treatment are different activities.

### Common Facilitation Pitfalls

- **Defensive scoring**: Rating indicators based on what should be true rather than what is true
- **Best-case scoring**: Assessing the best team or best system rather than the typical case
- **Tool-based scoring**: Rating based on tools owned rather than behaviors practiced
- **Aspirational scoring**: Rating based on plans rather than current state
- **Consensus pressure**: Converging on a "safe" middle answer rather than honest extremes

---

## Final Note: Assessment as Practice

These tools are most valuable when used regularly and honestly. A single assessment is a snapshot. Repeated assessments reveal trajectory.

Track your scores over time. Celebrate genuine movement, even from Level 0 to Level 1. That movement represents real progress. A genuine Level 1 is more valuable than a claimed Level 3.

The goal is never to maximize scores. The goal is to understand reality clearly enough to act effectively. Honest assessment enables honest planning. Honest planning enables successful transformation.

Go faster by knowing more, starting with knowing where you actually are.
