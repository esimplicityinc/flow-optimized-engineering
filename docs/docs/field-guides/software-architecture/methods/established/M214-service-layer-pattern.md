---
methodId: M214
displayed_sidebar: fieldGuideSidebar
sidebar_position: 6
title: "Service Layer Pattern"
sidebar_label: "Service Layer Pattern"
description: "Orchestrating business logic operations"
external_method:
  framework: layered-architecture
  method: service-layer-pattern
  id: M214
foe_maturity: validated
observations: []
---

import ExternalMethodHeader from '@site/src/components/ExternalMethodHeader';
import RelatedObservations from '@site/src/components/RelatedObservations';

# Service Layer Pattern

<ExternalMethodHeader />

## Why This Matters for Software Architecture

Business operations often span multiple domain objects, repositories, and external services. Putting this orchestration in controllers creates bloated, untestable code. Putting it in entities violates single responsibility. The Service Layer provides a clean boundary for use case orchestration, coordinating domain objects to fulfill application operations.

**Architecture Benefits:**
- Clear boundary for use case orchestration
- Controllers remain thin (HTTP concerns only)
- Domain entities focus on business logic, not coordination
- Operations are reusable across UIs (web, mobile, CLI)
- Transaction boundaries are explicit

**FOE Alignment:**
- **Understanding** - Each service represents a clear use case
- **Confidence** - Service methods are cohesive and testable units
- **Fast Feedback** - Service logic can be unit tested in isolation

## Definition

> A Service Layer defines an application's boundary and its set of available operations from the perspective of the interfacing client layers. It encapsulates the application's business logic, transaction control, and coordination of responses in the implementation of its operations.
>
> — Fowler, Patterns of Enterprise Application Architecture (2002)

## Types of Services

### Application Services
Orchestrate use cases, coordinate domain objects:

```java
@Service
@RequiredArgsConstructor
public class OrderApplicationService {
    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;
    private final PaymentGateway paymentGateway;
    private final EventPublisher eventPublisher;
    
    @Transactional
    public OrderResult createOrder(CreateOrderCommand command) {
        // 1. Load supporting data
        List<Product> products = productRepository
            .findAllById(command.productIds());
        
        // 2. Create domain aggregate
        Order order = new Order(command.customerId());
        
        // 3. Apply domain logic
        for (Product product : products) {
            order.addItem(product, command.quantityFor(product));
        }
        
        order.calculateTotal();
        
        // 4. Coordinate external services
        PaymentResult payment = paymentGateway.process(
            new Payment(order.getTotal(), command.paymentMethod())
        );
        
        if (!payment.isSuccessful()) {
            throw new PaymentFailedException(payment.getError());
        }
        
        order.confirm();
        
        // 5. Persist changes
        Order savedOrder = orderRepository.save(order);
        
        // 6. Publish events
        eventPublisher.publish(new OrderCreatedEvent(savedOrder));
        
        // 7. Return result
        return OrderResult.from(savedOrder);
    }
}
```

**Characteristics:**
- No business logic (just orchestration)
- Transaction boundaries
- Coordinate multiple domain objects
- Handle external service calls
- Publish domain events

### Domain Services
Encapsulate domain logic that doesn't fit in entities:

```java
// Domain Service - pure business logic
public class PricingService {
    
    public Money calculateOrderTotal(Order order, DiscountPolicy discount) {
        Money subtotal = order.getLines().stream()
            .map(line -> line.getProduct().getPrice()
                           .multiply(line.getQuantity()))
            .reduce(Money.ZERO, Money::add);
        
        Money discountAmount = discount.calculateDiscount(subtotal);
        
        return subtotal.subtract(discountAmount)
                       .add(order.getShippingCost());
    }
    
    public boolean isEligibleForDiscount(Customer customer, Order order) {
        return customer.isPremium() && 
               order.getTotal().isGreaterThan(Money.of(100));
    }
}
```

**Characteristics:**
- Stateless business logic
- Operations involving multiple aggregates
- Domain concepts without natural entity home
- Pure domain, no infrastructure concerns

### Infrastructure Services
Abstract technical concerns:

```java
// Infrastructure Service
@Service
public class SmtpEmailService implements EmailService {
    private final JavaMailSender mailSender;
    private final TemplateEngine templateEngine;
    
    @Override
    public void sendOrderConfirmation(Order order, Customer customer) {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);
        
        helper.setTo(customer.getEmail());
        helper.setSubject("Order Confirmation: " + order.getId());
        helper.setText(buildConfirmationEmail(order), true);
        
        mailSender.send(message);
    }
}
```

**Characteristics:**
- Technical implementations
- Interface defined in domain/application
- Implementation in infrastructure
- Examples: EmailService, NotificationService, FileStorageService

## Service Design Principles

