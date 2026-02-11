---
methodId: M229
displayed_sidebar: fieldGuideSidebar
sidebar_position: 7
title: CQRS (Microservices)
description: Command Query Responsibility Segregation separates read and write models, enabling optimized data access patterns and independent scaling in microservices.
framework: microservices
framework_url: https://microservices.io/patterns/data/cqrs.html
foe_alignment:
  primary: Understanding
  secondary: Feedback
status: well-established
pillar: data-patterns
---

# CQRS (Command Query Responsibility Segregation)

**Pillar:** Data Patterns

CQRS separates the read and write operations of a service into distinct models. Commands (writes) use one data model optimized for updates, while queries (reads) use a different model optimized for retrieval. In microservices, CQRS often involves separating read and write services entirely, with data synchronized through events.

## Definition

> "CQRS stands for Command Query Responsibility Segregation. It's a pattern that separates read and update operations for a data store. Implementing CQRS in your application can maximize its performance, scalability, and security."
> — Microsoft Azure Architecture Center

## Why It Matters

Traditional CRUD approaches have limitations:

- **Read/write contention** - Reads and writes compete for database resources
- **Schema compromises** - Schema optimized for writes may be slow for reads
- **Complex queries** - Aggregations and joins impact write performance
- **Scaling challenges** - Can't scale reads and writes independently

CQRS addresses these by:
- **Optimizing separately** - Different models for reads vs writes
- **Independent scaling** - Scale read replicas without affecting writes
- **Tailored schemas** - Read models denormalized for specific queries
- **Separation of concerns** - Different teams can own read vs write paths

## How It Works

### Basic CQRS

```
┌──────────────┐
│   Client     │
└──────┬───────┘
       │
       ▼
┌─────────────────────────────────────┐
│           Command Side               │
│  ┌──────────────────────────────┐  │
│  │  Command Handler             │  │
│  │  - Validate                  │  │
│  │  - Update Write Model        │  │
│  └──────────────────────────────┘  │
│              │                       │
│              ▼                       │
│  ┌──────────────────────────────┐  │
│  │  Write Database              │  │
│  │  (Normalized, ACID)          │  │
│  └──────────────────────────────┘  │
└─────────────────────────────────────┘
              │
              │ Events published
              ▼
┌─────────────────────────────────────┐
│            Query Side                │
│  ┌──────────────────────────────┐  │
│  │  Event Handler               │  │
│  │  - Update Read Model         │  │
│  └──────────────────────────────┘  │
│              │                       │
│              ▼                       │
│  ┌──────────────────────────────┐  │
│  │  Read Database(s)            │  │
│  │  (Denormalized, optimized)   │  │
│  └──────────────────────────────┘  │
│              ▲                       │
│  ┌───────────┴────────────────┐  │
│  │  Query Handler             │  │
│  │  - Simple lookups          │  │
│  │  - No business logic       │  │
│  └──────────────────────────────┘  │
└─────────────────────────────────────┘
```

### Command Side

```javascript
class OrderCommandService {
  async createOrder(command) {
    // 1. Validate
    await this.validateCommand(command);
    
    // 2. Update write model
    const order = await this.writeDb.orders.create({
      customerId: command.customerId,
      items: command.items,
      total: this.calculateTotal(command.items),
      status: 'PENDING',
      createdAt: new Date()
    });
    
    // 3. Publish event
    await this.eventBus.publish('OrderCreated', {
      orderId: order.id,
      customerId: order.customerId,
      total: order.total,
      timestamp: order.createdAt
    });
    
    return { orderId: order.id };
  }
  
  async updateOrderStatus(orderId, status) {
    await this.writeDb.orders.update(orderId, { status });
    
    await this.eventBus.publish('OrderStatusUpdated', {
      orderId,
      status,
      timestamp: new Date()
    });
  }
}
```

### Query Side

```javascript
class OrderQueryService {
  // Simple, fast lookups - no joins needed
  
  async getOrderById(orderId) {
    return await this.readDb.orders.findOne({ orderId });
  }
  
  async getOrdersByCustomer(customerId) {
    return await this.readDb.orders.find({ customerId })
      .sort({ createdAt: -1 })
      .limit(100);
  }
  
  async getOrderSummary(customerId) {
    // Pre-aggregated data
    return await this.readDb.orderSummaries.findOne({ customerId });
  }
  
  async searchOrders(criteria) {
    // Optimized for search (could use Elasticsearch)
    return await this.readDb.orderSearchIndex.search(criteria);
  }
}
```

