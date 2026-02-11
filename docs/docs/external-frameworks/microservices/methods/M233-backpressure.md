---
methodId: M233
displayed_sidebar: fieldGuideSidebar
sidebar_position: 11
title: Backpressure
description: Flow control mechanism where a downstream component signals upstream to slow down when it cannot keep up with the load, preventing resource exhaustion and system overload.
framework: microservices
framework_url: https://www.reactivemanifesto.org/glossary#Back-Pressure
foe_alignment:
  primary: Confidence
  secondary: Feedback
status: industry-standard
pillar: operational-patterns
---

# Backpressure

**Pillar:** Operational Patterns

Backpressure is a flow control mechanism where a downstream component signals to upstream components that it is overwhelmed and cannot keep up with the current load. The upstream component then reduces its output rate, preventing cascade failures and resource exhaustion. This creates a self-regulating system that gracefully handles load spikes.

## Definition

> "Back-pressure is an important feedback mechanism that allows systems to gracefully respond to load rather than collapse under it. When a component is under stress, it can propagate that stress upstream to reduce the load."
> — Reactive Streams Specification

## Why It Matters

Without backpressure, systems experience cascade failures:

```
WITHOUT BACKPRESSURE:
Client ──▶ Service A ──▶ Service B ──▶ Database
            (1000 req/s)  (100 req/s)   (50 req/s)
                │              │             │
                │     Queue    │    Queue    │
                │    grows...  │   grows...  │
                ▼              ▼             ▼
           Memory        Memory        Memory
           exhausted     exhausted     exhausted
                │              │             │
                └──────────────┴─────────────┘
                         ↓
                    System crash

WITH BACKPRESSURE:
Client ──▶ Service A ──▶ Service B ──▶ Database
            (1000 req/s)  (100 req/s)   (50 req/s)
                ▲              ▲
                │   "Slow down" │  "Slow down"
                └───────────────┴──────────────┘
                         ↓
            Client throttles requests
            (serves 50 req/s gracefully)
```

## How It Works

### Backpressure Signals

Components communicate their capacity through various mechanisms:

| Mechanism | How It Works | Use Case |
|-----------|--------------|----------|
| **Blocking** | Synchronous call blocks until capacity available | Simple synchronous systems |
| **Bounded Queues** | Queue rejects when full | Async message processing |
| **Flow Control** | Explicit rate negotiation (TCP, Reactive Streams) | Streaming data |
| **Credits/Tokens** | Consumer grants permits to producer | Rate-limited APIs |
| **Delay/Retry-After** | HTTP 429 or 503 with retry header | HTTP-based services |

### Reactive Streams Backpressure

The standard approach for async backpressure:

```javascript
const { Readable, Writable } = require('stream');

// Producer (upstream)
const producer = new Readable({
  objectMode: true,
  highWaterMark: 10, // Buffer size
  
  read() {
    // Only called when consumer requests more data
    const data = generateData();
    this.push(data);
  }
});

// Consumer (downstream)
const consumer = new Writable({
  objectMode: true,
  highWaterMark: 5,
  
  write(chunk, encoding, callback) {
    // Process data
    processChunk(chunk)
      .then(() => callback()) // Signal ready for more
      .catch(err => callback(err)); // Signal error
  }
});

// Pipe with automatic backpressure
producer.pipe(consumer);

// Consumer controls rate by how fast it calls callback()
```

### HTTP-Based Backpressure

```javascript
// Service B signals overload
app.post('/process', async (req, res) => {
  if (queue.size >= MAX_QUEUE_SIZE) {
    // Signal backpressure
    return res.status(503).json({
      error: 'Service temporarily overloaded',
      retryAfter: 5 // seconds
    });
  }
  
  // Queue request for processing
  await queue.add(req.body);
  res.status(202).json({ status: 'accepted' });
});

// Service A respects backpressure
async function callServiceB(data) {
  try {
    return await httpClient.post('/process', data);
  } catch (error) {
    if (error.status === 503 && error.response.retryAfter) {
      // Back off and retry
      await delay(error.response.retryAfter * 1000);
      return await callServiceB(data); // Retry
    }
    throw error;
  }
}
```

## Implementation Patterns

### 1. Rate Limiting

Prevent upstream from overwhelming downstream:

```javascript
const { RateLimiter } = require('limiter');

// Token bucket rate limiter
const limiter = new RateLimiter({
  tokensPerInterval: 100,  // 100 requests
  interval: 'second'       // per second
});

async function callDownstream(request) {
  // Wait for token (backpressure)
  await limiter.removeTokens(1);
  
  return await downstreamService.call(request);
}
```

### 2. Bounded Queues

Queue requests with explicit limits:

