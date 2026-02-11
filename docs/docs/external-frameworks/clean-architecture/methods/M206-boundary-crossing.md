---
methodId: M206
displayed_sidebar: fieldGuideSidebar
sidebar_position: 7
title: Boundary Crossing
pillar: dependency-management
description: Mechanisms for passing data across layer boundaries while maintaining the dependency rule and preventing leakage of implementation details.
---

# Boundary Crossing

**Pillar:** Dependency Management

Boundary crossing is the mechanism by which data moves between architectural layers while maintaining the Dependency Rule. Inner layers must remain unaware of outer layers, even when receiving data from or sending data to them.

## Definition

> At the lower right of the diagram is an example of how we cross the circle boundaries. It shows the Controllers and Presenters communicating with the Use Cases in the next layer. Note the flow of control. It begins in the controller, moves through the use case, and then winds up executing in the presenter. Note also the source code dependencies. They all point inward.
>
> — Robert C. Martin, Clean Architecture

## Why It Matters

Proper boundary crossing ensures:

- **Dependency Rule compliance** - Inner layers don't depend on outer layers
- **Data isolation** - Inner layers work with simple data structures, not framework types
- **Testability** - Boundaries can be crossed with test doubles
- **Flexibility** - Outer layers can change without affecting inner layers

## The Boundary Crossing Pattern

### Control Flow vs. Dependencies

Control flows outward-in-out, but dependencies always point inward:

```
Controller → Use Case → Presenter
    ↓           ↓          ↓
  (calls)    (calls)    (interface)
    ↓           ↓          ↓
  Outer →   Inner   →   Outer
    ↓           ↓          ↓
 Depends on Depends on Depends on
 Use Case   Entities   Use Case
 (interface)           (interface)
```

### Implementation

```typescript
// Inner layer defines the interface
interface CreateOrderPresenter {
  presentSuccess(result: CreateOrderOutput): void;
  presentValidationError(errors: ValidationError[]): void;
  presentNotFoundError(resource: string, id: string): void;
}

// Inner layer (Use Case) depends on the interface
class CreateOrderUseCase {
  constructor(
    private orderRepository: OrderRepository,
    private presenter: CreateOrderPresenter // Injected interface
  ) {}
  
  async execute(input: CreateOrderInput): Promise<void> {
    // Validate input
    const errors = this.validate(input);
    if (errors.length > 0) {
      this.presenter.presentValidationError(errors); // Call outward
      return;
    }
    
    // Business logic...
    const order = await this.createOrder(input);
    
    // Present result
    const output = this.mapToOutput(order);
    this.presenter.presentSuccess(output); // Call outward
  }
}

// Outer layer implements the interface
class HttpCreateOrderPresenter implements CreateOrderPresenter {
  constructor(private response: Response) {}
  
  presentSuccess(result: CreateOrderOutput): void {
    this.response.status(201).json({
      orderId: result.orderId,
      total: result.total,
      status: 'created'
    });
  }
  
  presentValidationError(errors: ValidationError[]): void {
    this.response.status(400).json({
      error: 'Validation failed',
      details: errors.map(e => ({ field: e.field, message: e.message }))
    });
  }
  
  presentNotFoundError(resource: string, id: string): void {
    this.response.status(404).json({
      error: `${resource} with id ${id} not found`
    });
  }
}
```

## Data Transfer Objects (DTOs)

### Simple Data Structures

Use simple objects to cross boundaries:

```typescript
// GOOD: Simple DTO
interface CreateOrderInput {
  customerId: string;
  items: Array<{
    productId: string;
    quantity: number;
  }>;
}

// GOOD: Simple output DTO
interface CreateOrderOutput {
  orderId: string;
  total: {
    amount: number;
    currency: string;
  };
  createdAt: Date;
}
```

### Avoid Framework Types

```typescript
// WRONG: Framework types crossing boundaries
interface CreateOrderInput {
  request: ExpressRequest; // ❌ Framework type
  session: Session; // ❌ Framework type
}

// CORRECT: Extract only needed data
interface CreateOrderInput {
  customerId: string;
  items: OrderItemInput[];
  // Extracted from request/session, but not the types themselves
}
```

## Request-Response Pattern

### Synchronous Boundaries

For HTTP, CLI, or direct calls:

```typescript
// Controller (outer) → Use Case (inner) → Presenter (outer)
class OrderController {
  constructor(private createOrderUseCase: CreateOrderUseCase) {}
  
  async handle(req: Request, res: Response): Promise<void> {
    // 1. Extract data from framework types
    const input: CreateOrderInput = {
      customerId: req.body.customerId,
      items: req.body.items
    };
    
    // 2. Create presenter for this request
    const presenter = new HttpCreateOrderPresenter(res);
    
    // 3. Execute use case (control flows inward)
    await this.createOrderUseCase.execute(input, presenter);
    
    // 4. Presenter has already sent response
  }
}
```

### Asynchronous Boundaries

For message queues or event-driven systems:

```typescript
// Message Handler (outer) → Use Case (inner)
class OrderEventHandler {
  constructor(private processOrderUseCase: ProcessOrderUseCase) {}
  
  async handle(message: Message): Promise<void> {
    // Extract data from message format
    const input: ProcessOrderInput = {
      orderId: message.payload.orderId,
      eventType: message.payload.eventType
    };
    
    // Use case executes, may publish events
    await this.processOrderUseCase.execute(input);
    
    // Acknowledge message
    await message.ack();
  }
}
```

## Boundary Crossing Strategies

### 1. Direct Interface Implementation

Outer layer implements interface defined by inner layer:

```typescript
// Inner layer defines
interface Logger {
  log(message: string): void;
  error(message: string, error?: Error): void;
}

// Outer layer implements
class WinstonLogger implements Logger {
  constructor(private winston: WinstonInstance) {}
  
  log(message: string): void {
    this.winston.info(message);
  }
  
  error(message: string, error?: Error): void {
    this.winston.error(message, { error });
  }
}
```

### 2. Callback/Presenter Pattern

Inner layer calls back to outer layer through interface:

```typescript
// Inner layer calls presenter
class GenerateReportUseCase {
  async execute(
    input: GenerateReportInput,
    presenter: ReportPresenter
  ): Promise<void> {
    presenter.showProgress(0);
    
    const data = await this.loadData(input);
    presenter.showProgress(50);
    
    const report = this.generateReport(data);
    presenter.showProgress(100);
    
    presenter.presentReport(report);
  }
}

// Outer layer implements callbacks
class CliReportPresenter implements ReportPresenter {
  showProgress(percent: number): void {
    console.log(`Progress: ${percent}%`);
  }
  
  presentReport(report: Report): void {
    console.log(report.toText());
  }
}
```

### 3. Event-Based Crossing

Inner layer publishes events, outer layer subscribes:

```typescript
// Inner layer publishes
class OrderUseCase {
  constructor(private eventPublisher: EventPublisher) {}
  
  async execute(input: CreateOrderInput): Promise<void> {
    const order = new Order(input);
    await this.save(order);
    
    // Event crosses boundary outward
    await this.eventPublisher.publish(new OrderCreatedEvent(order));
  }
}

// Outer layer subscribes
class OrderNotificationAdapter {
  constructor(private emailService: EmailService) {}
  
  @OnEvent('OrderCreated')
  async handle(event: OrderCreatedEvent): Promise<void> {
    await this.emailService.sendOrderConfirmation(event.order);
  }
}
```

## Common Mistakes

### ❌ Leaking Framework Types

```typescript
// WRONG: Express Request in use case
class CreateOrderUseCase {
  async execute(req: Request) { // ❌ Framework type
    const customerId = req.body.customerId;
    // ...
  }
}
```

### ❌ Inner Layer Creating Outer Objects

```typescript
// WRONG: Entity creates HTTP response
class Order {
  toHttpResponse(): Response { // ❌ Entity knows about HTTP
    return new Response({ status: 200, body: this });
  }
}
```

### ❌ Direct Database Access from Use Case

```typescript
// WRONG: Use case bypasses repository interface
class CreateOrderUseCase {
  constructor(private db: Database) {} // ❌ Concrete dependency
  
  async execute(input: CreateOrderInput) {
    await this.db.query('INSERT ...'); // ❌ SQL in use case
  }
}
```

### ❌ Returning Domain Objects Across Boundaries

```typescript
// WRONG: Returning entity directly
class OrderController {
  async getOrder(req: Request, res: Response) {
    const order = await this.useCase.execute(req.params.id);
    res.json(order); // ❌ Exposing internal entity structure
  }
}

// CORRECT: Map to DTO
class OrderController {
  async getOrder(req: Request, res: Response) {
    const order = await this.useCase.execute(req.params.id);
    res.json({
      id: order.id.value,
      status: order.status,
      total: order.total.toString()
      // Only expose what's needed
    });
  }
}
```

## FOE Alignment

Boundary Crossing supports FOE principles:

- **Understanding** - Clear boundaries make data flow explicit; you can trace how information moves through the system
- **Confidence** - Strict boundary enforcement prevents accidental coupling; inner layers are protected from outer layer changes
- **Fast Feedback** - Boundaries can be crossed with test doubles; inner layers can be tested without real infrastructure

## Related Methods

- [M200-dependency-rule](/docs/external-frameworks/clean-architecture/methods/M200-dependency-rule) - Dependencies point inward across boundaries
- [M202-port-definition](/docs/external-frameworks/clean-architecture/methods/M202-port-definition) - Interfaces that define boundaries
- [M203-adapter-implementation](/docs/external-frameworks/clean-architecture/methods/M203-adapter-implementation) - Implementing boundary interfaces

## References

- Martin, R. C. (2017). *Clean Architecture: A Craftsman's Guide to Software Structure and Design*. Prentice Hall.
- Cockburn, A. (2005). [Hexagonal Architecture](https://alistair.cockburn.us/hexagonal-architecture/).
