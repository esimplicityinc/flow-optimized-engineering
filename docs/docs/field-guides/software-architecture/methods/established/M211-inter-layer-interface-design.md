---
methodId: M211
displayed_sidebar: fieldGuideSidebar
sidebar_position: 3
title: "Inter-Layer Interface Design"
sidebar_label: "Inter-Layer Interface Design"
description: "Defining contracts between layers"
external_method:
  framework: layered-architecture
  method: inter-layer-interface-design
  id: M211
foe_maturity: validated
observations: []
---

import ExternalMethodHeader from '@site/src/components/ExternalMethodHeader';
import RelatedObservations from '@site/src/components/RelatedObservations';

# Inter-Layer Interface Design

<ExternalMethodHeader />

## Why This Matters for Software Architecture

Interfaces between layers are contracts that define how components communicate. Well-designed interfaces hide implementation details, enable testing, and allow layers to evolve independently. Poorly designed interfaces create tight coupling that defeats the purpose of layering.

**Architecture Benefits:**
- Clear contracts between layers
- Ability to mock interfaces for testing
- Implementation flexibility within layers
- Team independence (layer owners can change internals freely)

**FOE Alignment:**
- **Understanding** - Interfaces document layer boundaries
- **Confidence** - Changes within a layer don't break contracts
- **Fast Feedback** - Interface-driven testing is fast and focused

## Definition

> Inter-layer interfaces should be designed from the perspective of the calling layer, expressing what it needs rather than what the providing layer has. Interfaces should be stable, coarse-grained, and expressive of domain concepts rather than implementation details.
>
> — Based on Interface Segregation Principle and POSA1 patterns

## Principles of Interface Design

### 1. Design from Consumer Perspective
The interface should express what the caller needs:

```java
// WRONG: Repository exposes implementation details
public interface OrderRepository {
    ResultSet executeQuery(String sql);  // Leaks SQL!
    void flush();  // JPA-specific
}

// CORRECT: Expresses domain needs
public interface OrderRepository {
    Order save(Order order);
    Optional<Order> findById(OrderId id);
    List<Order> findByCustomer(CustomerId customerId);
    List<Order> findPendingOrders(LocalDate before);
}
```

### 2. Use Domain Language
Interfaces should speak the domain's ubiquitous language:

```java
// CORRECT: Domain terminology
public interface PricingService {
    Price calculateTotal(Order order, DiscountCode discount);
    boolean isEligibleForDiscount(Customer customer, Product product);
}

// WRONG: Technical language
public interface PricingService {
    BigDecimal computeAmount(List<LineItem> items, String promoCode);
    boolean checkEligibility(String customerId, String sku);
}
```

### 3. Be Intention-Revealing
Method names should express intent, not mechanism:

```java
// CORRECT: Intention-revealing
orderRepository.findRecentOrdersByCustomer(customerId, Duration.ofDays(30));

// WRONG: Mechanism-revealing  
orderRepository.executeQuery(
    "SELECT * FROM orders WHERE customer_id = ? AND created_at > ?"
);
```

## Interface Patterns by Layer

### Presentation → Application Layer
**Pattern:** Command/Query objects, DTOs

```java
// Request DTO
public record CreateOrderRequest(
    CustomerId customerId,
    List<OrderLineRequest> lines,
    Optional<DiscountCode> discountCode
) {}

// Application service interface
public interface OrderApplicationService {
    OrderResult createOrder(CreateOrderRequest request);
    OrderDTO getOrder(OrderId id);
    List<OrderSummary> listCustomerOrders(CustomerId customerId);
}
```

**Key Characteristics:**
- Input validation happens in presentation layer
- Application services are coarse-grained (use case level)
- Return DTOs, not domain entities (to prevent lazy loading issues)

### Application → Domain Layer
**Pattern:** Domain Services, Repository interfaces

```java
// Domain Service interface
public interface OrderFulfillmentService {
    void fulfillOrder(Order order, Warehouse warehouse);
}

// Repository interface (defined in domain)
public interface OrderRepository {
    Order save(Order order);
    Optional<Order> findById(OrderId id);
}
```

**Key Characteristics:**
- Interfaces defined in domain layer
- Express domain operations, not technical ones
- Return full domain aggregates

### Application → Infrastructure Layer
**Pattern:** Gateway, Client interfaces

```java
// Payment gateway interface (defined in application)
public interface PaymentGateway {
    PaymentResult process(Payment payment);
    PaymentStatus checkStatus(TransactionId transactionId);
    void refund(TransactionId transactionId, Money amount);
}

// Email service interface
public interface EmailService {
    void sendOrderConfirmation(CustomerEmail email, OrderConfirmation details);
}
```

**Key Characteristics:**
- Interfaces defined in application layer
- Abstract external concerns
- Handle failures gracefully (timeouts, retries)

## Interface Granularity

### Coarse-Grained vs Fine-Grained

