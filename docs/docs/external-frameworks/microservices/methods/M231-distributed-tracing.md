---
methodId: M231
displayed_sidebar: fieldGuideSidebar
sidebar_position: 9
title: Distributed Tracing
description: Tracks requests as they flow through distributed systems, enabling visualization of service dependencies, latency analysis, and root cause identification.
framework: microservices
framework_url: https://microservices.io/patterns/observability/distributed-tracing.html
foe_alignment:
  primary: Understanding
  secondary: Feedback
status: industry-standard
pillar: operational-patterns
---

# Distributed Tracing

**Pillar:** Operational Patterns

Distributed tracing tracks requests as they flow through multiple microservices, recording the path taken, services touched, and time spent in each component. This provides end-to-end visibility into system behavior, enabling developers to understand service dependencies, identify performance bottlenecks, and diagnose failures in complex distributed systems.

## Definition

> "Distributed tracing tracks requests as they flow through distributed systems. A trace represents the complete journey of a request through the system, while spans represent individual operations within that journey."
> — OpenTelemetry Documentation

## Why It Matters

In monolithic applications, debugging is straightforward—logs and stack traces tell the complete story. In microservices:

- **Request path is unclear** - Which services were called?
- **Latency sources are hidden** - Where did time get spent?
- **Failures are hard to trace** - Which service failed and why?
- **Dependencies are invisible** - What relies on what?

Without distributed tracing:
- Debugging requires manually correlating logs across services
- Performance optimization is guesswork
- Failure analysis takes hours or days
- System architecture is only understood by tribal knowledge

## Core Concepts

### Trace, Span, and Context

```
┌─────────────────────────────────────────────────────────────────────┐
│                              TRACE                                  │
│  Trace ID: trace_abc123                                             │
│                                                                     │
│  ┌──────────────┐                                                   │
│  │   Span 1     │  Operation: GET /api/orders                       │
│  │  (Root)      │  Service: API Gateway                             │
│  │              │  Duration: 250ms                                  │
│  └──────┬───────┘                                                   │
│         │                                                           │
│    ┌────┴────┬───────────────┬───────────────┐                     │
│    │         │               │               │                     │
│    ▼         ▼               ▼               ▼                     │
│ ┌──────┐ ┌──────┐       ┌──────┐       ┌──────┐                   │
│ │Span 2│ │Span 3│       │Span 4│       │Span 5│                   │
│ │Auth  │ │User  │       │Order │       │Invtry│                   │
│ │50ms  │ │75ms  │       │100ms │       │125ms │                   │
│ └──────┘ └──────┘       └──┬───┘       └──────┘                   │
│                            │                                       │
│                         ┌──┴───┐                                   │
│                         │Span 6│  Service: Payment                 │
│                         │150ms │                                   │
│                         └──────┘                                   │
└─────────────────────────────────────────────────────────────────────┘
```

| Concept | Description | Example |
|---------|-------------|---------|
| **Trace** | End-to-end request journey | Complete order creation flow |
| **Span** | Single operation within a trace | Call to user service |
| **Span Context** | Metadata propagated across services | Trace ID, Span ID, baggage |
| **Parent Span** | Calling operation | API Gateway span |
| **Child Span** | Called operation | User service span |
| **Baggage** | Context data passed through the trace | User ID, request type |

### OpenTelemetry Data Model

```javascript
// Trace Context (propagated across service boundaries)
{
  traceparent: "00-trace_id-span_id-01",
  tracestate: "vendor=value"
}

// Span Structure
{
  traceId: "abc123...",
  spanId: "def456...",
  parentSpanId: "ghi789...",
  name: "GET /users/123",
  kind: "CLIENT",  // or SERVER, PRODUCER, CONSUMER, INTERNAL
  startTime: 1705312800000,
  endTime: 1705312800075,
  attributes: {
    "http.method": "GET",
    "http.url": "/users/123",
    "http.status_code": 200,
    "service.name": "user-service"
  },
  events: [
    {
      name: "cache_miss",
      timestamp: 1705312800010,
      attributes: { "cache.key": "user:123" }
    }
  ],
  status: { code: "OK" }
}
```

## Implementation

### Instrumentation

#### Automatic Instrumentation

Most frameworks support automatic instrumentation:

```javascript
// Node.js with OpenTelemetry
const { NodeSDK } = require('@opentelemetry/sdk-node');
const { getNodeAutoInstrumentations } = require('@opentelemetry/auto-instrumentations-node');

const sdk = new NodeSDK({
  traceExporter: new OTLPTraceExporter(),
  instrumentations: [
    getNodeAutoInstrumentations({
      '@opentelemetry/instrumentation-http': { enabled: true },
      '@opentelemetry/instrumentation-express': { enabled: true },
      '@opentelemetry/instrumentation-mongodb': { enabled: true },
    }),
  ],
});

sdk.start();
```

#### Manual Instrumentation

Add spans for custom operations:

```javascript
const { trace, context } = require('@opentelemetry/api');
const tracer = trace.getTracer('order-service');

async function processOrder(orderData) {
  // Create a span for this operation
  return await tracer.startActiveSpan('processOrder', async (span) => {
    try {
      span.setAttribute('order.id', orderData.id);
      span.setAttribute('customer.id', orderData.customerId);
      
      // Child span for validation
      await tracer.startActiveSpan('validateOrder', async (validateSpan) => {
        const isValid = await validate(orderData);
        validateSpan.setAttribute('validation.result', isValid);
        validateSpan.end();
        
        if (!isValid) throw new Error('Invalid order');
      });
      
      // Child span for database operation
      await tracer.startActiveSpan('saveOrder', async (dbSpan) => {
        const order = await db.orders.create(orderData);
        dbSpan.setAttribute('db.rows_affected', 1);
        dbSpan.end();
        return order;
      });
      
      span.setStatus({ code: SpanStatusCode.OK });
      return order;
      
    } catch (error) {
      span.recordException(error);
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: error.message
      });
      throw error;
    } finally {
      span.end();
    }
  });
}
```

### Context Propagation

Trace context must flow across service boundaries:

```javascript
// HTTP Client - inject context
const { context, propagation } = require('@opentelemetry/api');

async function callUserService(userId) {
  const headers = {};
  
  // Inject current trace context into headers
  propagation.inject(context.active(), headers);
  
  const response = await fetch(`http://user-service/users/${userId}`, {
    headers
  });
  
  return response.json();
}

// HTTP Server - extract context
app.get('/orders/:id', async (req, res) => {
  // Extract trace context from incoming request
  const parentContext = propagation.extract(
    context.active(),
    req.headers
  );
  
  // Continue trace with extracted context
  await context.with(parentContext, async () => {
    const order = await getOrder(req.params.id);
    res.json(order);
  });
});
```

### Message Queue Context

Propagate context through async messaging:

```javascript
// Producer
async function publishOrderCreated(order) {
  const message = {
    data: order,
    // Inject trace context into message metadata
    metadata: {
      traceparent: getCurrentTraceparent()
    }
  };
  
  await messageQueue.publish('order.created', message);
}

