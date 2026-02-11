---
methodId: M228
displayed_sidebar: fieldGuideSidebar
sidebar_position: 6
title: Strangler Fig Pattern
description: Incrementally migrate from monolithic applications to microservices by gradually replacing specific functionality with new services.
framework: microservices
framework_url: https://martinfowler.com/bliki/StranglerFigApplication.html
foe_alignment:
  primary: Understanding
  secondary: Confidence
status: well-established
pillar: communication-patterns
---

# Strangler Fig Pattern

**Pillar:** Communication Patterns

The Strangler Fig Pattern enables incremental migration from a monolithic application to microservices by gradually replacing specific pieces of functionality with new services. The name comes from strangler fig trees that grow around existing trees, eventually replacing them entirely. This pattern minimizes risk by allowing gradual transition rather than big-bang rewrites.

## Definition

> "One of the natural wonders of this area are the huge strangler figs. They seed in the upper branches of a tree and gradually work their way down the tree until they root in the soil. Over many years they grow into fantastic and beautiful shapes, meanwhile strangling and killing the tree that was their host."
> — Martin Fowler

> "One of my favorite techniques for tackling legacy code is to come up with a strategy for strangling it by putting a layer around the legacy code that intercepts requests and gradually replaces the legacy functionality with new code."
> — Martin Fowler

## Why It Matters

Big-bang rewrites are risky:

- **Long time to value** - No benefits until the rewrite is complete
- **Requirements drift** - Business needs change during the long rewrite
- **Project cancellation risk** - Management loses patience
- **Knowledge loss** - Original developers leave during the project
- **No rollback** - All-or-nothing deployment

The Strangler Fig approach:
- **Delivers value incrementally** - Each extracted service provides immediate benefit
- **Reduces risk** - Can stop at any point with partial progress
- **Enables learning** - Teams learn microservices gradually
- **Allows rollback** - Can revert individual services if needed
- **Maintains business continuity** - Monolith continues running throughout

## How It Works

### Architecture

```
Phase 1: Initial Setup
┌─────────────────────────────────────┐
│           Router/Proxy              │ ◀── Strangler facade
│     (API Gateway / Load Balancer)   │
└──────────────┬──────────────────────┘
               │
        ┌──────┴──────┐
        ▼             ▼
┌──────────────┐ ┌──────────────┐
│   Monolith   │ │  New Service │ ◀── Extracted capability
│   (Legacy)   │ │   (Users)    │
└──────────────┘ └──────────────┘


Phase 2: Partial Migration
┌─────────────────────────────────────┐
│           Router/Proxy              │
└──────────────┬──────────────────────┘
               │
        ┌──────┼──────┬──────┐
        ▼      ▼      ▼      ▼
┌──────────┐ ┌────┐ ┌────┐ ┌────┐
│ Monolith │ │User│ │Prod│ │Ord │
│ (smaller)│ │Svc │ │Svc │ │Svc │
└──────────┘ └────┘ └────┘ └────┘


Phase 3: Completion
┌─────────────────────────────────────┐
│           Router/Proxy              │
└──────────┬──────────┬───────────────┘
           │          │
    ┌──────┴───┐ ┌────┴────┐ ┌────────┐
    │   User   │ │ Product │ │ Order  │
    │  Service │ │ Service │ │ Service│
    └──────────┘ └─────────┘ └────────┘
        (Monolith fully replaced)
```

### Routing Strategies

The strangler facade routes requests based on URL patterns, headers, or content:

```javascript
// Example: Route based on URL path
function routeRequest(request) {
  const path = request.path;
  
  if (path.startsWith('/api/users')) {
    return routeToUserService(request);
  }
  
  if (path.startsWith('/api/products')) {
    return routeToProductService(request);
  }
  
  if (path.startsWith('/api/orders')) {
    return routeToOrderService(request);
  }
  
  // Default: route to monolith
  return routeToMonolith(request);
}
```

### Migration Steps

1. **Identify Bounded Context** - Use DDD to find natural boundaries
2. **Create Strangler Facade** - Deploy router in front of monolith
3. **Extract First Service** - Move one capability to new service
4. **Update Routing** - Route relevant traffic to new service
5. **Verify & Monitor** - Ensure service performs correctly
6. **Repeat** - Continue extracting services
7. **Retire Monolith** - When all functionality extracted

