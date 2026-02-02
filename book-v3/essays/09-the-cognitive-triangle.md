# The Cognitive Triangle

The three principles, Understanding, Fast Feedback, and Confidence, aren't a list. They're a system.

Remove any one and the others collapse.

```
           Understanding
              /    \
             /      \
            /        \
           /    ▲     \
          /     |      \
         /      |       \
        /       |        \
       Fast Feedback---Confidence
```

## Why They're Interdependent

**Understanding without Feedback** produces arrogance. You think you know, but you can't verify. Your mental models drift from reality without correction. You become confident in beliefs that are no longer true.

**Feedback without Understanding** produces noise. Data arrives, but you can't interpret it. Metrics move, but you don't know why. Alerts fire, but you can't diagnose the cause. You have information without meaning.

**Understanding and Feedback without Confidence** produces paralysis. You know what to do. Your evidence supports action. But you won't act because failure feels too risky. The knowledge and evidence sit unused while problems persist.

**Confidence without Understanding** produces recklessness. You act boldly without knowing what you're doing. Changes break things in ways you didn't predict. Your confidence is unjustified, but you don't know it until the damage is done.

**Confidence without Feedback** produces delusion. You believe things are working because nothing has proven otherwise. But nothing has proven otherwise because you're not checking. Your confidence is unfounded, built on absence of evidence rather than evidence of absence.

**Feedback and Confidence without Understanding** produces cargo-culting. You respond to signals without comprehending them. Green means go, red means stop, but you don't know why. When novel situations arise, you have no framework for interpretation.

The system works only when all three are present. Understanding enables interpretation of feedback. Feedback calibrates confidence. Confidence enables action. Action generates new feedback. Feedback improves understanding.

## The Virtuous Cycle

When all three principles are strong, they reinforce each other.

Understanding lets you design meaningful tests. Those tests provide relevant feedback. Relevant feedback builds justified confidence. Justified confidence enables bold action. Bold action reveals new information. New information deepens understanding.

The cycle accelerates. Teams with strong fundamentals get stronger. Each improvement enables further improvement.

Consider a team deploying a new feature:

1. **Understanding** lets them predict how the feature will interact with existing systems.
2. They write **tests** that verify their predictions (feedback infrastructure).
3. Tests pass, building **confidence** that the feature works as expected.
4. Confidence enables **deployment** without excessive delay.
5. Monitoring provides **feedback** on production behavior.
6. Feedback confirms or corrects their **understanding** of the feature.

Each step enables the next. Missing any step breaks the chain.

Apollo 13 shows the cycle under extreme pressure. Engineers understood exactly how CO2 would kill the astronauts and what could scrub it. Simulations gave immediate feedback on improvised solutions. Bounded constraints enabled action under time pressure. Each element enabled the others: understanding made feedback interpretable, feedback calibrated confidence, confidence enabled action. Remove any one and the astronauts die in space.

## The Vicious Cycle

When any principle is weak, the others weaken.

Without understanding, you can't design meaningful feedback. You measure what's easy to measure, not what matters. Feedback becomes noise.

With noisy feedback, confidence becomes uncalibrated. You don't know what you know. Caution increases without justification. Or boldness increases without justification.

With low confidence, action slows. Without action, nothing changes. Without change, there's nothing to learn from.

Without learning, understanding stagnates. The system you thought you understood has drifted. Your mental model is wrong but unchanged.

The cycle decelerates. Teams with weak fundamentals get weaker. Each degradation enables further degradation.

## Diagnosis by Triangle

When something is broken, the triangle helps diagnose what.

**Frequent unexpected failures** suggest weak understanding. The team can't predict what will happen because their mental models are wrong.

**Slow response to problems** suggests weak feedback. The team doesn't know something is wrong until long after it happened.

**Hesitation to act** suggests weak confidence. The team knows what to do but won't do it.

**Confident mistakes** suggest feedback without understanding. The team acts boldly but for wrong reasons.

**Analysis paralysis** suggests understanding without confidence. The team knows exactly what's happening and exactly what to do but won't do it.

**Random thrashing** suggests confidence without feedback or understanding. The team acts boldly and learns nothing.

The diagnosis points to the intervention. Weak understanding needs simpler systems and better observability. Weak feedback needs faster loops and better instrumentation. Weak confidence needs bounded risk and rollback capability.

## The Minimum Viable Triangle

You don't need perfection. You need enough of each principle to sustain the cycle.

**Minimum understanding:** Teams can predict the first-order effects of their changes. They know what their systems do, even if they don't understand every detail.

**Minimum feedback:** Changes produce observable results within hours, not days. Problems are detected before customers report them.

**Minimum confidence:** Teams can deploy changes without days of review. They can recover from failures without heroic intervention.

Below these minimums, the cycle breaks. Above them, the cycle sustains and improves itself.

Most organizations aren't below all three minimums. They're below one or two. The weak principle drags down the strong ones.

A team with excellent understanding but no feedback can't validate their understanding. A team with excellent feedback but no confidence can't act on what they learn. A team with excellent confidence but no understanding acts blindly.

Find the weakest principle. Strengthen it. The others will follow.

## The Doctrine in Practice

The three principles aren't rules to follow. They're lenses for decision-making.

When facing a choice, ask:

- Does this improve understanding or degrade it?
- Does this speed feedback or slow it?
- Does this increase confidence or undermine it?

A choice that improves one and degrades another is a tradeoff. Maybe justified, maybe not. A choice that improves all three is clearly good. A choice that degrades all three is clearly bad.

This framing simplifies complex decisions. You don't need to predict all consequences. You need to assess impact on three dimensions.

The cognitive triangle isn't a methodology. It's a mental model. A way of seeing delivery that reveals what matters and what doesn't.

When you see through this lens, the path becomes clearer.

Go faster by knowing more, not by caring less.

Know the system. Know whether changes work. Know the risk is bounded.

Then act.
