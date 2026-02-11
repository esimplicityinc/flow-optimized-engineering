---
methodId: M238
displayed_sidebar: fieldGuideSidebar
sidebar_position: 4
title: Integration Styles
pillar: modularity
description: Choosing between direct method calls, domain events, and message queues for module communication based on coupling requirements and consistency needs.
---

# Integration Styles

**Pillar:** Modularity

Integration styles define how modules communicate within a modular monolith. The choice between synchronous and asynchronous patterns, direct calls and events, significantly impacts coupling, consistency, and the ability to evolve modules independently.

## Definition

> Integration style refers to the mechanism by which modules exchange information and coordinate actions, ranging from synchronous direct calls to asynchronous event-driven communication, each with different trade-offs in coupling, consistency, and latency.

## Integration Patterns Overview

| Style | Coupling | Consistency | Latency | Use Case |
|-------|----------|-------------|---------|----------|
| **Direct Call** | Tight | Strong | Low | Queries, simple operations |
| **Domain Events** | Loose | Eventual | Low | State changes, notifications |
| **Outbox Pattern** | Loose | Strong | Medium | Critical state changes |
| **CQRS** | Loose | Eventual | Low | Read-heavy, complex queries |

## Pattern 1: Direct Method Calls

The simplest integration—modules call each other's APIs directly.

### When to Use

- **Query operations**: "Get me the product details"
- **Simple commands**: "Reserve inventory" (when immediate confirmation needed)
- **Same transaction requirements**: Both operations must succeed or fail together

### Implementation

```typescript
// Orders module calls Catalog module directly
class OrderService {
  constructor(
    private catalogAPI: CatalogAPI,  // Injected interface
    private inventoryAPI: InventoryAPI
  ) {}
  
  async createOrder(command: CreateOrderCommand): Promise<Order> {
    // Synchronous call to Catalog
    const product = await this.catalogAPI.getProduct(command.productId);
    
    // Synchronous call to Inventory (same transaction)
    await this.inventoryAPI.reserveStock(
      command.productId, 
      command.quantity
    );
    
    // Create order within same unit of work
    return this.orderRepository.save(new Order({
      productId: product.id,
      productName: product.name,
      quantity: command.quantity,
      price: product.currentPrice
    }));
  }
}
```

### Trade-offs

**Pros:**
- Simple to implement and understand
- Immediate feedback
- Easy to debug (stack traces)
- Can share transaction

**Cons:**
- Tight coupling (caller knows about callee)
- Temporal coupling (both must be available)
- Cascade failures possible
- Harder to scale independently

## Pattern 2: Domain Events

Modules communicate through events representing business occurrences.

### When to Use

- **State changes**: "Order was placed", "Payment completed"
- **Loose coupling needed**: Publisher doesn't know about subscribers
- **Multiple consumers**: Several modules need to react
- **Eventual consistency acceptable**

### Implementation

```typescript
// Event definition (in shared kernel or publisher's domain)
class OrderPlacedEvent {
  constructor(
    public readonly orderId: string,
    public readonly customerId: string,
    public readonly items: OrderItem[],
    public readonly totalAmount: Money,
    public readonly occurredAt: Date
  ) {}
}

// Publishing module (Orders)
class OrderService {
  async placeOrder(command: PlaceOrderCommand): Promise<Order> {
    const order = Order.create(command);
    await this.orderRepository.save(order);
    
    // Publish event after successful save
    await this.eventBus.publish(new OrderPlacedEvent(
      order.id,
      order.customerId,
      order.items,
      order.total,
      new Date()
    ));
    
    return order;
  }
}

// Subscribing module (Shipping)
class ShippingEventHandlers {
  @EventHandler(OrderPlacedEvent)
  async onOrderPlaced(event: OrderPlacedEvent): Promise<void> {
    await this.shippingService.createShipment(
      event.orderId,
      event.items
    );
  }
}

// Subscribing module (Analytics)
class AnalyticsEventHandlers {
  @EventHandler(OrderPlacedEvent)
  async onOrderPlaced(event: OrderPlacedEvent): Promise<void> {
    await this.analytics.trackOrder(event);
  }
}
```

