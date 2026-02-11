---
methodId: M248
displayed_sidebar: fieldGuideSidebar
sidebar_position: 9
title: CQRS Integration
pillar: advanced-patterns
description: Separating command (write) and query (read) responsibilities in event-sourced systems.
---

# CQRS Integration

**Pillar:** Advanced Patterns

CQRS Integration describes how to effectively separate command (write) and query (read) responsibilities when using Event Sourcing. While CQRS and Event Sourcing are independent patterns, they complement each other powerfully.

## Definition

> CQRS (Command Query Responsibility Segregation) is the pattern of separating read operations from write operations. In event-sourced systems, the write model persists events while the read model is built from projections of those events.

## Why CQRS + Event Sourcing Work Together

| Challenge | Event Sourcing Alone | With CQRS |
|-----------|---------------------|-----------|
| **Querying** | Event stores are bad for queries | Read models optimized for queries |
| **Performance** | Reconstructing state is slow | Read models provide fast access |
| **Flexibility** | Single data model | Multiple optimized read models |
| **Scaling** | Write and read coupled | Independent scaling |

## The Architecture

```
┌──────────────┐     ┌──────────────┐
│   Command    │────▶│  Aggregate   │
│   Handler    │     │  (Write Model)│
└──────────────┘     └──────┬───────┘
                            │
                            ▼
                     ┌──────────────┐
                     │  Event Store │
                     │ (Append-Only)│
                     └──────┬───────┘
                            │
              ┌─────────────┼─────────────┐
              │             │             │
              ▼             ▼             ▼
       ┌──────────┐  ┌──────────┐  ┌──────────┐
       │Projection│  │Projection│  │Projection│
       │   API    │  │ Analytics│  │Reporting │
       └────┬─────┘  └────┬─────┘  └────┬─────┘
            │             │             │
            ▼             ▼             ▼
       ┌──────────┐  ┌──────────┐  ┌──────────┐
       │  Read    │  │  Read    │  │  Read    │
       │  Model   │  │  Model   │  │  Model   │
       │ (SQL/No) │  │ (Search) │  │  (OLAP)  │
       └────┬─────┘  └────┬─────┘  └────┬─────┘
            │             │             │
            └─────────────┼─────────────┘
                          ▼
                   ┌──────────────┐
                   │    Query     │
                   │   Handler    │
                   └──────────────┘
```

## Write Model (Command Side)

The write model uses Event Sourcing:

```typescript
// Command Handler
class OrderCommandHandler {
  constructor(
    private eventStore: EventStore,
    private eventBus: EventBus
  ) {}

  async handle(command: SubmitOrderCommand): Promise<void> {
    // Load aggregate
    const events = await this.eventStore.readStream(command.orderId);
    let order = new Order();
    
    for (const event of events) {
      order = order.applyEvent(event);
    }
    
    // Execute business logic
    const newEvents = order.submit(command);
    
    // Store events
    await this.eventStore.append(command.orderId, newEvents, {
      expectedVersion: events.length
    });
    
    // Publish to event bus
    for (const event of newEvents) {
      await this.eventBus.publish(event);
    }
  }
}
```

Characteristics of the write model:
- **Validates commands** - Business rules enforced here
- **Produces events** - Only output is domain events
- **Optimized for consistency** - ACID transactions
- **Not for querying** - No query methods on aggregates

## Read Model (Query Side)

The read model is built from projections:

```typescript
// Query Handler
class OrderQueryHandler {
  constructor(private readModel: OrderReadModel) {}

  async getOrderSummary(orderId: string): Promise<OrderSummary> {
    // Direct query on optimized read model
    return await this.readModel.findById(orderId);
  }

  async getOrdersByCustomer(customerId: string): Promise<OrderSummary[]> {
    // Uses index on read model
    return await this.readModel.findByCustomer(customerId);
  }

  async searchOrders(criteria: SearchCriteria): Promise<OrderSearchResult> {
    // Full-text search on read model
    return await this.readModel.search(criteria);
  }
}
```

Characteristics of the read model:
- **Optimized for queries** - Denormalized, indexed
- **Multiple representations** - Different views for different use cases
- **Eventually consistent** - May lag behind writes
- **No business logic** - Pure data retrieval

## Projection Options

### 1. In-Process Projections

Update projections in the same process as commands:

```typescript
async function handleCommand(command) {
  const events = aggregate.process(command);
  
  await transaction.begin();
  try {
    await eventStore.append(events);
    await projection.update(events);  // Same transaction
    await transaction.commit();
  } catch (e) {
    await transaction.rollback();
  }
}
```

**Pros:** Strong consistency  
**Cons:** Slower writes, coupled availability

### 2. Out-of-Process Projections

Separate services subscribe to events:

