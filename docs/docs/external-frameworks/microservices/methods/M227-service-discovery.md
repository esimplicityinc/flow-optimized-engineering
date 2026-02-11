---
methodId: M227
displayed_sidebar: fieldGuideSidebar
sidebar_position: 5
title: Service Discovery
description: Mechanism for services to find and communicate with each other dynamically without hardcoded locations, enabling auto-scaling and resilience.
framework: microservices
framework_url: https://microservices.io/patterns/client-side-discovery.html
foe_alignment:
  primary: Feedback
  secondary: Confidence
status: industry-standard
pillar: communication-patterns
---

# Service Discovery

**Pillar:** Communication Patterns

Service Discovery enables microservices to find and communicate with each other without hardcoding network locations (IP addresses and ports). As services scale up, down, or move across hosts, clients automatically discover the current locations of service instances.

## Definition

> "Service discovery is the automatic detection of devices and services offered by these devices on a computer network. A service discovery protocol is a network protocol that helps accomplish service discovery."
> — Chris Richardson, Microservices Patterns

## Why It Matters

In dynamic cloud environments, service instances come and go constantly:

- **Auto-scaling** adds and removes instances based on load
- **Failures** cause instances to become unhealthy and be replaced
- **Deployments** roll out new versions gradually
- **Container orchestration** schedules instances across hosts dynamically

Without service discovery, clients would need:
- Hardcoded IP addresses (breaks on scaling)
- Load balancer configuration updates (operational burden)
- Manual intervention for every change (not scalable)

## Discovery Patterns

### 1. Client-Side Discovery

The client queries a service registry and directly calls service instances.

```
┌─────────────┐
│   Client    │
└──────┬──────┘
       │ 1. Query: Where is Payment Service?
       ▼
┌────────────────┐
│ Service Registry│  (Consul, Eureka, etcd)
│                │
│ Payment:       │
│  - 10.0.1.5:8080
│  - 10.0.1.6:8080
└───────┬────────┘
        │ 2. Return instances
        ▼
┌─────────────┐
│   Client    │──┐
└─────────────┘  │ 3. Choose & Call
                 │
        ┌────────┴────────┐
        ▼                 ▼
┌───────────────┐  ┌───────────────┐
│ Payment       │  │ Payment       │
│ Instance #1   │  │ Instance #2   │
│ 10.0.1.5:8080 │  │ 10.0.1.6:8080 │
└───────────────┘  └───────────────┘
```

**Components:**
- **Service Registry** - Database of service instances (Consul, Eureka, etcd)
- **Self-Registration** - Services register themselves on startup
- **Client-Side Load Balancer** - Client chooses which instance to call

**Pros:**
- Simple infrastructure (no intermediate hop)
- Client has full control over load balancing algorithm
- Lower latency (no proxy)

**Cons:**
- Client complexity (must implement discovery logic)
- Language-specific libraries needed
- Tight coupling to service registry

### 2. Server-Side Discovery

Clients call a router/load balancer that queries the registry and forwards requests.

```
┌─────────────┐
│   Client    │
└──────┬──────┘
       │ 1. Call: payment-service
       ▼
┌────────────────────┐
│  Router/Load       │
│  Balancer          │  (NGINX, AWS ELB, Kubernetes Service)
└───────┬────────────┘
        │ 2. Query: Where is Payment Service?
        ▼
┌────────────────┐
│ Service Registry│
└───────┬────────┘
        │ 3. Return instances
        ▼
┌────────────────────┐
│  Router/Load       │──┐
└────────────────────┘  │ 4. Forward
                        │
           ┌────────────┴────────┐
           ▼                     ▼
┌───────────────┐      ┌───────────────┐
│ Payment       │      │ Payment       │
│ Instance #1   │      │ Instance #2   │
└───────────────┘      └───────────────┘
```

**Components:**
- **Router/Load Balancer** - Intercepts requests and routes to instances
- **Service Registry** - Optional, or router maintains its own registry

**Pros:**
- Client simplicity (just call a URL)
- Centralized load balancing logic
- Language-agnostic

