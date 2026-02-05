---
methodId: M165
displayed_sidebar: fieldGuideSidebar
sidebar_position: 3
title: Test List
pillar: test-first
description: Writing out all test cases before coding to guide development and ensure comprehensive coverage.
framework: tdd
framework_url: https://tidyfirst.substack.com/p/canon-tdd
foe_alignment:
  primary: Understanding
  secondary: Confidence
status: well-established
---

# Test List

**Pillar:** Test-First

The Test List is a planning technique in TDD where you write out all the test cases you can think of before starting to code. This list guides your red-green-refactor cycles and ensures you don't forget important behaviors.

## Definition

> A written list of test cases created before coding begins, capturing all known behaviors the code should have. The list is worked through one test at a time and updated as new cases are discovered during development.

## Why It Matters

The Test List provides:

- **Comprehensive coverage** - Capture edge cases before you forget them
- **Clear direction** - Know what to work on next
- **Progress visibility** - See how much is done and remaining
- **Reduced cognitive load** - Don't hold all cases in your head
- **Better sequencing** - Order tests from simple to complex

## How It Works

### Step 1: Brainstorm Test Cases

Before writing any code, list all the test cases you can think of:

```markdown
## Test List: Shopping Cart

- [ ] Empty cart has zero total
- [ ] Adding one item shows correct total
- [ ] Adding multiple items sums correctly
- [ ] Removing item updates total
- [ ] Removing last item results in empty cart
- [ ] Cannot add item with negative price
- [ ] Cannot add item with zero quantity
- [ ] Quantity updates recalculate total
- [ ] Discount code reduces total
- [ ] Invalid discount code is rejected
- [ ] Expired discount code is rejected
- [ ] Tax calculated on subtotal
- [ ] Free shipping over $50
```

### Step 2: Sequence the Tests

Order tests to build up functionality incrementally:

1. **Start simple** - Begin with the easiest, most fundamental case
2. **Build complexity** - Each test adds a small increment
3. **Save edge cases** - Handle unusual cases after the happy path works

```markdown
## Sequenced Test List

1. [ ] Empty cart has zero total          ← Start here
2. [ ] Adding one item shows correct total
3. [ ] Adding multiple items sums correctly
4. [ ] Tax calculated on subtotal
5. [ ] Removing item updates total
6. [ ] Quantity updates recalculate total
7. [ ] Free shipping over $50
8. [ ] Discount code reduces total
9. [ ] Cannot add item with negative price  ← Edge cases later
10. [ ] Invalid discount code is rejected
...
```

### Step 3: Work Through the List

Pick the next test, apply red-green-refactor, check it off:

```markdown
## Test List: Shopping Cart

- [x] Empty cart has zero total           ✓ Done
- [x] Adding one item shows correct total ✓ Done
- [ ] Adding multiple items sums correctly ← Working on this
- [ ] Removing item updates total
...
```

### Step 4: Update as You Go

As you code, you'll discover new cases. Add them to the list:

```markdown
## Test List: Shopping Cart

- [x] Empty cart has zero total
- [x] Adding one item shows correct total
- [x] Adding multiple items sums correctly
- [ ] Removing item updates total
- [ ] Adding same item twice increases quantity  ← NEW: discovered while coding
- [ ] Cart persists across page refresh          ← NEW: realized this matters
...
```

## Test List Patterns

### The Walking Skeleton

Start with an end-to-end test that exercises the full stack, then fill in unit tests:

```markdown
1. [ ] User can add item and see updated cart (E2E skeleton)
2. [ ] Cart.addItem adds to items array (unit)
3. [ ] Cart.total sums item prices (unit)
4. [ ] CartAPI.add persists to database (integration)
...
```

### The Degenerate Cases First

Start with boundary conditions that force you to handle structure:

```markdown
1. [ ] Empty list returns empty result
2. [ ] Single item list returns that item
3. [ ] Two item list returns both items
4. [ ] Many items handled correctly
```

### The Error Cases Pattern

List happy path first, then all the ways things can go wrong:

```markdown
## Happy Path
- [ ] Valid login succeeds
- [ ] Session created after login

## Error Cases
- [ ] Wrong password rejected
- [ ] Unknown user rejected
- [ ] Locked account rejected
- [ ] Expired password prompts reset
- [ ] Too many attempts triggers lockout
```

## Example: Complete Test List

```markdown
# Feature: User Registration

## Core Functionality
- [ ] Can register with valid email and password
- [ ] Registration creates user in database
- [ ] Confirmation email sent after registration
- [ ] Cannot login until email confirmed

## Validation
- [ ] Email must be valid format
- [ ] Email must be unique
- [ ] Password must be at least 8 characters
- [ ] Password must contain number
- [ ] Password must contain special character

## Edge Cases
- [ ] Whitespace trimmed from email
- [ ] Email comparison is case-insensitive
- [ ] Re-registration with same email shows helpful message
- [ ] Confirmation link expires after 24 hours
- [ ] Can request new confirmation email

## Error Handling
- [ ] Database error during registration shows friendly message
- [ ] Email service failure doesn't block registration
- [ ] Concurrent registration attempts handled safely
```

## Benefits Over Ad-Hoc Testing

| Ad-Hoc Approach | Test List Approach |
|-----------------|-------------------|
| Forget edge cases | Capture them upfront |
| Uncertain what's next | Clear direction |
| Hard to estimate progress | Visible progress |
| May over-engineer | Scope is defined |
| Context switching | Focused execution |

## Integration with TDD

The Test List is the "vital initial step" Kent Beck describes:

```
1. Write Test List        ← Planning
2. Pick a test           ← Selection
3. Red-Green-Refactor    ← Execution
4. Update list           ← Learning
5. Repeat from step 2
```

## Tips for Good Test Lists

### Do

- Write in plain language (not code)
- Include both happy path and edge cases
- Group related tests together
- Keep items small and focused
- Update the list as you learn

### Don't

- Try to be exhaustive upfront (you'll discover more)
- Write implementation details
- Include tests for framework/library code
- Sequence too rigidly (adapt as needed)

## FOE Alignment

The Test List supports FOE principles:

- **Optimize for Understanding** - The list makes requirements explicit. Anyone can read it and understand what the code should do.
- **Build Confidence** - Comprehensive lists ensure nothing is forgotten. Checking off items shows progress.
- **Fast Feedback** - Proper sequencing means you get feedback on core functionality first.

## References

- Beck, K. (2002). *Test-Driven Development: By Example*. Addison-Wesley.
- Beck, K. (2023). "Canon TDD." https://tidyfirst.substack.com/p/canon-tdd
- Shore, J. (2021). *The Art of Agile Development*, 2nd ed. O'Reilly.
