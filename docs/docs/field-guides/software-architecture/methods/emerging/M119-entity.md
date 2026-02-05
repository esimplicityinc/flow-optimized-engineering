---
methodId: M119
displayed_sidebar: fieldGuideSidebar
sidebar_position: 9
title: "Entity"
sidebar_label: "Entity"
description: "Objects defined by identity rather than attributes"
external_method:
  framework: domain-driven-design
  method: entity
  id: M119
foe_maturity: hypothesized
observations: []
---

import ExternalMethodHeader from '@site/src/components/ExternalMethodHeader';

# Entity

<ExternalMethodHeader />

## Why This Matters for Software Architecture

Entities have identity that persists across time and state changes. Understanding the difference between entities and value objects is fundamental to domain modeling.

**Architecture Benefits:**
- Clear identity semantics
- State changes tracked over time
- Natural mapping to database records
- Distinguishes mutable from immutable concepts

**FOE Alignment:**
- **Understanding** - Identity vs value distinction is explicit
- **Confidence** - Equality semantics are clear
- **Fast Feedback** - Type system enforces correct comparisons

## Adaptations for Software Architecture

### Entity vs Value Object

| Aspect | Entity | Value Object |
|--------|--------|--------------|
| Identity | Has unique ID | Defined by attributes |
| Equality | Same ID = same entity | Same attributes = equal |
| Mutability | Can change over time | Immutable |
| Lifecycle | Created, modified, deleted | Created, replaced |

### Entity Pattern

```typescript
class Customer {
  readonly id: CustomerId;  // Identity never changes
  private name: string;     // Can change
  private email: Email;     // Can change
  
  constructor(id: CustomerId, name: string, email: Email) {
    this.id = id;
    this.name = name;
    this.email = email;
  }
  
  // Equality based on identity
  equals(other: Customer): boolean {
    return this.id.equals(other.id);
  }
  
  // State can change
  updateEmail(newEmail: Email): void {
    this.email = newEmail;
  }
}

// Same ID = same customer, even if attributes differ
const customer1 = new Customer(id, "Alice", email1);
const customer2 = new Customer(id, "Alice Updated", email2);
customer1.equals(customer2);  // true - same identity
```

### Database Mapping

- Entity ID → Primary key
- Entity → Table row
- Entity lifecycle → CRUD operations

## Questions We're Exploring

- When should something be an entity vs value object?
- How do you generate unique IDs?
- How do entities relate to aggregates?

## Supporting Evidence

