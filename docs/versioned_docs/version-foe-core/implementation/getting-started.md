---
sidebar_position: 1
title: "Getting Started with FOE"
---

# Getting Started with FOE

Adopting Flow Optimized Engineering is not a technology rollout; it's a transformation in how your organization thinks about software delivery. This guide provides the first steps for making that transformation real.

## Before You Begin

FOE adoption requires more than enthusiasm. Before you start, ensure you have:

- **Executive sponsorship**: Someone with authority to protect time and prioritize work
- **A willing team**: At least one team ready to be the proving ground
- **Realistic expectations**: Transformation takes 12-18 months for meaningful results
- **Patience for the J-curve**: Performance often dips before it improves

:::warning
Do not attempt FOE adoption as a "grassroots" initiative without organizational backing. Engagement requires protected time and organizational priority. Without these, you're setting your team up for frustration.
:::

## Building Your Coalition

Successful FOE adoption requires allies at three levels:

### Executive Sponsor
- Can allocate protected time (time codes, sprint allocation)
- Can make FOE a stated organizational priority
- Can shield the team from competing demands during transformation

### Technical Champion
- Understands the technical disciplines deeply
- Can model the behaviors you want to see
- Has credibility with the engineering team

### Team Leads
- Willing to change their own practices first
- Committed to the long game over quick wins
- Able to translate FOE principles to their context

:::tip
Start with one team that has all three coalition members aligned. Success here creates the evidence you need to expand.
:::

## Initial Assessment

Before prescribing solutions, understand where you are. Complete these diagnostic steps:

### 1. Current State Inventory

| Dimension | Questions to Answer |
|-----------|-------------------|
| Deployment | How often do you deploy? How long does it take? How often does it fail? |
| Testing | What's your test coverage? How long does the test suite take? Do you trust it? |
| Integration | How often do developers integrate? How painful is it? |
| Incidents | How often do things break? How long to recover? |
| Developer Experience | How long to onboard? How much friction in daily work? |

### 2. Phase Assessment

Use the detailed framework in [Assessing Your Current Phase](./assessing-your-phase.md) to honestly evaluate where you are. Most teams overestimate their maturity.

### 3. Pain Point Mapping

Interview team members individually:
- What's the most frustrating part of your daily work?
- What do you avoid doing because it's too hard?
- What would you fix if you had a magic wand?

The patterns that emerge reveal your highest-leverage improvement opportunities.

## Quick Wins: The First 30 Days

Start with improvements that are:
- **Visible**: People can see the change
- **Low-risk**: Won't break production
- **High-value**: Address real pain points
- **Fast**: Achievable in days, not months

### Recommended First Moves

1. **Establish a deployment baseline**: Measure current deployment frequency, lead time, and failure rate. You can't improve what you don't measure.

2. **Fix one friction point**: Pick the most-cited developer pain point and fix it. This builds credibility.

3. **Create a "Definition of Done"**: Agree on minimum standards for what "done" means. This is your first institution.

4. **Start a learning practice**: Weekly 30-minute sessions where the team shares knowledge. This builds the habit of improvement.

:::tip
Quick wins are about building trust, not solving all problems. Each win is evidence that change is possible.
:::

## Sequencing the Transformation

FOE transformation follows a predictable sequence. Attempting to skip phases leads to fragile improvements that don't stick.

### Phase Progression

```
Phase 1 → Phase 2 → Phase 3 → Phase 4 → Phase 5
  │         │         │         │         │
  └─────────┴─────────┴─────────┴─────────┘
         Each phase builds on the previous
```

### Typical Timeline

| Phase Transition | Typical Duration | Key Focus |
|-----------------|------------------|-----------|
| 1 → 2 | 2-4 months | Basic automation, source control hygiene |
| 2 → 3 | 4-6 months | CI/CD pipeline, testing discipline |
| 3 → 4 | 6-12 months | Deployment automation, monitoring |
| 4 → 5 | 12+ months | Full automation, continuous improvement |

:::warning
The most common failure mode is attempting to jump from Phase 2 to Phase 4. You cannot automate your way past missing disciplines. Phase 3's verification mindset is the foundation everything else builds on.
:::

### Sequencing Principles

1. **Foundations before automation**: Don't automate a broken process
2. **Disciplines before tools**: Tools amplify whatever you have, good or bad
3. **One team before many**: Prove the model works before scaling
4. **Evidence before expansion**: Each phase should produce measurable improvement

## Resource Requirements

Be realistic about what FOE adoption requires:

### Time Investment

| Role | Weekly Time Commitment |
|------|----------------------|
| Executive Sponsor | 2-4 hours (reviews, decisions, air cover) |
| Technical Champion | 8-16 hours (hands-on, coaching, design) |
| Team Members | 4-8 hours (learning, practice change) |

### Financial Investment

- **Tooling**: CI/CD infrastructure, testing tools, monitoring
- **Training**: Formal training or dedicated learning time
- **Consulting**: Consider external expertise for acceleration
- **Slack time**: Teams need capacity for improvement work

### Organizational Investment

- Protected time codes for improvement work
- Permission to say "no" to competing priorities
- Tolerance for the J-curve performance dip

:::tip[GovCon Insight]
In government contracting, resource requirements must often be justified in contract terms. Frame FOE adoption as a "capability maturation" investment with defined milestones and measurable outcomes. Many contracts include CMMI or similar maturity requirements, and FOE provides a more practical path to the same goals.
:::

## Transition Planning for GovCon

Government contractors face unique constraints when adopting FOE:

### Contract Considerations

- **Current Contract**: What does your contract require for process compliance? How can FOE practices satisfy those requirements?
- **Recompete Strategy**: How will FOE maturity differentiate you in future proposals?
- **Transition-In/Out**: How will you transfer FOE practices to/from other contractors?

### Compliance Mapping

Map FOE practices to common compliance frameworks:

| Compliance Requirement | FOE Practice |
|-----------------------|--------------|
| Configuration Management | Version control, IaC, automated deployment |
| Quality Assurance | Automated testing, continuous integration |
| Change Control | Pull request workflow, automated gates |
| Documentation | Living documentation, automated generation |

### Government Stakeholder Engagement

- **COR/COTR**: Keep them informed of process improvements and their benefits
- **Program Office**: Frame FOE in terms of mission impact, not technical details
- **Security/ATO**: Engage early on automated security practices

:::tip[GovCon Insight]
When planning FOE transition on government contracts, build in explicit "capability transfer" milestones. This protects the government's investment and demonstrates your commitment to sustainable practices, not contractor lock-in.
:::

## Your First Week Checklist

- [ ] Identify your executive sponsor
- [ ] Identify your technical champion
- [ ] Select your pilot team
- [ ] Complete initial assessment inventory
- [ ] Conduct team pain point interviews
- [ ] Establish deployment baseline metrics
- [ ] Schedule first team learning session
- [ ] Create initial Definition of Done
- [ ] Set up tracking for improvement work (time codes, board, etc.)
- [ ] Communicate the "why" to all stakeholders

## Next Steps

Once you've completed these initial steps:

1. **Assess your phase**: Use the detailed framework in the next section
2. **Build your institutions**: Create the lightweight mechanisms that make good behavior default
3. **Establish your metrics**: Know what you're measuring and why
4. **Engage the organization**: Get buy-in at all levels

Remember: FOE is a direction, not a destination. The goal is continuous improvement, not perfection. Start where you are, be honest about your current state, and take the next right step.
