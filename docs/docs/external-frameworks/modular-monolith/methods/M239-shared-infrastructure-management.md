---
methodId: M239
displayed_sidebar: fieldGuideSidebar
sidebar_position: 5
title: Shared Infrastructure Management
pillar: boundaries
description: Managing database schemas, dependencies, and shared resources to maintain module isolation while avoiding unnecessary duplication and operational complexity.
---

# Shared Infrastructure Management

**Pillar:** Boundaries

Shared infrastructure management addresses the tension between module isolation and operational efficiency. While modules should own their data and minimize shared dependencies, some infrastructure must be shared—requiring careful management to preserve modularity benefits without creating operational nightmares.

## Definition

> Shared infrastructure management is the practice of providing common technical capabilities (databases, message brokers, caching) to multiple modules while enforcing boundaries that prevent coupling, including database schema separation, dependency management, and resource isolation.

## The Database Question

The most critical infrastructure decision: how many databases?

### Option 1: Database Per Module (Full Isolation)

Each module has its own database instance.

```
[Catalog Module] ───> [Catalog Database]
[Orders Module]  ───> [Orders Database]
[Payment Module] ───> [Payment Database]
```

**Pros:**
- Maximum isolation
- Independent scaling
- Technology choice per module (PostgreSQL, MongoDB, etc.)
- Easiest extraction to services (M236)

**Cons:**
- Operational complexity (backups, monitoring, patching × N)
- Cross-module queries require APIs
- Higher cost (N database instances)
- Distributed transactions for operations spanning modules

### Option 2: Shared Database, Separate Schemas

One database server, isolated schemas per module.

```
[Catalog Module] ───> [Database Server]
                         ├── catalog schema
[Orders Module]  ───>    ├── orders schema
[Payment Module] ───>    └── payment schema
```

**Pros:**
- Operational simplicity (one server to manage)
- Schema-level isolation
- Can still enforce access controls
- Easier cross-schema queries (if absolutely necessary)

**Cons:**
- Shared failure domain (database server is single point of failure)
- Resource contention possible
- Technology locked to single choice
- Risk of schema violations if not enforced

### Option 3: Shared Schema (Anti-pattern for Modularity)

All modules share tables in a single schema.

```
[Catalog Module] ─┐
[Orders Module]  ─┼──> [Database] → shared tables
[Payment Module] ─┘
```

**This breaks modularity**—don't do this unless you have a very specific reason.

## Recommended Approach: Separate Schemas, Shared Server

For most modular monoliths, the sweet spot is:

- **One database server** per environment (dev, staging, prod)
- **Separate schemas** per module
- **Strict access controls** preventing cross-schema access
- **Shared infrastructure** for operational concerns (connection pooling, migrations)

## Schema Separation Implementation

### Physical Structure

```sql
-- PostgreSQL example
create schema catalog;
create schema orders;
create schema payment;

-- Catalog module tables
create table catalog.products (
    id uuid primary key,
    sku varchar(50) unique not null,
    name varchar(255) not null,
    description text,
    created_at timestamp default now()
);

create table catalog.categories (
    id uuid primary key,
    name varchar(100) not null
);

-- Orders module tables
create table orders.orders (
    id uuid primary key,
    customer_id uuid not null,
    status varchar(20) not null,
    total_amount decimal(10,2) not null,
    placed_at timestamp default now()
);

create table orders.order_items (
    id uuid primary key,
    order_id uuid references orders.orders(id),
    product_id uuid not null,  -- References catalog.products but NO FK constraint
    quantity integer not null,
    unit_price decimal(10,2) not null
);

-- Payment module tables
create table payment.transactions (
    id uuid primary key,
    order_id uuid not null,  -- References orders.orders but NO FK constraint
    amount decimal(10,2) not null,
    status varchar(20) not null,
    processed_at timestamp
);
```

### No Cross-Schema Foreign Keys

Notice the absence of foreign key constraints across schemas:

```sql
-- BAD: Creates coupling between modules
alter table orders.order_items
    add constraint fk_product
    foreign key (product_id) references catalog.products(id);

-- GOOD: No FK, referential integrity through domain logic
-- Orders module validates product existence via Catalog API (M237)
```

**Why no cross-schema FKs?**

1. **Coupling**: Changes in one module affect another
2. **Locking contention**: Long transactions in one module block others
3. **Extraction blocker**: Can't extract to services with cross-database FKs
4. **Cascading deletes**: Unexpected data loss across modules

### Enforcing Schema Boundaries

Use database permissions to prevent unauthorized access:

