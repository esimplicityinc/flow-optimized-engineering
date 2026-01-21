---
sidebar_position: 3
title: "Optimize for Fast Feedback"
---

# Optimize for Fast Feedback

Fast feedback isn't about shipping faster. It's about *learning* faster: closing the gap between making a decision and discovering whether that decision was right.

> Every code change is a claim about reality. Fast feedback creates selection environments where wrong claims get corrected before they compound.

## Why This Isn't About Speed

The agile movement made "velocity" a metric, and something got lost. Teams optimized for throughput, stories completed, features shipped, points burned down, while missing the actual goal: accurate beliefs about what works.

Speed of delivery and speed of learning are different things:
- You can ship fast while learning nothing (features nobody uses)
- You can ship slow while learning everything (spikes that inform architecture)
- You can ship fast *and* learn fast (the actual goal)

FOE optimizes for *calibration*: the alignment between what you believe and what's true. Fast feedback is the mechanism that produces calibration.

## Prediction Error and Belief Formation

Humans learn through prediction error. We form beliefs, act on them, observe outcomes, and update. This is the only reliable mechanism for belief revision.

When feedback is slow:
- Beliefs ossify before evidence arrives
- Confidence accumulates without accuracy
- Teams become certain they're right while being wrong
- Correction becomes psychologically expensive

When feedback is fast:
- Wrong beliefs get caught early
- Confidence tracks actual evidence
- Course correction is cheap and normal
- Teams develop accurate intuitions

:::note
Long feedback loops don't just delay learning; they corrupt it. By the time evidence arrives, the original decision context is forgotten, the people involved have moved on, and the connection between cause and effect is obscured.
:::

## What FOE Actually Optimizes

FOE targets three specific feedback characteristics:

### 1. Time-to-Disconfirmation

How quickly can you discover you're wrong?

| Feedback Loop | Typical Time | FOE Target |
|--------------|--------------|------------|
| "Does this compile?" | Seconds | Seconds (no change) |
| "Does this work?" | Minutes to days | Minutes (automated tests) |
| "Does this solve the problem?" | Weeks to months | Days (short iterations) |
| "Did we build the right thing?" | Months to years | Weeks (user exposure) |

The goal isn't instantaneous feedback everywhere; some things take time to evaluate. The goal is removing *unnecessary* delay. If you could know faster and you don't, you're accumulating belief debt.

### 2. Visibility of Consequences

Can you see what your change actually did?

Fast feedback is useless if you can't interpret it. Visibility means:
- **Observability**: What happened in production?
- **Traceability**: What change caused this behavior?
- **Comparison**: How does this differ from before?

A deployment that "succeeds" but hides its effects isn't providing feedback. It's providing false confidence.

### 3. Selection Pressure

Does reality get a vote?

The strongest feedback comes from actual usage. Tests verify what you *think* matters. Users reveal what *actually* matters. Production is the ultimate selection environment.

FOE creates selection environments:
- Feature flags that expose changes to real users safely
- A/B tests that let reality choose
- Canary deployments that catch problems before full rollout
- Metrics that distinguish success from activity

## Why Phase 3 Requires Phase 4 Thinking

Here's a psychological truth that most methodologies ignore:

**Fast feedback only helps if the team can tolerate being wrong.**

In cultures where mistakes are punished, fast feedback is threatening. Teams will:
- Avoid measurements that might reveal failure
- Game metrics to look good rather than learn
- Extend timelines to delay judgment
- Blame external factors when feedback is negative

Phase 3 (optimization) requires the confidence that Phase 4 (flow) provides. You can't learn from failure if failure is unsafe. This is why the three principles must develop together.

:::info
Fast feedback in a low-confidence environment doesn't produce learning; it produces anxiety. Teams need to know that discovering "we were wrong" is success, not failure.
:::

## The Hidden Dimension: Epistemic Hygiene

The visible optimization is feedback speed. The hidden optimization is **epistemic hygiene**: the cleanliness of belief formation processes.

