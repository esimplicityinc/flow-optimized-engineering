---
title: "Glossary"
appendix: "A"
status: draft
word_count: 4847
---

# Appendix A: Glossary

This glossary provides definitions for key terms used throughout the book. Terms are alphabetized for easy reference, and related concepts are cross-referenced in *italics*. Where FOE uses a term differently from common industry usage, the FOE-specific meaning is noted.

---

## A

**Adaptive (Level 4)**: The highest *maturity level* in the FOE model. At this level, organizations can absorb significant change—new tools, new requirements, new scale—without losing the benefits of lower levels. The system actively resists drift and maintains its properties under stress. Most organizations don't need Level 4; it emerges from sustained Level 3 operation plus intentional capability building. See *maturity model*.

**Agentic Coding**: The use of AI agents that can autonomously implement features, write tests, create pull requests, and respond to code review feedback—not merely suggesting code, but taking action. Agentic coding changes the economics of software production: what was scarce (developer time to write code) becomes abundant, while new scarcities emerge around *alignment*, *verification*, *coherence*, and *comprehension*. See *Phase 4*.

**Alignment**: In the context of *agentic coding*, the challenge of ensuring AI-generated code actually does what the organization needs. One of the new scarcities that emerge when code generation costs approach zero.

**Awkward Middle**: See *Phase 2*.

**Automated Rollback Trigger**: A system that automatically reverts a deployment when predefined health thresholds are violated (error rate spikes, latency doubles, health checks fail). The system protects itself while humans investigate. By the time the on-call engineer reads the alert, recovery is already complete. Requires defining "healthy" before deployment. See *rollback capability*, *confidence*.

---

## B

**Belief Calibration**: The cognitive process of updating beliefs based on evidence. *Fast feedback* protects belief calibration by creating tight cycles of prediction and correction. Without rapid feedback, incorrect beliefs persist and teams become confident without becoming accurate.

**Blameless Postmortem**: An incident review that focuses on systems rather than individuals—asking "What allowed this to happen?" rather than "Who caused this?" Creates *psychological safety* that encourages surfacing problems rather than hiding them. Part of the *learning practice* institution.

**Blast Radius**: The scope of impact when a failure occurs. FOE emphasizes *bounded blast radius*—designing systems so that failures affect small populations for short durations. Techniques include *feature flags*, *canary deployments*, *circuit breakers*, and *timeout policies*. A team that knows "the worst case is 5% of users see an error for 10 minutes" can act decisively; a team that fears unbounded failure cannot.

**Bounded Blast Radius**: See *blast radius*.

**Bus Factor**: The number of team members who would need to be unavailable (hit by a bus, metaphorically) before a project stalls due to lack of knowledge. A bus factor of one indicates dangerous knowledge concentration. FOE addresses this through *institutions*, *documentation as code*, and systems that *optimize for understanding*. Related to *heroic model*.

---

## C

**Canary Deployment**: A deployment strategy that limits where new code runs by deploying to a small subset of infrastructure (one server, one region, one availability zone) before broader rollout. If the canary is healthy, traffic expands; if not, traffic shifts back automatically. Requires good monitoring to evaluate canary health. A technique for achieving *bounded blast radius*.

**Cattle (vs. Pets)**: See *Pets vs. Cattle*.

**Ceremonial Compliance**: One of four failure patterns organizations use to address the speed/safety tension. Involves adding process and creating theater without improving outcomes. The process exists; the results don't change. See also *raw velocity optimization*, *heroic engineering*, *waterfall certainty*.

**CI/CD (Continuous Integration/Continuous Delivery)**: The practice of frequently integrating code changes (CI) and automatically deploying them to production (CD). FOE distinguishes between having CI/CD tools and practicing *continuous delivery*—the former is technology; the latter requires *discipline*. See *discipline gap*.

**Circuit Breaker**: A pattern that limits how far failures propagate. When a dependency fails, stop calling it and return cached data, degraded responses, or graceful errors instead of cascading the failure. A technique for achieving *bounded blast radius*.

**Cloud Native Code**: See *Phase 5*.

**Cloud Native Infrastructure**: See *Phase 3*.

