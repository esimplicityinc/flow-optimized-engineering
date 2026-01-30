---
name: field-guide-linter
description: |
  Validates Field Guide files and calculates maturity scores. Use after creating
  or modifying observation/method files. Detects frontmatter issues, broken links,
  ID mismatches, and folder placement errors. Includes auto-fix guidance.
---

# Field Guide Linter

A Python-based validation tool for FOE Field Guides. Use this skill to validate files after creation/modification and to understand how to fix common issues.

## Quick Reference

### Run Full Validation + Scores
```bash
uv run --project scripts scripts/lint_field_guides.py
```

### Validation Only (faster)
```bash
uv run --project scripts scripts/lint_field_guides.py --lint-only
```

### Scores Only
```bash
uv run --project scripts scripts/lint_field_guides.py --scores-only
```

### CI Mode (silent if clean)
```bash
uv run --project scripts scripts/lint_field_guides.py --quiet
```

## Output Format

JSON output with this structure:

```json
{
  "valid": true,
  "error_count": 0,
  "warning_count": 2,
  "errors": [],
  "warnings": [
    {
      "type": "empty_observations",
      "message": "Method has no linked observations",
      "file": "field-guides/agentic-coding/methods/emerging/M155-example.md",
      "severity": "warning"
    }
  ],
  "scores": {
    "guides": { ... },
    "totals": { ... }
  }
}
```

## Error vs Warning

| Severity | Meaning | Scribe Action |
|----------|---------|---------------|
| **Error** | File is invalid, blocks functionality | Must auto-fix or report to user |
| **Warning** | Suboptimal but functional | Report but continue |

## Exit Codes

| Code | Meaning |
|------|---------|
| `0` | All valid, no issues |
| `1` | Errors found |
| `2` | Warnings only (no errors) |

## Post-Write Validation Flow

After creating or modifying a Field Guide file, follow this flow:

### Step 1: Run Linter
```bash
uv run --project scripts scripts/lint_field_guides.py --lint-only 2>/dev/null
```

### Step 2: Parse Results
```bash
# Example: extract errors for a specific file
uv run --project scripts scripts/lint_field_guides.py --lint-only 2>/dev/null | \
  jq '.errors[] | select(.file | contains("my-file.md"))'
```

### Step 3: Auto-Fix or Report

**If errors found for the file you created:**
1. Attempt auto-fix based on error type (see `references/error-fixes.md`)
2. Re-run linter to verify fix
3. If fix fails, report error to user

**If only warnings:**
- Report warnings but proceed with completion
- Note that some warnings (like `missing_bidirectional_link`) will be resolved by downstream agents

### Step 4: Completion Message

Include validation status in completion:

```markdown
**Documentation complete.** Created `[path]`

Linter: Passed (0 errors, 2 warnings)

Warnings:
- empty_observations: Method has no linked observations (expected for new methods)
```

## Error Types Quick Reference

| Type | Severity | Auto-Fixable | Description |
|------|----------|--------------|-------------|
| `id_mismatch` | Error | Yes | `methodId`/`observationId` doesn't match filename |
| `missing_required_field` | Error | Partial | Required frontmatter field missing |
| `invalid_value` | Error | Partial | Field has invalid value |
| `folder_mismatch` | Error | No | File in wrong folder for maturity level |
| `broken_reference` | Error | No | Reference to non-existent file |
| `framework_not_found` | Error | No | External method references unknown framework |
| `canonical_method_not_found` | Error | No | Adoption references non-existent method |
| `empty_observations` | Warning | No | Method has no linked observations |
| `id_gap` | Warning | No | Gap in ID numbering sequence |
| `missing_bidirectional_link` | Warning | Yes | Link not reciprocal |
| `orphaned_observation` | Warning | No | Observation not referenced by any method |

## Detailed Fix Guidance

See `references/error-fixes.md` for detailed auto-fix procedures and manual fix instructions for each error type.

## Integration Points

### Scribes (alchemist-scribe, synthesist-scribe, cartographer-scribe)
- Run linter after file creation
- Auto-fix errors where possible
- Report results in completion message

### Curator
- Run linter first for quick baseline
- Perform deep validation (content sections, components)
- Apply fixes
- Run linter again to verify

### CI/CD
- Add to workflow for PR checks
- Use `--quiet` flag for clean output
- Exit code 1 fails the check on errors

## Maturity Scoring

The linter calculates maturity scores:

| Level | Score |
|-------|-------|
| Hypothesized | 1 |
| Observing | 2 |
| Validated | 3 |
| Proven | 4 |

**Guide maturity** = average of all method scores in that guide.

**Evidence strength** = `internal_observations + (external_observations * 1.5)`

External observations weighted higher due to larger sample sizes and academic rigor.
