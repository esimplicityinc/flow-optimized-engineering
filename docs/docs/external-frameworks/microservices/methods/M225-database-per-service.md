---
methodId: M225
displayed_sidebar: fieldGuideSidebar
sidebar_position: 3
title: Database Per Service
description: Each microservice owns its own data store, ensuring loose coupling and enabling independent deployment, scaling, and technology choice.
framework: microservices
framework_url: https://microservices.io/patterns/data/database-per-service.html
foe_alignment:
  primary: Understanding
  secondary: Confidence
status: industry-standard
pillar: foundational-patterns
---

# Database Per Service

**Pillar:** Foundational Patterns

The Database Per Service pattern ensures that each microservice has its own private data store that no other service can access directly. Services communicate only through APIs, not through shared databases. This is essential for maintaining service autonomy and loose coupling.

## Definition

> "Keep each microservice's persistent data private to that service and accessible only via its API. A service's database is effectively part of its implementation and should not be accessed directly by other services."
> — Chris Richardson, Microservices Patterns

## Why It Matters

Shared databases between services create tight coupling:

- **Deployment coupling** - Schema changes require coordinating multiple teams
- **Scaling limitations** - Services compete for database resources
- **Technology lock-in** - Forced to use the same database technology
- **Data ownership ambiguity** - Unclear who can modify data
- **Single point of failure** - Database issues affect multiple services

With Database Per Service:
- Each service owns its data completely
- Services can choose the right database for their needs
- Schema changes don't require coordination
- Services scale independently
- Technology choices are decentralized

## How It Works

### Architecture

```
┌──────────────┐      API Calls      ┌──────────────┐
│   Service    │◀───────────────────▶│   Service    │
│      A       │                     │      B       │
└──────┬───────┘                     └──────┬───────┘
       │                                    │
       │ Owns                               │ Owns
       ▼                                    ▼
┌──────────────┐                     ┌──────────────┐
│  Database    │                     │  Database    │
│  (PostgreSQL)│                     │   (MongoDB)  │
└──────────────┘                     └──────────────┘
```

### Data Ownership Rules

1. **Private Data Access** - Only the owning service accesses its database
2. **API-Only Communication** - Other services access data through the service's API
3. **Schema Autonomy** - Service controls its schema without external approval
4. **Technology Freedom** - Choose the database that fits the data model

## Implementation Strategies

### 1. Private Tables Schema

Each service has its own schema within a shared database server:

```sql
-- Service A Schema
CREATE SCHEMA order_service;
CREATE TABLE order_service.orders (...);

-- Service B Schema
CREATE SCHEMA customer_service;
CREATE TABLE customer_service.customers (...);

-- Grant permissions
GRANT USAGE ON SCHEMA order_service TO order_service_app;
REVOKE ALL ON SCHEMA customer_service FROM order_service_app;
```

**Pros:** Easier operations, shared resources
**Cons:** Shared database server is still a coupling point

### 2. Database Server Per Service

Each service has its own database server instance:

```yaml
# Kubernetes deployment
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: order-service-db
spec:
  serviceName: order-service-db
  replicas: 1
  template:
    spec:
      containers:
      - name: postgres
        image: postgres:15
        volumeMounts:
        - name: data
          mountPath: /var/lib/postgresql/data
  volumeClaimTemplates:
  - metadata:
      name: data
    spec:
      accessModes: ["ReadWriteOnce"]
      resources:
        requests:
          storage: 10Gi
```

**Pros:** Complete isolation, independent scaling
**Cons:** Higher operational overhead, more resources

### 3. Database Technology Heterogeneity

Services choose the best database for their data model:

| Service | Data Model | Database | Rationale |
|---------|------------|----------|-----------|
| Product Catalog | Document | MongoDB | Flexible schema, complex products |
| Order Service | Relational | PostgreSQL | ACID transactions |
| Search | Full-text | Elasticsearch | Rich search capabilities |
| Shopping Cart | Key-value | Redis | Fast access, session data |
| Analytics | Columnar | ClickHouse | Fast aggregations |

## Cross-Service Data Access

### Problem: What if Service B needs Service A's data?

**Option 1: API Aggregation**

```javascript
// Order Service calls Customer Service API
async function createOrder(orderData) {
  const customer = await customerServiceClient.getCustomer(orderData.customerId);
  // Use customer data to create order
}
```

**Option 2: Data Replication (CQRS)**

```javascript
// Customer events are published to message bus
customerService.on('customer.updated', async (event) => {
  await orderServiceProjection.updateCustomerData(event.customerId, event.data);
});
```

**Option 3: Saga Pattern**

For transactions spanning multiple services, use [Saga Pattern](./M226-saga-pattern).

## FOE Alignment

**Primary: Optimize for Understanding**

When each service owns its data, the boundaries are clear. Developers know exactly what data they control and what data they must request from other services. This eliminates the confusion of shared tables where "everyone owns it, so no one owns it."

**Secondary: Confidence to Act**

With private databases, teams can evolve their schema confidently without fear of breaking other services. This autonomy enables confident refactoring and schema migrations.

## Benefits

- ✅ **Loose coupling** - Services evolve independently
- ✅ **Technology diversity** - Right tool for each job
- ✅ **Clear ownership** - No ambiguity about who can modify data
- ✅ **Independent scaling** - Scale databases based on service needs
- ✅ **Fault isolation** - Database failures don't cascade
- ✅ **Team autonomy** - Teams control their data without coordination

