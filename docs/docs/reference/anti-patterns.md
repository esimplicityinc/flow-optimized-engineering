---
sidebar_position: 3
title: "Anti-Patterns"
---

# Anti-Patterns

FOE defines itself not just by what it advocates, but by what it explicitly rejects. This is the **Via Negativa** doctrine: sometimes the clearest path to understanding is through elimination.

These anti-patterns are not theoretical. They emerge repeatedly in organizations attempting transformation. Recognizing them early prevents wasted effort and organizational damage.

---

## Vibe Coding

### Definition

Writing code based on intuition, momentum, and optimism without systematic verification. "It seems to work" becomes the standard. Testing is sporadic. Reviews are cursory. The code ships because it feels ready.

### Symptoms

- "It works on my machine" as a common phrase
- Test coverage is unknown or unmeasured
- Manual testing before major releases
- Fear of refactoring because "we might break something"
- Production bugs that "should have been caught"
- Confidence based on developer seniority rather than evidence

### Why It's Harmful

Vibe coding is **gas without brakes**. You can move fast initially, but you cannot stop safely. Technical debt accumulates invisibly until it suddenly becomes visible—usually at the worst possible time.

More insidiously, vibe coding makes improvement impossible to verify. How do you know a change made things better if you weren't measuring before?

### How to Recognize It

Ask: "How do we know this works?" If the answer involves the words "should," "probably," or "the developer said," you're vibe coding.

### How to Address It

1. **Establish measurement first.** Before changing practices, establish baselines.
2. **Make verification automatic.** If it requires human discipline, it will erode.
3. **Define "done" explicitly.** Code isn't done when it's written; it's done when it's verified.
4. **Celebrate catches, not just completions.** A test that catches a bug is a win.

### FOE Alternative

[Disciplines](/docs/principles/overview) that make verification automatic and unavoidable. The pipeline enforces what humans forget.

---

## Heroic Engineering

### Definition

Relying on exceptional individual effort to achieve results that should come from systematic capability. The hero works late, knows the system intimately, and saves the day repeatedly. Everyone admires the hero. The system remains fragile.

### Symptoms

- Critical systems that only one person understands
- "Thank god Sarah was available" after incidents
- Burnout among top performers
- Knowledge hoarding (intentional or not)
- Velocity collapse when key people leave
- Celebration of overtime and weekend work

### Why It's Harmful

Heroic engineering is **local optimization at system cost**. The hero succeeds; the system fails to develop the capability that would make heroes unnecessary. Every rescue reinforces dependency on the rescuer.

Heroes also create selection pressure against sustainability. If heroism is rewarded, sustainable practices look like underperformance.

### How to Recognize It

Ask: "What happens when this person is unavailable?" If the answer is "we'd be in trouble," you're depending on heroism.

### How to Address It

1. **Document and automate hero knowledge.** If only one person knows it, it needs to become institutional knowledge.
2. **Rotate responsibilities.** No single point of failure for critical capabilities.
3. **Reward system improvement, not individual rescue.** Celebrate the person who made the system resilient, not just the one who fixed the outage.
4. **Make heroes unnecessary.** The goal is a system where ordinary effort produces extraordinary results.

### FOE Alternative

[Institutions](/docs/implementation/building-institutions) that encode expert knowledge into systems. The paved path embodies what the hero knows.

---

## Modernization Theater

### Definition

Adopting new technology without changing underlying practices. Lift-and-shift to the cloud while maintaining the same manual processes. Kubernetes clusters that deploy quarterly. CI/CD pipelines that no one trusts.

### Symptoms

- New tools, same results
- "We're on Kubernetes" but still doing manual deployments
- Cloud bills that increased without velocity improvement
- "DevOps team" that does Ops while Dev throws code over the wall
- Agile ceremonies without agile outcomes
- Modern architecture diagrams, legacy operational reality

### Why It's Harmful

Modernization theater is **expensive misdirection**. Organizations spend budget and political capital on "transformation" that changes nothing meaningful. Worse, it inoculates the organization against real change: "We tried cloud/DevOps/Agile and it didn't work."

The new technology often makes things worse because it adds complexity without removing old complexity. Now you maintain both the legacy system AND its modern wrapper.

### How to Recognize It

Ask: "What can we do now that we couldn't do before?" If the answer is vague or about technology rather than outcomes, it's theater.

### How to Address It

1. **Define outcomes first.** What should be true after transformation that isn't true now? Measure it.
2. **Change practices before platforms.** A good practice on bad technology beats a bad practice on good technology.
3. **Retire legacy, don't wrap it.** If old systems persist, transformation isn't complete.
4. **Measure capability, not adoption.** "We have Kubernetes" is not success. "We deploy daily with confidence" might be.

### FOE Alternative

[Phased implementation](/docs/transformation-model/overview) that ties technology adoption to practice change. Technology serves flow; flow isn't sacrificed for technology.

---

## Tool Worship

### Definition

Believing that the right tool will solve process and discipline problems. Shopping for solutions before understanding problems. Implementing platforms that no one uses effectively.

### Symptoms

- "We need a tool for that" as a default response
- Shelfware: licensed tools gathering dust
- Tool-centric roadmaps instead of outcome-centric roadmaps
- Constant tool switching without improvement
- Blame directed at tools rather than practices
- RFPs that specify features without specifying problems

### Why It's Harmful

Tool worship is **technology without discipline**. Tools are force multipliers—they multiply both good practices and bad ones. A powerful tool wielded poorly causes powerful damage.

