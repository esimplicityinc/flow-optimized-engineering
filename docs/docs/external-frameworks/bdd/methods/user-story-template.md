---
displayed_sidebar: fieldGuideSidebar
sidebar_position: 7
title: User Story Template
pillar: discovery
description: 'A template for expressing requirements as "As a [role], I want [feature], so that [benefit]" emphasizing business value.'
---

# User Story Template

**Pillar:** Discovery

The User Story Template is a structured format for expressing requirements from the user's perspective. While originating from Extreme Programming (XP) through Rachel Davies at Connextra, it has been widely adopted in BDD as the starting point for discovery conversations.

## Definition

> A template for expressing a requirement in the form "As a [role], I want [feature], so that [benefit]" that emphasizes who needs the feature, what they need, and why they need it.

## Why It Matters

The User Story Template provides:

- **User focus** - Centers requirements on who benefits
- **Value clarity** - The "so that" clause forces articulation of business value
- **Conversation starter** - Stories are placeholders for conversations, not complete specs
- **Right-sized chunks** - Encourages breaking work into user-valuable increments

## The Template

```
As a [role/persona]
I want [feature/capability]
So that [benefit/value]
```

### Role (Who)

The user or stakeholder who will benefit from this feature.

**Good examples:**
- As a **first-time visitor**
- As a **premium subscriber**
- As a **warehouse manager**
- As a **system administrator**

**Avoid:**
- As a **user** (too generic)
- As a **the system** (not a user)
- As a **developer** (unless building developer tools)

### Feature (What)

The capability or functionality the user needs.

**Good examples:**
- I want to **filter search results by price**
- I want to **export my data as CSV**
- I want to **receive notifications when inventory is low**

**Avoid:**
- I want **the database to be faster** (implementation detail)
- I want **a button** (UI element, not capability)

### Benefit (Why)

The value or outcome the user gains from this feature.

**Good examples:**
- So that **I can find products within my budget**
- So that **I can analyze data in my preferred tools**
- So that **I can reorder before stockouts occur**

**Avoid:**
- So that **I can use the feature** (circular)
- So that **the system is better** (vague)

## Examples

### E-commerce

```
As a returning customer
I want to save items to a wishlist
So that I can purchase them later when I'm ready
```

### SaaS Application

```
As a team administrator
I want to set role-based permissions
So that I can control what team members can access
```

### Internal Tool

```
As a support agent
I want to see a customer's order history
So that I can quickly resolve their inquiries
```

## The Story is Not the Requirement

A critical BDD insight: **the story is a placeholder for a conversation, not a complete specification**.

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│   User Story (Card)                                     │
│        ↓                                                │
│   Conversation (Discovery Workshop, Three Amigos)       │
│        ↓                                                │
│   Confirmation (Examples, Acceptance Criteria)          │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

The story invites the conversation; the examples (in Given-When-Then format) capture what was learned.

## Acceptance Criteria vs. User Stories

User stories describe **what** and **why**. Acceptance criteria describe **how we'll know it's done**.

**Story:**
```
As a customer
I want to apply discount codes
So that I can save money on my purchases
```

**Acceptance Criteria (discovered through conversation):**
```gherkin
Scenario: Valid discount code
  Given a 20% discount code "SAVE20"
  When I apply "SAVE20" to my $100 order
  Then my total becomes $80

Scenario: Expired discount code
  Given an expired code "OLD10"
  When I apply "OLD10"
  Then I see "This code has expired"
  And my total is unchanged
```

## INVEST Criteria

Good user stories follow the INVEST criteria:

| Criterion | Description | Example Check |
|-----------|-------------|---------------|
| **I**ndependent | Can be developed in any order | No dependencies on other stories |
| **N**egotiable | Details can be discussed | Not a contract, a conversation starter |
| **V**aluable | Delivers value to users | Clear "so that" benefit |
| **E**stimable | Team can estimate effort | Understood well enough to size |
| **S**mall | Fits in a sprint | Can be completed in days, not weeks |
| **T**estable | Can verify completion | Clear acceptance criteria |

## Common Anti-Patterns

| Anti-Pattern | Problem | Better Approach |
|--------------|---------|-----------------|
| Technical stories | "As a developer, I want to refactor..." | Frame as user benefit or use different format |
| Missing "so that" | No clear value articulated | Always include the benefit |
| Epic disguised as story | Too large to complete in a sprint | Split into smaller stories |
| Solution in the story | "I want a dropdown menu..." | Focus on capability, not implementation |

## Relationship to Other Methods

- **Discovery Workshops** - Stories are the input; examples are the output
- **Three Amigos** - Stories are explored by the three perspectives
- **Example Mapping** - Story goes on the yellow card
- **Given-When-Then** - Examples discovered from stories use this format

## FOE Alignment

The User Story Template supports the FOE principle of **Optimize for Understanding**:

- Forces articulation of who benefits and why
- Creates shared vocabulary around user needs
- Serves as a conversation starter, not a specification endpoint

## References

- Cohn, M. (2004). "User Stories Applied." Addison-Wesley.
- Wake, B. (2003). "INVEST in Good Stories." https://xp123.com/articles/invest-in-good-stories-and-smart-tasks/
- Connextra. Original user story template format.
- North, D. (2006). "Introducing BDD." https://dannorth.net/introducing-bdd/
