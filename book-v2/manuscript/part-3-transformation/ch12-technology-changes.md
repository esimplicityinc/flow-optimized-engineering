---
chapter: 12
title: "Technology Changes"
part: "III"
status: rewrite
---

# Technology Changes

Technology is the easiest lever to pull.

That’s why it’s the most abused.

Rule zero: **technology enables disciplines; it does not create them.**

## The enabling stack (in plain English)

You’re aiming for a stack that makes discipline cheap: containers/orchestration for consistency and repeatable deploys; GitOps for declared state, drift detection, and rollback via git; observability (metrics/logs/traces) as the cockpit; policy as code for executable guardrails; and traffic management (mesh/gateway) for canaries, rollouts, and safe experimentation.

## “Having” vs “practicing”

Having Kubernetes is not being cloud native.

Having Terraform is not practicing IaC.

Having dashboards is not being observable.

Practice means the tool is the default path, violations are prevented, drift is detected, rollback is routine, and evidence is automatic.

## Selection principles

Prefer boring tech, standardize aggressively, automate toil, and demand observability.

New technology is never free.

It’s an ongoing tax: upgrades, security, expertise, integration.

Spend it only when it buys a discipline you can name.

Next: [Chapter 13: Coherence Across Levels](ch13-coherence-across-levels.md)
