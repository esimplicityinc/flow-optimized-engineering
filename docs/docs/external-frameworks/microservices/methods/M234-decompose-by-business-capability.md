---
methodId: M234
displayed_sidebar: fieldGuideSidebar
sidebar_position: 12
title: Decompose by Business Capability
description: Identifies microservice boundaries by aligning with business capabilities and domains, ensuring services are cohesive, loosely coupled, and aligned with organizational structure.
framework: microservices
framework_url: https://microservices.io/patterns/decomposition/decompose-by-business-capability.html
foe_alignment:
  primary: Understanding
  secondary: Confidence
status: industry-standard
pillar: foundational-patterns
---

# Decompose by Business Capability

**Pillar:** Foundational Patterns

Decompose by Business Capability is the primary strategy for identifying microservice boundaries. Instead of decomposing by technical layers (frontend, backend, database) or features, services are organized around business capabilities—the things an organization does to generate value. This aligns software architecture with business architecture, creating services that match how the business operates.

## Definition

> "A business capability is something a business does to generate value. Examples include sales, marketing, inventory management, and customer support. A business capability often corresponds to a business object, e.g., sales corresponds to orders, inventory management corresponds to inventory."
> — Chris Richardson, Microservices Patterns

## Why It Matters

Incorrect service boundaries create problems:

**Decomposing by Technical Layer:**
```
❌ WRONG: Layer-based decomposition
┌─────────────────────────────────────┐
│           UI Layer                  │  ← "Frontend Team"
│   (all services share)              │
├─────────────────────────────────────┤
│         Business Logic              │  ← "Backend Team"
│   (all services share)              │
├─────────────────────────────────────┤
│         Data Layer                  │  ← "DBA Team"
│   (shared database)                 │
└─────────────────────────────────────┘

Problems:
- Tight coupling through shared database
- Changes require coordinating all teams
- No clear ownership boundaries
- Can't deploy services independently
```

**Decomposing by Business Capability:**
```
✅ RIGHT: Capability-based decomposition
┌───────────┐ ┌───────────┐ ┌───────────┐ ┌───────────┐
│   Order   │ │  Product  │ │  Customer │ │ Inventory │
│  Service  │ │  Service  │ │  Service  │ │  Service  │
│  (Orders) │ │ (Catalog) │ │  (Users)  │ │ (Stock)   │
├───────────┤ ├───────────┤ ├───────────┤ ├───────────┤
│ Order DB  │ │ Product DB│ │ Customer  │ │ Inventory │
│           │ │           │ │    DB     │ │    DB     │
└───────────┘ └───────────┘ └───────────┘ └───────────┘
    Order        Product       Customer     Inventory
     Team         Team          Team         Team

Benefits:
- Loose coupling through APIs
- Independent deployment
- Clear ownership (Conway's Law)
- Teams aligned to business domains
```

## Identifying Business Capabilities

### Capability Mapping Process

1. **Understand the Business Model**
   - What does the business do?
   - What are the core value streams?
   - Who are the stakeholders?

2. **Identify Top-Level Capabilities**
   - List major business functions
   - Group related activities
   - Look for natural boundaries

3. **Decompose into Sub-Capabilities**
   - Break coarse capabilities into finer ones
   - Identify common patterns
   - Validate with domain experts

4. **Map to Services**
   - Each capability becomes a service candidate
   - Evaluate coupling and cohesion
   - Apply bounded context analysis (DDD)

### Example: E-Commerce Capabilities

```
Business Capabilities:
├── Sales
│   ├── Order Management
│   ├── Pricing
│   └── Promotion
├── Product Management
│   ├── Catalog
│   ├── Inventory
│   └── Product Information
├── Customer Management
│   ├── Customer Profile
│   ├── Authentication
│   └── Preferences
├── Fulfillment
│   ├── Shipping
│   ├── Delivery Tracking
│   └── Returns
├── Marketing
│   ├── Campaigns
│   ├── Recommendations
│   └── Reviews
└── Finance
    ├── Payment Processing
    ├── Invoicing
    └── Refunds

Service Boundaries:
┌──────────────┬──────────────┬──────────────┬──────────────┐
│   Order      │   Product    │   Customer   │   Payment    │
│   Service    │   Service    │   Service    │   Service    │
├──────────────┼──────────────┼──────────────┼──────────────┤
│ • Create     │ • Catalog    │ • Profile    │ • Process    │
│   orders     │ • Search     │ • Auth       │   payment    │
│ • Pricing    │ • Inventory  │ • Preferences│ • Refund     │
│ • Promotions │ • Details    │ • History    │ • Fraud check│
└──────────────┴──────────────┴──────────────┴──────────────┘
```

