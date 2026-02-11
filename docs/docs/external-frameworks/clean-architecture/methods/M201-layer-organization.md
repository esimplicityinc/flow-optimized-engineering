---
methodId: M201
displayed_sidebar: fieldGuideSidebar
sidebar_position: 2
title: Layer Organization
pillar: layer-organization
description: Organizing code into concentric layers with Entities at the core, surrounded by Use Cases, Interface Adapters, and Frameworks/Drivers.
---

# Layer Organization

**Pillar:** Layer Organization

Clean Architecture organizes code into concentric layers, with the most stable, high-level policies at the center and volatile implementation details at the periphery. Each layer has a specific responsibility and communicates only with adjacent inner layers.

## Definition

> The concentric circles represent different areas of software. In general, the further in you go, the higher level the software becomes. The outer circles are mechanisms. The inner circles are policies.
>
> — Robert C. Martin, Clean Architecture

## The Four Layers

### Layer 1: Entities (Enterprise Business Rules)

**Responsibility:** Encapsulate enterprise-wide business rules and critical business data.

**Characteristics:**
- Most abstract and stable layer
- Can be used across multiple applications
- Contains business objects with methods that implement business rules
- Independent of external concerns

**Examples:**
- `User`, `Order`, `Product` domain objects
- Business rule validation logic
- Domain events

```typescript
// Entity - knows nothing about databases, UI, or frameworks
class Order {
  private items: OrderItem[] = [];
  private status: OrderStatus = OrderStatus.PENDING;
  
  addItem(product: Product, quantity: number): void {
    if (quantity <= 0) {
      throw new DomainError('Quantity must be positive');
    }
    this.items.push(new OrderItem(product, quantity));
  }
  
  calculateTotal(): Money {
    return this.items.reduce(
      (sum, item) => sum.add(item.getSubtotal()),
      Money.zero()
    );
  }
  
  canBeCancelled(): boolean {
    return this.status === OrderStatus.PENDING;
  }
}
```

### Layer 2: Use Cases (Application Business Rules)

**Responsibility:** Orchestrate the flow of data to and from entities, and direct entities to use their enterprise-wide business rules to achieve the goals of the use case.

**Characteristics:**
- Application-specific business rules
- Coordinate entities to accomplish tasks
- Define input/output boundaries (ports)
- Independent of UI, database, and external frameworks

**Examples:**
- `CreateOrderUseCase`
- `ProcessPaymentUseCase`
- `GenerateReportUseCase`

```typescript
// Use Case - orchestrates entities, defines input/output interfaces
interface CreateOrderInput {
  customerId: string;
  items: { productId: string; quantity: number }[];
}

interface CreateOrderOutput {
  orderId: string;
  total: Money;
}

class CreateOrderUseCase {
  constructor(
    private orderRepository: OrderRepository,
    private productRepository: ProductRepository,
    private paymentGateway: PaymentGateway
  ) {}
  
  async execute(input: CreateOrderInput): Promise<CreateOrderOutput> {
    // Orchestrate entities and external services
    const order = new Order(input.customerId);
    
    for (const item of input.items) {
      const product = await this.productRepository.findById(item.productId);
      order.addItem(product, item.quantity);
    }
    
    await this.orderRepository.save(order);
    
    return {
      orderId: order.id,
      total: order.calculateTotal()
    };
  }
}
```

### Layer 3: Interface Adapters

**Responsibility:** Convert data from the format most convenient for use cases and entities, to the format most convenient for external agencies (databases, UI, external services).

**Characteristics:**
- Controllers, presenters, and gateways
- Convert between use case formats and external formats
- No business logic
- Know about use cases but not about frameworks

**Examples:**
- HTTP controllers
- Database mappers/repositories
- External service clients
- View models

```typescript
// Controller - adapts HTTP to use case
class OrderController {
  constructor(private createOrderUseCase: CreateOrderUseCase) {}
  
  async createOrder(req: HttpRequest): Promise<HttpResponse> {
    // Convert HTTP request to use case input
    const input: CreateOrderInput = {
      customerId: req.body.customerId,
      items: req.body.items
    };
    
    // Execute use case
    const output = await this.createOrderUseCase.execute(input);
    
    // Convert use case output to HTTP response
    return {
      status: 201,
      body: {
        orderId: output.orderId,
        total: output.total.toString()
      }
    };
  }
}
```

### Layer 4: Frameworks & Drivers

**Responsibility:** Contain frameworks, tools, and drivers that connect to the external world.

**Characteristics:**
- Most volatile layer
- Contains actual database implementations
- Web frameworks (Express, Fastify, etc.)
- UI frameworks (React, Angular, etc.)
- External service clients
- Main/composition root

**Examples:**
- Express.js application setup
- Database connection configuration
- React components
- Message queue consumers

```typescript
// Framework layer - Express setup
import express from 'express';

const app = express();

// Compose dependencies
const db = new PostgresConnection(process.env.DATABASE_URL);
const orderRepository = new PostgresOrderRepository(db);
const productRepository = new PostgresProductRepository(db);
const paymentGateway = new StripePaymentGateway(process.env.STRIPE_KEY);
const createOrderUseCase = new CreateOrderUseCase(
  orderRepository,
  productRepository,
  paymentGateway
);
const orderController = new OrderController(createOrderUseCase);

// Wire up routes
app.post('/orders', (req, res) => orderController.createOrder(req, res));

app.listen(3000);
```

## Layer Communication Rules

| From | Can Talk To |
|------|-------------|
| Entities | Nothing (innermost) |
| Use Cases | Entities |
| Interface Adapters | Use Cases, Entities |
| Frameworks | Interface Adapters, Use Cases, Entities |

## Common Mistakes

### ❌ Skipping Layers

```typescript
// WRONG: Controller directly accesses entities
class OrderController {
  constructor(private orderRepository: OrderRepository) {}
  
  async createOrder(req: Request) {
    const order = new Order(); // ❌ Controller creating entity directly
    // Business logic here - should be in use case
    await this.orderRepository.save(order);
  }
}
```

### ❌ Business Logic in Adapters

```typescript
// WRONG: Business logic in controller
class OrderController {
  async createOrder(req: Request) {
    if (req.body.quantity > 100) { // ❌ Business rule in controller
      throw new Error('Max quantity exceeded');
    }
    // ...
  }
}
```

### ❌ Framework Dependencies in Use Cases

```typescript
// WRONG: Use case depends on Express
import { Request } from 'express';

class CreateOrderUseCase {
  async execute(req: Request) { // ❌ Framework type in use case
    // ...
  }
}
```

## FOE Alignment

Layer Organization supports FOE principles:

- **Understanding** - Clear layer responsibilities make it obvious where code belongs; new team members can navigate the codebase confidently
- **Confidence** - Changes are isolated to specific layers; modifying the UI doesn't risk breaking business rules
- **Fast Feedback** - Inner layers can be developed and tested before outer layers exist; business logic is verified independently

## Related Methods

- [M200-dependency-rule](/docs/external-frameworks/clean-architecture/methods/M200-dependency-rule) - The foundational rule governing layer dependencies
- [M204-entity-design](/docs/external-frameworks/clean-architecture/methods/M204-entity-design) - Designing enterprise business objects
- [M205-use-case-implementation](/docs/external-frameworks/clean-architecture/methods/M205-use-case-implementation) - Implementing application business rules

## References

- Martin, R. C. (2017). *Clean Architecture: A Craftsman's Guide to Software Structure and Design*. Prentice Hall.
- Cockburn, A. (2005). [Hexagonal Architecture](https://alistair.cockburn.us/hexagonal-architecture/).