**Cockpit (Metaphor)**: A metaphor introduced in Chapter 3 and developed throughout the book. Pilots have instruments because human perception can't directly sense everything needed for safe flight. The cockpit represents cognitive offloading—moving burden from the brain to external systems. FOE applies this principle to software delivery: build external systems (dashboards, alerts, automated tests, architecture) that preserve human judgment under conditions that would otherwise degrade it.

**Cognitive Bottleneck**: The thesis that human cognition—not technology or process—is the ultimate limiting factor in software delivery. Working memory limits (~4-7 items), mental model formation, and causal chain tracking all have bounds that can't be expanded through will or training. When systems exceed these limits, engineers shift from reasoning to pattern-matching, from analysis to cargo-culting, from engineering to hoping. FOE is fundamentally a cognitive architecture designed to preserve human judgment at speed.

**Cognitive Offloading**: Moving cognitive burden from the brain to external systems. Dashboards remember metrics. Automated tests remember requirements. Architecture diagrams remember structure. This frees working memory for the judgment that humans uniquely provide. Central to the *cockpit metaphor*.

**Cognitive Triangle**: The integration of the three FOE principles into a unified system. *Understanding* enables intelligent action; *fast feedback* confirms or corrects; learning updates understanding; *confidence* enables the cycle to continue. Each principle protects a cognitive function: understanding protects mental model formation, fast feedback protects belief calibration, and confidence protects risk assessment. Degradation in one principle cascades to the others.

**Coherence**: The property of a system maintaining integrity as it changes. A coherent system has four characteristics: changes are traceable to intent, verification happens before release, failures are detected and contained, and learning flows back into the system. FOE advocates for speed *with* coherence, not speed at any cost. Contrast with *vibe coding*.

**Comprehension**: In the context of *agentic coding*, the challenge of maintaining human understanding of AI-generated code. One of the new scarcities that emerge when code generation costs approach zero.

**Confidence**: The third principle of FOE. Not arrogance or certainty, but calibrated belief based on evidence that actions won't cause unbounded harm. Expressed through three statements: "I know what will happen if this fails," "I can undo this," and "I'm inside the *operating envelope*." Without confidence, teams with perfect understanding and fast feedback still won't act. Confidence is built through *guardrails*, *reproducible environments*, *quality as default*, *bounded blast radius*, and *rollback capability*.

**Continuous Delivery**: The practice of deploying code to production frequently and automatically. Distinct from having CI/CD tools—true continuous delivery requires *discipline*, not just technology. See *CI/CD*, *discipline gap*.

**Continuous Reconciliation**: The practice of automatically comparing actual system state to declared desired state and correcting any drift. Central to *GitOps* and *Phase 3* operations. Infrastructure state isn't just provisioned from code—it's continuously verified against code.

**CYA Documentation**: "Cover Your Ass" documentation—protecting yourself instead of solving problems. A symptom of environments lacking *psychological safety*, where people write emails that establish "I warned them" rather than addressing the underlying issues. Indicates *confidence* problems.

---

## D

**Declarative Operations**: Specifying *what* the system should look like rather than *how* to achieve it. The system reconciles actual state to desired state. Contrast with imperative operations (step-by-step commands). Central to *GitOps*, *Infrastructure as Code*, and *Phase 3*.

**Deployment Frequency**: How often an organization deploys to production. One of the four *DORA metrics*. Higher deployment frequency correlates with better outcomes when combined with appropriate *confidence* infrastructure. Low deployment frequency often indicates fear of change.

**Deterministic Build**: A build process where the same source code and dependencies produce exactly the same artifact every time. Enables verification that what you tested is what you're deploying. Part of *reproducible environments*.

**Definition of Done**: A core FOE *institution*: a written checklist establishing clear, shared standards for what "complete" means, covering code, tests, documentation, and deployment readiness. Enforced socially, backed by review and retrospective. Failure modes include being ignored under pressure, being too vague to evaluate, or never getting updated.

**Deployment Automation**: A core FOE *institution*: a pipeline that takes code from merge to production with a single action, with automated verification at each stage and automated *rollback* if problems are detected. Technical enforcement ensures all changes flow through the pipeline.

**Developer Experience (DevX)**: The environment in which developers work. FOE treats DevX as a requirement, not a luxury—it determines whether principles are aspirations or defaults. Poor DevX systematically degrades the cognitive conditions FOE optimizes for. Designed DevX (intentional product with roadmap) contrasts with discovered DevX (accumulated scripts and ad-hoc tools). See *Platform as Product*.

