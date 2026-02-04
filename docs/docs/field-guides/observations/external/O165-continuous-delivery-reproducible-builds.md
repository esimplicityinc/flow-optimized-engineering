---
observationId: O165
displayed_sidebar: fieldGuideSidebar
sidebar_position: 9
title: "Continuous Delivery: Reproducible Builds as Deployment Foundation"
status: completed
source_type: external
source:
  authors: ["Jez Humble", "David Farley"]
  organization: "ThoughtWorks"
  year: 2010
  url: "https://continuousdelivery.com"
methods:
  - agentic-coding/methods/emerging/M161-explicit-mcp-version-control
---

# Continuous Delivery: Reproducible Builds as Deployment Foundation

> **Source:** Jez Humble & David Farley (2010), ThoughtWorks

The foundational Continuous Delivery text establishes reproducible builds as essential for reliable software delivery. Humble and Farley argue that if you cannot reproduce a build exactly, you cannot have confidence in your deployment process—and non-deterministic dependencies undermine reproducibility.

## Context

**Environment:**
- Organization: ThoughtWorks (consulting firm, Agile/DevOps pioneers)
- Lead Authors: Jez Humble (DORA co-founder), David Farley (CD pioneer)
- Timeline: 2010 (first edition), refined through subsequent research
- Impact: Foundational text that influenced DORA research and modern DevOps practices

**The Problem:**
Organizations struggled with "deployment fear"—releases were risky, unpredictable events. When deployments failed, teams often couldn't reproduce the issue because they couldn't reproduce the exact build that was deployed.

**Research Questions:**
- What practices enable confident, frequent deployments?
- How do you ensure that what you tested is what you deploy?
- What makes builds reproducible?

## Hypothesis

> "The authors hypothesized that treating deployment as a routine, automated process (rather than a manual, risky event) would reduce deployment fear and increase delivery throughput—but this requires reproducible builds as a foundation."

**Variables:**
- Independent: Deployment automation, build reproducibility, version control practices
- Dependent: Deployment frequency, change failure rate, mean time to recovery

## Approach

### Methodology
- **Design:** Synthesis of practical experience from hundreds of consulting engagements
- **Analysis:** Pattern identification across successful and struggling delivery teams
- **Validation:** Subsequent DORA research confirmed the practices correlate with performance

### Data Collection
The book synthesizes decades of combined experience from Humble and Farley working with organizations ranging from startups to enterprises across multiple industries.

## Results

### Key Principles on Reproducibility

| Principle | Implication for Dependencies |
|-----------|------------------------------|
| **Version control everything** | Dependencies must be tracked and versioned |
| **Reproducible builds** | Same inputs must produce same outputs |
| **Build once, deploy many times** | Don't rebuild for different environments |
| **Automate everything** | Including dependency resolution |

### The Reproducibility Requirement

From the book:

> "You should always be able to identify exactly what was in a given build: which version of every component, which versions of dependencies, which configuration."

> "If you cannot reproduce a build, you cannot debug production issues, you cannot roll back reliably, and you cannot have confidence in your release process."

### Why Non-Deterministic Dependencies Fail

The authors identify dependency non-determinism as a reproducibility killer:

- **Floating versions** ("^1.0.0", "latest") produce different results at different times
- **Unreproducible builds** mean you can't verify what's in production
- **Debugging becomes impossible** when you can't recreate the exact environment

### The Build Audit Trail

Continuous Delivery requires knowing exactly what went into every build:

- Source code version (commit hash)
- Dependency versions (locked)
- Configuration (versioned)
- Build toolchain (specified)

## Analysis

### What the Research Establishes

1. **Reproducibility is foundational** - Without it, you cannot have confidence in deployments
2. **Dependencies must be versioned** - Floating versions break reproducibility
3. **You must know what's deployed** - Traceability from production back to build inputs
4. **Automation requires determinism** - You can't automate what you can't reproduce

### FOE Insights

**Understanding:**
The CD principle that "you should always be able to identify exactly what was in a given build" makes the system inspectable. When something goes wrong in production, you can trace back to the exact versions of every component. This understanding enables effective debugging and root cause analysis.

**Feedback:**
Reproducible builds enable fast feedback through:
- **Consistent test results** - Tests fail for the same reasons, not random dependency drift
- **Reliable rollbacks** - You can return to a known-good state
- **Accurate staging** - What works in staging will work in production

Non-deterministic dependencies inject noise into feedback loops, making it impossible to know if a failure is due to your code or a silent dependency change.

**Confidence:**
The core insight is that deployment confidence requires reproducibility. If you cannot state exactly what's in a build, you cannot be confident about what you're deploying. Pinning dependencies is a prerequisite for the confidence that enables frequent, fearless deployments.

## Limitations

- **Pre-container era:** Published before Docker (2013), though principles still apply
- **Experience-based:** Synthesis of consulting experience, not controlled research
- **Validated later:** DORA research subsequently confirmed the practices empirically
- **Enterprise focus:** Examples emphasize large organization challenges

## Conclusion

### Verdict
**Strongly Supported** - The Continuous Delivery principles have been validated by over a decade of industry adoption and subsequent DORA research showing these practices correlate with high performance.

### Key Learnings

1. **Reproducibility is non-negotiable** - It's the foundation for deployment confidence
2. **Dependencies are build inputs** - They must be versioned like code
3. **"Latest" breaks reproducibility** - Floating versions are non-deterministic
4. **Traceability enables debugging** - Know exactly what's in every build

### Recommendation

**Apply this when:**
- Setting up CI/CD pipelines
- Debugging production issues
- Configuring agent environments that must be reproducible
- Establishing dependency management policies

**Watch out for:**
- Assuming "it worked before" means it will work again (without reproducibility)
- Separating dependency versions from build version control
- Using "latest" tags in automated pipelines

### FOE Application

| FOE Principle | How Reproducibility Enables It |
|---------------|-------------------------------|
| **Understanding** | Know exactly what's in every build and deployment |
| **Fast Feedback** | Consistent test results, reliable staging environments |
| **Confidence** | Reproducible builds → predictable deployments → deployment confidence |

The Continuous Delivery principle of reproducible builds directly supports M161. MCP server configurations are build inputs for agentic coding environments—they must be versioned explicitly to ensure reproducible agent behavior.

---

## References

- Humble, J., & Farley, D. (2010). *Continuous Delivery: Reliable Software Releases through Build, Test, and Deployment Automation*. Addison-Wesley. [continuousdelivery.com](https://continuousdelivery.com)
- Humble, J., & Farley, D. (2010). Chapter 5: Anatomy of the Deployment Pipeline. *Continuous Delivery*.
