// ============================================================================
// FOE KNOWLEDGE GRAPH - ALL RELATIONSHIPS
// Inferred and explicit relationships between nodes
// Generated: 2026-02-01
// ============================================================================

// ============================================================================
// COGNITIVE TRIANGLE RELATIONSHIPS
// The three principles form a mutually reinforcing system
// ============================================================================

// Principle-to-Principle (Enabling Cycle)
MATCH (u:Principle {id: 'understanding'}), (f:Principle {id: 'fast-feedback'})
CREATE (u)-[:ENABLES {mechanism: 'You can only interpret feedback if you understand the system', strength: 'strong'}]->(f);

MATCH (f:Principle {id: 'fast-feedback'}), (u:Principle {id: 'understanding'})
CREATE (f)-[:ENABLES {mechanism: 'Feedback is how you develop understanding', strength: 'strong'}]->(u);

MATCH (u:Principle {id: 'understanding'}), (c:Principle {id: 'confidence'})
CREATE (u)-[:ENABLES {mechanism: 'You can only confidently change what you understand', strength: 'strong'}]->(c);

MATCH (c:Principle {id: 'confidence'}), (u:Principle {id: 'understanding'})
CREATE (c)-[:ENABLES {mechanism: 'Confident teams explore and document', strength: 'strong'}]->(u);

MATCH (f:Principle {id: 'fast-feedback'}), (c:Principle {id: 'confidence'})
CREATE (f)-[:ENABLES {mechanism: 'Quick recovery from failure makes failure safe', strength: 'strong'}]->(c);

MATCH (c:Principle {id: 'confidence'}), (f:Principle {id: 'fast-feedback'})
CREATE (c)-[:ENABLES {mechanism: 'Confident teams create feedback mechanisms', strength: 'strong'}]->(f);

// Principle-to-Principle (Degradation)
MATCH (u:Principle {id: 'understanding'}), (f:Principle {id: 'fast-feedback'})
CREATE (u)-[:DEGRADES {mechanism: 'Without understanding, feedback becomes noise', when: 'missing'}]->(f);

MATCH (f:Principle {id: 'fast-feedback'}), (c:Principle {id: 'confidence'})
CREATE (f)-[:DEGRADES {mechanism: 'Without fast feedback, confidence becomes delusion', when: 'missing'}]->(c);

MATCH (c:Principle {id: 'confidence'}), (u:Principle {id: 'understanding'})
CREATE (c)-[:DEGRADES {mechanism: 'Without confidence, understanding becomes academic', when: 'missing'}]->(u);

// Model represents principles
MATCH (m:Model {id: 'cognitive-triangle'}), (p:Principle)
CREATE (m)-[:CONTAINS]->(p);

// ============================================================================
// METAPHOR RELATIONSHIPS
// Metaphors illustrate principles and concepts
// ============================================================================

MATCH (m:Metaphor {id: 'gauges-and-instrumentation'}), (p:Principle {id: 'fast-feedback'})
CREATE (m)-[:ILLUSTRATES {mapping: 'Race cars have more gauges because higher speeds require more feedback'}]->(p);

MATCH (m:Metaphor {id: 'gauges-and-instrumentation'}), (c:Concept {id: 'instrumentation-as-acceleration'})
CREATE (m)-[:ILLUSTRATES {mapping: 'Gauges enable speed, not restrict it'}]->(c);

MATCH (m:Metaphor {id: 'the-cockpit'}), (p:Principle {id: 'understanding'})
CREATE (m)-[:ILLUSTRATES {mapping: 'Operators need visibility and control for understanding'}]->(p);

MATCH (m:Metaphor {id: 'the-cockpit'}), (c:Concept {id: 'developer-experience'})
CREATE (m)-[:ILLUSTRATES {mapping: 'DevX is the cockpit for engineering teams'}]->(c);

MATCH (m:Metaphor {id: 'operating-envelope'}), (p:Principle {id: 'confidence'})
CREATE (m)-[:ILLUSTRATES {mapping: 'Operating envelope enables safe high-speed operation'}]->(p);

MATCH (m:Metaphor {id: 'operating-envelope'}), (c:Concept {id: 'guardrails-not-handcuffs'})
CREATE (m)-[:ILLUSTRATES {mapping: 'Guardrails define the operating envelope'}]->(c);

MATCH (m:Metaphor {id: 'receipts'}), (c:Concept {id: 'evidence-trail'})
CREATE (m)-[:ILLUSTRATES {mapping: 'Good systems generate receipts automatically'}]->(c);

