// ============================================================================
// FOE KNOWLEDGE GRAPH - ALL NODES
// Consolidated extraction from FOE documentation
// Generated: 2026-02-01
// ============================================================================

// ============================================================================
// PRINCIPLES (3)
// ============================================================================

CREATE (:Principle {
  id: 'understanding',
  name: 'Optimize for Understanding',
  shortName: 'Understanding',
  description: 'Understanding is the ability to form accurate mental models: to predict how a system will behave before you change it.',
  order: 1,
  question: 'What is the system?',
  failureMode: 'Acting blind',
  cognitiveFunction: 'Sensemaking',
  whatItProtects: 'Mental model integrity',
  whatItEnables: 'Confident reasoning about change'
});

CREATE (:Principle {
  id: 'fast-feedback',
  name: 'Optimize for Fast Feedback',
  shortName: 'Fast Feedback',
  description: 'Fast feedback is about learning faster: closing the gap between making a decision and discovering whether that decision was right.',
  order: 2,
  question: 'Is our model accurate?',
  failureMode: 'Believing wrongly',
  cognitiveFunction: 'Learning & Calibration',
  whatItProtects: 'Accurate beliefs',
  whatItEnables: 'Course correction before failure'
});

CREATE (:Principle {
  id: 'confidence',
  name: 'Optimize for Confidence',
  shortName: 'Confidence',
  description: 'Confidence is not certainty. It is willingness to act under uncertainty because risk is bounded, visible, and reversible.',
  order: 3,
  question: 'Can we act safely?',
  failureMode: 'Knowing but not doing',
  cognitiveFunction: 'Agency & Risk Tolerance',
  whatItProtects: 'Willingness to act',
  whatItEnables: 'Speed without recklessness'
});

// ============================================================================
// MODELS (15+)
// ============================================================================

CREATE (:Model {id: 'cognitive-triangle', name: 'The Cognitive Triangle', description: 'The three optimizations form a closed system where each enables the others.', visualType: 'triangle', components: ['understanding', 'fast-feedback', 'confidence']});
CREATE (:Model {id: 'j-curve', name: 'The J-Curve', description: 'Every significant transformation follows a predictable pattern: things get worse before they get better.', visualType: 'curve', components: ['initial-decline', 'bottom', 'recovery', 'exceeding-baseline']});
CREATE (:Model {id: 'foe-triad', name: 'FOE Triad', description: 'Transformation requires coordinated change across People, Process, and Technology.', visualType: 'triangle', components: ['people', 'process', 'technology']});
CREATE (:Model {id: 'devx-maturity', name: 'DevX Maturity Model', description: 'Four-level scale: Ad Hoc, Defined, Measured, Optimized.', visualType: 'hierarchy', components: ['ad-hoc', 'defined', 'measured', 'optimized']});
CREATE (:Model {id: 'feedback-stack', name: 'Feedback Stack', description: 'Different feedback loops serve different purposes at different speeds.', visualType: 'stack', components: ['static-analysis', 'unit-tests', 'integration-tests', 'deployment', 'monitoring']});
CREATE (:Model {id: 'cognitive-load-theory', name: 'Cognitive Load Theory', description: 'Three types of cognitive load: intrinsic, extraneous, germane.', visualType: 'hierarchy', components: ['intrinsic-load', 'extraneous-load', 'germane-load']});
CREATE (:Model {id: 'hidden-dimensions', name: 'Hidden Dimensions', description: 'Epistemic control, cognitive load distribution, error containment, decision bandwidth, trust formation.', visualType: 'list', components: ['epistemic-control', 'cognitive-load-distribution', 'error-containment', 'decision-bandwidth', 'trust-formation']});
CREATE (:Model {id: 'decision-types', name: 'Type 1 vs Type 2 Decisions', description: 'One-way doors requiring deliberation vs two-way doors favoring speed.', visualType: 'binary', components: ['irreversible-decisions', 'reversible-decisions']});
CREATE (:Model {id: 'three-pillars-observability', name: 'Three Pillars of Observability', description: 'Metrics (what), Logs (why), Traces (where).', visualType: 'triangle', components: ['metrics', 'logs', 'traces']});
CREATE (:Model {id: 'feedback-tiers', name: 'Feedback Tiers', description: 'Instant (<1s), Fast (<1m), Pipeline (<10m).', visualType: 'hierarchy', components: ['instant-feedback', 'fast-feedback-tier', 'pipeline-feedback']});

// ============================================================================
// METAPHORS (11)
// ============================================================================

// Original FOE Metaphors
CREATE (:Metaphor {id: 'gauges-and-instrumentation', name: 'Gauges & Instrumentation', sourceDomain: 'aviation/motorsport', keyInsight: 'You cannot go fast without instruments.', whenToUse: 'observability, monitoring, metrics'});
CREATE (:Metaphor {id: 'the-cockpit', name: 'The Cockpit', sourceDomain: 'aviation', keyInsight: 'Operators need visibility and control, not implementation details.', whenToUse: 'developer experience, platform design'});
CREATE (:Metaphor {id: 'pets-vs-cattle', name: 'Pets vs. Cattle', sourceDomain: 'agriculture/infrastructure', keyInsight: 'Pets dont scale.', whenToUse: 'infrastructure, scaling, disaster recovery'});
CREATE (:Metaphor {id: 'operating-envelope', name: 'Operating Envelope', sourceDomain: 'aviation', keyInsight: 'The envelope enables speed.', whenToUse: 'guardrails, policy, risk management'});
CREATE (:Metaphor {id: 'receipts', name: 'Receipts', sourceDomain: 'finance/legal', keyInsight: 'Good systems generate receipts automatically.', whenToUse: 'audit, compliance, debugging'});

// Historical Anecdotes
CREATE (:Metaphor {id: 'apollo-13-mailbox', name: 'Apollo 13 Mailbox', sourceDomain: 'space exploration', keyInsight: 'Constraints enable creativity when you trust your simulations.', description: 'When CO2 levels rose dangerously, engineers improvised a scrubber from duct tape, cardboard, and plastic bags - working the problem with available materials. They trusted thousands of hours of simulation to validate the fix before astronauts built it.', whenToUse: 'bounded constraints, improvisation, simulation as feedback'});
CREATE (:Metaphor {id: 'knight-capital-45-minutes', name: 'Knight Capital 45 Minutes', sourceDomain: 'finance', keyInsight: 'Without a kill switch, a bad deployment becomes an existential event.', description: 'In 2012, Knight Capital deployed code that accidentally activated dead test code. In 45 minutes they lost $440 million. There was no rollback, no kill switch, no circuit breaker. The blast radius was the entire company.', whenToUse: 'rollback capability, blast radius, deployment confidence, reversible decisions'});
CREATE (:Metaphor {id: 'challenger-ignored-engineers', name: 'Challenger Ignored Engineers', sourceDomain: 'space exploration', keyInsight: 'When hierarchy overrides evidence, people die.', description: 'The night before Challenger launched, Thiokol engineers warned that O-rings would fail in cold weather. Management overrode them - schedule pressure and authority bias won. The engineers were right. Seven astronauts died.', whenToUse: 'authority bias, epistemic control, cost of ignoring feedback, psychological safety'});
CREATE (:Metaphor {id: 'gawande-surgical-checklist', name: 'Gawande Surgical Checklist', sourceDomain: 'medicine', keyInsight: 'Simple cognitive offloading saves lives.', description: 'Atul Gawande introduced a 19-item surgical checklist to WHO hospitals. Deaths dropped 47%. Not because surgeons learned new skills - because the system remembered what humans forget under pressure.', whenToUse: 'cognitive offloading, the system remembers, discipline over heroics'});
CREATE (:Metaphor {id: 'three-mile-island-alarms', name: 'Three Mile Island 100 Alarms', sourceDomain: 'nuclear', keyInsight: 'Too much information is the same as no information.', description: 'During the Three Mile Island accident, operators faced 100+ simultaneous alarms. They could not form an accurate mental model. Overwhelmed by data, they made decisions that worsened the crisis. The instrumentation failed them.', whenToUse: 'cognitive overload, understanding failure, instrumentation quality, signal vs noise'});
CREATE (:Metaphor {id: 'toyota-andon-cord', name: 'Toyota Andon Cord', sourceDomain: 'manufacturing', keyInsight: 'Anyone can stop the line. Thats not chaos - thats quality.', description: 'At Toyota, any worker can pull the andon cord to stop the entire production line if they see a defect. Management thanks them. This inversion of hierarchy - empowering the person closest to the problem - is why Toyota quality became legendary.', whenToUse: 'psychological safety, confidence to act, system over individuals, empowerment'});

// ============================================================================
// ANTI-PATTERNS (6)
// ============================================================================

CREATE (:AntiPattern {id: 'vibe-coding', name: 'Vibe Coding', description: 'Writing code based on intuition without systematic verification.', foePrinciple: 'confidence', symptoms: ['It works on my machine', 'Test coverage unknown', 'Fear of refactoring']});
CREATE (:AntiPattern {id: 'heroic-engineering', name: 'Heroic Engineering', description: 'Relying on exceptional individual effort over systematic capability.', foePrinciple: 'understanding', symptoms: ['Critical systems one person understands', 'Burnout among top performers', 'Knowledge hoarding']});
CREATE (:AntiPattern {id: 'modernization-theater', name: 'Modernization Theater', description: 'Adopting new technology without changing underlying practices.', foePrinciple: 'fast-feedback', symptoms: ['New tools same results', 'Cloud bills increased without velocity improvement']});
CREATE (:AntiPattern {id: 'tool-worship', name: 'Tool Worship', description: 'Believing the right tool will solve process and discipline problems.', foePrinciple: 'confidence', symptoms: ['We need a tool for that', 'Shelfware', 'Constant tool switching']});
CREATE (:AntiPattern {id: 'velocity-theater', name: 'Velocity Theater', description: 'Measuring activity metrics instead of outcome metrics.', foePrinciple: 'fast-feedback', symptoms: ['Celebrating commit counts', 'Story points as performance measures']});
CREATE (:AntiPattern {id: 'certainty-theater', name: 'Certainty Theater', description: 'Demanding or performing certainty that doesnt exist.', foePrinciple: 'flow', symptoms: ['False precision in estimates', 'Blame when estimates prove wrong']});

