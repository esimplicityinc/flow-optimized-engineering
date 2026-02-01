// ============================================================================
// FOE KNOWLEDGE GRAPH - GAP ANALYSIS QUERIES
// Queries to identify missing content, orphans, and improvement opportunities
// ============================================================================

// ============================================================================
// ORPHAN DETECTION
// Find nodes with no relationships
// ============================================================================

// Concepts with no relationships
MATCH (c:Concept)
WHERE NOT (c)-[]-()
RETURN c.id AS concept_id, c.name AS concept_name, 'orphan' AS issue
ORDER BY c.name;

// Methods with no supporting observations
MATCH (m:Method)
WHERE NOT ()-[:SUPPORTS]->(m)
RETURN m.id AS method_id, m.name AS method_name, m.maturityLevel AS maturity, 'no observations' AS issue
ORDER BY m.id;

// Observations not supporting any method
MATCH (o:Observation)
WHERE NOT (o)-[:SUPPORTS]->()
RETURN o.id AS observation_id, o.name AS observation_name, 'unsupported' AS issue
ORDER BY o.id;

// Terms not defining any concept
MATCH (t:Term)
WHERE NOT (t)-[:DEFINES|RELATES_TO]->()
RETURN t.id AS term_id, t.name AS term_name, 'undefined' AS issue
ORDER BY t.name;

// ============================================================================
// COVERAGE ANALYSIS
// Check for gaps in coverage
// ============================================================================

// Principles with few supporting concepts
MATCH (p:Principle)
OPTIONAL MATCH (c:Concept)-[:SUPPORTS]->(p)
WITH p, count(c) AS concept_count
WHERE concept_count < 5
RETURN p.name AS principle, concept_count AS supporting_concepts, 'needs more concepts' AS issue;

// Maturity levels without emphasis
MATCH (ml:MaturityLevel)
WHERE NOT (ml)-[:EMPHASIZES]->()
RETURN ml.name AS level, 'no emphasis defined' AS issue;

// Stakeholders without tailored content
MATCH (s:Stakeholder)
WHERE NOT ()-[:APPLIES_TO]->(s)
RETURN s.name AS stakeholder, 'no content applies' AS issue;

// ============================================================================
// EVIDENCE QUALITY
// Analyze the strength of evidence
// ============================================================================

// Methods with only weak evidence
MATCH (o:Observation)-[r:SUPPORTS]->(m:Method)
WITH m, collect(r.strength) AS strengths
WHERE NOT 'strong' IN strengths
RETURN m.id AS method_id, m.name AS method_name, strengths, 'only weak evidence' AS issue;

// Methods with only external observations (no internal validation)
MATCH (o:Observation)-[:SUPPORTS]->(m:Method)
WITH m, collect(o.type) AS types
WHERE NOT 'internal' IN types
RETURN m.id AS method_id, m.name AS method_name, 'no internal validation' AS issue;

// Methods with only internal observations (no external validation)
MATCH (o:Observation)-[:SUPPORTS]->(m:Method)
WITH m, collect(o.type) AS types
WHERE NOT 'external' IN types
RETURN m.id AS method_id, m.name AS method_name, 'no external validation' AS issue;

// ============================================================================
// RELATIONSHIP QUALITY
// Check for missing expected relationships
// ============================================================================

// Anti-patterns not contrasted with any principle
MATCH (a:AntiPattern)
WHERE NOT (a)-[:CONTRASTS]->()
RETURN a.id AS antipattern_id, a.name AS antipattern_name, 'no contrast defined' AS issue;

// Metaphors not illustrating anything
MATCH (m:Metaphor)
WHERE NOT (m)-[:ILLUSTRATES]->()
RETURN m.id AS metaphor_id, m.name AS metaphor_name, 'not illustrating anything' AS issue;

// External framework methods not connected to FOE concepts
MATCH (m:Method {external: true})
WHERE NOT (m)-[:SUPPORTS|RELATES_TO]->(:Concept) AND NOT (m)-[:SUPPORTS|RELATES_TO]->(:Principle)
RETURN m.id AS method_id, m.name AS method_name, m.framework AS framework, 'not connected to FOE' AS issue;