```sql
-- Create module-specific database users
create user catalog_user with password '...';
create user orders_user with password '...';
create user payment_user with password '...';

-- Grant access only to respective schemas
grant usage on schema catalog to catalog_user;
grant all privileges on all tables in schema catalog to catalog_user;

grant usage on schema orders to orders_user;
grant all privileges on all tables in schema orders to orders_user;

grant usage on schema payment to payment_user;
grant all privileges on all tables in schema payment to payment_user;

-- Explicitly revoke cross-schema access
revoke all on schema catalog from orders_user;
revoke all on schema orders from catalog_user;
```

## Migration Management

Each module manages its own schema migrations independently.

### Directory Structure

```
database/
├── migrations/
│   ├── catalog/
│   │   ├── V001__create_products_table.sql
│   │   ├── V002__add_product_variants.sql
│   │   └── V003__create_product_indexes.sql
│   ├── orders/
│   │   ├── V001__create_orders_table.sql
│   │   ├── V002__add_order_status.sql
│   │   └── V003__create_order_indexes.sql
│   └── payment/
│       ├── V001__create_transactions_table.sql
│       └── V002__add_payment_methods.sql
└── scripts/
    ├── migrate-catalog.sh
    ├── migrate-orders.sh
    └── migrate-payment.sh
```

### Migration Tools

Use tools that support schema-qualified migrations:

**Flyway Example:**
```properties
# catalog-migrations.conf
flyway.url=jdbc:postgresql://localhost:5432/app
db
defaultSchema=catalog
flyway.schemas=catalog
flyway.locations=filesystem:database/migrations/catalog
```

**Liquibase Example:**
```yaml
# liquibase-catalog.yml
databaseChangeLog:
  - changeSet:
      id: 1
      author: team-catalog
      changes:
        - createTable:
            schemaName: catalog
            tableName: products
            columns:
              - column:
                  name: id
                  type: uuid
                  constraints:
                    primaryKey: true
```

### Migration Independence

Each module's migrations run independently:

```bash
# Can deploy Catalog migrations without Orders
./migrate-catalog.sh

# Orders migrations run separately
./migrate-orders.sh
```

**Benefits:**
- Independent deployment of schema changes
- Faster migrations (smaller scope)
- Rollback isolation
- Clear ownership

## Connection Pooling

Even with schema separation, modules can share connection pools for efficiency.

### Separate Pools Per Module (Recommended)

```yaml
# application.yml
datasource:
  catalog:
    jdbcUrl: jdbc:postgresql://localhost:5432/appdb?currentSchema=catalog
    username: catalog_user
    password: ${CATALOG_DB_PASSWORD}
    maximumPoolSize: 10
    
  orders:
    jdbcUrl: jdbc:postgresql://localhost:5432/appdb?currentSchema=orders
    username: orders_user
    password: ${ORDERS_DB_PASSWORD}
    maximumPoolSize: 15  # Different pool size for different needs
    
  payment:
    jdbcUrl: jdbc:postgresql://localhost:5432/appdb?currentSchema=payment
    username: payment_user
    password: ${PAYMENT_DB_PASSWORD}
    maximumPoolSize: 5   # Payment is less connection-heavy
```

### Code-Level Abstraction

```typescript
// Repository only knows about its module's datasource
@Injectable()
class OrderRepository {
  constructor(
    @Inject('ORDERS_DATASOURCE') 
    private datasource: DataSource
  ) {}
  
  async findById(id: OrderId): Promise<Order | null> {
    const result = await this.datasource.query(
      'SELECT * FROM orders.orders WHERE id = $1', 
      [id]
    );
    return result ? this.mapper.toDomain(result) : null;
  }
}
```

## Shared Infrastructure Components

While data should be isolated, some infrastructure is naturally shared:

### 1. Message Broker

```yaml
# Single message broker, module-specific topics/queues
messaging:
  broker:
    host: kafka.internal
    port: 9092
  
  # Each module has its own topic namespace
  topics:
    catalog: catalog.events
    orders: orders.events
    payment: payment.events
```

### 2. Caching Layer

```yaml
# Shared Redis, module-specific key prefixes
cache:
  redis:
    host: redis.internal
    port: 6379
  
  # Prefixes enforce logical separation
  key-prefixes:
    catalog: "catalog:"
    orders: "orders:"
    payment: "payment:"
```

### 3. Observability

Shared infrastructure for logs, metrics, and traces:

```yaml
observability:
  # Single collector endpoints
  logging:
    endpoint: fluentd.internal:24224
  
  metrics:
    endpoint: prometheus.internal:9090
  
  tracing:
    endpoint: jaeger.internal:14268
  
  # Module labels for filtering
  labels:
    module: ${MODULE_NAME}  # catalog, orders, payment
    service: modular-monolith
```

## Dependency Management

### Minimizing Shared Libraries

