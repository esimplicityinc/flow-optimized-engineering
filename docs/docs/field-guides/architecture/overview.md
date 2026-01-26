---
sidebar_position: 1
title: Architecture
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

- *Coming soon*

### Emerging Methods

Methods currently being tested (Hypothesized or Experimenting):

- [Service Boundary Extraction](./methods/emerging/service-boundary-extraction) - Extract components with natural boundaries to dedicated containers

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
  ]}
/>

## Getting Started

1. Browse the methods below
2. Check their maturity level to understand how well-tested they are
3. Review the supporting experiments to understand the evidence
4. Try the methods that fit your context
5. Consider [contributing your own experiments](../contributing-experiments)
