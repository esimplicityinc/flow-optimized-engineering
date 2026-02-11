---
methodId: M226
displayed_sidebar: fieldGuideSidebar
sidebar_position: 4
title: Saga Pattern
description: Manages distributed transactions across multiple services using a sequence of local transactions with compensating actions for rollback.
framework: microservices
framework_url: https://microservices.io/patterns/data/saga.html
foe_alignment:
  primary: Confidence
  secondary: Understanding
status: industry-standard
pillar: foundational-patterns
---

# Saga Pattern

**Pillar:** Foundational Patterns

The Saga pattern manages data consistency across multiple microservices in distributed transaction scenarios. Instead of using a two-phase commit (2PC) which blocks resources, sagas use a sequence of local transactions where each step updates data and publishes events to trigger the next step. If a step fails, compensating transactions undo the previous steps.

## Definition

> "A saga is a sequence of local transactions. Each local transaction updates the database and publishes a message or event to trigger the next local transaction in the saga. If a local transaction fails because it violates a business rule then the saga executes a series of compensating transactions that undo the changes that were made by the preceding local transactions."
> — Chris Richardson, Microservices Patterns

## Why It Matters

In microservices, ACID transactions across services are problematic:

- **Two-phase commit blocks resources** - Locks held during coordination
- **Latency increases** - Network delays between prepare and commit
- **Single point of failure** - Coordinator failure can leave resources locked
- **Not supported by NoSQL** - Many modern databases don't support 2PC

Sagas provide eventual consistency without blocking:
- Each service performs local transactions independently
- No global locks held
- Services remain available during saga execution
- Compensations handle failures gracefully

## Saga Types

### 1. Choreography-Based Saga

Services react to events from other services without a central coordinator.

```
┌──────────────┐     OrderCreated      ┌──────────────┐
│   Order      │──────────────────────▶│  Payment     │
│   Service    │                       │   Service    │
└──────────────┘                       └──────┬───────┘
                                              │
                                              │ PaymentProcessed
                                              ▼
┌──────────────┐     InventoryReserved       ┌──────────────┐
│   Shipping   │◀────────────────────────────│  Inventory   │
│   Service    │                             │   Service    │
└──────────────┘                             └──────────────┘
```

**Flow:**
1. Order Service creates order → publishes `OrderCreated`
2. Payment Service processes payment → publishes `PaymentProcessed` (or `PaymentFailed`)
3. Inventory Service reserves inventory → publishes `InventoryReserved`
4. Shipping Service creates shipment

**Compensation on failure:**
```
PaymentFailed
     │
     ▼
┌──────────────┐
│   Order      │── Cancel order
│   Service    │
└──────────────┘
```

**Pros:**
- Simple to implement
- No single point of failure
- Services are loosely coupled

**Cons:**
- Hard to understand flow (distributed logic)
- Cyclic dependencies risk
- Harder to track saga state

### 2. Orchestration-Based Saga

A central coordinator (orchestrator) directs services through the saga steps.

```
                    ┌──────────────┐
                    │ Orchestrator │
                    │   (Saga)     │
                    └──────┬───────┘
                           │
           ┌───────────────┼───────────────┐
           │               │               │
           ▼               ▼               ▼
    ┌──────────────┐ ┌──────────────┐ ┌──────────────┐
    │    Order     │ │   Payment    │ │  Inventory   │
    │   Service    │ │   Service    │ │   Service    │
    └──────────────┘ └──────────────┘ └──────────────┘
```

**Flow:**
1. Orchestrator tells Order Service to create order
2. On success, tells Payment Service to process payment
3. On success, tells Inventory Service to reserve items
4. On success, tells Shipping Service to ship

**Compensation:**
```
Inventory Failed
       │
       ▼
┌──────────────┐
│ Orchestrator │
└──────┬───────┘
       │
       ├── Cancel Payment ───▶ Payment Service
       │
       └── Cancel Order ────▶ Order Service
```

**Pros:**
- Centralized coordination (easier to understand)
- No cyclic dependencies
- Easier to track and monitor

**Cons:**
- Orchestrator is a single point of failure
- Risk of centralizing business logic
- Additional complexity

## Implementation

### Choreography Example