**Good sharing** (technical infrastructure):
- HTTP clients
- Logging frameworks
- Database drivers
- Monitoring agents
- Security utilities

**Avoid sharing** (business logic):
- Domain entities
- Business rules
- Validation logic
- Workflow definitions

### Shared Kernel Pattern

For truly cross-cutting concepts, use a minimal shared kernel:

```
shared/
└── kernel/
    ├── Money.ts              # Value object used across modules
    ├── Address.ts            # Common value object
    ├── DomainEvent.ts        # Base event type
    ├── Entity.ts             # Base entity
    └── Result.ts             # Operation result type
```

**Rules for shared kernel:**
- Keep it small (< 5% of codebase)
- Only value objects and base types
- No business logic
- Changes require consensus from all module teams
- Version carefully (treat as public API)

## Resource Isolation

Even when sharing infrastructure, isolate resource usage:

### Database Resource Limits

```sql
-- PostgreSQL: Resource limits per user
alter role catalog_user with 
    connection limit 20;
    
alter role orders_user with 
    connection limit 30;

-- Query timeout per module
alter role catalog_user set statement_timeout = '30s';
alter role orders_user set statement_timeout = '60s';
```

### Circuit Breakers

Prevent cascade failures when shared infrastructure degrades:

```typescript
// Per-module circuit breakers
const catalogCircuitBreaker = new CircuitBreaker({
  failureThreshold: 5,
  resetTimeout: 30000,
  name: 'catalog-database'
});

const ordersCircuitBreaker = new CircuitBreaker({
  failureThreshold: 3,
  resetTimeout: 60000,
  name: 'orders-database'
});
```

## When to Use

**Always use schema separation when:**
- Multiple teams work on different modules
- Planning eventual service extraction (M236)
- Modules have different data access patterns
- Strong module boundaries are required

**Consider separate databases when:**
- Modules have radically different scaling needs
- Different database technologies are optimal
- Regulatory requirements mandate isolation
- Cost of separate instances is justified by benefits

## Common Mistakes

### 1. **The "Shared Database" Anti-pattern**

Multiple modules writing to the same tables:

```sql
-- BAD: Both Catalog and Orders modify products table
-- Catalog: manages product catalog
-- Orders: decrements stock directly on products table
```

**Solution**: Clear ownership. Orders should call Catalog API to reserve stock, not update tables directly.

### 2. **Cross-Schema Queries for Reporting**

```sql
-- BAD: Reporting query joining across schemas
select 
    o.id, o.customer_id,
    p.name as product_name,
    t.amount as payment_amount
from orders.orders o
join catalog.products p on o.product_id = p.id  -- Cross-schema!
join payment.transactions t on o.id = t.order_id;  -- Cross-schema!
```

**Solution**: 
- Use read replicas for reporting
- Build dedicated reporting views that copy necessary data
- Use event sourcing to populate read models

### 3. **Over-Sharing the Shared Kernel**

```typescript
// BAD: Shared kernel grows to include business logic
// shared/kernel/PricingCalculator.ts
export class PricingCalculator {
  calculateDiscount(product: Product, customer: Customer): Money {
    // Business logic in shared kernel!
  }
}
```

**Solution**: Keep shared kernel to pure technical types. Pricing logic belongs in the Pricing module.

### 4. **Ignoring Operational Concerns**

Treating schema separation as purely a code concern:

**Solution**: Involve operations early:
- Backup/restore per schema
- Monitoring per module
- Performance isolation
- Security auditing

### 5. **No Migration Strategy**

Starting with a shared schema and planning to "fix it later":

**Solution**: Start with schema separation from day one. It's much easier to maintain boundaries than to retrofit them.

## FOE Alignment

### Understanding
- **Schema separation** makes data ownership explicit
- **Clear infrastructure boundaries** reduce cognitive load
- **Migration isolation** makes changes understandable

### Fast Feedback
- **Module-specific migrations** enable faster deployment
- **Connection pooling per module** isolates performance issues
- **Resource limits** provide early warning of problems

### Confidence
- **No cross-schema FKs** means changes are safer
- **Schema permissions** enforce boundaries automatically
- **Independent migrations** reduce deployment risk

## References

- [Kamil Grzybek - Database Structure](https://github.com/kgrzybek/modular-monolith-with-ddd#database)
- [Martin Fowler - Database Per Service](https://microservices.io/patterns/data/database-per-service.html)
- [PostgreSQL Schemas Documentation](https://www.postgresql.org/docs/current/ddl-schemas.html)
- [Flyway Documentation](https://documentation.red-gate.com/fd/migrations-184127470.html)
- [Evolutionary Database Design](https://martinfowler.com/articles/evodb.html)
