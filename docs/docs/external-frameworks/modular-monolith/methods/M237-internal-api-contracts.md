---
methodId: M237
displayed_sidebar: fieldGuideSidebar
sidebar_position: 3
title: Internal API Contracts
pillar: modularity
description: Defining clear, stable interfaces between modules to enable independent evolution while maintaining loose coupling and high cohesion.
---

# Internal API Contracts

**Pillar:** Modularity

Internal API contracts establish the rules of engagement between modules in a modular monolith. While modules live in the same process, treating their interactions as formal APIs ensures loose coupling and enables independent evolution—whether those modules stay in-process or eventually become distributed services.

## Definition

> An internal API contract is a formal specification of how modules communicate, including the operations available, data structures exchanged, error handling, versioning policy, and non-functional characteristics like performance SLAs.

## Why It Matters

Without explicit contracts, module interactions devolve into tight coupling:

```python
# Bad: Direct database access across modules
# Orders module directly queries Catalog tables
def create_order(product_id):
    product = db.query("SELECT * FROM catalog.products WHERE id = ?", product_id)
    # Orders now depends on Catalog's internal schema
```

With contracts, dependencies are explicit and manageable:

```python
# Good: Contract-based interaction
# Orders uses Catalog's public API
def create_order(product_id):
    product = catalog_api.get_product(product_id)  # Contract-defined
    # Orders depends only on the API contract
```

## Principles of Good Internal APIs

### 1. **Explicit Over Implicit**

Every interaction should be through a declared interface:

```typescript
// catalog/public-api.ts
// Explicitly exported API
export interface CatalogAPI {
  getProduct(id: ProductId): Promise<ProductDTO>;
  searchProducts(query: SearchQuery): Promise<ProductList>;
  checkAvailability(id: ProductId, quantity: number): Promise<boolean>;
}

// Internal implementation - NOT exported
class CatalogService implements CatalogAPI { ... }
```

### 2. **Stable Over Changing**

APIs should evolve without breaking consumers:

- **Additive changes only** (new fields, new endpoints)
- **Deprecation cycles** before removal
- **Versioning strategy** for incompatible changes

### 3. **Minimal Surface Area**

Expose only what's necessary:

```typescript
// Good: Minimal API
export { 
  ProductDTO,           // Data transfer object
  ProductNotFoundError, // Domain error
  CatalogService        // Service interface
};

// Bad: Exposing internals
export * from './domain/entities';      // Internal entities
export * from './infrastructure';       // Repository details
export * from './application/mappers';  // Internal mappers
```

### 4. **Consumer-Aware Design**

Design APIs for their consumers:

```typescript
// Bad: API exposes internal optimization
interface ProductQuery {
  joinTables: string[];  // Consumer shouldn't know about joins
  useCache: boolean;     // Implementation detail
}

// Good: API designed for use case
interface ProductSearchRequest {
  category?: string;
  priceRange?: { min: number; max: number };
  inStock?: boolean;
}
```

## Designing Internal APIs

### Step 1: Identify Use Cases

Map what consumers need to do:

```
Orders Module needs from Catalog:
- Get product details by ID
- Check if product is available
- Get pricing information
- Subscribe to product updates

Catalog does NOT expose:
- Direct database access
- Inventory management details
- Supplier information
```

### Step 2: Define Operations

For each use case, define an operation:

```yaml
# API Contract Specification (OpenAPI style)
operations:
  getProduct:
    description: Retrieve product details
    input:
      productId: UUID
    output:
      product: ProductDTO
      or: ProductNotFoundError
    sla:
      p99_latency: 50ms
      availability: 99.9%
  
  checkAvailability:
    description: Check stock availability
    input:
      productId: UUID
      quantity: integer
    output:
      available: boolean
      estimatedDelivery: date (optional)
```

### Step 3: Define Data Structures

DTOs should be designed for the API, not internal entities:

```typescript
// Internal entity - rich behavior, complex relationships
class Product {
  private variants: ProductVariant[];
  private suppliers: Supplier[];
  private pricingHistory: PricingEvent[];
  
  calculatePrice(context: PricingContext): Money { ... }
  applyDiscount(discount: Discount): void { ... }
}

// API DTO - flat, serializable, consumer-focused
interface ProductDTO {
  id: string;
  name: string;
  description: string;
  currentPrice: MoneyDTO;
  category: CategoryDTO;
  available: boolean;
  // No variants, suppliers, or pricing history
  // Consumers get what they need, not internal structure
}
```

### Step 4: Handle Errors

Define a consistent error model:

```typescript
// Base error type for module APIs
abstract class ModuleError extends Error {
  abstract code: string;
  abstract retryable: boolean;
  
  toDTO(): ErrorDTO {
    return {
      code: this.code,
      message: this.message,
      retryable: this.retryable
    };
  }
}

// Specific errors
class ProductNotFoundError extends ModuleError {
  code = 'CATALOG_PRODUCT_NOT_FOUND';
  retryable = false;
}

class PricingCalculationError extends ModuleError {
  code = 'CATALOG_PRICING_ERROR';
  retryable = true;
}
```

## API Implementation Patterns

### Synchronous (Direct Method Calls)

For in-process modules, APIs are often interface implementations:

```typescript
// In-process API implementation
class CatalogModuleAPI implements CatalogAPI {
  constructor(
    private productService: ProductService,
    private pricingService: PricingService
  ) {}
  
  async getProduct(id: ProductId): Promise<ProductDTO> {
    const product = await this.productService.findById(id);
    if (!product) throw new ProductNotFoundError(id);
    
    const price = await this.pricingService.getCurrentPrice(product);
    return this.mapToDTO(product, price);
  }
}

// Registration in DI container
container.register<CatalogAPI>(CatalogModuleAPI);
```

