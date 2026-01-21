---
sidebar_position: 3
title: "Process Changes"
---

# Process Changes

Process is how work flows through your organization. In FOE transformation, process changes move you from manual coordination and heavyweight governance toward continuous delivery and lightweight institutions that make good behavior the default path.

## From CI to Continuous Delivery

Most organizations stop at Continuous Integration (CI). FOE requires Continuous Delivery (CD).

### What CI Actually Provides

CI means every code change is:
- Automatically built
- Automatically tested
- Integrated with other changes frequently

CI proves your code *could* deploy. It doesn't prove you *can* deploy safely, quickly, or often.

### What CD Adds

CD means every code change is:
- Automatically deployable to production
- Actually deployed frequently (often multiple times per day)
- Deployed through a consistent, automated pipeline
- Monitored for success after deployment

The gap between CI and CD is where most organizations stall.

| Aspect | CI Only | Continuous Delivery |
|--------|---------|---------------------|
| **Artifact state** | "Potentially releasable" | Actually released |
| **Deployment** | Manual, scheduled, coordinated | Automated, continuous |
| **Release frequency** | Weeks or months | Days or hours |
| **Deployment risk** | High (big batches) | Low (small changes) |
| **Feedback speed** | Slow | Fast |
| **Rollback** | Painful, rare | Routine, automated |

### Bridging the Gap

Moving from CI to CD requires:

1. **Automated deployment pipelines:** No manual steps between merge and production
2. **Environment parity:** Dev, staging, and production behave the same
3. **Feature flags:** Decouple deployment from release
4. **Automated rollback:** Detect problems and recover automatically
5. **Observability:** Know immediately when something's wrong
6. **Trust:** Organizational confidence in the automation

## DevOps Practices That Enable Flow

### Everything as Code

If it's not in code, it doesn't exist reliably:
- **Infrastructure as Code:** Terraform, Pulumi, CloudFormation
- **Configuration as Code:** Helm values, Kubernetes manifests
- **Policy as Code:** OPA Rego, Sentinel
- **Documentation as Code:** Living docs that update with the system

Benefits:
- Version controlled (history, blame, rollback)
- Reviewable (pull requests for infrastructure)
- Testable (validate before apply)
- Reproducible (no snowflakes)

### GitOps Workflow

GitOps makes Git the single source of truth for system state:

1. Desired state is declared in Git
2. Automated controllers (ArgoCD, Flux) watch Git
3. Controllers reconcile actual state to desired state
4. All changes go through Git (auditable, reviewable)

This eliminates:
- "What's actually running in production?"
- "Who changed this and when?"
- "How do I reproduce this environment?"

### Trunk-Based Development

Long-lived branches are flow killers:
- Merge conflicts accumulate
- Integration is delayed and painful
- Feedback loops stretch
- Risk batches up

Trunk-based development:
- Everyone commits to main (trunk) frequently
- Branches are short-lived (hours, not weeks)
- Feature flags gate incomplete work
- Integration happens continuously

## Safety Institutions

"Institution" sounds heavy. In FOE, institutions are **lightweight mechanisms that make desired behavior the default path**.

### What Makes Something an Institution

An institution isn't just a policy or a tool. It's the combination of:
- **Mechanism:** The actual thing (tool, automation, process)
- **Defaults:** Configured so the safe/good path is easiest
- **Enforcement:** Deviations require deliberate action
- **Visibility:** Everyone can see the state

### FinOps: Team-Level Cost Control

Traditional cost control:
- Central team reviews spending monthly
- Alerts after overspending happens
- Teams have no visibility into their costs
- Optimization is someone else's problem

FinOps as institution:
- Teams see their costs in real-time
- Budgets are allocated to teams, not just projects
- Cost appears alongside other metrics (latency, errors)
- Optimization is team responsibility with central support

**Building the FinOps institution:**

| Component | Implementation |
|-----------|---------------|
| **Visibility** | Cost dashboards per team/service |
| **Attribution** | Tagging strategy that maps costs to teams |
| **Budgets** | Alerts before budgets are exceeded |
| **Incentives** | Teams keep efficiency gains |
| **Support** | Central expertise available, not mandated |

### Left-Shift Security

Traditional security:
- Security review at the end (before release)
- Penetration testing finds issues late
- Compliance is a milestone, not a practice
- Security is a separate team's concern

Left-shift security as institution:
- Security requirements in design
- Automated security scanning in CI
- Policy enforcement at deployment
- Compliance is continuous

**Building the left-shift security institution:**

| Stage | Security Mechanism |
|-------|-------------------|
| **Design** | Threat modeling templates, security architecture review |
| **Development** | SAST in IDE, dependency scanning, secrets detection |
| **Build** | Container scanning, SBOM generation |
| **Deploy** | Policy enforcement (OPA), admission control |
| **Runtime** | Behavioral monitoring, anomaly detection |

