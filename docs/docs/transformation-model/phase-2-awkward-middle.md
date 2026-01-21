---
sidebar_position: 4
title: "Phase 2: The Awkward Middle"
---

# Phase 2: The Awkward Middle

Phase 2 is where tools changed but disciplines didn't. Organizations have adopted modern technologies - Terraform, containers, CI/CD pipelines - but haven't transformed how they operate. This creates a frustrating middle state: all the complexity of modern tooling without the benefits of modern operations.

## Characteristics

**IaC Exists, But Not as Discipline**
- Terraform/CloudFormation files exist in repositories
- But manual changes still happen "when necessary"
- State drift is common and tolerated
- IaC is treated as documentation, not source of truth

**Containers Exist, But Not as Platform**
- Applications are containerized
- But deployment is still artisanal
- Each application has unique deployment procedures
- Container orchestration is present but not trusted

**CI/CD Exists, But Heroics Persist**
- Pipelines automate some deployment steps
- But critical changes require senior engineers
- "Break glass" procedures are frequently invoked
- Automation is supervised, not trusted

**Standardization Attempted, Special Cases Everywhere**
- Platform teams create golden paths
- Application teams immediately request exceptions
- Standards exist on paper but not in practice
- "Our application is different" is accepted justification

## The Heroics Problem

Phase 2's defining characteristic is continued reliance on heroic individuals:

```
Phase 2 Pattern:
┌──────────────────┐     ┌──────────────────┐     ┌──────────────────┐
│   Normal Work    │────▶│    Problem       │────▶│  Hero Saves Day  │
│   (Automated)    │     │   (Exception)    │     │  (Manual)        │
└──────────────────┘     └──────────────────┘     └──────────────────┘
                                                          │
                                                          ▼
                                                  ┌──────────────────┐
                                                  │   "We should     │
                                                  │   automate that" │
                                                  │   (Never happens)│
                                                  └──────────────────┘
```

This pattern is self-reinforcing:
- Heroes are rewarded for saving the day
- Automation investment is deprioritized because heroes exist
- Heroes become bottlenecks, creating more crises
- More crises justify more heroics

:::warning[Common Pitfall]
Organizations often mistake tool adoption for transformation. "We use Kubernetes" is not the same as "we have platform discipline." "We have Terraform" is not the same as "we practice infrastructure as code." The tools enable disciplines; they don't create them.
:::

## Symptom Checklist

You're in Phase 2 if:

- [ ] IaC exists but `terraform apply` makes people nervous
- [ ] Containers run in production but deployment isn't self-service
- [ ] CI/CD pipelines exist but critical deployments still require senior approval
- [ ] Platform team exists but spends most time on exceptions
- [ ] Post-mortems frequently identify "we should automate that"
- [ ] "That service is special" justifies unique handling
- [ ] Kubernetes/ECS/etc. is running but not trusted for stateful workloads
- [ ] Infrastructure changes require the "person who knows that system"
- [ ] Runbooks exist but are incomplete or outdated
- [ ] SRE/DevOps is a team, not a practice

## Why This Is Where Most Organizations Are Stuck

Phase 2 is comfortable enough to tolerate but not effective enough to scale. Several dynamics keep organizations here:

**Sunk cost**: "We invested in all these tools, so we must be modern"
**Partial success**: Things mostly work, so transformation pressure is low
**Hero dependency**: The people who could drive change are too busy firefighting
**Organizational inertia**: Changing disciplines requires changing behaviors, which is harder than deploying tools
**Incentive misalignment**: Heroes are promoted; automation investment is invisible

## What Works at This Phase

**Handling known patterns**: When things work as expected, automation helps
**Improved visibility**: Modern tooling provides better observability than Phase 0-1
**Faster recovery**: Even imperfect automation beats fully manual recovery
**Foundation exists**: The tools for Phase 3 are present; disciplines are what's missing

## What Fails at This Phase

**Scale**: Heroic models don't scale - you can't hire enough heroes
**Consistency**: Special cases accumulate until everything is special
**Speed**: Approval bottlenecks and manual steps limit deployment velocity
**Reliability**: Human-dependent processes fail in human ways
**Knowledge transfer**: Hero knowledge doesn't transfer; it retires or quits

## Exit Criteria

To leave Phase 2, you must establish:

1. **IaC as source of truth**: Infrastructure state matches code; drift is detected and corrected automatically
2. **Platform as product**: Standardized patterns that applications adopt, not request exceptions from
3. **Self-service operations**: Teams deploy without requiring other teams' involvement
4. **Automation trust**: Pipelines run without supervision for routine operations
5. **Exception elimination**: "Special" handling is actively reduced, not accommodated

## Disciplines Required to Exit

| Discipline | Phase 2 State | Phase 3 Requirement |
|------------|---------------|---------------------|
| **IaC** | Exists, not trusted | Source of truth, reconciled |
| **Platform** | Offered, exceptions common | Standardized, exceptions rare |
| **Deployment** | Automated, supervised | Self-service, trusted |
| **Incident Response** | Hero-dependent | Runbook-driven, automated |
| **Standards** | Documented | Enforced via automation |

:::tip[GovCon Insight]
Phase 2 is where most government contractors are stuck - and where most modernization programs stall. This creates both challenge and opportunity:

**The challenge:**
- Contractors often claim Phase 3+ capabilities while operating at Phase 2
- Proposals promise cloud-native outcomes using Phase 2 operating models
- Agencies can't distinguish tool adoption from discipline adoption

**The opportunity:**
- Honest assessment of contractor maturity is rare and valuable
- Proposals that acknowledge Phase 2 realities and plan for discipline adoption stand out
- Demonstrating understanding of the discipline gap shows technical depth

**Proposal strategy:**
- Assess your own team's actual operating maturity, not aspirational state
- Define explicit discipline adoption milestones, not just tool deployment
- Acknowledge that tools alone don't create transformation
- Propose metrics that measure operational capability, not tool presence
- Staff for discipline coaching, not just technical implementation
:::

## The Path Forward

Escaping Phase 2 requires changing how teams work, not just what tools they use:

1. **Acknowledge the hero problem**: Recognize that heroics are a symptom, not a solution
2. **Enforce IaC source of truth**: Detect drift and fix it; stop tolerating manual changes
3. **Reduce exception tolerance**: Each special case is a failure to standardize
4. **Invest in platform as product**: Platform team success = application team self-service
5. **Automate incident response**: Runbooks should execute, not just document
6. **Change incentives**: Reward automation and standardization, not firefighting

The transition from Phase 2 to Phase 3 is the hardest step. It requires not just technical change but organizational discipline. This is the bottleneck.
