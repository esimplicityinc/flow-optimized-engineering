# Test Pyramid

## Description
A pyramid diagram showing the ideal distribution of test types.

## Visual Elements
Pyramid shape divided into three horizontal sections:

- **Top (smallest)**: E2E Tests (~10%)
  - Label: "~10% - Critical user journeys"
  - Color: Red/Orange (expensive, slow)

- **Middle**: Integration Tests (~20%)
  - Label: "~20% - Service boundaries"
  - Color: Yellow/Amber (moderate)

- **Bottom (largest)**: Unit Tests (~70%)
  - Label: "~70% - Business logic"
  - Color: Green (fast, cheap)

## Context
Used in: `docs/docs/reference/pattern-library.md`

This illustrates the ideal test distribution: many fast unit tests at the base, fewer integration tests in the middle, and minimal E2E tests at the top.

## ASCII Reference
```
Test Pyramid Target:
        /\
       /  \     E2E (~10%)
      /----\    Critical user journeys
     /      \
    /--------\  Integration (~20%)
   /          \ Service boundaries
  /------------\
 /              \ Unit (~70%)
/________________\ Business logic
```

## Suggested Style
- Classic pyramid shape
- Clear layer separation
- Proportional sizing (unit section should be visibly larger)
- Color gradient from green (bottom) to red (top) suggesting cost/speed