// ============================================================================
// MATURITY LEVELS (5)
// ============================================================================

CREATE (:MaturityLevel {id: 'level-0', level: 0, name: 'Fragile', tagline: 'We find out late', description: 'Delivery outcomes are unpredictable. Knowledge lives in heads.'});
CREATE (:MaturityLevel {id: 'level-1', level: 1, name: 'Visible', tagline: 'We can see whats happening', description: 'Basic observability exists. Work is traceable after the fact.'});
CREATE (:MaturityLevel {id: 'level-2', level: 2, name: 'Repeatable', tagline: 'We can change things safely', description: 'Standardized delivery paths exist. Evidence is generated automatically.'});
CREATE (:MaturityLevel {id: 'level-3', level: 3, name: 'Flowing', tagline: 'The system teaches us as we use it', description: 'Feedback loops are short and trusted. Risk surfaces continuously.'});
CREATE (:MaturityLevel {id: 'level-4', level: 4, name: 'Adaptive', tagline: 'We can absorb change without destabilizing', description: 'Organization handles significant change without losing benefits of previous levels.'});

// ============================================================================
// TRANSFORMATION PHASES (6)
// ============================================================================

CREATE (:Phase {id: 'phase-0', phase: 0, name: 'On-Prem', description: 'Traditional on-premises operations. Manual provisioning, tribal knowledge, pets.', focus: 'Manual provisioning, tribal knowledge'});
CREATE (:Phase {id: 'phase-1', phase: 1, name: 'Lift & Shift', description: 'Cloud adoption without cloud-native transformation.', focus: 'Cloud location, on-prem model'});
CREATE (:Phase {id: 'phase-2', phase: 2, name: 'The Awkward Middle', description: 'Tools changed but disciplines didnt.', focus: 'Modern tools, legacy practices'});
CREATE (:Phase {id: 'phase-3', phase: 3, name: 'Cloud Native Infrastructure', description: 'The existential shift. Standardized patterns, declarative operations.', focus: 'GitOps, policy as code, platform as product'});
CREATE (:Phase {id: 'phase-4', phase: 4, name: 'Agentic Coding', description: 'AI coding agents as primary mode of development.', focus: 'Code abundance, verification scarcity'});
CREATE (:Phase {id: 'phase-5', phase: 5, name: 'Cloud Native Code', description: 'Code as standardized, composable, and policy-governed as infrastructure.', focus: 'Standardized code, automated governance'});

// ============================================================================
// STAKEHOLDERS (5)
// ============================================================================

CREATE (:Stakeholder {id: 'engineers', name: 'Engineers', concerns: ['daily workflow friction', 'tooling quality', 'feedback loop speed', 'autonomy', 'career growth']});
CREATE (:Stakeholder {id: 'engineering-leaders', name: 'Engineering Leaders', concerns: ['team delivery reliability', 'knowledge preservation', 'talent retention', 'platform investment']});
CREATE (:Stakeholder {id: 'executives', name: 'Executives', concerns: ['delivery risk', 'margin erosion', 'competitive position', 'ROI on engineering investment']});
CREATE (:Stakeholder {id: 'government-customers', name: 'Government Customers', concerns: ['mission reliability', 'contractor quality', 'compliance assurance', 'knowledge transfer']});
CREATE (:Stakeholder {id: 'capture-teams', name: 'Capture Teams', concerns: ['competitive differentiation', 'proof points', 'win themes', 'proposal language']});

// ============================================================================
// EXTERNAL FRAMEWORKS (6)
// ============================================================================

CREATE (:Framework {id: 'domain-driven-design', name: 'DDD', fullName: 'Domain-Driven Design', description: 'An approach centering development on a rich domain model.', source: 'Eric Evans', year: 2003});
CREATE (:Framework {id: 'dora', name: 'DORA', fullName: 'DevOps Research and Assessment', description: 'Research-backed metrics for software delivery performance.', source: 'Forsgren, Humble, Kim', year: 2018});
CREATE (:Framework {id: 'bdd', name: 'BDD', fullName: 'Behavior-Driven Development', description: 'Collaborative approach bridging business and technical teams.', source: 'Dan North', year: 2006});
CREATE (:Framework {id: 'continuous-delivery', name: 'CD', fullName: 'Continuous Delivery', description: 'Software built to be released to production at any time.', source: 'Humble, Farley', year: 2010});
CREATE (:Framework {id: 'team-topologies', name: 'Team Topologies', fullName: 'Team Topologies', description: 'Practical approach for organizational design and team interactions.', source: 'Skelton, Pais', year: 2019});
CREATE (:Framework {id: 'double-diamond', name: 'Double Diamond', fullName: 'Double Diamond', description: 'Visual representation of design through divergent/convergent phases.', source: 'Design Council', year: 2004});

// ============================================================================
// TERMS (47 from glossary)
// ============================================================================

