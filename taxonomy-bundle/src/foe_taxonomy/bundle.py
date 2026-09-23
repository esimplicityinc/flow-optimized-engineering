"""The FOE bundle.

Discovered by the engine through the ``katalyst_engine.bundles`` entry point, so
installing this package is all it takes for `foe_method`, `foe_observation` and
`foe_field_guide` to appear in every consumer — CLI, MCP, REST, and any UI —
with no code change anywhere else.

The kinds join the existing ``practices`` wing rather than declaring a new one,
so no WingDefinition is contributed: overriding the wing's display metadata here
would let this bundle rename a wing it does not own.
"""

from __future__ import annotations

from katalyst_engine.core.identity import Identity
from katalyst_engine.core.version import Version
from katalyst_engine.bundle.protocol import BundleManifest
from katalyst_engine.schema.definition import NodeDefinition, SchemaDefinition, WingDefinition
from katalyst_engine.schema.manager import SchemaManager

from .definitions import ALL_DEFINITIONS, WING


class FoeBundle:
    """Flow Optimized Engineering methods, observations and field guides."""

    @property
    def manifest(self) -> BundleManifest:
        return BundleManifest(
            identity=Identity(kind="bundle", name="foe"),
            version=Version(),
            provided_kinds=frozenset(d.describes_kind for d in ALL_DEFINITIONS),
            wing_names=frozenset({WING}),
            description=(
                "Flow Optimized Engineering: methods backed by observations, "
                "grouped into field guides."
            ),
        )

    def node_definitions(self) -> list[NodeDefinition]:
        return list(ALL_DEFINITIONS)

    def wing_definitions(self) -> list[WingDefinition]:
        # Intentionally empty: these kinds join the practices wing, and declaring
        # a WingDefinition here would let this bundle rename a wing it does not own.
        return []

    def schema_definition(self) -> SchemaDefinition:
        return SchemaDefinition(
            identity=Identity(kind="schema", name="foe"),
            describes_kind="foe",
        )

    def register(self, manager: SchemaManager) -> None:
        manager.register_schema(
            self.schema_definition(),
            node_definitions=self.node_definitions(),
            wing_definitions=self.wing_definitions(),
        )
