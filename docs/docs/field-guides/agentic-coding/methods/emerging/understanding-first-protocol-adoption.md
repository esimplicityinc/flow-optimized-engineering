---
sidebar_position: 2
title: "Understanding-First Protocol Adoption"
maturity: experimenting
experiments:
  - prima-oss-fork-strategy
---

import MaturityBadge from '@site/src/components/MaturityBadge';
import RelatedExperiments from '@site/src/components/RelatedExperiments';

# Understanding-First Protocol Adoption

<MaturityBadge maturity="experimenting" />

Invest dedicated time to understand a protocol's conceptual model before integrating it into your system.

:::caution Early Stage
This method is derived from negative evidence--an experiment showing what happens when you *don't* follow this approach. We're seeking experiments that demonstrate positive outcomes when this method is applied.
:::

## Overview

When integrating systems via protocols (like MCP, OAuth, GraphQL Federation), teams often focus on the API surface--the endpoints, payloads, and authentication flows. This method argues that understanding the protocol's **conceptual model** is more important than understanding its API.

A conceptual model includes:
- How the protocol thinks about identity and context
- What isolation boundaries exist (workspaces, tenants, sessions)
- What assumptions the protocol makes about state
- What the protocol is designed to prevent vs. enable

Without this understanding, teams make architectural decisions that violate the protocol's assumptions, leading to subtle bugs, security issues, and rework.

## Hypothesis

> If we invest dedicated time to understand a protocol's conceptual model before integration, then we will make better architectural decisions and avoid security issues caused by misunderstanding isolation boundaries.

## When to Use

- Integrating with a new protocol you haven't used before
- The protocol handles security-sensitive concerns (auth, multi-tenancy, data isolation)
- The protocol is emerging or rapidly evolving (limited documentation, few examples)
- Your team has no prior experience with this protocol family

## When NOT to Use

- Simple, well-documented protocols with extensive examples
- Protocols your team has deep experience with
- Prototyping where architectural decisions are explicitly temporary

## Current Approach

### Step 1: Identify the Conceptual Model

Before writing integration code, answer these questions:
- What are the core abstractions? (workspaces, sessions, contexts, tenants)
- How does the protocol think about identity? (tokens, headers, session state)
- What isolation guarantees does the protocol provide?
- What are the protocol's assumptions about your system?

### Step 2: Create a Mental Model Document

Write down your understanding of the protocol model in 1-2 pages. Include:
- A diagram of the key abstractions and their relationships
- What data flows where
- What the protocol prevents vs. enables
- Questions you can't yet answer

### Step 3: Validate Understanding Before Integration

Before making architectural decisions:
- Review your mental model with someone who knows the protocol
- Build a minimal proof-of-concept that tests your assumptions
- Specifically test isolation boundaries (can workspace A see workspace B's data?)

### Step 4: Revisit When Confused

When integration gets confusing, revisit your mental model. Confusion often indicates a gap in conceptual understanding, not just API knowledge.

## What We're Learning

### From Prima (Negative Evidence)

The Prima project integrated MCP without understanding its workspace isolation model. The result:
- **Security Issue #156**: "Hotfix: Stop token/workspace inheritance in MCP hypervisor to prevent header leakage"
- Headers were leaking between workspaces because the team didn't understand how MCP scopes context
- This wasn't a coding error--it was a conceptual error about how MCP workspaces should be isolated

The team reflected: *"We didn't understand MCP well enough to make good architectural decisions. We couldn't distinguish between using MCP as a standard for integrating systems, using it to integrate different systems, or building our own bespoke integration."*

### Open Questions

- How much time should be invested in understanding? (Hours? Days? Weeks?)
- What signals indicate understanding is "sufficient"?
- How do you understand a protocol that's still being defined?

## How You Can Help

We're seeking experiments that demonstrate positive outcomes:

1. Teams that invested in protocol understanding upfront--what did you do? How long did it take? What issues did you avoid?
2. Teams that started without understanding and then invested later--was it worth it? What changed?
3. Specific techniques for building protocol understanding quickly

If you have experience, [document your experiment](/docs/field-guides/contributing-experiments).

## Supporting Evidence

<RelatedExperiments />