## Implementation Approaches

### 1. API Gateway as Strangler

Use an API Gateway to route between monolith and new services:

```yaml
# Kong configuration example
services:
  - name: monolith
    url: http://monolith.internal:8080
    routes:
      - paths:
          - /api/legacy
          
  - name: user-service
    url: http://user-service:8080
    routes:
      - paths:
          - /api/users
          
  - name: product-service
    url: http://product-service:8080
    routes:
      - paths:
          - /api/products
```

**Pros:** Purpose-built for routing, rich features
**Cons:** Additional infrastructure to manage

### 2. Load Balancer Routing

Use NGINX, HAProxy, or cloud load balancers:

```nginx
# NGINX configuration
server {
    listen 80;
    server_name api.example.com;
    
    location /api/users {
        proxy_pass http://user-service;
    }
    
    location /api/products {
        proxy_pass http://product-service;
    }
    
    location / {
        proxy_pass http://monolith;
    }
}
```

**Pros:** Simple, proven, high performance
**Cons:** Less flexible than code-based routing

### 3. Code-Based Strangler

Implement routing logic in application code:

```javascript
class StranglerRouter {
  constructor(routes) {
    this.routes = routes;
    this.monolith = new MonolithClient();
  }
  
  async handle(request) {
    const route = this.findRoute(request);
    
    if (route) {
      // Route to new service
      return await route.service.handle(request);
    }
    
    // Default to monolith
    return await this.monolith.handle(request);
  }
  
  findRoute(request) {
    return this.routes.find(r => r.matches(request));
  }
}
```

**Pros:** Maximum flexibility, can implement complex logic
**Cons:** More code to maintain

## Migration Strategies

### By Domain (Recommended)

Extract entire bounded contexts at once:

```
Iteration 1: User Management
- Extract: authentication, profiles, preferences
- Keep in monolith: orders, products, payments

Iteration 2: Product Catalog
- Extract: product data, inventory, search
- Keep in monolith: orders, payments

Iteration 3: Order Management
- Extract: shopping cart, checkout, order history
- Keep in monolith: payments

Iteration 4: Payment Processing
- Extract: payment processing, refunds
- Monolith retired
```

### By Feature

Extract individual features:

```
Iteration 1: User Authentication
Iteration 2: Product Search
Iteration 3: Shopping Cart
Iteration 4: Checkout
Iteration 5: Order History
...
```

### By Layer (Anti-pattern)

Avoid extracting by technical layer:

```
❌ WRONG: Extract all data access first
❌ WRONG: Extract all business logic first
✅ RIGHT: Extract by business capability
```

## Data Migration

### Data Synchronization

During transition, keep data synchronized:

```javascript
// Dual-write pattern
async function updateUser(userId, data) {
  // Write to new service
  await userService.update(userId, data);
  
  // Also write to monolith (temporary)
  await monolith.user.update(userId, data);
}
```

### Read Replicas

Route reads to new service, writes to both:

```
Reads ───────────────▶ New Service
                       │
                       │ Sync
                       ▼
Writes ───▶ Monolith ◀──────────
```

### Event-Based Migration

Use events to keep systems in sync:

```javascript
// Monolith publishes events
monolith.on('user.updated', async (event) => {
  await userService.sync(event.userId, event.data);
});

// Eventually, new service becomes source of truth
```

## FOE Alignment

**Primary: Optimize for Understanding**

The Strangler Fig pattern makes the migration process understandable and manageable. Instead of a mysterious "rewrite in progress" that no one understands the status of, each extracted service is a concrete, completed step with clear boundaries and functionality.

**Secondary: Confidence to Act**

Because the migration is incremental, teams can deploy with confidence at each step. If something goes wrong, only the extracted service is affected—the monolith continues running. This safety net enables bolder refactoring and faster progress.

## Benefits

- ✅ **Incremental delivery** - Value delivered at each step
- ✅ **Risk reduction** - Can stop or revert at any point
- ✅ **Learning opportunity** - Team gains microservices experience gradually
- ✅ **Business continuity** - Monolith keeps running during migration
- ✅ **Parallel development** - New features in services, maintenance in monolith

## Trade-offs

