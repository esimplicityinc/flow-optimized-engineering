"""Write a change set's labels and annotations onto the nodes `kata tax import` made.

`kata tax import` creates each node with `kata tax create`, which writes the spec
and drops `metadata.labels` and `metadata.annotations`; neither `create` nor
`update` can set them. FOE's method ids live in the `foe.method-id` label and its
principles and maturity in `foe.*` labels, so losing them loses real data.

This finishes the job without rewriting what the CLI wrote: it inserts the two
blocks under `metadata.name` as text, so kata's own formatting, quoting and
field order stay byte-for-byte as kata left them. Run `kata tax lint --strict`
afterwards; it reads the result like any other document.

    uv run --project taxonomy-bundle python -m foe_taxonomy.stamp \\
        --repo . --change-set /tmp/foe.yaml
"""

from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path
from typing import Any

import yaml

#: Where kata writes each kind, under the repository (Forge's `directory_name`).
DIRECTORIES = {
    "practice_area": "practice_areas",
    "practice": "practices",
    "method": "methods",
}


def _block(key: str, values: dict[str, str]) -> list[str]:
    # JSON strings are valid YAML scalars and quote anything that needs quoting.
    return [f"  {key}:"] + [
        f"    {json.dumps(k)}: {json.dumps(v)}" for k, v in values.items()
    ]


def stamp(path: Path, labels: dict[str, str], annotations: dict[str, str]) -> bool:
    """Insert metadata blocks into one document. True when the file changed."""
    lines = path.read_text(encoding="utf-8").split("\n")
    try:
        start = lines.index("metadata:")
    except ValueError as exc:
        raise ValueError(f"{path}: no top-level metadata block") from exc
    end = next(
        (
            i
            for i in range(start + 1, len(lines))
            if lines[i] and not lines[i].startswith(" ")
        ),
        len(lines),
    )
    existing = [line.strip().split(":", 1)[0] for line in lines[start + 1 : end]]
    if "labels" in existing or "annotations" in existing:
        # Already stamped, or written by hand. Never merge into someone else's block.
        return False
    insert: list[str] = []
    if labels:
        insert += _block("labels", labels)
    if annotations:
        insert += _block("annotations", annotations)
    if not insert:
        return False
    path.write_text("\n".join(lines[:end] + insert + lines[end:]), encoding="utf-8")
    return True


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--repo", type=Path, default=Path.cwd())
    parser.add_argument("--change-set", type=Path, required=True)
    args = parser.parse_args(argv)

    root = args.repo / ".global" / "taxonomy" / "practices"
    documents: list[dict[str, Any]] = list(
        yaml.safe_load_all(args.change_set.read_text(encoding="utf-8"))
    )
    changed = unchanged = 0
    missing: list[str] = []
    for doc in documents:
        meta = doc.get("metadata") or {}
        path = root / DIRECTORIES[doc["kind"]] / f"{meta['name']}.yaml"
        if not path.is_file():
            missing.append(str(path))
            continue
        if stamp(path, meta.get("labels") or {}, meta.get("annotations") or {}):
            changed += 1
        else:
            unchanged += 1

    print(f"stamped {changed}, unchanged {unchanged}, of {len(documents)}")
    for item in missing:
        print(f"  MISSING {item} — was the change set imported?", file=sys.stderr)
    return 1 if missing else 0


if __name__ == "__main__":
    raise SystemExit(main())