CREATE (:Term {id: 'audit-trail', name: 'Audit Trail', definition: 'A chronological record of system activities that provides documentary evidence of the sequence of activities. In FOE, audit trails are automatic byproducts of disciplined processes, not manual documentation efforts.'});
CREATE (:Term {id: 'automated-governance', name: 'Automated Governance', definition: 'The practice of encoding organizational policies into executable rules that are enforced automatically by the system, rather than through manual review or approval processes.'});
CREATE (:Term {id: 'blast-radius', name: 'Blast Radius', definition: 'The scope of potential impact when a change fails. FOE institutions are designed to minimize blast radius through progressive rollouts, feature flags, and isolation boundaries.'});
CREATE (:Term {id: 'build-artifact', name: 'Build Artifact', definition: 'An immutable, versioned output of a build process. FOE requires artifacts to be reproducible, signed, and traceable to their source.'});
CREATE (:Term {id: 'cognitive-offloading', name: 'Cognitive Offloading', definition: 'The practice of moving mental burden from human memory and attention to systems and processes. When developers dont have to remember security practices because the pipeline enforces them, thats cognitive offloading. Core to why FOE institutions work.'});
CREATE (:Term {id: 'confidence', name: 'Confidence', definition: 'In FOE, confidence is not a feeling but a measurable state. It comes from evidence: passing tests, successful deployments, production metrics. Confidence without evidence is certainty theater.'});
CREATE (:Term {id: 'continuous-delivery', name: 'Continuous Delivery', definition: 'The practice of keeping software in a deployable state at all times. FOE extends this to continuous *everything*: verification, compliance, learning.'});
CREATE (:Term {id: 'deployment-frequency', name: 'Deployment Frequency', definition: 'One of the four DORA metrics. How often code is deployed to production. FOE treats this as an outcome measure, not a goal to optimize directly.'});
CREATE (:Term {id: 'disciplines', name: 'Disciplines', definition: 'Consistent, enforced, repeatable, measurable operating practices. Unlike guidelines or best practices, disciplines are non-negotiable and systematically verified. The "how" of FOE operations.'});
CREATE (:Term {id: 'dora-metrics', name: 'DORA Metrics', definition: 'The four key metrics identified by the DevOps Research and Assessment team: deployment frequency, lead time for changes, change failure rate, and time to restore service. FOE uses these as system health indicators, not performance targets.'});
CREATE (:Term {id: 'epistemic-hygiene', name: 'Epistemic Hygiene', definition: 'The practice of maintaining clear boundaries between what is known, what is believed, and what is assumed. FOE institutions create epistemic hygiene by generating evidence rather than requiring trust.'});
CREATE (:Term {id: 'evidence', name: 'Evidence', definition: 'Observable, verifiable data that supports a claim. FOE systems generate evidence automatically: test results, deployment logs, metric dashboards. Evidence replaces opinion in FOE decision-making.'});
CREATE (:Term {id: 'feedback-loop', name: 'Feedback Loop', definition: 'A cycle where outputs of a system are routed back as inputs. FOE emphasizes tightening feedback loops: the faster you learn whether a change worked, the faster you can improve.'});
CREATE (:Term {id: 'flow', name: 'Flow', definition: 'The repeatable movement from idea to change to verification to release to learning. The fundamental unit of value delivery in FOE. Not to be confused with "flow state" (though good flow enables that too).'});
CREATE (:Term {id: 'flow-efficiency', name: 'Flow Efficiency', definition: 'The ratio of value-adding time to total elapsed time. A change that takes 5 days but only 4 hours of actual work has ~3% flow efficiency. FOE institutions exist to improve flow efficiency.'});
CREATE (:Term {id: 'gauge', name: 'Gauge', definition: 'A measurement instrument that provides real-time visibility into system state. FOE systems are heavily instrumented because you cannot optimize what you cannot measure.'});
CREATE (:Term {id: 'gitops', name: 'GitOps', definition: 'An operational framework that uses Git as the single source of truth for declarative infrastructure and applications. Changes are made via pull requests; the system reconciles actual state to desired state automatically.'});
CREATE (:Term {id: 'golden-path', name: 'Golden Path', definition: 'See: Paved Path.'});
CREATE (:Term {id: 'guardrails', name: 'Guardrails', definition: 'Automated constraints that prevent harmful actions while allowing safe operations. Unlike gates (which block all traffic), guardrails guide traffic while permitting movement.'});
CREATE (:Term {id: 'hermetic-build', name: 'Hermetic Build', definition: 'A build that depends only on declared inputs and produces identical outputs regardless of when or where it runs. Essential for reproducibility and auditability.'});
CREATE (:Term {id: 'idempotency', name: 'Idempotency', definition: 'The property where an operation produces the same result whether executed once or multiple times. Critical for reliable automation and recovery.'});
CREATE (:Term {id: 'immutability', name: 'Immutability', definition: 'The property of being unchangeable after creation. FOE favors immutable artifacts, immutable infrastructure, and immutable audit logs.'});
CREATE (:Term {id: 'institutions', name: 'Institutions', definition: 'Lightweight mechanisms that make desired behavior the default and undesired behavior difficult. Not bureaucracy, more like traffic engineering. The "what" of FOE infrastructure.'});
CREATE (:Term {id: 'instrumentation', name: 'Instrumentation', definition: 'The practice of adding measurement capabilities to systems. FOE treats instrumentation as a first-class requirement, not an afterthought.'});
CREATE (:Term {id: 'lead-time-for-changes', name: 'Lead Time for Changes', definition: 'One of the four DORA metrics. The time from code commit to code running in production. FOE institutions are designed to minimize this without sacrificing safety.'});
CREATE (:Term {id: 'left-shift', name: 'Left-Shift', definition: 'Moving activities earlier in the development lifecycle. FOE left-shifts security, testing, and compliance verification to provide faster feedback.'});
CREATE (:Term {id: 'mean-time-to-recovery', name: 'Mean Time to Recovery (MTTR)', definition: 'One of the four DORA metrics. How long it takes to restore service after an incident. FOE prioritizes MTTR over mean time between failures because failures are inevitable.'});
CREATE (:Term {id: 'mutation-testing', name: 'Mutation Testing', definition: 'A testing technique that modifies code to verify that tests detect the changes. Used to measure test effectiveness, not just coverage.'});
CREATE (:Term {id: 'observability', name: 'Observability', definition: 'The ability to understand a systems internal state from its external outputs. Goes beyond monitoring: observable systems allow you to ask new questions without deploying new code.'});
CREATE (:Term {id: 'operating-envelope', name: 'Operating Envelope', definition: 'The defined boundaries within which a system can operate safely at speed. Borrowed from aviation. FOE institutions define and enforce operating envelopes.'});
CREATE (:Term {id: 'paved-path', name: 'Paved Path (Golden Path)', definition: 'A standardized, supported approach that makes the right thing easy and the wrong thing hard. Paved paths reduce cognitive load, improve consistency, and enable institutional support. Developers *can* go off-path, but they own the consequences.'});
CREATE (:Term {id: 'policy-as-code', name: 'Policy as Code', definition: 'The practice of expressing organizational policies in executable, version-controlled code rather than documents. Enables automated enforcement and audit.'});
CREATE (:Term {id: 'progressive-delivery', name: 'Progressive Delivery', definition: 'Deployment techniques that gradually expose changes to larger audiences. Includes canary deployments, blue-green deployments, and feature flags.'});
CREATE (:Term {id: 'receipts', name: 'Receipts', definition: 'Evidence and audit trails of decisions and changes. In FOE, receipts are automatic byproducts of the process, not manual documentation. "Trust, but verify" becomes "trust because we can verify."'});
CREATE (:Term {id: 'reproducibility', name: 'Reproducibility', definition: 'The property of producing identical results from identical inputs. Essential for debugging, auditing, and compliance.'});
CREATE (:Term {id: 'selection-environment', name: 'Selection Environment', definition: 'A system where outcomes determine what survives, not opinions or politics. FOE creates selection environments through measurement and feedback: approaches that work get reinforced; approaches that fail get replaced.'});
CREATE (:Term {id: 'single-source-of-truth', name: 'Single Source of Truth', definition: 'A system design principle where every data element is stored exactly once. In FOE, Git serves as the single source of truth for desired state; production systems serve as the single source of truth for actual state.'});
CREATE (:Term {id: 'sociotechnical-system', name: 'Sociotechnical System', definition: 'A system comprising both technical components and human/organizational components. FOE recognizes that engineering organizations are sociotechnical systems: you cannot optimize the technical without addressing the social.'});
CREATE (:Term {id: 'toil', name: 'Toil', definition: 'Manual, repetitive work that scales linearly with system size and provides no enduring value. FOE institutions aim to eliminate toil through automation.'});
CREATE (:Term {id: 'trunk-based-development', name: 'Trunk-Based Development', definition: 'A source control branching model where developers work in short-lived branches (or directly on trunk) and merge frequently. Enables continuous integration and reduces merge conflicts.'});
CREATE (:Term {id: 'value-stream', name: 'Value Stream', definition: 'The sequence of activities required to deliver value to a customer. FOE optimizes the entire value stream, not just individual components.'});
CREATE (:Term {id: 'verification', name: 'Verification', definition: 'The process of confirming that something meets its specification. In FOE, verification is continuous and automated, not a phase that happens at the end.'});
CREATE (:Term {id: 'via-negativa', name: 'Via Negativa', definition: 'A philosophical approach that defines something by what it is *not*. FOE uses Via Negativa to define anti-patterns, things to explicitly avoid.'});
CREATE (:Term {id: 'work-in-progress', name: 'Work in Progress (WIP)', definition: 'The amount of work started but not yet finished. FOE institutions often include WIP limits because excessive WIP kills flow efficiency.'});

// ============================================================================
// FIELD GUIDE METHODS (22)
// ============================================================================

// Agentic Coding Methods
CREATE (:Method {id: 'M-111', name: 'Deployment Frequency', description: 'How deployment frequency applies to AI-assisted development workflows', maturityLevel: 'emerging', fieldGuide: 'agentic-coding'});
CREATE (:Method {id: 'M-112', name: 'Deployment Pipeline', description: 'How deployment pipelines verify AI-generated code', maturityLevel: 'emerging', fieldGuide: 'agentic-coding'});
CREATE (:Method {id: 'M-118', name: 'Enabling Team', description: 'How enabling teams support AI adoption across stream-aligned teams', maturityLevel: 'emerging', fieldGuide: 'agentic-coding'});
CREATE (:Method {id: 'M-121', name: 'Executable Specifications', description: 'How living documentation supports AI-assisted development', maturityLevel: 'emerging', fieldGuide: 'agentic-coding'});
CREATE (:Method {id: 'M-124', name: 'Fast Flow', description: 'How AI-assisted development impacts organizational flow', maturityLevel: 'emerging', fieldGuide: 'agentic-coding'});
CREATE (:Method {id: 'M-126', name: 'Gherkin', description: 'How Gherkin syntax enhances AI prompting and verification', maturityLevel: 'emerging', fieldGuide: 'agentic-coding'});
CREATE (:Method {id: 'M-127', name: 'Given-When-Then', description: 'How structured acceptance criteria improve AI code generation', maturityLevel: 'emerging', fieldGuide: 'agentic-coding'});
CREATE (:Method {id: 'M-130', name: 'Lead Time for Changes', description: 'How lead time measurement applies to AI-assisted development', maturityLevel: 'emerging', fieldGuide: 'agentic-coding'});
CREATE (:Method {id: 'M-136', name: 'Team Cognitive Load', description: 'How AI affects and can reduce team cognitive load', maturityLevel: 'emerging', fieldGuide: 'agentic-coding'});
CREATE (:Method {id: 'M-140', name: 'Trunk-Based Development', description: 'How trunk-based development supports AI-assisted workflows', maturityLevel: 'emerging', fieldGuide: 'agentic-coding'});
CREATE (:Method {id: 'M-146', name: 'Early Feedback Loop Investment', description: 'Treat CI, automated tests, and deployment pipelines as foundation, not overhead', maturityLevel: 'emerging', fieldGuide: 'agentic-coding'});
CREATE (:Method {id: 'M-147', name: 'Knowledge Distribution as Reliability', description: 'Treat concentrated knowledge as a system reliability risk to be actively addressed', maturityLevel: 'emerging', fieldGuide: 'agentic-coding'});
CREATE (:Method {id: 'M-148', name: 'Persistent Planning State', description: 'Maintain explicit planning state in markdown files that agents read before every decision', maturityLevel: 'emerging', fieldGuide: 'agentic-coding'});
CREATE (:Method {id: 'M-149', name: 'Root-Cause-First Debugging', description: 'Never apply fixes without first investigating the root cause', maturityLevel: 'emerging', fieldGuide: 'agentic-coding'});
CREATE (:Method {id: 'M-152', name: 'Test-Driven Agent Development', description: 'Apply the red-green-refactor cycle when working with AI coding assistants', maturityLevel: 'emerging', fieldGuide: 'agentic-coding'});
CREATE (:Method {id: 'M-154', name: 'Understanding-First Protocol Adoption', description: 'Invest time to understand a protocol conceptual model before making architectural decisions', maturityLevel: 'emerging', fieldGuide: 'agentic-coding'});
CREATE (:Method {id: 'M-155', name: 'Verification Before Completion', description: 'Never claim work is complete without running verification commands', maturityLevel: 'emerging', fieldGuide: 'agentic-coding'});
CREATE (:Method {id: 'M-156', name: 'Agent-Mediated Access', description: 'Democratize system changes by using AI agents as safe, intelligent interfaces between users and codebases', maturityLevel: 'emerging', fieldGuide: 'agentic-coding'});

