---
sidebar_position: 7
title: "BDD Adoption in Open Source Projects"
status: completed
source_type: literature
source:
  authors: ["Fiorella Zampetti", "Andrea Di Sorbo", "Corrado Aaron Visaggio", "Gerardo Canfora", "Massimiliano Di Penta"]
  organization: "Information and Software Technology (Elsevier)"
  year: 2020
  url: "https://www.sciencedirect.com/science/article/pii/S095058492030063X"
methods:
  - agentic-coding/methods/adopted/bdd/given-when-then
  - agentic-coding/methods/adopted/bdd/executable-specifications
---

import RelatedMethods from '@site/src/components/RelatedMethods';

# BDD Adoption in Open Source Projects

> **Source:** Zampetti et al. (2020), Information and Software Technology

A large-scale study of 50,000 GitHub projects revealing that while ~27% use BDD frameworks, many use them for unit testing rather than true behavior-driven development. Provides important nuance about the gap between tool adoption and methodology adoption.

## Context

**Environment:**
- Organization: Information and Software Technology journal (Elsevier)
- Researchers: Zampetti, Di Sorbo, Visaggio, Canfora, Di Penta
- Timeline: Published 2020
- Sample: 50,000 GitHub projects + survey of 31 developers

**The Problem:**
BDD tool adoption was growing, but it was unclear whether teams were adopting the full BDD methodology or simply using BDD frameworks as test automation tools. Understanding actual practice (vs. claimed practice) is critical for realistic expectations.

**Research Questions:**
1. How widespread is BDD tool adoption in open source projects?
2. How are BDD frameworks actually being used in practice?
3. Do developers follow the "specification first" approach BDD advocates?
4. What factors influence BDD adoption patterns?

## Hypothesis

> "The researchers hypothesized that BDD tool adoption would be significant, but that actual BDD methodology adoption (specification-first, collaborative scenarios) might be lower than tool usage suggests."

**Variables:**
- Independent: BDD framework presence, project characteristics
- Dependent: Usage patterns, test timing, scenario quality

## Approach

### Methodology

- **Design:** Mixed methods - repository mining + developer survey
- **Analysis:** Quantitative analysis of 50,000 projects, qualitative survey analysis
- **Validation:** Cross-validation between repository data and developer reports

### Data Collection

1. **Repository Mining:** Analyzed 50,000 GitHub projects for BDD framework usage
2. **Commit Analysis:** Examined when BDD tests were written relative to production code
3. **Developer Survey:** 31 developers with BDD experience

## Results

### BDD Tool Adoption

| Language | BDD Adoption Rate | Primary Framework |
|----------|-------------------|-------------------|
| Ruby | **68%** | Cucumber, RSpec |
| JavaScript | ~25% | Cucumber.js, Jasmine |
| Java | ~20% | Cucumber-JVM, JBehave |
| Python | ~15% | Behave, Lettuce |
| **Overall** | **~27%** | Various |

### How BDD Tools Are Actually Used

| Usage Pattern | Frequency | Description |
|---------------|-----------|-------------|
| **True BDD** | Low | Specification-first, collaborative scenarios |
| **Unit testing** | High | BDD frameworks used for unit tests |
| **Integration testing** | Moderate | BDD syntax for integration tests |
| **Post-hoc documentation** | Moderate | Scenarios written after implementation |

### Developer Survey Findings

| Question | Finding |
|----------|---------|
| When do you write BDD tests? | **Most write tests while/after coding**, not before |
| Who writes scenarios? | Primarily developers, limited business involvement |
| Main benefit? | Readable test syntax, documentation |
| Main challenge? | Time investment, maintenance |

### Key Quantitative Finding

**27% of surveyed projects use BDD frameworks, but the majority don't follow the "specification first" methodology** - scenarios are written during or after implementation, not before.

## Analysis

### What the Research Establishes

1. **Tool adoption ≠ methodology adoption** - BDD frameworks are widely used, but often as better-structured test tools rather than specification tools
2. **Specification-first is rare in practice** - Despite BDD's core premise, most developers write tests during/after coding
3. **Business involvement is limited** - Scenarios are primarily developer-written, reducing the collaboration benefit
4. **Ruby leads adoption** - The ecosystem where BDD originated has highest adoption

### The Adoption Gap

The study reveals a significant gap between:
- **Ideal BDD:** Collaborative specification → executable scenarios → implementation
- **Actual BDD:** Implementation → tests written in BDD syntax

This gap suggests that many teams get some BDD benefits (readable tests, documentation) but miss the primary value proposition (collaborative specification, requirement alignment).

### FOE Insights

**Understanding:**
This research challenges assumptions about BDD adoption. While Given-When-Then syntax is widely used, the collaborative understanding-building that syntax is designed to enable often doesn't happen. Teams using BDD tools without the collaborative practices may have readable tests but not improved stakeholder alignment.

**Feedback:**
The finding that specifications are written after implementation means the feedback loop BDD promises (specification → fast feedback on alignment) isn't operating. Post-hoc scenarios verify what was built, not what should have been built. This distinction is crucial for FOE practitioners.

**Confidence:**
This research provides important calibration. We can be confident that:
- BDD tools are production-ready and widely used
- The communication benefits require methodology adoption, not just tool adoption
- "We use BDD" claims need scrutiny - tool usage doesn't equal methodology adoption

## Limitations

- **Open source focus:** May not generalize to enterprise/proprietary development
- **Repository signals:** Hard to determine specification-first from commit timing alone
- **Survey size:** 31 developers is limited for generalization
- **Self-selection:** Developers who responded may not be representative

## Conclusion

### Verdict
**Supported with Important Caveats** - BDD tools are viable and adopted, but the full methodology is rare. Benefits depend on actual practice, not tool choice.

### Key Learnings

1. **Tool adoption is high (~27%)** - BDD frameworks are mainstream
2. **Methodology adoption is much lower** - Few teams follow specification-first
3. **Collaboration is often missing** - Scenarios are primarily developer-written
4. **Benefits vary by adoption depth** - Full BDD delivers more than tool-only adoption

### Recommendation

**Apply this when:**
- You want readable, documentation-quality tests (even without full BDD)
- You're willing to invest in collaborative specification practices
- Business stakeholders will actually participate in scenario review

**Watch out for:**
- Assuming tool adoption = methodology adoption
- Expecting communication benefits without the Three Amigos process
- Writing scenarios after implementation and calling it "BDD"

### FOE Application

This research suggests a maturity model for BDD adoption:

| Level | Practice | Benefits |
|-------|----------|----------|
| **Level 1** | BDD syntax for tests | Readable tests, documentation |
| **Level 2** | Scenarios before coding | Clearer requirements thinking |
| **Level 3** | Collaborative specification | Stakeholder alignment, reduced rework |

Most teams operate at Level 1. Full BDD benefits require Level 3.

---

## References

- Zampetti, F., Di Sorbo, A., Visaggio, C.A., Canfora, G., & Di Penta, M. (2020). Demystifying the adoption of behavior-driven development in open source projects. *Information and Software Technology*, 123. https://www.sciencedirect.com/science/article/pii/S095058492030063X

---

<RelatedMethods />
