#!/usr/bin/env python3
"""
Field Guides Linter & Scorer

Validates frontmatter and calculates maturity scores for FOE Field Guides.

Usage:
    uv run scripts/lint_field_guides.py
    uv run scripts/lint_field_guides.py --scores-only
    uv run scripts/lint_field_guides.py --lint-only
"""

import argparse
import json
import re
import sys
from dataclasses import dataclass, field
from pathlib import Path
from typing import Any, Optional

import frontmatter

# === Constants ===

MATURITY_LEVELS = ["hypothesized", "observing", "validated", "proven"]
MATURITY_SCORES = {"hypothesized": 1, "observing": 2, "validated": 3, "proven": 4}
OBSERVATION_STATUSES = ["in-progress", "completed"]
SOURCE_TYPES = ["internal", "external"]

# Maturity -> allowed folders
MATURITY_FOLDERS = {
    "hypothesized": "emerging",
    "observing": "emerging",
    "validated": "established",
    "proven": "established",
}


# === Data Classes ===


@dataclass
class Issue:
    """A validation error or warning."""

    type: str
    message: str
    file: Optional[str] = None
    severity: str = "error"  # "error" or "warning"

    def to_dict(self) -> dict:
        d = {"type": self.type, "message": self.message, "severity": self.severity}
        if self.file:
            d["file"] = self.file
        return d


@dataclass
class Method:
    """Represents a method file."""

    id: str
    path: Path
    title: str
    maturity: str
    maturity_score: int
    observations: list[str]
    is_external: bool
    guide_id: Optional[str] = None
    external_framework: Optional[str] = None
    external_method: Optional[str] = None
    raw_frontmatter: dict = field(default_factory=dict)

    def to_dict(self, verbose: bool = False) -> dict:
        d = {
            "path": str(self.path),
            "title": self.title,
            "type": "external" if self.is_external else "internal",
            "maturity": self.maturity,
            "maturity_score": self.maturity_score,
            "observation_count": len(self.observations),
        }
        if verbose:
            d["observations"] = self.observations
            d["guide_id"] = self.guide_id
            if self.is_external:
                d["external_framework"] = self.external_framework
                d["external_method"] = self.external_method
        return d


@dataclass
class Observation:
    """Represents an observation file."""

    id: str
    path: Path
    title: str
    status: str
    source_type: str
    methods: list[str]
    source: Optional[dict] = None
    raw_frontmatter: dict = field(default_factory=dict)

    def to_dict(self, verbose: bool = False) -> dict:
        d = {
            "path": str(self.path),
            "title": self.title,
            "source_type": self.source_type,
            "status": self.status,
            "method_count": len(self.methods),
        }
        if verbose:
            d["methods"] = self.methods
            if self.source:
                d["source"] = self.source
        return d


@dataclass
class GuideScore:
    """Scores for a single Field Guide."""

    guide_id: str
    maturity_score: float
    maturity_label: str
    method_count: int
    internal_method_count: int
    external_method_count: int
    observation_coverage: float
    internal_observations: int
    external_observations: int
    evidence_strength: float

    def to_dict(self) -> dict:
        return {
            "maturity_score": round(self.maturity_score, 2),
            "maturity_label": self.maturity_label,
            "method_count": self.method_count,
            "internal_method_count": self.internal_method_count,
            "external_method_count": self.external_method_count,
            "observation_coverage": round(self.observation_coverage, 2),
            "internal_observations": self.internal_observations,
            "external_observations": self.external_observations,
            "evidence_strength": round(self.evidence_strength, 1),
        }


# === Utilities ===


def extract_id_from_filename(filename: str) -> Optional[str]:
    """Extract M### or O### from filename like M155-foo.md."""
    match = re.match(r"^([MO]\d+)-", filename)
    return match.group(1) if match else None


def score_to_label(score: float) -> str:
    """Convert numeric score to maturity label."""
    if score < 1.5:
        return "hypothesized"
    if score < 2.5:
        return "observing"
    if score < 3.5:
        return "validated"
    return "proven"


