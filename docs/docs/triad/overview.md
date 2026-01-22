---
sidebar_position: 1
title: "The FOE Triad"
---

# The FOE Triad: People, Process, Technology

Flow Optimized Engineering transformation requires coordinated change across three interconnected dimensions: **People**, **Process**, and **Technology**. These aren't independent initiatives; they're facets of a single transformation that must move together.

## Why All Three Must Change Together

Each dimension of the triad enables and constrains the others:

- **Technology without process change** creates expensive shelfware. Teams get Kubernetes clusters they deploy to manually, CI pipelines that end at artifact creation, observability tools no one looks at.

- **Process without people change** creates theater. You can mandate code review, but if reviewers don't understand the code or feel ownership, reviews become rubber stamps.

- **People without technology support** creates burnout. Motivated engineers fighting inadequate tooling eventually lose that motivation or leave.

![FOE Triad: People, Process, Technology](/img/illustrations/foe-triad.png)

*The triad is a system. Pull one corner without the others and you create tension that eventually snaps back.*

The triad is a system. Pull one corner without the others and you create tension that eventually snaps back.

## The Transformation Required

| Dimension | From | To |
|-----------|------|-----|
| **People** | Ops as manual guardians | Ops with development skills as automated stewards |
| | Gatekeeping and handoffs | Enabling flow and shared ownership |
| | DevOps as org chart label | DevOps as operating alignment |
| **Process** | CI only (build and hope) | Continuous Delivery (deploy with confidence) |
| | Security at the end | Left-shift security |
| | Central cost control | Team-level FinOps |
| | Heavy governance | Lightweight institutions |
| **Technology** | Bespoke infrastructure | Kubernetes and containers |
| | Manual deployment | GitOps with ArgoCD |
| | Black-box systems | OpenTelemetry observability |
| | Perimeter security | Service mesh and policy enforcement |

## Why "Just Add Tools" Fails

The most common failure mode in transformation: buying technology and expecting change.

**What happens:**
1. Organization purchases modern tooling (Kubernetes, observability suite, CI/CD platform)
2. Tools get installed but configured minimally
3. Existing processes continue unchanged
4. People work around the tools to maintain familiar patterns
5. Leadership wonders why the expensive investment isn't paying off

**The root cause:** Technology is the most visible and purchasable part of transformation. It feels concrete. Process and people changes feel ambiguous and slow. So organizations optimize for what feels tractable.

**The fix:** Start with the outcome you want (flow, safety, speed), work backward to the process that enables it, identify the people changes required, *then* select technology that supports all of it.

:::tip[GovCon Insight]
Government acquisitions often emphasize technology procurement because it fits existing contracting mechanisms. Requirements documents specify tools and platforms, not the organizational capabilities those tools should enable.

**Counter this by:**
- Including people and process requirements in statements of work
- Defining success metrics around outcomes (deployment frequency, lead time) not outputs (tools installed)
- Building training and organizational change into contract scope
- Requiring contractors to demonstrate process maturity, not just technical capability
:::

## Recognizing Triad Imbalance

Signs your transformation is out of balance:

### Technology-Heavy
- Teams have access to modern tools but don't use them
- Deployment pipelines exist but manual steps remain
- Dashboards are built but not watched
- "We have Kubernetes" but deployments are still scary

### Process-Heavy
- Extensive documentation nobody follows
- Mandated practices without supporting tools
- Compliance theater (checking boxes, not improving outcomes)
- Process debt: procedures that made sense once but now slow everyone down

### People-Heavy
- Motivated teams blocked by inadequate tooling
- Knowledge concentrated in heroes who carry the organization
- Good intentions undermined by bad systems
- Burnout from working around broken processes

## Building Triad Coherence

Effective transformation moves all three dimensions together:

1. **Start with a specific flow problem:** A deployment that takes too long, an outage pattern, a compliance burden
2. **Map the triad:** What process governs this? What technology supports it? What skills and mindsets are involved?
3. **Design changes across all three:** If you're automating deployment, who needs to learn what? What process changes does automation require?
4. **Implement incrementally:** Small changes across all dimensions beat large changes in one
5. **Measure outcomes:** Did flow improve? Did the problem get smaller?

## What's Next

The following sections detail each dimension of the triad:

- [**People Changes**](./people-changes.md): Skills evolution, mindset shifts, and role transformations
- [**Process Changes**](./process-changes.md): From CI to CD, safety institutions, and lightweight governance
- [**Technology Changes**](./technology-changes.md): Key technologies and how they enable the disciplines

Finally, [**Coherence Across Levels**](./coherence-across-levels.md) addresses how FOE must translate differently for executives, government customers, and engineering teams.