MATCH (m:Metaphor {id: 'receipts'}), (c:Concept {id: 'compliance-evidence'})
CREATE (m)-[:ILLUSTRATES {mapping: 'Receipts satisfy audit requirements'}]->(c);

MATCH (m:Metaphor {id: 'pets-vs-cattle'}), (c:Concept {id: 'infrastructure-as-code'})
CREATE (m)-[:ILLUSTRATES {mapping: 'Cattle approach enables scalable infrastructure'}]->(c);

// ============================================================================
// ANTI-PATTERN RELATIONSHIPS
// Anti-patterns contrast with principles
// ============================================================================

MATCH (a:AntiPattern {id: 'vibe-coding'}), (p:Principle {id: 'confidence'})
CREATE (a)-[:CONTRASTS {nature: 'Vibe coding produces false confidence without evidence'}]->(p);

MATCH (a:AntiPattern {id: 'vibe-coding'}), (c:Concept {id: 'evidence-based-deployment'})
CREATE (a)-[:CONTRASTS {nature: 'Vibe coding skips verification'}]->(c);

MATCH (a:AntiPattern {id: 'heroic-engineering'}), (p:Principle {id: 'understanding'})
CREATE (a)-[:CONTRASTS {nature: 'Heroics concentrate knowledge instead of distributing it'}]->(p);

MATCH (a:AntiPattern {id: 'heroic-engineering'}), (c:Concept {id: 'tribal-knowledge'})
CREATE (a)-[:MANIFESTS_AS]->(c);

MATCH (a:AntiPattern {id: 'modernization-theater'}), (p:Principle {id: 'fast-feedback'})
CREATE (a)-[:CONTRASTS {nature: 'New tools without new practices dont improve feedback'}]->(p);

MATCH (a:AntiPattern {id: 'tool-worship'}), (c:Concept {id: 'process-theater'})
CREATE (a)-[:MANIFESTS_AS]->(c);

MATCH (a:AntiPattern {id: 'velocity-theater'}), (c:Concept {id: 'flow-vs-output'})
CREATE (a)-[:CONTRASTS {nature: 'Velocity theater optimizes output not flow'}]->(c);

MATCH (a:AntiPattern {id: 'certainty-theater'}), (c:Concept {id: 'reversible-decisions'})
CREATE (a)-[:CONTRASTS {nature: 'Certainty theater demands impossible precision'}]->(c);

// ============================================================================
// MATURITY LEVEL RELATIONSHIPS
// Levels build on each other
// ============================================================================

MATCH (l0:MaturityLevel {id: 'level-0'}), (l1:MaturityLevel {id: 'level-1'})
CREATE (l0)-[:PRECEDES {requirement: 'Basic observability'}]->(l1);

MATCH (l1:MaturityLevel {id: 'level-1'}), (l2:MaturityLevel {id: 'level-2'})
CREATE (l1)-[:PRECEDES {requirement: 'Standardized delivery paths'}]->(l2);

MATCH (l2:MaturityLevel {id: 'level-2'}), (l3:MaturityLevel {id: 'level-3'})
CREATE (l2)-[:PRECEDES {requirement: 'Short trusted feedback loops'}]->(l3);

MATCH (l3:MaturityLevel {id: 'level-3'}), (l4:MaturityLevel {id: 'level-4'})
CREATE (l3)-[:PRECEDES {requirement: 'Capacity to absorb change'}]->(l4);

// Maturity levels emphasize different principles
MATCH (l1:MaturityLevel {id: 'level-1'}), (p:Principle {id: 'understanding'})
CREATE (l1)-[:EMPHASIZES]->(p);

MATCH (l2:MaturityLevel {id: 'level-2'}), (p:Principle {id: 'confidence'})
CREATE (l2)-[:EMPHASIZES]->(p);

MATCH (l3:MaturityLevel {id: 'level-3'}), (p:Principle {id: 'fast-feedback'})
CREATE (l3)-[:EMPHASIZES]->(p);

// ============================================================================
// TRANSFORMATION PHASE RELATIONSHIPS
// Phases represent the transformation journey
// ============================================================================

MATCH (p0:Phase {id: 'phase-0'}), (p1:Phase {id: 'phase-1'})
CREATE (p0)-[:PRECEDES {challenge: 'Cloud adoption without transformation'}]->(p1);

MATCH (p1:Phase {id: 'phase-1'}), (p2:Phase {id: 'phase-2'})
CREATE (p1)-[:PRECEDES {challenge: 'Tools changed but disciplines didnt'}]->(p2);

