"""FOE → Katalyst taxonomy.

FOE's field guides, the frameworks it draws from, and the methods themselves are
all expressible with kinds Katalyst Forge already ships — `practice_area`,
`practice`, `method`. An earlier version declared `foe_field_guide`, `foe_method`
and `foe_observation`; all three were re-inventions of Forge's practices wing,
which already models a practice as "a bundle node that *references* (does not own)
a curated set of standards and methods".

One kind remains, and only because Forge's `method` genuinely has no room for it:
`method_content`, an **extension** carrying the markdown body. See
`foe_taxonomy.definitions`.

The generator lives in `foe_taxonomy.generate`.
"""

from .bundle import FoeBundle

__all__ = ["FoeBundle"]