// ============================================================================
// CROSS-REFERENCE ANALYSIS
// Find potential missing links
// ============================================================================

// Concepts mentioned in term definitions but not linked
MATCH (t:Term)
WHERE t.definition CONTAINS 'cognitive load' AND NOT (t)-[]->(:Concept {id: 'cognitive-load'})
RETURN t.name AS term, 'mentions cognitive load but not linked' AS issue
UNION
MATCH (t:Term)
WHERE t.definition CONTAINS 'feedback' AND NOT (t)-[]->(:Principle {id: 'fast-feedback'})
RETURN t.name AS term, 'mentions feedback but not linked to principle' AS issue;

// ============================================================================
// SUMMARY STATISTICS
// Overall graph health metrics
// ============================================================================

// Node counts by type
MATCH (n)
RETURN labels(n)[0] AS node_type, count(n) AS count
ORDER BY count DESC;

// Relationship counts by type
MATCH ()-[r]->()
RETURN type(r) AS relationship_type, count(r) AS count
ORDER BY count DESC;

// Average relationships per node type
MATCH (n)
OPTIONAL MATCH (n)-[r]-()
WITH labels(n)[0] AS node_type, n, count(r) AS rel_count
RETURN node_type, avg(rel_count) AS avg_relationships, max(rel_count) AS max_relationships, min(rel_count) AS min_relationships
ORDER BY avg_relationships DESC;

// Observations per method (evidence density)
MATCH (m:Method)
OPTIONAL MATCH (o:Observation)-[:SUPPORTS]->(m)
WITH m, count(o) AS obs_count
RETURN 
  avg(obs_count) AS avg_observations_per_method,
  max(obs_count) AS max_observations,
  min(obs_count) AS min_observations,
  count(CASE WHEN obs_count = 0 THEN 1 END) AS methods_without_observations;

// ============================================================================
// IMPROVEMENT SUGGESTIONS
// Queries that suggest specific improvements
// ============================================================================

// High-value missing relationships (principles to concepts)
MATCH (c:Concept)
WHERE c.category IN ['core', 'operational'] 
AND NOT (c)-[:SUPPORTS]->(:Principle)
RETURN c.id AS concept_id, c.name AS concept_name, c.category AS category,
  'Consider linking to a principle' AS suggestion
ORDER BY c.category, c.name;

// Emerging methods needing more evidence
MATCH (m:Method {maturityLevel: 'emerging'})
OPTIONAL MATCH (o:Observation)-[:SUPPORTS]->(m)
WITH m, count(o) AS obs_count
WHERE obs_count < 2
RETURN m.id AS method_id, m.name AS method_name, obs_count AS current_observations,
  'Emerging methods should have 2+ observations to mature' AS suggestion
ORDER BY obs_count, m.name;

// Quotes that could be linked to concepts
// (This would require full-text search in production)
// CALL db.index.fulltext.queryNodes('quote_search', 'confidence') YIELD node
// WHERE NOT (node)-[]->(:Concept)
// RETURN node.id, node.text, 'Could be linked to confidence concept' AS suggestion;

// ============================================================================
// DATA QUALITY CHECKS
// Verify data consistency
// ============================================================================

// Check for duplicate IDs
MATCH (n)
WITH n.id AS id, labels(n)[0] AS type, count(*) AS count
WHERE count > 1
RETURN id, type, count AS duplicates;

// Check for missing required properties
MATCH (c:Concept)
WHERE c.name IS NULL OR c.description IS NULL OR c.category IS NULL
RETURN c.id AS concept_id, 'missing required properties' AS issue;

MATCH (m:Method)
WHERE m.name IS NULL OR m.description IS NULL
RETURN m.id AS method_id, 'missing required properties' AS issue;

// Check for invalid references in methodsSupported
MATCH (o:Observation)
UNWIND o.methodsSupported AS methodId
OPTIONAL MATCH (m:Method {id: methodId})
WHERE m IS NULL
RETURN o.id AS observation_id, methodId AS invalid_method_reference;
