---
name: katalyst-iac-terragrunt
description: Use when working with iac-terragrunt layers -- Terragrunt/Terraform infrastructure, state management, run-all orchestration, security scanning, and environment overlays.
scope:
  global: false
  layerTypes:
    - iac-terragrunt
---

# IaC Terragrunt Layer Type Reference

The `iac-terragrunt` layer type scaffolds Terragrunt-managed infrastructure layers with per-environment HCL configurations, shared composite modules, remote state management, and global includes. It is the standard Katalyst pattern for Infrastructure as Code.

## When to Use This Skill

- Creating, editing, or debugging an `iac-terragrunt` layer
- Working with `terragrunt.hcl`, Terraform modules, or state configuration
- Running actions like `iac-terragrunt-plan`, `iac-terragrunt-apply`, or `iac-terragrunt-security`
- Understanding the run-all orchestration pattern for multi-module stacks
- Troubleshooting state locks, plan failures, or module dependency issues

## Directory Structure

```
<layer-name>/
  layer.yaml                  # Taxonomy node definition (layerType: iac-terragrunt)
  Justfile                    # Auto-scaffolded (set fallback, LAYER_DIR, STACK_DIR, ENV)
  version.yaml                # Shared version pinning for providers/modules
  composite/                  # Shared Terraform modules (local source)
    main.tf
    variables.tf
    outputs.tf
  <environment>/              # One directory per environment (dev, staging, prod)
    terragrunt.hcl            # Environment-specific Terragrunt config
    environment.yaml          # Taxonomy environment node definition
```

Global includes are scaffolded at the stack level:

```
<stack>/
  iac-terragrunt/
    global/
      root.hcl                # Global Terragrunt root config (remote state, providers)
```

## Environment Contract

| Contract Key | Type | Description |
|---|---|---|
| `environment` | `templateReplacements` | Injected into Jinja2 templates when scaffolding |
| `remote_state_bucket` | `layerTemplates` | S3/GCS bucket for Terraform remote state |
| `remote_state_region` | `layerTemplates` | Cloud region for the remote state backend |

These keys must be defined in the environment's YAML configuration for scaffolding and linting to succeed.

## Terragrunt Configuration Pattern

Each environment directory contains a `terragrunt.hcl` that:

1. **Includes the global root** -- `include "root" { path = find_in_parent_folders("root.hcl") }`
2. **Sources the composite module** -- `terraform { source = "../composite" }`
3. **Provides environment-specific inputs** -- variables like region, instance size, feature flags

The `root.hcl` at the global level configures:
- Remote state backend (S3, GCS, etc.)
- Provider configuration
- Common inputs shared across all environments

## Available Actions

| Action | Stage | Recipe | Timeout | Description |
|--------|-------|--------|---------|-------------|
| `iac-terragrunt-plan` | `pre` | `just iac-terragrunt-plan` | 600s | Run terragrunt plan |
| `iac-terragrunt-apply` | `main` | `just iac-terragrunt-apply` | 1800s | Apply infrastructure changes |
| `iac-terragrunt-destroy` | `main` | `just iac-terragrunt-destroy` | 1800s | Destroy infrastructure resources |
| `iac-terragrunt-fmt` | `pre` | `just iac-terragrunt-fmt` | -- | Format Terraform files |
| `iac-terragrunt-hclfmt` | `pre` | `just iac-terragrunt-hclfmt` | -- | Format HCL files |
| `iac-terragrunt-security` | `post` | `just iac-terragrunt-security` | 600s | Trivy security scan against plan |
| `iac-terragrunt-docs` | `post` | `just iac-terragrunt-docs` | 600s | Generate Terramaid diagrams |
| `iac-terragrunt-clean` | `post` | `just iac-terragrunt-clean` | -- | Remove `.terragrunt-cache` dirs |
| `iac-terragrunt-run-all-plan` | `pre` | `just iac-terragrunt-run-all-plan` | 900s | Plan all child modules in dependency order |
| `iac-terragrunt-run-all-apply` | `main` | `just iac-terragrunt-run-all-apply` | 3600s | Apply all child modules |
| `iac-terragrunt-unlock` | `main` | `just iac-terragrunt-unlock` | -- | Clear a Terraform state lock |

### Typical CI/CD Flow

```
pre:  iac-terragrunt-fmt        (format check)
pre:  iac-terragrunt-plan       (preview changes)
main: iac-terragrunt-apply      (apply changes)
post: iac-terragrunt-security   (Trivy scan)
post: iac-terragrunt-docs       (update diagrams)
```

For multi-module stacks:

```
pre:  iac-terragrunt-run-all-plan
main: iac-terragrunt-run-all-apply
```

## Run-All Orchestration

The `run-all-plan` and `run-all-apply` actions use Terragrunt's dependency graph to execute across all child modules in the correct order. Key considerations:

- **Dependency resolution** -- Terragrunt reads `dependency` blocks in each `terragrunt.hcl` to determine execution order
- **Parallelism** -- Multiple independent modules execute in parallel by default
- **Timeout** -- `run-all-apply` has a 3600s (1 hour) timeout; large stacks may need more
- **Failure handling** -- If one module fails, dependent modules are skipped

## Just Recipes

All recipes are defined in `.global/taxonomy/actions/just/layerTypes/iac-terragrunt.just`. Key variables:

| Variable | Source | Description |
|----------|--------|-------------|
| `LAYER_DIR` | Layer `Justfile` | Absolute path to the layer directory |
| `STACK_DIR` | Layer `Justfile` | Parent stack directory |
| `ENV` | First `*/environment.yaml` or `"dev"` | Active environment name |

Run from inside the layer directory:

```bash
cd <layer-dir>
just iac-terragrunt-plan     # Plan for current ENV
ENV=prod just iac-terragrunt-plan  # Plan for prod
```

## Security Scanning

The `iac-terragrunt-security` action runs **Trivy** against the Terraform plan output:

- Scans for misconfigured infrastructure (security groups, IAM policies, encryption)
- Runs as a `post` stage action (after plan/apply)
- Produces JSON/table output of findings by severity

## State Management

- Remote state is configured in the global `root.hcl` via `remote_state` block
- The `remote_state_bucket` and `remote_state_region` are sourced from environment configuration
- Use `iac-terragrunt-unlock` to clear stuck state locks (e.g., after a failed CI run)

## Troubleshooting

| Issue | Cause | Fix |
|-------|-------|-----|
| Plan timeout (>600s) | Large module or provider downloads | Increase timeout; use provider cache |
| State lock error | Concurrent run or crashed process | Run `iac-terragrunt-unlock` or manually remove via `terraform force-unlock <ID>` |
| "No configuration files" | Wrong working directory | Ensure `ENV` is set and `<env>/terragrunt.hcl` exists |
| Remote state error | Missing bucket/region config | Check `remote_state_bucket` and `remote_state_region` in environment YAML |
| Module source error | Relative path issues | Composite modules should be at `../composite` relative to each environment dir |
| run-all fails midway | Dependency error in one module | Fix the failing module first; dependent modules will be skipped |
| `.terragrunt-cache` bloat | Stale cache directories | Run `iac-terragrunt-clean` to remove all cache dirs |
| HCL format failures | Inconsistent formatting | Run `iac-terragrunt-hclfmt` then `iac-terragrunt-fmt` |
