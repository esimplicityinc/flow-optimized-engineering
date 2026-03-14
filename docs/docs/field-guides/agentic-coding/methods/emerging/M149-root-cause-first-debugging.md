---
methodId: M149
displayed_sidebar: fieldGuideSidebar
sidebar_position: 7
title: "Root-Cause-First Debugging"
maturity: observing
observations:
  - O219
---

import InternalMethodHeader from '@site/src/components/InternalMethodHeader';

# Root-Cause-First Debugging

<InternalMethodHeader />

Never apply fixes without first investigating the root cause. Understand the problem before solving it—especially when working with AI assistants that are eager to generate solutions.


## Overview

AI coding assistants are biased toward action. Given a bug report, they immediately suggest fixes. This creates a dangerous pattern: applying fixes without understanding the problem leads to:
- Fixes that mask symptoms without addressing causes
- New bugs introduced by misguided changes
- Thrashing through multiple failed fix attempts
- Lost time that exceeds the time proper investigation would have taken

The **Root-Cause-First Debugging** method enforces a simple discipline: investigate before fixing. The iron law from obra/superpowers: *"NO FIXES WITHOUT ROOT CAUSE INVESTIGATION FIRST."*

This isn't about being slow—it's about being effective. A 10-minute investigation that identifies the root cause beats an hour of trial-and-error fixes.

## When to Use

Use this method when:

- Debugging any non-trivial bug
- The AI immediately suggests a fix without investigation
- You've already tried one fix and it didn't work
- The bug seems mysterious or inconsistent

## When NOT to Use

Avoid this method when:

- The cause is already obvious (typo, missing import)
- You're intentionally doing quick trial-and-error on trivial issues
- Time pressure genuinely requires a quick patch (but track the debt)

## How It Works

### Prerequisites

Before starting:
- A reproducible bug or clear symptom description
- Access to logs, debugger, or other investigation tools
- Willingness to resist the urge to immediately fix

### Phase 1: Root Cause Investigation

**Do not suggest fixes yet.** Instead:

1. **Reproduce the bug** - Confirm you can trigger it consistently
2. **Gather evidence** - Collect logs, error messages, stack traces
3. **Form hypotheses** - List possible causes (don't pick one yet)
4. **Test hypotheses** - Use logging, debugging, or inspection to narrow down

Prompt the AI explicitly:

```
"Don't suggest a fix yet. Help me investigate why this is happening.
Let's gather evidence first."
```

### Phase 2: Pattern Analysis

Look for patterns that reveal the cause:

- **When does it happen?** - Always, sometimes, under specific conditions?
- **When did it start?** - After which change or deployment?
- **What's different?** - Between working and failing cases?
- **What's the actual vs expected behavior?** - Be precise

```
"Let's analyze the pattern. When does this bug occur vs not occur?
What changed recently that might be related?"
```

### Phase 3: Hypothesis Testing

With evidence gathered, test your hypotheses:

1. **State the hypothesis clearly** - "I think X is causing this because Y"
2. **Design a test** - How would we prove or disprove this?
3. **Run the test** - Add logging, use debugger, inspect state
4. **Evaluate results** - Does evidence support or refute the hypothesis?

```
"My hypothesis is that the cache is returning stale data. 
Let's add logging to verify what the cache returns vs what we expect."
```

### Phase 4: Fix Implementation

Only after identifying the root cause:

1. **Confirm the cause** - State it explicitly before fixing
2. **Design the fix** - Address the cause, not just the symptom
3. **Implement minimally** - Smallest change that fixes the root cause
4. **Verify the fix** - Reproduce the original bug—it should be gone

```
"Root cause confirmed: the cache TTL was set to 0, causing immediate expiration.
Now let's fix this by setting an appropriate TTL value."
```

### The 3-Fix Rule

If you've tried 3 fixes and the bug persists:

**STOP. Question everything.**

- Is your understanding of the system correct?
- Are you fixing the right component?
- Is this a symptom of a deeper architectural issue?

Three failed fixes indicates a flawed mental model. Go back to Phase 1.

## Example

**Anti-pattern: Fix-First Debugging**

```
You: "Users are seeing a 500 error on the checkout page."

AI: "Let's add a try-catch around the checkout handler to prevent the error."
```

❌ **Problem:** This masks the symptom without understanding or fixing the cause.

---

**Root-Cause-First Pattern**

```
You: "Users are seeing a 500 error on the checkout page. Don't suggest 
fixes yet—help me investigate."

AI: "Let's gather evidence:
1. Can you share the error logs from when this occurs?
2. Does it happen for all users or specific ones?
3. When did this start—after any recent deployment?"

You: "Logs show: 'TypeError: Cannot read property 'id' of undefined' 
in PaymentService.processPayment. Started after yesterday's deploy."

AI: "Hypothesis: Yesterday's deploy changed something that causes 
the payment object to be undefined in some cases. Let's check:
1. What changed in yesterday's deploy?
2. Can you reproduce with a specific test case?"

You: "Deploy added a new payment provider. Fails only for guest checkout."

AI: "Hypothesis refined: Guest checkout doesn't create the payment object 
the same way registered users do. Let's verify by logging the payment 
object for both flows."

You: [Adds logging, confirms guest checkout has null payment object]

AI: "Root cause confirmed: Guest checkout flow doesn't initialize 
PaymentService correctly. The fix should initialize the payment object 
in the guest checkout path, not add error handling to mask the issue."
```

✅ **Result:** Understanding before action leads to correct fix.

## Common Pitfalls

1. **"Let me just try this quick fix"** - Quick fixes compound. Each failed fix adds confusion and code debt.

2. **Accepting the first plausible explanation** - Investigate until you have evidence, not just a theory that sounds right.

3. **Fixing symptoms instead of causes** - Adding null checks everywhere treats symptoms. Understanding why null occurs treats the cause.

4. **Skipping reproduction** - If you can't reproduce it, you can't verify your fix works. Reproduction is step one.

## FOE Alignment

This method directly supports **Optimize for Understanding**:
- You must understand the bug before fixing it
- Investigation builds mental model of system behavior
- Root cause knowledge prevents future similar bugs

Also supports **Build Confidence**:
- Evidence-based debugging creates justified confidence
- Understanding why a fix works (not just that it works)

## External Evidence

- **skills.sh obra/superpowers** (1.3K weekly installs): "systematic-debugging" skill with four-phase process
- **Debugging literature**: Classic texts emphasize scientific method in debugging
- **Industry practice**: The "5 Whys" and root cause analysis are established techniques

## How You Can Help

If you're testing this method:

1. Apply root-cause-first discipline to your debugging sessions
2. Track how often the first AI-suggested fix would have been wrong
3. Document your experience as an observation

## Supporting Evidence

