# FOE Principles for Experiments

Flow Optimized Engineering is built on three core principles. Every experiment should be evaluated through these lenses.

## Principle 1: Optimize for Understanding

### What It Means
Engineers should be able to build accurate mental models of the systems they work with. Understanding reduces cognitive load and enables better decisions.

### Questions for Experiments

**Before the experiment:**
- What do we currently understand (or misunderstand) about this system?
- What mental model are we testing?

**After the experiment:**
- What did we learn about how this actually works?
- What assumptions were confirmed or challenged?
- If someone new joined the team, what would this teach them?

### Signs an Experiment Improves Understanding
- Reveals hidden dependencies or behaviors
- Clarifies cause-and-effect relationships
- Produces documentation or artifacts that help others learn
- Challenges folklore or assumptions

### Example
> "We hypothesized that database queries were slow because of missing indexes. The experiment revealed that 80% of slow queries were actually N+1 problems in our ORM layer. This changed our mental model of where to look for performance issues."

---

## Principle 2: Optimize for Fast Feedback

### What It Means
The faster you learn whether something worked, the faster you can adapt. Short feedback loops accelerate learning and reduce waste.

### Questions for Experiments

**Before the experiment:**
- What feedback loop are we trying to shorten?
- How long does it currently take to know if something is wrong?

**After the experiment:**
- How quickly could we detect problems with this approach?
- What information became available sooner?
- Did this create any new feedback mechanisms?

### Signs an Experiment Improves Feedback
- Reduces time between action and consequence
- Makes failures visible earlier
- Creates new signals or metrics
- Enables faster iteration

### Example
> "Before: We learned about broken functionality when QA found it 3 days later. After: Automated checks in the PR caught 70% of issues within minutes of pushing code."

---

## Principle 3: Optimize for Confidence

### What It Means
Teams should be able to make changes without fear. Confidence comes from knowing that if something breaks, you'll find out quickly and can recover easily.

### Questions for Experiments

**Before the experiment:**
- What risks are we trying to reduce?
- What currently makes us hesitant to change things?

**After the experiment:**
- How confident are you in these results?
- What would increase your confidence?
- What new risks did this reveal? What risks did it reduce?

### Signs an Experiment Improves Confidence
- Reduces fear of making changes
- Provides safety nets (rollback, monitoring)
- Makes it easier to try things
- Quantifies previously unknown risks

### Example
> "Before: Deployments required a 2-hour maintenance window because we weren't confident in rollback. After: Blue-green deployment lets us roll back in under 30 seconds, so we now deploy 4x per day."

---

## Connecting Principles to Evidence

When documenting an experiment, include a "FOE Insights" section that addresses:

```markdown
### FOE Insights

**Understanding:** 
[1-2 sentences on what this revealed about how things work]

**Feedback:** 
[1-2 sentences on how this affected feedback loops]

**Confidence:** 
[1-2 sentences on risks reduced or revealed]
```

Not every experiment will impact all three principles equally. Focus on what's most relevant.

---

## Anti-Patterns

### Understanding Anti-Pattern
"It works, but we don't know why." 
→ Dig deeper. Unexplained success is a risk.

### Feedback Anti-Pattern
"We'll know in 6 months if this helped."
→ Find leading indicators. What could you measure sooner?

### Confidence Anti-Pattern
"It's probably fine."
→ Quantify "probably." What's the actual risk? Can you reduce it?

---

## Using FOE Principles for Experiment Design

When designing a new experiment, use the principles proactively:

1. **What will this teach us?** (Understanding)
2. **How quickly will we know if it worked?** (Feedback)
3. **What could go wrong, and how will we recover?** (Confidence)

Experiments that address all three are more likely to produce valuable evidence.
