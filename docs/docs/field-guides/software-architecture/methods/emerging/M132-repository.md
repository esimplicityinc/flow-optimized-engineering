---
methodId: M132
displayed_sidebar: fieldGuideSidebar
sidebar_position: 3
title: "Repository"
sidebar_label: "Repository"
description: "Collection-like interface for accessing aggregates"
external_method:
  framework: domain-driven-design
  method: repository
  id: M132
foe_maturity: hypothesized
observations:
  - O118
---

import ExternalMethodHeader from '@site/src/components/ExternalMethodHeader';

# Repository

<ExternalMethodHeader />

## Why This Matters for Software Architecture

Repositories abstract data access, hiding persistence details from domain code. This separation enables testing without databases and swapping storage implementations without changing business logic.

**Architecture Benefits:**
- Domain code doesn't depend on persistence technology
- Easy to test with in-memory implementations
- Consistent interface for aggregate access
- Supports hexagonal/clean architecture patterns

**FOE Alignment:**
- **Understanding** - Clear separation between domain and persistence
- **Fast Feedback** - In-memory repos enable fast unit tests
- **Confidence** - Domain logic tested independently of database

## Adaptations for Software Architecture

### Repository Interface

Define repository as a domain concept:

```typescript
// Domain layer - no persistence details
interface OrderRepository {
  findById(id: OrderId): Promise<Order | null>;
  save(order: Order): Promise<void>;
  findByCustomer(customerId: CustomerId): Promise<Order[]>;
}

// Infrastructure layer - implementation details
class PostgresOrderRepository implements OrderRepository {
  async findById(id: OrderId): Promise<Order | null> {
    // SQL implementation
  }
}

// Testing - in-memory implementation
class InMemoryOrderRepository implements OrderRepository {
  private orders = new Map<string, Order>();
  // Fast, no database needed
}
```

### One Repository Per Aggregate

- Each aggregate root has its own repository
- Never have repositories for non-root entities
- Repository methods return aggregate roots

## Questions We're Exploring

- How do you handle complex queries that span aggregates?
- When should repositories cache?
- How do repositories work with event sourcing?

## Supporting Evidence