// Architecture Methods
CREATE (:Method {id: 'M-145', name: 'Consumer Contract Testing', description: 'Validate service integration points through consumer-driven contracts enabling independent deployment', maturityLevel: 'established', fieldGuide: 'architecture'});
CREATE (:Method {id: 'M-150', name: 'Service Boundary Extraction', description: 'Extract components with natural boundaries to dedicated containers making implicit architectural separation explicit', maturityLevel: 'emerging', fieldGuide: 'architecture'});
CREATE (:Method {id: 'M-151', name: 'System Over Individuals', description: 'When performance is poor, optimize the system before blaming the people', maturityLevel: 'emerging', fieldGuide: 'architecture'});
CREATE (:Method {id: 'M-153', name: 'True Microservices', description: 'Design service architectures that enable independent team deployment, not distributed monoliths', maturityLevel: 'established', fieldGuide: 'architecture'});

// ============================================================================
// OBSERVATIONS (26)
// ============================================================================

// Internal Observations
CREATE (:Observation {id: 'O-100', name: 'Prima: BDD Adoption for API Testing', type: 'internal', description: 'An internal observation documenting Prima adoption of Behavior-Driven Development for API testing across the Control Tower and Engine services, growing from 0 to 56 feature files with measurable impacts on test coverage, maintenance patterns, and refactoring confidence.', source: 'Prima Platform Engineering', methodsSupported: ['M-127', 'M-121', 'M-126', 'M-115', 'M-146']});
CREATE (:Observation {id: 'O-101', name: 'Prima Platform Microservices Architecture', type: 'internal', description: 'The Prima platform evolved into a true microservices architecture with independently deployable subsystems (Control Tower, Engine, Web), shared platform services via stable APIs (Kong, Redis, Auth0), and explicit control plane / data plane separation—enabling teams to deploy without coordination while maintaining governance.', source: 'Prima Engineering', methodsSupported: ['M-153']});
CREATE (:Observation {id: 'O-102', name: 'Prima: Enterprise AI Platform via OSS Fork Strategy', type: 'internal', description: 'A case study of eSimplicity IRAD project building an enterprise AI platform by forking established OSS tools (OpenAI Codex CLI, AnythingLLM). The project shipped but demonstrated how velocity pressure without understanding investment creates compounding technical and knowledge debt.', source: 'eSimplicity Inc', methodsSupported: ['M-154', 'M-146', 'M-147']});
CREATE (:Observation {id: 'O-103', name: 'Containerizing Heavy ML Dependencies', type: 'internal', description: 'Extracting Presidio PII analyzer to a dedicated container removed ~663 lines of heavy ML dependencies (PyTorch, spaCy, transformers) from the main service, demonstrating that architectural separation of ML workloads improves build times and service maintainability.', source: 'Prima Engine', methodsSupported: ['M-150', 'M-153']});
CREATE (:Observation {id: 'O-125', name: 'Content Portal: Product Owner Makes 42 Commits in 7 Days via Agent-Mediated Access', type: 'internal', description: 'A product owner (Kyle Hogan) made 42 commits over 7 days—54% of all repository commits—through a deliberately constrained agent system (Super Kyle), demonstrating that agent-mediated access can enable non-technical contributors to make real feature contributions when backed by proper scaffolding.', source: 'Content Portal', methodsSupported: ['M-156']});

// External Observations
CREATE (:Observation {id: 'O-104', name: 'BDD Adoption in Open Source Projects', type: 'external', description: 'A large-scale study of 50,000 GitHub projects revealing that while ~27% use BDD frameworks, many use them for unit testing rather than true behavior-driven development. Provides important nuance about the gap between tool adoption and methodology adoption.', source: 'Zampetti et al. (2020), Information and Software Technology', methodsSupported: ['M-127', 'M-121']});
CREATE (:Observation {id: 'O-105', name: 'BDD Benefits and Challenges: Industrial Study', type: 'external', description: 'An empirical study with 24 IT professionals providing a nuanced view of BDD: significant communication and shared understanding benefits exist, but require genuine investment in scenario maintenance and writing quality.', source: 'Pereira et al. (2018), ACM XP Conference', methodsSupported: ['M-127', 'M-121', 'M-138']});
CREATE (:Observation {id: 'O-106', name: 'BDD Specification Maintenance Challenges', type: 'external', description: 'Research identifying significant challenges in maintaining BDD specifications over time. Challenges the living documentation claim by showing that keeping specifications synchronized with evolving code requires substantial ongoing effort.', source: 'Binamungu et al. (2018), IEEE SANER Conference', methodsSupported: ['M-121', 'M-127']});
CREATE (:Observation {id: 'O-107', name: 'BDD Systematic Literature Review', type: 'external', description: 'A comprehensive systematic literature review examining Behavior-Driven Development research, synthesizing findings from multiple studies to establish that BDD improves stakeholder communication and helps align delivered software with requirements.', source: 'Farooq et al. (2023), IEEE Access', methodsSupported: ['M-127', 'M-121', 'M-138']});
CREATE (:Observation {id: 'O-108', name: 'Domain-Driven Design: Bounded Contexts', type: 'external', description: 'Eric Evans Domain-Driven Design introduced the concept of Bounded Contexts—explicit boundaries within which a domain model applies. This concept provides the theoretical foundation for why microservice boundaries should align with business capabilities, not technical layers, and why shared databases create distributed monoliths.', source: 'Evans (2003), Addison-Wesley / Domain Language', methodsSupported: ['M-153']});
CREATE (:Observation {id: 'O-109', name: 'DORA 2023: User-Centricity Research', type: 'external', description: 'The 2023 State of DevOps Report reveals that user-centric organizations significantly outperform those that do not prioritize user understanding, demonstrating a 40% increase in organizational performance when teams focus on understanding user needs before building solutions.', source: 'DORA Research Team (2023), Google Cloud', methodsSupported: ['M-114', 'M-111']});
CREATE (:Observation {id: 'O-110', name: 'DORA Four Key Metrics Research', type: 'external', description: 'The DORA (DevOps Research and Assessment) program multi-year study of 39,000+ technology professionals demonstrates that software delivery performance is measurable through four key metrics, and that high performers achieve dramatically better outcomes without sacrificing stability for speed.', source: 'Forsgren, Humble & Kim (2018), DORA Research Program', methodsSupported: ['M-111', 'M-130', 'M-105', 'M-139', 'M-153']});
CREATE (:Observation {id: 'O-111', name: 'DORA: Loosely Coupled Architecture Capability', type: 'external', description: 'DORA research identifies loosely coupled architecture as one of 24 capabilities that predict software delivery performance. This specific capability directly validates that independent deployability—enabled by true microservices—correlates with better organizational outcomes.', source: 'DORA Research Team (2023), Google Cloud', methodsSupported: ['M-153']});
CREATE (:Observation {id: 'O-112', name: 'eBay: Contract Testing Adoption Case Study', type: 'external', description: 'This case study documents eBay enterprise-scale adoption of consumer-driven contract testing, including internal tooling investments and organizational learnings from implementing CDC across a large microservices architecture.', source: 'Xiaoye Wang et al. (2023), eBay Innovation', methodsSupported: ['M-145']});
CREATE (:Observation {id: 'O-113', name: 'Microservices Definition (Fowler & Lewis)', type: 'external', description: 'The foundational definition of microservices architecture that established the key characteristics distinguishing true microservices from other architectural patterns. This article defined the industry vocabulary and set expectations for what microservices should achieve.', source: 'Lewis & Fowler (2014), ThoughtWorks / martinfowler.com', methodsSupported: ['M-153']});
CREATE (:Observation {id: 'O-114', name: 'Google Project Aristotle: Psychological Safety', type: 'external', description: 'Google multi-year study of 180 teams found that psychological safety is the #1 predictor of team effectiveness - more important than individual talent, team composition, or work style. Teams with high psychological safety are 2x more likely to be rated effective by executives and bring in more revenue.', source: 'Edmondson (1999), Google Project Aristotle (2012-2015)', methodsSupported: ['M-138', 'M-115']});
CREATE (:Observation {id: 'O-115', name: 'Domain-Driven Design for Microservices: An Evidence-Based Investigation', type: 'external', description: 'This peer-reviewed study provides empirical validation that Domain-Driven Design patterns—particularly Bounded Contexts—are effective for decomposing monolithic systems into microservices.', source: 'Zhong et al. (2024), IEEE Transactions', methodsSupported: ['M-103', 'M-108', 'M-134']});
CREATE (:Observation {id: 'O-116', name: 'Why Design Thinking Works (HBR 2018)', type: 'external', description: 'Research by Professor Jeanne Liedtka at the Darden School of Business examines why design thinking produces measurably better innovation outcomes.', source: 'Jeanne Liedtka (2018), Harvard Business Review', methodsSupported: ['M-114', 'M-109', 'M-113', 'M-110']});
CREATE (:Observation {id: 'O-117', name: 'NUMMI: Same Workers, Different System', type: 'external', description: 'The NUMMI (New United Motor Manufacturing, Inc.) plant transformation demonstrates that system design, not individual talent, determines outcomes. GM worst-performing plant became one of Americas best after implementing the Toyota Production System - with 85%+ of the same employees.', source: 'Womack, Jones & Roos (1990), MIT IMVP Study', methodsSupported: ['M-151']});
CREATE (:Observation {id: 'O-118', name: 'DDD Industrial Refactoring: Automotive Case Study', type: 'external', description: 'An action research study at an automotive software company found that refactoring a 10,000 LOC backend system using Domain-Driven Design patterns achieved an 84/100 score on the modified Technology Acceptance Model.', source: 'Ozkan, Babur & van den Brand (2023), Empirical Software Engineering', methodsSupported: ['M-100', 'M-132', 'M-143', 'M-117']});
CREATE (:Observation {id: 'O-119', name: 'Consumer-Driven Contracts: A Service Evolution Pattern', type: 'external', description: 'This foundational paper introduced the Consumer-Driven Contracts pattern, establishing the theoretical basis for how services can evolve independently while maintaining consumer compatibility.', source: 'Ian Robinson (2006), ThoughtWorks / martinfowler.com', methodsSupported: ['M-145']});
CREATE (:Observation {id: 'O-120', name: 'TDD Defect Reduction: Microsoft/IBM Study', type: 'external', description: 'A landmark study of four industrial teams at Microsoft and IBM found that Test-Driven Development (TDD) reduces defect density by 40-90% compared to similar non-TDD projects, with a development time increase of 15-35%.', source: 'Nagappan et al. (2008), Microsoft Research / IBM', methodsSupported: ['M-121']});
CREATE (:Observation {id: 'O-121', name: 'Team Topologies: Bounded Contexts and Cognitive Load', type: 'external', description: 'Team Topologies explicitly references Domain-Driven Design Bounded Contexts as the ideal unit for team ownership, providing empirical and organizational backing for DDD strategic design principles.', source: 'Skelton & Pais (2019), IT Revolution Press', methodsSupported: ['M-103', 'M-108', 'M-134', 'M-153']});
CREATE (:Observation {id: 'O-122', name: 'Team Topologies: Inverse Conway Maneuver', type: 'external', description: 'Team Topologies provides a systematic framework for organizing teams around flow of value, using Conway Law intentionally rather than fighting against it.', source: 'Skelton & Pais (2019), IT Revolution Press', methodsSupported: ['M-153']});
CREATE (:Observation {id: 'O-123', name: 'ThoughtWorks: Consumer-Driven Contract Testing', type: 'external', description: 'ThoughtWorks placed Consumer-Driven Contract Testing at Adopt status in their Technology Radar, establishing it as an essential practice for microservices testing portfolios.', source: 'ThoughtWorks Technology Advisory Board (2016)', methodsSupported: ['M-145']});
CREATE (:Observation {id: 'O-124', name: 'Accelerate: Test Automation and Delivery Performance', type: 'external', description: 'The Accelerate research, based on 4+ years of State of DevOps surveys and 23,000+ responses, establishes that comprehensive test automation is a key predictor of software delivery performance.', source: 'Forsgren, Humble & Kim (2018), IT Revolution Press / DORA Research Program', methodsSupported: ['M-121']});

