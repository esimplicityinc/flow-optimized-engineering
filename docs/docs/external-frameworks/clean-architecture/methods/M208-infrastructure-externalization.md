---
methodId: M208
displayed_sidebar: fieldGuideSidebar
sidebar_position: 9
title: Infrastructure Externalization
pillar: technology-independence
description: Move all infrastructure concerns—databases, frameworks, external services—to the outermost layer, keeping the core technology-agnostic.
---

# Infrastructure Externalization

**Pillar:** Technology Independence

Infrastructure externalization means moving all technology-specific concerns—databases, web frameworks, message queues, external APIs—to the outermost layer of the architecture. The application core remains pure business logic, completely unaware of the infrastructure that supports it.

## Definition

> The outermost layer is generally composed of frameworks and tools such as the Database, the Web Framework, and external services. Generally you don't write much code in this layer other than glue code that communicates to the next circle inwards.
>
> — Robert C. Martin, Clean Architecture

## Why It Matters

Externalizing infrastructure provides:

- **Technology independence** - Business logic doesn't depend on specific technologies
- **Delayed decisions** - Choose databases and frameworks late in the project
- **Easy migration** - Swap technologies without touching business logic
- **Testing** - Test business logic without real infrastructure
- **Flexibility** - Support multiple implementations (SQL vs NoSQL, REST vs GraphQL)
- **Longevity** - Business logic outlives technology trends

## What Belongs in the Infrastructure Layer

### Databases

```typescript
// Infrastructure: Database-specific implementation
class PostgresOrderRepository implements OrderRepository {
  constructor(private pool: Pool) {}
  
  async findById(id: OrderId): Promise<Order | null> {
    const result = await this.pool.query(
      'SELECT * FROM orders WHERE id = $1',
      [id.value]
    );
    return result.rows[0] ? this.mapToDomain(result.rows[0]) : null;
  }
  
  async save(order: Order): Promise<void> {
    // Postgres-specific SQL
    await this.pool.query(
      `INSERT INTO orders (id, customer_id, total, status, created_at, version)
       VALUES ($1, $2, $3, $4, $5, $6)
       ON CONFLICT (id) DO UPDATE SET
         customer_id = EXCLUDED.customer_id,
         total = EXCLUDED.total,
         status = EXCLUDED.status,
         version = EXCLUDED.version + 1`,
      [order.id.value, order.customerId.value, order.total.amount,
       order.status, order.createdAt, order.version]
    );
  }
}

// Alternative: MongoDB implementation
class MongoOrderRepository implements OrderRepository {
  constructor(private collection: Collection) {}
  
  async findById(id: OrderId): Promise<Order | null> {
    const doc = await this.collection.findOne({ _id: id.value });
    return doc ? this.mapToDomain(doc) : null;
  }
  
  async save(order: Order): Promise<void> {
    // MongoDB-specific operations
    await this.collection.updateOne(
      { _id: order.id.value },
      { $set: this.mapToDocument(order) },
      { upsert: true }
    );
  }
}
```

### Web Frameworks

```typescript
// Infrastructure: Express.js adapter
import express, { Request, Response } from 'express';

class ExpressOrderController {
  constructor(private createOrderUseCase: CreateOrderUseCase) {}
  
  async createOrder(req: Request, res: Response): Promise<void> {
    try {
      const input = this.mapRequestToInput(req);
      const result = await this.createOrderUseCase.execute(input);
      res.status(201).json(this.mapResultToResponse(result));
    } catch (error) {
      this.handleError(error, res);
    }
  }
  
  private mapRequestToInput(req: Request): CreateOrderInput {
    return {
      customerId: req.body.customerId,
      items: req.body.items.map((item: any) => ({
        productId: item.productId,
        quantity: item.quantity
      }))
    };
  }
}

// Alternative: Fastify adapter
class FastifyOrderController {
  constructor(private createOrderUseCase: CreateOrderUseCase) {}
  
  async createOrder(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    // Fastify-specific handling
    const input = request.body as CreateOrderInput;
    const result = await this.createOrderUseCase.execute(input);
    reply.status(201).send(result);
  }
}
```

