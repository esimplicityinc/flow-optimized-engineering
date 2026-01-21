---
sidebar_position: 5
title: "Organizational Engagement"
---

# Organizational Engagement

FOE transformation succeeds or fails at the organizational level. Technical practices matter, but without organizational engagement, they remain fragile islands of excellence in a sea of dysfunction. This guide covers the operating constraints that make FOE sustainable.

## FOE Operating Constraints

Through experience, we've identified five constraints that must be satisfied for FOE to take hold:

### 1. Engagement Requires Protected Time

**The principle**: Teams cannot improve while running at 100% capacity. Improvement work requires dedicated, protected time.

**What this looks like in practice**:
- Explicit time allocation for improvement work (e.g., 20% of sprint capacity)
- Time codes or budget lines for improvement activities
- Calendar blocks that are defended, not sacrificed
- Improvement work treated as "real work," not extra credit

**Why organizations resist**: Improvement time feels like reduced delivery capacity. In the short term, it is. Leadership must accept the J-curve.

**How to get it**:
- Start small (4 hours/week per team)
- Make it visible (specific time codes, calendar blocks)
- Protect it (escalation path when it's threatened)
- Show returns (track improvements delivered)

:::warning
Without protected time, improvement happens only through heroics—and heroics don't scale or sustain.
:::

### 2. Organizational Priority Determines Energy

**The principle**: People do what the organization rewards and measures. If FOE is optional, it won't happen.

**What this looks like in practice**:
- Leadership explicitly states FOE as a priority
- FOE practices are included in performance expectations
- Resources are allocated to FOE work
- Competing priorities are managed, not ignored

**Why organizations resist**: Everything is a priority, which means nothing is. Adding another priority feels impossible.

**How to get it**:
- Connect FOE to business outcomes leadership already cares about
- Make the cost of the current state visible
- Start with one team as proof of concept
- Build evidence that creates pull, not just push

:::tip
FOE should reduce the number of competing priorities by making delivery more predictable—but you need enough priority to get started.
:::

### 3. Contribution Requires Clear Ownership

**The principle**: Shared ownership is no ownership. Every institution, practice, and improvement needs one accountable person.

**What this looks like in practice**:
- Named owners for each FOE practice and institution
- Clear accountability (not just responsibility)
- Authority to match accountability
- Bus factor > 1 (owner isn't single point of failure)

**Why organizations resist**: Naming owners creates accountability, which some avoid. "The team owns it" feels safer.

**How to get it**:
- Start with volunteers who want ownership
- Clarify that ownership means accountability for outcomes, not doing all the work
- Ensure owners have authority to make decisions
- Recognize and reward good ownership

### 4. Gateless Contribution Creates Chaos

**The principle**: Open contribution without standards leads to inconsistency and technical debt. Light governance is still governance.

**What this looks like in practice**:
- Clear contribution standards (how to contribute)
- Quality gates that are enforced
- Review processes that maintain consistency
- Standards that evolve but exist

**Why organizations resist**: Gates feel like bureaucracy. "Just trust people" sounds better.

**How to get it**:
- Frame gates as enablers, not blockers ("gates let us move faster safely")
- Automate gates to reduce friction
- Keep gates minimal but real
- Show the cost of gateless contributions (bugs, inconsistency, rework)

:::tip
The goal is "light governance, real standards"—not no governance.
:::

### 5. DevX Is a Hard Requirement

**The principle**: FOE practices must reduce friction, not add ceremony. If practices make developers' lives worse, adoption will fail.

**What this looks like in practice**:
- Practices are evaluated for developer experience impact
- Tooling is chosen for usability, not just capability
- Friction is systematically identified and reduced
- Developers have input into practice design

**Why organizations resist**: DevX feels like a luxury. "Developers should just deal with it."

**How to get it**:
- Measure developer friction (time to first commit, build wait time, etc.)
- Treat DevX improvements as legitimate improvement work
- Include developers in practice design
- Celebrate friction reduction wins

:::warning
Practices with poor DevX will be circumvented. Developers are creative—they'll find workarounds for painful processes.
:::

## Change Management Fundamentals

FOE transformation is organizational change. It requires intentional change management.

### The Change Curve

```
Performance
    │
    │    ┌──────────────────────────────────►
    │   ╱                     New Normal
    │  ╱
    │ ╱
────┼─────────────────────────────────────────►
    │╲                                    Time
    │ ╲
    │  ╲
    │   ╲_______
    │           ╲______╱
    │              Valley
```

Expect the J-curve:
1. **Initial dip**: New practices slow things down before speeding them up
2. **Valley**: The hardest part—old ways don't work, new ways aren't automatic
3. **Climb**: Practices become habitual, returns begin
4. **New normal**: Better performance than before, sustainably

### Managing Resistance

Resistance is natural. Address it, don't ignore it.

| Resistance Type | Root Cause | Response |
|-----------------|------------|----------|
| "We don't have time" | Capacity concerns | Start small, show ROI |
| "We tried this before" | Past failure trauma | Acknowledge, differentiate this approach |
| "This won't work here" | Context concerns | Adapt practices to context, maintain principles |
| "Management won't support it" | Authority concerns | Get explicit sponsorship, make it visible |
| "The tools are the problem" | Tool focus | Address tool issues while building disciplines |

### Communication Strategy

Tailor communication to the audience:

| Audience | They Care About | Communicate |
|----------|-----------------|-------------|
| Executives | Business outcomes, risk, cost | ROI, risk reduction, competitive advantage |
| Middle management | Delivery, predictability, team health | Metrics, predictability, reduced firefighting |
| Tech leads | Quality, technical excellence | Better code, less rework, professional growth |
| Developers | Daily experience, craft | Reduced friction, better tools, skill development |

## Getting Buy-In at Different Levels

### Executive Level

Executives need to see FOE as a business investment, not a technical hobby.

**Key messages**:
- Current state has quantifiable costs (incidents, turnover, missed dates)
- FOE reduces risk and improves predictability
- Industry leaders use these practices (DORA research)
- Investment has measurable returns

**What to ask for**:
- Explicit sponsorship
- Protected time budget
- Permission to measure and report
- Air cover during the J-curve

**Warning signs of lip service**:
- "Great idea, just don't let it impact delivery"
- No time allocation
- No willingness to adjust other priorities
- Support disappears at first difficulty

### Middle Management Level

Middle managers are often the hardest to convince—they're measured on short-term delivery.

**Key messages**:
- FOE makes your job easier (fewer fires, more predictability)
- Your teams will be healthier (less turnover, less burnout)
- You'll look good (measurable improvement)
- This is an investment, not a tax

**What to ask for**:
- Willingness to protect improvement time
- Participation in setting priorities
- Honest feedback on what's working
- Patience during the learning curve

**Warning signs of trouble**:
- Improvement time is first thing cut
- "Just this sprint" exceptions become permanent
- FOE practices blamed for delivery issues
- Metrics used punitively

### Technical Lead Level

Tech leads are often your strongest allies—they feel the pain most acutely.

**Key messages**:
- FOE gives you tools to solve problems you've been fighting
- You'll have authority, not just responsibility
- Your expertise will be valued and developed
- Technical debt will be addressed systematically

**What to ask for**:
- Active participation in practice design
- Modeling of behaviors
- Honest assessment of what's working
- Mentoring of team members

**Warning signs of trouble**:
- Passive agreement without active participation
- Exempting themselves from practices
- Undermining practices privately
- Reverting under pressure

### Developer Level

Developers are the ultimate test—if practices don't work for them, they won't stick.

**Key messages**:
- This will make your daily work better
- You have input into how we do this
- We're removing friction, not adding ceremony
- Your professional growth is part of this

**What to ask for**:
- Good faith effort during learning curve
- Honest feedback on what's not working
- Participation in improvement
- Patience with temporary friction

**Warning signs of trouble**:
- Cynicism ("another initiative")
- Workarounds and bypasses
- Disengagement from improvement discussions
- Turnover

## GovCon: Change Management in Government Contexts

:::tip[GovCon Insight]
Government environments have unique change management challenges: risk aversion, compliance overhead, stakeholder complexity, and often, learned helplessness from past failed initiatives.
:::

### Government-Specific Challenges

| Challenge | FOE Response |
|-----------|-------------|
| **Risk aversion** | Emphasize risk reduction aspects of FOE (fewer incidents, better testing) |
| **Compliance burden** | Show how FOE practices satisfy compliance requirements more efficiently |
| **Stakeholder complexity** | Map stakeholders early, tailor communication to each |
| **Contractor/government dynamics** | Build trust through transparency and shared metrics |
| **Institutional inertia** | Start small, build evidence, expand gradually |

### Key Government Stakeholders

| Stakeholder | Their Concerns | Your Approach |
|-------------|---------------|---------------|
| **COR/COTR** | Contract compliance, performance | Regular reporting, no surprises |
| **Program Office** | Mission delivery, budget | Frame FOE in mission terms |
| **Security/ISSO** | ATO, vulnerability management | Show how DevSecOps improves security |
| **End Users** | System works for them | Include user feedback in metrics |
| **Oversight (IG, GAO)** | Proper use of funds | Documentation, measurable outcomes |

### Contract Vehicle Considerations

Different contract types require different approaches:

| Contract Type | Change Management Approach |
|--------------|---------------------------|
| **T&M** | Most flexibility; focus on demonstrating value |
| **FFP** | Changes must be within scope; document efficiency gains |
| **Cost Plus** | Justify improvement costs; show cost avoidance |
| **IDIQ** | Build FOE into task order approach |

### Building Trust with Government Counterparts

- **Transparency**: Share real metrics, including problems
- **No surprises**: Communicate issues before they escalate
- **Shared goals**: Frame everything in mission terms
- **Evidence**: Let data make the case
- **Patience**: Government decision cycles are longer

## Engagement Checklist

Use this checklist to assess your organizational engagement:

### Protected Time
- [ ] Improvement time is explicitly allocated
- [ ] Time codes or budget lines exist for improvement work
- [ ] Improvement time is protected when delivery pressure increases
- [ ] Improvement work is visible and tracked

### Organizational Priority
- [ ] Leadership has explicitly stated FOE as a priority
- [ ] FOE practices are included in performance expectations
- [ ] Resources are allocated to FOE work
- [ ] Competing priorities are actively managed

### Clear Ownership
- [ ] Each institution has a named owner
- [ ] Owners have authority to match their accountability
- [ ] Ownership is recognized and rewarded
- [ ] Bus factor > 1 for all critical functions

### Light Governance
- [ ] Contribution standards are documented
- [ ] Quality gates are automated where possible
- [ ] Gates enable speed, not block it
- [ ] Standards evolve based on feedback

### Developer Experience
- [ ] DevX metrics are tracked
- [ ] Friction reduction is legitimate improvement work
- [ ] Developers have input into practice design
- [ ] Practices are regularly evaluated for DevX impact

## Sustaining Engagement

Engagement isn't a one-time achievement—it requires ongoing attention:

- **Regular communication**: Keep stakeholders informed of progress and challenges
- **Visible metrics**: Dashboard showing health and improvement
- **Celebration of wins**: Recognize progress, not just completion
- **Honest retrospectives**: Address what's not working
- **Continuous adaptation**: Evolve practices as context changes
- **Leadership reinforcement**: Regular visible support from sponsors

:::tip
The goal is to make FOE "how we work here"—not a special initiative, but the normal way of doing things.
:::

## Conclusion

Organizational engagement is the difference between FOE as a successful transformation and FOE as another failed initiative. The five operating constraints—protected time, organizational priority, clear ownership, light governance, and DevX—are non-negotiable. Without them, even the best technical practices will wither.

Invest in engagement. Build your coalition. Communicate relentlessly. And remember: you're changing culture, not just process. That takes time, persistence, and patience.
