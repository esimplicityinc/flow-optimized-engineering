---
methodId: M101
displayed_sidebar: fieldGuideSidebar
sidebar_position: 6
title: "Application Service"
sidebar_label: "Application Service"
description: "Use case orchestration coordinating domain objects"
external_method:
  framework: domain-driven-design
  method: application-service
  id: M101
foe_maturity: hypothesized
observations: []
---

import ExternalMethodHeader from '@site/src/components/ExternalMethodHeader';

# Application Service

<ExternalMethodHeader />

## Why This Matters for Software Architecture

Application Services orchestrate use cases without containing business logic. They coordinate domain objects, handle transactions, and manage infrastructure concerns, keeping domain logic pure.

**Architecture Benefits:**
- Clear entry points for use cases
- Separates orchestration from business logic
- Handles cross-cutting concerns (transactions, logging)
- Supports clean/hexagonal architecture patterns

**FOE Alignment:**
- **Understanding** - Use cases are explicit and discoverable
- **Confidence** - Business logic isolated and testable
- **Fast Feedback** - Thin services are easy to test

## Adaptations for Software Architecture

### Application Service Pattern

```typescript
// Application Service - orchestration only
class PlaceOrderService {
  constructor(
    private orderRepo: OrderRepository,
    private inventoryService: InventoryService,
    private eventPublisher: EventPublisher
  ) {}

  async execute(command: PlaceOrderCommand): Promise<OrderId> {
    // Orchestration, no business logic
    const order = Order.create(command.items);  // Domain creates
    
    await this.inventoryService.reserve(order.items);
    await this.orderRepo.save(order);
    
    await this.eventPublisher.publish(
      new OrderPlaced(order.id)
    );
    
    return order.id;
  }
}
```

### What Belongs Where

| Layer | Responsibility |
|-------|---------------|
| Application Service | Orchestration, transactions, security |
| Domain Service | Stateless domain operations |
| Domain Entity | State + business rules |

## Questions We're Exploring

- How thin should application services be?
- When do you need a domain service vs application service?
- How do application services handle failures?

## Supporting Evidence

