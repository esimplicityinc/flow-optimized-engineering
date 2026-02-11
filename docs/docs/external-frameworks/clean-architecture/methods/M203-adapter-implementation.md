---
methodId: M203
displayed_sidebar: fieldGuideSidebar
sidebar_position: 4
title: Adapter Implementation
pillar: dependency-management
description: Implement ports using specific technologies, translating between the application's domain language and external system protocols.
---

# Adapter Implementation

**Pillar:** Dependency Management

Adapters implement the ports defined by the application core, translating between the application's domain language and the specific protocols or APIs of external systems. They bridge the gap between the technology-agnostic core and the concrete technologies of the outside world.

## Definition

> An adapter translates between the application's internal model and the external model of some other system. It implements a port using a specific technology.
>
> — Alistair Cockburn, Hexagonal Architecture

## Why It Matters

Adapters provide critical flexibility:

- **Technology isolation** - The core remains unaware of external technologies
- **Swappable implementations** - Change databases, frameworks, or services without touching business logic
- **Testing support** - Replace real adapters with test doubles
- **Multiple implementations** - Support different technologies for different environments

## Types of Adapters

### Primary Adapters (Driving Adapters)

Primary adapters translate external inputs into calls on the application's primary ports. They drive the application.

**Examples:**
- HTTP controllers (REST API)
- CLI command handlers
- Message queue consumers
- Scheduled job triggers
- GraphQL resolvers

```typescript
// HTTP Controller Adapter
import { Request, Response } from 'express';

class HttpOrderController {
  constructor(private orderService: OrderService) {}
  
  async createOrder(req: Request, res: Response): Promise<void> {
    try {
      // Translate HTTP request to domain command
      const command = new CreateOrderCommand(
        req.body.customerId,
        req.body.items.map((item: any) => ({
          productId: item.productId,
          quantity: item.quantity
        }))
      );
      
      // Call application core
      const result = await this.orderService.createOrder(command);
      
      // Translate domain result to HTTP response
      res.status(201).json({
        orderId: result.orderId,
        total: result.total.toString(),
        status: result.status
      });
    } catch (error) {
      // Translate domain errors to HTTP status codes
      if (error instanceof ValidationError) {
        res.status(400).json({ error: error.message });
      } else if (error instanceof ProductNotFoundError) {
        res.status(404).json({ error: 'Product not found' });
      } else {
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  }
}
```

### Secondary Adapters (Driven Adapters)

Secondary adapters implement the application's secondary ports, translating core requests into external system calls.

**Examples:**
- Database repositories
- External API clients
- Email service implementations
- File storage adapters
- Message publishers

```typescript
// Database Repository Adapter
import { Pool } from 'pg';

class PostgresOrderRepository implements OrderRepository {
  constructor(private db: Pool) {}
  
  async findById(id: OrderId): Promise<Order | null> {
    const result = await this.db.query(
      'SELECT * FROM orders WHERE id = $1',
      [id.value]
    );
    
    if (result.rows.length === 0) {
      return null;
    }
    
    return this.mapToDomain(result.rows[0]);
  }
  
  async save(order: Order): Promise<void> {
    const client = await this.db.connect();
    try {
      await client.query('BEGIN');
      
      // Save order header
      await client.query(
        `INSERT INTO orders (id, customer_id, status, created_at)
         VALUES ($1, $2, $3, $4)
         ON CONFLICT (id) DO UPDATE SET
         status = EXCLUDED.status`,
        [order.id.value, order.customerId.value, order.status, order.createdAt]
      );
      
      // Save order items
      for (const item of order.items) {
        await client.query(
          `INSERT INTO order_items (order_id, product_id, quantity, price)
           VALUES ($1, $2, $3, $4)`,
          [order.id.value, item.productId.value, item.quantity, item.price.amount]
        );
      }
      
      await client.query('COMMIT');
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }
  
  private mapToDomain(row: any): Order {
    // Map database row to domain entity
    const order = new Order(
      new CustomerId(row.customer_id),
      new OrderId(row.id)
    );
    // ... map other fields
    return order;
  }
}
```

## Adapter Responsibilities

### 1. Translation

Convert between domain types and external types:

```typescript
class StripePaymentAdapter implements PaymentGateway {
  constructor(private stripe: Stripe) {}
  
  async charge(amount: Money, cardToken: string): Promise<PaymentResult> {
    // Translate domain Money to Stripe's smallest currency unit (cents)
    const stripeAmount = amount.toCents();
    
    try {
      const charge = await this.stripe.charges.create({
        amount: stripeAmount,
        currency: amount.currency.toLowerCase(),
        source: cardToken
      });
      
      // Translate Stripe response to domain result
      return {
        success: true,
        transactionId: charge.id,
        amount: Money.fromCents(charge.amount, charge.currency)
      };
    } catch (error) {
      // Translate Stripe error to domain error
      throw new PaymentFailedError(this.mapStripeError(error));
    }
  }
  
  private mapStripeError(error: any): string {
    if (error.type === 'StripeCardError') {
      return `Card declined: ${error.message}`;
    }
    return 'Payment processing failed';
  }
}
```

