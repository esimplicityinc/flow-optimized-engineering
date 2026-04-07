---
observationId: O225
displayed_sidebar: fieldGuideSidebar
sidebar_position: 3
title: "Accelerate: Automated Pipelines Outperform Manual Approval Processes"
status: completed
source_type: external
source:
  authors: ["Nicole Forsgren", "Jez Humble", "Gene Kim"]
  organization: "DORA / Google Cloud"
  year: 2018
  url: "https://dora.dev"
methods:
  - M250
---

import RelatedMethods from '@site/src/components/RelatedMethods';

# Accelerate: Automated Pipelines Outperform Manual Approval Processes

> **Source:** Forsgren, Humble & Kim (2018) | DORA Research Program

The DORA research program's multi-year study of 39,000+ technology professionals establishes that automated deployment pipelines — used as the sole path to production and the primary verification authority — outperform manual approval processes on every measured dimension. Teams with external change approval boards have *worse* change failure rates than teams that rely on pipeline automation, peer review, and continuous delivery practices.

## Context

**Environment:**
- Organization: DORA (now part of Google Cloud)
- Lead Researcher: Dr. Nicole Forsgren, PhD (Management Information Systems)
- Timeline: 2014–2025 (11+ years of continuous research)
- Sample: 39,000+ professionals across the program; 23,000+ data points analyzed for the Accelerate book

**The Problem:**
Most organizations rely on manual approval gates — change advisory boards (CABs), release management committees, architecture review boards — to control what reaches production. The assumption: human review prevents failures. In practice, these gates slow delivery, batch changes into larger (riskier) releases, and create a false sense of security. Meanwhile, the pipeline itself — the automated system that builds, tests, and deploys code — is treated as a tool rather than an authority. Teams bypass it for hotfixes, skip verification steps under deadline pressure, and maintain shadow deployment paths that circumvent automated checks.

**Research Questions:**
- Do external change approval processes improve change failure rates?
- Does automated pipeline verification predict delivery performance better than manual approval?
- What deployment practices distinguish elite performers from low performers?
- Does continuous delivery — which requires pipeline authority — predict organizational outcomes beyond delivery speed?

## Hypothesis

> "If teams use an automated deployment pipeline as the sole path to production and the verification authority for change quality — replacing external change approval boards with automated testing, peer review, and pipeline-enforced gates — then they will achieve higher deployment frequency, lower change failure rates, and faster recovery, because automated verification is faster, more consistent, and more reliable than manual approval."

**Variables:**
- Independent: Change approval mechanism (external CAB vs. automated pipeline + peer review); degree of pipeline authority (sole path vs. bypassable); continuous delivery capability
- Dependent: Deployment frequency, lead time for changes, change failure rate, mean time to recovery, organizational performance, burnout

## Approach

### Methodology
- **Design:** Quasi-observational field research using psychometric surveys
- **Analysis:** Structural Equation Modeling (SEM), cluster analysis
- **Validation:** Scientifically validated, reliable survey measures
- **Academic Rigor:** Lead researcher holds PhD in Management Information Systems; research affiliate at Clemson University and Florida International University

### Relevant Capabilities Studied

The DORA model identifies 24 capabilities that predict high performance. Several directly address pipeline authority and change approval:

| Capability | Relationship to Pipeline Authority |
|------------|-----------------------------------|
| **Continuous Delivery** | Requires the pipeline to be the authoritative path — code is always deployable, and the pipeline determines readiness |
| **Deployment Automation** | The pipeline executes deployments; manual deployment is eliminated |
| **Lightweight Change Approval** | Peer review and automated checks replace external approval boards |
| **Continuous Testing** | The pipeline runs comprehensive automated tests as verification gates |
| **Monitoring and Observability** | Post-deployment pipeline verification uses production telemetry to confirm health |
| **Proactive Notification** | The pipeline alerts teams to failures rather than waiting for manual detection |

### Data Collection
- Annual State of DevOps surveys (2014–2025)
- Cross-industry sample: technology, finance, retail, government, healthcare
- Cluster analysis to identify performance tiers (Elite, High, Medium, Low)
- Specific survey items on change approval processes, deployment automation, and testing practices

