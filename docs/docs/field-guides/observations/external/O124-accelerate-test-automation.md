---
observationId: O124
displayed_sidebar: fieldGuideSidebar
sidebar_position: 5
title: "Accelerate: Test Automation and Delivery Performance"
status: completed
source_type: external
source:
  authors: ["Nicole Forsgren", "Jez Humble", "Gene Kim"]
  organization: "IT Revolution Press / DORA Research Program"
  year: 2018
  url: "https://openlibrary.org/works/OL19542983W"
methods:
  - M121
---


# Accelerate: Test Automation and Delivery Performance

> **Source:** Forsgren, Humble & Kim (2018) | IT Revolution Press / DORA Research Program

The Accelerate research, based on 4+ years of State of DevOps surveys and 23,000+ responses, establishes that comprehensive test automation is a key predictor of software delivery performance. Elite performers achieve both faster deployment AND lower failure rates—demonstrating that test automation enables the confidence to move quickly without sacrificing stability.

## Context

**Environment:**
- Organization: DORA Research Program (now part of Google Cloud)
- Lead Researcher: Dr. Nicole Forsgren, PhD (Management Information Systems)
- Timeline: 2014-2018 (research period for the book)
- Sample: 23,000+ survey responses analyzed for the book; part of broader 39,000+ professional dataset

**The Problem:**
Organizations often treat speed and quality as trade-offs—the belief that "moving fast breaks things." Test automation was seen as valuable but its relationship to delivery performance lacked rigorous empirical evidence. Teams needed data to justify investment in comprehensive test automation.

**Research Questions:**
- Does test automation correlate with software delivery performance?
- Can teams achieve both speed AND stability, or must they choose?
- What specific testing practices predict high performance?

## Hypothesis

> "If organizations invest in comprehensive test automation, then they will achieve higher software delivery performance because automated tests provide fast feedback on changes, enabling confident and frequent releases."

**Variables:**
- Independent: Test automation practices (coverage, reliability, speed)
- Dependent: Software delivery performance (deployment frequency, lead time, change failure rate, MTTR)

## Approach

### Methodology
- **Design:** Quasi-observational field research using psychometric surveys
- **Analysis:** Structural Equation Modeling (SEM), cluster analysis
- **Validation:** Scientifically validated, reliable survey measures
- **Academic Rigor:** Lead researcher holds PhD; research published in peer-reviewed venues

### Test Automation as a Capability

DORA identifies test automation as one of 24 capabilities that predict high software delivery performance. The research specifically examines:

| Test Automation Aspect | What Was Measured |
|------------------------|-------------------|
| **Comprehensive coverage** | Tests cover most of the codebase |
| **Reliable tests** | Tests rarely produce false positives |
| **Fast feedback** | Test results available quickly |
| **Developer ownership** | Developers responsible for test creation and maintenance |

### Data Collection
- Annual State of DevOps surveys (2014-2018 for book)
- Cross-industry sample (technology, finance, retail, government, healthcare)
- Self-reported practices correlated with delivery metrics

## Results

### Key Finding: Test Automation Predicts Elite Performance

The research establishes that test automation is a statistically significant predictor of software delivery performance:

> "Continuous testing... is one of the key technical practices that enables continuous delivery."

### Quantitative Results: Elite vs. Low Performers

| Metric | Elite vs. Low Performers |
|--------|-------------------------|
| Deployment Frequency | **208x** more frequent |
| Lead Time for Changes | **106x** faster |
| Change Failure Rate | **7x** lower |
| Mean Time to Recovery | **2,604x** faster |

*Source: State of DevOps Reports 2015-2019*

### The Speed-Stability Correlation

The research's most significant finding for test automation: **speed and stability are NOT trade-offs**.

| Performance Tier | Deployment Speed | Change Failure Rate |
|-----------------|------------------|---------------------|
| Elite | On-demand (multiple/day) | 0-15% |
| High | Daily to weekly | 16-30% |
| Medium | Weekly to monthly | 16-30% |
| Low | Monthly to semi-annually | 46-60% |

Elite performers deploy more frequently AND have lower failure rates. Test automation is identified as a key enabler of this outcome.

### Test Automation Characteristics of High Performers

The research found that high-performing teams:

1. **Write tests as part of development** - Not a separate QA phase
2. **Run tests automatically** - Part of the deployment pipeline
3. **Fix broken tests immediately** - Tests are treated as first-class citizens
4. **Trust their test results** - Low false-positive rates enable confidence

### Continuous Testing in the Deployment Pipeline

> "Implementing test automation... allows teams to get fast feedback on their changes and deploy with confidence."

The research identifies that effective test automation:
- Runs on every commit (fast feedback)
- Covers unit, integration, and acceptance levels
- Provides results in minutes, not hours
- Is maintained by developers, not a separate QA team

## Analysis

### What the Research Establishes

