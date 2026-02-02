---
title: "The Three Principles Quick Reference"
appendix: "E"
status: draft
word_count: 1247
---

# Appendix E: The Three Principles Quick Reference

This reference distills the three FOE principles into actionable summaries. Use it to quickly diagnose issues, orient new team members, or remind yourself what you're optimizing for. For full treatment, see Part II (Chapters 5-8).

---

## Principle 1: Optimize for Understanding

**Core Idea:** You cannot move fast through territory you don't understand.

Understanding is the ability to simulate the system in your head: predict outcomes before acting, diagnose problems by tracing causes, design changes that achieve intended effects. Without it, engineering becomes guessing.

### Key Mechanisms

- **Bounded scope:** Services, modules, and changes sized to fit in working memory
- **Explicit interfaces:** Interactions between components visible and predictable
- **Observable state:** System continuously externalizes internal state in human-readable forms
- **Traceable causation:** Changes propagate through visible channels; symptoms trace to causes
- **Progressive disclosure:** Multiple abstraction levels from overview to implementation

### Signs It's Working

- New engineers become productive in weeks, not months
- Changes rarely have "unexpected" side effects
- Experts agree about how the system actually behaves
- Documentation matches reality
- Engineers can explain *why* the system works, not just *what* it does
- Nobody avoids parts of the codebase out of fear

### Signs It's Broken

- Onboarding time keeps increasing
- Same questions get asked repeatedly
- Changes require extensive "discovery" before work begins
- Haunted forests exist that nobody volunteers to touch
- Incidents require assembling multiple experts to diagnose
- "The code is the documentation" but the code is unreadable

### Quick Actions to Improve

1. Add structured logging with trace IDs across service boundaries
2. Create architecture diagrams that stay current (generate from code if possible)
3. Break up any component that can't be understood in one sitting
4. Make implicit dependencies explicit in code and documentation
5. Invest in dashboards that show system state without requiring insider knowledge
6. Run architecture decision records (ADRs) for significant choices

---

## Principle 2: Optimize for Fast Feedback

**Core Idea:** The faster you learn you're wrong, the cheaper it is to correct.

Feedback is how beliefs get calibrated against reality. Fast feedback means discovering problems while context is fresh, fixes are cheap, and the connection between action and consequence is clear. Slow feedback produces teams that are confident but wrong.

### Key Mechanisms

- **Layered verification:** Static analysis (seconds), unit tests (minutes), integration tests (minutes), deployment verification (minutes), production monitoring (continuous)
- **Automated pipelines:** Remove human availability delays from the verification path
- **Continuous monitoring:** Production as ultimate feedback source, not black box
- **Evidence trails:** Every test run, deployment, and metric automatically logged
- **Selection pressure:** Changes that break things get caught and fixed; working code survives

### Signs It's Working

- Developers know within minutes if changes work
- Deployments are boring, routine operations
- Problems detected by monitoring before users notice
- The same mistakes don't recur
- Test results are interpretable by anyone on the team
- Retrospectives actually change behavior

### Signs It's Broken

- Test suites so slow that people skip them locally
- Deployments are events requiring coordination and ceremony
- Users report problems before monitoring does
- Overnight test runs where results arrive after context is lost
- "We'll measure that later" never becomes now
- Flaky tests train everyone to ignore failures

### Quick Actions to Improve

1. Measure and display CI pipeline duration; target under 10 minutes
2. Add pre-commit hooks that catch errors before push
3. Implement canary deployments with automatic rollback triggers
4. Create alerts with context: what happened, when it started, what likely caused it
5. Eliminate flaky tests ruthlessly (they teach people to ignore failures)
6. Track time-to-disconfirmation: how fast do you learn when something is wrong?

---

## Principle 3: Optimize for Confidence

**Core Idea:** Calibrated belief that actions won't cause unbounded harm enables decisive action.

Confidence is not certainty. It's knowing what happens if you're wrong, being able to undo mistakes, and operating within understood parameters. Without confidence, teams freeze despite having understanding and feedback. With it, normal people take necessary risks.

### Key Mechanisms

- **Guardrails not handcuffs:** Constraints that prevent catastrophe while enabling speed
- **Reproducible environments:** Eliminate "works on my machine" uncertainty
- **Quality as default:** Secure, tested, observable by construction, not discipline
- **Bounded blast radius:** Feature flags, canary deployments, circuit breakers contain failures
- **Rollback capability:** Infrastructure as code, reversible migrations, stateless services

### Signs It's Working

- Deployments happen any day of the week without anxiety
- People volunteer for challenging new initiatives
- Decisions made at appropriate levels, not constantly escalated
- Failure leads to learning, not blame
- Teams deploy when ready, not when permitted
- Small, frequent changes rather than big, scary releases

### Signs It's Broken

- Deployments only on Fridays (needs weekend to fix problems)
- Nobody volunteers for new initiatives (unknown risk too high)
- Decisions require excessive sign-off chains
- "That's above my pay grade" is common
- Teams optimize for not being blamed rather than outcomes
- Postmortems become blame sessions rather than learning

### Quick Actions to Improve

1. Implement one-click rollback for all deployments
2. Add feature flags for any change that could affect users
3. Create explicit "operating envelope" documentation: what loads, what failure modes, what recovery procedures
4. Run blameless postmortems focused on systems, not individuals
5. Define and automate blast radius limits for deployments
6. Demonstrate recovery capability through regular chaos experiments

---

## The Cognitive Triangle

The three principles form a closed system. Each enables the others. Each depends on the others. Imbalance in one degrades all three.

### How They Interact

```
Understanding ←→ Fast Feedback ←→ Confidence
      ↑                                ↑
      └────────────────────────────────┘
```

- **Understanding enables fast feedback:** You can only interpret data if you understand the system
- **Fast feedback enables understanding:** Mental models improve through prediction/correction cycles
- **Understanding enables confidence:** You can only confidently change what you understand
- **Confidence enables understanding:** Confident teams explore and improve; fearful teams avoid
- **Fast feedback enables confidence:** Quick recovery from failure makes failure safe
- **Confidence enables fast feedback:** Confident teams instrument; fearful teams avoid measurement

### What Happens When One Is Missing

| Missing Principle | Result |
|-------------------|--------|
| Understanding | Feedback becomes noise; confidence becomes recklessness |
| Fast Feedback | Understanding stagnates; confidence becomes unfounded |
| Confidence | Understanding becomes academic; feedback gets ignored |

### The Balance Requirement

The triangle requires continuous maintenance, not one-time achievement:

1. **Diagnose before treating:** Identify which principle is weakest before adding fixes
2. **Invest proportionally:** Strengthen the weak link, don't over-invest in strengths
3. **Watch for collapse indicators:** Surprises (understanding), stale beliefs (feedback), paralysis (confidence)
4. **Address root causes:** Process additions rarely fix cognitive deficits
5. **Expect ongoing attention:** Balance drifts; entropy is real

### Quick Diagnostic

| Symptom | Likely Weakness |
|---------|-----------------|
| Frequent production surprises | Understanding |
| Long debates without resolution | Fast Feedback |
| Important changes stalled for weeks | Confidence |
| Acting without learning | Feedback |
| Knowing without doing | Confidence |
| Doing without knowing | Understanding |

---

*For complete treatment of these principles, see Chapter 5 (Understanding), Chapter 6 (Fast Feedback), Chapter 7 (Confidence), and Chapter 8 (The Cognitive Triangle).*