## Implementation Patterns

### 1. Single Database, Separate Schemas

```sql
-- Write schema (normalized)
CREATE TABLE write.orders (
  id UUID PRIMARY KEY,
  customer_id UUID REFERENCES write.customers(id),
  status VARCHAR(20),
  created_at TIMESTAMP
);

-- Read schema (denormalized)
CREATE TABLE read.order_details (
  order_id UUID PRIMARY KEY,
  customer_name VARCHAR(255),
  customer_email VARCHAR(255),
  order_total DECIMAL(10,2),
  item_count INT,
  status VARCHAR(20)
);
```

**Pros:** Simple, transactional consistency
**Cons:** Limited optimization, same scaling constraints

### 2. Separate Databases

```javascript
// Write database - PostgreSQL for ACID compliance
const writeDb = new PostgreSQL({
  host: 'write-db.internal',
  database: 'orders_write'
});

// Read database - MongoDB for flexible queries
const readDb = new MongoDB({
  host: 'read-db.internal',
  database: 'orders_read'
});
```

**Pros:** Optimized for each workload, independent scaling
**Cons:** Eventual consistency, more complexity

### 3. Event Sourcing + CQRS

Combine with Event Sourcing for audit trail and temporal queries:

```javascript
// Commands append events
async function createOrder(command) {
  const event = new OrderCreatedEvent({
    orderId: generateId(),
    customerId: command.customerId,
    items: command.items
  });
  
  await eventStore.append(event);
  await eventBus.publish(event);
}

// Read models project from events
eventBus.on('OrderCreated', async (event) => {
  await readDb.orders.insert({
    orderId: event.orderId,
    customerId: event.customerId,
    status: 'PENDING',
    total: calculateTotal(event.items)
  });
});
```

## Read Model Optimization

### Denormalization Strategies

Create read models optimized for specific queries:

```javascript
// Order list view (for customer dashboard)
{
  orderId: "123",
  customerId: "456",
  total: 99.99,
  itemCount: 3,
  status: "SHIPPED",
  createdAt: "2024-01-15T10:30:00Z",
  // Denormalized: avoid joins
  customerName: "John Doe",
  shippingAddress: { ... }
}

// Order detail view (for order page)
{
  orderId: "123",
  customer: { /* full customer details */ },
  items: [ /* full item details with product info */ ],
  payments: [ /* payment history */ ],
  shipments: [ /* tracking info */ ],
  timeline: [ /* status changes */ ]
}

// Order summary for reports
{
  orderId: "123",
  customerId: "456",
  total: 99.99,
  region: "US-West",
  category: "Electronics",
  quarter: "Q1-2024",
  // Pre-aggregated for analytics
  profitMargin: 0.23
}
```

### Multiple Read Models

Support different query patterns with specialized stores:

```
                    Events
                       │
        ┌──────────────┼──────────────┐
        ▼              ▼              ▼
┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│ Relational   │ │ Elasticsearch│ │   Redis      │
│ (PostgreSQL) │ │   (Search)   │ │  (Cache)     │
├──────────────┤ ├──────────────┤ ├──────────────┤
│ List queries │ │ Full-text    │ │ Hot data     │
│ Reports      │ │ Search       │ │ Session data │
└──────────────┘ └──────────────┘ └──────────────┘
```

## FOE Alignment

**Primary: Optimize for Understanding**

CQRS makes the system more understandable by separating the complex business logic of commands from the straightforward data retrieval of queries. Each side has a single responsibility, making the code easier to reason about. Different read models can be tailored to specific use cases, making queries intuitive for their consumers.

**Secondary: Fast Feedback Loops**

Read models optimized for specific queries provide fast response times. When users query the system, they get immediate results from pre-computed, denormalized data rather than waiting for complex joins. Commands can be processed asynchronously while queries return instantly.

## Benefits

- ✅ **Independent optimization** - Tune read and write models separately
- ✅ **Independent scaling** - Scale read replicas without affecting writes
- ✅ **Simplified queries** - No complex joins in read models
- ✅ **Team autonomy** - Separate teams can own read vs write sides
- ✅ **Technology diversity** - Use best database for each workload
- ✅ **Event-driven** - Natural fit with event sourcing and microservices

## Trade-offs

