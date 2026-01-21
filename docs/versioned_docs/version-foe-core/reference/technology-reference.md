---
sidebar_position: 5
title: "Technology Reference"
---

# Technology Reference

Technologies that support Flow Optimized Engineering principles. This reference is evaluative, not prescriptive: it explains how technologies relate to FOE principles, not which specific products to choose.

**Important**: Technology serves flow. If a technology doesn't improve your ability to move from idea to learning, it's not worth adopting regardless of its features.

---

## Evaluation Framework

Before diving into categories, understand how to evaluate any technology through an FOE lens:

### Key Questions

1. **Does it reduce friction in the flow?** Technology should make the path from change to verification to release smoother, not add ceremony.

2. **Does it generate evidence automatically?** Good technology creates receipts, audit logs, metrics, traces, as byproducts of operation.

3. **Does it enable rather than enforce?** Guardrails are better than gates. Technology should make the right thing easy, not just block the wrong thing.

4. **Does it support measurement?** If you can't measure the impact, you can't know if it's working.

5. **Does it reduce cognitive load?** Technology should offload complexity from humans to systems.

### Red Flags

- Requires significant process change to match the tool's assumptions
- Generates more dashboards than insights
- Creates new silos or handoffs
- Requires dedicated specialists to operate
- Makes simple things harder in exchange for making complex things possible

---

## Container Orchestration

### What It Is

Systems that automate deployment, scaling, and management of containerized applications. Containers provide consistent, portable runtime environments; orchestration manages them at scale.

### How It Supports FOE

| FOE Principle | Container Orchestration Support |
|---------------|--------------------------------|
| Reproducibility | Same container runs in every environment |
| Cattle not pets | Containers are immutable and replaceable |
| Self-healing | Failed containers restart automatically |
| Declarative state | Desired state defined in configuration |
| Progressive rollout | Native support for rolling updates |

### Evaluation Criteria

- **Declarative configuration**: Can you define desired state in version-controlled files?
- **Self-healing**: Does it automatically recover from failures?
- **Observability integration**: Does it expose metrics and support distributed tracing?
- **Progressive deployment**: Does it support canary/blue-green deployments?
- **Operational complexity**: What's the cost of running the orchestration layer itself?

### Technology Landscape

**Kubernetes** is the dominant orchestration platform. Its strengths align well with FOE:
- Declarative, version-controllable desired state
- Rich ecosystem of supporting tools
- Strong observability integration
- Extensive policy enforcement options (admission controllers)

Kubernetes weaknesses to consider:
- Significant operational complexity
- Steep learning curve
- May be overkill for simple deployments

**Alternatives**:
- Managed Kubernetes (EKS, GKE, AKS) reduces operational burden
- Docker Swarm for simpler needs
- Serverless/FaaS for appropriate workloads
- HashiCorp Nomad for polyglot workloads

### FOE Fit Assessment

Container orchestration strongly supports FOE when:
- You need to run multiple services at scale
- You want cattle-style infrastructure
- You value declarative, reproducible deployments

Consider alternatives when:
- Operational complexity exceeds benefits
- Team lacks Kubernetes expertise and can't acquire it
- Workloads are simple enough for simpler solutions

---

## GitOps

### What It Is

An operational framework where Git is the single source of truth for declarative infrastructure and application definitions. Changes are made via pull requests, and automated systems ensure actual state matches desired state.

### How It Supports FOE

| FOE Principle | GitOps Support |
|---------------|----------------|
| Single source of truth | Git is the authoritative source |
| Receipts | Every change has a commit record |
| Reproducibility | Desired state is declarative and versioned |
| Audit trail | Git history provides complete audit |
| Rollback capability | Revert commit = rollback deployment |

### Evaluation Criteria

- **Reconciliation loop**: How quickly does actual state converge to desired state?
- **Drift detection**: Does it alert when actual state diverges from desired?
- **Multi-environment support**: Can you manage dev/staging/prod from a single source?
- **Secret handling**: How does it handle sensitive configuration?
- **Observability**: Can you see what's deployed and when?

### Technology Landscape

**ArgoCD** and **Flux** are the leading GitOps controllers for Kubernetes:

| Capability | ArgoCD | Flux |
|------------|--------|------|
| UI dashboard | Strong | Basic (weave-gitops) |
| Multi-tenancy | Strong | Strong |
| Helm support | Native | Native |
| Progressive delivery | Via Argo Rollouts | Via Flagger |
| Learning curve | Moderate | Moderate |

