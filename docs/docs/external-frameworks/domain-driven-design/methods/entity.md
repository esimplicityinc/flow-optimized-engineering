---
displayed_sidebar: fieldGuideSidebar
sidebar_position: 6
title: Entity
pillar: tactical-design
description: Objects defined by their identity rather than their attributes.
---

# Entity

**Pillar:** Tactical Design

An Entity is a domain object that is defined by its identity rather than its attributes. Entities have continuity through time—they can change their attributes while remaining the same entity.

## Definition

> An object fundamentally defined not by its attributes, but by a thread of continuity and identity.
>
> — Eric Evans, DDD Reference

## Why It Matters

Entities are essential because:

- **Model real-world identity** - Many domain concepts have persistent identity (customers, orders, accounts)
- **Enable tracking over time** - The same entity can be referenced across transactions
- **Support business processes** - Workflows often track entities through state changes
- **Clarify equality semantics** - Two entities with the same attributes are not equal unless they have the same identity

## Characteristics

| Characteristic | Description |
|----------------|-------------|
| **Unique identity** | Has an identifier that distinguishes it from all other entities |
| **Mutable** | Attributes can change over time |
| **Equality by identity** | Two entities are equal if they have the same ID, regardless of attributes |
| **Lifecycle** | Has a lifecycle from creation to (possibly) deletion |

## Identity Strategies

| Strategy | Example | When to Use |
|----------|---------|-------------|
| **Natural key** | Social Security Number, ISBN | When domain provides unique identifier |
| **Surrogate key** | UUID, auto-increment ID | When no natural key exists |
| **Composite key** | (TenantId, OrderNumber) | Multi-tenant or partitioned systems |

## Example

```typescript
class Customer {
  private readonly id: CustomerId;
  private name: string;
  private email: Email;
  private status: CustomerStatus;

  constructor(id: CustomerId, name: string, email: Email) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.status = CustomerStatus.Active;
  }

  // Identity-based equality
  equals(other: Customer): boolean {
    return this.id.equals(other.id);
  }

  // Attributes can change, identity remains
  changeName(newName: string): void {
    this.name = newName;
  }
}
```

## Entity vs Value Object

| Aspect | Entity | Value Object |
|--------|--------|--------------|
| Identity | Has unique identity | No identity |
| Equality | By identity | By attributes |
| Mutability | Mutable | Immutable |
| Lifecycle | Tracked over time | Created and discarded |

## Common Mistakes

- **Identity crisis** - Not clearly defining what makes an entity unique
- **Over-using entities** - Making everything an entity when value objects would suffice
- **Mutable identity** - Allowing the identity to change
- **Ignoring lifecycle** - Not considering creation, modification, and deletion

## When to Use Entities

Use an entity when:
- The object must be tracked over time
- The object has a lifecycle with state changes
- Two objects with identical attributes should be distinguishable
- The domain explicitly identifies this concept (e.g., "Customer #12345")

Use a value object instead when:
- The object is defined entirely by its attributes
- Instances are interchangeable if attributes match
- Immutability is desirable

## Relationship to Other Patterns

- **Aggregate** - Entities are often aggregate roots
- **Value Object** - Entities often contain value objects as attributes
- **Repository** - Retrieves and persists entities
- **Factory** - Creates entities with valid initial state

## FOE Alignment

Entities support **Optimize for Understanding** by providing clear classification of domain objects. When developers understand that an object is an entity, they immediately know it has identity, can change over time, and should be compared by ID. This shared understanding reduces confusion and makes code intent clearer.
