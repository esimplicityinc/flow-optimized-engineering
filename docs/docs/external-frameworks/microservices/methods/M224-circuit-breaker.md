---
methodId: M224
displayed_sidebar: fieldGuideSidebar
sidebar_position: 2
title: Circuit Breaker
description: Fault tolerance pattern that prevents cascade failures by temporarily rejecting requests to failing services, allowing them time to recover.
framework: microservices
framework_url: https://microservices.io/patterns/reliability/circuit-breaker.html
foe_alignment:
  primary: Confidence
  secondary: Feedback
status: industry-standard
pillar: foundational-patterns
---

# Circuit Breaker

**Pillar:** Foundational Patterns

The Circuit Breaker pattern prevents cascade failures in distributed systems by monitoring calls to remote services and "opening the circuit" when failures exceed a threshold. Instead of continuing to call a failing service, requests fail fast, allowing the service time to recover.

## Definition

> "The Circuit Breaker pattern prevents an application from repeatedly trying to execute an operation that's likely to fail, allowing it to continue operating without waiting for the fault to be fixed or wasting CPU cycles.
> — Michael Nygard, Release It!

## Why It Matters

In distributed systems, failures are inevitable. Without circuit breakers:

- **Cascade failures** - One slow service can exhaust all threads/resources in callers
- **Resource exhaustion** - Threads blocked waiting for timeouts consume memory
- **Slow recovery** - Retry storms prevent failing services from recovering
- **Poor user experience** - Users wait for timeouts instead of immediate failure feedback

## How It Works

### Circuit States

```
                    ┌──────────────┐
         ┌─────────▶│    CLOSED    │◀────────┐
         │          │ (Normal ops) │         │
         │          └──────┬───────┘         │
         │                 │ Success         │
         │                 │                 │
    Half-Open            Failure            Timeout
    Test succeeds       threshold          expires
         │                 │                 │
         │          ┌──────▼───────┐         │
         └──────────│    OPEN      │─────────┘
                    │ (Failing fast)│
                    └──────────────┘
```

| State | Behavior | Purpose |
|-------|----------|---------|
| **CLOSED** | Requests pass through to service | Normal operation |
| **OPEN** | Requests fail immediately | Protect failing service, fail fast |
| **HALF-OPEN** | Limited test requests allowed | Check if service recovered |

### State Transitions

1. **CLOSED → OPEN**: Failure rate exceeds threshold
2. **OPEN → HALF-OPEN**: Timeout expires (e.g., 30 seconds)
3. **HALF-OPEN → CLOSED**: Test request succeeds
4. **HALF-OPEN → OPEN**: Test request fails

## Implementation

### Key Parameters

```javascript
const circuitBreaker = {
  failureThreshold: 5,        // Open after 5 failures
  successThreshold: 2,        // Close after 2 successes in half-open
  timeout: 30000,             // 30 seconds before attempting reset
  monitoringPeriod: 60000,    // Count failures in 1-minute window
  errorTypes: ['timeout', '5xx', 'connection refused']
};
```

### Example Implementation

```javascript
class CircuitBreaker {
  constructor(serviceCall, options) {
    this.serviceCall = serviceCall;
    this.state = 'CLOSED';
    this.failureCount = 0;
    this.successCount = 0;
    this.nextAttempt = Date.now();
    this.options = options;
  }

  async call(request) {
    if (this.state === 'OPEN') {
      if (Date.now() < this.nextAttempt) {
        throw new CircuitBreakerOpenError('Service temporarily unavailable');
      }
      this.state = 'HALF_OPEN';
    }

    try {
      const response = await this.serviceCall(request);
      this.onSuccess();
      return response;
    } catch (error) {
      this.onFailure();
      throw error;
    }
  }

  onSuccess() {
    this.failureCount = 0;
    if (this.state === 'HALF_OPEN') {
      this.successCount++;
      if (this.successCount >= this.options.successThreshold) {
        this.state = 'CLOSED';
        this.successCount = 0;
      }
    }
  }

  onFailure() {
    this.failureCount++;
    if (this.failureCount >= this.options.failureThreshold) {
      this.state = 'OPEN';
      this.nextAttempt = Date.now() + this.options.timeout;
    }
  }
}
```

### Libraries & Frameworks

| Language | Library |
|----------|---------|
| Java | Resilience4j, Hystrix (legacy) |
| JavaScript | opossum, cockatiel |
| .NET | Polly |
| Go | go-breaker, sony/gobreaker |
| Python | pybreaker, circuitbreaker |

## FOE Alignment

**Primary: Confidence to Act**

Circuit breakers provide confidence that failures won't cascade through the system. When a service fails, the circuit breaker isolates the failure, giving teams confidence to deploy changes without fear of taking down the entire system.

**Secondary: Fast Feedback Loops**

When a circuit is open, clients receive immediate failure feedback rather than waiting for timeouts. This fast failure enables rapid fallback to alternative paths or graceful degradation.

## Benefits

- ✅ **Prevents cascade failures** - Failing fast protects upstream services
- ✅ **Enables graceful degradation** - Fallback to cached data or reduced functionality
- ✅ **Accelerates recovery** - Stops retry storms that prevent service recovery
- ✅ **Provides monitoring hooks** - Track failure rates and circuit state
- ✅ **Self-healing** - Automatically retries when service recovers

## Trade-offs

- ⚠️ **Complexity** - Additional component to configure and monitor
- ⚠️ **False positives** - Brief transient errors can open circuits
- ⚠️ **Configuration tuning** - Thresholds must be calibrated for each service
- ⚠️ **Testing difficulty** - Hard to test all state transitions

## When to Use

