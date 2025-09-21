#!/usr/bin/env python3
"""
Process KubeRocketAI agent YAML files into JSON format for Next.js consumption.
Extracts key persona information for the Agents Hub landing page.
"""

import yaml
import json
from datetime import datetime
from pathlib import Path
from typing import Dict, Any


def extract_agent_persona(agent_data: Dict[str, Any], existing_agent: Dict[str, Any] = None) -> Dict[str, Any]:
    """Extract key persona information from agent YAML structure."""

    identity = agent_data.get("identity", {})
    commands = agent_data.get("commands", {})
    tasks = agent_data.get("tasks", [])
    principles = agent_data.get("principles", [])

    # Preserve existing specializations or set placeholder for new agents
    if existing_agent and "specializations" in existing_agent:
        specializations = existing_agent["specializations"]
    else:
        specializations = ["To be defined"]
    
    # Preserve existing whenToUse or set placeholder for new agents
    if existing_agent and "whenToUse" in existing_agent:
        when_to_use = existing_agent["whenToUse"]
    else:
        when_to_use = "To be populated manually"
    
    description = identity.get("description", "")

    # Extract scope from first principle if available
    scope = ""
    if principles and len(principles) > 0:
        first_principle = principles[0]
        if "SCOPE:" in first_principle:
            scope = first_principle.split("SCOPE:")[1].split(".")[0].strip()


    return {
        "id": identity.get("id", ""),
        "filename": "",  # Will be set by the calling function
        "name": identity.get("name", ""),
        "role": identity.get("role", ""),
        "description": description,
        "goal": identity.get("goal", ""),
        "icon": identity.get("icon", "🤖"),
        "specializations": specializations,
        "scope": scope,
        "whenToUse": when_to_use,
        "commandCount": len(
            [cmd for cmd in commands.keys() if cmd not in ["help", "exit"]]
        ),
        "taskCount": len(tasks),
        "commands": {
            key: value
            for key, value in commands.items()
            if key not in ["help", "exit"]  # Exclude common commands
        },
        "version": identity.get("version", "1.0.0"),
    }


def load_existing_agents(output_file: str) -> Dict[str, Dict[str, Any]]:
    """Load existing agents data to preserve manual fields."""
    existing_agents = {}
    output_path = Path(output_file)
    
    if output_path.exists():
        try:
            with open(output_path, "r", encoding="utf-8") as f:
                data = json.load(f)
                for agent in data.get("agents", []):
                    filename = agent.get("filename", "")
                    if filename:
                        existing_agents[filename] = agent
            print(f"📖 Loaded existing data for {len(existing_agents)} agents")
        except Exception as e:
            print(f"⚠ Could not load existing file: {e}")
    
    return existing_agents


def process_agents_directory(agents_dir: str, output_file: str) -> None:
    """Process all YAML files in agents directory and output JSON."""

    agents_path = Path(agents_dir)
    agents_data = []

    if not agents_path.exists():
        print(f"Error: Directory {agents_dir} does not exist")
        return
    
    # Load existing agents to preserve manual fields
    existing_agents = load_existing_agents(output_file)

    # Process each YAML file
    for yaml_file in agents_path.glob("*.yaml"):
        try:
            with open(yaml_file, "r", encoding="utf-8") as f:
                agent_data = yaml.safe_load(f)

            if "agent" in agent_data:
                filename = yaml_file.stem
                existing_agent = existing_agents.get(filename)
                
                persona = extract_agent_persona(agent_data["agent"], existing_agent)
                # Set filename (without .yaml extension) as the agent identifier
                persona["filename"] = filename
                agents_data.append(persona)
                
                status = "updated" if existing_agent else "new"
                print(
                    f"✓ Processed {yaml_file.name}: {persona['name']} ({status})"
                )
            else:
                print(f"⚠ Skipped {yaml_file.name}: No 'agent' key found")

        except Exception as e:
            print(f"✗ Error processing {yaml_file.name}: {e}")

    # Sort agents by role for consistent ordering
    agents_data.sort(key=lambda x: (x["role"], x["name"]))

    # Write output JSON
    output_path = Path(output_file)
    output_path.parent.mkdir(parents=True, exist_ok=True)

    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(
            {
                "agents": agents_data,
                "metadata": {
                    "totalAgents": len(agents_data),
                    "specializations": list(
                        set(
                            spec
                            for agent in agents_data
                            for spec in agent["specializations"]
                        )
                    ),
                    "generatedAt": datetime.now().isoformat() + "Z",
                    "version": "1.0.0",
                },
            },
            f,
            indent=2,
            ensure_ascii=False,
        )

    print(f"\n✅ Generated {output_file} with {len(agents_data)} agents")
    print(
        f"📊 Specializations found: {', '.join(set(spec for agent in agents_data for spec in agent['specializations']))}"
    )


if __name__ == "__main__":
    # Default paths relative to project root
    agents_directory = "./krci-input/.krci-ai/agents"
    output_file = "./public/data/agents.json"

    print("🚀 Processing KubeRocketAI agents...")
    process_agents_directory(agents_directory, output_file)
