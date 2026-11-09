"""The FOE change set: properties the conversion depends on.

Most of these run against the real `docs/docs/` corpus, and assert properties
rather than counts, so adding a method or a guide does not break them.
"""

from __future__ import annotations

import collections
import re
from pathlib import Path

import pytest
import yaml

from foe_taxonomy.content import clean_body, split_frontmatter, split_sections
from foe_taxonomy.generate import (
    Report,
    generate,
    main,
    method_name,
    split_method,
)
from foe_taxonomy.stamp import stamp

REPO = Path(__file__).resolve().parents[2]
DOCS = REPO / "docs" / "docs"
NAME_RULE = re.compile(r"^[a-z0-9]([a-z0-9_-]{0,61}[a-z0-9])?$")
FIELDS = ("definition", "when_to_use", "when_not_to_use", "pitfalls", "body")


@pytest.fixture(scope="module")
def documents() -> list[dict]:
    return generate(DOCS, Report())


def _prose_lines(text: str) -> collections.Counter[str]:
    return collections.Counter(
        line.strip()
        for line in text.split("\n")
        if line.strip() and not line.lstrip().startswith("## ")
    )


# ── Splitting a method's write-up into Forge's fields ──────────────────


def test_named_sections_become_fields_and_the_rest_stays_in_body() -> None:
    body = (
        "Lead.\n\n## Definition\n\nWhat it is.\n\n## How It Works\n\nSteps.\n\n"
        "## When to Use\n\nHere.\n\n## Common Mistakes\n\nThis.\n\n## Trade-offs\n\nCosts."
    )
    out = split_method(body, Report())
    assert out["definition"] == "What it is."
    assert out["when_to_use"] == "Here."
    assert out["pitfalls"] == "This."
    assert out["when_not_to_use"] == "Costs."
    assert out["body"] == "Lead.\n\n## How It Works\n\nSteps."


def test_a_narrative_overview_is_copied_into_definition_not_moved() -> None:
    # Moving it would leave the body starting mid-thought.
    out = split_method("## Overview\n\nFirst para.\n\nSecond para.", Report())
    assert out["definition"] == "First para."
    assert "## Overview\n\nFirst para.\n\nSecond para." in out["body"]


def test_a_heading_inside_a_code_fence_is_not_a_section() -> None:
    _, sections = split_sections("## Real\n\n```md\n## Not a heading\n```\n")
    assert [h for h, _ in sections] == ["Real"]


def test_no_method_loses_a_line_of_prose(documents: list[dict]) -> None:
    sources: dict[str, str] = {}
    for path in DOCS.rglob("M[0-9]*.md"):
        method_id = path.stem.split("-", 1)[0]
        _, raw = split_frontmatter(path.read_text(encoding="utf-8"))
        cleaned = clean_body(raw)
        if len(cleaned) > len(sources.get(method_id, "")):
            sources[method_id] = cleaned
    for doc in documents:
        if doc["kind"] != "method":
            continue
        method_id = doc["metadata"]["labels"]["foe.method-id"]
        landed = _prose_lines("\n".join(doc["spec"].get(f) or "" for f in FIELDS))
        missing = _prose_lines(sources[method_id]) - landed
        assert not missing, f"{method_id} lost: {list(missing)[:3]}"


# ── Names and references ───────────────────────────────────────────────


def test_method_names_are_lowercase_id_and_slug() -> None:
    assert (
        method_name("M121", "executable-specifications")
        == "m121-executable-specifications"
    )


def test_every_name_meets_the_fqtn_rule_and_is_unique(documents: list[dict]) -> None:
    names = [d["metadata"]["name"] for d in documents]
    assert [n for n in names if not NAME_RULE.match(n)] == []
    assert len(names) == len(set(names))


def test_every_reference_names_an_emitted_node(documents: list[dict]) -> None:
    by_kind = collections.defaultdict(set)
    for d in documents:
        by_kind[d["kind"]].add(d["metadata"]["name"])
    for d in documents:
        spec = d["spec"]
        if d["kind"] == "practice_area":
            assert set(spec["practices"]) <= by_kind["practice"]
        if d["kind"] == "practice":
            assert set(spec.get("methods", [])) <= by_kind["method"]