**Discipline**: The consistent practice of using tools and processes as intended. FOE distinguishes between having tools and having discipline. Organizations can possess Terraform without practicing *Infrastructure as Code*; Kubernetes without *cloud-native operations*; CI/CD without *continuous delivery*. See *discipline gap*.

**Discipline Gap**: The gap between having modern tools and practicing the disciplines those tools require. Most organizations stuck at *Phase 2* have modern tools but lack the institutional discipline to use them as intended. The Phase 3 bottleneck is a discipline gap, not a technology gap.

**Doctrine**: A shared belief about how to operate—principles that guide decisions when the playbook doesn't cover the situation. FOE is a doctrine, not a methodology (which prescribes ceremonies) or a framework (which imposes structure). Like military or aviation doctrine, it tells you what matters so you can figure out what to do. See *playbook*.

**DORA Metrics**: Four key metrics identified by the DevOps Research and Assessment (DORA) program: deployment frequency, lead time for changes, change failure rate, and mean time to recover (MTTR). FOE uses these as flow metrics that indicate system health.

---

## E

**Evidence Trail**: The automatic documentation produced by high-speed delivery systems. Every automated test is a record. Every deployment is logged. Properly instrumented systems generate audit trails as a byproduct of operation, not as separate compliance activity. FOE calls these "receipts."

**Exception Erosion**: A common *pitfall* where standards decay through "just this once" exceptions. Each exception weakens the *institution* until it becomes merely a suggestion.

**Escape Hatch**: A documented, audited way to override a *guardrail* when circumstances warrant. The existence of escape hatches distinguishes guardrails from *handcuffs*. Exceptions are permitted but visible and accountable.

**Escalation Loop**: A dysfunction where decisions get pushed up the hierarchy until they reach someone with authority to absorb the risk. Results in executives making deployment decisions they don't understand, with decisions made by people who have authority but not information. A symptom of missing *confidence* infrastructure.

---

## F

**Failure Mode**: A specific way a system can fail. FOE emphasizes understanding failure modes and designing *bounded blast radius* for each. Teams that think about failure modes during design have *circuit breakers* ready; teams that don't scramble during incidents.

**Fast Feedback**: The second principle of FOE. Feedback is how teams learn whether their mental models are accurate. Without rapid prediction/correction cycles, beliefs ossify, teams become confident without becoming accurate, and debates replace experiments. "Fast enough" means faster than the context window of human attention—minutes, not hours or days, within the flow of work, not after. See *cognitive triangle*.

**Feature Flag**: A technique that controls who sees new code through configuration rather than deployment. Deploy to 1% of users, verify it works, gradually expand. Enables instant recovery (disable the flag) without rollback. A key technique for achieving *bounded blast radius*.

**Flowing (Level 3)**: A *maturity level* where feedback loops are short and trusted, risk surfaces continuously rather than at checkpoints, and documentation and evidence emerge as natural byproducts of work. The system teaches you as you use it. Represents FOE fully realized, though it requires maintenance to sustain. See *maturity model*.

**Flow Metrics**: Metrics that measure how work moves through the system, as opposed to output metrics (how much is produced) or activity metrics (how busy people are). *DORA metrics* are flow metrics. FOE favors flow metrics because they indicate system health, not just productivity.

**Flow Optimized Engineering (FOE)**: A delivery doctrine based on three principles: *optimize for understanding*, *optimize for fast feedback*, and *optimize for confidence*. The central thesis: "Go faster by knowing more, not by caring less." FOE treats speed and safety not as tradeoffs but as the same capability viewed from different angles.

**Fragile (Level 0)**: The lowest *maturity level* in the FOE model. Delivery outcomes are unpredictable. Problems surface at milestones rather than during development. Knowledge lives in people's heads. The defining experience: you find out late. See *maturity model*.

---

## G

**Gauges (Metaphor)**: A metaphor introduced in Chapter 2. Elite organizations don't choose between speed and safety—they invest in instrumentation (gauges) that shows exactly where they are relative to limits, enabling them to operate at those limits confidently. Like a race car dashboard, instruments don't slow you down; they show how fast you can safely go. Instrumentation is acceleration, not overhead.