### Transaction Consistency

Critical question: Should event publishing be in the same transaction as the business operation?

**Option A: Same Transaction (Two-Phase Commit)**
```typescript
// Using Outbox Pattern
@Transactional
async placeOrder(command: PlaceOrderCommand): Promise<Order> {
  const order = Order.create(command);
  await this.orderRepository.save(order);
  
  // Save event to outbox table (same transaction)
  await this.outboxRepository.save(new OutboxEvent({
    type: 'OrderPlaced',
    payload: serialize(order)
  }));
  // Event relay processes outbox asynchronously
}
```

**Option B: Separate Transaction (At-Least-Once)**
```typescript
async placeOrder(command: PlaceOrderCommand): Promise<Order> {
  const order = Order.create(command);
  await this.orderRepository.save(order);
  
  // Fire and forget - separate transaction
  // Risk: Event may not be published if this fails
  this.eventBus.publish(new OrderPlacedEvent(...));
  
  return order;
}
```

### Trade-offs

**Pros:**
- Loose coupling (publisher unaware of subscribers)
- Easy to add new consumers
- Better availability (asynchronous)
- Natural audit trail

**Cons:**
- Eventual consistency complexity
- Harder to trace (distributed tracing needed)
- Risk of event loss
- Duplicate event handling (idempotency required)

## Pattern 3: Outbox Pattern

Solves the dual-write problem (database + message broker) by using an outbox table.

### The Problem

```typescript
// This has a consistency problem
async placeOrder(command): Promise<Order> {
  await db.save(order);           // Transaction 1
  await eventBus.publish(event);  // Network call - may fail
  // If publish fails, DB is updated but event is lost
  // If publish succeeds but process crashes before commit,
  // event is sent but DB rolled back
}
```

### The Solution

```typescript
// Outbox table schema
interface OutboxEvent {
  id: string;           // UUID
  type: string;         // Event type
  payload: string;      // JSON payload
  occurredAt: Date;
  processedAt?: Date;   // Null until processed
}

// Business operation
@Transactional
async placeOrder(command): Promise<Order> {
  const order = Order.create(command);
  await this.orderRepository.save(order);
  
  // Write to outbox (same transaction as business data)
  await this.outboxRepository.save({
    id: generateUUID(),
    type: 'OrderPlaced',
    payload: JSON.stringify({
      orderId: order.id,
      // ... other fields
    }),
    occurredAt: new Date()
  });
}

// Separate relay process (outbox publisher)
class OutboxPublisher {
  @Scheduled(every: '5s')
  async publishEvents(): Promise<void> {
    const events = await this.outboxRepository.findUnprocessed(100);
    
    for (const event of events) {
      try {
        await this.eventBus.publish(event);
        await this.outboxRepository.markProcessed(event.id);
      } catch (error) {
        // Will retry on next cycle
        this.logger.error('Failed to publish event', { eventId: event.id, error });
      }
    }
  }
}
```

### When to Use

- **Critical business events** that must not be lost
- **Exactly-once semantics** required
- **Complex transaction boundaries**

## Pattern 4: CQRS (Command Query Responsibility Segregation)

Separates read and write models, often with different integration patterns for each.

### When to Use

- **Read-heavy domains** with complex queries
- **Different access patterns** for reads vs writes
- **Query performance** is critical
- **Event sourcing** combined with projections

### Implementation

```typescript
// Command side (write model)
class OrderCommandService {
  async placeOrder(command: PlaceOrderCommand): Promise<void> {
    const order = Order.create(command);
    await this.orderRepository.save(order);
    await this.eventStore.append(order.uncommittedEvents);
  }
}

// Query side (read model) - separate module or optimized view
class OrderQueryService {
  async getOrderDetails(orderId: string): Promise<OrderDetailsDTO> {
    // Optimized query, may use different database
    return this.orderReadModel.findById(orderId);
  }
  
  async searchOrders(criteria: SearchCriteria): Promise<OrderListDTO> {
    // Complex query with joins, aggregations
    return this.orderReadModel.search(criteria);
  }
}

// Event handler updates read model
class OrderProjectionHandler {
  @EventHandler(OrderPlacedEvent)
  async onOrderPlaced(event: OrderPlacedEvent): Promise<void> {
    await this.orderReadModel.insert({
      id: event.orderId,
      customerId: event.customerId,
      total: event.totalAmount,
      status: 'placed',
      // ... denormalized data for queries
    });
  }
  
  @EventHandler(OrderShippedEvent)
  async onOrderShipped(event: OrderShippedEvent): Promise<void> {
    await this.orderReadModel.updateStatus(event.orderId, 'shipped');
  }
}
```

