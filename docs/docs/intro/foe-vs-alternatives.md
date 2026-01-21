---
sidebar_position: 4
title: "FOE vs Alternatives"
---

# FOE vs Alternatives

FOE is not the only approach to software delivery. It's useful to understand how it differs from common alternatives, and why those alternatives often fail.

## The Alternatives

### Raw Velocity Optimization

**Philosophy:** Remove all friction. Ship as fast as possible. Measure success by output volume.

**What it looks like:**
- Story points and velocity as primary metrics
- "Move fast and break things" culture
- Tests, documentation, and review treated as optional overhead
- Success measured by features shipped, not outcomes achieved

**Why it fails:** Velocity without verification creates fragile systems. Every shortcut accumulates as debt. Eventually, the system becomes so unstable that "fast" teams spend most of their time fighting fires instead of building features.

**FOE's position:** Speed is the goal, but sustainable speed requires investment in flow infrastructure. The team that spends 20% of time on testing and automation will outpace the team that spends 0%, eventually, decisively.

### Ceremonial Compliance

**Philosophy:** Follow the process. Document everything. Get sign-off at every stage.

**What it looks like:**
- Heavyweight change management boards
- Extensive documentation that nobody reads
- Approval gates that block progress for days
- Process adherence as the primary success metric

**Why it fails:** Ceremonies optimize for the appearance of control, not actual control. A change advisory board that meets weekly cannot prevent incidents; it can only slow down the response. Documentation that's never updated is worse than no documentation.

**FOE's position:** Verification should be continuous, automated, and fast. If a check doesn't provide actionable information within the flow of work, it's not a check; it's theater.

### Heroic Engineering

**Philosophy:** Hire great people and trust them to figure it out.

**What it looks like:**
- Senior engineers who "just know" how the system works
- Tribal knowledge instead of documentation
- Individual heroics to meet deadlines
- "10x engineers" as the solution to all problems

**Why it fails:** Heroes burn out. Tribal knowledge leaves when people leave. Systems that depend on individual heroics cannot scale beyond the heroes' capacity.

**FOE's position:** The system should make average engineers effective, not require exceptional engineers to function. Instrumentation, automation, and clear interfaces reduce the cognitive load on individuals.

### Waterfall Certainty Theater

**Philosophy:** Plan everything upfront. Eliminate uncertainty before building.

**What it looks like:**
- Extensive requirements documents before any code
- Fixed scope, fixed timeline, fixed budget
- Change requests as failures to plan properly
- "Big bang" releases after months of development

**Why it fails:** Software requirements cannot be fully known in advance. The longer the feedback loop, the more assumptions accumulate. Big releases carry big risk, and often arrive too late to matter.

**FOE's position:** Uncertainty is irreducible. Plan to learn, not to predict. Short cycles, fast feedback, and incremental delivery are how you navigate uncertainty, not eliminate it.

## Comparison Table

| Approach | Core Belief | Failure Mode | FOE Alternative |
|----------|-------------|--------------|-----------------|
| Raw Velocity | Friction is the enemy | Fragility, technical debt, burnout | Instrumentation enables speed |
| Ceremonial Compliance | Process creates safety | Slow feedback, false confidence | Automated verification in flow |
| Heroic Engineering | Great people are enough | Knowledge loss, single points of failure | System design reduces cognitive load |
| Waterfall Certainty | Planning eliminates risk | Late feedback, scope explosion | Short cycles with continuous learning |

## What FOE Explicitly Rejects (Via Negativa)

Sometimes the clearest way to define something is by what it's not. FOE explicitly rejects:

- **Metrics that can be gamed.** If a metric can be inflated without improving outcomes, it will be. FOE focuses on flow metrics that are harder to manipulate.

- **Verification that happens too late to matter.** A security review after deployment is forensics, not prevention. Verification must happen before release.

- **Documentation that exists to satisfy auditors.** If documentation isn't useful to the team, it won't be maintained. Unmaintained documentation is misinformation.

- **Processes that assume failure is caused by insufficient process.** Adding steps rarely fixes systemic issues. Usually, it makes them worse by increasing cycle time.

- **The belief that speed and quality trade off.** This framing is the root error. Quality (in the form of reliability, maintainability, and verifiability) is how you achieve speed.

## FOE vs DevOps

DevOps is a set of practices focused on collaboration between development and operations, automation of deployment, and continuous delivery.

FOE is compatible with DevOps, but FOE is not DevOps.

| DevOps | FOE |
|--------|-----|
| Practices and tools | Principles and doctrine |
| How to build pipelines | Why pipelines matter |
| Collaboration model | Epistemic model |
| Automation as efficiency | Instrumentation as safety |

You can implement DevOps practices without FOE principles and end up with fast, unreliable systems. FOE explains *why* certain DevOps practices work and how to prioritize them.

## FOE vs Agile

Agile is a set of values and principles focused on iterative development, customer collaboration, and responding to change.

FOE shares Agile's preference for iteration and feedback. But Agile is often interpreted as a planning methodology (sprints, backlogs, ceremonies) rather than an engineering doctrine.

| Agile (as commonly practiced) | FOE |
|-------------------------------|-----|
| Sprint planning and estimation | Flow measurement and optimization |
| Backlog management | System instrumentation |
| Ceremonies and rituals | Continuous verification |
| Team process focus | Delivery system focus |

FOE doesn't replace Agile ceremonies. It provides the engineering foundation that makes Agile delivery sustainable.

:::tip[GovCon Insight]
Traditional government contracting assumes waterfall: fixed requirements, fixed timeline, sequential phases. Many contractors respond by performing "Agile theater": running sprints internally while presenting waterfall milestones externally.

This creates two problems: the team operates under conflicting incentives, and the customer receives filtered information.

FOE offers a different approach: deliver in short cycles with continuous verification, but instrument everything so the customer has real-time visibility into progress and quality. The customer gets the predictability they need, not through rigid planning, but through continuous evidence that the system works.

The contractor who can show test results, deployment frequency, and incident metrics demonstrates control more convincingly than the contractor who can only show a Gantt chart.
:::

## When FOE May Not Apply

FOE is designed for teams building and operating software systems. It may not apply to:

- **One-time projects with no operational phase.** If you're building something that will never change after delivery, the investment in flow infrastructure may not pay off.

- **Regulated environments where ceremony is legally required.** Some industries mandate specific processes regardless of effectiveness. FOE can operate within these constraints but cannot eliminate them.

- **Extremely small teams with complete context.** A solo developer on a small project may not benefit from formal instrumentation. The investment threshold matters.

FOE is most valuable when:
- The system will be operated and evolved over time
- Multiple people need to understand and modify the system
- Speed of delivery creates competitive advantage
- Failures have significant consequences

For most professional software development, these conditions apply.
