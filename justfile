# FOE Knowledge Graph - Neo4j Visualization
# ==========================================

# Default recipe - show available commands
default:
    @just --list

# ------------------------------------------------------------------------------
# Neo4j Setup & Visualization
# ------------------------------------------------------------------------------

# Show setup instructions for Neo4j Desktop
neo4j-setup:
    @echo "╔══════════════════════════════════════════════════════════════════╗"
    @echo "║           FOE Knowledge Graph - Neo4j Setup                      ║"
    @echo "╚══════════════════════════════════════════════════════════════════╝"
    @echo ""
    @echo "1. Download Neo4j Desktop: https://neo4j.com/download/"
    @echo "   (Create free account for license key)"
    @echo ""
    @echo "2. Install and open Neo4j Desktop"
    @echo ""
    @echo "3. Create new project: 'FOE Knowledge Graph'"
    @echo ""
    @echo "4. Click '+ Add' → 'Local DBMS'"
    @echo "   - Name: FOE"
    @echo "   - Password: foepassword"
    @echo "   - Version: Latest"
    @echo ""
    @echo "5. BEFORE starting: Install APOC plugin (required for MCP):"
    @echo "   - Click on your database name (not Start)"
    @echo "   - Click 'Plugins' tab on the right"
    @echo "   - Find 'APOC' and click 'Install'"
    @echo ""
    @echo "6. Click 'Start' on the database"
    @echo ""
    @echo "7. Run 'just neo4j-check' to find the PATH command for your system"
    @echo ""
    @echo "8. Run: just neo4j-import"
    @echo ""

# Check if cypher-shell is available
neo4j-check:
    #!/usr/bin/env bash
    if which cypher-shell > /dev/null 2>&1; then
        echo "✓ cypher-shell found: $(which cypher-shell)"
    else
        # Try to find it in Neo4j Desktop locations
        CYPHER_SHELL=$(find "$HOME/Library/Application Support/neo4j-desktop" -name "cypher-shell" -path "*/Data/dbmss/*/bin/*" 2>/dev/null | head -1)
        if [ -n "$CYPHER_SHELL" ]; then
            BIN_DIR=$(dirname "$CYPHER_SHELL")
            echo "✓ Found cypher-shell at: $CYPHER_SHELL"
            echo ""
            echo "Add to PATH with:"
            echo "  export PATH=\"\$PATH:$BIN_DIR\""
            echo ""
            echo "Or run this now:"
            echo "  export PATH=\"\$PATH:$BIN_DIR\" && just neo4j-import"
            exit 1
        else
            echo "✗ cypher-shell not found"
            echo ""
            echo "Make sure you have:"
            echo "  1. Created a database in Neo4j Desktop"
            echo "  2. Started the database (green 'Running' indicator)"
            echo ""
            echo "Then find cypher-shell via: Neo4j Desktop → ... menu → Terminal"
            exit 1
        fi
    fi

# Import the knowledge graph into Neo4j (run after neo4j-setup)
neo4j-import: neo4j-check
    #!/usr/bin/env bash
    set -e
    echo "Importing FOE Knowledge Graph into Neo4j..."
    echo ""
    echo "Step 1/3: Creating schema (constraints & indexes)..."
    cypher-shell -u neo4j -p foepassword -f knowledge-graph/schema/schema.cypher 2>/dev/null || true
    echo "✓ Schema created"
    echo ""
    echo "Step 2/3: Importing nodes..."
    cypher-shell -u neo4j -p foepassword -f knowledge-graph/nodes/all-nodes.cypher
    echo "✓ Nodes imported"
    echo ""
    echo "Step 3/3: Creating relationships..."
    cypher-shell -u neo4j -p foepassword -f knowledge-graph/relationships/all-relationships.cypher
    echo "✓ Relationships created"
    echo ""
    echo "╔══════════════════════════════════════════════════════════════════╗"
    echo "║  SUCCESS! Knowledge graph imported.                              ║"
    echo "║                                                                  ║"
    echo "║  Next: Click 'Open' in Neo4j Desktop to launch the browser      ║"
    echo "║  Then run: just neo4j-queries                                   ║"
    echo "╚══════════════════════════════════════════════════════════════════╝"

