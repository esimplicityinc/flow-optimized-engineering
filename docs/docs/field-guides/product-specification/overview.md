---
displayed_sidebar: fieldGuideSidebar
sidebar_position: 1
title: Product Specification
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
  - framework: bdd
    method: user-story-template
    foe_maturity: hypothesized
  - framework: bdd
    method: given-when-then
    foe_maturity: hypothesized
  - framework: bdd
    method: gherkin
    foe_maturity: hypothesized
  - framework: bdd
    method: executable-specifications
    foe_maturity: hypothesized
  - framework: domain-driven-design
    method: ubiquitous-language
    foe_maturity: hypothesized
  - framework: domain-driven-design
    method: bounded-context
    foe_maturity: hypothesized
  - framework: double-diamond
    method: discover-phase
    foe_maturity: hypothesized
  - framework: double-diamond
    method: define-phase
    foe_maturity: hypothesized
  - framework: double-diamond
    method: develop-phase
    foe_maturity: hypothesized
  - framework: double-diamond
    method: deliver-phase
    foe_maturity: hypothesized
---

import GuideMaturitySummary from '@site/src/components/GuideMaturitySummary';
import MethodList from '@site/src/components/MethodList';
import MethodMaturityTable from '@site/src/components/MethodMaturityTable';

# Product Specification

A collection of flow-optimized methods for requirements gathering, specification writing, and product-engineering collaboration.

<GuideMaturitySummary
  guideId="product-specification"
  methods={[
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
    { maturity: 'hypothesized' },
    { maturity: 'hypothesized' },
    { maturity: 'hypothesized' },
  ]}
/>

## Methods at a Glance

<MethodMaturityTable
  guideId="product-specification"
  methods={[
    { id: 'M115', title: 'Discovery Workshops', maturity: 'hypothesized', slug: 'discovery-workshops', framework: 'bdd', frameworkTitle: 'BDD', description: 'Collaborative sessions to explore requirements through concrete examples' },
    { id: 'M138', title: 'Three Amigos', maturity: 'hypothesized', slug: 'three-amigos', framework: 'bdd', frameworkTitle: 'BDD', description: 'Cross-functional conversations to define acceptance criteria' },
    { id: 'M120', title: 'Example Mapping', maturity: 'hypothesized', slug: 'example-mapping', framework: 'bdd', frameworkTitle: 'BDD', description: 'Structured decomposition of stories into rules, examples, and questions' },
    { id: 'M142', title: 'User Story Template', maturity: 'hypothesized', slug: 'user-story-template', framework: 'bdd', frameworkTitle: 'BDD', description: 'Expressing requirements as role-feature-benefit statements' },
    { id: 'M127', title: 'Given-When-Then', maturity: 'hypothesized', slug: 'given-when-then', framework: 'bdd', frameworkTitle: 'BDD', description: 'Structured template for expressing testable acceptance criteria' },
    { id: 'M126', title: 'Gherkin', maturity: 'hypothesized', slug: 'gherkin', framework: 'bdd', frameworkTitle: 'BDD', description: 'Domain-specific language for writing executable specifications' },
    { id: 'M121', title: 'Executable Specifications', maturity: 'hypothesized', slug: 'executable-specifications', framework: 'bdd', frameworkTitle: 'BDD', description: 'Automated tests that serve as living documentation of product intent' },
    { id: 'M141', title: 'Ubiquitous Language', maturity: 'hypothesized', slug: 'ubiquitous-language', framework: 'domain-driven-design', frameworkTitle: 'DDD', description: 'Shared vocabulary between product and engineering that eliminates translation' },
    { id: 'M103', title: 'Bounded Context', maturity: 'hypothesized', slug: 'bounded-context', framework: 'domain-driven-design', frameworkTitle: 'DDD', description: 'Scoping specifications to clear domain boundaries' },
    { id: 'M114', title: 'Discover Phase', maturity: 'hypothesized', slug: 'discover-phase', framework: 'double-diamond', frameworkTitle: 'Double Diamond', description: 'Divergent exploration to understand the problem space before specifying' },
    { id: 'M109', title: 'Define Phase', maturity: 'hypothesized', slug: 'define-phase', framework: 'double-diamond', frameworkTitle: 'Double Diamond', description: 'Convergent synthesis to frame the right problem before specifying solutions' },
    { id: 'M113', title: 'Develop Phase', maturity: 'hypothesized', slug: 'develop-phase', framework: 'double-diamond', frameworkTitle: 'Double Diamond', description: 'Divergent ideation and prototyping to explore potential solutions' },
    { id: 'M110', title: 'Deliver Phase', maturity: 'hypothesized', slug: 'deliver-phase', framework: 'double-diamond', frameworkTitle: 'Double Diamond', description: 'Convergent validation through testing before release' },
  ]}
/>

## What This Guide Covers

Product specification bridges what users need with what engineers build. Requirements gathering, user story writing, acceptance criteria, and validation practices all determine how clearly intent is communicated and how confidently teams can deliver. This guide collects methods for creating specifications that optimize for flow.

Good specification isn't about comprehensive documentation -- it's about shared understanding through clear examples, testable criteria, and continuous collaboration that reduces rework and accelerates delivery.

### Requirements & User Stories

Requirements gathering techniques, user story writing, story mapping, and practices for capturing user needs in ways that enable incremental delivery.

### Acceptance Criteria

Given-When-Then format, definition of done, testable criteria, and practices for making requirements verifiable and unambiguous.

### Prototyping & Validation

Rapid prototyping, user validation, spec iteration, and practices for validating assumptions before committing to full implementation.

### Product-Engineering Workflow

Collaboration patterns, handoff processes, feedback loops, and practices for maintaining shared understanding throughout the development lifecycle.

## The Specification Workflow

These methods form a natural workflow from problem discovery through validated delivery:

### 1. Understand the Problem (Double Diamond)

Use the **Discover Phase** and **Define Phase** to understand and frame the problem before writing specifications. This prevents the most expensive mistake: specifying the wrong thing.

### 2. Explore Requirements (BDD Discovery)

Use **Discovery Workshops**, **Three Amigos**, and **Example Mapping** to collaboratively explore what the software should do. Use **User Story Templates** to capture requirements with clear user value.

### 3. Formalize Acceptance Criteria (BDD Formulation)

Use **Given-When-Then** and **Gherkin** to turn examples into precise, testable acceptance criteria. Use **Ubiquitous Language** to ensure specifications use the same terms as the code.

### 4. Validate Through Delivery (BDD Automation + Double Diamond)

Use **Executable Specifications** to automate verification. Use the **Develop Phase** and **Deliver Phase** to prototype, validate, and ship with confidence. Scope specifications to **Bounded Contexts** for clarity.

## Getting Started

1. Browse the methods in the table above
2. Start with Discovery Workshops and Three Amigos to improve requirements quality
3. Add Given-When-Then acceptance criteria to your stories
4. Review the supporting observations to understand the evidence
5. Consider [contributing your own observations](../contributing-observations)