**Coarse-Grained (Preferred for inter-layer):**
```java
// One call does the work
OrderResult result = orderService.createOrder(request);
```

**Fine-Grained (Chatty, avoid across layers):**
```java
// Multiple calls = network overhead, transactional issues
orderRepository.save(order);
for (Item item : items) {
    itemRepository.save(item);
}
paymentRepository.save(payment);
```

### The Unit of Work Pattern
When multiple operations must succeed or fail together:

```java
// Application service encapsulates transaction
@Service
public class OrderService {
    @Transactional
    public OrderResult createOrder(CreateOrderRequest request) {
        Order order = new Order(request);
        orderRepository.save(order);
        
        Payment payment = paymentGateway.process(order.getPayment());
        if (!payment.isSuccessful()) {
            throw new PaymentFailedException();
        }
        
        emailService.sendOrderConfirmation(order);
        return new OrderResult(order);
    }
}
```

## Data Transfer Objects (DTOs)

### Between Presentation and Application
```java
// Request DTO with validation
public record CreateOrderRequest(
    @NotNull CustomerId customerId,
    @NotEmpty List<@Valid OrderLineRequest> lines,
    @Pattern(regexp = "\\w{10}") Optional<String> discountCode
) {}

// Response DTO shaping data for client
public record OrderDTO(
    OrderId id,
    CustomerSummary customer,
    List<OrderLineDTO> lines,
    Money total,
    OrderStatus status,
    Instant createdAt
) {}
```

### Between Application and Infrastructure
```java
// Gateway request/response objects
public record PaymentRequest(
    Money amount,
    CardDetails card,
    String description
) {}

public record PaymentResult(
    TransactionId transactionId,
    PaymentStatus status,
    Optional<String> authorizationCode
) {}
```

## Interface Stability

### Stable Interfaces
Focus on stable concepts, not volatile details:

```java
// Stable: Payment concept won't change
public interface PaymentGateway {
    PaymentResult process(Payment payment);
}

// Volatile: Specific provider details change
public interface StripeClient {
    StripeCharge createCharge(StripeChargeRequest request);
}
```

### Versioning
When interfaces must change:

```java
// Option 1: Add new method, deprecate old
public interface OrderRepository {
    @Deprecated
    List<Order> findByCustomer(CustomerId customerId);
    
    // New method with pagination
    Page<Order> findByCustomer(CustomerId customerId, PageRequest page);
}

// Option 2: Create new interface version
public interface OrderRepositoryV2 {
    Page<Order> findByCustomer(CustomerId customerId, PageRequest page);
}
```

## Common Mistakes

### Leaky Abstractions
```java
// WRONG: Interface exposes Hibernate
public interface OrderRepository {
    Order getOne(Long id);  // Hibernate-specific proxy
    List<Order> findAll(Specification spec);  // JPA Specification
}

// CORRECT: Pure domain interface
public interface OrderRepository {
    Optional<Order> findById(OrderId id);
    List<Order> findByStatus(OrderStatus status);
}
```

### God Interfaces
```java
// WRONG: Everything in one interface
public interface OrderService {
    Order createOrder(...);
    Order updateOrder(...);
    void deleteOrder(...);
    List<Order> searchOrders(...);
    void cancelOrder(...);
    void refundOrder(...);
    void shipOrder(...);
    List<Shipment> getShipments(...);
    // 50 more methods...
}

// CORRECT: Segregated by use case
public interface OrderCreationService { ... }
public interface OrderQueryService { ... }
public interface OrderFulfillmentService { ... }
```

### Data Exposure
```java
// WRONG: Returning entities with lazy loading
public interface OrderService {
    Order getOrder(Long id);  // Client might trigger N+1 queries
}

// CORRECT: Eagerly loaded DTO
public interface OrderService {
    OrderDTO getOrder(OrderId id);  // All data loaded, no proxies
}
```

## When to Use / When Not to Use

### Use Formal Interfaces When:
- Multiple implementations expected (testing, different providers)
- Layer boundaries are clear team boundaries
- Need to enforce architectural constraints
- Building libraries or frameworks

### May Skip Interfaces When:
- Simple CRUD with single implementation
- Rapid prototyping
- Internal classes with clear single usage
- Strongly-typed languages with good refactoring tools

## FOE Alignment

This method supports **Optimize for Understanding** by:
- Making layer contracts explicit
- Using domain language in interfaces
- Documenting what each layer provides

It supports **Fast Feedback Loops** through:
- Interface-based mocking for tests
- Clear contracts that catch integration issues early

It supports **Confidence Through Evidence** by:
- Enabling testing against contracts
- Supporting contract testing between teams

## References

- Martin, R. C. (2002). *Agile Software Development: Principles, Patterns, and Practices*. Prentice Hall.
- Fowler, M. (2002). *Patterns of Enterprise Application Architecture*. Addison-Wesley.
- Evans, E. (2003). *Domain-Driven Design*. Addison-Wesley.

## Supporting Evidence

<RelatedObservations />
