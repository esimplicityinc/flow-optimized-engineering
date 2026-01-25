# Method Maturity Levels

Detailed criteria for each maturity level and guidance on transitions.

## Level Definitions

### Hypothesized (Value: 1)

**Definition:** A proposed method that hasn't been tested yet.

**Characteristics:**
- Based on theory, intuition, or external evidence
- No internal experiments yet
- May come from: reading, conferences, other organizations
- Lives in `methods/emerging/`

**Evidence Required:** None - this is the starting point

**Example Frontmatter:**
```yaml
maturity: hypothesized
experiments: []
```

**Appropriate Tone:**
> "We believe this approach could work because [reasoning]. We're looking for teams 
> to test it."

---

### Experimenting (Value: 2)

**Definition:** A method actively being tested with experiments in progress.

**Characteristics:**
- At least one experiment exists (in-progress or completed)
- Results are preliminary or inconclusive
- Still refining the approach
- Lives in `methods/emerging/`

**Evidence Required:**
- At least one experiment documented
- Clear hypothesis being tested

**Example Frontmatter:**
```yaml
maturity: experimenting
experiments:
  - initial-test-experiment
```

**Appropriate Tone:**
> "We're actively testing this approach. Early results suggest [findings], but we 
> need more evidence before recommending broader adoption."

---

### Validated (Value: 3)

**Definition:** A method with supporting evidence from completed experiments.

**Characteristics:**
- One or more completed experiments
- Results support the method's claims
- Limitations honestly documented
- Ready for broader adoption (with awareness of context)
- Lives in `methods/established/`

**Evidence Required:**
- Completed experiment(s) with positive results
- Clear documentation of approach and outcomes
- Honest acknowledgment of limitations

**Example Frontmatter:**
```yaml
maturity: validated
experiments:
  - completed-experiment-1
  - completed-experiment-2
```

**Appropriate Tone:**
> "Evidence supports this approach. Teams in [context] have seen [results]. 
> Consider trying it if [conditions apply]."

---

### Proven (Value: 4)

**Definition:** A method confirmed by multiple experiments across different contexts.

**Characteristics:**
- Multiple completed experiments
- Evidence from different teams/projects/contexts
- Consistent positive results
- Well-understood limitations and applicability
- Lives in `methods/established/`

**Evidence Required:**
- Multiple completed experiments (typically 3+)
- Evidence from varied contexts
- No significant contradicting evidence
- Clear applicability guidance

**Example Frontmatter:**
```yaml
maturity: proven
experiments:
  - experiment-team-a
  - experiment-team-b
  - experiment-different-project
  - experiment-enterprise-context
```

**Appropriate Tone:**
> "This approach is well-established. Multiple teams across different contexts 
> have validated it. We confidently recommend it when [conditions]."

---

## Transition Criteria

### Hypothesized → Experimenting

**Trigger:** First experiment is created

**Checklist:**
- [ ] An experiment file exists in `field-guides/experiments/`
- [ ] The experiment references this method in its `methods:` frontmatter
- [ ] The method's `experiments:` frontmatter includes the experiment slug

**Action:** Update `maturity: experimenting`

---

### Experimenting → Validated

**Trigger:** Completed experiment(s) show positive results

**Checklist:**
- [ ] At least one experiment has `status: completed`
- [ ] Results support the method's claims (not contradicting)
- [ ] Experiment honestly documents limitations
- [ ] Method documentation reflects learnings from experiments

**Actions:**
1. Update `maturity: validated`
2. Move file from `methods/emerging/` to `methods/established/`
3. Remove the "Early Stage" caution block
4. Update guide overview if it lists methods by category

---

### Validated → Proven

**Trigger:** Multiple confirming experiments across contexts

**Checklist:**
- [ ] Three or more completed experiments
- [ ] Experiments from different teams/projects/contexts
- [ ] Consistent positive results across experiments
- [ ] No significant contradicting evidence
- [ ] Method documentation is comprehensive and polished

**Action:** Update `maturity: proven`

---

## Downgrade Scenarios

Methods can move backwards if evidence warrants:

### Proven → Validated
**Trigger:** New contradicting evidence or limited context discovered

**Scenarios:**
- A new experiment contradicts previous findings
- Discovery that previous experiments were in unusually favorable contexts
- Replication attempts fail in different environments

### Validated → Experimenting
**Trigger:** Foundational evidence challenged

**Scenarios:**
- Key supporting experiment is retracted or revised
- Methodological issues discovered in supporting experiments
- Significant change in environment invalidates previous results

### Any → Hypothesized
**Trigger:** Complete invalidation

**Scenarios:**
- All supporting experiments contradicted
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
