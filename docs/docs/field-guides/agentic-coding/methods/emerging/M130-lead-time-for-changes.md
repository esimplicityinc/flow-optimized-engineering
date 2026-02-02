---
methodId: M130
displayed_sidebar: fieldGuideSidebar
sidebar_position: 2
title: "Lead Time for Changes"
sidebar_label: "Lead Time for Changes"
description: "How lead time measurement applies to AI-assisted development"
external_method:
  framework: dora
  method: lead-time-for-changes
  id: M130
foe_maturity: hypothesized
observations:
  - O110
---

import ExternalMethodHeader from '@site/src/components/ExternalMethodHeader';

# Lead Time for Changes

<ExternalMethodHeader />

## Why This Matters for Agentic Coding

Lead time becomes especially interesting when AI accelerates the coding phase but other phases remain unchanged. This can expose bottlenecks that were previously hidden:

**The Paradox of AI Speed:**
- AI can generate code in minutes that might have taken hours
- But if your pipeline takes 30 minutes to test and 2 hours waiting for review, AI's speed is wasted
- Lead time measurement reveals where AI's gains are lost to pipeline friction

**New Measurement Opportunities:**
- Time from prompt to working code (AI generation time)
- Time from AI-generated code to verified working code
- Time from verification to production

## Adaptations for Agentic Coding

### Segment AI-Assisted Lead Time

Break down lead time into AI-specific segments:

| Segment | What to Measure |
|---------|-----------------|
| Generation | Time for AI to produce code |
| Verification | Time to confirm AI output is correct |
| Review | Human review time for AI-generated changes |
| Pipeline | CI/CD execution time |
| Deployment | Time to reach production |

### Expect Verification to Dominate

With AI generating code quickly, verification becomes the bottleneck:
- Invest in fast test suites
- Automate verification where possible
- Build confidence in AI output to reduce review time over time

### Watch for Review Bottlenecks

AI can generate more code than humans can review:
- Consider pair programming with AI to reduce async review need
- Use smaller, more frequent changes to keep reviews manageable
- Track review queue depth as a leading indicator

## Questions We're Exploring

- Does AI-assisted development consistently reduce lead time, or does it shift bottlenecks?
- What's the optimal balance between AI generation speed and human verification?
- How should we set lead time targets when AI is involved?

## Supporting Evidence

