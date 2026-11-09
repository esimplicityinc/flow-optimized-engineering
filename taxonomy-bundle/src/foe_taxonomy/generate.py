"""Generate a Katalyst change set from FOE documentation.

FOE's source of truth is markdown with frontmatter in ``docs/docs/``. This reads
it and writes one YAML stream of node documents for ``kata tax import``, which
checks the whole set against the installed schema and creates every node or
none. The docs stay authoritative; the taxonomy is derived from them.

    uv run --project taxonomy-bundle python -m foe_taxonomy.generate --out /tmp/foe.yaml
    kata tax import /tmp/foe.yaml --backend foe
    uv run --project taxonomy-bundle python -m foe_taxonomy.stamp --repo .   # labels
    kata tax lint --strict

Write the change set **outside** the repository. ``kata tax import`` loads the
target backend's documents, so a change set inside the repo is read as nodes too:
the import then refuses every reference as ambiguous, and its rollback deletes the
change-set file instead of the node it created.

The model, all of it Katalyst Forge's own kinds:

======================  ==========================================================
``practice_area``       a field guide; its overview page is the description
``practice``            a framework's canonical set, with its overview as the
                        description; and one curated practice per (guide,
                        framework) pair, which the area lists in its
                        ``practices``
``method``              a method, referenced by practices and owned by none
======================  ==========================================================

A method's write-up is split the way Forge's ``method`` asks: the sections a
reader compares across methods become fields, and the rest stays ``body``.

=====================  ===================================================
``definition``         the ``Definition`` section; else the first paragraph
                       of ``Overview`` or ``What It Is`` (which stay in body)
``when_to_use``        ``When to Use``
``when_not_to_use``    ``When NOT to Use``, or ``Trade-offs``
``pitfalls``           ``Common Pitfalls``, ``Common Mistakes``, ``Anti-Patterns``
``body``               the preamble and every other section, in order
=====================  ===================================================

A method is named ``<lowercase id>-<slug>`` (``m121-executable-specifications``):
FQTN names are lowercase, so ``M121`` was never a valid one. Its FOE id stays as
the label ``foe.method-id``, not ``governance-id``: Katalyst's governance ids are
``SERIES-number`` with a series of two or more letters (``CAP-001``), so ``M121``
does not match, and lint silently skips an id it cannot parse. The label would
claim the convention without getting its uniqueness check.

Labels and annotations are written by ``foe_taxonomy.stamp`` after the import,
because ``kata tax import`` creates each node with ``kata tax create``, which
writes the spec and drops ``metadata.labels`` and ``metadata.annotations``. The
change set carries them anyway, so it is complete on its own.
"""

from __future__ import annotations

import argparse
import re
import sys
from dataclasses import dataclass, field
from pathlib import Path
from typing import Any

import yaml

from .content import (
    clean_body,
    lead_paragraph,
    section_text,
    split_frontmatter,
    split_sections,
)

API_VERSION = "katalyst.taxonomy/v2alpha"

#: Who owns the generated nodes. `kata tax create` writes a placeholder
#: `team@example.com` when a document names no owner, so one is always given.
DEFAULT_OWNER = "aaron.west@esimplicity.com"

#: Frontmatter keys that exist for Docusaurus and carry no taxonomy meaning.
DOCS_ONLY_KEYS = frozenset(
    {
        "displayed_sidebar",
        "sidebar_position",
        "sidebar_label",
        "slug",
        "tags",
        "hide_title",
    }
)

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

#: Section headings that become a method field. Each field takes at most one; no
#: FOE method has two sections claiming the same field.
FIELD_SECTIONS: dict[str, tuple[str, ...]] = {
    "definition": ("Definition",),
    "when_to_use": ("When to Use",),
    "when_not_to_use": (
        "When NOT to Use",
        "When Not to Use",
        "Trade-offs",
        "Tradeoffs",
    ),
    "pitfalls": (
        "Common Pitfalls",
        "Common Mistakes",
        "Anti-Patterns",
        "Anti-patterns",
        "Pitfalls",
    ),
}

#: Narrative sections whose first paragraph is the definition when there is no
#: `Definition` section. They stay in the body: they read as narrative, and moving
#: them would leave the body starting mid-thought.
DEFINITION_FALLBACK = ("What It Is", "Overview")

