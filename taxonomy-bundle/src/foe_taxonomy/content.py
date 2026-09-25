"""Turning FOE's MDX bodies into markdown a generic renderer can show.

FOE's method pages are MDX: they import three Docusaurus components and use
admonition directives. Everything else is ordinary markdown — 116 code fences and
103 tables across 192 files.

The components are stripped rather than translated, because each one renders chrome
the consumer already draws natively:

============================  ============================================
``<InternalMethodHeader />``   the tinted "FOE method" panel
``<ExternalMethodHeader />``   the tinted "From <framework>" panel
``<RelatedObservations />``    the supporting-evidence list
``<FrameworkMethodList />``    a framework's method list
``<MethodMaturityTable />``    a guide's methods as a table
``<GuideMaturitySummary />``   a guide's maturity counts
``<MaturityBadge />``          a single maturity pill
============================  ============================================

Leaving them in would duplicate that chrome; translating them would reimplement
it. Their imports go with them, since they exist only to support them.

The list is an explicit allowlist rather than "strip anything that looks like JSX",
because M159's prose contains the literal text ``<IMPORTANT>`` inside a sentence
about instructions hidden in MCP tool descriptions. A general rule would silently
eat words.

Admonitions are kept as-is. `:::caution` is meaningful content, and a renderer can
map it to a panel — unlike a JSX component, the directive carries no dependency.
"""

from __future__ import annotations

import re

#: Components whose output the consumer renders itself.
_CHROME = (
    "InternalMethodHeader",
    "ExternalMethodHeader",
    "RelatedObservations",
    "FrameworkMethodList",
    "MethodMaturityTable",
    "GuideMaturitySummary",
    "MaturityBadge",
)

_IMPORT = re.compile(r"^import\s+.*?from\s+['\"][^'\"]+['\"];?\s*$", re.MULTILINE)
_CHROME_TAG = re.compile(
    r"^[ \t]*<(?:" + "|".join(_CHROME) + r")\b[^>]*/?>[ \t]*$\n?",
    re.MULTILINE,
)
_H1 = re.compile(r"^#\s+.+$", re.MULTILINE)
_FENCE = re.compile(r"^```", re.MULTILINE)


def split_frontmatter(text: str) -> tuple[str, str]:
    """(frontmatter, body). Both empty strings when the file has no frontmatter."""
    if not text.startswith("---"):
        return "", text
    parts = text.split("---", 2)
    if len(parts) < 3:
        return "", text
    return parts[1], parts[2]


def clean_body(body: str) -> str:
    """Markdown with the consumer-rendered chrome and its imports removed.

    The leading H1 also goes: the consumer renders the title as a heading already,
    and two would read as a mistake.
    """
    out = _IMPORT.sub("", body)
    out = _CHROME_TAG.sub("", out)
    # Only the *first* H1, and only before any content — a later `#` could be
    # inside a fenced block.
    lines = out.split("\n")
    for i, line in enumerate(lines[:12]):
        if _H1.fullmatch(line.strip()) and "```" not in "\n".join(lines[:i]):
            del lines[i]
            break
    out = "\n".join(lines)
    # Collapse the blank runs the removals leave behind.
    out = re.sub(r"\n{3,}", "\n\n", out)
    return _drop_empty_sections(out.strip())


def _heading_level(line: str) -> int | None:
    match = re.match(r"^(#{1,6})\s+\S", line.strip())
    return len(match.group(1)) if match else None


def _drop_empty_sections(body: str) -> str:
    """Remove headings left with nothing under them.

    Stripping a component can empty the section that introduced it. 47 methods end
    with `## Supporting Evidence` followed only by `<RelatedObservations />`, and
    each guide has a `### Methods at a Glance` whose whole body was a
    `<MethodMaturityTable />`. A heading promising content that is not there reads
    as a rendering bug.

    A heading is empty when the next non-blank line is a heading of the *same or
    higher* level, or nothing at all. A heading followed by a **deeper** one is
    legitimate nesting — an earlier version of this check ignored depth and flagged
    115 perfectly good sections.

    Repeated until stable, because removing one empty heading can empty its parent.
    """
    lines = body.split("\n")
    changed = True
    while changed:
        changed = False
        for i, line in enumerate(lines):
            level = _heading_level(line)
            if level is None:
                continue
            nxt = next((j for j in range(i + 1, len(lines)) if lines[j].strip()), None)
            if nxt is None:
                del lines[i:]
                changed = True
                break
            following = _heading_level(lines[nxt])
            if following is not None and following <= level:
                del lines[i]
                changed = True
                break
        # `_HEADING` stays used by nothing else; levels are what matter here.
    return re.sub(r"\n{3,}", "\n\n", "\n".join(lines)).strip()


def lead_paragraph(body: str) -> str:
    """First prose paragraph, for a method with no `description` in frontmatter.

    42 of FOE's 134 methods have none, so their description currently repeats the
    title. Skips headings, directives, JSX, tables, lists and anything inside a
    code fence — a code line as a summary would be worse than no summary.
    """
    in_fence = False
    buf: list[str] = []
    for raw in body.split("\n"):
        line = raw.strip()
        if line.startswith("```"):
            in_fence = not in_fence
            continue
        if in_fence:
            continue
        if line == "":
            if buf:
                break
            continue
        if line.startswith(("#", ":::", "<", "|", "-", "*", ">", "import ")):
            if buf:
                break
            continue
        buf.append(line)
    return " ".join(buf).strip()
