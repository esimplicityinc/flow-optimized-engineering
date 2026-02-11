---
methodId: M202
displayed_sidebar: fieldGuideSidebar
sidebar_position: 3
title: Port Definition
pillar: dependency-management
description: Define interfaces that specify purposeful conversations between the application core and external actors, enabling technology independence.
---

# Port Definition

**Pillar:** Dependency Management

Ports are interfaces defined by the application core that specify how external actors can interact with the application. They represent the "purposeful conversation" the application wants to have, independent of the technology used to implement it.

## Definition

> A port is an interface that defines a purposeful conversation between the application and an external actor. The application says, "Here is how you can talk to me," and the external actor implements that interface.
>
> — Alistair Cockburn, Hexagonal Architecture

## Why It Matters

Ports provide several key benefits:

- **Technology independence** - The core defines what it needs, not how it's provided
- **Testability** - Ports can be implemented with mocks or stubs for testing
- **Delayed decisions** - You can define ports before choosing technologies
- **Multiple implementations** - Different adapters can implement the same port (e.g., test database vs. production database)

## Types of Ports

### Primary Ports (Driving Ports)

Primary ports are interfaces that the application exposes for external actors to initiate interactions. They define what the application can do.

**Examples:**
- Application services / Use case interfaces
- Command handlers
- Query handlers

```typescript
// Primary Port - what the application offers
interface OrderService {
  createOrder(command: CreateOrderCommand): Promise<OrderResult>;
  cancelOrder(command: CancelOrderCommand): Promise<void>;
  getOrder(query: GetOrderQuery): Promise<OrderDto>;
}

// Command objects - immutable inputs
class CreateOrderCommand {
  constructor(
    readonly customerId: string,
    readonly items: OrderItemCommand[]
  ) {}
}

// Result objects - structured outputs
interface OrderResult {
  orderId: string;
  total: Money;
  status: OrderStatus;
}
```

### Secondary Ports (Driven Ports)

Secondary ports are interfaces that the application depends on to interact with external systems. They define what the application needs from the outside world.

**Examples:**
- Repository interfaces
- Payment gateway interfaces
- Notification service interfaces
- File storage interfaces

```typescript
// Secondary Port - what the application needs
interface OrderRepository {
  findById(id: OrderId): Promise<Order | null>;
  findByCustomer(customerId: CustomerId): Promise<Order[]>;
  save(order: Order): Promise<void>;
  delete(id: OrderId): Promise<void>;
}

interface PaymentGateway {
  charge(amount: Money, cardToken: string): Promise<PaymentResult>;
  refund(transactionId: string, amount: Money): Promise<void>;
}

interface NotificationService {
  sendOrderConfirmation(customerEmail: string, order: Order): Promise<void>;
  sendShippingNotification(customerEmail: string, tracking: TrackingInfo): Promise<void>;
}
```

## Designing Good Ports

### 1. Use Domain Language

Ports should use ubiquitous language from the domain, not technical terms:

```typescript
// GOOD: Domain language
interface OrderRepository {
  findById(id: OrderId): Promise<Order | null>;
  save(order: Order): Promise<void>;
}

// BAD: Technical/database language
interface OrderRepository {
  selectByPrimaryKey(id: string): Promise<any>;
  insertOrUpdate(record: object): Promise<void>;
}
```

### 2. Keep Ports Stable

Ports should change less frequently than implementations:

```typescript
// GOOD: Stable interface
interface EmailService {
  send(to: EmailAddress, subject: string, body: string): Promise<void>;
}

// BAD: Leaks implementation details
interface SendGridEmailService {
  sendWithTemplate(to: string, templateId: string, dynamicData: object): Promise<void>;
}
```

### 3. Define Clear Contracts

Ports should specify preconditions, postconditions, and error cases:

```typescript
interface InventoryService {
  /**
   * Reserves inventory for an order.
   * @param productId - The product to reserve
   * @param quantity - Amount to reserve (must be > 0)
   * @returns Reservation ID if successful
   * @throws InsufficientInventoryError if not enough stock
   * @throws ProductNotFoundError if product doesn't exist
   */
  reserve(productId: ProductId, quantity: number): Promise<ReservationId>;
  
  /**
   * Releases a previous reservation.
   * @param reservationId - The reservation to release
   * @throws ReservationNotFoundError if reservation doesn't exist
   */
  release(reservationId: ReservationId): Promise<void>;
}
```

### 4. Avoid Leaking Framework Types

```typescript
// GOOD: Pure domain types
interface UserRepository {
  findByEmail(email: Email): Promise<User | null>;
}

// BAD: Leaks database types
interface UserRepository {
  findByEmail(email: string): Promise<PrismaUser | null>; // ❌ Prisma type
}
```

## Port Granularity

### Fine-Grained Ports

Many small, focused interfaces (Interface Segregation Principle):

```typescript
interface UserReader {
  findById(id: UserId): Promise<User | null>;
}

interface UserWriter {
  save(user: User): Promise<void>;
}

interface UserDeleter {
  delete(id: UserId): Promise<void>;
}
```

**Pros:**
- Adapters implement only what they need
- Easier to mock for testing
- Clearer dependencies

**Cons:**
- More interfaces to manage
- May require combining for common operations

### Coarse-Grained Ports

Fewer, larger interfaces:

```typescript
interface UserRepository {
  findById(id: UserId): Promise<User | null>;
  findByEmail(email: Email): Promise<User | null>;
  save(user: User): Promise<void>;
  delete(id: UserId): Promise<void>;
  list(options: ListOptions): Promise<PaginatedResult<User>>;
}
```

**Pros:**
- Simpler dependency injection
- Fewer interfaces to import

**Cons:**
- Adapters must implement unused methods
- Harder to test in isolation

## Common Mistakes

### ❌ Ports Depending on Adapters

```typescript
// WRONG: Port depends on adapter
interface OrderRepository {
  save(order: Order, dbConnection: PostgresConnection): Promise<void>; // ❌ Adapter type in port
}
```

### ❌ Leaking Implementation Details

```typescript
// WRONG: Port exposes SQL
interface ProductRepository {
  query(sql: string, params: any[]): Promise<any[]>; // ❌ SQL in port
}
```

### ❌ Anemic Ports

```typescript
// WRONG: Port is just CRUD, no domain meaning
interface OrderRepository {
  create(data: object): Promise<void>;
  read(id: string): Promise<object>;
  update(id: string, data: object): Promise<void>;
  delete(id: string): Promise<void>;
}
```

## FOE Alignment

Port Definition supports FOE principles:

- **Understanding** - Ports make the application's needs and capabilities explicit; they serve as documentation of the system's boundaries
- **Confidence** - Well-defined ports prevent tight coupling; you can change implementations without touching the core
- **Fast Feedback** - Ports enable testing the core logic with fast, in-memory implementations before real infrastructure exists

## Related Methods

- [M200-dependency-rule](/docs/external-frameworks/clean-architecture/methods/M200-dependency-rule) - Dependencies point inward toward ports
- [M203-adapter-implementation](/docs/external-frameworks/clean-architecture/methods/M203-adapter-implementation) - Implementing ports with specific technologies
- [M206-boundary-crossing](/docs/external-frameworks/clean-architecture/methods/M206-boundary-crossing) - Mechanisms for crossing layer boundaries

## References

- Cockburn, A. (2005). [Hexagonal Architecture](https://alistair.cockburn.us/hexagonal-architecture/).
- Martin, R. C. (2017). *Clean Architecture: A Craftsman's Guide to Software Structure and Design*. Prentice Hall.