// Consumer
async function handleOrderCreated(message) {
  // Extract and continue trace
  const parentContext = extractContext(message.metadata.traceparent);
  
  await context.with(parentContext, async () => {
    const span = tracer.startSpan('processOrderCreated');
    // Process message...
    span.end();
  });
}
```

## FOE Alignment

**Primary: Optimize for Understanding**

Distributed tracing transforms opaque distributed systems into visible, understandable flows. Developers can see exactly how a request traverses the system, which services it touches, and where time is spent. This visibility is essential for understanding complex microservices architectures.

**Secondary: Fast Feedback Loops**

Traces provide immediate feedback on system behavior. Performance bottlenecks are visible within seconds of occurring, not hours or days after log analysis. Failed requests show the exact service and operation where problems occurred, enabling rapid diagnosis and resolution.

## Benefits

- ✅ **End-to-end visibility** - See complete request flows across services
- ✅ **Performance analysis** - Identify latency bottlenecks
- ✅ **Dependency mapping** - Visualize service relationships
- ✅ **Root cause analysis** - Pinpoint failure locations
- ✅ **Anomaly detection** - Spot unusual patterns in traces
- ✅ **Capacity planning** - Understand load distribution

## Trade-offs

- ⚠️ **Overhead** - Instrumentation adds latency (typically 1-5%)
- ⚠️ **Storage costs** - Trace data volume can be substantial
- ⚠️ **Complexity** - Requires instrumentation across all services
- ⚠️ **Sampling challenges** - Deciding what to capture vs. discard

## When to Use

✅ **Essential for:**
- Any system with 3+ services
- Production environments
- Performance-critical applications
- Debugging complex failures
- Understanding service dependencies

❌ **Can defer when:**
- Single-service applications
- Early development phases
- Simple request flows

## Sampling Strategies

Tracing all requests creates too much data. Use sampling:

### Head-Based Sampling

Decide at the start of a trace whether to sample:

```javascript
const sdk = new NodeSDK({
  sampler: new ParentBasedSampler({
    root: new TraceIdRatioBasedSampler(0.1), // Sample 10%
  }),
});
```

**Pros:** Simple, consistent (whole trace sampled or not)
**Cons:** Might miss rare but important traces

### Tail-Based Sampling

Collect all spans, decide at the end whether to keep:

```javascript
// Keep all error traces and slow traces
const tailSampler = {
  shouldSample: (spans) => {
    const hasError = spans.some(s => s.status.code === 'ERROR');
    const isSlow = spans.some(s => s.duration > 1000);
    return hasError || isSlow;
  }
};
```

**Pros:** Capture interesting traces, discard routine ones
**Cons:** Higher resource usage during collection

### Adaptive Sampling

Adjust sample rate based on traffic:

```javascript
// Sample 100% of errors, 1% of successes
if (span.status.code === 'ERROR') {
  return ALWAYS_SAMPLE;
} else {
  return Math.random() < 0.01 ? ALWAYS_SAMPLE : NEVER_SAMPLE;
}
```

## Observability Platforms

| Platform | Features | Best For |
|----------|----------|----------|
| **Jaeger** | Open-source, OpenTelemetry native | Self-hosted, cost-conscious |
| **Zipkin** | Open-source, simple | Getting started, smaller scale |
| **Honeycomb** | High cardinality, fast queries | Debugging complex systems |
| **Datadog APM** | Full observability suite | Integrated monitoring |
| **AWS X-Ray** | AWS integration | AWS-centric architectures |
| **Grafana Tempo** | Cost-efficient storage | Grafana ecosystem |

## Anti-Patterns

### ❌ Missing Instrumentation

```javascript
// WRONG: Service not instrumented, creates trace gap
// API Gateway → [missing trace] → Database

// RIGHT: Every service adds spans
// API Gateway → User Service → Database
```

### ❌ Over-Instrumentation

```javascript
// WRONG: Too many fine-grained spans
for (const item of order.items) {
  await tracer.startActiveSpan(`processItem_${item.id}`, async (span) => {
    // Creates span for every item - too noisy!
  });
}

// RIGHT: Aggregate where possible
await tracer.startActiveSpan('processItems', async (span) => {
  span.setAttribute('item.count', order.items.length);
  for (const item of order.items) {
    await processItem(item);
  }
});
```

### ❌ Not Propagating Context

```javascript
// WRONG: Context lost in async operation
async function processOrder(order) {
  setImmediate(() => {
    // Context lost! This span won't be connected
    await tracer.startActiveSpan('backgroundTask', async (span) => {
      // Orphan span
    });
  });
}

// RIGHT: Pass context explicitly
async function processOrder(order) {
  const ctx = context.active();
  setImmediate(() => {
    context.with(ctx, async () => {
      await tracer.startActiveSpan('backgroundTask', async (span) => {
        // Properly connected span
      });
    });
  });
}
```

## Known Uses

- **Netflix** - Custom distributed tracing for thousands of microservices
- **Uber** - Jaeger created for internal use, open-sourced
- **Google** - Dapper tracing system (inspiration for OpenTelemetry)
- **Shopify** - OpenTelemetry for commerce platform tracing
- **Airbnb** - Distributed tracing for service mesh

## References

- [OpenTelemetry Documentation](https://opentelemetry.io/docs/)
- [OpenTelemetry Specification](https://github.com/open-telemetry/opentelemetry-specification)
- Richardson, C. (2018). *Microservices Patterns*. Chapter 11: Developing Production-Ready Services.
- [Distributed Tracing - microservices.io](https://microservices.io/patterns/observability/distributed-tracing.html)
- Sigelman, B. H., et al. (2010). "Dapper, a Large-Scale Distributed Systems Tracing Infrastructure." *Google Technical Report*.
- [Jaeger Documentation](https://www.jaegertracing.io/docs/)
- [Zipkin Documentation](https://zipkin.io/)
