---
displayed_sidebar: fieldGuideSidebar
sidebar_position: 3
title: "NUMMI: Same Workers, Different System"
status: completed
source_type: external
source:
  authors: ["James Womack", "Daniel Jones", "Daniel Roos"]
  organization: "MIT International Motor Vehicle Program"
  year: 1990
  url: "https://www.lean.org/the-lean-post/articles/nummi-the-plant-that-changed-the-auto-industry/"
methods:
  - architecture/methods/emerging/system-over-individuals
---

import RelatedMethods from '@site/src/components/RelatedMethods';

# NUMMI: Same Workers, Different System

> **Source:** Womack, Jones & Roos (1990), MIT IMVP Study

The NUMMI (New United Motor Manufacturing, Inc.) plant transformation demonstrates that system design, not individual talent, determines outcomes. GM's worst-performing plant, with workers described as "the worst workforce in the automobile industry," became one of America's best after implementing the Toyota Production System - with 85%+ of the same employees.

## Context

**Environment:**
- Organization: NUMMI (GM/Toyota joint venture)
- Location: Fremont, California
- Timeline: 1984-2010 (26 years of operation)
- Total Production: ~8 million vehicles

**The Problem:**
In 1982, GM closed its Fremont Assembly plant - its worst-performing facility. Workers were described by UAW leadership as "the worst workforce in the automobile industry." The plant suffered from:
- Rampant absenteeism (often enough to prevent production line starts)
- Alcohol and marijuana use on the factory floor
- Sabotage (workers placed bottles inside door panels)
- Adversarial management-labor relations
- Defects routinely passed down the line for later repair

**The Opportunity:**
Toyota wanted to learn about American workers and suppliers. GM wanted to learn the Toyota Production System. A joint venture was born, reopening the Fremont plant in 1984.

## Hypothesis

> "If the same workers operate within a different system (Toyota Production System), then quality and productivity will dramatically improve because outcomes are determined by system design, not individual capability."

**Variables:**
- Independent: Production system (GM traditional → Toyota Production System)
- Dependent: Quality (defects per vehicle), productivity (assembly hours), worker satisfaction

**Critical Control:**
85%+ of the workforce were the **same employees** from the failed GM plant. This natural observation isolated system design as the variable.

## Approach

### The Transformation

**Phase 1: Training**
- Workers sent to Toyota's Takaoka plant in Japan
- Learned Toyota Production System firsthand
- Experienced the culture of continuous improvement

**Phase 2: System Implementation**
Key changes from GM's traditional approach:

| Aspect | GM (Before) | Toyota/NUMMI (After) |
|--------|-------------|---------------------|
| Defect handling | Pass defects down the line for later repair | Stop the line immediately (andon cord) |
| Worker voice | No input on process | Every worker can suggest improvements |
| Management style | Adversarial, hierarchical | Collaborative, equal treatment |
| Job security | Layoffs common | No-layoff policy |
| Physical symbols | Separate parking, cafeterias by rank | Same uniforms, parking, cafeterias for all |
| Decision-making | Top-down mandates | Consensus building |

### The Andon Cord

The most visible symbol of the transformation: any worker could pull a cord to stop the entire production line if they spotted a defect. In GM's old system, this would have been unthinkable - stopping the line cost money, and workers had no authority.

At NUMMI, stopping the line was encouraged. Problems were fixed at the source rather than passed downstream.

## Results

### Quantitative Results

| Metric | GM Fremont (Before) | NUMMI (After) |
|--------|---------------------|---------------|
| Quality (defects per 100 vehicles) | Among worst in GM | **Equal to Japan** |
| Absenteeism | Frequently production-stopping | Dramatically reduced |
| Worker grievances | Constant | Minimal |
| Production capability | Failed | 428,633 vehicles (2006 peak) |

### MIT International Motor Vehicle Program Comparison

The MIT study of global auto manufacturing confirmed NUMMI's results in context:

| Metric | Toyota/Lean Plants | Traditional Mass Production |
|--------|-------------------|----------------------------|
| Assembly hours per vehicle | 16.8 | 25.1 |
| Assembly defects per 100 vehicles | 60 | 130+ |
| Inventory (work in progress) | 2 hours | 2 weeks |

### Total NUMMI Output
- ~8 million vehicles produced over 26 years
- Toyota Corollas and Tacomas, Pontiac Vibes, Chevrolet Novas
- Quality consistently matched Japanese production

### What Happened to GM?

Despite sending managers to learn at NUMMI for over a decade, GM failed to implement lean manufacturing across its US plants:

- By 1998 (15 years later), GM still hadn't transformed other plants
- GM managers who trained at NUMMI succeeded in implementing lean in **Brazil** plants
- US organizational resistance prevented domestic adoption
- **GM filed for bankruptcy in 2009**

> "The resistance wasn't technical. It was cultural and organizational."

## Analysis

### What the Observation Establishes

