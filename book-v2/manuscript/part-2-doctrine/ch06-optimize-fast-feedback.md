---
chapter: 6
title: "Optimize for Fast Feedback"
part: "II"
status: rewrite
---

# Optimize for Fast Feedback

Understanding gives you a map.

Fast feedback tells you when the map is wrong.

Because it will be wrong.

Systems move. Dependencies drift. People leave. Reality changes the terrain while you’re still holding the diagram.

Fast feedback is how you keep beliefs aligned with truth.

## Feedback is belief calibration

Humans learn through prediction and correction.

If correction is slow, beliefs ossify.

That’s how teams become confident without becoming accurate.

Then debates replace experiments.

And whoever has the best rhetoric wins.

FOE doesn’t want better rhetoric.

It wants **shorter time-to-disconfirmation**.

How quickly can you discover you’re wrong?

## The four questions

Every change demands answers:

1. **Did it work?**
2. **Did it break anything?**
3. **What needs fixing?**
4. **Is production safe?**

If those answers arrive late, iteration dies.

Not because people are lazy.

Because context is a perishable resource.

## “Fast enough” means “before you forget”

Feedback is only useful if it arrives before the developer’s mental model evaporates.

Targets are pragmatic. Think in seconds for lint/type/build; minutes for unit tests; under 10 minutes for integration checks on most changes; under 30–60 minutes to merge-to-production where appropriate; and continuous signals for production health.

If feedback arrives tomorrow, you’re not in a loop.

You’re in a mail exchange.

## Latency is additive

Every handoff creates queueing.

Every manual step adds calendar time.

Automation removes human availability from the critical path.

That’s not “replacing humans.”

It’s reserving humans for judgment instead of button-clicking.

## Checks vs bureaucracy

Verification is non-negotiable, but design matters. **Batch, late, human-gated** verification becomes bureaucracy; **continuous, early, automated** verification becomes fast feedback.

Same intent.

Different design.

## Agentic reality

If change generation is machine-speed, verification must be machine-speed.

Otherwise humans become either bottlenecks or rubber stamps.

Neither scales.

Next: [Chapter 7: Optimize for Confidence](ch07-optimize-confidence.md)
