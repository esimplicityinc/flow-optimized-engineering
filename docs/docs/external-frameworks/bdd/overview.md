---
displayed_sidebar: fieldGuideSidebar
sidebar_position: 1
title: Behavior-Driven Development
status: well-established
source:
  url: https://cucumber.io/docs/bdd/
  authors:
    - Dan North
    - Chris Matts
    - Liz Keogh
    - Aslak Hellesøy
  publication_year: 2006
  organization: BDD Community
version: "2024"
pillars:
  - discovery
  - formulation
  - automation
related_frameworks:
  - tdd
  - atdd
  - specification-by-example
description: A collaborative approach that bridges business and technical teams through concrete examples, executable specifications, and shared understanding.
---

# Behavior-Driven Development (BDD)

Behavior-Driven Development (BDD) is a collaborative approach that bridges business and technical teams through concrete examples, executable specifications, and shared understanding. Originally introduced by Dan North in 2006 as an evolution of Test-Driven Development (TDD), BDD shifts the focus from testing to specifying behavior through conversations and examples.

## Key Concepts

BDD emerged from the observation that the word "test" in TDD was causing confusion. Developers were uncertain about what to test, how much to test, and what to call their tests. By reframing tests as "behaviors" and focusing on examples of how the system should behave, BDD makes the development process more accessible to non-technical stakeholders.

The core insight of BDD is that **examples are the best way to communicate requirements**. Rather than abstract specifications, concrete examples of how the system should behave in specific situations create shared understanding between business and technical team members.

BDD follows a three-phase cycle: **Discovery** (exploring what to build through conversation), **Formulation** (documenting examples in a structured format), and **Automation** (implementing tests that verify the documented behavior).

## The Three Pillars

### Discovery

Discovery is about having the right conversations at the right time. Through structured workshops and collaborative sessions, teams explore what the system should do using concrete examples. This phase surfaces misunderstandings early, before code is written.

**Methods:** Discovery Workshops, Three Amigos, Example Mapping, User Story Template

### Formulation

Formulation transforms the examples discovered in conversations into a structured, readable format. Using the Given-When-Then template and Gherkin language, teams create documentation that serves as both specification and test.

**Methods:** Given-When-Then, Gherkin

### Automation

Automation connects the formulated examples to the actual system. By implementing step definitions that execute against the code, the specifications become living documentation that stays in sync with the system's actual behavior.

**Methods:** Executable Specifications

## Methods

import FrameworkMethodList from '@site/src/components/FrameworkMethodList';

<FrameworkMethodList framework="bdd" />

## FOE Alignment

BDD aligns strongly with Flow Optimized Engineering principles:

- **Optimize for Understanding** - BDD's core purpose is creating shared understanding through concrete examples. Discovery workshops, Three Amigos, and Example Mapping all focus on building shared mental models before code is written.

- **Fast Feedback Loops** - Discovery sessions surface misunderstandings in minutes rather than days. Executable specifications provide immediate feedback on whether the system behaves as expected.

- **Build Confidence** - Living documentation that stays in sync with code builds confidence that the system does what it's supposed to do. The Given-When-Then format makes it easy to verify expected behavior.

## Further Reading

- [Cucumber BDD Documentation](https://cucumber.io/docs/bdd/) - Official BDD guide
- [Introducing BDD](https://dannorth.net/introducing-bdd/) - Dan North's original article (2006)
- [BDD in Action](https://www.manning.com/books/bdd-in-action-second-edition) - John Ferguson Smart, Manning Publications
- [The Cucumber Book](https://pragprog.com/titles/hwcuc2/the-cucumber-book-second-edition/) - Matt Wynne & Aslak Hellesøy, Pragmatic Bookshelf
- [Discovery: Explore Behaviour Using Examples](https://leanpub.com/bddbooks-discovery) - Gaspar Nagy & Seb Rose