```javascript
// Order Service
class OrderService {
  async createOrder(orderData) {
    const order = await this.db.orders.create({
      ...orderData,
      status: 'PENDING'
    });
    
    await this.eventBus.publish('OrderCreated', {
      orderId: order.id,
      customerId: order.customerId,
      amount: order.total
    });
    
    return order;
  }
  
  // Compensation
  async cancelOrder(orderId) {
    await this.db.orders.update(orderId, {
      status: 'CANCELLED'
    });
  }
}

// Payment Service
class PaymentService {
  constructor(eventBus) {
    eventBus.subscribe('OrderCreated', this.handleOrderCreated.bind(this));
  }
  
  async handleOrderCreated(event) {
    try {
      await this.processPayment(event.customerId, event.amount);
      await this.eventBus.publish('PaymentProcessed', {
        orderId: event.orderId,
        transactionId: generateId()
      });
    } catch (error) {
      await this.eventBus.publish('PaymentFailed', {
        orderId: event.orderId,
        reason: error.message
      });
    }
  }
  
  async processPayment(customerId, amount) {
    // Process payment logic
  }
  
  // Compensation
  async refundPayment(transactionId) {
    // Refund logic
  }
}
```

### Orchestration Example

```javascript
class CreateOrderSaga {
  constructor(services) {
    this.orderService = services.order;
    this.paymentService = services.payment;
    this.inventoryService = services.inventory;
    this.shippingService = services.shipping;
  }
  
  async execute(orderData) {
    const sagaState = { steps: [] };
    
    try {
      // Step 1: Create Order
      const order = await this.orderService.create(orderData);
      sagaState.orderId = order.id;
      sagaState.steps.push('CREATE_ORDER');
      
      // Step 2: Process Payment
      const payment = await this.paymentService.charge({
        customerId: orderData.customerId,
        amount: orderData.total
      });
      sagaState.paymentId = payment.id;
      sagaState.steps.push('PROCESS_PAYMENT');
      
      // Step 3: Reserve Inventory
      await this.inventoryService.reserve({
        orderId: order.id,
        items: orderData.items
      });
      sagaState.steps.push('RESERVE_INVENTORY');
      
      // Step 4: Create Shipment
      await this.shippingService.createShipment({
        orderId: order.id,
        address: orderData.shippingAddress
      });
      
      return { success: true, orderId: order.id };
      
    } catch (error) {
      await this.compensate(sagaState);
      throw new SagaFailedError(error.message, sagaState);
    }
  }
  
  async compensate(state) {
    // Execute compensations in reverse order
    for (const step of [...state.steps].reverse()) {
      try {
        switch (step) {
          case 'RESERVE_INVENTORY':
            await this.inventoryService.releaseReservation(state.orderId);
            break;
          case 'PROCESS_PAYMENT':
            await this.paymentService.refund(state.paymentId);
            break;
          case 'CREATE_ORDER':
            await this.orderService.cancel(state.orderId);
            break;
        }
      } catch (compError) {
        // Log for manual intervention
        logger.error('Compensation failed', { step, error: compError });
      }
    }
  }
}
```

## Saga Design Considerations

### Idempotency

Saga steps must be idempotent since they may be retried:

```javascript
async function processPayment(command) {
  // Check if already processed
  const existing = await db.payments.findByIdempotencyKey(
    command.idempotencyKey
  );
  if (existing) return existing;
  
  // Process new payment
  return await db.payments.create(command);
}
```

### Semantic Locking

Use application-level locks to prevent inconsistencies during sagas:

```javascript
async function reserveInventory(command) {
  // Set pending state (semantic lock)
  await db.inventory.update(command.itemId, {
    status: 'RESERVED',
    orderId: command.orderId
  });
  
  // Actual reservation
  await db.inventory.decrement(command.itemId, command.quantity);
}
```

### Compensating Transaction Design

Compensations may fail or be partial:

1. **Make compensations idempotent**
2. **Log all compensation attempts**
3. **Alert on compensation failures**
4. **Provide manual intervention tools**

## FOE Alignment

**Primary: Confidence to Act**

Sagas provide confidence that distributed operations will maintain data consistency even when failures occur. The explicit compensation model means failures are handled gracefully rather than leaving data in inconsistent states.

**Secondary: Optimize for Understanding**

While choreography distributes the logic, orchestration centralizes it. Both approaches make the transaction flow explicit—either through event subscriptions or orchestrator code—making the system behavior more understandable than implicit distributed transactions.