### External Services

```typescript
// Infrastructure: Stripe payment adapter
import Stripe from 'stripe';

class StripePaymentGateway implements PaymentGateway {
  constructor(private stripe: Stripe) {}
  
  async charge(amount: Money, cardToken: string): Promise<PaymentResult> {
    try {
      const charge = await this.stripe.charges.create({
        amount: amount.toCents(),
        currency: amount.currency.toLowerCase(),
        source: cardToken
      });
      
      return {
        success: true,
        transactionId: charge.id,
        amount: Money.fromCents(charge.amount, charge.currency)
      };
    } catch (error) {
      return {
        success: false,
        error: this.mapStripeError(error)
      };
    }
  }
  
  private mapStripeError(error: any): string {
    if (error.type === 'StripeCardError') {
      return `Card declined: ${error.message}`;
    }
    return 'Payment processing failed';
  }
}

// Alternative: PayPal adapter
class PayPalPaymentGateway implements PaymentGateway {
  constructor(private paypal: PayPalClient) {}
  
  async charge(amount: Money, cardToken: string): Promise<PaymentResult> {
    // PayPal-specific implementation
    const payment = await this.paypal.payment.create({
      intent: 'sale',
      payer: { payment_method: 'credit_card' },
      transactions: [{
        amount: {
          total: amount.toString(),
          currency: amount.currency
        }
      }]
    });
    
    // ...
  }
}
```

### Message Queues

```typescript
// Infrastructure: RabbitMQ event publisher
import { Connection, Channel } from 'amqplib';

class RabbitMQEventPublisher implements DomainEventPublisher {
  constructor(private channel: Channel) {}
  
  async publish(event: DomainEvent): Promise<void> {
    const exchange = 'domain.events';
    const routingKey = event.constructor.name;
    const message = JSON.stringify({
      type: event.constructor.name,
      payload: event,
      timestamp: new Date().toISOString()
    });
    
    await this.channel.publish(exchange, routingKey, Buffer.from(message), {
      persistent: true,
      messageId: event.id,
      timestamp: Date.now()
    });
  }
}

// Alternative: In-memory for testing
class InMemoryEventPublisher implements DomainEventPublisher {
  private events: DomainEvent[] = [];
  
  async publish(event: DomainEvent): Promise<void> {
    this.events.push(event);
  }
  
  getPublishedEvents(): DomainEvent[] {
    return [...this.events];
  }
  
  clear(): void {
    this.events = [];
  }
}
```

## The Composition Root

All infrastructure is wired together in the composition root (main/application entry point):

```typescript
// infrastructure/composition.ts
import express from 'express';
import { Pool } from 'pg';
import Stripe from 'stripe';
import { createClient } from 'redis';

export function createApplication(config: AppConfig): express.Application {
  // 1. Create infrastructure connections
  const dbPool = new Pool({ connectionString: config.databaseUrl });
  const stripe = new Stripe(config.stripeApiKey);
  const redis = createClient({ url: config.redisUrl });
  
  // 2. Create repositories (infrastructure)
  const orderRepository = new PostgresOrderRepository(dbPool);
  const productRepository = new PostgresProductRepository(dbPool);
  const cache = new RedisCache(redis);
  
  // 3. Create external service adapters (infrastructure)
  const paymentGateway = new StripePaymentGateway(stripe);
  const emailService = new SendGridEmailAdapter(config.sendGridKey);
  const eventPublisher = new RabbitMQEventPublisher(messageChannel);
  
  // 4. Create use cases (application layer)
  const createOrderUseCase = new CreateOrderUseCase(
    orderRepository,
    productRepository,
    paymentGateway,
    eventPublisher
  );
  
  // 5. Create controllers (infrastructure)
  const orderController = new ExpressOrderController(createOrderUseCase);
  
  // 6. Wire up HTTP routes (infrastructure)
  const app = express();
  app.use(express.json());
  
  app.post('/orders', (req, res) => orderController.createOrder(req, res));
  app.get('/orders/:id', (req, res) => orderController.getOrder(req, res));
  
  return app;
}
```

