# Error Fix Guide

Detailed fix procedures for each linter error and warning type.

## Errors (Must Fix)

### `id_mismatch`

**Problem:** The `methodId` or `observationId` in frontmatter doesn't match the filename.

**Example:**
```
File: M123-my-method.md
Frontmatter: methodId: M100  # Wrong!
```

**Auto-Fix Procedure:**
1. Extract the ID from filename: `M###` or `O###` prefix
2. Update frontmatter to match:

```python
# Pseudo-code for auto-fix
filename = "M123-my-method.md"
id_from_filename = filename.split("-")[0]  # "M123"

# Update frontmatter
if file_type == "method":
    frontmatter["methodId"] = id_from_filename
else:
    frontmatter["observationId"] = id_from_filename
```

**Manual Fix:**
Edit the file and change `methodId: M123` or `observationId: O123` to match filename.

---

### `missing_required_field`

**Problem:** A required frontmatter field is missing.

**Required Fields by Type:**

| File Type | Required Fields |
|-----------|-----------------|
| Internal Method | `title`, `methodId`, `foe_maturity`, `observations`, `sidebar_position` |
| External Method | `title`, `methodId`, `foe_maturity`, `framework`, `canonical_method`, `sidebar_position` |
| Internal Observation | `title`, `observationId`, `source_type: internal`, `status`, `methods`, `sidebar_position` |
| External Observation | `title`, `observationId`, `source_type: external`, `status`, `methods`, `source.authors`, `source.organization`, `source.year`, `source.url`, `sidebar_position` |

**Auto-Fix Procedure (partial):**

For array fields (`observations`, `methods`), add empty array:
```yaml
observations: []
methods: []
```

For `sidebar_position`, add default:
```yaml
sidebar_position: 99
```

For other required fields, **cannot auto-fix** - report to user.

**Manual Fix:**
Add the missing field with appropriate value.

---

### `invalid_value`

**Problem:** A field has an invalid value.

**Common Cases:**

| Field | Valid Values |
|-------|--------------|
| `foe_maturity` | `hypothesized`, `observing`, `validated`, `proven` |
| `source_type` | `internal`, `external` |
| `status` | `completed`, `in-progress` |

**Auto-Fix:** Generally not auto-fixable - requires human judgment.

**Manual Fix:**
Update field to a valid value. Check the skill frameworks for valid options:
- `foe-method-framework` for method fields
- `foe-observation-framework` for observation fields

---

### `folder_mismatch`

**Problem:** File is in the wrong folder for its maturity level.

**Rules:**
| Maturity | Required Folder |
|----------|-----------------|
| `hypothesized` | `methods/emerging/` |
| `observing` | `methods/emerging/` |
| `validated` | `methods/established/` |
| `proven` | `methods/established/` |

**Auto-Fix:** Not auto-fixable - file move required.

**Manual Fix Options:**

1. **Move the file** to the correct folder:
   ```bash
   mv methods/emerging/M123-method.md methods/established/M123-method.md
   ```

2. **Change the maturity** to match current folder:
   ```yaml
   foe_maturity: observing  # If in emerging/
   ```

**Recommendation:** Usually the maturity is correct and the file needs to be moved.

---

### `broken_reference`

**Problem:** A path in `methods:` or `observations:` points to a non-existent file.

**Example:**
```yaml
methods:
  - agentic-coding/methods/established/M999-nonexistent  # File doesn't exist!
```

**Auto-Fix:** Not auto-fixable - needs human decision.

**Manual Fix:**
1. Check if the path has a typo
2. Check if the referenced file was renamed/moved
3. Remove the reference if it's no longer valid
4. Create the referenced file if it should exist

---

### `framework_not_found`

**Problem:** External method references a framework that doesn't exist.

**Example:**
```yaml
framework: nonexistent-framework  # No matching folder in external-frameworks/
```

**Auto-Fix:** Not auto-fixable.

**Manual Fix:**
1. Check the `docs/docs/external-frameworks/` directory for available frameworks
2. Fix the typo in framework name, or
3. Import the framework first using Framework Cartographer

---

### `canonical_method_not_found`

