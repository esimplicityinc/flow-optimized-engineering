---
methodId: M213
displayed_sidebar: fieldGuideSidebar
sidebar_position: 5
title: "Repository Pattern"
sidebar_label: "Repository Pattern"
description: "Abstracting data access within the persistence layer"
external_method:
  framework: layered-architecture
  method: repository-pattern
  id: M213
foe_maturity: validated
observations: []
---

import ExternalMethodHeader from '@site/src/components/ExternalMethodHeader';
import RelatedObservations from '@site/src/components/RelatedObservations';

# Repository Pattern

<ExternalMethodHeader />

## Why This Matters for Software Architecture

Database access code scattered throughout business logic creates unmaintainable code that's hard to test and impossible to switch storage technologies. The Repository pattern provides a clean abstraction that makes persistence look like an in-memory collection, hiding query complexity and enabling test substitution.

**Architecture Benefits:**
- Domain code is persistence-ignorant
- Easy to swap databases (Postgres to MongoDB)
- Test business logic with in-memory repositories
- Query optimization centralized
- Transaction boundaries are clear

**FOE Alignment:**
- **Understanding** - Repositories collect all data access in one place
- **Confidence** - Can test domain without database setup
- **Fast Feedback** - Unit tests run fast with mock repositories

## Definition

> Mediates between the domain and data mapping layers using a collection-like interface for accessing domain objects. A Repository encapsulates the set of objects persisted in a data store and the operations performed over them, providing a more object-oriented view of the persistence layer.
>
> — Fowler, Patterns of Enterprise Application Architecture (2002)

## The Repository Contract

### Collection-Like Interface
```java
// Defined in domain layer
public interface OrderRepository {
    // Collection-like operations
    Order save(Order order);
    void delete(Order order);
    
    // Query methods
    Optional<Order> findById(OrderId id);
    List<Order> findAll();
    List<Order> findByCustomer(CustomerId customerId);
    
    // Specification-based queries
    List<Order> findBySpecification(OrderSpecification spec);
    
    // Existence check
    boolean exists(OrderId id);
    
    // Count
    long count();
}
```

### Key Characteristics
- Interface defined in domain layer
- Implementation in infrastructure layer
- Works with full aggregates only
- Returns domain objects, not database rows
- Method names use domain language

## Implementation Strategies

### 1. Simple CRUD Repository
Basic operations for simple entities:

```java
@Repository
public class PostgresOrderRepository implements OrderRepository {
    private final JdbcTemplate jdbc;
    private final OrderMapper mapper;
    
    @Override
    public Order save(Order order) {
        if (order.isNew()) {
            return insert(order);
        } else {
            return update(order);
        }
    }
    
    @Override
    public Optional<Order> findById(OrderId id) {
        String sql = "SELECT * FROM orders WHERE id = ?";
        return jdbc.query(sql, mapper, id.value())
                   .stream()
                   .findFirst();
    }
    
    @Override
    public List<Order> findByCustomer(CustomerId customerId) {
        String sql = "SELECT * FROM orders WHERE customer_id = ?";
        return jdbc.query(sql, mapper, customerId.value());
    }
}
```

### 2. Spring Data JPA
Leverage framework capabilities:

```java
// Interface only - Spring generates implementation
public interface OrderJpaRepository extends JpaRepository<OrderJpaEntity, Long> {
    
    // Derived query method
    List<OrderJpaEntity> findByCustomerIdAndStatus(
        Long customerId, OrderStatus status
    );
    
    // Custom JPQL
    @Query("""
        SELECT o FROM Order o 
        WHERE o.customer.id = :customerId 
        AND o.createdAt > :since
        """)
    List<OrderJpaEntity> findRecentByCustomer(
        @Param("customerId") Long customerId,
        @Param("since") LocalDateTime since
    );
    
    // Projection for performance
    @Query("SELECT o.id as orderId, o.total as total FROM Order o WHERE o.customer.id = :id")
    List<OrderSummary> findSummariesByCustomer(@Param("id") Long customerId);
}
```