**GitOps**: A practice where Git serves as the single source of truth for declarative infrastructure and applications. Changes happen through pull requests, and automation reconciles actual state to declared state. Central to *Phase 3* operations. FOE distinguishes between having GitOps tools and practicing GitOps discipline.

**Golden Path**: See *paved path*.

**Goodhart's Law**: "When a measure becomes a target, it ceases to be a good measure." FOE warns against setting targets for metrics because this creates gaming. Instead, track metrics as symptoms of underlying health.

**Guardrails**: Constraints that prevent catastrophe while enabling speed. Distinct from *handcuffs* (heavyweight controls that slow everything). Examples: type systems, pre-commit hooks, deployment gates, policy-as-code. Guardrails have *escape hatches*—documented, audited ways to override when situations warrant. When rules can't flex for legitimate edge cases, people work around the rules entirely.

---

## H

**High-Reliability Organization (HRO)**: Organizations that operate complex, hazardous systems with remarkably low failure rates (aviation, nuclear power, etc.). FOE draws on HRO principles, particularly the emphasis on *understanding*, *fast feedback*, and systems that support human judgment under pressure.

**Handcuffs**: Heavyweight controls that slow work without proportionate benefit. Contrast with *guardrails*, which constrain without blocking. Handcuffs assume the rules are always right; guardrails assume they're usually right but accommodate exceptions through explicit override decisions.

**Heroic Engineering**: One of four failure patterns organizations use to address the speed/safety tension. Depends on exceptional individuals who hold critical knowledge and can be called upon during crises. See *heroic model*.

**Heroic Model**: Dependence on individual heroes to maintain standards and resolve crises. Heroes don't scale, create dependency, and resist standardization (rationally protecting their value). The heroic model can't cross to *Phase 3* because it conflicts with the *institutional* approach that phase requires. Heroes are symptoms of missing discipline, not solutions to its absence.

---

## I

**Infrastructure as Code (IaC)**: The practice of managing infrastructure through machine-readable definition files rather than manual configuration. FOE distinguishes between having Terraform files and practicing IaC discipline—the latter requires treating IaC as source of truth with *continuous reconciliation*.

