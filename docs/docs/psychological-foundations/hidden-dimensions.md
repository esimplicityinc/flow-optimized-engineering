---
sidebar_position: 5
title: "Hidden Dimensions"
---

# Hidden Dimensions

Beyond the three explicit optimizations—understandability, fast feedback, high confidence—FOE implicitly designs for five psychological dimensions that rarely appear in engineering discussions but fundamentally shape how organizations function. Surfacing these dimensions helps explain why some organizations thrive under complexity while others fragment.

## The Five Hidden Dimensions

| Dimension | The Question | FOE's Answer |
|-----------|--------------|--------------|
| **Epistemic Control** | Who decides what's true about the system? | Evidence, not hierarchy |
| **Cognitive Load Distribution** | Where does thinking happen? | System does the remembering |
| **Error Containment** | How far can mistakes propagate? | Small, observable, reversible |
| **Decision Bandwidth** | How many good decisions per unit time? | Fewer, better-scaffolded |
| **Trust Formation** | How do people know they can rely on the system? | Repeated, visible proof |

Each dimension represents a fundamental tradeoff that organizations make implicitly. FOE makes them explicit and designs for specific outcomes.

---

## Epistemic Control

**The Question:** Who gets to say what's true about how the system behaves?

In traditional organizations, truth is established through authority. The senior engineer's opinion carries weight. The architect's document defines reality. The manager's assessment drives decisions. This works when authority correlates with accuracy—but in complex systems, it often doesn't.

> When authority determines truth, the best argument wins.
> When evidence determines truth, the best model wins.

**FOE's Answer:** Evidence over hierarchy. The system continuously generates data about its own behavior. Dashboards, metrics, tests, and logs provide shared ground truth that doesn't depend on who's talking. Disagreements resolve through experimentation, not debate.

**What this looks like in practice:**
- Production metrics visible to everyone, not summarized by managers
- A/B tests settle feature debates
- Automated tests define "working," not manual review
- Incidents analyzed through data, not blame assignment

:::tip[GovCon Insight]
Government programs often have complex authority structures: contracting officers, technical representatives, program managers, engineering leads. When epistemic control follows org chart lines, you get conflicting "truths" that can't be reconciled. FOE's evidence-based approach creates shared reality across organizational boundaries. When everyone can see the same dashboards and the system's behavior is observable, authority disputes transform into collaborative problem-solving.
:::

---

## Cognitive Load Distribution

**The Question:** Where does the thinking happen—in human heads or in external systems?

Human working memory is limited and expensive. Every fact someone has to remember, every check they have to perform manually, every dependency they have to track mentally—it all competes for cognitive resources that could be used for actual problem-solving.

**FOE's Answer:** The system does the remembering. Automate everything that can be automated. Externalize knowledge into code, tests, and documentation. Design interfaces that minimize what needs to be held in mind.

**What this looks like in practice:**
- Automated tests remember invariants so developers don't have to
- CI/CD pipelines encode deployment procedures
- Alerts surface problems without requiring constant vigilance
- Architecture decisions embedded in code structure, not tribal knowledge
- Runbooks captured in automation, not documents

**The goal isn't to remove human judgment—it's to focus human judgment on problems that actually require it.** Humans should think about design, priorities, and tradeoffs. Machines should remember checklists, enforce standards, and detect regressions.

---

## Error Containment

**The Question:** When someone makes a mistake, how far can the damage spread?

In tightly coupled systems, small errors cascade. A typo in a configuration file takes down the entire platform. A regression in one service corrupts data across the system. A single bad deployment causes hours of downtime.

When errors can propagate unboundedly, every change becomes terrifying. Risk aversion replaces engineering judgment because the stakes of any individual decision feel infinite.

**FOE's Answer:** Errors stay small, observable, and reversible.

- **Small:** Architecture limits blast radius. Services fail independently. Changes affect limited scope.
- **Observable:** Problems surface quickly through monitoring and alerting. Silent failures are the enemy.
- **Reversible:** Rollback is always possible. Feature flags enable instant reversal. Database migrations are backward-compatible.

