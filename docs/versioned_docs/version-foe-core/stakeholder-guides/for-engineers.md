---
sidebar_position: 3
title: "FOE for Engineers"
---

# Flow Optimized Engineering for Engineers

FOE is about making your daily work better: less friction, faster feedback, more autonomy, and fewer fire drills. Here's what it means for you.

## What FOE Actually Means for Your Day-to-Day

FOE optimizes for **flow**: the smooth, uninterrupted movement of your work from idea to production. When flow is good:

- You spend time solving interesting problems, not fighting tooling
- Feedback comes fast enough to stay in context
- Deploying is boring and routine, not a high-stress event
- You can focus on your work without constant interruptions
- When something breaks, you have the information to fix it quickly

When flow is bad, you know it: waiting for builds, hunting for documentation that doesn't exist, manually doing things that should be automated, and fixing problems that better tooling would have prevented.

## Paved Paths and Golden Paths

A **paved path** is a well-documented, well-tooled way to accomplish something common. Instead of figuring out how to do something from scratch, you follow the path that's been prepared.

### What Paved Paths Look Like

| Task | Unpaved | Paved |
|------|---------|-------|
| Setting up local dev | Ask around, piece together from old wikis, debug for a day | Run one command, working in 15 minutes |
| Creating a new service | Copy-paste from existing service, hope you got the right one | Generate from template with correct config baked in |
| Deploying to production | Follow a 20-step checklist, coordinate with ops | Push to main, automation handles the rest |
| Adding monitoring | Figure out what to instrument, configure dashboards manually | Standard instrumentation included, dashboards generated |
| Debugging production issues | SSH into boxes, grep through logs | Query structured logs and traces in one place |

### The Guardrails Trade-off

Paved paths often come with guardrails: linting rules, required tests, automated checks, review requirements. These can feel like friction.

Here's the trade-off: guardrails that catch problems early save you from debugging production issues later. Guardrails that enforce consistency mean you can move between projects without relearning everything. Guardrails that automate compliance mean you don't get blamed when an audit finds problems.

**Good guardrails** protect you. They catch mistakes before they become incidents. They're automated so they don't require your attention. They have clear error messages so you know how to fix issues.

**Bad guardrails** create friction without value. They block legitimate work without explanation. They require manual intervention for routine tasks. If you encounter these, that's worth raising: not every guardrail is well-designed.

## Faster Feedback Loops

The time between "I made a change" and "I know if it works" is critical. Shorter feedback loops mean:

- You catch mistakes while the context is still in your head
- You can iterate quickly instead of waiting
- You spend less time debugging because problems are caught earlier

### Feedback Loop Targets

| Feedback Type | Target | Why It Matters |
|---------------|--------|----------------|
| Local tests | Seconds | Know immediately if you broke something |
| CI pipeline | Minutes | Catch integration issues before they merge |
| Code review | Hours, not days | Stay in context while addressing feedback |
| Production deployment | Same day | See your work in action quickly |
| Production monitoring | Real-time | Know about problems before users report them |

If your feedback loops are slower than these targets, that's a sign of friction worth addressing.

## Autonomy Within Guardrails

FOE isn't about telling you exactly how to do your job. It's about creating an environment where you can move fast without breaking things or blocking others.

**More autonomy:**
- Choose how to solve problems within your domain
- Deploy when you're ready, not when you can schedule a window
- Refactor code you own without committee approval
- Experiment with approaches that might be better

**Reasonable constraints:**
- Use standard patterns for cross-cutting concerns (security, observability)
- Follow review processes for changes that affect others
- Document decisions that others will need to understand
- Maintain the tests and monitoring that protect everyone

The goal is **safe autonomy**: you can move fast because the guardrails catch mistakes, not because someone is watching everything you do.

## What Changes in Your Workflow

### Things That Get Easier

- **Starting new work**: Project templates, working dev environments, clear conventions
- **Understanding existing code**: Architecture docs, ADRs, consistent patterns
- **Getting help**: Documentation exists; when it doesn't, there's a clear place to ask
- **Deploying safely**: Automated testing, staged rollouts, easy rollback
- **Debugging problems**: Observability tooling, structured logs, traces

### Things That Might Feel Different

