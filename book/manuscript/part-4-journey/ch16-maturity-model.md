---
chapter: 16
title: "The Maturity Model"
part: "IV"
status: draft
word_count: 4523
---

# The Maturity Model

Phases describe what capabilities you have. Maturity describes how well you use them.

An organization can be Phase 3 on paper—cloud-native infrastructure, declarative operations, policy as code—while operating like Phase 1 in practice. The tools exist. The dashboards exist. The automation exists. And yet every deployment feels like a gamble. Every change requires the one engineer who "knows how this works." Every incident triggers a scramble to figure out what actually happened.

This is the gap between having capabilities and operating with discipline. The maturity model addresses this gap. It provides a shared language for describing not what tools you have, but how predictably you deliver.

## The Five Levels

| Level | Name | Theme |
|-------|------|-------|
| **0** | Fragile | "We find out late" |
| **1** | Visible | "We can see what's happening" |
| **2** | Repeatable | "We can change things safely" |
| **3** | Flowing | "The system teaches us as we use it" |
| **4** | Adaptive | "We can absorb change without destabilizing" |

These levels describe a progression from reactive chaos toward proactive stability. Each level builds on the previous. You can't flow (Level 3) if you can't repeat (Level 2). You can't repeat if you can't see (Level 1). You can't see if everything is fragile (Level 0).

### Level 0: Fragile

At Level 0, delivery outcomes are unpredictable. Problems surface at milestones rather than during development. Knowledge lives in people's heads. Confidence depends entirely on who's in the room.

The defining experience: you find out late. The project is "on track" until suddenly it isn't. The deployment "should work" until it doesn't. The system "handles that case" until it fails in production.

**What executives experience:**
- Delivery timelines are unreliable; estimates rarely match reality
- Risk surfaces at milestones, not during work
- "Green" status can flip to "red" without warning
- Confidence depends on specific individuals being present

**What engineers experience:**
- Tribal knowledge dominates; critical information isn't written down
- Changes are scary because consequences are unclear
- Debugging is forensic: finding problems means reconstructing history
- New team members take months to become productive

**What reviewers experience:**
- Assurance comes from documents, not evidence
- Late surprises are common at delivery reviews
- Questions about system behavior require research to answer

The key smell: "Don't touch that—only Alex knows how it works." When knowledge is locked inside individuals, every change becomes a negotiation with the knowledge holder. The system can't teach you anything because the system isn't the source of truth. People are.

### Level 1: Visible

At Level 1, basic observability exists. Work is traceable after the fact. Teams can explain what happened, though not always why. The improvement from Level 0 is significant: you're no longer operating blind.

The defining experience: you can see what's happening. Maybe not in real-time. Maybe not comprehensively. But when something goes wrong, you can investigate. When someone asks a question, you can find an answer. The information exists, even if getting to it takes effort.

**What executives experience:**
- Status can be determined, though it requires effort
- Problems are still discovered late, but at least they're explainable
- Some metrics exist, though they may not tell a complete story

**What engineers experience:**
- Logs and basic monitoring help with debugging
- New team members can find some documentation to get started
- There's a difference between "we don't know" and "we can find out"

**What reviewers experience:**
- Evidence exists, though it may require assembly
- Audit trails are available but may be incomplete
- Risk is more observable, even if not yet actively managed

The key smell: "We can explain it, but it takes a meeting." When understanding requires synchronous conversation, you have visibility but not accessibility. The information exists. Getting to it has friction.

### Level 2: Repeatable

At Level 2, teams have established patterns that work. Changes follow known paths. Evidence is generated automatically. This is where structured delivery discipline starts to appear.

The defining experience: you can change things safely. Not everything. Not without thought. But for routine work, there's a process that works. People follow it. Results are predictable.

**What executives experience:**
- Routine delivery is predictable
- Risk is visible earlier in the process
- Surprises still happen, but they're less frequent
- Status is available without special effort

**What engineers experience:**
- Common changes follow well-understood paths
- CI/CD pipelines catch problems before deployment
- Code review processes are consistent
- Documentation is generated as part of the process

