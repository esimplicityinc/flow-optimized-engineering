---
methodId: M100
displayed_sidebar: fieldGuideSidebar
sidebar_position: 2
title: "Aggregate"
sidebar_label: "Aggregate"
description: "Cluster of objects treated as a single unit for data changes"
external_method:
  framework: domain-driven-design
  method: aggregate
  id: M100
foe_maturity: hypothesized
observations:
  - O118
---

import ExternalMethodHeader from '@site/src/components/ExternalMethodHeader';

# Aggregate

<ExternalMethodHeader />

## Why This Matters for Software Architecture

Aggregates define consistency boundaries within your domain. They ensure business invariants are maintained and provide clear transaction scope, making it easier to reason about data integrity.

**Architecture Benefits:**
- Clear transaction boundaries
- Encapsulated business rules
- Natural unit for testing
- Guides database design (one aggregate = one transaction)

**FOE Alignment:**
- **Understanding** - Aggregates make consistency rules explicit
- **Confidence** - Invariants are enforced, not just hoped for
- **Fast Feedback** - Focused aggregates are easier to test

## Adaptations for Software Architecture

### Aggregate Design Guidelines

Keep aggregates small:
- One aggregate root
- Minimal related entities
- Reference other aggregates by ID

```typescript
// Good: Small aggregate with ID reference
class Order {
  id: OrderId;
  customerId: CustomerId;  // Reference by ID
  items: OrderItem[];      // Part of aggregate
  
  addItem(item: OrderItem) {
    // Business rules enforced here
  }
}

// Bad: Large aggregate with embedded objects
class Order {
  customer: Customer;  // Don't embed full object
  items: OrderItem[];
}
```

### Transaction Boundaries

One aggregate = one transaction:
- Never modify multiple aggregates in one transaction
- Use domain events for cross-aggregate consistency

## Questions We're Exploring

- How do you determine aggregate boundaries?
- When is eventual consistency acceptable?
- How do aggregates map to database tables?

## Supporting Evidence

