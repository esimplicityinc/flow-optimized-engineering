---
methodId: M205
displayed_sidebar: fieldGuideSidebar
sidebar_position: 6
title: Use Case Implementation
pillar: layer-organization
description: Implement application-specific business rules that orchestrate entities to accomplish specific user goals and system operations.
---

# Use Case Implementation

**Pillar:** Layer Organization

Use cases (also called Interactors or Application Services) contain application-specific business rules. They orchestrate the flow of data to and from entities, and direct those entities to use their enterprise-wide business rules to achieve the goals of the use case.

## Definition

> The software in this layer contains application-specific business rules. It encapsulates and implements all of the use cases of the system. These use cases orchestrate the flow of data to and from the entities, and direct those entities to use their enterprise-wide business rules to achieve the goals of the use case.
>
> — Robert C. Martin, Clean Architecture

## Why It Matters

Use cases provide:

- **Clear boundaries** - Each use case represents a specific user goal
- **Orchestration** - Coordinates entities and external services
- **Transaction boundaries** - Defines where transactions begin and end
- **Decoupling** - UI and database don't know about each other
- **Testability** - Business processes can be tested without infrastructure

## Structure of a Use Case

### 1. Input/Output Boundaries

Define clear contracts for what goes in and out:

```typescript
// Input (Command or Query)
interface CreateOrderInput {
  customerId: string;
  items: Array<{
    productId: string;
    quantity: number;
  }>;
  shippingAddress: AddressDto;
}

// Output (Result)
interface CreateOrderOutput {
  orderId: string;
  total: MoneyDto;
  itemCount: number;
  estimatedDelivery: Date;
}
```

### 2. Use Case Class

```typescript
class CreateOrderUseCase {
  constructor(
    private orderRepository: OrderRepository,
    private productRepository: ProductRepository,
    private customerRepository: CustomerRepository,
    private inventoryService: InventoryService,
    private pricingEngine: PricingEngine,
    private eventPublisher: DomainEventPublisher
  ) {}
  
  async execute(input: CreateOrderInput): Promise<CreateOrderOutput> {
    // 1. Validate and load dependencies
    const customer = await this.customerRepository.findById(
      new CustomerId(input.customerId)
    );
    if (!customer) {
      throw new CustomerNotFoundError(input.customerId);
    }
    
    // 2. Create and populate the aggregate
    const order = new Order(customer.id);
    
    for (const itemInput of input.items) {
      const product = await this.productRepository.findById(
        new ProductId(itemInput.productId)
      );
      if (!product) {
        throw new ProductNotFoundError(itemInput.productId);
      }
      
      // Check inventory
      const available = await this.inventoryService.checkAvailability(
        product.id,
        itemInput.quantity
      );
      if (!available) {
        throw new InsufficientInventoryError(product.id, itemInput.quantity);
      }
      
      // Calculate price
      const price = await this.pricingEngine.calculatePrice(
        product,
        customer,
        itemInput.quantity
      );
      
      order.addItem(product, itemInput.quantity, price);
    }
    
    // 3. Set shipping address
    order.setShippingAddress(this.mapAddress(input.shippingAddress));
    
    // 4. Validate the order
    order.validate();
    
    // 5. Reserve inventory
    for (const item of order.items) {
      await this.inventoryService.reserve(item.productId, item.quantity);
    }
    
    // 6. Save the order
    await this.orderRepository.save(order);
    
    // 7. Publish events
    for (const event of order.domainEvents) {
      await this.eventPublisher.publish(event);
    }
    order.clearEvents();
    
    // 8. Return result
    return {
      orderId: order.id.value,
      total: this.mapMoney(order.total),
      itemCount: order.items.length,
      estimatedDelivery: this.calculateDeliveryDate(order)
    };
  }
  
  private mapAddress(dto: AddressDto): Address {
    return new Address(dto.street, dto.city, dto.zipCode, dto.country);
  }
  
  private mapMoney(money: Money): MoneyDto {
    return { amount: money.amount, currency: money.currency };
  }
  
  private calculateDeliveryDate(order: Order): Date {
    // Business logic for delivery estimation
    const baseDays = 3;
    const itemDelay = Math.max(0, order.items.length - 5);
    const deliveryDate = addBusinessDays(new Date(), baseDays + itemDelay);
    return deliveryDate;
  }
}
```

## Use Case Patterns

### Command Use Cases

Modify state and return minimal data:

```typescript
interface CancelOrderUseCase {
  execute(command: CancelOrderCommand): Promise<void>;
}

class CancelOrderCommand {
  constructor(
    readonly orderId: string,
    readonly reason: string,
    readonly cancelledBy: string
  ) {}
}
```

### Query Use Cases

Read-only operations that return data:

```typescript
interface GetOrderDetailsUseCase {
  execute(query: GetOrderQuery): Promise<OrderDetailsDto>;
}

class GetOrderQuery {
  constructor(readonly orderId: string) {}
}

interface OrderDetailsDto {
  id: string;
  status: string;
  items: OrderItemDto[];
  total: MoneyDto;
  customer: CustomerSummaryDto;
  timeline: OrderEventDto[];
}
```

### Process Use Cases

Long-running operations with progress tracking:

```typescript
interface ProcessBulkImportUseCase {
  execute(command: BulkImportCommand): Promise<ImportJobId>;
  getProgress(jobId: ImportJobId): Promise<ImportProgress>;
}
```

## Use Case Responsibilities

### ✅ Do

- Orchestrate entities to accomplish a goal
- Coordinate multiple repositories
- Call external services through ports
- Handle transactions
- Map between DTOs and domain objects
- Publish domain events
- Validate input at the boundary

### ❌ Don't

- Contain business rules (belongs in entities)
- Depend on frameworks (HTTP, database, etc.)
- Access infrastructure directly
- Contain presentation logic
- Implement cross-cutting concerns (logging, auth)

## Common Mistakes

### ❌ Business Logic in Use Case

```typescript
// WRONG: Business rule in use case
class CreateOrderUseCase {
  async execute(input: CreateOrderInput) {
    if (input.items.length > 50) { // ❌ Business rule
      throw new Error('Too many items');
    }
    // ...
  }
}

// CORRECT: Business rule in entity
class Order {
  addItem(product: Product, quantity: number) {
    if (this.items.length >= 50) { // ✅ Business rule in entity
      throw new DomainError('Maximum 50 items per order');
    }
    // ...
  }
}
```

### ❌ Framework Dependencies

```typescript
// WRONG: Use case depends on Express
import { Request, Response } from 'express';

class CreateOrderUseCase {
  async execute(req: Request, res: Response) { // ❌ Framework types
    // ...
  }
}
```

### ❌ Direct Database Access

```typescript
// WRONG: Use case bypasses repository
class CreateOrderUseCase {
  constructor(private db: Database) {} // ❌ Direct DB dependency
  
  async execute(input: CreateOrderInput) {
    await this.db.query('INSERT INTO orders ...'); // ❌ SQL in use case
  }
}
```

### ❌ Anemic Use Case

```typescript
// WRONG: Use case just passes through to repository
class CreateOrderUseCase {
  constructor(private orderRepository: OrderRepository) {}
  
  async execute(input: CreateOrderInput) {
    const order = new Order(); // ❌ No validation, no orchestration
    await this.orderRepository.save(order);
  }
}
```

## Testing Use Cases

### Unit Tests with Mocks

```typescript
describe('CreateOrderUseCase', () => {
  let useCase: CreateOrderUseCase;
  let orderRepository: jest.Mocked<OrderRepository>;
  let productRepository: jest.Mocked<ProductRepository>;
  let inventoryService: jest.Mocked<InventoryService>;
  
  beforeEach(() => {
    orderRepository = {
      save: jest.fn()
    } as any;
    
    productRepository = {
      findById: jest.fn()
    } as any;
    
    inventoryService = {
      checkAvailability: jest.fn()
    } as any;
    
    useCase = new CreateOrderUseCase(
      orderRepository,
      productRepository,
      inventoryService
    );
  });
  
  it('should create order with valid input', async () => {
    const product = createTestProduct();
    productRepository.findById.mockResolvedValue(product);
    inventoryService.checkAvailability.mockResolvedValue(true);
    
    const input = createTestInput();
    const result = await useCase.execute(input);
    
    expect(orderRepository.save).toHaveBeenCalled();
    expect(result.orderId).toBeDefined();
    expect(result.total.amount).toBeGreaterThan(0);
  });
  
  it('should throw when product not found', async () => {
    productRepository.findById.mockResolvedValue(null);
    
    await expect(useCase.execute(createTestInput()))
      .rejects
      .toThrow(ProductNotFoundError);
  });
});
```

## FOE Alignment

Use Case Implementation supports FOE principles:

- **Understanding** - Each use case represents a clear user goal; the flow of data is explicit and traceable
- **Confidence** - Use cases define transaction boundaries; operations are atomic and consistent
- **Fast Feedback** - Use cases can be tested with in-memory repositories; no need for real databases

## Related Methods

- [M201-layer-organization](/docs/external-frameworks/clean-architecture/methods/M201-layer-organization) - Use cases as the second layer
- [M204-entity-design](/docs/external-frameworks/clean-architecture/methods/M204-entity-design) - Entities orchestrated by use cases
- [M101-application-service](/docs/external-frameworks/domain-driven-design/methods/M101-application-service) - Similar concept in DDD

## References

- Martin, R. C. (2017). *Clean Architecture: A Craftsman's Guide to Software Structure and Design*. Prentice Hall.
- Cockburn, A. (2005). [Hexagonal Architecture](https://alistair.cockburn.us/hexagonal-architecture/).
