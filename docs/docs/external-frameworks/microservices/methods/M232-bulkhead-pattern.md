---
methodId: M232
displayed_sidebar: fieldGuideSidebar
sidebar_position: 10
title: Bulkhead Pattern
description: Isolates failures by partitioning resources so that a failure in one partition doesn't exhaust resources available to others, improving system resilience.
framework: microservices
framework_url: https://microservices.io/patterns/reliability/bulkhead.html
foe_alignment:
  primary: Confidence
  secondary: Understanding
status: well-established
pillar: operational-patterns
---

# Bulkhead Pattern

**Pillar:** Operational Patterns

The Bulkhead pattern isolates failures by partitioning resources (threads, connections, memory) into separate pools. If one partition fails or becomes overloaded, it cannot consume all available resources, preserving capacity for other partitions. The name comes from ship bulkheads—compartments that prevent flooding from spreading throughout the vessel.

## Definition

> "The bulkhead pattern isolates elements of an application into pools so that if one fails, the others will continue to function. It's named after the sectioned partitions (bulkheads) of a ship's hull—if the hull is compromised, only the damaged section fills with water, preventing the ship from sinking."
> — Microsoft Azure Architecture Center

## Why It Matters

Without resource isolation, a single failing service can exhaust shared resources:

```
WITHOUT BULKHEADS:
┌─────────────────────────────────────────┐
│       Shared Thread Pool (100 threads)  │
│                                         │
│  Service A (failing) uses 95 threads    │
│  Service B (healthy) gets 5 threads     │
│  Service C (healthy) gets 0 threads ←─── Starved!
└─────────────────────────────────────────┘
         ↓
    Entire system degraded

WITH BULKHEADS:
┌─────────────────────────────────────────┐
│  Pool A (30) │ Pool B (30) │ Pool C (30)│
│  ┌────────┐  │  ┌────────┐  │  ┌────────┐│
│  │Service │  │  │Service │  │  │Service ││
│  │  A     │  │  │  B     │  │  │  C     ││
│  │(fails) │  │  │(works) │  │  │(works) ││
│  └────────┘  │  └────────┘  │  └────────┘│
│  Uses 30/30  │  Uses 5/30   │  Uses 10/30│
└─────────────────────────────────────────┘
         ↓
    Only Service A affected
```

**Common scenarios where bulkheads help:**
- One slow service exhausts the HTTP client connection pool
- A memory leak in one component consumes all available RAM
- A thread-hungry operation blocks all request processing
- Database connection pool exhaustion from one service

## Types of Bulkheads

### 1. Thread Pool Bulkheads

Isolate thread pools per service or operation type:

```javascript
class ThreadPoolBulkhead {
  constructor(name, options) {
    this.name = name;
    this.maxConcurrent = options.maxConcurrent || 10;
    this.maxWait = options.maxWait || 1000;
    this.queue = new AsyncQueue();
    this.active = 0;
  }
  
  async execute(fn) {
    if (this.active >= this.maxConcurrent) {
      // Queue or reject based on policy
      if (this.queue.size >= this.maxWait) {
        throw new BulkheadFullError(
          `Bulkhead ${this.name} is full`
        );
      }
      await this.queue.waitForSpace(this.maxWait);
    }
    
    this.active++;
    try {
      return await fn();
    } finally {
      this.active--;
      this.queue.notifySpaceAvailable();
    }
  }
}

// Usage: Separate bulkheads for different services
const paymentBulkhead = new ThreadPoolBulkhead('payment', {
  maxConcurrent: 10
});

const inventoryBulkhead = new ThreadPoolBulkhead('inventory', {
  maxConcurrent: 20
});

const analyticsBulkhead = new ThreadPoolBulkhead('analytics', {
  maxConcurrent: 5  // Lower priority, fewer resources
});

async function processPayment(data) {
  return await paymentBulkhead.execute(async () => {
    return await paymentService.charge(data);
  });
}
```

### 2. Connection Pool Bulkheads

Separate connection pools per dependency:

```yaml
# Database connection pool configuration
connectionPools:
  orderDb:
    maxConnections: 20
    minIdle: 5
    
  productDb:
    maxConnections: 15
    minIdle: 3
    
  analyticsDb:
    maxConnections: 5
    minIdle: 1
```

```javascript
// HTTP client connection pool bulkheads
const httpClients = {
  critical: new HttpClient({
    maxSockets: 50,
    maxFreeSockets: 10,
    timeout: 5000
  }),
  
  standard: new HttpClient({
    maxSockets: 20,
    maxFreeSockets: 5,
    timeout: 10000
  }),
  
  background: new HttpClient({
    maxSockets: 5,
    maxFreeSockets: 1,
    timeout: 30000
  })
};

async function callCriticalService(request) {
  return await httpClients.critical.request(request);
}

async function callBackgroundJob(request) {
  return await httpClients.background.request(request);
}
```

### 3. Semaphore Bulkheads

Limit concurrent access with semaphores:

```javascript
class SemaphoreBulkhead {
  constructor(name, permits) {
    this.name = name;
    this.semaphore = new Semaphore(permits);
  }
  
  async execute(fn, timeout = 1000) {
    const acquired = await this.semaphore.acquire(timeout);
    if (!acquired) {
      throw new BulkheadFullError(
        `Could not acquire permit for ${this.name}`
      );
    }
    
    try {
      return await fn();
    } finally {
      this.semaphore.release();
    }
  }
}

// Priority-based bulkheads
const criticalBulkhead = new SemaphoreBulkhead('critical', 100);
const normalBulkhead = new SemaphoreBulkhead('normal', 50);
const lowPriorityBulkhead = new SemaphoreBulkhead('low', 10);
```

### 4. Resource-Based Bulkheads

Isolate memory, CPU, or other resources:

```javascript
class MemoryBulkhead {
  constructor(name, maxMemoryMB) {
    this.name = name;
    this.maxMemory = maxMemoryMB * 1024 * 1024;
    this.currentMemory = 0;
  }
  
  allocate(size) {
    if (this.currentMemory + size > this.maxMemory) {
      throw new MemoryLimitExceeded(
        `Bulkhead ${this.name} memory limit exceeded`
      );
    }
    this.currentMemory += size;
    return new Allocation(this, size);
  }
}
```

## Implementation

### Complete Example

```javascript
const { Resilience4j } = require('resilience4js');

// Configure multiple bulkheads
const resilience = new Resilience4j();

// Payment service bulkhead - critical, needs resources
resilience.registerBulkhead('payment', {
  maxConcurrentCalls: 20,
  maxWaitDuration: 500, // ms
  queueCapacity: 50
});

// Analytics bulkhead - background, limited resources
resilience.registerBulkhead('analytics', {
  maxConcurrentCalls: 5,
  maxWaitDuration: 100,
  queueCapacity: 10
});

// Third-party API bulkhead - unreliable, isolate tightly
resilience.registerBulkhead('external-api', {
  maxConcurrentCalls: 3,
  maxWaitDuration: 200,
  queueCapacity: 5
});

// Usage with fallback
async function processPayment(paymentData) {
  return await resilience.bulkhead('payment').execute(
    async () => {
      return await paymentService.process(paymentData);
    },
    {
      fallback: async (error) => {
        logger.warn('Payment bulkhead full, using queue', { error });
        await paymentQueue.enqueue(paymentData);
        return { queued: true };
      }
    }
  );
}
```

### Combining with Circuit Breaker

Use bulkheads with circuit breakers for layered protection:

```javascript
async function callExternalService(request) {
  // Layer 1: Bulkhead - limit concurrent calls
  return await bulkhead.execute(async () => {
    
    // Layer 2: Circuit Breaker - fail fast if service is down
    return await circuitBreaker.execute(async () => {
      
      // Layer 3: Retry - handle transient failures
      return await retry.execute(async () => {
        return await externalApi.call(request);
      });
    });
  });
}
```

## FOE Alignment

**Primary: Confidence to Act**

Bulkheads provide confidence that failures will be contained. When a service fails or becomes slow, it cannot consume all available resources and take down the entire system. This containment enables teams to deploy with confidence, knowing that problems won't cascade.

**Secondary: Optimize for Understanding**

Bulkheads make resource allocation explicit and visible. By partitioning resources, the architecture's priorities and dependencies become clear. Teams can see which services are considered critical (more resources) vs. background (fewer resources).

## Benefits

- ✅ **Failure isolation** - One failing component doesn't exhaust all resources
- ✅ **Predictable behavior** - Guaranteed capacity for critical paths
- ✅ **Prioritization** - Allocate more resources to critical services
- ✅ **Graceful degradation** - Non-critical work can be queued or rejected
- ✅ **Resource transparency** - Clear visibility into resource allocation

## Trade-offs

- ⚠️ **Resource underutilization** - Reserved capacity might sit idle
- ⚠️ **Configuration complexity** - Tuning bulkhead sizes is challenging
- ⚠️ **Rejection handling** - Must handle "bulkhead full" scenarios
- ⚠️ **Sizing difficulty** - Wrong sizes cause artificial bottlenecks

## When to Use

✅ **Use when:**
- Services have different criticality levels
- Resources are constrained and must be allocated
- Failure isolation is critical
- Mix of synchronous and asynchronous workloads
- Third-party APIs with rate limits

❌ **Avoid when:**
- System is simple with few dependencies
- Resources are abundant
- All services have equal priority
- Additional complexity isn't justified

## Configuration Guidelines

### Sizing Bulkheads

| Factor | Recommendation |
|--------|---------------|
| **Critical services** | 50-70% of available resources |
| **Standard services** | 20-30% of available resources |
| **Background jobs** | 5-10% of available resources |
| **External APIs** | Match rate limits + headroom |

### Tuning Process

