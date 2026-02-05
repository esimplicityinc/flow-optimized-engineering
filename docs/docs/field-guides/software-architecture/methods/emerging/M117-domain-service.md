---
methodId: M117
displayed_sidebar: fieldGuideSidebar
sidebar_position: 10
title: "Domain Service"
sidebar_label: "Domain Service"
description: "Stateless operations representing domain concepts"
external_method:
  framework: domain-driven-design
  method: domain-service
  id: M117
foe_maturity: hypothesized
observations:
  - O118
---

import ExternalMethodHeader from '@site/src/components/ExternalMethodHeader';

# Domain Service

<ExternalMethodHeader />

## Why This Matters for Software Architecture

Domain Services capture domain operations that don't naturally belong to any single entity or value object. They prevent forcing behavior into awkward places.

**Architecture Benefits:**
- Captures cross-entity domain logic
- Keeps entities focused
- Stateless and easy to test
- Represents domain verbs, not just nouns

**FOE Alignment:**
- **Understanding** - Domain operations are explicit
- **Confidence** - Stateless services are predictable
- **Fast Feedback** - Pure functions are easy to test

## Adaptations for Software Architecture

### When to Use Domain Services

Use a domain service when:
- Operation involves multiple aggregates
- Operation doesn't belong to any single entity
- Operation is a significant domain concept

```typescript
// Domain Service: Transfer between accounts
class TransferService {
  transfer(
    from: Account,
    to: Account,
    amount: Money
  ): TransferResult {
    // Domain logic that doesn't belong to either Account
    if (!from.canWithdraw(amount)) {
      return TransferResult.insufficientFunds();
    }
    
    from.withdraw(amount);
    to.deposit(amount);
    
    return TransferResult.success();
  }
}
```

### Domain Service vs Application Service

| Aspect | Domain Service | Application Service |
|--------|---------------|---------------------|
| Contains | Business logic | Orchestration |
| Dependencies | Domain objects | Infrastructure |
| Transactions | No | Yes |
| Example | `TransferService` | `TransferUseCase` |

### Naming Conventions

Domain services are often verbs or actions:
- `TransferService`
- `PricingCalculator`
- `DiscountPolicy`
- `ShippingCostEstimator`

## Questions We're Exploring

- How do you decide between entity method and domain service?
- Should domain services be injected into entities?
- How do domain services interact with repositories?

## Supporting Evidence

