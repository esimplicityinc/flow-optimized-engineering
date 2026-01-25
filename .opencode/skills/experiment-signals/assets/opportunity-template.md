# Experiment Opportunity Template

Use this template to structure findings for Alchemist handoff.

---

## Opportunity: [Title]

**Evidence Strength:** High | Medium | Low
**FOE Principle:** Understanding | Feedback | Confidence
**Timeframe:** [Date range]

### Summary

[1-2 sentence description of what was found]

### Evidence Sources

#### Commits
```yaml
- sha: "[commit hash]"
  date: "[date]"
  message: "[commit message]"
  relevance: "[why this commit is evidence]"
```

#### Issues
```yaml
- number: [issue number]
  title: "[issue title]"
  created: "[date]"
  relevance: "[why this issue is evidence]"
  key_quotes:
    - "[relevant quote from issue body or comments]"
```

#### Pull Requests
```yaml
- number: [PR number]
  title: "[PR title]"
  merged: "[date]"
  relevance: "[why this PR is evidence]"
  key_quotes:
    - "[relevant quote from PR description or comments]"
```

#### CI/CD
```yaml
- finding: "[what was observed in CI patterns]"
  evidence: "[specific data points]"
```

#### Tests
```yaml
- finding: "[what was observed in test patterns]"
  evidence: "[specific data points]"
```

#### Documentation
```yaml
- finding: "[what was observed in documentation patterns]"
  evidence: "[specific data points]"
```

#### Dependencies
```yaml
- finding: "[what was observed in dependency patterns]"
  evidence: "[specific data points]"
```

### FOE Analysis

**Which principle was violated or validated?**

[Explanation of how this relates to Understanding, Feedback, or Confidence]

**Pattern identified:**

[Description of the pattern, e.g., "No feedback loops → issues discovered in production → debugging crunch"]

### Hypothesis Hint

> "If [approach], then [expected outcome] because [reasoning]."

[Draft hypothesis based on the evidence. This helps the Alchemist formulate the experiment's hypothesis.]

### Key Facts for Alchemist Intake

```yaml
timeline: "[when this happened]"
team: "[who was involved, if known]"
environment: "[project, system, or context]"
tools_tech: "[technologies involved]"
before_state: "[what was the situation before]"
after_state: "[what was the situation after]"
explicit_learnings: "[any explicit statements of what was learned]"
```

### Gaps to Ask About

[List questions the Alchemist should ask the user to fill in missing context]

- [ ] [Question 1]
- [ ] [Question 2]
- [ ] [Question 3]

### Corroboration Notes

**Sources that agree:**
- [Source 1] and [Source 2] both indicate [pattern]

**Potential alternative explanations:**
- [Alternative 1]: [Why it might not be the hypothesized cause]

**Confidence in narrative:**
[High/Medium/Low] - [Brief explanation]

---

## Alchemist Handoff Bundle

When this opportunity is selected for documentation, provide this bundle to `@alchemist`:

```yaml
opportunity:
  title: "[Opportunity Title]"
  evidence_strength: high | medium | low
  foe_principle: "Understanding | Feedback | Confidence"
  
intake_bundle:
  sources_gathered:
    - type: commits
      items:
        - sha: "[hash]"
          message: "[message]"
          date: "[date]"
    - type: issues
      items:
        - number: [num]
          title: "[title]"
          created: "[date]"
    # ... other source types
    
  key_facts_extracted:
    timeline: "[timeframe]"
    environment: "[context]"
    evidence_of_problem: "[what went wrong]"
    evidence_of_recognition: "[how team acknowledged it]"
    
  hypothesis_hint: |
    [Draft hypothesis]
    
  gaps_to_ask_about:
    - "[Question 1]"
    - "[Question 2]"
```

This pre-populates the Alchemist intake phase, making the workflow faster.
