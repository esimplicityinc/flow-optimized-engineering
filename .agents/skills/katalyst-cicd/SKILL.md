---
name: katalyst-cicd
description: Use when generating CI/CD pipelines from Katalyst taxonomy. Covers CI/CD plugin types (Stages, JobTemplates, WorkflowTemplates), kata tax cicd render/validate commands, GitHub Actions template generation, Jinja2 rendering, and pipeline composition from taxonomy metadata.
---

# Katalyst CI/CD

Generate CI/CD pipeline configurations from your taxonomy metadata using stages, job templates, and workflow templates.

## When to Use This Skill

- Generating GitHub Actions workflows from taxonomy
- Creating or modifying CI/CD template definitions
- Understanding how taxonomy metadata drives pipeline generation
- Validating CI/CD templates

## Quick Start

```bash
# List workflows
kata tax cicd workflows

# List jobs
kata tax cicd jobs

# List stages
kata tax cicd stages

# Validate CI/CD templates
kata tax cicd validate

# Render a workflow for a layer
kata tax cicd render --workflow deploy --layer platform.backend.api-gateway.app --env dev
```

## Three Components

### Stages

Pipeline phases that jobs belong to:

```yaml
apiVersion: katalyst.taxonomy.plugins.cicd/v1alpha
kind: Stage
metadata:
  name: ci
spec:
  description: Continuous Integration
  dependsOn: []
---
apiVersion: katalyst.taxonomy.plugins.cicd/v1alpha
kind: Stage
metadata:
  name: deploy
spec:
  description: Deployment
  dependsOn: [ci]
```

### Job Templates

Reusable job definitions bound to layer types:

```yaml
apiVersion: katalyst.taxonomy.plugins.cicd/v1alpha
kind: JobTemplate
metadata:
  name: docker-build
spec:
  description: Build and push Docker image
  stage: ci
  layerType: app-docker
  template:
    path: templates/docker-build.yaml.j2
    renderer:
      type: jinja
  inputs:
    required:
      - IMAGE_NAME
    defaults:
      TAG: latest
  artifacts:
    produces:
      - docker-image
```

### Workflow Templates

Complete pipelines combining jobs:

```yaml
apiVersion: katalyst.taxonomy.plugins.cicd/v1alpha
kind: WorkflowTemplate
metadata:
  name: deploy
spec:
  description: Full deployment pipeline
  trigger:
    events: [push]
    branches: [main]
  jobs:
    - template: docker-build
      stage: ci
    - template: k8s-deploy
      stage: deploy
      needs: [docker-build]
```

## Jinja2 Template Variables

When rendering, these variables are available:

| Variable | Source | Example |
|----------|--------|---------|
| `layer_name` | Node name | `app` |
| `stack_name` | Parent stack | `api-gateway` |
| `subsystem_name` | Parent subsystem | `backend` |
| `system_name` | Parent system | `platform` |
| `fqtn` | Fully qualified name | `platform.backend.api-gateway.app` |
| `environment` | Target environment | `dev` |
| `layer_type` | Layer type annotation | `app-docker` |
| `replacements` | Env-specific replacements | `{namespace: dev, ...}` |

## File Organization

```
.global/taxonomy/
├── cicd/
│   ├── stages.yaml
│   ├── jobs.yaml
│   ├── workflows.yaml
│   └── templates/
│       └── jobs/
│           ├── docker-build.yaml.j2
│           ├── terragrunt-apply.yaml.j2
│           └── k8s-deploy.yaml.j2
```

## Pipeline Generation Flow

```
Taxonomy Nodes + CI/CD Templates + Environment Config
    │                │                    │
    └────────────────┼────────────────────┘
                     │
              kata tax cicd render
                     │
                     v
           GitHub Actions YAML
```

## Troubleshooting

| Issue | Fix |
|-------|-----|
| "Template not found" | Check `spec.template.path` resolves relative to the YAML file |
| "Missing input" | Add required inputs to the job template's `spec.inputs.required` |
| "Stage not found" | Ensure stage is defined in `stages.yaml` before referencing |
| "Render error" | Check Jinja2 syntax in `.j2` template files |
