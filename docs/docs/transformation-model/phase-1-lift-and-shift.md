---
sidebar_position: 3
title: "Phase 1: Lift & Shift"
---

# Phase 1: Lift & Shift

Phase 1 represents cloud adoption without cloud-native transformation. Infrastructure moves to cloud providers, but operating models, architectures, and disciplines remain unchanged. This phase is often necessary but becomes dangerous when mistaken for modernization.

## Characteristics

**Cloud Location, On-Prem Model**
- Workloads run on cloud infrastructure
- Operating procedures remain manual and ticket-driven
- Cloud is treated as "someone else's data center"

**Preserved Shapes**
- Applications migrate without rearchitecture
- Monoliths remain monoliths, just on EC2 instead of physical servers
- Network topology replicates on-prem patterns

**Same Constraints, Different Billing**
- Capacity planning still dominates
- Provisioning still requires manual intervention
- Environments still drift and accumulate state

**Modernization in Name Only**
- "We're in the cloud" becomes the success metric
- Cloud-native capabilities remain unused
- Cost optimization limited to instance rightsizing

## The Modernization Theater Trap

Phase 1's greatest danger is the narrative it enables: "We've modernized; we're in the cloud now."

This theater creates several problems:

**False completion**: Stakeholders believe transformation is done when it hasn't started
**Budget exhaustion**: Migration consumed resources, leaving nothing for actual modernization
**Capability assumptions**: Downstream plans assume cloud-native capabilities that don't exist
**Technical debt accumulation**: Legacy patterns, now in the cloud, continue accruing interest

```
What was promised:              What was delivered:
┌─────────────────────┐         ┌─────────────────────┐
│ Cloud-Native        │         │ Same Application    │
│ Auto-scaling        │         │ Same Architecture   │
│ Resilient           │         │ Same Operations     │
│ Cost-Optimized      │         │ Different Location  │
│ Modern              │         │ Higher Bill         │
└─────────────────────┘         └─────────────────────┘
```

:::warning[Common Pitfall]
The most expensive Phase 1 mistake is signing long-term cloud commitments based on lift-and-shift costs. These workloads are almost always over-provisioned (because they were designed for on-prem capacity planning) and will need rearchitecture to achieve cloud economics. Locking in costs before optimization creates budget constraints that prevent actual modernization.
:::

## Symptom Checklist

You're in Phase 1 if:

- [ ] Workloads run on cloud infrastructure
- [ ] Provisioning still requires tickets or manual intervention
- [ ] Cloud VMs are treated as persistent, named resources
- [ ] Auto-scaling is "configured but not trusted"
- [ ] Deployments require maintenance windows
- [ ] "Cloud migration" is described as complete or nearly complete
- [ ] Cloud costs are higher than expected with unclear path to optimization
- [ ] The same team operates systems with the same procedures, just in AWS/Azure/GCP

## What Works at This Phase

**Quick wins**: Getting workloads off aging hardware has real value
**Reduced data center burden**: Physical infrastructure management transfers to cloud provider
**Foundation for future**: Cloud location is prerequisite for cloud-native, even if not sufficient
**Stakeholder visibility**: "In the cloud" creates organizational permission for further modernization

## What Fails at This Phase

**Cost reduction**: Lift-and-shift typically increases costs before any optimization
**Agility claims**: Cloud location doesn't automatically enable rapid iteration
**Resilience assumptions**: Lifted workloads inherit cloud failures without cloud resilience patterns
**Scale expectations**: Applications designed for static infrastructure don't automatically scale

## What to Watch For

**Warning signs you're stuck in Phase 1:**

| Signal | What It Means |
|--------|---------------|
| Cloud costs climbing without capability gains | You're paying cloud prices for on-prem operations |
| "We'll optimize later" as persistent refrain | Technical debt is accumulating with interest |
| Same incidents, different infrastructure | Operating model hasn't changed |
| Reserved instance focus over architecture | Optimizing the wrong layer |
| "Cloud Center of Excellence" with no delivery authority | Governance without transformation |

## Exit Criteria

To leave Phase 1, you must establish:

1. **Infrastructure as Code adoption**: Not just for some resources, but as the default operating model
2. **Immutable infrastructure patterns**: At least some workloads use disposable, replaceable resources
3. **Automated provisioning**: Self-service infrastructure, not tickets
4. **Container adoption**: At least experimentation with containerized workloads
5. **Pipeline-based deployment**: Code changes flow through automation, not manual processes

## Disciplines Required to Exit

| Discipline | Minimum Bar |
|------------|-------------|
| **IaC as Practice** | Terraform/CloudFormation for all new resources |
| **CI/CD Foundation** | Automated build and deployment for at least some workloads |
| **Container Basics** | Team capability to containerize applications |
| **Cloud-Native Awareness** | Understanding of what's possible beyond lift-and-shift |

:::tip[GovCon Insight]
Phase 1 is where most government modernization programs stall. Understanding why helps craft better proposals:

**Why agencies get stuck:**
- Migration projects are funded; transformation projects struggle for budget
- "In the cloud" satisfies audit and compliance narratives
- Risk aversion favors preserving known operational patterns
- Contractor incentives often align with migration volume, not outcome quality

**Proposal differentiation:**
- Acknowledge that lift-and-shift is often necessary first step, not failure
- Define explicit Phase 2 and Phase 3 milestones beyond migration
- Propose success metrics based on operational capability, not just migration completion
- Include discipline adoption in implementation plans, not just technology deployment

**Honest conversation points:**
- What operational capabilities will change, not just where workloads run?
- What disciplines must the agency adopt, not just what tools will be deployed?
- What does success look like beyond "migration complete"?
:::

## The Path Forward

Escaping Phase 1 requires acknowledging that migration is not modernization. The path forward:

1. **Honest assessment**: Acknowledge current state without defensiveness
2. **Define actual targets**: What operational capabilities do you need, not just where should workloads run?
3. **Pilot IaC**: Start treating infrastructure as code for new resources
4. **Containerize one thing**: Build muscle for container operations
5. **Automate deployment**: Remove manual steps from at least one application's deployment
6. **Measure differently**: Track operational capabilities, not just migration percentages

Phase 1 isn't failure; it's an incomplete journey. The failure is stopping here and calling it done.
