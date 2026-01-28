---
sidebar_position: 3
title: Context Mapping
pillar: strategic-design
description: Documenting and managing relationships between bounded contexts.
---

# Context Mapping

**Pillar:** Strategic Design

Context Mapping is the practice of documenting the relationships between bounded contexts. It makes explicit how different parts of a system interact and what kind of relationship exists between teams and their models.

## Definition

> A representation of the Bounded Contexts involved in a project and the actual relationships between them and their models.
>
> — Eric Evans, DDD Reference

## Why It Matters

Context Mapping is essential because:

- **Makes integration explicit** - No hidden dependencies between contexts
- **Guides team interactions** - Clarifies who depends on whom
- **Identifies risk** - Shows where model corruption might occur
- **Supports architecture decisions** - Informs microservices boundaries
- **Documents reality** - Captures how the system actually works, not how it should work

## Relationship Patterns

Context Maps use specific patterns to describe relationships:

| Pattern | Description | Power Dynamic |
|---------|-------------|---------------|
| **Partnership** | Two contexts succeed or fail together | Equal |
| **Shared Kernel** | Shared subset of the model | Equal |
| **Customer-Supplier** | Downstream has input to upstream priorities | Upstream leads |
| **Conformist** | Downstream adopts upstream model as-is | Upstream dominates |
| **Anti-Corruption Layer** | Downstream translates from upstream model | Downstream protects itself |
| **Open Host Service** | Upstream provides well-defined protocol | Upstream serves many |
| **Published Language** | Shared language for integration | Neutral |
| **Separate Ways** | No integration, contexts are independent | None |

## How to Create a Context Map

1. **Identify all bounded contexts** in the system
2. **Document integration points** between contexts
3. **Classify each relationship** using the patterns above
4. **Note the direction of dependency** - who calls whom?
5. **Identify team ownership** for each context
6. **Update as the system evolves**

## Example Context Map

```
┌─────────────────┐     Customer-Supplier     ┌─────────────────┐
│                 │ ─────────────────────────▶│                 │
│   Order Taking  │                           │   Fulfillment   │
│                 │◀───────────────────────── │                 │
└─────────────────┘     (Domain Events)       └─────────────────┘
        │                                              │
        │ Anti-Corruption Layer                        │ Conformist
        ▼                                              ▼
┌─────────────────┐                           ┌─────────────────┐
│  Legacy Billing │                           │  Shipping API   │
│    (External)   │                           │   (External)    │
└─────────────────┘                           └─────────────────┘
```

## When to Use Each Pattern

- **Partnership** - When two teams must coordinate closely and can commit to joint planning
- **Shared Kernel** - When overlap is small and both teams can agree on shared code
- **Customer-Supplier** - When downstream needs influence upstream priorities
- **Conformist** - When upstream won't change and translation cost exceeds benefit
- **Anti-Corruption Layer** - When you need to protect your model from external corruption
- **Open Host Service** - When serving multiple downstream consumers
- **Published Language** - When you need a stable, documented integration format

## FOE Alignment

Context Mapping supports **Optimize for Understanding** by making system architecture visible. When relationships between contexts are documented, teams can understand how their work affects others and where integration complexity lies. This visibility enables better architectural decisions and reduces unexpected coupling.
