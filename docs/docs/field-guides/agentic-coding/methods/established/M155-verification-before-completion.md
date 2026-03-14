---
methodId: M155
displayed_sidebar: fieldGuideSidebar
sidebar_position: 4
title: "Verification Before Completion"
maturity: validated
observations:
  - O210
  - O211
  - O212
  - O215
  - O216
  - O217
  - O219
---

import InternalMethodHeader from '@site/src/components/InternalMethodHeader';

# Verification Before Completion

<InternalMethodHeader />

Never claim work is complete without running verification commands. Claiming completion without evidence is not efficiency—it's wishful thinking that creates downstream problems.


## Overview

AI coding assistants are prone to optimistic completion claims. They may generate code that "looks right" but hasn't been tested, or claim a task is done when edge cases remain unhandled. This pattern is especially dangerous because the output *appears* professional and complete.

The **Verification Before Completion** method establishes a hard gate: no completion claim is valid without evidence from actual verification commands (tests passing, builds succeeding, linters clean, etc.). This transforms "I think it works" into "I have evidence it works."

The core insight comes from the obra/superpowers skill: *"Claiming work is complete without verification is dishonesty, not efficiency."* This framing shifts verification from overhead to professional obligation.

## When to Use

Use this method when:

- Working with AI coding assistants on any production code
- The cost of undetected bugs exceeds the cost of verification
- You've experienced "looks right but isn't" problems before
- Building confidence in AI-generated code matters

## When NOT to Use

Avoid this method when:

- Pure exploration/prototyping where correctness doesn't matter yet
- You're intentionally deferring verification (and tracking that decision)
- The code is genuinely throwaway with no downstream consumers

## How It Works

### Prerequisites

Before starting:
- Have runnable verification commands (tests, lints, builds, type checks)
- Understand what "done" means for this task
- Ensure verification commands are fast enough to run frequently

### Step 1: Define Verification Evidence

Before starting work, identify what evidence would prove completion:

| Claim Type | Required Evidence |
|------------|------------------|
| "Feature works" | Tests pass covering the feature |
| "Bug is fixed" | Test that reproduced bug now passes |
| "Code is clean" | Linter/formatter reports no issues |
| "Types are correct" | Type checker passes |
| "Build succeeds" | Build command completes without errors |

### Step 2: Detect Completion Claims Without Evidence

Watch for these red flags from AI assistants:

- "This should work" (without running it)
- "The implementation is complete" (without test results)
- "I've fixed the issue" (without reproducing and verifying)
- Providing code without showing verification output

When you see these, pause and request verification before accepting.

### Step 3: Require Evidence Before Accepting

Before accepting completion:

```
"Before we consider this done, please run the tests and show me the results."
"Can you verify this builds successfully?"
"Show me the linter output for these changes."
```

Only accept completion claims that include verification output.

### Step 4: Build Verification Into Your Workflow

For systematic application:

1. **Add verification to your CLAUDE.md or agent instructions:**
   ```markdown
   ## Completion Requirements
   
   Never claim a task is complete without:
   - Running relevant tests and showing results
   - Confirming the build passes
   - Showing linter output is clean
   ```

2. **Create verification checkpoints:**
   - After implementing a feature: run its tests
   - After fixing a bug: run the reproduction test
   - Before any PR: full test suite + build

## Example

**Before (Unverified Completion):**
```
Assistant: I've implemented the user authentication feature. The code handles login, 
logout, and session management. The implementation is complete.
```
❌ No evidence provided

**After (Verified Completion):**
```
Assistant: I've implemented the user authentication feature. Here's the verification:

$ npm test -- --grep "auth"
  ✓ should log in with valid credentials (42ms)
  ✓ should reject invalid password (15ms)
  ✓ should handle session expiration (28ms)
  ✓ should log out and clear session (12ms)

4 passing (97ms)

$ npm run build
Build successful - no errors

$ npm run lint
No linting errors found

The implementation is complete with all tests passing.
```
✅ Evidence provided

## Common Pitfalls

1. **"I'll verify it later"** - Later never comes. Verify immediately or explicitly track the debt.

2. **Accepting verbal assurance** - "I'm confident it works" is not evidence. Output from verification commands is evidence.

3. **Partial verification** - Running one test doesn't verify the whole feature. Ensure verification scope matches claim scope.

4. **Forgetting negative cases** - Verification should include error handling and edge cases, not just happy paths.

## FOE Alignment

This method directly supports **Build Confidence Through Evidence**:
- You can't claim confidence without verification
- Evidence creates justified confidence, not false confidence
- Fast verification enables frequent confidence checks

## External Evidence

- **skills.sh obra/superpowers** (1.0K weekly installs): "verification-before-completion" skill with iron law enforcement
- **RubberDuckBench research** (arXiv 2026): 58.3% hallucination rate across AI models underscores need for verification
- **Industry practice**: Widespread adoption of CI/CD gates embodying this principle

## How You Can Help

If you're testing this method:

1. Apply the verification gate to your AI-assisted development
2. Track how often unverified claims would have been wrong
3. Document your experience as an observation

## Supporting Evidence

