---
methodId: M117
displayed_sidebar: fieldGuideSidebar
sidebar_position: 10
title: Domain Service
pillar: tactical-design
description: Stateless operations that represent domain concepts not belonging to entities or value objects.
---

# Domain Service

**Pillar:** Tactical Design

A Domain Service is a stateless operation that represents a significant domain concept but doesn't naturally belong to an Entity or Value Object. Domain services encapsulate domain logic that operates across multiple aggregates or requires external information.

## Definition

> When a significant process or transformation in the domain is not a natural responsibility of an Entity or Value Object, add an operation to the model as a standalone interface declared as a Service. Define the interface in terms of the language of the model and make sure the operation name is part of the Ubiquitous Language.
>
> — Eric Evans, DDD Reference

## Why It Matters

Domain Services are essential because:

- **Capture cross-aggregate logic** - Some operations span multiple aggregates
- **Avoid bloated entities** - Not all behavior belongs on entities
- **Express domain concepts** - Services can represent domain processes
- **Maintain single responsibility** - Keep entities focused on their core purpose
- **Enable coordination** - Orchestrate complex domain operations

## Characteristics

| Characteristic | Description |
|----------------|-------------|
| **Stateless** | No instance state between calls |
| **Domain-focused** | Named in terms of the ubiquitous language |
| **Operation-centric** | Represents a domain operation, not a thing |
| **Interface-defined** | Defined by what it does, not how |

## When to Use Domain Services

Use a domain service when:

- The operation involves multiple aggregates
- The operation doesn't naturally belong to any entity
- The operation requires information from outside the aggregate
- Placing the logic on an entity would create awkward dependencies

## Example: Transfer Funds

Transferring money between accounts involves two aggregates:

```typescript
// Domain Service
class FundsTransferService {
  transfer(
    from: Account,
    to: Account,
    amount: Money
  ): TransferResult {
    // Domain logic that spans aggregates
    if (!from.canWithdraw(amount)) {
      return TransferResult.insufficientFunds();
    }
    
    from.withdraw(amount);
    to.deposit(amount);
    
    return TransferResult.success(
      new TransferCompleted(from.id, to.id, amount)
    );
  }
}
```

This logic doesn't belong on either Account—it's a domain concept in its own right.

## Example: Pricing Calculation

Complex pricing that requires external data:

```typescript
class PricingService {
  constructor(
    private readonly discountPolicy: DiscountPolicy,
    private readonly taxCalculator: TaxCalculator
  ) {}

  calculatePrice(
    product: Product,
    customer: Customer,
    quantity: Quantity
  ): Money {
    const basePrice = product.priceFor(quantity);
    const discount = this.discountPolicy.calculateDiscount(
      customer, 
      product, 
      quantity
    );
    const discountedPrice = basePrice.subtract(discount);
    const tax = this.taxCalculator.calculate(
      discountedPrice, 
      customer.taxJurisdiction
    );
    
    return discountedPrice.add(tax);
  }
}
```

## Domain Service vs Application Service

| Aspect | Domain Service | Application Service |
|--------|----------------|---------------------|
| **Contains** | Domain logic | Use case orchestration |
| **Knows about** | Domain model | Application concerns |
| **Stateless** | Yes | Yes |
| **Example** | FundsTransferService | TransferFundsUseCase |

Domain services contain business rules; application services coordinate the use case.

## Common Mistakes

- **Anemic domain model** - Putting all logic in services instead of entities
- **Stateful services** - Domain services should be stateless
- **Technical naming** - Services should use ubiquitous language, not technical terms
- **Too many services** - First consider if logic belongs on an entity

## Signs You Need a Domain Service

- You're passing an entity to itself to perform an operation
- An operation requires multiple aggregates as input
- You're tempted to add a dependency to an entity that doesn't fit
- The operation is a recognized domain concept (transfer, allocation, matching)

## Relationship to Other Patterns

- **Entity** - Domain services operate on entities
- **Aggregate** - Services often coordinate across aggregates
- **Application Service** - Calls domain services as part of use cases
- **Repository** - Domain services may use repositories (injected)

## FOE Alignment

Domain Services support **Optimize for Understanding** by making implicit domain concepts explicit. When a significant domain operation exists as a named service using ubiquitous language, it's visible and understandable to both developers and domain experts. This explicitness improves code comprehension and ensures important business logic isn't hidden inside entities where it doesn't belong.
