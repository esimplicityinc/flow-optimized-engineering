// ============================================================================
// FOE Knowledge Graph Schema
// Flow Optimized Engineering - Neo4j Schema Definition
// ============================================================================

// ----------------------------------------------------------------------------
// CONSTRAINTS - Ensure unique identifiers for each node type
// ----------------------------------------------------------------------------

CREATE CONSTRAINT concept_id IF NOT EXISTS FOR (c:Concept) REQUIRE c.id IS UNIQUE;
CREATE CONSTRAINT principle_id IF NOT EXISTS FOR (p:Principle) REQUIRE p.id IS UNIQUE;
CREATE CONSTRAINT metaphor_id IF NOT EXISTS FOR (m:Metaphor) REQUIRE m.id IS UNIQUE;
CREATE CONSTRAINT model_id IF NOT EXISTS FOR (m:Model) REQUIRE m.id IS UNIQUE;
CREATE CONSTRAINT term_id IF NOT EXISTS FOR (t:Term) REQUIRE t.id IS UNIQUE;
CREATE CONSTRAINT quote_id IF NOT EXISTS FOR (q:Quote) REQUIRE q.id IS UNIQUE;
CREATE CONSTRAINT document_id IF NOT EXISTS FOR (d:Document) REQUIRE d.id IS UNIQUE;
CREATE CONSTRAINT method_id IF NOT EXISTS FOR (m:Method) REQUIRE m.id IS UNIQUE;
CREATE CONSTRAINT observation_id IF NOT EXISTS FOR (o:Observation) REQUIRE o.id IS UNIQUE;
CREATE CONSTRAINT framework_id IF NOT EXISTS FOR (f:Framework) REQUIRE f.id IS UNIQUE;
CREATE CONSTRAINT antipattern_id IF NOT EXISTS FOR (a:AntiPattern) REQUIRE a.id IS UNIQUE;
CREATE CONSTRAINT maturity_level_id IF NOT EXISTS FOR (ml:MaturityLevel) REQUIRE ml.id IS UNIQUE;
CREATE CONSTRAINT phase_id IF NOT EXISTS FOR (p:Phase) REQUIRE p.id IS UNIQUE;
CREATE CONSTRAINT stakeholder_id IF NOT EXISTS FOR (s:Stakeholder) REQUIRE s.id IS UNIQUE;

// ----------------------------------------------------------------------------
// INDEXES - Optimize common query patterns
// ----------------------------------------------------------------------------

CREATE INDEX concept_name IF NOT EXISTS FOR (c:Concept) ON (c.name);
CREATE INDEX concept_category IF NOT EXISTS FOR (c:Concept) ON (c.category);
CREATE INDEX principle_name IF NOT EXISTS FOR (p:Principle) ON (p.name);
CREATE INDEX metaphor_name IF NOT EXISTS FOR (m:Metaphor) ON (m.name);
CREATE INDEX model_name IF NOT EXISTS FOR (m:Model) ON (m.name);
CREATE INDEX term_name IF NOT EXISTS FOR (t:Term) ON (t.name);
CREATE INDEX quote_type IF NOT EXISTS FOR (q:Quote) ON (q.type);
CREATE INDEX document_path IF NOT EXISTS FOR (d:Document) ON (d.path);
CREATE INDEX document_section IF NOT EXISTS FOR (d:Document) ON (d.section);
CREATE INDEX method_name IF NOT EXISTS FOR (m:Method) ON (m.name);
CREATE INDEX method_maturity IF NOT EXISTS FOR (m:Method) ON (m.maturityLevel);
CREATE INDEX observation_name IF NOT EXISTS FOR (o:Observation) ON (o.name);
CREATE INDEX observation_type IF NOT EXISTS FOR (o:Observation) ON (o.type);
CREATE INDEX framework_name IF NOT EXISTS FOR (f:Framework) ON (f.name);
CREATE INDEX antipattern_name IF NOT EXISTS FOR (a:AntiPattern) ON (a.name);

// Full-text search indexes for content exploration
CREATE FULLTEXT INDEX concept_search IF NOT EXISTS FOR (c:Concept) ON EACH [c.name, c.description, c.keywords];
CREATE FULLTEXT INDEX quote_search IF NOT EXISTS FOR (q:Quote) ON EACH [q.text, c.context];
CREATE FULLTEXT INDEX term_search IF NOT EXISTS FOR (t:Term) ON EACH [t.name, t.definition];

// ----------------------------------------------------------------------------
// NODE LABEL DEFINITIONS WITH PROPERTIES
// ----------------------------------------------------------------------------