**What reviewers experience:**
- Evidence is available without special preparation
- Compliance can be demonstrated through system outputs
- Reviews focus on exceptions rather than baseline proof

The key smell: "We've done this before, and we know how it behaves." When teams can predict outcomes based on experience, and that experience is encoded in process, you've achieved repeatability. The system has memory.

### Level 3: Flowing

At Level 3, feedback loops are short and trusted. Risk surfaces continuously, not at checkpoints. Documentation and evidence emerge as natural byproducts of work. This is Flow Optimized Engineering in practice.

The defining experience: the system teaches you as you use it. Problems surface immediately. Documentation stays current automatically. Understanding improves through operation rather than separate learning efforts.

**What executives experience:**
- Delivery is predictable even for novel work
- Risk is visible continuously, not at reviews
- Questions can be answered from system data
- Surprises are rare and quickly understood

**What engineers experience:**
- The system catches problems faster than humans could
- Learning happens through feedback, not archaeology
- Changes are safe because consequences are visible
- New patterns emerge from observing what works

**What reviewers experience:**
- Evidence is continuous and comprehensive
- Assurance comes from system behavior, not documents
- Reviews confirm what's already visible

The key smell: "We know we're safe because we can see it." When safety is visible rather than assumed, when the system provides continuous assurance through its own operation, you've achieved flow. Evidence is not an artifact. It's a constant.

At Level 3, the three optimizations create a reinforcing loop:

1. **Understanding** enables better feedback mechanisms
2. **Fast Feedback** builds justified confidence
3. **Confidence** allows deeper understanding through safe exploration

This isn't a destination. It's an operating mode that requires maintenance. Level 3 represents Flow Optimized Engineering fully realized—but it doesn't maintain itself. Drift toward lower levels is always possible if the practices that created flow are abandoned.

### Level 4: Adaptive

At Level 4, the organization can handle significant change—new tools, new requirements, new scale—without losing the benefits of previous levels. The system actively resists drift and maintains its properties under stress.

The defining experience: you can absorb change without destabilizing. Strategic pivots don't break delivery. New team members don't create fragility. Scale increases don't compromise visibility.

**What executives experience:**
- Strategic pivots don't destabilize delivery
- New capabilities integrate without disruption
- Confidence persists through organizational change

**What engineers experience:**
- New tools enhance rather than disrupt workflows
- The system self-corrects before humans notice problems
- Experimentation is safe because feedback is immediate

**What reviewers experience:**
- Assurance scales with the system automatically
- New requirements integrate into existing evidence streams
- Oversight becomes confirmation, not investigation

The key smell: "We can change direction without losing control." When strategic shifts are absorbed by the system rather than requiring heroic effort, when adaptation is a capability rather than a crisis, you've achieved adaptive maturity.

Most organizations don't need Level 4. Most shouldn't aim for it directly. Level 4 emerges from sustained Level 3 operation plus intentional capability building. It's a recognition that you've built something genuinely resilient, not a target to pursue.

### Movement Between Levels

How do you know when you're moving?

**Moving beyond Level 0:** Someone can explain the deployment process without being the person who does it. Basic metrics exist, even if they're not comprehensive. Work items are tracked somewhere visible. At least some knowledge has been written down.

**Moving beyond Level 1:** Explanations don't require the person who did the work. Feedback starts arriving before work is "done." Patterns become recognizable across different changes. Teams start saying "we've seen this before."

**Moving beyond Level 2:** Feedback loops tighten to near-continuous. Evidence becomes a byproduct, not an output. Novel changes become less scary because the system helps. Teams trust the system, not just the process.

**Moving beyond Level 3:** The system starts adapting to change without manual adjustment. Policies and controls scale automatically. New tools integrate without disrupting flow. Volatility becomes manageable rather than threatening.

## The Key Rule

Here's the insight that changes everything:

**Maturity is about predictability of outcomes, not sophistication of tooling.**

An organization with simple tools and predictable delivery is more mature than one with advanced automation and constant surprises. The team using bash scripts that always work is more mature than the team using Kubernetes that breaks unpredictably.

This matters because organizations often conflate tool adoption with maturity. They deploy Terraform and claim Infrastructure as Code. They install Kubernetes and claim cloud-native. They purchase observability platforms and claim visibility. But the tools are inputs. Maturity is output.

