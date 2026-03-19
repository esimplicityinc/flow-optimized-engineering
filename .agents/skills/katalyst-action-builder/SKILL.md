---
name: katalyst-action-builder
description: Use when creating new Katalyst Action YAML definitions. Covers the Action schema (apiVersion, kind, metadata, spec), naming conventions, lifecycle stages (pre/main/post), layerType binding, Just recipe integration, timeouts, tags, and how to extend the 57 canonical bundled actions.
---

# Katalyst Action Builder

Create new Action definitions that integrate with the Katalyst actions system. Actions are YAML documents that define executable commands bound to layer types.

## When to Use This Skill

- Creating a new custom action for a layer type
- Extending the 57 canonical bundled actions
- Writing Just recipes that actions delegate to
- Understanding the action schema and naming conventions

## Action Schema

```yaml
apiVersion: katalyst.taxonomy.plugins.actions/v1alpha
kind: Action
metadata:
  name: string              # Required: lowercase, DNS-safe, unique
  labels:                   # Optional
    layerType: string       # Binds action to a specific layer type
spec:
  description: string       # Optional but recommended
  type: shell               # Required: shell | http | workflow
  when: pre                 # Required: pre | main | post
  run: string               # Required: command to execute
  timeoutSeconds: number    # Optional: execution timeout
  environment:              # Optional: env vars
    KEY: value
  tags:                     # Optional: categorization
    - string
```

## Naming Conventions

### Layer-Type Actions (Scoped)

Pattern: `<layer-type>-<verb>` or `<layer-type>-<noun>`

```
app-docker-build          # Build Docker images
app-docker-push           # Push to registry
iac-terragrunt-plan       # Run terragrunt plan
k8s-kustomize-apply       # Apply manifests
```

### Tool-Level Actions (Unscoped)

Pattern: `<tool>-<verb>` or `<tool>-<noun>`

```
docker-build              # Generic docker build
kubectl-apply             # Generic kubectl apply
terraform-fmt             # Generic terraform format
```

### Rules

- Lowercase, hyphen-separated
- Prefix with layer type or tool name
- Verb describes the operation
- Must be unique across all actions

## Lifecycle Stage Selection

| Stage | When to Use | Examples |
|-------|-------------|---------|
| `pre` | Validation, building, formatting, planning | build, plan, fmt, lint, validate |
| `main` | Primary operations, deployment, mutation | apply, push, deploy, sync, destroy |
| `post` | Verification, cleanup, documentation, scanning | security, docs, wait, clean, notify |

## Creating a Scoped Action

Scoped actions appear only for layers of the matching type:

```yaml
apiVersion: katalyst.taxonomy.plugins.actions/v1alpha
kind: Action
metadata:
  name: app-docker-smoke-test
  labels:
    layerType: app-docker
spec:
  description: Run smoke tests against the deployed Docker service.
  type: shell
  when: post
  run: just app-docker-smoke-test
  timeoutSeconds: 120
  tags:
    - test
    - smoke
    - docker
```

## Creating an Unscoped Action

Unscoped actions are available for all layer types:

```yaml
apiVersion: katalyst.taxonomy.plugins.actions/v1alpha
kind: Action
metadata:
  name: notify-slack
spec:
  description: Send deployment notification to Slack.
  type: shell
  when: post
  run: |
    curl -X POST "$SLACK_WEBHOOK" \
      -H 'Content-Type: application/json' \
      -d "{\"text\": \"Deployed $LAYER_NAME to $ENV\"}"
  environment:
    SLACK_WEBHOOK: "${SLACK_WEBHOOK_URL}"
  tags:
    - notification
    - slack
```

## Just Recipe Integration

Actions typically delegate to Just recipes. To add a new action:

1. **Create the Just recipe** in `.global/taxonomy/actions/just/layerTypes/<type>.just`:

```just
# In app-docker.just
app-docker-smoke-test:
    #!/usr/bin/env bash
    set -euo pipefail
    {{BANNER_DEF}}
    banner "Smoke Test"
    curl -sf "http://localhost:${PORT:-8080}/health" || exit 1
```

2. **Create the Action YAML** in `.global/taxonomy/actions/`:

```yaml
apiVersion: katalyst.taxonomy.plugins.actions/v1alpha
kind: Action
metadata:
  name: app-docker-smoke-test
  labels:
    layerType: app-docker
spec:
  description: Run smoke tests against the deployed Docker service.
  type: shell
  when: post
  run: just app-docker-smoke-test
  tags:
    - test
    - smoke
```

3. **Validate** with `kata tax lint`

## Multi-Document Files

Group related actions in a single file using YAML document separators:

```yaml
# .global/taxonomy/actions/my-custom-actions.yaml
---
apiVersion: katalyst.taxonomy.plugins.actions/v1alpha
kind: Action
metadata:
  name: my-action-one
spec:
  type: shell
  when: pre
  run: echo "action one"
---
apiVersion: katalyst.taxonomy.plugins.actions/v1alpha
kind: Action
metadata:
  name: my-action-two
spec:
  type: shell
  when: main
  run: echo "action two"
```

## File Locations

| Type | Location |
|------|----------|
| Custom actions | `.global/taxonomy/actions/<domain>-actions.yaml` |
| Bundled actions | `templates/bundled/plugins/actions/` (read-only) |

Custom actions with the same `metadata.name` as a bundled action will take precedence.

## Validation Checklist

Before committing a new action:

- [ ] `apiVersion` is `katalyst.taxonomy.plugins.actions/v1alpha`
- [ ] `kind` is `Action`
- [ ] `metadata.name` is unique, lowercase, hyphen-separated
- [ ] `spec.type` is `shell`, `http`, or `workflow`
- [ ] `spec.when` is `pre`, `main`, or `post`
- [ ] `spec.run` contains a valid command
- [ ] `kata tax lint` passes
- [ ] If scoped, `metadata.labels.layerType` matches an installed layer type
