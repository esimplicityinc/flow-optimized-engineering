---
name: katalyst-taxonomy
description: Use when working with Katalyst Taxonomy -- a hierarchical architecture modeling system. Covers core concepts (systems, subsystems, stacks, layers), portfolio types (organizations, programs, projects), organizational types (teams, team members), YAML schema, node creation, validation with kata tax lint, and CLI commands for viewing/querying taxonomy structures.
---

# Katalyst Taxonomy

Katalyst Taxonomy is a declarative, version-controlled system for modeling software architecture. It supports three wings of taxonomy nodes:

- **Technical Wing** — A four-tier hierarchy: System > Subsystem > Stack > Layer
- **Portfolio Wing** — Organization > Program > Project
- **Organizational Wing** — Teams (nestable) and Team Members

All definitions are YAML documents discovered from the filesystem.

## When to Use This Skill

- Creating or modifying taxonomy nodes (systems, subsystems, stacks, layers, organizations, programs, projects, teams, team members)
- Understanding the hierarchy and how nodes relate
- Writing or editing taxonomy YAML files
- Running `kata` CLI commands
- Validating taxonomy structure with `kata tax lint`

## The Three Wings

### Technical Wing (Four-Tier Hierarchy)

```
System              # Top-level platform or product
└── Subsystem       # Logical grouping (e.g., backend, frontend)
    └── Stack       # Deployable unit (e.g., api-gateway)
        └── Layer   # Individual component (e.g., app, k8s, iac)
```

### Portfolio Wing

```
Organization        # Company, agency, or partner (root)
├── Program         # Contract, initiative, or program of work
│   └── Project     # Deliverable or workstream
└── Project         # Project can also be direct child of organization
```

### Organizational Wing

```
Organization        # Shared root with Portfolio Wing
└── Team            # Division, branch, squad (nestable)
    ├── Team        # Sub-team (teams can nest)
    └── Team Member # Individual contributor
```

### Node Types

| Type | Wing | Parent(s) | Purpose | Typical File |
|------|------|-----------|---------|-------------|
| `system` | Technical | None | Root of architecture | `system.yaml` |
| `subsystem` | Technical | system | Logical grouping | `sub_system.yaml` |
| `stack` | Technical | subsystem | Deployable unit | `stack.yaml` |
| `layer` | Technical | stack | Individual component | `layer.yaml` |
| `organization` | Portfolio | None | Company or agency | `organization.yaml` |
| `program` | Portfolio | organization | Contract or initiative | `program.yaml` |
| `project` | Portfolio | program OR organization | Deliverable or workstream | `project.yaml` |
| `team` | Organizational | organization OR team | Division, branch, squad | `team.yaml` |
| `team_member` | Organizational | team | Individual contributor | `team_member.yaml` |
| `user` | Organizational | None | End user definition | `user.yaml` |

### Linking Wings with Labels

Systems reference portfolio/organizational nodes via `metadata.labels`:

```yaml
metadata:
  name: qpp-portal
  labels:
    organization: esimplicity    # references an organization node
    client: cms                  # references an organization with orgType: client
    program: cms-qpp-program     # references a program node
    project: qpp-portal          # references a project node
    team: platform-engineering   # references a team node
```

`kata tax lint` validates that label references point to existing documents.

## YAML Schema

Every taxonomy document follows this structure:

```yaml
apiVersion: katalyst.taxonomy/v1alpha
kind: TaxonomyNode
metadata:
  name: my-node              # Required: lowercase, DNS-safe
taxonomyNodeType: system      # system|subsystem|stack|layer|organization|program|project|team|team_member|user
spec:
  description: "..."          # Required
  owners:                     # Required: at least one
    - team@example.com
  environments:               # Required: at least one
    - dev
    - prod
  parent:                     # Required for child types
    name: parent-name
  dependsOn:                  # Optional
    nodes:
      - name: other-layer
  annotations:                # Optional
    layerType: app-docker     # For layers: scaffolding type
```

### Type-Specific Spec Blocks

#### Organization (`spec.organization`)

```yaml
spec:
  organization:
    orgType: contractor       # contractor|client|partner|vendor|internal
    tags:
      - federal
```

#### Program (`spec.program`)

```yaml
spec:
  program:
    programType: contract     # contract|initiative|portfolio
    contractVehicle: "IDIQ"   # optional
    tags:
      - cms
```

#### Project (`spec.project`)

```yaml
spec:
  project:
    status: active            # active|planning|completed|archived
    tags:
      - modernization
```

#### Team (`spec.team`)

