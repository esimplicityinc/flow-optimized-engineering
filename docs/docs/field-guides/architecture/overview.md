---
displayed_sidebar: fieldGuideSidebar
sidebar_position: 1
title: Architecture
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
