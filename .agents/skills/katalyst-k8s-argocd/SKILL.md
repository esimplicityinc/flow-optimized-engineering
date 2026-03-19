---
name: katalyst-k8s-argocd
description: Use when working with k8s-argocd layers -- ArgoCD Application definitions, GitOps sync strategies, health checks, project structure, and environment-specific app configuration.
scope:
  global: false
  layerTypes:
    - k8s-argocd
---

# K8s ArgoCD Layer Type Reference

The `k8s-argocd` layer type scaffolds ArgoCD Application resources that point to Kubernetes manifests (typically Kustomize overlays) and manage GitOps-based deployment. It is the standard Katalyst pattern for declarative, Git-driven continuous delivery.

## When to Use This Skill

- Creating, editing, or debugging a `k8s-argocd` layer
- Working with ArgoCD Application manifests, sync policies, or health checks
- Running actions like `argo-apply`, `argo-sync`, or `argo-wait`
- Understanding the relationship between ArgoCD apps and Kustomize layers
- Troubleshooting sync failures, health status, or project configuration

## Directory Structure

```
<layer-name>/
  layer.yaml                    # Taxonomy node definition (layerType: k8s-argocd)
  Justfile                      # Auto-scaffolded (set fallback, LAYER_DIR, STACK_DIR, ENV)
  base/                         # Shared Kustomize base for ArgoCD resources
    kustomization.yaml          # Base kustomization
    namespace.yaml              # ArgoCD project namespace
    app/                        # ArgoCD Application definitions
      application.yaml          # ArgoCD Application manifest
      kustomization.yaml
  <environment>/                # One directory per environment
    kustomization.yaml          # Environment overlay (patches destination, project, source)
    environment.yaml            # Taxonomy environment node definition
```

## Environment Contract

| Contract Key | Type | Description |
|---|---|---|
| `environment` | `templateReplacements` | Injected into Jinja2 templates when scaffolding |
| `environment_namespace` | `layerTemplates` | Target Kubernetes namespace for the ArgoCD app |
| `argocd_project_environment` | `layerTemplates` | ArgoCD project name for this environment |

## ArgoCD Application Pattern

The core resource is an ArgoCD `Application` manifest that declaratively specifies:

```yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: my-app-dev
  namespace: argocd
spec:
  project: my-project-dev
  source:
    repoURL: https://github.com/org/repo.git
    targetRevision: HEAD
    path: path/to/kustomize/dev
  destination:
    server: https://kubernetes.default.svc
    namespace: my-app-dev
  syncPolicy:
    automated:
      prune: true
      selfHeal: true
    syncOptions:
      - CreateNamespace=true
```

Key fields:
- **`source.path`** -- points to a Kustomize overlay directory (often a sibling `k8s-kustomize` layer's environment dir)
- **`destination.namespace`** -- from `environment_namespace` in the environment contract
- **`project`** -- from `argocd_project_environment` in the environment contract
- **`syncPolicy.automated`** -- enables auto-sync with prune and self-heal

## Available Actions

| Action | Stage | Recipe | Timeout | Description |
|--------|-------|--------|---------|-------------|
| `argo-apply` | `main` | `just argo-apply` | 300s | Apply the ArgoCD Application manifest to the cluster |
| `argo-sync` | `main` | `just argo-sync` | 300s | Trigger an ArgoCD sync for the application |
| `argo-wait` | `post` | `just argo-wait` | 600s | Wait for Synced/Healthy state |

### Typical CI/CD Flow

```
main: argo-apply    (apply/update the Application manifest)
main: argo-sync     (trigger a sync if not automated)
post: argo-wait     (wait for health convergence)
```

If `syncPolicy.automated` is enabled, `argo-sync` is optional -- ArgoCD will detect the manifest change and sync automatically. The `argo-wait` action is still valuable to block the pipeline until the deployment is healthy.

## Sync Strategies

| Strategy | Use Case | Configuration |
|----------|----------|---------------|
| **Automated** | Standard GitOps (recommended) | `syncPolicy.automated.prune: true, selfHeal: true` |
| **Manual** | Sensitive environments | Omit `syncPolicy.automated`; use `argo-sync` action |
| **Auto with approval** | Staged rollouts | Automated sync + sync waves + health checks |

## Relationship to k8s-kustomize Layers

ArgoCD layers typically work alongside `k8s-kustomize` layers:

```
my-stack/
  k8s/                        # k8s-kustomize layer (the manifests)
    base/
    dev/
    prod/
  argocd/                     # k8s-argocd layer (the ArgoCD app pointing to k8s/)
    base/
    dev/
    prod/
```

The ArgoCD Application's `source.path` references the Kustomize layer's environment directory. This separation keeps the "what to deploy" (Kustomize) separate from the "how to deploy" (ArgoCD).

## Just Recipes

All recipes are in `.global/taxonomy/actions/just/layerTypes/k8s-argocd.just`. Key variables:

| Variable | Source | Description |
|----------|--------|-------------|
| `LAYER_DIR` | Layer `Justfile` | Absolute path to the layer directory |
| `STACK_DIR` | Layer `Justfile` | Parent stack directory |
| `ENV` | First `*/environment.yaml` or `"dev"` | Active environment name |

Run from inside the layer directory:

```bash
cd <layer-dir>
just argo-apply       # Apply Application manifest
just argo-sync        # Trigger sync
just argo-wait        # Wait for healthy state
ENV=prod just argo-apply  # Apply prod Application
```

## Health Status

ArgoCD reports two independent status dimensions:

| Status | Meaning |
|--------|---------|
| **Synced** | Live state matches desired state in Git |
| **Healthy** | All resources report healthy (pods running, services ready) |
| **OutOfSync** | Drift detected between Git and cluster |
| **Degraded** | Some resources are unhealthy |
| **Progressing** | Sync or rollout in progress |

The `argo-wait` action blocks until both **Synced** and **Healthy** are achieved, with a 600s timeout.

## Troubleshooting

| Issue | Cause | Fix |
|-------|-------|-----|
| Sync stuck on "Progressing" | Deployment rollout not completing | Check pod events: `kubectl describe pod` in target namespace |
| "ComparisonError" | Invalid manifests in source path | Validate manifests with `kustomize build` on the referenced path |
| "app not found" after apply | Application in wrong namespace | Ensure `metadata.namespace: argocd` (or your ArgoCD namespace) |
| "permission denied" | Project restrictions | Add destination namespace/server to ArgoCD project |
| Health timeout (>600s) | Slow image pulls or resource constraints | Check cluster resources; increase `argo-wait` timeout |
| Auto-sync not triggering | Missing syncPolicy or webhook | Check `syncPolicy.automated` is set; verify Git webhook to ArgoCD |
| Prune deleting resources | Resources not managed by Kustomize | Add `argocd.argoproj.io/managed-by` annotations or exclude from prune |
