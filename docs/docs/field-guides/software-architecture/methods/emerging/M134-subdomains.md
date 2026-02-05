---
methodId: M134
displayed_sidebar: fieldGuideSidebar
sidebar_position: 7
title: "Subdomains"
sidebar_label: "Subdomains"
description: "Categorizing domain areas by strategic importance"
external_method:
  framework: domain-driven-design
  method: subdomains
  id: M134
foe_maturity: hypothesized
observations: []
---

import ExternalMethodHeader from '@site/src/components/ExternalMethodHeader';

# Subdomains

<ExternalMethodHeader />

## Why This Matters for Software Architecture

Subdomains help you focus modeling effort where it matters most. Not all parts of a system deserve the same investment - knowing which is which prevents over-engineering and under-investing.

**Architecture Benefits:**
- Focuses deep modeling on competitive advantage
- Guides build vs buy decisions
- Informs technical debt priorities
- Aligns investment with business value

**FOE Alignment:**
- **Understanding** - Strategic classification clarifies priorities
- **Confidence** - Right investment in right places
- **Fast Feedback** - Core subdomains get best tooling

## Adaptations for Software Architecture

### Subdomain Classification

| Type | Description | Investment Level |
|------|-------------|-----------------|
| **Core** | Competitive advantage | High - custom, deep modeling |
| **Supporting** | Necessary but not differentiating | Medium - good enough |
| **Generic** | Common across industries | Low - buy or use open source |

### Example: E-Commerce Platform

```
Core Subdomain:
  └── Recommendation Engine (differentiator)
  
Supporting Subdomains:
  ├── Order Management
  ├── Inventory Tracking
  └── Customer Profiles

Generic Subdomains:
  ├── Authentication (use Auth0)
  ├── Payment Processing (use Stripe)
  └── Email Sending (use SendGrid)
```

### Architecture Decisions by Type

| Subdomain | Build/Buy | Architecture |
|-----------|-----------|--------------|
| Core | Always build | Rich domain model |
| Supporting | Build simple | CRUD-ish, pragmatic |
| Generic | Buy/integrate | API wrapper only |

## Questions We're Exploring

- How do subdomains evolve as business strategy changes?
- When does a supporting subdomain become core?
- How do you handle subdomain boundaries in a monolith?

## Supporting Evidence