// ============================================================================
// EXTERNAL FRAMEWORK METHODS (45)
// ============================================================================

// BDD Methods
CREATE (:Method {id: 'bdd-discovery-workshops', name: 'Discovery Workshops', description: 'Collaborative conversations to explore, discover, and agree on the desired behavior for a user story through concrete examples.', framework: 'bdd', external: true});
CREATE (:Method {id: 'bdd-example-mapping', name: 'Example Mapping', description: 'A structured technique using colored index cards to map user stories to rules, examples, and questions.', framework: 'bdd', external: true});
CREATE (:Method {id: 'bdd-executable-specifications', name: 'Executable Specifications', description: 'Connecting formulated examples to the system as automated tests that guide development and verify behavior.', framework: 'bdd', external: true});
CREATE (:Method {id: 'bdd-gherkin', name: 'Gherkin', description: 'A domain-specific language for writing executable specifications in a human-readable format.', framework: 'bdd', external: true});
CREATE (:Method {id: 'bdd-given-when-then', name: 'Given-When-Then', description: 'A template for expressing acceptance criteria as structured scenarios readable by humans and computers.', framework: 'bdd', external: true});
CREATE (:Method {id: 'bdd-three-amigos', name: 'Three Amigos', description: 'A meeting format where three key perspectives (business, development, testing) collaborate to turn user stories into clear scenarios.', framework: 'bdd', external: true});
CREATE (:Method {id: 'bdd-user-story-template', name: 'User Story Template', description: 'A template for expressing requirements as "As a [role], I want [feature], so that [benefit]" emphasizing business value.', framework: 'bdd', external: true});

// Continuous Delivery Methods
CREATE (:Method {id: 'cd-blue-green-deployment', name: 'Blue-Green Deployment', description: 'Maintain two identical production environments, switching traffic between them for zero-downtime deployments.', framework: 'continuous-delivery', external: true});
CREATE (:Method {id: 'cd-canary-release', name: 'Canary Release', description: 'Reduce risk by slowly rolling out changes to a small subset of users before full deployment.', framework: 'continuous-delivery', external: true});
CREATE (:Method {id: 'cd-deployment-pipeline', name: 'Deployment Pipeline', description: 'An automated process that takes changes from version control through build, test, and deployment stages.', framework: 'continuous-delivery', external: true});
CREATE (:Method {id: 'cd-feature-flags', name: 'Feature Flags', description: 'Configuration options that allow hiding incomplete features from users while continuing to integrate code.', framework: 'continuous-delivery', external: true});
CREATE (:Method {id: 'cd-infrastructure-as-code', name: 'Infrastructure as Code', description: 'Manage and provision infrastructure through machine-readable configuration files rather than manual processes.', framework: 'continuous-delivery', external: true});
CREATE (:Method {id: 'cd-trunk-based-development', name: 'Trunk-Based Development', description: 'A branching model where developers collaborate on code in a single branch, avoiding long-lived feature branches.', framework: 'continuous-delivery', external: true});

// Domain-Driven Design Methods
CREATE (:Method {id: 'ddd-aggregate', name: 'Aggregate', description: 'A cluster of domain objects treated as a single unit for data changes.', framework: 'domain-driven-design', external: true});
CREATE (:Method {id: 'ddd-application-service', name: 'Application Service', description: 'Use case orchestration that coordinates domain objects and infrastructure.', framework: 'domain-driven-design', external: true});
CREATE (:Method {id: 'ddd-bounded-context', name: 'Bounded Context', description: 'A boundary within which a particular domain model is defined and applicable.', framework: 'domain-driven-design', external: true});
CREATE (:Method {id: 'ddd-context-mapping', name: 'Context Mapping', description: 'Documenting and managing relationships between bounded contexts.', framework: 'domain-driven-design', external: true});
CREATE (:Method {id: 'ddd-domain-event', name: 'Domain Event', description: 'A record of something significant that happened in the domain.', framework: 'domain-driven-design', external: true});
CREATE (:Method {id: 'ddd-domain-service', name: 'Domain Service', description: 'Stateless operations that represent domain concepts not belonging to entities or value objects.', framework: 'domain-driven-design', external: true});
CREATE (:Method {id: 'ddd-entity', name: 'Entity', description: 'Objects defined by their identity rather than their attributes.', framework: 'domain-driven-design', external: true});
CREATE (:Method {id: 'ddd-factory', name: 'Factory', description: 'Encapsulates complex object and aggregate creation logic.', framework: 'domain-driven-design', external: true});
CREATE (:Method {id: 'ddd-repository', name: 'Repository', description: 'A collection-like interface for accessing and persisting aggregates.', framework: 'domain-driven-design', external: true});
CREATE (:Method {id: 'ddd-subdomains', name: 'Subdomains', description: 'Categorizing domain areas by strategic importance to focus modeling effort.', framework: 'domain-driven-design', external: true});
CREATE (:Method {id: 'ddd-ubiquitous-language', name: 'Ubiquitous Language', description: 'A shared language between developers and domain experts used consistently in code, documentation, and conversation.', framework: 'domain-driven-design', external: true});
CREATE (:Method {id: 'ddd-value-object', name: 'Value Object', description: 'Objects defined by their attributes, with no conceptual identity.', framework: 'domain-driven-design', external: true});

// DORA Methods
CREATE (:Method {id: 'dora-change-failure-rate', name: 'Change Failure Rate', description: 'Percentage of deployments causing failures requiring remediation.', framework: 'dora', external: true});
CREATE (:Method {id: 'dora-deployment-frequency', name: 'Deployment Frequency', description: 'How often code is successfully deployed to production.', framework: 'dora', external: true});
CREATE (:Method {id: 'dora-lead-time-for-changes', name: 'Lead Time for Changes', description: 'Time from code commit to running in production.', framework: 'dora', external: true});
CREATE (:Method {id: 'dora-time-to-restore-service', name: 'Time to Restore Service', description: 'How long it takes to recover from a failure in production.', framework: 'dora', external: true});

// Double Diamond Methods
CREATE (:Method {id: 'double-diamond-define-phase', name: 'Define Phase', description: 'The first convergent phase where insights are synthesized into a clear problem definition.', framework: 'double-diamond', external: true});
CREATE (:Method {id: 'double-diamond-deliver-phase', name: 'Deliver Phase', description: 'The second convergent phase where solutions are validated through testing before launch.', framework: 'double-diamond', external: true});
CREATE (:Method {id: 'double-diamond-develop-phase', name: 'Develop Phase', description: 'The second divergent phase where teams generate multiple potential solutions through ideation and prototyping.', framework: 'double-diamond', external: true});
CREATE (:Method {id: 'double-diamond-discover-phase', name: 'Discover Phase', description: 'The first divergent phase where teams explore the problem space broadly through user research and empathy.', framework: 'double-diamond', external: true});