#: Sections of an overview page whose links are the practice's `references`.
REFERENCE_SECTIONS = ("Further Reading", "References", "Resources", "Sources")

FRAMEWORK_TITLES = {
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


@dataclass
class Report:
    practice_areas: int = 0
    framework_practices: int = 0
    curated_practices: int = 0
    methods: int = 0
    merged: int = 0
    fields: dict[str, int] = field(default_factory=dict[str, int])
    definition_from_narrative: int = 0
    references: int = 0
    skipped: list[str] = field(default_factory=list[str])
    unknown_keys: dict[str, int] = field(default_factory=dict[str, int])
    overview_keys_dropped: dict[str, int] = field(default_factory=dict[str, int])
    maturity_conflicts: list[str] = field(default_factory=list[str])
    observations_parked: int = 0

    @property
    def total(self) -> int:
        return (
            self.practice_areas
            + self.framework_practices
            + self.curated_practices
            + self.methods
        )


def parse_frontmatter(path: Path) -> dict[str, Any] | None:
    """Read YAML frontmatter, or None when the file has none."""
    text = path.read_text(encoding="utf-8", errors="replace")
    match = re.match(r"^---\n(.*?)\n---\n", text, re.DOTALL)
    if match is None:
        return None
    try:
        parsed = yaml.safe_load(match.group(1))
    except yaml.YAMLError:
        return None
    return parsed if isinstance(parsed, dict) else None


def _slug(value: str) -> str:
    """A name that meets the FQTN rule: lowercase letters, digits and `-`."""
    out = re.sub(r"[^a-z0-9]+", "-", value.lower()).strip("-")
    return out or "unnamed"


def method_name(method_id: str, slug: str) -> str:
    """`M121` + `executable-specifications` → `m121-executable-specifications`."""
    return _slug(f"{method_id}-{slug}")


def framework_title(slug: str) -> str:
    return FRAMEWORK_TITLES.get(slug, slug.replace("-", " ").title())


def _document(
    kind: str,
    name: str,
    spec: dict[str, Any],
    *,
    labels: dict[str, str] | None = None,
    annotations: dict[str, str] | None = None,
) -> dict[str, Any]:
    metadata: dict[str, Any] = {"name": name}
    if labels:
        metadata["labels"] = dict(sorted(labels.items()))
    if annotations:
        metadata["annotations"] = dict(sorted(annotations.items()))
    clean = {k: v for k, v in spec.items() if v not in (None, "", [], {})}
    clean.setdefault("owners", [DEFAULT_OWNER])
    return {
        "apiVersion": API_VERSION,
        "kind": kind,
        "metadata": metadata,
        "spec": clean,
    }


def _track(counter: dict[str, int], keys: Any, known: frozenset[str]) -> None:
    for key in keys:
        if key in known or key in DOCS_ONLY_KEYS:
            continue
        counter[key] = counter.get(key, 0) + 1


def _framework_of(rel_path: str, declared: str | None) -> str | None:
    """A field-guide copy names no framework; the external path says which."""
    if declared:
        return str(declared)
    match = re.search(r"(?:^|/)external-frameworks/([^/]+)/", rel_path)
    return match.group(1) if match else None


def _guides_of(rel_paths: list[str]) -> list[str]:
    found: list[str] = []
    for rel in rel_paths:
        for guide in re.findall(r"(?:^|/)field-guides/([^/]+)/methods/", rel):
            if guide not in found:
                found.append(guide)
    return found


def split_method(body: str, report: Report) -> dict[str, str]:
    """A method's markdown split into Forge's method fields.

    Every line lands in exactly one field, except a narrative definition: there the
    first paragraph is copied into `definition` and the section stays in the body.
    """
    preamble, sections = split_sections(body)
    out: dict[str, str] = {}
    rest: list[str] = [preamble] if preamble else []
    for heading, text in sections:
        target = next(
            (f for f, names in FIELD_SECTIONS.items() if heading in names), None
        )
        if target is not None and target not in out and text:
            out[target] = text
            report.fields[target] = report.fields.get(target, 0) + 1
        else:
            rest.append(section_text(heading, text))
    if "definition" not in out:
        for heading, text in sections:
            if heading in DEFINITION_FALLBACK and text:
                first = lead_paragraph(text)
                if first:
                    out["definition"] = first
                    report.fields["definition"] = report.fields.get("definition", 0) + 1
                    report.definition_from_narrative += 1
                break
    out["body"] = "\n\n".join(part for part in rest if part).strip()
    return out


def overview_references(body: str) -> list[str]:
    """Links in an overview's reading-list section, as `Title — URL`."""
    _, sections = split_sections(body)
    refs: list[str] = []
    for heading, text in sections:
        if heading not in REFERENCE_SECTIONS:
            continue
        for title, url in re.findall(r"\[([^\]]+)\]\((https?://[^)\s]+)\)", text):
            entry = f"{title} — {url}"
            if entry not in refs:
                refs.append(entry)
    return refs


def read_overview(path: Path) -> tuple[dict[str, Any], str]:
    """(frontmatter, cleaned body) of a guide or framework `overview.md`.

    Guides and frameworks keep their prose in `overview.md`, not `index.md` or
    `README.md` — looking for the conventional names finds nothing.
    """
    if not path.is_file():
        return {}, ""
    fm = parse_frontmatter(path) or {}
    _, body = split_frontmatter(path.read_text(encoding="utf-8", errors="replace"))
    return fm, clean_body(body)


def generate(docs_root: Path, report: Report) -> list[dict[str, Any]]:
    """Every node document, ordered by kind then name."""
    guides_dir = docs_root / "field-guides"
    frameworks_dir = docs_root / "external-frameworks"

    guide_titles: dict[str, str] = {}
    if guides_dir.is_dir():
        for child in sorted(guides_dir.iterdir()):
            if child.is_dir() and child.name != "observations":
                guide_titles[child.name] = child.name.replace("-", " ").title()

    # ── Methods ─────────────────────────────────────────────────────
    #
    # 58 methods are documented in more than one home (M121 spans four files), so
    # specs are merged, a present value winning over an absent one. An earlier
    # version overwrote instead and lost 58 methods' worth of detail.
    collected: dict[str, dict[str, Any]] = {}
    labels_of: dict[str, dict[str, str]] = {}
    homes: dict[str, list[str]] = {}
    slugs: dict[str, str] = {}
    declared_framework: dict[str, str | None] = {}
    #: A set, not a value: FOE declares maturity per document, and two methods'
    #: homes disagree. Last-file-wins would assert something FOE never claimed.
    maturities: dict[str, set[str]] = {}
    bodies: dict[str, str] = {}

    for path in sorted(docs_root.rglob("M[0-9]*.md")):
        fm = parse_frontmatter(path)
        if fm is None:
            report.skipped.append(f"{path.relative_to(docs_root)}: no frontmatter")
            continue
        stem = re.match(r"(M\d+)-(.+)$", path.stem)
        method_id = str(fm.get("methodId") or (stem.group(1) if stem else ""))
        if method_id == "" or stem is None:
            report.skipped.append(f"{path.relative_to(docs_root)}: no method id")
            continue
        slugs.setdefault(method_id, stem.group(2))
        _track(report.unknown_keys, fm, METHOD_KEYS)
        rel = str(path.relative_to(docs_root))

        alignment = (
            fm.get("foe_alignment") if isinstance(fm.get("foe_alignment"), dict) else {}
        )
        labels = {"foe.method-id": method_id}
        # All 35 methods that declare a principle declare a secondary too, so these
        # are labels rather than one `category` string.
        if alignment.get("primary"):
            labels["foe.principle"] = str(alignment["primary"])
        if alignment.get("secondary"):
            labels["foe.principle.secondary"] = str(alignment["secondary"])
        maturity = fm.get("maturity") or fm.get("foe_maturity")
        if maturity:
            maturities.setdefault(method_id, set()).add(str(maturity))

        spec: dict[str, Any] = {
            "description": fm.get("description"),
            "title": fm.get("title"),
            # FOE's `pillar` is its within-framework grouping, Forge's `category`.
            "category": fm.get("pillar"),
            "status": fm.get("status"),
        }

        # The longest body across a method's homes: an external-framework copy is
        # usually a stub while a field-guide copy carries the explanation.
        _, raw_body = split_frontmatter(
            path.read_text(encoding="utf-8", errors="replace")
        )
        cleaned = clean_body(raw_body)
        if len(cleaned) > len(bodies.get(method_id, "")):
            bodies[method_id] = cleaned

        homes.setdefault(method_id, []).append(rel)
        if not declared_framework.get(method_id):
            declared_framework[method_id] = _framework_of(rel, fm.get("framework"))

        existing = collected.get(method_id)
        if existing is None:
            collected[method_id] = spec
            labels_of[method_id] = labels
        else:
            report.merged += 1
            for key, value in spec.items():
                if value not in (None, "") and existing.get(key) in (None, ""):
                    existing[key] = value
            labels_of[method_id].update(labels)

    names = {mid: method_name(mid, slugs[mid]) for mid in collected}
    documents: list[dict[str, Any]] = []

    for method_id in sorted(collected, key=lambda m: int(m[1:])):
        spec = dict(collected[method_id])
        labels = labels_of[method_id]
        found = maturities.get(method_id, set())
        if len(found) == 1:
            labels["foe.maturity"] = next(iter(found))
        elif len(found) > 1:
            report.maturity_conflicts.append(f"{method_id}: {sorted(found)}")

        parts = split_method(bodies.get(method_id, ""), report)
        spec.update(parts)
        spec["title"] = spec.get("title") or method_id
        # 42 methods have no frontmatter description. The lead paragraph is the
        # summary they already wrote; the title repeated is not one.
        if not spec.get("description") or spec["description"] == spec["title"]:
            spec["description"] = (
                lead_paragraph(bodies.get(method_id, "")) or spec["title"]
            )

        documents.append(
            _document(
                "method",
                names[method_id],
                spec,
                labels=labels,
                annotations={"foe.source_path": "; ".join(sorted(homes[method_id]))},
            )
        )
        report.methods += 1

    # ── Framework practices: each framework's full, canonical set ───
    framework_methods: dict[str, list[str]] = {}
    for method_id, framework in declared_framework.items():
        if framework:
            framework_methods.setdefault(framework, []).append(names[method_id])

    for framework, method_names in sorted(framework_methods.items()):
        overview = frameworks_dir / framework / "overview.md"
        fm, body = read_overview(overview)
        source = fm.get("source") if isinstance(fm.get("source"), dict) else {}
        _track(
            report.overview_keys_dropped,
            fm,
            frozenset({"title", "description", "source"}),
        )
        refs = overview_references(body)
        report.references += len(refs)
        documents.append(
            _document(
                "practice",
                _slug(framework),
                {
                    "title": fm.get("title") or framework_title(framework),
                    # The overview is what this practice covers. Forge's practice
                    # has no body field; a markdown document's body becomes its
                    # description, so the overview goes there.
                    "description": body or fm.get("description"),
                    "canonical": source.get("url") or fm.get("framework_url"),
                    "methods": sorted(method_names),
                    "references": refs,
                },
                annotations=(
                    {"foe.source_path": str(overview.relative_to(docs_root))}
                    if overview.is_file()
                    else None
                ),
            )
        )
        report.framework_practices += 1

    # ── Curated practices: what each guide adopted, per framework ───
    #
    # Partial adoption is the point: agentic-coding takes 3 of Team Topologies'
    # 12 methods, and an area pointing straight at the framework would claim 12.
    curated: dict[tuple[str, str], list[str]] = {}
    for method_id, rel_paths in homes.items():
        framework = declared_framework.get(method_id) or ""
        for guide in _guides_of(rel_paths):
            curated.setdefault((guide, framework), []).append(names[method_id])

    area_practices: dict[str, list[str]] = {}
    for (guide, framework), method_names in sorted(curated.items()):
        guide_title = guide_titles.get(guide, guide)
        if framework == "":
            name = f"{_slug(guide)}-internal"
            title = f"{guide_title} — FOE methods"
            description = f"Methods FOE authored for the {guide_title} field guide."
            canonical = ""
        else:
            name = f"{_slug(guide)}-{_slug(framework)}"
            title = f"{framework_title(framework)} for {guide_title}"
            total = len(framework_methods.get(framework, []))
            description = (
                f"{len(set(method_names))} of {total} {framework_title(framework)} methods, "
                f"as adopted by the {guide_title} field guide."
            )
            canonical = _slug(framework)
        documents.append(
            _document(
                "practice",
                name,
                {
                    "title": title,
                    "description": description,
                    "canonical": canonical,
                    "methods": sorted(set(method_names)),
                },
            )
        )
        report.curated_practices += 1
        area_practices.setdefault(guide, []).append(name)

    # ── Practice areas: the field guides ────────────────────────────
    for guide, title in sorted(guide_titles.items()):
        practices = sorted(area_practices.get(guide, []))
        if not practices:
            report.skipped.append(f"field-guides/{guide}: no methods, no practice area")
            continue
        overview = guides_dir / guide / "overview.md"
        fm, body = read_overview(overview)
        _track(report.overview_keys_dropped, fm, frozenset({"title", "description"}))
        documents.append(
            _document(
                "practice_area",
                _slug(guide),
                {
                    "title": fm.get("title") or title,
                    "description": body
                    or fm.get("description")
                    or f"FOE field guide: {title}.",
                    "canonical": guide,
                    "practices": practices,
                },
                annotations=(
                    {"foe.source_path": str(overview.relative_to(docs_root))}
                    if overview.is_file()
                    else None
                ),
            )
        )
        report.practice_areas += 1

    report.observations_parked = sum(1 for _ in docs_root.rglob("O[0-9]*.md"))
    return documents


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--repo", type=Path, default=Path.cwd(), help="FOE repository root."
    )
    parser.add_argument(
        "--out",
        type=Path,
        required=True,
        help="Where to write the change set. Keep it outside the repository.",
    )
    args = parser.parse_args(argv)

    docs_root = args.repo / "docs" / "docs"
    if not docs_root.is_dir():
        print(f"error: {docs_root} does not exist", file=sys.stderr)
        return 1
    out = args.out.resolve()
    if out.is_relative_to(args.repo.resolve()):
        print(
            f"error: {out} is inside the repository; kata tax import would read it as "
            "nodes and its rollback would delete it. Write it elsewhere.",
            file=sys.stderr,
        )
        return 1

    report = Report()
    documents = generate(docs_root, report)
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(
        yaml.safe_dump_all(documents, sort_keys=False, allow_unicode=True, width=100),
        encoding="utf-8",
    )

    print(f"wrote {out}")
    print(f"  practice_area {report.practice_areas:4}   field guides")
    print(
        f"  practice      {report.framework_practices + report.curated_practices:4}   "
        f"{report.framework_practices} frameworks + {report.curated_practices} curated"
    )
    print(
        f"  method        {report.methods:4}   {report.merged} merged from duplicate homes"
    )
    print(f"  total         {report.total:4}")
    print("  method fields:")
    for name in ("definition", "when_to_use", "when_not_to_use", "pitfalls"):
        extra = (
            f"  ({report.definition_from_narrative} from an Overview's first paragraph)"
            if name == "definition"
            else ""
        )
        print(f"    {name:16} {report.fields.get(name, 0):4}{extra}")
    print(f"  references    {report.references:4}   links from framework reading lists")
    if report.maturity_conflicts:
        print("\nmaturity differs between a method's homes, so no foe.maturity label:")
        for c in report.maturity_conflicts:
            print(f"  {c}")
    if report.observations_parked:
        print(f"\nobservations: {report.observations_parked} in the docs, not emitted.")
    if report.overview_keys_dropped:
        print("\noverview frontmatter with no field (dropped):")
        for key, count in sorted(
            report.overview_keys_dropped.items(), key=lambda kv: -kv[1]
        ):
            print(f"  {key} ({count})")
    if report.unknown_keys:
        print("\nmethod frontmatter not modelled (dropped):")
        for key, count in sorted(report.unknown_keys.items(), key=lambda kv: -kv[1]):
            print(f"  {key} ({count})")
    for skipped in report.skipped:
        print(f"  SKIPPED {skipped}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
