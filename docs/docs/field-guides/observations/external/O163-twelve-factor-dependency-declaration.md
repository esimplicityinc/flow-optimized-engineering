---
observationId: O163
displayed_sidebar: fieldGuideSidebar
sidebar_position: 7
title: "Twelve-Factor App: Explicitly Declare and Isolate Dependencies"
status: completed
source_type: external
source:
  authors: ["Adam Wiggins"]
  organization: "Heroku"
  year: 2012
  url: "https://12factor.net/dependencies"
methods:
  - agentic-coding/methods/emerging/M161-explicit-mcp-version-control
---

# Twelve-Factor App: Explicitly Declare and Isolate Dependencies

> **Source:** Adam Wiggins (2012), Heroku

The Twelve-Factor App methodology establishes explicit dependency declaration as a foundational principle for cloud-native applications. Factor II states that applications should "never rely on implicit existence of system-wide packages" and must "declare all dependencies, completely and exactly, via a dependency declaration manifest."

## Context

**Environment:**
- Organization: Heroku (cloud platform pioneer)
- Lead Author: Adam Wiggins (Heroku co-founder)
- Timeline: 2011-2012 (codified from years of observing app deployments)
- Sample: Millions of application deployments on the Heroku platform

**The Problem:**
Applications that work on one developer's machine often fail in production because they depend on packages or tools that happen to be installed locally but aren't declared. This "works on my machine" syndrome causes deployment failures, debugging nightmares, and environment inconsistencies.

**Research Questions:**
- What principles make applications reliably portable across environments?
- How should dependencies be managed for consistent deployments?

## Hypothesis

> "The researchers hypothesized that explicitly declaring all dependencies would eliminate environment-specific failures because the application would carry its complete dependency specification with it."

**Variables:**
- Independent: Explicit dependency declaration vs. implicit system dependencies
- Dependent: Deployment reliability, environment portability, debugging difficulty

## Approach

### Methodology
- **Design:** Observational analysis of millions of application deployments
- **Analysis:** Pattern recognition across successful vs. failing deployments
- **Validation:** Real-world adoption by thousands of organizations

### Data Collection
The Twelve-Factor methodology emerged from Heroku's experience hosting applications across many languages and frameworks. The patterns were distilled from observing what made applications succeed or fail at scale.

## Results

### Key Principles from Factor II

| Principle | Implication |
|-----------|-------------|
| **Explicit declaration** | All dependencies in a manifest (Gemfile, requirements.txt, package.json) |
| **Complete specification** | No reliance on system-wide packages |
| **Isolation** | Dependencies installed into application, not shared |
| **Reproducibility** | Same manifest = same dependencies = same behavior |

### The Two-Part Requirement

Factor II specifies two related requirements:

1. **Dependency declaration manifest** - A file that explicitly lists all dependencies (e.g., Gemfile, package.json, requirements.txt)
2. **Dependency isolation** - A mechanism to ensure declared dependencies don't leak from/to the system (e.g., bundle exec, virtualenv, node_modules)

### Why Implicit Dependencies Fail

The methodology identifies failure modes from implicit dependencies:

- **curl/ImageMagick problem**: "A twelve-factor app never relies on implicit existence of system-wide packages. For example, shelling out to curl or ImageMagick."
- **Version drift**: System packages may be at different versions across environments
- **Missing packages**: What's installed on a developer machine may not exist in production

## Analysis

### What the Research Establishes

1. **Implicit dependencies cause deployment failures** - "Works on my machine" is a symptom of undeclared dependencies
2. **Explicit declaration enables portability** - Applications with complete manifests deploy reliably across environments
3. **Isolation prevents version conflicts** - Dependencies installed per-application avoid system-level conflicts
4. **Reproducibility requires explicitness** - You cannot reproduce a build without knowing exactly what went into it

### FOE Insights

**Understanding:**
Explicit dependency declaration makes the application's requirements visible and inspectable. Rather than debugging "why doesn't this work in production?", teams can compare dependency manifests between environments. The principle transforms hidden assumptions into explicit, documented facts.

**Feedback:**
When dependencies are explicit, feedback about missing or incompatible dependencies comes at build/install time rather than runtime. A missing dependency in package.json fails at `npm install`, not when a user hits the affected code path in production. This shifts feedback left dramatically.

**Confidence:**
The core insight is that reproducibility requires explicitness. If you cannot state exactly what dependencies an application uses, you cannot be confident that it will behave the same across environments. Explicit declaration is the foundation for deployment confidence.

## Limitations

- **Methodology:** Observational patterns, not controlled experiment
- **Sample:** Primarily web applications on Heroku platform
- **Context:** Pre-dates container era (though principles still apply)
- **Scope:** Focuses on application dependencies, not infrastructure dependencies

## Conclusion

### Verdict
**Strongly Supported** - The Twelve-Factor principles have been validated by over a decade of industry adoption. The methodology is foundational to cloud-native development and informs modern tools like Docker, Kubernetes, and serverless platforms.

### Key Learnings

1. **Explicit is better than implicit** - Dependency declaration eliminates "works on my machine" failures
2. **Manifests enable reproducibility** - Same inputs = same outputs
3. **Isolation prevents conflicts** - Per-application dependencies avoid system-level issues

### Recommendation

**Apply this when:**
- Deploying applications across multiple environments
- Setting up CI/CD pipelines that must reproduce builds
- Configuring MCP servers in agentic coding workflows
- Onboarding new developers who need to reproduce the environment

**Watch out for:**
- Assuming declaration alone is sufficient (need isolation too)
- Forgetting transitive dependencies (lock files address this)
- Not updating declarations when dependencies change

### FOE Application

| FOE Principle | How Explicit Dependencies Enable It |
|---------------|-------------------------------------|
| **Understanding** | Dependencies are visible, documented, and inspectable |
| **Fast Feedback** | Missing dependencies fail at install time, not runtime |
| **Confidence** | Reproducible environments mean predictable behavior |

The Twelve-Factor principle of explicit dependency declaration directly supports the M161 method's recommendation to pin MCP server versions. MCP configurations are dependency declarations for agent tooling—the same principles that make application deployments reliable make agent environments reproducible.

---

## References

- Wiggins, A. (2012). The Twelve-Factor App. [12factor.net](https://12factor.net)
- Factor II: Dependencies. [12factor.net/dependencies](https://12factor.net/dependencies)
