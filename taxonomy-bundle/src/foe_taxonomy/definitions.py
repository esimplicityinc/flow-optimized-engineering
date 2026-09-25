"""The one thing Forge's practices wing has no room for: the prose.

FOE's field guides, frameworks and methods are all Forge kinds — see
``foe_taxonomy`` — but a `method` node carries `title`, `category`, `status`,
`rationale` and `alternatives`, and nowhere to put the 4.5 KB of markdown that
explains the method.

So this declares **one** extension kind rather than reintroducing a parallel
hierarchy, and one rather than three: `extends_kinds` takes several targets, so the
same kind carries prose for a method, a framework practice and a field guide. FOE
writes all three the same way — an `overview.md` for guides and frameworks, a
method page for methods — so three kinds would have had identical fields.

`is_extension` is the engine's designed way to add fields to a kind you do not own;
`katalyst-xbrl` already ships 18 of them, so this is a supported path rather than a
new mechanism.

Names do not collide across the three targets — guide slugs, framework slugs and
`guide-framework` pairs, and `M###` — so sharing a name with the node it extends
stays unambiguous.

The content lives in its own node, not in `method`, for a practical reason as well
as a correctness one: the whole taxonomy is served in a single response, and 1 MB
of prose on every page load would be paid by every consumer including those that
only want titles. A separate node is fetched on demand via
``GET /taxonomy/nodes/{name}``.
"""

from __future__ import annotations

from katalyst_engine.core.identity import Identity
from katalyst_engine.schema.definition import FieldSpec, NodeDefinition

WING = "practices"

FOE_CONTENT = NodeDefinition(
    identity=Identity(kind="node_definition", name="foe_content"),
    describes_kind="foe_content",
    wing=WING,
    display_order=262,
    directory_name="content",
    display_label="Content",
    display_label_plural="Content",
    is_root=True,
    is_leaf=True,
    is_extension=True,
    extends_kinds=("method", "practice", "practice_area"),
    parent_rules=(),
    fields=(
        FieldSpec(
            name="body",
            field_type="string",
            required=False,
            description=(
                "The node's prose as markdown. Docusaurus components the consumer "
                "renders itself are stripped; admonitions and tables are kept."
            ),
        ),
        FieldSpec(
            name="lead",
            field_type="string",
            required=False,
            description="First prose paragraph, usable as a summary.",
        ),
        FieldSpec(
            name="docs_url_path",
            field_type="string",
            required=False,
            description=(
                "Path of the source page relative to the docs site root, so a "
                "consumer can link to the rendered original without a hardcoded host."
            ),
        ),
    ),
    cross_references=(),
)

ALL_DEFINITIONS = (FOE_CONTENT,)
