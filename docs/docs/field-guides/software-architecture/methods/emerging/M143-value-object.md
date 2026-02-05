---
methodId: M143
displayed_sidebar: fieldGuideSidebar
sidebar_position: 8
title: "Value Object"
sidebar_label: "Value Object"
description: "Immutable objects defined by their attributes"
external_method:
  framework: domain-driven-design
  method: value-object
  id: M143
foe_maturity: hypothesized
observations: []
---

import ExternalMethodHeader from '@site/src/components/ExternalMethodHeader';

# Value Object

<ExternalMethodHeader />

## Why This Matters for Software Architecture

Value Objects replace primitive obsession with meaningful domain concepts. They're immutable, self-validating, and make code more expressive and type-safe.

**Architecture Benefits:**
- Eliminates primitive obsession
- Self-validating (invalid states unrepresentable)
- Immutable (thread-safe, predictable)
- Improves code expressiveness

**FOE Alignment:**
- **Understanding** - Domain concepts explicit in code
- **Confidence** - Invalid states caught at construction
- **Fast Feedback** - Type system catches errors at compile time

## Adaptations for Software Architecture

### Value Object Pattern

```typescript
// Bad: Primitive obsession
function createOrder(
  customerId: string,      // What format?
  email: string,           // Is it validated?
  amount: number,          // In what currency?
  currency: string         // Is it valid?
) { ... }

// Good: Value Objects
class CustomerId {
  constructor(private value: string) {
    if (!value.match(/^CUS-\d{6}$/)) {
      throw new Error('Invalid customer ID');
    }
  }
}

class Email {
  constructor(private value: string) {
    if (!this.isValid(value)) {
      throw new Error('Invalid email');
    }
  }
}

class Money {
  constructor(
    private amount: number,
    private currency: Currency
  ) {
    if (amount < 0) throw new Error('Negative amount');
  }
  
  add(other: Money): Money {
    if (this.currency !== other.currency) {
      throw new Error('Currency mismatch');
    }
    return new Money(this.amount + other.amount, this.currency);
  }
}

function createOrder(
  customerId: CustomerId,
  email: Email,
  total: Money
) { ... }
```

### When to Use Value Objects

- IDs (CustomerId, OrderId)
- Measurements (Money, Weight, Distance)
- Ranges (DateRange, PriceRange)
- Compound values (Address, Coordinates)

## Questions We're Exploring

- Where do you draw the line between primitives and value objects?
- How do value objects serialize/deserialize?
- Performance implications of immutability?

## Supporting Evidence