# Show useful visualization queries to paste into Neo4j Browser
neo4j-queries:
    @echo "╔══════════════════════════════════════════════════════════════════╗"
    @echo "║           FOE Knowledge Graph - Visualization Queries            ║"
    @echo "╚══════════════════════════════════════════════════════════════════╝"
    @echo ""
    @echo "Copy these into Neo4j Browser (localhost:7474)"
    @echo ""
    @echo "── THE COGNITIVE TRIANGLE ──────────────────────────────────────────"
    @echo "MATCH (p:Principle)-[r]->(p2:Principle) RETURN p, r, p2"
    @echo ""
    @echo "── PRINCIPLES + SUPPORTING CONCEPTS ────────────────────────────────"
    @echo "MATCH (c:Concept)-[:SUPPORTS]->(p:Principle) RETURN p, c LIMIT 50"
    @echo ""
    @echo "── METAPHORS & WHAT THEY ILLUSTRATE ────────────────────────────────"
    @echo "MATCH (m:Metaphor)-[:ILLUSTRATES]->(t) RETURN m, t"
    @echo ""
    @echo "── ANTI-PATTERNS VS PRINCIPLES ─────────────────────────────────────"
    @echo "MATCH (a:AntiPattern)-[:CONTRASTS]->(p:Principle) RETURN a, p"
    @echo ""
    @echo "── MATURITY LEVEL PROGRESSION ──────────────────────────────────────"
    @echo "MATCH path = (l1:MaturityLevel)-[:PRECEDES*]->(l2:MaturityLevel)"
    @echo "RETURN path"
    @echo ""
    @echo "── METHOD EVIDENCE CHAINS ──────────────────────────────────────────"
    @echo "MATCH (o:Observation)-[:SUPPORTS]->(m:Method) RETURN o, m LIMIT 40"
    @echo ""
    @echo "── EXTERNAL FRAMEWORKS + METHODS ───────────────────────────────────"
    @echo "MATCH (m:Method)-[:BELONGS_TO]->(f:Framework) RETURN f, m"
    @echo ""
    @echo "── FULL GRAPH SAMPLE ───────────────────────────────────────────────"
    @echo "MATCH (n)-[r]->(m) RETURN n, r, m LIMIT 100"
    @echo ""

# Clear the Neo4j database (use with caution!)
neo4j-clear: neo4j-check
    #!/usr/bin/env bash
    echo "⚠️  This will DELETE all data in the Neo4j database!"
    read -p "Are you sure? (y/N) " confirm
    if [ "$confirm" = "y" ]; then
        cypher-shell -u neo4j -p foepassword "MATCH (n) DETACH DELETE n"
        echo "✓ Database cleared"
    else
        echo "Cancelled."
    fi

# Reimport (clear + import)
neo4j-reimport: neo4j-clear neo4j-import

# Test Neo4j connection (useful for MCP setup verification)
neo4j-test: neo4j-check
    #!/usr/bin/env bash
    echo "Testing Neo4j connection..."
    RESULT=$(cypher-shell -u neo4j -p foepassword "MATCH (n) RETURN count(n) AS nodes" 2>&1)
    if echo "$RESULT" | grep -q "nodes"; then
        NODE_COUNT=$(echo "$RESULT" | grep -oE '[0-9]+' | tail -1)
        echo "✓ Connected to Neo4j"
        echo "  Database has $NODE_COUNT nodes"
        echo ""
        echo "MCP server should work. Restart OpenCode to load the neo4j MCP."
    else
        echo "✗ Connection failed: $RESULT"
        echo ""
        echo "Make sure the database is running in Neo4j Desktop"
        exit 1
    fi