def get_guide_id_from_path(path: Path) -> Optional[str]:
    """Extract guide ID from path like field-guides/agentic-coding/methods/..."""
    parts = path.parts
    try:
        fg_idx = parts.index("field-guides")
        if fg_idx + 1 < len(parts):
            return parts[fg_idx + 1]
    except ValueError:
        pass
    return None


def get_folder_from_path(path: Path) -> Optional[str]:
    """Extract 'emerging' or 'established' from method path."""
    parts = path.parts
    if "emerging" in parts:
        return "emerging"
    if "established" in parts:
        return "established"
    return None


# === Loaders ===


def load_methods(docs_path: Path) -> dict[str, Method]:
    """Load all method files from field-guides and external-frameworks."""
    methods = {}

    # Field Guide methods (internal and external adoptions)
    for method_file in docs_path.glob("field-guides/*/methods/*/M*.md"):
        try:
            post = frontmatter.load(method_file)
            fm = post.metadata

            method_id = fm.get("methodId")
            if not method_id:
                continue

            is_external = "external_method" in fm
            maturity = fm.get("foe_maturity" if is_external else "maturity", "hypothesized")
            
            methods[method_id] = Method(
                id=method_id,
                path=method_file.relative_to(docs_path),
                title=fm.get("title", ""),
                maturity=maturity,
                maturity_score=MATURITY_SCORES.get(maturity, 1),
                observations=fm.get("observations", []),
                is_external=is_external,
                guide_id=get_guide_id_from_path(method_file),
                external_framework=fm.get("external_method", {}).get("framework") if is_external else None,
                external_method=fm.get("external_method", {}).get("method") if is_external else None,
                raw_frontmatter=fm,
            )
        except Exception as e:
            print(f"Warning: Could not load {method_file}: {e}", file=sys.stderr)

    # Canonical external framework methods
    for method_file in docs_path.glob("external-frameworks/*/methods/M*.md"):
        try:
            post = frontmatter.load(method_file)
            fm = post.metadata

            method_id = fm.get("methodId")
            if not method_id:
                continue

            # Don't overwrite if already loaded from field-guides
            if method_id not in methods:
                methods[method_id] = Method(
                    id=method_id,
                    path=method_file.relative_to(docs_path),
                    title=fm.get("title", ""),
                    maturity="proven",  # Canonical methods are considered proven
                    maturity_score=4,
                    observations=fm.get("observations", []),
                    is_external=True,
                    guide_id=None,
                    raw_frontmatter=fm,
                )
        except Exception as e:
            print(f"Warning: Could not load {method_file}: {e}", file=sys.stderr)

    return methods


def load_observations(docs_path: Path) -> dict[str, Observation]:
    """Load all observation files."""
    observations = {}

    for obs_file in docs_path.glob("field-guides/observations/*/O*.md"):
        try:
            post = frontmatter.load(obs_file)
            fm = post.metadata

            obs_id = fm.get("observationId")
            if not obs_id:
                continue

            observations[obs_id] = Observation(
                id=obs_id,
                path=obs_file.relative_to(docs_path),
                title=fm.get("title", ""),
                status=fm.get("status", ""),
                source_type=fm.get("source_type", ""),
                methods=fm.get("methods", []),
                source=fm.get("source"),
                raw_frontmatter=fm,
            )
        except Exception as e:
            print(f"Warning: Could not load {obs_file}: {e}", file=sys.stderr)

    return observations


def load_frameworks(docs_path: Path) -> dict[str, list[str]]:
    """Load external frameworks and their method slugs."""
    frameworks = {}

    for fw_dir in docs_path.glob("external-frameworks/*/"):
        if fw_dir.is_dir() and not fw_dir.name.startswith("_"):
            fw_name = fw_dir.name
            methods = []
            for method_file in fw_dir.glob("methods/M*.md"):
                # Extract slug from filename like M111-deployment-frequency.md
                match = re.match(r"^M\d+-(.+)\.md$", method_file.name)
                if match:
                    methods.append(match.group(1))
            frameworks[fw_name] = methods

    return frameworks