// Team Topologies Methods
CREATE (:Method {id: 'team-topologies-collaboration-mode', name: 'Collaboration Mode', description: 'Two teams working closely together for a defined period to discover new things.', framework: 'team-topologies', external: true});
CREATE (:Method {id: 'team-topologies-complicated-subsystem-team', name: 'Complicated-Subsystem Team', description: 'Teams responsible for components requiring deep technical expertise.', framework: 'team-topologies', external: true});
CREATE (:Method {id: 'team-topologies-enabling-team', name: 'Enabling Team', description: 'Teams that help stream-aligned teams overcome obstacles and build capabilities, then move on.', framework: 'team-topologies', external: true});
CREATE (:Method {id: 'team-topologies-facilitating-mode', name: 'Facilitating Mode', description: 'One team helps and mentors another team, removing obstacles.', framework: 'team-topologies', external: true});
CREATE (:Method {id: 'team-topologies-fast-flow', name: 'Fast Flow', description: 'The ability to quickly move work from idea to customer value.', framework: 'team-topologies', external: true});
CREATE (:Method {id: 'team-topologies-inverse-conway-maneuver', name: 'Inverse Conway Maneuver', description: 'Deliberately designing team structures to produce a desired software architecture.', framework: 'team-topologies', external: true});
CREATE (:Method {id: 'team-topologies-platform-team', name: 'Platform Team', description: 'Teams that provide a compelling internal product to accelerate delivery by stream-aligned teams.', framework: 'team-topologies', external: true});
CREATE (:Method {id: 'team-topologies-stream-aligned-team', name: 'Stream-Aligned Team', description: 'The primary team type aligned to a flow of work from a business domain segment.', framework: 'team-topologies', external: true});
CREATE (:Method {id: 'team-topologies-team-api', name: 'Team API', description: 'A clear definition of how a team interacts with other teams.', framework: 'team-topologies', external: true});
CREATE (:Method {id: 'team-topologies-team-cognitive-load', name: 'Team Cognitive Load', description: 'The mental effort required for teams to manage their work, which must be actively monitored.', framework: 'team-topologies', external: true});
CREATE (:Method {id: 'team-topologies-thinnest-viable-platform', name: 'Thinnest Viable Platform', description: 'Creating platforms with just enough capability without unnecessary complexity.', framework: 'team-topologies', external: true});
CREATE (:Method {id: 'team-topologies-x-as-a-service-mode', name: 'X-as-a-Service Mode', description: 'One team provides something "as a Service" with minimal interaction required.', framework: 'team-topologies', external: true});

// ============================================================================
// CONCEPTS (150+)
// ============================================================================

// Core FOE Concepts
CREATE (:Concept {id: 'flow-optimized-engineering', name: 'Flow Optimized Engineering', description: 'A delivery doctrine that treats speed as an epistemic problem rather than a motivation problem', category: 'core'});
CREATE (:Concept {id: 'delivery-doctrine', name: 'Delivery Doctrine', description: 'A shared belief about how to operate that guides decisions when playbooks dont cover situations', category: 'core'});
CREATE (:Concept {id: 'speed-with-coherence', name: 'Speed With Coherence', description: 'Moving fast while maintaining traceability, verification, containment, and learning', category: 'core'});
CREATE (:Concept {id: 'flow-vs-output', name: 'Flow vs Output', description: 'Optimizing for repeatable movement from idea to learning rather than metrics that can be gamed', category: 'core'});
CREATE (:Concept {id: 'instrumentation-as-acceleration', name: 'Instrumentation as Acceleration', description: 'Treating monitoring and verification as enablers of speed rather than drag', category: 'core'});
CREATE (:Concept {id: 'evidence-trail', name: 'Evidence Trail', description: 'Automatic documentation generated by high-speed delivery for debugging, compliance, and learning', category: 'core'});
CREATE (:Concept {id: 'gauges-metaphor', name: 'Gauges Metaphor', description: 'Using race car instrumentation as analogy for why faster systems need more feedback', category: 'core'});
CREATE (:Concept {id: 'flight-envelope', name: 'Flight Envelope', description: 'The operational boundaries within which a system can safely operate', category: 'core'});
CREATE (:Concept {id: 'system-legibility', name: 'System Legibility', description: 'The quality of a system being understandable by competent observers', category: 'core'});

// Psychological Concepts
CREATE (:Concept {id: 'cognitive-load', name: 'Cognitive Load', description: 'Mental effort required to hold a working model of the system', category: 'psychological'});
CREATE (:Concept {id: 'intrinsic-load', name: 'Intrinsic Load', description: 'Cognitive load from genuine problem complexity that cannot be eliminated', category: 'psychological'});
CREATE (:Concept {id: 'extraneous-load', name: 'Extraneous Load', description: 'Cognitive load from poor tooling and inconsistent conventions that can be eliminated', category: 'psychological'});
CREATE (:Concept {id: 'germane-load', name: 'Germane Load', description: 'Cognitive load from learning and building mental models', category: 'psychological'});
CREATE (:Concept {id: 'belief-calibration', name: 'Belief Calibration', description: 'Aligning what you believe with what is actually true through feedback', category: 'psychological'});
CREATE (:Concept {id: 'psychological-safety-for-decision-making', name: 'Psychological Safety for Decision Making', description: 'Environment where people can act without fear of disproportionate consequences for good-faith mistakes', category: 'psychological'});
CREATE (:Concept {id: 'courage-by-design', name: 'Courage by Design', description: 'Creating systems that make rational action possible rather than demanding bravery', category: 'psychological'});
CREATE (:Concept {id: 'prediction-error', name: 'Prediction Error', description: 'The gap between what we expected and what happened that drives learning', category: 'psychological'});
CREATE (:Concept {id: 'confident-wrongness', name: 'Confident Wrongness', description: 'Dangerous state where slow feedback increases confidence without accuracy', category: 'psychological'});
CREATE (:Concept {id: 'analysis-paralysis', name: 'Analysis Paralysis', description: 'Gathering more information indefinitely because deciding feels risky', category: 'psychological'});
CREATE (:Concept {id: 'working-memory-limits', name: 'Working Memory Limits', description: 'Humans can hold only 4-7 items simultaneously affecting system comprehension', category: 'psychological'});
CREATE (:Concept {id: 'mental-model', name: 'Mental Model', description: 'Internal representation that allows predicting system behavior', category: 'psychological'});
CREATE (:Concept {id: 'model-drift', name: 'Model Drift', description: 'Mental models decaying without reinforcement when systems change', category: 'psychological'});
CREATE (:Concept {id: 'sensemaking', name: 'Sensemaking', description: 'Process of forming coherent understanding of complex situations', category: 'psychological'});
CREATE (:Concept {id: 'narrative-lock-in', name: 'Narrative Lock-in', description: 'Committed to a story so contradicting evidence gets explained away', category: 'psychological'});
CREATE (:Concept {id: 'sunk-cost-bias', name: 'Sunk Cost Bias', description: 'Invested too much to change course leading to poor decisions', category: 'psychological'});
CREATE (:Concept {id: 'authority-bias', name: 'Authority Bias', description: 'Senior person said it so it must be true regardless of evidence', category: 'psychological'});

// Behavioral Economics Concepts
CREATE (:Concept {id: 'loss-aversion', name: 'Loss Aversion', description: 'Losses hurt roughly twice as much as equivalent gains feel good. A team will fight harder to avoid losing what they have than to gain something new of equal value.', category: 'behavioral-economics'});
CREATE (:Concept {id: 'status-quo-bias', name: 'Status Quo Bias', description: 'People prefer the current state of affairs even when change would benefit them. The familiar feels safe; the new feels risky. This is why "we have always done it this way" persists.', category: 'behavioral-economics'});
CREATE (:Concept {id: 'hyperbolic-discounting', name: 'Hyperbolic Discounting', description: 'We massively overvalue immediate rewards compared to future ones. A shortcut that saves an hour today feels worth it even if it costs a week next month. This is why technical debt accumulates.', category: 'behavioral-economics'});
CREATE (:Concept {id: 'planning-fallacy', name: 'Planning Fallacy', description: 'We systematically underestimate how long things will take and how much they will cost, even when we have direct experience with similar past failures. Optimism beats evidence.', category: 'behavioral-economics'});
CREATE (:Concept {id: 'default-effect', name: 'Default Effect', description: 'People tend to stick with whatever option is pre-selected, even for important decisions. This is why golden paths work - make the right thing the default and most people will do the right thing.', category: 'behavioral-economics'});
CREATE (:Concept {id: 'omission-bias', name: 'Omission Bias', description: 'Harm caused by inaction feels less bad than equivalent harm caused by action. This makes "do nothing" feel safer even when acting would reduce risk. It explains "knowing but not doing."', category: 'behavioral-economics'});
CREATE (:Concept {id: 'learned-helplessness', name: 'Learned Helplessness', description: 'When repeated failures make people stop trying even when circumstances change. Teams that have been burned by past transformations stop believing change is possible.', category: 'behavioral-economics'});

// Hidden Dimensions
CREATE (:Concept {id: 'epistemic-control', name: 'Epistemic Control', description: 'Who decides what is true about the system - evidence or hierarchy', category: 'psychological'});
CREATE (:Concept {id: 'cognitive-load-distribution', name: 'Cognitive Load Distribution', description: 'Where thinking happens - in human heads or external systems', category: 'psychological'});
CREATE (:Concept {id: 'error-containment', name: 'Error Containment', description: 'How far mistakes can propagate through the system', category: 'psychological'});
CREATE (:Concept {id: 'decision-bandwidth', name: 'Decision Bandwidth', description: 'How many good decisions the organization can make per unit time', category: 'psychological'});
CREATE (:Concept {id: 'trust-formation', name: 'Trust Formation', description: 'How people develop justified confidence through repeated visible proof', category: 'psychological'});

