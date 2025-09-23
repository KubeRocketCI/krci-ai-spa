#!/usr/bin/env python3
"""
Base Content Processor
 
Shared base class for all content processing scripts following DRY principles.
Implements Single Responsibility Principle by providing unified content processing functionality.
"""

import json
import os
import sys
from abc import ABC, abstractmethod
from datetime import datetime
from pathlib import Path
from typing import Dict, Any, List, Optional, Set, Union
import yaml


class CategoryManager:
    """
    Category management utilities following SOLID principles.
    Single Responsibility: Handles all category-related operations.
    """
    
    @staticmethod
    def extract_categories(items: List[Dict[str, Any]], category_field: str = "categories") -> List[str]:
        """Extract unique categories from items."""
        categories = set()
        
        for item in items:
            item_categories = item.get(category_field, [])
            if isinstance(item_categories, list):
                for category in item_categories:
                    if isinstance(category, str) and category.strip():
                        categories.add(category.strip())
        
        return sorted(categories)
    
    @staticmethod
    def validate_categories(categories: List[str]) -> Dict[str, Any]:
        """Validate category list and return validation result."""
        errors = []
        warnings = []
        
        if not isinstance(categories, list):
            errors.append("Categories must be a list")
            return {"valid": False, "errors": errors, "warnings": warnings}
        
        unique_categories = set()
        duplicates = set()
        
        for i, category in enumerate(categories):
            if not isinstance(category, str):
                errors.append(f"Category at index {i} is not a string: {type(category)}")
                continue
                
            trimmed = category.strip()
            if not trimmed:
                errors.append(f"Category at index {i} is empty or whitespace-only")
                continue
                
            if trimmed in unique_categories:
                duplicates.add(trimmed)
            else:
                unique_categories.add(trimmed)
                
            # Check for whitespace issues
            if trimmed != category:
                warnings.append(f"Category '{category}' has leading/trailing whitespace")
                
            # Check for consistent casing
            if trimmed.lower() == trimmed or trimmed.upper() == trimmed:
                warnings.append(f"Category '{category}' should use Title Case")
        
        if duplicates:
            errors.append(f"Duplicate categories found: {', '.join(sorted(duplicates))}")
        
        return {
            "valid": len(errors) == 0,
            "errors": errors,
            "warnings": warnings,
            "normalized": sorted(unique_categories)
        }
    
    @staticmethod
    def normalize_categories(categories: List[str]) -> List[str]:
        """Normalize categories by removing duplicates, trimming, and sorting."""
        if not isinstance(categories, list):
            return []
        
        normalized = set()
        for category in categories:
            if isinstance(category, str):
                trimmed = category.strip()
                if trimmed:
                    normalized.add(trimmed)
        
        return sorted(normalized)


class ValidationError(Exception):
    """Custom exception for validation errors."""
    pass


class ProcessingError(Exception):
    """Custom exception for processing errors."""
    pass