> Epistemic hygiene protects against believing things for bad reasons.

Epistemic contamination sources:
- **Narrative lock-in**: We committed to this story, so contradicting evidence gets explained away
- **Tool worship**: We bought this platform, so it must be the right approach
- **Authority bias**: The senior person said it, so it must be true
- **Sunk cost**: We've invested too much to change course now
- **AI hallucination**: The model confidently stated it, so we stopped verifying

Fast feedback without epistemic hygiene produces *confident* teams, not *accurate* ones. They process more information but learn nothing because the information gets filtered through contaminated beliefs.

**Epistemic hygiene practices:**
- Pre-mortems that imagine failure before commitment
- Red teams that argue against decisions
- Explicit uncertainty acknowledgment ("we believe X with Y confidence")
- Separation of observation from interpretation
- Regular belief audits ("what did we think six months ago that turned out wrong?")

:::tip[GovCon Insight]
Government programs fail most often from late discovery of fundamental problems. Fast feedback directly addresses this:

- **Iterative delivery**: Working software in short cycles reveals integration issues, requirement gaps, and technical risks before they become program-threatening.

- **Course correction**: Programs that can adjust based on evidence outperform programs locked into year-old plans. Fast feedback creates the information needed to justify adjustments.

- **Evidence-based decisions**: When stakeholders ask "why should we change approach?", fast feedback provides evidence. Without it, you're arguing opinions.

The DoD's shift toward DevSecOps is explicitly about feedback speed. Contractors who master fast feedback practices align with where government acquisition is heading.
:::

## Practical Implementation

### For Developers

1. **Write tests that fail fast:** A test suite that takes an hour to run isn't feedback; it's a queue
2. **Deploy to learn, not just to ship:** Every deployment is an experiment
3. **Instrument for understanding:** Metrics should answer questions, not just fill dashboards
4. **Shorten the loop:** Whatever your current feedback cycle, ask how to halve it

### For Tech Leads

1. **Protect feedback time:** Test infrastructure is production infrastructure
2. **Create safe failure modes:** Feature flags, canaries, rollback capabilities
3. **Review feedback quality:** Are we learning or just measuring?
4. **Model epistemic humility:** Say "I was wrong" publicly and often

### For Product Owners

1. **Design experiments, not features:** Every release should have a hypothesis
2. **Define success before building:** If you can't measure it, you can't learn from it
3. **Schedule reflection:** Learning doesn't happen automatically; it requires deliberate review
4. **Kill your darlings:** Fast feedback is useless if you won't act on it

## The Feedback Stack

Different feedback loops serve different purposes:

| Loop | Question | Mechanism | Cadence |
|------|----------|-----------|---------|
| Static analysis | Is this code valid? | Linters, type checkers | Seconds |
| Unit tests | Does this logic work? | Automated tests | Minutes |
| Integration tests | Do components work together? | Test environments | Minutes to hours |
| Deployment | Does this run in production? | CI/CD pipeline | Hours |
| Monitoring | Is this behaving correctly? | Observability tools | Real-time |
| User feedback | Does this solve the problem? | Usage metrics, interviews | Days to weeks |
| Business metrics | Does this create value? | Outcome measurement | Weeks to months |

FOE optimizes the entire stack, not just the technical layers. Many teams have fast CI/CD but slow user feedback; they ship quickly but learn slowly.

## Warning Signs

You're losing feedback when:
- Test suites take so long that people skip them
- Deployments are "events" rather than routine
- Production problems are discovered by users, not monitoring
- Retrospectives don't change behavior
- The same mistakes recur
- "We'll measure that later" never becomes now

## The Payoff

Teams that optimize for fast feedback experience:
- Early problem detection (cheap fixes, not expensive ones)
- Accurate estimation (based on evidence, not hope)
- Confident decisions (backed by data)
- Continuous improvement (learning becomes habitual)
- Reduced waste (stop building the wrong things)