**Supporting technologies**:
- **Helm**: Package manager for Kubernetes, templated configuration
- **Kustomize**: Configuration customization without templating
- **Sealed Secrets / External Secrets**: Secure secret management in Git

### FOE Fit Assessment

GitOps is highly aligned with FOE principles. The main considerations:
- Requires discipline around Git workflows
- May need cultural change if teams are used to imperative operations
- Secret management requires additional tooling

---

## Observability

### What It Is

The ability to understand a system's internal state from its external outputs. Three pillars: metrics (what's happening quantitatively), logs (what happened specifically), and traces (what happened in sequence across services).

### How It Supports FOE

| FOE Principle | Observability Support |
|---------------|----------------------|
| Gauges | Metrics provide real-time instrumentation |
| Evidence | Observability generates proof of system behavior |
| Feedback loops | Fast insight into deployment impact |
| Operating envelope | Alerts when approaching boundaries |
| Blameless debugging | Data replaces blame |

### Evaluation Criteria

- **Unified data model**: Can you correlate metrics, logs, and traces?
- **Cardinality support**: Can it handle high-cardinality data (user IDs, request IDs)?
- **Query capability**: Can you ask new questions without new instrumentation?
- **Cost model**: How does cost scale with data volume?
- **Instrumentation burden**: How much code change required to instrument?

### Technology Landscape

**OpenTelemetry** is the emerging standard for instrumentation:
- Vendor-neutral instrumentation API
- Broad language support
- Automatic instrumentation available
- Separates instrumentation from backend choice

**Backend options** (store, query, visualize):

| Category | Options |
|----------|---------|
| Commercial | Datadog, New Relic, Dynatrace, Honeycomb, Lightstep |
| Open source | Prometheus + Grafana, Jaeger, Loki |
| Cloud-native | AWS CloudWatch, GCP Cloud Operations, Azure Monitor |

**Selection factors**:
- Budget (commercial vs. open source operational cost tradeoff)
- Scale requirements
- Team expertise
- Existing vendor relationships
- Specific features (APM, RUM, profiling)

### FOE Fit Assessment

Observability is foundational to FOE. You cannot optimize what you cannot measure. Specific considerations:

- Start with OpenTelemetry for instrumentation to avoid vendor lock-in
- Prefer unified platforms that correlate pillars over point solutions
- Budget for observability: it's not optional overhead
- Establish observability standards before they're needed in incidents

---

## Policy as Code

### What It Is

The practice of expressing organizational policies as executable, version-controlled code. Policies are evaluated automatically and enforced consistently.

### How It Supports FOE

| FOE Principle | Policy as Code Support |
|---------------|----------------------|
| Guardrails | Automated policy enforcement |
| Cognitive offloading | Developers don't need to remember policies |
| Receipts | Policy decisions are logged |
| Operating envelope | Policies define the envelope |
| Consistency | Same policy in every environment |

### Evaluation Criteria

- **Expression power**: Can you express your actual policies?
- **Integration points**: Where can policies be enforced?
- **Performance**: What's the latency impact of policy evaluation?
- **Testing**: Can you test policies before deploying them?
- **Debugging**: Can you understand why a policy denied something?

### Technology Landscape

**Open Policy Agent (OPA)** with **Rego** language is the dominant approach:
- General-purpose policy engine
- Works with Kubernetes admission, CI/CD, APIs, data systems
- Declarative policy language (Rego)
- Active community and ecosystem

**Integration points**:
- **Kubernetes**: Gatekeeper (OPA for admission control)
- **Terraform**: OPA policies on IaC changes
- **CI/CD**: Policy checks in pipelines
- **Service mesh**: Authorization policies

**Alternatives**:
- **Kyverno**: Kubernetes-native policy (YAML-based)
- **Sentinel**: HashiCorp's policy framework
- **Cloud-native**: AWS SCPs, GCP Organization Policies, Azure Policy

### FOE Fit Assessment

Policy as code transforms compliance from an audit activity to an automated discipline. Key considerations:

- Start with high-value, low-complexity policies
- Build policy testing into your workflow
- Ensure policy failures are actionable, not just rejections
- Version and review policies like application code

---

## Service Mesh

### What It Is

Infrastructure layer that handles service-to-service communication. Provides traffic management, security, and observability without changing application code.

### How It Supports FOE

