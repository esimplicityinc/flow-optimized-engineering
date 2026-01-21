# CI Documentation Template

This template is used by the doc-generator agent to create history documents for each commit.

## Template

```markdown
---
sidebar_label: "{{DATE_LABEL}} {{HASH_SHORT}}"
sidebar_position: {{POSITION}}
---

# Commit: {{COMMIT_MESSAGE}}

> **{{DATE_FULL}}** | `{{HASH_SHORT}}` | {{AUTHOR}}

---

## Quick Summary

:::info At a Glance
{{SUMMARY}}
:::

| Dimension | Score | Status |
|-----------|-------|--------|
| [Understandability](#understandability) | **{{UNDERSTAND_SCORE}}/100** | {{UNDERSTAND_STATUS_EMOJI}} |
| [Functionality](#functionality) | **{{FUNC_SCORE}}/100** | {{FUNC_STATUS_EMOJI}} |
| [Security](#security) | **{{SEC_SCORE}}/100** | {{SEC_STATUS_EMOJI}} |

**Files Changed**: {{FILES_COUNT}} | **Lines**: +{{LINES_ADDED}} / -{{LINES_REMOVED}}

---

## Understandability

> Code clarity, naming conventions, and domain language alignment

### Score: {{UNDERSTAND_SCORE}}/100 {{UNDERSTAND_STATUS_EMOJI}}

| Check | Status | Details |
|-------|--------|---------|
| Lint (Biome) | {{LINT_STATUS}} | {{LINT_DETAILS}} |
| Type Check | {{TYPE_STATUS}} | {{TYPE_DETAILS}} |
| DDD Alignment | {{DDD_STATUS}} | {{DDD_DETAILS}} |

<details>
<summary>Analysis</summary>

{{UNDERSTAND_ANALYSIS}}

</details>

---

## Functionality

> Correctness, behavior verification, and test coverage

### Score: {{FUNC_SCORE}}/100 {{FUNC_STATUS_EMOJI}}

| Check | Status | Details |
|-------|--------|---------|
| Unit Tests | {{UNIT_STATUS}} | {{UNIT_DETAILS}} |
| BDD Scenarios | {{BDD_STATUS}} | {{BDD_DETAILS}} |
| Build | {{BUILD_STATUS}} | {{BUILD_DETAILS}} |

<details>
<summary>Analysis</summary>

{{FUNC_ANALYSIS}}

</details>

---

## Security

> Security posture, vulnerabilities, and authorization

### Score: {{SEC_SCORE}}/100 {{SEC_STATUS_EMOJI}}

| Check | Status | Details |
|-------|--------|---------|
| Dependency Audit | {{AUDIT_STATUS}} | {{AUDIT_DETAILS}} |
| SAST | {{SAST_STATUS}} | {{SAST_DETAILS}} |
| OPA Policies | {{OPA_STATUS}} | {{OPA_DETAILS}} |

<details>
<summary>Analysis</summary>

{{SEC_ANALYSIS}}

</details>

---

## Files Changed

{{FILES_CHANGED}}

---

## Related

{{RELATED_LINKS}}
```

## Variable Reference

### Commit Metadata
| Variable | Description | Example |
|----------|-------------|---------|
| `{{DATE_LABEL}}` | Sidebar date format | `01-19-26 14:52` |
| `{{DATE_FULL}}` | Full readable date | `January 19, 2026 at 2:52 PM` |
| `{{HASH_SHORT}}` | 7-char hash | `4799aa5` |
| `{{HASH_FULL}}` | Full commit hash | `4799aa5...` |
| `{{COMMIT_MESSAGE}}` | First line of commit message | `refactor: consolidate docs` |
| `{{AUTHOR}}` | Commit author | `Aaron West` |
| `{{POSITION}}` | Sidebar position (reverse chronological) | `2` (1 is index) |

### Summary Stats
| Variable | Description | Example |
|----------|-------------|---------|
| `{{SUMMARY}}` | 2-3 sentence summary | Brief description |
| `{{FILES_COUNT}}` | Number of files changed | `7` |
| `{{LINES_ADDED}}` | Lines added | `627` |
| `{{LINES_REMOVED}}` | Lines removed | `16` |

### Scores
| Variable | Description | Values |
|----------|-------------|--------|
| `{{UNDERSTAND_SCORE}}` | Understandability score | `0-100` or `N/A` |
| `{{FUNC_SCORE}}` | Functionality score | `0-100` or `N/A` |
| `{{SEC_SCORE}}` | Security score | `0-100` or `N/A` |

### Status Emojis
| Variable | Values |
|----------|--------|
| `{{UNDERSTAND_STATUS_EMOJI}}` | ✅ (90+), ⚠️ (70-89), ❌ (<70), ⏭️ (N/A) |
| `{{FUNC_STATUS_EMOJI}}` | ✅ (90+), ⚠️ (70-89), ❌ (<70), ⏭️ (N/A) |
| `{{SEC_STATUS_EMOJI}}` | ✅ (90+), ⚠️ (70-89), ❌ (<70), ⏭️ (N/A) |

### Check Statuses
Format: `{{CHECK_STATUS}}` and `{{CHECK_DETAILS}}`

| Status Value | Meaning |
|--------------|---------|
| `✅ Pass` | Check passed |
| `❌ Fail` | Check failed |
| `⚠️ Warn` | Passed with warnings |
| `⏭️ Skip` | Not configured/run |
| `N/A` | Not applicable |

### Analysis Sections
| Variable | Description |
|----------|-------------|
| `{{UNDERSTAND_ANALYSIS}}` | Analysis of code clarity impact |
| `{{FUNC_ANALYSIS}}` | Analysis of behavior changes |
| `{{SEC_ANALYSIS}}` | Analysis of security implications |

### File Changes
| Variable | Description |
|----------|-------------|
| `{{FILES_CHANGED}}` | Markdown table of changed files |

Format:
```markdown
| File | Change |
|------|--------|
| `path/to/file.ts` | Modified |
| `path/to/new.ts` | Added |
| `path/to/old.ts` | Deleted |
```

### Related Links
| Variable | Description |
|----------|-------------|
| `{{RELATED_LINKS}}` | Links to related docs, BDD scenarios, etc. |

## Scoring Guidelines

### Understandability (0-100)
- **100**: Zero lint errors/warnings, all types pass, perfect DDD alignment
- **90-99**: Zero errors, minor warnings (< 5)
- **80-89**: Zero errors, moderate warnings (5-15)
- **70-79**: Zero errors, many warnings (> 15)
- **60-69**: Minor lint errors but code works
- **< 60**: Significant issues affecting readability

### Functionality (0-100)
- **100**: All tests pass, all BDD scenarios pass, build succeeds
- **90-99**: All pass, but some tests skipped
- **80-89**: Minor test failures (< 5% of tests)
- **70-79**: Some test failures (5-15% of tests)
- **< 70**: Significant test failures

### Security (0-100)
- **100**: No vulnerabilities, all policies valid
- **90-99**: Low-severity issues only
- **80-89**: Medium-severity issues
- **70-79**: High-severity issues with mitigations
- **< 70**: Critical issues
- **N/A**: No security checks configured

## Filename Convention

**Format**: `MM-DD-YY-HHMM-{short-hash}.md`

**Example**: `01-19-26-1452-7f15b03.md`
