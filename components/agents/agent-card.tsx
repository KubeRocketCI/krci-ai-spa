'use client';

/**
 * Agent card component - preserves original agent-specific styling
 */

import { memo } from 'react';
import {
  ThemedCard,
  ThemedCardContent,
  ThemedCardHeader,
  ThemedCardTitle,
} from '@/components/ui/themed-card';
import { ThemedBadge } from '@/components/ui/themed-badge';
import { AgentCardContent } from './agent-card-content';
import {
  getAgentCardClasses,
  getAgentTextClasses,
  AGENTS_DESIGN_TOKENS,
} from '@/lib/agents-design-tokens';
import type { Agent } from '@/lib/agents';

interface AgentCardProps {
  agent: Agent;
  variant?: 'compact' | 'detailed' | 'feature';
  className?: string;
}

export const AgentCard = memo(function AgentCard({
  agent,
  variant = 'feature',
  className,
}: AgentCardProps) {
  const cardClasses = getAgentCardClasses();
  const textClasses = getAgentTextClasses();

  // No click handler to avoid cursor pointer

  return (
    <article
      role="region"
      aria-labelledby={`agent-role-${agent.id}`}
      aria-describedby={`agent-goal-${agent.id}`}
    >
      <ThemedCard
        variant={AGENTS_DESIGN_TOKENS.variants.card}
        className={`${cardClasses.container} cursor-default ${className || ''}`}
      >
        {/* Category Badge - Top Right Corner */}
        <div className={cardClasses.categoryBadge}>
          <ThemedBadge
            variant={AGENTS_DESIGN_TOKENS.variants.badge.category}
            size={AGENTS_DESIGN_TOKENS.variants.size.badge}
          >
            {agent.categories?.[0] || 'Agent'}
          </ThemedBadge>
        </div>

        <ThemedCardHeader
          variant={AGENTS_DESIGN_TOKENS.variants.cardHeader}
          className={cardClasses.header}
        >
          <ThemedCardTitle
            id={`agent-role-${agent.id}`}
            variant={AGENTS_DESIGN_TOKENS.variants.cardTitle}
            className={cardClasses.roleTitle}
          >
            {agent.role}
          </ThemedCardTitle>
        </ThemedCardHeader>

        <ThemedCardContent
          variant={AGENTS_DESIGN_TOKENS.variants.cardContent}
          className={cardClasses.content}
        >
          {/* Agent-specific content using original component */}
          <AgentCardContent agent={agent} variant={variant} />

          {/* Agent Statistics */}
          <div
            className={cardClasses.statsSection}
            aria-label={`Agent statistics: ${agent.commandCount} commands and ${agent.taskCount} tasks available`}
          >
            <div className="flex items-center gap-2">
              <span
                className={textClasses.stats}
                aria-label={`${agent.commandCount} commands available`}
              >
                {agent.commandCount} commands
              </span>
              <span className={textClasses.stats}>|</span>
              <span className={textClasses.stats} aria-label={`${agent.taskCount} tasks available`}>
                {agent.taskCount} tasks
              </span>
            </div>
          </div>
        </ThemedCardContent>
      </ThemedCard>
    </article>
  );
});
