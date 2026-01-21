---
sidebar_position: 4
title: "Technology Changes"
---

# Technology Changes

Technology is the most visible part of FOE transformation—and the most dangerous to lead with. The right technology enables the disciplines; the wrong approach turns technology into expensive shelfware. This section covers key technologies, why they matter, and how to adopt them in service of flow.

## The Cardinal Rule

**Technology serves the disciplines. The disciplines don't serve technology.**

You don't adopt Kubernetes because it's modern. You adopt it because it enables deployment frequency, environment consistency, and resource efficiency that your disciplines require.

Every technology decision should answer: "What discipline does this enable, and how?"

## Core Technology Stack

### Container Orchestration: Kubernetes

**What it is:** A platform for running containerized workloads that handles scheduling, scaling, networking, and lifecycle management.

**Why it matters for FOE:**
- **Consistency** - Same deployment artifact runs everywhere
- **Declarative state** - Define what you want, let Kubernetes achieve it
- **Self-healing** - Automatic restart, rescheduling, replacement
- **Scaling** - Horizontal scaling based on demand
- **Resource efficiency** - Better utilization than dedicated VMs

**Enables these disciplines:**
- Deployment automation (consistent deployment target)
- Resilience (self-healing, rolling updates)
- Cost optimization (efficient resource use)

**Adoption caution:** Kubernetes is complex. Adopt it when you need its benefits, not because it's popular. For simple workloads, managed services may provide better flow.

### GitOps: ArgoCD

**What it is:** A controller that watches Git repositories and reconciles Kubernetes cluster state to match what's declared in Git.

**Why it matters for FOE:**
- **Git as source of truth** - All state is version controlled
- **Automated sync** - Changes in Git automatically apply
- **Audit trail** - Git history shows who changed what when
- **Drift detection** - Alerts when actual state differs from declared
- **Rollback** - Revert Git, revert the system

**Enables these disciplines:**
- Change management (every change is a commit)
- Deployment automation (no manual kubectl)
- Recovery (rollback is git revert)
- Compliance (complete audit trail)

**How ArgoCD enables flow:**
```
Developer commits → PR review → Merge to main → ArgoCD detects → 
Sync to cluster → Health check → Done (or auto-rollback)
```

No manual deployment steps. No "who deployed what" confusion.

### Observability: OpenTelemetry

**What it is:** A standard for collecting telemetry data (traces, metrics, logs) from applications and infrastructure.

**Why it matters for FOE:**
- **Vendor neutral** - Not locked to one observability platform
- **Correlation** - Traces connect logs and metrics
- **Context propagation** - Follow requests across services
- **Standardization** - Consistent instrumentation across languages

**Enables these disciplines:**
- Incident response (faster root cause identification)
- Performance optimization (understand where time goes)
- Capacity planning (measure actual resource use)
- SLO management (measure what matters)

**The three pillars:**

| Pillar | Question it Answers | Example |
|--------|---------------------|---------|
| **Metrics** | What is happening? | Request rate: 1000 req/s |
| **Logs** | Why did it happen? | Error: connection refused to database |
| **Traces** | Where did it happen? | Request spent 2s in payment service |

### Package Management: Helm

**What it is:** A package manager for Kubernetes that templates and manages application deployments.

**Why it matters for FOE:**
- **Reusable templates** - Don't repeat Kubernetes manifests
- **Configuration management** - Values files for different environments
- **Versioning** - Chart versions track deployment configurations
- **Ecosystem** - Large library of pre-built charts

**Enables these disciplines:**
- Consistency (same chart, different values)
- Deployment automation (helm upgrade in pipeline)
- Configuration management (values in Git)

**Helm in a GitOps workflow:**
ArgoCD can deploy Helm charts directly, combining Helm's templating with ArgoCD's automation.

### Service Mesh

**What it is:** Infrastructure layer that handles service-to-service communication, providing features like encryption, observability, and traffic management.

**Common implementations:** Istio, Linkerd, Cilium Service Mesh

**Why it matters for FOE:**
- **mTLS everywhere** - Encrypted service communication by default
- **Traffic control** - Canary deployments, traffic splitting
- **Observability** - Request metrics without code changes
- **Resilience** - Retries, timeouts, circuit breakers

**Enables these disciplines:**
- Security (encryption without app changes)
- Deployment safety (gradual rollouts)
- Observability (network-level metrics)
- Resilience (automatic retry/timeout policies)

**Adoption caution:** Service mesh adds operational complexity. Adopt when you need its specific capabilities (mTLS requirement, traffic splitting, network-level observability), not as a default choice.

### API Gateways

**What it is:** Entry point for external traffic that handles authentication, rate limiting, routing, and protocol translation.

**Common implementations:** Kong, Ambassador, AWS API Gateway, Apigee

**Why it matters for FOE:**
- **Single entry point** - Consistent external interface
- **Authentication** - Handle auth in one place
- **Rate limiting** - Protect services from overload
- **Routing** - Direct traffic without exposing internal structure

**Enables these disciplines:**
- Security (authentication, authorization at edge)
- Resilience (rate limiting, circuit breaking)
- Observability (centralized access logs)

### Policy Enforcement: Open Policy Agent (OPA)

**What it is:** A general-purpose policy engine that makes policy decisions based on structured data.

**Why it matters for FOE:**
- **Policy as Code** - Policies are versioned, tested, reviewed
- **Decoupled decisions** - Separate policy from enforcement point
- **Consistent enforcement** - Same policy engine everywhere
- **Audit capability** - Policy decisions are logged