def load_guide_overviews(docs_path: Path) -> dict[str, dict]:
    """Load Field Guide overview files."""
    overviews = {}

    for overview_file in docs_path.glob("field-guides/*/overview.md"):
        try:
            post = frontmatter.load(overview_file)
            guide_id = overview_file.parent.name
            overviews[guide_id] = post.metadata
        except Exception as e:
            print(f"Warning: Could not load {overview_file}: {e}", file=sys.stderr)

    return overviews


# === Validators ===


def validate_method(
    method: Method,
    observations: dict[str, Observation],
    frameworks: dict[str, list[str]],
    docs_path: Path,
) -> list[Issue]:
    """Validate a single method file."""
    issues = []
    filename = method.path.name

    # Check methodId matches filename
    expected_id = extract_id_from_filename(filename)
    if expected_id and expected_id != method.id:
        issues.append(Issue(
            type="id_mismatch",
            message=f"methodId '{method.id}' does not match filename prefix '{expected_id}'",
            file=str(method.path),
        ))

    # Check title exists
    if not method.title:
        issues.append(Issue(
            type="missing_required_field",
            message="Missing required field: title",
            file=str(method.path),
        ))

    # Check maturity is valid
    if method.maturity not in MATURITY_LEVELS:
        issues.append(Issue(
            type="invalid_value",
            message=f"Invalid maturity '{method.maturity}'. Must be one of: {MATURITY_LEVELS}",
            file=str(method.path),
        ))

    # Check folder matches maturity (only for field-guide methods)
    if method.guide_id:
        expected_folder = MATURITY_FOLDERS.get(method.maturity)
        actual_folder = get_folder_from_path(method.path)
        if expected_folder and actual_folder and expected_folder != actual_folder:
            issues.append(Issue(
                type="folder_mismatch",
                message=f"Method with maturity '{method.maturity}' should be in '{expected_folder}/' but is in '{actual_folder}/'",
                file=str(method.path),
            ))

    # Check observation references exist
    for obs_ref in method.observations:
        # Handle both full paths and just IDs
        obs_id = obs_ref.split("/")[-1] if "/" in obs_ref else obs_ref
        # Extract O### if it's a filename
        if obs_id.startswith("O") and "-" in obs_id:
            obs_id = obs_id.split("-")[0]
        
        if obs_id.startswith("O") and obs_id not in observations:
            issues.append(Issue(
                type="broken_reference",
                message=f"Observation reference '{obs_ref}' not found",
                file=str(method.path),
            ))

    # External method specific validation
    if method.is_external:
        ext = method.raw_frontmatter.get("external_method", {})
        
        # Check framework exists
        if method.external_framework and method.external_framework not in frameworks:
            issues.append(Issue(
                type="framework_not_found",
                message=f"External framework '{method.external_framework}' not found",
                file=str(method.path),
            ))
        
        # Check canonical method exists
        elif method.external_framework and method.external_method:
            if method.external_method not in frameworks.get(method.external_framework, []):
                issues.append(Issue(
                    type="canonical_method_not_found",
                    message=f"Canonical method '{method.external_method}' not found in framework '{method.external_framework}'",
                    file=str(method.path),
                ))
        
        # Check external_method.id matches methodId
        ext_id = ext.get("id")
        if ext_id and ext_id != method.id:
            issues.append(Issue(
                type="id_mismatch",
                message=f"external_method.id '{ext_id}' does not match methodId '{method.id}'",
                file=str(method.path),
            ))

    # Warning: empty observations
    if not method.observations:
        issues.append(Issue(
            type="empty_observations",
            message="Method has no linked observations",
            file=str(method.path),
            severity="warning",
        ))

    return issues