1. **Start conservative** - Allocate less than you think needed
2. **Monitor utilization** - Track actual usage vs. limits
3. **Adjust based on data** - Increase limits if hitting them regularly
4. **Test failure scenarios** - Verify isolation during failures

### Example Configuration

```yaml
bulkheads:
  # Critical path - user-facing checkout
  checkout:
    maxThreads: 50
    queueSize: 100
    timeout: 2000ms
    
  # Important but can queue
  orderProcessing:
    maxThreads: 20
    queueSize: 500  # Can queue more
    timeout: 10000ms
    
  # Background, can reject
  emailSending:
    maxThreads: 5
    queueSize: 50
    timeout: 500ms
    rejectWhenFull: true
    
  # Third-party API - limit to avoid rate limiting
  paymentGateway:
    maxThreads: 3
    queueSize: 10
    timeout: 5000ms
```

## Monitoring

Track these metrics for each bulkhead:

```javascript
// Metrics to collect
const bulkheadMetrics = {
  // Utilization
  'bulkhead.available_permits': bulkhead.availablePermits(),
  'bulkhead.active_calls': bulkhead.activeCalls(),
  'bulkhead.queued_calls': bulkhead.queueSize(),
  
  // Throughput
  'bulkhead.calls_accepted': counter,
  'bulkhead.calls_rejected': counter,
  'bulkhead.calls_completed': counter,
  
  // Performance
  'bulkhead.wait_time': histogram, // Time waiting for permit
  'bulkhead.execution_time': histogram
};
```

### Alerting Thresholds

| Metric | Warning | Critical |
|--------|---------|----------|
| Utilization | > 80% | > 95% |
| Rejection rate | > 1% | > 5% |
| Queue wait time | > 100ms | > 500ms |

## Anti-Patterns

### ❌ Single Shared Pool

```javascript
// WRONG: All services share one pool
const sharedPool = new ThreadPool(100);

// All services compete for same threads
await sharedPool.execute(() => analyticsService.report());
await sharedPool.execute(() => paymentService.process());
```

### ❌ Oversized Bulkheads

```javascript
// WRONG: Bulkhead so large it provides no protection
const looseBulkhead = new Bulkhead({
  maxConcurrent: 10000  // Effectively unlimited
});
```

### ❌ No Fallback

```javascript
// WRONG: Rejection causes cascade failure
async function processOrder(order) {
  try {
    return await bulkhead.execute(() => orderService.process(order));
  } catch (error) {
    if (error instanceof BulkheadFullError) {
      throw error; // Propagates to caller - cascade!
    }
  }
}

// RIGHT: Graceful fallback
async function processOrder(order) {
  try {
    return await bulkhead.execute(() => orderService.process(order));
  } catch (error) {
    if (error instanceof BulkheadFullError) {
      // Queue for later processing
      await orderQueue.enqueue(order);
      return { status: 'queued' };
    }
    throw error;
  }
}
```

### ❌ Wrong Granularity

```javascript
// WRONG: Too granular - overhead exceeds benefit
const bulkheadPerEndpoint = {
  'GET /users': new Bulkhead(10),
  'POST /users': new Bulkhead(10),
  'GET /orders': new Bulkhead(10),
  // ... hundreds more
};

// RIGHT: Per service or per domain
const bulkheadPerService = {
  'user-service': new Bulkhead(50),
  'order-service': new Bulkhead(50)
};
```

## Known Uses

- **Netflix** - Hystrix bulkheads for dependency isolation
- **Resilience4j** - Java library with bulkhead implementations
- **Polly** - .NET resilience library with bulkhead support
- **AWS** - Lambda concurrency limits as bulkheads
- **Kubernetes** - Resource quotas as bulkheads

## Integration with Container Orchestration

### Kubernetes Resource Quotas

```yaml
apiVersion: v1
kind: ResourceQuota
metadata:
  name: compute-quota
spec:
  hard:
    requests.cpu: "10"
    requests.memory: 20Gi
    limits.cpu: "20"
    limits.memory: 40Gi
---
apiVersion: v1
kind: LimitRange
metadata:
  name: default-limits
spec:
  limits:
  - default:
      cpu: 500m
      memory: 512Mi
    defaultRequest:
      cpu: 100m
      memory: 128Mi
    type: Container
```

## References

- Nygard, M. T. (2018). *Release It!* (2nd ed.). Pragmatic Bookshelf. Chapter 5: Stability Patterns.
- [Bulkhead Pattern - Microsoft](https://docs.microsoft.com/en-us/azure/architecture/patterns/bulkhead)
- [Bulkhead - microservices.io](https://microservices.io/patterns/reliability/bulkhead.html)
- [Resilience4j Documentation](https://resilience4j.readme.io/docs/bulkhead)
- [Polly Bulkhead](https://github.com/App-vNext/Polly/wiki/Bulkhead)
- [AWS Bulkhead Pattern](https://docs.aws.amazon.com/whitepapers/latest/modern-application-development-on-aws/bulkhead.html)
