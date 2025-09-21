import agentsData from '@/public/data/agents.json';
import { BaseContentAdapter, type BaseContentItem } from './content-types';

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
  whenToUse: string; // Required field - all agents must have usage guidance
}

// Agent as BaseContentItem - explicit compatibility interface
export interface AgentContentItem extends BaseContentItem {
  // Override optional fields from BaseContentItem that are required for agents
  filename: string; // Required for agents (YAML filename)

  // Agent-specific fields that extend BaseContentItem
  role: string;
  goal: string;
  icon: string;
  specializations: string[];
  scope: string;
  commandCount: number;
  taskCount: number;
  commands: Record<string, string>;
  whenToUse: string;
}

/**
 * Adapter to transform Agent domain objects to BaseContentItem format
 */
export class AgentContentAdapter extends BaseContentAdapter<Agent, AgentContentItem> {
  adapt(agent: Agent): AgentContentItem {
    return {
      // BaseContentItem required fields
      id: agent.id,
      name: agent.role, // Use role as display name for cards
      description: agent.goal, // Use goal as primary description

      // BaseContentItem optional fields
      tags: agent.specializations, // Use specializations as tags
      version: agent.version,
      filename: agent.filename,

      // Agent-specific fields
      role: agent.role,
      goal: agent.goal,
      icon: agent.icon,
      specializations: agent.specializations,
      scope: agent.scope,
      commandCount: agent.commandCount,
      taskCount: agent.taskCount,
      commands: agent.commands,
      whenToUse: agent.whenToUse,
    };
  }
}

// Singleton adapter instance for reuse
export const agentContentAdapter = new AgentContentAdapter();

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
  } catch (err) {
    console.error('Error loading agents data:', err);
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
    return agents.filter(agent => agent.specializations.includes(specialization));
  } catch (err) {
    console.error('Error filtering agents by specialization:', err);
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
  } catch (err) {
    console.error('Error finding agent by ID:', err);
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
  } catch (err) {
    console.error('Error getting specializations:', err);
    return [];
  }
}