def validate_observation(
    obs: Observation,
    methods: dict[str, Method],
) -> list[Issue]:
    """Validate a single observation file."""
    issues = []
    filename = obs.path.name

    # Check observationId matches filename
    expected_id = extract_id_from_filename(filename)
    if expected_id and expected_id != obs.id:
        issues.append(Issue(
            type="id_mismatch",
            message=f"observationId '{obs.id}' does not match filename prefix '{expected_id}'",
            file=str(obs.path),
        ))

    # Check title exists
    if not obs.title:
        issues.append(Issue(
            type="missing_required_field",
            message="Missing required field: title",
            file=str(obs.path),
        ))

    # Check status is valid
    if obs.status not in OBSERVATION_STATUSES:
        issues.append(Issue(
            type="invalid_value",
            message=f"Invalid status '{obs.status}'. Must be one of: {OBSERVATION_STATUSES}",
            file=str(obs.path),
        ))

    # Check source_type is valid
    if obs.source_type not in SOURCE_TYPES:
        issues.append(Issue(
            type="invalid_value",
            message=f"Invalid source_type '{obs.source_type}'. Must be one of: {SOURCE_TYPES}",
            file=str(obs.path),
        ))

    # Check folder matches source_type
    if obs.source_type == "internal" and "external" in str(obs.path):
        issues.append(Issue(
            type="folder_mismatch",
            message="Observation with source_type 'internal' should be in 'internal/' folder",
            file=str(obs.path),
        ))
    elif obs.source_type == "external" and "internal" in str(obs.path):
        issues.append(Issue(
            type="folder_mismatch",
            message="Observation with source_type 'external' should be in 'external/' folder",
            file=str(obs.path),
        ))

    # External observation specific validation
    if obs.source_type == "external":
        if not obs.source:
            issues.append(Issue(
                type="missing_required_field",
                message="External observation missing 'source' field",
                file=str(obs.path),
            ))
        else:
            if not obs.source.get("authors"):
                issues.append(Issue(
                    type="missing_required_field",
                    message="External observation missing 'source.authors'",
                    file=str(obs.path),
                ))
            if not obs.source.get("year"):
                issues.append(Issue(
                    type="missing_required_field",
                    message="External observation missing 'source.year'",
                    file=str(obs.path),
                ))
            if not obs.source.get("url"):
                issues.append(Issue(
                    type="missing_required_field",
                    message="External observation missing 'source.url'",
                    file=str(obs.path),
                ))

    # Check method references exist
    for method_ref in obs.methods:
        if method_ref.startswith("M") and method_ref not in methods:
            issues.append(Issue(
                type="broken_reference",
                message=f"Method reference '{method_ref}' not found",
                file=str(obs.path),
            ))

    return issues


def validate_bidirectional_links(
    methods: dict[str, Method],
    observations: dict[str, Observation],
) -> list[Issue]:
    """Check that observation->method and method->observation links are bidirectional."""
    issues = []

    # Build reverse lookup: which observations reference each method
    method_to_obs = {m_id: set() for m_id in methods}
    for obs_id, obs in observations.items():
        for method_ref in obs.methods:
            if method_ref in method_to_obs:
                method_to_obs[method_ref].add(obs_id)

    # Check each method's observations array matches what references it
    for method_id, method in methods.items():
        # Get observation IDs from method's array (normalize paths to IDs)
        method_obs_ids = set()
        for obs_ref in method.observations:
            # Handle various formats
            if "/" in obs_ref:
                # Path like "internal/O100-prima-bdd..."
                parts = obs_ref.split("/")
                for part in parts:
                    if part.startswith("O"):
                        obs_id = part.split("-")[0] if "-" in part else part
                        method_obs_ids.add(obs_id)
                        break
            elif obs_ref.startswith("O"):
                obs_id = obs_ref.split("-")[0] if "-" in obs_ref else obs_ref
                method_obs_ids.add(obs_id)

        # Check for observations that reference this method but aren't in method's list
        referencing_obs = method_to_obs.get(method_id, set())
        missing_in_method = referencing_obs - method_obs_ids
        
        for obs_id in missing_in_method:
            issues.append(Issue(
                type="missing_bidirectional_link",
                message=f"Observation {obs_id} references method {method_id}, but method doesn't list this observation",
                file=str(method.path),
                severity="warning",
            ))

        # Check for observations in method's list that don't reference this method
        missing_in_obs = method_obs_ids - referencing_obs
        for obs_id in missing_in_obs:
            if obs_id in observations:
                issues.append(Issue(
                    type="missing_bidirectional_link",
                    message=f"Method {method_id} lists observation {obs_id}, but observation doesn't reference this method",
                    file=str(method.path),
                    severity="warning",
                ))

    return issues


