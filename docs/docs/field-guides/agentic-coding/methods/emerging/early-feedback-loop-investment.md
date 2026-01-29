---
displayed_sidebar: fieldGuideSidebar
sidebar_position: 2
title: "Early Feedback Loop Investment"
maturity: observing
observations:
  - internal/prima-oss-fork-strategy
  - internal/prima-bdd-api-testing-adoption
---

import MaturityBadge from '@site/src/components/MaturityBadge';
import RelatedObservations from '@site/src/components/RelatedObservations';

# Early Feedback Loop Investment

<MaturityBadge maturity="observing" />

Treat CI, automated tests, and deployment pipelines as foundation, not overhead—establish them early before the codebase grows large enough to make adding them feel "monumental."

:::caution Early Stage
This method is still being validated through observations. Results may vary and 
the approach may evolve as we learn more.
:::

## Overview

Under velocity pressure, teams often defer testing and deployment infrastructure as "overhead" that can wait. This creates a "works on my machine" culture where feedback only arrives in production—when fixes are most expensive and stressful.

Early Feedback Loop Investment treats CI, automated tests, and deployment pipelines as *foundation*, not overhead. The time "saved" by skipping this investment is consumed many times over in debugging, production incidents, and support burden.

The Prima observation showed this pattern starkly: no test infrastructure meant 7 production bugs on the first day users onboarded. The December debugging crunch—commits like "prod debugging logs" and "temporarily disabled tool toggle feature"—revealed problems that automated tests would have caught weeks earlier. The team noted that the large OSS codebase made adding tests feel "monumental," but the alternative proved worse.

## When to Use

Use this method when:

- Starting any project expected to last more than a few weeks
- Forking or inheriting a large codebase without existing test coverage
- Team is under velocity pressure (counterintuitive but critical)
- Multiple people will contribute to the same codebase

## When NOT to Use

Avoid this method when:

- True throwaway prototypes with no path to production
- Solo exploration where you ARE the feedback loop
- Codebase already has healthy test infrastructure

## How It Works

### Prerequisites

Before starting:
- A codebase that will be maintained beyond initial development
- Ability to set up CI/CD infrastructure (even minimal)

### Step 1: Start with Deployment Validation

Before writing features, establish: "How do we know this works somewhere other than my machine?" Even a simple "deploy to staging and smoke test" script breaks the "works on my machine" pattern.

The goal isn't perfection—it's having *any* validation that runs outside your local environment.

### Step 2: Add Tests Before the Codebase Feels "Too Big"

The psychological barrier to testing grows with codebase size. Start testing infrastructure when the codebase is small, even if coverage is minimal. Waiting until it feels "monumental" means you've already lost.

The Prima team reflected: "The OSS was so large that adding BDD tests felt monumental." This is the trap—by the time you notice the barrier, it's already high.

### Step 3: Make CI the Source of Truth

If it doesn't pass CI, it doesn't work. This shifts the definition of "done" from local success to validated success. Configure CI to run on every PR.

This creates a shared understanding of "working" that doesn't depend on any individual's machine or knowledge.

### Step 4: Budget Test Time into Velocity

Explicitly allocate time for test infrastructure in estimates. If velocity pressure causes this to be cut, escalate—the Prima observation shows the cost of skipping it: 7 production bugs on day one, a December debugging crunch, and ongoing support burden.

## Example

From the Prima observation:

**What happened without early feedback loops:**
- December 20-31, 2025: Commits like "prod debugging logs," "more debug," "temporarily disabled tool toggle feature"
- January 12, 2026: 7 production bugs filed on the first day users onboarded
- Issues discovered in production that tests would have caught: "ensuring tool function name length meets openai compatible length"

**What early feedback loop investment would have looked like:**
1. Week 1: Set up basic CI that deploys to a staging environment
2. Week 2: Add smoke tests for core functionality
3. Ongoing: Every PR runs through CI before merge

**The ROI:** The time spent on December debugging and January firefighting far exceeded what early test infrastructure would have cost.

## Common Pitfalls

1. **"We'll add tests later"** - Later never comes, and the codebase grows. The psychological barrier increases. Start now, even if minimal.

2. **Treating tests as overhead, not foundation** - Tests aren't slowing you down; they're preventing the slowdown that comes from production debugging.

3. **Waiting for "the right time"** - There's no right time. The best time was at project start; the second best time is now.

4. **Perfectionism** - You don't need 100% coverage. You need *any* automated validation. Start with smoke tests and grow from there.

## How You Can Help

If you're testing this method:

1. Review the current approach
2. Try establishing feedback loops early in your next project
3. Document your observation—especially the relationship between early investment and later stability

## Supporting Evidence

<RelatedObservations />