## Results

### Quantitative Results: Change Approval Processes

The research directly compares change approval approaches and their effect on delivery performance and stability:

| Approval Approach | Effect on Delivery Performance | Effect on Change Failure Rate |
|-------------------|-------------------------------|-------------------------------|
| External change approval board (CAB) | **Slows delivery** significantly | **No improvement** — failure rates equal or worse |
| Peer review + automated testing | Maintains delivery speed | **Improves** stability |
| Pipeline-enforced automated gates | Enables on-demand deployment | **Lowest** failure rates |

This is the research's most counterintuitive finding: external approval boards do not reduce failures. Teams that route changes through CABs have change failure rates comparable to or worse than teams that rely on automated pipeline verification and peer review. The approval process adds latency without adding safety.

*Source: Accelerate, Chapter 7 — Management Practices for Software*

### Quantitative Results: Elite vs. Low Performers

Elite performers use the pipeline as the sole deployment mechanism. Low performers rely on manual processes and approval gates:

| Metric | Elite Performers | Low Performers | Differential |
|--------|-----------------|----------------|-------------|
| Deployment Frequency | On-demand (multiple/day) | Between once/month and once/6 months | **208x** |
| Lead Time for Changes | Less than 1 hour | Between 1 month and 6 months | **106x** |
| Change Failure Rate | 0–15% | 46–60% | **7x** lower |
| Mean Time to Recovery | Less than 1 hour | Between 1 week and 1 month | **2,604x** faster |

*Source: State of DevOps Reports 2015–2019*

Deploying multiple times per day is only possible when the pipeline is the sole path and its verification is trusted. No team achieves elite-tier deployment frequency while routing changes through manual approval boards.

### Quantitative Results: Loosely Coupled Architecture + Automated Pipelines

Teams that combine loosely coupled architecture with automated pipeline deployment outperform those without:

| Metric | Loosely Coupled + Automated Pipeline | Significance |
|--------|--------------------------------------|--------------|
| Meet reliability targets | **3x more likely** | Statistically significant |
| Deploy independently | Without cross-team coordination | Defining characteristic |
| Make large-scale changes | Without depending on other teams | Enables autonomy |

*Source: Accelerate, Chapter 5 — Architecture*

The combination matters. Loosely coupled architecture enables independent deployment, but only if the pipeline enforces and verifies that independence. Without pipeline authority, architectural decoupling degrades as teams introduce ad-hoc deployment paths.

### Continuous Delivery as a Statistical Predictor

The research uses Structural Equation Modeling to establish that continuous delivery capabilities — which require the pipeline to be authoritative — statistically predict:

| Outcome | Relationship |
|---------|-------------|
| Higher delivery performance | Statistically significant predictor |
| Lower deployment pain | Statistically significant predictor |
| Lower burnout | Statistically significant predictor |
| Higher organizational performance | Mediated through delivery performance |

Continuous delivery, by definition, requires the pipeline to be the sole deployment mechanism. Code must be deployable at any time through the pipeline. If teams can bypass the pipeline, they do not have continuous delivery — they have automated builds with manual overrides.

### Monitoring and Observability as Verification Authority

The DORA research identifies monitoring and observability as a capability that predicts continuous delivery outcomes:

| Monitoring Practice | Role in Pipeline Authority |
|--------------------|---------------------------|
| Application performance monitoring | Pipeline verifies post-deployment health |
| Infrastructure monitoring | Pipeline confirms environment stability |
| Alerting on SLO violations | Pipeline triggers automated rollback |
| Log aggregation and analysis | Pipeline detects anomalies humans would miss |

Teams with comprehensive monitoring treat the pipeline's post-deployment verification as authoritative. The pipeline does not just deploy code — it confirms the deployment is healthy. This replaces the manual "smoke test" or "sanity check" that operations teams traditionally perform after a release.

## Analysis

### What the Research Establishes

