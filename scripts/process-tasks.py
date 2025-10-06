#!/usr/bin/env python3
"""
Process KubeRocketAI task files into JSON format for Next.js consumption.
Modeled after data/templates processors, but conservative with categories:
- Use existing categories if present in existing JSON
- Do NOT auto-populate categories when missing
"""

import sys
from pathlib import Path
from typing import Dict, Any, List

# Ensure local imports work when run from project root
sys.path.insert(0, str(Path(__file__).parent))

from base_processor import FileBasedProcessor, ProcessingError


class TaskProcessor(FileBasedProcessor):
    """
    Task-specific content processor.

    Responsibilities:
    - Discover task source files (markdown/yaml)
    - Produce minimal task entries with id, name, description, path, categories
    - Preserve manually curated fields from existing output
    - Do not infer categories; only normalize if present
    """

    def __init__(self):
        super().__init__(content_type="tasks", source_extensions=[".md", ".yaml", ".yml", ".json"])

    def find_source_directory(self, project_root: Path = None) -> Path:
        """Find the tasks source directory."""
        if project_root is None:
            project_root = Path.cwd()

        search_paths = [
            project_root / "krci-input" / ".krci-ai" / "tasks",
            project_root / ".krci-ai" / "tasks",
            project_root / "tasks",
        ]

        for path in search_paths:
            if path.exists() and path.is_dir():
                return path

        raise ProcessingError(f"Could not find tasks directory in: {search_paths}")

    def process_file(self, file_path: Path, existing_data: Dict[str, Any] = None) -> Dict[str, Any]:
        """Process a single task file."""
        task_id = file_path.stem

        # Calculate relative path with proper prefix
        path = self.calculate_relative_path(file_path, self.find_source_directory(), ".krci-ai/tasks")

        if existing_data:
            return self._create_task_from_existing(task_id, path, existing_data, file_path)
        else:
            return self._create_new_task_entry(task_id, path, file_path)

    def _humanize(self, value: str) -> str:
        return value.replace('-', ' ').replace('_', ' ').title()

    def _create_new_task_entry(self, task_id: str, path: str, file_path: Path) -> Dict[str, Any]:
        """Create a new task entry with minimal safe defaults."""
        name = self._humanize(task_id)

        # Set placeholder description for new tasks to pass validation
        description = "to be populated"

        # Do NOT auto-infer categories for tasks; start empty and allow manual curation later
        categories: List[str] = []

        return {
            "id": task_id,
            "name": name,
            "description": description,
            "categories": categories,
            "path": path,
        }

    def _create_task_from_existing(
        self, task_id: str, path: str, existing_data: Dict[str, Any], file_path: Path
    ) -> Dict[str, Any]:
        """Create task entry from existing data with validation and conservative fallbacks."""
        name = (existing_data.get("name") or "").strip() or self._humanize(task_id)
        description = (existing_data.get("description") or "").strip()
        # If description missing, keep empty to allow post-processing script to populate

        # Preserve categories ONLY if defined; do not auto-assign
        raw_categories = existing_data.get("categories", [])
        categories = self.category_manager.normalize_categories(raw_categories)

        return {
            "id": task_id,
            "name": name,
            "description": description,
            "categories": categories,
            "path": path,
        }

    def get_output_structure(self, items: List[Dict[str, Any]]) -> Dict[str, Any]:
        return {
            "tasks": items,
            "metadata": self.create_metadata(items),
        }

    def get_required_fields(self) -> List[str]:
        return ["id", "name", "description", "path"]

    def validate_item(self, item: Dict[str, Any], file_path: Path) -> bool:
        if not super().validate_item(item, file_path):
            return False

        if not item.get("path"):
            self.errors.append(f"{file_path.name}: Missing path field")
            return False

        if not item.get("path", "").startswith(".krci-ai/tasks"):
            # Non-fatal, but encourage consistency
            self.warnings.append(f"{file_path.name}: Path should start with '.krci-ai/tasks'")

        return True


if __name__ == "__main__":
    output_file = Path("./public/data/tasks.json")

    processor = TaskProcessor()
    processor.process_all(output_file)
