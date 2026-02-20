---
methodId: M152
displayed_sidebar: fieldGuideSidebar
sidebar_position: 5
title: "Test-Driven Agent Development"
maturity: observing
observations:
  - O126-strongdm-software-factory-2026
  - O157
  - O211
---

import InternalMethodHeader from '@site/src/components/InternalMethodHeader';

# Test-Driven Agent Development

<InternalMethodHeader />

Apply the red-green-refactor cycle when working with AI coding assistants. If you didn't watch the test fail, you don't know if it tests the right thing—this is doubly true when AI writes the test.


## Overview

AI coding assistants can generate tests alongside implementation code. This creates a dangerous situation: both the code and the test might be wrong in the same way, and the test passes because it validates the bug. The test provides false confidence.

**Test-Driven Agent Development** applies the classic TDD discipline to AI-assisted work: always see the test fail before making it pass. This simple gate ensures that:
1. The test actually tests what you think it tests
2. The test can detect failures
3. The implementation was necessary (the test didn't pass accidentally)

The iron law from obra/superpowers: *"If you didn't watch the test fail, you don't know if it tests the right thing."*

## When to Use

Use this method when:

- Working with AI on features that need to be correct
- The AI is generating both tests and implementation
- You've experienced "tests pass but code is wrong" situations
- Building confidence in AI-generated code matters

## When NOT to Use

Avoid this method when:

- Exploratory coding where you're discovering requirements
- Adding tests to existing working code (test-after is fine there)
- Time pressure genuinely outweighs correctness needs (rare but real)

## How It Works

### Prerequisites

Before starting:
- Have a test framework configured and running
- Tests should execute quickly (< 5 seconds for unit tests)
- Understand what behavior you want to implement

### Step 1: Write the Test First (Red)

Ask the AI to write a test for the desired behavior *before* implementing it:

```
"Write a test for a function that calculates compound interest. 
Don't implement the function yet—just the test."
```

The AI produces a test. **Run it and watch it fail.**

```bash
$ npm test
  ✗ should calculate compound interest correctly
    Error: calculateCompoundInterest is not defined
```

This failure proves:
- The test runs
- The test would detect a missing implementation
- You're testing the right thing

### Step 2: Verify the Failure is Meaningful

Ensure the test fails for the right reason:
- Not a syntax error in the test
- Not a missing import (unless that's what you're testing)
- The actual assertion would have executed

If the test fails before reaching the assertion, fix the test first.

### Step 3: Implement to Pass (Green)

Now ask the AI to implement just enough to make the test pass:

```
"Now implement calculateCompoundInterest to make this test pass.
Implement the minimum needed—don't add extra features."
```

Run the test again. It should pass:

```bash
$ npm test
  ✓ should calculate compound interest correctly
```

### Step 4: Refactor with Confidence

With a passing test, you can refactor safely:

```
"Can you refactor this implementation to be more readable?
The test should still pass after."
```

Run tests after every refactor to ensure you haven't broken anything.

### Step 5: Repeat for Additional Cases

Add edge cases one at a time, always following red-green-refactor:

1. Write test for edge case → watch it fail
2. Extend implementation → watch it pass
3. Refactor if needed → confirm tests still pass

## Example

**Anti-pattern: Test and Implementation Together**

```
You: "Create a function to validate email addresses with tests."

AI: Here's the implementation and tests:

function isValidEmail(email) {
  return email.includes('@');
}

test('validates email', () => {
  expect(isValidEmail('test@example.com')).toBe(true);
});

All tests pass! ✓
```

❌ **Problem:** You never saw the test fail. The test might be testing the wrong thing. In fact, this implementation is buggy (`"@@"` would pass) but the test doesn't catch it.

---

**TDD Pattern: Red-Green-Refactor**

```
You: "Write a test for email validation. Don't implement yet."

AI: Here's the test:

test('rejects email without @', () => {
  expect(isValidEmail('invalid')).toBe(false);
});

test('accepts valid email format', () => {
  expect(isValidEmail('user@domain.com')).toBe(true);
});

You: Run it.

AI: $ npm test
  ✗ rejects email without @ - isValidEmail is not defined
  ✗ accepts valid email format - isValidEmail is not defined
```

✅ **Good:** Tests fail because function doesn't exist. Now implement:

```
You: "Implement isValidEmail to pass these tests."

AI: function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

$ npm test
  ✓ rejects email without @
  ✓ accepts valid email format
```

✅ **Confidence:** You saw the tests fail, then pass. The tests actually test something.

## Common Pitfalls

1. **"The AI wrote tests, so we're covered"** - AI-generated tests can have the same blind spots as AI-generated code. The red phase catches this.

2. **Skipping the red phase "just this once"** - Every skip is a potential false-positive test. The discipline must be consistent.

3. **Too many tests at once** - Write one test, see it fail, make it pass. Then the next. Batching tests defeats the purpose.

4. **Confusing test errors with test failures** - A test that errors (crashes) before the assertion isn't the same as a test that fails (assertion not met). Fix errors first.

## FOE Alignment

This method supports multiple FOE principles:

- **Fast Feedback:** Immediate test results after each change
- **Build Confidence:** Watching tests fail then pass proves the test works
- **Incremental Development:** One test at a time, building up coverage

## External Evidence

- **skills.sh obra/superpowers** (1.3K weekly installs): "test-driven-development" skill with strict red-green-refactor enforcement
- **RubberDuckBench research** (arXiv 2026): High hallucination rates in AI models make verification essential
- **Classic TDD literature**: Kent Beck's principles apply equally to AI-assisted development

## How You Can Help

If you're testing this method:

1. Apply TDD discipline to your AI-assisted development
2. Track instances where the red phase caught problems
3. Document your experience as an observation

## Supporting Evidence

