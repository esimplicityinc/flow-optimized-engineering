---
methodId: M156
displayed_sidebar: fieldGuideSidebar
sidebar_position: 5
title: "Agent-Mediated Access"
maturity: hypothesized
observations: []
---

import InternalMethodHeader from '@site/src/components/InternalMethodHeader';
import RelatedObservations from '@site/src/components/RelatedObservations';

# Agent-Mediated Access

<InternalMethodHeader />

Democratize system changes by using AI agents as safe, intelligent interfaces between users and codebases—but only when backed by deterministic frameworks that keep the agent itself on rails.

## Overview

**Agent-Mediated Access** is a pattern for democratizing system changes by using AI agents as a safe, intelligent interface between users and codebases—but only when backed by deterministic frameworks that keep the agent itself on rails.

The method requires two layers:

1. **Deterministic scaffolding** — Explicit rules, schemas, validation checks, and constraints encoded in the repository (via agent configuration files, linting rules, test suites, type systems, and deployment gates). These are non-negotiable guardrails.
2. **Agent interface** — An AI agent that accepts intent-level requests, understands the scaffolding, and translates requests into compliant changes. The agent can be flexible in *how* it achieves goals, but the scaffolding ensures it stays within bounds.

This combination is key: the agent provides accessibility and abstraction, while the deterministic frameworks prevent drift, enforce standards, and catch mistakes the agent might make. Without the scaffolding, agent-mediated access becomes agent-mediated chaos.

The result: product owners, QA engineers, and operations staff can contribute directly to system delivery—not because the agent is trusted blindly, but because the system is designed to catch errors regardless of who (or what) introduces them.

## When to Use

Use this method when:

- **Cross-functional teams** where non-developers need to make system changes (config updates, feature flags, content, simple logic)
- **Repos with mature guardrails** — established linting, testing, type systems, and CI/CD gates already in place
- **Repeatable change patterns** — the types of changes are well-understood and can be templated/constrained
- **High handoff friction** — developer bottlenecks are slowing delivery and creating queues
- **Starter projects with pre-built scaffolding** — new repos bootstrapped from templates that already include agent configurations, guardrails, and encoded patterns (the investment is made once, reused many times)

## When NOT to Use

Avoid this method when:

- **Immature repos without scaffolding investment** — no guardrails exist yet and no templates are available to bootstrap from
- **Novel/exploratory work** — changes that require judgment, architectural decisions, or creativity beyond encoded rules
- **High-stakes systems without recovery** — if rollback is hard and the blast radius is large, human review may still be essential
- **Teams without agent literacy** — users need to understand what the agent can and can't do; blind trust is dangerous

## How It Works

### Prerequisites

Before starting:
- A repository (existing or new) where you want to enable cross-role contribution
- Understanding of the types of changes non-developers will need to make
- Basic CI/CD pipeline in place (or willingness to set one up)
- AI agent tooling that can be configured per-repo (e.g., Claude with CLAUDE.md, Cursor rules, Copilot instructions)

### Step 1: Identify Contribution Patterns

Map out the types of changes non-developers typically request. Look for:

- Configuration changes (feature flags, settings, thresholds)
- Content updates (copy, messages, labels)
- Simple logic changes (rules, conditions, mappings)
- Data structure additions (new fields, new entries)

Focus on high-frequency, low-complexity changes that currently create developer bottlenecks.

### Step 2: Build Deterministic Scaffolding

For each contribution pattern, encode guardrails that make invalid states impossible (or caught immediately):

| Guardrail Type | Purpose |
|----------------|---------|
| **Schemas** | Define valid structures (JSON Schema, TypeScript types, etc.) |
| **Validation** | Linting rules, pre-commit hooks, CI checks |
| **Tests** | Automated tests that catch regressions |
| **Templates** | Starter patterns that guide the agent toward correct implementations |

The goal: if the agent produces something wrong, *the system catches it* before it reaches production.

### Step 3: Configure the Agent Interface

Create agent configuration files that encode:

- Repository structure and conventions
- Allowed change patterns and constraints
- Domain-specific terminology and rules
- Examples of correct implementations
- Explicit boundaries (what the agent should refuse to do)

Example in a `CLAUDE.md` or `agents.md`:

```markdown
## Allowed Changes

You may help non-developers with:
- Updating feature flags in `config/features.json`
- Adding new copy strings to `locales/*.json`
- Modifying thresholds in `config/rules.yaml`

## Constraints

- All JSON files must pass schema validation
- Feature flags require a description and owner
- Never modify files outside the `config/` directory without developer approval
```

### Step 4: Add Telemetry & Observability

Instrument the system to track:

- What changes are being made via agent-mediated access
- Success/failure rates through CI gates
- Rollback frequency
- Time-to-contribution for non-developers

This data validates whether the method is working and surfaces where guardrails need strengthening.

### Step 5: Onboard Non-Developer Contributors

Introduce the agent interface to target users with:

- Clear guidance on what types of changes they can make
- Examples of successful requests
- Explanation of what happens when guardrails catch errors
- Escalation path for requests outside the agent's scope

## Example

**Scenario:** A product owner needs to enable a feature flag for a beta test.

**Before (Developer Bottleneck):**
1. Product owner creates a ticket: "Enable dark-mode flag for beta users"
2. Ticket sits in backlog for 2 days
3. Developer picks it up, makes 1-line change
4. PR review, merge, deploy
5. Total lead time: 3-4 days for a 1-line change

**After (Agent-Mediated Access):**
1. Product owner opens repo with agent interface
2. Request: "Enable the dark-mode feature flag for users in the beta group"
3. Agent updates `config/features.json`:
   ```json
   {
     "dark-mode": {
       "enabled": true,
       "groups": ["beta"],
       "owner": "product-team",
       "description": "Dark mode UI theme"
     }
   }
   ```
4. CI validates: schema check passes, tests pass
5. Auto-merge to staging, product owner verifies
6. Total lead time: 15 minutes

The guardrails (schema validation, required fields, CI checks) ensure the change is safe—the agent just made it accessible.

## Common Pitfalls

1. **Trusting the agent without scaffolding** — The agent is not the safety mechanism; the deterministic guardrails are. Never rely on agent judgment alone.

2. **Over-scoping access** — Start narrow. Let non-developers change config files before letting them touch business logic.

3. **Insufficient onboarding** — Users need to understand the boundaries. "The agent can help you" is not enough; "The agent can help you with X, Y, Z within these constraints" is.

4. **Ignoring telemetry** — Without observability, you won't know if the method is working or where guardrails are failing.

5. **Skipping the rollback path** — Every agent-mediated change should be easily reversible. If it isn't, add human review.

## FOE Alignment

This method supports multiple FOE principles:

- **Optimize for Understanding** — Agent configurations encode domain knowledge explicitly, making rules visible rather than tribal
- **Fast Feedback** — Removes developer bottleneck for simple changes, dramatically reducing lead time
- **Build Confidence** — Confidence comes from the guardrails, not from trusting the agent

## How You Can Help

This is a **hypothesized** method based on early signals. If you're interested in testing it:

1. Identify a repo where non-developers frequently request simple changes
2. Document the change patterns and implement guardrails
3. Configure an agent interface with explicit boundaries
4. Track lead time and error rates before/after
5. Document your experience as an observation

Your evidence will help validate (or refine) this method.

## Supporting Evidence

<RelatedObservations />