1. **External change approval boards do not improve stability.** This is the research's sharpest finding on pipeline authority. CABs exist to prevent bad changes from reaching production. The data shows they fail at this goal while slowing delivery. The pipeline's automated verification — tests, health checks, SLO monitoring — catches problems that human reviewers miss, and catches them faster.

2. **The pipeline must be the sole path, not just a tool.** Elite performers do not treat the pipeline as one of several deployment options. It is the only way code reaches production. This eliminates shadow deployment paths, ensures every change passes through the same verification, and makes the deployment process auditable and repeatable.

3. **Automated verification outperforms human verification.** Automated tests run the same checks every time, at machine speed, without fatigue or bias. Human reviewers in a CAB meeting cannot replicate the coverage of a comprehensive test suite. The research shows that peer review (focused, contextual, by the team that wrote the code) combined with automated testing produces better outcomes than external board review.

4. **Pipeline authority enables deployment frequency.** On-demand deployment — multiple times per day — requires trusting the pipeline's verdict. If every deployment needs a human sign-off, the maximum deployment frequency is bounded by the approval process's throughput. Removing this bottleneck is a prerequisite for elite performance.

5. **Post-deployment verification closes the feedback loop.** The pipeline's authority extends beyond pre-deployment gates. Monitoring, health checks, and SLO verification after deployment confirm that the change is safe in production. This is the "verification authority" aspect: the pipeline determines system health, not a human performing manual checks.

### FOE Insights

**Understanding:**
The DORA research clarifies why manual approval processes persist despite their ineffectiveness: they provide the *appearance* of control. A CAB meeting feels like governance. An automated pipeline feels like a machine. But the data shows the machine is better at the job. Teams that understand this distinction stop investing in approval theater and start investing in pipeline verification — better tests, better monitoring, better automated gates. The pipeline becomes the authority not because someone declared it so, but because its verification is more trustworthy than any alternative.

**Feedback:**
Pipeline authority directly determines feedback speed. When the pipeline is the sole path, every change gets the same automated feedback — tests, security scans, performance checks — within minutes. When changes route through a CAB, feedback is delayed by days or weeks, and the feedback itself is lower quality (a human reviewer scanning a change request cannot match the coverage of automated tests). Elite performers achieve lead times under one hour because the pipeline provides immediate, comprehensive feedback. The pipeline's post-deployment monitoring extends this feedback loop into production: teams learn within minutes whether a deployment is healthy, rather than waiting for user reports.

**Confidence:**
The research builds confidence in a specific architectural decision: making the pipeline authoritative. The 7x lower change failure rate among elite performers demonstrates that automated pipeline verification produces better outcomes than manual approval. The 2,604x faster recovery shows that pipeline-driven rollback (automated, triggered by monitoring) outperforms manual incident response. Teams gain confidence not from a committee's approval stamp, but from the pipeline's comprehensive, repeatable verification. This confidence compounds: teams that trust the pipeline deploy more often, which means smaller changes, which means easier debugging, which means even more trust in the pipeline.

## Limitations

- **Survey-based data:** Self-reported measures introduce potential response bias; teams may overestimate their automation maturity or underreport manual approval processes
- **Correlation, not causation:** SEM establishes statistical relationships but cannot prove that pipeline authority directly causes better outcomes; teams with strong pipelines may differ in other ways (culture, funding, talent)
- **"Pipeline authority" is inferred, not directly measured:** The research measures continuous delivery capability, deployment automation, and change approval processes separately — the concept of "pipeline as sole path and verification authority" is a synthesis of these findings, not a single measured variable
- **Cross-sectional design:** Each annual survey captures a point-in-time snapshot; the research does not track individual teams before and after adopting pipeline authority
- **Context variation:** Results aggregate across industries and company sizes; regulated industries may face compliance requirements that constrain how pipeline authority can be implemented
- **CAB definition varies:** "External change approval board" may mean different things across organizations — from a rubber-stamp meeting to a rigorous technical review — and the research does not distinguish between these
- **Survivorship effects:** Teams that successfully implement pipeline authority may have had stronger engineering foundations to begin with

## Conclusion

