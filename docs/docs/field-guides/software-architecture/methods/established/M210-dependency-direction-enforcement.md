---
methodId: M210
displayed_sidebar: fieldGuideSidebar
sidebar_position: 2
title: "Dependency Direction Enforcement"
sidebar_label: "Dependency Direction Enforcement"
description: "Ensuring dependencies only point inward (toward the domain/core)"
external_method:
  framework: layered-architecture
  method: dependency-direction-enforcement
  id: M210
foe_maturity: validated
observations: []
---

import ExternalMethodHeader from '@site/src/components/ExternalMethodHeader';
import RelatedObservations from '@site/src/components/RelatedObservations';

# Dependency Direction Enforcement

<ExternalMethodHeader />

## Why This Matters for Software Architecture

The direction of dependencies determines how easily your code can change. When dependencies point outward from the domain, business logic becomes coupled to frameworks, databases, and UI libraries. When dependencies point inward, the domain remains pure and stable while outer layers can be swapped or upgraded without touching core business rules.

**Architecture Benefits:**
- Core business logic remains framework-independent
- Easier to test business rules in isolation
- Can swap databases, UIs, or frameworks without rewriting domain code
- Changes in infrastructure don't cascade to domain

**FOE Alignment:**
- **Understanding** - Clear dependency direction makes coupling visible
- **Confidence** - Changes are contained; you know what might break
- **Fast Feedback** - Domain tests run fast without infrastructure setup

## Definition

> Dependencies in a layered architecture should only point inward, toward the core domain. Outer layers may depend on inner layers, but inner layers must never depend on outer layers. This is achieved through the Dependency Inversion Principle—depending on abstractions rather than concretions.
>
> — Based on Dependency Inversion Principle (Martin, 1996)

## The Dependency Rule

### Correct Direction
```
Presentation → Application → Domain ← Infrastructure
                                    ↓
                              (Domain knows nothing of outer layers)
```

### Wrong Direction (Layer Violation)
```
Presentation → Application → Domain → Database Driver
                              ↑
                    (Domain now coupled to infrastructure)
```

## How to Enforce Dependency Direction

### 1. Define Interfaces in Inner Layers
Place interfaces (contracts) in the domain or application layers:

```java
// In domain layer - domain defines what it needs
public interface OrderRepository {
    Order save(Order order);
    Optional<Order> findById(OrderId id);
    List<Order> findByCustomer(CustomerId customerId);
}

// In domain layer - domain defines the contract
public interface PaymentGateway {
    PaymentResult process(Payment payment);
}
```

### 2. Implement in Outer Layers
Concrete implementations live in infrastructure:

```java
// In infrastructure layer - implements domain's interface
@Repository
public class PostgresOrderRepository implements OrderRepository {
    private final JdbcTemplate jdbcTemplate;
    
    @Override
    public Order save(Order order) {
        // Postgres-specific implementation
    }
    
    @Override
    public Optional<Order> findById(OrderId id) {
        // Postgres-specific implementation
    }
}

// In infrastructure layer
@Component
public class StripePaymentGateway implements PaymentGateway {
    private final StripeClient stripeClient;
    
    @Override
    public PaymentResult process(Payment payment) {
        // Stripe-specific implementation
    }
}
```

### 3. Use Dependency Injection
Frameworks inject concrete implementations:

```java
// Application service depends on interfaces only
@Service
public class OrderService {
    private final OrderRepository orderRepository;  // Interface
    private final PaymentGateway paymentGateway;    // Interface
    
    // Framework injects concrete implementations
    public OrderService(OrderRepository orderRepository, 
                        PaymentGateway paymentGateway) {
        this.orderRepository = orderRepository;
        this.paymentGateway = paymentGateway;
    }
}
```

## Architecture Approaches

### Traditional Layered (Practical)
Dependencies mostly point inward, with some pragmatic exceptions:
```
Web Layer → Service Layer → Repository Layer
                ↓
         Domain Model (shared)
```

### Strict Layered (Clean Architecture)
No dependencies skip layers; domain has zero external dependencies:
```
Frameworks & Drivers → Interface Adapters → Use Cases → Entities
                                                          ↑
                                              (Pure domain, no imports)
```

### Relaxed Layered (Pragmatic)
Presentation can skip application layer for simple queries:
```
Web Layer ─┬─→ Service Layer → Repository Layer
           └─→ Repository Layer (for simple reads)
```

## Enforcement Mechanisms

### 1. Package/Module Boundaries
Use Java modules, package-private visibility, or architectural testing:

```java
// In domain module - package-private constructor
// Forces creation through factory/repository
class Order {
    private OrderId id;
    
    // Package-private - only domain can create
    Order(OrderId id, CustomerId customerId) {
        this.id = id;
    }
}
```

### 2. ArchUnit Tests
Automated architecture testing:

```java
@AnalyzeClasses(packages = "com.example")
class LayerDependencyTest {
    
    @ArchTest
    static final ArchRule domain_should_not_depend_on_infrastructure = 
        noClasses()
            .that()
            .resideInAPackage("..domain..")
            .should()
            .dependOnClassesThat()
            .resideInAPackage("..infrastructure..");
    
    @ArchTest
    static final ArchRule dependency_direction_should_be_inward =
        layeredArchitecture()
            .layer("Domain").definedBy("..domain..")
            .layer("Application").definedBy("..application..")
            .layer("Infrastructure").definedBy("..infrastructure..")
            .layer("Presentation").definedBy("..presentation..")
            .whereLayer("Domain").mayNotAccessAnyLayer()
            .whereLayer("Application").mayOnlyAccessLayers("Domain")
            .whereLayer("Infrastructure").mayOnlyAccessLayers("Application", "Domain")
            .whereLayer("Presentation").mayOnlyAccessLayers("Application", "Domain");
}
```

### 3. Import Linter Tools
- **Checkstyle** - Restrict imports between packages
- **SpotBugs** - Findbugs rules for dependency checking
- **Structure101** - Visualize and enforce architecture

## Common Mistakes

### Direct Dependency on Framework
```java
// WRONG: Domain depends on Spring
@Entity  // JPA annotation in domain
public class Order {
    @Id @GeneratedValue  // Database-specific
    private Long id;
}
```

**Solution:** Use separate entities or ignore annotations in domain:
```java
// CORRECT: Domain is pure
public class Order {
    private OrderId id;  // Domain concept, not database type
    
    public Order(OrderId id, CustomerId customerId) {
        this.id = id;
    }
}

// Infrastructure maps domain to persistence
@Entity
class OrderJpaEntity {
    @Id
    private Long id;
    
    static OrderJpaEntity fromDomain(Order order) { ... }
    Order toDomain() { ... }
}
```

### Service Locator Anti-Pattern
```java
// WRONG: Domain depends on service locator
public class Order {
    public void process() {
        RepositoryFactory.getOrderRepository().save(this);
    }
}
```

**Solution:** Pass dependencies explicitly:
```java
// CORRECT: Dependencies injected
public class OrderService {
    private final OrderRepository repository;
    
    public void processOrder(OrderId id) {
        Order order = repository.findById(id);
        order.process();
        repository.save(order);
    }
}
```

### Framework Coupling in Domain
```java
// WRONG: Domain uses Spring events
public class Order {
    @Autowired
    private ApplicationEventPublisher publisher;  // Spring dependency!
    
    public void confirm() {
        this.status = CONFIRMED;
        publisher.publishEvent(new OrderConfirmedEvent(this));
    }
}
```

**Solution:** Return events from domain:
```java
// CORRECT: Domain returns events, doesn't publish them
public class Order {
    private List<DomainEvent> events = new ArrayList<>();
    
    public void confirm() {
        this.status = CONFIRMED;
        events.add(new OrderConfirmedEvent(this.id));
    }
    
    public List<DomainEvent> getEvents() {
        return Collections.unmodifiableList(events);
    }
}
```

## When to Use / When Not to Use

### Use Strict Dependency Direction When:
- Building long-lived systems that will outlast frameworks
- Need to switch databases or external services
- Domain logic is complex and valuable
- Testing without infrastructure is critical
- Multiple UIs share the same domain (web, mobile, API)

### Relaxed Approach May Be OK When:
- Building CRUD applications with minimal business logic
- Prototypes or short-lived projects
- Team has limited DDD/architecture experience
- Framework is unlikely to change (e.g., standard Spring stack)

## Evolution to Modern Patterns

| Approach | Dependencies | Flexibility | Complexity |
|----------|--------------|-------------|------------|
| **Traditional Layered** | Mostly inward | Medium | Low |
| **Clean Architecture** | Strictly inward | High | Medium |
| **Hexagonal** | Explicit ports/adapters | High | Medium |
| **Vertical Slice** | Feature-organized | High | Low |

## FOE Alignment

This method directly supports **Optimize for Understanding** by:
- Making dependencies explicit and visible
- Creating clear rules about what can depend on what
- Enabling developers to reason about change impact

It supports **Fast Feedback Loops** through:
- Fast unit tests that don't need infrastructure
- Clear boundaries that limit regression scope

It supports **Confidence Through Evidence** by:
- Enabling architectural testing
- Making coupling violations detectable automatically

## References

- Martin, R. C. (1996). [The Dependency Inversion Principle](https://web.archive.org/web/20150906155800/http://www.objectmentor.com/resources/articles/dip.pdf). C++ Report.
- Buschmann, F., et al. (1996). *Pattern-Oriented Software Architecture, Volume 1*. Wiley.
- Martin, R. C. (2012). *Clean Architecture: A Craftsman's Guide to Software Structure and Design*. Prentice Hall.

## Supporting Evidence

<RelatedObservations />