## Benefits

- ✅ **No resource blocking** - Unlike 2PC, no locks held during coordination
- ✅ **Service autonomy** - Services remain available during saga execution
- ✅ **NoSQL compatible** - Works with databases that don't support distributed transactions
- ✅ **Long-running friendly** - Sagas can span seconds, minutes, or hours
- ✅ **Clear failure handling** - Explicit compensations for rollback

## Trade-offs

- ⚠️ **Eventual consistency** - Data is temporarily inconsistent during saga execution
- ⚠️ **Complexity** - More complex than ACID transactions
- ⚠️ **Compensation difficulty** - Not all operations can be easily undone
- ⚠️ **Design overhead** - Must identify compensatable operations upfront

## When to Use

✅ **Use when:**
- Transaction spans multiple services
- You need eventual consistency
- Services use NoSQL databases without 2PC support
- Long-running operations (minutes/hours)
- You can define compensating actions

❌ **Avoid when:**
- ACID consistency is strictly required
- Operations cannot be compensated (e.g., sent email)
- System is simple enough for single-service transactions

## Choosing: Choreography vs Orchestration

| Factor | Choreography | Orchestration |
|--------|--------------|---------------|
| **Complexity** | Simple sagas (< 4 steps) | Complex sagas (> 4 steps) |
| **Coupling** | Loosely coupled | Centralized coordination |
| **Visibility** | Hard to trace | Easy to monitor |
| **Failure handling** | Distributed | Centralized |
| **Cyclic deps** | Risk | No risk |
| **Rollback** | Each service decides | Orchestrator manages |

**Recommendation:** Start with choreography for simple cases. Move to orchestration as complexity grows.

## Monitoring and Observability

### Saga State Tracking

```javascript
// Track saga execution
await sagaLog.record({
  sagaId: generateId(),
  type: 'CreateOrderSaga',
  status: 'STARTED',
  startedAt: Date.now(),
  steps: []
});

// Update on each step
await sagaLog.updateStep(sagaId, {
  step: 'PROCESS_PAYMENT',
  status: 'COMPLETED',
  completedAt: Date.now()
});
```

### Metrics

| Metric | Description | Alert When |
|--------|-------------|------------|
| `saga_started` | Sagas initiated | N/A |
| `saga_completed` | Successful completions | N/A |
| `saga_failed` | Failed sagas | > threshold |
| `saga_compensation_failed` | Failed compensations | > 0 (critical) |
| `saga_duration` | Time to complete | > SLA |

## Anti-Patterns

### ❌ Compensating Non-Compensatable Actions

```javascript
// WRONG: Can't undo sending email
async function sendConfirmationEmail(order) {
  await emailService.send(order.customerEmail, 'Order confirmed!');
}

// RIGHT: Send email after all compensatable steps complete
```

### ❌ Missing Compensations

Every step must have a corresponding compensation:

```javascript
// WRONG: No compensation for inventory reservation
saga
  .step('createOrder', createOrder)        // has cancelOrder
  .step('processPayment', processPayment)  // has refund
  .step('reserveInventory', reserveInventory); // no compensation!
```

### ❌ Non-Idempotent Steps

```javascript
// WRONG: Double-charges if retried
async function chargeCustomer(amount) {
  return await paymentGateway.charge(amount);
}

// RIGHT: Idempotent with idempotency key
async function chargeCustomer(command) {
  return await paymentGateway.charge({
    amount: command.amount,
    idempotencyKey: command.sagaId
  });
}
```

## Known Uses

- **Amazon** - Orchestrated sagas for order processing
- **Netflix** - Choreography for content delivery workflows
- **Uber** - Orchestrated trip lifecycle management
- **Shopify** - Order processing with compensations

## References

- Garcia-Molina, H., & Salem, K. (1987). "Sagas." *ACM SIGMOD Record*.
- Richardson, C. (2018). *Microservices Patterns*. Chapter 4: Managing Transactions with Sagas.
- [Saga Pattern - microservices.io](https://microservices.io/patterns/data/saga.html)
- [Microsoft: Choreography vs Orchestration](https://docs.microsoft.com/en-us/azure/architecture/reference-architectures/saga/saga)
- [Eventuate Sagas](https://eventuate.io/docs/manual/eventuate-tram/latest/getting-started-eventuate-tram-sagas.html)
