---
sidebar_position: 5
title: "Prima: BDD Adoption for API Testing"
status: completed
source_type: internal
methods:
  - external-frameworks/bdd/methods/given-when-then
  - external-frameworks/bdd/methods/executable-specifications
  - external-frameworks/bdd/methods/gherkin
  - external-frameworks/bdd/methods/discovery-workshops
---

import RelatedMethods from '@site/src/components/RelatedMethods';

# Prima: BDD Adoption for API Testing

> **Timeline:** June 2025 - January 2026 (7+ months)
> **Team:** Prima Platform Engineering

An internal observation documenting Prima's adoption of Behavior-Driven Development for API testing across the Control Tower and Engine services, growing from 0 to 56 feature files with measurable impacts on test coverage, maintenance patterns, and refactoring confidence.

## Context

**Environment:**
- Team: Prima Platform Engineering (E Simplicity Inc)
- Timeline: June 9, 2025 - ongoing
- Repositories: prima-control_tower, prima-engine
- Stack: Playwright-BDD, TypeScript, Python backends

**The Problem:**
Prima needed reliable API testing for a complex multi-service platform including Control Tower (admin/user management, LLM providers, workspaces, tools) and Engine (MCP protocol, AI orchestration). Traditional unit tests didn't capture API contract behavior effectively, and manual testing couldn't scale with rapid development.

**What We Tried:**
Adopted Playwright-BDD with Gherkin feature files for end-to-end API testing, starting June 9, 2025 with two initial commits that established the test infrastructure.

## Hypothesis

> "If we adopt BDD with Gherkin feature files for API testing, then we will achieve better API contract documentation and catch integration issues earlier, because executable specifications serve as both tests and living documentation that stakeholders can read."

**Variables:**
- Independent: BDD adoption (feature files, step definitions, CI integration)
- Dependent: Test coverage, defect detection timing, refactoring confidence, maintenance burden

## Approach

### Phase 1: Infrastructure Setup (June 9, 2025)

Two foundational commits established the BDD test stack:

```
d7ef3df feat(tests): add Playwright BDD testing setup with dotenv support
6f3fe35 feat(tests): initialize stack tests with Playwright and BDD integration
```

**Technology Choices:**
- **Framework:** Playwright-BDD v8.3.0
- **Runner:** Playwright (for HTTP client capabilities)
- **Reporting:** Cucumber HTML reports
- **CI:** `npm test` runs `bddgen` (generates tests from features) then `playwright test`

### Phase 2: Initial Feature Coverage (June 2025)

First month focused on core API domains:

| Feature Area | Files Added | Coverage |
|--------------|-------------|----------|
| Workspaces | 3 | CRUD, membership |
| Knowledgebases | 2 | CRUD, workspace linking |
| Nodes | 2 | CRUD, type management |
| Prompts | 2 | CRUD, versioning |
| LLM APIs | 5 | Providers, credentials, models |
| **Total** | **18** | Core admin/user APIs |

### Phase 3: Expansion (August 2025)

Major expansion added 42 feature files covering:
- Team management and budgets
- Tool providers and instances
- SCIM user provisioning
- Service-to-service authentication
- Guardrails and model configuration

### Phase 4: Steady Growth (September 2025 - January 2026)

Continued additions at 8-10 features/month:
- Authentication flows (password, SSO)
- Workspace manager permissions
- API token management
- External service credentials

### Organization Pattern

Features organized by domain tags for selective execution:

```bash
# Run only admin features
BDD_TAGS=admin npm test

# Run admin and user features  
BDD_TAGS=admin,user npm test
```

| Tag | Scope |
|-----|-------|
| `@admin` | Admin-only backend APIs |
| `@user` | Regular user endpoints |
| `@manager` | Resource manager capabilities |
| `@service` | Service-principal integrations |

## Results

### Quantitative Metrics

**Feature File Growth:**

| Month | Files Added | Cumulative |
|-------|-------------|------------|
| June 2025 | 18 | 18 |
| July 2025 | 0 | 18 |
| August 2025 | 42 | 60 |
| September 2025 | 10 | 70 |
| October 2025 | 3 | 73 |
| November 2025 | 8 | 81 |
| December 2025 | 9 | 90 |

**Final Count:** 56 feature files (50 in Control Tower, 6 in Engine)

**Commit Analysis (June 2025 - January 2026):**

| Metric | Control Tower (Strong BDD) | Prima-Web (No BDD) | Engine (Partial BDD) |
|--------|---------------------------|--------------------|--------------------|
| Total commits | 1,126 | 707 | 847 |
| Fix commits | 121 (10.7%) | 73 (10.3%) | 52 (6.1%) |
| Revert commits | 13 (1.2%) | 7 (1.0%) | 7 (0.8%) |
| **Refactor commits** | **122 (10.8%)** | **11 (1.6%)** | **90 (10.6%)** |

**Key Finding:** BDD-enabled repositories show **6-7x higher refactoring rates** (10.8% vs 1.6%), suggesting executable specifications enable confident code restructuring.

