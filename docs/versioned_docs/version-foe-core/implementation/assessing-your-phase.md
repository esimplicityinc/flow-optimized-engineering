---
sidebar_position: 2
title: "Assessing Your Current Phase"
---

# Assessing Your Current Phase

Honest self-assessment is the foundation of effective transformation. This guide provides frameworks for determining where you actually are, not where you wish you were or where your slide deck says you are.

## The Honesty Imperative

:::warning
The most common assessment failure is optimism bias. Teams consistently rate themselves 1-2 phases higher than reality. This isn't dishonesty; it's human nature. But it leads to prescriptions that don't fit your actual condition.
:::

Assessment rules:
1. **Evidence over aspiration**: If you can't show it, you don't have it
2. **Consistency over capability**: Doing something once doesn't count
3. **Team over individual**: One expert doesn't elevate the whole team
4. **Production over intention**: What actually happens, not what should happen

## Phase Symptoms Checklist

Use these checklists to identify your current phase. Be honest: check only what is **consistently true** for your team.

### Phase 1: Chaotic

You're likely in Phase 1 if:

- [ ] Deployments require specific individuals who "know how it works"
- [ ] There's no consistent version control workflow
- [ ] Testing is manual and inconsistent
- [ ] "It works on my machine" is a common phrase
- [ ] Knowledge exists only in people's heads
- [ ] Integration is painful and avoided
- [ ] Production incidents are frequent and recovery is slow
- [ ] Onboarding new developers takes months

**Phase 1 summary**: Hero-dependent, unpredictable, high-stress.

### Phase 2: Emerging

You're likely in Phase 2 if:

- [ ] Version control is used but workflows are inconsistent
- [ ] Some automated tests exist but coverage is low
- [ ] CI exists but is flaky or frequently bypassed
- [ ] Deployments are scripted but manual
- [ ] Documentation exists but is often outdated
- [ ] Some standards exist but enforcement is inconsistent
- [ ] Integration happens but is still painful
- [ ] A few key people still hold critical knowledge

**Phase 2 summary**: Foundational practices exist but aren't reliable.

### Phase 3: Defined

You're likely in Phase 3 if:

- [ ] Consistent version control workflow (branching strategy, PR process)
- [ ] Meaningful test coverage with tests that actually catch bugs
- [ ] CI runs on every commit and failures block merges
- [ ] Deployments are automated but may require approval gates
- [ ] Standards are documented and generally followed
- [ ] Code review is consistent and valuable
- [ ] Integration is frequent (at least daily)
- [ ] Knowledge is documented and discoverable

**Phase 3 summary**: Consistent practices, verification mindset, sustainable pace.

### Phase 4: Measured

You're likely in Phase 4 if:

- [ ] Deployments happen multiple times per day
- [ ] Comprehensive automated testing at all levels
- [ ] Full CI/CD pipeline with automated gates
- [ ] Monitoring and alerting provide early warning
- [ ] Metrics drive decisions (not opinions)
- [ ] Recovery from incidents is fast and automated
- [ ] Technical debt is actively managed
- [ ] Continuous improvement is systematic

**Phase 4 summary**: Quantified, predictable, data-driven.

### Phase 5: Optimized

You're likely in Phase 5 if:

- [ ] Deployment is a non-event (happens constantly, automatically)
- [ ] Testing is comprehensive and fast
- [ ] Infrastructure is fully automated and self-healing
- [ ] Proactive identification and resolution of issues
- [ ] Experimentation is safe and encouraged
- [ ] Improvement is continuous and organic
- [ ] Knowledge flows freely and documentation stays current
- [ ] New team members are productive quickly

**Phase 5 summary**: Continuous improvement is the natural state.

## Diagnostic Questions

Answer these questions honestly to calibrate your assessment:

### Deployment

| Question | Phase 1-2 | Phase 3 | Phase 4-5 |
|----------|-----------|---------|-----------|
| How often do you deploy to production? | Monthly or less | Weekly | Daily or more |
| How long from "code complete" to production? | Days to weeks | Hours to days | Minutes to hours |
| What percentage of deployments cause incidents? | &gt;15% | 5-15% | &lt;5% |
| Can any team member deploy? | No, specialists only | Yes, with approval | Yes, automatically |

### Testing

| Question | Phase 1-2 | Phase 3 | Phase 4-5 |
|----------|-----------|---------|-----------|
| What's your test coverage? | &lt;30% or unknown | 50-70% | &gt;80% |
| How long does your test suite take? | &gt;30 min or N/A | 10-30 min | &lt;10 min |
| Do you trust your tests to catch bugs? | No | Somewhat | Yes |
| When was the last test added? | Don't remember | This week | Today |

### Integration

| Question | Phase 1-2 | Phase 3 | Phase 4-5 |
|----------|-----------|---------|-----------|
| How often do developers integrate? | Weekly or less | Daily | Multiple times daily |
| How painful is integration? | Very | Manageable | Painless |
| How often do merge conflicts block work? | Frequently | Sometimes | Rarely |
| How long do branches live? | Weeks | Days | Hours |

### Recovery

