---
name: katalyst-navigator
description: Use when browsing, querying, or navigating a Katalyst Taxonomy. Covers FQTN resolution, kata tax tree/list/get/deps commands, dependency graph analysis, .taxignore rules, and the interactive TUI for visual taxonomy exploration.
---

# Katalyst Navigator

Navigate and query Katalyst taxonomy structures using the CLI, TUI, or programmatic APIs.

## When to Use This Skill

- Exploring an existing taxonomy to understand structure
- Finding specific nodes by name or FQTN
- Analyzing dependency graphs between layers
- Understanding what a team owns or what depends on a service
- Using the interactive TUI

## Quick Start

```bash
# See the full tree
kata tax tree

# Filter to a specific subtree
kata tax tree platform.backend

# Get a single node's details
kata tax get platform.backend.api-gateway.app

# View dependency graph
kata tax deps --format tree

# Launch interactive TUI
katalyst-tui --path .
```

## FQTN Resolution

Fully Qualified Taxonomy Names uniquely identify nodes:

```
system.subsystem.stack.layer           # Technical wing
organization.program.project           # Portfolio wing
organization.team.team_member          # Organizational wing
```

Resolution rules:
1. Names are matched case-insensitively
2. Partial paths match from the leaf upward
3. `kata tax get app` finds the first node named `app`
4. `kata tax get backend.api-gateway.app` is unambiguous

## Viewing Commands

### Tree View

```bash
kata tax tree                              # Full tree
kata tax tree --path /path/to/repo         # Specific repo
kata tax tree platform                     # Subtree rooted at "platform"
```

### List View

```bash
kata tax list                              # Grouped by type
```

### JSON Export

```bash
kata tax json                              # Full taxonomy as JSON
kata tax json | jq '.nodes | length'       # Count nodes
kata tax json | jq '.errors'               # Check for errors
```

### Get Single Node

```bash
kata tax get <fqtn>                        # Node details
kata tax get platform.backend.api-gateway  # Stack details
```

## Dependency Analysis

```bash
# Show dependency tree
kata tax deps --format tree

# Show as list
kata tax deps --format list

# Export as Mermaid diagram
kata tax deps --format mermaid

# Export as JSON
kata tax deps --format json
```

Dependencies are declared in node specs:

```yaml
spec:
  dependsOn:
    nodes:
      - name: database          # Same stack
      - name: auth-service
        stack: auth             # Different stack, same subsystem
      - name: api-gateway
        stack: api-gateway
        subsystem: core         # Different subsystem
```

## Interactive TUI

```bash
katalyst-tui --path .
```

Keyboard shortcuts:
- Arrow keys / mouse to navigate tree
- `c` — Open creation dialog for selected node
- `r` — Refresh from disk
- `w` — Toggle loader warnings
- `a` — Open action dialog for selected layer
- `q` — Quit

## .taxignore

Control which directories are skipped during discovery:

```
# .taxignore at repo root
node_modules/
.git/
vendor/
**/test-fixtures/
!important-fixture/
```

Syntax follows `.gitignore` conventions. Directories ending with `/` match only directories.

## Programmatic Access

```python
from katalyst_taxonomy.taxonomy.service import build_taxonomy
from katalyst_taxonomy.adapters.filesystem.repository import load_taxonomy

# Load taxonomy from disk
result = load_taxonomy(Path("/path/to/repo"))

# Access nodes
for doc in result.documents:
    print(f"{doc.fqtn} ({doc.node_type})")

# Check for errors
for error in result.errors:
    print(f"Error: {error}")
```