- **More automation, less manual control**: Pipelines do things you used to do by hand
- **Consistency expectations**: Following patterns even when you'd prefer something different
- **Documentation requirements**: Writing things down so others can understand
- **Visibility into your work**: Flow metrics make delivery patterns visible

### Things That Get Better Over Time

- **Fewer fire drills**: Better practices prevent problems instead of requiring heroic fixes
- **Less context switching**: Stable environments and clear ownership reduce interruptions
- **More interesting problems**: Platform handles undifferentiated work; you handle the interesting stuff
- **Sustainable pace**: Predictable delivery without crunch

## How to Contribute to FOE Practices

FOE isn't something done to you: it's something you help build. Here's how:

### Improve Documentation

When you figure something out that wasn't documented:
1. Document it where others will find it
2. Update outdated documentation you encounter
3. File issues for documentation gaps you can't address immediately

### Identify Friction

You're closest to the work. You know where the friction is:
- What takes longer than it should?
- What requires tribal knowledge that should be written down?
- What manual steps could be automated?
- What errors could be caught earlier?

Raise these issues. Propose solutions. Contribute fixes when you can.

### Share What Works

When you find a better way to do something:
- Share it with your team
- Consider whether it should be a standard pattern
- Help others adopt it

### Maintain What Exists

Paved paths degrade if not maintained:
- Update documentation when things change
- Keep tests passing
- Fix broken automation
- Improve error messages when you encounter confusing ones

## Career Growth in FOE Environments

FOE environments create specific growth opportunities:

### Technical Depth

Because paved paths handle common problems, you can focus on harder ones:
- Complex domain problems that require deep understanding
- Performance optimization and scaling
- Architecture for new capabilities
- Technical innovation within your domain

### Technical Breadth

Because practices are consistent, you can move between contexts more easily:
- Work across different parts of the system
- Contribute to platform and shared infrastructure
- Learn new domains without relearning basic tooling
- Develop T-shaped skills (deep in one area, broad across many)

### Leadership and Influence

FOE creates paths to impact beyond code:
- Improve practices that affect many engineers
- Mentor others using consistent patterns
- Contribute to architecture decisions
- Build institutions that outlast your direct involvement

### What Good Senior Engineers Do in FOE Environments

- Identify and pave new paths
- Improve existing paths based on experience
- Mentor others in using paths effectively
- Balance following standards with knowing when to push back
- Build institutions that preserve knowledge
- Make the right thing the easy thing for others

## Common Concerns Addressed

### "Will this make my job boring?"

Automating the boring parts creates space for interesting work. If your job satisfaction depends on manual processes that should be automated, that's worth examining. Most engineers prefer solving novel problems over repetitive tasks.

### "Will standardization limit my creativity?"

Standardization of infrastructure and patterns creates a foundation for creativity in problem-solving. You're not creative in how you configure deployment: you're creative in how you solve user problems. FOE redirects creative energy toward higher-value work.

### "What if I disagree with a standard?"

Standards should be challengeable:
1. Understand why the standard exists
2. Articulate why your situation is different or why the standard is wrong
3. Propose a better approach with evidence
4. If the standard is actually wrong, help fix it

Disagreement is healthy. Unilateral divergence without discussion isn't.

### "What if the paved path doesn't fit my needs?"

Legitimate exceptions exist. The process should be:
1. Confirm the path actually doesn't fit (not just unfamiliarity)
2. Document why you need to diverge
3. Understand the trade-offs (you may lose support and tooling)
4. Consider whether your need suggests improving the path for everyone

### "Isn't this just bureaucracy?"

The test: does it make delivery better or worse?

**Bureaucracy**: Process that creates friction without preventing real problems  
**Good practice**: Process that catches problems early and makes good outcomes easier

If something feels like pure bureaucracy, that's worth raising. Not all practices are well-designed, and feedback helps improve them.

## Getting the Most from FOE

1. **Learn the paths**: Invest time in understanding standard approaches before working around them
2. **Use the feedback loops**: Let automation catch problems instead of trying to be perfect
3. **Document as you go**: Future you and your teammates will thank you
4. **Raise friction**: When something is harder than it should be, say something
5. **Contribute improvements**: Small improvements compound over time
6. **Ask why**: Understanding the reason behind practices helps you apply them well

FOE environments are built by the engineers working in them. Your participation in improving practices is part of the job, and it makes everyone's work better, including your own.
