---
displayed_sidebar: fieldGuideSidebar
sidebar_position: 1
title: Agentic Coding
adopted_methods:
  - framework: dora
    method: deployment-frequency
    foe_maturity: hypothesized
  - framework: dora
    method: lead-time-for-changes
    foe_maturity: hypothesized
  - framework: team-topologies
    method: fast-flow
    foe_maturity: hypothesized
  - framework: team-topologies
    method: enabling-team
    foe_maturity: hypothesized
  - framework: team-topologies
    method: team-cognitive-load
    foe_maturity: hypothesized
  - framework: continuous-delivery
    method: trunk-based-development
    foe_maturity: hypothesized
---

import GuideMaturitySummary from '@site/src/components/GuideMaturitySummary';
import MethodMaturityTable from '@site/src/components/MethodMaturityTable';

# Agentic Coding

A collection of flow-optimized methods for AI-assisted software development.

<GuideMaturitySummary 
  guideId="agentic-coding" 
  methods={[
    { maturity: 'proven' },
    { maturity: 'validated' },
    { maturity: 'observing' },
    { maturity: 'observing' },
    { maturity: 'observing' },
    { maturity: 'observing' },
    { maturity: 'observing' },
    { maturity: 'observing' },
    { maturity: 'observing' },
    { maturity: 'observing' },
    { maturity: 'observing' },
    { maturity: 'observing' },
    { maturity: 'observing' },
    { maturity: 'hypothesized' },
    { maturity: 'hypothesized' },
    { maturity: 'hypothesized' },
    { maturity: 'hypothesized' },
    { maturity: 'hypothesized' },
    { maturity: 'hypothesized' },
    { maturity: 'hypothesized' },
    { maturity: 'hypothesized' },
    { maturity: 'hypothesized' },
    { maturity: 'hypothesized' },
  ]} 
/>

## Methods at a Glance