def test_every_method_is_prescribed_by_some_practice(documents: list[dict]) -> None:
    prescribed = {
        m for d in documents if d["kind"] == "practice" for m in d["spec"]["methods"]
    }
    methods = {d["metadata"]["name"] for d in documents if d["kind"] == "method"}
    assert methods - prescribed == set()


def test_no_practice_carries_a_practice_area(documents: list[dict]) -> None:
    # Forge 11 retired the field: the area lists its practices, and lint rejects
    # a practice that points back.
    carrying = [
        d["metadata"]["name"]
        for d in documents
        if d["kind"] == "practice" and "practice_area" in d["spec"]
    ]
    assert carrying == []


def test_each_practice_area_lists_its_practices(documents: list[dict]) -> None:
    practices = {
        d["metadata"]["name"]: d["spec"] for d in documents if d["kind"] == "practice"
    }
    listed: list[str] = []
    for d in documents:
        if d["kind"] != "practice_area":
            continue
        area = d["metadata"]["name"]
        assert d["spec"]["practices"], f"{area} lists no practice"
        assert d["spec"]["practices"] == sorted(d["spec"]["practices"])
        for name in d["spec"]["practices"]:
            assert name.startswith(f"{area}-"), f"{name} is not {area}'s adoption"
        listed += d["spec"]["practices"]
    assert set(listed) <= set(practices)
    assert len(listed) == len(set(listed)), "a practice is listed by two areas"
    # What no area lists is a framework's canonical set, which an adoption names.
    unlisted = set(practices) - set(listed)
    assert unlisted
    for name in listed:
        assert practices[name].get("canonical", "") in unlisted | {""}


def test_the_fqtn_never_carries_the_id_in_uppercase(documents: list[dict]) -> None:
    # FOE's id survives as a label, not as the node name.
    for d in documents:
        if d["kind"] == "method":
            assert (
                d["metadata"]["labels"]["foe.method-id"].lower()
                in d["metadata"]["name"]
            )


def test_every_node_names_a_real_owner(documents: list[dict]) -> None:
    # kata tax create writes team@example.com when a document names no owner.
    for d in documents:
        assert d["spec"]["owners"] and "example.com" not in d["spec"]["owners"][0]


# ── Guarding the import ────────────────────────────────────────────────


def test_the_change_set_may_not_be_written_inside_the_repository(
    tmp_path: Path,
) -> None:
    # Inside the repo, kata tax import reads it as nodes and its rollback deletes it.
    (tmp_path / "docs" / "docs").mkdir(parents=True)
    assert main(["--repo", str(tmp_path), "--out", str(tmp_path / "set.yaml")]) == 1
    assert not (tmp_path / "set.yaml").exists()


# ── Stamping metadata onto what the CLI wrote ──────────────────────────

WRITTEN = (
    'apiVersion: katalyst.taxonomy/v2alpha\nkind: method\nmetadata:\n  name: "m1-x"\n'
    'spec:\n  body: "a yaml example\\n  labels:\\n    module: y"\n'
)


def test_stamp_inserts_labels_without_touching_the_spec(tmp_path: Path) -> None:
    path = tmp_path / "m1-x.yaml"
    path.write_text(WRITTEN)
    assert stamp(path, {"foe.method-id": "M1"}, {"foe.source_path": "a.md"})
    doc = yaml.safe_load(path.read_text())
    assert doc["metadata"]["labels"] == {"foe.method-id": "M1"}
    assert doc["metadata"]["annotations"] == {"foe.source_path": "a.md"}
    assert path.read_text().endswith(WRITTEN.split("spec:", 1)[1])


def test_stamp_is_idempotent_and_ignores_labels_in_prose(tmp_path: Path) -> None:
    # The body above contains the text `labels:`; only metadata counts.
    path = tmp_path / "m1-x.yaml"
    path.write_text(WRITTEN)
    assert stamp(path, {"a": "b"}, {})
    once = path.read_text()
    assert not stamp(path, {"a": "b"}, {})
    assert path.read_text() == once
