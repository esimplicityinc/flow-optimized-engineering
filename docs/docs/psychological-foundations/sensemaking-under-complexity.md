---
sidebar_position: 2
title: "Sensemaking Under Complexity"
---

# Sensemaking Under Complexity

Understanding isn't a feeling; it's a functional capability. You understand a system when you can form a mental model that predicts outcomes. When that capability breaks down, engineering becomes something else entirely.

## What Understanding Actually Means

Psychologically, understanding is the ability to simulate. When you understand a system, you can run it forward in your head: "If I do X, then Y will happen, which will cause Z." This mental simulation lets you:

- **Predict** outcomes before committing resources
- **Diagnose** problems by tracing causal chains backward
- **Design** changes that achieve intended effects
- **Communicate** with others using a shared model

These aren't abstract skills. They're the foundation of engineering work. Without them, you're not engineering; you're experimenting blindly and hoping.

> Understanding = the ability to form a coherent mental model that predicts outcomes

## When Systems Lose Understandability

Phase 2 systems (those characterized by coupling, opacity, and scale) break understanding in specific, predictable ways:

**Working memory overload.** Humans can hold roughly 4-7 items in working memory simultaneously. When a system has dozens of interacting components, you simply cannot hold the full causal picture in your head. You're forced to reason about fragments, losing sight of interactions.

**Causal chain fragmentation.** Understanding requires tracing cause to effect. When systems have long, branching causal chains with hidden state, the trail goes cold. You can see the input and output but not the path between them.

**Expertise siloing.** When no single person can understand the whole system, knowledge fragments across teams. Each team understands their piece but not how it connects. The system's behavior emerges from interactions that no one fully grasps.

**Model drift.** Mental models decay without reinforcement. When systems change faster than people can update their understanding, everyone operates on stale maps. The gap between belief and reality widens invisibly.

## What Happens to People

When systems become incomprehensible, people don't just slow down. They shift to fundamentally different cognitive strategies:

| From | To | Consequence |
|------|-----|-------------|
| Reasoning | Pattern-matching | "We did it this way before" replaces analysis |
| Analysis | Cargo-culting | Copying forms without understanding function |
| Engineering | Hoping | Making changes and waiting to see what breaks |
| Deciding | Deferring | Escalating everything because no one trusts their judgment |
| Acting | Freezing | Paralysis because any action might have hidden consequences |

These aren't character failures. They're predictable responses to cognitive environments that exceed human processing capacity. You can't will yourself to understand a system that's too complex to hold in working memory.

## The Cockpit Principle

Aircraft cockpits exist because humans can't directly perceive altitude, airspeed, attitude, engine status, and navigation simultaneously while also flying the plane. The cockpit doesn't replace pilot judgment; it makes pilot judgment possible by presenting information in cognitively tractable forms.

This is **Cognitive Offloading**: moving information processing from the human brain to external representations. The altimeter doesn't think, but it lets the pilot think about altitude without calculating it from air pressure.

FOE applies the same principle to software systems:

- **Dashboards** that show system state without requiring manual inspection
- **Alerts** that surface problems without requiring constant vigilance
- **Automated tests** that remember invariants humans would forget
- **Architecture** that limits what you need to hold in your head

:::tip[GovCon Insight]
Government programs chronically underinvest in observability and invest heavily in documentation. This is backwards. Documentation captures what someone understood at a point in time; it doesn't help you understand what's happening now. Observability tools are the cognitive offloading infrastructure that lets operators maintain situational awareness despite system complexity. Every dollar spent on real-time visibility typically saves multiples in reduced training costs, faster incident resolution, and fewer costly surprises during audits.
:::

## How FOE Restores Sensemaking

FOE's understandability optimization isn't about making systems "simpler" in some absolute sense. It's about ensuring the cognitive prerequisites for understanding are met:

**Bounded scope.** Services, modules, and changes are sized to fit in working memory. If you can't hold it in your head, you can't reason about it.

**Explicit interfaces.** Interactions between components are visible and predictable. Hidden dependencies are made explicit or eliminated.

**Observable state.** The system continuously externalizes its internal state in human-readable forms. You don't have to imagine what's happening; you can see it.

**Traceable causation.** Changes propagate through visible channels. When something breaks, you can trace backward from symptom to cause.

**Progressive disclosure.** You can understand the system at multiple levels of abstraction. High-level behavior is clear without understanding implementation details, but details are accessible when needed.

## The Training Cost Trap

Organizations often respond to system incomprehensibility by investing in training: longer onboarding, more documentation, knowledge management systems. This has diminishing returns because it treats understanding as primarily a knowledge problem rather than a cognitive capacity problem.

Training can fill gaps in knowledge, but it can't expand working memory. If understanding the system requires holding 50 things in mind simultaneously, no amount of training makes that possible. The system itself must change.

> The question isn't "How do we teach people to understand this system?" It's "How do we build a system that humans can understand?"

## Assessing Your Organization

Signs that understandability has broken down:

- Experts disagree about how the system actually behaves
- Changes routinely have "unexpected" side effects
- New team members take months to become productive
- Incidents require assembling multiple experts to diagnose
- People avoid making changes for fear of breaking things
- Documentation exists but doesn't match reality
- Tribal knowledge determines who can solve which problems

If these sound familiar, adding more documentation or training won't help. The system architecture itself needs to change to fit within human cognitive limits.