### 3. Manual Implementation with Full Control
Complete control over mapping and queries:

```java
@Repository
@RequiredArgsConstructor
public class OrderRepositoryImpl implements OrderRepository {
    private final EntityManager em;
    private final OrderDomainMapper domainMapper;
    
    @Override
    public Order save(Order order) {
        OrderJpaEntity entity = domainMapper.toEntity(order);
        
        if (entity.getId() == null) {
            em.persist(entity);
        } else {
            em.merge(entity);
        }
        
        return domainMapper.toDomain(entity);
    }
    
    @Override
    public Optional<Order> findById(OrderId id) {
        OrderJpaEntity entity = em.find(OrderJpaEntity.class, id.value());
        return Optional.ofNullable(entity)
                       .map(domainMapper::toDomain);
    }
    
    @Override
    public List<Order> findByCustomer(CustomerId customerId) {
        TypedQuery<OrderJpaEntity> query = em.createQuery(
            "SELECT o FROM Order o WHERE o.customerId = :customerId",
            OrderJpaEntity.class
        );
        query.setParameter("customerId", customerId.value());
        
        return query.getResultList()
                    .stream()
                    .map(domainMapper::toDomain)
                    .toList();
    }
}
```

## Aggregate Persistence

### Loading Full Aggregates
```java
public class OrderRepositoryImpl implements OrderRepository {
    
    @Override
    public Optional<Order> findById(OrderId id) {
        // Load order with all items (aggregate boundary)
        String sql = """
            SELECT o.*, i.* 
            FROM orders o 
            LEFT JOIN order_items i ON o.id = i.order_id 
            WHERE o.id = ?
            """;
        
        return jdbc.query(sql, new OrderExtractor(), id.value())
                   .stream()
                   .findFirst();
    }
}

// Mapper reconstructs full aggregate
public class OrderExtractor implements ResultSetExtractor<Order> {
    @Override
    public Order extractData(ResultSet rs) throws SQLException {
        Order order = null;
        while (rs.next()) {
            if (order == null) {
                order = mapOrder(rs);
            }
            OrderItem item = mapItem(rs);
            if (item != null) {
                order.addItem(item);
            }
        }
        return order;
    }
}
```

### Persisting Aggregate Changes
```java
@Service
@Transactional
public class OrderService {
    private final OrderRepository orderRepository;
    
    public void addItemToOrder(OrderId orderId, ProductId productId, int qty) {
        Order order = orderRepository.findById(orderId)
            .orElseThrow(() -> new OrderNotFoundException(orderId));
        
        // Domain logic modifies aggregate
        order.addItem(productId, qty);
        
        // Repository persists entire aggregate
        orderRepository.save(order);
    }
}
```

## Advanced Patterns

### Specification Pattern
Encapsulate query criteria:

```java
// Specification interface
public interface OrderSpecification {
    Predicate toPredicate(Root<Order> root, 
                          CriteriaQuery<?> query, 
                          CriteriaBuilder cb);
}

// Concrete specifications
public class RecentOrdersSpec implements OrderSpecification {
    private final Duration maxAge;
    
    @Override
    public Predicate toPredicate(Root<Order> root, 
                                  CriteriaQuery<?> query, 
                                  CriteriaBuilder cb) {
        Instant cutoff = Instant.now().minus(maxAge);
        return cb.greaterThan(root.get("createdAt"), cutoff);
    }
}

// Repository uses specifications
public interface OrderRepository {
    List<Order> findBySpecification(OrderSpecification spec);
}
```

### Repository Decorator
Add cross-cutting concerns:

```java
@Repository
@Primary
@RequiredArgsConstructor
public class CachingOrderRepository implements OrderRepository {
    private final OrderRepository delegate;
    private final CacheManager cacheManager;
    
    @Override
    public Optional<Order> findById(OrderId id) {
        Cache cache = cacheManager.getCache("orders");
        
        Order cached = cache.get(id.value(), Order.class);
        if (cached != null) {
            return Optional.of(cached);
        }
        
        Optional<Order> result = delegate.findById(id);
        result.ifPresent(order -> cache.put(id.value(), order));
        return result;
    }
    
    @Override
    public Order save(Order order) {
        Order saved = delegate.save(order);
        cacheManager.getCache("orders").evict(order.getId().value());
        return saved;
    }
    
    // Delegate other methods...
}
```

## Testing with Repositories

### In-Memory Test Repository
```java
public class InMemoryOrderRepository implements OrderRepository {
    private final Map<OrderId, Order> orders = new HashMap<>();
    
    @Override
    public Order save(Order order) {
        orders.put(order.getId(), order);
        return order;
    }
    
    @Override
    public Optional<Order> findById(OrderId id) {
        return Optional.ofNullable(orders.get(id));
    }
    
    @Override
    public List<Order> findByCustomer(CustomerId customerId) {
        return orders.values().stream()
            .filter(o -> o.getCustomerId().equals(customerId))
            .toList();
    }
    
    // ... other methods
}
```

### Unit Test Example
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
    void shouldCreateOrder() {
        // Given
        CreateOrderRequest request = new CreateOrderRequest(...);
        when(paymentGateway.process(any())).thenReturn(successfulPayment());
        when(orderRepository.save(any())).thenAnswer(i -> i.getArgument(0));
        
        // When
        OrderResult result = orderService.createOrder(request);
        
        // Then
        assertThat(result.getStatus()).isEqualTo(CONFIRMED);
        verify(orderRepository).save(any(Order.class));
    }
}
```

## Common Mistakes

### Repository per Entity
```java
// WRONG: Repository for each entity
OrderItemRepository  // Items are part of Order aggregate
OrderStatusRepository // Status is a value object
```

**Solution:** One repository per aggregate root:
```java
// CORRECT: Only aggregate roots have repositories
OrderRepository  // Order is the aggregate root
// OrderItem accessed through Order
```

### Business Logic in Repository
```java
// WRONG: Business logic in repository
public class OrderRepository {
    public void processOrder(Order order) {
        if (order.getTotal().compareTo(Money.ZERO) > 0) {
            order.setStatus(CONFIRMED);
        }
        save(order);
    }
}
```

**Solution:** Keep business logic in domain:
```java
// CORRECT: Repository only persists
public class OrderService {
    public void processOrder(OrderId id) {
        Order order = repository.findById(id);
        order.process();  // Domain logic
        repository.save(order);
    }
}
```

### Generic Repository Abuse
```java
// WRONG: Too generic, loses domain intent
public interface GenericRepository<T, ID> {
    T save(T entity);
    Optional<T> findById(ID id);
    void deleteById(ID id);
}
```

**Solution:** Domain-specific methods:
```java
// CORRECT: Expressive, domain-specific
public interface OrderRepository {
    Order save(Order order);
    Optional<Order> findById(OrderId id);
    List<Order> findPendingOrdersOlderThan(Duration duration);
    List<Order> findByCustomer(CustomerId customerId);
    Money calculateTotalRevenueForPeriod(DateRange range);
}
```

## FOE Alignment

This method supports **Optimize for Understanding** by:
- Centralizing data access logic
- Using domain language in persistence
- Hiding database complexity

It supports **Fast Feedback Loops** through:
- Fast in-memory repository implementations for tests
- Clear transaction boundaries
- Immediate persistence feedback

It supports **Confidence Through Evidence** by:
- Enabling database technology swaps
- Supporting test isolation
- Centralizing query optimization

## References

- Fowler, M. (2002). *Patterns of Enterprise Application Architecture*. Addison-Wesley.
- Evans, E. (2003). *Domain-Driven Design*. Addison-Wesley.
- Microsoft (n.d.). [Repository Pattern](https://docs.microsoft.com/en-us/dotnet/architecture/microservices/microservice-ddd-cqrs-patterns/infrastructure-persistence-layer-design)

## Supporting Evidence

<RelatedObservations />
