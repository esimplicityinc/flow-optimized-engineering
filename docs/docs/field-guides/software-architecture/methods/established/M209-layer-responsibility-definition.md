---
methodId: M209
displayed_sidebar: fieldGuideSidebar
sidebar_position: 1
title: "Layer Responsibility Definition"
sidebar_label: "Layer Responsibility Definition"
description: "Assigning clear responsibilities to Presentation, Business Logic, and Data Access layers"
external_method:
  framework: layered-architecture
  method: layer-responsibility-definition
  id: M209
foe_maturity: validated
observations: []
---

import ExternalMethodHeader from '@site/src/components/ExternalMethodHeader';
import RelatedObservations from '@site/src/components/RelatedObservations';

# Layer Responsibility Definition

<ExternalMethodHeader />

## Why This Matters for Software Architecture

Clear layer responsibility definition is the foundation of maintainable software. Without explicit boundaries, code becomes a "big ball of mud" where business logic leaks into controllers, database queries appear in UI code, and testing becomes nearly impossible.

**Architecture Benefits:**
- Clear ownership of each component's purpose
- Predictable code locations reduce cognitive load
- Enables parallel development across layers
- Simplifies maintenance and refactoring

**FOE Alignment:**
- **Understanding** - Developers immediately know where to find and place code
- **Confidence** - Changes are isolated to appropriate layers
- **Fast Feedback** - Layer-specific testing provides rapid validation

## Definition

> Each layer in the architecture should have a single, well-defined responsibility. The Presentation Layer handles user interface and interaction concerns, the Business Logic Layer contains domain rules and workflows, and the Data Access Layer manages persistence and external data sources.
>
> — Based on POSA1 Layered Architecture Pattern

## The Three Classic Layers

### Presentation Layer
**Responsibility:** Handle all user interface and interaction concerns

**Contains:**
- Controllers/API endpoints
- View models/DTOs for UI
- Input validation
- Response formatting
- Authentication/authorization checks

**Does NOT contain:**
- Business rules or calculations
- Direct database queries
- External service calls (except through abstractions)

**Example:**
```java
@RestController
public class OrderController {
    private final OrderService orderService;
    
    @PostMapping("/orders")
    public ResponseEntity<OrderResponse> createOrder(
            @RequestBody CreateOrderRequest request) {
        // Validation belongs here
        validateRequest(request);
        
        // Delegation to business layer
        OrderResult result = orderService.createOrder(request);
        
        // Response formatting belongs here
        return ResponseEntity.ok(mapToResponse(result));
    }
}
```

### Business Logic Layer
**Responsibility:** Encapsulate domain rules, workflows, and use cases

**Contains:**
- Domain models and entities
- Business rules and validations
- Use case orchestration
- Domain services
- Application services

**Does NOT contain:**
- UI framework code
- Database-specific queries
- External API implementations

**Example:**
```java
@Service
public class OrderService {
    private final OrderRepository orderRepository;
    private final PaymentGateway paymentGateway;
    
    public OrderResult createOrder(CreateOrderRequest request) {
        // Business rules
        if (!isValidOrder(request)) {
            throw new InvalidOrderException();
        }
        
        // Domain logic
        Order order = new Order(request);
        order.calculateTotal();
        
        // Workflow orchestration
        PaymentResult payment = paymentGateway.process(order.getPayment());
        if (payment.isSuccessful()) {
            order.confirm();
            orderRepository.save(order);
        }
        
        return new OrderResult(order);
    }
}
```

### Data Access Layer
**Responsibility:** Abstract persistence and external data operations

**Contains:**
- Repository implementations
- Database queries
- ORM mappings
- External API clients
- File system access
- Cache implementations

**Does NOT contain:**
- Business rules
- Use case logic
- UI concerns