```javascript
class BoundedQueue {
  constructor(capacity) {
    this.capacity = capacity;
    this.queue = [];
    this.waiting = [];
  }
  
  async enqueue(item) {
    if (this.queue.length >= this.capacity) {
      // Queue full - apply backpressure
      throw new QueueFullError('Cannot accept more items');
    }
    
    this.queue.push(item);
    
    // Notify waiting consumers
    if (this.waiting.length > 0) {
      const resolve = this.waiting.shift();
      resolve(this.queue.shift());
    }
  }
  
  async dequeue() {
    if (this.queue.length > 0) {
      return this.queue.shift();
    }
    
    // Wait for item
    return new Promise(resolve => {
      this.waiting.push(resolve);
    });
  }
}

// Usage
const queue = new BoundedQueue(100);

// Producer
async function produce(items) {
  for (const item of items) {
    try {
      await queue.enqueue(item);
    } catch (error) {
      if (error instanceof QueueFullError) {
        // Apply backpressure - slow down
        await delay(100);
        await queue.enqueue(item); // Retry
      }
    }
  }
}

// Consumer
async function consume() {
  while (true) {
    const item = await queue.dequeue();
    await process(item);
  }
}
```

### 3. Credit-Based Flow Control

Consumer grants credits to producer:

```javascript
class CreditBasedProducer {
  constructor(consumer) {
    this.consumer = consumer;
    this.credits = 0;
    this.pending = [];
  }
  
  async send(data) {
    if (this.credits > 0) {
      this.credits--;
      await this.consumer.receive(data);
    } else {
      // No credits - must wait
      await new Promise(resolve => this.pending.push(resolve));
      this.credits--;
      await this.consumer.receive(data);
    }
  }
  
  receiveCredits(count) {
    this.credits += count;
    // Resume pending sends
    while (this.pending.length > 0 && this.credits > 0) {
      const resolve = this.pending.shift();
      resolve();
    }
  }
}

class CreditBasedConsumer {
  constructor(producer, maxCredits) {
    this.producer = producer;
    this.availableCredits = maxCredits;
    this.maxCredits = maxCredits;
    this.queue = [];
  }
  
  async receive(data) {
    this.queue.push(data);
    this.availableCredits--;
    
    // Process when ready
    await this.processQueue();
  }
  
  async processQueue() {
    while (this.queue.length > 0 && this.canProcess()) {
      const item = this.queue.shift();
      await this.process(item);
      
      // Replenish credits
      this.availableCredits++;
      await this.producer.receiveCredits(1);
    }
  }
  
  canProcess() {
    // Only process if we have capacity
    return this.processingCount < this.maxConcurrent;
  }
}
```

### 4. Circuit Breaker as Backpressure

Circuit breakers can signal backpressure by opening:

```javascript
class BackpressureCircuitBreaker {
  constructor(threshold) {
    this.queueSize = 0;
    this.threshold = threshold;
    this.state = 'CLOSED';
  }
  
  canAccept() {
    if (this.queueSize >= this.threshold) {
      this.state = 'OPEN';
      return false;
    }
    return this.state === 'CLOSED';
  }
  
  async execute(fn) {
    if (!this.canAccept()) {
      throw new BackpressureError('Circuit open - apply backpressure');
    }
    
    this.queueSize++;
    try {
      return await fn();
    } finally {
      this.queueSize--;
      if (this.queueSize < this.threshold * 0.8) {
        this.state = 'CLOSED';
      }
    }
  }
}
```

## FOE Alignment

**Primary: Confidence to Act**

Backpressure provides confidence that the system won't collapse under load. When components signal overload, upstream systems respond by throttling, creating a self-protecting system. This confidence enables teams to deploy without fear of traffic spikes causing outages.

**Secondary: Fast Feedback Loops**

Backpressure creates immediate feedback about system capacity. Instead of discovering overload through failures or timeouts, components receive explicit signals to slow down. This rapid feedback enables quick adaptation to changing load conditions.

## Benefits

- ✅ **Prevents cascade failures** - Overload contained at bottleneck
- ✅ **Self-regulating** - System automatically adjusts to capacity
- ✅ **Graceful degradation** - Slows down rather than crashes
- ✅ **Resource protection** - Prevents memory exhaustion from queues
- ✅ **Predictable behavior** - Known capacity limits vs. unpredictable failures

## Trade-offs

- ⚠️ **Latency increase** - Throttling adds delays
- ⚠️ **Complexity** - Requires coordination between components
- ⚠️ **Client handling** - Clients must respect backpressure signals
- ⚠️ **Potential deadlock** - Poorly implemented backpressure can stall system

## When to Use

✅ **Essential for:**
- Streaming data processing (Kafka, RabbitMQ)
- Microservices with varying capacities
- Systems with bursty traffic patterns
- Resource-constrained environments
- Any async message processing

❌ **Can simplify when:**
- Synchronous request-response only
- Load is predictable and steady
- Resources are abundant
- All components have equal capacity

## Backpressure Strategies

### 1. Drop (Lossy)

