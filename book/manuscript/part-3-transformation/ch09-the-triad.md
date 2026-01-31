---
chapter: 9
title: "The Triad"
part: "III"
status: draft
word_count: 4892
---

# The Triad

Part II presented the doctrine: three principles that optimize for human cognition while enabling sustainable high-speed delivery. Understanding, fast feedback, and confidence form a closed system. They enable each other, check each other, and degrade together when any one fails.

Knowing the doctrine isn't the same as living it.

Adopting FOE requires changing how people work, how processes operate, and what technology enables. These aren't independent initiatives that can be sequenced or prioritized separately. They're facets of a single transformation that must move together. Pull one dimension without the others and you create tension that eventually snaps back.

This chapter introduces the triad, people, process, and technology, and explains why coordinated change across all three is the only path to sustainable transformation.

## The Three Dimensions

Every organizational transformation involves three interconnected dimensions:

**People** encompasses skills, mindsets, roles, and relationships. It's the human element: who does what, what they know how to do, and how they think about their work. People determine whether processes are followed with understanding or merely complied with. People decide whether technology is used as intended or worked around.

**Process** encompasses workflows, practices, and institutions. It's the operational element: how work flows through the organization, what checks and balances exist, and what norms govern behavior. Process determines whether good intentions translate into consistent outcomes. Process creates the structures within which people operate.

**Technology** encompasses tools, platforms, and infrastructure. It's the enabling element: what capabilities are available, what automation exists, and what constraints the technical environment imposes. Technology determines what's possible to do efficiently. Technology provides the substrate on which processes run.

These dimensions aren't independent. Each enables and constrains the others.

## Why All Three Must Change Together

The most common transformation failure mode is believing you can change one dimension in isolation. You can't.

### Technology Without Process Change

Organizations purchase modern tooling, Kubernetes clusters, CI/CD platforms, observability suites, and expect transformation to follow. The tools get installed. Then nothing changes.

Teams deploy to Kubernetes manually, treating it as a fancy VM host. CI pipelines build artifacts that sit in registries because deployment remains a scheduled, manual activity. Observability dashboards get built but nobody watches them because the processes that would trigger action don't exist.

The technology is present but inert. It's expensive shelfware.

This happens because technology doesn't change behavior by itself. Technology creates possibility. Process determines whether that possibility is realized. Without process change, teams work around new technology to maintain familiar patterns. The path of least resistance isn't the path the technology designers intended, it's the path people already know.

### Process Without People Change

Organizations mandate new processes, code review requirements, deployment checklists, security scanning, and expect compliance to produce outcomes. The procedures exist. Then nothing changes.

Code reviews happen, but reviewers don't understand the code or feel ownership, so reviews become rubber stamps. Deployment checklists get checked without verification. Security scans run but findings pile up unaddressed because nobody has time or skills to remediate.

The process is present but empty. It's theater.

This happens because process without capability is ritual. You can mandate that people perform activities. You can't mandate that those activities accomplish their purpose. If people lack the skills, the mindset, or the time to do process steps meaningfully, they'll do them performatively. The checkbox gets checked. The outcome doesn't change.

### People Without Technology Support

Organizations invest in training, hire talent, and build enthusiasm for new ways of working. The people are ready. Then nothing changes.

Motivated engineers fight inadequate tooling daily. They want to deploy continuously but the infrastructure doesn't support it. They want observability but the platform doesn't provide it. They want to automate but the tools require manual workarounds.

The people are present but blocked. It's burnout waiting to happen.

This happens because motivation without enablement exhausts itself. People can work around bad tools for a while. They can maintain enthusiasm through friction temporarily. But eventually the gap between what they want to do and what the environment allows depletes their energy. They either leave or give up. Either way, the transformation fails.

## The Triad as System

The three dimensions form a system. Like the cognitive triangle of principles, they reinforce or degrade together.

```
         People
          /\
         /  \
        /    \
       /      \
      /________\
  Process     Technology
```

Each dimension enables the others:

- **People + Process** without technology = burnout (motivated people fighting inadequate tools)
- **People + Technology** without process = chaos (capable people with powerful tools and no coordination)
- **Process + Technology** without people = shelfware (sophisticated automation nobody knows how to use)
- **All three together** = transformation (coordinated change that sticks)

The system nature explains why partial transformation produces worse outcomes than no transformation. If you upgrade technology without changing process, you've spent money and created confusion. If you change process without upgrading people, you've added burden without adding capability. If you upgrade people without supporting technology, you've created frustration.

Partial transformation destabilizes without delivering benefits. It's often worse than the status quo.