**Where OPA enforces:**

| Enforcement Point | What it Controls |
|-------------------|------------------|
| **Kubernetes admission** | What can be deployed |
| **API gateway** | Who can access what |
| **CI pipeline** | What can be built/released |
| **Infrastructure provisioning** | What resources can be created |

**Example policies:**
- No containers running as root
- All services must have resource limits
- No public S3 buckets
- All images must come from approved registry

**Enables these disciplines:**
- Compliance (automated policy enforcement)
- Security (guardrails without gatekeepers)
- Governance (consistent rules across environments)

## Technology Adoption Principles

### Adopt Technology for Specific Capabilities

Don't adopt technology because it's modern or popular. Adopt it because:
1. You have a specific problem
2. The technology solves that problem
3. The benefit exceeds the adoption cost

For each technology, ask:
- What problem does this solve?
- What does it cost to adopt and operate?
- What alternatives exist?
- Is the problem worth solving now?

### Start with Managed Services

When possible, use managed services before self-managing:

| Self-Managed | Managed Alternative |
|--------------|---------------------|
| Kubernetes (kubeadm) | EKS, GKE, AKS |
| Prometheus/Grafana | Managed Prometheus, Datadog |
| ArgoCD | CodeFresh, Harness |
| Vault | AWS Secrets Manager, cloud KMS |

Managed services let you get benefits without operational burden. Self-manage when you need specific capabilities or have the expertise.

### Technology Debt is Real

Adopting technology creates ongoing obligations:
- Upgrades and patches
- Security vulnerabilities
- Training and expertise
- Integration maintenance

Before adopting, consider the full cost:
- Acquisition (often the smallest part)
- Implementation
- Operation
- Eventual migration or decommission

### Beware Resume-Driven Development

Engineers naturally want to work with interesting technology. This creates pressure to adopt technology for career reasons rather than business need.

Counter this by:
- Requiring capability-based justification
- Evaluating simpler alternatives first
- Making technology decisions as team decisions
- Acknowledging the dynamic ("this is cool, but do we need it?")

:::tip[GovCon Insight]
**Technical Approach Justification**

Government acquisitions often require justifying technical choices. Frame technology decisions in terms the customer understands:

**Kubernetes:**
- Portability across cloud providers (avoid vendor lock-in)
- Industry standard with broad talent availability
- Mature security controls and compliance tooling

**GitOps (ArgoCD):**
- Complete audit trail for all changes (compliance)
- Automated deployment reduces human error
- Declarative configuration enables disaster recovery

**OpenTelemetry:**
- Vendor-neutral standard (avoid observability lock-in)
- Comprehensive visibility for security monitoring
- Industry adoption means long-term viability

**OPA:**
- Automated compliance enforcement
- Policy as code enables review and audit
- Consistent controls across environments

**FedRAMP/Compliance-Friendly Choices:**

| Concern | Technology Approach |
|---------|---------------------|
| **Audit trail** | GitOps (all changes in Git) |
| **Encryption in transit** | Service mesh (mTLS) |
| **Access control** | OPA + API gateway |
| **Vulnerability management** | Container scanning in CI |
| **Configuration management** | Infrastructure as Code |
| **Monitoring** | OpenTelemetry + SIEM integration |

When writing technical volumes:
1. Lead with the capability, not the tool name
2. Explain how the technology meets requirements
3. Reference FedRAMP authorized options where available
4. Show compliance mapping (control → technology)
:::

## Integration Patterns

These technologies work together:

```
                    ┌─────────────────────────────────────────┐
                    │              External Users              │
                    └─────────────────────────────────────────┘
                                       │
                                       ▼
                    ┌─────────────────────────────────────────┐
                    │     API Gateway (auth, rate limiting)    │
                    └─────────────────────────────────────────┘
                                       │
                                       ▼
                    ┌─────────────────────────────────────────┐
                    │     Service Mesh (mTLS, observability)   │
                    │  ┌─────────┐  ┌─────────┐  ┌─────────┐  │
                    │  │Service A│  │Service B│  │Service C│  │
                    │  └─────────┘  └─────────┘  └─────────┘  │
                    └─────────────────────────────────────────┘
                                       │
                                       ▼
                    ┌─────────────────────────────────────────┐
                    │  Kubernetes (orchestration, scheduling)  │
                    └─────────────────────────────────────────┘
                         ▲                          ▲
                         │                          │
          ┌──────────────┴──────┐      ┌───────────┴──────────┐
          │                     │      │                      │
   ┌──────┴──────┐       ┌──────┴──────┴┐       ┌─────────────┴─┐
   │   ArgoCD    │       │     OPA       │       │ OpenTelemetry │
   │   (GitOps)  │       │   (Policy)    │       │ (Observability)│
   └──────┬──────┘       └───────────────┘       └───────────────┘
          │
          ▼
   ┌─────────────┐
   │     Git     │
   │  (Helm +    │
   │   Values)   │
   └─────────────┘
```

## Technology Selection Checklist

Before adopting new technology:

- [ ] **Problem defined** - What specific problem does this solve?
- [ ] **Alternatives evaluated** - What other options exist? Why is this better?
- [ ] **Total cost understood** - Acquisition, implementation, operation, training?
- [ ] **Expertise available** - Do we have/can we get the skills?
- [ ] **Exit strategy** - How would we migrate away if needed?
- [ ] **Compliance considered** - Does this meet our regulatory requirements?
- [ ] **Integration mapped** - How does this fit with existing technology?
- [ ] **Operational readiness** - Can we support this in production?