**Example:**
```java
@Repository
public class JpaOrderRepository implements OrderRepository {
    private final EntityManager entityManager;
    
    @Override
    public Order save(Order order) {
        entityManager.persist(order);
        return order;
    }
    
    @Override
    public Optional<Order> findById(OrderId id) {
        return Optional.ofNullable(
            entityManager.find(Order.class, id)
        );
    }
}
```

## How to Apply

### Step 1: Define Clear Responsibilities
Document what each layer owns:
- Create a responsibility matrix
- Define clear boundaries
- Document what belongs where

### Step 2: Establish Package/Module Structure
Organize code to enforce layers:
```
src/
├── presentation/     # Controllers, Views, DTOs
│   ├── api/
│   └── web/
├── application/      # Use cases, Application Services
│   ├── commands/
│   └── queries/
├── domain/           # Domain models, Domain Services
│   ├── entities/
│   ├── valueobjects/
│   └── services/
└── infrastructure/   # Repositories, External clients
    ├── persistence/
    └── external/
```

### Step 3: Enforce Through Code Reviews
- Check for layer violations
- Look for business logic in controllers
- Watch for database queries outside repositories

## Common Mistakes

### The "Smart UI" Anti-Pattern
Putting business logic directly in controllers or views:
```java
// WRONG: Business logic in controller
@PostMapping("/orders")
public Order createOrder(Request request) {
    // Business validation here!
    if (request.getQuantity() > 100) {
        throw new Error("Max 100 items");
    }
    
    // Direct DB access!
    Order order = new Order();
    order.setItems(request.getItems());
    jdbcTemplate.execute("INSERT INTO orders ...");
    return order;
}
```

### The "Anemic Domain Model"
Putting all logic in services, leaving entities as data bags:
```java
// WRONG: All logic in service, entity is just data
@Service
public class OrderService {
    public void processOrder(Order order) {
        // Business logic here instead of in Order entity
        double total = 0;
        for (Item item : order.getItems()) {
            total += item.getPrice() * item.getQuantity();
        }
        order.setTotal(total);
    }
}

// Entity has no behavior
public class Order {
    private List<Item> items;
    private double total;
    // Only getters and setters
}
```

### The "Lasagna Architecture"
Creating too many layers with minimal value:
```
Presentation → Facade → Business Delegate → 
Service → Manager → DAO → Database
```

Each layer adds indirection without clear benefit.

## When to Use / When Not to Use

### Use When:
- Building traditional web applications
- Team is new to architecture patterns
- Working with frameworks that expect layers (Spring, .NET, Rails)
- Need clear separation for testing
- Application has clear technical boundaries

### Consider Alternatives When:
- Building microservices (consider Vertical Slice Architecture)
- Heavy domain complexity (consider DDD tactical patterns)
- Need maximum testability (consider Hexagonal/Clean Architecture)
- High rate of change across features (feature-based organization may work better)

## Evolution to Modern Patterns

Layered Architecture evolved into more sophisticated approaches:

| Pattern | Evolution | Key Difference |
|---------|-----------|----------------|
| **Hexagonal** | Ports replace layers | Explicit dependencies through interfaces |
| **Clean Architecture** | Strict dependency rule | Domain has zero external dependencies |
| **Vertical Slice** | Features replace layers | Organize by capability, not technical concern |

## FOE Alignment

This method directly supports **Optimize for Understanding** by:
- Making code location predictable
- Reducing cognitive load through clear boundaries
- Enabling developers to focus on one layer at a time

It supports **Fast Feedback Loops** through:
- Layer-specific unit testing
- Isolated changes with minimal ripple effects

It supports **Confidence Through Evidence** by:
- Making dependencies explicit and controllable
- Preventing accidental coupling

## References

- Buschmann, F., et al. (1996). *Pattern-Oriented Software Architecture, Volume 1*. Wiley.
- Fowler, M. (2002). *Patterns of Enterprise Application Architecture*. Addison-Wesley.
- Martin, R. C. (2012). [The Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)

## Supporting Evidence

<RelatedObservations />
