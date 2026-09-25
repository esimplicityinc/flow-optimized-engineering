"""The one thing Forge's practices wing has no room for: the prose.

FOE's field guides, frameworks and methods are all Forge kinds — see
``foe_taxonomy`` — but a `method` node carries `title`, `category`, `status`,
`rationale` and `alternatives`, and nowhere to put the 4.5 KB of markdown that
explains the method.

So this declares **one** extension kind rather than reintroducing a parallel
hierarchy. `is_extension` with `extends_kinds=("method",)` is the engine's designed
way to add fields to a kind you do not own; `katalyst-xbrl` already ships 18 of
them, so this is a supported path rather than a new mechanism.

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

METHOD_CONTENT = NodeDefinition(
    identity=Identity(kind="node_definition", name="method_content"),
    describes_kind="method_content",
    wing=WING,
    display_order=262,
    directory_name="method_content",
    display_label="Method Content",
    display_label_plural="Method Content",
    is_root=True,
    is_leaf=True,
    is_extension=True,
    extends_kinds=("method",),
    parent_rules=(),
    fields=(
        FieldSpec(
            name="body",
            field_type="string",
            required=False,
            description=(
                "The method's prose as markdown. Docusaurus components the consumer "
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

ALL_DEFINITIONS = (METHOD_CONTENT,)