MATCH (p2:Phase {id: 'phase-2'}), (p3:Phase {id: 'phase-3'})
CREATE (p2)-[:PRECEDES {challenge: 'Existential shift to cloud native'}]->(p3);

MATCH (p3:Phase {id: 'phase-3'}), (p4:Phase {id: 'phase-4'})
CREATE (p3)-[:PRECEDES {challenge: 'AI coding agents emerge'}]->(p4);

MATCH (p4:Phase {id: 'phase-4'}), (p5:Phase {id: 'phase-5'})
CREATE (p5)-[:PRECEDES {challenge: 'Code governance at scale'}]->(p5);

// ============================================================================
// OBSERVATION-METHOD RELATIONSHIPS
// Observations support methods
// ============================================================================

// Internal observations
MATCH (o:Observation {id: 'O-100'}), (m:Method {id: 'M-127'})
CREATE (o)-[:SUPPORTS {strength: 'strong', type: 'direct evidence'}]->(m);

MATCH (o:Observation {id: 'O-100'}), (m:Method {id: 'M-121'})
CREATE (o)-[:SUPPORTS {strength: 'strong', type: 'direct evidence'}]->(m);

MATCH (o:Observation {id: 'O-100'}), (m:Method {id: 'M-126'})
CREATE (o)-[:SUPPORTS {strength: 'moderate', type: 'supporting evidence'}]->(m);

MATCH (o:Observation {id: 'O-101'}), (m:Method {id: 'M-153'})
CREATE (o)-[:SUPPORTS {strength: 'strong', type: 'case study'}]->(m);

MATCH (o:Observation {id: 'O-102'}), (m:Method {id: 'M-154'})
CREATE (o)-[:SUPPORTS {strength: 'moderate', type: 'cautionary tale'}]->(m);

MATCH (o:Observation {id: 'O-102'}), (m:Method {id: 'M-146'})
CREATE (o)-[:SUPPORTS {strength: 'moderate', type: 'negative example'}]->(m);

MATCH (o:Observation {id: 'O-103'}), (m:Method {id: 'M-150'})
CREATE (o)-[:SUPPORTS {strength: 'strong', type: 'direct evidence'}]->(m);

MATCH (o:Observation {id: 'O-125'}), (m:Method {id: 'M-156'})
CREATE (o)-[:SUPPORTS {strength: 'strong', type: 'direct evidence'}]->(m);

// External observations
MATCH (o:Observation {id: 'O-110'}), (m:Method {id: 'M-111'})
CREATE (o)-[:SUPPORTS {strength: 'strong', type: 'research validation'}]->(m);

MATCH (o:Observation {id: 'O-110'}), (m:Method {id: 'M-153'})
CREATE (o)-[:SUPPORTS {strength: 'strong', type: 'research validation'}]->(m);

MATCH (o:Observation {id: 'O-114'}), (m:Method {id: 'M-138'})
CREATE (o)-[:SUPPORTS {strength: 'strong', type: 'research validation'}]->(m);

MATCH (o:Observation {id: 'O-117'}), (m:Method {id: 'M-151'})
CREATE (o)-[:SUPPORTS {strength: 'strong', type: 'seminal case study'}]->(m);

MATCH (o:Observation {id: 'O-120'}), (m:Method {id: 'M-121'})
CREATE (o)-[:SUPPORTS {strength: 'strong', type: 'research validation'}]->(m);

MATCH (o:Observation {id: 'O-124'}), (m:Method {id: 'M-121'})
CREATE (o)-[:SUPPORTS {strength: 'strong', type: 'research validation'}]->(m);

// ============================================================================
// METHOD-FRAMEWORK RELATIONSHIPS
// Methods belong to frameworks
// ============================================================================

// BDD Methods
MATCH (m:Method) WHERE m.id STARTS WITH 'bdd-'
MATCH (f:Framework {id: 'bdd'})
CREATE (m)-[:BELONGS_TO]->(f);

// CD Methods
MATCH (m:Method) WHERE m.id STARTS WITH 'cd-'
MATCH (f:Framework {id: 'continuous-delivery'})
CREATE (m)-[:BELONGS_TO]->(f);

// DDD Methods
MATCH (m:Method) WHERE m.id STARTS WITH 'ddd-'
MATCH (f:Framework {id: 'domain-driven-design'})
CREATE (m)-[:BELONGS_TO]->(f);

