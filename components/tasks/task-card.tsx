'use client';

import { memo } from 'react';
import {
  ThemedCard,
  ThemedCardContent,
  ThemedCardHeader,
  ThemedCardTitle,
} from '@/components/ui/themed-card';
import { ThemedBadge } from '@/components/ui/themed-badge';
import { TaskCardContent } from './task-card-content';
import { getTaskCardClasses, TASKS_DESIGN_TOKENS } from '@/lib/tasks-design-tokens';
import type { Task } from '@/lib/tasks';
import { cn } from '@/lib/utils';

interface TaskCardProps {
  task: Task;
  variant?: 'compact' | 'detailed' | 'feature';
  className?: string;
}

export const TaskCard = memo(function TaskCard({
  task,
  variant = 'feature',
  className,
}: TaskCardProps) {
  const cardClasses = getTaskCardClasses();

  return (
    <article
      role="region"
      aria-labelledby={`task-name-${task.id}`}
      aria-describedby={`task-description-${task.id}`}
    >
      <ThemedCard
        variant={TASKS_DESIGN_TOKENS.variants.card}
        className={cn(cardClasses.container, 'cursor-default', className)}
      >
        <div className={cardClasses.categoryBadge}>
          <ThemedBadge
            variant={TASKS_DESIGN_TOKENS.variants.badge.category}
            size={TASKS_DESIGN_TOKENS.variants.size.badge}
          >
            {task.categories?.[0] || 'Task'}
          </ThemedBadge>
        </div>

        <ThemedCardHeader
          variant={TASKS_DESIGN_TOKENS.variants.cardHeader}
          className={cardClasses.header}
        >
          <ThemedCardTitle
            id={`task-name-${task.id}`}
            variant={TASKS_DESIGN_TOKENS.variants.cardTitle}
            className={cardClasses.nameTitle}
          >
            {task.name}
          </ThemedCardTitle>
        </ThemedCardHeader>

        <ThemedCardContent variant={TASKS_DESIGN_TOKENS.variants.cardContent}>
          <div id={`task-description-${task.id}`}>
            <TaskCardContent task={task} variant={variant} />
          </div>
        </ThemedCardContent>
      </ThemedCard>
    </article>
  );
});