// Organizational Concepts
CREATE (:Concept {id: 'people-changes', name: 'People Changes', description: 'Skills evolution, mindset shifts, and role transformations', category: 'organizational'});
CREATE (:Concept {id: 'process-changes', name: 'Process Changes', description: 'Moving from manual coordination to continuous delivery', category: 'organizational'});
CREATE (:Concept {id: 'technology-changes', name: 'Technology Changes', description: 'Adopting enabling technologies in service of flow', category: 'organizational'});
CREATE (:Concept {id: 'triad-coherence', name: 'Triad Coherence', description: 'All three dimensions moving together to avoid tension', category: 'organizational'});
CREATE (:Concept {id: 'manual-guardianship', name: 'Manual Guardianship', description: 'Anti-pattern of protecting systems through personal intervention', category: 'organizational'});
CREATE (:Concept {id: 'automated-stewardship', name: 'Automated Stewardship', description: 'Protecting systems by building and maintaining automation', category: 'organizational'});
CREATE (:Concept {id: 'gatekeeping', name: 'Gatekeeping', description: 'Anti-pattern of treating other teams as threats to be controlled', category: 'organizational'});
CREATE (:Concept {id: 'enabling-flow', name: 'Enabling Flow', description: 'Treating other teams as partners to be equipped with capabilities', category: 'organizational'});
CREATE (:Concept {id: 'capability-multiplier', name: 'Capability Multiplier', description: 'Tech lead role shifting from best IC to multiplying team capability', category: 'organizational'});
CREATE (:Concept {id: 'environment-shaper', name: 'Environment Shaper', description: 'Manager role shifting from work distributor to shaping conditions', category: 'organizational'});
CREATE (:Concept {id: 'context-provider', name: 'Context Provider', description: 'Executive role shifting from decision bottleneck to providing context', category: 'organizational'});
CREATE (:Concept {id: 'lightweight-institutions', name: 'Lightweight Institutions', description: 'Mechanisms that make desired behavior the default path', category: 'organizational'});
CREATE (:Concept {id: 'safety-institutions', name: 'Safety Institutions', description: 'Combinations of mechanism, defaults, enforcement, and visibility', category: 'organizational'});
CREATE (:Concept {id: 'process-debt', name: 'Process Debt', description: 'Accumulated steps that made sense once but slow everyone down now', category: 'organizational'});
CREATE (:Concept {id: 'process-theater', name: 'Process Theater', description: 'Going through motions that do not accomplish their purpose', category: 'organizational'});
CREATE (:Concept {id: 'tribal-knowledge', name: 'Tribal Knowledge', description: 'Anti-pattern of knowledge living only in peoples heads', category: 'organizational'});

// Operational Concepts
CREATE (:Concept {id: 'time-to-disconfirmation', name: 'Time to Disconfirmation', description: 'How quickly you can discover you are wrong about something', category: 'operational'});
CREATE (:Concept {id: 'visibility-of-consequences', name: 'Visibility of Consequences', description: 'Being able to see what a change actually did in production', category: 'operational'});
CREATE (:Concept {id: 'selection-pressure', name: 'Selection Pressure', description: 'Creating environments where reality gets a vote on what works', category: 'operational'});
CREATE (:Concept {id: 'continuous-integration', name: 'Continuous Integration', description: 'Every code change automatically built, tested, and integrated', category: 'operational'});
CREATE (:Concept {id: 'trunk-based-development', name: 'Trunk-Based Development', description: 'Everyone commits to main frequently with short-lived branches', category: 'operational'});
CREATE (:Concept {id: 'everything-as-code', name: 'Everything as Code', description: 'Infrastructure, configuration, policy, and docs all version controlled', category: 'operational'});
CREATE (:Concept {id: 'golden-paths', name: 'Golden Paths', description: 'Default well-lit routes through common tasks encoding best practices', category: 'operational'});
CREATE (:Concept {id: 'guardrails-not-handcuffs', name: 'Guardrails Not Handcuffs', description: 'Constraints that prevent catastrophe while enabling speed', category: 'operational'});
CREATE (:Concept {id: 'quality-as-default', name: 'Quality as Default', description: 'When quality is the easy path it becomes universal', category: 'operational'});
CREATE (:Concept {id: 'secure-defaults', name: 'Secure Defaults', description: 'Security enabled by default requiring opt-out not opt-in', category: 'operational'});
CREATE (:Concept {id: 'automated-delivery-path', name: 'Automated Delivery Path', description: 'Zero manual steps from merge to production', category: 'operational'});
CREATE (:Concept {id: 'bounded-downside', name: 'Bounded Downside', description: 'Limiting blast radius by design so worst case is tolerable', category: 'operational'});
CREATE (:Concept {id: 'reversible-decisions', name: 'Reversible Decisions', description: 'Two-way door decisions that can be undone if wrong', category: 'operational'});
CREATE (:Concept {id: 'irreversible-decisions', name: 'Irreversible Decisions', description: 'One-way door decisions requiring more deliberation', category: 'operational'});
CREATE (:Concept {id: 'rollback-capability', name: 'Rollback Capability', description: 'Ability to undo changes quickly without heroics', category: 'operational'});
CREATE (:Concept {id: 'pre-mortem', name: 'Pre-mortem', description: 'Imagining failure before commitment to identify risks', category: 'operational'});
CREATE (:Concept {id: 'blameless-postmortem', name: 'Blameless Postmortem', description: 'Focus on systems not individuals when analyzing incidents', category: 'operational'});
CREATE (:Concept {id: 'safe-to-fail-experiments', name: 'Safe-to-Fail Experiments', description: 'Bounded experiments with clear success criteria', category: 'operational'});
CREATE (:Concept {id: 'observable-progress', name: 'Observable Progress', description: 'Work that becomes clearer as it moves forward not more mysterious', category: 'operational'});
CREATE (:Concept {id: 'traceable-work', name: 'Traceable Work', description: 'Every change has intent, produces evidence, and can be explained', category: 'operational'});
CREATE (:Concept {id: 'minimum-viable-process', name: 'Minimum Viable Process', description: 'Intentionally small and sharp behaviors that matter', category: 'operational'});
CREATE (:Concept {id: 'small-changes', name: 'Small Changes', description: 'Changes sized so mistakes are contained and lessons clear', category: 'operational'});
CREATE (:Concept {id: 'early-signals', name: 'Early Signals', description: 'Knowing something is wrong before customers do', category: 'operational'});
CREATE (:Concept {id: 'clear-rollback-paths', name: 'Clear Rollback Paths', description: 'Every change can be undone', category: 'operational'});
CREATE (:Concept {id: 'codified-knowledge', name: 'Codified Knowledge', description: 'Knowledge captured in code, scripts, ADRs, and runbooks', category: 'operational'});
CREATE (:Concept {id: 'architecture-decision-records', name: 'Architecture Decision Records', description: 'Documents capturing why significant decisions were made', category: 'operational'});
CREATE (:Concept {id: 'runbooks', name: 'Runbooks', description: 'Codified operational knowledge for common procedures', category: 'operational'});
CREATE (:Concept {id: 'one-command-bootstrap', name: 'One-Command Bootstrap', description: 'Every project starts with a single command for new developers', category: 'operational'});
CREATE (:Concept {id: 'reproducible-environments', name: 'Reproducible Environments', description: 'Eliminating works on my machine through environment parity', category: 'operational'});
CREATE (:Concept {id: 'deterministic-builds', name: 'Deterministic Builds', description: 'Same inputs always produce same outputs', category: 'operational'});

// Technical Concepts
CREATE (:Concept {id: 'gitops', name: 'GitOps', description: 'Git as single source of truth with automated reconciliation', category: 'technical'});
CREATE (:Concept {id: 'container-orchestration', name: 'Container Orchestration', description: 'Platform for running containerized workloads with lifecycle management', category: 'technical'});
CREATE (:Concept {id: 'service-mesh', name: 'Service Mesh', description: 'Infrastructure layer for service-to-service communication with mTLS and traffic control', category: 'technical'});
CREATE (:Concept {id: 'api-gateway', name: 'API Gateway', description: 'Entry point for external traffic handling auth, rate limiting, and routing', category: 'technical'});
CREATE (:Concept {id: 'policy-as-code', name: 'Policy as Code', description: 'Policies versioned, tested, and enforced automatically via OPA', category: 'technical'});
CREATE (:Concept {id: 'observability-stack', name: 'Observability Stack', description: 'Metrics, logs, and traces providing full system visibility', category: 'technical'});
CREATE (:Concept {id: 'infrastructure-as-code', name: 'Infrastructure as Code', description: 'Infrastructure defined in version controlled code', category: 'technical'});
CREATE (:Concept {id: 'feature-flags', name: 'Feature Flags', description: 'Decouple deployment from release enabling instant rollback', category: 'technical'});
CREATE (:Concept {id: 'canary-deployment', name: 'Canary Deployment', description: 'Exposing changes to small populations before full rollout', category: 'technical'});
CREATE (:Concept {id: 'blue-green-deployment', name: 'Blue-Green Deployment', description: 'Maintaining two production environments for instant rollback', category: 'technical'});
CREATE (:Concept {id: 'circuit-breaker', name: 'Circuit Breaker', description: 'Pattern preventing cascade failures between services', category: 'technical'});
CREATE (:Concept {id: 'automatic-rollback', name: 'Automatic Rollback', description: 'System detects problems and reverts without human intervention', category: 'technical'});
CREATE (:Concept {id: 'contract-enforcement', name: 'Contract Enforcement', description: 'API schemas validated and breaking changes blocked', category: 'technical'});
CREATE (:Concept {id: 'pre-commit-hooks', name: 'Pre-commit Hooks', description: 'Automated checks preventing bad commits', category: 'technical'});
CREATE (:Concept {id: 'type-systems', name: 'Type Systems', description: 'Catching entire categories of errors at compile time', category: 'technical'});
CREATE (:Concept {id: 'linting-rules', name: 'Linting Rules', description: 'Automated enforcement of team coding standards', category: 'technical'});
CREATE (:Concept {id: 'structured-logging', name: 'Structured Logging', description: 'JSON logs with correlation IDs for tracing', category: 'technical'});
CREATE (:Concept {id: 'distributed-tracing', name: 'Distributed Tracing', description: 'Following requests across service boundaries', category: 'technical'});
CREATE (:Concept {id: 'secrets-management', name: 'Secrets Management', description: 'Secure handling of credentials without committing to git', category: 'technical'});
CREATE (:Concept {id: 'health-checks', name: 'Health Checks', description: 'Endpoints indicating service readiness and liveness', category: 'technical'});
CREATE (:Concept {id: 'boring-repeatable-solutions', name: 'Boring Repeatable Solutions', description: 'Preferring conventional over clever for maintainability', category: 'technical'});