### Asynchronous (Events)

For loose coupling, use domain events:

```typescript
// Pricing publishes event
class PriceChangedEvent {
  constructor(
    public readonly productId: string,
    public readonly oldPrice: Money,
    public readonly newPrice: Money,
    public readonly effectiveDate: Date
  ) {}
}

// Catalog subscribes
class CatalogEventHandlers {
  @EventHandler(PriceChangedEvent)
  async onPriceChanged(event: PriceChangedEvent): Promise<void> {
    await this.updateProductPrice(event.productId, event.newPrice);
  }
}
```

## Versioning Strategy

Even internal APIs need versioning when you have multiple teams:

### Semantic Versioning for APIs

```
MAJOR.MINOR.PATCH

MAJOR: Breaking changes (consumer code must change)
MINOR: New features (backward compatible)
PATCH: Bug fixes (transparent)
```

### Breaking Change Process

1. **Introduce v2 alongside v1**
   ```typescript
   interface CatalogAPI {
     // v1 - deprecated
     getProduct(id: string): Promise<ProductDTO>;
     
     // v2 - new
     getProductV2(id: ProductId): Promise<ProductDTOV2>;
   }
   ```

2. **Migration period** (typically 2-4 sprints)
   - Update consumers gradually
   - Monitor v1 usage

3. **Deprecation warnings**
   ```typescript
   async getProduct(id: string): Promise<ProductDTO> {
     this.logger.warn('DEPRECATED: getProduct v1 will be removed in v3.0');
     // ... implementation
   }
   ```

4. **Removal in next major version**

## Contract Testing

Verify that APIs meet their contracts:

```typescript
// Consumer contract test (in Orders module)
describe('Catalog API Contract', () => {
  it('should return product for valid ID', async () => {
    const product = await catalogAPI.getProduct('valid-id');
    
    expect(product).toHaveProperty('id');
    expect(product).toHaveProperty('name');
    expect(product).toHaveProperty('currentPrice');
  });
  
  it('should throw ProductNotFoundError for invalid ID', async () => {
    await expect(catalogAPI.getProduct('invalid'))
      .rejects.toBeInstanceOf(ProductNotFoundError);
  });
  
  it('should complete within 50ms (p99)', async () => {
    const latencies = await measureMultiple(async () => {
      await catalogAPI.getProduct('test-id');
    }, 100);
    
    expect(percentile(latencies, 99)).toBeLessThan(50);
  });
});
```

## When to Use

**Always use API contracts for:**
- Inter-module communication
- Module boundaries (M235)
- Any code that might be extracted to services
- Cross-team boundaries

**Particularly important when:**
- Multiple teams work on different modules
- Planning eventual service extraction (M236)
- Modules have different deployment frequencies
- Integration testing is expensive

## Common Mistakes

### 1. **Exposing Internal Models**
Returning internal entities instead of DTOs:

```python
# Bad: Exposing internal model
class CatalogService:
    def get_product(self, id: str) -> Product:  # Internal entity
        return self.product_repository.find(id)
```

**Solution**: Map to DTOs at the API boundary.

### 2. **Chatty APIs**
Multiple small calls instead of batch operations:

```python
# Bad: N+1 queries across module boundary
for item in order.items:
    product = catalog.get_product(item.product_id)  # Network/process hop each time
```

**Solution**: Design for batch operations:
```python
# Good: Batch fetch
products = catalog.get_products([item.product_id for item in order.items])
```

### 3. **No Error Contracts**
Throwing generic exceptions that consumers can't handle:

```python
# Bad: Generic error
raise Exception("Something went wrong")
```

**Solution**: Specific, typed errors:
```python
raise ProductNotFoundError(product_id)
raise InsufficientStockError(product_id, requested, available)
```

### 4. **Ignoring Performance**
Not setting or meeting SLAs:

**Solution**: Define and test performance characteristics:
- P50, P95, P99 latency targets
- Throughput requirements
- Error rate budgets

### 5. **Tight Coupling via Events**
Events that expose internal state changes:

```typescript
// Bad: Event exposes internal implementation
class DatabaseRowUpdatedEvent {
  table: 'products';
  rowId: string;
  columnChanges: Record<string, any>;  // Raw DB changes
}
```

**Solution**: Domain events that express business meaning:
```typescript
// Good: Business event
class ProductPriceChangedEvent {
  productId: string;
  oldPrice: Money;
  newPrice: Money;
  reason: 'scheduled_update' | 'promotion' | 'cost_change';
}
```

## FOE Alignment

This method supports all three FOE principles:

### Understanding
- **Explicit contracts** make dependencies visible
- **Clear interfaces** document how modules interact
- **Versioning** communicates change impact

### Fast Feedback
- **Contract tests** catch integration issues early
- **Compilation-time validation** of API usage
- **IDE support** through typed interfaces

### Confidence
- **Stable contracts** mean changes are safer
- **Clear error handling** makes failures predictable
- **Versioning** provides upgrade confidence

## References

- [Kamil Grzybek - API Contracts in Modular Monolith](https://github.com/kgrzybek/modular-monolith-with-ddd#contracts)
- [Martin Fowler - Public vs Published Interfaces](https://martinfowler.com/bliki/PublishedInterface.html)
- [Semantic Versioning](https://semver.org/)
- [API Design Patterns](https://www.amazon.com/API-Design-Patterns-JJ-Geewax/dp/161729585X)
- [Consumer-Driven Contracts](https://martinfowler.com/articles/consumerDrivenContracts.html)
