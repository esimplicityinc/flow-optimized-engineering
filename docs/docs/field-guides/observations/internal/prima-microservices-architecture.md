---
sidebar_position: 3
title: "Prima Platform Microservices Architecture"
status: completed
source_type: internal
methods:
  - architecture/methods/emerging/true-microservices
---

import RelatedMethods from '@site/src/components/RelatedMethods';

# Prima Platform Microservices Architecture

> **Status:** Completed

The Prima platform evolved into a true microservices architecture with independently deployable subsystems (Control Tower, Engine, Web), shared platform services via stable APIs (Kong, Redis, Auth0), and explicit control plane / data plane separation—enabling teams to deploy without coordination while maintaining governance.

## Context

**Environment:**
- Project: Prima Platform (esimplicityinc/prima-*)
- Team: Prima Engineering
- Timeline: June 2025 - January 2026

**The Problem:**
Prima needed to serve federal missions requiring data sovereignty, ATO compliance, and multi-environment deployment flexibility. A monolithic approach would have created:
- Single point of failure for diverse AI capabilities
- Inability to isolate sensitive data plane operations from control plane
- Deployment coupling that prevented independent team velocity
- Difficulty meeting enclave and FedRAMP requirements

**Constraints:**
- Federal ATO requirements demanding clear security boundaries
- Multi-environment deployment (single-tenant, hybrid, eventual SaaS)
- Different scaling requirements for AI execution vs. configuration management
- Multiple teams working on different subsystems

## Hypothesis

> "If we architect Prima as true microservices with independent subsystems, shared platform services, and clear plane separation, then teams can deploy independently and the platform can flex across deployment models (single-tenant → hybrid → SaaS) because coupling is explicit and minimized."

**Variables:**
- Independent (what changed): Architecture decomposed into separate subsystems with API boundaries
- Dependent (what should improve): Deployment independence, ATO approval, team velocity, environment flexibility

## Approach

### Setup
The Prima engineering team established Architecture Decision Records (ADRs) to document key structural choices, then implemented them across separate repositories.

### Execution

**1. Subsystem Decomposition**

| Subsystem | Repository | Purpose | Deployment |
|-----------|------------|---------|------------|
| Control Tower | `prima-control_tower` | Control plane - config, policies, RBAC, audit trails | Independent container |
| Engine | `prima-engine` | Data plane - AI/ML execution, agent orchestration | Independent container |
| Web | `prima-web` | User-facing application | Independent frontend + backend containers |
| Platform | `prima-platform` | Infrastructure automation | Terraform/Helm |

**2. Control Plane / Data Plane Separation (ADR-002)**

> "Control Tower as the system of record for all control-plane functions... Place AI execution, mission workloads, and data processing in the Data Plane within the customer boundary."

This explicitly separates:
- **Control Plane (Control Tower):** Configuration, policies, RBAC, audit trails—can be hosted centrally
- **Data Plane (Engine):** AI execution, sensitive data processing—stays within customer boundary

**3. Three-Tier Architecture Per Subsystem (ADR-004)**

Each subsystem follows three-tier separation:
- Presentation tier (frontend container)
- Application tier (backend container)
- Data tier (separate database)

Rationale from ADR: "Limit blast radius, improve observability and control points, simplify compliance narratives, support horizontal scalability, minimize cross-tier coupling."

**4. API Gateway Aggregation (ADR-005)**

Kong serves as the north-south API gateway:
- Single domain aggregates all subsystems (`https://api.<env>.<agency>.gov/...`)
- Each subsystem routes independently
- Istio handles east-west (mesh) traffic

Key insight: "Single API domain, many routed backends—gives agencies a more governable edge surface while maintaining flexibility for Prima to grow, version APIs, and onboard new subsystems without triggering new DNS requests."

**5. Asynchronous Communication (ADR-006)**

Redis/Celery provides decoupled communication between Control Tower and Engine:
- Task orchestration without synchronous dependencies
- Language-agnostic message schemas for future extensibility
- Failure isolation between subsystems

**6. Shared Platform Services**

| Service | Purpose | Access Pattern |
|---------|---------|----------------|
| Kong | API Gateway | Stable API routes |
| Redis | Message broker | Celery task queues |
| Auth0 | Identity | OAuth2/OIDC |
| OTLP Collector | Telemetry | OpenTelemetry export |

### Measurement
- ADR acceptance and implementation
- Independent CI/CD pipelines per subsystem
- Deployment events showing subsystem independence

## Results

### Qualitative Results

**Independence Litmus Test Applied:**