### Verdict
**Strongly Supported** — The DORA research provides the most rigorous large-scale empirical evidence available that automated pipeline verification outperforms manual approval processes. The finding that external change approval boards do not improve change failure rates — combined with the finding that continuous delivery capabilities predict elite performance — establishes high confidence that pipeline authority is a structural prerequisite for high-performing delivery organizations.

### Key Learnings

1. **Manual approval boards do not reduce failures.** The data is unambiguous: external CABs correlate with slower delivery and no improvement in stability. The approval process adds latency without adding safety.
2. **The pipeline's verification is more reliable than human review.** Automated tests, health checks, and SLO monitoring catch problems that CAB reviewers miss. Peer review by the authoring team provides the contextual judgment that automation cannot.
3. **Sole path enforcement prevents drift.** When the pipeline is bypassable, teams bypass it — especially under pressure. Making it the only path ensures consistent verification for every change.
4. **Post-deployment verification is as important as pre-deployment gates.** The pipeline's authority extends into production. Monitoring-driven rollback catches issues that pre-deployment tests miss, especially in distributed systems.
5. **Pipeline authority enables, rather than constrains, team autonomy.** When the pipeline determines deployment readiness, teams do not need permission from external boards. They deploy when the pipeline says the change is safe.

### Recommendation

**Apply this when:**
- Arguing against heavyweight change advisory boards that slow delivery without improving quality
- Designing deployment pipelines that serve as the sole path to production
- Building post-deployment verification into the pipeline (health checks, SLO monitoring, automated rollback)
- Establishing the pipeline as the verification authority that replaces manual sign-off
- Making the case that automated gates provide better governance than human approval processes

**Watch out for:**
- Removing all human review — peer review by the authoring team remains valuable; the research argues against *external* approval boards, not against code review
- Insufficient test coverage — pipeline authority only works if the pipeline's verification is comprehensive; a pipeline that runs no tests is not an authority
- Ignoring regulatory requirements — some industries require documented approval processes; the pipeline can satisfy these requirements if its verification is auditable
- Treating pipeline authority as a binary switch — most teams adopt it incrementally, starting with automated testing and gradually reducing manual gates as confidence in the pipeline grows
- Emergency bypass without learning — hotfix paths that bypass the pipeline should be rare, tracked, and followed by retrospective analysis

### FOE Application

The DORA evidence directly supports the "Definitive Deployment Pipeline" method (M250). The research demonstrates that the two aspects of pipeline authority — sole path and verification authority — are among the strongest predictors of elite delivery performance.

| DORA Finding | FOE Principle | Implication for M250 |
|-------------|---------------|----------------------|
| CABs do not improve change failure rates | Understanding | Pipeline verification is more trustworthy than manual approval — teams must understand this to stop investing in approval theater |
| Elite teams deploy on-demand (multiple/day) | Fast Feedback | Only possible when the pipeline is the sole path and its verdict is trusted |
| CD predicts lower burnout | Fast Feedback | Routine, pipeline-driven deployments reduce the stress of high-stakes manual releases |
| Loosely coupled teams + automated pipelines meet reliability targets 3x more | Confidence | Pipeline authority combined with architectural independence produces measurable reliability gains |
| Monitoring and observability predict CD outcomes | Confidence | Post-deployment pipeline verification — the "verification authority" aspect — closes the feedback loop into production |
| 7x lower change failure rate among elite performers | Confidence | Automated pipeline verification produces better outcomes than manual approval on the metric CABs are designed to improve |

---

## References

- Forsgren, N., Humble, J., & Kim, G. (2018). *Accelerate: The Science of Lean Software and DevOps: Building and Scaling High Performing Technology Organizations*. IT Revolution Press.
- State of DevOps Reports (2014–2025). Available at [dora.dev/research](https://dora.dev/research)
- DORA Capabilities: [dora.dev/capabilities](https://dora.dev/capabilities)
- Humble, J. & Farley, D. (2010). *Continuous Delivery: Reliable Software Releases through Build, Test, and Deployment Automation*. Addison-Wesley.
- Forsgren, N. et al. (2021). "The SPACE of Developer Productivity." *ACM Queue*, 19(1).

---
