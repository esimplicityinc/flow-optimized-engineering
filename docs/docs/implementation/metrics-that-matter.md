---
sidebar_position: 4
title: "Metrics That Matter"
---

# Metrics That Matter

Measurement is essential to improvement—but measuring the wrong things is worse than not measuring at all. FOE takes a disciplined approach to metrics: measure what matters, ignore what doesn't, and never let metrics become the goal.

## The Via Negativa Doctrine

FOE applies Via Negativa to metrics: we're clear about what we **don't** optimize for.

### What We Don't Chase

| Anti-Metric | Why It's Harmful |
|-------------|-----------------|
| **Velocity as primary metric** | Velocity measures motion, not progress. Optimizing for velocity incentivizes small stories, gaming estimates, and cutting corners. |
| **Lines of code** | More code is not better code. This metric incentivizes verbosity and discourages refactoring. |
| **Number of commits** | Commit count measures activity, not value. It incentivizes splitting work artificially. |
| **Hours worked** | Input doesn't equal output. This metric incentivizes presence over productivity. |
| **Features shipped** | Feature count ignores quality, adoption, and impact. It incentivizes shipping over solving problems. |

:::warning
**Goodhart's Law**: "When a measure becomes a target, it ceases to be a good measure."

Any metric you optimize for will be gamed. Choose metrics carefully and never let them become the sole measure of success.
:::

### What We Don't Do

- **Race to the bottom on cost**: Cheap code is expensive in the long run
- **Measure value by volume**: Quality over quantity, always
- **Optimize for local metrics**: Team metrics that hurt system outcomes
- **Reward heroes**: Metrics that celebrate individual firefighting over systemic improvement

## Evidence Is the Currency of Trust

In FOE, metrics serve one primary purpose: **providing evidence** that practices are working.

### Evidence-Based Decision Making

Instead of opinions and intuitions, FOE uses metrics to answer:

- Is this practice actually improving outcomes?
- Are we making progress or just moving?
- Where should we focus improvement efforts?
- Is this change having the intended effect?

### The Evidence Hierarchy

| Evidence Type | Strength | Example |
|--------------|----------|---------|
| **Production data** | Strongest | Deployment frequency from CI/CD logs |
| **Automated metrics** | Strong | Test coverage from tooling |
| **Systematic surveys** | Medium | Developer satisfaction surveys (regular, consistent) |
| **Anecdotal feedback** | Weak | "It feels faster" |
| **Assumptions** | None | "This should help" |

:::tip
When someone claims a practice is working (or not working), ask: "What's the evidence?" If there's no evidence, there's no claim—only opinion.
:::

## DORA Metrics in FOE Context

The four DORA (DevOps Research and Assessment) metrics provide a well-researched foundation:

### 1. Deployment Frequency

**What it measures**: How often you successfully release to production.

**Why it matters**: Frequent deployment indicates small batches, low risk, and high confidence.

**FOE context**: 
- Phase 1-2: Monthly or less
- Phase 3: Weekly
- Phase 4-5: Daily or multiple times daily

**How to measure**: Count production deployments over time.

### 2. Lead Time for Changes

**What it measures**: Time from code commit to production deployment.

**Why it matters**: Short lead time indicates efficient pipelines and low friction.

**FOE context**:
- Phase 1-2: Days to weeks
- Phase 3: Hours to days
- Phase 4-5: Minutes to hours

**How to measure**: Track timestamps from commit to deploy.

### 3. Mean Time to Recovery (MTTR)

**What it measures**: How long it takes to restore service after an incident.

**Why it matters**: Fast recovery indicates resilience and good operational practices.

**FOE context**:
- Phase 1-2: Days
- Phase 3: Hours
- Phase 4-5: Minutes

**How to measure**: Track incident start to resolution time.

### 4. Change Failure Rate

**What it measures**: Percentage of deployments that cause incidents.

**Why it matters**: Low failure rate indicates quality practices and good testing.