### 2. Error Handling

Translate external errors into domain errors:

```typescript
class SendGridEmailAdapter implements EmailService {
  constructor(private sendgrid: SendGridClient) {}
  
  async send(to: EmailAddress, subject: string, body: string): Promise<void> {
    try {
      await this.sendgrid.send({
        to: to.value,
        from: 'noreply@example.com',
        subject,
        text: body
      });
    } catch (error) {
      // Translate SendGrid error to domain error
      if (error.code === 401) {
        throw new EmailConfigurationError('Invalid API key');
      } else if (error.response?.statusCode === 400) {
        throw new InvalidEmailError(to.value);
      }
      throw new EmailDeliveryError('Failed to send email', error);
    }
  }
}
```

### 3. Transaction Management

Handle transactions that span multiple adapters:

```typescript
class UnitOfWorkOrderRepository implements OrderRepository {
  constructor(
    private db: DatabaseConnection,
    private eventPublisher: DomainEventPublisher
  ) {}
  
  async save(order: Order): Promise<void> {
    await this.db.transaction(async (trx) => {
      // Save order
      await trx.orders.insert(this.mapToDb(order));
      
      // Publish domain events
      for (const event of order.domainEvents) {
        await this.eventPublisher.publish(event);
      }
      
      order.clearEvents();
    });
  }
}
```

## Testing Adapters

### Integration Tests

Test adapters against real (but isolated) external systems:

```typescript
describe('PostgresOrderRepository', () => {
  let repository: PostgresOrderRepository;
  let testDb: TestDatabase;
  
  beforeEach(async () => {
    testDb = await TestDatabase.create();
    repository = new PostgresOrderRepository(testDb.pool);
  });
  
  afterEach(async () => {
    await testDb.cleanup();
  });
  
  it('should save and retrieve orders', async () => {
    const order = createTestOrder();
    
    await repository.save(order);
    const retrieved = await repository.findById(order.id);
    
    expect(retrieved).toEqual(order);
  });
});
```

### Contract Tests

Verify adapters conform to port contracts:

```typescript
describe('OrderRepository Contract', () => {
  const implementations = [
    { name: 'Postgres', factory: () => new PostgresOrderRepository(testDb) },
    { name: 'InMemory', factory: () => new InMemoryOrderRepository() }
  ];
  
  implementations.forEach(({ name, factory }) => {
    describe(name, () => {
      let repository: OrderRepository;
      
      beforeEach(() => {
        repository = factory();
      });
      
      it('should return null for non-existent order', async () => {
        const result = await repository.findById(new OrderId('non-existent'));
        expect(result).toBeNull();
      });
      
      it('should find saved orders', async () => {
        const order = createTestOrder();
        await repository.save(order);
        
        const found = await repository.findById(order.id);
        expect(found?.id).toEqual(order.id);
      });
    });
  });
});
```

## Common Mistakes

### ❌ Business Logic in Adapters

```typescript
// WRONG: Business logic in adapter
class PostgresOrderRepository {
  async save(order: Order): Promise<void> {
    if (order.total.amount > 10000) { // ❌ Business rule in adapter
      throw new Error('Order too large');
    }
    // ...
  }
}
```

### ❌ Leaking External Types Through Ports

```typescript
// WRONG: Port returns external type
interface OrderRepository {
  findById(id: OrderId): Promise<PrismaOrder | null>; // ❌ Prisma type
}
```

### ❌ Adapter Calling Adapter

```typescript
// WRONG: Adapter depends on another adapter
class OrderController {
  constructor(
    private orderService: OrderService,
    private emailService: SendGridEmailAdapter // ❌ Should depend on port
  ) {}
}
```

## FOE Alignment

Adapter Implementation supports FOE principles:

- **Understanding** - Adapters isolate technology complexity; the core remains focused on business logic
- **Confidence** - Adapters can be thoroughly tested in isolation; swapping implementations is low-risk
- **Fast Feedback** - In-memory adapters enable fast unit tests; integration tests verify real behavior

## Related Methods

- [M202-port-definition](/docs/external-frameworks/clean-architecture/methods/M202-port-definition) - Defining the interfaces adapters implement
- [M206-boundary-crossing](/docs/external-frameworks/clean-architecture/methods/M206-boundary-crossing) - Mechanisms for crossing between layers
- [M207-test-isolation](/docs/external-frameworks/clean-architecture/methods/M207-test-isolation) - Testing core without external dependencies

## References

- Cockburn, A. (2005). [Hexagonal Architecture](https://alistair.cockburn.us/hexagonal-architecture/).
- Martin, R. C. (2017). *Clean Architecture: A Craftsman's Guide to Software Structure and Design*. Prentice Hall.