```yaml
spec:
  team:
    unitType: squad           # division|branch|squad|chapter|guild
    reportsTo: vp-engineering # optional
    capabilities:
      - cloud-infrastructure
    segments:
      - platform
    responsibilities:
      - CI/CD pipeline management
```

#### Team Member (`spec.teamMember`)

```yaml
spec:
  teamMember:
    role: lead-engineer
    email: jane.doe@example.com
    skills:
      - kubernetes
      - terraform
```

## Fully Qualified Taxonomy Name (FQTN)

Nodes are uniquely identified by their path in the hierarchy:

```
system.subsystem.stack.layer
```

Examples:
- `platform` (system)
- `platform.backend` (subsystem)
- `platform.backend.api-gateway` (stack)
- `platform.backend.api-gateway.app` (layer)
- `esimplicity` (organization)
- `esimplicity.cms-qpp-program` (program)
- `esimplicity.cms-qpp-program.portal-modernization` (project)
- `esimplicity.platform-engineering` (team)
- `esimplicity.platform-engineering.jane-doe` (team_member)

## File Organization

### Deep Layout (Recommended)

```
repo/
├── system.yaml
└── backend/
    ├── sub_system.yaml
    └── api-gateway/
        ├── stack.yaml
        ├── app/
        │   └── layer.yaml
        └── k8s/
            └── layer.yaml
```

### Root Layout

```
repo/
├── system.yaml
├── backend.sub_system.yaml
├── api-gateway.stack.yaml
└── app.layer.yaml
```

### By-Kind Layout (Used for Portfolio/Organizational Types)

```
repo/
├── organizations/
│   ├── esimplicity.yaml
│   └── cms.yaml
├── programs/
│   └── cms-qpp-program.yaml
├── projects/
│   └── portal-modernization.yaml
├── teams/
│   └── platform-engineering.yaml
└── team_members/
    └── jane-doe.yaml
```

## Essential CLI Commands

```bash
# View taxonomy as tree
kata tax tree

# View as list
kata tax list

# Export as JSON
kata tax json

# Get a specific node
kata tax get platform.backend.api-gateway

# Validate taxonomy
kata tax lint

# Create a new node
kata tax create system my-platform \
  -d "My platform" \
  -O team@example.com \
  -e dev -e prod

kata tax create layer app \
  --parent api-gateway \
  --parent-subsystem backend \
  --parent-system my-platform \
  -d "Application layer" \
  -O team@example.com \
  -e dev -e prod \
  --layer-type app-docker

# Create an organization
kata tax create organization esimplicity \
  -d "eSimplicity Inc." \
  -O admin@esimplicity.com \
  -e dev -e prod

# Create a team
kata tax create team platform-engineering \
  --parent esimplicity \
  -d "Platform Engineering squad" \
  -O lead@esimplicity.com \
  -e dev -e prod

# Initialize a new taxonomy repo
kata tax init --yes

# Check installed components
kata tax status
```

## Environments

Environments are first-class citizens defined in `environments.yaml`:

```yaml
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
      namespace: dev
    iac-terragrunt:
      awsRegion: us-east-1
```

## Layer Types

Layers can be annotated with a `layerType` to enable scaffolding:

| Layer Type | Use For |
|-----------|---------|
| `app-docker` | Docker containers, microservices |
| `k8s-kustomize` | Kubernetes manifests with Kustomize |
| `k8s-argocd` | ArgoCD-managed applications |
| `iac-terragrunt` | Terraform/Terragrunt infrastructure |

When the Just plugin is installed (`.global/taxonomy/actions/just/` exists), `kata tax create layer` also scaffolds a `Justfile` into the layer directory. This enables running `just <recipe>` directly from within the layer, with `LAYER_DIR`, `STACK_DIR`, and `ENV` automatically set.

## Validation Rules

`kata tax lint` checks:
- Schema compliance (required fields, types)
- Parent references exist
- No circular dependencies
- Valid environment references
- Unique names within scope
- Valid `layerType` annotations
- Label references (organization, program, project, team) point to existing documents

## Troubleshooting

| Issue | Fix |
|-------|-----|
| "Parent not found" | Check `spec.parent.name` matches an existing node's `metadata.name` |
| "Duplicate name" | Two nodes at the same level share a name; rename one |
| "Missing environment" | Add the environment to `spec.environments` or create the Environment document |
| "Unknown layerType" | Install the layer type with `kata tax add --layer-type <name>` |
| "Invalid label reference" | Ensure the label value matches an existing node's `metadata.name` |
| "Invalid orgType" | Use one of: `contractor`, `client`, `partner`, `vendor`, `internal` |