✅ **Essential for:**
- Calls to external services (payment gateways, third-party APIs)
- Inter-service communication in microservices
- Database connections that may timeout
- Any remote call with potential for high latency

❌ **Not needed for:**
- In-process calls
- Calls to highly reliable, low-latency local services
- Synchronous calls within a single transaction boundary

## Integration with Other Patterns

### With Fallback

```javascript
async function getUserProfile(userId) {
  try {
    return await circuitBreaker.call(() => userService.getProfile(userId));
  } catch (error) {
    if (error instanceof CircuitBreakerOpenError) {
      return await cache.get(`user:${userId}`); // Fallback to cache
    }
    throw error;
  }
}
```

### With Retry

Apply retry _inside_ the circuit breaker, not outside:

```javascript
// ❌ Wrong: Retry outside breaker
for (let i = 0; i < 3; i++) {
  try {
    return await circuitBreaker.call(serviceCall);
  } catch (e) {
    await delay(1000);
  }
}

// ✅ Right: Retry inside breaker
return await circuitBreaker.call(async () => {
  return await retryWithBackoff(serviceCall, { attempts: 3 });
});
```

### With Bulkhead

Use circuit breakers within bulkheads to prevent both cascade failures and resource exhaustion:

```javascript
// Reserve resources for critical paths
const criticalBulkhead = new Bulkhead({ capacity: 10 });
const circuitBreaker = new CircuitBreaker(serviceCall);

await criticalBulkhead.execute(() => circuitBreaker.call(request));
```

## Monitoring & Observability

Track these metrics:

| Metric | Description | Alert Threshold |
|--------|-------------|-----------------|
| `circuit_state` | Current state (0=closed, 1=half-open, 2=open) | State = 2 |
| `circuit_failures` | Count of failures | > threshold/minute |
| `circuit_success_rate` | % successful calls | < 95% |
| `circuit_open_duration` | Time spent in open state | > 5 minutes |

## Configuration Guidelines

### Failure Threshold

- **Aggressive** (5 failures): Fast failure detection, higher false positive rate
- **Conservative** (20 failures): Tolerates brief issues, slower to react
- **Recommendation**: Start with 5-10 failures in a 60-second window

### Timeout Duration

- **Short** (10 seconds): Quick recovery attempts, more oscillation
- **Long** (60 seconds): Stable state, slower recovery
- **Recommendation**: 30-60 seconds for most services

### Context-Specific Tuning

| Service Type | Failure Threshold | Timeout | Notes |
|--------------|------------------|---------|-------|
| Critical auth service | 3 | 10s | Fail fast, quick retry |
| Analytics/logging | 20 | 120s | Tolerate brief issues |
| Third-party API | 5 | 60s | Balance speed/stability |
| Internal service | 10 | 30s | Default configuration |

## Testing Circuit Breakers

### Unit Tests

```javascript
describe('CircuitBreaker', () => {
  it('should open after threshold failures', async () => {
    const failingService = jest.fn().mockRejectedValue(new Error('Fail'));
    const cb = new CircuitBreaker(failingService, { failureThreshold: 3 });
    
    // Trigger failures
    await Promise.all([1, 2, 3].map(() => 
      cb.call().catch(() => {})
    ));
    
    expect(cb.state).toBe('OPEN');
  });
  
  it('should fail fast when open', async () => {
    cb.state = 'OPEN';
    cb.nextAttempt = Date.now() + 60000;
    
    await expect(cb.call()).rejects.toThrow(CircuitBreakerOpenError);
  });
});
```

### Integration Tests

Use chaos engineering to verify circuit breaker behavior:

```javascript
// Inject failures and verify circuit opens
await chaos.injectLatency('payment-service', { duration: 5000 });
// Verify circuit opens after threshold
// Verify fallback activates
// Verify circuit closes after recovery
```

## Anti-Patterns

### ❌ Global Circuit Breaker

Don't share one circuit breaker across all services:

```javascript
// Wrong: All services share one breaker
const globalBreaker = new CircuitBreaker();
await globalBreaker.call(() => serviceA.call());
await globalBreaker.call(() => serviceB.call()); // Service B failures affect A
```

Use separate breakers per service or even per endpoint.

### ❌ Circuit Breaker for Everything

Don't wrap every function call:

```javascript
// Wrong: Unnecessary overhead
await circuitBreaker.call(() => localCache.get(key));
```

Reserve for remote calls with failure potential.

### ❌ Ignoring Half-Open State

Don't skip the half-open testing phase:

```javascript
// Wrong: Immediately reset on timer
if (Date.now() > nextAttempt) {
  state = 'CLOSED'; // Skip half-open testing!
}
```

Always test with limited traffic before fully closing.

## Known Uses

- **Netflix** - Hystrix (now Resilience4j), protection for 1000s of dependencies
- **Amazon** - Internal circuit breaker libraries for service calls
- **Spotify** - Circuit breakers in API gateway for third-party APIs
- **SoundCloud** - Protection for social media integrations

## References

- Nygard, M. T. (2018). *Release It!* (2nd ed.). Pragmatic Bookshelf. Chapter 5: Stability Patterns.
- Richardson, C. (2018). *Microservices Patterns*. Chapter 3: Interprocess Communication.
- [Circuit Breaker - microservices.io](https://microservices.io/patterns/reliability/circuit-breaker.html)
- [Netflix Tech Blog: Fault Tolerance](https://netflixtechblog.com/fault-tolerance-in-a-high-volume-distributed-system-91ab4faae74a)
- [AWS Circuit Breaker Pattern](https://docs.aws.amazon.com/whitepapers/latest/modern-application-development-on-aws/circuit-breaker.html)