**Problem:** External method's `canonical_method` doesn't exist in the referenced framework.

**Example:**
```yaml
framework: dora
canonical_method: nonexistent-metric  # Not in dora/methods/
```

**Auto-Fix:** Not auto-fixable.

**Manual Fix:**
1. Check `docs/docs/external-frameworks/[framework]/methods/` for available methods
2. Fix the canonical_method reference, or
3. Create the canonical method in the external framework

---

## Warnings (Should Fix)

### `empty_observations`

**Problem:** Method has no linked observations.

**Context:**
- **Expected** for `hypothesized` methods (proposals without evidence yet)
- **Concern** for `validated`/`proven` methods (should have evidence)

**Auto-Fix:** Not auto-fixable - needs observation creation.

**Manual Fix:**
1. If method is new: This is expected, will be populated as observations are created
2. If method is established: Find and link relevant observations, or create new ones

---

### `id_gap`

**Problem:** Gap in the ID numbering sequence (e.g., M100, M101, M103 - missing M102).

**Context:** This is informational - helps identify if a file was deleted or if numbering jumped.

**Auto-Fix:** Not auto-fixable (renumbering would break references).

**Manual Fix:**
- Usually safe to ignore
- If a file was accidentally deleted, restore it
- For new files, use the next available number (don't fill gaps)

---

### `missing_bidirectional_link`

**Problem:** A method links to an observation, but the observation doesn't link back (or vice versa).

**Example:**
```yaml
# In method file:
observations:
  - observations/internal/O100-my-observation

# In observation file - MISSING the back-reference:
methods: []  # Should include the method!
```

**Auto-Fix Procedure:**
1. Identify which side is missing the link
2. Add the missing reference:

```python
# If observation missing method reference:
observation_frontmatter["methods"].append("guide/methods/folder/M###-method")

# If method missing observation reference:
method_frontmatter["observations"].append("observations/type/O###-observation")
```

**Manual Fix:**
Edit the file missing the back-reference and add the appropriate path to the array.

---

### `orphaned_observation`

**Problem:** Observation with `status: completed` is not referenced by any method.

**Context:**
- **Expected** for `in-progress` observations (still being written)
- **Concern** for `completed` observations (should support a method)

**Auto-Fix:** Not auto-fixable - needs method connection decision.

**Manual Fix:**
1. Run Alchemist Cartographer to map the observation to methods
2. Or manually add the observation to a method's `observations:` array
3. Or mark the observation as `status: in-progress` if it's not ready

---

## Auto-Fix Code Patterns

### Adding Missing Array Field

```python
import frontmatter

with open(filepath, 'r') as f:
    post = frontmatter.load(f)

if 'observations' not in post.metadata:
    post.metadata['observations'] = []

with open(filepath, 'w') as f:
    f.write(frontmatter.dumps(post))
```

### Fixing ID Mismatch

```python
import frontmatter
import re

filepath = "M123-my-method.md"
filename = os.path.basename(filepath)
match = re.match(r'^([MO]\d+)-', filename)

if match:
    correct_id = match.group(1)
    
    with open(filepath, 'r') as f:
        post = frontmatter.load(f)
    
    if filename.startswith('M'):
        post.metadata['methodId'] = correct_id
    else:
        post.metadata['observationId'] = correct_id
    
    with open(filepath, 'w') as f:
        f.write(frontmatter.dumps(post))
```

### Adding Bidirectional Link

```python
import frontmatter

# Add observation to method
def add_observation_to_method(method_path, observation_slug):
    with open(method_path, 'r') as f:
        post = frontmatter.load(f)
    
    if observation_slug not in post.metadata.get('observations', []):
        post.metadata.setdefault('observations', []).append(observation_slug)
        
        with open(method_path, 'w') as f:
            f.write(frontmatter.dumps(post))

# Add method to observation
def add_method_to_observation(observation_path, method_slug):
    with open(observation_path, 'r') as f:
        post = frontmatter.load(f)
    
    if method_slug not in post.metadata.get('methods', []):
        post.metadata.setdefault('methods', []).append(method_slug)
        
        with open(observation_path, 'w') as f:
            f.write(frontmatter.dumps(post))
```
