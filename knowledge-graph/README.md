# FOE Knowledge Graph

A comprehensive Neo4j knowledge graph extracted from the Flow Optimized Engineering documentation, capturing concepts, principles, methods, observations, quotes, and their relationships.

## Quick Start

### Prerequisites
- [Neo4j Desktop](https://neo4j.com/download/) or [Neo4j Aura](https://neo4j.com/cloud/aura/) (free tier available)
- Basic Cypher knowledge

### Import Steps

1. **Create a new Neo4j database**

2. **Run the schema** (creates constraints and indexes):
   ```cypher
   :source schema/schema.cypher
   ```

3. **Import all nodes**:
   ```cypher
   :source nodes/all-nodes.cypher
   ```

4. **Import all relationships**:
   ```cypher
   :source relationships/all-relationships.cypher
   ```

5. **Verify the import**:
   ```cypher
   MATCH (n) RETURN labels(n)[0] AS type, count(*) AS count ORDER BY count DESC;
   ```

## Graph Structure

### Node Types

| Label | Count | Description |
|-------|-------|-------------|
| `Concept` | ~150 | Core ideas, patterns, and abstractions |
| `Term` | 47 | Glossary definitions |
| `Method` | 67 | Practices from Field Guides + external frameworks |
| `Observation` | 26 | Evidence supporting methods |
| `Quote` | 250+ | Memorable lines (indexed in quotes/) |
| `Principle` | 3 | The three FOE optimizations |
| `Model` | 10+ | Named frameworks/diagrams |
| `Metaphor` | 5 | Named analogies |
| `AntiPattern` | 6 | Practices FOE rejects |
| `MaturityLevel` | 5 | FOE Maturity Model levels |
| `Phase` | 6 | Transformation Model phases |
| `Stakeholder` | 5 | Audience types |
| `Framework` | 6 | External frameworks (DDD, DORA, BDD, etc.) |

### Relationship Types

| Type | Description |
|------|-------------|
| `ENABLES` | Principle enables another principle |
| `DEGRADES` | Missing principle degrades another |
| `SUPPORTS` | Observation supports method; Concept supports principle |
| `ILLUSTRATES` | Metaphor illustrates concept/principle |
| `CONTRASTS` | Anti-pattern contrasts with principle |
| `BELONGS_TO` | Method belongs to framework |
| `PRECEDES` | Maturity level/phase precedes another |
| `PART_OF` | Concept is part of model |
| `APPLIES_TO` | Content applies to stakeholder |
| `DEFINES` | Term defines concept |
| `MEASURES` | DORA method measures metric |
| `REPLACES` | Good practice replaces anti-pattern |
| `REDUCES` | Practice reduces cognitive load |

## Directory Structure

```
knowledge-graph/
├── README.md                 # This file
├── import.cypher             # Master import script with instructions
├── schema/
│   └── schema.cypher         # Constraints, indexes, node/relationship definitions
├── nodes/
│   └── all-nodes.cypher      # All CREATE statements for nodes
├── relationships/
│   └── all-relationships.cypher  # All MATCH-CREATE for relationships
├── quotes/
│   └── quotes-index.md       # Human-readable quote catalog
└── queries/
    └── gap-analysis.cypher   # Queries to find gaps and orphans
```

## Sample Queries

### Explore the Cognitive Triangle
```cypher
MATCH path = (p1:Principle)-[:ENABLES]->(p2:Principle)
RETURN path
```

### Find All Evidence for a Method
```cypher
MATCH (o:Observation)-[r:SUPPORTS]->(m:Method {name: 'True Microservices'})
RETURN o.name AS observation, o.type, r.strength, o.source
```

### List Concepts Supporting Fast Feedback
```cypher
MATCH (c:Concept)-[:SUPPORTS]->(p:Principle {id: 'fast-feedback'})
RETURN c.name, c.description
ORDER BY c.name
```

### Find Orphan Nodes (No Relationships)
```cypher
MATCH (n)
WHERE NOT (n)-[]-()
RETURN labels(n)[0] AS type, n.name AS name
```

### Search Concepts by Category
```cypher
MATCH (c:Concept {category: 'psychological'})
RETURN c.name, c.description
ORDER BY c.name
```

### Trace Anti-Pattern to Principle
```cypher
MATCH (a:AntiPattern)-[:CONTRASTS]->(p:Principle)
RETURN a.name AS antiPattern, p.name AS violates, a.symptoms
```

### Find Methods Without Evidence
```cypher
MATCH (m:Method)
WHERE NOT ()-[:SUPPORTS]->(m)
RETURN m.id, m.name, m.maturityLevel
ORDER BY m.id
```

## Use Cases

### 1. Proposal Writing
Query quotes by type `govcon` for government-specific language:
```cypher
MATCH (q:Quote {type: 'govcon'})
RETURN q.text, q.source
```

### 2. Training Materials
Find all concepts and their relationships to principles:
```cypher
MATCH (c:Concept)-[:SUPPORTS]->(p:Principle)
RETURN p.name AS principle, collect(c.name) AS concepts
```

### 3. Evidence-Based Arguments
Find research backing for a specific practice:
```cypher
MATCH (o:Observation {type: 'external'})-[:SUPPORTS]->(m:Method)
WHERE m.name CONTAINS 'Microservices'
RETURN o.name, o.source, m.name
```

### 4. Gap Analysis
Run the gap analysis queries to find improvement opportunities:
```cypher
:source queries/gap-analysis.cypher
```

## Maintenance

### Adding a New Observation
```cypher
CREATE (o:Observation {
  id: 'O-200',
  name: 'New Observation Name',
  type: 'internal',  // or 'external'
  description: 'What was observed',
  source: 'Source of the observation'
});

MATCH (o:Observation {id: 'O-200'}), (m:Method {id: 'M-XXX'})
CREATE (o)-[:SUPPORTS {strength: 'strong'}]->(m);
```

### Adding a New Concept
```cypher
CREATE (c:Concept {
  id: 'new-concept-id',
  name: 'New Concept Name',
  description: 'Brief description',
  category: 'core'  // core|operational|psychological|organizational|technical
});

MATCH (c:Concept {id: 'new-concept-id'}), (p:Principle {id: 'understanding'})
CREATE (c)-[:SUPPORTS]->(p);
```

### Running Gap Analysis
```cypher
// Find methods needing more evidence
MATCH (m:Method {maturityLevel: 'emerging'})
OPTIONAL MATCH (o:Observation)-[:SUPPORTS]->(m)
WITH m, count(o) AS obs_count
WHERE obs_count < 2
RETURN m.name, obs_count AS current_evidence
```

## Graph Statistics

After full import, expect approximately:

- **Nodes**: ~400+
- **Relationships**: ~300+
- **Properties**: ~2000+

## Contributing

When adding new content:

1. Follow the ID conventions (kebab-case for concepts, M-XXX for methods, O-XXX for observations)
2. Run gap-analysis queries after changes
3. Ensure new nodes have at least one relationship
4. Update quotes-index.md for significant new quotes

## Related Resources

- [FOE Documentation](../docs/docs/) - Source documentation
- [Field Guides](../docs/docs/field-guides/) - Methods and observations
- [Neo4j Cypher Manual](https://neo4j.com/docs/cypher-manual/current/)
