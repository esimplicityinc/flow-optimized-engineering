---
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
---

import GuideMaturitySummary from '@site/src/components/GuideMaturitySummary';
import MethodList from '@site/src/components/MethodList';

# Agentic Coding

A collection of flow-optimized methods for AI-assisted software development.

<GuideMaturitySummary 
  guideId="agentic-coding" 
  methods={[
    { maturity: 'proven' },
    { maturity: 'experimenting' },
  ]} 
/>

## What This Guide Covers

Agentic coding - working with AI coding assistants - changes how we write software. But not all approaches are equal. This guide collects methods that have been tested and refined through real experiments.

## Methods

<MethodList 
  guideId="agentic-coding"
  methods={[
    { 
      slug: 'understanding-first-protocol-adoption', 
      title: 'Understanding-First Protocol Adoption', 
      maturity: 'experimenting',
      description: 'Invest in protocol model understanding before making architectural decisions',
    },
    { 
      slug: 'early-feedback-loop-investment', 
      title: 'Early Feedback Loop Investment', 
      maturity: 'experimenting',
      description: 'Build test/CI infrastructure as foundation, not overhead',
    },
    { 
      slug: 'knowledge-distribution-as-reliability', 
      title: 'Knowledge Distribution as Reliability', 
      maturity: 'experimenting',
      description: 'Treat concentrated knowledge as a system risk to actively address',
    },
  ]}
  adoptedMethods={[
    {
      framework: 'dora',
      method: 'deployment-frequency',
      foe_maturity: 'hypothesized',
      title: 'Deployment Frequency',
      description: 'How often code is successfully deployed to production',
      frameworkTitle: 'DORA',
    },
    {
      framework: 'dora',
      method: 'lead-time-for-changes',
      foe_maturity: 'hypothesized',
      title: 'Lead Time for Changes',
      description: 'Time from code commit to running in production',
      frameworkTitle: 'DORA',
    },
    {
      framework: 'bdd',
      method: 'given-when-then',
      foe_maturity: 'hypothesized',
      title: 'Given-When-Then',
      description: 'A template for expressing acceptance criteria as structured scenarios',
      frameworkTitle: 'BDD',
    },
    {
      framework: 'bdd',
      method: 'executable-specifications',
      foe_maturity: 'hypothesized',
      title: 'Executable Specifications',
      description: 'Automated tests that serve as living documentation',
      frameworkTitle: 'BDD',
    },
    {
      framework: 'bdd',
      method: 'gherkin',
      foe_maturity: 'hypothesized',
      title: 'Gherkin',
      description: 'A domain-specific language for writing executable specifications',
      frameworkTitle: 'BDD',
    },
  ]}
/>

## Getting Started

1. Browse the methods above
2. Check their maturity level to understand how well-tested they are
3. Review the supporting experiments to understand the evidence
4. Try the methods that fit your context
5. Consider [contributing your own experiments](../contributing-experiments)