**What this looks like in practice:**
- Circuit breakers prevent cascade failures
- Canary deployments expose problems to small populations
- Feature flags enable instant rollback without redeploy
- Database changes never destroy data
- Chaos engineering proves resilience

> The goal isn't to prevent all errors. It's to make errors survivable.

---

## Decision Bandwidth

**The Question:** How many good decisions can the organization make per unit time?

Decision-making is a limited resource. Every decision requires information gathering, analysis, discussion, and commitment. Organizations that require extensive decision-making for routine actions quickly exhaust their decision-making capacity, leaving nothing for decisions that actually matter.

**FOE's Answer:** Fewer decisions, better scaffolded.

- **Eliminate decisions where possible.** Standards, conventions, and automation remove choices that don't need human judgment.
- **Make remaining decisions obvious.** Good defaults, clear guidelines, and visible consequences make the right choice clear.
- **Scaffold complex decisions.** Provide data, frameworks, and escalation paths for decisions that genuinely require deliberation.

**What this looks like in practice:**
- Coding standards eliminate style debates
- Architecture decision records capture past reasoning
- Clear ownership reduces coordination overhead
- Deployment automation eliminates manual checklists
- Metrics dashboards make trade-offs visible

:::tip[GovCon Insight]
Government programs are often decision-starved: so much capacity goes into routine approvals, compliance checks, and coordination meetings that strategic decisions get neglected or rushed. FOE practices free decision bandwidth by automating routine judgments and creating clear criteria for escalation. When the system handles the routine, humans can focus on the genuinely novel.
:::

---

## Trust Formation

**The Question:** How do people develop justified confidence that the system will behave as expected?

Trust isn't a feeling—it's a prediction. You trust a system when you've seen it behave reliably under various conditions and you expect that reliability to continue. Trust is earned through repeated, visible proof, not assertions.

**FOE's Answer:** Trust through demonstrated reliability.

- **Repeated:** The system behaves consistently across many interactions
- **Visible:** System behavior is observable, not hidden
- **Proof:** Evidence, not assurance—you see it working, not hear that it works

**What this looks like in practice:**
- Deployment frequency demonstrates that deployments are safe
- Monitoring shows normal operation continuously
- Fast recovery from incidents proves resilience
- Transparent metrics build confidence in the data
- Predictable releases build trust in timelines

> Trust compounds. Each successful deployment, each handled incident, each accurate prediction builds confidence that enables faster future action.

The inverse is also true: trust destroys easily. One major outage, one falsified metric, one surprise production failure can undo months of earned trust. FOE's containment mechanisms protect trust by limiting the damage from inevitable problems.

---

## Assessing the Hidden Dimensions

Use these questions to evaluate your organization's current state:

### Epistemic Control
- When experts disagree, how do disagreements get resolved?
- Do dashboards reflect reality or just what looks good?
- Can anyone access ground truth, or is it filtered?

### Cognitive Load Distribution
- What do people have to remember that the system could remember?
- How much knowledge exists only in people's heads?
- Are checklists manual or automated?

### Error Containment
- What's the worst-case blast radius for a bad deployment?
- How long until problems are detected?
- Can you roll back any change within minutes?

### Decision Bandwidth
- What routine decisions consume meeting time?
- Do people know what they can decide autonomously?
- How much coordination is required for standard changes?

### Trust Formation
- Do people trust production deployments?
- Do stakeholders trust timeline estimates?
- Do team members trust each other's code?

---

## The Integration

These five dimensions interact. Epistemic control affects trust formation: when evidence determines truth, people trust conclusions more. Cognitive load distribution affects decision bandwidth: when the system remembers, humans can decide. Error containment affects trust: when failures are bounded, confidence builds.

FOE works because it addresses all five dimensions coherently. Improving one dimension while neglecting others creates partial, fragile improvements. The goal is an integrated cognitive architecture that supports human judgment across all dimensions simultaneously.

> FOE isn't just process improvement. It's designing an environment where human cognition can function effectively despite system complexity.
