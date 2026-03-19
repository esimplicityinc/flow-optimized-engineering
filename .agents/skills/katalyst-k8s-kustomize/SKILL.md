---
name: katalyst-k8s-kustomize
description: Use when working with k8s-kustomize layers -- Kustomize bases and overlays, namespace management, kubeconform validation, kube-linter, Polaris audits, and environment-specific deployments.
scope:
  global: false
  layerTypes:
    - k8s-kustomize
---

# K8s Kustomize Layer Type Reference

The `k8s-kustomize` layer type scaffolds Kubernetes resource layers using Kustomize for base manifests with per-environment overlays, namespace isolation, and a comprehensive validation toolchain (kubeconform, kube-linter, kubesec, Polaris). It is the standard Katalyst pattern for Kubernetes workload deployment.

## When to Use This Skill

- Creating, editing, or debugging a `k8s-kustomize` layer
- Working with `kustomization.yaml`, deployments, services, or namespace manifests
- Running actions like `k8s-kustomize-build`, `k8s-kustomize-apply`, or `k8s-kustomize-check`
- Understanding the base/overlay Kustomize pattern
- Troubleshooting manifest validation failures or deployment issues

## Directory Structure

```
<layer-name>/
  layer.yaml                    # Taxonomy node definition (layerType: k8s-kustomize)
  Justfile                      # Auto-scaffolded (set fallback, LAYER_DIR, STACK_DIR, ENV)
  base/                         # Shared Kustomize base
    kustomization.yaml          # Base kustomization (resources list)
    namespace.yaml              # Namespace definition (optional)
    deployment.yaml             # Deployment manifest (optional)
    service.yaml                # Service manifest (optional)
  <environment>/                # One directory per environment (dev, staging, prod)
    kustomization.yaml          # Overlay kustomization (patches, replicas, images)
    environment.yaml            # Taxonomy environment node definition
```

Global includes are scaffolded at the stack level:

```
<stack>/
  k8s-kustomize/
    global/
      kustomization.yaml        # Global Kustomize resources shared across layers
```

**Note:** `base/deployment.yaml`, `base/namespace.yaml`, and `base/service.yaml` are listed as `optionalPaths` in the layer type definition -- they won't trigger lint warnings if absent.

## Environment Contract

| Contract Key | Type | Description |
|---|---|---|
| `environment` | `templateReplacements` | Injected into Jinja2 templates when scaffolding |
| `namespace` | `layerTemplates` | Kubernetes namespace for this environment |

## Kustomize Base/Overlay Pattern

The `base/` directory contains the shared resource definitions:

```yaml
# base/kustomization.yaml
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization
resources:
  - namespace.yaml
  - deployment.yaml
  - service.yaml
```

Each environment overlay customises the base:

```yaml
# dev/kustomization.yaml
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization
resources:
  - ../base
patches:
  - target:
      kind: Deployment
    patch: |-
      - op: replace
        path: /spec/replicas
        value: 1
images:
  - name: my-app
    newTag: dev-latest
```

Build and inspect rendered manifests:

```bash
kustomize build <layer-dir>/dev/
# or
just k8s-kustomize-build
```

## Available Actions

| Action | Stage | Recipe | Timeout | Description |
|--------|-------|--------|---------|-------------|
| `k8s-kustomize-build` | `pre` | `just k8s-kustomize-build` | -- | Render Kustomize manifests for target environment |
| `k8s-kustomize-apply` | `main` | `just k8s-kustomize-apply` | 300s | Apply manifests to cluster |
| `k8s-kustomize-delete` | `main` | `just k8s-kustomize-delete` | 300s | Delete Kustomize-managed resources |
| `k8s-kustomize-diff` | `pre` | `just k8s-kustomize-diff` | -- | Diff against live cluster state |
| `k8s-kustomize-fmt` | `pre` | `just k8s-kustomize-fmt` | -- | Validate with kubeconform schema checks |
| `k8s-kustomize-lint` | `pre` | `just k8s-kustomize-lint` | -- | Lint with kube-linter |
| `k8s-kustomize-security` | `post` | `just k8s-kustomize-security` | -- | kubesec security scan |
| `k8s-kustomize-polaris` | `post` | `just k8s-kustomize-polaris` | -- | Polaris best-practice audit |
| `k8s-kustomize-check` | `pre` | `just k8s-kustomize-check` | -- | Run all validation checks (fmt + lint + security) |
| `k8s-kustomize-restart` | `main` | `just k8s-kustomize-restart` | 300s | Rolling restart of deployments |
| `k8s-kustomize-clean-jobs` | `post` | `just k8s-kustomize-clean-jobs` | -- | Delete completed jobs in namespace |

### Typical CI/CD Flow

```
pre:  k8s-kustomize-check       (all validations: kubeconform + kube-linter + kubesec)
pre:  k8s-kustomize-diff        (preview changes against live state)
main: k8s-kustomize-apply       (deploy to cluster)
post: k8s-kustomize-polaris     (best-practice audit)
```

## Validation Toolchain

The `k8s-kustomize` layer type has the richest validation pipeline of all canonical types:

| Tool | Action | Purpose |
|------|--------|---------|
| **kubeconform** | `k8s-kustomize-fmt` | Schema validation against Kubernetes API schemas |
| **kube-linter** | `k8s-kustomize-lint` | Static analysis for best practices and anti-patterns |
| **kubesec** | `k8s-kustomize-security` | Security-focused manifest scanning |
| **Polaris** | `k8s-kustomize-polaris` | Broad best-practice audit (health checks, resources, security) |

The `k8s-kustomize-check` action runs fmt + lint + security in a single pass for CI convenience.

## Just Recipes

All recipes are in `.global/taxonomy/actions/just/layerTypes/k8s-kustomize.just`. Key variables:

| Variable | Source | Description |
|----------|--------|-------------|
| `LAYER_DIR` | Layer `Justfile` | Absolute path to the layer directory |
| `STACK_DIR` | Layer `Justfile` | Parent stack directory |
| `ENV` | First `*/environment.yaml` or `"dev"` | Active environment name |

Run from inside the layer directory:

```bash
cd <layer-dir>
just k8s-kustomize-check     # Run all validations
just k8s-kustomize-diff      # Preview changes
just k8s-kustomize-apply     # Deploy
ENV=prod just k8s-kustomize-apply  # Deploy to prod
```

## Namespace Management

Each environment typically gets its own namespace. The `namespace` key in the environment contract provides the value used during scaffolding.

Pattern: `<app-name>-<environment>` (e.g., `my-service-dev`, `my-service-prod`)

The `base/namespace.yaml` defines the namespace resource; environment overlays can patch labels or annotations.

## Troubleshooting

| Issue | Cause | Fix |
|-------|-------|-----|
| kubeconform schema error | Invalid or unknown API version | Update kubeconform schemas; add custom CRD schemas |
| kube-linter warnings | Missing resource limits, probes, etc. | Add resource requests/limits and health probes to deployment |
| kubesec failure | Privileged container or host networking | Remove `privileged: true`; use `readOnlyRootFilesystem` |
| Polaris audit failure | Missing security context | Add `runAsNonRoot`, `readOnlyRootFilesystem`, drop capabilities |
| Apply timeout (>300s) | Large deployment or image pull | Check image availability; increase timeout |
| Diff shows unexpected changes | Drift from manual edits | Re-apply manifests or reconcile manual changes into base |
| "namespace not found" | Namespace not created before resources | Ensure `namespace.yaml` is first in `kustomization.yaml` resources |
| Build fails | Invalid kustomization.yaml | Check resource paths and patch targets match actual manifests |
