---
sidebar_position: 2
title: "People Changes"
---

# People Changes

Technology doesn't transform organizations. People do. The people dimension of FOE transformation involves skills evolution, mindset shifts, and fundamental changes in how roles relate to each other.

## The Core Mindset Shifts

### From Manual Guardianship to Automated Stewardship

**Manual guardianship** means people protect systems by personally intervening. The ops engineer who knows the production quirks. The release manager who eyeballs every deployment. The security reviewer who manually checks configurations.

This model doesn't scale and creates fragility:
- Knowledge concentrates in individuals
- Throughput is limited by human availability
- Consistency depends on attention and memory
- People become bottlenecks and burn out

**Automated stewardship** means people protect systems by building and maintaining automation. The ops engineer who codifies production requirements into policy. The release manager who builds deployment pipelines with automated checks. The security reviewer who implements policy-as-code.

| Aspect | Manual Guardianship | Automated Stewardship |
|--------|--------------------|-----------------------|
| **Protection mechanism** | Personal vigilance | Automated systems |
| **Scaling** | Linear with headcount | Multiplicative |
| **Knowledge** | In people's heads | In code and config |
| **Consistency** | Varies with attention | Systematic |
| **On-call burden** | Heavy, heroic | Lighter, sustainable |
| **Career growth** | Becoming indispensable | Building lasting capability |

### From Gatekeeping to Enabling Flow

**Gatekeeping** treats other teams as threats to be controlled:
- "You can't deploy until I review it"
- "Submit a ticket and wait for my approval"
- "I don't trust developers with production access"

Gatekeeping feels safe because it preserves control. It's actually dangerous because it creates:
- Bottlenecks that slow delivery
- Adversarial relationships between teams
- Workarounds that bypass safety measures
- Resentment that erodes collaboration

**Enabling flow** treats other teams as partners to be equipped:
- "Here's a pipeline that lets you deploy safely"
- "These guardrails let you move without waiting for approval"
- "Production access is automated and audited"

| Gatekeeping Says | Enabling Flow Says |
|------------------|-------------------|
| "You can't" | "Here's how you can safely" |
| "Wait for me" | "This is self-service" |
| "I'll do it for you" | "This automation does it consistently" |
| "Submit a request" | "The capability is available" |
| "I need to review" | "The policy validates automatically" |

### DevOps as Operating Alignment, Not Org Chart Label

DevOps is not:
- A team name
- A job title
- A department that sits between Dev and Ops
- Something you hire or buy

DevOps is:
- Development and Operations working toward shared goals
- Shared ownership of the entire software lifecycle
- Feedback loops that connect deployment outcomes to development decisions
- A way of operating, not an organizational structure

Creating a "DevOps team" often makes things worse. It creates a third silo (Dev | DevOps | Ops) and lets Dev and Ops avoid the hard work of actual collaboration.

## Skills Evolution by Role

### Operations Engineers

**Traditional ops skills:**
- Manual server administration
- Runbook execution
- Ticket queue management
- Vendor relationship management
- Change control coordination

