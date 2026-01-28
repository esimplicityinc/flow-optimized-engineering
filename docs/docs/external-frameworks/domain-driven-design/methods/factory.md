---
sidebar_position: 12
title: Factory
pillar: tactical-design
description: Encapsulates complex object and aggregate creation logic.
---

# Factory

**Pillar:** Tactical Design

A Factory encapsulates the knowledge needed to create complex objects or aggregates. Factories ensure that objects are created in a valid state and hide the complexity of construction from clients.

## Definition

> Shift the responsibility for creating instances of complex objects and Aggregates to a separate object, which may itself have no responsibility in the domain model but is still part of the domain design.
>
> — Eric Evans, DDD Reference

## Why It Matters

Factories are essential because:

- **Ensure valid initial state** - Objects are always created correctly
- **Hide construction complexity** - Clients don't need to know creation details
- **Express domain concepts** - Creation can be a significant domain operation
- **Support invariants** - Complex invariants are enforced at creation
- **Enable reconstitution** - Rebuild objects from persistence

## When to Use Factories

Use a factory when:

- Object creation is complex (many parameters, conditional logic)
- Creation involves multiple objects that must be consistent
- You need to enforce invariants at creation time
- The creation process is a domain concept itself
- You need to reconstitute objects from storage

## Factory Patterns

### Factory Method on Aggregate Root

```typescript
class Order {
  private constructor(
    private readonly id: OrderId,
    private readonly customerId: CustomerId,
    private readonly lineItems: OrderLine[],
    private readonly status: OrderStatus,
    private readonly createdAt: Timestamp
  ) {}

  // Factory method
  static create(
    customerId: CustomerId,
    lineItems: OrderLine[]
  ): Order {
    if (lineItems.length === 0) {
      throw new Error("Order must have at least one line item");
    }
    
    return new Order(
      OrderId.generate(),
      customerId,
      lineItems,
      OrderStatus.Draft,
      Timestamp.now()
    );
  }

  // Reconstitution factory (for repository use)
  static reconstitute(
    id: OrderId,
    customerId: CustomerId,
    lineItems: OrderLine[],
    status: OrderStatus,
    createdAt: Timestamp
  ): Order {
    return new Order(id, customerId, lineItems, status, createdAt);
  }
}
```

### Standalone Factory

```typescript
class OrderFactory {
  constructor(
    private readonly pricingService: PricingService,
    private readonly inventoryChecker: InventoryChecker
  ) {}

  async createOrder(
    customer: Customer,
    items: Array<{ product: Product; quantity: Quantity }>
  ): Promise<Order> {
    // Check inventory
    for (const item of items) {
      const available = await this.inventoryChecker.check(
        item.product.id,
        item.quantity
      );
      if (!available) {
        throw new InsufficientInventoryError(item.product.id);
      }
    }

    // Calculate prices
    const lineItems = items.map(item => {
      const price = this.pricingService.calculatePrice(
        item.product,
        customer,
        item.quantity
      );
      return OrderLine.create(item.product.id, item.quantity, price);
    });

    return Order.create(customer.id, lineItems);
  }
}
```

## Factory vs Constructor

| Aspect | Constructor | Factory |
|--------|-------------|---------|
| **Complexity** | Simple creation | Complex creation |
| **Dependencies** | None | May have dependencies |
| **Naming** | Fixed name | Descriptive names |
| **Return type** | Always same type | Can return subtypes |

## Creation vs Reconstitution

| Purpose | Creation | Reconstitution |
|---------|----------|----------------|
| **When** | New object | Loading from storage |
| **Validation** | Full validation | Minimal (data already valid) |
| **Defaults** | Applied | Not applied |
| **Events** | May generate | Should not generate |

```typescript
class Order {
  // Creation: validates, sets defaults, may emit events
  static create(customerId: CustomerId, items: OrderLine[]): Order {
    // ... validation and setup
  }

  // Reconstitution: trusts the data, no events
  static reconstitute(data: OrderData): Order {
    return new Order(
      data.id,
      data.customerId,
      data.lineItems,
      data.status,
      data.createdAt
    );
  }
}
```

## Common Mistakes

- **Validation in constructor only** - Factories should also validate
- **Skipping factories for "simple" objects** - Even simple objects benefit from factory methods
- **Business logic in factories** - Factories create, they don't make business decisions
- **Forgetting reconstitution** - Repositories need a way to rebuild objects

## Factory Method Naming

Use intention-revealing names:

```typescript
class Subscription {
  static createTrial(customerId: CustomerId): Subscription { ... }
  static createPaid(customerId: CustomerId, plan: Plan): Subscription { ... }
  static upgrade(current: Subscription, newPlan: Plan): Subscription { ... }
}
```

## Relationship to Other Patterns

- **Aggregate** - Factories create aggregates in valid initial state
- **Repository** - Uses reconstitution factories to rebuild aggregates
- **Value Object** - Often created via factory methods
- **Domain Service** - May use factories as part of complex operations

## FOE Alignment

Factories support **Confidence to Act** by ensuring objects are always created in a valid state. When creation logic is encapsulated in factories, developers can trust that if an object exists, it was created correctly. This eliminates a class of bugs where objects are partially initialized or in invalid states. The explicit factory methods also improve understanding by making creation a visible, named operation.
