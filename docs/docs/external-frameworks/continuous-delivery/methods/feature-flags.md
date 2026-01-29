---
displayed_sidebar: fieldGuideSidebar
sidebar_position: 3
title: Feature Flags
description: Configuration options that allow hiding incomplete features from users while continuing to integrate code.
framework: continuous-delivery
framework_url: https://continuousdelivery.com
foe_alignment:
  primary: Confidence
  secondary: Feedback
status: industry-standard
aliases:
  - Feature Toggles
  - Feature Bits
  - Feature Switches
---

# Feature Flags

**Pillar:** Patterns

Feature Flags (also called Feature Toggles) are configuration options that allow teams to modify system behavior without changing code. They enable deploying incomplete features to production while keeping them hidden from users, decoupling deployment from release.

## Definition

> "Feature Toggles (often also referred to as Feature Flags) are a powerful technique, allowing teams to modify system behavior without changing code."
>
> — Pete Hodgson, Martin Fowler's site

## Why It Matters

Feature flags are essential for Continuous Delivery because they:

- **Decouple deployment from release** - Deploy code without exposing features
- **Enable trunk-based development** - Incomplete features can be merged safely
- **Provide instant rollback** - Turn off problematic features without redeploying
- **Enable experimentation** - A/B test features with real users
- **Control feature exposure** - Release to specific users, regions, or percentages

## FOE Framing

**Primary: Confidence to Act**

Feature flags provide confidence by offering instant rollback capability. If a feature causes problems, it can be disabled in seconds without a deployment. Teams can deploy more frequently because the risk of any individual deployment is lower.

**Secondary: Fast Feedback Loops**

Flags enable progressive rollouts (canary releases) that provide real production feedback before full exposure. Teams can test features with a small percentage of users and gradually increase exposure based on feedback.

## Types of Feature Flags

| Type | Purpose | Lifespan |
|------|---------|----------|
| **Release Toggles** | Hide partly-built features | Days to weeks |
| **Experiment Toggles** | A/B testing | Days to weeks |
| **Ops Toggles** | Operational controls (kill switches) | Permanent |
| **Permission Toggles** | User access control | Permanent |

## How It Works

### Basic Implementation

```python
if feature_flags.is_enabled("new_checkout_flow"):
    return new_checkout_flow(user)
else:
    return legacy_checkout_flow(user)
```

### Best Practices

1. **Minimize toggle points** - Toggle at entry points, not throughout code
2. **Retire flags promptly** - Remove flags after features are stable
3. **Use a toggle system** - Don't hardcode flag values
4. **Test both paths** - Automated tests should cover flag on AND off
5. **Document flags** - Track what each flag does and when to remove it

### Flag Lifecycle

1. **Create** - Add flag for new feature (default: off)
2. **Deploy** - Code goes to production with flag off
3. **Enable** - Turn on for testing/canary users
4. **Roll out** - Gradually increase exposure
5. **Full release** - Enable for all users
6. **Clean up** - Remove flag and dead code path

### Anti-Patterns

- **Flag accumulation** - Leaving old flags in the codebase
- **Nested flags** - Complex flag logic that's hard to reason about
- **Testing one path** - Only testing with flag on or off, not both
- **Flag in every function** - Too many toggle points create complexity

## Relationship to DORA Metrics

Feature flags enable:

- **Time to Restore Service** - Instant rollback by disabling a flag
- **Change Failure Rate** - Progressive rollout catches problems early

## Relationship to Other Methods

- **Trunk-Based Development** - Flags enable merging incomplete features
- **Canary Release** - Flags control which users see new features
- **Blue-Green Deployment** - Flags provide feature-level control beyond environment switching
- **Deployment Pipeline** - Flags are configured separately from deployment

## Citations

- Humble, J., & Farley, D. (2010). *Continuous Delivery*. Addison-Wesley.
- [Feature Toggles](https://martinfowler.com/articles/feature-toggles.html) - Pete Hodgson
- [Feature Flags Best Practices](https://www.atlassian.com/continuous-delivery/principles/feature-flags)