| Maturity Signal | Not a Maturity Signal |
|-----------------|----------------------|
| Deployments consistently succeed | Deployment pipeline exists |
| Teams can explain system behavior | Documentation exists |
| Problems surface before production | Monitoring tools installed |
| New team members productive quickly | Onboarding checklist exists |
| Changes don't cause surprises | Test suite exists |

The first column describes outcomes. The second describes inputs. You can have all the inputs and none of the outcomes. That's not maturity. That's tool collection.

This is why two organizations with identical tooling can have vastly different maturity. One uses the tools as intended, generates predictable outcomes, and improves continuously. The other has the tools but operates around them, generates unpredictable outcomes, and stays stuck.

## Evaluation Across Three Optimizations

Each maturity level is assessed across the three FOE optimizations. A team might be at different levels for different optimizations. That's normal, and useful information.

| Optimization | What It Measures |
|--------------|------------------|
| **Understanding** | How well do people know what the system does and why? |
| **Fast Feedback** | How quickly does the system reveal problems? |
| **Confidence** | How reliably can teams make decisions and take action? |

### Understanding by Level

| Level | Understanding State |
|-------|---------------------|
| **0: Fragile** | Fragmented, person-dependent. Knowledge exists but isn't shared. Understanding disappears when people leave. |
| **1: Visible** | Recoverable but fragile. Knowledge can be reconstructed, but it takes effort. Documentation exists but may be out of date. |
| **2: Repeatable** | Shared, documented, current. Knowledge is captured in systems, not just people. Documentation is updated as part of work. |
| **3: Flowing** | High and self-renewing. Knowledge is generated by the system. Documentation stays current automatically. |
| **4: Adaptive** | Maintained despite scale. Growth doesn't fragment knowledge. Understanding survives personnel changes. |

### Fast Feedback by Level

| Level | Feedback State |
|-------|----------------|
| **0: Fragile** | Slow, manual, end-loaded. Problems are discovered late. Testing happens at the end. Feedback requires human effort to gather. |
| **1: Visible** | Exists but slow. Feedback loops exist but aren't fast. You learn about problems eventually. Detection is often manual. |
| **2: Repeatable** | Early and actionable. Problems surface during development, not after. Feedback loops are short enough to be useful. |
| **3: Flowing** | Continuous. Feedback is constant, not episodic. Problems surface immediately. The system reveals its own state. |
| **4: Adaptive** | Machine-speed. Feedback loops are faster than human reaction time. Problems are detected and often resolved automatically. |

### Confidence by Level

| Level | Confidence State |
|-------|------------------|
| **0: Fragile** | Low; decisions avoided or escalated. Teams hesitate to make changes. Risk is managed by not acting. |
| **1: Visible** | Conditional. Teams can act with confidence in familiar territory. New situations still create hesitation. |
| **2: Repeatable** | High for routine change. Teams trust the process for familiar work. Decisions are made without escalation. |
| **3: Flowing** | Systemic, not personal. Confidence comes from evidence, not individuals. Trust is in the system, not just the team. |
| **4: Adaptive** | Durable under volatility. Confidence persists through change. New situations don't trigger defensive slowdowns. |

### Using the Breakdown

When you assess your organization, map each optimization separately. The result might look like:

- Understanding: Level 2 (good documentation practices)
- Fast Feedback: Level 1 (monitoring exists but feedback is slow)
- Confidence: Level 1 (teams still hesitate on non-routine changes)

This tells you where friction exists and where investment would have the most impact. In this example, the bottleneck is feedback speed. Documentation is good, but the team doesn't find out about problems fast enough to build confidence.

Different patterns require different interventions:

| Pattern | Interpretation | Intervention Focus |
|---------|---------------|-------------------|
| Understanding low, others higher | Knowledge isn't captured | Documentation, knowledge management |
| Fast Feedback low, others higher | Problems discovered late | Observability, testing, monitoring |
| Confidence low, others higher | Teams won't act | Rollback capability, blast radius limits |
| All low | Foundation gaps | Start with visibility |
| All high but inconsistent | Uneven adoption | Standardization, platform investment |