- ⚠️ **Extended timeline** - Takes longer than big-bang rewrite
- ⚠️ **Running dual systems** - Must maintain both codebases temporarily
- ⚠️ **Data consistency** - Keeping data in sync adds complexity
- ⚠️ **Routing overhead** - Additional network hop through strangler
- ⚠️ **Requires discipline** - Temptation to take shortcuts

## When to Use

✅ **Ideal for:**
- Large, critical monoliths that can't risk big-bang rewrite
- Teams new to microservices (learn as you go)
- Systems with clear domain boundaries
- Organizations that need continuous delivery during migration

❌ **Consider alternatives when:**
- Monolith is small (< 10K lines)
- Domain boundaries are unclear
- Team has extensive microservices experience
- Organization can tolerate downtime for cutover

## Success Factors

### 1. Clear Domain Boundaries

Use Domain-Driven Design to identify extraction candidates:

```
Bounded Contexts (good extraction candidates):
- User Management
- Product Catalog  
- Order Management
- Payment Processing
- Inventory
```

### 2. Automated Testing

Comprehensive tests ensure extraction doesn't break functionality:

- **Contract tests** - Verify new service matches monolith behavior
- **Integration tests** - Test routing and data synchronization
- **End-to-end tests** - Full user journey verification

### 3. Feature Flags

Control routing with feature flags for gradual rollout:

```javascript
if (featureFlags.isEnabled('use-new-user-service', userId)) {
  return await userService.getUser(userId);
} else {
  return await monolith.getUser(userId);
}
```

### 4. Monitoring

Track both systems during transition:

```javascript
// Compare monolith vs service metrics
metrics.histogram('response_time', monolithTime, { source: 'monolith' });
metrics.histogram('response_time', serviceTime, { source: 'user-service' });

// Alert on divergence
if (Math.abs(monolithTime - serviceTime) > threshold) {
  alert('Performance divergence detected');
}
```

## Anti-Patterns

### ❌ Big-Bang Cutover

```
WRONG: Migrate everything at once
┌──────────┐                    ┌──────────┐
│ Monolith │ ────(one day)───▶ │ Services │
└──────────┘                    └──────────┘

RIGHT: Gradual migration
┌──────────┐     ┌──────────┐     ┌──────────┐
│ Monolith │ ──▶ │ Partial  │ ──▶ │ Services │
└──────────┘     └──────────┘     └──────────┘
```

### ❌ Tight Coupling Remaining

Don't extract services that still need constant monolith access:

```
WRONG: Extracted service calls monolith for every request
┌──────────┐     ┌──────────┐
│  Users   │◀───▶│ Monolith │
│  Service │     │          │
└──────────┘     └──────────┘
```

### ❌ No Rollback Plan

Always be able to route back to monolith:

```javascript
// Keep routing configuration flexible
const routingConfig = {
  users: {
    primary: 'user-service',
    fallback: 'monolith',
    healthCheck: '/health'
  }
};
```

## Known Uses

- **Amazon** - Gradual migration from monolith to services over years
- **Netflix** - Strangler fig approach for DVD to streaming transition
- **Guardian** - Migrated from monolith to microservices over 3 years
- **UK Government Digital Service** - Multiple strangler fig migrations
- **SoundCloud** - Monolith to microservices using BFF pattern

## Case Study: SoundCloud

SoundCloud used the Strangler Fig pattern to migrate their monolithic Rails application:

1. **Initial State**: Single Rails monolith handling all features
2. **Strangler Setup**: NGINX router in front of monolith
3. **First Extraction**: Authentication service (clear boundary)
4. **Continued Extraction**: Track uploads, social features, analytics
5. **Final State**: 200+ microservices, monolith retired

Key learnings:
- Extract vertical slices (full features), not horizontal layers
- Keep extracted services truly independent
- Invest in automated testing for each extraction
- Plan for data migration from the start

## References

- Fowler, M. (2004). [Strangler Fig Application](https://martinfowler.com/bliki/StranglerFigApplication.html).
- Richardson, C. (2018). *Microservices Patterns*. Chapter 13: Refactoring to Microservices.
- Newman, S. (2021). *Building Microservices* (2nd ed.). Chapter 5: Splitting the Monolith.
- [Strangler Fig Pattern - Microsoft](https://docs.microsoft.com/en-us/azure/architecture/patterns/strangler-fig)
- [SoundCloud Case Study](https://developers.soundcloud.com/blog/building-products-at-soundcloud-part-3-microservices-in-scala-and-finch)