### 1. Single Responsibility per Method
Each method implements one use case:

```java
// CORRECT: One use case per method
@Service
public class OrderService {
    public OrderResult createOrder(CreateOrderCommand cmd) { ... }
    public void cancelOrder(CancelOrderCommand cmd) { ... }
    public void shipOrder(ShipOrderCommand cmd) { ... }
    public OrderDTO getOrder(OrderId id) { ... }
    public List<OrderSummary> listCustomerOrders(CustomerId id) { ... }
}
```

### 2. Command vs Query Separation
Separate read and write operations:

```java
// Commands - modify state
@Service
public class OrderCommandService {
    @Transactional
    public OrderId createOrder(CreateOrderCommand command) { ... }
    
    @Transactional
    public void cancelOrder(CancelOrderCommand command) { ... }
}

// Queries - read-only, optimized
@Service
public class OrderQueryService {
    @Transactional(readOnly = true)
    public OrderDTO getOrder(OrderId id) { ... }
    
    @Transactional(readOnly = true)
    public List<OrderSummary> searchOrders(OrderSearchCriteria criteria) { ... }
}
```

### 3. Explicit Transaction Boundaries
```java
@Service
public class OrderService {
    
    @Transactional  // Atomic operation
    public void transferFunds(AccountId from, AccountId to, Money amount) {
        Account source = accountRepository.findById(from);
        Account target = accountRepository.findById(to);
        
        source.debit(amount);
        target.credit(amount);
        
        accountRepository.save(source);
        accountRepository.save(target);
        // Both succeed or both fail
    }
}
```

## Service Coordination Patterns

### Saga Pattern
Long-running transactions across services:

```java
@Service
public class OrderSaga {
    private final OrderRepository orderRepository;
    private final InventoryService inventoryService;
    private final PaymentService paymentService;
    private final ShippingService shippingService;
    
    @Transactional
    public void processOrder(OrderId orderId) {
        Order order = orderRepository.findById(orderId);
        
        try {
            // Step 1: Reserve inventory
            inventoryService.reserveItems(order.getItems());
            
            // Step 2: Process payment
            paymentService.charge(order.getTotal(), order.getPaymentMethod());
            
            // Step 3: Create shipment
            Shipment shipment = shippingService.createShipment(order);
            
            order.complete(shipment.getTrackingNumber());
            
        } catch (Exception e) {
            // Compensating transactions
            inventoryService.releaseReservation(order.getItems());
            paymentService.refund(order.getTotal(), order.getPaymentMethod());
            order.fail(e.getMessage());
            throw e;
        }
        
        orderRepository.save(order);
    }
}
```

### Workflow Service
Complex multi-step processes:

```java
@Service
public class OrderFulfillmentWorkflow {
    
    public FulfillmentResult fulfill(Order order) {
        Workflow workflow = Workflow.start(order);
        
        // Step 1: Validate
        workflow.addStep("VALIDATE", () -> validateOrder(order));
        
        // Step 2: Check inventory
        workflow.addStep("CHECK_INVENTORY", () -> checkInventory(order));
        
        // Step 3: Process payment (async, may wait)
        workflow.addAsyncStep("PAYMENT", () -> processPayment(order));
        
        // Step 4: Pick and pack
        workflow.addStep("FULFILL", () -> createFulfillment(order));
        
        // Step 5: Ship
        workflow.addStep("SHIP", () -> createShipment(order));
        
        return workflow.execute();
    }
}
```

## Service Layer Anti-Patterns

### Anemic Service (Over-Delegation)
```java
// WRONG: Service just passes through
@Service
public class OrderService {
    private final OrderRepository repo;
    
    public Order findById(Long id) {  // Just delegation
        return repo.findById(id).orElse(null);
    }
    
    public Order save(Order order) {  // Just delegation
        return repo.save(order);
    }
}
```

**Solution:** Services orchestrate, repositories persist:
```java
// CORRECT: Service coordinates use case
@Service
public class OrderService {
    public OrderResult processOrder(CreateOrderCommand cmd) {
        Order order = new Order(cmd);
        
        // Business rules
        if (!order.isValid()) {
            throw new InvalidOrderException();
        }
        
        // Coordination
        PaymentResult payment = paymentGateway.process(order.getPayment());
        if (payment.isSuccessful()) {
            order.confirm();
        }
        
        return OrderResult.from(orderRepository.save(order));
    }
}
```

### God Service
```java
// WRONG: One service for everything
@Service
public class OrderService {
    // 100+ methods
    public Order createOrder(...) { ... }
    public void cancelOrder(...) { ... }
    public void refundOrder(...) { ... }
    public void shipOrder(...) { ... }
    public void returnOrder(...) { ... }
    public void exchangeOrder(...) { ... }
    public List<Order> searchOrders(...) { ... }
    public OrderReport generateReport(...) { ... }
    public void updateInventory(...) { ... }  // Wrong domain!
}
```