| Question | Phase 1-2 | Phase 3 | Phase 4-5 |
|----------|-----------|---------|-----------|
| How long to recover from a production incident? | Hours to days | 1-4 hours | &lt;1 hour |
| How often do the same issues recur? | Frequently | Sometimes | Rarely |
| Is rollback automated? | No | Partially | Fully |
| Do you have runbooks for common issues? | No | Some | Comprehensive |

## Common Self-Deceptions

Watch for these patterns that indicate your assessment may be inflated:

### "We have CI/CD" (But...)
- The pipeline exists but is frequently bypassed
- Failures don't actually block deployment
- Only one person understands how it works
- It hasn't been updated in months

**Reality check**: CI/CD that isn't trusted and used isn't CI/CD.

### "We have automated testing" (But...)
- Tests exist but don't catch real bugs
- Coverage is concentrated in easy-to-test areas
- Tests are flaky and often ignored
- Writing tests is "optional" under pressure

**Reality check**: Tests that don't change behavior aren't providing value.

### "We deploy frequently" (But...)
- Deployments happen but cause incidents
- "Deployment" means to staging, not production
- Frequency varies wildly based on who's available
- Some components deploy frequently, others are stuck

**Reality check**: Inconsistent or risky deployment isn't mature deployment.

### "We're agile" (But...)
- Sprint ceremonies happen but practices don't change
- Stories are done but quality suffers
- Retrospectives identify issues that never get fixed
- "Agile" means "no documentation"

**Reality check**: Agile ceremony without agile discipline is theater.

### "We have standards" (But...)
- Standards are documented but not followed
- Enforcement depends on who's reviewing
- Standards were written once and never updated
- There are many exceptions and workarounds

**Reality check**: Standards without consistent enforcement aren't standards.

## The Phase 3 Litmus Test

Phase 3 is the critical transition point. Here's a simple test:

:::tip
**The Phase 3 Question**: If your best engineer left tomorrow, would the team's practices remain the same?

- **No**: You're in Phase 1-2 (hero-dependent)
- **Yes**: You might be in Phase 3+ (institutionalized)
:::

Phase 3 is characterized by:
- Practices that exist independent of individuals
- Verification built into the workflow, not bolted on
- Consistency that doesn't require vigilance
- Documentation that reflects reality

## Assessment Template

Use this template to document your assessment:

```markdown
## Team Assessment: [Team Name]
## Date: [Date]
## Assessed by: [Names]

### Current Phase: [1-5]

### Evidence Supporting This Assessment:
1. [Specific observable behavior]
2. [Specific metric or measurement]
3. [Specific consistent practice]

### Areas of Strength:
- [What's working well]

### Areas Requiring Improvement:
- [What's missing for next phase]

### Honest Acknowledgments:
- [What we wish were true but isn't]
- [Where we've been optimistic]

### Recommended Focus:
- [1-3 specific improvements for next phase]
```

## GovCon: As-Is Analysis Methodology

:::tip[GovCon Insight]
In government proposals, "as-is" analysis is a standard requirement. Use the FOE phase framework to provide a structured, defensible assessment that demonstrates analytical rigor.
:::

### Structuring As-Is Analysis for Proposals

When using FOE assessment in proposals:

1. **Current State Documentation**
   - Use the phase framework as an organizing structure
   - Provide evidence for each assessment
   - Be honest about gaps (credibility over optimism)

2. **Gap Analysis**
   - Map current phase to target phase
   - Identify specific gaps to address
   - Quantify the gap where possible

3. **Transition Planning**
   - Sequence improvements logically
   - Provide realistic timelines
   - Identify dependencies and risks

### Assessment Interview Protocol

When conducting as-is assessments on new contracts:

| Stakeholder | Questions to Ask |
|-------------|-----------------|
| Developers | What's your daily workflow? What's frustrating? What would you fix? |
| Tech Leads | How do you ensure quality? What metrics do you track? What keeps you up at night? |
| Management | How do you measure success? What's your biggest delivery challenge? |
| Operations | How often do things break? How do you recover? What's automated? |

### Documentation Deliverables

Standard as-is deliverables for government contracts:

- **Current State Assessment**: Phase rating with evidence
- **Process Documentation**: As-is workflows and practices
- **Gap Analysis**: Current vs. target state
- **Risk Assessment**: Risks of current state and transition
- **Recommendation Report**: Prioritized improvement roadmap

## Reassessment Cadence

Assessment isn't a one-time event:

| Cadence | Purpose |
|---------|---------|
| Quarterly | Full phase reassessment |
| Monthly | Progress check on improvement initiatives |
| Continuous | Metric monitoring for drift |

:::warning
Phase regression is real. Without continuous attention, teams naturally drift backward. Regular assessment catches regression early.
:::

## Next Steps After Assessment

Once you've honestly assessed your phase:

1. **Accept where you are**: No shame in Phase 1; shame is in pretending otherwise
2. **Identify the next phase requirements**: What specific gaps need closing?
3. **Prioritize ruthlessly**: You can't fix everything at once
4. **Build institutions**: Create mechanisms that make improvement stick
5. **Measure progress**: Track leading indicators of phase transition

The goal isn't to reach Phase 5 as fast as possible. The goal is to make sustainable progress, one phase at a time, with each phase's foundations solid before building the next level.
