---
methodId: M111
displayed_sidebar: fieldGuideSidebar
sidebar_position: 1
title: "Deployment Frequency"
sidebar_label: "Deployment Frequency"
description: "How deployment frequency applies to AI-assisted development workflows"
external_method:
  framework: dora
  method: deployment-frequency
  id: M111
foe_maturity: hypothesized
observations:
  - O109
  - O110
---

import ExternalMethodHeader from '@site/src/components/ExternalMethodHeader';

# Deployment Frequency

<ExternalMethodHeader />

## Why This Matters for Agentic Coding

Deployment frequency takes on special significance when working with AI coding assistants. The combination of faster code generation and the need for rapid verification creates both opportunities and risks:

**Opportunities:**
- AI can help generate deployment configurations, CI/CD scripts, and infrastructure code quickly
- Faster implementation cycles mean more potential deployments per day
- AI can help automate pre-deployment checks and validations

**Risks:**
- Higher code velocity without corresponding deployment frequency creates inventory (undeployed code)
- AI-generated code that sits undeployed loses the fast feedback that catches AI mistakes
- Teams may over-focus on code generation speed while neglecting deployment pipeline investment

## Adaptations for Agentic Coding

### Measure AI-Assisted vs Manual Deployments

Consider tracking:
- Deployments containing AI-generated code
- Time from AI code generation to production deployment
- Deployment success rate for AI-assisted vs manual changes

### Tighter Integration with Verification

In agentic coding, deployment frequency should be paired with:
- **Automated verification** - Every deployment triggers automated checks
- **Fast rollback capability** - AI-generated code may have subtle issues that only appear in production
- **Observability investment** - More deployments means more need for production monitoring

### Small Batches Are Even More Critical

When AI generates code quickly, the temptation is to batch up changes. Resist this:
- Deploy AI-generated changes individually when possible
- Each deployment becomes a verification point for AI output quality
- Smaller batches mean faster identification of which AI-generated code caused issues

## Questions We're Exploring

- Does AI-assisted development naturally lead to higher deployment frequency?
- What deployment frequency is sustainable when AI is generating significant code volume?
- How should we adjust deployment practices when AI is handling more of the implementation?

## Supporting Evidence

