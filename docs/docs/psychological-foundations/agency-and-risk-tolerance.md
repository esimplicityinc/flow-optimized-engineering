---
sidebar_position: 4
title: "Agency & Risk Tolerance"
---

# Agency & Risk Tolerance

Confidence isn't the same as certainty. Certainty is believing you know the outcome. Confidence is willingness to act despite not knowing the outcome. This distinction matters because progress requires action under uncertainty, and humans systematically avoid action when risk feels unbounded.

## The Confidence-Certainty Confusion

When leaders ask for "more confidence" before approving a change, they often mean certainty—guaranteed outcomes, zero risk, complete predictability. This is a category error. Engineering work is fundamentally uncertain. Seeking certainty before acting means never acting.

> Confidence = willingness to act under uncertainty
>
> Certainty = belief that you know the outcome

High-performing organizations aren't more certain about outcomes. They're more comfortable acting without certainty because they've bounded the downside. They can say "I don't know if this will work, but I know how bad it can get if it doesn't, and that's acceptable."

## Why Humans Avoid Action

Humans have evolved threat-detection systems that bias toward inaction when risk feels unbounded. This made sense in ancestral environments where unknown threats could be lethal. It's maladaptive in engineering contexts where inaction has its own costs.

When faced with unbounded downside:

- **Analysis paralysis.** Gathering more information feels safer than deciding, so information gathering continues indefinitely
- **Diffusion of responsibility.** If no individual makes the call, no individual bears the blame
- **Escalation loops.** Decisions get pushed up the hierarchy until they reach someone with authority to absorb the risk
- **False urgency avoidance.** "We should take our time and get this right" becomes an excuse for never finishing

These behaviors aren't irrational given the perceived risk. They're predictable responses to environments where the consequences of being wrong feel catastrophic and unlimited.

## What Executives Actually Fear

It's tempting to assume that slow organizational decision-making stems from incompetence or bureaucratic inertia. Often, it stems from rational risk aversion under uncertainty.

Executives don't fear speed. They fear:

- **Unbounded downside.** Changes that could cascade into system-wide failures
- **Irreversible mistakes.** Decisions that can't be undone once committed
- **Invisible accumulation.** Small problems that compound undetected until crisis
- **Accountability without control.** Being responsible for outcomes they can't predict or influence

When executives slow things down, they're often trying to contain these risks through the only mechanism available to them: time and scrutiny. If better containment mechanisms existed, they'd use them.

:::tip[GovCon Insight]
Government oversight bodies—contracting officers, program managers, review boards—face acute accountability pressure with limited control. They're responsible for outcomes but can't directly influence execution. This creates rational risk aversion that looks like bureaucracy but functions as self-protection. FOE's containment mechanisms help by making risk visible and bounded. When an approver can see exactly what's changing, verify it's reversible, and confirm the blast radius is limited, they can approve faster without accepting more risk.
:::

## How FOE Contains Risk

FOE doesn't eliminate risk—it bounds it. Every practice contributes to making the worst case tolerable:

| Practice | Risk Containment Effect |
|----------|------------------------|
| Small, incremental changes | Limits blast radius of any single mistake |
| Automated testing | Catches regressions before deployment |
| Feature flags | Enables instant rollback without redeploy |
| Canary deployments | Exposes problems to small populations first |
| Observable systems | Makes problems visible before they cascade |
| Decoupled architecture | Prevents failures from propagating |

The goal isn't to make every change safe. It's to make the unsafe ones obvious before they reach users, and reversible after they do.

> FOE contains risk. It doesn't remove it.

## Psychological Safety for Decision-Making

"Psychological safety" often gets discussed as an HR concept: can people speak up without fear? FOE uses a more operational definition:

> Psychological safety for decision-making = people can act without fear of disproportionate consequences for good-faith mistakes

This isn't about being nice. It's about creating conditions where people can take necessary risks. If a deployment could end your career, you'll avoid deploying. If a deployment could cause a recoverable incident that you'll learn from, you'll deploy more readily.

Operational psychological safety requires:

- **Proportionate consequences.** Mistakes lead to learning, not punishment (absent negligence)
- **Blame-free post-mortems.** Focus on system failures, not individual failures
- **Visible guardrails.** People can see what prevents catastrophe
- **Recovery paths.** Clear procedures for backing out of problems
- **Shared responsibility.** Risk is distributed, not concentrated in individuals

## Courage by Design

Asking people to be braver is ineffective. Courage isn't a personality trait you can demand more of—it's a response to perceived risk-reward ratios. If the environment makes risk feel unbounded, even naturally bold people become cautious.

FOE creates courage by design:

1. **Make the worst case visible.** Unknown risks feel unbounded. Known risks can be evaluated.
2. **Make the worst case tolerable.** When failure is recoverable, action becomes rational.
3. **Make success visible.** Rapid feedback shows that things usually work, building justified confidence.
4. **Make learning the outcome.** When even failures produce value, action always has upside.

The goal isn't to make people feel safe when they shouldn't. It's to make the actual risk level match the perceived risk level, so rational action becomes possible.

## Enabling Informed Risk-Taking

The alternative to bounded risk isn't no risk—it's unexamined risk. Organizations that can't deploy frequently don't have fewer problems. They have bigger, less visible problems that arrive all at once.

Every month a change sits waiting:

- The gap between development and production environments widens
- Integration issues accumulate undetected
- Dependencies drift
- Team memory of the changes fades
- Risk compounds while appearing to diminish

Fast, small, bounded deployments are lower risk than slow, large, unbounded ones. FOE helps organizations see this clearly enough to act on it.

## Assessing Your Organization

Signs that risk tolerance has become dysfunctional:

- Simple changes require extensive approval chains
- Deployment windows are infrequent and high-stress
- "We're not ready" is a perpetual state
- Every change requires building a case
- Rollback is difficult or impossible
- Incident response focuses on blame
- People work around the system rather than through it
- Technical debt accumulates because changes are too risky

If these patterns sound familiar, the problem isn't individual courage. The environment is signaling that risk is unbounded, and people are responding rationally. Change the environment, and behavior follows.
