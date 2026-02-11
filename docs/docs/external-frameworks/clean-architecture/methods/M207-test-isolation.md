---
methodId: M207
displayed_sidebar: fieldGuideSidebar
sidebar_position: 8
title: Test Isolation
pillar: testability
description: Test business logic without external dependencies by using in-memory implementations of ports and adapters.
---

# Test Isolation

**Pillar:** Testability

Test isolation in Clean Architecture means testing business logic—entities and use cases—without relying on external systems like databases, web servers, or third-party APIs. This is achieved by using in-memory implementations of ports and adapters during testing.

## Definition

> The database is a detail. The web is a detail. The framework is a detail. We should be able to test our business rules without the database, without the web server, and without any external agency.
>
> — Robert C. Martin, Clean Architecture

## Why It Matters

Isolated testing provides:

- **Speed** - Tests run in milliseconds instead of seconds
- **Reliability** - No flaky tests due to network issues or database state
- **Determinism** - Same test always produces same result
- **Parallelization** - Tests can run in parallel without conflicts
- **Feedback** - Immediate feedback on business logic correctness
- **Debugging** - Failures are easier to diagnose without external complexity

## The Testing Pyramid in Clean Architecture

```
       /\
      /  \      E2E Tests (few)
     /____\     (Full stack, slow)
    /      \
   /        \   Integration Tests
  /__________\  (Adapters with real DB)
 /            \
/______________\ Unit Tests (many)
                 (Core logic, fast)
```

## Unit Testing Entities

Entities have no dependencies, making them trivial to test:

```typescript
describe('Order', () => {
  describe('addItem', () => {
    it('should add item to order', () => {
      const order = new Order(new CustomerId('cust-1'));
      const product = new Product(new ProductId('prod-1'), 'Widget', Money.of(10));
      
      order.addItem(product, 5);
      
      expect(order.items).toHaveLength(1);
      expect(order.items[0].productId).toEqual(product.id);
      expect(order.items[0].quantity).toBe(5);
    });
    
    it('should calculate total correctly', () => {
      const order = new Order(new CustomerId('cust-1'));
      const product = new Product(new ProductId('prod-1'), 'Widget', Money.of(10));
      
      order.addItem(product, 5);
      
      expect(order.total).toEqual(Money.of(50));
    });
    
    it('should throw when quantity is zero', () => {
      const order = new Order(new CustomerId('cust-1'));
      const product = new Product(new ProductId('prod-1'), 'Widget', Money.of(10));
      
      expect(() => order.addItem(product, 0))
        .toThrow('Quantity must be positive');
    });
    
    it('should throw when adding to submitted order', () => {
      const order = new Order(new CustomerId('cust-1'));
      const product = new Product(new ProductId('prod-1'), 'Widget', Money.of(10));
      order.addItem(product, 1);
      order.submit();
      
      expect(() => order.addItem(product, 1))
        .toThrow('Cannot modify order in SUBMITTED status');
    });
  });
  
  describe('submit', () => {
    it('should change status to submitted', () => {
      const order = createOrderWithItems();
      
      order.submit();
      
      expect(order.status).toBe(OrderStatus.SUBMITTED);
    });
    
    it('should record OrderSubmitted event', () => {
      const order = createOrderWithItems();
      
      order.submit();
      
      const events = order.domainEvents;
      expect(events).toHaveLength(1);
      expect(events[0]).toBeInstanceOf(OrderSubmittedEvent);
    });
    
    it('should throw when order is empty', () => {
      const order = new Order(new CustomerId('cust-1'));
      
      expect(() => order.submit())
        .toThrow('Cannot submit empty order');
    });
  });
});
```

## Unit Testing Use Cases with In-Memory Adapters

Use cases depend on ports (interfaces), which we can implement with in-memory versions:

```typescript
// In-memory repository implementation
class InMemoryOrderRepository implements OrderRepository {
  private orders: Map<string, Order> = new Map();
  
  async findById(id: OrderId): Promise<Order | null> {
    return this.orders.get(id.value) || null;
  }
  
  async save(order: Order): Promise<void> {
    this.orders.set(order.id.value, order);
  }
  
  async findByCustomer(customerId: CustomerId): Promise<Order[]> {
    return Array.from(this.orders.values())
      .filter(o => o.customerId.equals(customerId));
  }
  
  // Test helper methods
  clear(): void {
    this.orders.clear();
  }
  
  count(): number {
    return this.orders.size;
  }
}

// In-memory payment gateway
class InMemoryPaymentGateway implements PaymentGateway {
  private charges: Array<{ amount: Money; cardToken: string }> = [];
  private shouldFail = false;
  
  async charge(amount: Money, cardToken: string): Promise<PaymentResult> {
    if (this.shouldFail) {
      return { success: false, error: 'Payment declined' };
    }
    
    this.charges.push({ amount, cardToken });
    return {
      success: true,
      transactionId: `txn-${this.charges.length}`,
      amount
    };
  }
  
  // Test helper methods
  setShouldFail(shouldFail: boolean): void {
    this.shouldFail = shouldFail;
  }
  
  getCharges(): Array<{ amount: Money; cardToken: string }> {
    return [...this.charges];
  }
}

// In-memory event publisher
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

### Testing Use Cases

```typescript
describe('CreateOrderUseCase', () => {
  let useCase: CreateOrderUseCase;
  let orderRepository: InMemoryOrderRepository;
  let productRepository: InMemoryProductRepository;
  let paymentGateway: InMemoryPaymentGateway;
  let eventPublisher: InMemoryEventPublisher;
  
  beforeEach(() => {
    orderRepository = new InMemoryOrderRepository();
    productRepository = new InMemoryProductRepository();
    paymentGateway = new InMemoryPaymentGateway();
    eventPublisher = new InMemoryEventPublisher();
    
    useCase = new CreateOrderUseCase(
      orderRepository,
      productRepository,
      paymentGateway,
      eventPublisher
    );
  });
  
  it('should create order with valid input', async () => {
    // Arrange
    const product = new Product(new ProductId('prod-1'), 'Widget', Money.of(10));
    await productRepository.save(product);
    
    const input: CreateOrderInput = {
      customerId: 'cust-1',
      items: [{ productId: 'prod-1', quantity: 5 }]
    };
    
    // Act
    const result = await useCase.execute(input);
    
    // Assert
    expect(result.orderId).toBeDefined();
    expect(result.total.amount).toBe(50);
    expect(orderRepository.count()).toBe(1);
  });
  
  it('should publish OrderCreated event', async () => {
    const product = new Product(new ProductId('prod-1'), 'Widget', Money.of(10));
    await productRepository.save(product);
    
    await useCase.execute({
      customerId: 'cust-1',
      items: [{ productId: 'prod-1', quantity: 5 }]
    });
    
    const events = eventPublisher.getPublishedEvents();
    expect(events).toHaveLength(1);
    expect(events[0]).toBeInstanceOf(OrderCreatedEvent);
  });
  
  it('should throw when product not found', async () => {
    const input: CreateOrderInput = {
      customerId: 'cust-1',
      items: [{ productId: 'non-existent', quantity: 1 }]
    };
    
    await expect(useCase.execute(input))
      .rejects
      .toThrow(ProductNotFoundError);
  });
  
  it('should handle payment failure', async () => {
    const product = new Product(new ProductId('prod-1'), 'Widget', Money.of(10));
    await productRepository.save(product);
    paymentGateway.setShouldFail(true);
    
    await expect(useCase.execute({
      customerId: 'cust-1',
      items: [{ productId: 'prod-1', quantity: 5 }]
    })).rejects.toThrow(PaymentFailedError);
    
    // Order should not be saved on payment failure
    expect(orderRepository.count()).toBe(0);
  });
});
```

## Contract Tests

Ensure all adapter implementations behave the same:

```typescript
describe('OrderRepository Contract', () => {
  const implementations = [
    {
      name: 'InMemory',
      create: () => new InMemoryOrderRepository()
    },
    {
      name: 'Postgres',
      create: () => new PostgresOrderRepository(testDb.pool)
    }
  ];
  
  implementations.forEach(({ name, create }) => {
    describe(name, () => {
      let repository: OrderRepository;
      
      beforeEach(() => {
        repository = create();
      });
      
      it('should return null for non-existent order', async () => {
        const result = await repository.findById(new OrderId('non-existent'));
        expect(result).toBeNull();
      });
      
      it('should find saved order', async () => {
        const order = createTestOrder();
        await repository.save(order);
        
        const found = await repository.findById(order.id);
        expect(found?.id).toEqual(order.id);
        expect(found?.total).toEqual(order.total);
      });
      
      it('should update existing order', async () => {
        const order = createTestOrder();
        await repository.save(order);
        
        order.addItem(new Product(new ProductId('prod-2'), 'Gadget', Money.of(20)), 1);
        await repository.save(order);
        
        const found = await repository.findById(order.id);
        expect(found?.items).toHaveLength(2);
      });
    });
  });
});
```

## Integration Testing Adapters

Test real adapters with real (but isolated) infrastructure:

```typescript
describe('PostgresOrderRepository Integration', () => {
  let repository: PostgresOrderRepository;
  let testDb: TestDatabase;
  
  beforeAll(async () => {
    testDb = await TestDatabase.create();
  });
  
  afterAll(async () => {
    await testDb.destroy();
  });
  
  beforeEach(async () => {
    await testDb.clean();
    repository = new PostgresOrderRepository(testDb.pool);
  });
  
  it('should persist order with items', async () => {
    const order = new Order(new CustomerId('cust-1'), new OrderId('order-1'));
    const product = new Product(new ProductId('prod-1'), 'Widget', Money.of(10));
    order.addItem(product, 5);
    
    await repository.save(order);
    
    const found = await repository.findById(order.id);
    expect(found).not.toBeNull();
    expect(found?.items).toHaveLength(1);
    expect(found?.total).toEqual(Money.of(50));
  });
});
```

## Common Mistakes

### ❌ Testing with Real Database in Unit Tests

```typescript
// WRONG: Unit test depends on real database
describe('CreateOrderUseCase', () => {
  it('should create order', async () => {
    const useCase = new CreateOrderUseCase(
      new PostgresOrderRepository(realDbPool), // ❌ Real database
      // ...
    );
    // Test is slow and flaky
  });
});
```

### ❌ Not Testing Edge Cases

```typescript
// WRONG: Only testing happy path
describe('Order', () => {
  it('should work', () => {
    const order = new Order(customerId);
    order.addItem(product, 1);
    // No assertions about edge cases
  });
});
```

### ❌ Testing Implementation Details

```typescript
// WRONG: Testing private implementation
describe('Order', () => {
  it('should have correct internal state', () => {
    const order = new Order(customerId);
    expect(order['_items']).toEqual([]); // ❌ Testing private field
  });
});
```

## FOE Alignment

Test Isolation supports FOE principles:

- **Understanding** - Well-isolated tests document expected behavior; they serve as executable specifications
- **Confidence** - Fast, reliable tests give confidence to refactor; you know immediately if business logic breaks
- **Fast Feedback** - Millisecond-level feedback on code changes; no waiting for databases or services

## Related Methods

- [M200-dependency-rule](/docs/external-frameworks/clean-architecture/methods/M200-dependency-rule) - Dependencies point inward, enabling test doubles
- [M202-port-definition](/docs/external-frameworks/clean-architecture/methods/M202-port-definition) - Interfaces that can be mocked
- [M203-adapter-implementation](/docs/external-frameworks/clean-architecture/methods/M203-adapter-implementation) - Real and test adapter implementations

## References

- Martin, R. C. (2017). *Clean Architecture: A Craftsman's Guide to Software Structure and Design*. Prentice Hall.
- Freeman, S., & Pryce, N. (2009). *Growing Object-Oriented Software, Guided by Tests*. Addison-Wesley.