**FOE context**:
- Phase 1-2: &gt;15%
- Phase 3: 5-15%
- Phase 4-5: &lt;5%

**How to measure**: Track incidents attributed to recent deployments.

### DORA Metric Relationships

```
                    High Performers
                         ▲
                         │
   Deployment ──────────►│◄─────── Lead Time
   Frequency (high)      │         (low)
                         │
                         │
   Change Failure ──────►│◄─────── MTTR
   Rate (low)            │         (low)
                         │
                         ▼
                    Low Performers
```

All four metrics correlate. Improving one typically improves the others. Sacrificing one for another indicates a problem.

## FOE-Specific Metrics

Beyond DORA, FOE tracks metrics specific to the three optimizations:

### Developer Flow Metrics

| Metric | What It Measures | Target Direction |
|--------|-----------------|------------------|
| **Context switches per day** | Interruption frequency | Lower |
| **Time to first commit** | Onboarding efficiency | Lower |
| **PR review turnaround** | Collaboration friction | Lower |
| **Build wait time** | CI/CD efficiency | Lower |
| **Environment setup time** | DevX quality | Lower |

### Organizational Learning Metrics

| Metric | What It Measures | Target Direction |
|--------|-----------------|------------------|
| **Recurring incidents** | Learning effectiveness | Lower |
| **Time to implement lessons** | Improvement velocity | Lower |
| **Knowledge article usage** | Documentation value | Higher |
| **Cross-training coverage** | Bus factor risk | Higher |
| **Experimentation rate** | Innovation capacity | Higher |

### System Stability Metrics

| Metric | What It Measures | Target Direction |
|--------|-----------------|------------------|
| **Escaped defects** | Quality gate effectiveness | Lower |
| **Technical debt ratio** | Codebase health | Stable/Lower |
| **Security vulnerability age** | Security hygiene | Lower |
| **Dependency currency** | Maintenance health | Higher |
| **Test suite reliability** | Test trustworthiness | Higher |

## Leading vs. Lagging Indicators

Understanding the difference is crucial for effective improvement:

### Lagging Indicators

Measure outcomes after the fact:
- Production incidents
- Customer complaints
- Missed deadlines
- Developer turnover

**Useful for**: Understanding overall health, demonstrating improvement

**Not useful for**: Guiding daily decisions, early warning

### Leading Indicators

Predict future outcomes:
- Test coverage trends
- PR review time
- Build success rate
- Code review thoroughness

**Useful for**: Early intervention, daily guidance

**Not useful for**: Proving improvement to stakeholders (requires patience)

### Balanced Dashboard

```
┌────────────────────────────────────────────────────┐
│                 FOE METRICS DASHBOARD               │
├────────────────────────────────────────────────────┤
│                                                     │
│  LEADING INDICATORS          LAGGING INDICATORS    │
│  ──────────────────          ─────────────────     │
│  Build pass rate: 94%        Deploy freq: 8/week   │
│  PR review time: 2.1 hrs     Lead time: 4.2 hrs    │
│  Test coverage: 78%          MTTR: 45 min          │
│  Dependency age: 12 days     Change fail: 4%       │
│                                                     │
│  TRENDS                                            │
│  ──────                                            │
│  [Sparklines showing 30-day trends]                │
│                                                     │
└────────────────────────────────────────────────────┘
```

## Avoiding Goodhart's Law

Metrics inevitably get gamed. Here's how to minimize the damage:

### Use Metric Sets, Not Single Metrics

Never optimize for one metric in isolation:

| If You Only Measure... | Teams Will... |
|----------------------|---------------|
| Deployment frequency | Deploy empty changes |
| Test coverage | Write meaningless tests |
| PR turnaround | Rubber-stamp reviews |
| Velocity | Game story points |

**Solution**: Use balanced scorecards with complementary metrics that catch gaming.

### Measure Outcomes, Not Activity

| Activity Metric | Outcome Metric |
|-----------------|----------------|
| PRs merged | Value delivered |
| Tests written | Defects caught |
| Deployments made | Uptime maintained |
| Meetings attended | Decisions made |

