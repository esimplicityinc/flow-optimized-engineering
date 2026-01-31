# Chapter Source Mapping

This document maps each book chapter to its primary source documents from the FOE documentation site. Used by the book-chapter-writer agent to gather context.

---

## How to Use This Document

Each chapter entry contains:
- **Primary Sources**: Documents to read in full before writing
- **Reference Sources**: Documents to consult for specific details
- **Original Content**: Notes on content that must be created fresh (no direct source)
- **Metaphors**: Which metaphors are introduced or referenced
- **Agentic Callback**: Whether the chapter needs an "In the Agentic Context" section

---

## Prologue: The Agentic Moment

**Output File:** `book/manuscript/00-prologue/prologue.md`

**Primary Sources:**
- `docs/docs/transformation-model/phase-4-agentic-coding.md`
- `docs/docs/katalyst/agentic-coding.md`
- `docs/docs/research/agentic-trends/2026-01-25.md`

**Reference Sources:**
- `docs/docs/intro/central-thesis.md` (for thesis preview)
- `docs/docs/principles/overview.md` (for three principles preview)

**Original Content:**
- Meridian Software fictional scenario (excitement → cracks → diagnosis)
- Contrast company showing success
- Competitive window framing
- "Building an airplane while falling" metaphor

**Metaphors:**
- None introduced (prologue sets up but doesn't develop metaphors)

**Agentic Callback:** N/A (entire prologue is agentic context)

---

## Part I: The Speed Problem

### Chapter 1: The Speed Paradox

**Output File:** `book/manuscript/part-1-speed-problem/ch01-speed-paradox.md`

**Primary Sources:**
- `docs/docs/intro/foe-vs-alternatives.md` (four failure patterns)
- `docs/docs/intro/what-is-foe.md` (flow vs output distinction)

**Reference Sources:**
- `docs/docs/intro/why-foe-exists.md`

**Original Content:**
- Expanded treatment of four failure patterns
- Why each pattern emerges from reasonable assumptions

**Metaphors:**
- None introduced yet

**Agentic Callback:** No (Part I is pre-AI problem framing)

**Bridge Out:** "These patterns fail because they misunderstand the economics of software delivery..."

---

### Chapter 2: Why Speed Breaks at Scale

**Output File:** `book/manuscript/part-1-speed-problem/ch02-why-speed-breaks.md`

**Primary Sources:**
- `docs/docs/intro/why-foe-exists.md` (gauges metaphor, economics, evidence trail)

**Reference Sources:**
- `docs/docs/devx/overview.md` (latency concepts)

**Original Content:**
- Expanded economics argument
- Small batches reduce risk elaboration

**Metaphors:**
- **INTRODUCES: Gauges/Dashboard** - Race car with taped dashboard

**Agentic Callback:** Yes - "This was true at human speed. At machine speed, it's existential."

**Bridge Out:** "The economic argument is clear, but there's a deeper constraint: human cognition..."

---

### Chapter 3: The Cognitive Bottleneck

**Output File:** `book/manuscript/part-1-speed-problem/ch03-cognitive-bottleneck.md`

**Primary Sources:**
- `docs/docs/psychological-foundations/overview.md` (FOE as cognitive architecture)
- `docs/docs/psychological-foundations/sensemaking-under-complexity.md` (understanding breakdown)

**Reference Sources:**
- `docs/docs/psychological-foundations/learning-and-calibration.md`
- `docs/docs/psychological-foundations/agency-and-risk-tolerance.md`

**Original Content:**
- Working memory limits explanation
- "Just add more people" fails analysis
- FOE as cognitive architecture thesis statement

**Metaphors:**
- **INTRODUCES: Cockpit** - Pilots need instruments because human perception can't directly sense everything

**Agentic Callback:** Yes - "AI doesn't remove humans from the loop, it makes the loop faster than humans can think without help."

**Bridge Out:** "We've diagnosed the problem... What would a doctrine look like that actually optimizes for how humans think?"

---

## Part II: The Doctrine

### Chapter 4: The Central Thesis

**Output File:** `book/manuscript/part-2-doctrine/ch04-central-thesis.md`

**Primary Sources:**
- `docs/docs/intro/central-thesis.md` (core thesis, vibe coding, speed with coherence)

**Reference Sources:**
- `docs/docs/intro/what-is-foe.md` (doctrine definition)
- `docs/docs/principles/overview.md` (three principles preview)

**Original Content:**
- Expanded vibe coding examples
- Doctrine vs methodology vs framework distinction

**Metaphors:**
- References Gauges (from Ch 2)
- References Cockpit (from Ch 3)

**Agentic Callback:** No (thesis is universal)

**Bridge Out:** "Let's examine each principle in depth, starting with the foundation: understanding."

---

### Chapter 5: Optimize for Understanding

**Output File:** `book/manuscript/part-2-doctrine/ch05-optimize-understanding.md`

**Primary Sources:**
- `docs/docs/principles/optimize-for-understanding.md`
- `docs/docs/psychological-foundations/sensemaking-under-complexity.md`

**Reference Sources:**
- `docs/docs/devx/devx-for-understanding.md`

**Original Content:**
- What understanding actually means (ability to simulate)
- Training cost trap elaboration

**Metaphors:**
- **DEVELOPS: Cockpit** - Cognitive offloading elaboration (dashboards, alerts, tests, architecture)

**Agentic Callback:** Yes - "When AI generates code, understanding becomes even more critical..."

**Bridge Out:** "Understanding gives you a map. But a map is static... That's fast feedback."

---

### Chapter 6: Optimize for Fast Feedback

**Output File:** `book/manuscript/part-2-doctrine/ch06-optimize-fast-feedback.md`

**Primary Sources:**
- `docs/docs/principles/optimize-for-fast-feedback.md`
- `docs/docs/devx/devx-for-fast-feedback.md`

**Reference Sources:**
- `docs/docs/psychological-foundations/learning-and-calibration.md`

**Original Content:**
- Four questions developers need answered
- Latency equation elaboration
- Checks vs bureaucracy comparison table

**Metaphors:**
- References Gauges (feedback as gauge readings)

**Agentic Callback:** Yes - "When code is generated at machine speed, verification must also happen at machine speed."

**Bridge Out:** "Fast feedback tells you what's true. But knowing isn't the same as acting..."

---

### Chapter 7: Optimize for Confidence

**Output File:** `book/manuscript/part-2-doctrine/ch07-optimize-confidence.md`

**Primary Sources:**
- `docs/docs/principles/optimize-for-confidence.md`
- `docs/docs/devx/devx-for-confidence.md`

**Reference Sources:**
- `docs/docs/psychological-foundations/agency-and-risk-tolerance.md`
- `docs/docs/reference/key-metaphors.md` (operating envelope)

**Original Content:**
- Unbounded risk triggers freeze response
- Confidence as prerequisite for improvement paradox

**Metaphors:**
- **INTRODUCES: Operating Envelope** - Aviation boundaries of safe flight

**Agentic Callback:** Yes - "AI-generated changes need bounded blast radius..."

**Bridge Out:** "We've examined each principle individually. But they don't operate in isolation..."

---

### Chapter 8: The Cognitive Triangle

**Output File:** `book/manuscript/part-2-doctrine/ch08-cognitive-triangle.md`

**Primary Sources:**
- `docs/docs/principles/cognitive-triangle.md`

**Reference Sources:**
- Previous three principle chapters (synthesis)

**Original Content:**
- How degradation cascades between principles
- Triangle as diagnostic framework

**Metaphors:**
- Synthesizes all metaphors from Part II

**Agentic Callback:** No (synthesis chapter)

**Bridge Out:** "The doctrine is clear. But adopting it isn't a matter of intellectual agreement..."

---

## Part III: The Transformation

### Chapter 9: The Triad

**Output File:** `book/manuscript/part-3-transformation/ch09-the-triad.md`

**Primary Sources:**
- `docs/docs/triad/overview.md`

**Reference Sources:**
- None additional needed

**Original Content:**
- "Just add tools" failure mode elaboration
- Recognizing triad imbalance signs

**Metaphors:**
- None new

**Agentic Callback:** No

**Bridge Out:** "Let's examine each dimension, starting with the hardest: people."

---

### Chapter 10: People Changes

**Output File:** `book/manuscript/part-3-transformation/ch10-people-changes.md`

**Primary Sources:**
- `docs/docs/triad/people-changes.md`

**Reference Sources:**
- `docs/docs/psychological-foundations/overview.md` (cognitive context)

**Original Content:**
- Identity challenge elaboration
- Incentive alignment examples

**Metaphors:**
- None new

**Agentic Callback:** No

**Bridge Out:** "People can only change if processes support the new behaviors..."

---

### Chapter 11: Process Changes

**Output File:** `book/manuscript/part-3-transformation/ch11-process-changes.md`

**Primary Sources:**
- `docs/docs/triad/process-changes.md`

**Reference Sources:**
- `docs/docs/implementation/building-institutions.md` (institutions preview)

**Original Content:**
- CI to CD journey elaboration
- Process as encoded learning

**Metaphors:**
- None new

**Agentic Callback:** No

**Bridge Out:** "Processes require technology to operate at speed..."

---

### Chapter 12: Technology Changes

**Output File:** `book/manuscript/part-3-transformation/ch12-technology-changes.md`

**Primary Sources:**
- `docs/docs/triad/technology-changes.md`

**Reference Sources:**
- `docs/docs/reference/technology-reference.md`

**Original Content:**
- "Having vs practicing" distinction examples
- Technology selection principles

**Metaphors:**
- **REFERENCES: Pets vs Cattle** (mention only, full development elsewhere)

**Agentic Callback:** No

**Bridge Out:** "The triad must change together, but different stakeholders see the change differently..."

---

### Chapter 13: Coherence Across Levels

**Output File:** `book/manuscript/part-3-transformation/ch13-coherence-across-levels.md`

**Primary Sources:**
- `docs/docs/triad/coherence-across-levels.md`

**Reference Sources:**
- `docs/docs/stakeholder-guides/for-executives.md`
- `docs/docs/stakeholder-guides/for-engineering-leaders.md`
- `docs/docs/stakeholder-guides/for-engineers.md`

**Original Content:**
- Translation challenge examples
- What each audience needs to hear

**Metaphors:**
- None new

**Agentic Callback:** No

**Bridge Out:** "The triad gives us the dimensions of change. But how do we know where we are?"

---

## Part IV: The Journey

### Chapter 14: The Transformation Model

**Output File:** `book/manuscript/part-4-journey/ch14-transformation-model.md`

**Primary Sources:**
- `docs/docs/transformation-model/overview.md`

**Reference Sources:**
- `docs/docs/transformation-model/phase-0-on-prem.md`
- `docs/docs/transformation-model/phase-1-lift-and-shift.md`
- `docs/docs/transformation-model/phase-2-awkward-middle.md`
- `docs/docs/transformation-model/phase-3-cloud-native-infrastructure.md`

**Original Content:**
- Why phases can't be skipped elaboration
- Common failure patterns examples

**Metaphors:**
- **DEVELOPS: Pets vs Cattle** (in phase context)

**Agentic Callback:** Yes - briefly mention Phase 4-5

**Bridge Out:** "Of all the phases, one matters most: Phase 3 is where most organizations stall..."

---

### Chapter 15: Why Phase 3 is the Bottleneck

**Output File:** `book/manuscript/part-4-journey/ch15-phase-3-bottleneck.md`

**Primary Sources:**
- `docs/docs/transformation-model/why-phase-3-is-the-bottleneck.md`

**Reference Sources:**
- `docs/docs/transformation-model/phase-3-cloud-native-infrastructure.md`

**Original Content:**
- Heroic model analysis expansion
- Honest assessment questions

**Metaphors:**
- None new (references existing)

**Agentic Callback:** Yes - "Why skipping creates AI brittleness"

**Bridge Out:** "Phases describe capability evolution. But within any phase, organizations exhibit varying levels..."

---

### Chapter 16: The Maturity Model

**Output File:** `book/manuscript/part-4-journey/ch16-maturity-model.md`

**Primary Sources:**
- `docs/docs/maturity-model/overview.md`
- `docs/docs/maturity-model/using-the-model.md`

**Reference Sources:**
- `docs/docs/maturity-model/level-0-fragile.md`
- `docs/docs/maturity-model/level-1-visible.md`
- `docs/docs/maturity-model/level-2-repeatable.md`
- `docs/docs/maturity-model/level-3-flowing.md`
- `docs/docs/maturity-model/level-4-adaptive.md`

**Original Content:**
- Maturity = predictability not sophistication elaboration
- Why levels exist within phases

**Metaphors:**
- None new

**Agentic Callback:** No

**Bridge Out:** "Maps show where you are. But transformation is a journey through time..."

---

### Chapter 17: The J-Curve

**Output File:** `book/manuscript/part-4-journey/ch17-j-curve.md`

**Primary Sources:**
- None (limited direct source material)

**Reference Sources:**
- `docs/docs/implementation/getting-started.md` (timeline hints)
- `docs/docs/implementation/common-pitfalls.md` (failure in dip)

**Original Content:** (Mostly original)
- J-curve pattern explanation
- Why the dip happens
- 12-18 month timeline rationale
- Maintaining confidence through the dip
- Why organizations fail in the dip

**Metaphors:**
- **INTRODUCES: J-Curve** (new metaphor for transformation)

**Agentic Callback:** No

**Bridge Out:** "We've mapped the territory. Now let's build the path..."

**NOTE:** This chapter has limited source material. May need to add content to website later.

---

## Part V: The Implementation

### Chapter 18: Building Institutions

**Output File:** `book/manuscript/part-5-implementation/ch18-building-institutions.md`

**Primary Sources:**
- `docs/docs/implementation/building-institutions.md`

**Reference Sources:**
- None additional needed (source is comprehensive)

**Original Content:**
- Institution anatomy diagram explanation
- Sustaining institutions under pressure

**Metaphors:**
- None new

**Agentic Callback:** No

**Bridge Out:** "Institutions create the structure. But teams need guidance for situations institutions don't cover..."

---

### Chapter 19: The Playbook

**Output File:** `book/manuscript/part-5-implementation/ch19-playbook.md`

**Primary Sources:**
- `docs/docs/playbook/overview.md`
- `docs/docs/playbook/how-we-think-about-speed.md`
- `docs/docs/playbook/how-work-moves.md`
- `docs/docs/playbook/how-we-manage-risk.md`
- `docs/docs/playbook/how-we-decide.md`
- `docs/docs/playbook/how-we-learn.md`

**Reference Sources:**
- None additional needed

**Original Content:**
- Synthesis and condensation of playbook pages
- Playbook philosophy framing

**Metaphors:**
- References existing metaphors

**Agentic Callback:** No

**Bridge Out:** "The playbook guides behavior. But behavior depends on environment..."

---

### Chapter 20: Developer Experience as Operating System

**Output File:** `book/manuscript/part-5-implementation/ch20-devx-as-os.md`

**Primary Sources:**
- `docs/docs/devx/overview.md`
- `docs/docs/devx/devx-for-understanding.md`
- `docs/docs/devx/devx-for-fast-feedback.md`
- `docs/docs/devx/devx-for-confidence.md`

**Reference Sources:**
- `docs/docs/devx/devx-maturity-model.md`

**Original Content:**
- DevX as requirement not luxury framing
- Designed vs discovered DevX examples

**Metaphors:**
- References Cockpit (DevX as cockpit)

**Agentic Callback:** No

**Bridge Out:** "Good DevX produces good outcomes. But how do we know?"

---

### Chapter 21: Metrics That Matter

**Output File:** `book/manuscript/part-5-implementation/ch21-metrics.md`

**Primary Sources:**
- `docs/docs/implementation/metrics-that-matter.md`

**Reference Sources:**
- `docs/docs/reference/glossary.md` (DORA metrics definitions)

**Original Content:**
- Why metrics go wrong examples
- Metrics that drive automation

**Metaphors:**
- **REFERENCES: Gauges** (metrics as gauges)

**Agentic Callback:** No

**Bridge Out:** "Metrics tell you where you are. But knowing the pitfalls tells you where not to go..."

---

### Chapter 22: Common Pitfalls

**Output File:** `book/manuscript/part-5-implementation/ch22-common-pitfalls.md`

**Primary Sources:**
- `docs/docs/implementation/common-pitfalls.md`

**Reference Sources:**
- `docs/docs/reference/anti-patterns.md`

**Original Content:**
- Expanded examples for each pitfall
- How to recognize when you're in a pitfall

**Metaphors:**
- None new

**Agentic Callback:** No

**Bridge Out:** "We've covered what to do and what to avoid. The doctrine is complete. But where does it lead?"

---

## Part VI: The Agentic Future

### Chapter 23: The New Economics of Code

**Output File:** `book/manuscript/part-6-agentic-future/ch23-new-economics.md`

**Primary Sources:**
- `docs/docs/transformation-model/phase-4-agentic-coding.md`

**Reference Sources:**
- `docs/docs/katalyst/agentic-coding.md`
- `docs/docs/research/agentic-trends/2026-01-25.md`

**Original Content:**
- Code abundance analysis
- New scarcities framework
- Value shift analysis

**Metaphors:**
- None new

**Agentic Callback:** N/A (entire chapter is agentic)

**Bridge Out:** "The economics have shifted. How do organizations actually operate in this new environment?"

---

### Chapter 24: Governing Machine-Speed Delivery

**Output File:** `book/manuscript/part-6-agentic-future/ch24-governing-machine-speed.md`

**Primary Sources:**
- `docs/docs/transformation-model/phase-5-cloud-native-code.md`

**Reference Sources:**
- `docs/docs/transformation-model/phase-4-agentic-coding.md`
- `docs/docs/implementation/building-institutions.md` (institutions at scale)

**Original Content:**
- Why Phase 3 disciplines are prerequisites (connects back to Ch 15)
- How institutions scale to AI-generated code
- Policy as code becomes mandatory
- The verification challenge

**Metaphors:**
- References Operating Envelope (at machine speed)

**Agentic Callback:** N/A (entire chapter is agentic)

**Bridge Out:** "Governing machine-speed delivery is possible. But where does it lead?"

---

### Chapter 25: Cloud Native Code

**Output File:** `book/manuscript/part-6-agentic-future/ch25-cloud-native-code.md`

**Primary Sources:**
- `docs/docs/transformation-model/phase-5-cloud-native-code.md`

**Reference Sources:**
- `docs/docs/transformation-model/phase-3-cloud-native-infrastructure.md` (mirror pattern)

**Original Content:** (Mostly original)
- The mirror pattern analysis
- Characteristics of cloud native code
- How AI enables this (not threatens it)
- The convergence vision

**Metaphors:**
- **DEVELOPS: Pets vs Cattle** (applied to code)

**Agentic Callback:** N/A (entire chapter is agentic)

**Bridge Out:** "The systems are in place. The code is governed. But one question remains: what do humans do?"

**NOTE:** This chapter has limited source material. May need to add content to website later.

---

### Chapter 26: Humans in the Loop

**Output File:** `book/manuscript/part-6-agentic-future/ch26-humans-in-loop.md`

**Primary Sources:**
- None (mostly original content)

**Reference Sources:**
- `docs/docs/psychological-foundations/overview.md` (humans as bottleneck, reframed positively)
- `docs/docs/principles/overview.md` (cognitive support)

**Original Content:** (Mostly original)
- What humans still provide (judgment, ethics, accountability, intent)
- FOE preserves human agency
- The new human roles
- The optimistic vision

**Metaphors:**
- **SYNTHESIZES: Cockpit** (humans as pilots with better instruments)

**Agentic Callback:** N/A (entire chapter is agentic)

**Bridge Out:** "We've traveled from crisis to capability..."

**NOTE:** This chapter has limited source material. May need to add content to website later.

---

## Conclusion: The Living Doctrine

**Output File:** `book/manuscript/07-conclusion/conclusion.md`

**Primary Sources:**
- `docs/docs/field-guides/overview.md` (living knowledge system)

**Reference Sources:**
- `docs/docs/field-guides/contributing-observations.md`

**Original Content:**
- Summary of complete argument
- Doctrine evolution concept
- Professional knowledge accumulation
- The invitation

**Metaphors:**
- Final synthesis of all metaphors

**Agentic Callback:** Final agentic framing

---

## Appendices

### Appendix A: Glossary

**Output File:** `book/manuscript/08-appendices/appendix-a-glossary.md`

**Primary Sources:**
- `docs/docs/reference/glossary.md`

**Original Content:**
- Alphabetize and expand for book format

---

### Appendix B: Key Metaphors Reference

**Output File:** `book/manuscript/08-appendices/appendix-b-metaphors.md`

**Primary Sources:**
- `docs/docs/reference/key-metaphors.md`

**Original Content:**
- Quick reference format with mapping tables

---

### Appendix C: Anti-Patterns (Via Negativa)

**Output File:** `book/manuscript/08-appendices/appendix-c-anti-patterns.md`

**Primary Sources:**
- `docs/docs/reference/anti-patterns.md`

**Original Content:**
- Expand explanations for book format

---

### Appendix D: Self-Assessment Tools

**Output File:** `book/manuscript/08-appendices/appendix-d-self-assessment.md`

**Primary Sources:**
- `docs/docs/maturity-model/self-assessment.md`
- `docs/docs/implementation/assessing-your-phase.md`

**Original Content:**
- Worksheet formats for phase and maturity assessment

---

### Appendix E: Three Principles Quick Reference

**Output File:** `book/manuscript/08-appendices/appendix-e-principles-reference.md`

**Primary Sources:**
- `docs/docs/principles/overview.md`
- `docs/docs/principles/optimize-for-understanding.md`
- `docs/docs/principles/optimize-for-fast-feedback.md`
- `docs/docs/principles/optimize-for-confidence.md`

**Original Content:**
- Single-page summaries for quick reference

---

## Chapters with Limited Source Material

The following chapters have limited direct source documentation and may require adding content to the website:

| Chapter | Gap | Priority |
|---------|-----|----------|
| Ch 17: The J-Curve | No dedicated J-curve doc | Medium |
| Ch 25: Cloud Native Code | Phase 5 doc is thin | High |
| Ch 26: Humans in the Loop | No dedicated doc | High |

Track these in `book/WRITING-TODOS.md` for follow-up.
