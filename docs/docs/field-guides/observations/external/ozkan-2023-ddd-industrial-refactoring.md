---
displayed_sidebar: fieldGuideSidebar
sidebar_position: 13
title: "DDD Industrial Refactoring: Automotive Case Study"
status: completed
source_type: external
source:
  authors:
    - "Ozan Özkan"
    - "Önder Babur"
    - "Mark van den Brand"
  organization: "Eindhoven University of Technology / Automotive Software Company"
  year: 2023
  url: "https://link.springer.com/article/10.1007/s10664-023-10310-1"
methods:
  - external-frameworks/domain-driven-design/methods/aggregate
  - external-frameworks/domain-driven-design/methods/repository
  - external-frameworks/domain-driven-design/methods/value-object
  - external-frameworks/domain-driven-design/methods/domain-service
---

import RelatedMethods from '@site/src/components/RelatedMethods';

# DDD Industrial Refactoring: Automotive Case Study

> **Source:** Özkan, Babur & van den Brand (2023), Empirical Software Engineering

An action research study at an automotive software company found that refactoring a 10,000 LOC backend system using Domain-Driven Design patterns achieved an **84/100 score** on the modified Technology Acceptance Model (mTAM). Engineers reported improved maintainability across all ISO/IEC 25010 quality metrics, and new team members could understand the refactored code more easily.

## Context

**Environment:**
- Organization: Automotive software company (name redacted for IP protection)
- Researchers: Eindhoven University of Technology
- Timeline: Published 2023
- Sample: 13 developers working on a backend system with 23 REST API endpoints (~10,000 LOC)

**The Problem:**
Industrial software systems often accumulate technical debt that degrades maintainability over time. While DDD patterns are widely advocated, empirical evidence of their effectiveness in industrial settings—particularly for refactoring existing systems—remains limited.

**Research Questions:**
1. How acceptable is DDD-based refactoring to industrial development teams?
2. Does DDD refactoring improve software maintainability as measured by ISO/IEC 25010?
3. Can new team members understand DDD-refactored code more easily?

## Hypothesis

> "If an existing backend system is refactored using Domain-Driven Design tactical patterns (Aggregates, Repositories, Value Objects, Domain Services), then software maintainability will improve because DDD creates explicit boundaries and domain-aligned structures that are easier to understand, modify, and test."

**Variables:**
- Independent: Application of DDD tactical patterns during refactoring
- Dependent: Technology acceptance (mTAM score), maintainability (ISO/IEC 25010 metrics), code comprehension

## Approach

### Methodology

- **Design:** Action research with embedded case study
- **Setting:** Real industrial project at an automotive software company
- **Validation:** Modified Technology Acceptance Model (mTAM), ISO/IEC 25010 mapping, Think Aloud Protocol

### The Refactoring Process

The researchers applied DDD tactical patterns to refactor a backend system:

| Pattern Applied | Purpose |
|-----------------|---------|
| **Aggregates** | Defined consistency boundaries around domain concepts |
| **Repositories** | Abstracted data access behind domain-oriented interfaces |
| **Value Objects** | Replaced primitive types with domain-meaningful types |
| **Domain Services** | Encapsulated business logic that didn't belong to entities |

### Evaluation Methods

1. **mTAM Survey:** 13 developers rated the refactoring on Perceived Usefulness and Perceived Ease of Use
2. **ISO/IEC 25010 Mapping:** Engineer responses mapped to software maintainability sub-characteristics
3. **Think Aloud Protocol:** New team members verbalized their understanding while reading refactored code

## Results

### Technology Acceptance: 84/100 mTAM Score

| Metric | Score |
|--------|-------|
| **Overall mTAM Score** | 84/100 |
| Perceived Usefulness | 85/100 |
| Perceived Ease of Use | 83/100 |
| Acceptability Scale | "Acceptable" |
| Grade | B |
| Adjective Rating | "Good" |

The 84/100 score indicates strong acceptance of DDD refactoring by the development team.

### ISO/IEC 25010 Maintainability Improvements

Engineers gave positive responses that mapped to all five ISO/IEC 25010 maintainability sub-characteristics:

| Sub-characteristic | Engineer Feedback |
|--------------------|-------------------|
| **Modularity** | DDD patterns created clear module boundaries |
| **Reusability** | Domain components could be reused across features |
| **Analysability** | Code structure aligned with business concepts |
| **Modifiability** | Changes were localized within bounded contexts |
| **Testability** | Domain logic could be tested in isolation |

### Code Comprehension: Think Aloud Protocol

New team members demonstrated improved understanding of the refactored code:

- Could identify domain concepts more quickly
- Understood the purpose of code sections without extensive documentation
- Navigated the codebase more confidently

### System Characteristics

| Metric | Value |
|--------|-------|
| Codebase size | ~10,000 LOC |
| REST API endpoints | 23 |
| Development team | 13 developers |

