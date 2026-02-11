---
methodId: M215
displayed_sidebar: fieldGuideSidebar
sidebar_position: 7
title: "Layer Isolation Testing"
sidebar_label: "Layer Isolation Testing"
description: "Unit testing within layer boundaries"
external_method:
  framework: layered-architecture
  method: layer-isolation-testing
  id: M215
foe_maturity: validated
observations: []
---

import ExternalMethodHeader from '@site/src/components/ExternalMethodHeader';
import RelatedObservations from '@site/src/components/RelatedObservations';

# Layer Isolation Testing

<ExternalMethodHeader />

## Why This Matters for Software Architecture

Testing through all layers for every scenario is slow and brittle. When tests hit the database or external services, they become integration tests—slow to run and complex to set up. Layer Isolation Testing enables fast, focused unit tests by testing each layer independently with mocked dependencies.

**Architecture Benefits:**
- Tests run in milliseconds, not seconds
- Failures pinpoint exact layer and component
- No database setup or external service dependencies
- Can test edge cases without complex fixture setup
- Parallel test execution is trivial

**FOE Alignment:**
- **Understanding** - Test failures clearly indicate which layer has issues
- **Confidence** - Comprehensive test coverage with fast feedback
- **Fast Feedback** - Unit tests provide immediate validation during development

## Definition

> Layer Isolation Testing is the practice of testing each architectural layer independently by replacing dependencies on other layers with test doubles (mocks, stubs, fakes). This enables fast, deterministic tests that validate a layer's behavior without requiring the full application stack.
>
> — Based on Test Pyramid principles and Layered Architecture testing patterns

## Testing Each Layer

### 1. Domain Layer Tests (Pure Unit Tests)
Test domain logic with no dependencies:

```java
class OrderTest {
    
    @Test
    void shouldCalculateTotal() {
        // Given - pure domain objects
        Order order = new Order(new CustomerId("C123"));
        Product product = new Product("P1", Money.of(10.00));
        
        // When
        order.addItem(product, 3);
        
        // Then
        assertThat(order.getTotal()).isEqualTo(Money.of(30.00));
    }
    
    @Test
    void shouldNotAddItemWhenOrderIsConfirmed() {
        // Given
        Order order = new Order(new CustomerId("C123"));
        order.confirm();  // State transition
        
        // Then
        assertThrows(IllegalStateException.class, () -> {
            order.addItem(new Product("P1", Money.of(10.00)), 1);
        });
    }
    
    @Test
    void shouldApplyDiscount() {
        // Given
        Order order = new Order(new CustomerId("C123"));
        order.addItem(new Product("P1", Money.of(100.00)), 1);
        DiscountCode discount = new DiscountCode("SAVE20", 0.20);
        
        // When
        order.applyDiscount(discount);
        
        // Then
        assertThat(order.getTotal()).isEqualTo(Money.of(80.00));
    }
}
```

**Characteristics:**
- No mocks needed (pure domain)
- Test business rules and invariants
- Fast execution (< 1ms per test)
- High confidence in domain correctness

### 2. Application Service Tests (Mocked Dependencies)
Test orchestration logic with mocked repositories and services:

```java
@ExtendWith(MockitoExtension.class)
class OrderServiceTest {
    
    @Mock
    private OrderRepository orderRepository;
    @Mock
    private ProductRepository productRepository;
    @Mock
    private PaymentGateway paymentGateway;
    @Mock
    private EventPublisher eventPublisher;
    
    @InjectMocks
    private OrderService orderService;
    
    @Test
    void shouldCreateOrderAndProcessPayment() {
        // Given
        CreateOrderCommand command = new CreateOrderCommand(
            new CustomerId("C123"),
            Map.of(new ProductId("P1"), 2)
        );
        
        Product product = new Product("P1", Money.of(10.00));
        when(productRepository.findById(new ProductId("P1")))
            .thenReturn(Optional.of(product));
        when(paymentGateway.process(any()))
            .thenReturn(PaymentResult.success());
        when(orderRepository.save(any(Order.class)))
            .thenAnswer(invocation -> invocation.getArgument(0));
        
        // When
        OrderResult result = orderService.createOrder(command);
        
        // Then
        assertThat(result.getStatus()).isEqualTo(OrderStatus.CONFIRMED);
        verify(orderRepository).save(any(Order.class));
        verify(eventPublisher).publish(any(OrderCreatedEvent.class));
    }
    
    @Test
    void shouldNotSaveOrderWhenPaymentFails() {
        // Given
        CreateOrderCommand command = new CreateOrderCommand(
            new CustomerId("C123"),
            Map.of(new ProductId("P1"), 1)
        );
        
        Product product = new Product("P1", Money.of(10.00));
        when(productRepository.findById(any()))
            .thenReturn(Optional.of(product));
        when(paymentGateway.process(any()))
            .thenReturn(PaymentResult.failure("Card declined"));
        
        // Then
        assertThrows(PaymentFailedException.class, () -> {
            orderService.createOrder(command);
        });
        
        verify(orderRepository, never()).save(any());
    }
}
```

