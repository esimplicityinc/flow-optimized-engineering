---
sidebar_position: 4
title: "FOE for Government Customers"
---

# Flow Optimized Engineering for Government Customers

Your mission depends on software that works reliably. This guide helps you evaluate contractor engineering maturity, ask better questions, and identify practices that predict delivery success.

## Why Engineering Maturity Matters

Software delivery problems in government contracting often follow predictable patterns:

- Projects that start well but slow dramatically as complexity increases
- Contractors dependent on specific individuals who then leave
- Deployments that require extensive coordination and frequently fail
- Security and compliance findings discovered late, requiring expensive remediation
- Technical debt that makes every change increasingly risky

These problems aren't inevitable. They result from immature engineering practices. Contractors with mature practices deliver more reliably, adapt to changing requirements, and maintain quality over time.

**Your leverage**: Understanding what good engineering looks like helps you select better contractors, structure better contracts, and hold delivery organizations accountable to the right standards.

## What Good Engineering Looks Like

### Continuous Flow, Not Batch Delivery

Mature teams deliver working software continuously, not in large batches:

| Immature Pattern | Mature Pattern |
|------------------|----------------|
| Big releases every few months | Small releases every few days or weeks |
| Long integration phases where things break | Continuous integration that catches problems immediately |
| Deployment is a high-risk event | Deployment is routine and low-risk |
| Testing happens at the end | Testing happens throughout |
| Problems discovered in production | Problems caught before production |