## Benefits in Practice

### Database Migration Example

Switching from PostgreSQL to MongoDB requires only infrastructure changes:

```typescript
// Before
const orderRepository = new PostgresOrderRepository(dbPool);

// After - No changes to use cases or entities!
const orderRepository = new MongoOrderRepository(mongoDb.collection('orders'));
```

### Framework Migration Example

Switching from Express to Fastify:

```typescript
// Before
const orderController = new ExpressOrderController(useCase);
app.post('/orders', (req, res) => orderController.createOrder(req, res));

// After - Use case unchanged!
const orderController = new FastifyOrderController(useCase);
fastify.post('/orders', (req, res) => orderController.createOrder(req, res));
```

### Testing Example

Testing without any real infrastructure:

```typescript
const useCase = new CreateOrderUseCase(
  new InMemoryOrderRepository(),      // Fake repository
  new InMemoryProductRepository(),    // Fake repository
  new FakePaymentGateway(),           // Fake payment service
  new InMemoryEventPublisher()        // Fake message queue
);

// Test runs in milliseconds, no Docker, no databases
const result = await useCase.execute(input);
```

## Common Mistakes

### ❌ Framework Dependencies in Core

```typescript
// WRONG: Entity depends on ORM
@Entity() // ❌ JPA/Hibernate annotation
class Order {
  @Column() // ❌ Database concern in entity
  status: string;
}
```

### ❌ Database Queries in Use Cases

```typescript
// WRONG: SQL in use case
class CreateOrderUseCase {
  constructor(private db: Database) {}
  
  async execute(input: CreateOrderInput) {
    await this.db.query('INSERT INTO orders ...'); // ❌ SQL in use case
  }
}
```

### ❌ HTTP Framework in Application Layer

```typescript
// WRONG: Express types in use case
class CreateOrderUseCase {
  async execute(req: Request, res: Response) { // ❌ Express types
    // ...
  }
}
```

### ❌ Direct External API Calls

```typescript
// WRONG: Direct HTTP call in use case
class CreateOrderUseCase {
  async execute(input: CreateOrderInput) {
    const response = await fetch('https://api.stripe.com/v1/charges', { // ❌ Direct API call
      // ...
    });
  }
}
```

## FOE Alignment

Infrastructure Externalization supports FOE principles:

- **Understanding** - Clear separation makes it obvious which code is business logic and which is plumbing
- **Confidence** - Infrastructure changes are isolated; upgrading a framework doesn't risk breaking business rules
- **Fast Feedback** - Development and testing can proceed without setting up databases or external services

## Related Methods

- [M200-dependency-rule](/docs/external-frameworks/clean-architecture/methods/M200-dependency-rule) - Infrastructure depends on core, not vice versa
- [M201-layer-organization](/docs/external-frameworks/clean-architecture/methods/M201-layer-organization) - Infrastructure as the outermost layer
- [M202-port-definition](/docs/external-frameworks/clean-architecture/methods/M202-port-definition) - Interfaces that infrastructure implements
- [M203-adapter-implementation](/docs/external-frameworks/clean-architecture/methods/M203-adapter-implementation) - Implementing infrastructure adapters

## References

- Martin, R. C. (2017). *Clean Architecture: A Craftsman's Guide to Software Structure and Design*. Prentice Hall.
- Cockburn, A. (2005). [Hexagonal Architecture](https://alistair.cockburn.us/hexagonal-architecture/).
- Martin, R. C. (2012). [The Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html).
