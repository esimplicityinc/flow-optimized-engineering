---
methodId: M212
displayed_sidebar: fieldGuideSidebar
sidebar_position: 4
title: "Data Transfer Object Pattern"
sidebar_label: "Data Transfer Object Pattern"
description: "Managing data flow between layers"
external_method:
  framework: layered-architecture
  method: data-transfer-object-pattern
  id: M212
foe_maturity: validated
observations: []
---

import ExternalMethodHeader from '@site/src/components/ExternalMethodHeader';
import RelatedObservations from '@site/src/components/RelatedObservations';

# Data Transfer Object Pattern

<ExternalMethodHeader />

## Why This Matters for Software Architecture

Layers need to exchange data, but exposing domain entities directly creates coupling problems: lazy loading exceptions, serialization issues, and leaking internal state. Data Transfer Objects (DTOs) provide a clean separation by carrying data between layers without exposing domain implementation details.

**Architecture Benefits:**
- Prevents lazy loading and serialization issues
- Shapes data for specific use cases
- Hides internal domain structure
- Enables optimization (projection queries)
- Supports API versioning independently from domain

**FOE Alignment:**
- **Understanding** - DTOs show exactly what data crosses boundaries
- **Confidence** - No surprise lazy loading or serialization errors
- **Fast Feedback** - Failures happen at compile time, not runtime

## Definition

> A Data Transfer Object (DTO) is an object that carries data between processes or across layer boundaries. DTOs contain no business logic, only storage, accessors, and possibly serialization. They decouple the internal domain model from external representations.
>
> — Fowler, Patterns of Enterprise Application Architecture (2002)

## DTO Types by Purpose

### 1. Request DTOs (Inbound)
Carry data from presentation to application layer:

```java
public record CreateOrderRequest(
    @NotNull CustomerId customerId,
    @NotEmpty List<@Valid OrderLineRequest> lines,
    @Pattern(regexp = "DISCOUNT\\d{4}") Optional<String> discountCode,
    ShippingAddress shippingAddress
) {
    public record OrderLineRequest(
        @NotNull ProductId productId,
        @Min(1) @Max(999) int quantity
    ) {}
}
```

**Characteristics:**
- Validation annotations
- Primitive or value types
- No domain logic
- Immutable

### 2. Response DTOs (Outbound)
Shape data for presentation or external consumers:

```java
public record OrderResponse(
    String orderId,
    CustomerSummary customer,
    List<OrderLineResponse> lines,
    MoneyDTO total,
    String status,
    String createdAt,
    Optional<String> trackingNumber
) {
    public record OrderLineResponse(
        String productId,
        String productName,
        int quantity,
        MoneyDTO unitPrice,
        MoneyDTO lineTotal
    ) {}
}
```

**Characteristics:**
- Flattened structure (no lazy loading)
- Formatted for clients (String dates, not Instant)
- Calculated fields included
- No circular references

### 3. Query/Filter DTOs
Parameterize data retrieval:

```java
public record OrderSearchCriteria(
    Optional<CustomerId> customerId,
    Optional<OrderStatus> status,
    Optional<DateRange> dateRange,
    Optional<MoneyRange> totalRange
) {}

public record PageRequest(
    int pageNumber,
    int pageSize,
    Optional<String> sortBy,
    SortDirection sortDirection
) {}
```

## Mapping Strategies

### 1. Constructor Mapping
Simple, type-safe conversion:

```java
public record OrderDTO(
    String id,
    String customerName,
    BigDecimal total
) {
    // Static factory from domain
    public static OrderDTO from(Order order) {
        return new OrderDTO(
            order.getId().toString(),
            order.getCustomer().getName(),
            order.getTotal().getAmount()
        );
    }
}
```

### 2. Mapper Classes
Complex mapping in dedicated classes:

```java
@Component
public class OrderMapper {
    
    public OrderDTO toDTO(Order order) {
        return new OrderDTO(
            order.getId().value(),
            mapCustomer(order.getCustomer()),
            order.getLines().stream()
                .map(this::toLineDTO)
                .toList(),
            toMoneyDTO(order.getTotal()),
            order.getStatus().name(),
            formatDate(order.getCreatedAt())
        );
    }
    
    public Order toDomain(CreateOrderRequest request) {
        return new Order(
            new CustomerId(request.customerId()),
            request.lines().stream()
                .map(line -> new OrderLine(
                    new ProductId(line.productId()),
                    line.quantity()
                ))
                .toList()
        );
    }
}
```

### 3. Mapping Libraries
For repetitive mapping:

```java
// MapStruct generates mappers at compile time
@Mapper(componentModel = "spring")
public interface OrderMapper {
    OrderMapper INSTANCE = Mappers.getMapper(OrderMapper.class);
    
    @Mapping(source = "id.value", target = "orderId")
    @Mapping(source = "customer.name", target = "customerName")
    OrderDTO toDTO(Order order);
    
    @Mapping(target = "id", ignore = true)
    Order toDomain(CreateOrderRequest request);
}
```

**Popular Libraries:**
- **MapStruct** - Compile-time code generation, type-safe
- **ModelMapper** - Runtime reflection-based
- **MapStruct** is preferred for compile-time safety