## Trade-offs

- ⚠️ **Operational complexity** - More databases to manage
- ⚠️ **Data consistency** - Distributed transactions require sagas
- ⚠️ **Reporting complexity** - Cross-service queries are harder
- ⚠️ **Storage overhead** - Some data duplication (for replication)
- ⚠️ **Learning curve** - Teams must learn multiple database technologies

## When to Use

✅ **Use when:**
- Services have distinct data ownership boundaries
- Teams need independent deployment velocity
- Different services need different database capabilities
- You want to prevent tight coupling through shared schemas

❌ **Avoid when:**
- Strong ACID transactions are required across service boundaries
- Simple CRUD application without clear domain boundaries
- Team lacks operational expertise for multiple databases
- Reporting/analytics is the primary use case (consider data lake)

## Implementation Checklist

- [ ] **Schema ownership** - Document which service owns each table
- [ ] **Database credentials** - Separate credentials per service
- [ ] **Access controls** - Database permissions enforce isolation
- [ ] **Backup strategy** - Independent backups per service database
- [ ] **Monitoring** - Database metrics per service
- [ ] **Migration plan** - Strategy for evolving from shared database

## Migration from Shared Database

### Strangler Fig Approach

```
Phase 1: Identify boundaries
┌─────────────────────────────────────┐
│         Shared Database              │
│  ┌──────────┐      ┌──────────┐     │
│  │ Orders   │      │ Customers│     │
│  │ Tables   │      │ Tables   │     │
│  └──────────┘      └──────────┘     │
└─────────────────────────────────────┘

Phase 2: Create service-specific views
┌─────────────┐       ┌─────────────────────────────────────┐
│   Order     │──────▶│  Orders Tables (via view)           │
│   Service   │       │  ┌──────────┐      ┌──────────┐     │
└─────────────┘       │  │ Orders   │      │ Customers│     │
                      │  │ View     │      │ Tables   │     │
                      │  └──────────┘      └──────────┘     │
                      └─────────────────────────────────────┘

Phase 3: Migrate to separate database
┌─────────────┐       ┌─────────────┐    ┌─────────────────┐
│   Order     │──────▶│   Order     │    │   Customer      │
│   Service   │       │   Database  │    │   Database      │
└─────────────┘       └─────────────┘    └─────────────────┘
```

### Steps

1. **Identify service boundaries** using Domain-Driven Design
2. **Create database views** for each service's data needs
3. **Update services** to use views instead of direct table access
4. **Migrate data** to new database with zero-downtime strategy
5. **Remove old tables** after verification period

## Reporting and Analytics

### The Reporting Problem

When data is distributed across services, how do you generate reports?

**Solutions:**

1. **API Aggregation** (for small datasets)
   ```javascript
   const orders = await orderService.getAll();
   const enrichedOrders = await Promise.all(
     orders.map(o => enrichWithCustomer(o))
   );
   ```

2. **Data Lake / Warehouse**
   ```javascript
   // Services publish change events
   eventBus.publish('order.created', orderData);
   
   // Data lake consumes and aggregates
   dataLake.ingest('order.created', transform(orderData));
   ```

3. **CQRS with Projections**
   ```javascript
   // Read model optimized for queries
   const reportData = await reportProjection.query({
     dateRange: [start, end],
     include: ['customer', 'order', 'payment']
   });
   ```

## Anti-Patterns

### ❌ Shared Tables

```sql
-- WRONG: Both services access same table
-- Order Service
INSERT INTO customers (name, email) VALUES (...);

-- Customer Service
UPDATE customers SET status = 'premium' WHERE id = 1;
```

### ❌ Direct Database Access

```javascript
// WRONG: Order Service queries Customer database directly
const customer = await customerDb.query(
  'SELECT * FROM customers WHERE id = ?', 
  [customerId]
);
```

### ❌ Schema Dependencies

```sql
-- WRONG: Order Service creates foreign key to Customer table
CREATE TABLE orders (
  id INT PRIMARY KEY,
  customer_id INT,
  FOREIGN KEY (customer_id) REFERENCES customer_db.customers(id)
    -- This couples Order Service to Customer Service's schema!
);
```

## Known Uses

- **Amazon** - Each service owns its DynamoDB or RDS instance
- **Netflix** - Hundreds of Cassandra clusters, one per service
- **SoundCloud** - Mix of PostgreSQL, Cassandra, and Elasticsearch per service
- **Shopify** - MySQL per service with Vitess for sharding

## References

- Richardson, C. (2018). *Microservices Patterns*. Chapter 5: Business Logic Design Patterns.
- Newman, S. (2021). *Building Microservices* (2nd ed.). Chapter 4: Microservices at Scale.
- [Database Per Service - microservices.io](https://microservices.io/patterns/data/database-per-service.html)
- [Microsoft: Data sovereignty per microservice](https://learn.microsoft.com/en-us/dotnet/architecture/microservices/architect-microservice-container-applications/data-sovereignty-per-microservice)
- [AWS: Database-per-service pattern](https://docs.aws.amazon.com/whitepapers/latest/microservices-on-aws/database-per-service-pattern.html)
