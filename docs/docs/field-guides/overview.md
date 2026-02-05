---
displayed_sidebar: fieldGuideSidebar
sidebar_position: 1
title: Field Guides
---

# Field Guides

Field Guides are curated collections of **methods** - practical approaches to solving specific engineering challenges. Each method is backed by **observations** - documented evidence from real-world application.

## Available Guides

import Link from '@docusaurus/Link';

<div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem', marginBottom: '2rem'}}>
  <Link to="./agentic-coding/overview" style={{display: 'block', padding: '1.25rem', border: '2px solid var(--ifm-color-primary)', borderRadius: '0.5rem', textDecoration: 'none', color: 'inherit'}}>
    <strong style={{fontSize: '1.1rem', color: 'var(--ifm-color-primary)'}}>Agentic Coding</strong>
    <p style={{margin: '0.5rem 0 0 0', fontSize: '0.9rem', color: 'var(--ifm-color-emphasis-700)'}}>Flow-optimized practices for AI-assisted development</p>
  </Link>
  <Link to="./system-architecture/overview" style={{display: 'block', padding: '1.25rem', border: '2px solid var(--ifm-color-primary)', borderRadius: '0.5rem', textDecoration: 'none', color: 'inherit'}}>
    <strong style={{fontSize: '1.1rem', color: 'var(--ifm-color-primary)'}}>System Architecture</strong>
    <p style={{margin: '0.5rem 0 0 0', fontSize: '0.9rem', color: 'var(--ifm-color-emphasis-700)'}}>Flow-optimized methods for distributed systems and service organization</p>
  </Link>
  <Link to="./software-architecture/overview" style={{display: 'block', padding: '1.25rem', border: '2px solid var(--ifm-color-primary)', borderRadius: '0.5rem', textDecoration: 'none', color: 'inherit'}}>
    <strong style={{fontSize: '1.1rem', color: 'var(--ifm-color-primary)'}}>Software Architecture</strong>
    <p style={{margin: '0.5rem 0 0 0', fontSize: '0.9rem', color: 'var(--ifm-color-emphasis-700)'}}>Flow-optimized methods for internal code design and architecture decisions</p>
  </Link>
  <Link to="./testing/overview" style={{display: 'block', padding: '1.25rem', border: '2px solid var(--ifm-color-primary)', borderRadius: '0.5rem', textDecoration: 'none', color: 'inherit'}}>
    <strong style={{fontSize: '1.1rem', color: 'var(--ifm-color-primary)'}}>Testing</strong>
    <p style={{margin: '0.5rem 0 0 0', fontSize: '0.9rem', color: 'var(--ifm-color-emphasis-700)'}}>Flow-optimized methods for testing strategies and quality assurance</p>
  </Link>
  <Link to="./product-specification/overview" style={{display: 'block', padding: '1.25rem', border: '2px solid var(--ifm-color-primary)', borderRadius: '0.5rem', textDecoration: 'none', color: 'inherit'}}>
    <strong style={{fontSize: '1.1rem', color: 'var(--ifm-color-primary)'}}>Product Specification</strong>
    <p style={{margin: '0.5rem 0 0 0', fontSize: '0.9rem', color: 'var(--ifm-color-emphasis-700)'}}>Flow-optimized methods for requirements and product-engineering collaboration</p>
  </Link>
</div>

---

## How the System Works

Field Guides are powered by an **AI agent system** that helps you discover, document, and synthesize engineering knowledge.

import SystemDiagram from '@site/src/components/SystemDiagram';

<SystemDiagram />

**Click any node** to learn more. Use the toggle to switch between detailed and simplified views.

### The Flow

1. **Sources** feed into the system: your experiences, repository history, external frameworks, and community trends
2. **AI Agents** process these inputs: documenting observations, finding patterns, importing practices
3. **Outputs** are structured knowledge: observations provide evidence, methods provide guidance, field guides organize it all

### Content Structure

```
Field Guide
    └── Methods (practices you can adopt)
            └── Observations (evidence that supports the method)
```

**Methods** progress through maturity levels as they accumulate supporting evidence:

| Level | Meaning |
|-------|---------|
| **Hypothesized** | Proposed approach, not yet tested |
| **Observing** | Active observations underway |
| **Validated** | Supporting evidence exists |
| **Proven** | Multiple observations confirm effectiveness |

A guide's overall maturity is the average of its methods - giving you a quick sense of how battle-tested the guidance is.

---

## Learn More

<details>
<summary>About Field Guides</summary>

Depending on your role, you may want different levels of detail:

- **[For Leadership](./for-leadership)** - A simple overview of what Field Guides deliver
- **[Contributing Observations](./contributing-observations)** - How to document and share your observations
- **[Contributing to Implementation](./contributing-implementation)** - Technical guide for contributors

</details>
