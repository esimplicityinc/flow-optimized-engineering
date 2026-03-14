# Method Maturity Levels

Detailed criteria for each maturity level and guidance on transitions.

## Level Definitions

### Hypothesized (Value: 1)

**Definition:** A proposed method that hasn't been tested yet.

**Characteristics:**
- Based on theory, intuition, or external evidence
- No internal observations yet
- May come from: reading, conferences, other organizations
- Lives in `methods/emerging/`

**Evidence Required:** None - this is the starting point

**Example Frontmatter:**
```yaml
maturity: hypothesized
priority: recommended
observations: []
```

**Appropriate Tone:**
> "We believe this approach could work because [reasoning]. We're looking for teams 
> to test it."

---

### Observing (Value: 2)

**Definition:** A method actively being tested with observations in progress.

**Characteristics:**
- At least one observation exists (in-progress or completed)
- Results are preliminary or inconclusive
- Still refining the approach
- Lives in `methods/emerging/`

**Evidence Required:**
- At least one observation documented
- Clear hypothesis being tested

**Example Frontmatter:**
```yaml
maturity: observing
priority: recommended
observations:
  - initial-test-observation
```

**Appropriate Tone:**
> "We're actively testing this approach. Early results suggest [findings], but we 
> need more evidence before recommending broader adoption."

---

### Validated (Value: 3)

**Definition:** A method with supporting evidence from completed observations.

**Characteristics:**
- One or more completed observations
- Results support the method's claims
- Limitations honestly documented
- Ready for broader adoption (with awareness of context)
- Lives in `methods/established/`

**Evidence Required:**
- Completed observation(s) with positive results
- Clear documentation of approach and outcomes
- Honest acknowledgment of limitations

**Example Frontmatter:**
```yaml
maturity: validated
priority: recommended
observations:
  - completed-observation-1
  - completed-observation-2
```

**Appropriate Tone:**
> "Evidence supports this approach. Teams in [context] have seen [results]. 
> Consider trying it if [conditions apply]."

---

### Proven (Value: 4)

**Definition:** A method confirmed by multiple observations across different contexts.

**Characteristics:**
- Multiple completed observations
- Evidence from different teams/projects/contexts
- Consistent positive results
- Well-understood limitations and applicability
- Lives in `methods/established/`

**Evidence Required:**
- Multiple completed observations (typically 3+)
- Evidence from varied contexts
- No significant contradicting evidence
- Clear applicability guidance

**Example Frontmatter:**
```yaml
maturity: proven
priority: recommended
observations:
  - observation-team-a
  - observation-team-b
  - observation-different-project
  - observation-enterprise-context
```

**Appropriate Tone:**
> "This approach is well-established. Multiple teams across different contexts 
> have validated it. We confidently recommend it when [conditions]."

---

## Transition Criteria

### Hypothesized → Observing

**Trigger:** First observation is created

**Checklist:**
- [ ] An observation file exists in `field-guides/observations/`
- [ ] The observation references this method in its `methods:` frontmatter
- [ ] The method's `observations:` frontmatter includes the observation slug

**Action:** Update `maturity: observing`

---

### Observing → Validated

**Trigger:** Completed observation(s) show positive results

**Checklist:**
- [ ] At least one observation has `status: completed`
- [ ] Results support the method's claims (not contradicting)
- [ ] Observation honestly documents limitations
- [ ] Method documentation reflects learnings from observations

**Actions:**
1. Update `maturity: validated`
2. Move file from `methods/emerging/` to `methods/established/`
3. Remove the "Early Stage" caution block
4. Update guide overview if it lists methods by category

---

### Validated → Proven

**Trigger:** Multiple confirming observations across contexts

**Checklist:**
- [ ] Three or more completed observations
- [ ] Observations from different teams/projects/contexts
- [ ] Consistent positive results across observations
- [ ] No significant contradicting evidence
- [ ] Method documentation is comprehensive and polished

**Action:** Update `maturity: proven`

---

## Downgrade Scenarios

Methods can move backwards if evidence warrants:

### Proven → Validated
**Trigger:** New contradicting evidence or limited context discovered

**Scenarios:**
- A new observation contradicts previous findings
- Discovery that previous observations were in unusually favorable contexts
- Replication attempts fail in different environments

### Validated → Observing
**Trigger:** Foundational evidence challenged

**Scenarios:**
- Key supporting observation is retracted or revised
- Methodological issues discovered in supporting observations
- Significant change in environment invalidates previous results

### Any → Hypothesized
**Trigger:** Complete invalidation

**Scenarios:**
- All supporting observations contradicted
- Fundamental flaw in approach discovered
- Only appropriate if starting fresh with revised hypothesis

---

## Context Diversity Guidance

When assessing whether to advance maturity, consider context diversity:

### Low Diversity (Weak Signal)
- Same team, same project
- Same tech stack, same scale
- Same industry or domain

### Medium Diversity (Moderate Signal)
- Different teams, same organization
- Same tech stack, different scale
- Same industry, different domains

### High Diversity (Strong Signal)
- Different organizations
- Different tech stacks
- Different industries or domains

**Guidance:** Prefer medium-to-high diversity for advancement to Proven.
