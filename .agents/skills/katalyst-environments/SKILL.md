---
name: katalyst-environments
description: Use when working with Katalyst environments -- dev, staging, prod configurations. Covers Environment YAML documents, promotion targets, template replacements per layer type, environment-specific overlays, and how environments flow through the taxonomy hierarchy.
---

# Katalyst Environments

Environments are first-class citizens in Katalyst, providing configuration isolation, promotion chains, and per-layer-type template replacements.

## When to Use This Skill

- Creating or modifying environment definitions
- Understanding promotion targets (dev -> staging -> prod)
- Configuring per-environment template replacements
- Working with environment-specific overlays in layer types

## Quick Start

```yaml
# environments.yaml
apiVersion: katalyst.taxonomy/v1alpha
kind: Environment
metadata:
  name: dev
spec:
  description: Development environment
  promotionTargets:
    - staging
  replacements:
    k8s-kustomize:
      cluster: "arn:aws:eks:us-east-1:123456789:cluster/dev"
      namespace: "dev"
    iac-terragrunt:
      awsRoleArn: "arn:aws:iam::123456789:role/terraform-dev"
      awsRegion: "us-east-1"
      stateBucket: "acme-terraform-state-dev"
```

## Environment Schema

```yaml
apiVersion: katalyst.taxonomy/v1alpha
kind: Environment
metadata:
  name: string              # Required: lowercase identifier
spec:
  description: string       # Required
  promotionTargets:         # Optional: where deployments go next
    - staging
  replacements:             # Optional: per-layer-type config
    <layerType>:
      <key>: <value>
```

## Promotion Chains

Define the deployment flow between environments:

```
dev -> staging -> prod
```

```yaml
# dev
spec:
  promotionTargets: [staging]

# staging
spec:
  promotionTargets: [prod]

# prod
spec:
  promotionTargets: []      # Terminal environment
```

## Template Replacements

Replacements are substituted into layer templates during scaffolding:

```yaml
spec:
  replacements:
    k8s-kustomize:
      cluster: "dev-cluster"
      namespace: "myapp-dev"
    iac-terragrunt:
      awsRegion: "us-east-1"
      stateBucket: "terraform-state-dev"
    app-docker:
      registry: "123456789.dkr.ecr.us-east-1.amazonaws.com"
```

In Kustomize overlay templates, these appear as:

```yaml
# overlays/dev/kustomization.yaml
namespace: {{ namespace }}
```

## Environment-Aware Actions

When running actions, specify the environment:

```bash
kata tax action run iac-terragrunt-plan --layer my-layer --env dev
kata tax action run k8s-kustomize-apply --layer my-layer --env prod
```

The `ENV` variable is set in the shell when executing the action's command.

## Node Environment Requirements

Every taxonomy node must declare at least one environment:

```yaml
spec:
  environments:
    - dev
    - staging
    - prod
```

## TUI Environment Selection

In the TUI, when running actions:
1. Press `a` on a layer
2. Select an action
3. Choose an environment from the dropdown
4. The action runs with `ENV=<selected>`

## Common Patterns

### Multi-Region

```yaml
# environments.yaml
---
apiVersion: katalyst.taxonomy/v1alpha
kind: Environment
metadata:
  name: prod-us-east
spec:
  description: Production US East
  replacements:
    iac-terragrunt:
      awsRegion: us-east-1
---
apiVersion: katalyst.taxonomy/v1alpha
kind: Environment
metadata:
  name: prod-eu-west
spec:
  description: Production EU West
  replacements:
    iac-terragrunt:
      awsRegion: eu-west-1
```

### Feature Environments

```yaml
apiVersion: katalyst.taxonomy/v1alpha
kind: Environment
metadata:
  name: feature
spec:
  description: Ephemeral feature branch environment
  promotionTargets: [dev]
```
