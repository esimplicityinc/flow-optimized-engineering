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
  - framework: bdd
    method: given-when-then
    foe_maturity: hypothesized
  - framework: bdd
    method: executable-specifications
    foe_maturity: hypothesized
  - framework: bdd
    method: gherkin
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
    method: deployment-pipeline
    foe_maturity: hypothesized
  - framework: continuous-delivery
    method: trunk-based-development
    foe_maturity: hypothesized
---

import GuideMaturitySummary from '@site/src/components/GuideMaturitySummary';
import MethodList from '@site/src/components/MethodList';

# Agentic Coding

A collection of flow-optimized methods for AI-assisted software development.

<GuideMaturitySummary 
  guideId="agentic-coding" 
  methods={[
    { maturity: 'proven' },
    { maturity: 'observing' },
    { maturity: 'hypothesized' },
  ]} 
/>

## What This Guide Covers

Agentic coding - working with AI coding assistants - changes how we write software. But not all approaches are equal. This guide collects methods that have been tested and refined through real observations.

## Methods

<MethodList 
  guideId="agentic-coding"
  methods={[
    { 
      id: 'M154',
      slug: 'understanding-first-protocol-adoption', 
      title: 'Understanding-First Protocol Adoption', 
      maturity: 'observing',
      description: 'Invest in protocol model understanding before making architectural decisions',
    },
    { 
      id: 'M146',
      slug: 'early-feedback-loop-investment', 
      title: 'Early Feedback Loop Investment', 
      maturity: 'observing',
      description: 'Build test/CI infrastructure as foundation, not overhead',
    },
    { 
      id: 'M147',
      slug: 'knowledge-distribution-as-reliability', 
      title: 'Knowledge Distribution as Reliability', 
      maturity: 'observing',
      description: 'Treat concentrated knowledge as a system risk to actively address',
    },
    { 
      id: 'M155',
      slug: 'verification-before-completion', 
      title: 'Verification Before Completion', 
      maturity: 'hypothesized',
      description: 'Never claim work is complete without running verification commands',
    },
    { 
      id: 'M152',
      slug: 'test-driven-agent-development', 
      title: 'Test-Driven Agent Development', 
      maturity: 'hypothesized',
      description: 'Apply red-green-refactor cycle to AI-assisted development',
    },
    { 
      id: 'M148',
      slug: 'persistent-planning-state', 
      title: 'Persistent Planning State', 
      maturity: 'hypothesized',
      description: 'Maintain explicit planning state in markdown files to prevent context drift',
    },
    { 
      id: 'M149',
      slug: 'root-cause-first-debugging', 
      title: 'Root-Cause-First Debugging', 
      maturity: 'hypothesized',
      description: 'Investigate root cause before applying fixes',
    },
    { 
      id: 'M159',
      slug: 'use-governed-ai-coding-agents', 
      title: 'Use Governed AI Coding Agents', 
      maturity: 'observing',
      description: 'Deploy AI coding tools through governed architectures with centralized policy, audit, and access controls',
    },
    { 
      id: 'M160',
      slug: 'plan-mode-first', 
      title: 'Plan Mode First', 
      maturity: 'observing',
      description: 'Use dedicated planning mode with a stronger reasoning model before implementation',
    },
    { 
      id: 'M161',
      slug: 'explicit-mcp-version-control', 
      title: 'Explicit MCP Version Control', 
      maturity: 'hypothesized',
      description: 'Pin MCP server versions explicitly to prevent unknown changes to agent behavior',
    },
  ]}
  externalMethods={[
    {
      id: 'M111',
      framework: 'dora',
      method: 'deployment-frequency',
      foe_maturity: 'hypothesized',
      title: 'Deployment Frequency',
      description: 'How often code is successfully deployed to production',
      frameworkTitle: 'DORA',
    },
    {
      id: 'M130',
      framework: 'dora',
      method: 'lead-time-for-changes',
      foe_maturity: 'hypothesized',
      title: 'Lead Time for Changes',
      description: 'Time from code commit to running in production',
      frameworkTitle: 'DORA',
    },
    {
      id: 'M127',
      framework: 'bdd',
      method: 'given-when-then',
      foe_maturity: 'hypothesized',
      title: 'Given-When-Then',
      description: 'A template for expressing acceptance criteria as structured scenarios',
      frameworkTitle: 'BDD',
    },
    {
      id: 'M121',
      framework: 'bdd',
      method: 'executable-specifications',
      foe_maturity: 'proven',
      title: 'Executable Specifications',
      description: 'Automated tests that serve as living documentation',
      frameworkTitle: 'BDD',
    },
    {
      id: 'M126',
      framework: 'bdd',
      method: 'gherkin',
      foe_maturity: 'hypothesized',
      title: 'Gherkin',
      description: 'A domain-specific language for writing executable specifications',
      frameworkTitle: 'BDD',
    },
    {
      id: 'M124',
      framework: 'team-topologies',
      method: 'fast-flow',
      foe_maturity: 'hypothesized',
      title: 'Fast Flow',
      description: 'Optimize for speed of work moving from idea to customer value',
      frameworkTitle: 'Team Topologies',
    },
    {
      id: 'M118',
      framework: 'team-topologies',
      method: 'enabling-team',
      foe_maturity: 'hypothesized',
      title: 'Enabling Team',
      description: 'Teams that help other teams overcome obstacles and build capabilities',
      frameworkTitle: 'Team Topologies',
    },
    {
      id: 'M136',
      framework: 'team-topologies',
      method: 'team-cognitive-load',
      foe_maturity: 'hypothesized',
      title: 'Team Cognitive Load',
      description: 'Use cognitive load as a constraint for what teams can own',
      frameworkTitle: 'Team Topologies',
    },
    {
      id: 'M112',
      framework: 'continuous-delivery',
      method: 'deployment-pipeline',
      foe_maturity: 'hypothesized',
      title: 'Deployment Pipeline',
      description: 'Automated process from commit to production with progressive validation',
      frameworkTitle: 'Continuous Delivery',
    },
    {
      id: 'M140',
      framework: 'continuous-delivery',
      method: 'trunk-based-development',
      foe_maturity: 'hypothesized',
      title: 'Trunk-Based Development',
      description: 'Collaborate on code in a single branch, avoiding long-lived feature branches',
      frameworkTitle: 'Continuous Delivery',
    },
  ]}
/>

## Getting Started

1. Browse the methods above
2. Check their maturity level to understand how well-tested they are
3. Review the supporting observations to understand the evidence
4. Try the methods that fit your context
5. Consider [contributing your own observations](../contributing-observations)
