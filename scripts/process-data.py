#!/usr/bin/env python3
"""
Process KubeRocketAI data files into JSON format for Next.js consumption.
Dynamically discovers data files and preserves existing metadata.
"""

import json
from datetime import datetime
from pathlib import Path
from typing import Dict, Any, List


def find_data_directory(project_root: Path = None) -> Path:
    """Dynamically find the data directory."""
    if project_root is None:
        project_root = Path.cwd()

    search_paths = [
        project_root / "krci-input" / ".krci-ai" / "data",
        project_root / ".krci-ai" / "data",
        project_root / "data"
    ]

    for path in search_paths:
        if path.exists() and path.is_dir():
            return path

    raise FileNotFoundError(f"Could not find data directory in: {search_paths}")


def calculate_relative_path(data_file: Path, data_root: Path) -> str:
    """Calculate relative path from data root to file."""
    try:
        rel_path = data_file.relative_to(data_root)
        return f".krci-ai/data/{rel_path}"
    except ValueError:
        return f".krci-ai/data/{data_file.name}"


def discover_data_files(data_dir: Path) -> List[Path]:
    """Discover all data files recursively."""
    if not data_dir.exists():
        raise FileNotFoundError(f"Data directory does not exist: {data_dir}")

    extensions = ["*.md", "*.yaml", "*.yml"]
    data_files = []

    for extension in extensions:
        data_files.extend(data_dir.rglob(extension))

    return sorted(data_files)


def load_existing_data(output_file: Path) -> Dict[str, Dict[str, Any]]:
    """Load existing data files to preserve manual fields."""
    if not output_file.exists():
        return {}

    try:
        with open(output_file, "r", encoding="utf-8") as f:
            data = json.load(f)

        existing = {}
        for data_file in data.get("dataFiles", []):
            if data_file_id := data_file.get("id"):
                existing[data_file_id] = data_file

        print(f"📖 Loaded existing data for {len(existing)} data files")
        return existing

    except Exception as e:
        print(f"⚠ Could not load existing file: {e}")
        return {}


def extract_description_from_file(data_file: Path) -> str:
    """Extract description from file content by reading the first few lines."""
    try:
        with open(data_file, 'r', encoding='utf-8') as f:
            lines = f.readlines()

        # Look for meaningful content in first 10 lines
        for line in lines[:10]:
            line = line.strip()
            # Skip empty lines, markdown headers, and XML-style tags
            if (line and
                not line.startswith('#') and
                not line.startswith('<') and
                not line.startswith('Purpose:') and
                len(line) > 20):  # Only meaningful sentences
                return line

        # Fallback: use empty string for manual assignment
        return ""
    except Exception:
        return ""


def create_data_entry(data_file: Path, data_root: Path, existing_data: Dict[str, Any] = None) -> Dict[str, Any]:
    """Create data entry, preserving existing manual fields."""
    data_id = data_file.stem
    path = calculate_relative_path(data_file, data_root)

    if existing_data:
        name = existing_data.get("name")
        description = existing_data.get("description")
        categories = existing_data.get("categories", [])
    else:
        name = data_id.replace('-', ' ').title()
        # For new files, try to extract description from content, otherwise use empty string
        description = extract_description_from_file(data_file)
        categories = []

    return {
        "id": data_id,
        "name": name,
        "description": description,
        "categories": categories,
        "path": path
    }


def extract_categories(data_files: List[Dict[str, Any]]) -> List[str]:
    """Extract unique categories from data files."""
    categories = set()
    for data_file in data_files:
        if "categories" in data_file and isinstance(data_file["categories"], list):
            categories.update(data_file["categories"])
    return sorted(categories)


def process_data_files(output_file: Path = None) -> None:
    """Main processing function."""
    if output_file is None:
        output_file = Path("public/data/data.json")

    print("🚀 Processing KubeRocketAI data files...")

    data_dir = find_data_directory()
    print(f"📁 Found data directory: {data_dir}")

    existing_data = load_existing_data(output_file)
    data_files = discover_data_files(data_dir)
    print(f"📄 Found {len(data_files)} data files")

    processed_files = []
    for data_file in data_files:
        data_id = data_file.stem
        existing = existing_data.get(data_id)

        data_entry = create_data_entry(data_file, data_dir, existing)
        processed_files.append(data_entry)

        status = "preserved" if existing else "new"
        print(f"✓ {data_file.name}: {data_entry['name']} ({status})")

    output_data = {
        "dataFiles": processed_files,
        "metadata": {
            "totalDataFiles": len(processed_files),
            "categories": extract_categories(processed_files),
            "generatedAt": datetime.now().isoformat() + "Z",
            "version": "1.0.0",
        }
    }

    output_file.parent.mkdir(parents=True, exist_ok=True)
    with open(output_file, "w", encoding="utf-8") as f:
        json.dump(output_data, f, indent=2, ensure_ascii=False)

    print(f"\n✅ Generated {output_file} with {len(processed_files)} data files")


if __name__ == "__main__":
    process_data_files()
