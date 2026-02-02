# The Review Transformation

Code review is broken at scale.

When teams were small and changes were infrequent, reviews worked. A senior engineer read every line. They understood the context. They caught bugs, improved design, and spread knowledge. Review was verification.

At scale, this breaks. Volume exceeds capacity. Reviewers can't keep up. They skim instead of read. They approve to clear queues. The ceremony continues. The verification stops.

AI coding agents make this worse. Agents produce more code faster than any human can review. The reviewer who couldn't keep up with human-speed development has no chance at machine-speed development.

The solution isn't faster reviewing. It's different reviewing.

## What Review Used to Do

Traditional review served multiple purposes:

**Verification.** Does the code work? Are there bugs? Does it handle edge cases?

**Design feedback.** Is this the right approach? Does it fit the architecture? Are there better alternatives?

**Knowledge transfer.** Reviewers learn about the code. Knowledge spreads across the team.

**Standards enforcement.** Does the code follow conventions? Is it formatted correctly? Does it meet quality bars?

When review capacity is unlimited, doing all of these makes sense. When capacity is constrained, bundling them together creates problems.

## Why Bundling Fails

Different purposes need different treatments:

**Standards enforcement** doesn't require human judgment. Formatting, naming conventions, import ordering, these can be automated. Linters catch violations instantly. Human reviewers shouldn't waste attention on them.

**Verification** requires evidence, not inspection. A human reading code is a poor substitute for tests running code. Reviews catch some bugs. Tests catch more. Reviews miss edge cases that tests exercise.

**Design feedback** requires context, not code reading. The best time to discuss design is before implementation, not after. Reviewing code to suggest different designs wastes the implementation effort.

**Knowledge transfer** requires engagement, not obligation. Forced reviews don't transfer knowledge effectively. People skim obligatory reviews. They engage with interesting problems.

Bundling these purposes means doing all of them poorly. Reviewers spend attention on formatting that should be automated. They catch bugs that tests should catch. They suggest designs that should have been discussed earlier. They transfer little knowledge because they're skimming.

## The Unbundled Model

Separate the purposes. Handle each appropriately.

**Standards enforcement: Automation.** Linters run on every commit. Violations are blocked or auto-fixed. No human reviewer ever sees formatting issues or convention violations. Their attention is freed for things that require judgment.

**Verification: Tests.** Comprehensive tests verify behavior. Tests run automatically. Test coverage gates ensure tests exist. The question "does this work?" is answered by tests, not by reviewers reading code.

**Design feedback: Earlier.** Design discussions happen before implementation. Architecture decisions are made at the design stage. When code appears for review, the major decisions are already settled. Review confirms implementation matches agreed design.

**Knowledge transfer: Intentional.** Knowledge spreads through pairing, documentation, and design discussion, not through obligatory code review. Review can transfer knowledge, but it's not the primary mechanism. The primary mechanisms are more effective.

## What Remains for Review

After unbundling, what's left?

**Does this implementation match intent?** The design was agreed. The tests pass. But does the code actually do what we agreed it should? This requires judgment about fit, not inspection for bugs.

**Are there concerns tests don't cover?** Security implications. Performance at scale. Operational considerations. Tests verify behavior. Humans assess implications that tests can't capture.

**Is this change coherent with the system?** Does it follow patterns? Does it fit the architecture? These are judgment calls that automated checks might miss.

**Should someone else know about this?** Is this change interesting? Does it affect other teams? Should it be discussed more broadly? Review surfaces changes that deserve wider attention.

These are judgment questions, not verification questions. They require understanding context, not reading every line. A reviewer who understands the system and the intent can assess these in minutes. The volume problem disappears because the work per review is small.

## The AI Review Challenge

When agents write code, traditional review becomes impossible. The volume is too high.

But unbundled review works. Automation handles standards. Tests handle verification. Design discussion (between humans and agents) happens before implementation. What remains for human review is judgment about coherence and implications.

A human can review agent output at the judgment level. "Does this feature do what we intended? Does it fit our architecture? Are there implications we should consider?" These questions don't require reading every line. They require understanding intent and assessing fit.

This is the only model that scales to machine-speed code generation. Review as inspection fails. Review as judgment survives.

## Making the Transition

Moving from bundled to unbundled review requires investment:

**Automation infrastructure.** Linters, formatters, scanners must exist and run automatically. Standards violations must be blocked without human intervention. This infrastructure is table stakes.

**Test coverage.** Tests must be comprehensive enough that reviewers trust them. If tests are sparse, reviewers feel obligated to verify manually. Comprehensive tests free reviewers from verification duty.

**Earlier design.** Processes must support design discussion before implementation. If the first design discussion happens at review time, review becomes design debate. Moving design earlier lets review focus on implementation fit.

**Cultural change.** Reviewers must accept that their job is judgment, not inspection. Some find this threatening: "Am I not supposed to catch bugs anymore?" The answer: "Your job is higher-value judgment. Tests catch bugs. You catch things tests can't."

## The Metrics Shift

Traditional review metrics mislead:

- "Lines reviewed" encourages rubber-stamping large PRs
- "Time in review" penalizes thorough review
- "Number of comments" encourages nitpicking

Better metrics for unbundled review:

- **Automation coverage.** What percentage of standards are enforced automatically?
- **Test confidence.** Do reviewers trust tests to catch bugs?
- **Design alignment.** Are design decisions made before implementation?
- **Judgment quality.** Are reviews catching issues that automation misses?

These metrics are harder to measure but more meaningful. They track whether review is doing what only humans can do.

## The Goal

Review should be:
- Fast (minutes, not days)
- Valuable (catching issues automation can't)
- Sustainable (volume that humans can handle)

Traditional bundled review achieves none of these at scale. Unbundled review achieves all of them.

The transformation isn't about reviewing less. It's about reviewing what matters.