## Capability vs Subdomain

Business capabilities closely align with Domain-Driven Design subdomains:

| Business Capability | DDD Subdomain | Service |
|---------------------|---------------|---------|
| Order Management | Core Domain | Order Service |
| Customer Profile | Core Domain | Customer Service |
| Product Catalog | Core Domain | Product Service |
| Authentication | Generic Subdomain | Auth Service |
| Payment Processing | Supporting | Payment Service |
| Email Notifications | Generic | Notification Service |

**Key differences:**
- **Business Capability** - What the business does (business-centric)
- **Subdomain** - Area of domain expertise (modeling-centric)
- **Service** - Software implementation of both

## Service Boundary Heuristics

### Good Boundaries

✅ **Single Responsibility**
```
Order Service: Manages order lifecycle
- Create order
- Update status
- Cancel order
- Query order history

NOT responsible for:
- Payment processing (Payment Service)
- Inventory (Product Service)
- Shipping (Fulfillment Service)
```

✅ **Independent Deployability**
```
Can deploy Order Service without:
- Deploying Product Service
- Deploying Customer Service
- Deploying Payment Service

Changes to pricing don't require Order Service deployment
```

✅ **Loose Coupling**
```
Order Service communicates via:
- Async events: "OrderCreated" → other services react
- Sync APIs: Call Payment Service for processing

NOT coupled via:
- Shared database tables
- Shared code libraries
- Direct database access
```

### Bad Boundaries

❌ **Chatty Services**
```
WRONG: Order Service calls Product Service for every field
Order → Product API × 10 fields = 10 calls

RIGHT: Product Service provides aggregated data
Order → Product API × 1 = 1 call with all needed data
```

❌ **Distributed Monolith**
```
WRONG: Changes require deploying 5 services together
- Schema changes cascade through all services
- Tight coupling through shared libraries
- Database changes require coordination

RIGHT: Services evolve independently
- Backward compatible APIs
- Shared nothing architecture
- Database per service
```

❌ **Wrong Granularity**
```
TOO FINE: Every entity is a service
- Order Service, OrderLine Service, OrderStatus Service
- Excessive network overhead
- Distributed transaction hell

TOO COARSE: One service does everything
- "ECommerce Service" with 500 endpoints
- Becomes the new monolith
- No independent scaling
```

## Conway's Law Alignment

Conway's Law states:
> "Organizations which design systems are constrained to produce designs which are copies of the communication structures of these organizations."

**Implications:**
- Service boundaries should align with team structures
- Services should match organizational capabilities
- Team ownership drives service boundaries

### Team Topologies Integration

Align services with Team Topologies team types:

| Team Type | Service Ownership | Scope |
|-----------|------------------|-------|
| **Stream-aligned** | 1-3 related capabilities | End-to-end value stream |
| **Platform** | Platform capabilities | Infrastructure, APIs |
| **Enabling** | Transitional | Helps extract services |
| **Complicated Subsystem** | Complex domains | Specialized expertise |

## Practical Decomposition Steps

### 1. Event Storming

Use Event Storming to discover capabilities:

```
Workshop Output:
┌──────────────────────────────────────────────────────┐
│  Domain Events (Orange sticky notes)                 │
│  • OrderCreated  • PaymentProcessed  • ItemShipped  │
│  • UserRegistered • ProductAdded • InventoryUpdated │
├──────────────────────────────────────────────────────┤
│  Commands (Blue)          │  Aggregates (Yellow)    │
│  • Create Order           │  • Order                │
│  • Process Payment        │  • Payment              │
│  • Register User          │  • User                 │
├──────────────────────────────────────────────────────┤
│  Policies (Purple)        │  External Systems (Pink)│
│  • When order created,    │  • Payment Gateway      │
│    reserve inventory      │  • Shipping Provider    │
└──────────────────────────────────────────────────────┘

Result: Natural groupings emerge as service boundaries
```

### 2. Bounded Context Analysis

Map Event Storming output to bounded contexts:

| Events | Commands | Aggregate | Bounded Context |
|--------|----------|-----------|-----------------|
| OrderCreated, OrderCancelled | CreateOrder, CancelOrder | Order | Order Management |
| PaymentProcessed, PaymentFailed | ProcessPayment | Payment | Payment Processing |
| UserRegistered, UserUpdated | RegisterUser, UpdateProfile | User | Customer Management |

### 3. Context Mapping

Define relationships between contexts:

```
Order Management ──[Customer-Supplier]──▶ Payment Processing
       │                                         ▲
       │[Partnership]                            │
       ▼                                         │
Inventory Management ──[Conformist]──────────────┘
```