**Characteristics:**
- Mock repositories and external services
- Verify orchestration logic
- Test error handling paths
- Fast execution with no I/O

### 3. Repository Tests (In-Memory or Test DB)
Test data access with in-memory or test database:

```java
// Option 1: In-Memory Repository
class InMemoryOrderRepositoryTest {
    
    private InMemoryOrderRepository repository;
    
    @BeforeEach
    void setUp() {
        repository = new InMemoryOrderRepository();
    }
    
    @Test
    void shouldSaveAndRetrieveOrder() {
        // Given
        Order order = new Order(new CustomerId("C123"));
        order.addItem(new Product("P1", Money.of(10.00)), 2);
        
        // When
        Order saved = repository.save(order);
        Optional<Order> found = repository.findById(saved.getId());
        
        // Then
        assertThat(found).isPresent();
        assertThat(found.get().getTotal()).isEqualTo(Money.of(20.00));
    }
    
    @Test
    void shouldFindOrdersByCustomer() {
        // Given
        CustomerId customer1 = new CustomerId("C1");
        CustomerId customer2 = new CustomerId("C2");
        
        repository.save(new Order(customer1));
        repository.save(new Order(customer1));
        repository.save(new Order(customer2));
        
        // When
        List<Order> customer1Orders = repository.findByCustomer(customer1);
        
        // Then
        assertThat(customer1Orders).hasSize(2);
    }
}
```

```java
// Option 2: Testcontainers with real database
@SpringBootTest
@Testcontainers
class PostgresOrderRepositoryTest {
    
    @Container
    static PostgreSQLContainer<?> postgres = new PostgreSQLContainer<>("postgres:15");
    
    @Autowired
    private OrderRepository orderRepository;
    
    @DynamicPropertySource
    static void configureProperties(DynamicPropertyRegistry registry) {
        registry.add("spring.datasource.url", postgres::getJdbcUrl);
        registry.add("spring.datasource.username", postgres::getUsername);
        registry.add("spring.datasource.password", postgres::getPassword);
    }
    
    @Test
    void shouldPersistOrderWithItems() {
        // Given
        Order order = new Order(new CustomerId("C123"));
        order.addItem(new Product("P1", Money.of(10.00)), 2);
        
        // When
        Order saved = orderRepository.save(order);
        
        // Then
        Order found = orderRepository.findById(saved.getId()).orElseThrow();
        assertThat(found.getItems()).hasSize(1);
        assertThat(found.getTotal()).isEqualTo(Money.of(20.00));
    }
}
```

### 4. Controller/Presentation Tests
Test HTTP concerns with mocked services:

```java
@WebMvcTest(OrderController.class)
class OrderControllerTest {
    
    @Autowired
    private MockMvc mockMvc;
    
    @MockBean
    private OrderService orderService;
    
    @Test
    void shouldCreateOrder() throws Exception {
        // Given
        CreateOrderRequest request = new CreateOrderRequest(
            "C123",
            List.of(new OrderLineRequest("P1", 2))
        );
        
        when(orderService.createOrder(any()))
            .thenReturn(new OrderResult("O123", CONFIRMED));
        
        // When & Then
        mockMvc.perform(post("/api/orders")
                .contentType(MediaType.APPLICATION_JSON)
                .content(asJson(request)))
            .andExpect(status().isCreated())
            .andExpect(jsonPath("$.orderId").value("O123"))
            .andExpect(jsonPath("$.status").value("CONFIRMED"));
    }
    
    @Test
    void shouldReturn400ForInvalidRequest() throws Exception {
        // Given - invalid request (negative quantity)
        String invalidRequest = """
            {
                "customerId": "C123",
                "lines": [{"productId": "P1", "quantity": -1}]
            }
            """;
        
        // When & Then
        mockMvc.perform(post("/api/orders")
                .contentType(MediaType.APPLICATION_JSON)
                .content(invalidRequest))
            .andExpect(status().isBadRequest());
        
        verify(orderService, never()).createOrder(any());
    }
    
    @Test
    void shouldReturn404WhenOrderNotFound() throws Exception {
        // Given
        when(orderService.getOrder(any()))
            .thenThrow(new OrderNotFoundException("O999"));
        
        // When & Then
        mockMvc.perform(get("/api/orders/O999"))
            .andExpect(status().isNotFound());
    }
}
```

