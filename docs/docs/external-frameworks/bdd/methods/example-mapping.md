---
sidebar_position: 3
title: Example Mapping
pillar: discovery
description: A structured technique using colored index cards to map user stories to rules, examples, and questions.
---

# Example Mapping

**Pillar:** Discovery

Example Mapping is a structured discovery technique created by Matt Wynne that uses colored index cards to visually organize a user story into rules, examples, and questions. It provides a fast, focused way to explore requirements and identify gaps in understanding.

## Definition

> A collaborative technique that uses four colors of index cards to decompose a user story into its acceptance rules, concrete examples, and open questions in a structured, visual format.

## Why It Matters

Example Mapping provides:

- **Visual structure** - See the shape of a story at a glance
- **Fast feedback** - A 25-minute session reveals if a story is ready
- **Clear signals** - Too many cards of one color indicates problems
- **Actionable output** - Cards translate directly to Gherkin scenarios

## The Four Colors

### Yellow - Story

The user story being explored. One yellow card per session, placed at the top.

**Example:** "As a shopper, I want to filter products by price range so I can find items in my budget."

### Blue - Rules

Business rules or acceptance criteria that govern the story's behavior. Each rule gets its own blue card, placed in a row below the story.

**Examples:**
- "Price filter has min and max values"
- "Products outside range are hidden, not removed"
- "Filter persists across page navigation"

### Green - Examples

Concrete examples that illustrate a rule. Green cards are placed below their corresponding blue rule card.

**Examples (for "Price filter has min and max values"):**
- "Filter $10-$50 shows $25 item"
- "Filter $10-$50 hides $5 item"
- "Filter $10-$50 hides $100 item"
- "Filter $10-$10 shows only $10 items"

### Red - Questions

Anything that can't be answered in the session. Red cards are placed to the side and must be resolved before development.

**Examples:**
- "What happens with items on sale?"
- "Do we include or exclude boundary values?"
- "How do we handle items with no price?"

## How to Run an Example Mapping Session

### Setup (2 minutes)

1. Gather colored index cards (or digital equivalent)
2. Write the story on a yellow card
3. Place it at the top of the workspace

### Mapping (20 minutes)

1. **Identify rules** - What are the acceptance criteria? (Blue cards)
2. **Generate examples** - For each rule, what are concrete scenarios? (Green cards)
3. **Capture questions** - What can't we answer? (Red cards)
4. **Refine rules** - Split or merge as patterns emerge

### Evaluate (3 minutes)

Look at the card distribution:

| Pattern | Signal | Action |
|---------|--------|--------|
| Few blue, few green | Well-understood, simple story | Ready for development |
| Many blue cards | Story may be too big | Consider splitting |
| Many red cards | Too many unknowns | Research before development |
| Blue with no green | Rule not understood | Generate examples or question it |
| Many green under one blue | Complex rule | Consider splitting the rule |

## Visual Layout

```
┌─────────────────────────────────────────────────────────┐
│  [YELLOW] User Story                                    │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  [BLUE] Rule 1    [BLUE] Rule 2    [BLUE] Rule 3       │
│       │                │                │               │
│  [GREEN]          [GREEN]          [GREEN]              │
│  [GREEN]          [GREEN]                               │
│  [GREEN]                                                │
│                                                         │
│                              [RED] Question 1           │
│                              [RED] Question 2           │
└─────────────────────────────────────────────────────────┘
```

## Best Practices

- **Time-box strictly** - 25 minutes maximum
- **Start with rules** - They provide structure for examples
- **Be concrete** - Use real values, not placeholders
- **Embrace red cards** - Questions are valuable discoveries
- **Photograph the result** - Capture the visual for reference

## From Cards to Gherkin

Each green example card becomes a scenario:

**Card:** "Filter $10-$50 shows $25 item"

**Gherkin:**
```gherkin
Scenario: Item within price range is shown
  Given a product priced at $25
  And the price filter is set to $10-$50
  When I view the filtered results
  Then the $25 product is displayed
```

## FOE Alignment

Example Mapping strongly supports FOE principles:

- **Optimize for Understanding** - Visual structure makes complexity visible
- **Fast Feedback Loops** - 25-minute sessions quickly reveal story readiness
- **Build Confidence** - Clear rules and examples reduce ambiguity

## References

- Wynne, M. (2015). "Introducing Example Mapping." Cucumber Blog. https://cucumber.io/blog/bdd/example-mapping-introduction/
- Nagy, G. & Rose, S. "Discovery: Explore Behaviour Using Examples." Leanpub.
- Wynne, M. & Hellesøy, A. "The Cucumber Book." Pragmatic Bookshelf.
