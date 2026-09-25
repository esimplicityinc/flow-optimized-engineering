"""FOE → Katalyst taxonomy.

This package contributes **no schema**. FOE's field guides, the frameworks it
draws from, and the methods themselves are all expressible with kinds Katalyst
Forge already ships — `practice_area`, `practice`, `method` — so there is nothing
to register and no bundle entry point.

That is the whole point. An earlier version declared `foe_field_guide`,
`foe_method` and `foe_observation`; all three turned out to be re-inventions of
Forge's practices wing, which already models a practice as "a bundle node that
*references* (does not own) a curated set of standards and methods". A field
guide curating three of Team Topologies' twelve methods is precisely that.

What remains is a generator. See `foe_taxonomy.generate`.
"""

__all__: list[str] = []
