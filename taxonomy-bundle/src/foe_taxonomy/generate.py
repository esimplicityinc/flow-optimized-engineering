"""Generate taxonomy nodes from FOE documentation.

FOE's source of truth is markdown with frontmatter. This reads it and emits
taxonomy YAML, so the docs stay authoritative and the taxonomy is derived —
never the other way round.

Run it from the repository root:

    uv run --project taxonomy-bundle python -m foe_taxonomy.generate

Design notes:

* **Derived, not authored.** Every generated file carries a header saying so, and
  the whole output directory is rewritten each run. Hand-editing would be lost,
  and pretending otherwise would invite it.
* **Output is deterministic.** Files are sorted and mappings are emitted in a
  fixed key order, so regenerating produces no diff unless the docs changed.
* **Unknown frontmatter is dropped, not guessed.** A field the bundle does not
  declare would land in a consumer's "not described by the schema" bucket, which
  is honest but noisy; the generator reports what it skipped instead.

What it emits — all three are **Katalyst Forge kinds**, not FOE inventions:

======================  ===================================================
``practice_area``       a field guide
``practice``            a framework (canonical), and one curated practice per
                        (guide, framework) pair — the selective adoption
``method``              a method, referenced by practices, owned by none
======================  ===================================================

Forge's ``practice`` is documented as "a bundle node that *references* (does not
own) a **curated** set of standards and methods", and that is exactly what a
field guide does to a framework: FOE's Agentic Coding guide adopts 3 of Team
Topologies' 12 methods. Modelling adoption as its own practice is what makes
partial adoption expressible — a guide pointing straight at ``team-topologies``
would claim all twelve.

Fields Forge's ``method`` has no room for are carried where they still work:

* ``pillar`` becomes ``category``.
* ``foe_alignment.primary`` / ``.secondary`` become **labels**, because a node
  may carry two principles and ``category`` is a single string. Labels are
  queryable (``label_key`` / ``label_value``), so nothing is lost but the
  declared vocabulary.
* ``maturity`` becomes a label too. It is preserved rather than dropped because
  preserving it is free, but a label cannot declare ``allowed_values`` — so a
  consumer gets the value and not the ordering.
* ``source_path`` becomes a ``spec.annotations`` entry, since generated nodes
  should say where they came from.

**Observations are deliberately not emitted.** Without ``maturity`` as a
first-class, ordered field there is no verdict for an observation to support, so
the evidence layer is parked rather than half-modelled. The markdown in
``docs/docs/`` remains authoritative and complete; regenerating them later is a
small change, not a recovery.
"""

from __future__ import annotations

import argparse
import re
import shutil
import sys
from dataclasses import dataclass, field
from pathlib import Path
from typing import Any

import yaml

from .content import clean_body, lead_paragraph, split_frontmatter

API_VERSION = "katalyst.taxonomy/v2alpha"

#: Frontmatter keys that exist for Docusaurus and carry no taxonomy meaning.
DOCS_ONLY_KEYS = frozenset(
    {"displayed_sidebar", "sidebar_position", "sidebar_label", "slug", "tags", "hide_title"}
)

GENERATED_HEADER = (
    "# GENERATED from FOE documentation by foe_taxonomy.generate — do not edit.\n"
    "# Edit the markdown frontmatter in docs/docs/ and regenerate.\n"
)


@dataclass
class Report:
    practice_areas: int = 0
    framework_practices: int = 0
    curated_practices: int = 0
    methods: int = 0
    skipped: list[str] = field(default_factory=list[str])
    unknown_keys: dict[str, int] = field(default_factory=dict[str, int])
    merged: int = 0
    #: Observations found in the docs but intentionally not emitted. Counted so
    #: the parked evidence layer stays visible rather than silently absent.
    observations_parked: int = 0
    #: Methods whose documentation homes declare different maturities.
    maturity_conflicts: list[str] = field(default_factory=list[str])
    content: int = 0
    descriptions_filled: int = 0

    @property
    def practices(self) -> int:
        return self.framework_practices + self.curated_practices

    @property
    def total(self) -> int:
        return self.practice_areas + self.practices + self.methods + self.content


def parse_frontmatter(path: Path) -> dict[str, Any] | None:
    """Read YAML frontmatter, or None when the file has none."""
    text = path.read_text(encoding="utf-8", errors="replace")
    match = re.match(r"^---\n(.*?)\n---\n", text, re.S)
    if match is None:
        return None
    try:
        parsed = yaml.safe_load(match.group(1))
    except yaml.YAMLError:
        return None
    return parsed if isinstance(parsed, dict) else None