## Test Double Strategies

### 1. Mocks (Behavior Verification)
Use when you need to verify interactions:

```java
@Mock
private EventPublisher eventPublisher;

@Test
void shouldPublishEventWhenOrderCreated() {
    // When
    orderService.createOrder(command);
    
    // Then - verify interaction happened
    verify(eventPublisher).publish(any(OrderCreatedEvent.class));
}
```

### 2. Stubs (Fixed Responses)
Use when you need specific return values:

```java
// Manual stub
class FixedPaymentGateway implements PaymentGateway {
    private final PaymentResult result;
    
    FixedPaymentGateway(PaymentResult result) {
        this.result = result;
    }
    
    @Override
    public PaymentResult process(Payment payment) {
        return result;
    }
}

// Usage
PaymentGateway gateway = new FixedPaymentGateway(PaymentResult.success());
```

### 3. Fakes (Working Implementations)
Use for more complex scenarios:

```java
class FakeOrderRepository implements OrderRepository {
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
    
    // ... other methods
}
```

## Test Pyramid for Layered Architecture

```
        /\
       /  \   E2E Tests (few)
      /____\     - Full stack
     /      \    - Slow, comprehensive
    /   /\   \
   /   /  \   \  Integration Tests (some)
  /   /____\   \   - Layer interactions
 /   /      \   \  - Real test DB
/___/        \___\
    \   /\   /
     \ /  \ /   Unit Tests (many)
      /____\      - Individual layers
     /      \     - Fast, isolated
```

**Recommended Ratio:** 70% unit, 20% integration, 10% E2E

## Common Testing Mistakes

### Testing Implementation, Not Behavior
```java
// WRONG: Testing how, not what
@Test
void shouldCallRepositorySave() {
    orderService.createOrder(command);
    
    // Tests implementation detail
    verify(orderRepository).save(orderCaptor.capture());
    assertThat(orderCaptor.getValue().getCustomerId()).isEqualTo("C123");
}

// CORRECT: Testing behavior
@Test
void shouldCreateOrderWithCorrectCustomer() {
    OrderResult result = orderService.createOrder(command);
    
    assertThat(result.getCustomerId()).isEqualTo("C123");
}
```

### Over-Mocking
```java
// WRONG: Mocking everything including value objects
@Mock
private Money money;
@Mock
private CustomerId customerId;

// CORRECT: Use real value objects
Money money = Money.of(10.00);
CustomerId customerId = new CustomerId("C123");
```

### Brittle Tests
```java
// WRONG: Tight coupling to specific calls
verify(repository).findById(eq(123L));
verify(repository, times(1)).save(any());  // Times(1) is default!

// CORRECT: Focus on behavior, not exact calls
Order result = service.getOrder(id);
assertThat(result).isNotNull();
```

## Layer Testing Checklist

### Domain Layer
- [ ] Business rules are tested
- [ ] State transitions are verified
- [ ] Invariants are checked
- [ ] Edge cases are covered
- [ ] No mocks needed (pure logic)

### Application Layer  
- [ ] Use cases are tested
- [ ] Repository interactions are mocked
- [ ] External services are stubbed
- [ ] Events are published correctly
- [ ] Error handling is verified

### Repository Layer
- [ ] CRUD operations work
- [ ] Queries return correct data
- [ ] Mapping is correct
- [ ] Transactions are tested (integration)
- [ ] Edge cases (empty results, duplicates)

### Presentation Layer
- [ ] HTTP status codes are correct
- [ ] Request validation works
- [ ] Response format is correct
- [ ] Error responses are appropriate
- [ ] Authentication/authorization is tested

## FOE Alignment

This method supports **Optimize for Understanding** by:
- Making test failures point to specific layers
- Documenting layer contracts through tests
- Providing executable specifications

It supports **Fast Feedback Loops** through:
- Millisecond-level test execution
- Immediate failure indication
- Parallel test execution

It supports **Confidence Through Evidence** by:
- Comprehensive coverage at each layer
- Deterministic, repeatable tests
- Early detection of integration issues

## References

- Meszaros, G. (2007). *xUnit Test Patterns*. Addison-Wesley.
- Freeman, S., & Pryce, N. (2009). *Growing Object-Oriented Software, Guided by Tests*. Addison-Wesley.
- Fowler, M. (2012). [Test Pyramid](https://martinfowler.com/articles/practical-test-pyramid.html)

## Supporting Evidence

<RelatedObservations />