Fast feedback is how teams develop accurate intuitions. It's the difference between a team that gets better over time and one that just gets older.

---

## Katalyst Implementation

:::info[With Katalyst]
Katalyst BDD Test provides a unified testing framework built on Playwright that enables fast feedback across all system layers: API, UI, and TUI. Using ports and adapters architecture, tests remain clean and maintainable while providing comprehensive coverage.
:::

### How Katalyst BDD Test Enables Fast Feedback

Katalyst BDD Test addresses the feedback stack at multiple levels:

| Feedback Loop | Katalyst Mechanism |
|---------------|-------------------|
| **Does this logic work?** | API testing with `@api` tagged scenarios |
| **Does the UI work?** | Browser testing with `@ui` tagged scenarios |
| **Does the CLI work?** | Terminal testing with `@tui` tagged scenarios |
| **Do layers integrate?** | Hybrid testing with `@hybrid` tagged scenarios |

### Readable, Executable Specifications

Tests are written in Gherkin, making them readable by non-technical stakeholders:

```gherkin
@api
Feature: User Management API

  Scenario: Create and verify user
    Given I am authenticated as an admin via API
    When I POST "/admin/users" with JSON body:
      """
      { "email": "test@example.com", "name": "Test User" }
      """
    Then the response status should be 201
    And I store the value at "id" as "userId"
    
    When I GET "/admin/users/{userId}"
    Then the response status should be 200
    And the value at "email" should equal "test@example.com"
```

### Ports and Adapters: Clean Separation

The framework uses hexagonal architecture to separate *what* from *how*:

```typescript
// Port defines WHAT (interface)
interface ApiPort {
  sendJson(method: string, path: string, body?: unknown): Promise<ApiResult>;
}

// Adapter defines HOW (implementation)
class PlaywrightApiAdapter implements ApiPort {
  async sendJson(method, path, body) {
    // Playwright-specific implementation
  }
}
```

This separation means:
- Tests don't change when implementation details change
- Different adapters can be swapped without rewriting tests
- Mock adapters enable fast unit testing of step logic

### Multi-Layer Testing in One Framework

Instead of maintaining separate frameworks for API, UI, and integration tests:

```gherkin
@hybrid
Feature: User Creation Flow

  Scenario: Admin creates user via UI, user logs in via API
    # UI layer
    Given I am logged in as an admin via UI
    When I click button "Create User"
    And I fill field "Email" with "new@example.com"
    And I click button "Submit"
    Then I should see text "User created"
    
    # API layer
    When I POST "/auth/login" with JSON body:
      """
      { "email": "new@example.com", "password": "temp123" }
      """
    Then the response status should be 200
```

### Automatic Resource Cleanup

The framework automatically cleans up resources created during tests:

```gherkin
When I POST "/admin/users" with JSON body:
  """
  { "email": "test@example.com" }
  """
Then the response status should be 201
And I register cleanup for "user" at "{response.id}"

# After scenario completes, user is automatically deleted
```

### Fast Feedback via Tag Filtering

Run only the tests you need:

```bash
# Run only API tests (fastest)
npx playwright test --grep @api

# Run only UI tests
npx playwright test --grep @ui

# Run hybrid integration tests
npx playwright test --grep @hybrid
```

### Integrating with CI/CD

Katalyst BDD Test integrates with the Katalyst Platform CI/CD pipeline:

```yaml
# GitHub Actions workflow
- name: Run BDD Tests
  run: npx playwright test
  env:
    API_BASE_URL: ${{ secrets.API_BASE_URL }}
    
- name: Upload Test Results
  uses: actions/upload-artifact@v3
  with:
    name: playwright-report
    path: playwright-report/
```

Tests run on every PR. Failures block merge. Fast feedback is institutionalized.

**Learn more:** [Katalyst BDD Test Documentation](https://esimplicityinc.github.io/katalyst-bdd-test/docs/)
