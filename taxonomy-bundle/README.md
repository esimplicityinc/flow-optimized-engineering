# FOE → Katalyst taxonomy

Flow Optimized Engineering's field guides, the frameworks they draw on, and the
methods themselves, as nodes of Katalyst Forge's **practices** wing. Any
consumer — `kata`, MCP, REST, a UI — reads them without knowing anything about
FOE.

This package declares **no schema**. Everything is a Forge kind:

| Forge kind | FOE | Count |
|---|---|---|
| `practice_area` | a field guide; its `overview.md` is the description | 6 |
| `practice` | a framework's full, canonical set, with its overview and reading list | 12 |
| `practice` | what one guide adopted from one framework (`practice_area` names the guide) | 17 |
| `method` | a method, prescribed by practices and owned by none | 134 |

```
practice_area agentic-coding
  └─ INCLUDES_PRACTICE → practice agentic-coding-team-topologies   (3 of 12 methods)
                           ├─ canonical: team-topologies           (the framework practice)
                           └─ PRESCRIBES_METHOD → method m124-fast-flow
```

A guide's adoption is its own practice because adoption is partial: Agentic
Coding takes 3 of Team Topologies' 12 methods, and an area pointing straight at
the framework would claim all twelve.

## A method's write-up

Forge's `method` has fields for the parts a reader compares across methods, and
`body` for the rest. The generator splits each write-up by section:

| Field | From | Methods |
|---|---|---|
| `definition` | `Definition`; else the first paragraph of `Overview` / `What It Is` | 132 |
| `when_to_use` | `When to Use` | 71 |
| `when_not_to_use` | `When NOT to Use`, `Trade-offs` | 58 |
| `pitfalls` | `Common Pitfalls`, `Common Mistakes`, `Anti-Patterns` | 100 |
| `body` | the preamble and every other section, in order | 134 |
| `description` | frontmatter `description`, else the lead paragraph | 134 |

Every line of every write-up lands in exactly one field; a test checks it.

## Names and labels

A method is named `<lowercase id>-<slug>`, so `M121` is
`m121-executable-specifications`. FQTN names are lowercase, so `M121` was never
a valid one.

| Label | Holds |
|---|---|
| `foe.method-id` | FOE's id, `M121` |
| `foe.principle`, `foe.principle.secondary` | Understanding / Feedback / Confidence |
| `foe.maturity` | only when every documentation home agrees |

`foe.method-id` is not `governance-id` on purpose. Katalyst governance ids are
`SERIES-number` with a series of two or more letters (`CAP-001`); `M121` does not
match, and lint silently skips an id it cannot parse, so the label would claim
the convention without getting its uniqueness check. Adopting a conforming id
scheme is FOE's call.

The annotation `foe.source_path` lists every documentation home a node was built
from — M121 has four.

## Regenerating

The markdown in `docs/docs/` is authoritative. Edit it, never the YAML.

```bash
rm -rf .global/taxonomy/practices
uv run --project taxonomy-bundle python -m foe_taxonomy.generate --repo . --out /tmp/foe.yaml
kata tax import /tmp/foe.yaml --backend foe
uv run --project taxonomy-bundle python -m foe_taxonomy.stamp --repo . --change-set /tmp/foe.yaml
kata tax lint --strict
```

Three steps instead of one, for reasons worth knowing:

- **The change set goes outside the repository.** `kata tax import` loads the
  backend's documents, so a change set inside the repo is read as nodes too:
  every reference becomes ambiguous ("matches 2 method"), and the rollback then
  **deletes the change-set file** rather than the node it created. The generator
  refuses an `--out` inside the repo.
- **`stamp` writes labels and annotations.** `kata tax import` creates each node
  through `kata tax create`, which writes the spec and drops
  `metadata.labels` and `metadata.annotations`; neither `create` nor `update`
  can set them. `stamp` inserts both blocks as text, leaving what kata wrote
  untouched, and is idempotent.
- **Owners are explicit.** With no owner, `kata tax create` writes the
  placeholder `team@example.com`.

## What is not modelled

The generator reports what it drops rather than passing it through:

- **Observations** (66) are not emitted. Without maturity as a first-class,
  ordered field there is no verdict for evidence to support.
- **Per-guide maturity.** Guide overviews declare `adopted_methods`, each with a
  `foe_maturity`, and the folders say `established` vs `emerging`. Both are a
  property of the area → method edge, and a practice's `methods` list has
  nowhere to hold it. Two methods' homes disagree outright: M121 is `proven` in
  Agentic Coding and `hypothesized` elsewhere, so it carries no maturity label.
- Overview frontmatter `status`, `related_frameworks`, `version`, `pillars`, and
  method frontmatter `external_method`, `priority`, `aliases`.

## Tests

```bash
uv run --project taxonomy-bundle --group dev pytest taxonomy-bundle/tests
```

They run against the real `docs/docs/` and assert properties — names valid and
unique, every reference resolves, every method prescribed, no prose lost — rather
than counts, so a new method does not break them.
