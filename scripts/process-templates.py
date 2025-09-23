#!/usr/bin/env python3
"""
Process KubeRocketAI template files into JSON format for Next.js consumption.
Refactored to use base processor following DRY and SOLID principles.
"""

import sys
from pathlib import Path
from typing import Dict, Any, List

# Add the scripts directory to path for imports
sys.path.insert(0, str(Path(__file__).parent))

from base_processor import FileBasedProcessor, ProcessingError


class TemplateProcessor(FileBasedProcessor):
    """
    Template-specific content processor.
    
    Follows SOLID principles:
    - Single Responsibility: Handles only template processing logic
    - Open/Closed: Extends base processor without modifying it
    - Liskov Substitution: Can be used wherever BaseContentProcessor is expected
    - Interface Segregation: Implements only required abstract methods
    - Dependency Inversion: Depends on base abstractions
    """
    
    def __init__(self):
        """Initialize template processor."""
        super().__init__(content_type="templates", source_extensions=[".md", ".yaml", ".yml", ".json"])
    
    def find_source_directory(self, project_root: Path = None) -> Path:
        """Find the templates source directory."""
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
        
        raise ProcessingError(f"Could not find templates directory in: {search_paths}")
    
    def process_file(self, file_path: Path, existing_data: Dict[str, Any] = None) -> Dict[str, Any]:
        """Process a single template file."""
        template_id = file_path.stem
        
        # Calculate relative path with proper prefix
        path = self.calculate_relative_path(file_path, self.find_source_directory(), ".krci-ai/templates")
        
        # For templates, we require existing data for name, description, and categories
        # as these can't be reliably extracted from file content
        if not existing_data:
            # Try to create basic template entry with auto-generated values
            return self.create_new_template_entry(template_id, path, file_path)
        
        return self.create_template_from_existing(template_id, path, existing_data)
    
    def create_new_template_entry(self, template_id: str, path: str, file_path: Path) -> Dict[str, Any]:
        """Create a new template entry with auto-generated values."""
        # Generate user-friendly name from filename
        name = template_id.replace('-', ' ').replace('_', ' ').title()
        
        # Try to extract description from file content
        description = self.extract_description_from_file(file_path)
        if not description:
            description = f"{name} template for streamlined project development"
        
        # Assign default categories based on common template patterns
        categories = self.infer_categories_from_name(template_id)
        
        return {
            "id": template_id,
            "path": path,
            "name": name,
            "description": description,
            "categories": self.category_manager.normalize_categories(categories)
        }
    
    def create_template_from_existing(self, template_id: str, path: str, existing_data: Dict[str, Any]) -> Dict[str, Any]:
        """Create template entry from existing data with validation."""
        name = existing_data.get("name", "").strip()
        description = existing_data.get("description", "").strip()
        categories = existing_data.get("categories", [])
        
        # Validate required fields
        if not name:
            name = template_id.replace('-', ' ').replace('_', ' ').title()
            self.warnings.append(f"{template_id}: Auto-generated name '{name}' - please verify")
        
        if not description:
            description = f"{name} template for streamlined project development"
            self.warnings.append(f"{template_id}: Auto-generated description - please verify")
        
        if not categories or not isinstance(categories, list) or len(categories) == 0:
            categories = self.infer_categories_from_name(template_id)
            self.warnings.append(f"{template_id}: Auto-assigned categories {categories} - please verify")
        
        return {
            "id": template_id,
            "path": path,
            "name": name,
            "description": description,
            "categories": self.category_manager.normalize_categories(categories)
        }
    
    def infer_categories_from_name(self, template_id: str) -> List[str]:
        """Infer likely categories based on template name patterns."""
        name_lower = template_id.lower()
        
        # Category inference rules
        if any(keyword in name_lower for keyword in ['test', 'qa', 'defect', 'bug']):
            return ["Testing"]
        elif any(keyword in name_lower for keyword in ['architecture', 'design', 'system', 'arch']):
            return ["Architecture"]
        elif any(keyword in name_lower for keyword in ['business', 'requirements', 'analysis', 'user']):
            return ["Analysis"]
        elif any(keyword in name_lower for keyword in ['project', 'management', 'plan']):
            return ["Project Management"]
        elif any(keyword in name_lower for keyword in ['marketing', 'product', 'launch']):
            return ["Marketing"]
        elif any(keyword in name_lower for keyword in ['framework', 'core', 'template']):
            return ["Framework Core"]
        else:
            return ["Analysis"]  # Default fallback category
    
    def get_output_structure(self, items: List[Dict[str, Any]]) -> Dict[str, Any]:
        """Create the templates JSON output structure."""
        return {
            "templates": items,
            "metadata": self.create_metadata(items)
        }
    
    def get_required_fields(self) -> List[str]:
        """Get required fields for template validation."""
        return ["id", "path", "name", "description", "categories"]
    
    def validate_item(self, item: Dict[str, Any], file_path: Path) -> bool:
        """Enhanced validation for template items."""
        # First run base validation
        if not super().validate_item(item, file_path):
            return False
        
        # Template-specific validation
        if not item.get("path"):
            self.errors.append(f"{file_path.name}: Missing path field")
            return False
        
        # Ensure path starts with .krci-ai/templates
        if not item.get("path", "").startswith(".krci-ai/templates"):
            self.warnings.append(f"{file_path.name}: Path should start with '.krci-ai/templates'")
        
        return True


if __name__ == "__main__":
    # Default paths relative to project root
    output_file = Path("./public/data/templates.json")
    
    processor = TemplateProcessor()
    processor.process_all(output_file)