**FOE ops skills (add, don't replace):**
- Infrastructure as Code (Terraform, Pulumi)
- Container orchestration (Kubernetes)
- GitOps workflows
- Observability and SLO management
- Pipeline development
- Policy as Code

**The transition path:**
1. Start with IaC for resources you already manage
2. Containerize one application and learn the workflow
3. Build one pipeline, understand the patterns
4. Extend incrementally from what you know

### Developers

**Traditional dev boundaries:**
- Write code, throw it over the wall
- "Works on my machine"
- Production is someone else's problem
- Infrastructure is magic

**FOE developer expectations:**
- Own the full lifecycle of your code
- Understand how your code behaves in production
- Write code that's observable and operable
- Participate in on-call for your services

**The transition path:**
1. Add structured logging and metrics to your code
2. Learn to read your service's dashboards
3. Shadow on-call before carrying the pager
4. Debug one production issue end-to-end

### Security Engineers

**Traditional security posture:**
- Review at the end
- Compliance as checkpoint
- Security as the department of "no"
- Penetration testing as primary control

**FOE security posture:**
- Shift left: security in design and development
- Compliance as continuous verification
- Security as enabler of safe velocity
- Automated policy enforcement as primary control

**The transition path:**
1. Embed in one development team's workflow
2. Convert one manual check to automated policy
3. Build security into pipeline, not around it
4. Measure time-to-remediation, not just findings

## Supporting the Transition

People don't change because you tell them to. They change when:
- They see the benefit clearly
- They have time to learn
- Failure is safe
- Success is recognized

### Create Learning Time

Transformation requires learning. Learning requires time. If you don't explicitly create time for learning, it won't happen.

- Dedicate specific hours/days to skill building
- Pair experienced practitioners with those learning
- Build learning into project timelines, not on top of them
- Expect productivity to dip temporarily during transition

### Make Failure Safe

People won't try new approaches if failure is punished. Create environments where:
- Experiments that don't work are learning, not failure
- Postmortems are blameless
- Trying and failing is better than not trying
- Recovery is more important than prevention

### Recognize New Behaviors

What gets recognized gets repeated. If you want new behaviors:
- Celebrate automation that replaces manual work
- Recognize collaboration across team boundaries
- Highlight flow improvements in team communications
- Make the new behaviors visible and valued

:::tip[GovCon Insight]
**Contractor Workforce Considerations**

Government contractors face specific people challenges:

**Contract structure constraints:**
- Labor categories may not align with DevOps roles
- Rate cards may not accommodate skill transitions
- Contract transitions can reset team capabilities

**Mitigations:**
- Write labor categories around outcomes, not traditional roles
- Include training and skill development in contract scope
- Build knowledge transfer requirements into contracts
- Use period of performance to allow skill evolution

**Team composition guidance:**
- Mix experienced practitioners with those learning
- Don't concentrate all DevOps skills in one contractor
- Build government team capability alongside contractor capability
- Plan for contract transitions from day one

**Retention in transformation:**
- Engineers learning new skills are more marketable
- Counter with interesting work, growth, and mission
- Build team culture that people don't want to leave
- Accept some turnover as cost of building capability
:::

## Role-Specific Change Management

### For Technical Leads

Your job changes from "best individual contributor" to "capability multiplier":
- Spend more time building systems that help others
- Prioritize removing blockers over personal throughput
- Teach rather than do
- Your success is measured by team capability, not personal output

### For Managers

Your job changes from "work distributor" to "environment shaper":
- Create conditions where self-organization works
- Remove organizational obstacles to flow
- Shield teams from organizational dysfunction
- Measure outcomes (flow metrics) not outputs (tickets closed)

### For Executives

Your job changes from "decision bottleneck" to "context provider":
- Set direction and constraints, let teams figure out how
- Demand visibility (metrics, not status meetings)
- Fund capability building, not just delivery
- Model the behaviors you want to see

## Measuring People Change

How do you know if the people dimension is transforming?

| Indicator | Before | After |
|-----------|--------|-------|
| **Deployment participation** | Specialized roles only | Developers deploy regularly |
| **Production access** | Gatekept | Self-service with audit |
| **Incident response** | Escalation chains | Team ownership |
| **Skills distribution** | Siloed by role | T-shaped, overlapping |
| **Knowledge location** | In heads | In code and docs |
| **Collaboration pattern** | Ticket-based handoffs | Direct conversation |
| **Learning investment** | Individual initiative | Organizational support |

## Common Failure Modes

### "We hired DevOps engineers"
Hiring doesn't change existing people. The new hires become a silo, or frustrated, or both.

### "We sent everyone to training"
Training without practice doesn't stick. Build application into work immediately.

### "We'll change the culture"
Culture is an outcome, not a lever. Change behaviors, systems, and incentives; culture follows.

### "Some people won't change"
True. Some won't. Don't let that stop you. Build the new model, let people opt in, manage out those who won't.
