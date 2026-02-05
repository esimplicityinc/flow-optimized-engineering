---
methodId: M164
displayed_sidebar: fieldGuideSidebar
sidebar_position: 2
title: Test Pyramid
pillar: test-first
description: A model for balancing different types of automated tests, favoring many fast unit tests over few slow end-to-end tests.
framework: tdd
framework_url: https://martinfowler.com/bliki/TestPyramid.html
foe_alignment:
  primary: Feedback
  secondary: Confidence
status: industry-standard
---

# Test Pyramid

**Pillar:** Test-First

The Test Pyramid is a model for thinking about how different kinds of automated tests should be balanced. Its essential insight: you should have many more fast, focused unit tests at the base than slow, broad end-to-end tests at the top.

## Definition

> A visual model showing that a healthy test portfolio should have many unit tests (base), fewer integration tests (middle), and even fewer end-to-end/UI tests (top)—shaped like a pyramid, not an ice cream cone.

## Why It Matters

The Test Pyramid addresses a common testing anti-pattern: over-reliance on end-to-end tests. Teams often gravitate toward E2E tests because they seem to test "real" behavior, but this creates problems:

- **Slow feedback** - E2E tests take minutes or hours to run
- **Brittle tests** - UI changes break many tests
- **Hard to debug** - Failures don't pinpoint the problem
- **Expensive to maintain** - High maintenance burden

The pyramid model guides teams toward a more sustainable test portfolio.

## The Pyramid Structure

```
        /\
       /  \   UI/E2E Tests (few)
      /----\  
     /      \  Integration Tests (some)
    /--------\
   /          \  Unit Tests (many)
  /______________\
  
  ← Slower, More Brittle, More Expensive
  → Faster, More Stable, Cheaper
```

### Unit Tests (Base)

**Characteristics:**
- Test a single unit (function, class, module) in isolation
- Run in milliseconds
- No external dependencies (database, network, filesystem)
- Easy to write and maintain
- Pinpoint failures precisely

**Example:**
```javascript
test('calculateDiscount applies 10% for orders over $100', () => {
  expect(calculateDiscount(150)).toBe(15);
});
```

**Target:** Hundreds to thousands of tests

### Integration Tests (Middle)

**Characteristics:**
- Test how units work together
- May involve database, API calls, or multiple modules
- Run in seconds
- Test integration points and boundaries
- Catch issues unit tests miss

**Example:**
```javascript
test('order service saves to database and sends confirmation', async () => {
  const order = await orderService.create({ items: [...] });
  
  const saved = await db.orders.findById(order.id);
  expect(saved).toBeDefined();
  
  const emails = await emailService.getSent();
  expect(emails).toContainEqual(expect.objectContaining({
    to: order.customerEmail,
    subject: expect.stringContaining('confirmation')
  }));
});
```

**Target:** Tens to hundreds of tests

### End-to-End Tests (Top)

**Characteristics:**
- Test complete user journeys through the UI
- Run in minutes
- Require full environment (browser, services, database)
- Most realistic but most brittle
- Expensive to write and maintain

**Example:**
```javascript
test('user can complete checkout flow', async () => {
  await page.goto('/products');
  await page.click('[data-testid="add-to-cart"]');
  await page.click('[data-testid="checkout"]');
  await page.fill('#email', 'test@example.com');
  await page.click('[data-testid="place-order"]');
  
  await expect(page.locator('.confirmation')).toBeVisible();
});
```

**Target:** Tens of tests (critical paths only)

## The Ice Cream Cone Anti-Pattern

Many teams end up with an inverted pyramid—the "ice cream cone":

```
    ___________
   /           \   Many E2E Tests
  /             \
 /_______________\
       | |         Few Integration Tests
       |_|         Few Unit Tests
```

**Problems:**
- Slow CI/CD pipelines (hours instead of minutes)
- Flaky tests undermine confidence
- Hard to debug failures
- High maintenance cost
- Developers avoid running tests locally

## Balancing the Pyramid

### When to Write Each Type

| Test Type | Write When... |
|-----------|---------------|
| Unit | Testing logic, calculations, transformations |
| Integration | Testing boundaries, database queries, API contracts |
| E2E | Testing critical user journeys, smoke tests |

### The "Push Down" Rule

When a high-level test fails:
1. Write a unit test that reproduces the bug
2. Fix the bug (unit test catches it)
3. The high-level test now passes
4. You have better coverage at a lower level

This gradually improves your pyramid shape.

## Modern Variations

### The Testing Trophy

Kent C. Dodds proposed a variation emphasizing integration tests:

```
        /\        E2E
       /  \
      /----\      Integration (largest)
     /      \
    /--------\    Unit
   /__________\   Static Analysis
```

The argument: integration tests provide the best balance of confidence and speed for modern applications.

### The Testing Diamond

Some teams find a diamond shape works better:

```
       /\         E2E
      /  \
     /    \       Integration (many)
     \    /
      \  /        Unit
       \/
```

This acknowledges that some applications benefit from more integration testing.

## Practical Guidelines

### Pyramid Ratios

A common starting point:

| Level | Percentage | Example (1000 tests) |
|-------|------------|---------------------|
| Unit | 70% | 700 tests |
| Integration | 20% | 200 tests |
| E2E | 10% | 100 tests |

Adjust based on your application's needs.

### Speed Targets

| Level | Target Duration |
|-------|-----------------|
| Unit | < 10ms each, < 1 min total |
| Integration | < 1s each, < 5 min total |
| E2E | < 30s each, < 15 min total |

### What to Test Where

| Concern | Test Level |
|---------|------------|
| Business logic | Unit |
| Data transformations | Unit |
| API contracts | Integration |
| Database queries | Integration |
| Authentication flows | Integration + E2E |
| Critical user journeys | E2E |
| Visual regression | E2E |

## FOE Alignment

The Test Pyramid strongly supports FOE principles:

- **Fast Feedback Loops** - Unit tests run in seconds, providing immediate feedback. The pyramid ensures most tests are fast.
- **Build Confidence** - Comprehensive unit tests catch most bugs. Integration and E2E tests provide additional confidence for integration points.
- **Optimize for Understanding** - Unit tests document behavior at the code level. The pyramid model itself provides shared vocabulary for discussing test strategy.

## References

- Cohn, M. (2009). *Succeeding with Agile*. Addison-Wesley.
- Fowler, M. (2012). "Test Pyramid." https://martinfowler.com/bliki/TestPyramid.html
- Dodds, K.C. "The Testing Trophy." https://kentcdodds.com/blog/the-testing-trophy-and-testing-classifications
- Google Testing Blog. (2015). "Just Say No to More End-to-End Tests."
