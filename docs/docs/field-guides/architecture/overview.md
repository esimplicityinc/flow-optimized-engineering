---
sidebar_position: 1
title: Architecture
displayed_sidebar: fieldGuideSidebar
adopted_methods:
  - framework: bdd
    method: discovery-workshops
    foe_maturity: hypothesized
  - framework: bdd
    method: three-amigos
    foe_maturity: hypothesized
  - framework: bdd
    method: example-mapping
    foe_maturity: hypothesized
  - framework: double-diamond
    method: discover-phase
    foe_maturity: observing
  - framework: double-diamond
    method: define-phase
    foe_maturity: observing
  - framework: double-diamond
    method: develop-phase
    foe_maturity: observing
  - framework: double-diamond
    method: deliver-phase
    foe_maturity: observing
---

import GuideMaturitySummary from '@site/src/components/GuideMaturitySummary';
import MethodList from '@site/src/components/MethodList';

# Architecture

A collection of flow-optimized methods for making structural decisions about how systems are organized.

## What This Guide Covers

Architecture decisions shape how systems evolve. Service boundaries, dependency management, deployment topology, and component organization all determine how easily a system can be understood, changed, and operated. This guide collects methods for making these structural decisions in ways that optimize for flow.

Good architecture isn't about following patterns—it's about making boundaries explicit where they naturally exist, keeping feedback loops fast, and maintaining confidence through independent testability and deployment.

## Methods

### Established Methods

Methods with strong supporting evidence (Validated or Proven):

- [True Microservices](./methods/established/true-microservices) - Design service architectures that enable independent team deployment
- [Consumer Contract Testing](./methods/established/consumer-contract-testing) - Validate service integration points through consumer-driven contracts

### Emerging Methods

Methods currently being tested (Hypothesized or Observing):

- [Service Boundary Extraction](./methods/emerging/service-boundary-extraction) - Extract components with natural boundaries to dedicated containers
- [System Over Individuals](./methods/emerging/system-over-individuals) - Optimize the system before blaming the people

### Adopted Methods

External framework methods adopted for architectural decision-making:

<MethodList 
  guideId="architecture"
  methods={[]}
  adoptedMethods={[
    {
      framework: 'bdd',
      method: 'discovery-workshops',
      foe_maturity: 'hypothesized',
      title: 'Discovery Workshops',
      description: 'Collaborative conversations to explore and agree on desired system behavior through concrete examples',
      frameworkTitle: 'BDD',
    },
    {
      framework: 'bdd',
      method: 'three-amigos',
      foe_maturity: 'hypothesized',
      title: 'Three Amigos',
      description: 'Cross-functional meeting format where business, dev, and test perspectives collaborate on requirements',
      frameworkTitle: 'BDD',
    },
    {
      framework: 'bdd',
      method: 'example-mapping',
      foe_maturity: 'hypothesized',
      title: 'Example Mapping',
      description: 'A structured technique using colored cards to map user stories to rules, examples, and questions',
      frameworkTitle: 'BDD',
    },
    {
      framework: 'double-diamond',
      method: 'discover-phase',
      foe_maturity: 'observing',
      title: 'Discover Phase',
      description: 'Divergent exploration of the problem space through user research, observation, and empathy exercises',
      frameworkTitle: 'Double Diamond',
    },
    {
      framework: 'double-diamond',
      method: 'define-phase',
      foe_maturity: 'observing',
      title: 'Define Phase',
      description: 'Convergent synthesis of insights into a clear, evidence-based problem definition',
      frameworkTitle: 'Double Diamond',
    },
    {
      framework: 'double-diamond',
      method: 'develop-phase',
      foe_maturity: 'observing',
      title: 'Develop Phase',
      description: 'Divergent generation of multiple solutions through ideation, prototyping, and co-design',
      frameworkTitle: 'Double Diamond',
    },
    {
      framework: 'double-diamond',
      method: 'deliver-phase',
      foe_maturity: 'observing',
      title: 'Deliver Phase',
      description: 'Convergent validation through phased testing before full launch',
      frameworkTitle: 'Double Diamond',
    },
  ]}
/>

## Getting Started

1. Browse the methods below
2. Check their maturity level to understand how well-tested they are
3. Review the supporting observations to understand the evidence
4. Try the methods that fit your context
5. Consider [contributing your own observations](../contributing-observations)