**Solution:** Split by responsibility:
```java
@Service
public class OrderLifecycleService { ... }  // Create, cancel, etc.
@Service
public class OrderFulfillmentService { ... }  // Ship, track, etc.
@Service
public class OrderQueryService { ... }  // Search, reports
@Service
public class OrderReturnService { ... }  // Returns, exchanges
```

### Business Logic in Services
```java
// WRONG: Domain logic in service
@Service
public class OrderService {
    public void applyDiscount(Order order, String code) {
        if (code.startsWith("VIP") && order.getTotal() > 100) {
            order.setTotal(order.getTotal() * 0.9);  // Business rule!
        }
    }
}
```

**Solution:** Logic belongs in domain:
```java
// CORRECT: Logic in domain entity
public class Order {
    public void applyDiscount(DiscountCode code) {
        if (code.isValidFor(this)) {
            this.total = code.apply(this.total);
        }
    }
}

// Service just orchestrates
@Service
public class OrderService {
    public void applyDiscount(OrderId id, DiscountCode code) {
        Order order = repository.findById(id);
        order.applyDiscount(code);  // Domain handles logic
        repository.save(order);
    }
}
```

## Testing Services

### Unit Test with Mocks
```java
@ExtendWith(MockitoExtension.class)
class OrderServiceTest {
    @Mock
    private OrderRepository orderRepository;
    @Mock
    private PaymentGateway paymentGateway;
    
    @InjectMocks
    private OrderService orderService;
    
    @Test
    void shouldCreateOrderWhenPaymentSucceeds() {
        // Given
        CreateOrderCommand command = new CreateOrderCommand(...);
        when(paymentGateway.process(any())).thenReturn(successfulPayment());
        when(orderRepository.save(any())).thenAnswer(i -> i.getArgument(0));
        
        // When
        OrderResult result = orderService.createOrder(command);
        
        // Then
        assertThat(result.getStatus()).isEqualTo(CONFIRMED);
        verify(orderRepository).save(any(Order.class));
    }
    
    @Test
    void shouldThrowExceptionWhenPaymentFails() {
        // Given
        CreateOrderCommand command = new CreateOrderCommand(...);
        when(paymentGateway.process(any())).thenReturn(failedPayment());
        
        // Then
        assertThrows(PaymentFailedException.class, () -> {
            orderService.createOrder(command);
        });
        verify(orderRepository, never()).save(any());
    }
}
```

### Integration Test
```java
@SpringBootTest
@Transactional
class OrderServiceIntegrationTest {
    @Autowired
    private OrderService orderService;
    
    @Autowired
    private OrderRepository orderRepository;
    
    @Test
    void shouldPersistOrder() {
        CreateOrderCommand command = new CreateOrderCommand(...);
        
        OrderResult result = orderService.createOrder(command);
        
        Order persisted = orderRepository.findById(result.getId()).orElseThrow();
        assertThat(persisted.getStatus()).isEqualTo(CONFIRMED);
    }
}
```

## When to Use / When Not to Use

### Use Service Layer When:
- Operations span multiple domain objects
- Need transaction coordination
- Business process has multiple steps
- Same operation used from multiple UIs
- Need to coordinate external services

### May Skip When:
- Simple CRUD with no business logic
- Single entity operations
- Read-only queries (use Query Handlers instead)
- Simple data transformations

## Evolution to Modern Patterns

| Pattern | Evolution | Use Case |
|---------|-----------|----------|
| **Service Layer** | Traditional | CRUD, simple orchestration |
| **CQRS** | Split reads/writes | Complex queries, different models |
| **Event Sourcing** | State as events | Audit trails, temporal queries |
| **Saga** | Distributed txns | Multi-service operations |

## FOE Alignment

This method supports **Optimize for Understanding** by:
- Making use cases explicit in service methods
- Separating orchestration from domain logic
- Creating clear transaction boundaries

It supports **Fast Feedback Loops** through:
- Service-level unit testing
- Clear success/failure per operation
- Mockable boundaries for testing

It supports **Confidence Through Evidence** by:
- Transaction boundaries ensure data consistency
- Explicit orchestration makes flows clear
- Testable units provide rapid validation

## References

- Fowler, M. (2002). *Patterns of Enterprise Application Architecture*. Addison-Wesley.
- Evans, E. (2003). *Domain-Driven Design*. Addison-Wesley.
- Microsoft (n.d.). [Service Layer](https://docs.microsoft.com/en-us/dotnet/architecture/modern-web-apps-azure/architectural-principles#dependency-inversion)

## Supporting Evidence

<RelatedObservations />
