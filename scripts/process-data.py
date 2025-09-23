#!/usr/bin/env python3
"""
Process KubeRocketAI data files into JSON format for Next.js consumption.
Refactored to use base processor following DRY and SOLID principles.
"""

import sys
from pathlib import Path
from typing import Dict, Any, List

# Add the scripts directory to path for imports
sys.path.insert(0, str(Path(__file__).parent))

from base_processor import FileBasedProcessor, ProcessingError


class DataProcessor(FileBasedProcessor):
    """
    Data file specific content processor.
    
    Follows SOLID principles:
    - Single Responsibility: Handles only data file processing logic
    - Open/Closed: Extends base processor without modifying it
    - Liskov Substitution: Can be used wherever BaseContentProcessor is expected
    - Interface Segregation: Implements only required abstract methods
    - Dependency Inversion: Depends on base abstractions
    """
    
    def __init__(self):
        """Initialize data processor."""
        super().__init__(content_type="dataFiles", source_extensions=[".md", ".yaml", ".yml"])
    
    def find_source_directory(self, project_root: Path = None) -> Path:
        """Find the data source directory."""
        if project_root is None:
            project_root = Path.cwd()
        
        # Search for data directory in common locations
        search_paths = [
            project_root / "krci-input" / ".krci-ai" / "data",
            project_root / ".krci-ai" / "data",
            project_root / "data"
        ]
        
        for path in search_paths:
            if path.exists() and path.is_dir():
                return path
        
        raise ProcessingError(f"Could not find data directory in: {search_paths}")
    
    def process_file(self, file_path: Path, existing_data: Dict[str, Any] = None) -> Dict[str, Any]:
        """Process a single data file."""
        data_id = file_path.stem
        
        # Calculate relative path with proper prefix
        path = self.calculate_relative_path(file_path, self.find_source_directory(), ".krci-ai/data")
        
        if existing_data:
            return self.create_data_from_existing(data_id, path, existing_data, file_path)
        else:
            return self.create_new_data_entry(data_id, path, file_path)
    
    def create_new_data_entry(self, data_id: str, path: str, file_path: Path) -> Dict[str, Any]:
        """Create a new data entry with auto-generated values."""
        # Generate user-friendly name from filename
        name = data_id.replace('-', ' ').replace('_', ' ').title()
        
        # Try to extract description from file content
        description = self.extract_description_from_file(file_path)
        if not description:
            description = f"{name} reference data for framework guidance and best practices"
        
        # Assign default categories based on data file patterns
        categories = self.infer_categories_from_name(data_id)
        
        return {
            "id": data_id,
            "name": name,
            "description": description,
            "categories": self.category_manager.normalize_categories(categories),
            "path": path
        }
    
    def create_data_from_existing(self, data_id: str, path: str, existing_data: Dict[str, Any], file_path: Path) -> Dict[str, Any]:
        """Create data entry from existing data with validation and fallbacks."""
        name = existing_data.get("name", "").strip()
        description = existing_data.get("description", "").strip()
        categories = existing_data.get("categories", [])
        
        # Provide fallbacks for missing data
        if not name:
            name = data_id.replace('-', ' ').replace('_', ' ').title()
            self.warnings.append(f"{data_id}: Auto-generated name '{name}' - please verify")
        
        if not description:
            # Try to extract from file, otherwise use fallback
            description = self.extract_description_from_file(file_path)
            if not description:
                description = f"{name} reference data for framework guidance and best practices"
            self.warnings.append(f"{data_id}: Auto-generated description - please verify")
        
        if not categories or not isinstance(categories, list) or len(categories) == 0:
            categories = self.infer_categories_from_name(data_id)
            self.warnings.append(f"{data_id}: Auto-assigned categories {categories} - please verify")
        
        return {
            "id": data_id,
            "name": name,
            "description": description,
            "categories": self.category_manager.normalize_categories(categories),
            "path": path
        }
    
    def infer_categories_from_name(self, data_id: str) -> List[str]:
        """Infer likely categories based on data file name patterns."""
        name_lower = data_id.lower()
        
        # Category inference rules based on common data file patterns
        if any(keyword in name_lower for keyword in ['test', 'qa', 'quality', 'metrics']):
            return ["Testing"]
        elif any(keyword in name_lower for keyword in ['architecture', 'design', 'patterns', 'principles']):
            return ["Architecture"]
        elif any(keyword in name_lower for keyword in ['business', 'analysis', 'requirements', 'frameworks']):
            return ["Analysis"]
        elif any(keyword in name_lower for keyword in ['development', 'coding', 'standards', 'practices']):
            return ["Development"]
        elif any(keyword in name_lower for keyword in ['management', 'project', 'process']):
            return ["Management"]
        elif any(keyword in name_lower for keyword in ['product', 'strategy', 'validation']):
            return ["Product"]
        elif any(keyword in name_lower for keyword in ['framework', 'core']):
            return ["Framework Core"]
        else:
            return ["Development"]  # Default fallback category for data files
    
    def get_output_structure(self, items: List[Dict[str, Any]]) -> Dict[str, Any]:
        """Create the data files JSON output structure."""
        return {
            "dataFiles": items,
            "metadata": self.create_metadata(items)
        }
    
    def get_required_fields(self) -> List[str]:
        """Get required fields for data file validation."""
        return ["id", "name", "description", "categories", "path"]
    
    def validate_item(self, item: Dict[str, Any], file_path: Path) -> bool:
        """Enhanced validation for data file items."""
        # First run base validation
        if not super().validate_item(item, file_path):
            return False
        
        # Data-specific validation
        if not item.get("path"):
            self.errors.append(f"{file_path.name}: Missing path field")
            return False
        
        # Ensure path starts with .krci-ai/data
        if not item.get("path", "").startswith(".krci-ai/data"):
            self.warnings.append(f"{file_path.name}: Path should start with '.krci-ai/data'")
        
        return True
    
    def get_items_key(self) -> str:
        """Override to return the correct key for data files."""
        return "dataFiles"


if __name__ == "__main__":
    # Default paths relative to project root
    output_file = Path("./public/data/data.json")
    
    processor = DataProcessor()
    processor.process_all(output_file)