## Analysis

### What the Research Establishes

1. **DDD refactoring is acceptable to industrial teams:** 84/100 mTAM score demonstrates engineers find DDD approaches useful and usable
2. **DDD improves maintainability:** Positive mapping to all ISO/IEC 25010 maintainability sub-characteristics
3. **DDD improves code comprehension:** New team members understood refactored code more easily (Think Aloud Protocol)
4. **DDD patterns work together:** Aggregates, Repositories, Value Objects, and Domain Services provided complementary benefits

### Why DDD Improves Maintainability

The study identified several mechanisms:

1. **Explicit boundaries:** Aggregates define clear consistency boundaries
2. **Domain alignment:** Code structure mirrors business concepts
3. **Abstraction layers:** Repositories hide data access complexity
4. **Type safety:** Value Objects prevent primitive obsession
5. **Separation of concerns:** Domain Services isolate business logic

### FOE Insights

**Understanding:**
DDD patterns improved code analysability—new team members understood refactored code more easily. The Think Aloud Protocol validation shows DDD creates more understandable code structures by aligning code organization with business domain concepts. When code mirrors the domain, developers can leverage their domain knowledge to navigate the codebase.

**Feedback:**
ISO/IEC 25010 Modifiability improvements indicate DDD enables faster iteration cycles. Well-defined Aggregates provide clear change boundaries—modifications within an Aggregate don't ripple across the system. Repositories provide stable interfaces that allow implementation changes without affecting consumers.

**Confidence:**
The 84/100 mTAM score demonstrates engineers found DDD approaches acceptable and useful—they have confidence in the patterns. Improved Testability means higher confidence in changes: domain logic can be tested in isolation without complex setup. The explicit boundaries reduce the blast radius of changes, increasing confidence to refactor and extend.

## Limitations

- **Single case study:** Results from one automotive company may not generalize to all contexts
- **IP protection:** Company name redacted, limiting reproducibility assessment
- **Cognitive load:** DDD entails complexity and cognitive load that can be a barrier to adoption
- **Learning curve:** Teams need DDD training before they can apply patterns effectively
- **Refactoring scope:** Study focused on tactical patterns; strategic DDD patterns (Bounded Contexts, Context Mapping) not evaluated
- **Short-term evaluation:** Long-term maintainability benefits not measured

### Researchers' Own Caveats

The authors acknowledged that DDD's complexity can be a barrier:

> "DDD entails complexity and cognitive load that can be a barrier."

## Conclusion

### Verdict
**Supported** - This peer-reviewed action research study provides rigorous evidence that DDD tactical patterns improve software maintainability in industrial settings. The 84/100 mTAM score and positive ISO/IEC 25010 mapping demonstrate both acceptance and effectiveness.

### Key Learnings

1. **DDD refactoring is industrially viable:** 84/100 acceptance score from 13 developers
2. **All maintainability dimensions improve:** Modularity, Reusability, Analysability, Modifiability, Testability
3. **New team members benefit most:** Think Aloud Protocol showed improved comprehension
4. **Tactical patterns provide immediate value:** Aggregates, Repositories, Value Objects, Domain Services
5. **Cognitive load is a real barrier:** Teams need training and support

### Recommendation

**Apply DDD tactical patterns when:**
- Codebase has grown difficult to maintain
- New team members struggle to understand the code
- Business logic is scattered across layers
- Team has or can acquire DDD knowledge

**Watch out for:**
- Cognitive load on teams unfamiliar with DDD
- Over-engineering simple domains
- Applying patterns without understanding the domain first

### FOE Application

DDD tactical patterns align with FOE principles:

| DDD Pattern | FOE Alignment |
|-------------|---------------|
| **Aggregates** | Clear boundaries improve understanding and confidence |
| **Repositories** | Stable interfaces enable fast feedback through testing |
| **Value Objects** | Type safety catches errors early (fast feedback) |
| **Domain Services** | Isolated logic is easier to understand and test |

The 84/100 acceptance score and ISO/IEC 25010 improvements demonstrate that DDD creates code that is easier to understand, faster to modify, and safer to change.

---

## See Also

- [Aggregate](/docs/external-frameworks/domain-driven-design/methods/aggregate) - Consistency boundaries in DDD
- [Repository](/docs/external-frameworks/domain-driven-design/methods/repository) - Data access abstraction
- [Value Object](/docs/external-frameworks/domain-driven-design/methods/value-object) - Domain-meaningful types
- [Domain Service](/docs/external-frameworks/domain-driven-design/methods/domain-service) - Business logic encapsulation

## References

- Özkan, O., Babur, Ö., & van den Brand, M. (2023). Refactoring with Domain-Driven Design in an Industrial Context: An Action Research Report. *Empirical Software Engineering*, 28, Article 110. https://doi.org/10.1007/s10664-023-10310-1

---

<RelatedMethods />