// DORA Methods
MATCH (m:Method) WHERE m.id STARTS WITH 'dora-'
MATCH (f:Framework {id: 'dora'})
CREATE (m)-[:BELONGS_TO]->(f);

// Double Diamond Methods
MATCH (m:Method) WHERE m.id STARTS WITH 'double-diamond-'
MATCH (f:Framework {id: 'double-diamond'})
CREATE (m)-[:BELONGS_TO]->(f);

// Team Topologies Methods
MATCH (m:Method) WHERE m.id STARTS WITH 'team-topologies-'
MATCH (f:Framework {id: 'team-topologies'})
CREATE (m)-[:BELONGS_TO]->(f);

// ============================================================================
// CONCEPT-PRINCIPLE RELATIONSHIPS
// Concepts support principles
// ============================================================================

// Understanding concepts
MATCH (c:Concept {id: 'cognitive-load'}), (p:Principle {id: 'understanding'})
CREATE (c)-[:SUPPORTS]->(p);

MATCH (c:Concept {id: 'mental-model'}), (p:Principle {id: 'understanding'})
CREATE (c)-[:SUPPORTS]->(p);

MATCH (c:Concept {id: 'system-legibility'}), (p:Principle {id: 'understanding'})
CREATE (c)-[:SUPPORTS]->(p);

MATCH (c:Concept {id: 'codified-knowledge'}), (p:Principle {id: 'understanding'})
CREATE (c)-[:SUPPORTS]->(p);

MATCH (c:Concept {id: 'golden-paths'}), (p:Principle {id: 'understanding'})
CREATE (c)-[:SUPPORTS]->(p);

MATCH (c:Concept {id: 'predictable-conventions'}), (p:Principle {id: 'understanding'})
CREATE (c)-[:SUPPORTS]->(p);

// Fast Feedback concepts
MATCH (c:Concept {id: 'continuous-integration'}), (p:Principle {id: 'fast-feedback'})
CREATE (c)-[:SUPPORTS]->(p);

MATCH (c:Concept {id: 'time-to-disconfirmation'}), (p:Principle {id: 'fast-feedback'})
CREATE (c)-[:SUPPORTS]->(p);

MATCH (c:Concept {id: 'visibility-of-consequences'}), (p:Principle {id: 'fast-feedback'})
CREATE (c)-[:SUPPORTS]->(p);

MATCH (c:Concept {id: 'instant-feedback'}), (p:Principle {id: 'fast-feedback'})
CREATE (c)-[:SUPPORTS]->(p);

MATCH (c:Concept {id: 'fast-feedback-tier'}), (p:Principle {id: 'fast-feedback'})
CREATE (c)-[:SUPPORTS]->(p);

MATCH (c:Concept {id: 'pipeline-feedback'}), (p:Principle {id: 'fast-feedback'})
CREATE (c)-[:SUPPORTS]->(p);

MATCH (c:Concept {id: 'observability-stack'}), (p:Principle {id: 'fast-feedback'})
CREATE (c)-[:SUPPORTS]->(p);

MATCH (c:Concept {id: 'belief-calibration'}), (p:Principle {id: 'fast-feedback'})
CREATE (c)-[:SUPPORTS]->(p);

// Confidence concepts
MATCH (c:Concept {id: 'bounded-downside'}), (p:Principle {id: 'confidence'})
CREATE (c)-[:SUPPORTS]->(p);

MATCH (c:Concept {id: 'reversible-decisions'}), (p:Principle {id: 'confidence'})
CREATE (c)-[:SUPPORTS]->(p);

MATCH (c:Concept {id: 'rollback-capability'}), (p:Principle {id: 'confidence'})
CREATE (c)-[:SUPPORTS]->(p);

MATCH (c:Concept {id: 'guardrails-not-handcuffs'}), (p:Principle {id: 'confidence'})
CREATE (c)-[:SUPPORTS]->(p);

MATCH (c:Concept {id: 'psychological-safety-for-decision-making'}), (p:Principle {id: 'confidence'})
CREATE (c)-[:SUPPORTS]->(p);

MATCH (c:Concept {id: 'courage-by-design'}), (p:Principle {id: 'confidence'})
CREATE (c)-[:SUPPORTS]->(p);

MATCH (c:Concept {id: 'feature-flags'}), (p:Principle {id: 'confidence'})
CREATE (c)-[:SUPPORTS]->(p);

MATCH (c:Concept {id: 'canary-deployment'}), (p:Principle {id: 'confidence'})
CREATE (c)-[:SUPPORTS]->(p);

