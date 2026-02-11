---
methodId: M236
displayed_sidebar: fieldGuideSidebar
sidebar_position: 2
title: Gradual Extraction Strategy
pillar: evolution
description: A step-by-step approach to extracting modules into separate services when needed, minimizing risk while preserving the option to keep modules in-process.
---

# Gradual Extraction Strategy

**Pillar:** Evolution

The Gradual Extraction Strategy provides a low-risk path for evolving a modular monolith into distributed services—if and when that becomes necessary. Rather than betting everything on an early microservices architecture, this method lets you validate boundaries and business needs before paying the operational costs of distribution.

## Definition

> Gradual extraction is the practice of deferring service boundary decisions until there is clear evidence that distribution is necessary, then extracting modules incrementally while maintaining system stability and enabling rollback.

## Why It Matters

The microservices trade-off is often misunderstood:

| Aspect | Monolith | Microservices |
|--------|----------|---------------|
| **Operational Complexity** | Low | High |
| **Development Complexity** | Low (with modularity) | High |
| **Network Latency** | None | Significant |
| **Deployment Independence** | No | Yes |
| **Team Autonomy** | Limited | High |
| **Debugging** | Straightforward | Complex |

The gradual extraction strategy preserves the benefits of monoliths while keeping the option to extract when specific conditions warrant it.

## The Decision Framework

### When to Extract

Extract a module when you have clear evidence for multiple criteria:

1. **Independent Scaling Requirements**
   - The module has significantly different resource needs
   - Current: 10% of traffic uses 70% of resources
   - Need: Scale the 10% independently

2. **Team Autonomy Requirements**
   - Teams are blocked waiting for other teams
   - Deployment coordination is a bottleneck
   - Different release cadences are needed

3. **Technology Diversity Needs**
   - Module requires different runtime (e.g., ML inference)
   - Specific performance characteristics needed
   - Regulatory constraints on technology stack

4. **Fault Isolation Requirements**
   - Module failures must not impact core functionality
   - Different SLAs are required
   - Circuit breaker patterns insufficient

### When NOT to Extract

Don't extract for these reasons alone:

