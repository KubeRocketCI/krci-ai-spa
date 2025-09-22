'use client';

/**
 * Agent-specific card content component
 */

import { memo } from 'react';
import { InlineCommand } from '@/components/faq/copyable-code-block';
import {
  getAgentCardClasses,
  getAgentTextClasses,
  AGENTS_DESIGN_TOKENS,
} from '@/lib/agents-design-tokens';
import type { Agent } from '@/lib/agents';

interface AgentCardContentProps {
  agent: Agent;
  variant?: 'compact' | 'detailed' | 'feature';
}

export const AgentCardContent = memo(function AgentCardContent({
  agent,
  variant = 'feature',
}: AgentCardContentProps) {
  const cardClasses = getAgentCardClasses();
  const textClasses = getAgentTextClasses();

  // Variant-specific content filtering
  const shouldShowInstallCommand = variant !== 'compact';

  return (
    <>
      {/* Goal Section */}
      <div className={cardClasses.goalSection}>
        <p id={`agent-goal-${agent.id}`} className={textClasses.goal} title={agent.goal}>
          <span
            className={`block ${AGENTS_DESIGN_TOKENS.content.lineHeight.goal} ${AGENTS_DESIGN_TOKENS.content.maxHeight.goal}`}
            style={{
              display: '-webkit-box',
              WebkitLineClamp: AGENTS_DESIGN_TOKENS.content.lineClamp.goal,
              WebkitBoxOrient: 'vertical' as const,
              overflow: 'hidden',
            }}
          >
            {agent.goal}
          </span>
        </p>
      </div>

      {/* When to Use */}
      <div className={cardClasses.whenToUseSection}>
        <p className={textClasses.whenToUseText} title={`When to use: ${agent.whenToUse}`}>
          <span
            className={`block ${AGENTS_DESIGN_TOKENS.content.lineHeight.whenToUse} ${AGENTS_DESIGN_TOKENS.content.maxHeight.whenToUse}`}
            style={{
              display: '-webkit-box',
              WebkitLineClamp: AGENTS_DESIGN_TOKENS.content.lineClamp.whenToUse,
              WebkitBoxOrient: 'vertical' as const,
              overflow: 'hidden',
            }}
          >
            <span className={textClasses.whenToUseLabel} aria-label="When to use this agent">
              WHEN TO USE:
            </span>{' '}
            {agent.whenToUse}
          </span>
        </p>
      </div>

      {/* Installation Command - variant-aware display */}
      {shouldShowInstallCommand && (
        <div className={cardClasses.installSection}>
          <div className="flex items-center gap-2">
            <span className={textClasses.installLabel} aria-label="Installation command">
              INSTALL:
            </span>
            <InlineCommand
              command={`krci-ai install --agent ${agent.filename}`}
              className="flex-1 text-xs"
              aria-label={`Copy installation command for ${agent.role} agent`}
            />
          </div>
        </div>
      )}
    </>
  );
});
