import agentsData from '@/public/data/agents.json';
// Pruned unused adapter & extended content item linkage

export interface Agent {
  id: string;
  filename: string; // The YAML filename without extension (used for installation commands)
  name: string;
  role: string;
  description: string;
  goal: string;
  icon: string;
  categories: string[];
  scope: string;
  commandCount: number;
  taskCount: number;
  commands: Record<string, string>;
  version: string;
  whenToUse: string; // Required field - all agents must have usage guidance
}

// Agent as BaseContentItem - explicit compatibility interface

export interface AgentsData {
  agents: Agent[];
  metadata: {
    totalAgents: number;
    categories: string[];
    generatedAt: string;
    version: string;
  };
}

/**
 * Get all agents data
 * @throws {Error} If agents data is invalid or unavailable
 */
export function getAgents(): AgentsData {
  try {
    const data = agentsData as unknown as AgentsData;

    // Basic validation
    if (!data || !data.agents || !Array.isArray(data.agents)) {
      throw new Error('Invalid agents data structure');
    }

    if (!data.metadata || typeof data.metadata.totalAgents !== 'number') {
      throw new Error('Invalid agents metadata');
    }

    return data;
  } catch (err) {
    console.error('Error loading agents data:', err);
    throw new Error('Failed to load agents data');
  }
}