<MethodMaturityTable
  guideId="agentic-coding"
  methods={[
    { id: 'M121', title: 'Executable Specifications', maturity: 'proven', priority: 'essential', slug: 'executable-specifications', framework: 'bdd', frameworkTitle: 'BDD', description: 'Automated tests that serve as living documentation' },
    { id: 'M158', title: 'AgentX: Constrained Autonomy', maturity: 'validated', priority: 'essential', slug: 'agentx-constrained-autonomy', description: 'Deterministic frameworks enable safe agent autonomy through shared abstractions' },
    { id: 'M155', title: 'Verification Before Completion', maturity: 'observing', priority: 'essential', slug: 'verification-before-completion', description: 'Never claim work is complete without running verification commands' },
    { id: 'M146', title: 'Early Feedback Loop Investment', maturity: 'observing', priority: 'essential', slug: 'early-feedback-loop-investment', description: 'Build test/CI infrastructure as foundation, not overhead' },
    { id: 'M154', title: 'Conceptual Debt Prevention', maturity: 'observing', slug: 'conceptual-debt-prevention', description: 'Understand a technology\'s conceptual model before depending on it to prevent compounding architectural mistakes' },
    { id: 'M147', title: 'Knowledge Distribution as Reliability', maturity: 'observing', slug: 'knowledge-distribution-as-reliability', description: 'Treat concentrated knowledge as a system risk to actively address' },
    { id: 'M152', title: 'Test-Driven Agent Development', maturity: 'observing', slug: 'test-driven-agent-development', description: 'Apply red-green-refactor cycle to AI-assisted development' },
    { id: 'M159', title: 'Use Governed AI Coding Agents', maturity: 'observing', slug: 'use-governed-ai-coding-agents', description: 'Deploy AI coding tools through governed architectures with centralized policy, audit, and access controls' },
    { id: 'M160', title: 'Plan Mode First', maturity: 'observing', slug: 'plan-mode-first', description: 'Use dedicated planning mode with a stronger reasoning model before implementation' },
    { id: 'M161', title: 'Explicit MCP Version Control', maturity: 'observing', slug: 'explicit-mcp-version-control', description: 'Pin MCP server versions explicitly to prevent unknown changes to agent behavior' },
    { id: 'M162', title: 'Worktree-Based Agent Isolation', maturity: 'observing', slug: 'worktree-based-agent-isolation', description: 'Use git worktrees to isolate parallel agent sessions' },
    { id: 'M156', title: 'Agent-Mediated Access', maturity: 'observing', priority: 'supplemental', slug: 'agent-mediated-access', description: 'Enable non-developers to contribute via AI agent interfaces' },
    { id: 'M148', title: 'Persistent Planning State', maturity: 'observing', slug: 'persistent-planning-state', description: 'Maintain explicit planning state in markdown files to prevent context drift' },
    { id: 'M149', title: 'Root-Cause-First Debugging', maturity: 'hypothesized', slug: 'root-cause-first-debugging', description: 'Investigate root cause before applying fixes' },
    { id: 'M111', title: 'Deployment Frequency', maturity: 'hypothesized', slug: 'deployment-frequency', framework: 'dora', frameworkTitle: 'DORA', description: 'How often code is successfully deployed to production' },
    { id: 'M130', title: 'Lead Time for Changes', maturity: 'hypothesized', slug: 'lead-time-for-changes', framework: 'dora', frameworkTitle: 'DORA', description: 'Time from code commit to running in production' },
    { id: 'M127', title: 'Given-When-Then', maturity: 'hypothesized', slug: 'given-when-then', framework: 'bdd', frameworkTitle: 'BDD', description: 'A template for expressing acceptance criteria as structured scenarios' },
    { id: 'M126', title: 'Gherkin', maturity: 'hypothesized', slug: 'gherkin', framework: 'bdd', frameworkTitle: 'BDD', description: 'A domain-specific language for writing executable specifications' },
    { id: 'M124', title: 'Fast Flow', maturity: 'hypothesized', slug: 'fast-flow', framework: 'team-topologies', frameworkTitle: 'Team Topologies', description: 'Optimize for speed of work moving from idea to customer value' },
    { id: 'M118', title: 'Enabling Team', maturity: 'hypothesized', slug: 'enabling-team', framework: 'team-topologies', frameworkTitle: 'Team Topologies', description: 'Teams that help other teams overcome obstacles and build capabilities' },
    { id: 'M136', title: 'Team Cognitive Load', maturity: 'hypothesized', slug: 'team-cognitive-load', framework: 'team-topologies', frameworkTitle: 'Team Topologies', description: 'Use cognitive load as a constraint for what teams can own' },
    { id: 'M112', title: 'Deployment Pipeline', maturity: 'hypothesized', slug: 'deployment-pipeline', framework: 'continuous-delivery', frameworkTitle: 'Continuous Delivery', description: 'Automated process from commit to production with progressive validation' },
    { id: 'M140', title: 'Trunk-Based Development', maturity: 'hypothesized', slug: 'trunk-based-development', framework: 'continuous-delivery', frameworkTitle: 'Continuous Delivery', description: 'Collaborate on code in a single branch, avoiding long-lived feature branches' },
  ]}
/>

## What This Guide Covers

Agentic coding -- working with AI coding assistants -- changes how we write software. But not all approaches are equal. This guide collects methods that have been tested and refined through real observations.

### Agent Governance & Safety

Constrained autonomy patterns, version pinning, governed agent architectures, and practices for maintaining control over AI-assisted workflows.

### Feedback & Verification

Test-driven agent development, verification-before-completion, early feedback loops, and practices for building confidence in AI-generated code.

### Collaboration & Knowledge

Knowledge distribution, agent-mediated access, planning state management, and practices for effective human-agent collaboration.

## Getting Started

1. Browse the methods in the table above
2. Start with the **Essential** methods -- they form the foundation for safe, effective agentic coding
3. Review the supporting observations to understand the evidence
4. Try the methods that fit your context
5. Consider [contributing your own observations](../contributing-observations)