1. **Test automation correlates with elite performance** - Statistically significant predictor
2. **Speed and stability reinforce each other** - Not a trade-off when test automation is comprehensive
3. **Fast feedback is the mechanism** - Tests catch problems before they reach production
4. **Developer ownership matters** - Teams that own their tests perform better

### Why Test Automation Enables Both Speed AND Stability

The research explains the mechanism:

```
Comprehensive Test Automation
         ↓
Fast Feedback on Changes
         ↓
Problems Caught Early (lower failure rate)
         ↓
Confidence to Deploy Frequently (higher speed)
         ↓
Smaller Batch Sizes
         ↓
Even Faster Feedback
         ↓
[Virtuous Cycle]
```

### Connection to Executable Specifications

While Accelerate discusses "test automation" broadly, the findings directly support executable specifications as a practice:

| Accelerate Finding | Executable Specifications Application |
|-------------------|--------------------------------------|
| Tests document expected behavior | Specs are living documentation |
| Fast feedback on changes | Specs verify AI-generated code immediately |
| Developer ownership of tests | Specs written alongside implementation |
| Confidence to deploy frequently | Specs provide safety net for changes |

Executable specifications are a form of comprehensive test automation that also serves as documentation—amplifying the benefits the research identifies.

### FOE Insights

**Understanding:**
The research shows that well-tested systems are easier to understand because behavior is documented in tests. When tests pass, they serve as verified documentation of what the system actually does. This is especially valuable for AI-assisted development where understanding existing behavior is crucial before making changes.

**Feedback:**
Test automation is fundamentally about fast feedback—the core DORA finding. The research quantifies this: elite performers get feedback in minutes (lead time < 1 hour) while low performers wait weeks or months. Executable specifications extend this by providing feedback not just on "does it work?" but "does it match the specification?"

**Confidence:**
The DORA data shows test automation correlates with both speed AND stability—the confidence to deploy frequently. Elite performers have 7x lower change failure rates despite deploying 208x more often. This confidence comes from knowing that comprehensive tests will catch regressions before they reach production.

## Limitations

- **Correlation, not causation:** The research establishes correlation but cannot prove test automation causes better outcomes
- **Self-reported data:** Survey-based methodology relies on accurate self-assessment
- **Broad "test automation" definition:** Doesn't distinguish between types of tests (unit, integration, acceptance, executable specs)
- **Context variation:** Results may vary by industry, company size, or technology stack
- **Survivorship consideration:** High performers may have other advantages that enable test automation investment

### What the Research Doesn't Establish

- Specific test coverage thresholds (e.g., "80% coverage is optimal")
- Which types of tests provide the most value
- How to implement test automation effectively
- Whether executable specifications specifically outperform other test approaches

## Conclusion

### Verdict
**Strongly Supported** - The Accelerate research provides rigorous empirical evidence that test automation correlates with elite software delivery performance. The multi-year study, large sample size (23,000+), and academic methodology establish high confidence in the findings.

### Key Learnings

1. **Test automation predicts elite performance** - One of 24 capabilities that statistically predict high delivery performance
2. **Speed and stability are NOT trade-offs** - Elite performers achieve both through comprehensive test automation
3. **Fast feedback is the mechanism** - Tests catch problems early, enabling confident frequent deployment
4. **Developer ownership matters** - Teams that own their tests outperform those with separate QA

### Recommendation

**Apply this when:**
- Justifying investment in test automation infrastructure
- Building the case for executable specifications
- Countering the "we can't move fast AND be stable" objection
- Designing CI/CD pipelines with comprehensive testing

**Watch out for:**
- Treating test automation as a checkbox rather than a practice
- Slow or flaky tests that undermine fast feedback
- Separating test ownership from development teams
- Assuming any test automation is sufficient (quality matters)

### FOE Application

The Accelerate research directly validates executable specifications as a practice that optimizes for all three FOE principles:

| FOE Principle | Accelerate Evidence | Executable Specs Application |
|---------------|--------------------|-----------------------------|
| **Understanding** | Tests document behavior | Specs are living documentation |
| **Fast Feedback** | Elite performers get feedback in minutes | Specs verify changes immediately |
| **Confidence** | 7x lower failure rate with 208x more deploys | Specs enable confident AI-assisted changes |

The research provides quantitative evidence that the feedback loop executable specifications create—write spec, implement, verify, document—delivers measurable performance improvements.

---

## References

- Forsgren, N., Humble, J., & Kim, G. (2018). *Accelerate: The Science of Lean Software and DevOps: Building and Scaling High Performing Technology Organizations*. IT Revolution Press.
- State of DevOps Reports (2014-2019). Available at [dora.dev/research](https://dora.dev/research)
- DORA Capabilities: [dora.dev/capabilities](https://dora.dev/capabilities)
- Open Library: [openlibrary.org/works/OL19542983W](https://openlibrary.org/works/OL19542983W)

---