class BaseContentProcessor(ABC):
    """
    Abstract base class for content processors.
    
    Follows SOLID principles:
    - Single Responsibility: Handles content processing workflow
    - Open/Closed: Open for extension, closed for modification
    - Liskov Substitution: All concrete processors can be used interchangeably
    - Interface Segregation: Minimal required interface
    - Dependency Inversion: Depends on abstractions
    """
    
    def __init__(self, content_type: str, source_extensions: List[str] = None):
        """
        Initialize the processor.
        
        Args:
            content_type: Type of content being processed (e.g., 'agents', 'templates')
            source_extensions: List of file extensions to process (e.g., ['.yaml', '.md'])
        """
        self.content_type = content_type
        self.source_extensions = source_extensions or ['.md', '.yaml', '.yml']
        self.category_manager = CategoryManager()
        self.processed_items = []
        self.errors = []
        self.warnings = []
    
    @abstractmethod
    def find_source_directory(self, project_root: Path = None) -> Path:
        """Find the source directory for content files."""
        pass
    
    @abstractmethod
    def process_file(self, file_path: Path, existing_data: Dict[str, Any] = None) -> Dict[str, Any]:
        """Process a single content file."""
        pass
    
    @abstractmethod
    def get_output_structure(self, items: List[Dict[str, Any]]) -> Dict[str, Any]:
        """Create the output JSON structure."""
        pass
    
    def discover_files(self, source_dir: Path) -> List[Path]:
        """Discover all processable files in the source directory."""
        if not source_dir.exists():
            raise ProcessingError(f"Source directory does not exist: {source_dir}")
        
        files = []
        for extension in self.source_extensions:
            pattern = f"*{extension}"
            files.extend(source_dir.rglob(pattern))
        
        # Sort for consistent ordering
        return sorted(files)
    
    def load_existing_data(self, output_file: Path) -> Dict[str, Dict[str, Any]]:
        """Load existing data to preserve manual fields."""
        if not output_file.exists():
            return {}
        
        try:
            with open(output_file, 'r', encoding='utf-8') as f:
                data = json.load(f)
            
            existing = {}
            items_key = self.get_items_key()
            
            for item in data.get(items_key, []):
                # Use extract_item_id to get the correct key for matching
                item_key = self.extract_item_id(item)
                if item_key:
                    existing[item_key] = item
            
            print(f"📖 Loaded existing data for {len(existing)} {self.content_type}")
            return existing
            
        except Exception as e:
            print(f"⚠ Could not load existing file: {e}")
            return {}
    
    def extract_item_id(self, item: Dict[str, Any]) -> Optional[str]:
        """Extract item ID from various possible fields."""
        for field in ['id', 'filename', 'name', 'path']:
            if field in item and item[field]:
                if field == 'path':
                    # Extract filename from path
                    return Path(item[field]).stem
                return str(item[field])
        return None
    
    def get_items_key(self) -> str:
        """Get the key name for items in the JSON structure."""
        return self.content_type.lower()
    
    def validate_item(self, item: Dict[str, Any], file_path: Path) -> bool:
        """Validate a processed item."""
        required_fields = self.get_required_fields()
        missing_fields = []
        
        for field in required_fields:
            if field not in item or not item[field]:
                missing_fields.append(field)
        
        if missing_fields:
            error_msg = f"{file_path.name}: Missing required fields: {', '.join(missing_fields)}"
            self.errors.append(error_msg)
            return False
        
        # Validate categories if present
        if 'categories' in item:
            validation_result = self.category_manager.validate_categories(item['categories'])
            if not validation_result['valid']:
                for error in validation_result['errors']:
                    self.errors.append(f"{file_path.name}: Category error - {error}")
            
            for warning in validation_result['warnings']:
                self.warnings.append(f"{file_path.name}: Category warning - {warning}")
            
            # Normalize categories
            item['categories'] = validation_result['normalized']
        
        return True
    
    def get_required_fields(self) -> List[str]:
        """Get list of required fields for validation."""
        return ['id', 'name', 'description']
    
    def create_metadata(self, items: List[Dict[str, Any]]) -> Dict[str, Any]:
        """Create metadata for the content collection."""
        categories = self.category_manager.extract_categories(items)
        
        return {
            f"total{self.content_type.title()}": len(items),
            "categories": categories,
            "generatedAt": datetime.now().isoformat() + "Z",
            "version": "1.0.0"
        }
    
    def write_output(self, output_file: Path, data: Dict[str, Any]) -> None:
        """Write the processed data to output file."""
        output_file.parent.mkdir(parents=True, exist_ok=True)
        
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
    
    def calculate_relative_path(self, file_path: Path, source_root: Path, prefix: str = None) -> str:
        """Calculate relative path for content files."""
        try:
            rel_path = file_path.relative_to(source_root)
            if prefix:
                return f"{prefix}/{rel_path}"
            return str(rel_path)
        except ValueError:
            # Fallback if file is not under source_root
            if prefix:
                return f"{prefix}/{file_path.name}"
            return file_path.name
    
    def safe_string(self, value: Any, fallback: str = "") -> str:
        """Safely extract string value."""
        return str(value) if value is not None else fallback
    
    def safe_list(self, value: Any) -> List[str]:
        """Safely extract list of strings."""
        if isinstance(value, list):
            return [str(item) for item in value if item is not None]
        elif value is not None:
            return [str(value)]
        return []
    
    def generate_id(self, name: str, filename: str = None) -> str:
        """Generate a standardized ID from name or filename."""
        base = filename or name
        # Convert to lowercase and replace non-alphanumeric with hyphens
        import re
        clean_id = re.sub(r'[^a-zA-Z0-9]+', '-', base.lower())
        # Remove leading/trailing hyphens
        return clean_id.strip('-')
    
    def process_all(self, output_file: Path = None, project_root: Path = None) -> None:
        """
        Main processing workflow.
        
        This method orchestrates the entire processing workflow following
        the Template Method pattern.
        """
        try:
            print(f"🚀 Processing KubeRocketAI {self.content_type}...")
            
            # Find source directory
            source_dir = self.find_source_directory(project_root)
            print(f"📁 Found {self.content_type} directory: {source_dir}")
            
            # Set default output file if not provided
            if output_file is None:
                output_file = Path(f"public/data/{self.content_type.lower()}.json")
            
            # Load existing data
            existing_data = self.load_existing_data(output_file)
            
            # Discover files
            files = self.discover_files(source_dir)
            print(f"📄 Found {len(files)} {self.content_type} files")
            
            # Process each file
            processed_items = []
            for file_path in files:
                try:
                    item_id = file_path.stem
                    existing_item = existing_data.get(item_id)
                    
                    processed_item = self.process_file(file_path, existing_item)
                    
                    if self.validate_item(processed_item, file_path):
                        processed_items.append(processed_item)
                        
                        status = "preserved" if existing_item else "new"
                        print(f"✓ {file_path.name}: {processed_item.get('name', item_id)} ({status})")
                    else:
                        print(f"✗ {file_path.name}: Validation failed")
                        
                except Exception as e:
                    error_msg = f"Error processing {file_path.name}: {e}"
                    self.errors.append(error_msg)
                    print(f"✗ {error_msg}")
            
            # Sort items for consistent output
            processed_items.sort(key=lambda x: x.get('name', x.get('id', '')))
            
            # Create output structure
            output_data = self.get_output_structure(processed_items)
            
            # Write output
            self.write_output(output_file, output_data)
            
            # Print summary
            self.print_summary(output_file, processed_items)
            
            # Print warnings and errors
            if self.warnings:
                print(f"\n⚠ Warnings ({len(self.warnings)}):")
                for warning in self.warnings:
                    print(f"  - {warning}")
            
            if self.errors:
                print(f"\n❌ Errors ({len(self.errors)}):")
                for error in self.errors:
                    print(f"  - {error}")
                sys.exit(1)
            
        except Exception as e:
            print(f"❌ Fatal error processing {self.content_type}: {e}")
            sys.exit(1)
    
    def print_summary(self, output_file: Path, items: List[Dict[str, Any]]) -> None:
        """Print processing summary."""
        categories = self.category_manager.extract_categories(items)
        
        print(f"\n✅ Generated {output_file} with {len(items)} {self.content_type}")
        if categories:
            print(f"📊 Categories: {', '.join(categories)}")


class FileBasedProcessor(BaseContentProcessor):
    """
    Base processor for file-based content (templates, data, tasks).
    Provides common functionality for processing markdown and YAML files.
    """
    
    def extract_description_from_file(self, file_path: Path) -> str:
        """Extract description from file content."""
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
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
            
            return ""
        except Exception:
            return ""


class YAMLBasedProcessor(BaseContentProcessor):
    """
    Base processor for YAML-based content (agents).
    Provides YAML parsing functionality.
    """
    
    def load_yaml_file(self, file_path: Path) -> Dict[str, Any]:
        """Load and parse YAML file."""
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                return yaml.safe_load(f) or {}
        except Exception as e:
            raise ProcessingError(f"Failed to parse YAML file {file_path}: {e}")