def validate_id_sequences(
    methods: dict[str, Method],
    observations: dict[str, Observation],
) -> list[Issue]:
    """Check for gaps in ID sequences."""
    issues = []

    # Extract numeric parts
    method_nums = sorted([int(m_id[1:]) for m_id in methods.keys() if m_id.startswith("M")])
    obs_nums = sorted([int(o_id[1:]) for o_id in observations.keys() if o_id.startswith("O")])

    # Check method gaps
    if method_nums:
        for i in range(len(method_nums) - 1):
            if method_nums[i + 1] - method_nums[i] > 1:
                missing = list(range(method_nums[i] + 1, method_nums[i + 1]))
                issues.append(Issue(
                    type="id_gap",
                    message=f"Gap in method IDs: M{missing[0]}" + (f"-M{missing[-1]}" if len(missing) > 1 else "") + f" missing between M{method_nums[i]} and M{method_nums[i+1]}",
                    severity="warning",
                ))

    # Check observation gaps
    if obs_nums:
        for i in range(len(obs_nums) - 1):
            if obs_nums[i + 1] - obs_nums[i] > 1:
                missing = list(range(obs_nums[i] + 1, obs_nums[i + 1]))
                issues.append(Issue(
                    type="id_gap",
                    message=f"Gap in observation IDs: O{missing[0]}" + (f"-O{missing[-1]}" if len(missing) > 1 else "") + f" missing between O{obs_nums[i]} and O{obs_nums[i+1]}",
                    severity="warning",
                ))

    return issues


def validate_guide_overviews(
    overviews: dict[str, dict],
    methods: dict[str, Method],
) -> list[Issue]:
    """Validate that guide overview adopted_methods match actual files."""
    issues = []

    for guide_id, overview in overviews.items():
        adopted = overview.get("adopted_methods", [])
        
        for adopted_method in adopted:
            framework = adopted_method.get("framework")
            method_slug = adopted_method.get("method")
            
            if not framework or not method_slug:
                continue

            # Find matching method file
            found = False
            for method_id, method in methods.items():
                if (method.guide_id == guide_id and 
                    method.external_framework == framework and 
                    method.external_method == method_slug):
                    found = True
                    break

            if not found:
                issues.append(Issue(
                    type="overview_mismatch",
                    message=f"Guide '{guide_id}' overview lists adopted method '{framework}/{method_slug}' but no matching file found",
                    file=f"field-guides/{guide_id}/overview.md",
                    severity="warning",
                ))

    return issues


def find_orphaned_observations(
    methods: dict[str, Method],
    observations: dict[str, Observation],
) -> list[Issue]:
    """Find observations not referenced by any method."""
    issues = []

    # Collect all observation IDs referenced by methods
    referenced_obs = set()
    for method in methods.values():
        for obs_ref in method.observations:
            if "/" in obs_ref:
                parts = obs_ref.split("/")
                for part in parts:
                    if part.startswith("O"):
                        obs_id = part.split("-")[0] if "-" in part else part
                        referenced_obs.add(obs_id)
                        break
            elif obs_ref.startswith("O"):
                obs_id = obs_ref.split("-")[0] if "-" in obs_ref else obs_ref
                referenced_obs.add(obs_id)

    # Find orphans
    for obs_id in observations:
        if obs_id not in referenced_obs:
            issues.append(Issue(
                type="orphaned_observation",
                message=f"Observation {obs_id} is not referenced by any method",
                file=str(observations[obs_id].path),
                severity="warning",
            ))

    return issues


