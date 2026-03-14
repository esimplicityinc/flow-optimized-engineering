---
observationId: O219
sidebar_position: 19
title: "Skills.sh Verification Gate Adoption: obra/superpowers Doubles to 324K Installs"
status: completed
source_type: external
source:
  authors: ["Jesse Vincent (obra)"]
  organization: "skills.sh / obra/superpowers"
  year: 2026
  url: "https://skills.sh/obra/superpowers"
methods:
  - M155
  - M152
  - M149
---

import RelatedMethods from '@site/src/components/RelatedMethods';

# Skills.sh Verification Gate Adoption: obra/superpowers Doubles to 324K Installs

> **Source:** Jesse Vincent / obra/superpowers (February-March 2026), skills.sh

The obra/superpowers collection on skills.sh more than doubled from 146.5K to 324.3K total installs in 22 days (February 20 - March 14, 2026), with verification-focused skills growing 116-130%. This provides quantitative evidence that the developer community is independently adopting structured verification, test-driven development, and systematic debugging practices for agentic coding workflows — directly validating FOE methods M155, M152, and providing the first independent evidence for M149.

## Context

**Environment:**
- **Platform:** skills.sh — the dominant distribution platform for AI agent skills (88,456 total skills)
- **Collection:** obra/superpowers — 14 skills, 81.8K GitHub stars, 324.3K total installs
- **Timeline:** Growth measured February 20 to March 14, 2026 (22 days)
- **Ecosystem:** Total skills.sh platform grew 28.8% in the same period (68,654 to 88,456)

**The Problem:**
Agentic coding tools produce output that *appears* correct but often isn't verified. "Vibe coding" — accepting AI-generated code without structured verification — emerged as a recognized anti-pattern. The question: are developers actually adopting verification-oriented practices, or is this a niche concern?

**Research Questions:**
- Are developers installing verification-focused agent skills at meaningful scale?
- Which verification practices are growing fastest?
- Do the adoption patterns suggest a coherent verification workflow or isolated tools?
- Is there evidence for structured debugging adoption in agentic coding contexts?

## Hypothesis

The implicit hypothesis behind the obra/superpowers collection is that agents without verification gates will produce unreliable output, and that "negative skills" — skills that prevent bad behavior rather than enable new behavior — are necessary infrastructure for professional agentic coding.

> "Claiming work is complete without verification is dishonesty, not efficiency." — obra/superpowers verification-before-completion skill

**Variables:**
- Independent (what was measured): Install counts and growth rates for verification-focused agent skills
- Dependent (what outcomes indicate): Community demand for structured verification in agentic workflows

## Approach

### Methodology
- **Design:** Longitudinal quantitative analysis of skills.sh install data across two survey points (February 20 and March 14, 2026)
- **Analysis:** Growth rates computed for individual skills and the full collection; lifecycle chaining pattern analyzed qualitatively
- **Validation:** Cross-referenced with GitHub star data (81.8K), YouTube engagement (WorldofAI 44K views on spec-driven toolkit), Reddit community discussions, and the Continue IDE agents-to-checks rename

### Data Collection
- skills.sh install counts at two time points (22 days apart)
- Per-skill growth rates for all 14 obra/superpowers skills
- Hourly "Hot" leaderboard data showing real-time momentum
- Platform-level totals for ecosystem context

## Results

### Key Quantitative Findings

| Skill | Feb 20 | Mar 14 | Growth |
|-------|--------|--------|--------|
| verification-before-completion | 8,100 | 17,800 | **+120%** |
| systematic-debugging | 13,800 | 29,800 | **+116%** |
| test-driven-development | 11,300 | 24,600 | **+118%** |
| writing-plans | 12,100 | 27,800 | **+130%** |
| brainstorming | 25,000 | 54,300 | **+117%** |
| subagent-driven-development | 8,500 | 19,000 | **+124%** |
| **Collection total** | **146,500** | **324,300** | **+121%** |

Hourly "Hot" leaderboard data from March 14 confirmed sustained momentum (not a launch spike):
- test-driven-development: +7 installs/hour
- verification-before-completion: +6 installs/hour
- subagent-driven-development: +6 installs/hour
- finishing-a-development-branch: +10 installs/hour

### Major Conclusions

1. **Verification skills grow at the same rate as productive skills.** verification-before-completion (+120%) matches the collection average (+121%), meaning developers install verification gates alongside the skills they use for building — not as an afterthought.

2. **The skills form a complete lifecycle chain.** brainstorming -> writing-plans -> executing-plans -> test-driven-development -> verification-before-completion -> requesting-code-review -> receiving-code-review -> finishing-a-development-branch. This represents a coherent, opinionated agentic development workflow.

3. **systematic-debugging at 29.8K installs is the second-most-installed skill.** Its 116% growth demonstrates substantial demand for structured debugging approaches in agentic coding, providing the first quantitative evidence of community adoption for root-cause-first debugging practices.

4. **The broader ecosystem is moving toward verification framing.** Continue IDE renamed its "agents" feature to "checks" — framing agent output as something to verify rather than something autonomous.

### Surprising or Notable Findings

- **"Negative skills" are a proven pattern.** verification-before-completion doesn't enable new capabilities — it prevents premature completion claims. Its adoption at scale (17.8K installs) proves that developers value constraints on agent behavior, not just capabilities.
- **Anti-vibe-coding has tooling now.** The WorldofAI YouTube video on spec-driven superpowers workflows received 44K views, suggesting mainstream awareness of the need for structured agent workflows.
- **Growth is uniform across the collection.** All skills grew 112-130%, suggesting users install the full lifecycle rather than cherry-picking individual skills.

