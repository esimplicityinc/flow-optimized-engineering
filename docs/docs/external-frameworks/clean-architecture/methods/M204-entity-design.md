---
methodId: M204
displayed_sidebar: fieldGuideSidebar
sidebar_position: 5
title: Entity Design
pillar: layer-organization
description: Design enterprise-wide business objects that encapsulate critical business rules and data, independent of databases and frameworks.
---

# Entity Design

**Pillar:** Layer Organization

Entities are enterprise-wide business objects that encapsulate critical business rules and data. They represent the most abstract and stable layer of Clean Architecture, containing the high-level rules that would exist even if the application didn't.

## Definition

> An entity is an object that embodies a small set of critical business rules operating on Critical Business Data. An entity either embodies a set of business rules or knows a set of business rules that control how it behaves.
>
> — Robert C. Martin, Clean Architecture

## Why It Matters

Well-designed entities provide:

- **Business rule encapsulation** - Rules live with the data they govern
- **Independence** - No dependencies on databases, frameworks, or external services
- **Reusability** - Can be shared across multiple applications in the enterprise
- **Testability** - Pure business logic can be tested without infrastructure
- **Integrity** - Invariants are enforced at the domain level

## Characteristics of Good Entities

### 1. Rich Behavior

Entities should have methods that implement business rules, not just data accessors:

```typescript
// GOOD: Rich entity with behavior
class Order {
  private items: OrderItem[] = [];
  private status: OrderStatus = OrderStatus.PENDING;
  private total: Money = Money.zero();
  
  addItem(product: Product, quantity: number): void {
    this.assertCanBeModified();
    
    if (quantity <= 0) {
      throw new DomainError('Quantity must be positive');
    }
    
    if (quantity > 100) {
      throw new DomainError('Maximum quantity per item is 100');
    }
    
    const item = new OrderItem(product, quantity);
    this.items.push(item);
    this.recalculateTotal();
    
    this.recordEvent(new ItemAddedEvent(this.id, product.id, quantity));
  }
  
  removeItem(productId: ProductId): void {
    this.assertCanBeModified();
    
    const index = this.items.findIndex(item => item.productId.equals(productId));
    if (index === -1) {
      throw new DomainError('Item not found in order');
    }
    
    this.items.splice(index, 1);
    this.recalculateTotal();
    
    this.recordEvent(new ItemRemovedEvent(this.id, productId));
  }
  
  submit(): void {
    if (this.items.length === 0) {
      throw new DomainError('Cannot submit empty order');
    }
    
    if (this.total.isGreaterThan(Money.of(50000))) {
      throw new DomainError('Order exceeds maximum value');
    }
    
    this.status = OrderStatus.SUBMITTED;
    this.submittedAt = new Date();
    
    this.recordEvent(new OrderSubmittedEvent(this.id, this.total));
  }
  
  private assertCanBeModified(): void {
    if (this.status !== OrderStatus.PENDING) {
      throw new DomainError(`Cannot modify order in ${this.status} status`);
    }
  }
  
  private recalculateTotal(): void {
    this.total = this.items.reduce(
      (sum, item) => sum.add(item.getSubtotal()),
      Money.zero()
    );
  }
}
```

### 2. Identity-Based Equality

Entities are defined by their identity, not their attributes:

```typescript
abstract class Entity<TId> {
  protected constructor(public readonly id: TId) {}
  
  equals(other: Entity<TId>): boolean {
    if (!(other instanceof this.constructor)) {
      return false;
    }
    return this.id.equals(other.id);
  }
  
  hashCode(): number {
    return this.id.hashCode();
  }
}

class OrderId extends ValueObject {
  private constructor(private readonly value: string) {
    super();
  }
  
  static create(value: string): OrderId {
    if (!value || value.length !== 36) {
      throw new DomainError('Invalid order ID');
    }
    return new OrderId(value);
  }
  
  equals(other: OrderId): boolean {
    return this.value === other.value;
  }
  
  hashCode(): number {
    // Hash implementation
    return hashString(this.value);
  }
  
  toString(): string {
    return this.value;
  }
}
```

### 3. Invariant Enforcement

Entities must protect their invariants (rules that must always be true):

