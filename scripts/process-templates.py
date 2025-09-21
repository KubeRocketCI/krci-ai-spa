#!/usr/bin/env python3
"""
Process KubeRocketAI template files into JSON format for Next.js consumption.
Dynamically discovers templates and preserves existing metadata.
"""

import json
from datetime import datetime
from pathlib import Path
from typing import Dict, Any, List


def find_templates_directory(project_root: Path = None) -> Path:
    """Dynamically find the templates directory."""
    if project_root is None:
        project_root = Path.cwd()

    # Search for templates directory in common locations
    search_paths = [
        project_root / "krci-input" / ".krci-ai" / "templates",
        project_root / ".krci-ai" / "templates",
        project_root / "templates"
    ]

    for path in search_paths:
        if path.exists() and path.is_dir():
            return path

    raise FileNotFoundError(f"Could not find templates directory in: {search_paths}")


def calculate_relative_path(template_file: Path, templates_root: Path) -> str:
    """Calculate relative path from templates root to file."""
    try:
        # Get relative path from templates directory
        rel_path = template_file.relative_to(templates_root)
        # Prepend the templates path structure
        return f".krci-ai/templates/{rel_path}"
    except ValueError:
        # Fallback if file is not under templates_root
        return f".krci-ai/templates/{template_file.name}"


def discover_template_files(templates_dir: Path) -> List[Path]:
    """Discover all template files recursively."""
    if not templates_dir.exists():
        raise FileNotFoundError(f"Templates directory does not exist: {templates_dir}")

    # Template file extensions
    extensions = ["*.md", "*.yaml", "*.yml", "*.json"]
    template_files = []

    for extension in extensions:
        template_files.extend(templates_dir.rglob(extension))

    # Sort for consistent ordering
    return sorted(template_files)


def load_existing_data(output_file: Path) -> Dict[str, Dict[str, Any]]:
    """Load existing templates data to preserve manual fields."""
    if not output_file.exists():
        return {}

    try:
        with open(output_file, "r", encoding="utf-8") as f:
            data = json.load(f)

        existing = {}
        for template in data.get("templates", []):
            if template_id := template.get("id"):
                existing[template_id] = template

        print(f"📖 Loaded existing data for {len(existing)} templates")
        return existing

    except Exception as e:
        print(f"⚠ Could not load existing file: {e}")
        return {}


def create_template_entry(template_file: Path, templates_root: Path, existing_data: Dict[str, Any] = None) -> Dict[str, Any]:
    """Create template entry with validated required fields."""
    template_id = template_file.stem
    path = calculate_relative_path(template_file, templates_root)

    # Validate required fields - fail fast on missing data
    if existing_data:
        name = existing_data.get("name")
        description = existing_data.get("description")
        categories = existing_data.get("categories")

        # Validate that all required fields are present and non-empty
        missing_fields = []
        if not name or name.strip() == "":
            missing_fields.append("name")
        if not description or description.strip() == "":
            missing_fields.append("description")
        if not categories or not isinstance(categories, list) or len(categories) == 0:
            missing_fields.append("categories")

        if missing_fields:
            raise ValueError(f"Template {template_id} is missing required fields: {', '.join(missing_fields)}")
    else:
        raise ValueError(f"Template {template_id} has no existing data and cannot be processed without manual population")

    return {
        "id": template_id,
        "path": path,
        "name": name,
        "description": description,
        "categories": categories
    }


def extract_categories(templates: List[Dict[str, Any]]) -> List[str]:
    """Extract unique categories from validated templates."""
    categories = set()
    for template in templates:
        if "categories" in template and isinstance(template["categories"], list):
            categories.update(template["categories"])
    return sorted(categories)


def process_templates(output_file: Path = None) -> None:
    """Main processing function."""
    if output_file is None:
        output_file = Path("public/data/templates.json")

    print("🚀 Processing KubeRocketAI templates...")

    # Discover templates directory dynamically
    templates_dir = find_templates_directory()
    print(f"📁 Found templates directory: {templates_dir}")

    # Load existing data
    existing_data = load_existing_data(output_file)

    # Discover template files
    template_files = discover_template_files(templates_dir)
    print(f"📄 Found {len(template_files)} template files")

    # Process each template file
    templates = []
    for template_file in template_files:
        template_id = template_file.stem
        existing = existing_data.get(template_id)

        template_entry = create_template_entry(template_file, templates_dir, existing)
        templates.append(template_entry)

        status = "preserved" if existing else "new"
        print(f"✓ {template_file.name}: {template_entry['name']} ({status})")

    # Sort by category, then name
    templates.sort(key=lambda x: (x["category"], x["name"]))

    # Generate output
    output_data = {
        "templates": templates,
        "metadata": {
            "totalTemplates": len(templates),
            "categories": extract_categories(templates),
            "generatedAt": datetime.now().strftime("%Y-%m-%d"),
            "version": "1.0.0",
        }
    }

    # Write output
    output_file.parent.mkdir(parents=True, exist_ok=True)
    with open(output_file, "w", encoding="utf-8") as f:
        json.dump(output_data, f, indent=2, ensure_ascii=False)

    print(f"\n✅ Generated {output_file} with {len(templates)} templates")
    print(f"📊 Categories: {', '.join(extract_categories(templates))}")


if __name__ == "__main__":
    process_templates()
