---
displayed_sidebar: fieldGuideSidebar
sidebar_position: 1
title: Continuous Delivery
status: industry-standard
source:
  url: https://continuousdelivery.com
  authors:
    - Jez Humble
    - David Farley
  publication_year: 2010
  organization: ThoughtWorks
version: "2010"
pillars:
  - foundations
  - patterns
related_frameworks:
  - dora
  - bdd
description: A software development discipline where software is built in such a way that it can be released to production at any time, enabling rapid, reliable, low-risk delivery through automation.
---

# Continuous Delivery

Continuous Delivery (CD) is a software development discipline where software is built in such a way that it can be released to production at any time. Developed by Jez Humble and David Farley and published in their 2010 book, CD provides the technical practices that enable the outcomes measured by DORA metrics.

The core insight of Continuous Delivery is that deployment should be boring, routine, and low-risk. By automating the build, test, and deployment process and working in small batches, teams can release changes with confidence at any time.

## Key Principles

Continuous Delivery is built on five foundational principles:

**1. Build Quality In**

Find and fix problems immediately rather than through downstream inspection. Create feedback loops to detect problems as early as possible.

**2. Work in Small Batches**

Get every change as far towards release as possible. Smaller batches mean faster feedback and easier triage when problems occur.

**3. Automate Repetitive Tasks**

Computers perform repetitive tasks; people solve problems. Automate testing and deployment so humans can focus on creative work.

**4. Relentlessly Pursue Continuous Improvement**

Treat improvement as essential daily work. Never be satisfied with the status quo.

**5. Everyone is Responsible**

Nothing is "somebody else's problem." Quality is everyone's responsibility.

## Relationship to DORA

Continuous Delivery practices are the **"how"** that achieves DORA metrics (the **"what"**). Jez Humble co-authored both frameworks.

| CD Practice | Enables DORA Metric |
|-------------|---------------------|
| Deployment Pipeline | Lead Time for Changes |
| Trunk-Based Development | Deployment Frequency |
| Blue-Green/Canary Release | Change Failure Rate |
| Feature Flags | Time to Restore Service |

The Accelerate research (2018) validated that organizations implementing CD practices achieve higher DORA metrics and better business outcomes.

## Why Continuous Delivery Matters for FOE

Continuous Delivery aligns strongly with all three Flow Optimized Engineering principles:

- **Fast Feedback Loops** - The deployment pipeline provides progressive feedback at each stage. Small batches and trunk-based development ensure rapid feedback on integration issues. Canary releases provide real production feedback with limited risk.

- **Confidence to Act** - Blue-green deployments enable instant rollback. Feature flags decouple deployment from release. Automated testing at every stage builds confidence that changes work correctly.

- **Optimize for Understanding** - The deployment pipeline makes the path to production visible and understandable. Infrastructure as Code makes system state explicit and auditable.

## Methods

Core Continuous Delivery methods:

- [Deployment Pipeline](./methods/deployment-pipeline) - Automated path from commit to production
- [Trunk-Based Development](./methods/trunk-based-development) - Collaborate on a single branch
- [Feature Flags](./methods/feature-flags) - Decouple deployment from release
- [Blue-Green Deployment](./methods/blue-green-deployment) - Zero-downtime deployments
- [Canary Release](./methods/canary-release) - Gradual rollout to detect issues
- [Infrastructure as Code](./methods/infrastructure-as-code) - Treat infrastructure like application code

## Further Reading

- [Continuous Delivery Website](https://continuousdelivery.com) - Official website maintained by Jez Humble
- [Continuous Delivery Book](https://www.informit.com/store/continuous-delivery-reliable-software-releases-through-9780321601919) - "Continuous Delivery: Reliable Software Releases through Build, Test, and Deployment Automation" (2010)
- [Accelerate](https://itrevolution.com/product/accelerate/) - Research validating CD practices
- [Martin Fowler's Continuous Delivery](https://martinfowler.com/bliki/ContinuousDelivery.html) - Concise definition
