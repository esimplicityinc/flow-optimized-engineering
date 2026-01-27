# Role Evolution: Mission vs Enablement Engineers

## The Problem with Old Role Splits

We had a great divide that broke up roles: scrum master, product, developer/engineering. We told ourselves the others are incapable. Everyone is in stupid boxes with a mountain of organizational pressure on top. There are certifications that enforce these artificial lines.

## The Legitimate Boundary: Logistics vs Mission

There IS a real boundary - it's a **logistics vs mission** boundary, not the fake scrum/product/engineering border.

- **Mission teams**: directly accountable for a user-facing outcome (capability, feature, service result)
- **Enablement/platform/logistics teams**: accountable for increasing the throughput + safety + consistency of many mission teams

## Why It's a "Natural" Boundary

### Enablement work has:

- **many customers** (multiple teams)
- **longer time horizons** (adoption, standards, reducing drag)
- **externalities** (a platform change can break everyone)
- **network effects** (one improvement multiplies across teams)
- **governance needs** (stability, versioning, deprecation, support)

### Mission work has:

- **a single clear customer** (or product owner)
- **tight feedback loops** (usage metrics, stakeholder feedback)
- **local optimization** pressures

## The Two New Engineer Species

### 1) Mission Engineers

**Customer:** the end user / stakeholder  
**Work product:** behavior change in the world (features, workflows, outcomes)  
**Core stance:** "What should exist, and what proof will convince us it works?"

**Best-fit traits:**

- high taste + decisive judgment
- comfort with ambiguity and tradeoffs
- storytelling + alignment (because outcomes are negotiated)
- systems thinking *in the domain* (policy, ops, constraints)

### 2) Logistics / Enablement Engineers

**Customer:** engineers (mission teams), risk owners, sometimes the org itself  
**Work product:** reduction in cost/risk of change (golden paths, guardrails, evidence, tooling, standards)  
**Core stance:** "How do we make the *right* way the *easy* way?"

**Best-fit traits:**

- empathy for developers (user research, but internal)
- systems thinking *in the platform* (dependencies, blast radius)
- teaching instinct (docs, defaults, examples)
- patience for adoption curves

## The Symbiotic Collapse

AI didn't just "make coding easier." It moved engineering upward.

In the old world, roles could survive with thin interfaces because the bottleneck was implementation.

In the AI world:

- Implementation becomes abundant
- So *mis-specification* becomes the dominant failure mode
- Therefore, teams can't afford the old gaps between:
  - "what we want" and "what we built"
  - "what we built" and "what's true in prod"
  - "what's true" and "what we decide next"

The new shared object: **executable intent + evidence**

### Mission Hybrids

Product + design + eng converge toward:

- hypothesis-as-code
- rapid spec → prototype → evidence loops

### Enablement Hybrids

Platform + DevOps + security + data converge toward:

- golden paths that compile intent
- evidence pipelines (telemetry, evals, audits)
- guardrails that make the right thing easy