| Subsystem | Can deploy without coordination? | Evidence |
|-----------|----------------------------------|----------|
| Control Tower | Yes | Separate repo, CI/CD, container |
| Engine | Yes | Separate repo, CI/CD, container |
| Web | Yes | Separate repo, CI/CD, containers |
| Frontend (any) | Yes | ADR-004 explicitly enables independent UI releases |

**Platform Services via APIs (not shared databases):**

| Shared Service | Access Method | Coupling Type |
|----------------|---------------|---------------|
| PostgreSQL | Each subsystem owns its own instance | Explicit ownership |
| Redis | Message broker API | Async, decoupled |
| Auth0 | OAuth2 protocol | Standardized API |
| Kong | Route configuration | Declarative, GitOps |

**ADR-002 Load Balancer explicitly states:**
> "Each app maintains autonomy — separate backends, isolated services."

### What the Architecture Enables

1. **Multi-environment flexibility:** Same architecture works for single-tenant, hybrid, and eventual SaaS
2. **ATO-friendly boundaries:** Clear security perimeter per subsystem
3. **Independent team velocity:** Engine team can release without Web team coordination
4. **Blast radius containment:** Engine failure doesn't affect Control Tower
5. **ML workload isolation:** Heavy dependencies containerized separately (see: Presidio observation)

## Analysis

### What Worked

- **Explicit ADRs before implementation:** Decisions were documented and rationale captured
- **Platform services via APIs:** Kong, Redis, Auth0 provide shared capabilities without coupling
- **Control/Data plane separation:** Enables different deployment models for different sensitivity levels
- **Three-tier per subsystem:** Each subsystem can scale tiers independently

### What Surprised Us

- **ADR discipline paid off:** Having explicit decisions documented made it easier to explain architecture to security reviewers
- **Kong aggregation reduced ops burden:** Single DNS entry for multiple subsystems simplified certificate and WAF management
- **Async decoupling enabled language flexibility:** ADR-006 explicitly plans for multi-language agent runtimes

### FOE Insights

**Understanding:**
The architecture makes system boundaries explicit and visible. ADRs capture the "why" behind structural decisions. New team members can read ADR-002 to understand control/data plane separation rather than reverse-engineering from code.

**Feedback:**
Independent deployment enables faster feedback loops. When Engine team wants to test a new ML model, they don't wait for Control Tower release cycle. Each subsystem has its own CI/CD pipeline with isolated test suites.

**Confidence:**
Blast radius containment increases confidence to make changes. If a Presidio container fails (as it did in October 2025), it doesn't bring down Control Tower. The Kong + Istio architecture provides defense-in-depth at the edge.

## Limitations

- **Not a controlled experiment:** Architecture evolved organically; no "before" state to compare
- **Team velocity not measured:** We believe teams move faster independently, but no quantitative evidence
- **Operational complexity:** More subsystems = more to monitor and deploy
- **Coordination still needed sometimes:** Cross-cutting features (like new auth flows) require alignment
- **Early stage:** Architecture is ~6 months old; long-term maintenance patterns unknown

## Conclusion

### Verdict
**Supported** - The Prima platform architecture demonstrates true microservices principles in practice: independent deployment, shared platform services via APIs (not databases), explicit plane separation, and team ownership alignment. The ADR documentation provides clear rationale for why these decisions were made.

### Key Learnings

1. **Document decisions early:** ADRs captured architecture rationale before implementation, making it easier to evaluate and explain
2. **Platform services via APIs:** Kong, Redis, and Auth0 provide shared capabilities without creating coupling
3. **Control/Data plane separation:** Essential for federal/sensitive environments; enables deployment flexibility
4. **Three-tier per subsystem:** Enables independent scaling and faster UI iterations
5. **Independence litmus test passes:** Each subsystem can deploy without coordinating with others

### Recommendation

**Apply this when:**
- Multiple teams will work on different aspects of the platform
- Deployment flexibility across environments is required
- Security/compliance requires clear system boundaries
- Different components have different scaling or lifecycle requirements

**Watch out for:**
- Cross-cutting features still require coordination
- Operational complexity increases with subsystem count
- Platform services (Kong, Redis) become critical dependencies
- Need clear ownership model for shared infrastructure

### Future Observations

1. **Measure team velocity:** Quantify deployment frequency per subsystem
2. **Cross-cutting feature coordination:** Document how auth or telemetry changes are coordinated
3. **Operational overhead:** Track incident response time across vs. within subsystems
4. **Scaling behavior:** Observe independent scaling of Engine vs. Control Tower under load

---

<RelatedMethods />