## Choosing the Right Style

### Decision Tree

```
Is the operation a query?
├── YES → Direct Call (or CQRS for complex queries)
└── NO (it's a command)
    └── Must complete immediately?
        ├── YES → Direct Call
        └── NO (can be async)
            └── Must not be lost?
                ├── YES → Outbox Pattern
                └── NO → Simple Domain Events
```

### Practical Guidelines

**Start with Direct Calls** when:
- Building the first version
- Team is learning the domain
- Transaction boundaries are unclear

**Move to Events** when:
- Multiple modules need to react
- You need loose coupling
- Eventual consistency is acceptable

**Use Outbox** when:
- Events are critical to business
- You can't afford to lose events
- Exactly-once semantics required

## Common Mistakes

### 1. **Everything Async**

Making everything event-driven creates unnecessary complexity.

**Solution**: Use direct calls for queries and simple operations. Reserve events for true state changes that need decoupling.

### 2. **Wrong Granularity Events**

Events that are too fine-grained create chattiness:

```typescript
// Bad: Too granular
class ProductNameChangedEvent { ... }
class ProductPriceChangedEvent { ... }
class ProductDescriptionChangedEvent { ... }

// Good: Business meaningful
class ProductUpdatedEvent { 
  changes: Array<{field: string, oldValue: any, newValue: any}>
}
```

### 3. **No Idempotency**

Event handlers that fail when receiving duplicate events:

```typescript
// Bad: Will double-process
@EventHandler(OrderPlacedEvent)
async onOrderPlaced(event: OrderPlacedEvent): Promise<void> {
  await this.inventoryService.reserveStock(event.orderId);
  // If event redelivered, stock reserved twice!
}

// Good: Idempotent
@EventHandler(OrderPlacedEvent)
async onOrderPlaced(event: OrderPlacedEvent): Promise<void> {
  // Check if already processed
  if (await this.processedEvents.has(event.eventId)) {
    return;
  }
  
  await this.inventoryService.reserveStock(event.orderId);
  await this.processedEvents.markProcessed(event.eventId);
}
```

### 4. **Ignoring Failure Modes**

Not considering what happens when integrations fail:

**Solution**: Design for failure:
- Timeouts on sync calls
- Retry policies for async
- Circuit breakers
- Dead letter queues

### 5. **Wrong Consistency Model**

Using eventual consistency when strong consistency is required:

**Example**: Payment authorization must be strongly consistent with order state. Don't use async events for this—use direct calls with shared transaction or saga pattern.

## FOE Alignment

### Understanding
- **Explicit integration patterns** make communication visible
- **Clear contracts** (M237) document how modules interact
- **Choice of style** reflects coupling and consistency requirements

### Fast Feedback
- **Direct calls** provide immediate feedback
- **Events** enable parallel processing
- **Outbox pattern** ensures eventual delivery

### Confidence
- **Idempotency** makes retries safe
- **Proper error handling** makes failures predictable
- **Clear patterns** reduce integration bugs

## References

- [Kamil Grzybek - Communication Between Modules](https://github.com/kgrzybek/modular-monolith-with-ddd#communication)
- [Chris Richardson - Pattern: Transactional Outbox](https://microservices.io/patterns/data/transactional-outbox.html)
- [Martin Fowler - Domain Event](https://martinfowler.com/eaaDev/DomainEvent.html)
- [Udi Dahan - Clarified CQRS](http://udidahan.com/2009/12/09/clarified-cqrs/)
- [Enterprise Integration Patterns](https://www.enterpriseintegrationpatterns.com/)
