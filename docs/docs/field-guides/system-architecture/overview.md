---
displayed_sidebar: fieldGuideSidebar
sidebar_position: 1
title: System Architecture
---

import GuideMaturitySummary from '@site/src/components/GuideMaturitySummary';
import MethodList from '@site/src/components/MethodList';
import MethodMaturityTable from '@site/src/components/MethodMaturityTable';

# System Architecture

A collection of flow-optimized methods for making structural decisions about distributed systems and service organization.

## Methods at a Glance

<MethodMaturityTable
  guideId="system-architecture"
  methods={[
    { id: 'M153', title: 'True Microservices', maturity: 'validated', slug: 'true-microservices', description: 'Design service architectures that enable independent team deployment' },
    { id: 'M145', title: 'Consumer Contract Testing', maturity: 'validated', slug: 'consumer-contract-testing', description: 'Validate service integration points through consumer-driven contracts' },
    { id: 'M151', title: 'System Over Individuals', maturity: 'observing', slug: 'system-over-individuals', description: 'Optimize the system before blaming the people' },
    { id: 'M150', title: 'Service Boundary Extraction', maturity: 'hypothesized', slug: 'service-boundary-extraction', description: 'Extract components with natural boundaries to dedicated containers' },
    { id: 'M115', title: 'Discovery Workshops', maturity: 'hypothesized', framework: 'bdd', frameworkTitle: 'BDD', description: 'Collaborative sessions to explore and understand domain requirements', href: '/docs/external-frameworks/bdd/methods/M115-discovery-workshops' },
    { id: 'M138', title: 'Three Amigos', maturity: 'hypothesized', framework: 'bdd', frameworkTitle: 'BDD', description: 'Cross-functional conversation between business, development, and testing', href: '/docs/external-frameworks/bdd/methods/M138-three-amigos' },
    { id: 'M120', title: 'Example Mapping', maturity: 'hypothesized', framework: 'bdd', frameworkTitle: 'BDD', description: 'Structured technique for breaking stories into rules and examples', href: '/docs/external-frameworks/bdd/methods/M120-example-mapping' },
    { id: 'M114', title: 'Discover Phase', maturity: 'hypothesized', framework: 'double-diamond', frameworkTitle: 'Double Diamond', description: 'Divergent exploration to understand the problem space', href: '/docs/external-frameworks/double-diamond/methods/M114-discover-phase' },
    { id: 'M109', title: 'Define Phase', maturity: 'hypothesized', framework: 'double-diamond', frameworkTitle: 'Double Diamond', description: 'Convergent synthesis to frame the right problem', href: '/docs/external-frameworks/double-diamond/methods/M109-define-phase' },
    { id: 'M113', title: 'Develop Phase', maturity: 'hypothesized', framework: 'double-diamond', frameworkTitle: 'Double Diamond', description: 'Divergent ideation to explore potential solutions', href: '/docs/external-frameworks/double-diamond/methods/M113-develop-phase' },
    { id: 'M110', title: 'Deliver Phase', maturity: 'hypothesized', framework: 'double-diamond', frameworkTitle: 'Double Diamond', description: 'Convergent refinement to ship a tested solution', href: '/docs/external-frameworks/double-diamond/methods/M110-deliver-phase' },
  ]}
/>

## What This Guide Covers

System architecture decisions shape how distributed systems evolve. Service boundaries, inter-service communication, deployment topology, and team ownership all determine how easily a system can be understood, changed, and operated independently. This guide collects methods for making these structural decisions in ways that optimize for flow.

Good system architecture isn't about following patterns—it's about making service boundaries explicit where they naturally exist, enabling independent deployment, and maintaining confidence through contract testing and graceful degradation.

## Methods

### Established Methods

Methods with strong supporting evidence (Validated or Proven):

- [True Microservices](./methods/established/M153-true-microservices) - Design service architectures that enable independent team deployment
- [Consumer Contract Testing](./methods/established/M145-consumer-contract-testing) - Validate service integration points through consumer-driven contracts

### Emerging Methods

Methods currently being tested (Hypothesized or Observing):

- [Service Boundary Extraction](./methods/emerging/M150-service-boundary-extraction) - Extract components with natural boundaries to dedicated containers
- [System Over Individuals](./methods/emerging/M151-system-over-individuals) - Optimize the system before blaming the people

### Related External Methods

This guide draws on methods from external frameworks. See the [External Frameworks](/docs/external-frameworks/overview) section for details:

- **BDD**: [Discovery Workshops](/docs/external-frameworks/bdd/methods/M115-discovery-workshops), [Three Amigos](/docs/external-frameworks/bdd/methods/M138-three-amigos), [Example Mapping](/docs/external-frameworks/bdd/methods/M120-example-mapping)
- **Double Diamond**: [Discover Phase](/docs/external-frameworks/double-diamond/methods/M114-discover-phase), [Define Phase](/docs/external-frameworks/double-diamond/methods/M109-define-phase), [Develop Phase](/docs/external-frameworks/double-diamond/methods/M113-develop-phase), [Deliver Phase](/docs/external-frameworks/double-diamond/methods/M110-deliver-phase)

## Getting Started

1. Browse the methods below
2. Check their maturity level to understand how well-tested they are
3. Review the supporting observations to understand the evidence
4. Try the methods that fit your context
5. Consider [contributing your own observations](../contributing-observations)