MATCH (c:Concept {id: 'blue-green-deployment'}), (p:Principle {id: 'confidence'})
CREATE (c)-[:SUPPORTS]->(p);

// ============================================================================
// CONCEPT-CONCEPT RELATIONSHIPS
// Concepts relate to each other
// ============================================================================

// Cognitive load types
MATCH (i:Concept {id: 'intrinsic-load'}), (c:Concept {id: 'cognitive-load'})
CREATE (i)-[:PART_OF]->(c);

MATCH (e:Concept {id: 'extraneous-load'}), (c:Concept {id: 'cognitive-load'})
CREATE (e)-[:PART_OF]->(c);

MATCH (g:Concept {id: 'germane-load'}), (c:Concept {id: 'cognitive-load'})
CREATE (g)-[:PART_OF]->(c);

// DevX maturity levels
MATCH (a:Concept {id: 'ad-hoc-maturity'}), (d:Concept {id: 'devx-maturity-model'})
CREATE (a)-[:PART_OF]->(d);

MATCH (d:Concept {id: 'defined-maturity'}), (dm:Concept {id: 'devx-maturity-model'})
CREATE (d)-[:PART_OF]->(dm);

MATCH (m:Concept {id: 'measured-maturity'}), (dm:Concept {id: 'devx-maturity-model'})
CREATE (m)-[:PART_OF]->(dm);

MATCH (o:Concept {id: 'optimized-maturity'}), (dm:Concept {id: 'devx-maturity-model'})
CREATE (o)-[:PART_OF]->(dm);

// Feedback tiers
MATCH (i:Concept {id: 'instant-feedback'}), (d:Concept {id: 'devx-for-fast-feedback'})
CREATE (i)-[:PART_OF]->(d);

MATCH (f:Concept {id: 'fast-feedback-tier'}), (d:Concept {id: 'devx-for-fast-feedback'})
CREATE (f)-[:PART_OF]->(d);

MATCH (p:Concept {id: 'pipeline-feedback'}), (d:Concept {id: 'devx-for-fast-feedback'})
CREATE (p)-[:PART_OF]->(d);

// Triad components
MATCH (p:Concept {id: 'people-changes'}), (t:Model {id: 'foe-triad'})
CREATE (p)-[:PART_OF]->(t);

MATCH (pr:Concept {id: 'process-changes'}), (t:Model {id: 'foe-triad'})
CREATE (pr)-[:PART_OF]->(t);

MATCH (te:Concept {id: 'technology-changes'}), (t:Model {id: 'foe-triad'})
CREATE (te)-[:PART_OF]->(t);

// Enabling relationships between concepts
MATCH (c:Concept {id: 'codified-knowledge'}), (t:Concept {id: 'tribal-knowledge'})
CREATE (c)-[:REPLACES]->(t);

MATCH (a:Concept {id: 'automated-stewardship'}), (m:Concept {id: 'manual-guardianship'})
CREATE (a)-[:REPLACES]->(m);

MATCH (e:Concept {id: 'enabling-flow'}), (g:Concept {id: 'gatekeeping'})
CREATE (e)-[:REPLACES]->(g);

MATCH (g:Concept {id: 'golden-paths'}), (c:Concept {id: 'cognitive-load'})
CREATE (g)-[:REDUCES]->(c);

MATCH (p:Concept {id: 'predictable-conventions'}), (c:Concept {id: 'cognitive-load'})
CREATE (p)-[:REDUCES]->(c);

MATCH (o:Concept {id: 'one-command-bootstrap'}), (c:Concept {id: 'cognitive-load'})
CREATE (o)-[:REDUCES]->(c);

// ============================================================================
// STAKEHOLDER RELATIONSHIPS
// Content applies to stakeholders
// ============================================================================

MATCH (p:Principle), (s:Stakeholder {id: 'engineers'})
CREATE (p)-[:APPLIES_TO {translation: 'autonomy and guardrails'}]->(s);

MATCH (p:Principle), (s:Stakeholder {id: 'engineering-leaders'})
CREATE (p)-[:APPLIES_TO {translation: 'team delivery reliability'}]->(s);

MATCH (p:Principle), (s:Stakeholder {id: 'executives'})
CREATE (p)-[:APPLIES_TO {translation: 'delivery risk and ROI'}]->(s);

MATCH (p:Principle), (s:Stakeholder {id: 'government-customers'})
CREATE (p)-[:APPLIES_TO {translation: 'compliance and stability'}]->(s);

