"""FOE → Katalyst taxonomy.

FOE's field guides, the frameworks it draws from, and the methods themselves are
Katalyst Forge's `practice_area`, `practice` and `method` kinds, so this package
declares no schema. Forge's `method` carries the prose too — `definition`,
`when_to_use`, `when_not_to_use`, `pitfalls` and `body` — which retired the
`foe_content` extension kind an earlier version needed for it.

What remains is a generator: `foe_taxonomy.generate` reads `docs/docs/` and writes
a change set that `kata tax import` creates.
"""

__all__: list[str] = []
