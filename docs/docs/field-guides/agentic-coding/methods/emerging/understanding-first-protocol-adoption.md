---
sidebar_position: 1
title: "Understanding-First Protocol Adoption"
maturity: experimenting
experiments:
  - prima-oss-fork-strategy
---

import MaturityBadge from '@site/src/components/MaturityBadge';
import RelatedExperiments from '@site/src/components/RelatedExperiments';

# Understanding-First Protocol Adoption

<MaturityBadge maturity="experimenting" />

When adopting emerging protocols, invest time to understand the protocol's conceptual model—not just its API—before making architectural decisions that depend on it.

:::caution Early Stage
This method is still being validated through experiments. Results may vary and 
the approach may evolve as we learn more.
:::

## Overview

When adopting emerging protocols or technologies, teams often learn the API without understanding the underlying conceptual model. This creates "conceptual debt" that manifests as architectural mistakes, subtle bugs, and security vulnerabilities. The time "saved" by skipping understanding is spent on hotfixes and architectural rework.

Understanding-First Protocol Adoption inverts this pattern: before making architectural decisions that depend on a protocol, invest time to understand *how the protocol thinks about the world*—its model of isolation, state, identity, and boundaries. This is different from learning to call its API.

The Prima experiment demonstrated this clearly: the team adopted MCP without understanding its workspace isolation model, leading to a security issue where headers leaked between workspaces (Issue #156). The team later reflected: "The team didn't understand MCP well enough to make good architectural decisions. They couldn't distinguish between using MCP as a standard for integrating systems, using it to integrate different systems, or building their own bespoke integration."

## When to Use

Use this method when:

- Adopting an emerging or unfamiliar protocol (MCP, gRPC, GraphQL federation, etc.)
- Building architecture that depends on protocol assumptions (isolation, state, identity)
- Integrating systems where the protocol defines boundaries
- Team has limited prior experience with the protocol

## When NOT to Use

Avoid this method when:

- Using mature, well-documented protocols the team already understands
- Prototyping/spiking where architectural decisions aren't being made yet
- The protocol is a thin wrapper with no meaningful conceptual model

## How It Works

### Prerequisites

Before starting:
- Identified a protocol your architecture will depend on
- Access to protocol documentation, specs, or reference implementations

### Step 1: Distinguish Model from API

Before reading API docs, ask: "What is this protocol's model of the world?" For MCP, this means understanding workspaces, isolation boundaries, and state management—not just how to make calls.

Write down what you think the protocol's core concepts are. If you can't articulate them, you don't understand the model yet.

### Step 2: Map the Protocol's Assumptions

Document the protocol's assumptions about:
- **Isolation:** What boundaries exist? What can cross them?
- **State:** Where does state live? Who owns it?
- **Identity:** How are actors/resources identified?
- **Failure:** How does the protocol expect errors to be handled?

If the documentation doesn't answer these questions clearly (common with emerging protocols), budget extra time to discover them through experimentation.

### Step 3: Validate Understanding Before Architecture

Before making architectural decisions, verify your understanding:
- Explain the model to a teammate (or rubber duck)
- Build a minimal spike that tests your assumptions about boundaries
- If using an emerging protocol, expect gaps in documentation—budget time accordingly

The Prima team's header leakage issue resulted from not validating their understanding of MCP's workspace isolation before building on top of it.

### Step 4: Document Your Model Understanding

Write down your understanding of the protocol's model for the team. This becomes the reference for architectural decisions and helps distribute knowledge. Include:
- Core concepts and their relationships
- Boundary assumptions
- Known limitations or gaps in your understanding

## Example

From the Prima experiment, the team adopted MCP for integrating their AI platform components. They learned the API—how to make MCP calls—but didn't understand the protocol's workspace isolation model.

**What they missed:** MCP workspaces have isolation boundaries. Headers and tokens should not leak between workspaces.

**What happened:** Issue #156 - "Hotfix: Stop token/workspace inheritance in MCP hypervisor to prevent header leakage"—a security issue that required emergency fixes.

**What understanding-first would have looked like:**
1. Before integrating MCP, document: "What is a workspace? What can cross workspace boundaries?"
2. Build a spike testing workspace isolation specifically
3. Discover the isolation model before building production architecture on top of it

## Common Pitfalls

1. **Confusing API familiarity with model understanding** - Being able to make calls doesn't mean you understand the protocol's assumptions. Ask yourself: "Could I explain why the protocol is designed this way?"

2. **Skipping this under velocity pressure** - The Prima experiment shows the time "saved" is consumed by debugging and hotfixes. Understanding investment has positive ROI even under pressure.

3. **Assuming documentation is complete** - Emerging protocols often have gaps. Budget time to discover the model through experimentation, not just reading.

## How You Can Help

If you're testing this method:

1. Review the current approach
2. Try it when adopting a new protocol in your context
3. Document your experiment—especially what you learned about the protocol's model that wasn't obvious from the API

## Supporting Evidence

<RelatedExperiments />