// GovCon Concepts
CREATE (:Concept {id: 'govcon-compliance', name: 'GovCon Compliance', description: 'Government contracting compliance requirements', category: 'organizational'});
CREATE (:Concept {id: 'authority-to-operate', name: 'Authority to Operate', description: 'ATO security authorization for government systems', category: 'organizational'});
CREATE (:Concept {id: 'continuous-ato', name: 'Continuous ATO', description: 'Ongoing assessment integrated with delivery instead of point-in-time', category: 'organizational'});
CREATE (:Concept {id: 'compliance-evidence', name: 'Compliance Evidence', description: 'Automatic documentation that satisfies audit requirements', category: 'organizational'});
CREATE (:Concept {id: 'inherited-controls', name: 'Inherited Controls', description: 'Platform provides controls that applications inherit', category: 'organizational'});
CREATE (:Concept {id: 'evidence-based-deployment', name: 'Evidence-Based Deployment', description: 'Deployment decisions backed by data not hope', category: 'operational'});
CREATE (:Concept {id: 'trust-through-transparency', name: 'Trust Through Transparency', description: 'Building trust by showing verifiable evidence', category: 'organizational'});
CREATE (:Concept {id: 'calm-clear-evidence-first', name: 'Calm Clear Evidence First', description: 'Default posture for government partner communication', category: 'organizational'});

// Communication Concepts
CREATE (:Concept {id: 'coherence-across-levels', name: 'Coherence Across Levels', description: 'Same truth translated for executives, customers, and engineers', category: 'organizational'});
CREATE (:Concept {id: 'executive-translation', name: 'Executive Translation', description: 'FOE concepts translated to business value and risk', category: 'organizational'});
CREATE (:Concept {id: 'customer-translation', name: 'Customer Translation', description: 'FOE concepts translated to compliance and stability', category: 'organizational'});
CREATE (:Concept {id: 'engineer-translation', name: 'Engineer Translation', description: 'FOE concepts translated to autonomy and guardrails', category: 'organizational'});
CREATE (:Concept {id: 'normative-not-aspirational', name: 'Normative Not Aspirational', description: 'Describing how we actually behave not how we wish we did', category: 'organizational'});
CREATE (:Concept {id: 'truth-travels-fast', name: 'Truth Travels Fast', description: 'Conditions where problems surface quickly and cheaply', category: 'organizational'});
CREATE (:Concept {id: 'risk-discussable', name: 'Risk Discussable', description: 'Culture where risks can be openly talked about', category: 'organizational'});
CREATE (:Concept {id: 'ask-for-evidence', name: 'Ask for Evidence', description: 'Leadership practice of requiring proof over assurances', category: 'organizational'});
CREATE (:Concept {id: 'reward-clarity', name: 'Reward Clarity', description: 'Promoting people who make work legible and surface problems', category: 'organizational'});
CREATE (:Concept {id: 'blame-kills-learning', name: 'Blame Kills Learning', description: 'Punishment causes hiding problems and repeated mistakes', category: 'organizational'});
CREATE (:Concept {id: 'near-miss-reporting', name: 'Near Miss Reporting', description: 'Valuing reports of things that almost went wrong', category: 'organizational'});
CREATE (:Concept {id: 'surface-risk-early', name: 'Surface Risk Early', description: 'Blockers reported today are cheaper than crises next week', category: 'operational'});
CREATE (:Concept {id: 'learning-before-damage', name: 'Learning Before Damage', description: 'Feedback loops that teach before they punish', category: 'operational'});

// Anti-pattern Concepts
CREATE (:Concept {id: 'raw-velocity-optimization', name: 'Raw Velocity Optimization', description: 'Anti-pattern of removing all friction and measuring output volume', category: 'organizational'});
CREATE (:Concept {id: 'ceremonial-compliance', name: 'Ceremonial Compliance', description: 'Anti-pattern of following process for appearance not outcomes', category: 'organizational'});
CREATE (:Concept {id: 'waterfall-certainty-theater', name: 'Waterfall Certainty Theater', description: 'Anti-pattern of planning everything upfront to eliminate uncertainty', category: 'organizational'});
CREATE (:Concept {id: 'agile-theater', name: 'Agile Theater', description: 'Running sprints internally while presenting waterfall externally', category: 'organizational'});
CREATE (:Concept {id: 'cargo-culting', name: 'Cargo Culting', description: 'Copying patterns without understanding why they work', category: 'organizational'});
CREATE (:Concept {id: 'defensive-coding', name: 'Defensive Coding', description: 'Adding checks just in case because system is not understood', category: 'technical'});
CREATE (:Concept {id: 'oral-tradition', name: 'Oral Tradition', description: 'Knowledge living in heads not systems', category: 'organizational'});
CREATE (:Concept {id: 'learned-helplessness', name: 'Learned Helplessness', description: 'Accepting dysfunction as just how it is', category: 'psychological'});

// DevX Maturity Concepts
CREATE (:Concept {id: 'devx-maturity-model', name: 'DevX Maturity Model', description: 'Framework for assessing DevX capabilities across dimensions', category: 'operational'});
CREATE (:Concept {id: 'ad-hoc-maturity', name: 'Ad Hoc Maturity', description: 'Level 1 - No systematic approach depending on individual heroics', category: 'operational'});
CREATE (:Concept {id: 'defined-maturity', name: 'Defined Maturity', description: 'Level 2 - Processes exist but inconsistent with manual enforcement', category: 'operational'});
CREATE (:Concept {id: 'measured-maturity', name: 'Measured Maturity', description: 'Level 3 - Automated enforcement with metrics tracked', category: 'operational'});
CREATE (:Concept {id: 'optimized-maturity', name: 'Optimized Maturity', description: 'Level 4 - Continuous improvement with self-service', category: 'operational'});

// Developer Experience Concepts
CREATE (:Concept {id: 'developer-experience', name: 'Developer Experience', description: 'The operating system that makes FOE principles real through systematic design', category: 'operational'});
CREATE (:Concept {id: 'devx-for-understanding', name: 'DevX for Understanding', description: 'Reducing barriers to comprehension through conventions and paths', category: 'operational'});
CREATE (:Concept {id: 'devx-for-fast-feedback', name: 'DevX for Fast Feedback', description: 'Shortening the path from change to insight', category: 'operational'});
CREATE (:Concept {id: 'devx-for-confidence', name: 'DevX for Confidence', description: 'Guardrails and defaults that make quality the cheapest option', category: 'operational'});
CREATE (:Concept {id: 'predictable-conventions', name: 'Predictable Conventions', description: 'Consistent patterns that make the unfamiliar familiar', category: 'operational'});
CREATE (:Concept {id: 'coherent-interfaces', name: 'Coherent Interfaces', description: 'Clear boundaries showing where components begin and end', category: 'operational'});
CREATE (:Concept {id: 'paved-paths', name: 'Paved Paths', description: 'Clear supported ways to get work done for engineers', category: 'operational'});
CREATE (:Concept {id: 'fewer-heroics', name: 'Fewer Heroics', description: 'Sustainable pace without firefighting', category: 'operational'});
CREATE (:Concept {id: 'instant-feedback', name: 'Instant Feedback', description: 'Feedback in under 1 second from IDE and type checkers', category: 'operational'});
CREATE (:Concept {id: 'fast-feedback-tier', name: 'Fast Feedback Tier', description: 'Feedback in under 1 minute from unit tests', category: 'operational'});
CREATE (:Concept {id: 'pipeline-feedback', name: 'Pipeline Feedback', description: 'Feedback in under 10 minutes from CI pipeline', category: 'operational'});

// DORA and Measurement Concepts
CREATE (:Concept {id: 'dora-metrics-concept', name: 'DORA Metrics', description: 'Deployment frequency, lead time, change failure rate, time to restore', category: 'operational'});
CREATE (:Concept {id: 'deployment-frequency', name: 'Deployment Frequency', description: 'How often code is deployed to production', category: 'operational'});
CREATE (:Concept {id: 'lead-time', name: 'Lead Time', description: 'Time from commit to production', category: 'operational'});
CREATE (:Concept {id: 'change-failure-rate', name: 'Change Failure Rate', description: 'Percentage of deployments causing incidents', category: 'operational'});
CREATE (:Concept {id: 'time-to-restore', name: 'Time to Restore', description: 'How quickly service is restored after incidents', category: 'operational'});
CREATE (:Concept {id: 'mean-time-to-detection', name: 'Mean Time to Detection', description: 'How quickly problems are discovered', category: 'operational'});
CREATE (:Concept {id: 'flow-metrics', name: 'Flow Metrics', description: 'Metrics measuring flow of work vs output volume', category: 'operational'});
CREATE (:Concept {id: 'flaky-test-rate', name: 'Flaky Test Rate', description: 'Percentage of test failures from unreliable tests', category: 'operational'});
CREATE (:Concept {id: 'slo-management', name: 'SLO Management', description: 'Defining and maintaining service level objectives', category: 'operational'});

// Cognitive Architecture Concepts
CREATE (:Concept {id: 'foe-cognitive-architecture', name: 'FOE as Cognitive Architecture', description: 'Design decisions preserving human judgment under complexity', category: 'core'});
CREATE (:Concept {id: 'cockpit-principle', name: 'Cockpit Principle', description: 'External representations making human judgment possible', category: 'psychological'});
CREATE (:Concept {id: 'training-cost-trap', name: 'Training Cost Trap', description: 'Anti-pattern of trying to train understanding into incomprehensible systems', category: 'organizational'});