### Rotate Metrics

Don't measure the same things forever:
- Primary metrics become gamed
- Problems shift over time
- What matters in Phase 2 differs from Phase 4

### Keep Metrics as Tools, Not Goals

:::tip
Metrics should inform decisions, not make them. A metric that says "deploy more frequently" doesn't tell you how. Human judgment remains essential.
:::

## Implementing Metrics

### Start Simple

Begin with metrics you can collect automatically:
- Git commit data
- CI/CD pipeline logs
- Incident tracking systems
- Calendar data

Avoid metrics that require manual collection—they won't be maintained.

### Make Metrics Visible

- Dashboard visible to the team
- Regular review in team meetings
- Trends over time, not just current values
- Context for what "good" looks like

### Act on Metrics

Metrics without action are vanity metrics:
- What will you do differently based on this metric?
- Who is responsible for acting on this metric?
- What's the threshold that triggers action?

## GovCon: Performance Measurement and Reporting

:::tip[GovCon Insight]
Government contracts often include formal performance measurement requirements. FOE metrics map well to standard government frameworks while providing more actionable insight.
:::

### Mapping to Government Metrics

| Government Requirement | FOE Metric | Evidence |
|-----------------------|------------|----------|
| SLA compliance | MTTR, Change failure rate | Incident logs |
| Delivery performance | Deployment frequency, Lead time | Pipeline data |
| Quality metrics | Test coverage, Escaped defects | Test reports, incident analysis |
| Process compliance | Gate pass rates | CI/CD logs |

### Contract Reporting

Structure periodic reports around:

1. **Executive Summary**: Overall health indicators
2. **DORA Metrics**: Industry-standard benchmarks
3. **Trend Analysis**: Direction of travel
4. **Improvement Initiatives**: Actions taken and results
5. **Risk Indicators**: Early warning metrics

### Award Fee/Incentive Fee Considerations

When metrics tie to contract incentives:
- Ensure metrics are objectively measurable
- Use balanced sets to prevent gaming
- Include quality alongside speed
- Build in periodic metric review and adjustment

### Performance Work Statement (PWS) Language

When writing PWS metrics requirements:

```
The contractor shall measure and report monthly:
- Deployment frequency to production environments
- Mean lead time from code commit to production
- Mean time to restore service after incidents
- Change failure rate (deployments causing incidents)

Targets shall be established during transition and 
improved quarterly based on industry benchmarks 
and continuous improvement practices.
```

## Metrics Maturity by Phase

What to measure varies by phase:

| Phase | Primary Metrics Focus |
|-------|----------------------|
| **Phase 1** | Basic availability, deployment success rate |
| **Phase 2** | Build success rate, basic test coverage |
| **Phase 3** | DORA metrics, quality gates effectiveness |
| **Phase 4** | Full DORA, developer experience metrics |
| **Phase 5** | Business outcomes, experimentation metrics |

:::warning
Don't implement Phase 4 metrics in Phase 2. You'll measure things you can't yet improve, creating frustration without insight.
:::

## Metrics Review Checklist

When implementing or reviewing metrics:

- [ ] Does this metric measure outcomes, not just activity?
- [ ] Can this metric be collected automatically?
- [ ] Is this metric part of a balanced set?
- [ ] Is there a clear action we'll take based on this metric?
- [ ] Who is accountable for this metric?
- [ ] How will we prevent gaming?
- [ ] Is this metric appropriate for our current phase?
- [ ] Do we have a baseline to measure against?
- [ ] Is the metric visible to the team?
- [ ] Is there a review cadence to assess metric relevance?

## Conclusion

Metrics are powerful tools that can drive improvement or drive dysfunction. FOE's approach—Via Negativa for what not to measure, evidence-based decision making, balanced scorecards, and continuous vigilance against gaming—keeps metrics in their proper place: servants of improvement, not masters of behavior.

Remember: the goal is better software delivery, not better metrics. Metrics are the map, not the territory. Use them wisely.
