import agentsData from '@/public/data/agents.json';

export interface Agent {
  id: string;
  filename: string; // The YAML filename without extension (used for installation commands)
  name: string;
  role: string;
  description: string;
  goal: string;
  icon: string;
  specializations: string[];
  scope: string;
  commandCount: number;
  taskCount: number;
  commands: Record<string, string>;
  version: string;
  whenToUse?: string; // Will be populated by our processing script
}

export interface AgentsData {
  agents: Agent[];
  metadata: {
    totalAgents: number;
    specializations: string[];
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
  } catch (error) {
    console.error('Error loading agents data:', error);
    throw new Error('Failed to load agents data');
  }
}

/**
 * Get agents filtered by specialization
 */
export function getAgentsBySpecialization(specialization: string): Agent[] {
  try {
    if (!specialization || typeof specialization !== 'string') {
      console.warn('Invalid specialization parameter:', specialization);
      return [];
    }

    const { agents } = getAgents();
    return agents.filter(
      agent =>
        agent.specializations &&
        Array.isArray(agent.specializations) &&
        agent.specializations.includes(specialization),
    );
  } catch (error) {
    console.error('Error filtering agents by specialization:', error);
    return [];
  }
}

/**
 * Get single agent by ID
 */
export function getAgentById(id: string): Agent | undefined {
  try {
    if (!id || typeof id !== 'string') {
      console.warn('Invalid agent ID parameter:', id);
      return undefined;
    }

    const { agents } = getAgents();
    return agents.find(agent => agent.id === id);
  } catch (error) {
    console.error('Error finding agent by ID:', error);
    return undefined;
  }
}

/**
 * Get all available specializations
 */
export function getSpecializations(): string[] {
  try {
    const { metadata } = getAgents();

    if (!metadata.specializations || !Array.isArray(metadata.specializations)) {
      console.warn('Invalid specializations in metadata');
      return [];
    }

    return metadata.specializations;
  } catch (error) {
    console.error('Error getting specializations:', error);
    return [];
  }
}

/**
 * Fallback "when to use" message for agents without manual descriptions
 */
export function getFallbackWhenToUse(agent: Agent): string {
  try {
    if (!agent || !agent.role) {
      console.warn('Invalid agent for fallback whenToUse:', agent);
      return 'Consult with this agent for specialized tasks and expert guidance';
    }

    return `Consult with ${agent.role} for specialized tasks and expert guidance`;
  } catch (error) {
    console.error('Error generating fallback whenToUse:', error);
    return 'Consult with this agent for specialized tasks and expert guidance';
  }
}