```typescript
class BankAccount extends Entity<AccountId> {
  private balance: Money;
  private status: AccountStatus;
  private dailyWithdrawalTotal: Money = Money.zero();
  private lastWithdrawalDate: Date | null = null;
  
  constructor(
    id: AccountId,
    private customerId: CustomerId,
    initialBalance: Money
  ) {
    super(id);
    
    // Invariant: Balance cannot be negative on creation
    if (initialBalance.isNegative()) {
      throw new DomainError('Initial balance cannot be negative');
    }
    
    this.balance = initialBalance;
    this.status = AccountStatus.ACTIVE;
  }
  
  withdraw(amount: Money): void {
    // Invariant: Account must be active
    if (this.status !== AccountStatus.ACTIVE) {
      throw new DomainError('Account is not active');
    }
    
    // Invariant: Cannot overdraw
    if (amount.isGreaterThan(this.balance)) {
      throw new InsufficientFundsError(this.balance, amount);
    }
    
    // Invariant: Daily withdrawal limit
    this.resetDailyTotalIfNeeded();
    const dailyLimit = Money.of(1000);
    if (amount.add(this.dailyWithdrawalTotal).isGreaterThan(dailyLimit)) {
      throw new DailyLimitExceededError();
    }
    
    this.balance = this.balance.subtract(amount);
    this.dailyWithdrawalTotal = this.dailyWithdrawalTotal.add(amount);
    this.lastWithdrawalDate = new Date();
    
    this.recordEvent(new WithdrawalEvent(this.id, amount, this.balance));
  }
  
  private resetDailyTotalIfNeeded(): void {
    const today = new Date();
    if (this.lastWithdrawalDate && !isSameDay(today, this.lastWithdrawalDate)) {
      this.dailyWithdrawalTotal = Money.zero();
    }
  }
  
  // Invariant: Balance is always accessible but protected
  getBalance(): Money {
    return this.balance;
  }
}
```

### 4. Domain Events

Entities should record significant state changes as domain events:

```typescript
abstract class AggregateRoot<TId> extends Entity<TId> {
  private domainEvents: DomainEvent[] = [];
  
  protected recordEvent(event: DomainEvent): void {
    this.domainEvents.push(event);
  }
  
  getDomainEvents(): DomainEvent[] {
    return [...this.domainEvents];
  }
  
  clearDomainEvents(): void {
    this.domainEvents = [];
  }
}

class Order extends AggregateRoot<OrderId> {
  // ...
  
  cancel(reason: string): void {
    if (this.status === OrderStatus.SHIPPED) {
      throw new DomainError('Cannot cancel shipped order');
    }
    
    if (this.status === OrderStatus.CANCELLED) {
      throw new DomainError('Order is already cancelled');
    }
    
    this.status = OrderStatus.CANCELLED;
    this.cancellationReason = reason;
    this.cancelledAt = new Date();
    
    // Record significant business event
    this.recordEvent(new OrderCancelledEvent(
      this.id,
      reason,
      this.total
    ));
  }
}
```

## Entity vs Value Object

| Aspect | Entity | Value Object |
|--------|--------|--------------|
| **Identity** | Has unique identity | No identity, defined by attributes |
| **Equality** | Based on ID | Based on all attributes |
| **Mutability** | Can change state | Should be immutable |
| **Lifecycle** | Long-lived, tracked | Created as needed, discarded |
| **Example** | `Order`, `Customer`, `Product` | `Money`, `Address`, `DateRange` |

## Common Mistakes

### ❌ Anemic Domain Model

```typescript
// WRONG: Entity is just data with no behavior
class Order {
  id: string;
  customerId: string;
  items: OrderItem[];
  status: string;
  // No methods - just data!
}

// Business logic scattered in services
class OrderService {
  calculateTotal(order: Order): number {
    return order.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }
  
  canCancel(order: Order): boolean {
    return order.status !== 'SHIPPED';
  }
}
```

### ❌ Framework Dependencies

```typescript
// WRONG: Entity depends on ORM
@Entity() // ❌ JPA decorator
@Table('orders')
class Order {
  @Column() // ❌ ORM concern
  @PrimaryKey() // ❌ Database concern
  id: string;
  
  @OneToMany(() => OrderItem) // ❌ Database relationship
  items: OrderItem[];
}
```

### ❌ Direct Database Access

```typescript
// WRONG: Entity accesses database
class Order {
  async save(): Promise<void> {
    await database.query('INSERT INTO orders ...'); // ❌ Infrastructure in entity
  }
}
```

### ❌ Public Setters

```typescript
// WRONG: Exposing internal state
class Order {
  public status: OrderStatus; // ❌ Can be changed from anywhere
  public items: OrderItem[]; // ❌ Can be modified directly
}

// Any code can do this:
order.status = OrderStatus.SHIPPED; // Bypasses business rules!
order.items = []; // Corrupts order state!
```

## FOE Alignment

Entity Design supports FOE principles:

- **Understanding** - Rich entities make business rules explicit and discoverable; code reflects the domain language
- **Confidence** - Invariants prevent invalid states; entities protect their own integrity
- **Fast Feedback** - Pure domain logic can be unit tested instantly without databases or services

## Related Methods

- [M201-layer-organization](/docs/external-frameworks/clean-architecture/methods/M201-layer-organization) - Entities as the innermost layer
- [M205-use-case-implementation](/docs/external-frameworks/clean-architecture/methods/M205-use-case-implementation) - Orchestrating entities
- [M143-value-object](/docs/external-frameworks/domain-driven-design/methods/M143-value-object) - Distinguishing entities from value objects

## References

- Martin, R. C. (2017). *Clean Architecture: A Craftsman's Guide to Software Structure and Design*. Prentice Hall.
- Evans, E. (2003). *Domain-Driven Design: Tackling Complexity in the Heart of Software*. Addison-Wesley.