1. **System > Individuals:** The same workers who produced GM's worst results produced some of America's best - when operating in a different system
2. **Culture is the system:** The Toyota Production System isn't just tools; it's beliefs, norms, and relationships
3. **Transfer is hard:** GM couldn't transfer the learning despite 15+ years of exposure
4. **Small batches work:** JIT, stopping the line, and immediate defect correction produced better outcomes than batch-and-queue

### Why GM Failed to Learn

The NUMMI observation created a natural control group: GM itself. Key barriers to learning:

1. **Middle management resistance:** Lean manufacturing threatens traditional supervisory roles
2. **Short-term thinking:** Stopping the line costs money today; quality saves money later
3. **Labor relations:** GM's adversarial history made collaboration feel risky
4. **Incentive structures:** GM managers weren't rewarded for quality improvements
5. **Not-invented-here:** Pride prevented adoption of "foreign" methods

### The Deepest Insight

> "It wasn't the workers. It was the system. Give those 'worst' workers a system designed for quality, respect, and continuous improvement, and they become among the best."

This is the foundational insight for FOE: optimize the system, not the individuals.

### FOE Insights

**Understanding:**
The Toyota Production System is fundamentally about making work visible and understandable. The andon cord, kanban boards, and standard work all serve to make the production process legible. When everyone can see and understand the system, everyone can improve it.

**Feedback:**
NUMMI's transformation centered on tightening feedback loops:
- **Immediate defect detection:** Stop the line when problems occur, not later
- **Continuous improvement:** Worker suggestions implemented quickly
- **Visual management:** Problems visible to everyone, not hidden in reports
- **Small batches:** 2 hours of inventory vs. 2 weeks means problems surface 168x faster

**Confidence:**
The system built confidence through:
- **No-layoff policy:** Workers could suggest improvements without fearing job loss
- **Authority to stop:** Workers trusted to make production decisions
- **Equal treatment:** No class distinctions between management and workers
- **Proven methods:** Standard work that had been validated

## Limitations

- **Single plant:** While dramatic, this is one factory
- **Selection effects:** Workers who returned may have been more motivated
- **Toyota involvement:** Toyota's direct management was crucial; results might differ with only knowledge transfer
- **Manufacturing vs. software:** Direct translation to software development requires interpretation
- **Historical context:** 1984-2010 represents different economic and labor conditions than today

### However...

The core finding - that system design determines outcomes more than individual talent - has been replicated across industries:

| Context | Finding |
|---------|---------|
| Healthcare (IHI) | System redesign reduces errors more than individual training |
| Aviation | Crew Resource Management (CRM) improves safety through team systems |
| Software (DORA) | High performers achieve results through capabilities, not hero individuals |

## Conclusion

### Verdict
**Strongly Supported** - The NUMMI observation provides compelling evidence that system design determines outcomes. The natural observation of same workers + different system isolates the key variable. The 26-year duration and ~8 million vehicles produced demonstrate sustainability.

### Key Learnings

1. **Blame the system, not the people:** When performance is poor, look at the system first
2. **Culture is part of the system:** Tools alone don't transform; beliefs, norms, and relationships must change too
3. **Feedback loops matter:** Small batches, immediate defect detection, and worker voice all tighten feedback
4. **Transfer is the hard part:** Knowing what works doesn't mean you can implement it

### Recommendation

**Apply this when:**
- Tempted to solve performance problems by replacing people
- Designing new teams or organizations
- Building the case for process improvement investment
- Facing resistance to change ("our people won't do that")

**Watch out for:**
- Assuming tools alone will transform outcomes
- Underestimating cultural and organizational resistance
- Ignoring the role of job security in enabling improvement suggestions
- Trying to implement lean without the underlying respect for workers

### FOE Application

NUMMI demonstrates the FOE thesis at industrial scale:

| FOE Principle | NUMMI Implementation |
|---------------|---------------------|
| Optimize for Understanding | Visual management, standard work, everyone understands the system |
| Optimize for Fast Feedback | Andon cord, 2-hour inventory, immediate defect correction |
| Optimize for Confidence | No-layoff policy, worker authority, equal treatment |

The lesson for software: stop asking "do we have the right people?" and start asking "do we have the right system?"

---

## References

- Womack, J., Jones, D., & Roos, D. (1990). *The Machine That Changed the World*. Free Press.
- Adler, P. S. (1992). The "Learning Bureaucracy": New United Motor Manufacturing, Inc. *Research in Organizational Behavior*.
- Spear, S. & Bowen, H. K. (1999). Decoding the DNA of the Toyota Production System. *Harvard Business Review*.
- This American Life, Episode 561: "NUMMI" (2015). [thisamericanlife.org](https://www.thisamericanlife.org/561/nummi-2015)
- Shook, J. (2010). How to Change a Culture: Lessons from NUMMI. *MIT Sloan Management Review*.

---

<RelatedMethods />