**Cons:**
- Additional network hop (latency)
- Router becomes potential bottleneck
- Less flexible load balancing

## Implementation

### Service Registration

Services must register on startup and deregister on shutdown:

```javascript
class ServiceRegistry {
  constructor(registryClient, serviceInfo) {
    this.registry = registryClient;
    this.serviceInfo = serviceInfo;
  }
  
  async register() {
    await this.registry.register({
      serviceName: this.serviceInfo.name,
      instanceId: this.serviceInfo.instanceId,
      host: this.serviceInfo.host,
      port: this.serviceInfo.port,
      healthCheckUrl: `http://${this.serviceInfo.host}:${this.serviceInfo.port}/health`,
      metadata: {
        version: this.serviceInfo.version,
        region: this.serviceInfo.region
      }
    });
    
    // Setup health check heartbeats
    this.heartbeatInterval = setInterval(
      () => this.sendHeartbeat(),
      30000 // 30 seconds
    );
  }
  
  async deregister() {
    clearInterval(this.heartbeatInterval);
    await this.registry.deregister(
      this.serviceInfo.name,
      this.serviceInfo.instanceId
    );
  }
}

// Graceful shutdown
process.on('SIGTERM', async () => {
  await registry.deregister();
  process.exit(0);
});
```

### Client-Side Discovery Implementation

```javascript
class ServiceClient {
  constructor(serviceRegistry, serviceName) {
    this.registry = serviceRegistry;
    this.serviceName = serviceName;
    this.loadBalancer = new RoundRobinBalancer();
  }
  
  async call(endpoint, options = {}) {
    // Get healthy instances
    const instances = await this.registry.getHealthyInstances(
      this.serviceName
    );
    
    if (instances.length === 0) {
      throw new ServiceUnavailableError(this.serviceName);
    }
    
    // Select instance using load balancer
    const instance = this.loadBalancer.select(instances);
    
    // Make the request
    const url = `http://${instance.host}:${instance.port}${endpoint}`;
    return await httpClient.request(url, options);
  }
}

// Usage
const paymentClient = new ServiceClient(consul, 'payment-service');
const result = await paymentClient.call('/process', { body: paymentData });
```

### Load Balancing Strategies

| Strategy | Description | Best For |
|----------|-------------|----------|
| **Round Robin** | Cycle through instances sequentially | Even load, equal capacity |
| **Random** | Random selection | Simple, no state |
| **Least Connections** | Route to instance with fewest active connections | Variable request duration |
| **Weighted** | Route based on capacity weights | Heterogeneous instances |
| **Latency-Based** | Route to lowest latency instance | Geographic distribution |
| **Consistent Hashing** | Hash-based routing for cache affinity | Session affinity needs |

### Health Checking

Services must report health so unhealthy instances are removed:

```javascript
// Health check endpoint
app.get('/health', async (req, res) => {
  const checks = await Promise.all([
    checkDatabase(),
    checkCache(),
    checkExternalService()
  ]);
  
  const allHealthy = checks.every(c => c.healthy);
  
  res.status(allHealthy ? 200 : 503).json({
    status: allHealthy ? 'healthy' : 'unhealthy',
    checks: checks,
    timestamp: new Date().toISOString()
  });
});
```

**Health Check Types:**
- **Passing** - Instance is healthy and receiving traffic
- **Warning** - Instance is experiencing issues but still serving
- **Critical** - Instance is unhealthy and removed from pool

## FOE Alignment

**Primary: Fast Feedback Loops**

Service discovery enables rapid response to changes in the system. When a new instance comes online, it's immediately available for traffic. When an instance fails, it's quickly removed from the pool. This dynamic nature provides fast feedback about system health and capacity.

**Secondary: Confidence to Act**

Automatic service registration and health checking provides confidence that the system will route around failures. Teams can deploy with confidence knowing that unhealthy instances will be automatically detected and bypassed.

## Service Registry Technologies

### Self-Hosted

| Registry | Type | Best For |
|----------|------|----------|
| **Consul** | Client & Server | Full-featured, multi-datacenter |
| **Eureka** | Client-side | Netflix OSS ecosystem |
| **etcd** | Key-value | Kubernetes-native |
| **ZooKeeper** | Coordination | Hadoop ecosystem |

### Cloud-Managed

| Service | Platform | Features |
|---------|----------|----------|
| **AWS Cloud Map** | AWS | Service discovery for ECS, EKS, Lambda |
| **Azure Service Fabric** | Azure | Integrated naming service |
| **Google Cloud Service Directory** | GCP | Cross-project service discovery |

### Kubernetes Native

Kubernetes provides built-in service discovery:

```yaml
# Service definition
apiVersion: v1
kind: Service
metadata:
  name: payment-service