## Why Levels Exist Within Phases

The transformation model describes six phases of capability evolution. The maturity model describes five levels of operational excellence. These are independent dimensions.

**Phase = capability type.** What can you do? What tools and patterns are available?

**Level = capability depth.** How well do you do it? How predictably do outcomes match expectations?

You can be Phase 3 at Level 1—new to cloud-native, with the right patterns but not yet executing them reliably. You can be Phase 1 at Level 3—classic lift-and-shift architecture but operating it with high predictability and strong feedback loops.

| Example | Phase | Level | Description |
|---------|-------|-------|-------------|
| Team A | Phase 3 | Level 1 | Has Kubernetes, GitOps, declarative infrastructure. Deployments are unpredictable. Knowledge is tribal. |
| Team B | Phase 1 | Level 3 | Lift-and-shift VMs, manual operations. Highly predictable. Everyone knows how it works. Problems surface early. |
| Team C | Phase 3 | Level 3 | Cloud-native patterns operating with high maturity. Flow state achieved. |

Which team would you rather inherit?

Team B, despite "older" technology, operates more maturely than Team A. They deliver predictably. They understand their system. They have confidence. Team A has better tools but worse outcomes.

This is why maturity matters independently of phase. The goal isn't to be Phase 5 at any cost. The goal is to be at whatever phase you need, operating at the highest sustainable level.

### The Interaction

Phase and level do interact. Higher phases create more leverage for higher levels—cloud-native patterns make it easier to achieve continuous feedback, for instance. But they also create more ways to fail—more tools, more complexity, more opportunity for inconsistency.

The safest path: reach Level 2 at your current phase before advancing to the next phase. Level 2 means repeatable, predictable operations. Without that foundation, advancing to a more complex phase multiplies risk rather than capability.

Organizations that skip to Phase 4 (agentic coding) while operating at Level 0 (fragile) create systems that accumulate technical debt faster than anyone can manage, drift in ways nobody understands, and fail in ways that can't be diagnosed. The sophisticated tools accelerate the chaos rather than containing it.

### A Practical Example

Consider two organizations adopting Kubernetes.

**Organization A** jumps straight to Phase 3 tooling. They deploy Kubernetes, ArgoCD, and a service mesh. They have all the cloud-native components. But their team lacks experience with declarative operations. Knowledge about how the system works lives in one engineer's head. When something goes wrong, they don't know how to investigate. Deployments are nerve-wracking events that require heroes.

They're Phase 3 on paper. They're Level 0 in practice. The gap creates constant friction.

**Organization B** takes a different path. They start with simpler infrastructure—maybe just VMs with good automation. They invest in documentation, monitoring, and incident response practices. Everyone on the team can explain how deployments work. Problems surface early through alerts and dashboards. Deployments happen routinely without drama.

They're Phase 1 or Phase 2 on paper. They're Level 2 or Level 3 in practice. When they eventually adopt Kubernetes, they'll bring their operational discipline with them. The transition will be smoother because the foundations are solid.

The lesson: maturity travels with you. Build it at whatever phase you're in. Don't wait for "modern" tooling to start operating well.

## Using the Model Honestly

The maturity model is valuable only when used honestly. The moment levels become targets, they stop being useful. The moment assessment becomes defensive, it stops being accurate.

### Diagnostic, Not Judgmental

The model describes what is, not what should be. Level 1 isn't "bad." Level 4 isn't "good." They're descriptions of how delivery actually behaves.

Some contexts warrant Level 2 as the right operating point. A stable system with low change frequency doesn't need Level 4 adaptability. A small team with tight communication doesn't need Level 3 self-documenting systems—they can just talk to each other.

The question isn't "how do we get to Level 4?" The question is "what level does our context require, and are we operating there?"

### Behavioral, Not Tool-Based

The model looks at outcomes, not implementations. It doesn't ask "do you have Kubernetes?" It asks "do problems surface before production?" It doesn't ask "do you have observability tools?" It asks "how quickly do you learn about issues?"

