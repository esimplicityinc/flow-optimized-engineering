"""The FOE bundle: one extension kind, nothing else.

Discovered through the ``katalyst_engine.bundles`` entry point. It contributes no
WingDefinition — `method_content` joins Forge's existing ``practices`` wing, and
declaring the wing here would let this bundle rename one it does not own.
"""

from __future__ import annotations

from katalyst_engine.core.identity import Identity
from katalyst_engine.core.version import Version
from katalyst_engine.bundle.protocol import BundleManifest
from katalyst_engine.schema.definition import NodeDefinition, SchemaDefinition, WingDefinition
from katalyst_engine.schema.manager import SchemaManager

from .definitions import ALL_DEFINITIONS


class FoeBundle:
    """Prose for Forge's `method` kind."""

    @property
    def manifest(self) -> BundleManifest:
        return BundleManifest(
            identity=Identity(kind="bundle", name="foe"),
            version=Version(major=0, minor=2),
            description="FOE method prose as an extension of Forge's method kind.",
        )

    def node_definitions(self) -> list[NodeDefinition]:
        return list(ALL_DEFINITIONS)

    def wing_definitions(self) -> list[WingDefinition]:
        return []

    def schema_definition(self) -> SchemaDefinition:
        return SchemaDefinition(
            identity=Identity(kind="schema", name="foe"),
            describes_kind="taxonomy",
            api_version="v2alpha",
            schema_version=Version(major=1),
            node_definitions=tuple(nd.identity for nd in ALL_DEFINITIONS),
            wing_definitions=(),
        )

    def register(self, manager: SchemaManager) -> None:
        manager.register_schema(
            self.schema_definition(),
            node_definitions=self.node_definitions(),
            wing_definitions=self.wing_definitions(),
        )
