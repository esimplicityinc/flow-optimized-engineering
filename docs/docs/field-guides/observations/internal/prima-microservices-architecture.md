---
displayed_sidebar: fieldGuideSidebar
sidebar_position: 3
title: "Prima Platform Microservices Architecture"
status: completed
source_type: internal
methods:
  - architecture/methods/established/true-microservices
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

**Key Contributors:**
- **Aaron West** - Control Tower lead, ADR author (ADR-002 Load Balancer), top contributor to CT and platform infrastructure
- **Matt Wartell** - Engine lead, top contributor to Engine, author of Issue #397 (monorepo consideration)
- **David Greene** - Cross-service integration, authored revert commit 89af615 (credential passing complexity)
- **Kevin Song** - Platform/deployment, identified production crash Issue #209
- **Thomas Mason** - Engine architecture, authored Issue #285 (MCP extraction) and Issue #248 (adapter error handling)
- **Lada Semicheva** - API development, assigned to Issue #388 (pagination anti-pattern)

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
| Control Tower | Yes | Separate repo, CI/CD, container; no runtime dependency on Engine |
| Engine | **Partial** | Separate repo, CI/CD, container; BUT readiness check requires Control Tower |
| Web | **Partial** | Separate repo; needs Control Tower for auth |
| Frontend (any) | Yes | ADR-004 explicitly enables independent UI releases |

**Critical Finding: Engine Runtime Dependency**

Engine's readiness check explicitly requires Control Tower to be available:

```python
# From aiox/readiness.py
async def readiness_report():
    redis_ok, redis_details = await check_redis_dependencies()
    tower_ok, tower_details = await check_tower_dependency()
    healthy = redis_ok and tower_ok  # Engine is NOT healthy if Tower is down!
```

This means **Engine cannot report healthy if Control Tower is unavailable**, creating a runtime coupling that violates the "deploy without talking to anyone else" litmus test.

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

### What Didn't Work: Infrastructure Gaps

The architecture has the **shape** of microservices (separate repos, ADRs, containers) but lacks **supporting infrastructure** that true microservices require:

| Missing Infrastructure | Impact | Evidence |
|----------------------|--------|----------|
| **Circuit breakers** | Engine fails when Tower is unavailable instead of degrading gracefully | `readiness.py` hard-fails on Tower check |
| **Graceful degradation** | No cached/offline mode for Engine when Tower is down | No fallback in `control_tower.py` adapter |
| **API versioning** | API changes require coordinated deployment | No `/v1/`, `/v2/` versioning in Tower APIs |
| **Shared secret coordination** | `SERVICE_JWT_SECRET` must be identical across services | Commit `a57c46a5` shows manual sync required |
| **Feature reverts from coupling** | Cross-service features have been reverted due to complexity | Commit `89af615` reverted 408 lines of credential passing |

**The 773-line Control Tower Adapter**

Engine's `control_tower.py` adapter (773 lines) has detailed knowledge of Control Tower's internal API structure:
- Workspace models
- Prima models and guardrails
- Tool providers and credentials
- Pagination patterns

This is a **distributed monolith signal**: when Service A has intimate knowledge of Service B's internal structure, API changes in B require coordinated changes in A.

### GitHub Issues: Qualitative Evidence

Analysis of GitHub issues across prima-* repositories reveals coordination challenges:

**Monorepo Consideration (Issue #397, Matt Wartell):**
> "Prompted by **customer deployment concerns**, we want to move Prima to a **monorepo**."

This is direct evidence that the distributed architecture creates deployment friction. Matt's perspective as Engine lead—having built the 773-line Tower adapter—gives weight to this assessment.

**Cross-Service Coordination Required:**

| Issue | Author | Evidence |
|-------|--------|----------|
| CT #398 | Kevin Song | "Work **alongside** prima-web issue #176" - explicit cross-repo coordination |
| Web #176 | Kevin Song | Keycloak integration requires simultaneous changes to CT, Web, Engine |
| CT #388 | Matt Wartell | Pagination anti-pattern shows tight API coupling (assigned to Lada Semicheva) |
| Engine #248 | Thomas Mason | Tower adapter error handling complexity needs normalization |

**Production Incidents from Architecture:**

| Issue | Author | Impact |
|-------|--------|--------|
| Prima #209 | Kevin Song | "Prod CT crashing due to large usage data size" - Engine data overwhelmed CT |
| CT #381 | (team) | CORS errors between services in production |
| CT #383 | (team) | Logout redirect issues across service boundaries |

**Contradictory Directions:**
- Issue #285 (Thomas Mason) proposes MORE extraction: "Separate Engine MCP into Dedicated Container"
- Issue #397 (Matt Wartell) proposes LESS separation: "Merge engine and tower to one repo"

The team is being pulled in opposite directions, suggesting the architecture's costs and benefits are still being evaluated. Notably, both perspectives come from experienced contributors who understand the tradeoffs firsthand.

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
**Supported** - The Prima platform architecture provides strong evidence for the True Microservices method by demonstrating both what works AND what's missing. The architecture has the right **shape** (separate repos, ADRs, containers, platform services) but reveals the **cost** of not investing in supporting infrastructure (circuit breakers, graceful degradation, API versioning).

**Key insight:** The gap between Prima's microservices aspiration and its operational reality validates the method's claim that true microservices require more than just service separation—they require investment in resilience infrastructure. Issue #397 ("merge to monorepo prompted by customer deployment concerns") is direct evidence that without this investment, teams will reconsider the architecture.

**Classification:** Hub-and-spoke with microservices shape but distributed monolith characteristics. This makes it valuable evidence for what true microservices need to succeed.

### Key Learnings

1. **True microservices = shape + supporting infrastructure:** Separate repos and containers are necessary but not sufficient; you also need circuit breakers, graceful degradation, and API versioning
2. **Customer deployment experience is a litmus test:** Issue #397 shows that without supporting infrastructure, customers experience deployment friction that prompts reconsideration of the architecture
3. **Runtime dependencies reveal true coupling:** Engine's readiness check requiring Tower exposes the real architecture vs. the intended architecture—this is what the method warns about
4. **Heavy adapters are a distributed monolith signal:** The 773-line adapter validates the method's claim that intimate API knowledge creates coupling
5. **"Merge back" discussions validate the method:** When teams consider merging services back together (Issue #397), it's evidence that the microservices investment was incomplete
6. **Control/Data plane separation provides value even with coupling:** The security boundary works for ATO despite other coupling issues—some microservices benefits are achievable without full independence

### Recommendation

**Apply this architectural approach when:**
- Multiple teams will work on different aspects of the platform
- Deployment flexibility across environments is required
- Security/compliance requires clear system boundaries
- Different components have different scaling or lifecycle requirements

**Also invest in supporting infrastructure:**
- **Circuit breakers:** Services should degrade gracefully when dependencies are unavailable
- **API versioning:** Enable independent API evolution without coordinated deployments
- **Cached/offline modes:** Critical paths should work with stale data when dependencies are slow
- **Contract testing:** Detect API breaking changes before deployment, not in production

**Watch out for:**
- **Heavy adapter code** is a distributed monolith signal—if one service needs 773 lines to talk to another, you have coupling
- **Readiness checks on dependencies** create runtime coupling—consider health checks that allow degraded operation
- **Shared secrets** require coordination; consider secret management that doesn't require synchronized deployment
- **Feature reverts** due to cross-service complexity suggest the coupling is real, not theoretical

### Future Observations

1. **Measure actual deployment independence:** Track how often Engine and Tower are deployed together vs. separately
2. **Quantify coordination overhead:** How many PRs touch multiple repos? How long do cross-service features take?
3. **Implement circuit breakers:** Document the impact of adding graceful degradation to Engine
4. **API versioning experiment:** Try versioned APIs and measure whether it reduces coordination

---

<RelatedMethods />
