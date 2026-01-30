# FOE Field Guide Tools

Linting and scoring tools for FOE Field Guides.

## Prerequisites

- Python 3.11+
- [uv](https://docs.astral.sh/uv/) package manager

## Installation

```bash
cd scripts
uv sync
```

## Usage

### Run Full Lint + Scores

```bash
# From scripts directory
cd scripts && uv run lint_field_guides.py

# From project root
uv run --project scripts scripts/lint_field_guides.py
```

### Options

| Flag | Description |
|------|-------------|
| `--scores-only` | Skip validation, only output scores |
| `--lint-only` | Skip scores, only run validation |
| `--verbose` | Include detailed file information in output |
| `--quiet` | Only output if there are errors or warnings |
| `--docs-path PATH` | Override docs location (default: `docs/docs`) |

### Examples

```bash
# Just check for errors
uv run lint_field_guides.py --lint-only

# Just get scores
uv run lint_field_guides.py --scores-only

# Full details
uv run lint_field_guides.py --verbose

# CI mode - silent if all good
uv run lint_field_guides.py --quiet
```

## Exit Codes

| Code | Meaning |
|------|---------|
| `0` | All valid, no issues |
| `1` | Errors found |
| `2` | Warnings only (no errors) |

## Output Format

JSON output with the following structure:

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
      "file": "field-guides/agentic-coding/methods/emerging/M155-verification-before-completion.md",
      "severity": "warning"
    }
  ],
  "scores": {
    "guides": {
      "agentic-coding": {
        "maturity_score": 2.3,
        "maturity_label": "observing",
        "method_count": 17,
        "internal_method_count": 7,
        "external_method_count": 10,
        "observation_coverage": 0.65,
        "internal_observations": 3,
        "external_observations": 8,
        "evidence_strength": 15.0
      }
    },
    "totals": {
      "methods": 21,
      "internal_methods": 11,
      "external_methods": 10,
      "observations": 24,
      "internal_observations": 4,
      "external_observations": 20,
      "avg_maturity_score": 2.1,
      "avg_maturity_label": "observing"
    }
  }
}
```

## Validation Rules

### Errors

| Type | Description |
|------|-------------|
| `id_mismatch` | `methodId`/`observationId` doesn't match filename |
| `missing_required_field` | Required frontmatter field missing |
| `invalid_value` | Field has invalid value |
| `folder_mismatch` | File in wrong folder for its maturity level |
| `broken_reference` | Reference to non-existent ID |
| `framework_not_found` | External method references unknown framework |
| `canonical_method_not_found` | Adoption references non-existent canonical method |

### Warnings

| Type | Description |
|------|-------------|
| `empty_observations` | Method has no linked observations |
| `id_gap` | Gap in ID numbering sequence |
| `missing_bidirectional_link` | Observation/method link not reciprocal |
| `overview_mismatch` | Guide overview lists method that doesn't exist |
| `orphaned_observation` | Observation not referenced by any method |

## Score Calculations

### Maturity Scores

| Level | Score |
|-------|-------|
| Hypothesized | 1 |
| Observing | 2 |
| Validated | 3 |
| Proven | 4 |

### Guide Maturity

- **maturity_score**: Average of all method maturity scores
- **maturity_label**: Derived from score (1-1.5=hypothesized, 1.5-2.5=observing, 2.5-3.5=validated, 3.5-4=proven)

### Evidence Strength

```
evidence_strength = internal_observations + (external_observations * 1.5)
```

External observations are weighted higher due to larger sample sizes and academic rigor.

## CI Integration

Add to your CI workflow:

```yaml
- name: Lint Field Guides
  run: |
    uv run --project scripts scripts/lint_field_guides.py --quiet
```

The script will exit with code 1 if there are errors, failing the CI check.

## Current Status

Run the linter to see the current state of Field Guides:

```bash
cd scripts && uv run lint_field_guides.py | jq '.scores.totals'
```

Example output:
```json
{
  "methods": 21,
  "internal_methods": 11,
  "external_methods": 10,
  "observations": 25,
  "internal_observations": 4,
  "external_observations": 21,
  "avg_maturity_score": 1.52,
  "avg_maturity_label": "observing"
}
```