## Analysis

### What the Data Establishes

1. **Verification-before-completion is a mainstream practice.** 17,800 installs with 120% growth in 22 days, combined with real-time momentum (+6/hour), demonstrates that verification gates for agent output are not a niche concern but a widely adopted practice.

2. **Test-driven development applies to agentic workflows.** 24,600 installs of a strict red-green-refactor enforcement skill shows that the TDD discipline transfers directly to AI-assisted coding. Developers want the agent to follow TDD, not just write tests alongside code.

3. **Structured debugging has community adoption.** systematic-debugging's 29,800 installs and 116% growth rate provide the first independent evidence that developers are adopting root-cause-first debugging practices specifically for agentic coding contexts. The skill enforces a four-phase process: reproduce, gather evidence, form hypotheses, then fix — directly aligned with M149's approach.

4. **Skill chaining creates structured workflows.** The obra/superpowers lifecycle chain demonstrates that the community has converged on a complete agentic development methodology, not just isolated tools. This represents a shift from ad-hoc AI usage to structured, verifiable agent workflows.

### FOE Insights

**Understanding:**
The skill lifecycle chain reveals how the community understands agentic development: as a structured process requiring explicit gates at each stage. The brainstorming-to-completion chain mirrors traditional software engineering discipline (design -> plan -> implement -> test -> verify -> review) applied to agent-mediated work. This validates FOE's emphasis on understanding before action.

**Feedback:**
The test-driven-development skill's growth (+118%) demonstrates demand for the fastest possible feedback loop in agentic work: write a test, watch it fail, implement, watch it pass. The systematic-debugging skill implements a feedback loop for error diagnosis: evidence gathering before fix attempts. Both directly support FOE's fast feedback principle by shortening the time between agent action and verified outcome.

**Confidence:**
This is the primary alignment. verification-before-completion embodies FOE's confidence principle: no completion claim without evidence. The skill's iron law — "NO COMPLETION CLAIMS WITHOUT FRESH VERIFICATION EVIDENCE" — is a direct implementation of evidence-based confidence. At 17.8K installs and growing, this isn't aspirational; it's practiced at scale.

## Limitations

- **Install counts are not usage data.** A skill being installed doesn't guarantee it's actively used or effective. We cannot measure how often verification gates actually catch problems.
- **Single collection dominance.** obra/superpowers accounts for the vast majority of verification-focused skills. This may reflect one influential author's vision rather than independent convergence (though the collection's 81.8K GitHub stars suggest broad endorsement).
- **No controlled comparison.** We cannot compare outcomes of teams using verification skills vs. teams without them. The data shows adoption, not effectiveness.
- **22-day window.** The growth could represent a viral spike rather than sustained adoption. However, the "Hot" leaderboard data showing continued hourly growth suggests sustained momentum.
- **Correlation with overall ecosystem growth.** The skills.sh platform grew 28.8% in the same period, though obra/superpowers' 121% growth far outpaces the platform average.

## Conclusion

### Verdict
**Supported** — Install data provides strong evidence that verification-focused practices are being widely adopted in the agentic coding community. The uniform growth across the full lifecycle chain suggests coherent workflow adoption, not isolated tool usage. The systematic-debugging data fills a critical gap as the first community-scale evidence for structured debugging practices in agentic contexts.

### Key Learnings

1. Verification gates for agent output have crossed from niche concern to mainstream practice (17.8K installs, +120% growth, sustained hourly momentum).
2. Developers install verification and testing skills at the same rate as productive skills, treating them as essential infrastructure rather than optional overhead.
3. Structured debugging (29.8K installs, +116%) provides the first independent evidence that root-cause-first debugging practices are being adopted for agentic coding workflows.

### Recommendation

**Apply this when:**
- Configuring AI coding agents for professional development work
- Building agentic coding workflows that require confidence in output quality
- Advocating for verification practices in teams adopting AI coding tools

**Watch out for:**
- Install counts inflated by automated or bulk installations
- Verification fatigue if gates are too frequent or too strict for the task
- The collection is opinionated — teams may need to adapt the lifecycle to their context

### FOE Application

| FOE Principle | Evidence | Strength |
|---------------|----------|----------|
| **Confidence** | verification-before-completion: 17.8K installs, +120% growth; "no completion without evidence" | Strong |
| **Fast Feedback** | test-driven-development: 24.6K installs, +118% growth; red-green-refactor enforcement | Strong |
| **Understanding** | systematic-debugging: 29.8K installs, +116% growth; root-cause investigation before fixes | Strong |

This observation is particularly significant for **M149 (Root-Cause-First Debugging)**, which previously had zero observations and was stuck at hypothesized maturity. The systematic-debugging skill's 29.8K installs and 116% growth rate provide the first independent evidence of community adoption of structured debugging practices in agentic coding contexts, supporting M149's advancement from hypothesized to observing.

---

## References

- skills.sh obra/superpowers collection: https://skills.sh/obra/superpowers
- obra/superpowers GitHub repository (81.8K stars): https://github.com/obra/superpowers
- skills.sh platform data (88,456 total skills as of March 14, 2026)
- FOE skills.sh survey data: research/skillssh-survey-2026-03-14.yaml
- FOE scout report: research/agentic-trends/03-14-26-trends.md
- WorldofAI "Superpowers" video (44K views): YouTube
- Continue IDE changelog: agents renamed to checks

---

<RelatedMethods />
