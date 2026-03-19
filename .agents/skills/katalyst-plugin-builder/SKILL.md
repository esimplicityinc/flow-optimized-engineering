---
name: katalyst-plugin-builder
description: Use when creating Katalyst plugins -- Actions, Capabilities, Extensions, Tools, or CI/CD templates. Covers all plugin apiVersions and kinds, the Kubernetes-inspired YAML schema pattern, plugin architecture, dependency resolution, and validation with kata tax lint.
---

# Katalyst Plugin Builder

Create plugins that extend Katalyst's functionality. The plugin system follows a Kubernetes-inspired pattern with `apiVersion`, `kind`, `metadata`, and `spec` fields.

## When to Use This Skill

- Creating any type of Katalyst plugin
- Understanding the plugin architecture
- Working with plugin dependencies and activation
- Defining capabilities, extensions, or tools

## Plugin Types Overview

| apiVersion | Kind(s) | Purpose |
|------------|---------|---------|
| `katalyst.taxonomy.plugins.actions/v1alpha` | `Action` | Executable layer commands |
| `katalyst.taxonomy.plugins.tools/v1alpha` | `Tool` | Curated action collections |
| `katalyst.taxonomy.plugins.capabilities/v1alpha` | `Capability`, `CapabilityRelationship` | Service capabilities |
| `katalyst.taxonomy.plugins.extensions/v1alpha` | `Extension` | Augment other plugins |
| `katalyst.taxonomy.plugins.cicd/v1alpha` | `Stage`, `JobTemplate`, `WorkflowTemplate` | CI/CD templates |
| `katalyst.taxonomy.plugins.layer_types/v1alpha` | `LayerType` | Layer scaffolding templates |

## Common YAML Structure

Every plugin document follows this pattern:

```yaml
apiVersion: katalyst.taxonomy.plugins.<type>/v1alpha
kind: <Kind>
metadata:
  name: string              # Required: unique identifier
  labels:                   # Optional: key-value pairs for filtering
    key: value
  annotations:              # Optional: arbitrary metadata
    key: value
  requires:                 # Optional: plugin dependencies
    - apiVersion: ...
      kind: ...
      name: ...
spec:
  # Plugin-specific fields
```

## Capabilities

Model what services provide or consume:

```yaml
apiVersion: katalyst.taxonomy.plugins.capabilities/v1alpha
kind: Capability
metadata:
  name: user-authentication
spec:
  description: OAuth2/OIDC user authentication service
  categories:
    - security
    - identity
---
apiVersion: katalyst.taxonomy.plugins.capabilities/v1alpha
kind: CapabilityRelationship
metadata:
  name: api-gateway-needs-auth
spec:
  source:
    node: platform.core.api-gateway.app
    type: requires
  target:
    capability: user-authentication
```

**Location:** `.global/taxonomy/capabilities/`

## Tools

Curate collections of related actions:

```yaml
apiVersion: katalyst.taxonomy.plugins.tools/v1alpha
kind: Tool
metadata:
  name: docker
  labels:
    category: container
spec:
  description: Docker container management
  actions:
    - actionRef: docker-build
      description: Build container image
    - actionRef: docker-push
      description: Push to registry
    - actionRef: docker-run
      description: Run container locally
```

**Location:** `.global/taxonomy/tools/`

## Extensions

Augment other plugins conditionally:

```yaml
apiVersion: katalyst.taxonomy.plugins.extensions/v1alpha
kind: Extension
metadata:
  name: docker-security-scan
  requires:
    - apiVersion: katalyst.taxonomy.plugins.actions/v1alpha
      kind: Action
      name: app-docker-build
spec:
  description: Add security scanning after Docker builds
  target:
    apiVersion: katalyst.taxonomy.plugins.actions/v1alpha
    kind: Action
    name: app-docker-build
  contributions:
    tags:
      - security
    environment:
      SCAN_ENABLED: "true"
```

**Location:** `.global/taxonomy/extensions/`

## CI/CD Templates

See the `katalyst-cicd` skill for detailed CI/CD template creation.

**Location:** `.global/taxonomy/cicd/`

## Plugin File Locations

| Type | Recommended Location |
|------|---------------------|
| Actions | `.global/taxonomy/actions/<domain>-actions.yaml` |
| Capabilities | `.global/taxonomy/capabilities/<domain>-caps.yaml` |
| Tools | `.global/taxonomy/tools/tools.yaml` |
| Extensions | `.global/taxonomy/extensions/<name>.yaml` |
| CI/CD | `.global/taxonomy/cicd/` |
| Layer Types | `.global/taxonomy/layer_types/<name>/` |

## Plugin Dependencies

Declare dependencies using `metadata.requires`:

```yaml
metadata:
  name: my-extension
  requires:
    - apiVersion: katalyst.taxonomy.plugins.actions/v1alpha
      kind: Action
      name: app-docker-build
```

Katalyst resolves dependencies at load time and reports:
- Missing dependencies
- Circular dependencies
- Version conflicts

## Discovery

Plugins are discovered automatically from:
1. `.global/taxonomy/` (recursive search)
2. Any `.yaml` file with a matching `apiVersion`
3. Bundled canonical plugins (shipped with Katalyst)

Files in `.taxignore` are skipped.

## Validation

```bash
# Lint validates all plugins
kata tax lint

# Check plugin loading in TUI
katalyst-tui    # Press 'w' to toggle warnings

# Programmatic validation
python -c "
from katalyst_taxonomy.plugins import load_layer_actions
result = load_layer_actions(Path('.'))
print(f'Actions: {len(result.actions)} loaded')
for e in result.errors:
    print(f'  ERROR: {e}')
"
```

## Multi-Document Files

Group related resources in one file:

```yaml
# capabilities/auth-caps.yaml
---
apiVersion: katalyst.taxonomy.plugins.capabilities/v1alpha
kind: Capability
metadata:
  name: authentication
spec:
  description: User authentication
  categories: [security]
---
apiVersion: katalyst.taxonomy.plugins.capabilities/v1alpha
kind: CapabilityRelationship
metadata:
  name: api-needs-auth
spec:
  source:
    node: platform.core.api-gateway.app
    type: requires
  target:
    capability: authentication
```

## Checklist for New Plugins

- [ ] Correct `apiVersion` for the plugin type
- [ ] Correct `kind` matching the apiVersion
- [ ] Unique `metadata.name`
- [ ] File is in a discoverable location (not in `.taxignore`)
- [ ] `kata tax lint` passes
- [ ] Dependencies declared in `metadata.requires` if needed
- [ ] Description is clear and actionable
