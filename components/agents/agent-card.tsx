'use client';

import { memo } from 'react';
import {
  ThemedCard,
  ThemedCardContent,
  ThemedCardHeader,
  ThemedCardTitle,
} from '@/components/ui/themed-card';
import { ThemedBadge } from '@/components/ui/themed-badge';
import { InlineCommand } from '@/components/faq/copyable-code-block';
import {
  getAgentCardClasses,
  getAgentTextClasses,
  AGENTS_DESIGN_TOKENS,
} from '@/lib/agents-design-tokens';
import type { Agent } from '@/lib/agents';

interface AgentCardProps {
  agent: Agent;
  className?: string;
}

export const AgentCard = memo(function AgentCard({ agent, className }: AgentCardProps) {
  const cardClasses = getAgentCardClasses();
  const textClasses = getAgentTextClasses();

  return (
    <article
      role="region"
      aria-labelledby={`agent-role-${agent.id}`}
      aria-describedby={`agent-goal-${agent.id}`}
    >
      <ThemedCard
        variant={AGENTS_DESIGN_TOKENS.variants.card}
        className={`${cardClasses.container} ${className || ''}`}
      >
        {/* Version Badge - Top Right Corner */}
        <div className={cardClasses.versionBadge}>
          <ThemedBadge
            variant={AGENTS_DESIGN_TOKENS.variants.badge.version}
            size={AGENTS_DESIGN_TOKENS.variants.size.badge}
          >
            {agent.version}
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
          <div className={cardClasses.personaName}>
            {agent.name !== agent.role && <p className={textClasses.persona}>{agent.name}</p>}
          </div>
        </ThemedCardHeader>

        <ThemedCardContent
          variant={AGENTS_DESIGN_TOKENS.variants.cardContent}
          className={cardClasses.content}
        >
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
                &ldquo;{agent.goal}&rdquo;
              </span>
            </p>
          </div>

          <div
            className={cardClasses.specializationsSection}
            aria-label={`Specializations: ${agent.specializations.join(', ')}`}
          >
            {agent.specializations.map(spec => (
              <ThemedBadge
                key={spec}
                variant={AGENTS_DESIGN_TOKENS.variants.badge.specialization}
                size={AGENTS_DESIGN_TOKENS.variants.size.badge}
              >
                {spec}
              </ThemedBadge>
            ))}
          </div>

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

          {/* Installation Command */}
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

          <div
            className={cardClasses.statsSection}
            aria-label={`Agent statistics: ${agent.commandCount} commands and ${agent.taskCount} tasks available`}
          >
            <span
              className={textClasses.stats}
              aria-label={`${agent.commandCount} commands available`}
            >
              {agent.commandCount} commands
            </span>
            <span className={textClasses.stats} aria-label={`${agent.taskCount} tasks available`}>
              {agent.taskCount} tasks
            </span>
          </div>
        </ThemedCardContent>
      </ThemedCard>
    </article>
  );
});