Tool worship also displaces harder work. Buying a tool feels like progress. Changing practices feels like struggle. Organizations choose the path that feels like progress even when it isn't.

### How to Recognize It

Ask: "What problem does this tool solve, and why can't we solve it without a tool?" If the answer is unclear, you're worshipping.

### How to Address It

1. **Problem first, tool second.** Understand the problem deeply before evaluating solutions.
2. **Pilot with discipline.** Don't buy; borrow. Don't install; experiment.
3. **Measure tool effectiveness.** Did the tool actually solve the problem?
4. **Consider the simplest solution.** Sometimes a script beats a platform.

### FOE Alternative

[Technology as selection environment](/docs/reference/glossary#selection-environment). Tools are evaluated by whether they improve measurable outcomes, not by feature lists or market position.

---

## Velocity Theater

### Definition

Measuring and optimizing activity metrics (commits, story points, PRs merged) instead of outcome metrics (value delivered, problems solved, customer impact). Looking busy instead of being effective.

### Symptoms

- Celebrating commit counts
- Story points as performance measures
- "We closed 50 tickets this sprint" without asking if they mattered
- Velocity trending up while customer satisfaction trends down
- Small PRs gamed to inflate merge counts
- Work created to meet activity quotas

### Why It's Harmful

Velocity theater is **measuring commits instead of outcomes**. It's Goodhart's Law in action: when a measure becomes a target, it ceases to be a good measure.

Worse, velocity metrics are gameable. Developers learn to split work, inflate estimates, and create activity that looks productive. The metrics improve while actual capability stagnates or declines.

### How to Recognize It

Ask: "If we doubled this metric, would customers notice?" If not, it's a vanity metric.

### How to Address It

1. **Measure outcomes, not outputs.** Lead time for changes matters more than number of changes.
2. **Connect work to impact.** Every metric should link to customer or business value.
3. **Use lagging AND leading indicators.** Activity can be a leading indicator but shouldn't be the only measure.
4. **Ask "so what?"** For any metric, ask what changes if the number goes up or down.

### FOE Alternative

[DORA metrics](/docs/reference/glossary#dora-metrics) and outcome-focused measurement. Deployment frequency matters because it correlates with value delivery, not because deployments are inherently valuable.

---

## Certainty Theater

### Definition

Demanding or performing certainty that doesn't exist. Waterfall-style planning that pretends the future is predictable. Estimates treated as commitments. Risk registers that list everything except the risks that will actually occur.

### Symptoms

- "When will it be done?" answered with false precision
- Blame when estimates prove wrong
- Requirements "frozen" because change is inconvenient
- Risk management that's really risk documentation
- Surprises treated as failures rather than information
- Plans that never survive contact with reality but keep getting made

### Why It's Harmful

Certainty theater is **false confidence**. It creates illusion of control without actual control. Decisions made with false certainty are worse than decisions made with acknowledged uncertainty—because false certainty discourages adaptation.

Organizations that demand certainty train people to perform confidence rather than communicate reality. Bad news gets suppressed until it becomes catastrophic news.

### How to Recognize It

Ask: "What would change this estimate?" If the answer is "nothing," the estimate is theater.

### How to Address It

1. **Communicate in ranges.** "2-4 weeks" is more honest than "3 weeks."
2. **Update frequently.** Estimates should converge as work progresses.
3. **Reward accurate forecasting, not optimistic forecasting.** Accuracy requires saying uncomfortable things.
4. **Plan to learn, not just to execute.** Plans should include checkpoints where assumptions are tested.

### FOE Alternative

[Flow optimization](/docs/intro/what-is-foe) that acknowledges uncertainty and builds systems capable of adaptation. Confidence comes from capability to respond, not from predictions.

---

## Anti-Pattern Relationships

These anti-patterns often occur together and reinforce each other:

```
Certainty Theater
       ↓
   demands false precision, which encourages
       ↓
Velocity Theater
       ↓
   optimizes activity metrics, which rewards
       ↓
Vibe Coding
       ↓
   creates fragile systems, which require
       ↓
Heroic Engineering
       ↓
   creates key-person dependency, which blocks
       ↓
Real Improvement
       ↓
   so organizations try
       ↓
Tool Worship + Modernization Theater
       ↓
   which fails to address root causes, reinforcing
       ↓
Certainty Theater (demand for new "transformation")
```

Breaking the cycle requires addressing root causes—usually institutions and disciplines—rather than symptoms.

---

## Quick Reference

| Anti-Pattern | Core Problem | Key Question | FOE Alternative |
|--------------|--------------|--------------|-----------------|
| Vibe Coding | No verification | "How do we know this works?" | Automated disciplines |
| Heroic Engineering | Individual dependency | "What if they're unavailable?" | Institutional knowledge |
| Modernization Theater | Technology without practice change | "What can we do now that we couldn't before?" | Outcome-focused phases |
| Tool Worship | Tools over discipline | "What problem does this solve?" | Evidence-based selection |
| Velocity Theater | Activity over outcomes | "Would customers notice?" | Outcome metrics |
| Certainty Theater | False precision | "What would change this estimate?" | Flow with adaptation |

---

## See Also

- [Glossary](/docs/reference/glossary) - FOE term definitions
- [Key Metaphors](/docs/reference/key-metaphors) - FOE conceptual frameworks
- [Pattern Library](/docs/reference/pattern-library) - What to do instead
