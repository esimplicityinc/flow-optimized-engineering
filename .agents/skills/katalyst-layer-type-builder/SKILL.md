---
name: katalyst-layer-type-builder
description: Use when creating new Katalyst layer type templates. Covers the LayerType schema, template directory structure (layer.yaml, Dockerfile, kustomization.yaml, terragrunt.hcl), environment overlays, Jinja2 template variables, and the kata tax add command for installing layer types.
---

# Katalyst Layer Type Builder

Create new layer type templates that provide scaffolding for taxonomy layers. Layer types define the directory structure, boilerplate files, and conventions for a specific technology pattern.

## When to Use This Skill

- Creating a new layer type for a technology not covered by the 4 bundled types
- Understanding the layer type template structure
- Adding environment overlay templates
- Defining how layers of this type should be scaffolded

## Layer Type Schema

```yaml
apiVersion: katalyst.taxonomy.plugins.layer_types/v1alpha
kind: LayerType
metadata:
  name: string              # Required: e.g., app-docker, k8s-helm
  labels:                   # Optional
    category: string        # e.g., application, infrastructure, kubernetes
spec:
  description: string       # Required
  defaultLayerDir: string   # Default directory name for layers of this type
  template: string          # Path to template directory (relative)
  filePatterns:             # Files that identify this layer type
    - "Dockerfile"
    - "docker-compose.yaml"
```

## Template Directory Structure

Each layer type is a directory containing template files:

```
layer_types/
└── app-docker/
    ├── layer.yaml              # Jinja2 template for the layer document
    ├── Dockerfile              # Docker boilerplate
    ├── .dockerignore
    ├── .env.example
    ├── docker-compose.yaml
    ├── README.md
    └── env-template/           # Per-environment overlay template
        └── .env.{{ environment }}
```

## Layer YAML Template

The `layer.yaml` file is a Jinja2 template rendered during scaffolding:

```yaml
apiVersion: katalyst.taxonomy/v1alpha
kind: TaxonomyNode
metadata:
  name: {{ layer_name }}
taxonomyNodeType: layer
spec:
  description: "{{ description }}"
  owners:
    - {{ owner }}
  environments:
{%- for env in environments %}
    - {{ env }}
{%- endfor %}
  parent:
    name: {{ stack_name }}
  annotations:
    layerType: app-docker
```

## Template Variables

Available during scaffolding:

| Variable | Description |
|----------|-------------|
| `layer_name` | Name of the layer being created |
| `description` | User-provided description |
| `owner` | Owner email |
| `environments` | List of environment names |
| `stack_name` | Parent stack name |
| `subsystem_name` | Parent subsystem name |
| `system_name` | Parent system name |
| `environment` | Current environment (in env-template/) |

## Bundled Layer Types

| Name | Category | Default Dir | Key Files |
|------|----------|-------------|-----------|
| `app-docker` | application | `app/` | Dockerfile, docker-compose.yaml |
| `k8s-kustomize` | kubernetes | `k8s/` | base/kustomization.yaml, overlays/ |
| `k8s-argocd` | kubernetes | `k8s/` | base/application.yaml |
| `iac-terragrunt` | infrastructure | `iac/` | terragrunt.hcl, composite/terraform/ |

## Creating a New Layer Type

### Step 1: Create the directory

```bash
mkdir -p .global/taxonomy/layer_types/my-new-type/env-template
```

### Step 2: Create layer.yaml template

```yaml
# .global/taxonomy/layer_types/my-new-type/layer.yaml
apiVersion: katalyst.taxonomy/v1alpha
kind: TaxonomyNode
metadata:
  name: {{ layer_name }}
taxonomyNodeType: layer
spec:
  description: "{{ description }}"
  owners:
    - {{ owner }}
  environments:
{%- for env in environments %}
    - {{ env }}
{%- endfor %}
  parent:
    name: {{ stack_name }}
  annotations:
    layerType: my-new-type
```

### Step 3: Add boilerplate files

Add any files that should be scaffolded when a layer of this type is created.

### Step 4: Add environment overlays (optional)

Files in `env-template/` are rendered once per environment:

```
env-template/
└── config.{{ environment }}.yaml
```

### Step 5: Register the layer type

Create a layer type definition:

```yaml
apiVersion: katalyst.taxonomy.plugins.layer_types/v1alpha
kind: LayerType
metadata:
  name: my-new-type
spec:
  description: My custom layer type
  defaultLayerDir: my/
  template: .global/taxonomy/layer_types/my-new-type
```

### Step 6: Create corresponding actions

Create Action YAML files for common operations on this layer type (build, deploy, test, etc.). See the `katalyst-action-builder` skill.

### Step 7: Create Just recipes (optional)

Add Just recipes in `.global/taxonomy/actions/just/layerTypes/my-new-type.just` and import from `stack.just`.

## Naming Conventions

- Lowercase, hyphen-separated
- Prefix indicates category: `app-`, `k8s-`, `iac-`, `docs-`, `tests-`
- Suffix indicates technology: `-docker`, `-kustomize`, `-terragrunt`
- Examples: `app-node`, `k8s-helm`, `iac-pulumi`, `docs-mkdocs`

## Validation

```bash
# Lint checks layer type references
kata tax lint

# Verify layer type appears
kata tax status
```
