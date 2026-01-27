# Source Quality Tiers

Reference guide for tagging external evidence sources by quality tier. Used by `@prospector-web` when searching for literature evidence.

## Overview

Not all external evidence is equal. Academic research carries more weight than blog posts for method maturity decisions. This reference defines quality tiers to ensure transparent evidence strength assessment.

## Tier Definitions

### Tier 1: Academic (Highest Weight)

**What qualifies:**
- Peer-reviewed journal articles
- University research studies
- Meta-analyses and systematic reviews
- Conference papers from academic venues (ICSE, FSE, etc.)
- Dissertations and theses

**Signals to look for:**
- `.edu` domains
- DOI links (doi.org)
- Journal names (IEEE, ACM, etc.)
- Citation counts
- Author affiliations with universities

**Weight for method maturity:**
- Strong support - a single high-quality academic source can advance method maturity
- Contradicting academic evidence should trigger method review

**Example sources:**
- "The Impact of Test-Driven Development on Software Quality" - IEEE Software
- "Psychological Safety and Learning Behavior in Work Teams" - Administrative Science Quarterly

---

### Tier 2: Industry Research

**What qualifies:**
- DORA State of DevOps reports
- Thoughtworks Technology Radar
- ACM Queue articles
- IEEE Software practitioner articles
- Large-scale industry surveys (Stack Overflow, JetBrains, etc.)
- Research from tech companies with rigorous methodology

**Signals to look for:**
- `dora.dev`
- `thoughtworks.com/radar`
- `acm.org`
- `ieee.org`
- Named methodology sections
- Sample sizes documented

**Weight for method maturity:**
- Strong support - comparable to academic for well-documented research
- DORA research is particularly relevant for FOE methods

**Example sources:**
- DORA State of DevOps Report 2023
- Thoughtworks Technology Radar - "Adopt" recommendations
- Google's "Project Aristotle" research

---

### Tier 3: Case Study

**What qualifies:**
- Engineering blogs from major tech companies (Google, Netflix, Stripe, Spotify, etc.)
- Published case studies with specific metrics
- Post-mortems with quantitative data
- Conference talks with detailed implementation data

**Signals to look for:**
- `engineering.*.com` patterns
- Official company blogs
- Named authors with verifiable roles
- Specific metrics and timelines
- Before/after comparisons

**Weight for method maturity:**
- Medium support - useful but should be corroborated with other sources
- Single case studies show "it worked here" not "it works everywhere"

**Example sources:**
- Netflix Tech Blog: "How We Build Code at Netflix"
- Stripe Engineering: "Scaling Stripe's Ruby Codebase"
- Spotify Engineering: "Squad Health Check Model"

---

### Tier 4: Practitioner (Lowest Weight)

**What qualifies:**
- Personal blogs
- Medium posts
- Dev.to articles
- Conference talks without detailed data
- Podcasts and interviews
- Twitter/X threads
- Substack newsletters

**Signals to look for:**
- `medium.com`
- `dev.to`
- `youtube.com`
- `substack.com`
- Personal domains
- Opinion-heavy language

**Weight for method maturity:**
- Low support - useful for discovery and hypothesis generation
- Should not advance maturity alone - needs corroboration
- Good for finding leads to investigate further

**Example sources:**
- Martin Fowler's Bliki (note: higher quality practitioner)
- Conference lightning talks
- "How I solved X" blog posts

---

## Tagging Guidelines

When `@prospector-web` returns results, each should include:

```yaml
- title: "Source Title"
  url: "https://..."
  quality_tier: academic | industry-research | case-study | practitioner
  confidence: high | medium | low  # How confident are we in the tier assignment?
  evidence_type: supporting | contradicting | nuanced
  snippet: "Relevant excerpt..."
```

### Tier Assignment Rules

1. **When uncertain, tag conservatively** - If unsure between tiers, choose the lower one
2. **Author reputation matters** - Martin Fowler's blog is higher quality than random Medium post
3. **Methodology visibility** - Sources that explain their methodology rank higher
4. **Recency** - Older sources may be outdated; note publication year

### Handling Edge Cases

| Source Type | Tier | Notes |
|-------------|------|-------|
| Martin Fowler's Bliki | case-study | Established authority, detailed reasoning |
| ThoughtWorks articles (not Radar) | case-study | Company blog, not formal research |
| InfoQ articles | case-study | Curated, often detailed |
| Hacker News discussions | practitioner | Community opinions, not evidence |
| GitHub READMEs | practitioner | Project documentation, not research |
| Books (excerpts found online) | varies | Depends on book - check Bookshelf tier |

---

## Using Quality Tiers for Method Maturity

### Advancing Maturity

| Current Level | Evidence Needed to Advance |
|---------------|---------------------------|
| Hypothesized → Experimenting | Any internal experiment OR 2+ Tier 1-2 sources |
| Experimenting → Validated | Multiple internal experiments OR 1 Tier 1 + internal |
| Validated → Proven | Consistent results across contexts + Tier 1-2 support |

### Triggering Review

Methods should be flagged for review when:
- Tier 1 (academic) contradicting evidence is found
- Multiple Tier 2 (industry-research) sources contradict
- 3+ Tier 3-4 sources consistently contradict

---

## FOE Principle Alignment

Quality tiers map to FOE's emphasis on evidence-based practice:

| FOE Principle | Quality Tier Relevance |
|---------------|----------------------|
| **Understanding** | Higher-tier sources explain *why* things work, not just *that* they work |
| **Feedback** | Tier 1-2 sources often include feedback loop data (DORA metrics, etc.) |
| **Confidence** | Higher tiers provide more confidence in method recommendations |

---

## References

- DORA Research Program: https://dora.dev
- ACM Digital Library: https://dl.acm.org
- IEEE Xplore: https://ieeexplore.ieee.org
- Google Scholar: https://scholar.google.com
