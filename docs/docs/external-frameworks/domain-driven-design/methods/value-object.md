---
displayed_sidebar: fieldGuideSidebar
sidebar_position: 7
title: Value Object
pillar: tactical-design
description: Objects defined by their attributes, with no conceptual identity.
---

# Value Object

**Pillar:** Tactical Design

A Value Object is a domain object that is defined entirely by its attributes. Value objects have no conceptual identity—two value objects with the same attributes are considered equal and interchangeable.

## Definition

> An object that describes some characteristic or attribute but carries no concept of identity.
>
> — Eric Evans, DDD Reference

## Why It Matters

Value Objects are essential because:

- **Eliminate bugs** - Immutability prevents accidental modification
- **Simplify reasoning** - No need to track identity or worry about aliasing
- **Enable optimization** - Can be freely shared, cached, or copied
- **Express domain concepts** - Many domain concepts are naturally values (money, dates, addresses)
- **Reduce primitive obsession** - Replace primitive types with meaningful domain types

## Characteristics

| Characteristic | Description |
|----------------|-------------|
| **No identity** | Not distinguished by an identifier |
| **Immutable** | Cannot be changed after creation |
| **Equality by attributes** | Two value objects are equal if all attributes are equal |
| **Self-validating** | Invalid value objects cannot be created |
| **Side-effect free** | Operations return new instances |

## Example

```typescript
class Money {
  private readonly amount: number;
  private readonly currency: Currency;

  constructor(amount: number, currency: Currency) {
    if (amount < 0) {
      throw new Error("Amount cannot be negative");
    }
    this.amount = amount;
    this.currency = currency;
  }

  // Attribute-based equality
  equals(other: Money): boolean {
    return this.amount === other.amount && 
           this.currency.equals(other.currency);
  }

  // Returns new instance, doesn't modify
  add(other: Money): Money {
    if (!this.currency.equals(other.currency)) {
      throw new Error("Cannot add different currencies");
    }
    return new Money(this.amount + other.amount, this.currency);
  }
}
```

## Common Value Objects

| Domain | Value Objects |
|--------|---------------|
| **E-commerce** | Money, Address, SKU, Quantity |
| **Healthcare** | BloodPressure, Dosage, DateRange |
| **Finance** | AccountNumber, IBAN, ExchangeRate |
| **General** | Email, PhoneNumber, DateRange, Coordinates |

## Value Object vs Primitive

**Primitive obsession (avoid):**
```typescript
function createOrder(
  customerId: string,
  amount: number,
  currency: string,
  email: string
) { ... }
```

**Value objects (prefer):**
```typescript
function createOrder(
  customerId: CustomerId,
  price: Money,
  email: Email
) { ... }
```

Value objects provide:
- Type safety (can't pass email where money is expected)
- Validation (invalid values can't be created)
- Domain behavior (money can be added, emails can be validated)

## Implementation Guidelines

1. **Make all fields readonly/final** - Enforce immutability at the language level
2. **Validate in constructor** - Reject invalid states at creation time
3. **Implement equality** - Override equals/hashCode based on attributes
4. **Return new instances** - Operations that "modify" should return new objects
5. **Consider making them records/data classes** - Many languages have built-in support

## Common Mistakes

- **Mutable value objects** - Defeats the purpose and introduces bugs
- **Value objects with identity** - If it has an ID, it's probably an entity
- **Skipping validation** - Value objects should be self-validating
- **Too many fields** - Large value objects may indicate a missing entity

## Relationship to Other Patterns

- **Entity** - Entities often contain value objects as attributes
- **Aggregate** - Value objects are often part of aggregates
- **Factory** - Can create complex value objects
- **Domain Event** - Events often carry value objects as payload

## FOE Alignment

Value Objects strongly support **Confidence to Act**. Immutability eliminates entire categories of bugs—you can pass a value object to any function knowing it won't be modified. Self-validation ensures that if a value object exists, it's valid. These guarantees let developers make changes with confidence, knowing the type system is protecting them from common errors.
