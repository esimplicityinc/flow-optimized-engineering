---
methodId: M163
displayed_sidebar: fieldGuideSidebar
sidebar_position: 1
title: Red-Green-Refactor
pillar: red-green-refactor
description: The core TDD cycle of writing a failing test, making it pass, then improving the code.
framework: tdd
framework_url: https://tidyfirst.substack.com/p/canon-tdd
foe_alignment:
  primary: Feedback
  secondary: Confidence
status: industry-standard
---

# Red-Green-Refactor

**Pillar:** Red-Green-Refactor

Red-Green-Refactor is the fundamental rhythm of Test-Driven Development. It's a disciplined cycle that guides developers through writing tests first, implementing minimal code to pass them, and then improving the design—all while maintaining a safety net of passing tests.

## Definition

> A three-phase development cycle: (1) Red - write a test that fails, (2) Green - write minimal code to make it pass, (3) Refactor - improve the code while keeping tests green. Repeat for each new behavior.

## Why It Matters

The Red-Green-Refactor cycle provides:

- **Immediate feedback** - Know within minutes if your code works
- **Design pressure** - Writing tests first forces better interfaces
- **Safe refactoring** - Tests catch regressions instantly
- **Incremental progress** - Small steps reduce risk and cognitive load
- **Documentation** - Tests describe what the code should do

## The Cycle in Detail

### Phase 1: Red (Write a Failing Test)

Write a test for the next piece of functionality. The test must fail—this proves it's actually testing something new.

```javascript
// Red: Test for functionality that doesn't exist
test('should calculate total with tax', () => {
  const cart = new ShoppingCart();
  cart.addItem({ price: 100 });
  
  expect(cart.totalWithTax(0.1)).toBe(110);
});
// Fails: ShoppingCart doesn't have totalWithTax method
```

**Key points:**
- Test should fail for the right reason (missing functionality, not syntax error)
- Test name should describe the behavior
- Keep tests focused on one behavior

### Phase 2: Green (Make It Pass)

Write the simplest code that makes the test pass. Don't over-engineer—just make it work.

```javascript
// Green: Minimal implementation
class ShoppingCart {
  constructor() {
    this.items = [];
  }
  
  addItem(item) {
    this.items.push(item);
  }
  
  totalWithTax(taxRate) {
    const subtotal = this.items.reduce((sum, item) => sum + item.price, 0);
    return subtotal * (1 + taxRate);
  }
}
// Test passes!
```

**Key points:**
- Resist the urge to add features not required by tests
- "Fake it till you make it" is acceptable—hardcode if needed
- Speed matters—get to green quickly

### Phase 3: Refactor (Improve the Design)

With tests passing, improve the code. Remove duplication, improve names, extract methods. Run tests after each change.

```javascript
// Refactor: Extract subtotal calculation
class ShoppingCart {
  constructor() {
    this.items = [];
  }
  
  addItem(item) {
    this.items.push(item);
  }
  
  subtotal() {
    return this.items.reduce((sum, item) => sum + item.price, 0);
  }
  
  totalWithTax(taxRate) {
    return this.subtotal() * (1 + taxRate);
  }
}
// Tests still pass!
```

**Key points:**
- Only refactor when tests are green
- Make small changes, run tests frequently
- Refactor both production code AND test code
- Don't add new functionality during refactor

## Common Patterns

### Triangulation

When unsure how to generalize, add more specific test cases until the pattern becomes clear:

```javascript
test('tax on $100 at 10%', () => {
  expect(calculateTax(100, 0.1)).toBe(10);
});

test('tax on $200 at 10%', () => {
  expect(calculateTax(200, 0.1)).toBe(20);  // Forces generalization
});

test('tax on $100 at 20%', () => {
  expect(calculateTax(100, 0.2)).toBe(20);  // Confirms formula
});
```

### Obvious Implementation

When the solution is clear, just write it:

```javascript
test('should add two numbers', () => {
  expect(add(2, 3)).toBe(5);
});

// Obvious implementation - no need to fake it
function add(a, b) {
  return a + b;
}
```

### Fake It Till You Make It

When unsure, start with a hardcoded value and generalize:

```javascript
// First test
test('fibonacci of 0 is 0', () => {
  expect(fib(0)).toBe(0);
});

// Fake it
function fib(n) {
  return 0;  // Hardcoded!
}

// Second test forces generalization
test('fibonacci of 1 is 1', () => {
  expect(fib(1)).toBe(1);
});

// Now generalize
function fib(n) {
  return n;  // Still simple
}

// Third test forces real implementation
test('fibonacci of 2 is 1', () => {
  expect(fib(2)).toBe(1);
});
```

## Anti-Patterns

| Anti-Pattern | Problem | Solution |
|--------------|---------|----------|
| Skipping Red | Test might not test anything | Always see the test fail first |
| Gold-plating in Green | Over-engineering, wasted effort | Write minimum code to pass |
| Skipping Refactor | Technical debt accumulates | Refactor is not optional |
| Big steps | Hard to debug failures | Smaller increments |
| Testing implementation | Brittle tests | Test behavior, not internals |

## Cycle Duration

A single Red-Green-Refactor cycle should take **minutes, not hours**:

| Phase | Typical Duration |
|-------|------------------|
| Red | 1-2 minutes |
| Green | 2-5 minutes |
| Refactor | 2-5 minutes |
| **Total** | **5-12 minutes** |

If cycles take longer, you're taking steps that are too big.

## FOE Alignment

Red-Green-Refactor directly supports FOE principles:

- **Fast Feedback Loops** - Each cycle provides immediate feedback. You know within minutes if your approach works.
- **Build Confidence** - The growing test suite proves the code works. Refactoring becomes safe.
- **Optimize for Understanding** - Small steps keep cognitive load low. Tests document intent.

## References

- Beck, K. (2002). *Test-Driven Development: By Example*. Addison-Wesley.
- Beck, K. (2023). "Canon TDD." https://tidyfirst.substack.com/p/canon-tdd
- Fowler, M. (2023). "Test Driven Development." https://martinfowler.com/bliki/TestDrivenDevelopment.html