**Why this matters to you**: Continuous delivery means you see working software sooner, problems are caught earlier (when they're cheaper to fix), and the team can respond to changing requirements.

### Automated Quality Controls

Mature teams automate compliance and quality checks:

| Immature Pattern | Mature Pattern |
|------------------|----------------|
| Manual security scans before release | Automated security scanning on every change |
| Accessibility testing at the end | Accessibility validation built into development |
| Code review as bottleneck | Code review as fast feedback with automated pre-checks |
| Compliance demonstrated at audit time | Compliance evidence generated continuously |

**Why this matters to you**: Automated controls provide consistent enforcement and continuous evidence. You're not relying on humans to remember to check things.

### Institutional Knowledge

Mature teams capture and preserve knowledge:

| Immature Pattern | Mature Pattern |
|------------------|----------------|
| Key person knows how everything works | Documentation and automation capture knowledge |
| New team members take months to contribute | New team members contribute within weeks |
| Past decisions aren't documented | Architecture decision records explain choices |
| Runbooks exist in people's heads | Runbooks are documented and tested |

**Why this matters to you**: Contractor staff will change over the life of your program. Institutional knowledge survives those changes.

## Questions to Ask Contractors

### About Delivery Practices

1. **How often do you deploy to production?**
   - Good: "Multiple times per week" or "Daily"
   - Concerning: "Every few months" or "At the end of each sprint"

2. **What happens when a deployment fails?**
   - Good: "We automatically roll back and investigate"
   - Concerning: "We work through the night to fix it"

3. **How do you know if something breaks in production?**
   - Good: "Automated monitoring alerts us within minutes"
   - Concerning: "Users report problems"

4. **What's your process for a new team member to make their first deployment?**
   - Good: "Usually within the first week, following our onboarding path"
   - Concerning: "It takes a few months to learn our systems"

### About Quality and Compliance

1. **How do you ensure security vulnerabilities don't reach production?**
   - Good: "Automated scanning in our pipeline blocks known vulnerabilities"
   - Concerning: "We do a security review before releases"

2. **How do you demonstrate compliance for audits?**
   - Good: "We generate evidence continuously; audits are straightforward"
   - Concerning: "We prepare documentation before each audit"

3. **How do you handle accessibility requirements?**
   - Good: "Automated checks plus regular testing with assistive technologies"
   - Concerning: "We test accessibility before launch"

### About Knowledge and Resilience

1. **What happens to delivery if your tech lead leaves?**
   - Good: "Others can continue; knowledge is documented and shared"
   - Concerning: "That would be a significant problem"

2. **How do you capture decisions and context for future team members?**
   - Good: "Architecture decision records, documentation, onboarding materials"
   - Concerning: "We do knowledge transfer sessions"

3. **Can you show me examples of your documentation?**
   - Good: Current, clear, comprehensive
   - Concerning: Outdated, incomplete, or nonexistent

## Red Flags in Contractor Approaches

### In Proposals

- **Vague descriptions of engineering practices**: If they can't describe their practices specifically, they likely don't have mature practices
- **Heavy reliance on named individuals**: "Our senior architect will ensure quality" suggests lack of institutional capability
- **All methodology, no metrics**: Process descriptions without outcome measurements
- **No mention of automation**: Manual processes don't scale and introduce inconsistency

### In Delivery

- **Frequent "crunch" periods**: Regular overtime to meet deadlines indicates poor planning or practices
- **Reluctance to demo working software**: If you can't see working software regularly, it may not exist
- **Blame on requirements**: "We couldn't deliver because requirements changed" suggests inability to adapt
- **Key person dependencies**: Same person is critical to every decision

### In Technical Discussions

- **Cannot explain deployment process clearly**: Mature teams can describe their deployment in concrete terms
- **Testing is separate from development**: "QA tests after developers finish" indicates slow feedback loops
- **Resistance to observability**: "We don't need that monitoring" suggests fear of transparency
- **Compliance as afterthought**: "We'll address security before ATO" means late, expensive fixes

## Evaluation Criteria for Engineering Maturity

When evaluating proposals or assessing contractor performance, consider these dimensions:

### Deployment Capability

| Level | Characteristics |
|-------|-----------------|
| Immature | Manual deployments, infrequent releases, high failure rate |
| Developing | Some automation, monthly releases, manual intervention often required |
| Mature | Fully automated, frequent releases, failures are rare and quickly remediated |

### Testing and Quality

| Level | Characteristics |
|-------|-----------------|
| Immature | Manual testing, testing at end, defects found late |
| Developing | Some automated tests, testing throughout, some defects escape |
| Mature | Comprehensive automation, continuous testing, defects caught early |

### Observability

| Level | Characteristics |
|-------|-----------------|
| Immature | Limited visibility, rely on user reports, debugging is difficult |
| Developing | Basic monitoring, some alerting, investigation requires effort |
| Mature | Comprehensive observability, proactive alerting, quick diagnosis |

### Documentation and Knowledge

| Level | Characteristics |
|-------|-----------------|
| Immature | Tribal knowledge, outdated docs, long onboarding |
| Developing | Some documentation, inconsistent maintenance, moderate onboarding |
| Mature | Current documentation, regular maintenance, fast onboarding |

### Security and Compliance

| Level | Characteristics |
|-------|-----------------|
| Immature | Manual checks, compliance at audit time, findings common |
| Developing | Some automated checks, regular assessments, findings addressed |
| Mature | Continuous automated validation, audit-ready evidence, findings rare |

## How FOE Principles Create Reliable Delivery

FOE (Flow Optimized Engineering) is a framework for engineering maturity. Contractors using FOE principles:

1. **Optimize for flow**: They measure and improve how smoothly work moves through their process
2. **Invest in platforms**: Common capabilities are standardized and reusable
3. **Pave paths**: Standard ways of working are documented and tooled
4. **Build institutions**: Knowledge survives individual departures
5. **Automate controls**: Quality and compliance are built in, not bolted on

When a contractor claims FOE maturity, ask them to:
- Show their flow metrics (deployment frequency, lead time, failure rate, restoration time)
- Demonstrate their automated controls
- Walk through their onboarding process
- Explain how they capture and preserve knowledge

## What to Ask Vendors

### During Acquisition

1. What are your engineering flow metrics? (Look for: deployment frequency, lead time, change failure rate, time to restore)
2. Can you demonstrate your CI/CD pipeline?
3. How do you ensure new team members can contribute quickly?
4. What platform capabilities will you bring to this contract?

### During Performance

1. Show me your current flow metrics and trends
2. Walk me through a recent deployment
3. How has the team changed, and how did you maintain knowledge?
4. What's your current security and compliance posture?

### During Recompete

1. What reusable capabilities have you built?
2. How would knowledge transfer work if we selected a different contractor?
3. What's the current technical debt situation?
4. How has engineering maturity improved over the contract period?

## Structuring Contracts for Engineering Quality

### Metrics in Contracts

Consider including engineering flow metrics as reportable items:
- Deployment frequency
- Lead time from commit to production
- Change failure rate
- Mean time to restore service

These aren't punitive measures - they're visibility tools that indicate engineering health.

### Technical Evaluation Criteria

Include engineering maturity in technical evaluation:
- Demonstrated automation capabilities
- Evidence of documentation practices
- Past performance on engineering metrics
- Concrete deployment and testing processes

### Contract Structure Considerations

- **Avoid overspecifying technology**: Focus on outcomes, not specific tools
- **Include platform/infrastructure scope**: Allow investment in capabilities that improve delivery
- **Plan for knowledge transfer**: Require documentation standards and transition support
- **Expect continuous delivery**: Structure reviews around working software, not documents

## Summary: What Good Looks Like

Contractors with mature engineering practices:

- Deploy frequently with low failure rates
- Catch problems early through automation
- Maintain knowledge in documentation, not just people
- Generate compliance evidence continuously
- Adapt to changing requirements without drama
- Show you working software regularly

You have significant influence over contractor behavior through how you structure acquisitions and what you measure during performance. Use that influence to encourage engineering maturity - your mission will be better served by contractors who deliver reliably.