Relationship types:
- **Partnership** - Teams collaborate on integration
- **Customer-Supplier** - Upstream prioritizes downstream needs
- **Conformist** - Downstream conforms to upstream model
- **Anti-Corruption Layer** - Downstream translates upstream model

## FOE Alignment

**Primary: Optimize for Understanding**

Decomposing by business capability creates services that mirror how the business actually works. This alignment means:
- Domain experts understand service boundaries intuitively
- New developers learn the business by learning the architecture
- Service names and responsibilities match business language
- Mental models align between code and business

**Secondary: Confidence to Act**

When services align with business capabilities and team structures, ownership is clear. Teams can confidently make changes within their domain without extensive coordination. The Conway's Law alignment ensures that the architecture supports rather than hinders organizational flow.

## Migration Strategy

### From Monolith to Services

```
Phase 1: Identify boundaries (Event Storming)
Monolith ──[Analysis]──▶ Capability Map

Phase 2: Extract first service (low risk)
Monolith + Order Service (via Strangler Fig)

Phase 3: Incremental extraction
Monolith + Order Service + Customer Service

Phase 4: Continue until monolith retired
Order + Customer + Product + Payment + ... Services
```

### Prioritization Criteria

Extract services in this order:

1. **High-value, low-risk** - Start here
   - Clear boundaries
   - Independent of complex dependencies
   - High deployment pain in monolith

2. **Platform capabilities** - Enable other services
   - Authentication
   - Notifications
   - Audit logging

3. **Core domain** - Business differentiation
   - Order processing
   - Pricing engine
   - Recommendations

4. **Complex integrations** - Last
   - Payment processing
   - External APIs
   - Legacy system integration

## Benefits

- ✅ **Business alignment** - Architecture mirrors business structure
- ✅ **Team autonomy** - Services match team responsibilities
- ✅ **Loose coupling** - Boundaries follow natural business seams
- ✅ **Clear ownership** - Each service has clear business owner
- ✅ **Evolutionary** - Business changes drive service evolution
- ✅ **Organizational scaling** - Add teams by adding capabilities

## Trade-offs

- ⚠️ **Requires domain knowledge** - Need to understand business deeply
- ⚠️ **Organizational constraints** - May conflict with existing structures
- ⚠️ **Boundary disputes** - Capabilities can overlap
- ⚠️ **Analysis paralysis** - Can spend too long on perfect boundaries

## Anti-Patterns

### ❌ Entity Services

```
WRONG: CRUD services for each entity
- Order Service (just CRUD)
- OrderLine Service (just CRUD)
- OrderStatus Service (just CRUD)

These are database tables, not services!
```

### ❌ Shared Libraries for Domain Logic

```
WRONG: Shared "Order Domain" library
- Order Service and Payment Service both use Order library
- Changes require updating both services
- Coupling through shared code

RIGHT: Each service owns its domain model
- Order Service has Order aggregate
- Payment Service has Payment aggregate
- Integration through APIs, not shared libraries
```

### ❌ Premature Decomposition

```
WRONG: Extract 50 microservices from day one
- Team of 5 people
- 50 services to deploy
- Operational nightmare

RIGHT: Start with monolith, extract as needed
- Monolith with clear module boundaries
- Extract services when pain emerges
- Grow services with team growth
```

## Case Studies

### Amazon

- Decomposed by business capability (retail, AWS, devices)
- Two-pizza teams own services end-to-end
- Each service has clear business metric ownership
- Organizational structure enables service ownership

### Netflix

- Started with DVD-by-mail monolith
- Decomposed by capability as streaming grew
- Playback, Content Delivery, Recommendations as separate services
- Team organization follows service boundaries

### Spotify

- Squads aligned to business capabilities
- Features, Monetization, Platform as high-level capabilities
- Services map to squad responsibilities
- Enables autonomous squad operation

## References

- Richardson, C. (2018). *Microservices Patterns*. Chapter 2: Decomposition Strategies.
- Newman, S. (2021). *Building Microservices* (2nd ed.). Chapter 3: Splitting the Monolith.
- Conway, M. E. (1968). "How Do Committees Invent?" *Datamation*.
- Evans, E. (2003). *Domain-Driven Design*. Addison-Wesley.
- Vernon, V. (2016). *Domain-Driven Design Distilled*. Addison-Wesley.
- [Decompose by Business Capability - microservices.io](https://microservices.io/patterns/decomposition/decompose-by-business-capability.html)
- [Event Storming - Alberto Brandolini](https://www.eventstorming.com/)
- Skelton, M., & Pais, M. (2019). *Team Topologies*. IT Revolution Press.
