// ============================================================================
// FOE KNOWLEDGE GRAPH - MASTER IMPORT SCRIPT
// Run this script to import the complete knowledge graph into Neo4j
// ============================================================================
//
// USAGE:
//   1. Start Neo4j (local or Aura)
//   2. Connect via Neo4j Browser or cypher-shell
//   3. Run this script or import files in order below
//
// IMPORT ORDER:
//   1. schema/schema.cypher       - Constraints and indexes (run first!)
//   2. nodes/all-nodes.cypher     - All node definitions
//   3. relationships/all-relationships.cypher - All relationships
//
// ALTERNATIVE: Copy-paste sections into Neo4j Browser
// ============================================================================

// ============================================================================
// STEP 0: CLEAR EXISTING DATA (OPTIONAL - USE WITH CAUTION!)
// ============================================================================

// Uncomment to delete all existing nodes and relationships:
// MATCH (n) DETACH DELETE n;

// ============================================================================
// STEP 1: SCHEMA (Run schema/schema.cypher)
// ============================================================================

// Constraints ensure unique IDs for each node type
// Indexes optimize common query patterns
// See: schema/schema.cypher for full definitions

// Quick verification that constraints exist:
// SHOW CONSTRAINTS;
// SHOW INDEXES;

// ============================================================================
// STEP 2: NODES (Run nodes/all-nodes.cypher)
// ============================================================================

// Node counts after import should be approximately:
//   - Principles: 3
//   - Models: 10+
//   - Metaphors: 5
//   - AntiPatterns: 6
//   - MaturityLevels: 5
//   - Phases: 6
//   - Stakeholders: 5
//   - Frameworks: 6
//   - Terms: 47
//   - Methods: 67 (22 FOE + 45 external)
//   - Observations: 26
//   - Concepts: 150+

// Verify node counts:
// MATCH (n) RETURN labels(n)[0] AS type, count(*) AS count ORDER BY count DESC;

// ============================================================================
// STEP 3: RELATIONSHIPS (Run relationships/all-relationships.cypher)
// ============================================================================

// Relationship counts after import should be approximately:
//   - ENABLES: 6+ (principle-to-principle)
//   - DEGRADES: 3+ (missing principle effects)
//   - ILLUSTRATES: 10+ (metaphors to concepts)
//   - CONTRASTS: 8+ (anti-patterns vs principles)
//   - PRECEDES: 8+ (maturity levels, phases)
//   - SUPPORTS: 50+ (observations to methods, concepts to principles)
//   - BELONGS_TO: 45+ (methods to frameworks)
//   - PART_OF: 20+ (concepts to models)
//   - APPLIES_TO: 15+ (principles to stakeholders)
//   - DEFINES/RELATES_TO: 15+ (terms to concepts)

// Verify relationship counts:
// MATCH ()-[r]->() RETURN type(r) AS type, count(*) AS count ORDER BY count DESC;

// ============================================================================
// VERIFICATION QUERIES
// Run these after import to verify everything loaded correctly
// ============================================================================

// Total nodes and relationships
// MATCH (n) RETURN count(n) AS total_nodes;
// MATCH ()-[r]->() RETURN count(r) AS total_relationships;

// Verify cognitive triangle is connected
// MATCH (p:Principle)-[r]->(p2:Principle)
// RETURN p.name AS from, type(r) AS relationship, p2.name AS to;

// Verify methods have framework connections
// MATCH (m:Method)-[:BELONGS_TO]->(f:Framework)
// RETURN f.name AS framework, count(m) AS method_count
// ORDER BY method_count DESC;

// Find any orphan nodes
// MATCH (n) WHERE NOT (n)-[]-() RETURN labels(n)[0] AS type, n.name AS name LIMIT 20;

// ============================================================================
// SAMPLE QUERIES TO EXPLORE THE GRAPH
// ============================================================================

// Find all concepts that support a principle
// MATCH (c:Concept)-[:SUPPORTS]->(p:Principle {id: 'understanding'})
// RETURN c.name AS concept, c.description;

// Find the evidence chain for a method
// MATCH (o:Observation)-[r:SUPPORTS]->(m:Method {id: 'M-153'})
// RETURN o.name AS observation, o.type AS type, r.strength AS strength, o.source AS source;

// Explore the cognitive triangle
// MATCH path = (p1:Principle)-[:ENABLES|DEGRADES*1..2]->(p2:Principle)
// WHERE p1 <> p2
// RETURN path;

// Find all metaphors and what they illustrate
// MATCH (m:Metaphor)-[:ILLUSTRATES]->(target)
// RETURN m.name AS metaphor, m.keyInsight AS insight, labels(target)[0] AS illustrates_type, target.name AS illustrates;

// Search for concepts by category
// MATCH (c:Concept {category: 'psychological'})
// RETURN c.name AS concept, c.description
// ORDER BY c.name;

// ============================================================================
// MAINTENANCE QUERIES
// ============================================================================

// Add a new observation supporting a method
// CREATE (o:Observation {
//   id: 'O-XXX',
//   name: 'New Observation',
//   type: 'internal',
//   description: 'Description here',
//   source: 'Source'
// });
// MATCH (o:Observation {id: 'O-XXX'}), (m:Method {id: 'M-XXX'})
// CREATE (o)-[:SUPPORTS {strength: 'strong'}]->(m);

// Update a concept description
// MATCH (c:Concept {id: 'concept-id'})
// SET c.description = 'New description';

// Add a new relationship
// MATCH (source {id: 'source-id'}), (target {id: 'target-id'})
// CREATE (source)-[:RELATIONSHIP_TYPE {property: 'value'}]->(target);
