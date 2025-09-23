#!/usr/bin/env python3
"""
Process KubeRocketAI agent YAML files into JSON format for Next.js consumption.
Refactored to use base processor following DRY and SOLID principles.
"""

import sys
from pathlib import Path
from typing import Dict, Any, List

# Add the scripts directory to path for imports
sys.path.insert(0, str(Path(__file__).parent))

from base_processor import YAMLBasedProcessor, ProcessingError


class AgentProcessor(YAMLBasedProcessor):
    """
    Agent-specific content processor.
    
    Follows SOLID principles:
    - Single Responsibility: Handles only agent processing logic
    - Open/Closed: Extends base processor without modifying it
    - Liskov Substitution: Can be used wherever BaseContentProcessor is expected
    - Interface Segregation: Implements only required abstract methods
    - Dependency Inversion: Depends on base abstractions
    """
    
    def __init__(self):
        """Initialize agent processor."""
        super().__init__(content_type="agents", source_extensions=[".yaml", ".yml"])
    
    def find_source_directory(self, project_root: Path = None) -> Path:
        """Find the agents source directory."""
        if project_root is None:
            project_root = Path.cwd()
        
        # Search for agents directory in common locations
        search_paths = [
            project_root / "krci-input" / ".krci-ai" / "agents",
            project_root / ".krci-ai" / "agents",
            project_root / "agents"
        ]
        
        for path in search_paths:
            if path.exists() and path.is_dir():
                return path
        
        raise ProcessingError(f"Could not find agents directory in: {search_paths}")
    
    def process_file(self, file_path: Path, existing_data: Dict[str, Any] = None) -> Dict[str, Any]:
        """Process a single agent YAML file."""
        agent_yaml = self.load_yaml_file(file_path)
        
        if "agent" not in agent_yaml:
            raise ProcessingError(f"No 'agent' key found in {file_path.name}")
        
        agent_data = agent_yaml["agent"]
        filename = file_path.stem
        
        return self.extract_agent_persona(agent_data, existing_data, filename)
    
    def extract_agent_persona(self, agent_data: Dict[str, Any], existing_agent: Dict[str, Any] = None, filename: str = "") -> Dict[str, Any]:
        """Extract key persona information from agent YAML structure."""
        identity = agent_data.get("identity", {})
        commands = agent_data.get("commands", {})
        tasks = agent_data.get("tasks", [])
        principles = agent_data.get("principles", [])
        
        # Preserve existing categories or set default
        if existing_agent and "categories" in existing_agent:
            categories = existing_agent["categories"]
        else:
            categories = ["To be defined"]
        
        # Preserve existing whenToUse or set default
        if existing_agent and "whenToUse" in existing_agent:
            when_to_use = existing_agent["whenToUse"]
        else:
            when_to_use = "Specialized assistance for development tasks"
        
        # Extract scope from first principle if available
        scope = self.extract_scope_from_principles(principles)
        
        # Generate ID if not present
        agent_id = identity.get("id") or self.generate_id(identity.get("name", filename))
        
        return {
            "id": agent_id,
            "filename": filename,
            "name": self.safe_string(identity.get("name"), filename.replace("-", " ").title()),
            "role": self.safe_string(identity.get("role"), "AI Assistant"),
            "description": self.safe_string(identity.get("description")),
            "goal": self.safe_string(identity.get("goal")),
            "icon": self.safe_string(identity.get("icon"), "🤖"),
            "categories": self.category_manager.normalize_categories(categories),
            "scope": scope,
            "whenToUse": when_to_use,
            "commandCount": self.count_commands(commands),
            "taskCount": len(self.safe_list(tasks)),
            "commands": self.filter_commands(commands),
            "version": self.safe_string(identity.get("version"), "1.0.0"),
        }
    
    def extract_scope_from_principles(self, principles: List[str]) -> str:
        """Extract scope from principles list."""
        if not principles:
            return ""
        
        for principle in principles:
            if isinstance(principle, str) and "SCOPE:" in principle:
                scope_part = principle.split("SCOPE:")[1]
                # Extract until first period or end of string
                scope = scope_part.split(".")[0].strip()
                return scope
        
        return ""
    
    def count_commands(self, commands: Dict[str, Any]) -> int:
        """Count relevant commands (excluding help/exit)."""
        if not isinstance(commands, dict):
            return 0
        
        excluded_commands = {"help", "exit"}
        return len([cmd for cmd in commands.keys() if cmd not in excluded_commands])
    
    def filter_commands(self, commands: Dict[str, Any]) -> Dict[str, str]:
        """Filter out system commands and return user commands."""
        if not isinstance(commands, dict):
            return {}
        
        excluded_commands = {"help", "exit"}
        return {
            key: str(value)
            for key, value in commands.items()
            if key not in excluded_commands
        }
    
    def get_output_structure(self, items: List[Dict[str, Any]]) -> Dict[str, Any]:
        """Create the agents JSON output structure."""
        return {
            "agents": items,
            "metadata": self.create_metadata(items)
        }
    
    def get_required_fields(self) -> List[str]:
        """Get required fields for agent validation."""
        return ["id", "filename", "name", "role", "description", "goal", "categories"]
    
    def extract_item_id(self, item: Dict[str, Any]) -> str:
        """Extract item ID from agent item."""
        return item.get("filename") or item.get("id") or ""


if __name__ == "__main__":
    # Default paths relative to project root
    output_file = Path("./public/data/agents.json")
    
    processor = AgentProcessor()
    processor.process_all(output_file)