## The "Just Add Tools" Failure Mode

The most common failure pattern deserves special attention because it's so pervasive.

Technology is the most visible and purchasable part of transformation. You can see tools. You can buy them. You can install them. You can point to them and say "we're transforming."

Process and people changes feel ambiguous and slow. How do you buy a mindset shift? How do you install a skill? How do you point to a cultural change and prove it happened?

So organizations optimize for what feels tractable. They purchase technology and hope the rest follows.

The pattern unfolds predictably:

1. **Acquisition.** Organization purchases modern tooling based on vendor promises and industry trends.

2. **Installation.** Tools get deployed with minimal configuration by a small team of enthusiasts.

3. **Abandonment.** Existing processes continue unchanged because nobody redesigned them for the new tools.

4. **Workaround.** People work around the tools to maintain familiar patterns because that's easier than learning new ones.

5. **Disappointment.** Leadership wonders why the expensive investment isn't paying off.

6. **Blame.** Someone gets blamed, the tools, the team, the vendor, without recognizing the structural failure.

The root cause isn't bad tools or bad people. It's the assumption that technology drives transformation. Technology enables transformation. It doesn't cause it.

## Recognizing Triad Imbalance

Imbalanced transformation produces characteristic symptoms. Recognizing them helps diagnose where investment is needed.

### Technology-Heavy Symptoms

The organization has invested in modern tools but hasn't changed how work flows or how people think.

Signs:
- Teams have access to modern tools but don't use them, or use them minimally
- Deployment pipelines exist but manual steps remain the norm
- Dashboards are built but not watched
- "We have Kubernetes" but deployments are still scary and infrequent
- Automation exists but nobody trusts it
- Tool sprawl increases without capability increase

The fix isn't more technology. It's process redesign and people development that leverage what's already available.

### Process-Heavy Symptoms

The organization has mandated new processes but hasn't supported them with technology or developed people to execute them.

Signs:
- Extensive documentation that nobody follows
- Mandated practices without supporting tools
- Compliance theater: checking boxes without improving outcomes
- Process debt: procedures that made sense once but now just slow everything down
- People know what they're supposed to do but can't do it efficiently
- Process time dominates actual work time

The fix isn't more process. It's technology that makes processes efficient and people development that makes processes meaningful.

### People-Heavy Symptoms

The organization has motivated, capable people but hasn't given them the processes or technology to succeed.

Signs:
- Motivated teams blocked by inadequate tooling
- Knowledge concentrated in heroes who carry the organization
- Good intentions undermined by bad systems
- Burnout from working around broken processes
- High turnover as capable people leave for better environments
- "If only we had..." conversations that never resolve

The fix isn't hiring more people. It's technology and process investment that lets the people you have succeed.

## Building Triad Coherence

Effective transformation moves all three dimensions together. Not sequentially, together.

### Start with a Specific Flow Problem

Don't start with "we need better technology" or "we need better processes." Start with a concrete problem in how work flows.

Examples of flow problems:
- Deployment takes three weeks from merge to production
- Security findings pile up faster than they're addressed
- Incidents take days to diagnose
- New team members need months to become productive
- The same bugs escape to production repeatedly

A specific problem provides focus. It constrains the transformation to what matters. It makes success measurable.

### Map the Triad

For the flow problem you've chosen, analyze all three dimensions:

**Process:** What process governs this flow? What steps exist? Where do delays occur? What checks and balances are involved? What handoffs happen?

**Technology:** What technology supports this process? What automation exists? Where are manual steps? What tooling is available but unused? What tooling is missing?

**People:** Who participates in this process? What skills do they have? What skills do they need? What mindsets help or hinder? What incentives shape behavior?

Mapping the triad reveals where the real constraints are. Often the obvious constraint (slow tools) isn't the actual constraint (process that requires manual approval regardless of tool speed).

### Design Changes Across All Three

Once you understand the triad, design coordinated changes.

Example: Deployment takes too long.

**Technology change:** Implement automated deployment pipeline with progressive rollout.

**Process change:** Redesign change management to pre-approve standard deployments that pass automated checks. Reserve human review for exceptional changes.

**People change:** Train teams on the new pipeline. Develop on-call capability so teams can respond to deployment problems. Shift mindset from "deployment is risky" to "deployment is routine."

None of these changes alone fixes the problem. Technology without process change means manual approvals still gate the pipeline. Process change without technology means approvals happen faster but deployment is still manual and error-prone. People change without technology and process support creates frustration.

All three together create actual improvement.

### Implement Incrementally