- ⚠️ **Complexity** - Two models to maintain instead of one
- ⚠️ **Eventual consistency** - Read models lag behind writes
- ⚠️ **Data synchronization** - Must handle event processing failures
- ⚠️ **Learning curve** - Different pattern from traditional CRUD
- ⚠️ **Over-engineering risk** - Not needed for simple domains

## When to Use

✅ **Use when:**
- Read and write workloads have very different requirements
- Complex queries are slowing down write performance
- You need to scale reads independently of writes
- Different teams own reading vs writing data
- Domain has clear command/query separation

❌ **Avoid when:**
- Simple CRUD operations dominate
- Strong immediate consistency is required for reads
- Team is new to distributed systems
- Domain model is simple and stable
- Eventual consistency is unacceptable

## Consistency Considerations

### Eventual Consistency

Read models are eventually consistent with the write model:

```javascript
// Write happens at T0
await orderService.createOrder(command);

// Read at T0 + 10ms might not see the order yet
const order = await orderQuery.getOrder(orderId);
// order could be null

// Solutions:
// 1. Retry with backoff
// 2. Return write model for immediate reads
// 3. Use synchronous projection for critical paths
```

### Handling Stale Data

```javascript
class OrderQueryService {
  async getOrder(orderId, options = {}) {
    const order = await this.readDb.orders.findOne({ orderId });
    
    // Check staleness if needed
    if (options.maxStaleness) {
      const staleness = Date.now() - order.lastUpdated.getTime();
      if (staleness > options.maxStaleness) {
        // Fallback to write model or wait
        return await this.waitForFreshData(orderId, options.maxStaleness);
      }
    }
    
    return order;
  }
}
```

## Anti-Patterns

### ❌ CQRS for Everything

Don't apply CQRS to simple domains:

```javascript
// WRONG: Over-engineered
class UserCommandService {
  async createUser(data) { /* complex event sourcing */ }
}

class UserQueryService {
  async getUser(id) { /* separate read model */ }
}

// RIGHT: Simple CRUD is fine for simple cases
class UserService {
  async createUser(data) { return await db.users.create(data); }
  async getUser(id) { return await db.users.findById(id); }
}
```

### ❌ Commands Doing Queries

Commands should not query the read model:

```javascript
// WRONG: Command queries read model
async function updateOrderStatus(orderId, status) {
  const order = await readDb.orders.findOne({ orderId }); // ❌
  if (order.status === 'SHIPPED') throw new Error('Cannot modify shipped order');
  
  await writeDb.orders.update(orderId, { status });
}

// RIGHT: Command validates using write model
async function updateOrderStatus(orderId, status) {
  const order = await writeDb.orders.findOne({ orderId });
  if (order.status === 'SHIPPED') throw new Error('Cannot modify shipped order');
  
  await writeDb.orders.update(orderId, { status });
}
```

### ❌ Leaky Abstraction

Don't expose internal read model structure:

```javascript
// WRONG: API returns raw read model
app.get('/orders/:id', async (req, res) => {
  const order = await readDb.orders.findOne({ _id: req.params.id });
  res.json(order); // Exposes internal structure
});

// RIGHT: Transform to API contract
app.get('/orders/:id', async (req, res) => {
  const order = await queryService.getOrder(req.params.id);
  res.json(toOrderDto(order)); // Controlled API shape
});
```

## Known Uses

- **Event Store** - Event sourcing platform built on CQRS
- **Axon Framework** - Java framework for CQRS and event sourcing
- **Spotify** - CQRS for playlist and user data
- **Microsoft** - Azure Cosmos DB changefeed for read models
- **eBay** - Large-scale CQRS for search and listings

## References

- Young, G. (2010). [CQRS, Task Based UIs, Event Sourcing agh!](https://codebetter.com/gregyoung/2010/02/16/cqrs-task-based-uis-event-sourcing-agh/)
- Richardson, C. (2018). *Microservices Patterns*. Chapter 6: Business Logic with Event Sourcing.
- [CQRS Pattern - Microsoft](https://docs.microsoft.com/en-us/azure/architecture/patterns/cqrs)
- [CQRS - microservices.io](https://microservices.io/patterns/data/cqrs.html)
- [Vaughn Vernon: Implementing Domain-Driven Design](https://www.oreilly.com/library/view/implementing-domain-driven-design/9780133039900/)
- [Eventuate CQRS](https://eventuate.io/docs/manual/eventuate-tram/latest/cqrs.html)
