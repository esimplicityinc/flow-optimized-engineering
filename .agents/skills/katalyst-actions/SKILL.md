---
name: katalyst-actions
description: Use when running, listing, or managing Katalyst layer actions. Covers the 57 canonical bundled actions, kata tax action run/list/show commands, action lifecycle stages (pre/main/post), the Just command runner framework, and tool-level vs layer-type actions.
---

# Katalyst Actions

Actions are executable commands bound to layer types. Katalyst ships with 57 canonical bundled actions that delegate to Just recipes, covering Docker, Terraform, Kubernetes, and more.

## When to Use This Skill

- Running actions on layers (`kata tax action run`)
- Understanding which actions are available for a layer type
- Working with the Just command runner framework
- Troubleshooting action failures

## Quick Start

```bash
# List all actions
kata tax action list

# List actions for a specific layer type
kata tax action list --layer-type app-docker

# Show action details
kata tax action show app-docker-build

# Run an action on a layer
kata tax action run app-docker-build --layer my-system.my-subsystem.my-stack.my-layer --env dev
```

## Action Lifecycle Stages

| Stage | Purpose | Examples |
|-------|---------|---------|
| `pre` | Validation, building, linting | build, plan, fmt, lint |
| `main` | Primary operations | apply, deploy, push, sync |
| `post` | Verification, cleanup, docs | security scan, wait, clean |

## Bundled Actions by Layer Type

### app-docker (4 actions)

| Action | Stage | Description |
|--------|-------|-------------|
| `app-docker-build` | pre | Build base and runtime Docker images |
| `app-docker-push` | main | Push images to container registry |
| `app-docker-load` | main | Load images into local kind cluster |
| `app-docker-security` | post | Scan images with Trivy |

### iac-terragrunt (11 actions)

| Action | Stage | Description |
|--------|-------|-------------|
| `iac-terragrunt-plan` | pre | Run terragrunt plan |
| `iac-terragrunt-apply` | main | Apply infrastructure changes |
| `iac-terragrunt-destroy` | main | Destroy infrastructure |
| `iac-terragrunt-fmt` | pre | Format Terraform files |
| `iac-terragrunt-hclfmt` | pre | Format HCL files |
| `iac-terragrunt-security` | post | Trivy security scan |
| `iac-terragrunt-docs` | post | Generate Terramaid docs |
| `iac-terragrunt-clean` | post | Remove .terragrunt-cache |
| `iac-terragrunt-run-all-plan` | pre | Plan all child modules |
| `iac-terragrunt-run-all-apply` | main | Apply all child modules |
| `iac-terragrunt-unlock` | main | Clear state lock |

### k8s-kustomize (11 actions)

| Action | Stage | Description |
|--------|-------|-------------|
| `k8s-kustomize-build` | pre | Render Kustomize manifests |
| `k8s-kustomize-apply` | main | Apply manifests to cluster |
| `k8s-kustomize-delete` | main | Delete resources |
| `k8s-kustomize-diff` | pre | Diff against live state |
| `k8s-kustomize-fmt` | pre | Validate with kubeconform |
| `k8s-kustomize-lint` | pre | Lint with kube-linter |
| `k8s-kustomize-security` | post | kubesec security scan |
| `k8s-kustomize-polaris` | post | Polaris best-practice audit |
| `k8s-kustomize-check` | pre | Run all validation checks |
| `k8s-kustomize-restart` | main | Rolling restart deployments |
| `k8s-kustomize-clean-jobs` | post | Delete completed jobs |

### k8s-argocd (3 actions)

| Action | Stage | Description |
|--------|-------|-------------|
| `argo-apply` | main | Apply ArgoCD Application manifest |
| `argo-sync` | main | Trigger ArgoCD sync |
| `argo-wait` | post | Wait for Synced/Healthy state |

## Tool-Level Actions (28 unscoped)

These are available for any layer type via Tool `actionRef` bindings:

- **Docker**: docker-build, docker-push, docker-run
- **Terraform**: terraform-fmt, terraform-validate, terraform-plan, terraform-apply
- **Terragrunt**: terragrunt-validate, terragrunt-plan, terragrunt-apply, terragrunt-run-all-plan, terragrunt-run-all-apply
- **Kubectl**: kubectl-apply, kubectl-rollout-status, kubectl-port-forward
- **Kustomize**: kustomize-build, kustomize-diff, kustomize-validate
- **K8s validation**: k8s-fmt, k8s-lint, k8s-security, k8s-polaris
- **AWS/Registries**: aws-login-check, aws-sso-login, ecr-login-check, ecr-login, ghcr-login-check, ghcr-login

## Just Framework

All actions delegate to Just recipes installed at `.global/taxonomy/actions/just/`:

```
.global/taxonomy/actions/just/
├── common.just          # Shared helpers (banner, logging, env)
├── stack.just           # Entry point (imports all layer types)
├── layerTypes/
│   ├── app-docker.just  # Docker layer recipes
│   ├── iac-terragrunt.just
│   └── ...
└── tools/
    ├── docker.just      # Low-level docker commands
    ├── kubectl.just
    └── ...
```

The root `Justfile` imports `stack.just`, making all recipes available via `just <recipe-name>`.

## Architecture: Tool > Action > Just

```
Tool (docker)  ──actionRef──>  Action (docker-build)  ──run──>  just docker-build-image
                                    ^
Layer Type (app-docker) ──scoped──> Action (app-docker-build) ──run──> just app-docker-build
                                                                          └──> just docker-build-image
```

## Troubleshooting

| Issue | Fix |
|-------|-----|
| "Action not found" | Check `kata tax action list --layer-type <type>` for available actions |
| "just: command not found" | Install Just: `brew install just` or `cargo install just` |
| "Recipe not found" | Ensure root Justfile imports `.global/taxonomy/actions/just/stack.just` |
| "Action timeout" | Increase `timeoutSeconds` in the action YAML or check network |