```typescript
// Projection Service
class OrderProjectionService {
  async consume(event: DomainEvent): Promise<void> {
    switch (event.type) {
      case 'OrderCreated':
        await this.orderReadModel.insert({
          orderId: event.orderId,
          customerId: event.customerId,
          status: 'pending',
          total: 0
        });
        break;
        
      case 'OrderSubmitted':
        await this.orderReadModel.update(
          event.orderId,
          { status: 'submitted' }
        );
        break;
    }
  }
}
```

**Pros:** Independent scaling, better performance  
**Cons:** Eventual consistency

## Consistency Models

### Strong Consistency

Read model updated in same transaction as events:

```typescript
// Client sees their own writes immediately
await commandHandler.handle(command);
const result = await queryHandler.getById(id);  // Up to date
```

**Use when:** Users expect immediate consistency (e.g., after submitting a form)

### Eventual Consistency

Read model updated asynchronously:

```typescript
// Client may see stale data briefly
await commandHandler.handle(command);
const result = await queryHandler.getById(id);  // May be stale
```

**Use when:** Real-time consistency isn't critical

## Handling Eventual Consistency in UI

### 1. Optimistic Updates

Update UI immediately, sync with server in background:

```typescript
function submitOrder() {
  // Update UI immediately
  updateUI({ status: 'submitted' });
  
  // Send command
  await commandApi.submitOrder(orderId);
  
  // Poll for confirmation
  await pollForUpdate(orderId);
}
```

### 2. Loading States

Show loading state while read model catches up:

```
[Submit Order]
  ↓
[Processing...]
  ↓
[Order Submitted!]
  ↓
[Loading order details...]
  ↓
[Show order details]
```

### 3. Command Result Returns Data

Return read model data in command response:

```typescript
interface SubmitOrderResult {
  success: boolean;
  orderId: string;
  orderSummary: OrderSummary;  // Return read model data
}
```

## Multiple Read Models

Different read models for different use cases:

```typescript
// API Query Model - Fast lookups
interface OrderApiModel {
  orderId: string;
  customerId: string;
  status: string;
  total: Money;
  itemCount: number;
}

// Search Model - Full-text search
interface OrderSearchModel {
  orderId: string;
  customerName: string;
  customerEmail: string;
  items: string[];  // Searchable item names
  total: number;
}

// Reporting Model - Analytics
interface OrderReportingModel {
  orderId: string;
  customerSegment: string;
  orderDate: Date;
  total: Money;
  shippingCost: Money;
  profit: Money;
}
```

## When NOT to Use CQRS

:::caution CQRS Complexity Warning

CQRS adds significant complexity. Don't use when:

1. **Simple CRUD** - System has simple read/write patterns
2. **Small team** - Team can't manage separate models
3. **Tight deadlines** - Learning curve is significant
4. **No scalability needs** - Simple system with low load
5. **Strong consistency required everywhere** - Eventual consistency is complex

:::

## Common Mistakes

### 1. Putting Query Logic in Aggregates

**Bad:**
```typescript
class Order {
  getTotalSpentByCustomer(customerId: string): Money {
    // Query logic in aggregate!
  }
}
```

**Good:**
```typescript
class Order {
  // Only command methods
  submit(): DomainEvent[] { }
  addLineItem(): DomainEvent[] { }
}

// Query in read model
class OrderReadModel {
  async getTotalSpentByCustomer(customerId: string): Promise<Money> { }
}
```

### 2. Direct Database Access from Commands

Commands should only interact with aggregates, not query databases directly.

### 3. Ignoring Eventual Consistency

Users will see stale data. Design the UI to handle it gracefully.

### 4. Too Many Read Models

Start with one read model. Add more only when needed.

## CQRS Without Event Sourcing

CQRS can be used with traditional CRUD:

```typescript
// Write model
class OrderWriteModel {
  async createOrder(data: CreateOrderData): Promise<void> {
    await db.orders.insert(data);
    await publish('OrderCreated', data);
  }
}

// Read model - separate table
class OrderReadModel {
  async getOrder(id: string): Promise<OrderDto> {
    return await db.orderViews.findById(id);
  }
}
```

**Trade-offs:**
- Simpler than Event Sourcing
- But: Two sources of truth (write DB and read DB)
- Data synchronization challenges
- No event history

## FOE Alignment

CQRS Integration supports **Fast Feedback Loops** by enabling optimized read models that respond quickly to queries. Users see results immediately rather than waiting for complex queries to execute.

The separation also enhances **Understanding** - having distinct models for reads and writes makes each model simpler and more focused. Teams can reason about the write model (business rules) separately from read models (query optimization).

## Further Reading

- [Martin Fowler - CQRS](https://martinfowler.com/bliki/CQRS.html)
- [Greg Young - CQRS Documents](https://cqrs.wordpress.com/documents/)
- [Microsoft - CQRS Pattern](https://docs.microsoft.com/en-us/azure/architecture/patterns/cqrs)
