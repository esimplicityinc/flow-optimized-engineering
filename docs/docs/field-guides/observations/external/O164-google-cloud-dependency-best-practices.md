---
observationId: O164
displayed_sidebar: fieldGuideSidebar
sidebar_position: 8
title: "Google Cloud: Best Practices for Dependency Management"
status: completed
source_type: external
source:
  authors: ["Dustin Ingram"]
  organization: "Google Cloud"
  year: 2021
  url: "https://cloud.google.com/blog/topics/developers-practitioners/best-practices-dependency-management"
methods:
  - M161
---

# Google Cloud: Best Practices for Dependency Management

> **Source:** Dustin Ingram (2021), Google Cloud

Google Cloud's official guidance recommends version pinning, lockfiles, hash verification, and signature verification as best practices for dependency management. The guidance explicitly warns against using unpinned dependencies and provides a layered approach to supply chain security.

## Context

**Environment:**
- Organization: Google Cloud (major cloud platform)
- Lead Author: Dustin Ingram (Developer Advocate, Python Software Foundation director)
- Timeline: 2021 (published during heightened supply chain security awareness)
- Audience: Enterprise developers deploying applications on cloud infrastructure

**The Problem:**
Software supply chain attacks increased dramatically, with high-profile incidents like SolarWinds demonstrating the risk of compromised dependencies. Organizations needed clear guidance on protecting their dependency chains.

**Research Questions:**
- What practices reduce supply chain attack risk?
- How should organizations balance security with maintainability?
- What layered defenses are most effective?

## Hypothesis

> "Google hypothesized that a layered approach to dependency management—combining pinning, locking, hashing, and signature verification—would provide defense-in-depth against supply chain attacks while maintaining practical usability."

**Variables:**
- Independent: Dependency management practices (pinning, locking, hashing, signing)
- Dependent: Supply chain attack surface, reproducibility, maintenance burden

## Approach

### Methodology
- **Design:** Best practices documentation based on Google's internal experience and industry research
- **Analysis:** Synthesis of security research, incident analysis, and operational experience
- **Validation:** Published as official Google Cloud guidance

### Data Collection
The guidance draws on:
- Google's experience managing dependencies at massive scale
- Analysis of supply chain attacks (SolarWinds, Codecov, etc.)
- Security research from academic and industry sources
- Feedback from the developer community

## Results

### The Four Layers of Defense

Google recommends four layered practices:

| Layer | Practice | What It Protects Against |
|-------|----------|-------------------------|
| 1 | **Version Pinning** | Unexpected updates, breaking changes |
| 2 | **Lock Files** | Transitive dependency drift |
| 3 | **Hash Verification** | Package tampering, MITM attacks |
| 4 | **Signature Verification** | Repository compromise |

### Key Recommendations

**On Version Pinning:**
> "Pin your dependencies to specific versions. This ensures that your application uses the same version of each dependency every time it's built."

**On Lock Files:**
> "Use a lock file. Lock files record the exact versions of all dependencies (including transitive dependencies) that were installed."

**On Hash Verification:**
> "Verify the integrity of your dependencies. Hash verification ensures that the package you download is identical to what the author published."

**On the Trade-offs:**
> "Pinning freezes your application in time. Without automated dependency management tools, pinned applications won't receive updates—including security patches."

### The Update Imperative

Google explicitly acknowledges the maintenance burden:

- Pinned dependencies require active management
- Automated tools (Dependabot, Renovate) are essential
- Security patches must be applied deliberately
- Regular dependency audits are necessary

## Analysis

### What the Research Establishes

1. **Version pinning is recommended** - Google explicitly endorses pinning to specific versions
2. **Lock files are essential** - They capture transitive dependencies that pinning alone misses
3. **Hash verification adds security** - Protects against tampering between author and consumer
4. **Active management is required** - Pinning without updates creates technical debt

### FOE Insights

**Understanding:**
The layered approach makes dependency management explicit and observable. Each layer addresses a specific threat model:
- Pinning → version drift
- Locking → transitive drift
- Hashing → tampering
- Signing → impersonation

This mental model helps teams understand *what* they're protecting against and *why* each practice matters.

**Feedback:**
The guidance emphasizes that pinning without automated updates creates a dangerous feedback gap. The recommendation to use tools like Dependabot ensures teams receive feedback about available updates, security patches, and version conflicts. Without this feedback, pinned dependencies become stale and vulnerable.

**Confidence:**
Hash verification provides cryptographic confidence that you're running what you expect. This transforms "I think this is the right package" into "I have mathematical proof this is the right package." This confidence compounds across the dependency chain.

## Limitations

- **Vendor bias:** Google has incentive to promote practices that work well on their platform
- **Ecosystem focus:** Examples emphasize Python/Go ecosystems
- **Operational cost:** Guidance acknowledges but doesn't quantify maintenance burden
- **Adoption barriers:** Hash/signature verification have lower adoption due to tooling complexity

## Conclusion

### Verdict
**Supported** - Google's guidance aligns with industry consensus and is backed by their operational experience at scale. The practices are well-established and widely adopted.

### Key Learnings

1. **Pin to specific versions** - Not ranges, not "latest"
2. **Use lock files** - Capture the full dependency tree
3. **Verify integrity** - Hash checking prevents tampering
4. **Automate updates** - Pinning without updates is dangerous

### Recommendation

**Apply this when:**
- Managing dependencies in production applications
- Configuring MCP servers in agent workflows
- Establishing organizational dependency policies
- Implementing supply chain security controls

**Watch out for:**
- Pinning without an update strategy (creates vulnerability debt)
- Assuming pinning alone is sufficient (need locking too)
- Skipping hash verification for "trusted" packages

### FOE Application

| FOE Principle | How Google's Practices Enable It |
|---------------|----------------------------------|
| **Understanding** | Layered model clarifies what each practice protects against |
| **Fast Feedback** | Automated update tools provide timely security patch notifications |
| **Confidence** | Hash verification provides cryptographic assurance |

Google's guidance directly supports the M161 method. The recommendation to pin MCP server versions is the first layer; organizations should also consider lock files (where supported) and hash verification for maximum supply chain security.

---

## References

- Ingram, D. (2021). Best practices for dependency management. *Google Cloud Blog*. [cloud.google.com/blog/topics/developers-practitioners/best-practices-dependency-management](https://cloud.google.com/blog/topics/developers-practitioners/best-practices-dependency-management)
