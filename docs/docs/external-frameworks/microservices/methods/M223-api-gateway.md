---
methodId: M223
displayed_sidebar: fieldGuideSidebar
sidebar_position: 1
title: API Gateway
description: Unified entry point that handles cross-cutting concerns like authentication, rate limiting, and request routing for microservices clients.
framework: microservices
framework_url: https://microservices.io/patterns/apigateway.html
foe_alignment:
  primary: Understanding
  secondary: Feedback
status: industry-standard
pillar: foundational-patterns
---

# API Gateway

**Pillar:** Foundational Patterns

An API Gateway is a single entry point for all clients that routes requests to appropriate backend services, handles cross-cutting concerns, and provides a unified API surface. It acts as a facade, simplifying the client experience while enabling service evolution behind the scenes.

## Definition

> "The API Gateway is the single entry point for all clients. It handles requests in one of two ways: either routing them to the appropriate service or fanning them out to multiple services."
> — Chris Richardson, Microservices Patterns

## Why It Matters

API Gateways solve several fundamental problems in microservices architectures:

- **Protocol translation** - Clients speak one protocol (HTTP/REST, GraphQL, gRPC), services may speak others
- **Request routing** - Route requests to appropriate services based on path, headers, or content
- **Cross-cutting concerns** - Authentication, authorization, rate limiting, caching, SSL termination
- **Client simplification** - Clients interact with one endpoint, not dozens of service endpoints
- **Service evolution** - Refactor, split, or merge services without affecting clients

## How It Works

### Core Responsibilities

```
┌─────────────────────────────────────────────────────────────┐
│                      API Gateway                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │
│  │ Authentication│  │  Rate Limit  │  │   Routing    │       │
│  └──────────────┘  └──────────────┘  └──────────────┘       │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │
│  │   Caching    │  │ Load Balancing│  │ SSL Termination│      │
│  └──────────────┘  └──────────────┘  └──────────────┘       │
└─────────────────────────────────────────────────────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        ▼                     ▼                     ▼
   ┌─────────┐          ┌─────────┐          ┌─────────┐
   │ Service │          │ Service │          │ Service │
   │    A    │          │    B    │          │    C    │
   └─────────┘          └─────────┘          └─────────┘
```

### Gateway Patterns

| Pattern | Description | Use Case |
|---------|-------------|----------|
| **Gateway Routing** | Route based on path/method | URL-based service discovery |
| **Gateway Aggregation** | Combine multiple service calls | Reduce client chattiness |
| **Gateway Offloading** | Handle SSL, auth, rate limiting | Centralize cross-cutting concerns |
| **Backends for Frontends (BFF)** | Separate gateway per client type | Mobile vs web optimization |

## Implementation Approaches

### 1. Off-the-Shelf Gateways

**Popular Solutions:**
- **Kong** - Open-source, plugin ecosystem
- **NGINX/NGINX Plus** - High performance, proven
- **AWS API Gateway** - Managed, serverless integration
- **Azure API Management** - Full lifecycle management
- **Envoy** - Cloud-native, service mesh integration

### 2. Custom Gateway

Build when you need:
- Complex aggregation logic
- Custom protocol translation
- Deep integration with legacy systems

**Technology Stack:**
- Spring Cloud Gateway (Java)
- Ocelot (.NET)
- Express Gateway (Node.js)

### 3. Backends for Frontends (BFF)

Create separate gateways optimized for each client type:

```
                    ┌─────────────┐
                    │   Mobile    │
                    │    App      │
                    └──────┬──────┘
                           │
                    ┌──────▼──────┐
                    │ Mobile BFF  │  <- Optimized for mobile
                    │  Gateway    │     (light payloads, limited data)
                    └──────┬──────┘
                           │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
   ┌────▼────┐       ┌─────▼────┐       ┌────▼────┐
   │ Service │       │ Service  │       │ Service │
   │    A    │       │    B     │       │    C    │
   └─────────┘       └──────────┘       └─────────┘
```

## FOE Alignment

**Primary: Optimize for Understanding**

The API Gateway simplifies the client view of the system. Instead of understanding dozens of service endpoints, clients interact with a single, coherent API. This abstraction reduces cognitive load and makes the system more comprehensible.

**Secondary: Fast Feedback Loops**

By centralizing concerns like rate limiting and caching, the gateway provides immediate feedback to clients. Invalid requests are rejected quickly without burdening backend services. Caching reduces latency for common requests.

## Benefits

- ✅ **Decouples clients from services** - Services can evolve independently
- ✅ **Centralizes cross-cutting concerns** - Auth, logging, rate limiting in one place
- ✅ **Enables protocol flexibility** - Services can use gRPC, clients use HTTP
- ✅ **Simplifies client code** - One endpoint to manage
- ✅ **Provides optimization opportunities** - Caching, request coalescing

## Trade-offs

- ⚠️ **Single point of failure** - Must be highly available
- ⚠️ **Additional latency** - Extra network hop
- ⚠️ **Increased complexity** - Another component to deploy and manage
- ⚠️ **Risk of coupling** - Gateway can become a "smart" middle layer

## When to Use

✅ **Use when:**
- Multiple client types (web, mobile, third-party) access services
- Services use different protocols or authentication schemes
- You need centralized rate limiting or API management
- Client chattiness is a problem (use aggregation)

❌ **Avoid when:**
- Only one or two simple services
- Latency is absolutely critical (consider direct service calls)
- Team lacks operational expertise to run gateway infrastructure

## Implementation Checklist

- [ ] **Authentication & Authorization** - JWT validation, OAuth2, API keys
- [ ] **Rate Limiting** - Per-client throttling, burst handling
- [ ] **Request/Response Transformation** - Protocol translation, payload modification
- [ ] **Caching** - Response caching with appropriate cache headers
- [ ] **Load Balancing** - Distribute requests across service instances
- [ ] **Circuit Breaking** - Fail fast when services are unhealthy
- [ ] **Health Checks** - Monitor gateway and backend health
- [ ] **Observability** - Logging, metrics, distributed tracing

## Anti-Patterns

### The "God Gateway"

Don't put business logic in the gateway:
- ❌ Complex data transformations
- ❌ Business rule enforcement
- ❌ Workflow orchestration

Keep the gateway focused on infrastructure concerns.

### Excessive Aggregation

Don't create overly complex aggregations:
- ❌ Making 10+ service calls per request
- ❌ Synchronous aggregation of slow services
- ❌ Tight coupling through aggregation logic

Consider GraphQL or BFF pattern instead.

## Related Patterns

- **[Circuit Breaker](./M224-circuit-breaker)** - Protect gateway from failing services
- **[Service Discovery](./M227-service-discovery)** - Gateway needs to find service instances
- **[Load Balancer](./M232-bulkhead-pattern)** - Distribute traffic across instances
- **BFF Pattern** - Client-specific gateways

## Known Uses

- **Netflix** - Zuul gateway (migrating to Envoy)
- **Amazon** - API Gateway for AWS services
- **Shopify** - Multiple BFFs for different clients
- **SoundCloud** - Custom gateway for polyglot services

## References

- Richardson, C. (2018). *Microservices Patterns*. Chapter 8: External API Patterns.
- Newman, S. (2021). *Building Microservices* (2nd ed.). Chapter 5: Splitting the Monolith.
- [API Gateway Pattern - microservices.io](https://microservices.io/patterns/apigateway.html)
- [Backends for Frontends - Sam Newman](https://samnewman.io/patterns/architectural/bff/)
- [AWS API Gateway Best Practices](https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-best-practices.html)