| FOE Principle | Service Mesh Support |
|---------------|---------------------|
| Observability | Automatic metrics, traces, logs for all traffic |
| Security | mTLS, authorization without app changes |
| Progressive delivery | Traffic shifting, canary support |
| Resilience | Retries, timeouts, circuit breaking |
| Consistency | Uniform behavior across services |

### Evaluation Criteria

- **Operational complexity**: What's the cost of running the mesh?
- **Performance overhead**: What's the latency and resource impact?
- **Feature set**: Does it do what you need?
- **Adoption path**: Can you adopt incrementally?
- **Team capability**: Can your team operate it?

### Technology Landscape

| Mesh | Strengths | Considerations |
|------|-----------|----------------|
| **Istio** | Feature-rich, mature | Complex, resource-heavy |
| **Linkerd** | Simple, lightweight, CNCF | Fewer features than Istio |
| **Cilium** | eBPF-based, high performance | Newer, requires eBPF support |
| **Consul Connect** | Multi-platform, HashiCorp ecosystem | Smaller Kubernetes community |

**When to adopt**:
- Many services with complex communication patterns
- Need for zero-trust security
- Observability gaps in service communication
- Complex traffic management requirements

### FOE Fit Assessment

Service mesh is powerful but complex. For FOE:

- Don't adopt service mesh to solve problems you don't have
- Consider mesh features available in simpler forms (ingress controllers, client libraries)
- Plan for significant operational investment
- Start in non-critical environments

---

## Infrastructure as Code (IaC)

### What It Is

Managing infrastructure through version-controlled, declarative code rather than manual processes or scripts.

### How It Supports FOE

| FOE Principle | IaC Support |
|---------------|-------------|
| Reproducibility | Infrastructure defined, not remembered |
| Single source of truth | Git contains infrastructure definitions |
| Receipts | Changes tracked in version control |
| Testing | Infrastructure changes can be validated before apply |
| Consistency | Same code, same infrastructure |

### Evaluation Criteria

- **State management**: How is current state tracked?
- **Multi-cloud support**: Does it work across your environments?
- **Modularity**: Can you compose reusable components?
- **Drift detection**: Does it detect manual changes?
- **Ecosystem**: Are modules/providers available for your stack?

### Technology Landscape

**Terraform** is the dominant IaC tool:
- Declarative HCL language
- Broad provider ecosystem
- Strong state management
- Large community

**Alternatives and complements**:
- **Pulumi**: IaC in general-purpose languages (Python, TypeScript, Go)
- **AWS CDK / CDKTF**: Cloud-specific with higher-level abstractions
- **Crossplane**: Kubernetes-native infrastructure management
- **CloudFormation / ARM / Cloud Deployment Manager**: Cloud-specific native tools

### FOE Fit Assessment

IaC is essential for FOE. Infrastructure without code is infrastructure without discipline. Key practices:

- All infrastructure changes through code, no console clicking
- Review infrastructure changes like application changes
- Modularize for reuse and consistency
- Integrate with policy as code for guardrails

---

## Technology Selection Principles

### Don't Lead with Technology

The FOE technology selection process:

1. **Identify the flow constraint**: What's slowing you down?
2. **Define the outcome**: What should be true after improvement?
3. **Evaluate options**: Technology is one option among many
4. **Measure impact**: Did the technology achieve the outcome?

### Match Technology to Maturity

Not every organization needs every technology:

| FOE Phase | Technology Focus |
|-----------|------------------|
| Phase 1 | Basic CI/CD, version control, simple IaC |
| Phase 2 | GitOps, policy as code, standardized observability |
| Phase 3 | Service mesh, advanced progressive delivery |
| Phase 4+ | Custom platforms, automated optimization |

Adopting Phase 3 technology when you're at Phase 1 creates complexity without benefit.

### Prefer Boring Technology

New and shiny often means:
- Unknown failure modes
- Smaller talent pool
- Less documentation and community support
- Higher integration effort

"Boring" technology that's well-understood and well-supported often provides better flow than exciting technology that requires constant attention.

### Plan for Evolution

Technology choices aren't permanent. Plan for:
- Abstraction layers that isolate technology choices
- Capability to replace components as better options emerge
- Migration paths before you need them

---

## See Also

- [Pattern Library](/docs/reference/pattern-library): Patterns these technologies enable
- [Transformation Model](/docs/transformation-model/overview): When to adopt what
- [Glossary](/docs/reference/glossary): Term definitions
