---
sidebar_position: 2
title: "Phase 0: On-Prem"
---

# Phase 0: On-Prem

Phase 0 represents traditional on-premises operations - the baseline from which modernization journeys begin. Understanding this phase matters because its patterns persist far longer than organizations admit, often surviving migration to cloud infrastructure in name only.

## Characteristics

**Manual Provisioning**
- New infrastructure requires tickets, approvals, and human execution
- Lead times measured in days or weeks, not minutes
- Capacity planning dominates architectural decisions

**Ticket-Driven Operations**
- Change requests flow through service management systems
- Operations staff execute changes manually
- Audit trails exist in tickets, not automation logs

**Static Environments**
- Environments are long-lived and accumulate state
- "Dev," "Test," and "Prod" are distinct, often inconsistent
- Environment creation is a major project, not a routine operation

**Risk Avoidance via Delay**
- Change is inherently risky, so change is minimized
- Long change windows, extensive manual testing
- "If it ain't broke, don't fix it" as operating philosophy

## The "Pets" Mental Model

Phase 0 systems are **pets** - unique servers that receive individual care:

| Pets | Cattle |
|------|--------|
| Named servers (db-prod-01) | Numbered instances (i-3f2a7b) |
| Hand-configured | Automated provisioning |
| Repaired when sick | Replaced when unhealthy |
| Irreplaceable | Interchangeable |
| Tribal knowledge required | Self-documenting |

The pet model creates fragility. Knowledge lives in people's heads. Configuration accumulates like sediment. Changes require the right person with the right access and the right memory of how things work.

## Symptom Checklist

You're in Phase 0 if:

- [ ] Provisioning new infrastructure requires a ticket
- [ ] Someone has to "log into" servers to make changes
- [ ] Environment configurations exist primarily in people's heads
- [ ] You have servers older than some team members' tenure
- [ ] "The person who knows that system" is a meaningful phrase
- [ ] Disaster recovery plans involve "rebuilding" rather than "redeploying"
- [ ] Change windows are scheduled weeks in advance
- [ ] You maintain separate documentation that's perpetually out of date

## What Works at This Phase

**Stability through stasis**: Minimizing change genuinely reduces risk when change is manual and error-prone.

**Deep expertise**: The pet model, while fragile, does produce genuine expertise. Experienced operators understand systems deeply.

**Controlled change management**: ITIL-style change management provides audit trails and reduces cowboy changes.

**Long planning horizons**: Capacity planning and architectural decisions get thorough analysis when change is expensive.

## What Fails at This Phase

**Speed**: Any approach requiring rapid iteration or experimentation will fail against provisioning timelines.

**Scale**: Manual operations don't scale. Doubling infrastructure means doubling operational burden.

**Consistency**: Environments drift. What works in dev breaks in prod for reasons no one fully understands.

**Recovery**: When pets die, resurrection is painful. Disaster recovery is a project, not a procedure.

**Knowledge transfer**: Tribal knowledge can't be transferred at scale. Key person dependencies create organizational risk.

:::warning[Common Pitfall]
Many organizations claim to have left Phase 0 because they moved to the cloud, but they brought their operating model with them. Cloud VMs managed like on-prem servers are still Phase 0 operations, just with a different billing model.
:::

## Exit Criteria

To leave Phase 0, you must establish:

1. **Some infrastructure as code**: Even basic automation begins the transition
2. **Repeatable provisioning**: At least some resources can be created without tickets
3. **Version-controlled configuration**: Configuration changes are tracked, not just executed
4. **Reduced key-person dependency**: At least some systems can be operated by multiple people

Leaving Phase 0 doesn't require perfection. It requires beginning the shift from manual to automated, from tribal to documented, from pets toward cattle.

## Disciplines Required to Exit

| Discipline | Minimum Bar |
|------------|-------------|
| **Version Control** | All configuration in Git |
| **Basic Automation** | Scripts replace some manual procedures |
| **Documentation** | Runbooks exist, even if incomplete |
| **Shared Access** | Multiple people can operate critical systems |

:::tip[GovCon Insight]
Phase 0 represents the legacy system context that dominates government IT. When engaging with agencies:

- **Acknowledge reality**: Many government systems are genuinely in Phase 0, for valid historical reasons
- **Avoid judgment**: Phase 0 isn't failure - it's a starting point that reflects constraints that existed when systems were built
- **Assess honestly**: Proposals should accurately characterize current state, not assume capabilities that don't exist
- **Plan transitions**: Moving from Phase 0 requires explicit discipline adoption, not just tool deployment

RFPs often underestimate the gap between Phase 0 and target state. Proposals that demonstrate understanding of this gap - and realistic plans to bridge it - are more credible than those promising rapid transformation.
:::

## The Path Forward

Phase 0 organizations don't need to boil the ocean. The path forward begins with:

1. **Pick one system**: Start with something manageable, not mission-critical
2. **Codify current state**: Document and version-control what exists
3. **Automate one thing**: Replace one manual procedure with automation
4. **Prove the model**: Demonstrate that automation improves outcomes
5. **Expand deliberately**: Apply lessons learned to the next system

The goal isn't immediate transformation. It's establishing the foundation of disciplines that make transformation possible.