This matters because tool-based assessment enables gaming. Teams can acquire tools without using them effectively. They can check boxes without changing behavior. Behavioral assessment is harder to fake. Either problems surface early or they don't. Either deployments are predictable or they aren't.

| Tool-Based Question | Behavioral Question |
|--------------------|---------------------|
| Do you have automated testing? | When was the last time tests caught a bug before production? |
| Do you have monitoring? | How long does it take to detect a production issue? |
| Do you have documentation? | Can three different people give the same explanation of how this works? |
| Do you have CI/CD? | What percentage of deployments require human intervention? |
| Do you have rollback capability? | When was the last time you actually rolled back? |

The behavioral questions reveal actual state. The tool-based questions reveal only intention.

### Never a Compliance Instrument

The model should never be used as:
- A compliance checklist
- A performance evaluation tool
- A contract requirement
- A mandate from leadership

These uses transform a diagnostic tool into a compliance burden. Teams start optimizing for the measurement rather than the underlying capability. They game the assessment. They claim levels they haven't earned. They stop having honest conversations about where they actually are.

The most dangerous misuse: putting level targets in contracts. "Contractor must achieve Level 3 maturity by Q4." This creates perverse incentives. The contractor focuses on demonstrating Level 3, not operating at Level 3. Evidence is assembled to satisfy reviewers, not to reveal actual state. Everyone pretends, and nobody improves.

### Goal: Honest Assessment, Not High Scores

The value of the model is in honest conversation about how delivery actually works. This requires psychological safety. People need to describe reality without fear of punishment.

If your organization can't have honest conversations about maturity, that's important information. It suggests Level 0 or Level 1 operation regardless of what the tooling looks like.

The real test: Can you describe your current state accurately to someone outside the team without feeling defensive?

That's the maturity that matters.

## Questions That Reveal Actual State

Instead of asking "what level are we?"—which turns the model into a scorecard—ask questions that reveal actual behavior:

| Instead of... | Ask... |
|--------------|--------|
| "What level are we?" | "Where do we find out about risk?" |
| "Are we Level 3 yet?" | "How hard is it to explain a change?" |
| "How do we get to Level 4?" | "What happens when someone leaves?" |
| "What's our maturity score?" | "When was the last surprise?" |

These questions surface real information.

**For Understanding:** "If I asked three different people how this works, would I get the same answer?"

**For Fast Feedback:** "When was the last time we found a problem before it reached production?"

**For Confidence:** "What changes would the team refuse to make on a Friday afternoon?"

The answers reveal where you actually are. The Friday question is particularly diagnostic. A team at Level 3 deploys on Friday without concern—the feedback loops are fast enough, the rollback is automatic enough, the blast radius is bounded enough. A team at Level 1 avoids Friday deployments because they expect problems and don't trust recovery. Their behavior reveals their actual maturity, regardless of what their tools suggest.

## Movement Over Position

Progress isn't about climbing levels. It's about behavioral change.

| Progress Indicator | What It Means |
|--------------------|---------------|
| Less surprise | Problems surface earlier |
| Shorter explanations | Understanding is more accessible |
| Earlier detection | Feedback loops are tightening |
| Fewer escalations | Confidence is increasing |
| Faster onboarding | Knowledge is externalized |

An organization that moves from Level 0 to Level 1 has made more meaningful progress than one that claims Level 3 but can't explain how their deployments work.

This is counterintuitive. We're trained to value high scores. But a genuine Level 1 is better than a claimed Level 3. The genuine assessment enables improvement. The false claim prevents it.

### Measuring Movement

Track these indicators over time:

- Time to detect production issues (should decrease)
- Time to explain system behavior to new team members (should decrease)
- Deployment frequency (should increase as confidence grows)
- Deployment rollback rate (should decrease as repeatability improves)
- Time to answer "what happened?" after incidents (should decrease)

These are proxies for the underlying capabilities. As understanding improves, explanation time drops. As feedback improves, detection time drops. As confidence improves, deployment frequency rises.

Don't set targets for these metrics. That creates gaming. Instead, track them as symptoms of underlying health. If they're moving in the right direction, you're improving. If they're stagnant or regressing, something is wrong with the underlying capability.

## Anti-Patterns to Avoid

