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
    field_guides: int = 0
    methods: int = 0
    observations: int = 0
    skipped: list[str] = field(default_factory=list[str])
    unknown_keys: dict[str, int] = field(default_factory=dict[str, int])
    merged: int = 0
    conflicts: list[str] = field(default_factory=list[str])

    @property
    def total(self) -> int:
        return self.field_guides + self.methods + self.observations


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


def generate(docs_root: Path, out_root: Path, report: Report) -> None:
    """Emit every FOE node under ``out_root``."""
    guides_dir = docs_root / "field-guides"
    frameworks_dir = docs_root / "external-frameworks"

    # ── Field guides ────────────────────────────────────────────────
    guide_names: dict[str, str] = {}
    if guides_dir.is_dir():
        for child in sorted(guides_dir.iterdir()):
            # `observations/` is a sibling of the guides, not a guide itself.
            if not child.is_dir() or child.name == "observations":
                continue
            name = _slug(child.name)
            guide_names[child.name] = name
            title = child.name.replace("-", " ").title()
            _write(
                out_root / "field_guides" / f"{name}.yaml",
                _document(
                    "foe_field_guide",
                    name,
                    {"description": f"FOE field guide: {title}.", "title": title,
                     "domain": child.name},
                ),
            )
            report.field_guides += 1

    # ── Methods ─────────────────────────────────────────────────────
    #
    # A method id can legitimately appear twice: 60 of FOE's methods are
    # documented both as an external-framework pattern and inside a field guide
    # (M100 "Aggregate" is in domain-driven-design *and* software-architecture).
    # Those are one method with two documentation homes, so the specs are merged
    # rather than one overwriting the other — which is what an earlier version of
    # this generator did, silently losing 58 methods' worth of detail.
    collected: dict[str, dict[str, Any]] = {}
    for path in sorted(docs_root.rglob("M[0-9]*.md")):
        fm = parse_frontmatter(path)
        if fm is None:
            report.skipped.append(f"{path.relative_to(docs_root)}: no frontmatter")
            continue
        method_id = str(fm.get("methodId") or _id_from_filename(path, "M") or "")
        if method_id == "":
            report.skipped.append(f"{path.relative_to(docs_root)}: no methodId and no id in filename")
            continue
        _track_unknown(report, fm, METHOD_KEYS)
        alignment = fm.get("foe_alignment") or {}
        parent = None
        # A field-guide method nests under its guide; an external-framework
        # method has no guide, which the parent rule allows.
        for source_dir, guide_name in guide_names.items():
            if f"/field-guides/{source_dir}/" in str(path):
                parent = guide_name
                break

        spec: dict[str, Any] = {
            "description": str(fm.get("description") or fm.get("title") or method_id),
            "title": str(fm.get("title") or method_id),
            "method_id": method_id,
            # FOE uses two spellings for the same concept: `maturity` on
            # field-guide methods (43 files) and `foe_maturity` on
            # external-framework ones (60). Reading both rather than picking a
            # winner, since neither is wrong in its own context.
            "maturity": fm.get("maturity") or fm.get("foe_maturity"),
            "observations": [_observation_ref(str(o)) for o in (fm.get("observations") or [])],
            "framework": fm.get("framework"),
            "framework_url": fm.get("framework_url"),
            "pillar": fm.get("pillar"),
            "foe_principle": alignment.get("primary") if isinstance(alignment, dict) else None,
            "foe_principle_secondary": (
                alignment.get("secondary") if isinstance(alignment, dict) else None
            ),
            "status": fm.get("status"),
            "source_path": str(path.relative_to(docs_root)),
        }
        if parent is not None:
            spec["parents"] = {"node": parent}

        existing = collected.get(method_id)
        if existing is None:
            collected[method_id] = spec
        else:
            report.merged += 1
            # Field-guide data (maturity, observations, parent) and external data
            # (framework, pillar, url) are complementary, so take the union and
            # let a present value win over an absent one.
            for key, value in spec.items():
                if value in (None, "", [], {}):
                    continue
                if existing.get(key) in (None, "", [], {}):
                    existing[key] = value
            # Both homes are real; record both so the provenance is not lost.
            existing["source_path"] = "; ".join(
                sorted({existing.get("source_path", ""), spec.get("source_path", "")} - {""})
            )

    for method_id, spec in sorted(collected.items()):
        _write(out_root / "methods" / f"{method_id}.yaml", _document("foe_method", method_id, spec))
        report.methods += 1

    # ── Observations ────────────────────────────────────────────────
    for path in sorted(docs_root.rglob("O[0-9]*.md")):
        fm = parse_frontmatter(path)
        if fm is None:
            report.skipped.append(f"{path.relative_to(docs_root)}: no frontmatter")
            continue
        obs_id = str(fm.get("observationId") or _id_from_filename(path, "O") or "")
        if obs_id == "":
            report.skipped.append(
                f"{path.relative_to(docs_root)}: no observationId and no id in filename"
            )
            continue
        _track_unknown(report, fm, OBSERVATION_KEYS)
        source = fm.get("source") if isinstance(fm.get("source"), dict) else {}

        # Unlike methods, a repeated observation id is a genuine mistake rather
        # than one observation with two homes: O126 is claimed by both the
        # StrongDM software-factory writeup and the Data Link pilot, which are
        # unrelated. Merging would fabricate a hybrid, so the collision is
        # reported and the later file skipped — the fix belongs in FOE's
        # frontmatter, not here.
        target = out_root / "observations" / f"{obs_id}.yaml"
        if target.exists():
            report.conflicts.append(
                f"{obs_id} is claimed by more than one observation; kept the first, "
                f"skipped {path.relative_to(docs_root)}"
            )
            continue
        _write(
            target,
            _document(
                "foe_observation",
                obs_id,
                {
                    "description": str(fm.get("title") or obs_id),
                    "title": str(fm.get("title") or obs_id),
                    "observation_id": obs_id,
                    "source_type": fm.get("source_type"),
                    "status": fm.get("status"),
                    "methods": [_method_ref(m) for m in (fm.get("methods") or [])],
                    "source_url": source.get("url"),
                    "source_organization": source.get("organization"),
                    "source_year": source.get("year"),
                    "source_path": str(path.relative_to(docs_root)),
                },
            ),
        )
        report.observations += 1

    del frameworks_dir  # methods carry `framework` as a field; no separate kind yet


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

    print(f"field guides : {report.field_guides}")
    print(f"methods      : {report.methods}" + (f"  ({report.merged} merged from duplicate ids)" if report.merged else ""))
    print(f"observations : {report.observations}")
    print(f"total nodes  : {report.total}")
    if report.conflicts:
        print("ID CONFLICTS — these need fixing in FOE's frontmatter:")
        for c in report.conflicts:
            print(f"  {c}")
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