**Institution**: A mechanism that makes desired behavior the default path, regardless of who's involved or what pressures exist. Not bureaucracy, documentation, ceremony, heroics, or aspirations. Institutions are mechanisms (they actually do something), lightweight (minimum viable), consistent (work the same every time), enforced (violations are caught), repeatable (work regardless of who's present), and measurable (you can tell if they're working). Core FOE institutions: *CI gate*, *code review standard*, *definition of done*, *deployment automation*, *learning practice*.

**Instrumentation**: The practice of adding measurement capabilities to systems. In the *gauges metaphor*, instrumentation doesn't slow you down—it shows how fast you can safely go. FOE treats instrumentation as acceleration infrastructure.

---

## J

**Just This Once**: The phrase that signals *exception erosion*. Each "just this once" exception teaches the organization that the *institution* doesn't really matter under pressure.

**J-Curve**: The predictable pattern where transformation creates temporary performance degradation before improvement. Performance dips during the transition—new processes are slower at first, there's a learning curve on new tools, parallel systems exist during transition, and technical debt surfaces. The dip typically lasts 12-18 months. Organizations that don't expect the J-curve often lose faith and revert to old practices in the trough.

---

## L

**Lead Time**: The total time from commit to production. One of the four *DORA metrics*. A key *flow metric* that indicates how quickly work moves through the delivery system.

**Learning Practice**: A core FOE *institution*: regular sessions where the team examines what's working, what isn't, and what to change. Actions are identified, assigned, and tracked. Failure modes include cancellation under pressure, the same people always presenting, insights that don't lead to action, and stale formats.

**Left-Shift**: Moving activities earlier in the development process. "Left-shift security" means integrating security scanning during development rather than at the end (where it becomes forensics rather than prevention).

**Lift & Shift**: See *Phase 1*.

**Light Governance**: FOE's governance philosophy: minimum viable process, automate over administrate, trust but verify, default to yes with *guardrails*. Light doesn't mean absent—institutions are light *but real*, with consistent enforcement, no exceptions without escalation, measured outcomes, and accountable ownership.

---

## M

**Machine-Speed Delivery**: Delivery that happens faster than humans can manually review or intervene. *Agentic coding* operates at machine speed, requiring *policy as code*, automated verification, and *bounded blast radius* to remain governable.

**Maturity Level**: A measure of how well an organization uses its capabilities, distinct from what capabilities it has (*phase*). Five levels: *Fragile* (Level 0), *Visible* (Level 1), *Repeatable* (Level 2), *Flowing* (Level 3), *Adaptive* (Level 4). Key rule: maturity equals predictability of outcomes, not sophistication of tooling. Simple tools with predictable delivery indicate higher maturity than advanced automation with constant surprises.

**Maturity Model**: FOE's five-level model for assessing operational excellence. Used diagnostically, not judgmentally. Behavioral, not tool-based. Should never be used as a compliance instrument. The goal is honest assessment, not high scores.

**Mean Time to Recovery (MTTR)**: The average time to restore service after a failure. One of the four *DORA metrics*. FOE emphasizes that MTTR matters more than mean time between failures—failures are inevitable; fast recovery makes them tolerable.

**Mental Model**: An internal representation of how a system works that allows prediction, diagnosis, and design. *Understanding* is the ability to form accurate mental models. When systems exceed cognitive capacity, mental models break down and engineers shift to pattern-matching.

**Methodology**: A system that prescribes specific ceremonies (daily standups, sprint planning, etc.). FOE is explicitly *not* a methodology—it's a *doctrine* that provides principles for decisions rather than ceremonies for compliance.

---

## O

**OpenTelemetry**: An open-source *observability* framework for collecting metrics, logs, and traces. Part of the technology stack that enables *fast feedback* and *understanding*.

**Output Metrics**: Metrics that measure how much is produced (lines of code, story points completed). FOE prefers *flow metrics* over output metrics because output doesn't indicate system health or sustainable velocity.

**Observability**: The ability to understand a system's internal state from its external outputs. Comprises metrics, logs, and traces. Enables *understanding* and *fast feedback*. FOE treats observability as acceleration infrastructure, not compliance overhead.

**On-Prem**: See *Phase 0*.

**Operating Envelope**: Borrowed from aviation: the defined boundaries within which a system can operate safely. Knowing the limits enables operating *at* the limits confidently. Without a defined envelope, operators must be conservative because they don't know where dangers are. The envelope enables speed; it doesn't constrain it. See *confidence*.

**Optimize for Confidence**: See *confidence*.

**Optimize for Fast Feedback**: See *fast feedback*.

**Optimize for Understanding**: See *understanding*.

---

## P

**Paved Path (Golden Path)**: A pre-integrated set of tools, patterns, and processes that encode best practices and make the right thing easy. Teams can adopt paved paths without designing from scratch. Provided by *platform teams* as part of *Developer Experience*. The term "golden path" emphasizes these paths lead somewhere good; "paved path" emphasizes reduced friction.

**Pets vs. Cattle**: A metaphor distinguishing artisanal, irreplaceable infrastructure (pets—named, cherished, repaired when sick) from standardized, replaceable infrastructure (cattle—numbered, interchangeable, replaced when unhealthy). *Phase 0* and *Phase 1* treat infrastructure as pets. *Phase 3* treats infrastructure as cattle. The same evolution applies to code in *Phase 5*.

**Phase**: A stage in organizational capability evolution. FOE defines six phases: *Phase 0* (On-Prem), *Phase 1* (Lift & Shift), *Phase 2* (Awkward Middle), *Phase 3* (Cloud Native Infrastructure), *Phase 4* (Agentic Coding), *Phase 5* (Cloud Native Code). Phases can't be skipped because each builds on prior disciplines. Distinct from *maturity level*, which measures how well you operate within a phase.

**Phase 0 (On-Prem)**: Traditional on-premises operations. Infrastructure is physical hardware or manually provisioned VMs. Knowledge is tribal. Systems are *pets*. Can function for decades but can't scale or move fast.

**Phase 1 (Lift & Shift)**: Cloud adoption without cloud-native practices. Workloads move to cloud infrastructure but operate the same way as on-premises. Captures economic benefits but none of the operational benefits.

**Phase 2 (Awkward Middle)**: The phase where most organizations get stuck. Modern tools adopted (Terraform, Kubernetes, CI/CD) but not the disciplines those tools require. Has the complexity of modern tooling without the benefits of modern operations. Often worse than Phase 0 because tools create new complexity without disciplines to manage it. See *discipline gap*.

**Phase 3 (Cloud Native Infrastructure)**: True cloud-native operations—not tools, but disciplines. Requires four properties: consistent (every instance follows the pattern), enforced (violations prevented, not discussed), repeatable (anyone can execute any operation), and measurable (outcomes drive decisions). The foundation for everything that follows. Most organizations claiming Phase 3 are actually in Phase 2.

**Phase 4 (Agentic Coding)**: AI agents generating, modifying, and deploying code. Changes the economics of software production. Depends on Phase 3 disciplines—without them, AI creates chaos faster than ever.

**Phase 5 (Cloud Native Code)**: Applying Phase 3 disciplines to code itself. Code becomes standardized, composable, and policy-governed—*cattle*, not *pets*. Enables AI-generated code to be verified, governed, and maintained.

**Pitfall**: A common mistake that derails FOE adoption. Major pitfalls include: tool adoption without discipline adoption, *exception erosion*, celebrating *heroics*, measuring activity over outcomes, treating transformation as a project with an end date, premature declaration of victory, and under-investing in the transition.

**Platform as Product**: Treating internal platform capabilities as products with users, roadmaps, and feedback loops—not just infrastructure maintained by a team. Part of *Developer Experience* strategy.

**Playbook**: A field manual derived from doctrine. Where *institutions* provide structure, the playbook guides decisions in situations institutions don't cover. Provides minimum viable guidance that's normative (what we actually do), not aspirational (what we wish we did).

**Policy as Code**: Encoding compliance requirements, security policies, and governance rules as executable code that runs automatically. Policies execute; they don't wait for humans to remember them. Central to *Phase 3* and essential for governing *agentic coding*.

**Postmortem**: A retrospective analysis of an incident. FOE advocates *blameless postmortems* that focus on systems rather than individuals—"What allowed this to happen?" not "Who caused this?"

**Progressive Disclosure**: An information design principle that presents the most important information first, with details available on demand. Supports *understanding* by not overwhelming *working memory*. Systems should have multiple abstraction levels.

**Progressive Rollout**: Gradually expanding a deployment from a small population to larger ones. Combines *feature flags*, *canary deployments*, and metrics monitoring to limit *blast radius* while gaining production confidence.

**Psychological Safety**: In FOE's operational definition: can people act without fear of disproportionate consequences for good-faith mistakes? Not about being nice—about creating conditions where necessary risks can be taken. Without psychological safety, teams avoid decisions, create *CYA documentation*, seek excessive consensus, and optimize for not being blamed rather than for outcomes.

---

## Q

**Quality as Default**: A FOE principle for building *confidence*: quality should be the cheapest option, not the most disciplined. When quality requires discipline, it's optional; when it's the default, it's universal. Achieved through secure defaults in libraries, observable frameworks, and automated enforcement.

---

## R

**Raw Velocity Optimization**: One of four failure patterns organizations use to address the speed/safety tension. Removes friction, measures output, eventually burns out. The "move fast and break things" approach.

**Receipts**: FOE's term for the evidence trail produced by high-speed delivery. Every automated test, every deployment, every configuration change produces a receipt. High-speed delivery produces *more* evidence, not less, because evidence generation is automated into the process. See *evidence trail*.

**Repeatable (Level 2)**: A *maturity level* where teams have established patterns that work. Changes follow known paths. Evidence is generated automatically. The defining experience: you can change things safely (for routine work). See *maturity model*.

**Reproducible Environment**: Environments that are identical across development, staging, and production except for explicitly chosen variables (data content, scale, secrets). Eliminates "works on my machine" uncertainty. One-command bootstrap for new developers. Deterministic builds. A foundation for *confidence*.

**Rollback Capability**: The ability to undo a deployment and return to a known-good state. Transforms decision psychology: when deployment is reversible, stakes drop and the question shifts from "Are we sure?" to "Are we confident enough to try?" Requires *Infrastructure as Code*, reversible *database migration* strategies, *stateless services*, and *automated rollback triggers*.

**Runbook**: Documentation of operational procedures. FOE transforms runbooks from human instructions into executable automation. If a runbook exists, it should be automated; if it can't be automated, it should explain why.

---

## S

**Service Mesh**: Infrastructure layer that handles service-to-service communication, providing traffic management, security, and observability. Part of the enabling technology stack for *Phase 3* operations.

**Shelfware**: Technology that's purchased and installed but not used effectively. The common outcome of the "just add tools" failure mode, where organizations invest in technology without corresponding *process* and *people* changes.

**Speed Paradox**: The apparent tension between speed and safety that FOE resolves. The paradox: going faster seems to require skipping verification, but skipping verification ultimately slows you down through accumulated *technical debt* and incidents. Resolution: speed and safety are the same capability—both require *understanding*, *fast feedback*, and *confidence*.

**SRE (Site Reliability Engineering)**: A discipline for operating reliable systems at scale, pioneered at Google. FOE treats SRE as a discipline (consistent practices), not just a team name. Having an SRE team doesn't mean practicing SRE discipline.

**Stateless Service**: A service that keeps no session state between requests. State lives in external databases and caches. Enables independent scaling and *rollback*—code and data can move independently.

---

## T

**Tech Debt (Technical Debt)**: Accumulated shortcuts, workarounds, and deferred maintenance that slow future development. FOE views tech debt as borrowed time at high interest rates—apparent speed gains become real speed losses from consequences. *Vibe coding* accumulates tech debt faster than disciplined delivery.

**Transformation Model**: FOE's six-phase model of organizational capability evolution. Describes the journey from manual operations to sustainable high-speed delivery. Phases build on each other; skipping phases creates brittleness.

**Triad**: The three dimensions of organizational transformation: *People* (skills, mindsets, roles), *Process* (workflows, practices, institutions), and *Technology* (tools, platforms, infrastructure). All three must change together. Partial transformation is often worse than no transformation because it creates cost and disruption without benefits.

**Tribal Knowledge**: Knowledge that exists only in people's heads, not captured in systems or documentation. A *bus factor* risk. FOE transforms tribal knowledge into *institutions*, automation, and observable systems. The goal is that knowledge should survive the departure of any individual.

---

## U

**Unbounded Downside**: The fear that any action could cascade into catastrophic, unlimited consequences. Triggers human freeze response—a legitimate threat reaction, not cowardice. FOE addresses unbounded downside through *bounded blast radius*, *rollback capability*, and visible *operating envelopes*.

**Understanding**: The first principle of FOE. The ability to simulate a system mentally—predicting "If X, then Y, which causes Z"; diagnosing by tracing causal chains backward; designing changes that achieve intended effects. When understanding breaks down, engineers shift from reasoning to pattern-matching. FOE builds understanding through bounded scope (fits in working memory), explicit interfaces, observable state, traceable causation, and progressive disclosure.

---

## V

**Verification**: In the context of *agentic coding*, the challenge of ensuring AI-generated code works correctly. One of the new scarcities that emerge when code generation costs approach zero. Human review becomes a bottleneck, making automated verification essential.

**Vibe Coding**: The opposite of speed with *coherence*: all gas, no brakes. Characterized by "we'll test in production," "ship it and see," "we don't have time for tests," and "move fast, break things." Works until it doesn't, then fails catastrophically. Produces *technical debt* that eventually exceeds capacity for new work.

**Visible (Level 1)**: A *maturity level* where basic observability exists. Work is traceable after the fact. Teams can explain what happened, though not always why. The improvement from Level 0: you're no longer operating blind. See *maturity model*.

---

## W

**Waterfall Certainty**: One of four failure patterns organizations use to address the speed/safety tension. Plans everything, attempts to eliminate uncertainty. Fails because uncertainty in complex systems can't be eliminated, only managed.

**Working Memory**: The cognitive system that holds information temporarily for processing. Limited to ~4-7 items. A fundamental constraint that FOE addresses through *cognitive offloading* rather than trying to expand.

**Works on My Machine**: The syndrome where code behaves differently in different environments due to configuration drift, dependency differences, or environmental variables. Eliminated through *reproducible environments*, *deterministic builds*, and containerization.

---

## Z

**Zero Exceptions**: The *Phase 3* requirement that standards apply to all systems without exception. If something needs to be different, you change the standard, not the instance. Exceptions indicate incomplete standardization and prevent achieving true *discipline*.

---

*Cross-reference note: Terms in italics refer to other glossary entries.*