### Change Management (Lightweight)

Traditional change management:
- CAB meetings review all changes
- Paperwork for every deployment
- Approval chains that take days
- Emergency changes bypass the process entirely

Lightweight change management institution:
- Standard changes pre-approved (through automation)
- Pipeline is the change record
- Automated checks replace manual review
- Only exceptional changes need human approval

**The key insight:** Most changes should be standard (automated, pre-approved). If most of your changes are "exceptions," your standard process doesn't fit your work.

## Building and Sustaining Institutions

### Start with the Behavior You Want

Don't start with "we need a process for X." Start with:
- What behavior do we want to be easy?
- What behavior should require deliberate effort?
- How will we know if it's working?

### Make the Default Path the Good Path

If the right thing is harder than the wrong thing, the wrong thing will happen:
- **Good:** Security scanning runs automatically; skipping it requires override
- **Bad:** Security scanning must be explicitly added to each pipeline

### Build Visibility In

Institutions work when the state is visible:
- Dashboards show current state
- Alerts flag deviations
- Reports show trends over time
- Everyone can see, not just managers

### Iterate on the Institution

Institutions aren't permanent. They need:
- Regular review (quarterly?): Is this still serving us?
- Feedback mechanisms: Are people working around it?
- Evolution: Update as the organization matures

:::tip[GovCon Insight]
**Compliance Process Modernization**

Government compliance processes often evolved before modern DevOps practices. Modernizing them is possible but requires intentional effort.

**ATO (Authority to Operate) Considerations:**

Traditional ATO:
- Point-in-time assessment
- Months of documentation
- Boundary-based (one ATO per system)
- Changes restart the clock

Modern ATO approaches:
- Continuous ATO (cATO): ongoing assessment integrated with delivery
- Infrastructure as Code: documentation is the code
- Inherited controls: platform provides controls, apps inherit
- Change management: automated changes are pre-assessed

**Making it work:**
1. Engage your ISSO/ISSM early and often
2. Build compliance evidence into pipelines (automated)
3. Map controls to automation (STIG scanning, policy enforcement)
4. Propose continuous monitoring as alternative to point-in-time
5. Document the process as part of the system

**Common objections and responses:**

| Objection | Response |
|-----------|----------|
| "We need to review every change" | "The pipeline reviews every change automatically, more consistently than humans can" |
| "How do we know it's secure?" | "Continuous scanning finds issues faster than periodic assessment" |
| "This isn't how we've done it" | "Let's pilot on one system and measure the results" |
| "The framework requires X" | "The framework requires the control; automation is a valid implementation" |
:::

## Process Anti-Patterns

### Process Debt

Like technical debt, process debt accumulates:
- Steps that made sense once but don't anymore
- Workarounds that became permanent
- Documentation nobody reads or updates
- Approvals nobody actually evaluates

**Signs of process debt:**
- People don't know why a step exists
- "We've always done it this way"
- Obvious workarounds are common
- The process takes much longer than the actual work

**Paying down process debt:**
- Review processes quarterly
- Ask "what would happen if we stopped doing this?"
- Remove steps that don't add value
- Simplify before automating

### Process Theater

Process theater is going through motions that don't accomplish their purpose:
- Code review where reviewers don't understand the code
- Security review that's really just a signature
- Testing that runs but doesn't catch bugs
- Documentation that exists but isn't read

**Process theater feels safe** (we did the thing!) **but provides no actual safety.**

**Fixing process theater:**
- Measure the outcome, not the activity
- Ask: "Would this catch the problem it's meant to catch?"
- Remove theater and invest in real controls
- Automate what can be automated

### Over-Engineering Process

The opposite of process debt: processes that are too heavy for the work:
- Three approvals for a one-line change
- Weeks of planning for a day of work
- Compliance overhead that exceeds development effort

**Right-size your process:**
- Match process weight to risk
- Standard changes (most changes) need minimal process
- Reserve heavyweight process for genuinely risky work
- Measure process time as part of lead time

## Measuring Process Health

| Metric | Indicates | Target Direction |
|--------|-----------|------------------|
| **Lead time** | Total time from commit to production | Reduce |
| **Deployment frequency** | How often you can safely deploy | Increase |
| **Change failure rate** | Deploys that cause incidents | Reduce |
| **Time to restore** | How long incidents last | Reduce |
| **Process time ratio** | Time in process vs. time working | Reduce process time |
| **Manual steps** | Count of human interventions | Reduce |
| **Escape rate** | Issues found in production vs. earlier | Reduce escapes |