**Step Definition Maintenance:**
- 121 commits touching step definitions over 7 months
- Average: ~17 step-related commits per month
- Pattern: Step definitions evolved alongside features, not separately

### Qualitative Observations

**Benefits Realized:**

1. **API Contracts as Documentation** - Feature files serve as readable API documentation:
   ```gherkin
   Scenario: Create credential with both key and access_key_id returns masked values
     When I POST "/admin/llm/provider-credentials" with JSON body:
       """
       {
         "name": "__test_cred-akid-key-{run8}",
         "key": "sekret",
         "access_key_id": "akid-123"
       }
       """
     Then the response status should be 201
     And the value at "key" should equal "****"
     And the value at "access_key_id" should equal "****"
   ```

2. **Regression Detection** - BDD tests caught issues during development:
   - "fixing bdd test failures" commits indicate tests catching breaking changes
   - "231-bug-tool-provider-bdd-failures" branch shows BDD surfacing integration issues

3. **Refactoring Confidence** - High refactor rate (10.8%) in BDD repos vs low rate (1.6%) in non-BDD repos suggests tests enabled safe restructuring

**Challenges Encountered:**

1. **Step Definition Maintenance** - 121 commits over 7 months shows ongoing investment:
   ```
   abc1ade add missing When import
   3fb7091 Add new step definitions for JSON path assertions
   8d4af59 fixing test
   06545b5 fix BDD test
   ```

2. **Test Reliability** - Some commits address test flakiness:
   ```
   4434c0c Fix BDD test auth bleeding
   996a406 BDD context fix
   ```

3. **Initial Investment** - August 2025 saw 42 feature files added, indicating significant upfront effort to achieve coverage

## Analysis

### What the Observation Establishes

1. **BDD scales for API testing** - 56 feature files across two services demonstrates viability at scale

2. **Refactoring confidence is measurable** - 6-7x higher refactoring rate in BDD repos provides quantitative evidence that executable specifications enable safe code changes

3. **Maintenance is real but manageable** - ~17 step-related commits/month is non-trivial but sustainable for a platform of this complexity

4. **Living documentation works** - Feature files like `admin_llm_provider_credentials.feature` (189 lines) serve as comprehensive API contract documentation

### FOE Insights

**Understanding:**
The Gherkin feature files create shared understanding of API behavior that code alone cannot provide. A stakeholder can read:

```gherkin
Scenario: Deleting a credential that is in use returns 409
```

...and understand the business rule without reading Python code. This aligns with FOE's principle that understanding should be optimized through explicit documentation.

**Feedback:**
BDD provides fast feedback at the API contract level:
- Specs run on every PR
- Failures surface integration issues before deployment
- The 10.7% fix rate in Control Tower includes issues caught by BDD before production

The feedback loop operates at the behavioral level, not just unit level, catching issues that unit tests miss.

**Confidence:**
The 6-7x higher refactoring rate is the quantified payoff of confidence:
- Developers refactor more when they trust tests will catch regressions
- Non-BDD repo (prima-web) has 1.6% refactor rate - developers may be avoiding changes
- BDD-enabled repos show sustained improvement activity

## Limitations

- **Correlation vs causation:** Higher refactor rate could be due to team differences, not BDD
- **Single team:** All repos maintained by same organization; may not generalize
- **No A/B test:** Same features weren't tested with and without BDD
- **Maintenance costs unclear:** Step definition time investment not tracked separately
- **Selection bias:** BDD adopted for APIs, not UI - may work better for API testing

## Conclusion

### Verdict
**Supported** - BDD adoption for API testing delivered measurable benefits: extensive coverage (56 feature files), readable documentation, and quantifiably higher refactoring confidence. Maintenance burden is real but manageable.

### Key Learnings

1. **Start with infrastructure** - Two commits established the foundation that enabled everything else
2. **Expand deliberately** - Initial 18 features, then major 42-file expansion once patterns proven
3. **Organize by domain** - Tag-based organization (@admin, @user, @service) enables selective execution
4. **Expect step maintenance** - ~17 commits/month on step definitions is the ongoing cost
5. **Refactoring payoff is real** - 6-7x higher refactor rate justifies the investment

### Recommendation

**Apply BDD for API testing when:**
- API contracts need documentation that stays current
- Multiple services integrate through APIs
- Refactoring confidence is limiting code improvement
- Team is willing to invest in step definition maintenance

**Watch out for:**
- Underestimating step definition maintenance
- Brittle tests that break on implementation details
- Auth/context bleeding between scenarios (we had to fix this)

### Metrics for Replication

Teams replicating this observation should track:
- Feature file count over time
- Fix commit ratio (expect ~10%)
- Refactor commit ratio (expect increase with BDD)
- Step definition commits per month
- Test execution time trends

---

## References

- Prima Control Tower repository (internal)
- Prima Engine repository (internal)
- Playwright-BDD documentation: https://vitalets.github.io/playwright-bdd/

---

<RelatedMethods />