Big-bang transformation rarely works. The J-curve of transformation (discussed in Chapter 17) creates a performance dip during any change. Multiple simultaneous big changes create multiple simultaneous dips that can collapse the organization.

Incremental implementation means:
- Small changes across all three dimensions rather than large changes in one
- Continuous adjustment based on feedback
- Learning applied to subsequent changes
- Risk bounded by change size

Each increment should touch all three dimensions proportionally. A technology increment should include the process change that uses it and the people development that operates it.

### Measure Outcomes

The only way to know if transformation is working is to measure the outcomes you care about.

For flow problems, measure flow metrics:
- Lead time: total time from commit to production
- Deployment frequency: how often you deploy
- Change failure rate: how often deployments cause problems
- Time to restore: how long problems take to fix

These metrics should improve. If they don't, something in your triad is broken.

Avoid measuring inputs:
- Tools purchased (technology input)
- Processes documented (process input)
- People trained (people input)

Inputs don't guarantee outcomes. Organizations can have excellent inputs and terrible outcomes if the triad isn't coherent.

## The Transformation Hierarchy

While all three dimensions must change together, they have a natural hierarchy of difficulty and dependency.

**Technology is easiest to change.** You can purchase it. You can install it. You can configure it. The timeline is predictable. The work is bounded.

**Process is harder to change.** You must design it. You must communicate it. You must get buy-in. You must handle exceptions. The work is less bounded.

**People are hardest to change.** Skills take time to develop. Mindsets take time to shift. Trust takes time to build. The work is fundamentally unbounded.

This hierarchy creates a common trap: organizations work on what's easy and hope it enables what's hard. They buy technology, write process documents, and wonder why people don't change.

The trap inverts the correct approach. Start with people: what capabilities and mindsets are needed? Then design process: what workflows use those capabilities? Finally, select technology: what tools enable those workflows?

Working backwards from people ensures that technology and process serve human capability rather than demanding capabilities that don't exist.

## Triad Coherence at Different Scales

The triad applies at multiple organizational scales.

**Team level:** A single team needs aligned skills, workflows, and tools. The team can often control all three.

**Department level:** Multiple teams need aligned skills, workflows, and tools across boundaries. Coordination is required but achievable.

**Organization level:** The entire organization needs aligned skills, workflows, and tools. This requires deliberate investment in platform capabilities that serve multiple teams.

At larger scales, platform teams emerge. Their job is to provide technology and process foundations that application teams can build on. The platform team changes the technology and process dimensions so application teams can focus on the people dimension within their scope.

Good platforms reduce the coordination burden of triad coherence. They provide "paved paths" pre-integrated technology and pre-designed processes, that teams can adopt without designing from scratch.

## The Investment Required

Transformation isn't free. Triad coherence requires investment in all three dimensions.

**Technology investment** includes:
- Tool licenses or infrastructure costs
- Implementation effort
- Ongoing operations and maintenance
- Integration with existing systems

**Process investment** includes:
- Design effort to create new workflows
- Documentation and training materials
- Transition planning
- Ongoing refinement and exception handling

**People investment** includes:
- Training and skill development
- Time for learning (not in addition to work, during work)
- Hiring or role changes
- Cultural change activities

Organizations that budget for technology but not process and people get technology-heavy failure. Organizations that mandate process change but don't budget time for learning get process theater. Organizations that invest in people without technology and process support get burnout.

The budget must include all three. The proportions depend on your starting point, but none can be zero.

## Assessing Your Triad

How do you know if your triad is balanced?

**Technology assessment questions:**
- Do teams have the tools they need?
- Are tools configured and integrated effectively?
- Is automation available where it's needed?
- Are tools actually used as intended?

**Process assessment questions:**
- Do processes exist for key workflows?
- Are processes followed consistently?
- Do processes produce their intended outcomes?
- Are processes right-sized for the work they govern?

**People assessment questions:**
- Do people have the skills needed for their roles?
- Do people have the mindsets that support desired behaviors?
- Are people supported with time for learning?
- Are incentives aligned with desired outcomes?

For each "no," investigate the root cause. Often a deficiency in one dimension creates symptoms that appear in another. People who lack skills look like they have bad attitudes. Processes that lack technology support look like bureaucracy. Technology without process looks like waste.

<!-- BRIDGE -->
The triad establishes the framework for transformation: people, process, and technology must change together. Partial transformation is worse than no transformation because it creates cost and disruption without delivering benefits.

Now we need to examine each dimension in detail. The next three chapters explore what specifically needs to change in people, in process, and in technology. We start with the hardest: people. Technology can be purchased. Processes can be written. But people must choose to change.
<!-- /BRIDGE -->
