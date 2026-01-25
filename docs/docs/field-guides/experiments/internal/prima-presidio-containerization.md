---
sidebar_position: 2
title: "Containerizing Heavy ML Dependencies"
status: completed
source_type: internal
methods: []
---

import RelatedMethods from '@site/src/components/RelatedMethods';

# Containerizing Heavy ML Dependencies

> **Status:** Completed

Extracting Presidio PII analyzer to a dedicated container removed ~663 lines of heavy ML dependencies (PyTorch, spaCy, transformers) from the main service, demonstrating that architectural separation of ML workloads improves build times and service maintainability.

## Context

**Environment:**
- Project: Prima Engine (esimplicityinc/prima-engine)
- Team: Matt Wartell
- Timeline: October 2025

**The Problem:**
The Invariant guardrails SDK embedded the Presidio PII analyzer directly into the main service, bringing along:
- PyTorch dependencies
- spaCy and transformers libraries
- A 0.4GB LLM model for PII identification

This created a bloated service image with slow startup times. Every build had to pull and package these heavy ML dependencies, even though PII detection was just one capability among many.

**Constraints:**
- MVP timeline pressure ("Slewing to MVP")
- Need to maintain existing PII detection functionality
- Changes needed to be invisible to end users

## Hypothesis

> "If heavy ML dependencies are containerized separately, then service startup time and image size decrease, because the main service doesn't carry the ML burden."

**Variables:**
- Independent (what changed): Presidio moved from embedded library to dedicated container
- Dependent (what should improve): Image size, build time, startup time, dependency complexity

## Approach

### Setup
1. Identify the Microsoft Container Registry (MCR) Presidio image: `mcr.microsoft.com/presidio-analyzer:2.2.360`
2. Design REST API interface to replace direct library calls

### Execution
1. Created dedicated REST API client (`aiox/presidio.py`) to communicate with containerized analyzer
2. Configured 30-second timeout to account for network latency between containers
3. Removed heavy dependencies from main service's `pyproject.toml`:
   - `presidio-analyzer`
   - `spacy`
   - `torch`
   - `transformers`
   - `blis`
   - `catalogue`
4. Added Presidio container to Docker Compose network as `presidio-analyzer:5002`
5. Created dedicated CI/CD pipeline: `.github/workflows/engine-presidio-cd.yml`
6. Changed import path from `invariant.detectors` to `aiox.presidio` (invisible to end users)

### Measurement
- Lines removed from `uv.lock` as proxy for dependency reduction
- PR review and merge as validation of approach

## Results

### Quantitative Results

| Metric | Before | After | Change |
|--------|--------|-------|--------|
| Lines in `uv.lock` | ~663 more | ~663 fewer | -663 lines |
| Heavy ML dependencies | 6 packages | 0 packages | -100% |
| PII detection containers | 0 (embedded) | 1 (dedicated) | +1 container |

### Qualitative Observations

- PR #153 merged October 22, 2025
- Import path change was invisible to end users
- Latent support for caching Invariant RuleSets was added as part of the refactor
- Dedicated CI/CD pipeline enables independent versioning and deployment

### Trade-off Acknowledged

From the PR description:
> "Were there but world enough and time, these changes would live in their own issues. Slewing to MVP, I wanted these changes to increase supportability more than I feared push-back from reviewers."

This acknowledges the pragmatic bundling of changes under time pressure while prioritizing supportability.

## Analysis

### What Worked
- Heavy ML dependencies successfully removed from main service
- PII detection functionality preserved via REST API
- Dedicated container can be versioned and tested independently
- Change was invisible to end users

### What Didn't Work
- Quantitative metrics (actual image size, startup time) were not captured before/after
- Network latency implications not measured
- Container has crashed at least once in production (Oct 2025 - Jan 2026)
- 30-second timeout configuration suggests anticipated latency issues, but no data exists to validate

### What Surprised Us
- The 30-second timeout configuration suggests awareness of potential latency issues with the network hop, but actual latency impact wasn't documented
- After 3 months in production, we still don't know if timeouts occur or how often

### FOE Insights

**Understanding:**
This experiment demonstrates understanding of architectural boundaries. By recognizing that PII detection is a distinct capability with heavy dependencies, the team could isolate it appropriately. The REST API abstraction (`aiox/presidio.py`) encapsulates this understanding, making the system's structure clearer.

**Feedback:**
Smaller images mean faster builds, which means faster CI feedback. When the main service doesn't need to pull PyTorch on every build, developers get feedback sooner. The dedicated CI/CD pipeline (`.github/workflows/engine-presidio-cd.yml`) also enables independent feedback loops for the Presidio component. The targeted feedback loops were local `docker build` wait times and CI pipeline completion times.

**Confidence:**
Dedicated containers can be versioned, tested, and deployed independently. If a Presidio update introduces issues, it can be rolled back without affecting the main service. This separation increases confidence in both components. However, confidence is tempered by observability gaps--a container crash occurred but wasn't tracked systematically. The independent version update that occurred validates the benefit of architectural separation.

## Limitations

- **No baseline metrics:** Image size and startup time weren't measured before the change, so improvement claims are qualitative
- **Latency not measured:** The network hop to the containerized service adds latency; impact on user experience unknown
- **Single implementation:** Only tested in one project context
- **Production stability unknown:** Long-term stability and scaling behavior not documented
- **MVP pressure:** Changes were bundled together under time pressure, making it harder to isolate the impact of containerization specifically
- **Proxy metric weakness:** Lines in `uv.lock` is an indirect measure; actual build time and image size were never captured
- **Confounding variables:** Containerization was bundled with caching changes (Invariant RuleSets), making it impossible to isolate the specific impact
- **Observability gap:** No metrics exist to validate production stability; container crashes and timeouts are not tracked
- **Failure mode analysis missing:** No documentation of system behavior when Presidio container is unavailable

## Conclusion

### Verdict
**Partially Supported** - The hypothesis that containerizing heavy ML dependencies reduces main service complexity is partially supported. The architectural separation was achieved (663 lines removed, 6 packages eliminated, independent versioning validated), but the expected improvements in build time and image size were never measured. We believe this helped, but we can't prove it because we didn't capture baselines.

### Key Learnings

1. **Architectural separation pays off:** Moving heavy ML workloads to dedicated containers simplifies the main service and enables independent lifecycle management.

2. **REST API abstraction enables flexibility:** The `aiox/presidio.py` client abstracts the implementation detail of where Presidio runs, making future changes easier.

3. **Measure before you change:** The lack of baseline metrics limits our ability to quantify the improvement. Future experiments should capture before/after measurements for build time, image size, and response latency.

### Recommendation

**Try this when:**
- Your service embeds heavy ML dependencies (PyTorch, TensorFlow, large models)
- The ML capability is logically separable from core service functionality
- You can tolerate the latency of a network hop for ML inference
- You want independent scaling or versioning of ML components

**Watch out for:**
- Network latency: The 30-second timeout suggests this can be significant
- Operational complexity: You now have two containers to manage instead of one
- Cold start: Containerized ML services may have their own startup latency
- Observability: Ensure you can track container health, timeouts, and latency before going to production
- Failure modes: Document and test what happens when the containerized service is unavailable

### Future Experiments

1. **Measure the actual impact:** Capture image size and startup time before/after containerization
2. **Latency profiling:** Measure the p50/p95/p99 latency of REST calls vs. embedded library calls
3. **Scaling behavior:** Test whether independent scaling of the Presidio container provides benefits under load
4. **Cost analysis:** Compare resource utilization of embedded vs. containerized approaches

---

<RelatedMethods />
