"""FOE node definitions.

Flow Optimized Engineering is a body of **methods** (practices) backed by
**observations** (evidence), grouped into **field guides** by domain. That maps
onto the taxonomy directly, and these definitions are what let a generic
consumer render it richly rather than dumping JSON.

Three deliberate choices:

* **Kinds join the existing `practices` wing** rather than declaring a new one.
  FOE methods *are* practices; a separate wing would fragment the domain and make
  a practices view have to know about two wings.
* **`maturity` and `source_type` declare `allowed_values`.** That is what turns a
  string into a legend, an ordering, and a validation target for any consumer —
  the difference between a field a UI can reason about and one it can only print.
* **Methods and observations cross-reference each other.** FOE's markdown already
  maintains both directions (`method.observations` and `observation.methods`), so
  both are declared; a consumer can traverse from either end without building an
  index.

The existing `method` kind in the practices wing is deliberately *not* reused.
Its fields (category, rationale, alternatives) describe an ADR-style decision
record, not an evidence-backed practice, and overloading it would mean neither
shape validates.
"""

from __future__ import annotations

from katalyst_engine.core.identity import Identity
from katalyst_engine.schema.definition import (
    FieldRef,
    FieldSpec,
    NodeDefinition,
    ParentRule,
)

#: The wing FOE kinds join.
WING = "practices"

#: Evidence maturity. Ordered weakest to strongest — a consumer reading
#: `allowed_values` gets the progression for free.
MATURITY_LEVELS = ("hypothesized", "observing", "validated", "proven")

#: Where an observation's evidence came from.
SOURCE_TYPES = ("internal", "external")

#: The three FOE principles a method can be aligned to.
FOE_PRINCIPLES = ("Understanding", "Feedback", "Confidence")


def _identity(kind: str) -> Identity:
    return Identity(kind="node_definition", name=kind)


FIELD_GUIDE = NodeDefinition(
    identity=_identity("foe_field_guide"),
    describes_kind="foe_field_guide",
    wing=WING,
    display_order=200,
    directory_name="field_guides",
    display_label="Field Guide",
    display_label_plural="Field Guides",
    is_root=True,
    fields=(
        FieldSpec(
            name="title",
            field_type="string",
            required=True,
            description="Human-readable name of the field guide.",
        ),
        FieldSpec(
            name="domain",
            field_type="string",
            description="The engineering domain this guide covers.",
        ),
    ),
)

METHOD = NodeDefinition(
    identity=_identity("foe_method"),
    describes_kind="foe_method",
    wing=WING,
    display_order=210,
    directory_name="methods",
    display_label="Method",
    display_label_plural="Methods",
    # A method belongs to a field guide, but external-framework methods have no
    # guide — so the parent is allowed, not required.
    parent_rules=(
        ParentRule(
            child_kind="foe_method",
            allowed_parent_kinds=frozenset({"foe_field_guide"}),
            required=False,
        ),
    ),
    fields=(
        FieldSpec(name="title", field_type="string", required=True, description="Method name."),
        FieldSpec(
            name="method_id",
            field_type="string",
            required=True,
            description="Stable FOE identifier, e.g. M151.",
        ),
        FieldSpec(
            name="maturity",
            field_type="string",
            description="Evidence strength, weakest to strongest.",
            allowed_values=MATURITY_LEVELS,
        ),
        FieldSpec(
            name="observations",
            field_type="list",
            description="Observations supporting this method.",
            ref_target_kind="foe_observation",
        ),
        FieldSpec(
            name="framework",
            field_type="string",
            description="External framework this method comes from, if any.",
        ),
        FieldSpec(
            name="framework_url",
            field_type="string",
            description="Canonical source for an external method.",
        ),
        FieldSpec(
            name="pillar",
            field_type="string",
            description="Grouping within its external framework.",
        ),
        FieldSpec(
            name="foe_principle",
            field_type="string",
            description="Primary FOE principle this method serves.",
            allowed_values=FOE_PRINCIPLES,
        ),
        FieldSpec(
            name="foe_principle_secondary",
            field_type="string",
            description="Secondary FOE principle.",
            allowed_values=FOE_PRINCIPLES,
        ),
        FieldSpec(
            name="status",
            field_type="string",
            description="Adoption status, for external methods.",
        ),
        FieldSpec(
            name="source_path",
            field_type="string",
            description="Documentation file this node was generated from.",
        ),
    ),
    cross_references=(
        FieldRef(
            field_name="observations",
            target_kind="foe_observation",
            rel_type="SUPPORTED_BY",
        ),
    ),
)

OBSERVATION = NodeDefinition(
    identity=_identity("foe_observation"),
    describes_kind="foe_observation",
    wing=WING,
    display_order=220,
    directory_name="observations",
    display_label="Observation",
    display_label_plural="Observations",
    is_root=True,
    fields=(
        FieldSpec(
            name="title", field_type="string", required=True, description="Observation title."
        ),
        FieldSpec(
            name="observation_id",
            field_type="string",
            required=True,
            description="Stable FOE identifier, e.g. O126.",
        ),
        FieldSpec(
            name="source_type",
            field_type="string",
            description="Whether the evidence is our own or published.",
            allowed_values=SOURCE_TYPES,
        ),
        FieldSpec(
            name="status",
            field_type="string",
            description="Whether the observation is complete.",
        ),
        FieldSpec(
            name="methods",
            field_type="list",
            description="Methods this observation provides evidence for.",
            ref_target_kind="foe_method",
        ),
        FieldSpec(
            name="source_url",
            field_type="string",
            description="Canonical link for published evidence.",
        ),
        FieldSpec(
            name="source_organization",
            field_type="string",
            description="Who produced the published evidence.",
        ),
        FieldSpec(
            name="source_year",
            field_type="integer",
            description="Year the evidence was published.",
        ),
        FieldSpec(
            name="source_path",
            field_type="string",
            description="Documentation file this node was generated from.",
        ),
    ),
    cross_references=(
        FieldRef(field_name="methods", target_kind="foe_method", rel_type="EVIDENCE_FOR"),
    ),
)

ALL_DEFINITIONS = (FIELD_GUIDE, METHOD, OBSERVATION)
