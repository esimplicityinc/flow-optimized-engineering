# FOE taxonomy bundle

Flow Optimized Engineering as a Katalyst taxonomy bundle: methods, observations
and field guides become taxonomy nodes, so any consumer — CLI, MCP, REST, or a
UI — can render them without knowing anything about FOE.

## What it provides

Three kinds, joining the existing **`practices`** wing rather than declaring a
new one. FOE methods *are* practices; a separate wing would fragment the domain.

| Kind | Notes |
|---|---|
| `foe_field_guide` | 6 guides, the parent of field-guide methods |
| `foe_method` | 134 distinct methods. `maturity` declares `allowed_values`, so the progression is data |
| `foe_observation` | 65 observations. `source_type` declares internal/external |

Methods and observations cross-reference each other in both directions, because
FOE's markdown maintains both. The engine derives `SUPPORTED_BY` and
`EVIDENCE_FOR` relationships from those declarations.

The existing `method` kind is deliberately **not** reused: its fields (category,
rationale, alternatives) describe an ADR-style decision record, not an
evidence-backed practice, and overloading it would mean neither shape validates.

## Generating nodes

The markdown in `docs/docs/` stays authoritative. Nodes are derived from it:

```bash
uv run --project taxonomy-bundle python -m foe_taxonomy.generate --repo .
```

Output goes to `.global/taxonomy/practices/` and the directory is rewritten each
run — a node whose markdown was deleted would otherwise linger with nothing able
to tell it was orphaned.

## Two things the generator found in FOE's data

**58 method ids are documented twice.** `M100 "Aggregate"` appears in both
`external-frameworks/domain-driven-design/` and
`field-guides/software-architecture/`. These are one method with two
documentation homes, so the generator **merges** them — taking maturity and
observations from the field guide and framework/pillar from the external entry,
and recording both source paths. `M121` merges five homes. An earlier version
overwrote instead, silently losing 58 methods' worth of detail.

**`O126` is claimed by two unrelated observations** — StrongDM's software
factory and the Data Link pilot. That is a genuine mistake rather than two homes
for one thing, so the generator reports it as a conflict and keeps the first
rather than fabricating a hybrid. **The fix belongs in FOE's frontmatter.**

It also reports frontmatter keys the bundle does not model (`external_method`,
`priority`, `aliases`) rather than passing them through, so the gap is visible.

## Viewing it

With this bundle installed in the same environment as the taxonomy API:

```bash
katalyst-server --path .            # serve this repo's taxonomy
kata tax bard serve --api-url ...   # the Practices board
```
