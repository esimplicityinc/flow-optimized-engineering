---
sidebar_position: 9
title: Repository
pillar: tactical-design
description: A collection-like interface for accessing and persisting aggregates.
---

# Repository

**Pillar:** Tactical Design

A Repository provides a collection-like interface for accessing and persisting aggregates. It encapsulates the logic required to access data sources, presenting a simple interface that hides the complexity of data access.

## Definition

> A mechanism for encapsulating storage, retrieval, and search behavior which emulates a collection of objects.
>
> — Eric Evans, DDD Reference

## Why It Matters

Repositories are essential because:

- **Hide persistence details** - Domain code doesn't know about databases
- **Enable testing** - Repositories can be easily mocked or stubbed
- **Provide collection semantics** - Work with aggregates as if they were in memory
- **Centralize query logic** - All data access goes through one place
- **Support multiple implementations** - Can swap storage without changing domain

## Repository Rules

1. **One repository per aggregate root** - Not per entity or value object
2. **Return complete aggregates** - Never return partial aggregates
3. **Collection-like interface** - Add, remove, find operations
4. **No business logic** - Repositories are purely for data access
5. **Interface in domain, implementation in infrastructure** - Dependency inversion

## Standard Operations

```typescript
interface OrderRepository {
  // Retrieval
  findById(id: OrderId): Order | null;
  findByCustomer(customerId: CustomerId): Order[];
  
  // Persistence
  save(order: Order): void;
  
  // Removal
  remove(order: Order): void;
  
  // Existence check
  exists(id: OrderId): boolean;
}
```

## Implementation Patterns

| Pattern | Description | Trade-offs |
|---------|-------------|------------|
| **Collection-oriented** | Tracks changes, saves on commit | More complex, better for rich domains |
| **Persistence-oriented** | Explicit save calls | Simpler, more explicit |

### Collection-Oriented Example

```typescript
// Changes tracked automatically
const order = orderRepository.findById(orderId);
order.addLineItem(product, quantity);
// Changes saved when unit of work commits
unitOfWork.commit();
```

### Persistence-Oriented Example

```typescript
// Explicit save required
const order = orderRepository.findById(orderId);
order.addLineItem(product, quantity);
orderRepository.save(order);
```

## Query Methods

Repositories can include query methods, but keep them focused:

```typescript
interface OrderRepository {
  // Good: Domain-meaningful queries
  findPendingOrdersOlderThan(days: number): Order[];
  findByStatus(status: OrderStatus): Order[];
  
  // Avoid: Generic queries that bypass the domain
  // findByArbitraryCondition(condition: QueryCondition): Order[];
}
```

For complex queries, consider a separate **Read Model** or **Query Service**.

## Common Mistakes

- **Repository per entity** - Should be per aggregate root only
- **Returning partial data** - Always return complete aggregates
- **Business logic in repository** - Keep repositories focused on data access
- **Exposing ORM details** - Domain shouldn't know about Entity Framework, Hibernate, etc.
- **Too many query methods** - Consider CQRS for complex query needs

## Testing with Repositories

Repositories enable easy testing:

```typescript
// In-memory implementation for tests
class InMemoryOrderRepository implements OrderRepository {
  private orders: Map<string, Order> = new Map();

  findById(id: OrderId): Order | null {
    return this.orders.get(id.value) ?? null;
  }

  save(order: Order): void {
    this.orders.set(order.id.value, order);
  }
}

// Test
const repository = new InMemoryOrderRepository();
const order = Order.create(customerId, lineItems);
repository.save(order);

order.cancel();
repository.save(order);

const retrieved = repository.findById(order.id);
expect(retrieved.status).toBe(OrderStatus.Cancelled);
```

## Relationship to Other Patterns

- **Aggregate** - Repositories work with aggregate roots
- **Factory** - May be used by repository to reconstitute aggregates
- **Unit of Work** - Often coordinates with repositories for transactions
- **Domain Event** - Repository may dispatch events after save

## FOE Alignment

Repositories support both **Confidence** and **Fast Feedback**. By providing a consistent interface for data access, repositories make it easy to write tests that run quickly against in-memory implementations. The abstraction also gives confidence that persistence concerns won't leak into domain logic, making the codebase more maintainable and changes safer.