spec:
  selector:
    app: payment-service
  ports:
    - port: 80
      targetPort: 8080
```

```javascript
// Kubernetes DNS-based discovery
const paymentServiceUrl = 'http://payment-service.default.svc.cluster.local';
```

## Implementation Checklist

- [ ] **Service Registration** - Services register on startup
- [ ] **Health Checks** - Regular health endpoint checks
- [ ] **Graceful Deregistration** - Clean shutdown removes instances
- [ ] **Client-Side Load Balancing** - Distribute requests across instances
- [ ] **Caching** - Cache registry entries to reduce lookup latency
- [ ] **Failure Handling** - Retry and failover when instances unavailable
- [ ] **Observability** - Track instance counts, health status, traffic distribution

## Benefits

- ✅ **Dynamic scaling** - Instances added/removed automatically
- ✅ **Failure resilience** - Unhealthy instances bypassed automatically
- ✅ **Deployment flexibility** - Deploy new versions without client changes
- ✅ **Load distribution** - Spread traffic across healthy instances
- ✅ **Location transparency** - Clients don't need to know instance locations

## Trade-offs

- ⚠️ **Operational complexity** - Additional infrastructure to manage
- ⚠️ **Consistency delays** - Brief inconsistency during instance changes
- ⚠️ **Split-brain risk** - Network partitions can cause incorrect routing
- ⚠️ **Extra latency** - Registry lookups add overhead (mitigated with caching)

## When to Use

✅ **Essential for:**
- Any multi-instance service deployment
- Auto-scaling environments
- Cloud-native applications
- Dynamic container orchestration

❌ **Can simplify when:**
- Single-instance services
- Static infrastructure
- Development environments (use environment variables)

## Anti-Patterns

### ❌ Hardcoded URLs

```javascript
// WRONG: Breaks when instances move
const PAYMENT_SERVICE_URL = 'http://10.0.1.5:8080';

// RIGHT: Use service discovery
const paymentService = await serviceDiscovery.get('payment-service');
```

### ❌ Ignoring Health Status

```javascript
// WRONG: Route to unhealthy instances
const instances = await registry.getAll('payment-service');

// RIGHT: Filter for healthy only
const instances = await registry.getHealthy('payment-service');
```

### ❌ No Deregistration on Shutdown

```javascript
// WRONG: Instances remain registered after shutdown
process.on('SIGTERM', () => {
  server.close();
  process.exit(0);
});

// RIGHT: Deregister first
process.on('SIGTERM', async () => {
  await registry.deregister();
  server.close();
  process.exit(0);
});
```

## Known Uses

- **Netflix** - Eureka with Ribbon client-side load balancing
- **Airbnb** - SmartStack (HAProxy + ZooKeeper)
- **Spotify** - DNS-based discovery with custom load balancing
- **Kubernetes** - DNS and environment variable-based discovery
- **AWS** - Cloud Map for ECS/EKS service discovery

## References

- Richardson, C. (2018). *Microservices Patterns*. Chapter 3: Interprocess Communication.
- Newman, S. (2021). *Building Microservices* (2nd ed.). Chapter 5: Splitting the Monolith.
- [Client-Side Discovery - microservices.io](https://microservices.io/patterns/client-side-discovery.html)
- [Server-Side Discovery - microservices.io](https://microservices.io/patterns/server-side-discovery.html)
- [Consul Documentation](https://www.consul.io/docs)
- [Netflix Eureka](https://github.com/Netflix/eureka)