def _slug(value: str) -> str:
    """A taxonomy-safe node name."""
    out = re.sub(r"[^a-z0-9]+", "-", value.lower()).strip("-")
    return out or "unnamed"


def _observation_ref(raw: str) -> str:
    """Normalise a method's observation reference to an observation id.

    Methods reference observations as `external/O117-nummi-plant-transformation`
    or bare `O117`. Both must resolve to the same node name, or the cross-reference
    silently fails to link.
    """
    tail = raw.rsplit("/", maxsplit=1)[-1]
    match = re.match(r"(O\d+)", tail)
    return match.group(1) if match else tail


def _method_ref(raw: str) -> str:
    tail = str(raw).rsplit("/", maxsplit=1)[-1]
    match = re.match(r"(M\d+)", tail)
    return match.group(1) if match else tail


def _document(kind: str, name: str, spec: dict[str, Any]) -> dict[str, Any]:
    return {
        "apiVersion": API_VERSION,
        "kind": kind,
        "metadata": {"name": name},
        "spec": {k: v for k, v in spec.items() if v not in (None, "", [], {})},
    }


def _write(path: Path, doc: dict[str, Any]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    body = yaml.safe_dump(doc, sort_keys=False, default_flow_style=False, allow_unicode=True)
    path.write_text(GENERATED_HEADER + body, encoding="utf-8")


def _track_unknown(report: Report, fm: dict[str, Any], known: frozenset[str]) -> None:
    for key in fm:
        if key in known or key in DOCS_ONLY_KEYS:
            continue
        report.unknown_keys[key] = report.unknown_keys.get(key, 0) + 1


METHOD_KEYS = frozenset(
    {
        "methodId",
        "foe_maturity",
        "title",
        "maturity",
        "observations",
        "framework",
        "framework_url",
        "foe_alignment",
        "status",
        "pillar",
        "description",
    }
)
OBSERVATION_KEYS = frozenset(
    {"observationId", "title", "status", "source_type", "methods", "source"}
)


def _id_from_filename(path: Path, prefix: str) -> str | None:
    """Recover a FOE id from the filename.

    Nine observations (O201-O209) carry no `observationId` in frontmatter and
    rely on the filename alone. Skipping them would silently lose real evidence,
    and the filename is already the canonical id everywhere else.
    """
    match = re.match(rf"({prefix}\d+)", path.stem)
    return match.group(1) if match else None


def _framework_of(rel_path: str, declared: str | None) -> str | None:
    """Framework a method's canonical definition belongs to.

    A field-guide copy carries no `framework` in frontmatter — only the external
    path says which framework it came from, so the path is the fallback.
    """
    if declared:
        return str(declared)
    match = re.search(r"(?:^|/)external-frameworks/([^/]+)/", rel_path)
    return match.group(1) if match else None


def _guide_stages(rel_paths: list[str]) -> list[tuple[str, str]]:
    """(guide, adoption stage) for every field guide documenting a method.

    FOE encodes a *per-guide* stage in the folder — `methods/established/` vs
    `methods/emerging/` — which is distinct from frontmatter maturity. M121 is
    established for agentic-coding and emerging for testing. Nothing in this model
    can hold a per-edge property, so the stage is returned but only the guide is
    used; see the module docstring.
    """
    out: list[tuple[str, str]] = []
    for rel in rel_paths:
        for guide, stage in re.findall(r"(?:^|/)field-guides/([^/]+)/methods/([^/]+)/", rel):
            out.append((guide, stage))
    return out


def _emit_content(
    out_root: Path,
    name: str,
    label: str,
    overview: Path,
    docs_root: Path,
    report: Report,
) -> str:
    """Write a `foe_content` node from an `overview.md`, returning its lead paragraph.

    Guides and frameworks keep their prose in `overview.md` rather than `index.md`
    — worth stating because looking for the conventional names finds nothing and
    reads as "there is no content here".
    """
    raw = overview.read_text(encoding="utf-8", errors="replace")
    _, body = split_frontmatter(raw)
    cleaned = clean_body(body)
    if cleaned == "":
        return ""
    lead = lead_paragraph(cleaned)
    _write(
        out_root / "content" / f"{name}.yaml",
        _document(
            "foe_content",
            name,
            {
                "description": f"Prose for {label}.",
                "body": cleaned,
                "lead": lead,
                "docs_url_path": str(overview.relative_to(docs_root)).removesuffix(".md"),
            },
        ),
    )
    report.content += 1
    return lead


def generate(docs_root: Path, out_root: Path, report: Report) -> None:
    """Emit practice areas, practices and methods under ``out_root``."""
    guides_dir = docs_root / "field-guides"
    frameworks_dir = docs_root / "external-frameworks"

    guide_titles: dict[str, str] = {}
    if guides_dir.is_dir():
        for child in sorted(guides_dir.iterdir()):
            # `observations/` is a sibling of the guides, not a guide itself.
            if child.is_dir() and child.name != "observations":
                guide_titles[child.name] = child.name.replace("-", " ").title()

    # ── Methods ─────────────────────────────────────────────────────
    #
    # A method id legitimately appears more than once: 58 of FOE's methods are
    # documented both as an external-framework pattern and inside one or more
    # field guides (M121 spans five files). Those are one method with several
    # documentation homes, so specs are merged rather than one overwriting the
    # other — which is what an earlier version did, silently losing 58 methods'
    # worth of detail.
    collected: dict[str, dict[str, Any]] = {}
    homes: dict[str, list[str]] = {}
    declared_framework: dict[str, str | None] = {}
    #: Maturity is collected as a set, not a value. FOE declares it per
    #: *document*, and two methods' homes disagree — M121 is `proven` in the
    #: Agentic Coding guide and `hypothesized` in Testing and Product
    #: Specification. Keeping a set makes the disagreement visible instead of
    #: letting whichever file sorts last silently win.
    maturities: dict[str, set[str]] = {}
    #: method_id -> (cleaned markdown, the doc path it came from)
    bodies: dict[str, tuple[str, str]] = {}

    for path in sorted(docs_root.rglob("M[0-9]*.md")):
        fm = parse_frontmatter(path)
        if fm is None:
            report.skipped.append(f"{path.relative_to(docs_root)}: no frontmatter")
            continue
        method_id = str(fm.get("methodId") or _id_from_filename(path, "M") or "")
        if method_id == "":
            report.skipped.append(
                f"{path.relative_to(docs_root)}: no methodId and no id in filename"
            )
            continue
        _track_unknown(report, fm, METHOD_KEYS)
        rel = str(path.relative_to(docs_root))
        alignment = fm.get("foe_alignment") or {}
        if not isinstance(alignment, dict):
            alignment = {}

        labels: dict[str, str] = {}
        # Two principles per method is normal — all 35 that declare one declare a
        # secondary too — so these cannot collapse into `category`.
        if alignment.get("primary"):
            labels["foe.principle"] = str(alignment["primary"])
        if alignment.get("secondary"):
            labels["foe.principle.secondary"] = str(alignment["secondary"])
        # FOE spells the same concept two ways: `maturity` on field-guide methods
        # and `foe_maturity` on external ones. Read both rather than pick a
        # winner, since neither is wrong in its own context.
        maturity = fm.get("maturity") or fm.get("foe_maturity")

        spec: dict[str, Any] = {
            "description": str(fm.get("description") or fm.get("title") or method_id),
            "title": str(fm.get("title") or method_id),
            # `pillar` is FOE's within-framework grouping; `category` is Forge's
            # name for the same idea. Nothing validates either.
            "category": fm.get("pillar"),
            "status": fm.get("status"),
            "annotations": {"foe.source_path": rel},
            # `method_id` is not carried: metadata.name already *is* the id.
        }

        # Keep the longest body across a method's homes. A merged method has
        # several, and the external-framework copy is usually a stub while the
        # field-guide copy carries the explanation.
        _, raw_body = split_frontmatter(path.read_text(encoding="utf-8", errors="replace"))
        cleaned = clean_body(raw_body)
        if len(cleaned) > len(bodies.get(method_id, ("", ""))[0]):
            bodies[method_id] = (cleaned, rel)

        homes.setdefault(method_id, []).append(rel)
        if declared_framework.get(method_id) in (None, ""):
            declared_framework[method_id] = _framework_of(rel, fm.get("framework"))

        if maturity:
            maturities.setdefault(method_id, set()).add(str(maturity))

        existing = collected.get(method_id)
        if existing is None:
            collected[method_id] = spec
            collected[method_id]["_labels"] = labels
        else:
            report.merged += 1
            # Field-guide data and external data are complementary, so take the
            # union and let a present value win over an absent one.
            for key, value in spec.items():
                if value in (None, "", [], {}) or key == "annotations":
                    continue
                if existing.get(key) in (None, "", [], {}):
                    existing[key] = value
            existing["_labels"].update({k: v for k, v in labels.items() if v})

    for method_id in sorted(collected):
        spec = dict(collected[method_id])
        labels = spec.pop("_labels")
        # Only label a maturity every home agrees on. Emitting one of two
        # conflicting values would assert something FOE never claimed globally;
        # the real fix is per-guide maturity, which this model cannot express.
        found = maturities.get(method_id, set())
        if len(found) == 1:
            labels["foe.maturity"] = next(iter(found))
        elif len(found) > 1:
            report.maturity_conflicts.append(f"{method_id}: {sorted(found)}")
        # Every home, so provenance survives the merge.
        spec["annotations"] = {"foe.source_path": "; ".join(sorted(homes[method_id]))}
        body, source_rel = bodies.get(method_id, ("", ""))
        lead = lead_paragraph(body)
        # 42 methods carry no `description`, so theirs currently repeats the title.
        # The lead paragraph is a real summary and is already written.
        if spec.get("description") in (None, "", spec.get("title")) and lead != "":
            spec["description"] = lead
            report.descriptions_filled += 1

        doc = _document("method", method_id, spec)
        if labels:
            doc["metadata"]["labels"] = dict(sorted(labels.items()))
        _write(out_root / "methods" / f"{method_id}.yaml", doc)
        report.methods += 1

        if body != "":
            # Same name as the method it extends: that is what makes it an
            # extension rather than a loosely associated node.
            _write(
                out_root / "content" / f"{method_id}.yaml",
                _document(
                    "foe_content",
                    method_id,
                    {
                        "description": f"Prose for {spec.get('title', method_id)}.",
                        "body": body,
                        "lead": lead,
                        # Path only — a hardcoded host would rot, and the consumer
                        # knows where its docs site lives.
                        "docs_url_path": source_rel.removesuffix(".md"),
                    },
                ),
            )
            report.content += 1

    # ── Framework practices ─────────────────────────────────────────
    #
    # The canonical home of a borrowed method. These own the full set; what a
    # guide adopts is a separate, curated practice.
    framework_methods: dict[str, list[str]] = {}
    framework_urls: dict[str, str] = {}
    for method_id, framework in declared_framework.items():
        if framework is None:
            continue
        framework_methods.setdefault(framework, []).append(method_id)
    if frameworks_dir.is_dir():
        # The canonical URL is declared on the framework's overview page under
        # `source.url`. Method frontmatter carries `framework_url` only sometimes,
        # and reading only that left most frameworks with no URL — which then fell
        # back to the slug and made `canonical` point at the practice itself.
        for overview in sorted(frameworks_dir.glob("*/overview.md")):
            fm = parse_frontmatter(overview) or {}
            source = fm.get("source") if isinstance(fm.get("source"), dict) else {}
            url = source.get("url") or fm.get("framework_url")
            if url:
                framework_urls[overview.parent.name] = str(url)
        for path in sorted(frameworks_dir.rglob("M[0-9]*.md")):
            fm = parse_frontmatter(path) or {}
            url = fm.get("framework_url")
            slug = path.relative_to(frameworks_dir).parts[0]
            if url and slug not in framework_urls:
                framework_urls[slug] = str(url)

    for framework, method_ids in sorted(framework_methods.items()):
        title = frameworkish_title(framework)
        overview = frameworks_dir / framework / "overview.md"
        lead = ""
        if overview.is_file():
            lead = _emit_content(out_root, _slug(framework), title, overview, docs_root, report)
        _write(
            out_root / "practices" / f"{_slug(framework)}.yaml",
            _document(
                "practice",
                _slug(framework),
                {
                    "description": lead or f"{title} — external framework FOE draws methods from.",
                    "title": title,
                    # Never the slug: `canonical` equal to the node's own name
                    # reads as "curated from itself" downstream.
                    "canonical": framework_urls.get(framework, ""),
                    "methods": sorted(method_ids),
                },
            ),
        )
        report.framework_practices += 1

    # ── Curated practices, one per (guide, source) pair ─────────────
    #
    # This is the composition: what a field guide actually adopted. Keyed by
    # framework so partial adoption is explicit — agentic-coding takes 3 of Team
    # Topologies' 12, and a reference straight to the framework would claim all 12.
    curated: dict[tuple[str, str], list[str]] = {}
    for method_id, rel_paths in homes.items():
        framework = declared_framework.get(method_id) or ""
        for guide, _stage in _guide_stages(rel_paths):
            curated.setdefault((guide, framework), []).append(method_id)

    area_practices: dict[str, list[str]] = {}
    for (guide, framework), method_ids in sorted(curated.items()):
        if framework == "":
            name = f"{_slug(guide)}-internal"
            title = f"{guide_titles.get(guide, guide)} — FOE methods"
            description = (
                f"Methods FOE authored for the {guide_titles.get(guide, guide)} field guide."
            )
            canonical = ""
        else:
            name = f"{_slug(guide)}-{_slug(framework)}"
            fw_title = frameworkish_title(framework)
            title = f"{fw_title} for {guide_titles.get(guide, guide)}"
            total = len(framework_methods.get(framework, []))
            description = (
                f"{len(set(method_ids))} of {total} {fw_title} methods, as adopted by the "
                f"{guide_titles.get(guide, guide)} field guide."
            )
            canonical = framework
        _write(
            out_root / "practices" / f"{name}.yaml",
            _document(
                "practice",
                name,
                {
                    "description": description,
                    "title": title,
                    "canonical": canonical,
                    "methods": sorted(set(method_ids)),
                },
            ),
        )
        report.curated_practices += 1
        area_practices.setdefault(guide, []).append(name)

    # ── Practice areas (field guides) ───────────────────────────────
    for guide, title in sorted(guide_titles.items()):
        practices = sorted(area_practices.get(guide, []))
        if not practices:
            report.skipped.append(f"field-guides/{guide}: no methods, no practice area emitted")
            continue
        overview = guides_dir / guide / "overview.md"
        lead = ""
        if overview.is_file():
            lead = _emit_content(out_root, _slug(guide), title, overview, docs_root, report)
        _write(
            out_root / "practice_areas" / f"{_slug(guide)}.yaml",
            _document(
                "practice_area",
                _slug(guide),
                {
                    "description": lead or f"FOE field guide: {title}.",
                    "title": title,
                    "canonical": guide,
                    "practices": practices,
                },
            ),
        )
        report.practice_areas += 1

    # ── Observations: parked, but counted ───────────────────────────
    report.observations_parked = sum(1 for _ in docs_root.rglob("O[0-9]*.md"))


def frameworkish_title(slug: str) -> str:
    """Display name for a framework slug, matching FOE's own casing."""
    known = {
        "bdd": "BDD",
        "dora": "DORA",
        "tdd": "TDD",
        "team-topologies": "Team Topologies",
        "continuous-delivery": "Continuous Delivery",
        "domain-driven-design": "Domain-Driven Design",
        "double-diamond": "Double Diamond",
        "event-sourcing": "Event Sourcing",
        "clean-architecture": "Clean Architecture",
        "layered-architecture": "Layered Architecture",
        "modular-monolith": "Modular Monolith",
        "microservices": "Microservices",
    }
    return known.get(slug, slug.replace("-", " ").title())


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--repo",
        type=Path,
        default=Path.cwd(),
        help="FOE repository root. Defaults to the current directory.",
    )
    args = parser.parse_args(argv)

    docs_root = args.repo / "docs" / "docs"
    out_root = args.repo / ".global" / "taxonomy" / "practices"
    if not docs_root.is_dir():
        print(f"error: {docs_root} does not exist", file=sys.stderr)
        return 1

    # Full rewrite: a stale node whose markdown was deleted would otherwise
    # linger forever, and nothing downstream could tell it was orphaned.
    if out_root.exists():
        shutil.rmtree(out_root)

    report = Report()
    generate(docs_root, out_root, report)

    merged = f"  ({report.merged} merged from duplicate ids)" if report.merged else ""
    print(f"practice_area : {report.practice_areas}   (field guides)")
    print(f"practice      : {report.practices}   "
          f"({report.framework_practices} frameworks + {report.curated_practices} curated)")
    print(f"method        : {report.methods}{merged}")
    print(f"foe_content   : {report.content}   "
          f"({report.descriptions_filled} method descriptions filled from a lead paragraph)")
    print(f"total nodes   : {report.total}")
    if report.maturity_conflicts:
        print(
            "\nmaturity differs between a method's homes, so no label was emitted.\n"
            "FOE declares maturity per document; these need a per-guide model or a "
            "single agreed value:"
        )
        for c in report.maturity_conflicts:
            print(f"  {c}")
    if report.observations_parked:
        print(
            f"\nobservations  : {report.observations_parked} in the docs, intentionally NOT "
            "emitted.\n                Without an ordered `maturity` field there is no verdict "
            "for them to\n                support. The markdown stays authoritative."
        )
    if report.unknown_keys:
        print("frontmatter keys not modelled by the bundle (dropped):")
        for key, count in sorted(report.unknown_keys.items(), key=lambda kv: -kv[1]):
            print(f"  {key} ({count})")
    for skipped in report.skipped[:10]:
        print(f"  SKIPPED {skipped}")
    if len(report.skipped) > 10:
        print(f"  ... and {len(report.skipped) - 10} more")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
