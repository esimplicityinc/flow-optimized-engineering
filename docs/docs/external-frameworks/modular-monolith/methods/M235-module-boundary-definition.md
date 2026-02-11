---
methodId: M235
displayed_sidebar: fieldGuideSidebar
sidebar_position: 1
title: Module Boundary Definition
pillar: boundaries
description: Identifying and enforcing internal module boundaries using bounded contexts to create clear ownership and separation of concerns within a monolithic application.
---

# Module Boundary Definition

**Pillar:** Boundaries

Module boundary definition is the foundational practice of Modular Monolith architecture. It establishes clear lines of ownership and responsibility within a codebase, ensuring that each module encapsulates a specific business capability while remaining independent from other modules.

## Definition

> A module boundary defines the scope of a business capability within a monolith, including its data, business logic, and public interface. Boundaries should align with bounded contexts from Domain-Driven Design and be enforced through architectural constraints.

## Why It Matters

Clear module boundaries provide several critical benefits:

- **Cognitive Load Reduction**: Developers can focus on one module without understanding the entire system
- **Parallel Development**: Teams can work independently on different modules
- **Easier Testing**: Modules can be tested in isolation
- **Evolution Path**: Well-defined boundaries make future service extraction possible
- **Prevents "Big Ball of Mud"**: Enforced boundaries prevent the codebase from degenerating into spaghetti code

## How to Apply

### Step 1: Identify Bounded Contexts

Use Domain-Driven Design techniques to identify natural business boundaries:

1. **Event Storming**: Run collaborative sessions with domain experts to identify business events and group them into contexts
2. **Context Mapping**: Document relationships between contexts (partnerships, shared kernels, customer-supplier)
3. **Ubiquitous Language**: Ensure each context has its own language—the same term may mean different things in different contexts

**Example**: In an e-commerce system:
- Catalog (products, categories, inventory)
- Pricing (pricing rules, discounts, promotions)
- Orders (order lifecycle, fulfillment)
- Payments (payment processing, refunds)
- Shipping (delivery options, tracking)

### Step 2: Define Physical Boundaries

Translate logical boundaries into physical code structure:

```
src/
├── modules/
│   ├── catalog/
│   │   ├── application/      # Use cases, commands, queries
│   │   ├── domain/           # Entities, value objects, domain services
│   │   ├── infrastructure/   # Repositories, external services
│   │   └── api/              # Public interface (controllers, DTOs)
│   ├── pricing/
│   │   └── ...
│   ├── orders/
│   │   └── ...
│   └── payments/
│       └── ...
└── shared/                   # Minimal, carefully controlled
    └── kernel/               # Only if truly shared
```

### Step 3: Enforce Boundaries Through Architecture

Use architectural fitness functions to prevent boundary violations:

**Compile-Time Enforcement** (Recommended):
```java
// ArchUnit example - prevent cross-module dependencies
@ArchTest
static final ArchRule modules_should_not_depend_on_each_other =
    noClasses()
        .that()
        .resideInAPackage("..catalog..")
        .should()
        .dependOnClassesThat()
        .resideInAPackage("..pricing..");
```

**Package Structure Enforcement**:
```xml
<!-- Maven module structure -->
<modules>
    <module>catalog</module>
    <module>pricing</module>
    <module>orders</module>
</modules>
```

### Step 4: Define Module Interfaces

Each module exposes a minimal, well-defined interface:

```typescript
// catalog/public-api.ts
// Only these exports are accessible to other modules
export { CatalogService } from './application/catalog.service';
export { ProductDTO } from './api/dtos/product.dto';
export { ProductNotFoundError } from './domain/errors';

// Everything else remains module-private
```

### Step 5: Implement Data Ownership

Each module owns its data completely:

- **Separate Database Schemas** (M239): Each module has its own schema
- **No Direct Table Access**: Other modules access data through APIs
- **Internal Data Structures**: Modules can change internal schemas without impacting others

## When to Use

**Use this method when:**
- Starting a new modular monolith
- Refactoring an existing monolith
- Adding new business capabilities
- Merging microservices back into a monolith

**Signs you need better boundaries:**
- Changes in one area require changes everywhere
- Developers need to understand the whole system to make changes
- Database changes break multiple features
- Testing requires full system setup

## Common Mistakes

### 1. **Shared Database Tables**
Having multiple modules write to the same table creates hidden coupling. If Module A and Module B both modify the `orders` table, neither can evolve independently.

**Solution**: Each module owns its tables exclusively. Use integration patterns (M238) for cross-module data needs.

### 2. **Shared Libraries with Business Logic**
A `common` or `shared` module that contains business logic becomes a coupling magnet.

**Solution**: Share only technical infrastructure (logging, HTTP clients). Keep business logic within module boundaries.

### 3. **Leaky Abstractions**
Exposing internal implementation details through the public API.

**Solution**: Use anti-corruption layers. Transform internal models to public DTOs.

### 4. **Premature Modularity**
Creating modules before understanding the domain leads to wrong boundaries that are costly to change.

**Solution**: Start with coarse-grained modules and refine as domain understanding improves.

### 5. **Ignoring Temporal Coupling**
Modules that must be updated in lockstep aren't truly independent.

**Solution**: Use domain events (M238) to decouple temporal dependencies.

## Case Study: Shopify's Modular Monolith

Shopify faced the challenge of scaling their Ruby on Rails monolith as they grew from a small team to hundreds of developers. Their solution illustrates boundary definition at scale:

### The Problem
- 3M+ lines of Ruby code
- Hundreds of engineers committing daily
- Full system knowledge became impossible
- Changes in one area caused regressions in seemingly unrelated areas

### The Solution: Componentization

Shopify divided their monolith into **components**—effectively modules with strict boundaries:

```
components/
├── checkout/
├── orders/
├── products/
├── customers/
├── inventory/
└── payments/
```

Each component:
- Has its own directory structure
- Owns its database tables
- Exposes a public API
- Cannot access other components' internals

### Boundary Enforcement

Shopify uses automated checks to enforce boundaries:

```ruby
# Example of their component enforcement
class ComponentDependencyTest < Minitest::Test
  def test_no_unauthorized_dependencies
    # Ensures components only use public APIs of other components
    # Violations fail the build
  end
end
```

### Results

- **Parallel development**: Teams work independently on components
- **Faster CI**: Component tests run in isolation
- **Safer deploys**: Changes are isolated to components
- **Clear ownership**: Each component has a dedicated team

Shopify deliberately kept components in-process, demonstrating that distribution isn't required for scalability.

## FOE Alignment

This method strongly supports the FOE principle of **Understanding**:

- **Bounded contexts match mental models**: Developers can reason about one module without understanding everything
- **Explicit boundaries make dependencies visible**: You can see and control what depends on what
- **Clear ownership reduces cognitive load**: "This is the pricing module—everything pricing-related lives here"
- **Enforced architecture prevents drift**: Automated checks prevent the "broken windows" effect

## References

- [Kamil Grzybek - How to define module boundaries](https://github.com/kgrzybek/modular-monolith-with-ddd#boundaries)
- [Shopify - Deconstructing the Monolith](https://shopify.engineering/deconstructing-monolith-designing-software-maximizes-developer-productivity)
- [Vaughn Vernon - Implementing Domain-Driven Design](https://www.amazon.com/Implementing-Domain-Driven-Design-Vaughn-Vernon/dp/0321834577)
- [Simon Brown - Software Architecture for Developers](https://softwarearchitecturefordevelopers.com/)