// Concept - Core ideas and abstractions
// Properties:
//   id: string (unique identifier, kebab-case)
//   name: string (display name)
//   description: string (brief explanation)
//   category: string (core|operational|psychological|technical|organizational)
//   keywords: string[] (search terms)
//   aliases: string[] (alternative names)

// Principle - The three FOE optimizations
// Properties:
//   id: string (understanding|fast-feedback|confidence)
//   name: string (full name)
//   shortName: string (abbreviated)
//   description: string
//   order: int (1, 2, 3)
//   question: string (what question it answers)
//   failureMode: string (what happens without it)

// Metaphor - Named analogies used to explain concepts
// Properties:
//   id: string
//   name: string
//   sourceDomain: string (where the metaphor comes from)
//   description: string
//   whenToUse: string
//   keyInsight: string
//   commonMisapplication: string

// Model - Named frameworks/diagrams
// Properties:
//   id: string
//   name: string
//   description: string
//   visualType: string (triangle|curve|matrix|hierarchy|cycle)
//   components: string[]

// Term - Glossary definitions
// Properties:
//   id: string
//   name: string
//   definition: string
//   seeAlso: string[]

// Quote - Memorable/quotable lines
// Properties:
//   id: string (q-NNN)
//   text: string (the quote itself)
//   context: string (surrounding context)
//   type: string (maxim|insight|contrast|warning|govcon|definition)
//   emphasis: string (bold|blockquote|callout|tip)

// Document - Source pages
// Properties:
//   id: string
//   path: string (relative path from docs/docs/)
//   title: string
//   section: string (intro|principles|reference|maturity-model|etc)
//   sidebarPosition: int

// Method - Practices from Field Guides
// Properties:
//   id: string (M-NNN)
//   name: string
//   description: string
//   maturityLevel: string (established|emerging|experimental)
//   fieldGuide: string (agentic-coding|architecture|etc)

// Observation - Evidence supporting methods
// Properties:
//   id: string (O-NNN)
//   name: string
//   type: string (internal|external)
//   description: string
//   source: string
//   date: string
//   methodology: string

// Framework - External frameworks
// Properties:
//   id: string
//   name: string (short name)
//   fullName: string
//   description: string
//   source: string (URL or citation)

// AntiPattern - Practices FOE rejects
// Properties:
//   id: string
//   name: string
//   description: string
//   symptoms: string[]
//   consequences: string[]
//   remediation: string

// MaturityLevel - FOE Maturity Model levels
// Properties:
//   id: string (level-0, level-1, etc)
//   level: int (0-4)
//   name: string (Fragile, Visible, Repeatable, Flowing, Adaptive)
//   tagline: string
//   description: string
//   characteristics: string[]

// Phase - Transformation Model phases
// Properties:
//   id: string (phase-0, phase-1, etc)
//   phase: int (0-5)
//   name: string
//   description: string
//   focus: string
//   duration: string

// Stakeholder - Audience types
// Properties:
//   id: string
//   name: string
//   description: string
//   concerns: string[]

// ----------------------------------------------------------------------------
// RELATIONSHIP TYPE DEFINITIONS
// ----------------------------------------------------------------------------

// Causal Relationships
// (a)-[:ENABLES {strength: 'strong'|'moderate'|'weak', mechanism: string}]->(b)
// (a)-[:DEGRADES {mechanism: string}]->(b)
// (a)-[:REQUIRES]->(b)
// (a)-[:PRODUCES]->(b)

// Structural Relationships
// (a)-[:PART_OF]->(b)
// (a)-[:BELONGS_TO]->(b)
// (a)-[:EXAMPLE_OF]->(b)

// Semantic Relationships
// (a)-[:ILLUSTRATES {mapping: string}]->(b)
// (a)-[:CONTRASTS {nature: string}]->(b)
// (a)-[:ANALOGOUS_TO {basis: string}]->(b)
// (a)-[:MANIFESTS_AS]->(b)

// Ordering Relationships
// (a)-[:PRECEDES]->(b)

// Balance Relationships (for Cognitive Triangle)
// (a)-[:CHECKS {against: string}]->(b)
// (a)-[:REINFORCES]->(b)

// Documentation Relationships
// (doc)-[:DEFINES]->(term)
// (doc)-[:MENTIONS {frequency: int, context: string}]->(entity)
// (doc)-[:REFERENCES]->(doc)
// (quote)-[:CITES]->(doc)

// Evidence Relationships
// (observation)-[:SUPPORTS {strength: string}]->(method|concept)

// Audience Relationships
// (content)-[:APPLIES_TO]->(stakeholder)

// Recovery Relationships
// (remedy)-[:RECOVERS_FROM]->(failure)