MATCH (p:Principle), (s:Stakeholder {id: 'capture-teams'})
CREATE (p)-[:APPLIES_TO {translation: 'competitive differentiation'}]->(s);

// ============================================================================
// TERM-CONCEPT RELATIONSHIPS
// Terms define concepts
// ============================================================================

MATCH (t:Term {id: 'flow'}), (c:Concept {id: 'flow-vs-output'})
CREATE (t)-[:DEFINES]->(c);

MATCH (t:Term {id: 'institutions'}), (c:Concept {id: 'lightweight-institutions'})
CREATE (t)-[:DEFINES]->(c);

MATCH (t:Term {id: 'disciplines'}), (c:Concept {id: 'minimum-viable-process'})
CREATE (t)-[:DEFINES]->(c);

MATCH (t:Term {id: 'paved-path'}), (c:Concept {id: 'paved-paths'})
CREATE (t)-[:DEFINES]->(c);

MATCH (t:Term {id: 'blast-radius'}), (c:Concept {id: 'bounded-downside'})
CREATE (t)-[:DEFINES]->(c);

MATCH (t:Term {id: 'cognitive-offloading'}), (c:Concept {id: 'cognitive-load'})
CREATE (t)-[:RELATES_TO]->(c);

MATCH (t:Term {id: 'epistemic-hygiene'}), (c:Concept {id: 'belief-calibration'})
CREATE (t)-[:RELATES_TO]->(c);

MATCH (t:Term {id: 'gitops'}), (c:Concept {id: 'gitops'})
CREATE (t)-[:DEFINES]->(c);

MATCH (t:Term {id: 'guardrails'}), (c:Concept {id: 'guardrails-not-handcuffs'})
CREATE (t)-[:DEFINES]->(c);

MATCH (t:Term {id: 'observability'}), (c:Concept {id: 'observability-stack'})
CREATE (t)-[:DEFINES]->(c);

// ============================================================================
// DORA METRICS RELATIONSHIPS
// DORA metrics connect to concepts
// ============================================================================

MATCH (m:Method {id: 'dora-deployment-frequency'}), (c:Concept {id: 'deployment-frequency'})
CREATE (m)-[:MEASURES]->(c);

MATCH (m:Method {id: 'dora-lead-time-for-changes'}), (c:Concept {id: 'lead-time'})
CREATE (m)-[:MEASURES]->(c);

MATCH (m:Method {id: 'dora-change-failure-rate'}), (c:Concept {id: 'change-failure-rate'})
CREATE (m)-[:MEASURES]->(c);

MATCH (m:Method {id: 'dora-time-to-restore-service'}), (c:Concept {id: 'time-to-restore'})
CREATE (m)-[:MEASURES]->(c);

// ============================================================================
// CROSS-FRAMEWORK RELATIONSHIPS
// How external frameworks connect to FOE
// ============================================================================

// BDD supports Fast Feedback
MATCH (f:Framework {id: 'bdd'}), (p:Principle {id: 'fast-feedback'})
CREATE (f)-[:SUPPORTS {mechanism: 'Executable specifications provide immediate verification'}]->(p);

MATCH (f:Framework {id: 'bdd'}), (p:Principle {id: 'understanding'})
CREATE (f)-[:SUPPORTS {mechanism: 'Shared language bridges business and technical'}]->(p);

// DORA supports all principles
MATCH (f:Framework {id: 'dora'}), (p:Principle {id: 'fast-feedback'})
CREATE (f)-[:SUPPORTS {mechanism: 'Metrics enable measurement of feedback loops'}]->(p);

// CD supports Confidence
MATCH (f:Framework {id: 'continuous-delivery'}), (p:Principle {id: 'confidence'})
CREATE (f)-[:SUPPORTS {mechanism: 'Safe deployment practices enable confident releases'}]->(p);

// DDD supports Understanding
MATCH (f:Framework {id: 'domain-driven-design'}), (p:Principle {id: 'understanding'})
CREATE (f)-[:SUPPORTS {mechanism: 'Ubiquitous language and bounded contexts create shared understanding'}]->(p);

// Team Topologies supports all principles
MATCH (f:Framework {id: 'team-topologies'}), (p:Principle {id: 'understanding'})
CREATE (f)-[:SUPPORTS {mechanism: 'Cognitive load management reduces understanding burden'}]->(p);

MATCH (f:Framework {id: 'team-topologies'}), (p:Principle {id: 'fast-feedback'})
CREATE (f)-[:SUPPORTS {mechanism: 'Stream-aligned teams enable fast flow'}]->(p);