- **Code organization** (use modules instead)
- **Database separation** (use schemas instead)
- **Team structure** (may change; boundaries shouldn't)
- **Hype or "best practices"** (needs evidence)
- **Premature optimization** (measure first)

## The Extraction Process

### Phase 0: Preparation (Before Extraction)

**Validate Module Boundaries:**

1. **Ensure clean module separation** (M235)
   - No shared database tables
   - Clear public API
   - No circular dependencies

2. **Verify independence**
   - Module tests pass in isolation
   - No shared libraries with business logic
   - Can deploy module changes independently

3. **Document current state**
   - Baseline performance metrics
   - Dependency graph
   - Integration points

**Prepare Infrastructure:**

- Set up deployment pipeline for new service
- Configure monitoring and observability
- Establish service discovery (if needed)
- Prepare database migration strategy

### Phase 1: Strangler Fig Pattern

Extract gradually using the Strangler Fig pattern—grow the new service while the monolith still runs:

```
Client Request
    |
    v
[API Gateway / Router]
    |
    +---> [New Service] (extracted module)
    |
    +---> [Modular Monolith] (remaining modules)
```

**Step-by-Step:**

1. **Create Facade**
   ```python
   # Router decides where to route requests
   class ModuleRouter:
       def route(self, request):
           if self.should_use_new_service(request):
               return self.new_service.handle(request)
           return self.monolith.handle(request)
   ```

2. **Shadow Traffic** (Optional but recommended)
   - Send read requests to both old and new
   - Compare responses
   - Log discrepancies without affecting users

3. **Migrate Reads First**
   - Lower risk than writes
   - Caching can mitigate latency
   - Easy to rollback

4. **Migrate Writes Gradually**
   - Start with low-risk operations
   - Use feature flags for control
   - Maintain data consistency

### Phase 2: Data Migration

**Dual-Write Strategy:**

```
Write Request
    |
    v
[Monolith Module]
    |----> [New Service Database]
    |
    +----> [Monolith Database]
```

1. **Write to both systems** temporarily
2. **Verify consistency** with reconciliation jobs
3. **Switch reads** to new service
4. **Remove old writes** once confident

**Database Options:**

| Strategy | When to Use | Trade-offs |
|----------|-------------|------------|
| **Shared Database** | Short-term migration | Coupling remains temporarily |
| **Database per Service** | Long-term target | Full independence, data sync complexity |
| **Event Sourcing** | Complex domains | Audit trail, eventual consistency |

### Phase 3: Cleanup

1. **Remove code** from monolith
2. **Update routing** to direct 100% traffic
3. **Archive old data** (with retention policy)
4. **Update documentation**

## Rollback Strategy

Always maintain the ability to roll back:

```python
# Feature flag with automatic rollback
@feature_flag('new-service-checkout', 
              fallback=lambda: monolith.checkout)
def process_checkout(order):
    return new_service.checkout.process(order)
```

**Rollback Triggers:**
- Error rate exceeds threshold
- Latency increases beyond SLO
- Business metrics degradation
- Manual emergency switch

## Case Study: Amazon Prime Video's Reverse Migration

In 2023, Amazon Prime Video shared their experience of moving from microservices back to a monolith—a dramatic validation of the gradual extraction strategy in reverse.

### The Original Architecture

Prime Video's audio/video monitoring service was built as distributed serverless functions:

```
[S3 Media Files]
    |
    v
[Step Functions Orchestration]
    |
    +---> [Lambda: Media Analysis]
    +---> [Lambda: Quality Detection]
    +---> [Lambda: Alert Generation]
    +---> [Lambda: S3 Storage]
```

### The Problems

1. **High costs**: Running thousands of Lambda invocations for each media file
2. **Latency**: Step Functions overhead added significant processing time
3. **Complexity**: Debugging across 15+ services was difficult
4. **Scaling limits**: Hitting AWS service limits at high scale

### The Solution: Monolith Extraction (in reverse)

They consolidated the distributed services into a single application:

```
[S3 Media Files]
    |
    v
[Monolith Service (EC2)]
    |----> Media Analysis
    |----> Quality Detection
    |----> Alert Generation
```

### Key Decisions

- **Kept S3 for storage**: External storage was the right boundary
- **Consolidated compute**: All processing in one service
- **Preserved observability**: Added instrumentation to the monolith
- **Horizontal scaling**: EC2 auto-scaling instead of function-per-request

### Results

- **90% cost reduction**: Eliminated per-invocation costs
- **Faster processing**: Removed orchestration overhead
- **Simpler operations**: Single service to monitor and debug
- **Better scaling**: Predictable resource usage

### Lessons for Extraction Strategy

This case illustrates that:

1. **Distribution has costs** that must be justified
2. **The decision can be reversed** when wrong
3. **Boundaries matter more than deployment topology**
4. **Start modular, extract only when needed**

## FOE Alignment

This method embodies all three FOE principles:

### Understanding
- **Deferring decisions** until you have evidence
- **Clear extraction criteria** make decisions objective
- **Rollback capability** means mistakes are recoverable

### Fast Feedback
- **Shadow traffic** provides feedback before users are affected
- **Dual-write verification** catches issues early
- **Gradual rollout** limits blast radius

### Confidence
- **Preparation phase** ensures boundaries are solid before extraction
- **Feature flags** enable instant rollback
- **Validated learning** through metrics before commitment

## Common Mistakes

### 1. **Extracting Too Early**
Premature extraction based on anticipated needs rather than proven requirements.

**Solution**: Use the decision framework. Require evidence, not speculation.

### 2. **Big Bang Extraction**
Trying to extract everything at once instead of gradual strangler fig approach.

**Solution**: Use progressive strangulation. Start with reads, migrate writes gradually.

### 3. **Ignoring Data Gravity**
Underestimating the difficulty of data migration and consistency.

**Solution**: Plan data migration as a first-class concern. Budget significant time for it.

### 4. **No Rollback Plan**
Assuming extraction will succeed without preparation for failure.

**Solution**: Always maintain rollback capability. Test rollback procedures.

### 5. **Wrong Boundaries**
Extracting modules that have high coupling, creating distributed monolith anti-pattern.

**Solution**: Validate boundaries first. If modules can't be tested independently, they're not ready for extraction.

## References

- [Amazon Prime Video - Scaling up the audio/video monitoring service](https://www.primevideotech.com/video-streaming/scaling-up-the-prime-video-audio-video-monitoring-service-and-reducing-costs-by-90)
- [Martin Fowler - Strangler Fig Application](https://martinfowler.com/bliki/StranglerFigApplication.html)
- [Kamil Grzybek - Gradual Extraction Approach](https://github.com/kgrzybek/modular-monolith-with-ddd#extraction)
- [Martin Fowler - Monolith First](https://martinfowler.com/bliki/MonolithFirst.html)
- [Segment - Goodbye Microservices](https://segment.com/blog/goodbye-microservices/)