Watch for these misuses of the model:

**Level targets in contracts.** Turns diagnostic tool into compliance burden. Creates incentives to game assessment rather than improve capability.

**Team-level comparisons.** Creates gaming and defensiveness. Teams hide problems rather than surfacing them. Collaboration suffers as teams protect their scores.

**Level claims without evidence.** Undermines honest assessment. Once a level is claimed, admitting regression feels like failure. Teams stop assessing honestly.

**Skipping levels.** Sustainable progress requires foundations. Level 3 requires Level 2 foundations. Level 2 requires Level 1 foundations. Claiming to skip creates brittle illusions that eventually collapse.

**Level 4 as goal.** Most organizations don't need it. Level 4 represents adaptive capacity for significant change. Many organizations operate successfully at Level 2 or Level 3 for years. The goal is appropriate maturity, not maximum maturity.

## The Limits of Each Level

Understanding what each level doesn't provide helps calibrate expectations.

**Level 2's limits:** Stable and reliable, but bounded. Novel changes still create uncertainty. Process can become rigid if not maintained. Feedback is early but not continuous. Confidence depends on staying within known patterns. Moving to Level 3 requires the system to start teaching you, not just following your instructions.

**Level 3's limits:** Flow is powerful, but it's not automatic adaptation. Major changes still require intentional effort. New tools still require integration work. The system reveals its state but doesn't automatically respond to everything. Moving to Level 4 requires building genuine absorption capacity.

**Level 4's limits:** Even Level 4 isn't infinite. Every system has breaking points. Level 4 means you can absorb more change before breaking—not that you can't break. Massive disruptions, fundamental pivots, or complete technology shifts will still require explicit transformation effort.

The model describes operational maturity, not invincibility. Each level is a meaningful improvement over the previous, but none is a guarantee against all problems.

## For Different Audiences

### For Leaders

The model provides a mental map for understanding where the organization is and what improvement looks like. It's a communication tool, not a management tool.

**Use it to:**
- Frame investment decisions
- Communicate with stakeholders
- Set realistic expectations
- Recognize genuine progress

**Don't use it to:**
- Set targets for teams
- Compare teams against each other
- Make personnel decisions
- Satisfy compliance requirements

### For Engineers

The model provides language for improvement discussions. It helps you articulate what's working, what isn't, and what investment would help.

**Use it to:**
- Explain technical debt impact
- Justify tooling investments
- Describe process improvements
- Set context for new team members

**Don't use it to:**
- Defend current practices
- Avoid necessary changes
- Create bureaucratic gates
- Label other teams

### For Government Reviewers

The model provides a non-threatening assurance lens. It describes behavior rather than demanding compliance.

**Use it to:**
- Understand delivery capability
- Assess risk management maturity
- Evaluate evidence quality
- Frame improvement recommendations

**Don't use it to:**
- Create compliance requirements
- Compare contractors
- Mandate specific levels
- Replace proper assurance processes

## The Honest Conversation

The most valuable use of the maturity model is enabling honest conversation about how delivery actually works.

"Our deployment process is Level 2: repeatable and reliable for standard changes."

"We're seeing Level 1 patterns in our observability: we can investigate problems but can't prevent them yet."

"This initiative would move us from discovering risk at milestones to continuous visibility."

"That incident took three days to debug—that's Level 0 feedback speed."

"We caught that regression in CI—our feedback loops are working at Level 2."

"We're explicitly not claiming Level 4; our goal is sustainable Level 3 operation."

These statements communicate real information. They set appropriate expectations. They enable planning based on actual state rather than aspirational claims.

The goal is never to "reach Level 4." The goal is to operate honestly at your current level while systematically reducing surprise.

<!-- BRIDGE -->
Maps show where you are. The phase model locates your capabilities. The maturity model describes how well you're using them. Together, they provide orientation.

But transformation is a journey through time. It doesn't happen instantly. It follows patterns—predictable patterns that repeat across organizations, across industries, across decades of modernization efforts. Understanding these patterns helps organizations persist through the difficult middle rather than giving up when progress feels slow.

Let's examine what the path actually looks like—including the hard parts.
<!-- /BRIDGE -->