# === Scorers ===


def score_guide(
    guide_id: str,
    methods: dict[str, Method],
    observations: dict[str, Observation],
) -> GuideScore:
    """Calculate scores for a single Field Guide."""
    guide_methods = [m for m in methods.values() if m.guide_id == guide_id]
    
    if not guide_methods:
        return GuideScore(
            guide_id=guide_id,
            maturity_score=0,
            maturity_label="hypothesized",
            method_count=0,
            internal_method_count=0,
            external_method_count=0,
            observation_coverage=0,
            internal_observations=0,
            external_observations=0,
            evidence_strength=0,
        )

    # Calculate maturity score
    maturity_scores = [m.maturity_score for m in guide_methods]
    avg_maturity = sum(maturity_scores) / len(maturity_scores)

    # Count method types
    internal_methods = [m for m in guide_methods if not m.is_external]
    external_methods = [m for m in guide_methods if m.is_external]

    # Calculate observation coverage
    methods_with_obs = sum(1 for m in guide_methods if m.observations)
    coverage = methods_with_obs / len(guide_methods) if guide_methods else 0

    # Collect observation IDs for this guide's methods
    guide_obs_ids = set()
    for method in guide_methods:
        for obs_ref in method.observations:
            if "/" in obs_ref:
                parts = obs_ref.split("/")
                for part in parts:
                    if part.startswith("O"):
                        obs_id = part.split("-")[0] if "-" in part else part
                        guide_obs_ids.add(obs_id)
                        break
            elif obs_ref.startswith("O"):
                obs_id = obs_ref.split("-")[0] if "-" in obs_ref else obs_ref
                guide_obs_ids.add(obs_id)

    # Count observation types
    internal_obs = sum(1 for o_id in guide_obs_ids 
                       if o_id in observations and observations[o_id].source_type == "internal")
    external_obs = sum(1 for o_id in guide_obs_ids 
                       if o_id in observations and observations[o_id].source_type == "external")

    # Evidence strength (external obs weighted 1.5x)
    evidence_strength = internal_obs + (external_obs * 1.5)

    return GuideScore(
        guide_id=guide_id,
        maturity_score=avg_maturity,
        maturity_label=score_to_label(avg_maturity),
        method_count=len(guide_methods),
        internal_method_count=len(internal_methods),
        external_method_count=len(external_methods),
        observation_coverage=coverage,
        internal_observations=internal_obs,
        external_observations=external_obs,
        evidence_strength=evidence_strength,
    )


def calculate_totals(
    methods: dict[str, Method],
    observations: dict[str, Observation],
) -> dict:
    """Calculate total scores across all guides."""
    # Only count field-guide methods (not canonical external framework methods)
    fg_methods = [m for m in methods.values() if m.guide_id is not None]
    
    if not fg_methods:
        return {
            "methods": 0,
            "internal_methods": 0,
            "external_methods": 0,
            "observations": len(observations),
            "internal_observations": sum(1 for o in observations.values() if o.source_type == "internal"),
            "external_observations": sum(1 for o in observations.values() if o.source_type == "external"),
            "avg_maturity_score": 0,
            "avg_maturity_label": "hypothesized",
        }

    avg_maturity = sum(m.maturity_score for m in fg_methods) / len(fg_methods)

    return {
        "methods": len(fg_methods),
        "internal_methods": sum(1 for m in fg_methods if not m.is_external),
        "external_methods": sum(1 for m in fg_methods if m.is_external),
        "observations": len(observations),
        "internal_observations": sum(1 for o in observations.values() if o.source_type == "internal"),
        "external_observations": sum(1 for o in observations.values() if o.source_type == "external"),
        "avg_maturity_score": round(avg_maturity, 2),
        "avg_maturity_label": score_to_label(avg_maturity),
    }


