---
displayed_sidebar: fieldGuideSidebar
sidebar_position: 11
title: Application Service
pillar: tactical-design
description: Use case orchestration that coordinates domain objects and infrastructure.
---

# Application Service

**Pillar:** Tactical Design

An Application Service orchestrates use cases by coordinating domain objects, repositories, and infrastructure services. It serves as the entry point to the domain layer, handling cross-cutting concerns like transactions and security.

## Definition

> Application Services are the direct clients of the domain model. These are responsible for task coordination of use case flows, one service method per flow. They are also the main interface to the domain model for external consumers.
>
> — Vaughn Vernon, Implementing Domain-Driven Design

## Why It Matters

Application Services are essential because:

- **Define use case boundaries** - Each method represents a complete use case
- **Coordinate infrastructure** - Handle transactions, security, logging
- **Keep domain pure** - Domain objects don't know about infrastructure
- **Provide clear API** - External consumers interact through services
- **Enable testing** - Use cases can be tested independently

## Characteristics

| Characteristic | Description |
|----------------|-------------|
| **Thin** | Contains no business logic |
| **Orchestrating** | Coordinates domain objects and services |
| **Transactional** | Manages transaction boundaries |
| **Use case focused** | One method per use case |

## What Application Services Do

1. **Accept input** - DTOs, commands, or primitives
2. **Load aggregates** - Via repositories
3. **Execute domain logic** - Call methods on domain objects
4. **Persist changes** - Save aggregates via repositories
5. **Publish events** - Dispatch domain events
6. **Return results** - DTOs or simple responses

## Example

```typescript
class OrderApplicationService {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly customerRepository: CustomerRepository,
    private readonly eventPublisher: EventPublisher,
    private readonly transactionManager: TransactionManager
  ) {}

  async placeOrder(command: PlaceOrderCommand): Promise<OrderId> {
    return this.transactionManager.execute(async () => {
      // Load aggregates
      const customer = await this.customerRepository.findById(
        command.customerId
      );
      if (!customer) {
        throw new CustomerNotFoundError(command.customerId);
      }

      // Execute domain logic
      const order = Order.create(
        customer.id,
        command.lineItems.map(li => 
          OrderLine.create(li.productId, li.quantity, li.price)
        )
      );

      // Persist
      await this.orderRepository.save(order);

      // Publish events
      const events = order.pullEvents();
      await this.eventPublisher.publishAll(events);

      return order.id;
    });
  }
}
```

## Application Service vs Domain Service

| Aspect | Application Service | Domain Service |
|--------|---------------------|----------------|
| **Purpose** | Use case orchestration | Domain logic |
| **Contains** | No business logic | Business logic |
| **Knows about** | Repositories, transactions | Domain model only |
| **Layer** | Application layer | Domain layer |

## What Doesn't Belong in Application Services

- **Business rules** - Belong in domain objects or domain services
- **Data transformation logic** - Belongs in mappers or the domain
- **Complex conditionals** - Usually indicates missing domain concepts
- **Direct database access** - Use repositories

## Input/Output Patterns

```typescript
// Input: Command object
interface PlaceOrderCommand {
  customerId: string;
  lineItems: Array<{
    productId: string;
    quantity: number;
    price: number;
  }>;
}

// Output: Simple result
interface PlaceOrderResult {
  orderId: string;
  status: 'success' | 'failed';
  error?: string;
}
```

Application services work with DTOs at the boundary, not domain objects.

## Common Mistakes

- **Fat services** - Business logic creeping into application services
- **Anemic domain** - All logic in services, entities are just data
- **Exposing domain objects** - Return DTOs, not entities
- **Missing transaction boundaries** - Each use case should be transactional
- **Too granular** - One service method per use case, not per operation

## Testing Application Services

```typescript
describe('OrderApplicationService', () => {
  it('places order for valid customer', async () => {
    // Arrange
    const customerRepo = new InMemoryCustomerRepository();
    const orderRepo = new InMemoryOrderRepository();
    const eventPublisher = new MockEventPublisher();
    
    customerRepo.save(Customer.create('cust-1', 'John'));
    
    const service = new OrderApplicationService(
      orderRepo,
      customerRepo,
      eventPublisher,
      new NoOpTransactionManager()
    );

    // Act
    const orderId = await service.placeOrder({
      customerId: 'cust-1',
      lineItems: [{ productId: 'prod-1', quantity: 2, price: 100 }]
    });

    // Assert
    const order = orderRepo.findById(orderId);
    expect(order).not.toBeNull();
    expect(eventPublisher.published).toContainEqual(
      expect.objectContaining({ type: 'OrderPlaced' })
    );
  });
});
```

## Relationship to Other Patterns

- **Repository** - Application services use repositories
- **Domain Service** - Application services may call domain services
- **Aggregate** - Application services load and save aggregates
- **Domain Event** - Application services publish events

## FOE Alignment

Application Services support **Optimize for Understanding** by providing clear entry points to the domain. Each method represents a complete use case with a meaningful name. Developers can understand what the system does by reading service interfaces, without diving into implementation details. This clarity accelerates onboarding and makes the system's capabilities explicit.
