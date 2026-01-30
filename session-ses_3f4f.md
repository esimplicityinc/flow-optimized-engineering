# Greeting

**Session ID:** ses_3f4f31aadffeBdvZf271VOczS2
**Created:** 1/29/2026, 1:38:40 PM
**Updated:** 1/29/2026, 1:42:02 PM

---

## User

hello

---

## Assistant (Curator · claude-opus-4-5 · 3.7s)

_Thinking:_

The user said "hello". According to my instructions as the Curator, I should immediately begin a Field Guide health audit when invoked. Let me start the audit process.

Starting Field Guide health audit...

Loading skills for validation rules...

```
Tool: skill

**Input:**
```json
{
  "name": "foe-observation-framework"
}
```
**Output:**
```
## Skill: foe-observation-framework

**Base directory**: /Users/aaron.west/Documents/Projects/flow-optimized-engineering/.opencode/skills/foe-observation-framework

# FOE Observation Framework

This skill provides the structure and principles for documenting observations in the Flow Optimized Engineering Field Guides system.

## Two Types of Observations

FOE distinguishes between two types of documented evidence:

### Internal Observations

First-person observations documented by our teams. These document:
- What **we** tried
- Why **we** tried it
- What happened
- What **we** learned

**Location:** `docs/docs/field-guides/observations/internal/`

### External Observations

Published research, case studies, and external evidence that supports FOE methods. These document:
- What **researchers** studied
- Their methodology and findings
- How their evidence supports FOE principles

**Location:** `docs/docs/field-guides/observations/external/`

## Key Differences

| Aspect | Internal Observations | External Observations |
|--------|---------------------|---------------------|
| **Who ran it** | Our team | External researchers |
| **Hypothesis format** | "If we [X], then [Y]..." | "The researchers hypothesized..." |
| **Approach section** | Our specific steps | Summary of their methodology |
| **Results** | Our measurements | Their published findings |
| **Limitations** | Our honest assessment | Acknowledged from source |
| **Purpose** | Document our learnings | Borrow established evidence |

## Internal Observation Structure

See `references/observation-template.md` for the complete template.

**Frontmatter:**
```yaml
---
title: "Your Observation Title"
status: completed    # or: in-progress
source_type: internal
methods:
  - guide-name/methods/established/method-slug
---
```

**Key sections:**
1. **Context** - The situation that led to this observation
2. **Hypothesis** - What you expected (use "If we [X], then [Y] because [Z]" format)
3. **Approach** - How you ran the work (replicable steps)
4. **Results** - What actually happened (with data if possible)
5. **Analysis** - What it means, including FOE insights
6. **Limitations** - Honest assessment of constraints
7. **Conclusion** - Key takeaways and recommendations

## External Observation Structure

See `references/external-template.md` for the complete template.

**Frontmatter:**
```yaml
---
title: "Research Study Title"
status: completed
source_type: external
source:
  authors: ["Name 1", "Name 2"]
  organization: "Organization Name"
  year: 2018
  url: "https://..."
methods: []
---
```

**Key sections:**
1. **Context** - Research background and questions
2. **Hypothesis** - What the researchers expected
3. **Approach** - Summary of their methodology
4. **Results** - Key quantitative findings
5. **Analysis** - What the research establishes + FOE insights
6. **Limitations** - Acknowledged constraints (from source and our assessment)
7. **Conclusion** - Key learnings and FOE application

## FOE Alignment

Every observation (internal or external) should consider the three FOE principles:

### Optimize for Understanding
- What did this reveal about how systems actually work?
- What mental models were confirmed or challenged?
- What would this teach someone new?

### Optimize for Fast Feedback
- What feedback loops were affected?
- How quickly could problems be detected?
- What became faster (or slower)?

### Optimize for Confidence
- How confident are you in the results?
- What risks does this reduce or reveal?
- What would increase confidence?

## Maturity Implications

Both types of observations affect method maturity:

| Method State | What Observations Do |
|--------------|---------------------|
| Hypothesized | First observation moves it to Observing |
| Observing | Completed observations can support Validated |
| Validated | Multiple confirming observations support Proven |
| Proven | Contradicting observations may lower confidence |

External observations can provide stronger support for maturity advancement due to larger sample sizes, academic rigor, and replication across organizations.

## Quality Checklist

### Internal Observations
- [ ] Hypothesis uses "If we [X], then [Y] because [Z]" format
- [ ] Approach is specific enough to replicate
- [ ] Results include concrete data or observations
- [ ] Limitations are honestly stated
- [ ] FOE insights are included in Analysis
- [ ] `source_type: internal` in frontmatter

### Literature Evidence
- [ ] Source details complete (authors, organization, year, URL)
- [ ] Methodology summarized accurately
- [ ] Key quantitative findings included
- [ ] Limitations acknowledged (both theirs and ours)
- [ ] FOE application explained in Analysis
- [ ] `source_type: external` in frontmatter

## References

- `references/observation-template.md` - Internal observation template
- `references/external-template.md` - External observation template
- `references/foe-principles.md` - Deep dive on FOE principles
- `references/maturity-model.md` - How maturity levels work

## Assets

- `assets/observation-scaffold.md` - Minimal scaffold for internal observations
- `assets/external-scaffold.md` - Minimal scaffold for external observations
```
```

```
Tool: skill

**Input:**
```json
{
  "name": "foe-method-framework"
}
```
**Output:**
```
## Skill: foe-method-framework

**Base directory**: /Users/aaron.west/Documents/Projects/flow-optimized-engineering/.opencode/skills/foe-method-framework

# FOE Method Framework

This skill provides the structure and principles for creating and managing methods in the Flow Optimized Engineering Field Guides system.

## What is a Method?

A method is a documented practice or approach that solves a specific engineering challenge. Methods are:
- **Actionable** - They describe something you can do
- **Evidence-backed** - They link to observations that support them
- **Maturity-tracked** - They have a maturity level indicating how well-tested they are

## Method Locations

Methods live within their parent Field Guide:

```
docs/docs/field-guides/
└── [guide-name]/
    └── methods/
        ├── established/    # Validated or Proven methods
        │   └── method-name.md
        └── emerging/       # Hypothesized or Observing methods
            └── method-name.md
```

## Maturity Levels

| Level | Value | Folder | Description |
|-------|-------|--------|-------------|
| Hypothesized | 1 | `emerging/` | Proposed, not yet tested |
| Observing | 2 | `emerging/` | Active observations underway |
| Validated | 3 | `established/` | Supporting evidence exists |
| Proven | 4 | `established/` | Multiple confirming observations |

## File Structure

See `references/method-template.md` for the complete template.

Key sections:
1. **Frontmatter** - Metadata including maturity and linked observations
2. **Overview** - What the method is and why it matters
3. **When to Use / When NOT to Use** - Applicability guidance
4. **How It Works** - Step-by-step instructions
5. **Supporting Evidence** - Link to observations

## Creating a New Method

1. Determine the maturity level (usually starts at `observing` with first observation)
2. Choose the correct folder (`emerging/` or `established/`)
3. Create the markdown file with proper frontmatter
4. Link any supporting observations
5. Include the `<RelatedObservations />` component

## Maturity Transitions

### Emerging → Established
When a method advances from Observing to Validated:
1. Move the file from `emerging/` to `established/`
2. Update the `maturity` frontmatter
3. Update the guide overview to reflect the change

### Method Graduation Criteria

| Transition | Criteria |
|------------|----------|
| Hypothesized → Observing | First observation created |
| Observing → Validated | Completed observation(s) with positive results |
| Validated → Proven | Multiple observations across different contexts |

## External Frameworks

External Frameworks are established industry methodologies (e.g., DORA, SPACE, Accelerate) that contain well-defined methods. Field Guides can **adopt** methods from these frameworks.

### Framework Location

```
docs/docs/external-frameworks/
├── overview.md
└── [framework-slug]/
    ├── overview.md         # Framework metadata and description
    └── methods/
        └── method-name.md  # Canonical method definitions
```

### Framework Status Levels

| Status | Description |
|--------|-------------|
| Emerging Standard | Gaining traction, early adoption |
| Well-Established | Widely recognized, significant adoption |
| Industry Standard | De facto standard in the industry |

### Adopting Framework Methods

To adopt an external method into a field guide:

1. Add to the guide's `overview.md` frontmatter:
   ```yaml
   adopted_methods:
     - framework: dora
       method: deployment-frequency
       foe_maturity: hypothesized
       observations: []
   ```

2. Update the MethodList component in the guide's overview:
   ```jsx
   <MethodList 
     guideId="your-guide"
     methods={[...]}
     adoptedMethods={[
       {
         framework: 'dora',
         method: 'deployment-frequency',
         foe_maturity: 'hypothesized',
         title: 'Deployment Frequency',
         description: 'How often code is deployed to production',
         frameworkTitle: 'DORA',
       },
     ]}
   />
   ```

### Key Principles

- **Reference, don't duplicate** - Canonical method lives in `/external-frameworks/`
- **Independent FOE maturity** - Track your own maturity separate from framework status
- **Add your evidence** - Link FOE observations to validate in your context
- **Cherry-pick** - Adopt individual methods, not entire frameworks

### Creating a New External Framework

See `references/external-frameworks.md` for the full template.

## References

- `references/method-template.md` - Full template with examples
- `references/maturity-levels.md` - Detailed maturity criteria
- `references/external-frameworks.md` - External framework template

## Assets

- `assets/method-scaffold.md` - Minimal copy-paste scaffold
```
```

---

## Assistant (Curator · claude-opus-4-5 · 5.9s)

_Thinking:_

Good, I've loaded both skills. Now I need to proceed to Phase 1 (Scan) and find all documentation files.

Let me scan for:
1. Observations: `docs/docs/field-guides/observations/**/*.md` (excluding index.md)
2. Methods: `docs/docs/field-guides/*/methods/**/*.md` (excluding index.md)
3. External Framework Methods: `docs/docs/field-guides/external-frameworks/*/methods/**/*.md` (excluding index.md)

Wait, looking at the skill output, external frameworks are at:
`docs/docs/external-frameworks/` not `docs/docs/field-guides/external-frameworks/`

Let me search for all these files.

Skills loaded. Now scanning for documentation files...

```
Tool: glob

**Input:**
```json
{
  "pattern": "docs/docs/field-guides/observations/**/*.md"
}
```
**Output:**
```
/Users/aaron.west/Documents/Projects/flow-optimized-engineering/docs/docs/field-guides/observations/external/liedtka-2018-design-thinking-works.md
/Users/aaron.west/Documents/Projects/flow-optimized-engineering/docs/docs/field-guides/observations/external/dora-2023-user-centricity.md
/Users/aaron.west/Documents/Projects/flow-optimized-engineering/docs/docs/field-guides/observations/internal/prima-bdd-api-testing-adoption.md
/Users/aaron.west/Documents/Projects/flow-optimized-engineering/docs/docs/field-guides/observations/external/ebay-contract-testing-adoption.md
/Users/aaron.west/Documents/Projects/flow-optimized-engineering/docs/docs/field-guides/observations/external/robinson-consumer-driven-contracts.md
/Users/aaron.west/Documents/Projects/flow-optimized-engineering/docs/docs/field-guides/observations/external/nummi-plant-transformation.md
/Users/aaron.west/Documents/Projects/flow-optimized-engineering/docs/docs/field-guides/observations/external/thoughtworks-cdc-testing.md
/Users/aaron.west/Documents/Projects/flow-optimized-engineering/docs/docs/field-guides/observations/internal/prima-microservices-architecture.md
/Users/aaron.west/Documents/Projects/flow-optimized-engineering/docs/docs/field-guides/observations/external/ozkan-2023-ddd-industrial-refactoring.md
/Users/aaron.west/Documents/Projects/flow-optimized-engineering/docs/docs/field-guides/observations/external/team-topologies-bounded-contexts.md
/Users/aaron.west/Documents/Projects/flow-optimized-engineering/docs/docs/field-guides/observations/external/ieee-2024-ddd-microservices.md
/Users/aaron.west/Documents/Projects/flow-optimized-engineering/docs/docs/field-guides/observations/internal/prima-presidio-containerization.md
/Users/aaron.west/Documents/Projects/flow-optimized-engineering/docs/docs/field-guides/observations/external/ddd-bounded-contexts.md
/Users/aaron.west/Documents/Projects/flow-optimized-engineering/docs/docs/field-guides/observations/external/dora-four-key-metrics.md
/Users/aaron.west/Documents/Projects/flow-optimized-engineering/docs/docs/field-guides/observations/external/dora-loosely-coupled-architecture.md
/Users/aaron.west/Documents/Projects/flow-optimized-engineering/docs/docs/field-guides/observations/external/fowler-lewis-microservices-definition.md
/Users/aaron.west/Documents/Projects/flow-optimized-engineering/docs/docs/field-guides/observations/external/team-topologies-inverse-conway.md
/Users/aaron.west/Documents/Projects/flow-optimized-engineering/docs/docs/field-guides/observations/external/bdd-industrial-study-2018.md
/Users/aaron.west/Documents/Projects/flow-optimized-engineering/docs/docs/field-guides/observations/external/google-project-aristotle.md
/Users/aaron.west/Documents/Projects/flow-optimized-engineering/docs/docs/field-guides/observations/external/bdd-adoption-github-study-2020.md
/Users/aaron.west/Documents/Projects/flow-optimized-engineering/docs/docs/field-guides/observations/external/tdd-defect-reduction-study.md
/Users/aaron.west/Documents/Projects/flow-optimized-engineering/docs/docs/field-guides/observations/external/bdd-maintenance-challenges-2018.md
/Users/aaron.west/Documents/Projects/flow-optimized-engineering/docs/docs/field-guides/observations/external/bdd-systematic-review-2023.md
/Users/aaron.west/Documents/Projects/flow-optimized-engineering/docs/docs/field-guides/observations/internal/prima-oss-fork-strategy.md
```
```

```
Tool: glob

**Input:**
```json
{
  "pattern": "docs/docs/field-guides/*/methods/**/*.md"
}
```
**Output:**
```
/Users/aaron.west/Documents/Projects/flow-optimized-engineering/docs/docs/field-guides/agentic-coding/methods/emerging/root-cause-first-debugging.md
/Users/aaron.west/Documents/Projects/flow-optimized-engineering/docs/docs/field-guides/agentic-coding/methods/emerging/persistent-planning-state.md
/Users/aaron.west/Documents/Projects/flow-optimized-engineering/docs/docs/field-guides/agentic-coding/methods/emerging/test-driven-agent-development.md
/Users/aaron.west/Documents/Projects/flow-optimized-engineering/docs/docs/field-guides/agentic-coding/methods/emerging/verification-before-completion.md
/Users/aaron.west/Documents/Projects/flow-optimized-engineering/docs/docs/field-guides/architecture/methods/established/consumer-contract-testing.md
/Users/aaron.west/Documents/Projects/flow-optimized-engineering/docs/docs/field-guides/agentic-coding/methods/emerging/early-feedback-loop-investment.md
/Users/aaron.west/Documents/Projects/flow-optimized-engineering/docs/docs/field-guides/architecture/methods/emerging/system-over-individuals.md
/Users/aaron.west/Documents/Projects/flow-optimized-engineering/docs/docs/field-guides/architecture/methods/established/true-microservices.md
/Users/aaron.west/Documents/Projects/flow-optimized-engineering/docs/docs/field-guides/agentic-coding/methods/emerging/understanding-first-protocol-adoption.md
/Users/aaron.west/Documents/Projects/flow-optimized-engineering/docs/docs/field-guides/agentic-coding/methods/emerging/knowledge-distribution-as-reliability.md
/Users/aaron.west/Documents/Projects/flow-optimized-engineering/docs/docs/field-guides/architecture/methods/emerging/service-boundary-extraction.md
/Users/aaron.west/Documents/Projects/flow-optimized-engineering/docs/docs/field-guides/agentic-coding/methods/established/index.md
```
```

```
Tool: glob

**Input:**
```json
{
  "pattern": "docs/docs/external-frameworks/*/methods/**/*.md"
}
```
**Output:**
```
/Users/aaron.west/Documents/Projects/flow-optimized-engineering/docs/docs/external-frameworks/double-diamond/methods/deliver-phase.md
/Users/aaron.west/Documents/Projects/flow-optimized-engineering/docs/docs/external-frameworks/double-diamond/methods/develop-phase.md
/Users/aaron.west/Documents/Projects/flow-optimized-engineering/docs/docs/external-frameworks/double-diamond/methods/define-phase.md
/Users/aaron.west/Documents/Projects/flow-optimized-engineering/docs/docs/external-frameworks/double-diamond/methods/discover-phase.md
/Users/aaron.west/Documents/Projects/flow-optimized-engineering/docs/docs/external-frameworks/continuous-delivery/methods/infrastructure-as-code.md
/Users/aaron.west/Documents/Projects/flow-optimized-engineering/docs/docs/external-frameworks/continuous-delivery/methods/canary-release.md
/Users/aaron.west/Documents/Projects/flow-optimized-engineering/docs/docs/external-frameworks/continuous-delivery/methods/blue-green-deployment.md
/Users/aaron.west/Documents/Projects/flow-optimized-engineering/docs/docs/external-frameworks/continuous-delivery/methods/feature-flags.md
/Users/aaron.west/Documents/Projects/flow-optimized-engineering/docs/docs/external-frameworks/continuous-delivery/methods/trunk-based-development.md
/Users/aaron.west/Documents/Projects/flow-optimized-engineering/docs/docs/external-frameworks/continuous-delivery/methods/deployment-pipeline.md
/Users/aaron.west/Documents/Projects/flow-optimized-engineering/docs/docs/external-frameworks/team-topologies/methods/team-api.md
/Users/aaron.west/Documents/Projects/flow-optimized-engineering/docs/docs/external-frameworks/team-topologies/methods/fast-flow.md
/Users/aaron.west/Documents/Projects/flow-optimized-engineering/docs/docs/external-frameworks/team-topologies/methods/thinnest-viable-platform.md
/Users/aaron.west/Documents/Projects/flow-optimized-engineering/docs/docs/external-frameworks/team-topologies/methods/inverse-conway-maneuver.md
/Users/aaron.west/Documents/Projects/flow-optimized-engineering/docs/docs/external-frameworks/team-topologies/methods/team-cognitive-load.md
/Users/aaron.west/Documents/Projects/flow-optimized-engineering/docs/docs/external-frameworks/team-topologies/methods/facilitating-mode.md
/Users/aaron.west/Documents/Projects/flow-optimized-engineering/docs/docs/external-frameworks/team-topologies/methods/x-as-a-service-mode.md
/Users/aaron.west/Documents/Projects/flow-optimized-engineering/docs/docs/external-frameworks/team-topologies/methods/collaboration-mode.md
/Users/aaron.west/Documents/Projects/flow-optimized-engineering/docs/docs/external-frameworks/team-topologies/methods/complicated-subsystem-team.md
/Users/aaron.west/Documents/Projects/flow-optimized-engineering/docs/docs/external-frameworks/team-topologies/methods/enabling-team.md
/Users/aaron.west/Documents/Projects/flow-optimized-engineering/docs/docs/external-frameworks/team-topologies/methods/platform-team.md
/Users/aaron.west/Documents/Projects/flow-optimized-engineering/docs/docs/external-frameworks/team-topologies/methods/stream-aligned-team.md
/Users/aaron.west/Documents/Projects/flow-optimized-engineering/docs/docs/external-frameworks/domain-driven-design/methods/bounded-context.md
/Users/aaron.west/Documents/Projects/flow-optimized-engineering/docs/docs/external-frameworks/domain-driven-design/methods/factory.md
/Users/aaron.west/Documents/Projects/flow-optimized-engineering/docs/docs/external-frameworks/domain-driven-design/methods/application-service.md
/Users/aaron.west/Documents/Projects/flow-optimized-engineering/docs/docs/external-frameworks/domain-driven-design/methods/domain-service.md
/Users/aaron.west/Documents/Projects/flow-optimized-engineering/docs/docs/external-frameworks/domain-driven-design/methods/repository.md
/Users/aaron.west/Documents/Projects/flow-optimized-engineering/docs/docs/external-frameworks/domain-driven-design/methods/domain-event.md
/Users/aaron.west/Documents/Projects/flow-optimized-engineering/docs/docs/external-frameworks/domain-driven-design/methods/value-object.md
/Users/aaron.west/Documents/Projects/flow-optimized-engineering/docs/docs/external-frameworks/domain-driven-design/methods/entity.md
/Users/aaron.west/Documents/Projects/flow-optimized-engineering/docs/docs/external-frameworks/domain-driven-design/methods/aggregate.md
/Users/aaron.west/Documents/Projects/flow-optimized-engineering/docs/docs/external-frameworks/domain-driven-design/methods/subdomains.md
/Users/aaron.west/Documents/Projects/flow-optimized-engineering/docs/docs/external-frameworks/domain-driven-design/methods/context-mapping.md
/Users/aaron.west/Documents/Projects/flow-optimized-engineering/docs/docs/external-frameworks/domain-driven-design/methods/ubiquitous-language.md
/Users/aaron.west/Documents/Projects/flow-optimized-engineering/docs/docs/external-frameworks/bdd/methods/given-when-then.md
/Users/aaron.west/Documents/Projects/flow-optimized-engineering/docs/docs/external-frameworks/bdd/methods/gherkin.md
/Users/aaron.west/Documents/Projects/flow-optimized-engineering/docs/docs/external-frameworks/bdd/methods/example-mapping.md
/Users/aaron.west/Documents/Projects/flow-optimized-engineering/docs/docs/external-frameworks/bdd/methods/user-story-template.md
/Users/aaron.west/Documents/Projects/flow-optimized-engineering/docs/docs/external-frameworks/bdd/methods/discovery-workshops.md
/Users/aaron.west/Documents/Projects/flow-optimized-engineering/docs/docs/external-frameworks/bdd/methods/executable-specifications.md
/Users/aaron.west/Documents/Projects/flow-optimized-engineering/docs/docs/external-frameworks/bdd/methods/three-amigos.md
/Users/aaron.west/Documents/Projects/flow-optimized-engineering/docs/docs/external-frameworks/dora/methods/time-to-restore-service.md
/Users/aaron.west/Documents/Projects/flow-optimized-engineering/docs/docs/external-frameworks/dora/methods/lead-time-for-changes.md
/Users/aaron.west/Documents/Projects/flow-optimized-engineering/docs/docs/external-frameworks/dora/methods/change-failure-rate.md
/Users/aaron.west/Documents/Projects/flow-optimized-engineering/docs/docs/external-frameworks/dora/methods/deployment-frequency.md
```
```

---

## Assistant (Curator · claude-opus-4-5 · 13.0s)

_Thinking:_

Now I need to filter out the index.md files from the results. Looking at the results:

**Observations (24 files):**
- No index.md files found, all are valid observation files

**Methods (12 files):**
- One index.md file: `/docs/docs/field-guides/agentic-coding/methods/established/index.md`
- 11 valid method files

**External Framework Methods (45 files):**
- No index.md files found, all are valid

So I have:
- 24 observations
- 11 methods (excluding 1 index.md)
- 45 external framework methods

Now I need to read each file to validate:
1. Frontmatter required fields
2. Content sections
3. Bidirectional links
4. Component inclusion

Let me read all the files. I'll start with observations first, then methods.

**Scan Results:**
- **Observations:** 24 files found
- **Methods:** 11 files found (excluding 1 index.md)
- **External Framework Methods:** 45 files found

Now proceeding to Phase 2: Validate...

```
Tool: read

**Input:**
```json
{
  "filePath": "/Users/aaron.west/Documents/Projects/flow-optimized-engineering/docs/docs/field-guides/observations/external/liedtka-2018-design-thinking-works.md"
}
```
**Output:**
```
<file>
00001| ---
00002| sidebar_position: 24
00003| title: "Why Design Thinking Works (HBR 2018)"
00004| status: completed
00005| source_type: external
00006| source:
00007|   authors: ["Jeanne Liedtka"]
00008|   organization: "Harvard Business Review / Darden School of Business"
00009|   year: 2018
00010|   url: "https://hbr.org/2018/09/why-design-thinking-works"
00011| methods:
00012|   - external-frameworks/double-diamond/methods/discover-phase
00013|   - external-frameworks/double-diamond/methods/define-phase
00014|   - external-frameworks/double-diamond/methods/develop-phase
00015|   - external-frameworks/double-diamond/methods/deliver-phase
00016| ---
00017| 
00018| import RelatedMethods from '@site/src/components/RelatedMethods';
00019| 
00020| # Why Design Thinking Works
00021| 
00022| > **Source:** Jeanne Liedtka (2018), Harvard Business Review
00023| 
00024| Research by Professor Jeanne Liedtka at the Darden School of Business examines why design thinking produces measurably better innovation outcomes. The study reveals that the structured divergent-convergent process addresses specific cognitive biases that hamper innovation, providing scientific grounding for the Double Diamond methodology.
00025| 
00026| ## Context
00027| 
00028| **Environment:**
00029| - Organization: Darden School of Business, University of Virginia
00030| - Lead Researcher: Professor Jeanne Liedtka (Strategy, Design Thinking)
00031| - Timeline: Multi-year research program on design thinking effectiveness
00032| - Sample: Qualitative case studies across multiple organizations
00033| 
00034| **The Problem:**
00035| Despite widespread adoption of design thinking, skeptics questioned whether the methodology actually worked or was merely "innovation theater." The research examined the underlying mechanisms that make design thinking effective.
00036| 
00037| **Research Questions:**
00038| - Why does design thinking produce better innovation outcomes?
00039| - What specific cognitive biases does the process address?
00040| - How does the divergent-convergent structure overcome human limitations?
00041| 
00042| ## Hypothesis
00043| 
00044| Professor Liedtka hypothesized that design thinking's effectiveness stems from how its structure counteracts natural cognitive biases that inhibit innovation.
00045| 
00046| > "Design thinking addresses cognitive biases and affective biases—like functional fixedness, solution aversion, and fear of judgment—that consistently hamper innovation."
00047| 
00048| **Variables:**
00049| - Independent: Design thinking methodology (divergent-convergent structure, user empathy, prototyping)
00050| - Dependent: Innovation outcomes (quality, adoption, user satisfaction)
00051| - Mediating: Cognitive bias reduction
00052| 
00053| ## Approach
00054| 
00055| ### Methodology
00056| - **Design:** Qualitative case study research with theoretical framework development
00057| - **Analysis:** Pattern analysis across organizations using design thinking
00058| - **Validation:** Grounding in established cognitive psychology research
00059| 
00060| ### Cognitive Biases Addressed
00061| 
00062| The research identified specific biases that design thinking overcomes:
00063| 
00064| | Bias | Description | How Design Thinking Addresses It |
00065| |------|-------------|----------------------------------|
00066| | **Functional fixedness** | Seeing only conventional uses for things | Divergent ideation encourages exploring unconventional solutions |
00067| | **Confirmation bias** | Seeking information that confirms existing beliefs | Empathy research challenges assumptions through direct user contact |
00068| | **Solution aversion** | Rejecting problems because solutions seem too painful | Reframing problems reveals acceptable solutions |
00069| | **Fear of judgment** | Withholding ideas due to social risk | Prototyping makes ideas concrete and safe to critique |
00070| | **Premature closure** | Settling on first adequate solution | Structured divergence before convergence delays commitment |
00071| 
00072| ### Framework Analysis
00073| 
00074| The research connected design thinking stages to bias mitigation:
00075| 
00076| | Design Stage | Double Diamond Phase | Biases Mitigated |
00077| |--------------|---------------------|------------------|
00078| | Empathize | Discover | Confirmation bias, assumptions |
00079| | Define | Define | Solution aversion, premature framing |
00080| | Ideate | Develop | Functional fixedness, premature closure |
00081| | Prototype | Develop | Fear of judgment, analysis paralysis |
00082| | Test | Deliver | Confirmation bias, sunk cost |
00083| 
00084| ## Results
00085| 
00086| ### Key Findings
00087| 
00088| | Finding | Mechanism |
00089| |---------|-----------|
00090| | Design thinking addresses **functional fixedness** | Divergent thinking explores unconventional solutions |
00091| | User empathy overcomes **confirmation bias** | Direct observation challenges assumptions |
00092| | Prototyping reduces **fear of judgment** | Ideas become objects to improve, not creators to criticize |
00093| | Structured process defeats **premature closure** | Explicit divergence before convergence |
00094| | Reframing addresses **solution aversion** | New problem frames reveal acceptable solutions |
00095| 
00096| ### Major Conclusions
00097| 
00098| 1. **Design thinking works because of psychology, not magic:** Its effectiveness comes from systematically addressing known cognitive limitations
00099| 2. **Divergent-convergent rhythm is essential:** The structure prevents premature closure on suboptimal solutions
00100| 3. **User empathy is not just ethical—it's tactical:** Direct user contact corrects the false assumptions that lead to wrong solutions
00101| 4. **Prototyping is thinking, not just making:** Externalized ideas become safer to critique and improve
00102| 
00103| ### What Surprised Practitioners
00104| 
00105| - **Design thinking's "soft" methods have hard scientific backing** in cognitive psychology
00106| - **The process feels inefficient but produces better outcomes** because it prevents costly downstream failures
00107| - **Empathy is strategically valuable** beyond being "nice to users"
00108| 
00109| ## Analysis
00110| 
00111| ### What the Research Establishes
00112| 
00113| 1. **Scientific foundation for Double Diamond:** The divergent-convergent structure has grounding in cognitive bias research
00114| 2. **Discovery investment prevents failures:** Time spent understanding users prevents building wrong solutions
00115| 3. **Multiple solutions exploration is essential:** Premature convergence on single solutions reduces outcome quality
00116| 4. **Prototyping accelerates learning:** Making ideas tangible enables faster feedback than discussion alone
00117| 
00118| ### Connection to Double Diamond
00119| 
00120| | Double Diamond Phase | Liedtka's Mechanism | Bias Addressed |
00121| |---------------------|---------------------|----------------|
00122| | **Discover** (divergent) | Empathy research | Confirmation bias, assumptions |
00123| | **Define** (convergent) | Problem reframing | Solution aversion, premature framing |
00124| | **Develop** (divergent) | Ideation + prototyping | Functional fixedness, fear of judgment |
00125| | **Deliver** (convergent) | Testing + iteration | Sunk cost, confirmation bias |
00126| 
00127| ### FOE Insights
00128| 
00129| **Understanding:**
00130| The research explains WHY investing in understanding works. Empathy research doesn't just make us "nicer"—it corrects the false assumptions that lead us to build the wrong things. The cognitive bias framework provides scientific language for the value of the Discover phase.
00131| 
00132| **Feedback:**
00133| Prototyping accelerates feedback by making ideas tangible. As Liedtka notes, "a prototype is worth a thousand meetings." Concrete artifacts enable specific critique that abstract discussion cannot. This aligns with FOE's emphasis on fast feedback loops.
00134| 
00135| **Confidence:**
00136| The research builds confidence in design thinking methodology itself. By explaining the underlying mechanisms, practitioners can have justified confidence that the process works—not faith, but understanding. They can also adapt the methods knowingly rather than following them rigidly.
00137| 
00138| ## Limitations
00139| 
00140| - **Qualitative methodology:** Case-study approach provides depth but not statistical generalization
00141| - **No control groups:** No comparison with teams not using design thinking
00142| - **Publication bias:** Harvard Business Review publication may favor positive findings
00143| - **Practitioner focus:** Research aimed at convincing practitioners, not academic peer review
00144| - **Mechanism theory:** Proposes explanations for effectiveness rather than proving causation
00145| 
00146| ### Author's Acknowledgment
00147| Professor Liedtka notes that the research explains why design thinking works in cases where it does work, not that it always works in all contexts.
00148| 
00149| ## Conclusion
00150| 
00151| ### Verdict
00152| **Supported** - The research provides a compelling theoretical framework grounded in established cognitive psychology. While qualitative rather than experimental, it offers the most rigorous explanation for why design thinking produces better outcomes.
00153| 
00154| ### Key Learnings
00155| 
00156| 1. **Design thinking effectiveness has scientific grounding:** Not just creative intuition, but structured bias mitigation
00157| 2. **Divergent-convergent rhythm is cognitively essential:** Prevents premature closure on suboptimal solutions
00158| 3. **User empathy is strategically valuable:** Corrects assumptions that lead to wrong solutions
00159| 4. **Prototyping is fast feedback in action:** Tangible artifacts enable specific, actionable critique
00160| 
00161| ### Recommendation
00162| 
00163| **Apply this when:**
00164| - Explaining why discovery and divergent thinking matter
00165| - Justifying time for user research to skeptical stakeholders
00166| - Building the case for exploring multiple solutions before committing
00167| - Teaching design thinking principles to engineering teams
00168| 
00169| **Watch out for:**
00170| - Using this as justification for endless exploration without convergence
00171| - Assuming design thinking always works (context matters)
00172| - Treating the process mechanically without understanding underlying principles
00173| - Forgetting that the goal is outcomes, not process compliance
00174| 
00175| ### FOE Application
00176| 
00177| Liedtka's research provides cognitive science backing for the Double Diamond and FOE principles:
00178| 
00179| | FOE Principle | Liedtka's Mechanism |
00180| |---------------|---------------------|
00181| | **Optimize for Understanding** | Empathy research corrects confirmation bias, reveals true user needs |
00182| | **Optimize for Fast Feedback** | Prototyping makes ideas tangible for rapid critique and iteration |
00183| | **Optimize for Confidence** | Understanding WHY the process works builds justified confidence |
00184| 
00185| The research transforms design thinking from "trust us, it works" to "here's why it works"—which itself embodies FOE's principle of optimizing for understanding.
00186| 
00187| ---
00188| 
00189| ## References
00190| 
00191| - Liedtka, J. (2018). "Why Design Thinking Works." *Harvard Business Review*, September-October 2018. Available at [hbr.org/2018/09/why-design-thinking-works](https://hbr.org/2018/09/why-design-thinking-works)
00192| - Liedtka, J., & Ogilvie, T. (2011). *Designing for Growth: A Design Thinking Toolkit for Managers*. Columbia Business School Publishing.
00193| - Liedtka, J. (2015). "Perspective: Linking Design Thinking with Innovation Outcomes through Cognitive Bias Reduction." *Journal of Product Innovation Management*, 32(6), 925-938.
00194| 
00195| ---
00196| 
00197| <RelatedMethods />
00198| 

(End of file - total 198 lines)
</file>
```
```

```
Tool: read

**Input:**
```json
{
  "filePath": "/Users/aaron.west/Documents/Projects/flow-optimized-engineering/docs/docs/field-guides/observations/external/dora-2023-user-centricity.md"
}
```
**Output:**
```
<file>
00001| ---
00002| sidebar_position: 23
00003| title: "DORA 2023: User-Centricity Research"
00004| status: completed
00005| source_type: external
00006| source:
00007|   authors: ["Nicole Forsgren", "Derek DeBellis", "Dustin Smith", "Michelle Irvine"]
00008|   organization: "DORA / Google Cloud"
00009|   year: 2023
00010|   url: "https://dora.dev/research/2023/"
00011| methods:
00012|   - external-frameworks/double-diamond/methods/discover-phase
00013|   - external-frameworks/dora/methods/deployment-frequency
00014| ---
00015| 
00016| import RelatedMethods from '@site/src/components/RelatedMethods';
00017| 
00018| # DORA 2023: User-Centricity Research
00019| 
00020| > **Source:** DORA Research Team (2023), Google Cloud
00021| 
00022| The 2023 State of DevOps Report reveals that user-centric organizations significantly outperform those that don't prioritize user understanding, demonstrating a 40% increase in organizational performance when teams focus on understanding user needs before building solutions.
00023| 
00024| ## Context
00025| 
00026| **Environment:**
00027| - Organization: DORA (DevOps Research and Assessment), Google Cloud
00028| - Lead Researcher: Dr. Nicole Forsgren, PhD
00029| - Timeline: 2023 annual survey
00030| - Sample: Continuation of 39,000+ technology professionals surveyed across program history
00031| 
00032| **The Problem:**
00033| While DORA has extensively documented the technical practices that predict delivery performance, less research existed on how user-centricity (focusing on understanding users before building) affects outcomes. The 2023 report examined whether user-centric practices correlate with organizational performance.
00034| 
00035| **Research Questions:**
00036| - Does user-centricity predict organizational performance?
00037| - What practices characterize user-centric organizations?
00038| - How does user focus interact with technical delivery capabilities?
00039| 
00040| ## Hypothesis
00041| 
00042| The researchers hypothesized that organizations focused on understanding user needs before building would achieve better outcomes because they would be more likely to solve the right problems.
00043| 
00044| > "Teams that invest time in understanding user problems before jumping to solutions will achieve measurably better organizational performance."
00045| 
00046| **Variables:**
00047| - Independent: User-centricity practices (understanding user needs, incorporating feedback, measuring user satisfaction)
00048| - Dependent: Organizational performance (profitability, market share, customer satisfaction)
00049| 
00050| ## Approach
00051| 
00052| ### Methodology
00053| - **Design:** Quasi-observational field research using psychometric surveys
00054| - **Analysis:** Structural Equation Modeling (SEM) and cluster analysis
00055| - **Validation:** Uses scientifically validated, reliable survey measures consistent with prior DORA research
00056| 
00057| ### User-Centricity Measures
00058| 
00059| The research measured user-centricity through practices including:
00060| - Time spent understanding user needs before development
00061| - Incorporation of user feedback into product decisions
00062| - User satisfaction measurement and tracking
00063| - Cross-functional collaboration with user research roles
00064| 
00065| ### Data Collection
00066| - Annual State of DevOps survey
00067| - Self-reported data from technology professionals
00068| - Consistent methodology with 11+ years of DORA research
00069| 
00070| ## Results
00071| 
00072| ### Key Quantitative Findings
00073| 
00074| | Finding | Result |
00075| |---------|--------|
00076| | User-centricity impact | **40% higher organizational performance** |
00077| | Documentation quality | Dramatically increases capability effectiveness |
00078| | Generative culture | **30% higher organizational performance** |
00079| 
00080| ### Major Conclusions
00081| 
00082| 1. **User-centricity predicts performance:** Organizations that prioritize understanding users before building achieve significantly better outcomes
00083| 2. **Understanding before building pays off:** Time invested in user research yields measurable returns
00084| 3. **Documentation amplifies capability:** High-quality documentation makes other capabilities more effective
00085| 
00086| ### Connection to Discovery Practices
00087| 
00088| The findings directly support the Double Diamond's Discover phase:
00089| 
00090| | User-Centricity Practice | Double Diamond Alignment |
00091| |--------------------------|-------------------------|
00092| | Understanding user needs before building | **Discover Phase** - Divergent problem exploration |
00093| | Incorporating user feedback | **Define Phase** - Convergent problem definition |
00094| | Measuring user satisfaction | **Deliver Phase** - Validation feedback loops |
00095| 
00096| ## Analysis
00097| 
00098| ### What the Research Establishes
00099| 
00100| 1. **Quantifiable value of understanding:** The 40% performance differential provides concrete evidence that investing in user understanding has measurable returns
00101| 2. **Discovery investment is not waste:** Time spent in the Discover phase (understanding before building) is investment, not overhead
00102| 3. **Fast feedback through understanding:** User-centric practices create feedback loops that catch problems earlier
00103| 
00104| ### FOE Insights
00105| 
00106| **Understanding:**
00107| This research validates FOE's emphasis on "optimizing for understanding." The 40% performance differential shows that teams who invest in understanding user problems before building solutions achieve dramatically better outcomes. Understanding is not a nice-to-have—it's a competitive advantage.
00108| 
00109| **Feedback:**
00110| User-centricity embodies fast feedback principles. By understanding user needs early (during discovery), teams create feedback loops that prevent building the wrong thing. This is feedback at the problem level, not just the solution level.
00111| 
00112| **Confidence:**
00113| Teams that understand their users have justified confidence that they're solving real problems. The research shows this confidence is earned—user-centric teams actually achieve better outcomes, not just feel better about their work.
00114| 
00115| ## Limitations
00116| 
00117| - **Survey-based:** Self-reported data introduces potential response bias
00118| - **Correlation, not causation:** The research establishes correlation but cannot prove that user-centricity causes better outcomes
00119| - **Cross-sectional snapshot:** Single point-in-time measurement rather than longitudinal tracking
00120| - **Definition breadth:** "User-centricity" encompasses multiple practices; individual practice effects not isolated
00121| - **Context variation:** Results may vary by industry, company size, or technology stack
00122| 
00123| ### DORA's Warning
00124| > "Metrics and practices should be used for improvement, not comparison or competition between teams."
00125| 
00126| ## Conclusion
00127| 
00128| ### Verdict
00129| **Strongly Supported** - The DORA research program's established methodology and large sample size provide high confidence in the finding that user-centricity predicts organizational performance.
00130| 
00131| ### Key Learnings
00132| 
00133| 1. **Understanding users yields 40% better performance:** This is not a marginal improvement—it's a substantial competitive advantage
00134| 2. **Discovery is investment, not waste:** Time spent understanding problems before building solutions pays measurable returns
00135| 3. **User-centricity complements technical excellence:** High-performing teams need both delivery capabilities AND user focus
00136| 
00137| ### Recommendation
00138| 
00139| **Apply this when:**
00140| - Justifying investment in user research or discovery activities
00141| - Building the case for Discover phase practices
00142| - Countering pressure to "just start building"
00143| - Establishing user-centric practices in engineering culture
00144| 
00145| **Watch out for:**
00146| - Using this to delay delivery indefinitely (discovery should be time-boxed)
00147| - Treating user research as a checkbox rather than genuine understanding
00148| - Assuming any user contact counts as "user-centricity"
00149| 
00150| ### FOE Application
00151| 
00152| The DORA user-centricity research directly supports the Double Diamond's Discover phase and FOE's "optimize for understanding" principle:
00153| 
00154| | DORA Finding | FOE/Double Diamond Application |
00155| |--------------|-------------------------------|
00156| | 40% higher performance from user-centricity | Validates Discover phase investment |
00157| | Understanding before building | Core premise of "designing the right thing" |
00158| | Documentation amplifies capability | Supports shared understanding practices |
00159| | Generative culture predicts performance | Enables psychological safety for discovery |
00160| 
00161| ---
00162| 
00163| ## References
00164| 
00165| - DORA Team (2023). *State of DevOps Report 2023*. Google Cloud. Available at [dora.dev/research/2023](https://dora.dev/research/2023)
00166| - Forsgren, N., Humble, J., & Kim, G. (2018). *Accelerate: The Science of Lean Software and DevOps*. IT Revolution Press.
00167| - DORA Capabilities: [dora.dev/capabilities](https://dora.dev/capabilities)
00168| 
00169| ---
00170| 
00171| <RelatedMethods />
00172| 

(End of file - total 172 lines)
</file>
```
```

```
Tool: read

**Input:**
```json
{
  "filePath": "/Users/aaron.west/Documents/Projects/flow-optimized-engineering/docs/docs/field-guides/observations/internal/prima-bdd-api-testing-adoption.md"
}
```
**Output:**
```
<file>
00001| ---
00002| sidebar_position: 5
00003| title: "Prima: BDD Adoption for API Testing"
00004| status: completed
00005| source_type: internal
00006| methods:
00007|   - external-frameworks/bdd/methods/given-when-then
00008|   - external-frameworks/bdd/methods/executable-specifications
00009|   - external-frameworks/bdd/methods/gherkin
00010|   - external-frameworks/bdd/methods/discovery-workshops
00011|   - agentic-coding/methods/emerging/early-feedback-loop-investment
00012| ---
00013| 
00014| import RelatedMethods from '@site/src/components/RelatedMethods';
00015| 
00016| # Prima: BDD Adoption for API Testing
00017| 
00018| > **Timeline:** June 2025 - January 2026 (7+ months)
00019| > **Team:** Prima Platform Engineering
00020| 
00021| An internal observation documenting Prima's adoption of Behavior-Driven Development for API testing across the Control Tower and Engine services, growing from 0 to 56 feature files with measurable impacts on test coverage, maintenance patterns, and refactoring confidence.
00022| 
00023| ## Context
00024| 
00025| **Environment:**
00026| - Team: Prima Platform Engineering (E Simplicity Inc)
00027| - Timeline: June 9, 2025 - ongoing
00028| - Repositories: prima-control_tower, prima-engine
00029| - Stack: Playwright-BDD, TypeScript, Python backends
00030| 
00031| **The Problem:**
00032| Prima needed reliable API testing for a complex multi-service platform including Control Tower (admin/user management, LLM providers, workspaces, tools) and Engine (MCP protocol, AI orchestration). Traditional unit tests didn't capture API contract behavior effectively, and manual testing couldn't scale with rapid development.
00033| 
00034| **What We Tried:**
00035| Adopted Playwright-BDD with Gherkin feature files for end-to-end API testing, starting June 9, 2025 with two initial commits that established the test infrastructure.
00036| 
00037| ## Hypothesis
00038| 
00039| > "If we adopt BDD with Gherkin feature files for API testing, then we will achieve better API contract documentation and catch integration issues earlier, because executable specifications serve as both tests and living documentation that stakeholders can read."
00040| 
00041| **Variables:**
00042| - Independent: BDD adoption (feature files, step definitions, CI integration)
00043| - Dependent: Test coverage, defect detection timing, refactoring confidence, maintenance burden
00044| 
00045| ## Approach
00046| 
00047| ### Phase 1: Infrastructure Setup (June 9, 2025)
00048| 
00049| Two foundational commits established the BDD test stack:
00050| 
00051| ```
00052| d7ef3df feat(tests): add Playwright BDD testing setup with dotenv support
00053| 6f3fe35 feat(tests): initialize stack tests with Playwright and BDD integration
00054| ```
00055| 
00056| **Technology Choices:**
00057| - **Framework:** Playwright-BDD v8.3.0
00058| - **Runner:** Playwright (for HTTP client capabilities)
00059| - **Reporting:** Cucumber HTML reports
00060| - **CI:** `npm test` runs `bddgen` (generates tests from features) then `playwright test`
00061| 
00062| ### Phase 2: Initial Feature Coverage (June 2025)
00063| 
00064| First month focused on core API domains:
00065| 
00066| | Feature Area | Files Added | Coverage |
00067| |--------------|-------------|----------|
00068| | Workspaces | 3 | CRUD, membership |
00069| | Knowledgebases | 2 | CRUD, workspace linking |
00070| | Nodes | 2 | CRUD, type management |
00071| | Prompts | 2 | CRUD, versioning |
00072| | LLM APIs | 5 | Providers, credentials, models |
00073| | **Total** | **18** | Core admin/user APIs |
00074| 
00075| ### Phase 3: Expansion (August 2025)
00076| 
00077| Major expansion added 42 feature files covering:
00078| - Team management and budgets
00079| - Tool providers and instances
00080| - SCIM user provisioning
00081| - Service-to-service authentication
00082| - Guardrails and model configuration
00083| 
00084| ### Phase 4: Steady Growth (September 2025 - January 2026)
00085| 
00086| Continued additions at 8-10 features/month:
00087| - Authentication flows (password, SSO)
00088| - Workspace manager permissions
00089| - API token management
00090| - External service credentials
00091| 
00092| ### Organization Pattern
00093| 
00094| Features organized by domain tags for selective execution:
00095| 
00096| ```bash
00097| # Run only admin features
00098| BDD_TAGS=admin npm test
00099| 
00100| # Run admin and user features  
00101| BDD_TAGS=admin,user npm test
00102| ```
00103| 
00104| | Tag | Scope |
00105| |-----|-------|
00106| | `@admin` | Admin-only backend APIs |
00107| | `@user` | Regular user endpoints |
00108| | `@manager` | Resource manager capabilities |
00109| | `@service` | Service-principal integrations |
00110| 
00111| ## Results
00112| 
00113| ### Quantitative Metrics
00114| 
00115| **Feature File Growth:**
00116| 
00117| | Month | Files Added | Cumulative |
00118| |-------|-------------|------------|
00119| | June 2025 | 18 | 18 |
00120| | July 2025 | 0 | 18 |
00121| | August 2025 | 42 | 60 |
00122| | September 2025 | 10 | 70 |
00123| | October 2025 | 3 | 73 |
00124| | November 2025 | 8 | 81 |
00125| | December 2025 | 9 | 90 |
00126| 
00127| **Final Count:** 56 feature files (50 in Control Tower, 6 in Engine)
00128| 
00129| **Commit Analysis (June 2025 - January 2026):**
00130| 
00131| | Metric | Control Tower (Strong BDD) | Prima-Web (No BDD) | Engine (Partial BDD) |
00132| |--------|---------------------------|--------------------|--------------------|
00133| | Total commits | 1,126 | 707 | 847 |
00134| | Fix commits | 121 (10.7%) | 73 (10.3%) | 52 (6.1%) |
00135| | Revert commits | 13 (1.2%) | 7 (1.0%) | 7 (0.8%) |
00136| | **Refactor commits** | **122 (10.8%)** | **11 (1.6%)** | **90 (10.6%)** |
00137| 
00138| **Key Finding:** BDD-enabled repositories show **6-7x higher refactoring rates** (10.8% vs 1.6%), suggesting executable specifications enable confident code restructuring.
00139| 
00140| **Step Definition Maintenance:**
00141| - 121 commits touching step definitions over 7 months
00142| - Average: ~17 step-related commits per month
00143| - Pattern: Step definitions evolved alongside features, not separately
00144| 
00145| ### Qualitative Observations
00146| 
00147| **Benefits Realized:**
00148| 
00149| 1. **API Contracts as Documentation** - Feature files serve as readable API documentation:
00150|    ```gherkin
00151|    Scenario: Create credential with both key and access_key_id returns masked values
00152|      When I POST "/admin/llm/provider-credentials" with JSON body:
00153|        """
00154|        {
00155|          "name": "__test_cred-akid-key-{run8}",
00156|          "key": "sekret",
00157|          "access_key_id": "akid-123"
00158|        }
00159|        """
00160|      Then the response status should be 201
00161|      And the value at "key" should equal "****"
00162|      And the value at "access_key_id" should equal "****"
00163|    ```
00164| 
00165| 2. **Regression Detection** - BDD tests caught issues during development:
00166|    - "fixing bdd test failures" commits indicate tests catching breaking changes
00167|    - "231-bug-tool-provider-bdd-failures" branch shows BDD surfacing integration issues
00168| 
00169| 3. **Refactoring Confidence** - High refactor rate (10.8%) in BDD repos vs low rate (1.6%) in non-BDD repos suggests tests enabled safe restructuring
00170| 
00171| **Challenges Encountered:**
00172| 
00173| 1. **Step Definition Maintenance** - 121 commits over 7 months shows ongoing investment:
00174|    ```
00175|    abc1ade add missing When import
00176|    3fb7091 Add new step definitions for JSON path assertions
00177|    8d4af59 fixing test
00178|    06545b5 fix BDD test
00179|    ```
00180| 
00181| 2. **Test Reliability** - Some commits address test flakiness:
00182|    ```
00183|    4434c0c Fix BDD test auth bleeding
00184|    996a406 BDD context fix
00185|    ```
00186| 
00187| 3. **Initial Investment** - August 2025 saw 42 feature files added, indicating significant upfront effort to achieve coverage
00188| 
00189| ## Analysis
00190| 
00191| ### What the Observation Establishes
00192| 
00193| 1. **BDD scales for API testing** - 56 feature files across two services demonstrates viability at scale
00194| 
00195| 2. **Refactoring confidence is measurable** - 6-7x higher refactoring rate in BDD repos provides quantitative evidence that executable specifications enable safe code changes
00196| 
00197| 3. **Maintenance is real but manageable** - ~17 step-related commits/month is non-trivial but sustainable for a platform of this complexity
00198| 
00199| 4. **Living documentation works** - Feature files like `admin_llm_provider_credentials.feature` (189 lines) serve as comprehensive API contract documentation
00200| 
00201| ### FOE Insights
00202| 
00203| **Understanding:**
00204| The Gherkin feature files create shared understanding of API behavior that code alone cannot provide. A stakeholder can read:
00205| 
00206| ```gherkin
00207| Scenario: Deleting a credential that is in use returns 409
00208| ```
00209| 
00210| ...and understand the business rule without reading Python code. This aligns with FOE's principle that understanding should be optimized through explicit documentation.
00211| 
00212| **Feedback:**
00213| BDD provides fast feedback at the API contract level:
00214| - Specs run on every PR
00215| - Failures surface integration issues before deployment
00216| - The 10.7% fix rate in Control Tower includes issues caught by BDD before production
00217| 
00218| The feedback loop operates at the behavioral level, not just unit level, catching issues that unit tests miss.
00219| 
00220| **Confidence:**
00221| The 6-7x higher refactoring rate is the quantified payoff of confidence:
00222| - Developers refactor more when they trust tests will catch regressions
00223| - Non-BDD repo (prima-web) has 1.6% refactor rate - developers may be avoiding changes
00224| - BDD-enabled repos show sustained improvement activity
00225| 
00226| ## Limitations
00227| 
00228| - **Correlation vs causation:** Higher refactor rate could be due to team differences, not BDD
00229| - **Single team:** All repos maintained by same organization; may not generalize
00230| - **No A/B test:** Same features weren't tested with and without BDD
00231| - **Maintenance costs unclear:** Step definition time investment not tracked separately
00232| - **Selection bias:** BDD adopted for APIs, not UI - may work better for API testing
00233| 
00234| ## Conclusion
00235| 
00236| ### Verdict
00237| **Supported** - BDD adoption for API testing delivered measurable benefits: extensive coverage (56 feature files), readable documentation, and quantifiably higher refactoring confidence. Maintenance burden is real but manageable.
00238| 
00239| ### Key Learnings
00240| 
00241| 1. **Start with infrastructure** - Two commits established the foundation that enabled everything else
00242| 2. **Expand deliberately** - Initial 18 features, then major 42-file expansion once patterns proven
00243| 3. **Organize by domain** - Tag-based organization (@admin, @user, @service) enables selective execution
00244| 4. **Expect step maintenance** - ~17 commits/month on step definitions is the ongoing cost
00245| 5. **Refactoring payoff is real** - 6-7x higher refactor rate justifies the investment
00246| 
00247| ### Recommendation
00248| 
00249| **Apply BDD for API testing when:**
00250| - API contracts need documentation that stays current
00251| - Multiple services integrate through APIs
00252| - Refactoring confidence is limiting code improvement
00253| - Team is willing to invest in step definition maintenance
00254| 
00255| **Watch out for:**
00256| - Underestimating step definition maintenance
00257| - Brittle tests that break on implementation details
00258| - Auth/context bleeding between scenarios (we had to fix this)
00259| 
00260| ### Metrics for Replication
00261| 
00262| Teams replicating this observation should track:
00263| - Feature file count over time
00264| - Fix commit ratio (expect ~10%)
00265| - Refactor commit ratio (expect increase with BDD)
00266| - Step definition commits per month
00267| - Test execution time trends
00268| 
00269| ---
00270| 
00271| ## References
00272| 
00273| - Prima Control Tower repository (internal)
00274| - Prima Engine repository (internal)
00275| - Playwright-BDD documentation: https://vitalets.github.io/playwright-bdd/
00276| 
00277| ---
00278| 
00279| <RelatedMethods />
00280| 

(End of file - total 280 lines)
</file>
```
```

```
Tool: read

**Input:**
```json
{
  "filePath": "/Users/aaron.west/Documents/Projects/flow-optimized-engineering/docs/docs/field-guides/observations/external/ebay-contract-testing-adoption.md"
}
```
**Output:**
```
<file>
00001| ---
00002| sidebar_position: 22
00003| title: "eBay: Contract Testing Adoption Case Study"
00004| status: completed
00005| source_type: external
00006| source:
00007|   authors: ["Xiaoye Wang", "Simon Wang", "Daphne Huang", "David Van Couvering", "Qingyuan Liu"]
00008|   organization: "eBay"
00009|   year: 2023
00010|   url: "https://innovation.ebayinc.com/stories/api-evolution-with-confidence-a-case-study-of-contract-testing-adoption-at-ebay/"
00011| methods:
00012|   - architecture/methods/emerging/consumer-contract-testing
00013| ---
00014| 
00015| import RelatedMethods from '@site/src/components/RelatedMethods';
00016| 
00017| # eBay: Contract Testing Adoption Case Study
00018| 
00019| > **Source:** Xiaoye Wang, Simon Wang, Daphne Huang, David Van Couvering, Qingyuan Liu (2023) | eBay Innovation
00020| 
00021| This case study documents eBay's enterprise-scale adoption of consumer-driven contract testing, including internal tooling investments and organizational learnings from implementing CDC across a large microservices architecture.
00022| 
00023| ## Context
00024| 
00025| **Environment:**
00026| - Organization: eBay (global e-commerce platform)
00027| - Timeline: 2023 publication (implementation ongoing)
00028| - Scale: Large microservices architecture with many API integrations
00029| - Authors: Cross-functional team from eBay engineering
00030| 
00031| **The Problem:**
00032| eBay faced challenges common to large microservices architectures:
00033| - API changes risking consumer breakage
00034| - End-to-end testing becoming expensive and brittle
00035| - Difficulty evolving services with confidence
00036| - Coordination overhead between provider and consumer teams
00037| 
00038| **Research Questions:**
00039| - How can large organizations adopt contract testing at scale?
00040| - What tooling and processes enable CDC in enterprise environments?
00041| - What benefits does CDC provide for API evolution confidence?
00042| 
00043| ## Hypothesis
00044| 
00045| > "If eBay implements consumer-driven contract testing with appropriate tooling, then teams can evolve APIs with confidence because contract verification catches breaking changes before production."
00046| 
00047| ## Approach
00048| 
00049| ### Implementation Strategy
00050| 
00051| eBay's approach included several key decisions:
00052| 
00053| | Decision | Rationale |
00054| |----------|-----------|
00055| | **Pact framework** | Industry-standard CDC testing framework |
00056| | **Internal tooling** | Built "Pact Initializer" to integrate with eBay's ecosystem |
00057| | **Developer workflow integration** | Made CDC part of standard development flow |
00058| | **Staged rollout** | Progressive adoption across teams |
00059| 
00060| ### Pact Initializer: Internal Tooling
00061| 
00062| eBay built internal tooling to reduce adoption friction:
00063| 
00064| > "eBay built internal tooling (Pact Initializer) to deeply integrate CDC workflow into their development ecosystem."
00065| 
00066| This tooling addressed:
00067| - Setup complexity
00068| - Integration with eBay's CI/CD systems
00069| - Standard configurations for eBay's technology stack
00070| 
00071| ### Contract Testing Workflow
00072| 
00073| The case study describes the standard CDC workflow eBay adopted:
00074| 
00075| 1. **Consumer defines expectations** - Consumer tests specify what they need from provider
00076| 2. **Contracts generated** - Pact files capture these expectations
00077| 3. **Provider verifies** - Provider builds run consumer contracts
00078| 4. **Breaking changes detected** - Failures indicate incompatible changes
00079| 5. **Deployment decision** - "Can I Deploy" check gates releases
00080| 
00081| ## Results
00082| 
00083| ### Key Finding: Confidence in API Evolution
00084| 
00085| The primary outcome eBay reports:
00086| 
00087| > "Contract testing is valuable for testing integration points in microservices architecture and can help evolve services with confidence."
00088| 
00089| ### Comparative Benefits
00090| 
00091| eBay explicitly compares CDC to alternatives:
00092| 
00093| | Testing Approach | Characteristic |
00094| |------------------|----------------|
00095| | **End-to-End** | Slow, brittle, expensive, requires integrated environment |
00096| | **Contract Testing** | Fast, stable, isolated, runs in unit test context |
00097| 
00098| > "Contract testing promotes isolated unit tests against integration points based on predefined contracts rather than real end-to-end interactions, making tests comparatively fast and stable."
00099| 
00100| ### Enterprise-Scale Validation
00101| 
00102| The case study validates that CDC works at enterprise scale:
00103| - Large microservices architecture
00104| - Multiple teams and services
00105| - Complex API dependencies
00106| - Investment in internal tooling justified by benefits
00107| 
00108| ### Developer Experience Improvements
00109| 
00110| eBay found CDC improved their development workflow:
00111| - Faster feedback on integration compatibility
00112| - Reduced dependency on integrated test environments
00113| - Clearer understanding of consumer needs
00114| - Confidence to make API changes
00115| 
00116| ## Analysis
00117| 
00118| ### What the Research Establishes
00119| 
00120| 1. **CDC works at enterprise scale** - eBay's large architecture successfully adopted it
00121| 2. **Tooling investment is justified** - Building Pact Initializer paid off
00122| 3. **Fast and stable tests** - Contract tests outperform E2E for integration validation
00123| 4. **API evolution confidence** - Primary benefit is safe service evolution
00124| 5. **Developer experience improves** - Faster feedback, clearer contracts
00125| 
00126| ### Enterprise Adoption Patterns
00127| 
00128| The case study reveals patterns for large-scale CDC adoption:
00129| 
00130| | Pattern | Description |
00131| |---------|-------------|
00132| | **Internal tooling** | Invest in tools that integrate CDC with your ecosystem |
00133| | **Workflow integration** | Make CDC part of standard development flow |
00134| | **Progressive adoption** | Roll out gradually across teams |
00135| | **Developer education** | Teams need to understand contract concepts |
00136| 
00137| ### Comparison to Gov.UK Pay
00138| 
00139| eBay's experience mirrors the Gov.UK Pay case study:
00140| 
00141| | Organization | Before CDC | After CDC |
00142| |--------------|------------|-----------|
00143| | **Gov.UK Pay** | "E2E tests were time-consuming, unsustainable, resource intensive" | "Confidence that any service will be compatible" |
00144| | **eBay** | Traditional E2E testing challenges | "Evolve services with confidence" |
00145| 
00146| ### FOE Insights
00147| 
00148| **Understanding:**
00149| eBay's experience shows that contracts improve understanding at scale. When many teams work on interconnected services, explicit contracts document what consumers actually need. The Pact Initializer tooling further improves understanding by making contract setup consistent and discoverable.
00150| 
00151| **Feedback:**
00152| The case study emphasizes "fast and stable" tests. CDC replaces slow, brittle E2E tests with isolated contract tests that run in unit test context. This dramatically accelerates feedback—teams learn about integration issues during their build, not when deploying to an integrated environment.
00153| 
00154| **Confidence:**
00155| The phrase "evolve services with confidence" appears repeatedly. This is the core benefit: teams can change their APIs knowing that consumer contracts will catch breaking changes. This confidence enables faster evolution and reduces the fear-based coordination that slows microservices teams.
00156| 
00157| ## Limitations
00158| 
00159| - **Single organization:** Results specific to eBay's context
00160| - **Qualitative outcomes:** Case study doesn't include specific metrics (e.g., deployment frequency improvement)
00161| - **Tooling investment required:** Pact Initializer represents significant internal investment
00162| - **Organizational readiness:** Requires consumer-provider team collaboration
00163| - **Publication bias:** Success story may not reflect challenges
00164| 
00165| ### What's Not Covered
00166| 
00167| The case study doesn't detail:
00168| - Quantitative before/after metrics
00169| - Adoption challenges or failures
00170| - Learning curve for teams
00171| - Cost of tooling development
00172| - Ongoing maintenance burden
00173| 
00174| ## Conclusion
00175| 
00176| ### Verdict
00177| **Supported (Case Study)** - eBay's experience validates CDC at enterprise scale, though as a single-organization case study, generalizability requires additional evidence.
00178| 
00179| ### Key Learnings
00180| 
00181| 1. **CDC scales to enterprise** - Large microservices architectures benefit from contract testing
00182| 2. **Tooling investment pays off** - Internal tools (Pact Initializer) reduce adoption friction
00183| 3. **Fast, stable tests** - CDC outperforms E2E for integration validation
00184| 4. **API evolution confidence** - Primary value proposition validated
00185| 5. **Developer experience matters** - Workflow integration improves adoption
00186| 
00187| ### Recommendation
00188| 
00189| **Apply this when:**
00190| - Operating a microservices architecture at scale
00191| - E2E tests are bottlenecking deployment velocity
00192| - Multiple teams need to evolve services independently
00193| - Willing to invest in tooling and developer education
00194| 
00195| **Watch out for:**
00196| - Underestimating tooling investment
00197| - Expecting instant adoption without developer education
00198| - Treating CDC as replacement for all integration testing
00199| - Ignoring the need for consumer-provider collaboration
00200| 
00201| ### FOE Application
00202| 
00203| | FOE Principle | eBay's Experience |
00204| |---------------|-------------------|
00205| | **Understanding** | Contracts document consumer needs explicitly |
00206| | **Feedback** | Fast, stable tests in unit test context |
00207| | **Confidence** | "Evolve services with confidence" |
00208| 
00209| ### Enterprise Relevance
00210| 
00211| eBay's scale and complexity make this case study particularly relevant for organizations asking "Does CDC work for large architectures?" The answer is yes—with appropriate investment in tooling and adoption support.
00212| 
00213| ---
00214| 
00215| ## References
00216| 
00217| - eBay Innovation Blog: [API Evolution with Confidence](https://innovation.ebayinc.com/stories/api-evolution-with-confidence-a-case-study-of-contract-testing-adoption-at-ebay/)
00218| - Pact Framework: [pact.io](https://pact.io)
00219| - Gov.UK Pay Case Study: [docs.pact.io/users/case_studies/case_study_govuk](https://docs.pact.io/users/case_studies/case_study_govuk)
00220| 
00221| ---
00222| 
00223| <RelatedMethods />
00224| 

(End of file - total 224 lines)
</file>
```
```

```
Tool: read

**Input:**
```json
{
  "filePath": "/Users/aaron.west/Documents/Projects/flow-optimized-engineering/docs/docs/field-guides/observations/external/robinson-consumer-driven-contracts.md"
}
```
**Output:**
```
<file>
00001| ---
00002| sidebar_position: 21
00003| title: "Consumer-Driven Contracts: A Service Evolution Pattern"
00004| status: completed
00005| source_type: external
00006| source:
00007|   authors: ["Ian Robinson"]
00008|   organization: "ThoughtWorks"
00009|   year: 2006
00010|   url: "https://martinfowler.com/articles/consumerDrivenContracts.html"
00011| methods:
00012|   - architecture/methods/emerging/consumer-contract-testing
00013| ---
00014| 
00015| import RelatedMethods from '@site/src/components/RelatedMethods';
00016| 
00017| # Consumer-Driven Contracts: A Service Evolution Pattern
00018| 
00019| > **Source:** Ian Robinson (2006) | ThoughtWorks / martinfowler.com
00020| 
00021| This foundational paper introduced the Consumer-Driven Contracts pattern, establishing the theoretical basis for how services can evolve independently while maintaining consumer compatibility.
00022| 
00023| ## Context
00024| 
00025| **Environment:**
00026| - Author: Ian Robinson, ThoughtWorks consultant
00027| - Timeline: Published June 2006
00028| - Platform: martinfowler.com (influential software development blog)
00029| 
00030| **The Problem:**
00031| Service-oriented architectures create coupling between providers and consumers. When providers change their contracts (APIs, message formats, protocols), consumers may break. Traditional approaches forced providers to either:
00032| 1. Never change (stagnation)
00033| 2. Version everything (complexity explosion)
00034| 3. Break consumers (coordination overhead)
00035| 
00036| **Research Questions:**
00037| - How can services evolve without breaking consumers?
00038| - What patterns enable independent service deployment?
00039| - How can providers understand their consumer obligations?
00040| 
00041| ## Hypothesis
00042| 
00043| > "If contracts are driven by consumer needs rather than provider assumptions, then services can evolve independently because providers have insight into what consumers actually require versus what they merely expose."
00044| 
00045| ## Approach
00046| 
00047| ### The Core Insight: Consumer-Driven vs Provider-Driven
00048| 
00049| Robinson distinguishes two approaches to contracts:
00050| 
00051| | Approach | Definition | Consequence |
00052| |----------|------------|-------------|
00053| | **Provider-Driven** | Provider publishes full schema; consumers use what they need | Provider doesn't know what matters to consumers |
00054| | **Consumer-Driven** | Consumers express what they need; providers honor those needs | Provider can safely evolve non-used parts |
00055| 
00056| ### The Pattern Structure
00057| 
00058| Robinson defines Consumer-Driven Contracts through three components:
00059| 
00060| 1. **Provider Contract:** What the provider offers
00061| 2. **Consumer Contract:** What a specific consumer requires (subset of provider contract)
00062| 3. **Consumer-Driven Contract:** Aggregate of all consumer contracts that provider must honor
00063| 
00064| ### Contract Types
00065| 
00066| The paper identifies what contracts can specify:
00067| 
00068| | Contract Element | Examples |
00069| |------------------|----------|
00070| | **Schema** | Field names, types, required vs optional |
00071| | **Protocol** | HTTP methods, message formats, error codes |
00072| | **QoS** | Latency expectations, availability requirements |
00073| 
00074| ## Results
00075| 
00076| ### Key Finding: Providers Gain Insight
00077| 
00078| The central contribution:
00079| 
00080| > "Consumer-driven contracts imbue providers with insight into their consumer obligations, and focus service evolution around the delivery of key business functionality demanded by consumers."
00081| 
00082| ### The Contract Testing Pattern
00083| 
00084| Robinson describes how consumer-driven contracts enable automated testing:
00085| 
00086| 1. **Consumer writes tests** expressing their contract expectations
00087| 2. **Tests run against provider** during provider's build
00088| 3. **Provider changes** that break consumer contracts are detected immediately
00089| 4. **Provider can safely change** anything not covered by consumer contracts
00090| 
00091| ### Enabling Independent Evolution
00092| 
00093| The pattern enables both parties to evolve:
00094| 
00095| | Actor | Freedom | Constraint |
00096| |-------|---------|------------|
00097| | **Consumer** | Can change how they use provider | Must express needs as contract |
00098| | **Provider** | Can change anything not in consumer contracts | Must honor consumer contracts |
00099| 
00100| ### Versioning Insight
00101| 
00102| Rather than full-API versioning, CDC enables:
00103| 
00104| > "The consumer-driven approach allows providers to version at the level of individual resources and capabilities rather than the service as a whole."
00105| 
00106| This reduces versioning overhead significantly.
00107| 
00108| ## Analysis
00109| 
00110| ### What the Research Establishes
00111| 
00112| 1. **Contracts should be consumer-driven** - Providers can't evolve what they don't understand
00113| 2. **Explicit contracts enable independence** - Both parties can change within boundaries
00114| 3. **Testing validates contracts** - Automated verification replaces manual coordination
00115| 4. **Granular evolution** - Version individual capabilities, not entire APIs
00116| 5. **Insight beats assumptions** - Providers learn what consumers actually need
00117| 
00118| ### The Foundation for Modern CDC Testing
00119| 
00120| This paper established concepts that tools like Pact later implemented:
00121| 
00122| | Robinson's Concept | Pact Implementation |
00123| |--------------------|---------------------|
00124| | Consumer contracts | Pact files (JSON contracts) |
00125| | Contract tests | Provider verification tests |
00126| | Consumer-driven evolution | Can I Deploy workflow |
00127| | Granular versioning | Contract matrix with participants |
00128| 
00129| ### FOE Insights
00130| 
00131| **Understanding:**
00132| Consumer-driven contracts make implicit assumptions explicit. Rather than providers guessing what consumers need (and consumers hoping providers won't change what they use), both parties have a shared understanding documented in contracts. This improves comprehension for everyone involved, including newcomers trying to understand system integration.
00133| 
00134| **Feedback:**
00135| The paper establishes the pattern that enables build-time feedback on integration compatibility. Robinson's insight that consumer tests should run during provider builds means providers get immediate signal when they break consumers—before deployment, not after.
00136| 
00137| **Confidence:**
00138| CDC provides confidence for both parties:
00139| - **Consumers:** Confidence that providers will honor their needs
00140| - **Providers:** Confidence that changes not covered by contracts are safe
00141| 
00142| This enables the confident, independent deployment that modern microservices require.
00143| 
00144| ## Limitations
00145| 
00146| - **Conceptual paper:** Describes the pattern without implementation guidance
00147| - **Pre-microservices era:** Written before the microservices movement
00148| - **Tool gap:** Pact and similar tools didn't exist until years later
00149| - **Organizational requirements:** Requires consumer-provider collaboration
00150| - **Adoption barrier:** Requires both sides to participate
00151| 
00152| ### Important Context
00153| 
00154| This paper predates:
00155| - Microservices architecture (Martin Fowler, 2014)
00156| - Pact framework (2014)
00157| - The DevOps movement
00158| - Container orchestration
00159| 
00160| Yet the concepts translate directly to modern practice, validating their fundamental soundness.
00161| 
00162| ## Conclusion
00163| 
00164| ### Verdict
00165| **Foundational Evidence** - This paper established the theoretical basis for consumer-driven contract testing. While not empirical research, it provides the conceptual framework that subsequent tools and practices implemented.
00166| 
00167| ### Key Learnings
00168| 
00169| 1. **Consumer-driven beats provider-driven** - Providers need insight into consumer needs
00170| 2. **Contracts enable independent evolution** - Both parties can change within boundaries
00171| 3. **Tests validate contracts** - Automated verification during build
00172| 4. **Granular evolution** - Version capabilities, not entire APIs
00173| 5. **The pattern is timeless** - Written in 2006, still foundational today
00174| 
00175| ### Recommendation
00176| 
00177| **Apply this when:**
00178| - Designing service contracts in distributed systems
00179| - Adopting CDC testing tools like Pact
00180| - Explaining why CDC matters to stakeholders
00181| - Teaching teams about service evolution patterns
00182| 
00183| **Watch out for:**
00184| - Treating this as implementation guidance (it's conceptual)
00185| - Applying pre-microservices context to modern tools
00186| - Expecting consumer contracts to write themselves
00187| 
00188| ### FOE Application
00189| 
00190| | FOE Principle | CDC Pattern Contribution |
00191| |---------------|--------------------------|
00192| | **Understanding** | Explicit contracts document real dependencies |
00193| | **Feedback** | Consumer tests run during provider builds |
00194| | **Confidence** | Both parties can evolve independently |
00195| 
00196| ### Historical Significance
00197| 
00198| This paper's enduring relevance—20 years later, it remains the conceptual foundation for CDC testing—demonstrates that well-reasoned patterns outlast specific technologies.
00199| 
00200| ---
00201| 
00202| ## References
00203| 
00204| - Original Paper: [martinfowler.com/articles/consumerDrivenContracts.html](https://martinfowler.com/articles/consumerDrivenContracts.html)
00205| - Pact Framework (implements these concepts): [pact.io](https://pact.io)
00206| - Martin Fowler's Contract Test bliki: [martinfowler.com/bliki/ContractTest.html](https://martinfowler.com/bliki/ContractTest.html)
00207| 
00208| ---
00209| 
00210| <RelatedMethods />
00211| 

(End of file - total 211 lines)
</file>
```
```

```
Tool: read

**Input:**
```json
{
  "filePath": "/Users/aaron.west/Documents/Projects/flow-optimized-engineering/docs/docs/field-guides/observations/external/nummi-plant-transformation.md"
}
```
**Output:**
```
<file>
00001| ---
00002| sidebar_position: 3
00003| title: "NUMMI: Same Workers, Different System"
00004| status: completed
00005| source_type: external
00006| source:
00007|   authors: ["James Womack", "Daniel Jones", "Daniel Roos"]
00008|   organization: "MIT International Motor Vehicle Program"
00009|   year: 1990
00010|   url: "https://www.lean.org/the-lean-post/articles/nummi-the-plant-that-changed-the-auto-industry/"
00011| methods:
00012|   - architecture/methods/emerging/system-over-individuals
00013| ---
00014| 
00015| import RelatedMethods from '@site/src/components/RelatedMethods';
00016| 
00017| # NUMMI: Same Workers, Different System
00018| 
00019| > **Source:** Womack, Jones & Roos (1990), MIT IMVP Study
00020| 
00021| The NUMMI (New United Motor Manufacturing, Inc.) plant transformation demonstrates that system design, not individual talent, determines outcomes. GM's worst-performing plant, with workers described as "the worst workforce in the automobile industry," became one of America's best after implementing the Toyota Production System - with 85%+ of the same employees.
00022| 
00023| ## Context
00024| 
00025| **Environment:**
00026| - Organization: NUMMI (GM/Toyota joint venture)
00027| - Location: Fremont, California
00028| - Timeline: 1984-2010 (26 years of operation)
00029| - Total Production: ~8 million vehicles
00030| 
00031| **The Problem:**
00032| In 1982, GM closed its Fremont Assembly plant - its worst-performing facility. Workers were described by UAW leadership as "the worst workforce in the automobile industry." The plant suffered from:
00033| - Rampant absenteeism (often enough to prevent production line starts)
00034| - Alcohol and marijuana use on the factory floor
00035| - Sabotage (workers placed bottles inside door panels)
00036| - Adversarial management-labor relations
00037| - Defects routinely passed down the line for later repair
00038| 
00039| **The Opportunity:**
00040| Toyota wanted to learn about American workers and suppliers. GM wanted to learn the Toyota Production System. A joint venture was born, reopening the Fremont plant in 1984.
00041| 
00042| ## Hypothesis
00043| 
00044| > "If the same workers operate within a different system (Toyota Production System), then quality and productivity will dramatically improve because outcomes are determined by system design, not individual capability."
00045| 
00046| **Variables:**
00047| - Independent: Production system (GM traditional → Toyota Production System)
00048| - Dependent: Quality (defects per vehicle), productivity (assembly hours), worker satisfaction
00049| 
00050| **Critical Control:**
00051| 85%+ of the workforce were the **same employees** from the failed GM plant. This natural observation isolated system design as the variable.
00052| 
00053| ## Approach
00054| 
00055| ### The Transformation
00056| 
00057| **Phase 1: Training**
00058| - Workers sent to Toyota's Takaoka plant in Japan
00059| - Learned Toyota Production System firsthand
00060| - Experienced the culture of continuous improvement
00061| 
00062| **Phase 2: System Implementation**
00063| Key changes from GM's traditional approach:
00064| 
00065| | Aspect | GM (Before) | Toyota/NUMMI (After) |
00066| |--------|-------------|---------------------|
00067| | Defect handling | Pass defects down the line for later repair | Stop the line immediately (andon cord) |
00068| | Worker voice | No input on process | Every worker can suggest improvements |
00069| | Management style | Adversarial, hierarchical | Collaborative, equal treatment |
00070| | Job security | Layoffs common | No-layoff policy |
00071| | Physical symbols | Separate parking, cafeterias by rank | Same uniforms, parking, cafeterias for all |
00072| | Decision-making | Top-down mandates | Consensus building |
00073| 
00074| ### The Andon Cord
00075| 
00076| The most visible symbol of the transformation: any worker could pull a cord to stop the entire production line if they spotted a defect. In GM's old system, this would have been unthinkable - stopping the line cost money, and workers had no authority.
00077| 
00078| At NUMMI, stopping the line was encouraged. Problems were fixed at the source rather than passed downstream.
00079| 
00080| ## Results
00081| 
00082| ### Quantitative Results
00083| 
00084| | Metric | GM Fremont (Before) | NUMMI (After) |
00085| |--------|---------------------|---------------|
00086| | Quality (defects per 100 vehicles) | Among worst in GM | **Equal to Japan** |
00087| | Absenteeism | Frequently production-stopping | Dramatically reduced |
00088| | Worker grievances | Constant | Minimal |
00089| | Production capability | Failed | 428,633 vehicles (2006 peak) |
00090| 
00091| ### MIT International Motor Vehicle Program Comparison
00092| 
00093| The MIT study of global auto manufacturing confirmed NUMMI's results in context:
00094| 
00095| | Metric | Toyota/Lean Plants | Traditional Mass Production |
00096| |--------|-------------------|----------------------------|
00097| | Assembly hours per vehicle | 16.8 | 25.1 |
00098| | Assembly defects per 100 vehicles | 60 | 130+ |
00099| | Inventory (work in progress) | 2 hours | 2 weeks |
00100| 
00101| ### Total NUMMI Output
00102| - ~8 million vehicles produced over 26 years
00103| - Toyota Corollas and Tacomas, Pontiac Vibes, Chevrolet Novas
00104| - Quality consistently matched Japanese production
00105| 
00106| ### What Happened to GM?
00107| 
00108| Despite sending managers to learn at NUMMI for over a decade, GM failed to implement lean manufacturing across its US plants:
00109| 
00110| - By 1998 (15 years later), GM still hadn't transformed other plants
00111| - GM managers who trained at NUMMI succeeded in implementing lean in **Brazil** plants
00112| - US organizational resistance prevented domestic adoption
00113| - **GM filed for bankruptcy in 2009**
00114| 
00115| > "The resistance wasn't technical. It was cultural and organizational."
00116| 
00117| ## Analysis
00118| 
00119| ### What the Observation Establishes
00120| 
00121| 1. **System > Individuals:** The same workers who produced GM's worst results produced some of America's best - when operating in a different system
00122| 2. **Culture is the system:** The Toyota Production System isn't just tools; it's beliefs, norms, and relationships
00123| 3. **Transfer is hard:** GM couldn't transfer the learning despite 15+ years of exposure
00124| 4. **Small batches work:** JIT, stopping the line, and immediate defect correction produced better outcomes than batch-and-queue
00125| 
00126| ### Why GM Failed to Learn
00127| 
00128| The NUMMI observation created a natural control group: GM itself. Key barriers to learning:
00129| 
00130| 1. **Middle management resistance:** Lean manufacturing threatens traditional supervisory roles
00131| 2. **Short-term thinking:** Stopping the line costs money today; quality saves money later
00132| 3. **Labor relations:** GM's adversarial history made collaboration feel risky
00133| 4. **Incentive structures:** GM managers weren't rewarded for quality improvements
00134| 5. **Not-invented-here:** Pride prevented adoption of "foreign" methods
00135| 
00136| ### The Deepest Insight
00137| 
00138| > "It wasn't the workers. It was the system. Give those 'worst' workers a system designed for quality, respect, and continuous improvement, and they become among the best."
00139| 
00140| This is the foundational insight for FOE: optimize the system, not the individuals.
00141| 
00142| ### FOE Insights
00143| 
00144| **Understanding:**
00145| The Toyota Production System is fundamentally about making work visible and understandable. The andon cord, kanban boards, and standard work all serve to make the production process legible. When everyone can see and understand the system, everyone can improve it.
00146| 
00147| **Feedback:**
00148| NUMMI's transformation centered on tightening feedback loops:
00149| - **Immediate defect detection:** Stop the line when problems occur, not later
00150| - **Continuous improvement:** Worker suggestions implemented quickly
00151| - **Visual management:** Problems visible to everyone, not hidden in reports
00152| - **Small batches:** 2 hours of inventory vs. 2 weeks means problems surface 168x faster
00153| 
00154| **Confidence:**
00155| The system built confidence through:
00156| - **No-layoff policy:** Workers could suggest improvements without fearing job loss
00157| - **Authority to stop:** Workers trusted to make production decisions
00158| - **Equal treatment:** No class distinctions between management and workers
00159| - **Proven methods:** Standard work that had been validated
00160| 
00161| ## Limitations
00162| 
00163| - **Single plant:** While dramatic, this is one factory
00164| - **Selection effects:** Workers who returned may have been more motivated
00165| - **Toyota involvement:** Toyota's direct management was crucial; results might differ with only knowledge transfer
00166| - **Manufacturing vs. software:** Direct translation to software development requires interpretation
00167| - **Historical context:** 1984-2010 represents different economic and labor conditions than today
00168| 
00169| ### However...
00170| 
00171| The core finding - that system design determines outcomes more than individual talent - has been replicated across industries:
00172| 
00173| | Context | Finding |
00174| |---------|---------|
00175| | Healthcare (IHI) | System redesign reduces errors more than individual training |
00176| | Aviation | Crew Resource Management (CRM) improves safety through team systems |
00177| | Software (DORA) | High performers achieve results through capabilities, not hero individuals |
00178| 
00179| ## Conclusion
00180| 
00181| ### Verdict
00182| **Strongly Supported** - The NUMMI observation provides compelling evidence that system design determines outcomes. The natural observation of same workers + different system isolates the key variable. The 26-year duration and ~8 million vehicles produced demonstrate sustainability.
00183| 
00184| ### Key Learnings
00185| 
00186| 1. **Blame the system, not the people:** When performance is poor, look at the system first
00187| 2. **Culture is part of the system:** Tools alone don't transform; beliefs, norms, and relationships must change too
00188| 3. **Feedback loops matter:** Small batches, immediate defect detection, and worker voice all tighten feedback
00189| 4. **Transfer is the hard part:** Knowing what works doesn't mean you can implement it
00190| 
00191| ### Recommendation
00192| 
00193| **Apply this when:**
00194| - Tempted to solve performance problems by replacing people
00195| - Designing new teams or organizations
00196| - Building the case for process improvement investment
00197| - Facing resistance to change ("our people won't do that")
00198| 
00199| **Watch out for:**
00200| - Assuming tools alone will transform outcomes
00201| - Underestimating cultural and organizational resistance
00202| - Ignoring the role of job security in enabling improvement suggestions
00203| - Trying to implement lean without the underlying respect for workers
00204| 
00205| ### FOE Application
00206| 
00207| NUMMI demonstrates the FOE thesis at industrial scale:
00208| 
00209| | FOE Principle | NUMMI Implementation |
00210| |---------------|---------------------|
00211| | Optimize for Understanding | Visual management, standard work, everyone understands the system |
00212| | Optimize for Fast Feedback | Andon cord, 2-hour inventory, immediate defect correction |
00213| | Optimize for Confidence | No-layoff policy, worker authority, equal treatment |
00214| 
00215| The lesson for software: stop asking "do we have the right people?" and start asking "do we have the right system?"
00216| 
00217| ---
00218| 
00219| ## References
00220| 
00221| - Womack, J., Jones, D., & Roos, D. (1990). *The Machine That Changed the World*. Free Press.
00222| - Adler, P. S. (1992). The "Learning Bureaucracy": New United Motor Manufacturing, Inc. *Research in Organizational Behavior*.
00223| - Spear, S. & Bowen, H. K. (1999). Decoding the DNA of the Toyota Production System. *Harvard Business Review*.
00224| - This American Life, Episode 561: "NUMMI" (2015). [thisamericanlife.org](https://www.thisamericanlife.org/561/nummi-2015)
00225| - Shook, J. (2010). How to Change a Culture: Lessons from NUMMI. *MIT Sloan Management Review*.
00226| 
00227| ---
00228| 
00229| <RelatedMethods />
00230| 

(End of file - total 230 lines)
</file>
```
```

```
Tool: read

**Input:**
```json
{
  "filePath": "/Users/aaron.west/Documents/Projects/flow-optimized-engineering/docs/docs/field-guides/observations/external/thoughtworks-cdc-testing.md"
}
```
**Output:**
```
<file>
00001| ---
00002| sidebar_position: 20
00003| title: "ThoughtWorks: Consumer-Driven Contract Testing"
00004| status: completed
00005| source_type: external
00006| source:
00007|   authors: ["ThoughtWorks Technology Advisory Board"]
00008|   organization: "ThoughtWorks"
00009|   year: 2016
00010|   url: "https://www.thoughtworks.com/en-us/radar/techniques/consumer-driven-contract-testing"
00011| methods:
00012|   - architecture/methods/emerging/consumer-contract-testing
00013| ---
00014| 
00015| import RelatedMethods from '@site/src/components/RelatedMethods';
00016| 
00017| # ThoughtWorks: Consumer-Driven Contract Testing
00018| 
00019| > **Source:** ThoughtWorks Technology Advisory Board (2016) | ThoughtWorks Technology Radar
00020| 
00021| ThoughtWorks placed Consumer-Driven Contract Testing at "Adopt" status in their Technology Radar, establishing it as an essential practice for microservices testing portfolios.
00022| 
00023| ## Context
00024| 
00025| **Environment:**
00026| - Organization: ThoughtWorks Technology Advisory Board
00027| - Timeline: First appeared in Radar 2015, moved to Adopt in 2016
00028| - Sample: Based on experience across hundreds of client engagements worldwide
00029| 
00030| **The Problem:**
00031| As organizations adopted microservices architectures, traditional end-to-end testing approaches became untenable. E2E tests were slow, brittle, expensive to maintain, and created deployment bottlenecks. Teams needed a way to validate service contracts without running full integration environments.
00032| 
00033| **Research Questions:**
00034| - How can microservices teams test integration points without full E2E environments?
00035| - Can contract-based testing enable independent deployment?
00036| - What practices support autonomous team flow in distributed systems?
00037| 
00038| ## Hypothesis
00039| 
00040| > "If teams adopt consumer-driven contract testing, then they can deploy services independently with confidence because contracts verify integration compatibility at build time rather than requiring integrated test environments."
00041| 
00042| ## Approach
00043| 
00044| ### Methodology
00045| - **Design:** Field observations across hundreds of ThoughtWorks client engagements
00046| - **Analysis:** Practitioner consensus through Technology Advisory Board review
00047| - **Rigor:** Multi-year observation before Adopt recommendation
00048| 
00049| ### Technology Radar Rating System
00050| 
00051| | Rating | Meaning |
00052| |--------|---------|
00053| | Hold | Proceed with caution |
00054| | Assess | Worth exploring |
00055| | Trial | Worth pursuing |
00056| | **Adopt** | **Industry should adopt broadly** |
00057| 
00058| CDC testing achieved the highest rating, indicating strong confidence from ThoughtWorks' accumulated experience.
00059| 
00060| ## Results
00061| 
00062| ### Key Finding: Essential for Mature Microservices
00063| 
00064| ThoughtWorks explicitly states:
00065| 
00066| > "Consumer-driven contracts are an essential part of a mature microservice testing portfolio, enabling independent service deployments."
00067| 
00068| ### Benefits Identified
00069| 
00070| | Benefit | Description |
00071| |---------|-------------|
00072| | **Independent Deployment** | Services can be deployed without requiring coordinated releases |
00073| | **Automated Communication** | Contracts formalize team interfaces without requiring manual coordination |
00074| | **Build-time Validation** | Integration issues caught during build, not in production |
00075| | **Reduced E2E Dependency** | Less reliance on expensive, brittle E2E test environments |
00076| 
00077| ### The Practical Test Pyramid Context
00078| 
00079| Ham Vocke's subsequent article "The Practical Test Pyramid" (2018, martinfowler.com) elaborates:
00080| 
00081| > "Consumer-Driven Contract tests (CDC tests) let the consumers drive the implementation of a contract. CDC tests can be a real game changer to establish autonomous teams that can move fast and with confidence."
00082| 
00083| ### Tool Ecosystem Validation
00084| 
00085| ThoughtWorks later added Pactflow (CDC workflow tool) to the Radar, validating that tooling had matured enough to lower adoption barriers.
00086| 
00087| ## Analysis
00088| 
00089| ### What the Research Establishes
00090| 
00091| 1. **CDC is essential for microservices** - Not optional, but required for mature testing
00092| 2. **Enables independent deployment** - The key flow benefit of microservices
00093| 3. **Formalizes team communication** - Contracts replace ad-hoc coordination
00094| 4. **Build-time feedback** - Integration issues detected early in pipeline
00095| 5. **Industry consensus** - Adopt rating reflects broad practitioner agreement
00096| 
00097| ### FOE Insights
00098| 
00099| **Understanding:**
00100| CDC tests make service contracts explicit and visible. Rather than discovering integration requirements through production failures or tribal knowledge, contracts document what consumers actually need from providers. This improves system understanding for both teams and newcomers.
00101| 
00102| **Feedback:**
00103| The shift from E2E to contract testing dramatically accelerates feedback loops. Instead of waiting for integrated test environments (often contended and slow), teams get integration feedback during their CI build. ThoughtWorks notes this enables teams to "move fast."
00104| 
00105| **Confidence:**
00106| CDC provides confidence in two dimensions: (1) confidence that consumer-provider integrations work before deployment, and (2) confidence that teams can deploy independently. This removes the fear-based coordination that slows microservices deployments.
00107| 
00108| ## Limitations
00109| 
00110| - **Practitioner-based evidence:** Radar recommendations are based on field experience, not controlled studies
00111| - **Tool dependency:** Requires investment in CDC frameworks (Pact, Spring Cloud Contract)
00112| - **Learning curve:** Teams must understand contract concepts and testing patterns
00113| - **Doesn't replace all E2E:** Some scenarios still require integrated testing
00114| - **Consumer-provider alignment:** Requires both teams to participate in the process
00115| 
00116| ### ThoughtWorks' Own Caveats
00117| 
00118| The Radar notes that CDC "requires buy-in from both sides" and works best when both consumer and provider teams participate actively.
00119| 
00120| ## Conclusion
00121| 
00122| ### Verdict
00123| **Strongly Supported** - ThoughtWorks' "Adopt" rating represents the highest confidence level in their recommendation system, based on extensive field experience across many organizations.
00124| 
00125| ### Key Learnings
00126| 
00127| 1. **CDC is essential, not optional** - Required for mature microservices testing
00128| 2. **Enables the flow benefits of microservices** - Independent deployment becomes possible
00129| 3. **Replaces coordination with contracts** - Automated verification beats manual communication
00130| 4. **Build-time feedback** - Fast signal on integration compatibility
00131| 5. **Industry consensus** - Adopt rating reflects broad practitioner agreement
00132| 
00133| ### Recommendation
00134| 
00135| **Apply this when:**
00136| - Adopting or operating a microservices architecture
00137| - Multiple teams own services that communicate
00138| - E2E tests are slow, brittle, or bottlenecking deployment
00139| - Teams want to deploy independently
00140| 
00141| **Watch out for:**
00142| - Resistance from teams unfamiliar with contract concepts
00143| - Tooling investment and setup time
00144| - Expecting CDC to replace all integration testing
00145| 
00146| ### FOE Application
00147| 
00148| | FOE Principle | CDC Contribution |
00149| |---------------|------------------|
00150| | **Understanding** | Explicit contracts document what consumers need |
00151| | **Feedback** | Build-time integration validation vs runtime discovery |
00152| | **Confidence** | Deploy independently knowing contracts are verified |
00153| 
00154| ---
00155| 
00156| ## References
00157| 
00158| - ThoughtWorks Technology Radar - CDC Testing: [thoughtworks.com/radar/techniques/consumer-driven-contract-testing](https://www.thoughtworks.com/en-us/radar/techniques/consumer-driven-contract-testing)
00159| - The Practical Test Pyramid: [martinfowler.com/articles/practical-test-pyramid.html](https://martinfowler.com/articles/practical-test-pyramid.html)
00160| - Pactflow on Technology Radar: [thoughtworks.com/radar/tools/pactflow](https://www.thoughtworks.com/radar/tools/pactflow)
00161| 
00162| ---
00163| 
00164| <RelatedMethods />
00165| 

(End of file - total 165 lines)
</file>
```
```

```
Tool: read

**Input:**
```json
{
  "filePath": "/Users/aaron.west/Documents/Projects/flow-optimized-engineering/docs/docs/field-guides/observations/internal/prima-microservices-architecture.md"
}
```
**Output:**
```
<file>
00001| ---
00002| sidebar_position: 3
00003| title: "Prima Platform Microservices Architecture"
00004| status: completed
00005| source_type: internal
00006| methods:
00007|   - architecture/methods/emerging/true-microservices
00008| ---
00009| 
00010| import RelatedMethods from '@site/src/components/RelatedMethods';
00011| 
00012| # Prima Platform Microservices Architecture
00013| 
00014| > **Status:** Completed
00015| 
00016| The Prima platform evolved into a true microservices architecture with independently deployable subsystems (Control Tower, Engine, Web), shared platform services via stable APIs (Kong, Redis, Auth0), and explicit control plane / data plane separation—enabling teams to deploy without coordination while maintaining governance.
00017| 
00018| ## Context
00019| 
00020| **Environment:**
00021| - Project: Prima Platform (esimplicityinc/prima-*)
00022| - Team: Prima Engineering
00023| - Timeline: June 2025 - January 2026
00024| 
00025| **Key Contributors:**
00026| - **Aaron West** - Control Tower lead, ADR author (ADR-002 Load Balancer), top contributor to CT and platform infrastructure
00027| - **Matt Wartell** - Engine lead, top contributor to Engine, author of Issue #397 (monorepo consideration)
00028| - **David Greene** - Cross-service integration, authored revert commit 89af615 (credential passing complexity)
00029| - **Kevin Song** - Platform/deployment, identified production crash Issue #209
00030| - **Thomas Mason** - Engine architecture, authored Issue #285 (MCP extraction) and Issue #248 (adapter error handling)
00031| - **Lada Semicheva** - API development, assigned to Issue #388 (pagination anti-pattern)
00032| 
00033| **The Problem:**
00034| Prima needed to serve federal missions requiring data sovereignty, ATO compliance, and multi-environment deployment flexibility. A monolithic approach would have created:
00035| - Single point of failure for diverse AI capabilities
00036| - Inability to isolate sensitive data plane operations from control plane
00037| - Deployment coupling that prevented independent team velocity
00038| - Difficulty meeting enclave and FedRAMP requirements
00039| 
00040| **Constraints:**
00041| - Federal ATO requirements demanding clear security boundaries
00042| - Multi-environment deployment (single-tenant, hybrid, eventual SaaS)
00043| - Different scaling requirements for AI execution vs. configuration management
00044| - Multiple teams working on different subsystems
00045| 
00046| ## Hypothesis
00047| 
00048| > "If we architect Prima as true microservices with independent subsystems, shared platform services, and clear plane separation, then teams can deploy independently and the platform can flex across deployment models (single-tenant → hybrid → SaaS) because coupling is explicit and minimized."
00049| 
00050| **Variables:**
00051| - Independent (what changed): Architecture decomposed into separate subsystems with API boundaries
00052| - Dependent (what should improve): Deployment independence, ATO approval, team velocity, environment flexibility
00053| 
00054| ## Approach
00055| 
00056| ### Setup
00057| The Prima engineering team established Architecture Decision Records (ADRs) to document key structural choices, then implemented them across separate repositories.
00058| 
00059| ### Execution
00060| 
00061| **1. Subsystem Decomposition**
00062| 
00063| | Subsystem | Repository | Purpose | Deployment |
00064| |-----------|------------|---------|------------|
00065| | Control Tower | `prima-control_tower` | Control plane - config, policies, RBAC, audit trails | Independent container |
00066| | Engine | `prima-engine` | Data plane - AI/ML execution, agent orchestration | Independent container |
00067| | Web | `prima-web` | User-facing application | Independent frontend + backend containers |
00068| | Platform | `prima-platform` | Infrastructure automation | Terraform/Helm |
00069| 
00070| **2. Control Plane / Data Plane Separation (ADR-002)**
00071| 
00072| > "Control Tower as the system of record for all control-plane functions... Place AI execution, mission workloads, and data processing in the Data Plane within the customer boundary."
00073| 
00074| This explicitly separates:
00075| - **Control Plane (Control Tower):** Configuration, policies, RBAC, audit trails—can be hosted centrally
00076| - **Data Plane (Engine):** AI execution, sensitive data processing—stays within customer boundary
00077| 
00078| **3. Three-Tier Architecture Per Subsystem (ADR-004)**
00079| 
00080| Each subsystem follows three-tier separation:
00081| - Presentation tier (frontend container)
00082| - Application tier (backend container)
00083| - Data tier (separate database)
00084| 
00085| Rationale from ADR: "Limit blast radius, improve observability and control points, simplify compliance narratives, support horizontal scalability, minimize cross-tier coupling."
00086| 
00087| **4. API Gateway Aggregation (ADR-005)**
00088| 
00089| Kong serves as the north-south API gateway:
00090| - Single domain aggregates all subsystems (`https://api.<env>.<agency>.gov/...`)
00091| - Each subsystem routes independently
00092| - Istio handles east-west (mesh) traffic
00093| 
00094| Key insight: "Single API domain, many routed backends—gives agencies a more governable edge surface while maintaining flexibility for Prima to grow, version APIs, and onboard new subsystems without triggering new DNS requests."
00095| 
00096| **5. Asynchronous Communication (ADR-006)**
00097| 
00098| Redis/Celery provides decoupled communication between Control Tower and Engine:
00099| - Task orchestration without synchronous dependencies
00100| - Language-agnostic message schemas for future extensibility
00101| - Failure isolation between subsystems
00102| 
00103| **6. Shared Platform Services**
00104| 
00105| | Service | Purpose | Access Pattern |
00106| |---------|---------|----------------|
00107| | Kong | API Gateway | Stable API routes |
00108| | Redis | Message broker | Celery task queues |
00109| | Auth0 | Identity | OAuth2/OIDC |
00110| | OTLP Collector | Telemetry | OpenTelemetry export |
00111| 
00112| ### Measurement
00113| - ADR acceptance and implementation
00114| - Independent CI/CD pipelines per subsystem
00115| - Deployment events showing subsystem independence
00116| 
00117| ## Results
00118| 
00119| ### Qualitative Results
00120| 
00121| **Independence Litmus Test Applied:**
00122| 
00123| | Subsystem | Can deploy without coordination? | Evidence |
00124| |-----------|----------------------------------|----------|
00125| | Control Tower | Yes | Separate repo, CI/CD, container; no runtime dependency on Engine |
00126| | Engine | **Partial** | Separate repo, CI/CD, container; BUT readiness check requires Control Tower |
00127| | Web | **Partial** | Separate repo; needs Control Tower for auth |
00128| | Frontend (any) | Yes | ADR-004 explicitly enables independent UI releases |
00129| 
00130| **Critical Finding: Engine Runtime Dependency**
00131| 
00132| Engine's readiness check explicitly requires Control Tower to be available:
00133| 
00134| ```python
00135| # From aiox/readiness.py
00136| async def readiness_report():
00137|     redis_ok, redis_details = await check_redis_dependencies()
00138|     tower_ok, tower_details = await check_tower_dependency()
00139|     healthy = redis_ok and tower_ok  # Engine is NOT healthy if Tower is down!
00140| ```
00141| 
00142| This means **Engine cannot report healthy if Control Tower is unavailable**, creating a runtime coupling that violates the "deploy without talking to anyone else" litmus test.
00143| 
00144| **Platform Services via APIs (not shared databases):**
00145| 
00146| | Shared Service | Access Method | Coupling Type |
00147| |----------------|---------------|---------------|
00148| | PostgreSQL | Each subsystem owns its own instance | Explicit ownership |
00149| | Redis | Message broker API | Async, decoupled |
00150| | Auth0 | OAuth2 protocol | Standardized API |
00151| | Kong | Route configuration | Declarative, GitOps |
00152| 
00153| **ADR-002 Load Balancer explicitly states:**
00154| > "Each app maintains autonomy — separate backends, isolated services."
00155| 
00156| ### What the Architecture Enables
00157| 
00158| 1. **Multi-environment flexibility:** Same architecture works for single-tenant, hybrid, and eventual SaaS
00159| 2. **ATO-friendly boundaries:** Clear security perimeter per subsystem
00160| 3. **Independent team velocity:** Engine team can release without Web team coordination
00161| 4. **Blast radius containment:** Engine failure doesn't affect Control Tower
00162| 5. **ML workload isolation:** Heavy dependencies containerized separately (see: Presidio observation)
00163| 
00164| ## Analysis
00165| 
00166| ### What Worked
00167| 
00168| - **Explicit ADRs before implementation:** Decisions were documented and rationale captured
00169| - **Platform services via APIs:** Kong, Redis, Auth0 provide shared capabilities without coupling
00170| - **Control/Data plane separation:** Enables different deployment models for different sensitivity levels
00171| - **Three-tier per subsystem:** Each subsystem can scale tiers independently
00172| 
00173| ### What Didn't Work: Infrastructure Gaps
00174| 
00175| The architecture has the **shape** of microservices (separate repos, ADRs, containers) but lacks **supporting infrastructure** that true microservices require:
00176| 
00177| | Missing Infrastructure | Impact | Evidence |
00178| |----------------------|--------|----------|
00179| | **Circuit breakers** | Engine fails when Tower is unavailable instead of degrading gracefully | `readiness.py` hard-fails on Tower check |
00180| | **Graceful degradation** | No cached/offline mode for Engine when Tower is down | No fallback in `control_tower.py` adapter |
00181| | **API versioning** | API changes require coordinated deployment | No `/v1/`, `/v2/` versioning in Tower APIs |
00182| | **Shared secret coordination** | `SERVICE_JWT_SECRET` must be identical across services | Commit `a57c46a5` shows manual sync required |
00183| | **Feature reverts from coupling** | Cross-service features have been reverted due to complexity | Commit `89af615` reverted 408 lines of credential passing |
00184| 
00185| **The 773-line Control Tower Adapter**
00186| 
00187| Engine's `control_tower.py` adapter (773 lines) has detailed knowledge of Control Tower's internal API structure:
00188| - Workspace models
00189| - Prima models and guardrails
00190| - Tool providers and credentials
00191| - Pagination patterns
00192| 
00193| This is a **distributed monolith signal**: when Service A has intimate knowledge of Service B's internal structure, API changes in B require coordinated changes in A.
00194| 
00195| ### GitHub Issues: Qualitative Evidence
00196| 
00197| Analysis of GitHub issues across prima-* repositories reveals coordination challenges:
00198| 
00199| **Monorepo Consideration (Issue #397, Matt Wartell):**
00200| > "Prompted by **customer deployment concerns**, we want to move Prima to a **monorepo**."
00201| 
00202| This is direct evidence that the distributed architecture creates deployment friction. Matt's perspective as Engine lead—having built the 773-line Tower adapter—gives weight to this assessment.
00203| 
00204| **Cross-Service Coordination Required:**
00205| 
00206| | Issue | Author | Evidence |
00207| |-------|--------|----------|
00208| | CT #398 | Kevin Song | "Work **alongside** prima-web issue #176" - explicit cross-repo coordination |
00209| | Web #176 | Kevin Song | Keycloak integration requires simultaneous changes to CT, Web, Engine |
00210| | CT #388 | Matt Wartell | Pagination anti-pattern shows tight API coupling (assigned to Lada Semicheva) |
00211| | Engine #248 | Thomas Mason | Tower adapter error handling complexity needs normalization |
00212| 
00213| **Production Incidents from Architecture:**
00214| 
00215| | Issue | Author | Impact |
00216| |-------|--------|--------|
00217| | Prima #209 | Kevin Song | "Prod CT crashing due to large usage data size" - Engine data overwhelmed CT |
00218| | CT #381 | (team) | CORS errors between services in production |
00219| | CT #383 | (team) | Logout redirect issues across service boundaries |
00220| 
00221| **Contradictory Directions:**
00222| - Issue #285 (Thomas Mason) proposes MORE extraction: "Separate Engine MCP into Dedicated Container"
00223| - Issue #397 (Matt Wartell) proposes LESS separation: "Merge engine and tower to one repo"
00224| 
00225| The team is being pulled in opposite directions, suggesting the architecture's costs and benefits are still being evaluated. Notably, both perspectives come from experienced contributors who understand the tradeoffs firsthand.
00226| 
00227| ### What Surprised Us
00228| 
00229| - **ADR discipline paid off:** Having explicit decisions documented made it easier to explain architecture to security reviewers
00230| - **Kong aggregation reduced ops burden:** Single DNS entry for multiple subsystems simplified certificate and WAF management
00231| - **Async decoupling enabled language flexibility:** ADR-006 explicitly plans for multi-language agent runtimes
00232| 
00233| ### FOE Insights
00234| 
00235| **Understanding:**
00236| The architecture makes system boundaries explicit and visible. ADRs capture the "why" behind structural decisions. New team members can read ADR-002 to understand control/data plane separation rather than reverse-engineering from code.
00237| 
00238| **Feedback:**
00239| Independent deployment enables faster feedback loops. When Engine team wants to test a new ML model, they don't wait for Control Tower release cycle. Each subsystem has its own CI/CD pipeline with isolated test suites.
00240| 
00241| **Confidence:**
00242| Blast radius containment increases confidence to make changes. If a Presidio container fails (as it did in October 2025), it doesn't bring down Control Tower. The Kong + Istio architecture provides defense-in-depth at the edge.
00243| 
00244| ## Limitations
00245| 
00246| - **Not a controlled experiment:** Architecture evolved organically; no "before" state to compare
00247| - **Team velocity not measured:** We believe teams move faster independently, but no quantitative evidence
00248| - **Operational complexity:** More subsystems = more to monitor and deploy
00249| - **Coordination still needed sometimes:** Cross-cutting features (like new auth flows) require alignment
00250| - **Early stage:** Architecture is ~6 months old; long-term maintenance patterns unknown
00251| 
00252| ## Conclusion
00253| 
00254| ### Verdict
00255| **Supported** - The Prima platform architecture provides strong evidence for the True Microservices method by demonstrating both what works AND what's missing. The architecture has the right **shape** (separate repos, ADRs, containers, platform services) but reveals the **cost** of not investing in supporting infrastructure (circuit breakers, graceful degradation, API versioning).
00256| 
00257| **Key insight:** The gap between Prima's microservices aspiration and its operational reality validates the method's claim that true microservices require more than just service separation—they require investment in resilience infrastructure. Issue #397 ("merge to monorepo prompted by customer deployment concerns") is direct evidence that without this investment, teams will reconsider the architecture.
00258| 
00259| **Classification:** Hub-and-spoke with microservices shape but distributed monolith characteristics. This makes it valuable evidence for what true microservices need to succeed.
00260| 
00261| ### Key Learnings
00262| 
00263| 1. **True microservices = shape + supporting infrastructure:** Separate repos and containers are necessary but not sufficient; you also need circuit breakers, graceful degradation, and API versioning
00264| 2. **Customer deployment experience is a litmus test:** Issue #397 shows that without supporting infrastructure, customers experience deployment friction that prompts reconsideration of the architecture
00265| 3. **Runtime dependencies reveal true coupling:** Engine's readiness check requiring Tower exposes the real architecture vs. the intended architecture—this is what the method warns about
00266| 4. **Heavy adapters are a distributed monolith signal:** The 773-line adapter validates the method's claim that intimate API knowledge creates coupling
00267| 5. **"Merge back" discussions validate the method:** When teams consider merging services back together (Issue #397), it's evidence that the microservices investment was incomplete
00268| 6. **Control/Data plane separation provides value even with coupling:** The security boundary works for ATO despite other coupling issues—some microservices benefits are achievable without full independence
00269| 
00270| ### Recommendation
00271| 
00272| **Apply this architectural approach when:**
00273| - Multiple teams will work on different aspects of the platform
00274| - Deployment flexibility across environments is required
00275| - Security/compliance requires clear system boundaries
00276| - Different components have different scaling or lifecycle requirements
00277| 
00278| **Also invest in supporting infrastructure:**
00279| - **Circuit breakers:** Services should degrade gracefully when dependencies are unavailable
00280| - **API versioning:** Enable independent API evolution without coordinated deployments
00281| - **Cached/offline modes:** Critical paths should work with stale data when dependencies are slow
00282| - **Contract testing:** Detect API breaking changes before deployment, not in production
00283| 
00284| **Watch out for:**
00285| - **Heavy adapter code** is a distributed monolith signal—if one service needs 773 lines to talk to another, you have coupling
00286| - **Readiness checks on dependencies** create runtime coupling—consider health checks that allow degraded operation
00287| - **Shared secrets** require coordination; consider secret management that doesn't require synchronized deployment
00288| - **Feature reverts** due to cross-service complexity suggest the coupling is real, not theoretical
00289| 
00290| ### Future Observations
00291| 
00292| 1. **Measure actual deployment independence:** Track how often Engine and Tower are deployed together vs. separately
00293| 2. **Quantify coordination overhead:** How many PRs touch multiple repos? How long do cross-service features take?
00294| 3. **Implement circuit breakers:** Document the impact of adding graceful degradation to Engine
00295| 4. **API versioning experiment:** Try versioned APIs and measure whether it reduces coordination
00296| 
00297| ---
00298| 
00299| <RelatedMethods />
00300| 

(End of file - total 300 lines)
</file>
```
```

```
Tool: read

**Input:**
```json
{
  "filePath": "/Users/aaron.west/Documents/Projects/flow-optimized-engineering/docs/docs/field-guides/observations/external/ozkan-2023-ddd-industrial-refactoring.md"
}
```
**Output:**
```
<file>
00001| ---
00002| sidebar_position: 13
00003| title: "DDD Industrial Refactoring: Automotive Case Study"
00004| status: completed
00005| source_type: external
00006| source:
00007|   authors:
00008|     - "Ozan Özkan"
00009|     - "Önder Babur"
00010|     - "Mark van den Brand"
00011|   organization: "Eindhoven University of Technology / Automotive Software Company"
00012|   year: 2023
00013|   url: "https://link.springer.com/article/10.1007/s10664-023-10310-1"
00014| methods:
00015|   - external-frameworks/domain-driven-design/methods/aggregate
00016|   - external-frameworks/domain-driven-design/methods/repository
00017|   - external-frameworks/domain-driven-design/methods/value-object
00018|   - external-frameworks/domain-driven-design/methods/domain-service
00019| ---
00020| 
00021| import RelatedMethods from '@site/src/components/RelatedMethods';
00022| 
00023| # DDD Industrial Refactoring: Automotive Case Study
00024| 
00025| > **Source:** Özkan, Babur & van den Brand (2023), Empirical Software Engineering
00026| 
00027| An action research study at an automotive software company found that refactoring a 10,000 LOC backend system using Domain-Driven Design patterns achieved an **84/100 score** on the modified Technology Acceptance Model (mTAM). Engineers reported improved maintainability across all ISO/IEC 25010 quality metrics, and new team members could understand the refactored code more easily.
00028| 
00029| ## Context
00030| 
00031| **Environment:**
00032| - Organization: Automotive software company (name redacted for IP protection)
00033| - Researchers: Eindhoven University of Technology
00034| - Timeline: Published 2023
00035| - Sample: 13 developers working on a backend system with 23 REST API endpoints (~10,000 LOC)
00036| 
00037| **The Problem:**
00038| Industrial software systems often accumulate technical debt that degrades maintainability over time. While DDD patterns are widely advocated, empirical evidence of their effectiveness in industrial settings—particularly for refactoring existing systems—remains limited.
00039| 
00040| **Research Questions:**
00041| 1. How acceptable is DDD-based refactoring to industrial development teams?
00042| 2. Does DDD refactoring improve software maintainability as measured by ISO/IEC 25010?
00043| 3. Can new team members understand DDD-refactored code more easily?
00044| 
00045| ## Hypothesis
00046| 
00047| > "If an existing backend system is refactored using Domain-Driven Design tactical patterns (Aggregates, Repositories, Value Objects, Domain Services), then software maintainability will improve because DDD creates explicit boundaries and domain-aligned structures that are easier to understand, modify, and test."
00048| 
00049| **Variables:**
00050| - Independent: Application of DDD tactical patterns during refactoring
00051| - Dependent: Technology acceptance (mTAM score), maintainability (ISO/IEC 25010 metrics), code comprehension
00052| 
00053| ## Approach
00054| 
00055| ### Methodology
00056| 
00057| - **Design:** Action research with embedded case study
00058| - **Setting:** Real industrial project at an automotive software company
00059| - **Validation:** Modified Technology Acceptance Model (mTAM), ISO/IEC 25010 mapping, Think Aloud Protocol
00060| 
00061| ### The Refactoring Process
00062| 
00063| The researchers applied DDD tactical patterns to refactor a backend system:
00064| 
00065| | Pattern Applied | Purpose |
00066| |-----------------|---------|
00067| | **Aggregates** | Defined consistency boundaries around domain concepts |
00068| | **Repositories** | Abstracted data access behind domain-oriented interfaces |
00069| | **Value Objects** | Replaced primitive types with domain-meaningful types |
00070| | **Domain Services** | Encapsulated business logic that didn't belong to entities |
00071| 
00072| ### Evaluation Methods
00073| 
00074| 1. **mTAM Survey:** 13 developers rated the refactoring on Perceived Usefulness and Perceived Ease of Use
00075| 2. **ISO/IEC 25010 Mapping:** Engineer responses mapped to software maintainability sub-characteristics
00076| 3. **Think Aloud Protocol:** New team members verbalized their understanding while reading refactored code
00077| 
00078| ## Results
00079| 
00080| ### Technology Acceptance: 84/100 mTAM Score
00081| 
00082| | Metric | Score |
00083| |--------|-------|
00084| | **Overall mTAM Score** | 84/100 |
00085| | Perceived Usefulness | 85/100 |
00086| | Perceived Ease of Use | 83/100 |
00087| | Acceptability Scale | "Acceptable" |
00088| | Grade | B |
00089| | Adjective Rating | "Good" |
00090| 
00091| The 84/100 score indicates strong acceptance of DDD refactoring by the development team.
00092| 
00093| ### ISO/IEC 25010 Maintainability Improvements
00094| 
00095| Engineers gave positive responses that mapped to all five ISO/IEC 25010 maintainability sub-characteristics:
00096| 
00097| | Sub-characteristic | Engineer Feedback |
00098| |--------------------|-------------------|
00099| | **Modularity** | DDD patterns created clear module boundaries |
00100| | **Reusability** | Domain components could be reused across features |
00101| | **Analysability** | Code structure aligned with business concepts |
00102| | **Modifiability** | Changes were localized within bounded contexts |
00103| | **Testability** | Domain logic could be tested in isolation |
00104| 
00105| ### Code Comprehension: Think Aloud Protocol
00106| 
00107| New team members demonstrated improved understanding of the refactored code:
00108| 
00109| - Could identify domain concepts more quickly
00110| - Understood the purpose of code sections without extensive documentation
00111| - Navigated the codebase more confidently
00112| 
00113| ### System Characteristics
00114| 
00115| | Metric | Value |
00116| |--------|-------|
00117| | Codebase size | ~10,000 LOC |
00118| | REST API endpoints | 23 |
00119| | Development team | 13 developers |
00120| 
00121| ## Analysis
00122| 
00123| ### What the Research Establishes
00124| 
00125| 1. **DDD refactoring is acceptable to industrial teams:** 84/100 mTAM score demonstrates engineers find DDD approaches useful and usable
00126| 2. **DDD improves maintainability:** Positive mapping to all ISO/IEC 25010 maintainability sub-characteristics
00127| 3. **DDD improves code comprehension:** New team members understood refactored code more easily (Think Aloud Protocol)
00128| 4. **DDD patterns work together:** Aggregates, Repositories, Value Objects, and Domain Services provided complementary benefits
00129| 
00130| ### Why DDD Improves Maintainability
00131| 
00132| The study identified several mechanisms:
00133| 
00134| 1. **Explicit boundaries:** Aggregates define clear consistency boundaries
00135| 2. **Domain alignment:** Code structure mirrors business concepts
00136| 3. **Abstraction layers:** Repositories hide data access complexity
00137| 4. **Type safety:** Value Objects prevent primitive obsession
00138| 5. **Separation of concerns:** Domain Services isolate business logic
00139| 
00140| ### FOE Insights
00141| 
00142| **Understanding:**
00143| DDD patterns improved code analysability—new team members understood refactored code more easily. The Think Aloud Protocol validation shows DDD creates more understandable code structures by aligning code organization with business domain concepts. When code mirrors the domain, developers can leverage their domain knowledge to navigate the codebase.
00144| 
00145| **Feedback:**
00146| ISO/IEC 25010 Modifiability improvements indicate DDD enables faster iteration cycles. Well-defined Aggregates provide clear change boundaries—modifications within an Aggregate don't ripple across the system. Repositories provide stable interfaces that allow implementation changes without affecting consumers.
00147| 
00148| **Confidence:**
00149| The 84/100 mTAM score demonstrates engineers found DDD approaches acceptable and useful—they have confidence in the patterns. Improved Testability means higher confidence in changes: domain logic can be tested in isolation without complex setup. The explicit boundaries reduce the blast radius of changes, increasing confidence to refactor and extend.
00150| 
00151| ## Limitations
00152| 
00153| - **Single case study:** Results from one automotive company may not generalize to all contexts
00154| - **IP protection:** Company name redacted, limiting reproducibility assessment
00155| - **Cognitive load:** DDD entails complexity and cognitive load that can be a barrier to adoption
00156| - **Learning curve:** Teams need DDD training before they can apply patterns effectively
00157| - **Refactoring scope:** Study focused on tactical patterns; strategic DDD patterns (Bounded Contexts, Context Mapping) not evaluated
00158| - **Short-term evaluation:** Long-term maintainability benefits not measured
00159| 
00160| ### Researchers' Own Caveats
00161| 
00162| The authors acknowledged that DDD's complexity can be a barrier:
00163| 
00164| > "DDD entails complexity and cognitive load that can be a barrier."
00165| 
00166| ## Conclusion
00167| 
00168| ### Verdict
00169| **Supported** - This peer-reviewed action research study provides rigorous evidence that DDD tactical patterns improve software maintainability in industrial settings. The 84/100 mTAM score and positive ISO/IEC 25010 mapping demonstrate both acceptance and effectiveness.
00170| 
00171| ### Key Learnings
00172| 
00173| 1. **DDD refactoring is industrially viable:** 84/100 acceptance score from 13 developers
00174| 2. **All maintainability dimensions improve:** Modularity, Reusability, Analysability, Modifiability, Testability
00175| 3. **New team members benefit most:** Think Aloud Protocol showed improved comprehension
00176| 4. **Tactical patterns provide immediate value:** Aggregates, Repositories, Value Objects, Domain Services
00177| 5. **Cognitive load is a real barrier:** Teams need training and support
00178| 
00179| ### Recommendation
00180| 
00181| **Apply DDD tactical patterns when:**
00182| - Codebase has grown difficult to maintain
00183| - New team members struggle to understand the code
00184| - Business logic is scattered across layers
00185| - Team has or can acquire DDD knowledge
00186| 
00187| **Watch out for:**
00188| - Cognitive load on teams unfamiliar with DDD
00189| - Over-engineering simple domains
00190| - Applying patterns without understanding the domain first
00191| 
00192| ### FOE Application
00193| 
00194| DDD tactical patterns align with FOE principles:
00195| 
00196| | DDD Pattern | FOE Alignment |
00197| |-------------|---------------|
00198| | **Aggregates** | Clear boundaries improve understanding and confidence |
00199| | **Repositories** | Stable interfaces enable fast feedback through testing |
00200| | **Value Objects** | Type safety catches errors early (fast feedback) |
00201| | **Domain Services** | Isolated logic is easier to understand and test |
00202| 
00203| The 84/100 acceptance score and ISO/IEC 25010 improvements demonstrate that DDD creates code that is easier to understand, faster to modify, and safer to change.
00204| 
00205| ---
00206| 
00207| ## See Also
00208| 
00209| - [Aggregate](/docs/external-frameworks/domain-driven-design/methods/aggregate) - Consistency boundaries in DDD
00210| - [Repository](/docs/external-frameworks/domain-driven-design/methods/repository) - Data access abstraction
00211| - [Value Object](/docs/external-frameworks/domain-driven-design/methods/value-object) - Domain-meaningful types
00212| - [Domain Service](/docs/external-frameworks/domain-driven-design/methods/domain-service) - Business logic encapsulation
00213| 
00214| ## References
00215| 
00216| - Özkan, O., Babur, Ö., & van den Brand, M. (2023). Refactoring with Domain-Driven Design in an Industrial Context: An Action Research Report. *Empirical Software Engineering*, 28, Article 110. https://doi.org/10.1007/s10664-023-10310-1
00217| 
00218| ---
00219| 
00220| <RelatedMethods />
00221| 

(End of file - total 221 lines)
</file>
```
```

```
Tool: read

**Input:**
```json
{
  "filePath": "/Users/aaron.west/Documents/Projects/flow-optimized-engineering/docs/docs/field-guides/observations/external/team-topologies-bounded-contexts.md"
}
```
**Output:**
```
<file>
00001| ---
00002| sidebar_position: 15
00003| title: "Team Topologies: Bounded Contexts and Cognitive Load"
00004| status: completed
00005| source_type: external
00006| source:
00007|   authors: ["Matthew Skelton", "Manuel Pais"]
00008|   organization: "IT Revolution Press"
00009|   year: 2019
00010|   url: "https://teamtopologies.com/book"
00011| methods:
00012|   - external-frameworks/domain-driven-design/methods/bounded-context
00013|   - external-frameworks/domain-driven-design/methods/context-mapping
00014|   - external-frameworks/domain-driven-design/methods/subdomains
00015|   - architecture/methods/emerging/true-microservices
00016| ---
00017| 
00018| import RelatedMethods from '@site/src/components/RelatedMethods';
00019| 
00020| # Team Topologies: Bounded Contexts and Cognitive Load
00021| 
00022| > **Source:** Skelton & Pais (2019) | IT Revolution Press
00023| 
00024| Team Topologies explicitly references Domain-Driven Design's Bounded Contexts as the ideal unit for team ownership, providing empirical and organizational backing for DDD's strategic design principles. The book's cognitive load framework explains *why* bounded contexts should be sized to what a team can understand, while its treatment of Conway's Law reinforces that software boundaries should align with team boundaries.
00025| 
00026| ## Context
00027| 
00028| **Environment:**
00029| - Organization: IT Revolution / Independent consultants
00030| - Timeline: Published 2019, based on years of consulting experience
00031| - Sample: Case studies from multiple organizations across industries
00032| - Quality: Industry research, widely adopted, referenced by DORA
00033| 
00034| **The Problem:**
00035| Organizations struggle to determine the right size and scope for teams and their owned services. DDD provides the *what* (bounded contexts) but less guidance on the *how much*—how big should a context be? Team Topologies answers this with cognitive load science.
00036| 
00037| **Research Questions:**
00038| - How should bounded contexts be sized for team ownership?
00039| - How do team interaction patterns map to DDD context mapping?
00040| - What organizational structures best support DDD strategic design?
00041| 
00042| ## Hypothesis
00043| 
00044| > "If teams are organized around bounded contexts and sized according to cognitive load limits, then they will achieve faster flow with clearer ownership because team boundaries naturally reinforce context boundaries."
00045| 
00046| ## Approach
00047| 
00048| ### Methodology
00049| - **Design:** Synthesis of practitioner experience, case studies, and cognitive science
00050| - **Framework:** Four team types + three interaction modes + cognitive load constraints
00051| - **Validation:** Adopted by thousands of organizations; referenced in DORA research
00052| 
00053| ### Explicit DDD References
00054| 
00055| The book directly references DDD bounded contexts:
00056| 
00057| > "A stream-aligned team is a team aligned to a single valuable stream of work... this might be a single product or service, a single set of features, a single user journey, or a single user persona. Further, the team is empowered to build and deliver customer or user value as quickly, safely, and independently as possible, without requiring hand-offs to other teams to perform parts of the work."
00058| 
00059| This maps directly to bounded context ownership—one team, one context, end-to-end responsibility.
00060| 
00061| ### Cognitive Load as Context Sizing
00062| 
00063| Team Topologies introduces cognitive load as the key constraint for context size:
00064| 
00065| > "When cognitive load isn't considered, teams are spread thin trying to cover too much, and their architecture and code suffer."
00066| 
00067| The book references cognitive science research showing humans can hold approximately 4 items in working memory at once, arguing that bounded contexts must be sized accordingly.
00068| 
00069| ## Results
00070| 
00071| ### Key Finding: Team-Context Alignment
00072| 
00073| | Team Topologies Concept | DDD Pattern | Relationship |
00074| |------------------------|-------------|--------------|
00075| | Stream-aligned team | Bounded Context owner | Direct mapping—team owns context end-to-end |
00076| | Cognitive load limit | Context size constraint | Empirical basis for "how big" a context should be |
00077| | Team API | Published Language | How contexts expose capabilities to others |
00078| | Conway's Law | Team-Context alignment | Software boundaries follow team boundaries |
00079| | Platform team | Supporting/Generic subdomain | Shared capabilities via self-service APIs |
00080| | Interaction modes | Context Mapping patterns | How teams/contexts relate to each other |
00081| 
00082| ### Interaction Modes as Context Mapping
00083| 
00084| The three interaction modes parallel DDD context mapping patterns:
00085| 
00086| | Interaction Mode | DDD Context Map Pattern | When Used |
00087| |-----------------|------------------------|-----------|
00088| | **Collaboration** | Partnership | Discovery phases, evolving boundaries |
00089| | **X-as-a-Service** | Published Language / Customer-Supplier | Stable APIs, independent deployment |
00090| | **Facilitating** | (No direct equivalent) | Capability building, temporary |
00091| 
00092| ### Cognitive Load Types
00093| 
00094| Team Topologies distinguishes three types of cognitive load:
00095| 
00096| | Load Type | Description | DDD Implication |
00097| |-----------|-------------|-----------------|
00098| | **Intrinsic** | Fundamental complexity of the domain | Core domain complexity |
00099| | **Extraneous** | Unnecessary complexity from poor design | Accidental complexity from unclear boundaries |
00100| | **Germane** | Productive learning about the domain | Building ubiquitous language understanding |
00101| 
00102| The goal is to minimize extraneous load (clear boundaries) so teams can focus on intrinsic and germane load (domain understanding).
00103| 
00104| ### Platform Teams as Generic Subdomains
00105| 
00106| The book's platform team concept maps to DDD's subdomain classification:
00107| 
00108| > "A good platform is 'just big enough.' It should provide only the capabilities needed to enable stream-aligned teams to move quickly."
00109| 
00110| Platform teams own **generic subdomains**—capabilities that are necessary but not differentiating (authentication, messaging, infrastructure). Stream-aligned teams own **core subdomains**—the business capabilities that provide competitive advantage.
00111| 
00112| ## Analysis
00113| 
00114| ### What the Book Establishes
00115| 
00116| 1. **Bounded contexts should be team-sized** - Cognitive load provides empirical basis for context sizing
00117| 2. **Stream-aligned teams = bounded context owners** - Direct mapping between organizational and architectural patterns
00118| 3. **Team APIs = Published Language** - How contexts expose capabilities follows DDD patterns
00119| 4. **Conway's Law reinforces DDD** - Team boundaries should match context boundaries
00120| 5. **Platform teams own generic subdomains** - Shared capabilities via APIs, not shared implementations
00121| 6. **Interaction modes parallel context mapping** - Organizational patterns mirror integration patterns
00122| 
00123| ### FOE Insights
00124| 
00125| **Understanding:**
00126| Cognitive load science explains *why* bounded contexts improve understanding—humans can only hold ~4 items in working memory, so contexts must be sized accordingly. When a team can hold the entire context in their heads, they can reason about it effectively. This provides empirical backing for DDD's intuition about context boundaries.
00127| 
00128| **Feedback:**
00129| Stream-aligned teams with clear bounded contexts can deploy independently, enabling faster feedback loops without cross-team coordination. The X-as-a-Service interaction mode creates stable boundaries that enable independent iteration cycles—changes within a context don't require changes in consuming contexts.
00130| 
00131| **Confidence:**
00132| Organizational alignment with software architecture (Conway's Law) provides structural confidence that changes can be made safely within team/context boundaries. When the team that understands the context is also the team that owns it, there's higher confidence in changes. Platform teams' backward-compatible APIs provide confidence that shared capabilities won't break consumers.
00133| 
00134| ## Limitations
00135| 
00136| - **Practitioner synthesis:** Based on consulting experience and case studies, not controlled research
00137| - **Organizational change required:** Implementing Team Topologies often requires significant reorganization
00138| - **DDD knowledge assumed:** Teams need DDD understanding to fully leverage the mapping
00139| - **Context-dependent:** Optimal team structures vary by organization size and domain
00140| - **Cognitive load measurement:** The book doesn't provide precise measurement methods for cognitive load
00141| 
00142| ### Authors' Own Caveat
00143| 
00144| > "Team Topologies is a model, not a strict rulebook. Organizations need to adapt the ideas to their specific context."
00145| 
00146| ## Conclusion
00147| 
00148| ### Verdict
00149| **Strongly Supported** - Team Topologies provides organizational and empirical backing for DDD strategic design patterns. The explicit references to bounded contexts, combined with cognitive load science, strengthen the case for DDD methods.
00150| 
00151| ### Key Learnings
00152| 
00153| 1. **Cognitive load sizes bounded contexts** - Contexts should be small enough for a team to hold in their heads
00154| 2. **Stream-aligned teams own bounded contexts** - One team, one context, end-to-end ownership
00155| 3. **Team APIs implement Published Language** - How contexts expose capabilities to consumers
00156| 4. **Conway's Law is a DDD tool** - Use organizational structure to reinforce context boundaries
00157| 5. **Platform teams own generic subdomains** - Shared capabilities via self-service APIs
00158| 
00159| ### FOE Application
00160| 
00161| Team Topologies strengthens DDD methods by providing:
00162| - Empirical basis (cognitive load) for context sizing
00163| - Organizational patterns that reinforce architectural patterns
00164| - Interaction modes that parallel context mapping
00165| - Conway's Law as intentional design tool
00166| 
00167| | DDD Method | Team Topologies Support |
00168| |------------|------------------------|
00169| | Bounded Context | Stream-aligned team ownership + cognitive load sizing |
00170| | Context Mapping | Interaction modes (Collaboration, X-as-a-Service, Facilitating) |
00171| | Subdomains | Platform teams (generic), Stream-aligned teams (core/supporting) |
00172| | Published Language | Team API concept |
00173| 
00174| ---
00175| 
00176| ## See Also
00177| 
00178| - [Bounded Context](/docs/external-frameworks/domain-driven-design/methods/bounded-context) - The DDD pattern for explicit model boundaries
00179| - [Context Mapping](/docs/external-frameworks/domain-driven-design/methods/context-mapping) - How bounded contexts relate to each other
00180| - [Subdomains](/docs/external-frameworks/domain-driven-design/methods/subdomains) - Classifying domain areas by strategic importance
00181| - [Team Topologies: Inverse Conway Maneuver](/docs/field-guides/observations/external/team-topologies-inverse-conway) - Related observation on Conway's Law
00182| 
00183| ## References
00184| 
00185| - Skelton, M., & Pais, M. (2019). *Team Topologies: Organizing Business and Technology Teams for Fast Flow*. IT Revolution Press.
00186| - Evans, E. (2003). *Domain-Driven Design: Tackling Complexity in the Heart of Software*. Addison-Wesley.
00187| - Team Topologies website: [teamtopologies.com](https://teamtopologies.com)
00188| - Sweller, J. (1988). "Cognitive Load During Problem Solving: Effects on Learning." *Cognitive Science*.
00189| 
00190| ---
00191| 
00192| <RelatedMethods />
00193| 

(End of file - total 193 lines)
</file>
```
```

```
Tool: read

**Input:**
```json
{
  "filePath": "/Users/aaron.west/Documents/Projects/flow-optimized-engineering/docs/docs/field-guides/observations/external/ieee-2024-ddd-microservices.md"
}
```
**Output:**
```
<file>
00001| ---
00002| sidebar_position: 14
00003| title: "Domain-Driven Design for Microservices: An Evidence-Based Investigation"
00004| status: completed
00005| source_type: external
00006| source:
00007|   authors: ["C Zhong", "S Li", "H Huang", "X Liu", "Z Chen"]
00008|   organization: "IEEE (Various Universities)"
00009|   year: 2024
00010|   url: "https://ieeexplore.ieee.org/abstract/document/10495888/"
00011| methods:
00012|   - external-frameworks/domain-driven-design/methods/bounded-context
00013|   - external-frameworks/domain-driven-design/methods/context-mapping
00014|   - external-frameworks/domain-driven-design/methods/subdomains
00015| ---
00016| 
00017| import RelatedMethods from '@site/src/components/RelatedMethods';
00018| 
00019| # Domain-Driven Design for Microservices: An Evidence-Based Investigation
00020| 
00021| > **Source:** Zhong et al. (2024) | IEEE Transactions
00022| 
00023| This peer-reviewed study provides empirical validation that Domain-Driven Design patterns—particularly Bounded Contexts—are effective for decomposing monolithic systems into microservices. Through a systematic literature review combined with confirmatory survey research, the authors establish DDD4M (DDD for Microservices) as an evidence-based approach to microservice decomposition.
00024| 
00025| ## Context
00026| 
00027| **Environment:**
00028| - Organization: IEEE Transactions (peer-reviewed academic publication)
00029| - Lead Researchers: C Zhong, S Li, H Huang, X Liu, Z Chen et al.
00030| - Timeline: Published 2024
00031| - Sample: Systematic Literature Review + confirmatory survey across multiple studies
00032| - Quality Tier: Academic (peer-reviewed, IEEE Transactions)
00033| 
00034| **The Problem:**
00035| Organizations migrating from monolithic architectures to microservices often struggle to identify appropriate service boundaries. Without principled guidance, teams create "distributed monoliths"—systems with all the complexity of distributed architecture but none of the benefits of independent deployability.
00036| 
00037| **Research Questions:**
00038| - Are DDD patterns effective for microservice decomposition?
00039| - Which DDD strategic patterns provide the most value for identifying service boundaries?
00040| - How does DDD help manage complexity in distributed systems?
00041| 
00042| ## Hypothesis
00043| 
00044| > "The researchers hypothesized that DDD strategic patterns (especially Bounded Context) provide effective guidance for microservice decomposition, reducing the risk of creating 'distributed monoliths.'"
00045| 
00046| **Variables:**
00047| - Independent: Application of DDD patterns (Bounded Context, Context Mapping, Subdomains)
00048| - Dependent: Quality of microservice decomposition, avoidance of distributed monolith anti-patterns
00049| 
00050| ## Approach
00051| 
00052| ### Methodology
00053| - **Design:** Systematic Literature Review (SLR) combined with confirmatory survey
00054| - **Analysis:** Evidence synthesis across multiple academic studies
00055| - **Validation:** Peer review through IEEE Transactions publication process
00056| 
00057| ### Data Collection
00058| The researchers conducted a rigorous SLR following established protocols:
00059| 1. Systematic search across academic databases
00060| 2. Quality assessment of included studies
00061| 3. Data extraction and synthesis
00062| 4. Confirmatory survey to validate findings
00063| 
00064| ### DDD4M Framework
00065| The study validates the DDD4M (DDD for Microservices) approach, which applies DDD strategic patterns to microservice architecture:
00066| 
00067| | DDD Pattern | Microservice Application |
00068| |-------------|-------------------------|
00069| | **Bounded Context** | Defines service boundaries |
00070| | **Context Mapping** | Defines service relationships |
00071| | **Subdomains** | Identifies core vs. supporting services |
00072| 
00073| ## Results
00074| 
00075| ### Key Quantitative Findings
00076| 
00077| | Finding | Evidence |
00078| |---------|----------|
00079| | Academic acceptance | 37 citations indicate strong scholarly acceptance |
00080| | Pattern effectiveness | SLR confirms DDD patterns effective for decomposition |
00081| | Bounded Context value | Identified as primary pattern for service boundary identification |
00082| | Complexity management | DDD principles shown to manage distributed system complexity |
00083| 
00084| ### Major Conclusions
00085| 
00086| 1. **Bounded Context is foundational** - The pattern provides clear guidance for where service boundaries should be drawn, based on domain language and business capability alignment
00087| 2. **DDD reduces distributed monolith risk** - Principled decomposition based on domain boundaries prevents the anti-pattern of tightly coupled services
00088| 3. **Context Mapping clarifies relationships** - Understanding how bounded contexts relate helps design appropriate service interactions
00089| 4. **Subdomains guide prioritization** - Distinguishing core, supporting, and generic subdomains helps teams focus effort appropriately
00090| 
00091| ### Surprising or Notable Findings
00092| 
00093| - The study confirms that DDD patterns, originally designed for enterprise software in 2003, translate effectively to modern microservice architectures
00094| - The combination of SLR with confirmatory survey provides stronger evidence than either method alone
00095| 
00096| ## Analysis
00097| 
00098| ### What the Research Establishes
00099| 
00100| 1. **Empirical validation of DDD for microservices** - Academic evidence supports what practitioners have observed: DDD patterns work for microservice decomposition
00101| 2. **Bounded Context as primary decomposition tool** - The pattern is not just theoretically sound but empirically validated
00102| 3. **DDD manages distributed complexity** - The principles help teams avoid creating systems that are distributed in deployment but monolithic in coupling
00103| 4. **Academic consensus** - 37 citations and peer review indicate scholarly acceptance of these findings
00104| 
00105| ### FOE Insights
00106| 
00107| **Understanding:**
00108| Bounded Contexts provide clear mental models for where service boundaries should be drawn. The SLR confirms that domain language alignment (Ubiquitous Language) reduces misunderstanding between teams. When teams share vocabulary within a context but explicitly translate at boundaries, the system becomes more understandable.
00109| 
00110| **Feedback:**
00111| Independent bounded contexts enable independent deployment, creating faster feedback cycles per service. Teams can iterate within their context without cross-team coordination. The Context Mapping patterns help teams understand dependencies, enabling them to design for fast feedback where it matters most.
00112| 
00113| **Confidence:**
00114| Empirical validation across multiple studies provides confidence that DDD patterns lead to better microservice architectures. The academic rigor of SLR methodology, combined with confirmatory survey, gives practitioners confidence to adopt these patterns. Most importantly, following DDD principles helps avoid the "distributed monolith" anti-pattern—a significant risk reduction.
00115| 
00116| ## Limitations
00117| 
00118| - **Methodology:** SLR synthesizes existing research; findings are only as strong as underlying studies
00119| - **Sample:** Academic studies may not fully represent industry practice diversity
00120| - **Context:** Results may vary based on organizational maturity and domain complexity
00121| - **Recency:** As a 2024 publication, long-term validation is still emerging
00122| - **Implementation gap:** Validates patterns conceptually; implementation quality varies in practice
00123| 
00124| ## Conclusion
00125| 
00126| ### Verdict
00127| **Strongly Supported** - Peer-reviewed academic research with systematic methodology provides strong evidence that DDD patterns are effective for microservice decomposition.
00128| 
00129| ### Key Learnings
00130| 
00131| 1. **Bounded Context is empirically validated** - Not just theoretical; evidence confirms it works for identifying service boundaries
00132| 2. **DDD prevents distributed monoliths** - Principled decomposition based on domain boundaries reduces coupling risk
00133| 3. **Academic consensus supports practitioner experience** - What experienced architects have observed is now empirically confirmed
00134| 
00135| ### Recommendation
00136| 
00137| **Apply this when:**
00138| - Decomposing monolithic systems into microservices
00139| - Designing new microservice architectures
00140| - Evaluating whether existing service boundaries are appropriate
00141| - Training teams on principled service decomposition
00142| 
00143| **Watch out for:**
00144| - Over-engineering small systems with excessive DDD ceremony
00145| - Applying patterns without understanding underlying principles
00146| - Ignoring organizational/team structure alignment with bounded contexts
00147| 
00148| ### FOE Application
00149| 
00150| This research strengthens the evidence base for DDD methods in the FOE framework:
00151| 
00152| | FOE Principle | DDD Contribution (Validated) |
00153| |---------------|------------------------------|
00154| | **Understanding** | Bounded contexts create clear mental models; ubiquitous language reduces misunderstanding |
00155| | **Fast Feedback** | Independent contexts enable independent deployment and iteration |
00156| | **Confidence** | Empirical validation reduces risk of distributed monolith anti-pattern |
00157| 
00158| ---
00159| 
00160| ## References
00161| 
00162| - Zhong, C., Li, S., Huang, H., Liu, X., Chen, Z., et al. (2024). *Domain-Driven Design for Microservices: An Evidence-Based Investigation*. IEEE Transactions.
00163| - [IEEE Xplore Abstract](https://ieeexplore.ieee.org/abstract/document/10495888/)
00164| - Evans, E. (2003). *Domain-Driven Design: Tackling Complexity in the Heart of Software*. Addison-Wesley.
00165| 
00166| ---
00167| 
00168| <RelatedMethods />
00169| 

(End of file - total 169 lines)
</file>
```
```

```
Tool: read

**Input:**
```json
{
  "filePath": "/Users/aaron.west/Documents/Projects/flow-optimized-engineering/docs/docs/field-guides/observations/internal/prima-presidio-containerization.md"
}
```
**Output:**
```
<file>
00001| ---
00002| sidebar_position: 2
00003| title: "Containerizing Heavy ML Dependencies"
00004| status: completed
00005| source_type: internal
00006| methods:
00007|   - architecture/methods/emerging/service-boundary-extraction
00008|   - architecture/methods/emerging/true-microservices
00009| ---
00010| 
00011| import RelatedMethods from '@site/src/components/RelatedMethods';
00012| 
00013| # Containerizing Heavy ML Dependencies
00014| 
00015| > **Status:** Completed
00016| 
00017| Extracting Presidio PII analyzer to a dedicated container removed ~663 lines of heavy ML dependencies (PyTorch, spaCy, transformers) from the main service, demonstrating that architectural separation of ML workloads improves build times and service maintainability.
00018| 
00019| ## Context
00020| 
00021| **Environment:**
00022| - Project: Prima Engine (esimplicityinc/prima-engine)
00023| - Team: Matt Wartell
00024| - Timeline: October 2025
00025| 
00026| **The Problem:**
00027| The Invariant guardrails SDK embedded the Presidio PII analyzer directly into the main service, bringing along:
00028| - PyTorch dependencies
00029| - spaCy and transformers libraries
00030| - A 0.4GB LLM model for PII identification
00031| 
00032| This created a bloated service image with slow startup times. Every build had to pull and package these heavy ML dependencies, even though PII detection was just one capability among many.
00033| 
00034| **Constraints:**
00035| - MVP timeline pressure ("Slewing to MVP")
00036| - Need to maintain existing PII detection functionality
00037| - Changes needed to be invisible to end users
00038| 
00039| ## Hypothesis
00040| 
00041| > "If heavy ML dependencies are containerized separately, then service startup time and image size decrease, because the main service doesn't carry the ML burden."
00042| 
00043| **Variables:**
00044| - Independent (what changed): Presidio moved from embedded library to dedicated container
00045| - Dependent (what should improve): Image size, build time, startup time, dependency complexity
00046| 
00047| ## Approach
00048| 
00049| ### Setup
00050| 1. Identify the Microsoft Container Registry (MCR) Presidio image: `mcr.microsoft.com/presidio-analyzer:2.2.360`
00051| 2. Design REST API interface to replace direct library calls
00052| 
00053| ### Execution
00054| 1. Created dedicated REST API client (`aiox/presidio.py`) to communicate with containerized analyzer
00055| 2. Configured 30-second timeout to account for network latency between containers
00056| 3. Removed heavy dependencies from main service's `pyproject.toml`:
00057|    - `presidio-analyzer`
00058|    - `spacy`
00059|    - `torch`
00060|    - `transformers`
00061|    - `blis`
00062|    - `catalogue`
00063| 4. Added Presidio container to Docker Compose network as `presidio-analyzer:5002`
00064| 5. Created dedicated CI/CD pipeline: `.github/workflows/engine-presidio-cd.yml`
00065| 6. Changed import path from `invariant.detectors` to `aiox.presidio` (invisible to end users)
00066| 
00067| ### Measurement
00068| - Lines removed from `uv.lock` as proxy for dependency reduction
00069| - PR review and merge as validation of approach
00070| 
00071| ## Results
00072| 
00073| ### Quantitative Results
00074| 
00075| | Metric | Before | After | Change |
00076| |--------|--------|-------|--------|
00077| | Lines in `uv.lock` | ~663 more | ~663 fewer | -663 lines |
00078| | Heavy ML dependencies | 6 packages | 0 packages | -100% |
00079| | PII detection containers | 0 (embedded) | 1 (dedicated) | +1 container |
00080| 
00081| ### Qualitative Observations
00082| 
00083| - PR #153 merged October 22, 2025
00084| - Import path change was invisible to end users
00085| - Latent support for caching Invariant RuleSets was added as part of the refactor
00086| - Dedicated CI/CD pipeline enables independent versioning and deployment
00087| 
00088| ### Trade-off Acknowledged
00089| 
00090| From the PR description:
00091| > "Were there but world enough and time, these changes would live in their own issues. Slewing to MVP, I wanted these changes to increase supportability more than I feared push-back from reviewers."
00092| 
00093| This acknowledges the pragmatic bundling of changes under time pressure while prioritizing supportability.
00094| 
00095| ## Analysis
00096| 
00097| ### What Worked
00098| - Heavy ML dependencies successfully removed from main service
00099| - PII detection functionality preserved via REST API
00100| - Dedicated container can be versioned and tested independently
00101| - Change was invisible to end users
00102| 
00103| ### What Didn't Work
00104| - Quantitative metrics (actual image size, startup time) were not captured before/after
00105| - Network latency implications not measured
00106| - Container has crashed at least once in production (Oct 2025 - Jan 2026)
00107| - 30-second timeout configuration suggests anticipated latency issues, but no data exists to validate
00108| 
00109| ### What Surprised Us
00110| - The 30-second timeout configuration suggests awareness of potential latency issues with the network hop, but actual latency impact wasn't documented
00111| - After 3 months in production, we still don't know if timeouts occur or how often
00112| 
00113| ### FOE Insights
00114| 
00115| **Understanding:**
00116| This observation demonstrates understanding of architectural boundaries. By recognizing that PII detection is a distinct capability with heavy dependencies, the team could isolate it appropriately. The REST API abstraction (`aiox/presidio.py`) encapsulates this understanding, making the system's structure clearer.
00117| 
00118| **Feedback:**
00119| Smaller images mean faster builds, which means faster CI feedback. When the main service doesn't need to pull PyTorch on every build, developers get feedback sooner. The dedicated CI/CD pipeline (`.github/workflows/engine-presidio-cd.yml`) also enables independent feedback loops for the Presidio component. The targeted feedback loops were local `docker build` wait times and CI pipeline completion times.
00120| 
00121| **Confidence:**
00122| Dedicated containers can be versioned, tested, and deployed independently. If a Presidio update introduces issues, it can be rolled back without affecting the main service. This separation increases confidence in both components. However, confidence is tempered by observability gaps--a container crash occurred but wasn't tracked systematically. The independent version update that occurred validates the benefit of architectural separation.
00123| 
00124| ## Limitations
00125| 
00126| - **No baseline metrics:** Image size and startup time weren't measured before the change, so improvement claims are qualitative
00127| - **Latency not measured:** The network hop to the containerized service adds latency; impact on user experience unknown
00128| - **Single implementation:** Only tested in one project context
00129| - **Production stability unknown:** Long-term stability and scaling behavior not documented
00130| - **MVP pressure:** Changes were bundled together under time pressure, making it harder to isolate the impact of containerization specifically
00131| - **Proxy metric weakness:** Lines in `uv.lock` is an indirect measure; actual build time and image size were never captured
00132| - **Confounding variables:** Containerization was bundled with caching changes (Invariant RuleSets), making it impossible to isolate the specific impact
00133| - **Observability gap:** No metrics exist to validate production stability; container crashes and timeouts are not tracked
00134| - **Failure mode analysis missing:** No documentation of system behavior when Presidio container is unavailable
00135| 
00136| ## Conclusion
00137| 
00138| ### Verdict
00139| **Partially Supported** - The hypothesis that containerizing heavy ML dependencies reduces main service complexity is partially supported. The architectural separation was achieved (663 lines removed, 6 packages eliminated, independent versioning validated), but the expected improvements in build time and image size were never measured. We believe this helped, but we can't prove it because we didn't capture baselines.
00140| 
00141| ### Key Learnings
00142| 
00143| 1. **Architectural separation pays off:** Moving heavy ML workloads to dedicated containers simplifies the main service and enables independent lifecycle management.
00144| 
00145| 2. **REST API abstraction enables flexibility:** The `aiox/presidio.py` client abstracts the implementation detail of where Presidio runs, making future changes easier.
00146| 
00147| 3. **Measure before you change:** The lack of baseline metrics limits our ability to quantify the improvement. Future observations should capture before/after measurements for build time, image size, and response latency.
00148| 
00149| ### Recommendation
00150| 
00151| **Try this when:**
00152| - Your service embeds heavy ML dependencies (PyTorch, TensorFlow, large models)
00153| - The ML capability is logically separable from core service functionality
00154| - You can tolerate the latency of a network hop for ML inference
00155| - You want independent scaling or versioning of ML components
00156| 
00157| **Watch out for:**
00158| - Network latency: The 30-second timeout suggests this can be significant
00159| - Operational complexity: You now have two containers to manage instead of one
00160| - Cold start: Containerized ML services may have their own startup latency
00161| - Observability: Ensure you can track container health, timeouts, and latency before going to production
00162| - Failure modes: Document and test what happens when the containerized service is unavailable
00163| 
00164| ### Future Observations
00165| 
00166| 1. **Measure the actual impact:** Capture image size and startup time before/after containerization
00167| 2. **Latency profiling:** Measure the p50/p95/p99 latency of REST calls vs. embedded library calls
00168| 3. **Scaling behavior:** Test whether independent scaling of the Presidio container provides benefits under load
00169| 4. **Cost analysis:** Compare resource utilization of embedded vs. containerized approaches
00170| 
00171| ---
00172| 
00173| <RelatedMethods />
00174| 

(End of file - total 174 lines)
</file>
```
```

---

## Assistant (Curator · claude-opus-4-5 · 12.5s)

_Thinking:_

Good progress. I've read 12 observations. Let me continue reading the remaining observations and then read the methods.

Continuing to read remaining observation files...

```
Tool: read

**Input:**
```json
{
  "filePath": "/Users/aaron.west/Documents/Projects/flow-optimized-engineering/docs/docs/field-guides/observations/external/ddd-bounded-contexts.md"
}
```
**Output:**
```
<file>
00001| ---
00002| sidebar_position: 12
00003| title: "Domain-Driven Design: Bounded Contexts"
00004| status: completed
00005| source_type: external
00006| source:
00007|   authors: ["Eric Evans"]
00008|   organization: "Addison-Wesley / Domain Language"
00009|   year: 2003
00010|   url: "https://www.domainlanguage.com/ddd/"
00011| methods:
00012|   - architecture/methods/emerging/true-microservices
00013| ---
00014| 
00015| import RelatedMethods from '@site/src/components/RelatedMethods';
00016| 
00017| # Domain-Driven Design: Bounded Contexts
00018| 
00019| > **Source:** Evans (2003) | Addison-Wesley / Domain Language
00020| 
00021| Eric Evans' Domain-Driven Design introduced the concept of Bounded Contexts—explicit boundaries within which a domain model applies. This concept provides the theoretical foundation for why microservice boundaries should align with business capabilities, not technical layers, and why shared databases create "distributed monoliths."
00022| 
00023| ## Context
00024| 
00025| **Environment:**
00026| - Organization: Independent consultant / Addison-Wesley Professional
00027| - Timeline: 2003 (predating microservices by over a decade)
00028| - Sample: Drawn from Evans' extensive enterprise consulting experience
00029| 
00030| **The Problem:**
00031| Large software systems attempt to create unified models that span the entire business, but these models become inconsistent and unwieldy. Different parts of the business use the same terms with different meanings, and the single model becomes a source of confusion rather than clarity.
00032| 
00033| **Research Questions:**
00034| - How should large domain models be structured?
00035| - Where should boundaries be drawn in complex systems?
00036| - How should different models interact at their boundaries?
00037| 
00038| ## Hypothesis
00039| 
00040| > "If domain models are explicitly bounded with clear contexts, and if these boundaries are aligned with organizational and linguistic boundaries, then systems will be easier to understand, evolve, and maintain because each context can evolve independently with its own consistent language."
00041| 
00042| ## Approach
00043| 
00044| ### Methodology
00045| - **Design:** Synthesis of patterns from extensive enterprise consulting
00046| - **Framework:** Strategic design patterns for large-scale system organization
00047| - **Validation:** Two decades of industry adoption; foundational to microservices architecture
00048| 
00049| ### The Bounded Context Pattern
00050| 
00051| A Bounded Context is an explicit boundary within which a domain model is defined and applicable:
00052| 
00053| > "A BOUNDED CONTEXT delimits the applicability of a particular model so that team members have a clear and shared understanding of what has to be consistent and how it relates to other contexts."
00054| 
00055| Key characteristics:
00056| - **Explicit boundary:** The context has clear edges
00057| - **Consistent model:** Within the context, terms have precise meanings
00058| - **Ubiquitous language:** Teams within the context share vocabulary
00059| - **Independent evolution:** Changes inside don't require changes outside
00060| 
00061| ### Context Mapping
00062| 
00063| Evans defined several patterns for how contexts relate:
00064| 
00065| | Pattern | Description | Microservices Equivalent |
00066| |---------|-------------|-------------------------|
00067| | **Published Language** | Well-defined interface for external consumption | Stable API contract |
00068| | **Anti-Corruption Layer** | Translation layer protecting internal model | API adapter |
00069| | **Shared Kernel** | Subset of model shared between contexts | Shared library (use carefully) |
00070| | **Customer-Supplier** | Downstream context depends on upstream | Service dependency |
00071| | **Conformist** | Downstream adopts upstream's model | Tight coupling (anti-pattern) |
00072| | **Separate Ways** | Contexts don't integrate | Independent services |
00073| 
00074| ## Results
00075| 
00076| ### Key Finding: Integration at Boundaries, Not Shared Models
00077| 
00078| The book's central insight is that large systems should NOT share a single unified model:
00079| 
00080| > "Total unification of the domain model for a large system will not be feasible or cost-effective."
00081| 
00082| Instead, contexts should integrate at their boundaries:
00083| 
00084| > "When connections are made between bounded contexts, they require a TRANSLATION. The translation is the critical point where models meet."
00085| 
00086| ### Why Shared Databases Fail
00087| 
00088| Evans explains why sharing data models across contexts is problematic:
00089| 
00090| > "Different models have different concepts with different meanings. When code based on different models is combined, software becomes buggy, unreliable, and difficult to understand."
00091| 
00092| The "distributed monolith" anti-pattern violates bounded context principles by sharing:
00093| - Database schemas across services
00094| - Domain objects across contexts
00095| - Business logic interpretations
00096| 
00097| ### Team Alignment with Contexts
00098| 
00099| Evans recognized the organizational dimension:
00100| 
00101| > "When multiple teams are working on the same model, there is always a risk that the model will become inconsistent."
00102| 
00103| The solution:
00104| 
00105| > "Define the scope of a BOUNDED CONTEXT to match the area of influence of a single team."
00106| 
00107| This predates but anticipates Conway's Law application to microservices.
00108| 
00109| ### Ubiquitous Language Within Contexts
00110| 
00111| Each bounded context has its own language:
00112| 
00113| > "A UBIQUITOUS LANGUAGE is specific to the BOUNDED CONTEXT in which it is used."
00114| 
00115| This explains why the same term (e.g., "Customer," "Account," "Order") can mean different things in different services—and why that's correct, not a problem to solve.
00116| 
00117| ## Analysis
00118| 
00119| ### What the Book Establishes
00120| 
00121| 1. **Bounded contexts define natural service boundaries** - Where business language changes, so should service boundaries
00122| 2. **Shared databases violate bounded contexts** - Sharing data models across contexts creates coupling that undermines independence
00123| 3. **Translation happens at boundaries** - APIs are translation layers between contexts
00124| 4. **Teams should align with contexts** - One team per bounded context enables consistent modeling
00125| 5. **"Same word, different meaning" is expected** - Contexts have their own ubiquitous language
00126| 
00127| ### Why Distributed Monoliths Fail (DDD Perspective)
00128| 
00129| From a DDD perspective, a "distributed monolith" is what happens when services share:
00130| - **Database schemas:** Contexts share data models, creating implicit coupling
00131| - **Domain concepts:** The same domain object is used across contexts
00132| - **Business rules:** Logic that should be context-specific is shared
00133| 
00134| This creates all the complexity of distributed systems (network latency, partial failures) without the benefit of context independence.
00135| 
00136| ### FOE Insights
00137| 
00138| **Understanding:**
00139| Bounded contexts provide a principled approach to understanding where service boundaries belong. Rather than arbitrary technical splits, boundaries follow business language—where the meaning of terms changes, so does the context. This makes systems more understandable because each context has clear, consistent semantics.
00140| 
00141| **Feedback:**
00142| Independent contexts enable fast feedback because changes within a context don't require coordination with other contexts. The "Published Language" pattern ensures that API contracts are stable while internal implementations can evolve rapidly.
00143| 
00144| **Confidence:**
00145| The "Anti-Corruption Layer" pattern provides confidence when integrating with external systems—your internal model is protected from external changes. Clear boundaries reduce the blast radius of changes, increasing confidence to make modifications within a context.
00146| 
00147| ## Limitations
00148| 
00149| - **Enterprise focus:** Original examples from large enterprise systems; may over-engineer for smaller contexts
00150| - **Theoretical foundation:** Provides principles but not prescriptive implementation guidance
00151| - **Predates microservices:** Written before microservices terminology existed; translation required
00152| - **Organizational complexity:** Implementing bounded contexts often requires organizational change
00153| - **Learning curve:** DDD concepts have significant learning overhead
00154| 
00155| ### Evans' Own Caveats
00156| 
00157| > "It is not always clear where the boundaries should be drawn."
00158| 
00159| > "The patterns in this book are the starting point. You have to look at the specific situation."
00160| 
00161| ## Conclusion
00162| 
00163| ### Verdict
00164| **Foundational Theory** - Domain-Driven Design provides the theoretical foundation for why microservice boundaries should align with business capabilities. The bounded context concept directly explains why "distributed monoliths" fail and why true microservices work.
00165| 
00166| ### Key Learnings
00167| 
00168| 1. **Bounded contexts define service boundaries** - Where business language changes, services should split
00169| 2. **Shared databases violate bounded contexts** - They create coupling that undermines independence
00170| 3. **APIs are translation layers** - Published Language pattern = stable service APIs
00171| 4. **Teams align with contexts** - One team per bounded context enables consistency
00172| 5. **"Same word, different meaning" is correct** - Each context has its own ubiquitous language
00173| 
00174| ### FOE Application
00175| 
00176| DDD's bounded context concept provides the theoretical justification for True Microservices claims:
00177| 
00178| | True Microservices Claim | DDD Support |
00179| |--------------------------|-------------|
00180| | Service boundaries align with business capabilities | Bounded contexts follow business language boundaries |
00181| | Shared databases are an anti-pattern | Sharing data models across contexts violates DDD principles |
00182| | Shared services accessed via stable APIs | Published Language pattern defines translation at boundaries |
00183| | "Distributed monolith" inherits complexity without benefits | Violating bounded contexts = complexity without independence |
00184| | Conway's Law alignment | Teams should match bounded contexts |
00185| 
00186| ---
00187| 
00188| ## See Also
00189| 
00190| - [Bounded Context](/docs/external-frameworks/domain-driven-design/methods/bounded-context) - Method reference in the DDD External Framework
00191| - [Context Mapping](/docs/external-frameworks/domain-driven-design/methods/context-mapping) - How bounded contexts relate to each other
00192| - [Ubiquitous Language](/docs/external-frameworks/domain-driven-design/methods/ubiquitous-language) - The shared vocabulary within a bounded context
00193| 
00194| ## References
00195| 
00196| - Evans, E. (2003). *Domain-Driven Design: Tackling Complexity in the Heart of Software*. Addison-Wesley.
00197| - Domain Language website: [domainlanguage.com](https://www.domainlanguage.com/)
00198| - DDD Reference: [domainlanguage.com/ddd/reference](https://www.domainlanguage.com/ddd/reference/)
00199| 
00200| ---
00201| 
00202| <RelatedMethods />
00203| 

(End of file - total 203 lines)
</file>
```
```

```
Tool: read

**Input:**
```json
{
  "filePath": "/Users/aaron.west/Documents/Projects/flow-optimized-engineering/docs/docs/field-guides/observations/external/dora-four-key-metrics.md"
}
```
**Output:**
```
<file>
00001| ---
00002| sidebar_position: 1
00003| title: "DORA Four Key Metrics Research"
00004| status: completed
00005| source_type: external
00006| source:
00007|   authors: ["Nicole Forsgren", "Jez Humble", "Gene Kim"]
00008|   organization: "DORA / Google Cloud"
00009|   year: 2018
00010|   url: "https://dora.dev"
00011| methods:
00012|   - external-frameworks/dora/methods/deployment-frequency
00013|   - external-frameworks/dora/methods/lead-time-for-changes
00014|   - external-frameworks/dora/methods/change-failure-rate
00015|   - external-frameworks/dora/methods/time-to-restore-service
00016|   - architecture/methods/emerging/true-microservices
00017| ---
00018| 
00019| import RelatedMethods from '@site/src/components/RelatedMethods';
00020| 
00021| # DORA Four Key Metrics Research
00022| 
00023| > **Source:** Forsgren, Humble & Kim (2018) | DORA Research Program
00024| 
00025| The DORA (DevOps Research and Assessment) program's multi-year study of 39,000+ technology professionals demonstrates that software delivery performance is measurable through four key metrics, and that high performers achieve dramatically better outcomes without sacrificing stability for speed.
00026| 
00027| ## Context
00028| 
00029| **Environment:**
00030| - Organization: DORA (now part of Google Cloud)
00031| - Lead Researcher: Dr. Nicole Forsgren, PhD
00032| - Timeline: 2014-2025 (11+ years of continuous research)
00033| - Sample: 39,000+ professionals across the program; 23,000+ data points analyzed for the Accelerate book
00034| 
00035| **The Problem:**
00036| The software industry lacked rigorous, empirical evidence for what actually predicts delivery performance and organizational outcomes. Claims about DevOps practices were often anecdotal or vendor-driven rather than research-backed.
00037| 
00038| **Research Questions:**
00039| - What measurable factors predict software delivery performance?
00040| - Is there a trade-off between speed and stability?
00041| - What practices correlate with high performance?
00042| 
00043| ## Hypothesis
00044| 
00045| > "If organizations optimize for deployment frequency, lead time, change failure rate, and mean time to recovery, then they will achieve better business outcomes because these metrics capture the essential dimensions of software delivery capability."
00046| 
00047| **Variables:**
00048| - Independent: Software delivery practices (24 capabilities identified)
00049| - Dependent: Four key metrics + organizational performance
00050| 
00051| ## Approach
00052| 
00053| ### Methodology
00054| - **Design:** Quasi-observational field research using psychometric surveys
00055| - **Analysis:** Structural Equation Modeling (SEM), cluster analysis
00056| - **Validation:** Uses scientifically validated, reliable survey measures
00057| - **Academic Rigor:** Lead researcher holds PhD in Management Information Systems; research affiliate at Clemson University and Florida International University
00058| 
00059| ### The Four Key Metrics
00060| 
00061| | Metric | Definition | Elite Performance |
00062| |--------|------------|-------------------|
00063| | **Deployment Frequency** | How often code is deployed to production | On-demand (multiple per day) |
00064| | **Lead Time for Changes** | Time from commit to production | Less than 1 hour |
00065| | **Change Failure Rate** | Percentage of deployments causing failures | 0-15% |
00066| | **Mean Time to Recovery** | Time to restore service after failure | Less than 1 hour |
00067| 
00068| ### Data Collection
00069| - Annual State of DevOps surveys
00070| - 11+ years of longitudinal data
00071| - Cross-industry sample (technology, finance, retail, government, etc.)
00072| 
00073| ## Results
00074| 
00075| ### Quantitative Results: Performance Differentials
00076| 
00077| | Comparison | High vs. Low Performers |
00078| |------------|------------------------|
00079| | Deployment Frequency | **208x** more frequent |
00080| | Lead Time | **106x** faster |
00081| | Change Failure Rate | **7x** lower |
00082| | Mean Time to Recovery | **2,604x** faster |
00083| 
00084| *Source: State of DevOps Reports 2015-2019*
00085| 
00086| ### Key Finding: Speed and Stability Are NOT Trade-offs
00087| 
00088| The research conclusively demonstrates that high performers achieve both speed AND stability:
00089| 
00090| > "The idea that developers have to choose between speed and stability is a false dichotomy."
00091| 
00092| | Performance Tier | Speed | Stability |
00093| |-----------------|-------|-----------|
00094| | Elite | High | High |
00095| | Low | Low | Low |
00096| 
00097| This refutes the common belief that "moving fast" requires "breaking things."
00098| 
00099| ### Business Outcomes Correlation
00100| 
00101| High-performing teams are:
00102| - **2x as likely** to exceed profitability goals
00103| - **2x as likely** to exceed market share goals  
00104| - **2x as likely** to exceed productivity goals
00105| 
00106| ### 24 Capabilities Identified
00107| 
00108| The research identified 24 capabilities that predict high performance across five categories:
00109| 
00110| **Continuous Delivery (8):** Version control, deployment automation, CI, trunk-based development, test automation, test data management, shift-left security, CD
00111| 
00112| **Architecture (2):** Loosely coupled architecture, empowered teams
00113| 
00114| **Product & Process (4):** Customer feedback, value stream visibility, small batches, team observationation
00115| 
00116| **Lean Management (5):** Lightweight change approval, monitoring, proactive health checks, WIP limits, work visualization
00117| 
00118| **Culture (5):** Generative culture (Westrum), learning support, collaboration, meaningful work, transformational leadership
00119| 
00120| ### Culture Findings (2023 Report)
00121| 
00122| | Cultural Factor | Performance Impact |
00123| |-----------------|-------------------|
00124| | Generative organizational culture | +30% organizational performance |
00125| | User-centricity focus | +40% organizational performance |
00126| | High-quality documentation | Dramatically increases capability effectiveness |
00127| 
00128| ## Analysis
00129| 
00130| ### What the Research Establishes
00131| 
00132| 1. **Measurement is possible:** Software delivery performance can be measured objectively through four metrics
00133| 2. **Speed enables stability:** Contrary to intuition, deploying more frequently correlates with fewer failures
00134| 3. **Culture predicts performance:** Technical practices alone are insufficient; generative culture is essential
00135| 4. **Capabilities compound:** The 24 capabilities work together; no single practice is sufficient
00136| 
00137| ### What Surprised the Industry
00138| 
00139| - **Heavy change approval processes correlate with WORSE outcomes** - Not better risk management
00140| - **Elite performers now make up 26% of teams** (2021) - High performance is achievable, not rare
00141| - **Documentation is foundational** - Often dismissed as overhead, but dramatically improves capability effectiveness
00142| 
00143| ### FOE Insights
00144| 
00145| **Understanding:**
00146| The DORA research provides a shared vocabulary and measurement framework for understanding software delivery. The four metrics make abstract concepts like "delivery performance" concrete and measurable. The 24 capabilities provide a map of what to improve.
00147| 
00148| **Feedback:**
00149| The research itself embodies fast feedback principles - annual surveys that track industry changes allow the model to evolve. The metrics prioritize feedback loops: deployment frequency measures how often you can learn from production; lead time measures how quickly you can test hypotheses; MTTR measures how fast you detect and correct problems.
00150| 
00151| **Confidence:**
00152| The research provides evidence-based confidence in practices that might otherwise seem risky. Deploying more frequently feels dangerous until you see data showing it correlates with stability. The longitudinal nature (11+ years) and sample size (39,000+) provide high confidence in the findings.
00153| 
00154| ## Limitations
00155| 
00156| - **Survey-based:** Self-reported data introduces potential bias
00157| - **Correlation, not causation:** The research establishes correlations but cannot prove causality
00158| - **Cross-sectional snapshots:** Each year is a point-in-time measurement, not a longitudinal cohort
00159| - **Context variation:** Results may vary by industry, company size, or technology stack
00160| - **Metric gaming:** Organizations may optimize for metrics rather than underlying performance
00161| - **Publication bias:** The research warns against using metrics for team-by-team comparison
00162| 
00163| ### DORA's Own Warning (2023)
00164| > "Metrics should be used for improvement, not comparison or competition between teams."
00165| 
00166| ## Conclusion
00167| 
00168| ### Verdict
00169| **Strongly Supported** - The DORA research provides the most rigorous empirical evidence available for software delivery performance factors. The multi-year study, large sample size, and academic methodology establish high confidence in the findings.
00170| 
00171| ### Key Learnings
00172| 
00173| 1. **Four metrics capture delivery performance:** Deployment frequency, lead time, change failure rate, and MTTR together measure what matters
00174| 2. **Speed and stability reinforce each other:** High performers excel at both; the trade-off is a myth
00175| 3. **Culture is the foundation:** Technical practices without generative culture will underperform
00176| 4. **Measurement enables improvement:** What gets measured can be improved; the metrics provide a baseline
00177| 
00178| ### Recommendation
00179| 
00180| **Apply this when:**
00181| - Establishing delivery performance metrics for your organization
00182| - Building the case for DevOps/CI-CD investment
00183| - Identifying which capabilities to prioritize
00184| - Countering the "we can't move fast AND be stable" objection
00185| 
00186| **Watch out for:**
00187| - Using metrics punitively or for team comparison
00188| - Focusing on metrics without addressing underlying culture
00189| - Cherry-picking capabilities without understanding their interactions
00190| - Assuming correlation implies your specific context will match
00191| 
00192| ### FOE Application
00193| 
00194| The DORA research directly supports FOE's core thesis that optimizing for flow (fast feedback, understanding, confidence) leads to better outcomes than optimizing for output. The four key metrics are essentially measurements of flow:
00195| 
00196| | DORA Metric | FOE Principle |
00197| |-------------|---------------|
00198| | Deployment Frequency | Fast Feedback (how often can you learn?) |
00199| | Lead Time | Fast Feedback (how quickly can you verify?) |
00200| | Change Failure Rate | Confidence (how safe is change?) |
00201| | MTTR | Fast Feedback + Confidence (how fast can you recover?) |
00202| 
00203| ---
00204| 
00205| ## References
00206| 
00207| - Forsgren, N., Humble, J., & Kim, G. (2018). *Accelerate: The Science of Lean Software and DevOps*. IT Revolution Press.
00208| - State of DevOps Reports (2014-2025). Available at [dora.dev/research](https://dora.dev/research)
00209| - DORA Quick Check: [dora.dev/quickcheck](https://dora.dev/quickcheck)
00210| - Four Keys Open Source Project: [github.com/GoogleCloudPlatform/fourkeys](https://github.com/GoogleCloudPlatform/fourkeys)
00211| 
00212| ---
00213| 
00214| <RelatedMethods />
00215| 

(End of file - total 215 lines)
</file>
```
```

```
Tool: read

**Input:**
```json
{
  "filePath": "/Users/aaron.west/Documents/Projects/flow-optimized-engineering/docs/docs/field-guides/observations/external/dora-loosely-coupled-architecture.md"
}
```
**Output:**
```
<file>
00001| ---
00002| sidebar_position: 13
00003| title: "DORA: Loosely Coupled Architecture Capability"
00004| status: completed
00005| source_type: external
00006| source:
00007|   authors: ["Nicole Forsgren", "Jez Humble", "Gene Kim", "DORA Research Team"]
00008|   organization: "DORA / Google Cloud"
00009|   year: 2023
00010|   url: "https://dora.dev/capabilities/loosely-coupled-architecture/"
00011| methods:
00012|   - architecture/methods/emerging/true-microservices
00013| ---
00014| 
00015| import RelatedMethods from '@site/src/components/RelatedMethods';
00016| 
00017| # DORA: Loosely Coupled Architecture Capability
00018| 
00019| > **Source:** DORA Research Team (2023) | Google Cloud
00020| 
00021| DORA's research identifies loosely coupled architecture as one of 24 capabilities that predict software delivery performance. This specific capability directly validates that independent deployability—enabled by true microservices—correlates with better organizational outcomes.
00022| 
00023| ## Context
00024| 
00025| **Environment:**
00026| - Organization: DORA Research Program (part of Google Cloud)
00027| - Timeline: 2014-2025 (11+ years of continuous research)
00028| - Sample: 39,000+ technology professionals across the research program
00029| 
00030| **The Problem:**
00031| Organizations debate whether architectural choices actually matter for delivery performance. Some argue that process and culture are more important than technical architecture. The research sought to determine whether architectural decisions have measurable impact.
00032| 
00033| **Research Questions:**
00034| - Does architectural approach correlate with software delivery performance?
00035| - What specific architectural characteristics predict high performance?
00036| - Can teams achieve independent deployability and at what benefit?
00037| 
00038| ## Hypothesis
00039| 
00040| > "If organizations adopt loosely coupled architectures where teams can deploy independently, then they will achieve higher software delivery performance because coupling constraints create queues and coordination overhead that slow delivery."
00041| 
00042| ## Approach
00043| 
00044| ### Methodology
00045| - **Design:** Quasi-observational field research using psychometric surveys
00046| - **Analysis:** Structural Equation Modeling (SEM), cluster analysis
00047| - **Rigor:** Lead researcher (Dr. Nicole Forsgren) holds PhD in Management Information Systems
00048| - **Sample Size:** 39,000+ professionals surveyed across the research program
00049| 
00050| ### Defining Loosely Coupled Architecture
00051| 
00052| DORA defines this capability through specific, measurable criteria:
00053| 
00054| | Criterion | Description |
00055| |-----------|-------------|
00056| | **Independent deployment** | Teams can deploy and release on demand, independently of dependent services |
00057| | **Large-scale changes without permission** | Teams can make large-scale changes without requiring permission from outside the team |
00058| | **Independent testing** | Teams can do most of their testing without requiring an integrated test environment |
00059| | **Work without coordination** | Teams can work independently without fine-grained communication and coordination |
00060| 
00061| ## Results
00062| 
00063| ### Key Finding: Architecture Predicts Performance
00064| 
00065| The research conclusively shows that loosely coupled architecture correlates with high software delivery performance:
00066| 
00067| > "High performers were more likely to have systems that were loosely coupled... This architectural approach enables teams to deploy and release their product or service on demand, independently of the services it depends on or of other services that depend on it."
00068| 
00069| ### Quantitative Results
00070| 
00071| | Metric | High Performers vs Low Performers |
00072| |--------|-----------------------------------|
00073| | Deployment Frequency | **208x** more frequent |
00074| | Lead Time for Changes | **106x** faster |
00075| | Change Failure Rate | **7x** lower |
00076| | Mean Time to Recovery | **2,604x** faster |
00077| 
00078| *Source: State of DevOps Reports 2015-2019*
00079| 
00080| ### The "Litmus Test" Validated
00081| 
00082| DORA's definition of loosely coupled teams directly validates the True Microservices "litmus test":
00083| 
00084| **DORA states:**
00085| > "Teams deploy and release their product or service on demand, independently of the services it depends on or of other services that depend on it."
00086| 
00087| **True Microservices litmus test:**
00088| > "Can a team deploy their service without talking to anyone else?"
00089| 
00090| These are the same question, worded differently.
00091| 
00092| ### Architecture vs. Organization
00093| 
00094| The research found that architecture and organizational structure are linked:
00095| 
00096| > "Architectural approaches that enable teams to make changes independently... require that team structure and communication patterns also support this independence."
00097| 
00098| This validates Conway's Law application to microservices—you cannot have truly loosely coupled services without corresponding organizational independence.
00099| 
00100| ### Distributed Monolith Warning
00101| 
00102| While not using the term "distributed monolith," DORA's research implies that architectures requiring:
00103| - Coordinated deployments
00104| - Integrated testing environments
00105| - Fine-grained coordination
00106| 
00107| ...are associated with lower performance, regardless of whether they call themselves "microservices."
00108| 
00109| ## Analysis
00110| 
00111| ### What the Research Establishes
00112| 
00113| 1. **Architecture matters for delivery performance** - Not just process or culture
00114| 2. **Independent deployability is measurable** - Specific criteria define what "loosely coupled" means
00115| 3. **High performers achieve independence** - Elite teams deploy without cross-team coordination
00116| 4. **Speed and stability correlate** - Loose coupling enables both
00117| 5. **Organization and architecture are linked** - Cannot decouple one without the other
00118| 
00119| ### The Independence Gradient
00120| 
00121| DORA's research suggests architecture exists on a spectrum:
00122| 
00123| | Architecture Type | Deployment | Testing | Coordination |
00124| |-------------------|------------|---------|--------------|
00125| | **Truly Loosely Coupled** | Independent | Mostly independent | Minimal |
00126| | **Distributed Monolith** | Requires coordination | Requires integrated environment | Extensive |
00127| | **Monolith** | Single deployment | Single test suite | Within team |
00128| 
00129| The distributed monolith is the worst position—distributed complexity without independence benefits.
00130| 
00131| ### FOE Insights
00132| 
00133| **Understanding:**
00134| DORA provides empirical evidence that makes architectural decisions concrete. Rather than debating philosophies, teams can assess their architecture against measurable criteria. The four specific characteristics of loose coupling provide a checklist for evaluation.
00135| 
00136| **Feedback:**
00137| The research shows that loosely coupled teams have faster feedback loops (106x faster lead time). Independent deployment enables rapid iteration. Independent testing reduces the queue time of waiting for integrated test environments.
00138| 
00139| **Confidence:**
00140| Elite performers have both speed AND stability (7x lower change failure rate). This provides confidence that pursuing independent deployability doesn't require accepting more failures. The multi-year, large-sample research provides high confidence in the findings themselves.
00141| 
00142| ## Limitations
00143| 
00144| - **Correlation, not causation:** Research establishes correlation but cannot prove loose coupling causes better outcomes
00145| - **Self-reported data:** Survey-based methodology relies on accurate self-assessment
00146| - **Context variation:** Results may vary by industry, company size, or technology stack
00147| - **Metric gaming risk:** Organizations may optimize for appearing loosely coupled without achieving real independence
00148| - **Survivorship consideration:** High performers may have other advantages that enable loose coupling
00149| 
00150| ### DORA's Own Caveats
00151| 
00152| > "Use these capabilities for improvement, not to compare or rank teams."
00153| 
00154| > "Context matters—what works in one organization may not directly apply to another."
00155| 
00156| ## Conclusion
00157| 
00158| ### Verdict
00159| **Strong Empirical Support** - DORA's research provides the most rigorous empirical evidence that loosely coupled architecture—the defining characteristic of true microservices—correlates with better software delivery performance.
00160| 
00161| ### Key Learnings
00162| 
00163| 1. **Independent deployability correlates with elite performance** - 208x more frequent deployments, 106x faster lead time
00164| 2. **The "litmus test" is validated** - "Deploy without coordination" is exactly what DORA measures
00165| 3. **Distributed monoliths underperform** - Architectures requiring coordination associate with lower performance
00166| 4. **Organization and architecture are linked** - Team structure must support architectural independence
00167| 5. **Speed and stability are not trade-offs** - Loose coupling enables both
00168| 
00169| ### FOE Application
00170| 
00171| DORA's research directly validates the True Microservices method:
00172| 
00173| | True Microservices Claim | DORA Evidence |
00174| |--------------------------|---------------|
00175| | Independent deployment is the primary flow benefit | 208x deployment frequency, 106x faster lead time |
00176| | "Can a team deploy without talking to anyone else?" | Exactly matches DORA's loose coupling definition |
00177| | Distributed monoliths inherit complexity without benefits | Implied by contrast between high and low performers |
00178| | Conway's Law alignment required | "Team structure must support architectural independence" |
00179| 
00180| ---
00181| 
00182| ## References
00183| 
00184| - DORA Research Program: [dora.dev/research](https://dora.dev/research)
00185| - Loosely Coupled Architecture Capability: [dora.dev/capabilities/loosely-coupled-architecture](https://dora.dev/capabilities/loosely-coupled-architecture/)
00186| - Forsgren, N., Humble, J., & Kim, G. (2018). *Accelerate: The Science of Lean Software and DevOps*. IT Revolution Press.
00187| - State of DevOps Reports (2014-2025)
00188| 
00189| ---
00190| 
00191| <RelatedMethods />
00192| 

(End of file - total 192 lines)
</file>
```
```

```
Tool: read

**Input:**
```json
{
  "filePath": "/Users/aaron.west/Documents/Projects/flow-optimized-engineering/docs/docs/field-guides/observations/external/fowler-lewis-microservices-definition.md"
}
```
**Output:**
```
<file>
00001| ---
00002| sidebar_position: 11
00003| title: "Microservices Definition (Fowler & Lewis)"
00004| status: completed
00005| source_type: external
00006| source:
00007|   authors: ["James Lewis", "Martin Fowler"]
00008|   organization: "ThoughtWorks / martinfowler.com"
00009|   year: 2014
00010|   url: "https://martinfowler.com/articles/microservices.html"
00011| methods:
00012|   - architecture/methods/emerging/true-microservices
00013| ---
00014| 
00015| import RelatedMethods from '@site/src/components/RelatedMethods';
00016| 
00017| # Microservices Definition (Fowler & Lewis)
00018| 
00019| > **Source:** Lewis & Fowler (2014) | ThoughtWorks / martinfowler.com
00020| 
00021| The foundational definition of microservices architecture that established the key characteristics distinguishing true microservices from other architectural patterns. This article defined the industry vocabulary and set expectations for what microservices should achieve.
00022| 
00023| ## Context
00024| 
00025| **Environment:**
00026| - Organization: ThoughtWorks consultants synthesizing emerging practices
00027| - Timeline: March 2014 (during early microservices adoption wave)
00028| - Sample: Observations from multiple organizations including Netflix, Amazon, and ThoughtWorks clients
00029| 
00030| **The Problem:**
00031| By 2014, multiple organizations had converged on a similar architectural style, but there was no shared definition or vocabulary. The term "microservices" was gaining traction but meant different things to different people.
00032| 
00033| **Research Questions:**
00034| - What common characteristics define the microservices architectural style?
00035| - How does this approach differ from traditional SOA?
00036| - What trade-offs does this architecture introduce?
00037| 
00038| ## Hypothesis
00039| 
00040| > "If services are designed to be independently deployable, organized around business capabilities, and owned by small teams, then organizations will achieve better agility and scalability because each service can evolve, scale, and fail independently."
00041| 
00042| ## Approach
00043| 
00044| ### Methodology
00045| - **Design:** Synthesis of observed practices across multiple organizations
00046| - **Validation:** Based on production systems at Netflix, Amazon, Guardian, and others
00047| - **Framework:** Nine characteristics that define the architectural style
00048| 
00049| ### The Nine Characteristics
00050| 
00051| | Characteristic | Description |
00052| |----------------|-------------|
00053| | **Componentization via Services** | Services as independently deployable components |
00054| | **Organized around Business Capabilities** | Teams own business capabilities, not technical layers |
00055| | **Products not Projects** | Teams own services long-term, not hand off after delivery |
00056| | **Smart Endpoints and Dumb Pipes** | Business logic in services, simple communication |
00057| | **Decentralized Governance** | Teams choose their own tools and technologies |
00058| | **Decentralized Data Management** | Each service manages its own data |
00059| | **Infrastructure Automation** | Deployment pipelines enable independent release |
00060| | **Design for Failure** | Services handle failure of dependencies gracefully |
00061| | **Evolutionary Design** | Architecture evolves; services can be replaced |
00062| 
00063| ## Results
00064| 
00065| ### Key Finding: Independent Deployability
00066| 
00067| The central claim of microservices is independent deployability:
00068| 
00069| > "Services are independently deployable by fully automated deployment machinery."
00070| 
00071| This is presented as the litmus test for whether you have true microservices:
00072| 
00073| > "A change to a small part of the application only requires one or a few services to be rebuilt and redeployed."
00074| 
00075| ### Organization Around Business Capabilities
00076| 
00077| The authors explicitly reference Conway's Law:
00078| 
00079| > "Organizations which design systems are constrained to produce designs which are copies of the communication structures of these organizations."
00080| 
00081| And recommend using it intentionally:
00082| 
00083| > "The microservice approach to division is different, splitting up into services organized around business capability."
00084| 
00085| ### Decentralized Data Management
00086| 
00087| A key distinguishing factor from distributed monoliths:
00088| 
00089| > "Microservices prefer letting each service manage its own database, either different instances of the same database technology, or entirely different database systems."
00090| 
00091| This contrasts with the shared-database anti-pattern:
00092| 
00093| > "The conceptual model of the world will differ between systems... Domain-Driven Design's concept of Bounded Context is useful here."
00094| 
00095| ### Smart Endpoints, Dumb Pipes
00096| 
00097| Communication should be simple, not smart:
00098| 
00099| > "Applications built from microservices aim to be as decoupled and as cohesive as possible—they own their own domain logic... using the simpler protocols found in the web (resource request-response) and lightweight messaging."
00100| 
00101| ### Acknowledged Trade-offs
00102| 
00103| The article honestly acknowledges complexity:
00104| 
00105| > "Developers have to deal with the additional complexity of creating a distributed system."
00106| 
00107| > "Implementing use cases that span multiple services without using distributed transactions is difficult."
00108| 
00109| > "Deploying features that span multiple services requires careful coordination."
00110| 
00111| ## Analysis
00112| 
00113| ### What the Article Establishes
00114| 
00115| 1. **Independent deployability is the defining characteristic** - This is what separates microservices from other architectures
00116| 2. **Business capability alignment** - Services map to what the business does, not technical layers
00117| 3. **Decentralized data is essential** - Shared databases violate the pattern
00118| 4. **Conway's Law applies** - Team structure should match service structure
00119| 5. **Trade-offs are real** - Distributed systems complexity is the cost
00120| 
00121| ### The Distributed Monolith Warning
00122| 
00123| While not using the term "distributed monolith," the article describes the anti-pattern:
00124| 
00125| > "We've seen many projects run into significant difficulties if they try to split the components into services from the get-go."
00126| 
00127| And warns:
00128| 
00129| > "If the components do not compose cleanly into services, then you're just moving complexity from inside a component to the connections between components."
00130| 
00131| ### FOE Insights
00132| 
00133| **Understanding:**
00134| The nine characteristics provide a clear mental model for what microservices should look like. The business capability alignment principle helps teams reason about where service boundaries belong. The explicit trade-offs help teams make informed decisions.
00135| 
00136| **Feedback:**
00137| Independent deployability enables fast feedback—teams can release, learn, and iterate without coordinating deployments. The "products not projects" principle ensures teams stay connected to feedback from production.
00138| 
00139| **Confidence:**
00140| "Design for failure" principles (circuit breakers, graceful degradation) build confidence in system resilience. Automated deployment pipelines provide confidence in the release process. Decentralized data eliminates the risk of database changes affecting multiple services.
00141| 
00142| ## Limitations
00143| 
00144| - **Opinion synthesis:** Not empirical research; synthesizes observed practices
00145| - **Early days:** Written in 2014 when microservices were emerging; some claims untested at scale
00146| - **Survivorship bias:** Examples are success stories; failures less visible
00147| - **Organizational prerequisites:** Assumes organizational willingness to adopt new structures
00148| - **No metrics:** No quantitative evidence for claims (though DORA research later provided this)
00149| 
00150| ### Authors' Own Caveats
00151| 
00152| > "We are finding more and more appealing, but we are also humbled by the recognition that we don't know if we are right."
00153| 
00154| > "Certainly there are reasons why one might expect microservices to mature poorly."
00155| 
00156| ## Conclusion
00157| 
00158| ### Verdict
00159| **Foundational Source** - This article established the vocabulary and expectations for microservices architecture. While not empirical research, it synthesized emerging practices that have since been validated by DORA research and widespread adoption.
00160| 
00161| ### Key Learnings
00162| 
00163| 1. **Independent deployability is the litmus test** - If you can't deploy independently, you don't have microservices
00164| 2. **Business capabilities, not technical layers** - Service boundaries follow business functions
00165| 3. **Decentralized data ownership** - Each service owns its data
00166| 4. **Conway's Law alignment** - Team structure should match service structure
00167| 5. **Trade-offs exist** - Distributed systems complexity is real and should be accepted consciously
00168| 
00169| ### FOE Application
00170| 
00171| This foundational article directly supports the True Microservices method:
00172| 
00173| | True Microservices Claim | Fowler/Lewis Support |
00174| |--------------------------|---------------------|
00175| | Independent team deployment is the primary flow benefit | "Services are independently deployable" |
00176| | Distributed monoliths inherit complexity without benefits | "Moving complexity from inside a component to connections between components" |
00177| | Service boundaries align with business capabilities | "Organized around business capability" |
00178| | Shared databases are an anti-pattern | "Each service manages its own database" |
00179| | Conway's Law is a tool | Explicit reference to Conway's Law as design principle |
00180| 
00181| ---
00182| 
00183| ## References
00184| 
00185| - Lewis, J., & Fowler, M. (2014). "Microservices." martinfowler.com. Available at: [martinfowler.com/articles/microservices.html](https://martinfowler.com/articles/microservices.html)
00186| - Related: Fowler, M. (2015). "MonolithFirst." [martinfowler.com/bliki/MonolithFirst.html](https://martinfowler.com/bliki/MonolithFirst.html)
00187| - Related: Fowler, M. (2022). "Conway's Law." [martinfowler.com/bliki/ConwaysLaw.html](https://martinfowler.com/bliki/ConwaysLaw.html)
00188| 
00189| ---
00190| 
00191| <RelatedMethods />
00192| 

(End of file - total 192 lines)
</file>
```
```

```
Tool: read

**Input:**
```json
{
  "filePath": "/Users/aaron.west/Documents/Projects/flow-optimized-engineering/docs/docs/field-guides/observations/external/team-topologies-inverse-conway.md"
}
```
**Output:**
```
<file>
00001| ---
00002| sidebar_position: 10
00003| title: "Team Topologies: Inverse Conway Maneuver"
00004| status: completed
00005| source_type: external
00006| source:
00007|   authors: ["Matthew Skelton", "Manuel Pais"]
00008|   organization: "IT Revolution Press"
00009|   year: 2019
00010|   url: "https://teamtopologies.com"
00011| methods:
00012|   - architecture/methods/emerging/true-microservices
00013| ---
00014| 
00015| import RelatedMethods from '@site/src/components/RelatedMethods';
00016| 
00017| # Team Topologies: Inverse Conway Maneuver
00018| 
00019| > **Source:** Skelton & Pais (2019) | IT Revolution Press
00020| 
00021| Team Topologies provides a systematic framework for organizing teams around flow of value, using Conway's Law intentionally rather than fighting against it. The book demonstrates that service boundaries should align with team boundaries, and that independent deployment capability requires organizational alignment.
00022| 
00023| ## Context
00024| 
00025| **Environment:**
00026| - Organization: IT Revolution / Independent consultants
00027| - Timeline: Published 2019, based on years of consulting experience
00028| - Sample: Case studies from multiple organizations across industries
00029| 
00030| **The Problem:**
00031| Organizations often create architectures that conflict with their team structures, creating constant friction. Teams are organized one way, services another, and the mismatch creates coordination overhead that kills flow.
00032| 
00033| **Research Questions:**
00034| - How should teams be organized to optimize for fast flow of value?
00035| - How can organizations use Conway's Law intentionally?
00036| - What team types and interaction modes enable independent delivery?
00037| 
00038| ## Hypothesis
00039| 
00040| > "If organizations deliberately design team structures to match their desired architecture (the Inverse Conway Maneuver), then they will achieve faster flow with less coordination overhead because team boundaries naturally become service boundaries."
00041| 
00042| ## Approach
00043| 
00044| ### Methodology
00045| - **Design:** Synthesis of practitioner experience and case studies
00046| - **Framework:** Four fundamental team types + three interaction modes
00047| - **Validation:** Adopted by thousands of organizations; referenced in DORA research
00048| 
00049| ### The Four Team Types
00050| 
00051| | Team Type | Purpose | Relationship to Microservices |
00052| |-----------|---------|------------------------------|
00053| | **Stream-aligned** | Delivers value for a single business capability | Owns one or more services end-to-end |
00054| | **Platform** | Provides shared capabilities via self-service APIs | Provides platform services (auth, messaging) |
00055| | **Enabling** | Helps stream-aligned teams acquire capabilities | Temporary assistance, not ownership |
00056| | **Complicated-subsystem** | Handles complex technical domains | Owns specialized services requiring deep expertise |
00057| 
00058| ### Three Interaction Modes
00059| 
00060| | Mode | Description | When Used |
00061| |------|-------------|-----------|
00062| | **Collaboration** | Working closely together | Discovery phases, tight integration |
00063| | **X-as-a-Service** | One team provides, another consumes | Stable APIs, independent deployment |
00064| | **Facilitating** | Helping/coaching | Capability building |
00065| 
00066| ## Results
00067| 
00068| ### Key Finding: Conway's Law as a Tool
00069| 
00070| The book's central insight is that Conway's Law should be embraced, not fought:
00071| 
00072| > "Organizations which design systems are constrained to produce designs which are copies of the communication structures of these organizations." — Melvin Conway, 1968
00073| 
00074| Rather than viewing this as a constraint, the Inverse Conway Maneuver uses it intentionally:
00075| 
00076| > "The organization should evolve its team structures to match the architecture it wants to achieve."
00077| 
00078| ### Stream-Aligned Teams Enable Independent Deployment
00079| 
00080| | Characteristic | Description |
00081| |---------------|-------------|
00082| | End-to-end ownership | Team owns from idea to production |
00083| | Minimal dependencies | Works independently most of the time |
00084| | Fast flow | No waiting on other teams for delivery |
00085| | Clear purpose | Aligned to business capability or customer journey |
00086| 
00087| ### Platform Teams Enable Shared Services
00088| 
00089| The book distinguishes between accidental coupling (shared databases) and intentional sharing (platform APIs):
00090| 
00091| > "A good platform is 'just big enough.' It should provide only the capabilities needed to enable stream-aligned teams to move quickly."
00092| 
00093| Platform teams provide:
00094| - Self-service APIs (not shared implementations)
00095| - Clear service boundaries
00096| - Independent evolution with backward compatibility
00097| 
00098| ### Cognitive Load as Constraint
00099| 
00100| Teams cannot effectively own too much. The book introduces cognitive load as a key constraint:
00101| 
00102| > "When cognitive load isn't considered, teams are spread thin trying to cover too much, and their architecture and code suffer."
00103| 
00104| This supports the claim that service boundaries should be scoped to what a team can own end-to-end.
00105| 
00106| ## Analysis
00107| 
00108| ### What the Book Establishes
00109| 
00110| 1. **Conway's Law is a tool** - Organizational structure should drive architecture, not fight it
00111| 2. **Team ownership = service ownership** - Stream-aligned teams own services end-to-end
00112| 3. **Platform services are intentional** - Shared capabilities through APIs, not shared databases
00113| 4. **Cognitive load limits scope** - Services should be sized to what teams can effectively own
00114| 5. **X-as-a-Service enables independence** - Stable APIs between teams enable independent deployment
00115| 
00116| ### FOE Insights
00117| 
00118| **Understanding:**
00119| Team Topologies provides clarity on why "distributed monoliths" fail—they violate Conway's Law by having architectural boundaries that don't match team boundaries. The cognitive load concept helps teams understand when services are too big or too interconnected.
00120| 
00121| **Feedback:**
00122| Stream-aligned teams enable fast feedback because they can change their services without coordinating with other teams. The X-as-a-Service interaction mode creates clear boundaries that enable independent iteration cycles.
00123| 
00124| **Confidence:**
00125| When team boundaries align with service boundaries, teams have clear ownership and accountability. This reduces ambiguity about who fixes problems and who makes architectural decisions. Platform teams' backward-compatible APIs provide confidence that changes won't break consumers.
00126| 
00127| ## Limitations
00128| 
00129| - **Practitioner synthesis:** Based on consulting experience and case studies, not controlled research
00130| - **Organizational change required:** Implementing Team Topologies often requires significant reorganization
00131| - **Cultural prerequisites:** Requires organizational buy-in to team autonomy principles
00132| - **Context-dependent:** Optimal team structures vary by organization size and domain
00133| 
00134| ### Authors' Own Caveat
00135| 
00136| > "Team Topologies is a model, not a strict rulebook. Organizations need to adapt the ideas to their specific context."
00137| 
00138| ## Conclusion
00139| 
00140| ### Verdict
00141| **Strongly Supported** - Team Topologies provides a coherent framework that directly supports the True Microservices method's claims about service boundaries aligning with team boundaries and Conway's Law as a tool.
00142| 
00143| ### Key Learnings
00144| 
00145| 1. **Inverse Conway Maneuver:** Design team structure to achieve desired architecture
00146| 2. **Stream-aligned teams own services end-to-end:** No hand-offs, full accountability
00147| 3. **Platform services via APIs:** Intentional sharing, not accidental coupling
00148| 4. **Cognitive load constrains scope:** Services sized to team capacity
00149| 
00150| ### FOE Application
00151| 
00152| Team Topologies directly supports the True Microservices method by providing:
00153| - The organizational "why" behind service boundaries
00154| - Clear distinction between platform services (intentional) and distributed monoliths (accidental)
00155| - The Inverse Conway Maneuver as explicit strategy
00156| 
00157| | True Microservices Claim | Team Topologies Support |
00158| |--------------------------|------------------------|
00159| | Service boundaries align with team ownership | Stream-aligned teams own end-to-end |
00160| | Shared services accessed via stable APIs | Platform teams provide X-as-a-Service |
00161| | Conway's Law is a tool, not a problem | Inverse Conway Maneuver |
00162| | "Can a team deploy without talking to anyone?" | Stream-aligned team definition |
00163| 
00164| ---
00165| 
00166| ## References
00167| 
00168| - Skelton, M., & Pais, M. (2019). *Team Topologies: Organizing Business and Technology Teams for Fast Flow*. IT Revolution Press.
00169| - Conway, M. (1968). "How Do Committees Invent?" *Datamation*.
00170| - Team Topologies website: [teamtopologies.com](https://teamtopologies.com)
00171| 
00172| ---
00173| 
00174| <RelatedMethods />
00175| 

(End of file - total 175 lines)
</file>
```
```

```
Tool: read

**Input:**
```json
{
  "filePath": "/Users/aaron.west/Documents/Projects/flow-optimized-engineering/docs/docs/field-guides/observations/external/bdd-industrial-study-2018.md"
}
```
**Output:**
```
<file>
00001| ---
00002| sidebar_position: 6
00003| title: "BDD Benefits and Challenges: Industrial Study"
00004| status: completed
00005| source_type: external
00006| source:
00007|   authors: ["Leticia Pereira", "Helen Sharp", "Cleidson de Souza", "Gabriel Oliveira", "Steve Marczak", "Rafael Prikladnicki"]
00008|   organization: "ACM XP Conference"
00009|   year: 2018
00010|   url: "https://dl.acm.org/doi/abs/10.1145/3234152.3234167"
00011| methods:
00012|   - external-frameworks/bdd/methods/given-when-then
00013|   - external-frameworks/bdd/methods/executable-specifications
00014|   - external-frameworks/bdd/methods/three-amigos
00015| ---
00016| 
00017| import RelatedMethods from '@site/src/components/RelatedMethods';
00018| 
00019| # BDD Benefits and Challenges: Industrial Study
00020| 
00021| > **Source:** Pereira et al. (2018), ACM XP Conference
00022| 
00023| An empirical study with 24 IT professionals providing a nuanced view of BDD: significant communication and shared understanding benefits exist, but require genuine investment in scenario maintenance and writing quality.
00024| 
00025| ## Context
00026| 
00027| **Environment:**
00028| - Organization: ACM XP Conference (peer-reviewed)
00029| - Researchers: Pereira, Sharp, de Souza, Oliveira, Marczak, Prikladnicki
00030| - Timeline: Published 2018
00031| - Sample: 24 IT professionals with BDD experience
00032| 
00033| **The Problem:**
00034| While BDD adoption was growing, teams needed realistic expectations about both benefits and challenges. Anecdotal reports often emphasized either success stories or failures, leaving practitioners without balanced guidance.
00035| 
00036| **Research Questions:**
00037| 1. What benefits do practitioners actually experience from BDD?
00038| 2. What challenges do teams face when implementing BDD?
00039| 3. How do benefits and challenges vary across different roles and contexts?
00040| 
00041| ## Hypothesis
00042| 
00043| > "The researchers expected that practitioners would report communication improvements from BDD, but also identify practical challenges in implementation that aren't well-documented in the literature."
00044| 
00045| **Variables:**
00046| - Independent: BDD adoption and practice
00047| - Dependent: Perceived benefits, experienced challenges, team communication quality
00048| 
00049| ## Approach
00050| 
00051| ### Methodology
00052| 
00053| - **Design:** Qualitative empirical study with semi-structured interviews
00054| - **Analysis:** Thematic coding of interview transcripts
00055| - **Validation:** Multiple researcher coding, member checking
00056| 
00057| ### Data Collection
00058| 
00059| - Semi-structured interviews with 24 IT professionals
00060| - Participants had direct BDD experience
00061| - Covered developers, testers, product owners, and managers
00062| - Explored both positive experiences and difficulties
00063| 
00064| ## Results
00065| 
00066| ### Key Benefits Reported
00067| 
00068| | Benefit | Frequency | Description |
00069| |---------|-----------|-------------|
00070| | **Improved communication** | High | Most-cited benefit across roles |
00071| | **Shared understanding** | High | Teams develop common vocabulary |
00072| | **Living documentation** | Moderate | Scenarios serve as up-to-date specs |
00073| | **Earlier defect detection** | Moderate | Issues found during specification |
00074| 
00075| ### Key Challenges Reported
00076| 
00077| | Challenge | Frequency | Description |
00078| |-----------|-----------|-------------|
00079| | **Scenario maintenance** | High | Keeping scenarios synchronized with code |
00080| | **Writing good scenarios** | High | Declarative vs. imperative scenarios |
00081| | **Initial learning curve** | Moderate | Understanding BDD philosophy takes time |
00082| | **Tool integration** | Moderate | Connecting scenarios to test automation |
00083| 
00084| ### Notable Findings
00085| 
00086| 1. **Communication benefits are real but require effort** - Simply adopting BDD tools doesn't automatically improve communication; teams must embrace the collaborative practices
00087| 2. **Scenario quality varies significantly** - Poorly written scenarios (imperative, brittle) undermine the benefits
00088| 3. **Maintenance is a genuine concern** - Scenarios that aren't kept current become technical debt
00089| 4. **Role matters** - Developers and testers experience different benefits and challenges
00090| 
00091| ### Surprising Findings
00092| 
00093| - Some practitioners reported that BDD improved team morale by creating shared ownership of specifications
00094| - The effort required to write good scenarios was often underestimated by teams new to BDD
00095| 
00096| ## Analysis
00097| 
00098| ### What the Research Establishes
00099| 
00100| 1. **BDD delivers communication benefits** - Consistent with other studies, practitioners report improved stakeholder alignment
00101| 2. **Challenges are real and predictable** - Maintenance burden and writing quality aren't edge cases; they're common experiences
00102| 3. **Investment is required** - BDD isn't "free"; teams must commit to practices and maintenance
00103| 4. **Benefits outweigh challenges for most** - Despite difficulties, practitioners generally valued BDD
00104| 
00105| ### FOE Insights
00106| 
00107| **Understanding:**
00108| The study confirms that BDD improves shared understanding, but adds nuance: the improvement requires deliberate effort. Simply using Given-When-Then syntax doesn't automatically create shared understanding - teams must engage in the collaborative specification process. This suggests that Discovery Workshops and Three Amigos practices are essential enablers, not optional add-ons.
00109| 
00110| **Feedback:**
00111| The maintenance challenge revealed in this study is actually a feedback problem. When scenarios become outdated, the feedback loop breaks - tests may pass but no longer verify meaningful behavior. This argues for treating scenario maintenance as critical ongoing work, not technical debt to address "later."
00112| 
00113| **Confidence:**
00114| The study provides balanced confidence in BDD: expect genuine benefits, but also expect genuine work. This realistic framing is more valuable than either BDD evangelism or criticism - practitioners can make informed decisions about adoption.
00115| 
00116| ## Limitations
00117| 
00118| - **Single study:** 24 participants from a specific context
00119| - **Self-reported:** Benefits and challenges are perceived, not measured
00120| - **Selection bias:** Participants volunteered, potentially overrepresenting engaged practitioners
00121| - **Point-in-time:** Snapshot of experience, not longitudinal view
00122| 
00123| ## Conclusion
00124| 
00125| ### Verdict
00126| **Supported with Caveats** - BDD benefits are real and achievable, but require genuine investment. Teams should expect communication improvements AND maintenance challenges.
00127| 
00128| ### Key Learnings
00129| 
00130| 1. **Communication improvement is the primary benefit** - Consistently reported across roles and contexts
00131| 2. **Maintenance effort is consistently underestimated** - Plan for ongoing scenario upkeep from the start
00132| 3. **Writing good scenarios is a skill** - Teams need guidance on declarative, behavior-focused scenarios
00133| 4. **Collaborative practices are essential** - Tool adoption alone doesn't deliver benefits
00134| 
00135| ### Recommendation
00136| 
00137| **Apply this when:**
00138| - Teams want to improve business-technical communication
00139| - Stakeholder misalignment has caused past rework
00140| - Organization is willing to invest in training and maintenance
00141| 
00142| **Watch out for:**
00143| - Underestimating scenario maintenance burden
00144| - Skipping collaborative specification practices
00145| - Writing imperative (UI-focused) rather than declarative (behavior-focused) scenarios
00146| - Treating BDD as "just testing" rather than specification
00147| 
00148| ### FOE Application
00149| 
00150| | Finding | FOE Implication |
00151| |---------|-----------------|
00152| | Communication benefits require collaborative practices | Three Amigos and Discovery are prerequisites, not optional |
00153| | Maintenance burden is real | Build scenario maintenance into Definition of Done |
00154| | Writing quality matters | Train teams on declarative scenario writing |
00155| | Benefits outweigh challenges | BDD is worth the investment when done well |
00156| 
00157| ---
00158| 
00159| ## References
00160| 
00161| - Pereira, L., Sharp, H., de Souza, C., Oliveira, G., Marczak, S., & Prikladnicki, R. (2018). Behavior-driven development benefits and challenges: reports from an industrial study. *Proceedings of the 19th International Conference on Agile Software Development (XP)*. ACM. https://dl.acm.org/doi/abs/10.1145/3234152.3234167
00162| 
00163| ---
00164| 
00165| <RelatedMethods />
00166| 

(End of file - total 166 lines)
</file>
```
```

```
Tool: read

**Input:**
```json
{
  "filePath": "/Users/aaron.west/Documents/Projects/flow-optimized-engineering/docs/docs/field-guides/observations/external/google-project-aristotle.md"
}
```
**Output:**
```
<file>
00001| ---
00002| sidebar_position: 2
00003| title: "Google Project Aristotle: Psychological Safety"
00004| status: completed
00005| source_type: external
00006| source:
00007|   authors: ["Amy Edmondson", "Julia Rozovsky"]
00008|   organization: "Harvard Business School / Google"
00009|   year: 2015
00010|   url: "https://rework.withgoogle.com/guides/understanding-team-effectiveness"
00011| methods:
00012|   - external-frameworks/bdd/methods/three-amigos
00013|   - external-frameworks/bdd/methods/discovery-workshops
00014| ---
00015| 
00016| import RelatedMethods from '@site/src/components/RelatedMethods';
00017| 
00018| # Google Project Aristotle: Psychological Safety
00019| 
00020| > **Source:** Edmondson (1999), Google Project Aristotle (2012-2015)
00021| 
00022| Google's multi-year study of 180 teams found that psychological safety is the #1 predictor of team effectiveness - more important than individual talent, team composition, or work style. Teams with high psychological safety are 2x more likely to be rated effective by executives and bring in more revenue.
00023| 
00024| ## Context
00025| 
00026| **Environment:**
00027| - Organization: Google (People Analytics team)
00028| - Lead Researcher: Julia Rozovsky
00029| - Timeline: 2012-2015
00030| - Sample: 180 teams (115 engineering project teams, 65 sales pods)
00031| 
00032| **The Problem:**
00033| Google wanted to understand what makes teams effective. Despite having world-class talent and resources, some teams dramatically outperformed others. The question: what distinguishes high-performing teams from the rest?
00034| 
00035| **Prior Assumptions:**
00036| Many believed the answer would be about team composition - having the "right" people with the "right" skills. Google's data told a different story.
00037| 
00038| ## Hypothesis
00039| 
00040| > "If we identify the factors that distinguish high-performing teams, then we can systematically improve team effectiveness because team dynamics are learnable, not innate."
00041| 
00042| **Variables:**
00043| - Independent: Team dynamics, norms, and composition factors
00044| - Dependent: Team effectiveness (executive ratings, revenue, retention)
00045| 
00046| ## Approach
00047| 
00048| ### Methodology
00049| Google's People Analytics team combined multiple research methods:
00050| 
00051| 1. **Double-blind interviews** with team leaders
00052| 2. **Survey analysis** of 250+ items from annual employee engagement surveys
00053| 3. **Statistical modeling** using 35+ models analyzing hundreds of variables
00054| 4. **Longitudinal data** from Google's gDNA study
00055| 
00056| ### What They Measured
00057| - Team composition (skills, tenure, demographics)
00058| - Team dynamics (communication, conflict resolution)
00059| - Team norms (how meetings are run, how decisions are made)
00060| - Individual performance of members
00061| - Colocation and working styles
00062| 
00063| ### Academic Foundation
00064| The research built on Amy Edmondson's 1999 foundational study defining psychological safety as:
00065| 
00066| > "A shared belief held by members of a team that the team is safe for interpersonal risk taking."
00067| 
00068| ## Results
00069| 
00070| ### The Five Factors (In Order of Importance)
00071| 
00072| | Rank | Factor | Description |
00073| |------|--------|-------------|
00074| | **1** | **Psychological Safety** | Can team members take risks without feeling insecure or embarrassed? |
00075| | 2 | Dependability | Can team members count on each other to do high-quality work on time? |
00076| | 3 | Structure & Clarity | Are goals, roles, and execution plans clear? |
00077| | 4 | Meaning | Is the work personally important to team members? |
00078| | 5 | Impact | Does the team believe their work matters? |
00079| 
00080| ### What Didn't Matter
00081| 
00082| The research found several factors had little impact on team effectiveness at Google:
00083| 
00084| - Colocation of teammates
00085| - Consensus-driven decision making
00086| - Extroversion of team members
00087| - Individual performance of team members
00088| - Workload size
00089| - Seniority
00090| - Team size
00091| - Tenure
00092| 
00093| ### Quantitative Outcomes
00094| 
00095| Teams with high psychological safety:
00096| 
00097| | Metric | Outcome |
00098| |--------|---------|
00099| | Executive effectiveness rating | **2x more likely** to be rated as effective |
00100| | Revenue generation | **Higher revenue** brought in |
00101| | Employee retention | **Less likely to leave** Google |
00102| 
00103| ### The Paradox Discovery
00104| 
00105| An earlier study by Amy Edmondson (1996) that Google's research validated:
00106| 
00107| In hospital units, teams that appeared to have **higher error rates** were actually the **better performing** teams. The explanation: they weren't making more mistakes - they were **more willing to report them**.
00108| 
00109| > "High-performing units weren't making more mistakes - they were more willing to report them."
00110| 
00111| This illustrates the virtuous cycle: psychological safety enables error reporting, which enables learning, which enables improvement.
00112| 
00113| ## Analysis
00114| 
00115| ### What the Research Establishes
00116| 
00117| 1. **Team dynamics > Team composition:** Who is on the team matters less than how the team works together
00118| 2. **Psychological safety is foundational:** The other four factors matter, but PS is the foundation that enables them
00119| 3. **PS is measurable:** A 7-item survey can reliably assess team psychological safety
00120| 4. **PS is learnable:** Teams can develop psychological safety through deliberate practice
00121| 
00122| ### Why This Matters for Engineering Teams
00123| 
00124| Engineering work requires:
00125| - Admitting when you don't understand something
00126| - Asking "dumb" questions
00127| - Proposing ideas that might be wrong
00128| - Reporting bugs and mistakes early
00129| - Challenging decisions (including leadership's)
00130| 
00131| All of these require psychological safety. Without it, engineers stay quiet, bugs hide longer, and bad decisions go unchallenged.
00132| 
00133| ### FOE Insights
00134| 
00135| **Understanding:**
00136| Psychological safety directly enables the "Understanding" pillar of FOE. When team members can admit confusion and ask questions without fear, knowledge gaps surface early. When asking "why does this work this way?" is safe, mental models get tested and corrected. Understanding requires vulnerability; vulnerability requires safety.
00137| 
00138| **Feedback:**
00139| PS is the prerequisite for honest feedback. Without it:
00140| - Code reviews become rubber stamps (no one wants to criticize)
00141| - Retrospectives surface only safe topics
00142| - Bugs get hidden rather than reported
00143| - Bad designs go unchallenged
00144| 
00145| With PS, feedback loops actually function. The hospital study showed this directly: more reporting (not more errors) in high-PS environments.
00146| 
00147| **Confidence:**
00148| Counter-intuitively, psychological safety enables organizational confidence. When team members can voice concerns, leadership has accurate information. When mistakes are reported early, they're caught when they're small. When people can say "I don't know," others can help. This creates justified confidence rather than false confidence.
00149| 
00150| ## Limitations
00151| 
00152| - **Single organization:** Conducted entirely at Google; results may differ in other cultures
00153| - **Selection bias:** Google already selects for certain personality types and skills
00154| - **Resource context:** Google teams have resources most companies don't
00155| - **Correlation vs. causation:** The research shows correlation; causation is inferred
00156| - **Self-reported data:** Effectiveness ratings are subjective
00157| - **Tech industry focus:** Primarily engineering and sales teams; may not generalize to all functions
00158| 
00159| ### Replication Evidence
00160| 
00161| However, the findings have been replicated and extended:
00162| 
00163| | Study | Sample | Finding |
00164| |-------|--------|---------|
00165| | Edmondson 1999 | 51 manufacturing teams | PS → Learning → Performance |
00166| | Edmondson 1996 | Hospital units | PS → Error reporting |
00167| | Frazier et al. 2017 | Meta-analysis | PS correlates with learning, performance, innovation |
00168| 
00169| ## Conclusion
00170| 
00171| ### Verdict
00172| **Strongly Supported** - The Project Aristotle findings are consistent with 25+ years of academic research on psychological safety. Google's contribution was demonstrating this at scale in a technology company context and providing a practical framework for assessment and improvement.
00173| 
00174| ### Key Learnings
00175| 
00176| 1. **Psychological safety is #1:** Above individual talent, team composition, and working style
00177| 2. **It's about the team, not the individuals:** Brilliant jerks hurt team effectiveness more than they help
00178| 3. **Safety enables honesty:** Error reporting, feedback, and learning all require psychological safety
00179| 4. **It's measurable and improvable:** The 7-item survey provides a starting point; deliberate practice can improve scores
00180| 
00181| ### Recommendation
00182| 
00183| **Apply this when:**
00184| - Building new teams or reorganizing existing ones
00185| - Diagnosing why a talented team is underperforming
00186| - Creating conditions for honest feedback and learning
00187| - Establishing team norms and working agreements
00188| 
00189| **Watch out for:**
00190| - Assuming psychological safety means "being nice" - it means being able to challenge ideas constructively
00191| - Trying to create PS through mandates rather than modeling behavior
00192| - Ignoring PS in favor of hiring "better" people
00193| - Measuring PS without acting on the results
00194| 
00195| ### FOE Application
00196| 
00197| Psychological safety is the foundation that enables the three FOE optimizations:
00198| 
00199| | FOE Principle | How PS Enables It |
00200| |---------------|-------------------|
00201| | Understanding | Safe to ask questions, admit confusion, challenge assumptions |
00202| | Fast Feedback | Safe to report problems early, give honest reviews, surface concerns |
00203| | Confidence | Accurate information flows; problems caught early; justified (not false) confidence |
00204| 
00205| Without psychological safety, teams optimize for appearing competent rather than actually being competent. FOE practices become theater rather than substance.
00206| 
00207| ---
00208| 
00209| ## References
00210| 
00211| - Edmondson, A. C. (1999). Psychological Safety and Learning Behavior in Work Teams. *Administrative Science Quarterly*, 44(2), 350-383.
00212| - Edmondson, A. C. (2018). *The Fearless Organization: Creating Psychological Safety in the Workplace for Learning, Innovation, and Growth*. Wiley.
00213| - Duhigg, C. (2016). What Google Learned From Its Quest to Build the Perfect Team. *The New York Times Magazine*.
00214| - re:Work Guide: Understand team effectiveness. [rework.withgoogle.com](https://rework.withgoogle.com/guides/understanding-team-effectiveness)
00215| 
00216| ---
00217| 
00218| <RelatedMethods />
00219| 

(End of file - total 219 lines)
</file>
```
```

```
Tool: read

**Input:**
```json
{
  "filePath": "/Users/aaron.west/Documents/Projects/flow-optimized-engineering/docs/docs/field-guides/observations/external/bdd-adoption-github-study-2020.md"
}
```
**Output:**
```
<file>
00001| ---
00002| sidebar_position: 7
00003| title: "BDD Adoption in Open Source Projects"
00004| status: completed
00005| source_type: external
00006| source:
00007|   authors: ["Fiorella Zampetti", "Andrea Di Sorbo", "Corrado Aaron Visaggio", "Gerardo Canfora", "Massimiliano Di Penta"]
00008|   organization: "Information and Software Technology (Elsevier)"
00009|   year: 2020
00010|   url: "https://www.sciencedirect.com/science/article/pii/S095058492030063X"
00011| methods:
00012|   - external-frameworks/bdd/methods/given-when-then
00013|   - external-frameworks/bdd/methods/executable-specifications
00014| ---
00015| 
00016| import RelatedMethods from '@site/src/components/RelatedMethods';
00017| 
00018| # BDD Adoption in Open Source Projects
00019| 
00020| > **Source:** Zampetti et al. (2020), Information and Software Technology
00021| 
00022| A large-scale study of 50,000 GitHub projects revealing that while ~27% use BDD frameworks, many use them for unit testing rather than true behavior-driven development. Provides important nuance about the gap between tool adoption and methodology adoption.
00023| 
00024| ## Context
00025| 
00026| **Environment:**
00027| - Organization: Information and Software Technology journal (Elsevier)
00028| - Researchers: Zampetti, Di Sorbo, Visaggio, Canfora, Di Penta
00029| - Timeline: Published 2020
00030| - Sample: 50,000 GitHub projects + survey of 31 developers
00031| 
00032| **The Problem:**
00033| BDD tool adoption was growing, but it was unclear whether teams were adopting the full BDD methodology or simply using BDD frameworks as test automation tools. Understanding actual practice (vs. claimed practice) is critical for realistic expectations.
00034| 
00035| **Research Questions:**
00036| 1. How widespread is BDD tool adoption in open source projects?
00037| 2. How are BDD frameworks actually being used in practice?
00038| 3. Do developers follow the "specification first" approach BDD advocates?
00039| 4. What factors influence BDD adoption patterns?
00040| 
00041| ## Hypothesis
00042| 
00043| > "The researchers hypothesized that BDD tool adoption would be significant, but that actual BDD methodology adoption (specification-first, collaborative scenarios) might be lower than tool usage suggests."
00044| 
00045| **Variables:**
00046| - Independent: BDD framework presence, project characteristics
00047| - Dependent: Usage patterns, test timing, scenario quality
00048| 
00049| ## Approach
00050| 
00051| ### Methodology
00052| 
00053| - **Design:** Mixed methods - repository mining + developer survey
00054| - **Analysis:** Quantitative analysis of 50,000 projects, qualitative survey analysis
00055| - **Validation:** Cross-validation between repository data and developer reports
00056| 
00057| ### Data Collection
00058| 
00059| 1. **Repository Mining:** Analyzed 50,000 GitHub projects for BDD framework usage
00060| 2. **Commit Analysis:** Examined when BDD tests were written relative to production code
00061| 3. **Developer Survey:** 31 developers with BDD experience
00062| 
00063| ## Results
00064| 
00065| ### BDD Tool Adoption
00066| 
00067| | Language | BDD Adoption Rate | Primary Framework |
00068| |----------|-------------------|-------------------|
00069| | Ruby | **68%** | Cucumber, RSpec |
00070| | JavaScript | ~25% | Cucumber.js, Jasmine |
00071| | Java | ~20% | Cucumber-JVM, JBehave |
00072| | Python | ~15% | Behave, Lettuce |
00073| | **Overall** | **~27%** | Various |
00074| 
00075| ### How BDD Tools Are Actually Used
00076| 
00077| | Usage Pattern | Frequency | Description |
00078| |---------------|-----------|-------------|
00079| | **True BDD** | Low | Specification-first, collaborative scenarios |
00080| | **Unit testing** | High | BDD frameworks used for unit tests |
00081| | **Integration testing** | Moderate | BDD syntax for integration tests |
00082| | **Post-hoc documentation** | Moderate | Scenarios written after implementation |
00083| 
00084| ### Developer Survey Findings
00085| 
00086| | Question | Finding |
00087| |----------|---------|
00088| | When do you write BDD tests? | **Most write tests while/after coding**, not before |
00089| | Who writes scenarios? | Primarily developers, limited business involvement |
00090| | Main benefit? | Readable test syntax, documentation |
00091| | Main challenge? | Time investment, maintenance |
00092| 
00093| ### Key Quantitative Finding
00094| 
00095| **27% of surveyed projects use BDD frameworks, but the majority don't follow the "specification first" methodology** - scenarios are written during or after implementation, not before.
00096| 
00097| ## Analysis
00098| 
00099| ### What the Research Establishes
00100| 
00101| 1. **Tool adoption ≠ methodology adoption** - BDD frameworks are widely used, but often as better-structured test tools rather than specification tools
00102| 2. **Specification-first is rare in practice** - Despite BDD's core premise, most developers write tests during/after coding
00103| 3. **Business involvement is limited** - Scenarios are primarily developer-written, reducing the collaboration benefit
00104| 4. **Ruby leads adoption** - The ecosystem where BDD originated has highest adoption
00105| 
00106| ### The Adoption Gap
00107| 
00108| The study reveals a significant gap between:
00109| - **Ideal BDD:** Collaborative specification → executable scenarios → implementation
00110| - **Actual BDD:** Implementation → tests written in BDD syntax
00111| 
00112| This gap suggests that many teams get some BDD benefits (readable tests, documentation) but miss the primary value proposition (collaborative specification, requirement alignment).
00113| 
00114| ### FOE Insights
00115| 
00116| **Understanding:**
00117| This research challenges assumptions about BDD adoption. While Given-When-Then syntax is widely used, the collaborative understanding-building that syntax is designed to enable often doesn't happen. Teams using BDD tools without the collaborative practices may have readable tests but not improved stakeholder alignment.
00118| 
00119| **Feedback:**
00120| The finding that specifications are written after implementation means the feedback loop BDD promises (specification → fast feedback on alignment) isn't operating. Post-hoc scenarios verify what was built, not what should have been built. This distinction is crucial for FOE practitioners.
00121| 
00122| **Confidence:**
00123| This research provides important calibration. We can be confident that:
00124| - BDD tools are production-ready and widely used
00125| - The communication benefits require methodology adoption, not just tool adoption
00126| - "We use BDD" claims need scrutiny - tool usage doesn't equal methodology adoption
00127| 
00128| ## Limitations
00129| 
00130| - **Open source focus:** May not generalize to enterprise/proprietary development
00131| - **Repository signals:** Hard to determine specification-first from commit timing alone
00132| - **Survey size:** 31 developers is limited for generalization
00133| - **Self-selection:** Developers who responded may not be representative
00134| 
00135| ## Conclusion
00136| 
00137| ### Verdict
00138| **Supported with Important Caveats** - BDD tools are viable and adopted, but the full methodology is rare. Benefits depend on actual practice, not tool choice.
00139| 
00140| ### Key Learnings
00141| 
00142| 1. **Tool adoption is high (~27%)** - BDD frameworks are mainstream
00143| 2. **Methodology adoption is much lower** - Few teams follow specification-first
00144| 3. **Collaboration is often missing** - Scenarios are primarily developer-written
00145| 4. **Benefits vary by adoption depth** - Full BDD delivers more than tool-only adoption
00146| 
00147| ### Recommendation
00148| 
00149| **Apply this when:**
00150| - You want readable, documentation-quality tests (even without full BDD)
00151| - You're willing to invest in collaborative specification practices
00152| - Business stakeholders will actually participate in scenario review
00153| 
00154| **Watch out for:**
00155| - Assuming tool adoption = methodology adoption
00156| - Expecting communication benefits without the Three Amigos process
00157| - Writing scenarios after implementation and calling it "BDD"
00158| 
00159| ### FOE Application
00160| 
00161| This research suggests a maturity model for BDD adoption:
00162| 
00163| | Level | Practice | Benefits |
00164| |-------|----------|----------|
00165| | **Level 1** | BDD syntax for tests | Readable tests, documentation |
00166| | **Level 2** | Scenarios before coding | Clearer requirements thinking |
00167| | **Level 3** | Collaborative specification | Stakeholder alignment, reduced rework |
00168| 
00169| Most teams operate at Level 1. Full BDD benefits require Level 3.
00170| 
00171| ---
00172| 
00173| ## References
00174| 
00175| - Zampetti, F., Di Sorbo, A., Visaggio, C.A., Canfora, G., & Di Penta, M. (2020). Demystifying the adoption of behavior-driven development in open source projects. *Information and Software Technology*, 123. https://www.sciencedirect.com/science/article/pii/S095058492030063X
00176| 
00177| ---
00178| 
00179| <RelatedMethods />
00180| 

(End of file - total 180 lines)
</file>
```
```

```
Tool: read

**Input:**
```json
{
  "filePath": "/Users/aaron.west/Documents/Projects/flow-optimized-engineering/docs/docs/field-guides/observations/external/tdd-defect-reduction-study.md"
}
```
**Output:**
```
<file>
00001| ---
00002| sidebar_position: 4
00003| title: "TDD Defect Reduction: Microsoft/IBM Study"
00004| status: completed
00005| source_type: external
00006| source:
00007|   authors: ["Nachiappan Nagappan", "E. Michael Maximilien", "Thirumalesh Bhat", "Laurie Williams"]
00008|   organization: "Microsoft Research / IBM"
00009|   year: 2008
00010|   url: "https://www.microsoft.com/en-us/research/publication/realizing-quality-improvement-through-test-driven-development-results-and-experiences-of-four-industrial-teams/"
00011| methods:
00012|   - external-frameworks/bdd/methods/executable-specifications
00013| ---
00014| 
00015| import RelatedMethods from '@site/src/components/RelatedMethods';
00016| 
00017| # TDD Defect Reduction: Microsoft/IBM Study
00018| 
00019| > **Source:** Nagappan et al. (2008), Microsoft/IBM Industrial Study
00020| 
00021| A landmark study of four industrial teams at Microsoft and IBM found that Test-Driven Development (TDD) reduces defect density by 40-90% compared to similar non-TDD projects, with a development time increase of 15-35%. The study provides rigorous evidence that writing tests first improves code quality.
00022| 
00023| ## Context
00024| 
00025| **Environment:**
00026| - Organizations: Microsoft (2 teams), IBM (2 teams)
00027| - Researchers: Nachiappan Nagappan, E. Michael Maximilien, Thirumalesh Bhat, Laurie Williams
00028| - Timeline: Published 2008
00029| - Sample: 4 industrial development teams working on production code
00030| 
00031| **The Problem:**
00032| TDD had gained popularity in agile communities, but claims about its benefits were largely anecdotal. The software industry needed rigorous empirical evidence from real industrial projects to evaluate whether TDD actually delivers on its promises.
00033| 
00034| **Research Questions:**
00035| 1. Does TDD reduce defect density in industrial projects?
00036| 2. What is the productivity impact of practicing TDD?
00037| 3. Do these effects hold across different organizations and project types?
00038| 
00039| ## Hypothesis
00040| 
00041| > "If development teams write tests before code (TDD), then defect density will decrease because the test-first discipline forces developers to think through requirements and edge cases before implementation."
00042| 
00043| **Variables:**
00044| - Independent: Development approach (TDD vs. non-TDD)
00045| - Dependent: Defect density (defects per KLOC), development time
00046| 
00047| ## Approach
00048| 
00049| ### Study Design
00050| 
00051| The researchers studied four development teams that adopted TDD:
00052| 
00053| | Team | Organization | Project Type | Comparison Baseline |
00054| |------|--------------|--------------|---------------------|
00055| | Team A | Microsoft | Windows networking | Similar non-TDD project |
00056| | Team B | Microsoft | MSN web services | Similar non-TDD project |
00057| | Team C | IBM | Device drivers | Historical non-TDD baseline |
00058| | Team D | IBM | Enterprise tools | Historical non-TDD baseline |
00059| 
00060| ### Methodology
00061| 
00062| - **Quasi-observational design:** Compared TDD teams to similar non-TDD projects
00063| - **Industrial setting:** Real production code, not classroom exercises
00064| - **Multiple organizations:** Cross-validated findings at Microsoft and IBM
00065| - **Controlled variables:** Matched projects by domain, complexity, and team experience where possible
00066| 
00067| ### What They Measured
00068| 
00069| 1. **Pre-release defect density:** Defects found before shipping, per thousand lines of code (KLOC)
00070| 2. **Development time:** Time to complete features compared to estimates/baselines
00071| 3. **Team perceptions:** Qualitative feedback from developers practicing TDD
00072| 
00073| ## Results
00074| 
00075| ### Quantitative Results: Defect Density Reduction
00076| 
00077| | Team | Organization | Defect Density Reduction |
00078| |------|--------------|-------------------------|
00079| | Team A | Microsoft | **60% reduction** |
00080| | Team B | Microsoft | **90% reduction** |
00081| | Team C | IBM | **40% reduction** |
00082| | Team D | IBM | ~40% reduction |
00083| 
00084| **Overall finding: 40-90% reduction in pre-release defect density**
00085| 
00086| ### Development Time Impact
00087| 
00088| | Team | Development Time Increase |
00089| |------|--------------------------|
00090| | All teams | **15-35% increase** |
00091| 
00092| The teams required more time to develop features using TDD, but this was offset by:
00093| - Fewer defects to fix later
00094| - Less debugging time
00095| - Higher confidence in code changes
00096| 
00097| ### Statistical Significance
00098| 
00099| The researchers reported that results were **statistically significant** across all four teams, meaning the differences were unlikely to be due to chance.
00100| 
00101| ### Supporting Meta-Analysis
00102| 
00103| A later meta-analysis by Rafique & Mišić (2013) examined 27 TDD studies:
00104| 
00105| | Finding | Result |
00106| |---------|--------|
00107| | External quality (defects) | **Small positive effect** favoring TDD |
00108| | Productivity | **No significant effect** in aggregate |
00109| | Variability | High between studies (context-dependent) |
00110| 
00111| ### Code Quality Metrics (Madeyski 2010)
00112| 
00113| Additional controlled observations found TDD improved:
00114| 
00115| | Metric | Effect Size |
00116| |--------|-------------|
00117| | Coupling Between Objects (CBO) | **Medium-to-large** improvement |
00118| | Branch Coverage | **Medium** improvement |
00119| | Mutation Score (fault detection) | **Substantive** improvement |
00120| 
00121| ## Analysis
00122| 
00123| ### What the Research Establishes
00124| 
00125| 1. **TDD reduces defects:** The 40-90% reduction is substantial and consistent across organizations
00126| 2. **There's a time cost:** 15-35% more development time is the trade-off
00127| 3. **The trade-off may be worth it:** If defects cost more than 15-35% of development time to fix, TDD pays for itself
00128| 4. **Effects are context-dependent:** The meta-analysis found high variability, suggesting implementation quality matters
00129| 
00130| ### Why TDD Reduces Defects
00131| 
00132| The researchers identified several mechanisms:
00133| 
00134| 1. **Forced requirements thinking:** Writing tests first requires understanding what the code should do
00135| 2. **Immediate feedback:** Failing tests surface problems during development, not later
00136| 3. **Regression protection:** Existing tests catch breaking changes
00137| 4. **Design pressure:** Hard-to-test code gets refactored into better designs
00138| 5. **Edge case coverage:** Test-first thinking surfaces edge cases before implementation
00139| 
00140| ### The Economics of TDD
00141| 
00142| **Break-even analysis:**
00143| 
00144| If TDD takes 25% more time (middle of 15-35% range), it pays for itself if defects found later cost more than 25% of development time to fix.
00145| 
00146| Industry data suggests:
00147| - Defects found in testing cost 10-25x more to fix than during development
00148| - Defects found in production cost 30-100x more
00149| - Therefore, TDD likely pays for itself in most contexts
00150| 
00151| ### FOE Insights
00152| 
00153| **Understanding:**
00154| TDD forces developers to understand requirements before writing code. The test is a specification: "what should this code do?" This explicit thinking improves understanding and surfaces ambiguities early. The tests themselves become documentation of expected behavior.
00155| 
00156| **Feedback:**
00157| TDD is fundamentally about tightening feedback loops:
00158| - **Immediate:** Failing test = instant feedback that something's wrong
00159| - **Continuous:** Test suite runs on every change
00160| - **Specific:** Failing test points to exactly what broke
00161| - **Automated:** No waiting for manual QA or user reports
00162| 
00163| The 40-90% defect reduction comes from catching problems during development rather than later phases.
00164| 
00165| **Confidence:**
00166| A comprehensive test suite enables confident code changes:
00167| - **Refactoring safety:** Change code knowing tests will catch regressions
00168| - **Deployment confidence:** Green tests = higher confidence in releases
00169| - **Knowledge preservation:** Tests capture expected behavior even when original developers leave
00170| 
00171| ## Limitations
00172| 
00173| - **Quasi-observational:** Not randomized controlled trials; confounding variables possible
00174| - **Selection bias:** Teams that adopt TDD may be more disciplined generally
00175| - **Hawthorne effect:** Being studied may have improved performance
00176| - **Time period:** Study from 2008; development practices have evolved
00177| - **Large projects:** All teams worked on substantial projects; may not apply to small/simple code
00178| - **Organizational context:** Microsoft and IBM have resources smaller companies may lack
00179| 
00180| ### Replication Concerns
00181| 
00182| The meta-analysis found:
00183| - **High variability** between studies
00184| - **Publication bias** possible (positive results more likely published)
00185| - **Context dependence** significant (TDD works better in some situations)
00186| 
00187| ## Conclusion
00188| 
00189| ### Verdict
00190| **Supported with Caveats** - The evidence for TDD reducing defects is strong (40-90% in this study, small positive effect in meta-analysis). However, the productivity trade-off (15-35% more time) and context dependence mean TDD isn't universally beneficial.
00191| 
00192| ### Key Learnings
00193| 
00194| 1. **TDD significantly reduces defects:** 40-90% reduction is substantial and valuable
00195| 2. **There's a real time cost:** 15-35% more development time isn't free
00196| 3. **The trade-off is usually favorable:** Given the cost of finding defects later, TDD typically pays for itself
00197| 4. **Implementation quality matters:** Poor TDD practice may not deliver benefits
00198| 5. **Not all contexts are equal:** Simple code or throwaway prototypes may not justify TDD investment
00199| 
00200| ### Recommendation
00201| 
00202| **Apply TDD when:**
00203| - Code will be maintained long-term
00204| - Defects have high cost (production systems, financial, safety-critical)
00205| - Requirements are reasonably stable (tests become outdated if requirements churn)
00206| - Team has training and support to practice TDD well
00207| 
00208| **Consider skipping TDD when:**
00209| - Building throwaway prototypes or spikes
00210| - Exploring uncertain requirements (tests will change constantly)
00211| - Simple scripts with low defect cost
00212| - Team lacks training (poor TDD may be worse than no TDD)
00213| 
00214| ### FOE Application
00215| 
00216| TDD embodies the FOE principle of optimizing for fast feedback:
00217| 
00218| | TDD Practice | FOE Alignment |
00219| |--------------|---------------|
00220| | Test first | Forces understanding before implementation |
00221| | Failing test → implementation | Immediate feedback loop |
00222| | Continuous test runs | Fast feedback on every change |
00223| | Refactoring under test | Confidence to improve code |
00224| 
00225| The 40-90% defect reduction is the quantified payoff of tighter feedback loops.
00226| 
00227| ---
00228| 
00229| ## References
00230| 
00231| - Nagappan, N., Maximilien, E. M., Bhat, T., & Williams, L. (2008). Realizing Quality Improvement Through Test Driven Development: Results and Experiences of Four Industrial Teams. *Empirical Software Engineering*, 13(3), 289-302.
00232| - Rafique, Y., & Mišić, V. B. (2013). The Effects of Test-Driven Development on External Quality and Productivity: A Meta-Analysis. *IEEE Transactions on Software Engineering*, 39(6), 835-856.
00233| - Madeyski, L. (2010). *Test-Driven Development: An Empirical Evaluation of Agile Practice*. Springer.
00234| - Bhat, T., & Nagappan, N. (2006). Evaluating the Efficacy of Test-Driven Development: Industrial Case Studies. *ACM/IEEE International Symposium on Empirical Software Engineering*.
00235| 
00236| ---
00237| 
00238| <RelatedMethods />
00239| 

(End of file - total 239 lines)
</file>
```
```

```
Tool: read

**Input:**
```json
{
  "filePath": "/Users/aaron.west/Documents/Projects/flow-optimized-engineering/docs/docs/field-guides/observations/external/bdd-maintenance-challenges-2018.md"
}
```
**Output:**
```
<file>
00001| ---
00002| sidebar_position: 8
00003| title: "BDD Specification Maintenance Challenges"
00004| status: completed
00005| source_type: external
00006| source:
00007|   authors: ["Lauren Patrick Binamungu", "Suzanne M. Embury", "Nikolaos Konstantinou"]
00008|   organization: "IEEE SANER Conference"
00009|   year: 2018
00010|   url: "https://ieeexplore.ieee.org/abstract/document/8330207/"
00011| methods:
00012|   - external-frameworks/bdd/methods/executable-specifications
00013|   - external-frameworks/bdd/methods/given-when-then
00014| ---
00015| 
00016| import RelatedMethods from '@site/src/components/RelatedMethods';
00017| 
00018| # BDD Specification Maintenance Challenges
00019| 
00020| > **Source:** Binamungu et al. (2018), IEEE SANER Conference
00021| 
00022| Research identifying significant challenges in maintaining BDD specifications over time. Challenges the "living documentation" claim by showing that keeping specifications synchronized with evolving code requires substantial ongoing effort.
00023| 
00024| ## Context
00025| 
00026| **Environment:**
00027| - Organization: IEEE SANER Conference (peer-reviewed)
00028| - Researchers: Binamungu, Embury, Konstantinou
00029| - Timeline: Published 2018
00030| - Sample: Analysis of BDD specification maintenance patterns
00031| 
00032| **The Problem:**
00033| BDD advocates claim that executable specifications serve as "living documentation" that stays in sync with system behavior. But what happens to these specifications as systems evolve? Do they actually stay current, or do they become another form of technical debt?
00034| 
00035| **Research Questions:**
00036| 1. What challenges do teams face maintaining BDD specifications?
00037| 2. Do specifications actually stay synchronized with code over time?
00038| 3. What factors make specification maintenance easier or harder?
00039| 4. What opportunities exist for improving BDD maintenance?
00040| 
00041| ## Hypothesis
00042| 
00043| > "The researchers hypothesized that BDD specifications face significant maintenance challenges as systems evolve, and that these challenges may undermine the 'living documentation' benefit."
00044| 
00045| **Variables:**
00046| - Independent: System evolution, specification complexity, team practices
00047| - Dependent: Specification-code synchronization, maintenance effort, specification accuracy
00048| 
00049| ## Approach
00050| 
00051| ### Methodology
00052| 
00053| - **Design:** Empirical analysis of BDD specification maintenance
00054| - **Analysis:** Identification and categorization of maintenance challenges
00055| - **Validation:** Cross-referencing findings with practitioner experience
00056| 
00057| ### Data Collection
00058| 
00059| - Analyzed BDD specifications across multiple projects
00060| - Examined specification evolution over time
00061| - Identified patterns of drift between specs and implementation
00062| - Catalogued specific maintenance challenges
00063| 
00064| ## Results
00065| 
00066| ### Key Maintenance Challenges Identified
00067| 
00068| | Challenge | Severity | Description |
00069| |-----------|----------|-------------|
00070| | **Specification drift** | High | Specs become out of sync with actual behavior |
00071| | **Brittle scenarios** | High | Small code changes break many scenarios |
00072| | **Duplication** | Moderate | Similar scenarios repeated across features |
00073| | **Step definition complexity** | Moderate | Glue code becomes hard to maintain |
00074| | **Obsolete scenarios** | Moderate | Old scenarios no longer relevant but not removed |
00075| 
00076| ### Specification Drift Patterns
00077| 
00078| | Pattern | Frequency | Impact |
00079| |---------|-----------|--------|
00080| | **Behavior changed, spec not updated** | Common | False confidence - tests pass but don't verify current behavior |
00081| | **Spec updated incorrectly** | Moderate | Tests may pass but spec doesn't match intent |
00082| | **New behavior not specified** | Common | Coverage gaps in living documentation |
00083| 
00084| ### Root Causes of Maintenance Difficulty
00085| 
00086| 1. **Scenarios too coupled to implementation** - Changes ripple through many scenarios
00087| 2. **Insufficient abstraction in step definitions** - Concrete details make changes expensive
00088| 3. **No clear ownership** - Unclear who's responsible for spec maintenance
00089| 4. **Time pressure** - Maintenance deferred when deadlines loom
00090| 5. **Lack of tooling** - Limited support for detecting drift
00091| 
00092| ### Key Finding
00093| 
00094| **Without active effort, BDD specifications drift from reality just like traditional documentation.** The "living" nature depends on continuous maintenance, not inherent properties of the format.
00095| 
00096| ## Analysis
00097| 
00098| ### What the Research Establishes
00099| 
00100| 1. **"Living documentation" isn't automatic** - Specifications require active maintenance to stay current
00101| 2. **Maintenance burden is significant** - This isn't a minor concern; it's a primary challenge
00102| 3. **Drift happens silently** - Tests may pass while specifications become inaccurate
00103| 4. **Good practices reduce burden** - Abstract step definitions, clear ownership help
00104| 
00105| ### The Living Documentation Paradox
00106| 
00107| BDD's value proposition includes "living documentation" - specs that can't become outdated because they're verified continuously. This research reveals the paradox:
00108| 
00109| - **Specs ARE verified** against the current implementation
00110| - **But the implementation may have drifted** from the intended behavior
00111| - **So specs verify what IS, not what SHOULD BE**
00112| 
00113| When behavior changes without spec updates, the spec becomes documentation of the new (possibly unintended) behavior, not a specification of correct behavior.
00114| 
00115| ### FOE Insights
00116| 
00117| **Understanding:**
00118| This research deepens understanding of what "living documentation" actually means. Living documentation requires:
00119| 1. Specifications written as behavioral intent (not implementation tests)
00120| 2. Active maintenance when intent changes
00121| 3. Review to catch drift between intent and implementation
00122| 
00123| Without these, specs become "living tests" rather than "living documentation" - they verify current behavior but don't communicate intended behavior.
00124| 
00125| **Feedback:**
00126| The drift problem is fundamentally a feedback gap. When code changes without spec updates, there's no feedback signal that the specification is now inaccurate. This suggests a need for:
00127| - Code review practices that include spec review
00128| - Tooling to detect specification-implementation divergence
00129| - Ownership models that make spec maintenance explicit
00130| 
00131| **Confidence:**
00132| This research appropriately reduces overconfidence in BDD's "living documentation" claim. Teams should expect maintenance effort and plan for it, rather than assuming specifications will stay current automatically.
00133| 
00134| ## Limitations
00135| 
00136| - **Focus on challenges:** Study specifically investigated difficulties, not successes
00137| - **Point-in-time analysis:** May not capture teams that improved maintenance over time
00138| - **Specific contexts:** Findings may vary across industries and team sizes
00139| - **Tool landscape:** BDD tooling has evolved since 2018
00140| 
00141| ## Conclusion
00142| 
00143| ### Verdict
00144| **Challenges Identified** - The "living documentation" benefit is achievable but requires deliberate effort. Teams should plan for specification maintenance from the start.
00145| 
00146| ### Key Learnings
00147| 
00148| 1. **Living documentation isn't free** - Plan for ongoing maintenance effort
00149| 2. **Drift happens silently** - Passing tests don't guarantee accurate specs
00150| 3. **Abstraction helps** - Well-structured step definitions reduce maintenance
00151| 4. **Ownership matters** - Clear responsibility for spec maintenance is essential
00152| 5. **Review is critical** - Code changes should trigger spec review
00153| 
00154| ### Recommendation
00155| 
00156| **Apply this when:**
00157| - Adopting BDD - budget for maintenance from the start
00158| - Evaluating BDD ROI - include maintenance costs in calculation
00159| - Designing BDD practices - build in mechanisms to prevent drift
00160| 
00161| **Watch out for:**
00162| - Assuming specs stay current automatically
00163| - Deferring spec maintenance under time pressure
00164| - Coupling scenarios tightly to implementation details
00165| - Lack of clear spec ownership
00166| 
00167| ### FOE Application
00168| 
00169| This research informs how we should frame BDD methods:
00170| 
00171| | Claim | Revised Understanding |
00172| |-------|----------------------|
00173| | "Living documentation" | Requires active maintenance; not automatic |
00174| | "Specs can't become outdated" | They can drift; continuous verification verifies current behavior, not intended behavior |
00175| | "Tests are the documentation" | Tests verify; specs document. They're related but not identical |
00176| 
00177| ### Maintenance Best Practices (from research)
00178| 
00179| 1. **Write declarative scenarios** - Focus on behavior, not implementation
00180| 2. **Abstract step definitions** - Centralize implementation details
00181| 3. **Assign ownership** - Make spec maintenance someone's explicit responsibility
00182| 4. **Include in Definition of Done** - Spec updates required for feature completion
00183| 5. **Review specs in PRs** - Code changes should trigger spec review
00184| 
00185| ---
00186| 
00187| ## References
00188| 
00189| - Binamungu, L.P., Embury, S.M., & Konstantinou, N. (2018). Maintaining behaviour driven development specifications: Challenges and opportunities. *IEEE 25th International Conference on Software Analysis, Evolution and Reengineering (SANER)*. https://ieeexplore.ieee.org/abstract/document/8330207/
00190| 
00191| ---
00192| 
00193| <RelatedMethods />
00194| 

(End of file - total 194 lines)
</file>
```
```

```
Tool: read

**Input:**
```json
{
  "filePath": "/Users/aaron.west/Documents/Projects/flow-optimized-engineering/docs/docs/field-guides/observations/external/bdd-systematic-review-2023.md"
}
```
**Output:**
```
<file>
00001| ---
00002| sidebar_position: 5
00003| title: "BDD Systematic Literature Review"
00004| status: completed
00005| source_type: external
00006| source:
00007|   authors: ["Muhammad Shoaib Farooq", "Uzma Omer", "Adnan Rasheed", "Muhammad Aslam Rasheed"]
00008|   organization: "IEEE Access"
00009|   year: 2023
00010|   url: "https://ieeexplore.ieee.org/abstract/document/10210040/"
00011| methods:
00012|   - external-frameworks/bdd/methods/given-when-then
00013|   - external-frameworks/bdd/methods/executable-specifications
00014|   - external-frameworks/bdd/methods/three-amigos
00015| ---
00016| 
00017| import RelatedMethods from '@site/src/components/RelatedMethods';
00018| 
00019| # BDD Systematic Literature Review
00020| 
00021| > **Source:** Farooq et al. (2023), IEEE Access
00022| 
00023| A comprehensive systematic literature review examining Behavior-Driven Development research, synthesizing findings from multiple studies to establish that BDD improves stakeholder communication and helps align delivered software with requirements.
00024| 
00025| ## Context
00026| 
00027| **Environment:**
00028| - Organization: IEEE Access (peer-reviewed journal)
00029| - Researchers: Farooq, Omer, Rasheed, Rasheed et al.
00030| - Timeline: Published 2023
00031| - Sample: Systematic review of BDD literature (multiple primary studies)
00032| 
00033| **The Problem:**
00034| BDD has gained significant adoption since Dan North introduced it in 2006, but claims about its effectiveness remained scattered across individual studies. The research community needed a systematic synthesis of all BDD research to establish what the evidence collectively shows.
00035| 
00036| **Research Questions:**
00037| 1. What are the reported benefits of BDD adoption?
00038| 2. What challenges do teams face when implementing BDD?
00039| 3. How does BDD affect communication between stakeholders?
00040| 4. What is the overall evidence for BDD effectiveness?
00041| 
00042| ## Hypothesis
00043| 
00044| > "The researchers hypothesized that synthesizing BDD research would reveal consistent patterns of improved communication and software-requirements alignment across studies."
00045| 
00046| **Variables:**
00047| - Independent: BDD adoption (various implementations across studies)
00048| - Dependent: Communication effectiveness, requirements alignment, software quality
00049| 
00050| ## Approach
00051| 
00052| ### Methodology
00053| 
00054| - **Design:** Systematic Literature Review (SLR) following established guidelines
00055| - **Analysis:** Qualitative synthesis of findings across primary studies
00056| - **Validation:** Rigorous inclusion/exclusion criteria, multiple researcher validation
00057| 
00058| ### Data Collection
00059| 
00060| - Searched major academic databases (IEEE, ACM, Springer, etc.)
00061| - Applied inclusion criteria for empirical BDD studies
00062| - Extracted and coded findings from qualifying studies
00063| - Synthesized patterns across the literature
00064| 
00065| ## Results
00066| 
00067| ### Key Findings
00068| 
00069| | Finding | Evidence Strength |
00070| |---------|-------------------|
00071| | BDD improves stakeholder communication | Strong (multiple studies) |
00072| | BDD helps align software with requirements | Strong (multiple studies) |
00073| | Given-When-Then format aids understanding | Moderate (consistent reports) |
00074| | BDD requires investment to implement well | Strong (acknowledged across studies) |
00075| 
00076| ### Major Conclusions
00077| 
00078| 1. **Communication improvement is the most consistent benefit** - Studies repeatedly found that BDD's structured approach bridges the gap between business and technical stakeholders
00079| 2. **Requirements alignment improves** - Teams using BDD deliver software that better matches stakeholder expectations
00080| 3. **The methodology requires discipline** - Benefits accrue to teams that follow the full BDD process, not just use the tools
00081| 4. **Challenges exist but are manageable** - Maintenance burden and learning curve are real but addressable
00082| 
00083| ### Citation Impact
00084| 
00085| The review has been cited by 38 subsequent papers, indicating its value as a reference point for BDD research.
00086| 
00087| ## Analysis
00088| 
00089| ### What the Research Establishes
00090| 
00091| 1. **BDD's communication benefits are well-documented** - This isn't just anecdotal; multiple empirical studies confirm the effect
00092| 2. **The Given-When-Then format specifically aids understanding** - The structured template is a key mechanism for the communication improvement
00093| 3. **BDD is not a silver bullet** - Success requires investment in training, discipline, and maintenance
00094| 4. **Evidence base is maturing** - Enough research exists to draw meaningful conclusions about BDD effectiveness
00095| 
00096| ### FOE Insights
00097| 
00098| **Understanding:**
00099| The SLR establishes that BDD's core contribution is improved understanding across stakeholder boundaries. The Given-When-Then format creates a shared language that business and technical team members can both read and verify. This aligns directly with FOE's principle of optimizing for understanding - the specification becomes a communication artifact, not just a testing artifact.
00100| 
00101| **Feedback:**
00102| BDD accelerates feedback by making misunderstandings visible earlier. When stakeholders review scenarios before development begins, gaps and misalignments surface during specification rather than during testing or production. The research validates that this "shift left" of feedback genuinely occurs in BDD-practicing teams.
00103| 
00104| **Confidence:**
00105| The systematic nature of this review provides confidence in BDD's benefits. Rather than relying on individual studies or anecdotal reports, we can point to synthesized evidence across multiple research contexts. This strengthens the case for adopting BDD methods in Field Guides.
00106| 
00107| ## Limitations
00108| 
00109| - **Methodology:** SLR synthesizes existing research rather than generating new empirical data
00110| - **Publication bias:** Positive results may be overrepresented in published literature
00111| - **Context variation:** Primary studies span different industries, team sizes, and implementations
00112| - **Quality variation:** Not all primary studies have equally rigorous methodology
00113| 
00114| ## Conclusion
00115| 
00116| ### Verdict
00117| **Strongly Supported** - The systematic review provides compelling evidence that BDD improves stakeholder communication and requirements alignment. The consistency of findings across multiple studies strengthens confidence in these benefits.
00118| 
00119| ### Key Learnings
00120| 
00121| 1. **BDD's communication benefits are empirically validated** across multiple studies and contexts
00122| 2. **Given-When-Then is a key mechanism** - the structured format specifically enables shared understanding
00123| 3. **Full methodology adoption matters** - using BDD tools without the collaborative practices yields limited benefits
00124| 4. **Investment is required** - teams need training and ongoing discipline to realize BDD's potential
00125| 
00126| ### Recommendation
00127| 
00128| **Apply this when:**
00129| - Stakeholder communication is a known challenge
00130| - Requirements misalignment has caused rework
00131| - Teams want to improve shared understanding of expected behavior
00132| 
00133| **Watch out for:**
00134| - Tool-only adoption without collaborative practices
00135| - Skipping the Discovery/Three Amigos phases
00136| - Treating scenarios as "just tests" rather than specifications
00137| 
00138| ### FOE Application
00139| 
00140| | BDD Practice | FOE Principle | SLR Evidence |
00141| |--------------|---------------|--------------|
00142| | Given-When-Then | Understanding | Improves cross-stakeholder communication |
00143| | Three Amigos | Understanding | Multiple perspectives improve specification quality |
00144| | Executable Specifications | Feedback | Catches misalignments earlier in development |
00145| | Living Documentation | Confidence | Specs stay synchronized with system behavior |
00146| 
00147| ---
00148| 
00149| ## References
00150| 
00151| - Farooq, M.S., Omer, U., Rasheed, A., Rasheed, M.A. et al. (2023). Behavior Driven Development: A Systematic Literature Review. *IEEE Access*. https://ieeexplore.ieee.org/abstract/document/10210040/
00152| - North, D. (2006). Introducing BDD. *Better Software Magazine*.
00153| 
00154| ---
00155| 
00156| <RelatedMethods />
00157| 

(End of file - total 157 lines)
</file>
```
```

```
Tool: read

**Input:**
```json
{
  "filePath": "/Users/aaron.west/Documents/Projects/flow-optimized-engineering/docs/docs/field-guides/observations/internal/prima-oss-fork-strategy.md"
}
```
**Output:**
```
<file>
00001| ---
00002| sidebar_position: 1
00003| title: "Prima: Enterprise AI Platform via OSS Fork Strategy"
00004| status: completed
00005| source_type: internal
00006| methods:
00007|   - agentic-coding/methods/emerging/understanding-first-protocol-adoption
00008|   - agentic-coding/methods/emerging/early-feedback-loop-investment
00009|   - agentic-coding/methods/emerging/knowledge-distribution-as-reliability
00010| ---
00011| 
00012| import RelatedMethods from '@site/src/components/RelatedMethods';
00013| 
00014| # Prima: Enterprise AI Platform via OSS Fork Strategy
00015| 
00016| > **Status:** Completed
00017| 
00018| A case study of eSimplicity's IRAD project building an enterprise AI platform by forking established OSS tools (OpenAI Codex CLI, AnythingLLM). The project shipped but demonstrated how velocity pressure without understanding investment creates compounding technical and knowledge debt.
00019| 
00020| ## Context
00021| 
00022| **Environment:**
00023| - Project: Prima - Enterprise-grade agentic AI platform for government/enterprise security requirements
00024| - Organization: eSimplicity Inc
00025| - Team: 8+ contributors including Thomas Mason, Aaron West, Kevin Song, David Greene, Tom Martz, Vraj Patel, Lada Semicheva
00026| - Timeline: June 2025 - January 2026
00027| 
00028| **The Problem:**
00029| eSimplicity needed to create a secure, enterprise-grade AI platform that could meet government security requirements while maintaining good developer experience. Rather than building from scratch, the team chose to fork established OSS projects:
00030| 
00031| - **OpenAI Codex CLI** → prima-code (terminal coding agent)
00032| - **AnythingLLM** → prima-web (document management & chat UI)
00033| - Custom components: Prima Engine (AiOx), Control Tower (auth/SSO), Helm charts
00034| 
00035| **Constraints:**
00036| - Aggressive delivery timeline
00037| - Government/enterprise security requirements
00038| - Large, complex OSS codebases to understand
00039| - Emerging protocol (MCP) with limited documentation
00040| - Team needed to deliver while learning
00041| 
00042| ## Hypothesis
00043| 
00044| This is a retrospective case study, not a designed observation. However, the implicit hypothesis was:
00045| 
00046| > "If we fork established OSS AI tools and adapt them for enterprise requirements, then we can deliver a secure AI platform faster than building from scratch, because the core functionality already exists and we only need to add security layers."
00047| 
00048| **Variables:**
00049| - Independent (approach chosen): Fork OSS vs. build from scratch
00050| - Dependent (what happened): Delivery timeline, system stability, team understanding, support burden
00051| 
00052| ## Approach
00053| 
00054| ### Strategy
00055| 1. Fork OpenAI Codex CLI for terminal-based coding agent (prima-code)
00056| 2. Fork AnythingLLM for document management and chat UI (prima-web)
00057| 3. Build custom integration layer using MCP (Model Context Protocol)
00058| 4. Add enterprise security features (SSO, auth via Control Tower)
00059| 5. Package for deployment via Helm charts
00060| 
00061| ### Execution
00062| - Development proceeded under velocity pressure
00063| - No significant investment in testing or deployment infrastructure
00064| - MCP protocol used for integration without deep understanding of the protocol
00065| - Knowledge concentrated in few team members who could navigate the large codebases
00066| 
00067| ### Measurement
00068| This is observational data from:
00069| - Git commit history and issue tracker
00070| - Team retrospective feedback
00071| - Production incident patterns
00072| - First user onboarding experience
00073| 
00074| ## Results
00075| 
00076| ### Timeline Outcomes
00077| 
00078| | Milestone | Target | Actual | Notes |
00079| |-----------|--------|--------|-------|
00080| | Platform deployed | On schedule | Late | Delivered but behind timeline |
00081| | First users onboarded | January 2026 | January 12, 2026 | Achieved with significant support burden |
00082| | System stability | Production-ready | Flakey | Requires ongoing heroics |
00083| 
00084| ### Quantitative Evidence
00085| 
00086| **January 12, 2026 - First Production Day:**
00087| 7 production bugs filed in a single day:
00088| - #185: Embedding Word Docs isn't working (500 error)
00089| - #186: After embedding a document chat comes back with empty responses
00090| - #187: Just chatting is getting a 404
00091| - #188: Threads are not sticking after refreshing the page
00092| - #189: DEV - Prima Web Error
00093| - #190: LOCAL - Empty Responses on Regular Chats
00094| - #184: Switching model during agent mode does not work
00095| 
00096| **December 20-31, 2025 - Production Debugging Crunch:**
00097| Commit messages revealing firefighting pattern:
00098| - "prod debugging logs"
00099| - "more debug"
00100| - "temporarily disabled tool toggle feature"
00101| - "ensuring tool function name length meets openai compatible length" (discovered in production)
00102| - "forcing env var LLM_PROVIDER to always be 'prima'"
00103| - "removing corrupted migration file"
00104| 
00105| ### Security Incident
00106| 
00107| **December 23, 2025 - Issue #156:**
00108| "Hotfix: Stop token/workspace inheritance in MCP hypervisor to prevent header leakage"
00109| 
00110| This security issue--headers leaking between workspaces--directly resulted from not understanding the MCP protocol's workspace isolation model.
00111| 
00112| ### Technical Debt Recognition
00113| 
00114| **December 29, 2025 - Retrospective Issues Created:**
00115| - #166: Improve Tests
00116| - #167: Remove Unused Dependencies
00117| - #168: JavaScript to TypeScript (Epic)
00118| - #169: Organize Env Variables
00119| 
00120| The timing suggests these were identified during a retrospective, acknowledging debt accumulated during the push to ship.
00121| 
00122| ### Team Self-Assessment
00123| 
00124| Direct quotes from team reflection:
00125| 
00126| 1. **On MCP understanding:** "The team didn't understand MCP well enough to make good architectural decisions. They couldn't distinguish between using MCP as a standard for integrating systems, using it to integrate different systems, or building their own bespoke integration."
00127| 
00128| 2. **On feedback loops:** "Velocity pressure meant no investment in testing/deployment infrastructure. 'Works on my machine' became the norm. The OSS was so large that adding BDD tests felt monumental."
00129| 
00130| 3. **On confidence:** "The main limitation was understanding and lack of confidence, not technical capability."
00131| 
00132| 4. **On support:** "Team struggled to support first clients because they didn't understand the system well."
00133| 
00134| ## Analysis
00135| 
00136| ### What Worked
00137| - Platform was built and deployed
00138| - Enterprise security features were implemented
00139| - First users were successfully onboarded
00140| - The fork strategy did provide a foundation faster than building from scratch
00141| 
00142| ### What Didn't Work
00143| - Delivered late despite using existing OSS
00144| - System remained flakey and unstable post-launch
00145| - Support required heroics from the few who understood
00146| - Knowledge remained concentrated rather than distributed
00147| - Security issues emerged from protocol misunderstanding
00148| 
00149| ### What Surprised Us
00150| - The size of the OSS codebases made adding tests feel "monumental"--the very thing that should have helped became psychologically daunting
00151| - Understanding debt compounded: not understanding MCP led to architectural decisions that led to security issues that led to hotfixes that led to more complexity
00152| - "Works on my machine" wasn't just a deployment problem--it was a symptom of no shared understanding
00153| 
00154| ### FOE Insights
00155| 
00156| **Understanding:**
00157| The team explicitly identified understanding as their core limitation. They forked large codebases without investing time to understand them. They adopted MCP without understanding the protocol's model. This created a situation where only a few people could navigate the system, and even they lacked confidence.
00158| 
00159| The header leakage security issue (#156) is a concrete example: it wasn't a coding error, it was a *conceptual* error about how MCP workspaces should be isolated.
00160| 
00161| **Feedback:**
00162| The absence of testing and deployment infrastructure meant feedback came from production, not development. Problems that could have been caught in CI were discovered by users. The December debugging crunch and January 12 bug flood demonstrate this pattern.
00163| 
00164| The team recognized this in retrospect (Issue #166: Improve Tests), but by then the codebase was large and intimidating.
00165| 
00166| **Confidence:**
00167| Low understanding → low confidence → heroics. The team stated this directly: "The main limitation was understanding and lack of confidence, not technical capability."
00168| 
00169| When only a few people understand the system, those people become bottlenecks. When they're not confident, they can't effectively delegate or document. The system becomes fragile not because of technical limitations but because of knowledge concentration.
00170| 
00171| ### FOE Principles Violated
00172| 
00173| | Principle | Violation | Evidence |
00174| |-----------|-----------|----------|
00175| | Optimize for Understanding | Forked without understanding MCP protocol | Header leakage hotfix, protocol confusion |
00176| | Optimize for Fast Feedback | No testing/deployment infrastructure | 7 PROD bugs day one, "works on my machine" |
00177| | Optimize for Confidence | Low understanding → low confidence → heroics | Few people could support the system |
00178| 
00179| ## Limitations
00180| 
00181| This case study has significant methodological limitations:
00182| 
00183| - **Observational, not observational:** This is retrospective analysis of a development project, not a designed observation. Causal claims are tentative.
00184| 
00185| - **No control group:** We cannot know what would have happened with different choices (e.g., building from scratch, investing in understanding upfront). The counterfactual is speculative.
00186| 
00187| - **Confounding variables:** Time pressure, OSS selection, MCP protocol immaturity, team composition, and scope all varied simultaneously. We cannot isolate which factors caused which outcomes.
00188| 
00189| - **Survivorship bias:** This is a team that shipped. Teams that failed completely might have different lessons. We're analyzing a qualified success, not a failure.
00190| 
00191| - **Self-reported data:** Team assessments of their own understanding and confidence are subjective. The commit history and issue tracker provide some objective evidence, but interpretation is still subjective.
00192| 
00193| ## Conclusion
00194| 
00195| ### Verdict
00196| **Partially Supported** - The fork strategy did enable faster initial progress than building from scratch, but the expected time savings were consumed by understanding debt, debugging, and support burden.
00197| 
00198| ### Key Learnings
00199| 
00200| 1. **Protocol understanding before integration:** Understanding MCP upfront would have prevented architectural confusion and the header leakage security issue. The time "saved" by not learning was spent on hotfixes.
00201| 
00202| 2. **"Works on my machine" is understanding debt:** The lack of deployment validation wasn't just a process gap--it indicated that no one understood the full system well enough to specify what "working" meant.
00203| 
00204| 3. **Large OSS forks require understanding investment:** The size of the OSS codebase made adding tests feel monumental, but the alternative (no tests) was worse. The psychological barrier to testing was a symptom of not understanding the code.
00205| 
00206| 4. **Knowledge distribution is a reliability concern:** Concentrating understanding in few team members creates fragility. When those people are unavailable or uncertain, the system becomes unsupportable.
00207| 
00208| ### Recommendation
00209| 
00210| **For teams considering OSS fork strategies:**
00211| 
00212| - Invest in understanding the forked codebase *before* making architectural decisions
00213| - If using emerging protocols (like MCP), allocate explicit time to understand the protocol's model, not just its API
00214| - Establish feedback loops (tests, deployment validation) early, even if the codebase is large--the psychological barrier grows over time
00215| - Actively distribute knowledge; if only 2-3 people understand the system, that's a risk to address, not a fact to accept
00216| 
00217| **When this approach might work better:**
00218| - Smaller, well-documented OSS projects
00219| - Mature, well-understood protocols
00220| - Teams with existing expertise in the technology stack
00221| - Projects with realistic timelines that include understanding investment
00222| 
00223| ### Future Observations
00224| 
00225| To strengthen this evidence, future observations could:
00226| 
00227| 1. Compare two teams: one that invests in understanding before forking, one that doesn't
00228| 2. Measure the relationship between early testing investment and production bug rates in fork projects
00229| 3. Track knowledge distribution metrics and correlate with support burden
00230| 4. Study MCP adoption specifically to understand common misunderstanding patterns
00231| 
00232| ---
00233| 
00234| <RelatedMethods />
00235| 

(End of file - total 235 lines)
</file>
```
```

---

## Assistant (Curator · claude-opus-4-5 · 11.3s)

_Thinking:_

I've now read all 24 observation files. Now I need to read the method files to continue validation. Let me read the methods from both the field guides and external frameworks.

Now reading the method files...

```
Tool: read

**Input:**
```json
{
  "filePath": "/Users/aaron.west/Documents/Projects/flow-optimized-engineering/docs/docs/field-guides/agentic-coding/methods/emerging/root-cause-first-debugging.md"
}
```
**Output:**
```
<file>
00001| ---
00002| sidebar_position: 7
00003| title: "Root-Cause-First Debugging"
00004| maturity: hypothesized
00005| observations: []
00006| ---
00007| 
00008| import MaturityBadge from '@site/src/components/MaturityBadge';
00009| import RelatedObservations from '@site/src/components/RelatedObservations';
00010| 
00011| # Root-Cause-First Debugging
00012| 
00013| <MaturityBadge maturity="hypothesized" />
00014| 
00015| Never apply fixes without first investigating the root cause. Understand the problem before solving it—especially when working with AI assistants that are eager to generate solutions.
00016| 
00017| :::caution Early Stage
00018| This method is derived from external evidence (skills.sh obra/superpowers, debugging literature). Internal FOE observations are needed to validate it in our context.
00019| :::
00020| 
00021| ## Overview
00022| 
00023| AI coding assistants are biased toward action. Given a bug report, they immediately suggest fixes. This creates a dangerous pattern: applying fixes without understanding the problem leads to:
00024| - Fixes that mask symptoms without addressing causes
00025| - New bugs introduced by misguided changes
00026| - Thrashing through multiple failed fix attempts
00027| - Lost time that exceeds the time proper investigation would have taken
00028| 
00029| The **Root-Cause-First Debugging** method enforces a simple discipline: investigate before fixing. The iron law from obra/superpowers: *"NO FIXES WITHOUT ROOT CAUSE INVESTIGATION FIRST."*
00030| 
00031| This isn't about being slow—it's about being effective. A 10-minute investigation that identifies the root cause beats an hour of trial-and-error fixes.
00032| 
00033| ## When to Use
00034| 
00035| Use this method when:
00036| 
00037| - Debugging any non-trivial bug
00038| - The AI immediately suggests a fix without investigation
00039| - You've already tried one fix and it didn't work
00040| - The bug seems mysterious or inconsistent
00041| 
00042| ## When NOT to Use
00043| 
00044| Avoid this method when:
00045| 
00046| - The cause is already obvious (typo, missing import)
00047| - You're intentionally doing quick trial-and-error on trivial issues
00048| - Time pressure genuinely requires a quick patch (but track the debt)
00049| 
00050| ## How It Works
00051| 
00052| ### Prerequisites
00053| 
00054| Before starting:
00055| - A reproducible bug or clear symptom description
00056| - Access to logs, debugger, or other investigation tools
00057| - Willingness to resist the urge to immediately fix
00058| 
00059| ### Phase 1: Root Cause Investigation
00060| 
00061| **Do not suggest fixes yet.** Instead:
00062| 
00063| 1. **Reproduce the bug** - Confirm you can trigger it consistently
00064| 2. **Gather evidence** - Collect logs, error messages, stack traces
00065| 3. **Form hypotheses** - List possible causes (don't pick one yet)
00066| 4. **Test hypotheses** - Use logging, debugging, or inspection to narrow down
00067| 
00068| Prompt the AI explicitly:
00069| 
00070| ```
00071| "Don't suggest a fix yet. Help me investigate why this is happening.
00072| Let's gather evidence first."
00073| ```
00074| 
00075| ### Phase 2: Pattern Analysis
00076| 
00077| Look for patterns that reveal the cause:
00078| 
00079| - **When does it happen?** - Always, sometimes, under specific conditions?
00080| - **When did it start?** - After which change or deployment?
00081| - **What's different?** - Between working and failing cases?
00082| - **What's the actual vs expected behavior?** - Be precise
00083| 
00084| ```
00085| "Let's analyze the pattern. When does this bug occur vs not occur?
00086| What changed recently that might be related?"
00087| ```
00088| 
00089| ### Phase 3: Hypothesis Testing
00090| 
00091| With evidence gathered, test your hypotheses:
00092| 
00093| 1. **State the hypothesis clearly** - "I think X is causing this because Y"
00094| 2. **Design a test** - How would we prove or disprove this?
00095| 3. **Run the test** - Add logging, use debugger, inspect state
00096| 4. **Evaluate results** - Does evidence support or refute the hypothesis?
00097| 
00098| ```
00099| "My hypothesis is that the cache is returning stale data. 
00100| Let's add logging to verify what the cache returns vs what we expect."
00101| ```
00102| 
00103| ### Phase 4: Fix Implementation
00104| 
00105| Only after identifying the root cause:
00106| 
00107| 1. **Confirm the cause** - State it explicitly before fixing
00108| 2. **Design the fix** - Address the cause, not just the symptom
00109| 3. **Implement minimally** - Smallest change that fixes the root cause
00110| 4. **Verify the fix** - Reproduce the original bug—it should be gone
00111| 
00112| ```
00113| "Root cause confirmed: the cache TTL was set to 0, causing immediate expiration.
00114| Now let's fix this by setting an appropriate TTL value."
00115| ```
00116| 
00117| ### The 3-Fix Rule
00118| 
00119| If you've tried 3 fixes and the bug persists:
00120| 
00121| **STOP. Question everything.**
00122| 
00123| - Is your understanding of the system correct?
00124| - Are you fixing the right component?
00125| - Is this a symptom of a deeper architectural issue?
00126| 
00127| Three failed fixes indicates a flawed mental model. Go back to Phase 1.
00128| 
00129| ## Example
00130| 
00131| **Anti-pattern: Fix-First Debugging**
00132| 
00133| ```
00134| You: "Users are seeing a 500 error on the checkout page."
00135| 
00136| AI: "Let's add a try-catch around the checkout handler to prevent the error."
00137| ```
00138| 
00139| ❌ **Problem:** This masks the symptom without understanding or fixing the cause.
00140| 
00141| ---
00142| 
00143| **Root-Cause-First Pattern**
00144| 
00145| ```
00146| You: "Users are seeing a 500 error on the checkout page. Don't suggest 
00147| fixes yet—help me investigate."
00148| 
00149| AI: "Let's gather evidence:
00150| 1. Can you share the error logs from when this occurs?
00151| 2. Does it happen for all users or specific ones?
00152| 3. When did this start—after any recent deployment?"
00153| 
00154| You: "Logs show: 'TypeError: Cannot read property 'id' of undefined' 
00155| in PaymentService.processPayment. Started after yesterday's deploy."
00156| 
00157| AI: "Hypothesis: Yesterday's deploy changed something that causes 
00158| the payment object to be undefined in some cases. Let's check:
00159| 1. What changed in yesterday's deploy?
00160| 2. Can you reproduce with a specific test case?"
00161| 
00162| You: "Deploy added a new payment provider. Fails only for guest checkout."
00163| 
00164| AI: "Hypothesis refined: Guest checkout doesn't create the payment object 
00165| the same way registered users do. Let's verify by logging the payment 
00166| object for both flows."
00167| 
00168| You: [Adds logging, confirms guest checkout has null payment object]
00169| 
00170| AI: "Root cause confirmed: Guest checkout flow doesn't initialize 
00171| PaymentService correctly. The fix should initialize the payment object 
00172| in the guest checkout path, not add error handling to mask the issue."
00173| ```
00174| 
00175| ✅ **Result:** Understanding before action leads to correct fix.
00176| 
00177| ## Common Pitfalls
00178| 
00179| 1. **"Let me just try this quick fix"** - Quick fixes compound. Each failed fix adds confusion and code debt.
00180| 
00181| 2. **Accepting the first plausible explanation** - Investigate until you have evidence, not just a theory that sounds right.
00182| 
00183| 3. **Fixing symptoms instead of causes** - Adding null checks everywhere treats symptoms. Understanding why null occurs treats the cause.
00184| 
00185| 4. **Skipping reproduction** - If you can't reproduce it, you can't verify your fix works. Reproduction is step one.
00186| 
00187| ## FOE Alignment
00188| 
00189| This method directly supports **Optimize for Understanding**:
00190| - You must understand the bug before fixing it
00191| - Investigation builds mental model of system behavior
00192| - Root cause knowledge prevents future similar bugs
00193| 
00194| Also supports **Build Confidence**:
00195| - Evidence-based debugging creates justified confidence
00196| - Understanding why a fix works (not just that it works)
00197| 
00198| ## External Evidence
00199| 
00200| - **skills.sh obra/superpowers** (1.3K weekly installs): "systematic-debugging" skill with four-phase process
00201| - **Debugging literature**: Classic texts emphasize scientific method in debugging
00202| - **Industry practice**: The "5 Whys" and root cause analysis are established techniques
00203| 
00204| ## How You Can Help
00205| 
00206| If you're testing this method:
00207| 
00208| 1. Apply root-cause-first discipline to your debugging sessions
00209| 2. Track how often the first AI-suggested fix would have been wrong
00210| 3. Document your experience as an observation
00211| 
00212| ## Supporting Evidence
00213| 
00214| <RelatedObservations />
00215| 

(End of file - total 215 lines)
</file>
```
```

```
Tool: read

**Input:**
```json
{
  "filePath": "/Users/aaron.west/Documents/Projects/flow-optimized-engineering/docs/docs/field-guides/agentic-coding/methods/emerging/persistent-planning-state.md"
}
```
**Output:**
```
<file>
00001| ---
00002| sidebar_position: 6
00003| title: "Persistent Planning State"
00004| maturity: hypothesized
00005| observations: []
00006| ---
00007| 
00008| import MaturityBadge from '@site/src/components/MaturityBadge';
00009| import RelatedObservations from '@site/src/components/RelatedObservations';
00010| 
00011| # Persistent Planning State
00012| 
00013| <MaturityBadge maturity="hypothesized" />
00014| 
00015| Maintain explicit planning state in markdown files that agents read before every decision. This keeps goals in the attention window and prevents context drift during long sessions.
00016| 
00017| :::caution Early Stage
00018| This method is derived from external evidence (Manus pattern, planning-with-files repo 11k stars, Reddit discussions). Internal FOE observations are needed to validate it in our context.
00019| :::
00020| 
00021| ## Overview
00022| 
00023| AI coding assistants lose context over long sessions. They start strong but gradually drift from the original goals, forget constraints, or repeat work already done. The longer the session, the worse the drift.
00024| 
00025| The **Persistent Planning State** pattern (popularized by the Manus agent that led to a $2B acquisition) solves this by externalizing state into markdown files that the agent reads before every decision. The key insight: *"Agent reads plan before every decision to keep goals in attention window."*
00026| 
00027| This creates a simple but powerful feedback loop:
00028| 1. Human and agent agree on a plan (written to file)
00029| 2. Agent reads the plan before each action
00030| 3. Agent updates progress after each action
00031| 4. Drift is impossible because the plan is always in context
00032| 
00033| ## When to Use
00034| 
00035| Use this method when:
00036| 
00037| - Working on multi-step tasks that span long sessions
00038| - The AI has shown goal drift or forgotten earlier context
00039| - Multiple people (or future you) need to understand progress
00040| - Tasks have complex dependencies or sequencing
00041| 
00042| ## When NOT to Use
00043| 
00044| Avoid this method when:
00045| 
00046| - Simple, single-step tasks that complete quickly
00047| - Exploratory work where the plan is genuinely unknown
00048| - The overhead of file management exceeds the benefit
00049| 
00050| ## How It Works
00051| 
00052| ### Prerequisites
00053| 
00054| Before starting:
00055| - A workspace where the agent can read/write markdown files
00056| - Agreement on the overall goal or deliverable
00057| - Willingness to pause and plan before diving into code
00058| 
00059| ### Step 1: Create the Three Planning Files
00060| 
00061| Create three markdown files at the root of your workspace:
00062| 
00063| **`task_plan.md`** - The master plan with phases and checkboxes:
00064| 
00065| ```markdown
00066| # Task Plan: [Goal Description]
00067| 
00068| ## Phase 1: Setup
00069| - [x] Initialize project structure
00070| - [x] Configure dependencies
00071| - [ ] Set up test framework
00072| 
00073| ## Phase 2: Core Implementation
00074| - [ ] Implement data models
00075| - [ ] Create API endpoints
00076| - [ ] Add validation logic
00077| 
00078| ## Phase 3: Polish
00079| - [ ] Error handling
00080| - [ ] Documentation
00081| - [ ] Final testing
00082| ```
00083| 
00084| **`findings.md`** - Research and decisions storage:
00085| 
00086| ```markdown
00087| # Findings
00088| 
00089| ## Architecture Decisions
00090| - Using PostgreSQL over MongoDB because [reason]
00091| - Chose Express over Fastify because [reason]
00092| 
00093| ## Research Notes
00094| - API rate limits: 100 req/min
00095| - Auth token format: JWT with 24h expiry
00096| 
00097| ## Open Questions
00098| - Should we cache user profiles?
00099| ```
00100| 
00101| **`progress.md`** - Session log with timestamps:
00102| 
00103| ```markdown
00104| # Progress Log
00105| 
00106| ## 2026-01-27 Session 1
00107| - [10:30] Started Phase 1 setup
00108| - [10:45] Completed project initialization
00109| - [11:00] Hit issue with dependency conflict, resolved by pinning version
00110| - [11:15] Paused - next: set up test framework
00111| 
00112| ## 2026-01-27 Session 2
00113| - [14:00] Resumed from test framework setup
00114| - ...
00115| ```
00116| 
00117| ### Step 2: Instruct Agent to Read Before Acting
00118| 
00119| Add to your CLAUDE.md or session instructions:
00120| 
00121| ```markdown
00122| ## Working Memory
00123| 
00124| Before taking any action, read these files:
00125| - task_plan.md - Current plan and progress
00126| - findings.md - Decisions and research
00127| - progress.md - Session history
00128| 
00129| After completing any task:
00130| 1. Update task_plan.md checkboxes
00131| 2. Add any findings to findings.md
00132| 3. Log the action in progress.md
00133| ```
00134| 
00135| ### Step 3: Review Plan Before Every Decision
00136| 
00137| When working with the agent, periodically prompt:
00138| 
00139| ```
00140| "Before we continue, check task_plan.md. What's the next uncompleted item?"
00141| ```
00142| 
00143| This forces the agent to re-ground in the plan, preventing drift.
00144| 
00145| ### Step 4: Update State After Every Action
00146| 
00147| After completing work:
00148| 
00149| ```
00150| "Update the planning files:
00151| 1. Check off what we completed in task_plan.md
00152| 2. Add any decisions we made to findings.md  
00153| 3. Log this in progress.md with timestamp"
00154| ```
00155| 
00156| ### Step 5: Use Progress for Session Handoff
00157| 
00158| When starting a new session:
00159| 
00160| ```
00161| "Read progress.md to understand where we left off, then check 
00162| task_plan.md for the next item."
00163| ```
00164| 
00165| The files provide complete context even across session boundaries.
00166| 
00167| ## Example
00168| 
00169| **Session 1: Planning**
00170| ```
00171| You: Let's build a REST API for user management. Create a task_plan.md 
00172| with the phases we need.
00173| 
00174| AI: [Creates task_plan.md with phases: Setup, Models, Endpoints, Auth, Testing]
00175| 
00176| You: Good. Let's start with Setup.
00177| ```
00178| 
00179| **Session 1: Working**
00180| ```
00181| AI: [Completes setup tasks, updates checkboxes]
00182| AI: [Logs findings about chosen libraries to findings.md]
00183| AI: [Records progress with timestamps to progress.md]
00184| ```
00185| 
00186| **Session 2: Resuming (hours later)**
00187| ```
00188| You: Read the planning files and tell me where we are.
00189| 
00190| AI: Reading files...
00191| - task_plan.md: Phase 1 (Setup) complete, Phase 2 (Models) not started
00192| - findings.md: We chose Express + Prisma, PostgreSQL for persistence
00193| - progress.md: Last action was completing test framework setup at 11:15
00194| 
00195| Next uncompleted item: "Implement data models" in Phase 2.
00196| ```
00197| 
00198| No context lost. No drift. Work continues exactly where it stopped.
00199| 
00200| ## Common Pitfalls
00201| 
00202| 1. **Forgetting to update files** - The system only works if files are kept current. Build the update habit or automate it.
00203| 
00204| 2. **Plans that are too detailed** - Over-planning creates maintenance burden. Keep phases high-level with 3-7 items each.
00205| 
00206| 3. **Not reading before acting** - If the agent doesn't read the files, they don't help. Make reading explicit in your workflow.
00207| 
00208| 4. **Treating files as append-only** - It's okay to reorganize the plan as you learn. The plan should evolve.
00209| 
00210| ## FOE Alignment
00211| 
00212| This method directly supports **Optimize for Understanding**:
00213| - Explicit state prevents hidden assumptions
00214| - Written plans force clarity of thought
00215| - Session handoffs preserve understanding across time
00216| 
00217| Also supports **Incremental Development**:
00218| - Checkbox-driven progress makes increments visible
00219| - Each phase is a natural checkpoint
00220| 
00221| ## External Evidence
00222| 
00223| - **Manus agent pattern** (led to $2B acquisition): Core workflow uses this 3-file structure
00224| - **planning-with-files** (GitHub, 11k stars): Open source implementation of the pattern
00225| - **Reddit r/ClaudeAI** (1049 upvotes): Thread discussing the pattern's effectiveness
00226| 
00227| ## How You Can Help
00228| 
00229| If you're testing this method:
00230| 
00231| 1. Apply the 3-file pattern to a multi-session project
00232| 2. Track how often it prevents context drift
00233| 3. Document your experience as an observation
00234| 
00235| ## Supporting Evidence
00236| 
00237| <RelatedObservations />
00238| 

(End of file - total 238 lines)
</file>
```
```

```
Tool: read

**Input:**
```json
{
  "filePath": "/Users/aaron.west/Documents/Projects/flow-optimized-engineering/docs/docs/field-guides/agentic-coding/methods/emerging/test-driven-agent-development.md"
}
```
**Output:**
```
<file>
00001| ---
00002| sidebar_position: 5
00003| title: "Test-Driven Agent Development"
00004| maturity: hypothesized
00005| observations: []
00006| ---
00007| 
00008| import MaturityBadge from '@site/src/components/MaturityBadge';
00009| import RelatedObservations from '@site/src/components/RelatedObservations';
00010| 
00011| # Test-Driven Agent Development
00012| 
00013| <MaturityBadge maturity="hypothesized" />
00014| 
00015| Apply the red-green-refactor cycle when working with AI coding assistants. If you didn't watch the test fail, you don't know if it tests the right thing—this is doubly true when AI writes the test.
00016| 
00017| :::caution Early Stage
00018| This method is derived from external evidence (skills.sh obra/superpowers, TDD literature). Internal FOE observations are needed to validate it in our context.
00019| :::
00020| 
00021| ## Overview
00022| 
00023| AI coding assistants can generate tests alongside implementation code. This creates a dangerous situation: both the code and the test might be wrong in the same way, and the test passes because it validates the bug. The test provides false confidence.
00024| 
00025| **Test-Driven Agent Development** applies the classic TDD discipline to AI-assisted work: always see the test fail before making it pass. This simple gate ensures that:
00026| 1. The test actually tests what you think it tests
00027| 2. The test can detect failures
00028| 3. The implementation was necessary (the test didn't pass accidentally)
00029| 
00030| The iron law from obra/superpowers: *"If you didn't watch the test fail, you don't know if it tests the right thing."*
00031| 
00032| ## When to Use
00033| 
00034| Use this method when:
00035| 
00036| - Working with AI on features that need to be correct
00037| - The AI is generating both tests and implementation
00038| - You've experienced "tests pass but code is wrong" situations
00039| - Building confidence in AI-generated code matters
00040| 
00041| ## When NOT to Use
00042| 
00043| Avoid this method when:
00044| 
00045| - Exploratory coding where you're discovering requirements
00046| - Adding tests to existing working code (test-after is fine there)
00047| - Time pressure genuinely outweighs correctness needs (rare but real)
00048| 
00049| ## How It Works
00050| 
00051| ### Prerequisites
00052| 
00053| Before starting:
00054| - Have a test framework configured and running
00055| - Tests should execute quickly (< 5 seconds for unit tests)
00056| - Understand what behavior you want to implement
00057| 
00058| ### Step 1: Write the Test First (Red)
00059| 
00060| Ask the AI to write a test for the desired behavior *before* implementing it:
00061| 
00062| ```
00063| "Write a test for a function that calculates compound interest. 
00064| Don't implement the function yet—just the test."
00065| ```
00066| 
00067| The AI produces a test. **Run it and watch it fail.**
00068| 
00069| ```bash
00070| $ npm test
00071|   ✗ should calculate compound interest correctly
00072|     Error: calculateCompoundInterest is not defined
00073| ```
00074| 
00075| This failure proves:
00076| - The test runs
00077| - The test would detect a missing implementation
00078| - You're testing the right thing
00079| 
00080| ### Step 2: Verify the Failure is Meaningful
00081| 
00082| Ensure the test fails for the right reason:
00083| - Not a syntax error in the test
00084| - Not a missing import (unless that's what you're testing)
00085| - The actual assertion would have executed
00086| 
00087| If the test fails before reaching the assertion, fix the test first.
00088| 
00089| ### Step 3: Implement to Pass (Green)
00090| 
00091| Now ask the AI to implement just enough to make the test pass:
00092| 
00093| ```
00094| "Now implement calculateCompoundInterest to make this test pass.
00095| Implement the minimum needed—don't add extra features."
00096| ```
00097| 
00098| Run the test again. It should pass:
00099| 
00100| ```bash
00101| $ npm test
00102|   ✓ should calculate compound interest correctly
00103| ```
00104| 
00105| ### Step 4: Refactor with Confidence
00106| 
00107| With a passing test, you can refactor safely:
00108| 
00109| ```
00110| "Can you refactor this implementation to be more readable?
00111| The test should still pass after."
00112| ```
00113| 
00114| Run tests after every refactor to ensure you haven't broken anything.
00115| 
00116| ### Step 5: Repeat for Additional Cases
00117| 
00118| Add edge cases one at a time, always following red-green-refactor:
00119| 
00120| 1. Write test for edge case → watch it fail
00121| 2. Extend implementation → watch it pass
00122| 3. Refactor if needed → confirm tests still pass
00123| 
00124| ## Example
00125| 
00126| **Anti-pattern: Test and Implementation Together**
00127| 
00128| ```
00129| You: "Create a function to validate email addresses with tests."
00130| 
00131| AI: Here's the implementation and tests:
00132| 
00133| function isValidEmail(email) {
00134|   return email.includes('@');
00135| }
00136| 
00137| test('validates email', () => {
00138|   expect(isValidEmail('test@example.com')).toBe(true);
00139| });
00140| 
00141| All tests pass! ✓
00142| ```
00143| 
00144| ❌ **Problem:** You never saw the test fail. The test might be testing the wrong thing. In fact, this implementation is buggy (`"@@"` would pass) but the test doesn't catch it.
00145| 
00146| ---
00147| 
00148| **TDD Pattern: Red-Green-Refactor**
00149| 
00150| ```
00151| You: "Write a test for email validation. Don't implement yet."
00152| 
00153| AI: Here's the test:
00154| 
00155| test('rejects email without @', () => {
00156|   expect(isValidEmail('invalid')).toBe(false);
00157| });
00158| 
00159| test('accepts valid email format', () => {
00160|   expect(isValidEmail('user@domain.com')).toBe(true);
00161| });
00162| 
00163| You: Run it.
00164| 
00165| AI: $ npm test
00166|   ✗ rejects email without @ - isValidEmail is not defined
00167|   ✗ accepts valid email format - isValidEmail is not defined
00168| ```
00169| 
00170| ✅ **Good:** Tests fail because function doesn't exist. Now implement:
00171| 
00172| ```
00173| You: "Implement isValidEmail to pass these tests."
00174| 
00175| AI: function isValidEmail(email) {
00176|   return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
00177| }
00178| 
00179| $ npm test
00180|   ✓ rejects email without @
00181|   ✓ accepts valid email format
00182| ```
00183| 
00184| ✅ **Confidence:** You saw the tests fail, then pass. The tests actually test something.
00185| 
00186| ## Common Pitfalls
00187| 
00188| 1. **"The AI wrote tests, so we're covered"** - AI-generated tests can have the same blind spots as AI-generated code. The red phase catches this.
00189| 
00190| 2. **Skipping the red phase "just this once"** - Every skip is a potential false-positive test. The discipline must be consistent.
00191| 
00192| 3. **Too many tests at once** - Write one test, see it fail, make it pass. Then the next. Batching tests defeats the purpose.
00193| 
00194| 4. **Confusing test errors with test failures** - A test that errors (crashes) before the assertion isn't the same as a test that fails (assertion not met). Fix errors first.
00195| 
00196| ## FOE Alignment
00197| 
00198| This method supports multiple FOE principles:
00199| 
00200| - **Fast Feedback:** Immediate test results after each change
00201| - **Build Confidence:** Watching tests fail then pass proves the test works
00202| - **Incremental Development:** One test at a time, building up coverage
00203| 
00204| ## External Evidence
00205| 
00206| - **skills.sh obra/superpowers** (1.3K weekly installs): "test-driven-development" skill with strict red-green-refactor enforcement
00207| - **RubberDuckBench research** (arXiv 2026): High hallucination rates in AI models make verification essential
00208| - **Classic TDD literature**: Kent Beck's principles apply equally to AI-assisted development
00209| 
00210| ## How You Can Help
00211| 
00212| If you're testing this method:
00213| 
00214| 1. Apply TDD discipline to your AI-assisted development
00215| 2. Track instances where the red phase caught problems
00216| 3. Document your experience as an observation
00217| 
00218| ## Supporting Evidence
00219| 
00220| <RelatedObservations />

(End of file - total 220 lines)
</file>
```
```

```
Tool: read

**Input:**
```json
{
  "filePath": "/Users/aaron.west/Documents/Projects/flow-optimized-engineering/docs/docs/field-guides/agentic-coding/methods/emerging/verification-before-completion.md"
}
```
**Output:**
```
<file>
00001| ---
00002| sidebar_position: 4
00003| title: "Verification Before Completion"
00004| maturity: hypothesized
00005| observations: []
00006| ---
00007| 
00008| import MaturityBadge from '@site/src/components/MaturityBadge';
00009| import RelatedObservations from '@site/src/components/RelatedObservations';
00010| 
00011| # Verification Before Completion
00012| 
00013| <MaturityBadge maturity="hypothesized" />
00014| 
00015| Never claim work is complete without running verification commands. Claiming completion without evidence is not efficiency—it's wishful thinking that creates downstream problems.
00016| 
00017| :::caution Early Stage
00018| This method is derived from external evidence (skills.sh obra/superpowers, industry practice). Internal FOE observations are needed to validate it in our context.
00019| :::
00020| 
00021| ## Overview
00022| 
00023| AI coding assistants are prone to optimistic completion claims. They may generate code that "looks right" but hasn't been tested, or claim a task is done when edge cases remain unhandled. This pattern is especially dangerous because the output *appears* professional and complete.
00024| 
00025| The **Verification Before Completion** method establishes a hard gate: no completion claim is valid without evidence from actual verification commands (tests passing, builds succeeding, linters clean, etc.). This transforms "I think it works" into "I have evidence it works."
00026| 
00027| The core insight comes from the obra/superpowers skill: *"Claiming work is complete without verification is dishonesty, not efficiency."* This framing shifts verification from overhead to professional obligation.
00028| 
00029| ## When to Use
00030| 
00031| Use this method when:
00032| 
00033| - Working with AI coding assistants on any production code
00034| - The cost of undetected bugs exceeds the cost of verification
00035| - You've experienced "looks right but isn't" problems before
00036| - Building confidence in AI-generated code matters
00037| 
00038| ## When NOT to Use
00039| 
00040| Avoid this method when:
00041| 
00042| - Pure exploration/prototyping where correctness doesn't matter yet
00043| - You're intentionally deferring verification (and tracking that decision)
00044| - The code is genuinely throwaway with no downstream consumers
00045| 
00046| ## How It Works
00047| 
00048| ### Prerequisites
00049| 
00050| Before starting:
00051| - Have runnable verification commands (tests, lints, builds, type checks)
00052| - Understand what "done" means for this task
00053| - Ensure verification commands are fast enough to run frequently
00054| 
00055| ### Step 1: Define Verification Evidence
00056| 
00057| Before starting work, identify what evidence would prove completion:
00058| 
00059| | Claim Type | Required Evidence |
00060| |------------|------------------|
00061| | "Feature works" | Tests pass covering the feature |
00062| | "Bug is fixed" | Test that reproduced bug now passes |
00063| | "Code is clean" | Linter/formatter reports no issues |
00064| | "Types are correct" | Type checker passes |
00065| | "Build succeeds" | Build command completes without errors |
00066| 
00067| ### Step 2: Detect Completion Claims Without Evidence
00068| 
00069| Watch for these red flags from AI assistants:
00070| 
00071| - "This should work" (without running it)
00072| - "The implementation is complete" (without test results)
00073| - "I've fixed the issue" (without reproducing and verifying)
00074| - Providing code without showing verification output
00075| 
00076| When you see these, pause and request verification before accepting.
00077| 
00078| ### Step 3: Require Evidence Before Accepting
00079| 
00080| Before accepting completion:
00081| 
00082| ```
00083| "Before we consider this done, please run the tests and show me the results."
00084| "Can you verify this builds successfully?"
00085| "Show me the linter output for these changes."
00086| ```
00087| 
00088| Only accept completion claims that include verification output.
00089| 
00090| ### Step 4: Build Verification Into Your Workflow
00091| 
00092| For systematic application:
00093| 
00094| 1. **Add verification to your CLAUDE.md or agent instructions:**
00095|    ```markdown
00096|    ## Completion Requirements
00097|    
00098|    Never claim a task is complete without:
00099|    - Running relevant tests and showing results
00100|    - Confirming the build passes
00101|    - Showing linter output is clean
00102|    ```
00103| 
00104| 2. **Create verification checkpoints:**
00105|    - After implementing a feature: run its tests
00106|    - After fixing a bug: run the reproduction test
00107|    - Before any PR: full test suite + build
00108| 
00109| ## Example
00110| 
00111| **Before (Unverified Completion):**
00112| ```
00113| Assistant: I've implemented the user authentication feature. The code handles login, 
00114| logout, and session management. The implementation is complete.
00115| ```
00116| ❌ No evidence provided
00117| 
00118| **After (Verified Completion):**
00119| ```
00120| Assistant: I've implemented the user authentication feature. Here's the verification:
00121| 
00122| $ npm test -- --grep "auth"
00123|   ✓ should log in with valid credentials (42ms)
00124|   ✓ should reject invalid password (15ms)
00125|   ✓ should handle session expiration (28ms)
00126|   ✓ should log out and clear session (12ms)
00127| 
00128| 4 passing (97ms)
00129| 
00130| $ npm run build
00131| Build successful - no errors
00132| 
00133| $ npm run lint
00134| No linting errors found
00135| 
00136| The implementation is complete with all tests passing.
00137| ```
00138| ✅ Evidence provided
00139| 
00140| ## Common Pitfalls
00141| 
00142| 1. **"I'll verify it later"** - Later never comes. Verify immediately or explicitly track the debt.
00143| 
00144| 2. **Accepting verbal assurance** - "I'm confident it works" is not evidence. Output from verification commands is evidence.
00145| 
00146| 3. **Partial verification** - Running one test doesn't verify the whole feature. Ensure verification scope matches claim scope.
00147| 
00148| 4. **Forgetting negative cases** - Verification should include error handling and edge cases, not just happy paths.
00149| 
00150| ## FOE Alignment
00151| 
00152| This method directly supports **Build Confidence Through Evidence**:
00153| - You can't claim confidence without verification
00154| - Evidence creates justified confidence, not false confidence
00155| - Fast verification enables frequent confidence checks
00156| 
00157| ## External Evidence
00158| 
00159| - **skills.sh obra/superpowers** (1.0K weekly installs): "verification-before-completion" skill with iron law enforcement
00160| - **RubberDuckBench research** (arXiv 2026): 58.3% hallucination rate across AI models underscores need for verification
00161| - **Industry practice**: Widespread adoption of CI/CD gates embodying this principle
00162| 
00163| ## How You Can Help
00164| 
00165| If you're testing this method:
00166| 
00167| 1. Apply the verification gate to your AI-assisted development
00168| 2. Track how often unverified claims would have been wrong
00169| 3. Document your experience as an observation
00170| 
00171| ## Supporting Evidence
00172| 
00173| <RelatedObservations />
00174| 

(End of file - total 174 lines)
</file>
```
```

```
Tool: read

**Input:**
```json
{
  "filePath": "/Users/aaron.west/Documents/Projects/flow-optimized-engineering/docs/docs/field-guides/architecture/methods/established/consumer-contract-testing.md"
}
```
**Output:**
```
<file>
00001| ---
00002| sidebar_position: 2
00003| title: "Consumer Contract Testing"
00004| maturity: validated
00005| observations:
00006|   - external/thoughtworks-cdc-testing
00007|   - external/robinson-consumer-driven-contracts
00008|   - external/ebay-contract-testing-adoption
00009| ---
00010| 
00011| import MaturityBadge from '@site/src/components/MaturityBadge';
00012| import RelatedObservations from '@site/src/components/RelatedObservations';
00013| 
00014| # Consumer Contract Testing
00015| 
00016| <MaturityBadge maturity="validated" />
00017| 
00018| Validate service integration points through consumer-driven contracts—tests that verify providers honor what consumers actually need, enabling independent deployment without full end-to-end test environments.
00019| 
00020| ## Overview
00021| 
00022| In microservices architectures, teams often struggle with a painful trade-off: coordinate deployments to ensure compatibility, or risk breaking consumers in production. End-to-end tests seem like the answer, but they become slow, brittle, expensive to maintain, and create deployment bottlenecks that undermine the independence microservices promise.
00023| 
00024| Consumer Contract Testing inverts the testing model. Instead of running full integrated environments, **consumers write tests that express what they need from providers**. These tests generate contracts—formal specifications of the consumer's requirements. Providers then verify these contracts during their build, catching breaking changes before deployment. The key insight: providers don't need to know everything about their API works; they only need to honor what consumers actually use.
00025| 
00026| This approach enables the flow benefits microservices promise: teams can deploy independently, with confidence, because contracts verify compatibility at build time. ThoughtWorks placed CDC at "Adopt" status in their Technology Radar, calling it "an essential part of a mature microservice testing portfolio."
00027| 
00028| ## FOE Framing
00029| 
00030| This method optimizes across all three FOE dimensions:
00031| 
00032| - **Understanding:** Contracts make implicit dependencies explicit. Both teams understand exactly what the integration requires.
00033| - **Feedback:** Build-time contract verification replaces slow E2E test feedback. Issues detected in minutes, not hours.
00034| - **Confidence:** Independent deployment becomes safe because contracts prove compatibility before release.
00035| 
00036| ## When to Use
00037| 
00038| Use this method when:
00039| 
00040| - **Multiple services communicate via APIs** — Contract testing validates these integration points
00041| - **Teams want to deploy independently** — CDC enables the independence microservices promise
00042| - **E2E tests are slow or brittle** — Contract tests are faster, more stable, and run in isolation
00043| - **API changes risk breaking consumers** — Contracts catch breaking changes before production
00044| - **Coordinated deployments slow you down** — CDC removes the need for deployment synchronization
00045| 
00046| ## When NOT to Use
00047| 
00048| Avoid this method when:
00049| 
00050| - **Monolithic architecture** — No service boundaries means no contracts to test
00051| - **Single team owns everything** — The coordination overhead CDC solves doesn't exist
00052| - **Latency-critical integration validation** — Some scenarios still require E2E verification
00053| - **Third-party APIs you don't control** — Contracts require provider participation
00054| - **Very early prototyping** — Premature when interfaces aren't stable
00055| 
00056| ## How It Works
00057| 
00058| ### Prerequisites
00059| 
00060| Before starting:
00061| - Services communicate via defined APIs (REST, gRPC, messaging)
00062| - Consumer and provider teams willing to participate
00063| - CI/CD pipeline to run contract verification
00064| 
00065| ### Step 1: Consumer Writes Expectations
00066| 
00067| The consumer team writes tests expressing what they need from the provider. These tests:
00068| - Specify the requests they'll make
00069| - Define the response structure they require
00070| - Include only fields they actually use (not the full API)
00071| 
00072| ```javascript
00073| // Example: Consumer test expressing expectations
00074| describe('User API Contract', () => {
00075|   it('returns user profile with required fields', async () => {
00076|     await provider
00077|       .given('user 123 exists')
00078|       .uponReceiving('a request for user profile')
00079|       .withRequest({
00080|         method: 'GET',
00081|         path: '/users/123',
00082|       })
00083|       .willRespondWith({
00084|         status: 200,
00085|         body: {
00086|           id: '123',
00087|           name: like('Alice'),
00088|           email: like('alice@example.com'),
00089|           // Only fields consumer actually uses
00090|         },
00091|       });
00092|   });
00093| });
00094| ```
00095| 
00096| ### Step 2: Generate Contract (Pact File)
00097| 
00098| Running consumer tests generates a contract file (e.g., Pact JSON) that captures:
00099| - The interactions the consumer expects
00100| - The data shapes required
00101| - Any provider states needed
00102| 
00103| This contract is the source of truth for what the consumer needs.
00104| 
00105| ### Step 3: Provider Verifies Contract
00106| 
00107| The provider team runs verification tests against the contract:
00108| - Starts the provider service
00109| - Replays the interactions from the contract
00110| - Verifies responses match expectations
00111| 
00112| ```bash
00113| # Provider verification
00114| pact verify --provider-base-url=http://localhost:8080 \
00115|             --pact-url=./pacts/consumer-provider.json
00116| ```
00117| 
00118| ### Step 4: Integrate with CI/CD
00119| 
00120| Add contract verification to both pipelines:
00121| 
00122| **Consumer pipeline:**
00123| 1. Run consumer tests
00124| 2. Generate contracts
00125| 3. Publish contracts to broker (Pactflow, Pact Broker)
00126| 
00127| **Provider pipeline:**
00128| 1. Pull consumer contracts from broker
00129| 2. Run verification
00130| 3. Publish verification results
00131| 4. "Can I Deploy" check gates release
00132| 
00133| ### Step 5: Evolve with Confidence
00134| 
00135| With contracts in place:
00136| - **Providers** can safely change anything not in consumer contracts
00137| - **Consumers** can update contracts when their needs change
00138| - **Both** get fast feedback when changes break compatibility
00139| 
00140| ## Example
00141| 
00142| ### eBay Enterprise Adoption
00143| 
00144| eBay adopted consumer-driven contract testing across their large microservices architecture:
00145| 
00146| **Before CDC:**
00147| - E2E tests slow and brittle
00148| - Fear of breaking consumers with API changes
00149| - Coordinated releases to ensure compatibility
00150| - Deployment bottlenecks limiting velocity
00151| 
00152| **After CDC:**
00153| - Fast, stable tests in unit test context
00154| - Confidence to evolve APIs knowing contracts catch issues
00155| - Independent deployment without coordination
00156| - Faster release cycles
00157| 
00158| eBay's engineering team summarized: "Contract testing promotes isolated unit tests against integration points based on predefined contracts rather than real end-to-end interactions, making tests comparatively fast and stable."
00159| 
00160| ## Common Pitfalls
00161| 
00162| 1. **Testing full API instead of consumer needs** — Contracts should include only what consumers actually use. Testing the full API recreates integration testing problems.
00163| 
00164| 2. **Provider-driven contracts** — Consumer-driven is the key insight. If providers define contracts, they don't learn what consumers need and can't safely evolve.
00165| 
00166| 3. **Treating CDC as replacement for all testing** — Contract tests verify interface compatibility. You still need unit tests, and some E2E tests may still be valuable.
00167| 
00168| 4. **Expecting zero coordination** — Initial contract setup requires consumer-provider conversation. The ongoing coordination is eliminated, not the upfront agreement.
00169| 
00170| 5. **Skipping the broker** — Contract brokers (Pactflow, Pact Broker) enable "Can I Deploy" workflows and contract versioning. Without them, you're missing key benefits.
00171| 
00172| 6. **One-sided adoption** — Both consumer and provider must participate. Contract testing with only one side participating doesn't work.
00173| 
00174| ## Tools & Ecosystem
00175| 
00176| | Tool | Purpose |
00177| |------|---------|
00178| | **Pact** | Most popular CDC framework (multi-language) |
00179| | **Pactflow** | Commercial broker with enhanced workflows |
00180| | **Pact Broker** | Open-source contract broker |
00181| | **Spring Cloud Contract** | CDC for Spring ecosystem |
00182| 
00183| ## Relationship to Other Methods
00184| 
00185| **Supports True Microservices:**
00186| CDC enables the "independent deployment litmus test." If you can deploy without coordinating, it's because contracts verify compatibility.
00187| 
00188| **Supports Service Boundary Extraction:**
00189| When extracting services, contracts formalize the new boundary. If the contract is awkward, the boundary might not be natural.
00190| 
00191| **Enables Early Feedback Loop Investment:**
00192| Contract tests are an early feedback mechanism—catching integration issues at build time, not production.
00193| 
00194| ## Supporting Evidence
00195| 
00196| This method is validated by strong external evidence:
00197| 
00198| - **ThoughtWorks Technology Radar (2016):** "Adopt" rating - the highest recommendation level, calling CDC "an essential part of a mature microservice testing portfolio"
00199| - **Ian Robinson's foundational paper (2006):** Established the theoretical basis for consumer-driven contracts
00200| - **eBay case study (2023):** Enterprise-scale validation with internal tooling investment (Pact Initializer)
00201| 
00202| :::note Internal Validation Pending
00203| This method has strong external evidence but awaits internal observation. Consider documenting your CDC adoption experience to strengthen the evidence base.
00204| :::
00205| 
00206| <RelatedObservations />
00207| 

(End of file - total 207 lines)
</file>
```
```

```
Tool: read

**Input:**
```json
{
  "filePath": "/Users/aaron.west/Documents/Projects/flow-optimized-engineering/docs/docs/field-guides/agentic-coding/methods/emerging/early-feedback-loop-investment.md"
}
```
**Output:**
```
<file>
00001| ---
00002| sidebar_position: 2
00003| title: "Early Feedback Loop Investment"
00004| maturity: observing
00005| observations:
00006|   - internal/prima-oss-fork-strategy
00007|   - internal/prima-bdd-api-testing-adoption
00008| ---
00009| 
00010| import MaturityBadge from '@site/src/components/MaturityBadge';
00011| import RelatedObservations from '@site/src/components/RelatedObservations';
00012| 
00013| # Early Feedback Loop Investment
00014| 
00015| <MaturityBadge maturity="observing" />
00016| 
00017| Treat CI, automated tests, and deployment pipelines as foundation, not overhead—establish them early before the codebase grows large enough to make adding them feel "monumental."
00018| 
00019| :::caution Early Stage
00020| This method is still being validated through observations. Results may vary and 
00021| the approach may evolve as we learn more.
00022| :::
00023| 
00024| ## Overview
00025| 
00026| Under velocity pressure, teams often defer testing and deployment infrastructure as "overhead" that can wait. This creates a "works on my machine" culture where feedback only arrives in production—when fixes are most expensive and stressful.
00027| 
00028| Early Feedback Loop Investment treats CI, automated tests, and deployment pipelines as *foundation*, not overhead. The time "saved" by skipping this investment is consumed many times over in debugging, production incidents, and support burden.
00029| 
00030| The Prima observation showed this pattern starkly: no test infrastructure meant 7 production bugs on the first day users onboarded. The December debugging crunch—commits like "prod debugging logs" and "temporarily disabled tool toggle feature"—revealed problems that automated tests would have caught weeks earlier. The team noted that the large OSS codebase made adding tests feel "monumental," but the alternative proved worse.
00031| 
00032| ## When to Use
00033| 
00034| Use this method when:
00035| 
00036| - Starting any project expected to last more than a few weeks
00037| - Forking or inheriting a large codebase without existing test coverage
00038| - Team is under velocity pressure (counterintuitive but critical)
00039| - Multiple people will contribute to the same codebase
00040| 
00041| ## When NOT to Use
00042| 
00043| Avoid this method when:
00044| 
00045| - True throwaway prototypes with no path to production
00046| - Solo exploration where you ARE the feedback loop
00047| - Codebase already has healthy test infrastructure
00048| 
00049| ## How It Works
00050| 
00051| ### Prerequisites
00052| 
00053| Before starting:
00054| - A codebase that will be maintained beyond initial development
00055| - Ability to set up CI/CD infrastructure (even minimal)
00056| 
00057| ### Step 1: Start with Deployment Validation
00058| 
00059| Before writing features, establish: "How do we know this works somewhere other than my machine?" Even a simple "deploy to staging and smoke test" script breaks the "works on my machine" pattern.
00060| 
00061| The goal isn't perfection—it's having *any* validation that runs outside your local environment.
00062| 
00063| ### Step 2: Add Tests Before the Codebase Feels "Too Big"
00064| 
00065| The psychological barrier to testing grows with codebase size. Start testing infrastructure when the codebase is small, even if coverage is minimal. Waiting until it feels "monumental" means you've already lost.
00066| 
00067| The Prima team reflected: "The OSS was so large that adding BDD tests felt monumental." This is the trap—by the time you notice the barrier, it's already high.
00068| 
00069| ### Step 3: Make CI the Source of Truth
00070| 
00071| If it doesn't pass CI, it doesn't work. This shifts the definition of "done" from local success to validated success. Configure CI to run on every PR.
00072| 
00073| This creates a shared understanding of "working" that doesn't depend on any individual's machine or knowledge.
00074| 
00075| ### Step 4: Budget Test Time into Velocity
00076| 
00077| Explicitly allocate time for test infrastructure in estimates. If velocity pressure causes this to be cut, escalate—the Prima observation shows the cost of skipping it: 7 production bugs on day one, a December debugging crunch, and ongoing support burden.
00078| 
00079| ## Example
00080| 
00081| From the Prima observation:
00082| 
00083| **What happened without early feedback loops:**
00084| - December 20-31, 2025: Commits like "prod debugging logs," "more debug," "temporarily disabled tool toggle feature"
00085| - January 12, 2026: 7 production bugs filed on the first day users onboarded
00086| - Issues discovered in production that tests would have caught: "ensuring tool function name length meets openai compatible length"
00087| 
00088| **What early feedback loop investment would have looked like:**
00089| 1. Week 1: Set up basic CI that deploys to a staging environment
00090| 2. Week 2: Add smoke tests for core functionality
00091| 3. Ongoing: Every PR runs through CI before merge
00092| 
00093| **The ROI:** The time spent on December debugging and January firefighting far exceeded what early test infrastructure would have cost.
00094| 
00095| ## Common Pitfalls
00096| 
00097| 1. **"We'll add tests later"** - Later never comes, and the codebase grows. The psychological barrier increases. Start now, even if minimal.
00098| 
00099| 2. **Treating tests as overhead, not foundation** - Tests aren't slowing you down; they're preventing the slowdown that comes from production debugging.
00100| 
00101| 3. **Waiting for "the right time"** - There's no right time. The best time was at project start; the second best time is now.
00102| 
00103| 4. **Perfectionism** - You don't need 100% coverage. You need *any* automated validation. Start with smoke tests and grow from there.
00104| 
00105| ## How You Can Help
00106| 
00107| If you're testing this method:
00108| 
00109| 1. Review the current approach
00110| 2. Try establishing feedback loops early in your next project
00111| 3. Document your observation—especially the relationship between early investment and later stability
00112| 
00113| ## Supporting Evidence
00114| 
00115| <RelatedObservations />
00116| 

(End of file - total 116 lines)
</file>
```
```

```
Tool: read

**Input:**
```json
{
  "filePath": "/Users/aaron.west/Documents/Projects/flow-optimized-engineering/docs/docs/field-guides/architecture/methods/emerging/system-over-individuals.md"
}
```
**Output:**
```
<file>
00001| ---
00002| sidebar_position: 3
00003| title: "System Over Individuals"
00004| maturity: observing
00005| observations:
00006|   - external/nummi-plant-transformation
00007| ---
00008| 
00009| import MaturityBadge from '@site/src/components/MaturityBadge';
00010| import RelatedObservations from '@site/src/components/RelatedObservations';
00011| 
00012| # System Over Individuals
00013| 
00014| <MaturityBadge maturity="observing" />
00015| 
00016| When performance is poor, optimize the system before blaming the people. The same individuals can produce dramatically different outcomes depending on the system they operate within.
00017| 
00018| :::info Observing
00019| This method has supporting external evidence from manufacturing. We're seeking internal 
00020| observations to validate it in software engineering contexts.
00021| :::
00022| 
00023| ## Overview
00024| 
00025| When teams underperform, organizations often reach for the same solution: replace the people. Hire better developers. Fire the underperformers. Bring in consultants. But this response ignores a fundamental insight: **outcomes are determined primarily by system design, not individual capability**.
00026| 
00027| The NUMMI plant transformation provides the clearest evidence. GM's Fremont plant—described by UAW leadership as having "the worst workforce in the automobile industry"—was closed in 1982 due to rampant absenteeism, sabotage, and quality problems. When Toyota reopened it in 1984 with the Toyota Production System, **85%+ of the same workers** achieved quality levels matching Toyota's Japanese plants.
00028| 
00029| The workers didn't change. The system did.
00030| 
00031| This principle applies directly to software engineering. When bugs escape to production, when deployments fail, when teams miss deadlines—the instinct to blame individuals is usually wrong. Instead, ask: What about the system made this outcome likely? What would prevent it from happening again regardless of who's working?
00032| 
00033| ## FOE Framing
00034| 
00035| This method is foundational to FOE's approach:
00036| 
00037| - **Understanding:** Make work visible so everyone can see and improve the system
00038| - **Feedback:** Tighten feedback loops so problems surface early (NUMMI's andon cord)
00039| - **Confidence:** Build psychological safety so people can report problems and suggest improvements
00040| 
00041| ## When to Use
00042| 
00043| Use this method when:
00044| 
00045| - **Performance problems are blamed on individuals** — "If only we had better developers..."
00046| - **The same problems recur despite personnel changes** — New people hit the same walls
00047| - **Heroics are required for normal operation** — The system depends on exceptional individual effort
00048| - **Fear prevents honesty** — People hide problems rather than surface them
00049| - **Process improvement stalls** — Teams resist change because they fear blame
00050| 
00051| ## When NOT to Use
00052| 
00053| Avoid this method when:
00054| 
00055| - **Genuine skill gaps exist** — Sometimes training or hiring is the right answer
00056| - **Individual misconduct requires response** — Not every problem is systemic
00057| - **The system is already well-designed** — Don't over-engineer working systems
00058| - **Quick individual fixes are sufficient** — Not every problem needs systemic analysis
00059| 
00060| ## How It Works
00061| 
00062| ### Prerequisites
00063| 
00064| Before starting:
00065| - A team or system experiencing performance problems
00066| - Willingness to look beyond individual blame
00067| - Authority to change processes, not just people
00068| 
00069| ### Step 1: Observe the System, Not the People
00070| 
00071| When problems occur, resist the urge to identify "who failed." Instead, ask:
00072| - What about the system made this outcome possible?
00073| - Would a different person in this role have done better? Why or why not?
00074| - What information was missing? What feedback was delayed?
00075| 
00076| Map the system: inputs, processes, handoffs, feedback loops, constraints.
00077| 
00078| ### Step 2: Identify System Failures
00079| 
00080| Look for patterns that transcend individuals:
00081| - **Missing feedback loops:** Problems discovered late (in production, by customers)
00082| - **Information silos:** People lack context to make good decisions
00083| - **Misaligned incentives:** The system rewards behaviors that hurt outcomes
00084| - **Excessive coordination:** Progress requires too many approvals or handoffs
00085| - **Fear-based culture:** Problems are hidden rather than surfaced
00086| 
00087| ### Step 3: Design System Improvements
00088| 
00089| For each system failure, design a systemic fix:
00090| 
00091| | System Failure | Systemic Fix |
00092| |----------------|--------------|
00093| | Problems found late | Add earlier validation (tests, reviews, staging) |
00094| | Information silos | Make work visible (dashboards, standups, documentation) |
00095| | Misaligned incentives | Reward outcomes, not activity |
00096| | Excessive coordination | Reduce dependencies, increase team autonomy |
00097| | Fear-based culture | Model psychological safety, celebrate problem-finding |
00098| 
00099| ### Step 4: Implement with Worker Input
00100| 
00101| The people doing the work understand the system best. NUMMI succeeded partly because Toyota involved workers in process design—every worker could suggest improvements, and many were implemented.
00102| 
00103| Don't design systems for people. Design systems with people.
00104| 
00105| ### Step 5: Measure System Outcomes
00106| 
00107| Track whether the system is improving:
00108| - Defect rates (are problems decreasing?)
00109| - Cycle time (is work flowing faster?)
00110| - Worker satisfaction (do people feel effective?)
00111| - Problem visibility (are issues surfacing earlier?)
00112| 
00113| If outcomes improve without changing personnel, the system was the problem.
00114| 
00115| ## Example
00116| 
00117| **Before (GM Fremont):**
00118| - Workers passed defects down the line for later repair
00119| - No authority to stop production for quality issues
00120| - Adversarial management-labor relations
00121| - Fear of layoffs prevented honest problem reporting
00122| - Separate cafeterias, parking by rank
00123| 
00124| **After (NUMMI with same workers):**
00125| - Any worker could pull the andon cord to stop the line for defects
00126| - Problems fixed at source, not downstream
00127| - Collaborative management-labor relations
00128| - No-layoff policy enabled honest feedback
00129| - Same uniforms, parking, cafeterias for all
00130| 
00131| **Result:** Quality went from among GM's worst to matching Toyota Japan—with 85%+ of the same employees.
00132| 
00133| ## Common Pitfalls
00134| 
00135| 1. **Stopping at blame** — "The deploy failed because Bob didn't test" is not analysis. Why didn't the system catch the problem before Bob?
00136| 
00137| 2. **Designing systems without worker input** — Systems imposed from above often miss crucial context. Involve the people doing the work.
00138| 
00139| 3. **Expecting instant results** — System change takes time. The improvement comes from compounding small changes.
00140| 
00141| 4. **Ignoring culture** — Tools and processes aren't enough. NUMMI's transformation required cultural changes: no-layoff policy, equal treatment, worker voice.
00142| 
00143| 5. **Over-applying the principle** — Not every problem is systemic. Sometimes training, coaching, or personnel changes are appropriate. Use judgment.
00144| 
00145| ## How You Can Help
00146| 
00147| This method is hypothesized based on external evidence (NUMMI, Toyota Production System). We need software engineering observations to validate it:
00148| 
00149| 1. Have you seen a team improve dramatically with system changes (not personnel changes)?
00150| 2. Have you seen the same people fail in one environment and succeed in another?
00151| 3. What system changes had the biggest impact on your team's outcomes?
00152| 
00153| Document your observation and link it to this method.
00154| 
00155| ## Supporting Evidence
00156| 
00157| <RelatedObservations />
00158| 

(End of file - total 158 lines)
</file>
```
```

```
Tool: read

**Input:**
```json
{
  "filePath": "/Users/aaron.west/Documents/Projects/flow-optimized-engineering/docs/docs/field-guides/architecture/methods/established/true-microservices.md"
}
```
**Output:**
```
<file>
00001| ---
00002| sidebar_position: 1
00003| title: "True Microservices"
00004| maturity: validated
00005| observations:
00006|   - internal/prima-microservices-architecture
00007|   - internal/prima-presidio-containerization
00008|   - external/team-topologies-inverse-conway
00009|   - external/team-topologies-bounded-contexts
00010|   - external/fowler-lewis-microservices-definition
00011|   - external/ddd-bounded-contexts
00012|   - external/dora-loosely-coupled-architecture
00013|   - external/dora-four-key-metrics
00014| ---
00015| 
00016| import MaturityBadge from '@site/src/components/MaturityBadge';
00017| import RelatedObservations from '@site/src/components/RelatedObservations';
00018| 
00019| # True Microservices
00020| 
00021| <MaturityBadge maturity="validated" />
00022| 
00023| Design service architectures that enable independent team deployment—not distributed monoliths wearing microservices clothing.
00024| 
00025| ## Overview
00026| 
00027| Microservices have become synonymous with modern architecture, but most "microservices" are actually distributed monoliths—services that share databases, require coordinated deployments, or communicate through chatty synchronous calls. These architectures inherit the operational complexity of distributed systems without the flow benefits of true service independence.
00028| 
00029| True microservices optimize for independent team flow through **thoughtful service composition**. Each business service can be understood, changed, tested, and deployed without coordinating with other teams. But independence doesn't mean isolation—services compose with **shared platform services** (authentication, messaging, observability) and **capability services** (search, payments, notifications) that do one thing well. The difference from a distributed monolith: these shared services are accessed through stable APIs, not shared databases or synchronized deployments.
00030| 
00031| The boundaries aren't arbitrary technical splits—they align with team ownership and business capabilities. When Service A deploys, Service B shouldn't notice. When Service B fails, Service A degrades gracefully. The litmus test is simple: **Can a team deploy their service without talking to anyone else?** If the answer is no—because of shared databases, API contracts that require synchronized changes, or deployment ordering requirements—you have a distributed monolith wearing microservices clothing.
00032| 
00033| ## FOE Framing
00034| 
00035| This method optimizes across all three FOE dimensions:
00036| 
00037| - **Understanding:** Services aligned to business capabilities are easier to reason about than services split by technical layers
00038| - **Feedback:** Independent deployment enables faster iteration cycles without coordination overhead
00039| - **Confidence:** Blast radius containment and graceful degradation mean changes can be made safely
00040| 
00041| ## When to Use
00042| 
00043| - **Multiple teams working on the same system** — Independent deployment becomes valuable when coordination costs grow
00044| - **Business capabilities with different change rates** — Some areas evolve rapidly, others are stable
00045| - **Scaling requirements vary by component** — Parts of the system have different load characteristics
00046| - **Need to experiment or fail safely** — Blast radius containment enables bolder changes
00047| - **Team ownership is clear or can be made clear** — Services work best when owned end-to-end
00048| 
00049| ## When NOT to Use
00050| 
00051| - **Small team, single deployment** — The coordination overhead doesn't exist yet
00052| - **Greenfield without clear boundaries** — Start monolithic, extract when boundaries emerge
00053| - **Latency-critical request paths** — Network hops add latency; measure if it matters
00054| - **Tight transactional requirements** — Distributed transactions are hard; shared-nothing isn't always possible
00055| - **You can't invest in platform capabilities** — True microservices need deployment pipelines, observability, and service discovery
00056| 
00057| ## How It Works
00058| 
00059| ### Prerequisites
00060| 
00061| Before starting:
00062| - Multiple teams or anticipated team growth
00063| - Investment capacity in platform capabilities (CI/CD, observability, service discovery)
00064| - Clear business domains or capability map
00065| 
00066| ### Step 1: Map Business Capabilities
00067| 
00068| Before drawing service boundaries, understand your business domains. What distinct capabilities does your system provide? Who owns them conceptually? Services should align with these capabilities, not technical layers.
00069| 
00070| Don't split by UI/API/Data—split by what the business cares about: Orders, Payments, Inventory, Notifications.
00071| 
00072| ### Step 2: Apply the Independence Litmus Test
00073| 
00074| For each proposed service boundary, ask: "Can the team owning this service deploy without coordinating with other teams?"
00075| 
00076| If the answer is "no" because of:
00077| - Shared databases requiring schema coordination
00078| - API changes requiring synchronized deployments  
00079| - Cross-service transactions requiring distributed locks
00080| 
00081| ...then you don't have a real service boundary. Redraw it or accept the coupling.
00082| 
00083| ### Step 3: Design Shared Services Intentionally
00084| 
00085| Not everything should be independent. Identify what should be shared:
00086| 
00087| - **Platform services:** Authentication, authorization, observability, messaging infrastructure
00088| - **Capability services:** Cross-cutting business capabilities used by multiple domains (search, notifications, payments)
00089| 
00090| These shared services need stable APIs, backward compatibility commitments, and clear ownership. They're explicitly shared, not accidentally coupled.
00091| 
00092| ### Step 4: Establish Team Ownership
00093| 
00094| Each service needs an owner. "Owned by everyone" means "owned by no one."
00095| 
00096| - Single team owns each business service end-to-end
00097| - Platform teams own shared infrastructure
00098| - Ownership includes on-call, roadmap, and API contracts
00099| 
00100| Conway's Law isn't a problem to solve—it's a tool to use.
00101| 
00102| ### Step 5: Build for Independent Deployment
00103| 
00104| Technical enablers for true independence:
00105| - Separate repos or clear boundaries within a monorepo
00106| - Independent CI/CD pipelines per service
00107| - Backward-compatible API evolution (or explicit versioning)
00108| - Health checks and circuit breakers for dependent services
00109| - Per-service observability dashboards
00110| 
00111| ### Step 6: Accept Graceful Degradation
00112| 
00113| Design for partial failure. When Service B is down, Service A should:
00114| - Serve cached data if possible
00115| - Return degraded responses clearly
00116| - Fail fast with circuit breakers
00117| - Never take the whole system down
00118| 
00119| The goal: deploy Service A without worrying about Service B's state.
00120| 
00121| ## Example
00122| 
00123| The **Prima Platform** architecture demonstrates both the benefits and the gaps of pursuing true microservices:
00124| 
00125| **What worked:**
00126| - Control Tower, Engine, and Web as independent subsystems with separate repos and CI/CD
00127| - Platform services (Kong, Redis, Auth0) accessed via stable APIs
00128| - ADRs documenting architectural decisions for security reviewers
00129| 
00130| **What revealed distributed monolith characteristics:**
00131| - Engine's readiness check requires Control Tower to be healthy
00132| - 773-line adapter with intimate knowledge of Control Tower's API structure
00133| - Issue #397 raised "merge to monorepo" due to deployment friction
00134| 
00135| **Key insight:** True microservices require more than just service separation—they require investment in resilience infrastructure (circuit breakers, graceful degradation, API versioning). Without this investment, teams experience the complexity of distribution without the benefits of independence.
00136| 
00137| ## Common Pitfalls
00138| 
00139| 1. **Database sharing** — The most common distributed monolith pattern. If services share a database, they share deployment timing. Extract data ownership with each service.
00140| 
00141| 2. **Synchronous dependency chains** — Long chains of synchronous calls couple services at runtime. Consider async patterns or accept the coupling explicitly.
00142| 
00143| 3. **"Microservices from day one"** — Starting with microservices before understanding boundaries leads to wrong cuts. Start monolithic, extract when natural boundaries emerge.
00144| 
00145| 4. **Platform underinvestment** — Independent deployment requires independent pipelines, observability, and discovery. Without platform investment, microservices become a liability.
00146| 
00147| 5. **Orphaned services** — Services without clear ownership accumulate tech debt and become coordination bottlenecks. Every service needs an owner.
00148| 
00149| 6. **Missing resilience infrastructure** — Circuit breakers, graceful degradation, and API versioning aren't optional. Without them, distributed systems have distributed complexity but coupled operations.
00150| 
00151| ## Supporting Evidence
00152| 
00153| This method is validated by:
00154| 
00155| **External Research:**
00156| - DORA research shows loosely coupled architecture correlates with 208x more frequent deployment and 106x faster lead time
00157| - Fowler & Lewis (2014) established independent deployability as the defining characteristic of microservices
00158| - Team Topologies demonstrates that team boundaries should align with service boundaries (Inverse Conway Maneuver)
00159| - Domain-Driven Design's Bounded Contexts provide the theoretical foundation for service boundaries
00160| 
00161| **Internal Observations:**
00162| - Prima Platform architecture shows both benefits (independent repos, ADRs, platform services) and gaps (runtime coupling, heavy adapters)
00163| - Presidio containerization demonstrates service boundary extraction improving dependency management
00164| 
00165| <RelatedObservations observations={[
00166|   { slug: 'internal/prima-microservices-architecture', title: 'Prima Platform Microservices Architecture', status: 'completed' },
00167|   { slug: 'internal/prima-presidio-containerization', title: 'Containerizing Heavy ML Dependencies', status: 'completed' },
00168|   { slug: 'external/team-topologies-inverse-conway', title: 'Team Topologies: Inverse Conway Maneuver', status: 'completed' },
00169|   { slug: 'external/team-topologies-bounded-contexts', title: 'Team Topologies: Bounded Contexts and Cognitive Load', status: 'completed' },
00170|   { slug: 'external/fowler-lewis-microservices-definition', title: 'Microservices Definition (Fowler & Lewis)', status: 'completed' },
00171|   { slug: 'external/ddd-bounded-contexts', title: 'Domain-Driven Design: Bounded Contexts', status: 'completed' },
00172|   { slug: 'external/dora-loosely-coupled-architecture', title: 'DORA: Loosely Coupled Architecture Capability', status: 'completed' },
00173|   { slug: 'external/dora-four-key-metrics', title: 'DORA Four Key Metrics Research', status: 'completed' }
00174| ]} />
00175| 

(End of file - total 175 lines)
</file>
```
```

```
Tool: read

**Input:**
```json
{
  "filePath": "/Users/aaron.west/Documents/Projects/flow-optimized-engineering/docs/docs/field-guides/agentic-coding/methods/emerging/understanding-first-protocol-adoption.md"
}
```
**Output:**
```
<file>
00001| ---
00002| sidebar_position: 1
00003| title: "Understanding-First Protocol Adoption"
00004| maturity: observing
00005| observations:
00006|   - internal/prima-oss-fork-strategy
00007| ---
00008| 
00009| import MaturityBadge from '@site/src/components/MaturityBadge';
00010| import RelatedObservations from '@site/src/components/RelatedObservations';
00011| 
00012| # Understanding-First Protocol Adoption
00013| 
00014| <MaturityBadge maturity="observing" />
00015| 
00016| When adopting emerging protocols, invest time to understand the protocol's conceptual model—not just its API—before making architectural decisions that depend on it.
00017| 
00018| :::caution Early Stage
00019| This method is still being validated through observations. Results may vary and 
00020| the approach may evolve as we learn more.
00021| :::
00022| 
00023| ## Overview
00024| 
00025| When adopting emerging protocols or technologies, teams often learn the API without understanding the underlying conceptual model. This creates "conceptual debt" that manifests as architectural mistakes, subtle bugs, and security vulnerabilities. The time "saved" by skipping understanding is spent on hotfixes and architectural rework.
00026| 
00027| Understanding-First Protocol Adoption inverts this pattern: before making architectural decisions that depend on a protocol, invest time to understand *how the protocol thinks about the world*—its model of isolation, state, identity, and boundaries. This is different from learning to call its API.
00028| 
00029| The Prima observation demonstrated this clearly: the team adopted MCP without understanding its workspace isolation model, leading to a security issue where headers leaked between workspaces (Issue #156). The team later reflected: "The team didn't understand MCP well enough to make good architectural decisions. They couldn't distinguish between using MCP as a standard for integrating systems, using it to integrate different systems, or building their own bespoke integration."
00030| 
00031| ## When to Use
00032| 
00033| Use this method when:
00034| 
00035| - Adopting an emerging or unfamiliar protocol (MCP, gRPC, GraphQL federation, etc.)
00036| - Building architecture that depends on protocol assumptions (isolation, state, identity)
00037| - Integrating systems where the protocol defines boundaries
00038| - Team has limited prior experience with the protocol
00039| 
00040| ## When NOT to Use
00041| 
00042| Avoid this method when:
00043| 
00044| - Using mature, well-documented protocols the team already understands
00045| - Prototyping/spiking where architectural decisions aren't being made yet
00046| - The protocol is a thin wrapper with no meaningful conceptual model
00047| 
00048| ## How It Works
00049| 
00050| ### Prerequisites
00051| 
00052| Before starting:
00053| - Identified a protocol your architecture will depend on
00054| - Access to protocol documentation, specs, or reference implementations
00055| 
00056| ### Step 1: Distinguish Model from API
00057| 
00058| Before reading API docs, ask: "What is this protocol's model of the world?" For MCP, this means understanding workspaces, isolation boundaries, and state management—not just how to make calls.
00059| 
00060| Write down what you think the protocol's core concepts are. If you can't articulate them, you don't understand the model yet.
00061| 
00062| ### Step 2: Map the Protocol's Assumptions
00063| 
00064| Document the protocol's assumptions about:
00065| - **Isolation:** What boundaries exist? What can cross them?
00066| - **State:** Where does state live? Who owns it?
00067| - **Identity:** How are actors/resources identified?
00068| - **Failure:** How does the protocol expect errors to be handled?
00069| 
00070| If the documentation doesn't answer these questions clearly (common with emerging protocols), budget extra time to discover them through observationation.
00071| 
00072| ### Step 3: Validate Understanding Before Architecture
00073| 
00074| Before making architectural decisions, verify your understanding:
00075| - Explain the model to a teammate (or rubber duck)
00076| - Build a minimal spike that tests your assumptions about boundaries
00077| - If using an emerging protocol, expect gaps in documentation—budget time accordingly
00078| 
00079| The Prima team's header leakage issue resulted from not validating their understanding of MCP's workspace isolation before building on top of it.
00080| 
00081| ### Step 4: Document Your Model Understanding
00082| 
00083| Write down your understanding of the protocol's model for the team. This becomes the reference for architectural decisions and helps distribute knowledge. Include:
00084| - Core concepts and their relationships
00085| - Boundary assumptions
00086| - Known limitations or gaps in your understanding
00087| 
00088| ## Example
00089| 
00090| From the Prima observation, the team adopted MCP for integrating their AI platform components. They learned the API—how to make MCP calls—but didn't understand the protocol's workspace isolation model.
00091| 
00092| **What they missed:** MCP workspaces have isolation boundaries. Headers and tokens should not leak between workspaces.
00093| 
00094| **What happened:** Issue #156 - "Hotfix: Stop token/workspace inheritance in MCP hypervisor to prevent header leakage"—a security issue that required emergency fixes.
00095| 
00096| **What understanding-first would have looked like:**
00097| 1. Before integrating MCP, document: "What is a workspace? What can cross workspace boundaries?"
00098| 2. Build a spike testing workspace isolation specifically
00099| 3. Discover the isolation model before building production architecture on top of it
00100| 
00101| ## Common Pitfalls
00102| 
00103| 1. **Confusing API familiarity with model understanding** - Being able to make calls doesn't mean you understand the protocol's assumptions. Ask yourself: "Could I explain why the protocol is designed this way?"
00104| 
00105| 2. **Skipping this under velocity pressure** - The Prima observation shows the time "saved" is consumed by debugging and hotfixes. Understanding investment has positive ROI even under pressure.
00106| 
00107| 3. **Assuming documentation is complete** - Emerging protocols often have gaps. Budget time to discover the model through observationation, not just reading.
00108| 
00109| ## How You Can Help
00110| 
00111| If you're testing this method:
00112| 
00113| 1. Review the current approach
00114| 2. Try it when adopting a new protocol in your context
00115| 3. Document your observation—especially what you learned about the protocol's model that wasn't obvious from the API
00116| 
00117| ## Supporting Evidence
00118| 
00119| <RelatedObservations />
00120| 

(End of file - total 120 lines)
</file>
```
```

```
Tool: read

**Input:**
```json
{
  "filePath": "/Users/aaron.west/Documents/Projects/flow-optimized-engineering/docs/docs/field-guides/agentic-coding/methods/emerging/knowledge-distribution-as-reliability.md"
}
```
**Output:**
```
<file>
00001| ---
00002| sidebar_position: 3
00003| title: "Knowledge Distribution as Reliability"
00004| maturity: observing
00005| observations:
00006|   - internal/prima-oss-fork-strategy
00007| ---
00008| 
00009| import MaturityBadge from '@site/src/components/MaturityBadge';
00010| import RelatedObservations from '@site/src/components/RelatedObservations';
00011| 
00012| # Knowledge Distribution as Reliability
00013| 
00014| <MaturityBadge maturity="observing" />
00015| 
00016| Treat concentrated knowledge as a system reliability risk to be actively addressed—when only 2-3 people understand a system, that's not a compliment to those people, it's a fragility to fix.
00017| 
00018| :::caution Early Stage
00019| This method is still being validated through observations. Results may vary and 
00020| the approach may evolve as we learn more.
00021| :::
00022| 
00023| ## Overview
00024| 
00025| When only 2-3 people understand a complex system, the team becomes dependent on "heroes" for debugging and support. This isn't just a "bus factor" risk—it's an active reliability problem that creates bottlenecks, burnout, and low team confidence.
00026| 
00027| Knowledge Distribution as Reliability treats concentrated knowledge as a system risk to be actively addressed, not a fact to accept. The pattern is predictable: low understanding → low confidence → heroics → fragility. The solution isn't just documentation—it's deliberate knowledge distribution through pairing, rotation, and teaching.
00028| 
00029| The Prima observation captured this directly: "The main limitation was understanding and lack of confidence, not technical capability." The team struggled to support their first clients because knowledge was concentrated in the few people who could navigate the large forked codebases. Those heroes became bottlenecks, and even they lacked confidence because no single person fully understood the system.
00030| 
00031| ## When to Use
00032| 
00033| Use this method when:
00034| 
00035| - Only 2-3 people can debug production issues
00036| - Team members say "ask [name], they understand that part"
00037| - Support burden falls on the same people repeatedly
00038| - Onboarding new team members feels impossible
00039| 
00040| ## When NOT to Use
00041| 
00042| Avoid this method when:
00043| 
00044| - Very early stage (1-2 person team) where concentration is inevitable
00045| - Temporary specialists brought in for specific expertise
00046| - Knowledge is already well-distributed across the team
00047| 
00048| ## How It Works
00049| 
00050| ### Prerequisites
00051| 
00052| Before starting:
00053| - A system complex enough that understanding is non-trivial
00054| - More than 2-3 people who need to support or extend it
00055| 
00056| ### Step 1: Identify Knowledge Concentration
00057| 
00058| Ask: "Who do we go to when [X] breaks?" If the same 2-3 names come up repeatedly, you have concentration. Map which parts of the system are understood by whom.
00059| 
00060| Create a simple matrix: system components on one axis, team members on the other. Mark who can debug each component. Gaps and concentrations become visible.
00061| 
00062| ### Step 2: Treat Concentration as a Risk
00063| 
00064| Add knowledge concentration to your risk register alongside technical debt. "Only Alice understands the MCP integration" is a reliability risk, not a compliment to Alice.
00065| 
00066| This reframes the conversation: it's not about Alice's value (which is high), it's about system fragility (which is also high).
00067| 
00068| ### Step 3: Pair on Production Issues
00069| 
00070| When heroes debug production issues, require pairing. The goal isn't just to fix the issue—it's to transfer understanding. Rotate who pairs.
00071| 
00072| This is expensive in the short term but essential for distribution. The Prima team's support burden fell on the few who understood the system; pairing would have spread that load.
00073| 
00074| ### Step 4: Rotate Ownership Deliberately
00075| 
00076| Assign different people to different parts of the system over time. Short-term velocity may decrease; long-term resilience increases. The team's confidence grows as understanding spreads.
00077| 
00078| Consider: "Who hasn't worked on this component recently?" as a factor in task assignment.
00079| 
00080| ### Step 5: Validate Distribution
00081| 
00082| Periodically test: "Could someone other than the usual person debug this?" If not, distribution hasn't happened yet.
00083| 
00084| Run a "fire drill": have someone who doesn't usually handle a component investigate an issue (real or simulated) while the expert observes but doesn't intervene.
00085| 
00086| ## Example
00087| 
00088| From the Prima observation:
00089| 
00090| **The concentration pattern:**
00091| - Large forked codebases (OpenAI Codex CLI, AnythingLLM) that few people understood
00092| - MCP integration understood by even fewer
00093| - When first clients onboarded, support burden fell on the same 2-3 people
00094| - Team reflection: "The main limitation was understanding and lack of confidence, not technical capability"
00095| 
00096| **What knowledge distribution would have looked like:**
00097| 1. Map who understands which components (prima-code, prima-web, MCP integration, Control Tower)
00098| 2. Identify gaps: "Only Tom understands the MCP hypervisor"
00099| 3. Require pairing on MCP issues: Tom + rotating team member
00100| 4. Rotate ownership: different people lead different components each sprint
00101| 5. Validate: "Can someone other than Tom debug an MCP issue?"
00102| 
00103| **The outcome:** Instead of heroes becoming bottlenecks, understanding spreads. Team confidence increases. Support burden is shared.
00104| 
00105| ## Common Pitfalls
00106| 
00107| 1. **Treating documentation as distribution** - Documentation helps but doesn't replace hands-on experience. Pairing and rotation are essential.
00108| 
00109| 2. **Waiting until heroes burn out** - By then, you've lost institutional knowledge and team morale. Address concentration proactively.
00110| 
00111| 3. **Accepting concentration as inevitable** - "Only Alice understands that" should trigger action, not acceptance.
00112| 
00113| 4. **Optimizing only for short-term velocity** - Pairing and rotation slow you down today but speed you up over time. The Prima team's support burden was a velocity tax they paid repeatedly.
00114| 
00115| ## How You Can Help
00116| 
00117| If you're testing this method:
00118| 
00119| 1. Review the current approach
00120| 2. Map knowledge concentration in your team
00121| 3. Try deliberate distribution (pairing, rotation)
00122| 4. Document your observation—especially the relationship between distribution and team confidence
00123| 
00124| ## Supporting Evidence
00125| 
00126| <RelatedObservations />
00127| 

(End of file - total 127 lines)
</file>
```
```

```
Tool: read

**Input:**
```json
{
  "filePath": "/Users/aaron.west/Documents/Projects/flow-optimized-engineering/docs/docs/field-guides/architecture/methods/emerging/service-boundary-extraction.md"
}
```
**Output:**
```
<file>
00001| ---
00002| sidebar_position: 1
00003| title: "Service Boundary Extraction"
00004| maturity: hypothesized
00005| observations:
00006|   - internal/prima-presidio-containerization
00007| ---
00008| 
00009| import MaturityBadge from '@site/src/components/MaturityBadge';
00010| import RelatedObservations from '@site/src/components/RelatedObservations';
00011| 
00012| # Service Boundary Extraction
00013| 
00014| <MaturityBadge maturity="hypothesized" />
00015| 
00016| Extract components with natural boundaries—different dependency profiles, scaling requirements, or deployment cadences—to dedicated containers, making implicit architectural separation explicit.
00017| 
00018| :::caution Early Stage
00019| This method is still being validated through observations. Results may vary and 
00020| the approach may evolve as we learn more.
00021| :::
00022| 
00023| ## Overview
00024| 
00025| As services grow, they accumulate responsibilities and dependencies that don't belong together. Components with different dependency weights, scaling needs, or deployment cadences get bundled into the same unit. The result: slow builds, coupled deployments, and difficulty reasoning about the system.
00026| 
00027| When a natural boundary exists—different dependency profiles, different scaling requirements, different team ownership, or different release rhythms—extracting that component to a dedicated container makes the boundary explicit. The separation was already there conceptually; containerization enforces it architecturally.
00028| 
00029| Containers provide strong isolation with well-defined interfaces. This enables independent builds, independent deployments, and independent scaling. The tradeoff is network latency and operational complexity—so the boundary must justify the cost.
00030| 
00031| ## FOE Framing
00032| 
00033| This method optimizes for **feedback** (smaller, faster builds) and **confidence** (independent testing and deployment). It requires **understanding** of where natural boundaries exist in your system—if you have to invent an awkward API, the boundary probably isn't natural.
00034| 
00035| ## When to Use
00036| 
00037| Use this method when:
00038| 
00039| - **Heavy dependencies dragging down builds** — A component brings large dependencies that slow CI/CD for the whole service
00040| - **Different scaling requirements** — One part of the system needs to scale independently
00041| - **Different deployment cadences** — A component changes at a different rhythm than the rest
00042| - **Clear API boundary already exists** — The component has a natural request/response interface
00043| - **Team ownership divergence** — Different teams would benefit from independent deployment
00044| 
00045| ## When NOT to Use
00046| 
00047| Avoid this method when:
00048| 
00049| - **Latency-critical paths** — Network overhead is unacceptable
00050| - **Tight coupling by necessity** — Shared memory, frequent calls, complex state
00051| - **Operational overhead not justified** — Marginal benefit doesn't warrant complexity
00052| - **No clear boundary exists** — If you have to invent an awkward API, reconsider
00053| - **Can't measure the impact** — If you won't know whether it helped, reconsider
00054| 
00055| ## How It Works
00056| 
00057| ### Prerequisites
00058| 
00059| Before starting:
00060| - A service with identifiable components that could live behind a network boundary
00061| - Container orchestration infrastructure (Docker Compose, Kubernetes, etc.)
00062| - Ability to measure before/after (build times, image sizes, startup times)
00063| 
00064| ### Step 1: Identify the Boundary
00065| 
00066| Map your service's components and dependencies. Ask: What's heavy? What's different? What's separable?
00067| 
00068| Look for signals:
00069| - Dependencies that dominate your lock file
00070| - Components with different scaling characteristics
00071| - Functionality owned by different teams
00072| - Features that change at different rates
00073| 
00074| If the boundary isn't obvious, it may not be natural enough to extract.
00075| 
00076| ### Step 2: Measure the Baseline
00077| 
00078| Before extracting, capture metrics:
00079| - Build time (local and CI)
00080| - Image size
00081| - Startup time
00082| - Latency on paths that will cross the new boundary
00083| 
00084| Without baselines, you can't prove the investment paid off.
00085| 
00086| ### Step 3: Define the Interface
00087| 
00088| Design the API between your main service and the extracted component:
00089| - REST or gRPC endpoints
00090| - Request/response contracts
00091| - Timeout configuration
00092| - Error handling for when the container is unavailable
00093| 
00094| The interface should feel natural. If it's awkward, reconsider whether this boundary should exist.
00095| 
00096| ### Step 4: Extract and Containerize
00097| 
00098| 1. Find or create a container image for the component
00099| 2. Create a client in your main service to communicate with the container
00100| 3. Remove the heavy dependencies from your main service
00101| 4. Add the container to your orchestration (Docker Compose, Kubernetes, etc.)
00102| 5. Update configuration to point to the containerized service
00103| 
00104| ### Step 5: Establish Independent CI/CD
00105| 
00106| Create a separate pipeline for the extracted component:
00107| - Independent versioning
00108| - Independent testing
00109| - Independent deployment
00110| 
00111| This enables the component to evolve without forcing main service redeployments.
00112| 
00113| ### Step 6: Validate and Monitor
00114| 
00115| After extraction:
00116| - Measure the same metrics from Step 2
00117| - Compare against baselines
00118| - Monitor production reliability
00119| - Track latency across the new boundary
00120| - Document failure modes and recovery behavior
00121| 
00122| ## Example
00123| 
00124| From the Prima Presidio observation:
00125| 
00126| **The Problem:** The main service embedded Presidio PII analyzer, bringing PyTorch, spaCy, and transformers dependencies. Every build pulled these heavy ML libraries, even though PII detection was just one capability.
00127| 
00128| **The Extraction:**
00129| 1. Identified the boundary: PII detection had a clear request/response interface
00130| 2. Found an existing container: `mcr.microsoft.com/presidio-analyzer:2.2.360`
00131| 3. Created a REST client (`aiox/presidio.py`) with 30-second timeout
00132| 4. Removed 6 heavy packages from the main service
00133| 5. Added Presidio to Docker Compose as `presidio-analyzer:5002`
00134| 6. Created dedicated CI/CD pipeline
00135| 
00136| **The Result:** ~663 lines removed from the dependency lock file, independent versioning validated when the Presidio container was updated separately from the main service.
00137| 
00138| **The Gap:** Baseline metrics weren't captured, so the improvement in build time and image size couldn't be quantified. This is a common pitfall—measure before you change.
00139| 
00140| ## Common Pitfalls
00141| 
00142| 1. **Skipping baseline measurements** — You can't prove ROI without before/after data. Capture build time, image size, and startup time before extracting.
00143| 
00144| 2. **Extracting without a natural boundary** — Awkward APIs indicate forced separation. If the interface feels clunky, the boundary probably isn't natural.
00145| 
00146| 3. **Ignoring operational complexity** — More containers means more to monitor, orchestrate, and debug. Ensure the benefit justifies this cost.
00147| 
00148| 4. **Forgetting failure modes** — What happens when the extracted service is unavailable? Design for graceful degradation or clear failure.
00149| 
00150| ## How You Can Help
00151| 
00152| If you're testing this method:
00153| 
00154| 1. Review the current approach
00155| 2. Try extracting a component in your context—especially for triggers beyond heavy dependencies (scaling, deployment cadence, team ownership)
00156| 3. Document your observation with baseline measurements
00157| 4. Share what worked and what didn't
00158| 
00159| We're particularly interested in:
00160| - Extractions motivated by scaling requirements
00161| - Extractions motivated by team ownership boundaries
00162| - Cases where extraction was attempted but reversed
00163| 
00164| ## Supporting Evidence
00165| 
00166| <RelatedObservations observations={[
00167|   { slug: 'internal/prima-presidio-containerization', title: 'Containerizing Heavy ML Dependencies', status: 'completed' }
00168| ]} />
00169| 

(End of file - total 169 lines)
</file>
```
```

---

## Assistant (Curator · claude-opus-4-5 · 120.0s)

_Thinking:_

I've now read all 11 field guide method files. Let me summarize what I've found so far and then generate the report. I need to check:

1. **Observations** (24 files):
   - Frontmatter required fields
   - Content sections
   - <RelatedMethods /> component
   - Bidirectional links

2. **Methods** (11 files):
   - Frontmatter required fields
   - Content sections
   - <RelatedObservations /> component
   - Bidirectional links

Let me analyze the data I've collected:

### Observations:
All 24 observations have been read. Let me check each one:

1. **liedtka-2018-design-thinking-works.md** - Has: title, status, source_type, source (authors, org, year, url), methods, sidebar_position. Has all 7 sections. Has <RelatedMethods />. ✓

2. **dora-2023-user-centricity.md** - Has all required fields. Has all 7 sections. Has <RelatedMethods />. ✓

3. **prima-bdd-api-testing-adoption.md** - Has all required fields for internal. Has all 7 sections. Has <RelatedMethods />. ✓

4. **ebay-contract-testing-adoption.md** - Has all required fields for external. Has all 7 sections. Has <RelatedMethods />. ✓

5. **robinson-consumer-driven-contracts.md** - Has all required fields for external. Has all 7 sections. Has <RelatedMethods />. ✓

6. **nummi-plant-transformation.md** - Has all required fields for external. Has all 7 sections. Has <RelatedMethods />. ✓

7. **thoughtworks-cdc-testing.md** - Has all required fields for external. Has all 7 sections. 

Has <RelatedMethods />. ✓

8. **prima-microservices-architecture.md** - Has all required fields for internal. Has all 7 sections. Has <RelatedMethods />. ✓

9. **ozkan-2023-ddd-industrial-refactoring.md** - Has all required fields for external. Has all 7 sections. Has <RelatedMethods />. ✓

10. **team-topologies-bounded-contexts.md** - Has all required fields for external. Has all 7 sections. Has <RelatedMethods />. ✓

11. **ieee-2024-ddd-micro

-services.md** - Has all required fields for external. Has all 7 sections. Has <RelatedMethods />. ✓

12. **prima-presidio-containerization.md** - Has all required fields for internal. Has all 7 sections. Has <RelatedMethods />. ✓

13. **ddd-bounded-contexts.md** - Has all required fields for external. Has all 7 sections. Has <RelatedMethods />. ✓

14. **dora-four-key-metrics.md** - Has all required fields for external. Has all 7 sections. Has <RelatedMethods />. ✓

15. **dora-loosely-coupled-architecture.md** - Has all required fields for external. Has all 7 sections. Has <RelatedMethods />. ✓

16. **fowler-lewis

-microservices-definition.md** - Has all required fields for external. Has all 7 sections. Has <RelatedMethods />. ✓

Continuing through the remaining documents: team-topologies-inverse-conway.md, bdd-industrial-study-2018.md, google-project-aristotle.md, and bdd-adoption-github-study-2020.md all meet the criteria with proper external fields, complete section counts, and RelatedMethods components included.

21. **tdd-defect-reduction-study.md** - Has all required fields for external. Has all 7 sections. Has <RelatedMethods />. ✓

22. **bdd-maintenance-challenges-2018.md** - Has all required fields for external. Has all 7 sections. Has <RelatedMethods />. ✓

23. **bdd-systematic-review-2023.md** - Has all required fields for external. Has all 7 sections. Has <RelatedMethods />. ✓

24. **prima-oss-fork-strategy.md** - Has all required fields for internal. Has all 7 sections. Has <RelatedMethods />. ✓

Moving into the Methods section with root-cause-first-debugging.md marked as hypothesized maturity in the emerging folder, observations documented.

The next four methods—persistent-planning-state, test-driven-agent-development, verification-before-completion—all follow the same pattern: hypothesized maturity, emerging folder placement, empty observations arrays (acceptable for this stage), and <RelatedObservations /> tags present. Consumer-contract-testing shifts to validated maturity in the established folder with external observations linked.

Early-feedback-loop-investment and system-over-individuals are both observing-stage entries in emerging folders, each with internal and external observations respectively. True-microservices reaches validated status with multiple observations documented.

Understanding-first-protocol-adoption and knowledge-distribution-as-reliability follow the same pattern—observing maturity in emerging folders, both referencing the prima-oss-fork-strategy observation. Service-boundary-extraction presents an interesting case: it's marked as hypothesized but includes an observation from prima-presidio-containerization, which seems inconsistent since hypothesized methods shouldn't require observations.

Now checking the bidirectional relationships. Consumer-contract-testing connects to three external observations spanning thoughtworks, robinson, and ebay implementations. Early-feedback-loop-investment ties to both internal fork strategy and bdd-api-testing work. System-over-individuals references the nummi transformation, while true-microservices branches across multiple internal and external observations including team topologies and fowler-lewis microservices patterns.

Understanding-first-protocol-adoption and knowledge-distribution-as-reliability both point back to the prima fork strategy, and service-boundary-extraction connects to the presidio containerization work. On the reverse side, several observations list methods in their frontmatter—design-thinking-works references double-diamond methods, user-centricity points to discover-phase and deployment-frequency, and prima-bdd-api-testing-adoption connects to bdd methods.

The remaining observations map to specific emerging practices: contract-testing appears across ebay, robinson, and thoughtworks implementations; true-microservices shows up in prima's architecture, team-topologies work, presidio containerization, ddd-bounded-contexts, dora metrics, loosely-coupled-architecture, fowler-lewis definition, and inverse-conway patterns. Domain-driven-design methods span ozkan's industrial refactoring, team-topologies, and ieee's microservices study. BDD methods are referenced across the industrial study, google's project-aristotle (three-amigos and discovery-workshops), github adoption study, tdd defect reduction, and maintenance challenges research.

Now I'm checking the bidirectional relationships. The consumer-contract-testing method appears in thoughtworks-cdc-testing, but there's a discrepancy—the observation references it under `emerging/` while the method file itself might be categorized under `established/`. This needs verification to ensure consistency across the knowledge graph. I'm finding the same pattern across true-microservices observations. All six references are pointing to `architecture/methods/emerging/true-microservices` when they should direct to `architecture/methods/established/true-microservices`. The prima-presidio-containerization observation has an additional incorrect path for service-boundary-extraction that also needs to be moved from emerging to established. The dora-loosely-coupled-architecture observation appears to have a truncated path that needs verification. nd the observation files show `methods: - architecture/methods/emerging/true-microservices`, but the actual method file is located in `established/`. This is a path mismatch—the observations reference `emerging` when they should reference `established` according to the skill's frontmatter format of `guide-name/methods/established/method-slug`. This suggests a systematic issue where many observations have incorrect paths that need correction.

Checking naming conventions and folder structure, all file names follow kebab-case correctly. The methods like true-microservices and consumer-contract-testing are properly placed in `established/` folders with `validated` maturity status. Now examining the content sections, I'm verifying that each method includes the required components: Overview, When to Use, When NOT to Use, How It Works, Example, and Common Pitfalls, with emerging methods also including How You Can Help.

Most methods have all required sections present—root-cause-first-debugging, persistent-planning-state, test-driven-agent-development, verification-before-completion, early-feedback-loop-investment, and system-over-individuals all check out. Consumer-contract-testing appropriately omits "How You Can Help" since it's established rather than emerging. True-microservices has Overview, When to Use, When NOT to Use, How It Works, and Example sections confirmed.

The main problem I'm seeing is bidirectional link path inconsistencies. Several observations point to consumer-contract-testing using the wrong directory—they reference it in `emerging` when it actually lives in `established`. This affects thoughtworks-cdc-testing, robinson-consumer-driven-contracts, and ebay-contract-testing, all of which need their paths corrected to point to the right location.

Similarly, true-microservices has the same issue across multiple observations: prima-microservices-architecture, prima-presidio-containerization, team-topologies-bounded-contexts, team-topologies-inverse-conway, fowler-lewis-microservices-definition, ddd-bounded-contexts, dora-loosely-coupled-architecture, and dora-four-key-metrics all reference it in `emerging` when it should be `established`. That's 8 observations with the same misdirected path. In total, 11 observations have incorrect bidirectional links that can be fixed by updating their frontmatter to point to the correct method locations.

I've now completed scanning all files. Let me compile the validation results and generate the health report.

---

# Field Guide Health Report

**Audit Date:** 2026-01-29 (Thursday)
**Files Scanned:** 24 observations, 11 methods, 45 external framework methods

## Summary

| Category | Issues | Auto-Fixable |
|----------|--------|--------------|
| Frontmatter | 0 | 0 |
| Bidirectional Links | 11 | 11 |
| Naming/Location | 0 | 0 |
| Content Completeness | 0 | 0 |
| Orphaned Content | 0 | 0 |
| Parse Errors | 0 | 0 |
| **Total** | **11** | **11** |

## Issues Found

### Bidirectional Link Issues

All 11 issues are **path mismatches** - observations reference methods in `emerging/` but the actual method files are in `established/`:

#### Observations referencing `consumer-contract-testing` with wrong path:

| Observation | Current Path | Correct Path |
|-------------|--------------|--------------|
| `external/thoughtworks-cdc-testing` | `architecture/methods/emerging/consumer-contract-testing` | `architecture/methods/established/consumer-contract-testing` |
| `external/robinson-consumer-driven-contracts` | `architecture/methods/emerging/consumer-contract-testing` | `architecture/methods/established/consumer-contract-testing` |
| `external/ebay-contract-testing-adoption` | `architecture/methods/emerging/consumer-contract-testing` | `architecture/methods/established/consumer-contract-testing` |

#### Observations referencing `true-microservices` with wrong path:

| Observation | Current Path | Correct Path |
|-------------|--------------|--------------|
| `internal/prima-microservices-architecture` | `architecture/methods/emerging/true-microservices` | `architecture/methods/established/true-microservices` |
| `internal/prima-presidio-containerization` | `architecture/methods/emerging/true-microservices` | `architecture/methods/established/true-microservices` |
| `external/team-topologies-bounded-contexts` | `architecture/methods/emerging/true-microservices` | `architecture/methods/established/true-microservices` |
| `external/team-topologies-inverse-conway` | `architecture/methods/emerging/true-microservices` | `architecture/methods/established/true-microservices` |
| `external/fowler-lewis-microservices-definition` | `architecture/methods/emerging/true-microservices` | `architecture/methods/established/true-microservices` |
| `external/ddd-bounded-contexts` | `architecture/methods/emerging/true-microservices` | `architecture/methods/established/true-microservices` |
| `external/dora-loosely-coupled-architecture` | `architecture/methods/emerging/true-microservices` | `architecture/methods/established/true-microservices` |
| `external/dora-four-key-metrics` | `architecture/methods/emerging/true-microservices` | `architecture/methods/established/true-microservices` |

### No Other Issues

- ✅ All frontmatter fields present and valid
- ✅ All content sections present
- ✅ All `<RelatedMethods />` and `<RelatedObservations />` components present
- ✅ All file names are kebab-case
- ✅ All maturity levels align with folder locations
- ✅ No orphaned content (completed observations have methods, validated methods have observations)
- ✅ No parse errors

---

```
Tool: question

**Input:**
```json
{
  "questions": [
    {
      "header": "Apply fixes",
      "question": "11 issues can be auto-fixed (path corrections in observation frontmatter). Proceed?",
      "options": [
        {
          "label": "Fix all",
          "description": "Apply all auto-fixes now"
        },
        {
          "label": "Show details",
          "description": "List exactly what will be changed"
        },
        {
          "label": "Skip fixes",
          "description": "Leave everything as-is"
        }
      ],
      "multiple": false
    }
  ]
}
```
**Output:**
```
User has answered your questions: "11 issues can be auto-fixed (path corrections in observation frontmatter). Proceed?"="Fix all". You can now continue with the user's answers in mind.
```
```

---

## Assistant (Curator · claude-opus-4-5 · 18.8s)

_Thinking:_

The user selected "Fix all". Let me apply the 11 fixes to the observation files, changing `emerging` to `established` in the method paths.

Applying all 11 fixes now...

```
Tool: edit

**Input:**
```json
{
  "filePath": "/Users/aaron.west/Documents/Projects/flow-optimized-engineering/docs/docs/field-guides/observations/external/thoughtworks-cdc-testing.md",
  "oldString": "methods:\n  - architecture/methods/emerging/consumer-contract-testing",
  "newString": "methods:\n  - architecture/methods/established/consumer-contract-testing"
}
```
**Output:**
```
Edit applied successfully.
```
```

```
Tool: edit

**Input:**
```json
{
  "filePath": "/Users/aaron.west/Documents/Projects/flow-optimized-engineering/docs/docs/field-guides/observations/external/robinson-consumer-driven-contracts.md",
  "oldString": "methods:\n  - architecture/methods/emerging/consumer-contract-testing",
  "newString": "methods:\n  - architecture/methods/established/consumer-contract-testing"
}
```
**Output:**
```
Edit applied successfully.
```
```

```
Tool: edit

**Input:**
```json
{
  "filePath": "/Users/aaron.west/Documents/Projects/flow-optimized-engineering/docs/docs/field-guides/observations/external/ebay-contract-testing-adoption.md",
  "oldString": "methods:\n  - architecture/methods/emerging/consumer-contract-testing",
  "newString": "methods:\n  - architecture/methods/established/consumer-contract-testing"
}
```
**Output:**
```
Edit applied successfully.
```
```

```
Tool: edit

**Input:**
```json
{
  "filePath": "/Users/aaron.west/Documents/Projects/flow-optimized-engineering/docs/docs/field-guides/observations/internal/prima-microservices-architecture.md",
  "oldString": "methods:\n  - architecture/methods/emerging/true-microservices",
  "newString": "methods:\n  - architecture/methods/established/true-microservices"
}
```
**Output:**
```
Edit applied successfully.
```
```

```
Tool: edit

**Input:**
```json
{
  "filePath": "/Users/aaron.west/Documents/Projects/flow-optimized-engineering/docs/docs/field-guides/observations/internal/prima-presidio-containerization.md",
  "oldString": "methods:\n  - architecture/methods/emerging/service-boundary-extraction\n  - architecture/methods/emerging/true-microservices",
  "newString": "methods:\n  - architecture/methods/emerging/service-boundary-extraction\n  - architecture/methods/established/true-microservices"
}
```
**Output:**
```
Edit applied successfully.
```
```

```
Tool: edit

**Input:**
```json
{
  "filePath": "/Users/aaron.west/Documents/Projects/flow-optimized-engineering/docs/docs/field-guides/observations/external/team-topologies-bounded-contexts.md",
  "oldString": "methods:\n  - external-frameworks/domain-driven-design/methods/bounded-context\n  - external-frameworks/domain-driven-design/methods/context-mapping\n  - external-frameworks/domain-driven-design/methods/subdomains\n  - architecture/methods/emerging/true-microservices",
  "newString": "methods:\n  - external-frameworks/domain-driven-design/methods/bounded-context\n  - external-frameworks/domain-driven-design/methods/context-mapping\n  - external-frameworks/domain-driven-design/methods/subdomains\n  - architecture/methods/established/true-microservices"
}
```
**Output:**
```
Edit applied successfully.
```
```

```
Tool: edit

**Input:**
```json
{
  "filePath": "/Users/aaron.west/Documents/Projects/flow-optimized-engineering/docs/docs/field-guides/observations/external/team-topologies-inverse-conway.md",
  "oldString": "methods:\n  - architecture/methods/emerging/true-microservices",
  "newString": "methods:\n  - architecture/methods/established/true-microservices"
}
```
**Output:**
```
Edit applied successfully.
```
```

```
Tool: edit

**Input:**
```json
{
  "filePath": "/Users/aaron.west/Documents/Projects/flow-optimized-engineering/docs/docs/field-guides/observations/external/fowler-lewis-microservices-definition.md",
  "oldString": "methods:\n  - architecture/methods/emerging/true-microservices",
  "newString": "methods:\n  - architecture/methods/established/true-microservices"
}
```
**Output:**
```
Edit applied successfully.
```
```

```
Tool: edit

**Input:**
```json
{
  "filePath": "/Users/aaron.west/Documents/Projects/flow-optimized-engineering/docs/docs/field-guides/observations/external/ddd-bounded-contexts.md",
  "oldString": "methods:\n  - architecture/methods/emerging/true-microservices",
  "newString": "methods:\n  - architecture/methods/established/true-microservices"
}
```
**Output:**
```
Edit applied successfully.
```
```

```
Tool: edit

**Input:**
```json
{
  "filePath": "/Users/aaron.west/Documents/Projects/flow-optimized-engineering/docs/docs/field-guides/observations/external/dora-loosely-coupled-architecture.md",
  "oldString": "methods:\n  - architecture/methods/emerging/true-microservices",
  "newString": "methods:\n  - architecture/methods/established/true-microservices"
}
```
**Output:**
```
Edit applied successfully.
```
```

```
Tool: edit

**Input:**
```json
{
  "filePath": "/Users/aaron.west/Documents/Projects/flow-optimized-engineering/docs/docs/field-guides/observations/external/dora-four-key-metrics.md",
  "oldString": "methods:\n  - external-frameworks/dora/methods/deployment-frequency\n  - external-frameworks/dora/methods/lead-time-for-changes\n  - external-frameworks/dora/methods/change-failure-rate\n  - external-frameworks/dora/methods/time-to-restore-service\n  - architecture/methods/emerging/true-microservices",
  "newString": "methods:\n  - external-frameworks/dora/methods/deployment-frequency\n  - external-frameworks/dora/methods/lead-time-for-changes\n  - external-frameworks/dora/methods/change-failure-rate\n  - external-frameworks/dora/methods/time-to-restore-service\n  - architecture/methods/established/true-microservices"
}
```
**Output:**
```
Edit applied successfully.
```
```

---

## Assistant (Curator · claude-opus-4-5 · 5.9s)

_Thinking:_

All 11 fixes have been applied. Now I need to verify by re-reading the affected files to confirm the fixes were applied correctly.

All 11 fixes applied. Now verifying...

```
Tool: grep

**Input:**
```json
{
  "pattern": "architecture/methods/emerging/true-microservices",
  "path": "/Users/aaron.west/Documents/Projects/flow-optimized-engineering/docs/docs/field-guides/observations"
}
```
**Output:**
```
No files found
```
```

```
Tool: grep

**Input:**
```json
{
  "pattern": "architecture/methods/emerging/consumer-contract-testing",
  "path": "/Users/aaron.west/Documents/Projects/flow-optimized-engineering/docs/docs/field-guides/observations"
}
```
**Output:**
```
No files found
```
```

```
Tool: grep

**Input:**
```json
{
  "pattern": "architecture/methods/established/true-microservices",
  "path": "/Users/aaron.west/Documents/Projects/flow-optimized-engineering/docs/docs/field-guides/observations"
}
```
**Output:**
```
Found 8 matches
/Users/aaron.west/Documents/Projects/flow-optimized-engineering/docs/docs/field-guides/observations/external/dora-four-key-metrics.md:
  Line 16:   - architecture/methods/established/true-microservices

/Users/aaron.west/Documents/Projects/flow-optimized-engineering/docs/docs/field-guides/observations/external/dora-loosely-coupled-architecture.md:
  Line 12:   - architecture/methods/established/true-microservices

/Users/aaron.west/Documents/Projects/flow-optimized-engineering/docs/docs/field-guides/observations/external/ddd-bounded-contexts.md:
  Line 12:   - architecture/methods/established/true-microservices

/Users/aaron.west/Documents/Projects/flow-optimized-engineering/docs/docs/field-guides/observations/external/fowler-lewis-microservices-definition.md:
  Line 12:   - architecture/methods/established/true-microservices

/Users/aaron.west/Documents/Projects/flow-optimized-engineering/docs/docs/field-guides/observations/external/team-topologies-inverse-conway.md:
  Line 12:   - architecture/methods/established/true-microservices

/Users/aaron.west/Documents/Projects/flow-optimized-engineering/docs/docs/field-guides/observations/external/team-topologies-bounded-contexts.md:
  Line 15:   - architecture/methods/established/true-microservices

/Users/aaron.west/Documents/Projects/flow-optimized-engineering/docs/docs/field-guides/observations/internal/prima-presidio-containerization.md:
  Line 8:   - architecture/methods/established/true-microservices

/Users/aaron.west/Documents/Projects/flow-optimized-engineering/docs/docs/field-guides/observations/internal/prima-microservices-architecture.md:
  Line 7:   - architecture/methods/established/true-microservices
```
```

```
Tool: grep

**Input:**
```json
{
  "pattern": "architecture/methods/established/consumer-contract-testing",
  "path": "/Users/aaron.west/Documents/Projects/flow-optimized-engineering/docs/docs/field-guides/observations"
}
```
**Output:**
```
Found 3 matches
/Users/aaron.west/Documents/Projects/flow-optimized-engineering/docs/docs/field-guides/observations/external/ebay-contract-testing-adoption.md:
  Line 12:   - architecture/methods/established/consumer-contract-testing

/Users/aaron.west/Documents/Projects/flow-optimized-engineering/docs/docs/field-guides/observations/external/robinson-consumer-driven-contracts.md:
  Line 12:   - architecture/methods/established/consumer-contract-testing

/Users/aaron.west/Documents/Projects/flow-optimized-engineering/docs/docs/field-guides/observations/external/thoughtworks-cdc-testing.md:
  Line 12:   - architecture/methods/established/consumer-contract-testing
```
```

---

## Assistant (Curator · claude-opus-4-5 · 10.5s)

_Thinking:_

The verification shows:
1. No more occurrences of `architecture/methods/emerging/true-microservices` in observations ✓
2. No more occurrences of `architecture/methods/emerging/consumer-contract-testing` in observations ✓
3. 8 correct references to `architecture/methods/established/true-microservices` ✓
4. 3 correct references to `architecture/methods/established/consumer-contract-testing` ✓

All fixes have been applied successfully and verified. Let me provide the final verification report.

## Verification

✅ **Applied 11 fixes successfully.**

**Fixes applied:**
1. `thoughtworks-cdc-testing.md` - Updated path to `established/consumer-contract-testing`
2. `robinson-consumer-driven-contracts.md` - Updated path to `established/consumer-contract-testing`
3. `ebay-contract-testing-adoption.md` - Updated path to `established/consumer-contract-testing`
4. `prima-microservices-architecture.md` - Updated path to `established/true-microservices`
5. `prima-presidio-containerization.md` - Updated path to `established/true-microservices`
6. `team-topologies-bounded-contexts.md` - Updated path to `established/true-microservices`
7. `team-topologies-inverse-conway.md` - Updated path to `established/true-microservices`
8. `fowler-lewis-microservices-definition.md` - Updated path to `established/true-microservices`
9. `ddd-bounded-contexts.md` - Updated path to `established/true-microservices`
10. `dora-loosely-coupled-architecture.md` - Updated path to `established/true-microservices`
11. `dora-four-key-metrics.md` - Updated path to `established/true-microservices`

**Verification results:**
- ✅ 0 occurrences of `architecture/methods/emerging/true-microservices` in observations
- ✅ 0 occurrences of `architecture/methods/emerging/consumer-contract-testing` in observations
- ✅ 8 correct references to `architecture/methods/established/true-microservices`
- ✅ 3 correct references to `architecture/methods/established/consumer-contract-testing`

---

# Field Guide Health Report (Post-Fix)

**Audit Date:** 2026-01-29
**Files Scanned:** 24 observations, 11 methods, 45 external framework methods

## Summary

✅ **Field Guide is healthy!** All 11 issues have been fixed.

| Category | Issues | 
|----------|--------|
| Frontmatter | 0 |
| Bidirectional Links | 0 |
| Naming/Location | 0 |
| Content Completeness | 0 |
| Orphaned Content | 0 |
| Parse Errors | 0 |
| **Total** | **0** |

---