# === Main ===


def main():
    parser = argparse.ArgumentParser(
        description="Lint and score FOE Field Guides frontmatter"
    )
    parser.add_argument(
        "--docs-path",
        type=Path,
        default=Path("docs/docs"),
        help="Path to docs directory (default: docs/docs)",
    )
    parser.add_argument(
        "--scores-only",
        action="store_true",
        help="Only output scores, skip validation",
    )
    parser.add_argument(
        "--lint-only",
        action="store_true",
        help="Only run validation, skip scores",
    )
    parser.add_argument(
        "--verbose",
        action="store_true",
        help="Include detailed file information in output",
    )
    parser.add_argument(
        "--quiet",
        action="store_true",
        help="Only output if there are errors or warnings",
    )

    args = parser.parse_args()

    # Resolve docs path - try multiple locations
    docs_path = args.docs_path
    if not docs_path.is_absolute():
        docs_path = Path.cwd() / docs_path

    # If running from scripts/ directory, adjust path
    if not docs_path.exists() and (Path.cwd() / ".." / docs_path).exists():
        docs_path = (Path.cwd() / ".." / docs_path).resolve()
    
    # Also try from project root
    if not docs_path.exists():
        project_root = Path(__file__).parent.parent
        alt_path = project_root / "docs" / "docs"
        if alt_path.exists():
            docs_path = alt_path

    if not docs_path.exists():
        print(json.dumps({"error": f"Docs path not found: {docs_path}"}))
        sys.exit(1)

    # Load all data
    methods = load_methods(docs_path)
    observations = load_observations(docs_path)
    frameworks = load_frameworks(docs_path)
    overviews = load_guide_overviews(docs_path)

    issues: list[Issue] = []
    output: dict[str, Any] = {}

    # Run validation
    if not args.scores_only:
        # Validate methods
        for method in methods.values():
            issues.extend(validate_method(method, observations, frameworks, docs_path))

        # Validate observations
        for obs in observations.values():
            issues.extend(validate_observation(obs, methods))

        # Validate bidirectional links
        issues.extend(validate_bidirectional_links(methods, observations))

        # Validate ID sequences
        issues.extend(validate_id_sequences(methods, observations))

        # Validate guide overviews
        issues.extend(validate_guide_overviews(overviews, methods))

        # Find orphaned observations
        issues.extend(find_orphaned_observations(methods, observations))

    # Calculate scores
    if not args.lint_only:
        guide_ids = set(m.guide_id for m in methods.values() if m.guide_id)
        guide_scores = {
            guide_id: score_guide(guide_id, methods, observations).to_dict()
            for guide_id in sorted(guide_ids)
        }
        totals = calculate_totals(methods, observations)

        output["scores"] = {
            "guides": guide_scores,
            "totals": totals,
        }

    # Build output
    errors = [i for i in issues if i.severity == "error"]
    warnings = [i for i in issues if i.severity == "warning"]

    output["valid"] = len(errors) == 0
    output["error_count"] = len(errors)
    output["warning_count"] = len(warnings)

    if not args.scores_only:
        output["errors"] = [e.to_dict() for e in errors]
        output["warnings"] = [w.to_dict() for w in warnings]

    # Add file details if verbose
    if args.verbose:
        output["files"] = {
            "methods": {m_id: m.to_dict(verbose=True) for m_id, m in methods.items()},
            "observations": {o_id: o.to_dict(verbose=True) for o_id, o in observations.items()},
        }

    # Output
    if not args.quiet or issues:
        print(json.dumps(output, indent=2))

    # Exit code
    if errors:
        sys.exit(1)
    elif warnings:
        sys.exit(2)
    sys.exit(0)


if __name__ == "__main__":
    main()
