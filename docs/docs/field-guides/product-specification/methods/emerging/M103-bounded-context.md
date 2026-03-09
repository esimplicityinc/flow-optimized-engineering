---
methodId: M103
displayed_sidebar: fieldGuideSidebar
sidebar_position: 9
title: "Bounded Context"
sidebar_label: "Bounded Context"
description: "Scoping specifications to clear domain boundaries"
external_method:
  framework: domain-driven-design
  method: bounded-context
  id: M103
foe_maturity: hypothesized
observations:
  - O108
  - O115
  - O118
  - O121
---

import ExternalMethodHeader from '@site/src/components/ExternalMethodHeader';
import RelatedObservations from '@site/src/components/RelatedObservations';

# Bounded Context

<ExternalMethodHeader />

## Why This Matters for Product Specification

Bounded Contexts define where a particular domain model applies -- and where it doesn't. For product specification, this means understanding that the same word can mean different things in different parts of the system, and that specifications need to be scoped to a specific context to be precise.

**Specification Scoping:**
- A "customer" in billing is different from a "customer" in shipping
- Specifications that cross context boundaries need explicit translation
- Feature scope becomes clearer when context boundaries are defined

**Team Alignment:**
- Each team owns specifications within their bounded context
- Cross-context features require explicit collaboration
- Dependencies between contexts are visible in the specification model

## Adaptations for Product Specification

### Map Features to Contexts

Before writing detailed specifications, identify which bounded context a feature belongs to:

```
Feature: Subscription Renewal
Context: Billing

Feature: Delivery Scheduling
Context: Fulfillment

Feature: Product Recommendations
Context: Catalog
```

### Handle Cross-Context Features Explicitly

When a feature spans contexts, specifications should call out the boundaries:

```gherkin
Feature: Order Completion
  This feature spans the Order and Fulfillment contexts.
  
  # Order Context
  Scenario: Order is marked complete
    Given an order with all items shipped
    When the last shipment is delivered
    Then the order status changes to "Complete"
  
  # Fulfillment Context  
  Scenario: Shipment triggers order update
    Given a shipment for order #123 is delivered
    When the delivery is confirmed
    Then a "ShipmentDelivered" event is published
```

### Use Context Boundaries to Split Stories

If a story touches multiple bounded contexts, it often should be split:

- One story per context, with explicit integration points
- Each story can be specified and developed independently
- Integration is a separate, explicit specification concern

## Questions We're Exploring

- How should product teams discover context boundaries?
- When should context boundaries influence product roadmap structure?
- How do bounded contexts map to team ownership in specification workflows?

## Supporting Evidence

<RelatedObservations />
