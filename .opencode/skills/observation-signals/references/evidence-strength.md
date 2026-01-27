# Evidence Strength Rating

This reference explains how to rate the strength of evidence for experiment opportunities.

## Evidence Strength Levels

### High Strength

**Criteria:**
- Multiple independent sources corroborate the same event/pattern
- Clear timeline with specific dates
- Explicit acknowledgment from team (issues, commits, comments)
- Measurable impact (bug counts, incident duration, etc.)

**Example:**
```
Pattern: Production Debugging Crunch
Sources:
  - Commits: 15 commits with "debug"/"fix" in Dec 20-31
  - Issues: #166 "Improve Tests" created Dec 29
  - PR comments: "We need better test coverage after this"
Timeline: December 20-31, 2025
Impact: 7 production bugs on first production day
```

**Confidence:** This evidence is strong enough to document as an experiment with high confidence in the narrative.

### Medium Strength

**Criteria:**
- Single strong source with detailed information, OR
- Multiple weaker sources that partially corroborate
- Timeline is approximate
- Impact is inferred rather than measured

**Example:**
```
Pattern: Knowledge Concentration
Sources:
  - Commit analysis: 85% of src/engine/ commits from 2 authors
  - Issue comment: "We should get more people familiar with this"
Timeline: Throughout project
Impact: Inferred bottleneck risk
```

**Confidence:** Document with appropriate caveats. Note that evidence is observational.

### Low Strength

**Criteria:**
- Single weak source
- Inference from absence (no tests, no docs) rather than presence
- No explicit acknowledgment
- Pattern could have alternative explanations

**Example:**
```
Pattern: Late Documentation
Sources:
  - Commit history: README updated 3 months after initial feature
Timeline: Approximate
Impact: Unknown
```

**Confidence:** Note as potential opportunity but don't over-claim. Ask user for additional context.

## Factors That Strengthen Evidence

### Corroboration

Same event visible from multiple angles:
- Commits + Issues
- Issues + PR discussions
- CI failures + Fix commits

**Rule of thumb:** Each independent source that confirms the pattern increases strength by one level.

### Explicit Acknowledgment

Team members explicitly stating what happened:
- Issue descriptions explaining the problem
- Commit messages with context
- PR comments with reasoning
- Retrospective documents

**Stronger:** "After the outage, we realized we needed better monitoring"
**Weaker:** Multiple monitoring-related commits (no explanation)

### Measurable Impact

Quantifiable outcomes:
- Number of bugs
- Duration of incident
- Number of commits in a crunch
- Time to resolve

**Stronger:** "7 production bugs filed on January 12"
**Weaker:** "Several issues around that time"

### Clear Timeline

Specific dates and sequence:
- When did the pattern start?
- When did it end?
- What preceded it?
- What followed it?

**Stronger:** "December 20-31, 2025"
**Weaker:** "Late December"

## Factors That Weaken Evidence

### Alternative Explanations

Pattern could be explained by something other than the hypothesized cause:
- High commit count could be a feature push, not a debugging crunch
- Low test coverage could be early project stage, not neglect
- Single author could be specialization, not concentration

**Mitigation:** Look for corroborating evidence that rules out alternatives.

### Survivorship Bias

Only seeing what's in the repo, not what was abandoned:
- Deleted branches
- Rejected approaches
- Abandoned features

**Mitigation:** Ask users about what's not visible in the repo.

### Context Loss

Information that existed but wasn't captured:
- Verbal discussions
- Slack conversations
- Meeting decisions

**Mitigation:** Use repo evidence as starting point for user questions.

## Rating Decision Tree

```
Start with finding
       │
       ▼
Multiple sources corroborate?
       │
   Yes─┼─No
       │   │
       ▼   ▼
  ┌────────────────┐
  │ Explicit       │
  │ acknowledgment?│
  └───────┬────────┘
      Yes─┼─No
          │   │
          ▼   ▼
     ┌────────────────┐
     │ Measurable     │
     │ impact?        │
     └───────┬────────┘
         Yes─┼─No
             │   │
             ▼   ▼
        HIGH  MEDIUM
        
If multiple sources + explicit + measurable = HIGH
If multiple sources but no explicit = MEDIUM
If single source but explicit + measurable = MEDIUM
If single source, no explicit, no measurable = LOW
```

## Using Evidence Strength in Reports

When presenting findings:

**High strength:**
> "Strong evidence of production debugging crunch in December 2025. 15 commits with debugging-related messages, corroborated by Issue #166 explicitly calling for test improvements."

**Medium strength:**
> "Moderate evidence of knowledge concentration in the engine module. Commit analysis shows 85% of changes from 2 authors, though this could reflect specialization rather than problematic concentration."

**Low strength:**
> "Potential signal: Documentation was added 3 months after the feature shipped. This might indicate reactive documentation, but could also be normal project evolution. Recommend asking the team for context."

## Prioritizing Opportunities

When multiple opportunities exist, prioritize by:

1. **Evidence strength** (High > Medium > Low)
2. **FOE alignment** (Clear principle violation > Unclear)
3. **Recency** (Recent > Old)
4. **Impact** (Measurable impact > Inferred impact)
5. **Actionability** (Clear hypothesis > Vague observation)
