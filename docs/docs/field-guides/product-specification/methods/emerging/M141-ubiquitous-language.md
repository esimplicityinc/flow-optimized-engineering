---
methodId: M141
displayed_sidebar: fieldGuideSidebar
sidebar_position: 8
title: "Ubiquitous Language"
sidebar_label: "Ubiquitous Language"
description: "Shared vocabulary between product and engineering that eliminates translation"
external_method:
  framework: domain-driven-design
  method: ubiquitous-language
  id: M141
foe_maturity: hypothesized
observations:
  - O108
  - O115
  - O118
---

import ExternalMethodHeader from '@site/src/components/ExternalMethodHeader';
import RelatedObservations from '@site/src/components/RelatedObservations';

# Ubiquitous Language

<ExternalMethodHeader />

## Why This Matters for Product Specification

Ubiquitous Language eliminates the translation layer between how product describes the domain and how engineering implements it. When specifications use one set of terms and code uses another, every handoff introduces the risk of misunderstanding. A shared language used in specifications, code, tests, and conversations removes this risk entirely.

**Specification Clarity:**
- Terms have precise, agreed-upon definitions
- Specifications read naturally because they use domain language
- Ambiguous terms are identified and resolved explicitly

**Reduced Translation Errors:**
- Product says "order" and engineering implements "order" -- not "purchase" or "transaction"
- Business rules in specs map directly to code constructs
- New team members learn the domain by reading the code

## Adaptations for Product Specification

### Build a Living Glossary

Maintain a glossary of domain terms that specifications must use:

| Term | Definition | Not This |
|------|-----------|----------|
| Order | A customer's request to purchase items | Purchase, transaction, sale |
| Shipment | Physical delivery of order items | Delivery, package, fulfillment |
| SKU | Unique product variant identifier | Product, item, article |

### Enforce Language in Specifications

When writing acceptance criteria, use only glossary terms:

**Before (mixed language):**
> When the user buys something and the purchase is fulfilled...

**After (ubiquitous language):**
> When the customer places an order and the shipment is dispatched...

### Let Specifications Drive Language Discovery

Writing specifications surfaces language gaps:

1. If the team disagrees on a term, it needs definition
2. If a spec is hard to write, the domain model may be unclear
3. If the same concept has two names, the language needs alignment

## Questions We're Exploring

- How should the glossary be maintained as the domain evolves?
- Should AI coding agents be constrained to use ubiquitous language?
- What triggers a language refinement session vs. just updating the glossary?

## Supporting Evidence

<RelatedObservations />