## DTO Lifecycle Patterns

### Pattern 1: Request → Domain → Response
Full round-trip with separate representations:

```java
@PostMapping("/orders")
public ResponseEntity<OrderResponse> createOrder(
        @RequestBody @Valid CreateOrderRequest request) {
    
    // 1. Map request to domain
    Order order = orderMapper.toDomain(request);
    
    // 2. Process in domain
    Order savedOrder = orderService.create(order);
    
    // 3. Map domain to response
    OrderResponse response = orderMapper.toDTO(savedOrder);
    
    return ResponseEntity.created(...).body(response);
}
```

### Pattern 2: Projection DTOs (Query Optimization)
Query only needed fields directly:

```java
public interface OrderSummaryDTO {
    String getOrderId();
    String getCustomerName();
    BigDecimal getTotal();
    String getStatus();
}

// Repository returns projection
public interface OrderRepository {
    @Query("""
        SELECT o.id as orderId, c.name as customerName, 
               o.total as total, o.status as status
        FROM Order o JOIN o.customer c
        WHERE o.status = :status
        """)
    List<OrderSummaryDTO> findSummariesByStatus(OrderStatus status);
}
```

### Pattern 3: CQRS with Separate DTOs
Different models for reads and writes:

```java
// Write model (Command side)
public record CreateOrderCommand(
    CustomerId customerId,
    List<OrderLine> lines
) {}

// Read model (Query side) - denormalized for queries
public record OrderListItem(
    String orderId,
    String customerName,
    String customerEmail,
    BigDecimal total,
    int itemCount,
    String status,
    LocalDateTime createdAt
) {}
```

## Common Pitfalls

### 1. Anemic Domain Model
Using DTOs everywhere, entities become data bags:

```java
// WRONG: Just passing DTOs through
@Service
public class OrderService {
    public OrderDTO process(OrderDTO dto) {
        // No domain logic, just data manipulation
        dto.setStatus("PROCESSED");
        return dto;
    }
}
```

**Solution:** Use domain entities for business logic, DTOs only at boundaries:
```java
// CORRECT: Domain handles logic
@Service
public class OrderService {
    public OrderResult process(OrderId id) {
        Order order = repository.findById(id);
        order.process();  // Domain logic
        repository.save(order);
        return mapper.toResult(order);
    }
}
```

### 2. DTO Explosion
Creating DTOs for every variation:

```java
// WRONG: Too many similar DTOs
OrderDTO
OrderSummaryDTO
OrderListDTO
OrderDetailDTO
OrderAdminDTO
OrderCustomerDTO
// ... maintainability nightmare
```

**Solution:** Use generic patterns or optional fields:
```java
// CORRECT: One flexible DTO
public record OrderDTO(
    String id,
    CustomerSummary customer,
    List<OrderLineDTO> lines,
    MoneyDTO total,
    // Optional based on context
    Optional<List<ShipmentDTO>> shipments,
    Optional<PaymentDetails> paymentDetails
) {}
```

### 3. Leaky DTOs
DTOs expose internal structure:

```java
// WRONG: Exposes Hibernate proxies
public record OrderDTO(
    Long id,  // Database ID!
    Customer customer,  // Entity with lazy loading!
    List<OrderLine> lines  // More entities!
) {}
```

**Solution:** Fully flatten and transform:
```java
// CORRECT: No domain references
public record OrderDTO(
    String orderId,  // Domain ID
    CustomerSummary customer,  // Separate DTO
    List<LineDTO> lines  // Transformed DTOs
) {}
```

## DTO Design Guidelines

### Do:
- Keep DTOs immutable (records in Java, dataclasses in Python)
- Use primitive types or other DTOs (no entity references)
- Include only data needed for the use case
- Validate at the boundary
- Document the purpose

### Don't:
- Put business logic in DTOs
- Expose database IDs (use domain IDs)
- Create deep object graphs
- Share DTOs across unrelated use cases
- Use entities as DTOs

## Modern Alternatives

### GraphQL
Client specifies needed fields:
```graphql
query {
  order(id: "123") {
    id
    total
    customer { name }
    # Only request what you need
  }
}
```

### gRPC/Protobuf
Binary serialization with schema:
```protobuf
message Order {
  string order_id = 1;
  Customer customer = 2;
  repeated OrderLine lines = 3;
  Money total = 4;
}
```

## FOE Alignment

This method supports **Optimize for Understanding** by:
- Making data contracts explicit
- Showing exactly what crosses layer boundaries
- Preventing hidden lazy loading surprises

It supports **Fast Feedback Loops** through:
- Compile-time type safety
- No runtime serialization errors
- Clear validation at boundaries

It supports **Confidence Through Evidence** by:
- Enabling contract testing
- Supporting API versioning
- Making breaking changes visible

## References

- Fowler, M. (2002). *Patterns of Enterprise Application Architecture*. Addison-Wesley.
- Gamma, E., et al. (1994). *Design Patterns*. Addison-Wesley.
- Microsoft (n.d.). [DTO Pattern](https://docs.microsoft.com/en-us/aspnet/web-api/overview/data/using-web-api-with-entity-framework/part-5)

## Supporting Evidence

<RelatedObservations />