```javascript
// When overloaded, drop new requests
if (queue.isFull()) {
  metrics.increment('dropped_requests');
  return; // Silently drop
}
```

**Use for:** Metrics, logs, non-critical telemetry
**Trade-off:** Data loss

### 2. Buffer (Lossless)

```javascript
// Queue with backpressure to producer
while (queue.isFull()) {
  await sleep(10); // Back off
}
await queue.enqueue(item);
```

**Use for:** Critical data that cannot be lost
**Trade-off:** Increased latency

### 3. Shed Load

```javascript
// Reject requests with retry guidance
if (load > threshold) {
  res.status(503).header('Retry-After', 5).send('Overloaded');
}
```

**Use for:** HTTP APIs, client can retry
**Trade-off:** Client must handle retries

### 4. Elastic Scaling

```javascript
// Scale out when backpressure detected
if (queue.depth > scaleUpThreshold) {
  await autoScaler.scaleUp();
}
```

**Use for:** Cloud environments, stateless services
**Trade-off:** Cost, scaling delays

## Integration with Reactive Streams

The Reactive Streams standard (Java, JavaScript, .NET):

```java
// Java Reactive Streams example
Publisher<Data> publisher = createPublisher();
Subscriber<Data> subscriber = new Subscriber<Data>() {
    private Subscription subscription;
    private int credits = 10;
    
    @Override
    public void onSubscribe(Subscription s) {
        this.subscription = s;
        // Request initial batch
        s.request(credits);
    }
    
    @Override
    public void onNext(Data data) {
        process(data);
        credits--;
        
        // When running low, request more
        if (credits < 3) {
            int more = 10 - credits;
            subscription.request(more);
            credits += more;
        }
    }
    // ... onError, onComplete
};

publisher.subscribe(subscriber);
```

## Monitoring

Track these metrics:

```javascript
const backpressureMetrics = {
  // Queue depth signals backpressure need
  'queue.depth': gauge,
  'queue.utilization': gauge, // depth / capacity
  
  // Backpressure events
  'backpressure.applied': counter, // Times throttling engaged
  'backpressure.duration': histogram, // How long throttled
  
  // Downstream signals
  'rate_limit.hits': counter,
  'rate_limit.current': gauge,
  
  // Upstream behavior
  'requests.throttled': counter,
  'retry.attempts': counter
};
```

## Anti-Patterns

### ❌ Unbounded Queues

```javascript
// WRONG: Queue grows without limit
const queue = [];
while (true) {
  queue.push(await receive()); // Memory exhaustion!
}

// RIGHT: Bounded queue with backpressure
const queue = new BoundedQueue(1000);
while (true) {
  await queue.enqueue(await receive()); // Blocks when full
}
```

### ❌ Ignoring Backpressure Signals

```javascript
// WRONG: Retry immediately without respecting Retry-After
async function callService(request) {
  try {
    return await httpClient.post('/api', request);
  } catch (error) {
    if (error.status === 503) {
      await delay(100); // Arbitrary delay
      return await callService(request); // Retry storm!
    }
  }
}

// RIGHT: Respect server's guidance
async function callService(request) {
  try {
    return await httpClient.post('/api', request);
  } catch (error) {
    if (error.status === 503) {
      const retryAfter = error.response.headers['retry-after'] || 5;
      await delay(retryAfter * 1000);
      return await callService(request);
    }
  }
}
```

### ❌ Synchronous Backpressure in Async Chain

```javascript
// WRONG: Blocking call breaks async flow
async function processStream(source) {
  for await (const item of source) {
    await slowOperation(item); // Blocks entire stream
  }
}

// RIGHT: Use async backpressure
const pipeline = source
  .pipe(new Transform({
    async transform(chunk, encoding, callback) {
      await slowOperation(chunk);
      callback(); // Signals ready for next
    }
  }));
```

## Known Uses

- **Reactive Streams** - Java, JavaScript, .NET standard
- **Akka Streams** - Actor-based streaming with backpressure
- **RxJS** - Reactive extensions with backpressure operators
- **Apache Kafka** - Consumer lag as backpressure signal
- **gRPC** - HTTP/2 flow control
- **Netflix Zuul** - Request throttling

## References

- Reactive Streams Specification: [reactive-streams.org](https://www.reactive-streams.org/)
- [Reactive Manifesto](https://www.reactivemanifesto.org/) - Defines responsive, resilient, elastic, message-driven systems
- [Backpressure - Reactive Manifesto Glossary](https://www.reactivemanifesto.org/glossary#Back-Pressure)
- Venkat, S. (2016). "Reactive Programming with RxJS." Pragmatic Bookshelf.
- Vernon, V. (2016). *Reactive Messaging Patterns with the Actor Model*. Addison-Wesley.
- [Akka Streams Backpressure](https://doc.akka.io/docs/akka/current/stream/stream-flows-and-basics.html#back-pressure-explained)
