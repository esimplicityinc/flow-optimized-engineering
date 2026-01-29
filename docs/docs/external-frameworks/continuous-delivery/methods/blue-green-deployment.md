---
displayed_sidebar: fieldGuideSidebar
sidebar_position: 4
title: Blue-Green Deployment
description: Maintain two identical production environments, switching traffic between them for zero-downtime deployments.
framework: continuous-delivery
framework_url: https://continuousdelivery.com
foe_alignment:
  primary: Confidence
  secondary: Feedback
status: industry-standard
---

# Blue-Green Deployment

**Pillar:** Patterns

Blue-Green Deployment is a release technique that maintains two identical production environments (blue and green). At any time, one environment is live while the other is idle. New releases are deployed to the idle environment, tested, then traffic is switched—enabling zero-downtime deployments and instant rollback.

## Definition

> "Blue-green deployment is a technique that reduces downtime and risk by running two identical production environments called Blue and Green."
>
> — Martin Fowler

## Why It Matters

Blue-green deployment transforms releases from risky events to routine operations:

- **Zero downtime** - Users never see maintenance windows
- **Instant rollback** - Switch back to previous environment in seconds
- **Production testing** - Test the new version in production before users see it
- **Disaster recovery practice** - Every release tests your failover process
- **Reduced risk** - If something goes wrong, recovery is immediate

## FOE Framing

**Primary: Confidence to Act**

Blue-green deployment provides maximum confidence for deployments. If anything goes wrong, rollback is instantaneous—just route traffic back to the previous environment. This confidence enables more frequent deployments with lower stress.

**Secondary: Fast Feedback Loops**

The idle environment can be smoke-tested with real production data before switching traffic. Any problems are caught before users are affected, providing feedback without risk.

## How It Works

### The Process

1. **Initial state** - Blue environment is live, serving all traffic
2. **Deploy to green** - Deploy new version to idle green environment
3. **Test green** - Run smoke tests against green environment
4. **Switch traffic** - Route all traffic from blue to green
5. **Monitor** - Watch for problems in green
6. **Keep blue ready** - Blue is now idle, ready for instant rollback

### Traffic Switching

Traffic can be switched at various levels:

| Level | Mechanism | Speed |
|-------|-----------|-------|
| **DNS** | Update DNS records | Minutes (TTL dependent) |
| **Load Balancer** | Change backend pool | Seconds |
| **Router** | Update routing rules | Seconds |
| **Service Mesh** | Traffic shifting | Seconds |

### Database Considerations

Databases require special handling:

1. **Shared database** - Both environments use same database
2. **Parallel change** - Use expand-contract pattern for schema changes
3. **Forward-compatible** - New schema works with old and new code
4. **Backward-compatible** - Old schema works with old and new code

### Best Practices

1. **Keep environments identical** - Same hardware, configuration, data
2. **Automate everything** - Switching should be a single command
3. **Smoke test before switch** - Verify the new environment works
4. **Monitor after switch** - Watch for problems in the first minutes
5. **Practice rollback** - Regularly test that rollback works

## Comparison with Canary Release

| Aspect | Blue-Green | Canary |
|--------|------------|--------|
| **Traffic split** | All-or-nothing | Gradual percentage |
| **Rollback speed** | Instant | Instant |
| **Risk exposure** | Brief moment during switch | Gradual exposure |
| **Infrastructure** | 2x production capacity | 1x + small canary |
| **Best for** | Low-risk changes | Validating with real traffic |

## Relationship to DORA Metrics

Blue-green deployment enables:

- **Time to Restore Service** - Instant rollback reduces MTTR
- **Change Failure Rate** - Production testing catches issues before exposure

## Relationship to Other Methods

- **Canary Release** - Can be combined: canary on green before full switch
- **Feature Flags** - Provide feature-level control within an environment
- **Deployment Pipeline** - Blue-green is the final deployment stage
- **Infrastructure as Code** - Ensures environments are truly identical

## Anti-Patterns

- **Environment drift** - Blue and green configurations diverge
- **Manual switching** - Relying on humans to execute the switch
- **No smoke tests** - Switching without verifying the new environment
- **Shared state problems** - Stateful components that can't be switched

## Citations

- Humble, J., & Farley, D. (2010). *Continuous Delivery*. Addison-Wesley.
- [Blue Green Deployment](https://martinfowler.com/bliki/BlueGreenDeployment.html) - Martin Fowler
- Fowler, M. (2006). "Evolutionary Database Design."
