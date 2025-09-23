'use client';

import { memo, useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { ThemedInlineCode } from '@/components/ui/themed-inline-code';
import { getTaskTextClasses, TASKS_DESIGN_TOKENS } from '@/lib/tasks-design-tokens';
import type { Task } from '@/lib/tasks';

interface TaskCardContentProps {
  task: Task;
  variant?: 'compact' | 'detailed' | 'feature';
}

const TruncatedPath = memo(function TruncatedPath({ path }: { path: string }) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(path);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <ThemedInlineCode
      variant="command"
      className="group cursor-pointer text-xs flex-1 min-w-0"
      onClick={copyToClipboard}
      role="button"
      tabIndex={0}
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          copyToClipboard();
        }
      }}
      title={`${path} (click to copy)`}
    >
      <code className="block text-right overflow-hidden whitespace-nowrap text-ellipsis">
        {path}
      </code>
      <span className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
        {copied ? (
          <Check className="w-3 h-3 text-green-600 dark:text-green-400" />
        ) : (
          <Copy className="w-3 h-3" />
        )}
      </span>
    </ThemedInlineCode>
  );
});

export const TaskCardContent = memo(function TaskCardContent({
  task,
  variant = 'feature',
}: TaskCardContentProps) {
  const textClasses = getTaskTextClasses();

  const shouldShowPath = variant !== 'compact';
  const descriptionLineClamp =
    variant === 'compact' ? 1 : TASKS_DESIGN_TOKENS.content.lineClamp.description;

  return (
    <div className="space-y-4">
      <div className="min-h-10 flex items-start">
        <p className={textClasses.description} title={task.description}>
          <span
            className={`block ${TASKS_DESIGN_TOKENS.content.lineHeight.description} ${TASKS_DESIGN_TOKENS.content.maxHeight.description}`}
            style={{
              display: '-webkit-box',
              WebkitLineClamp: descriptionLineClamp,
              WebkitBoxOrient: 'vertical' as const,
              overflow: 'hidden',
            }}
          >
            {task.description}
          </span>
        </p>
      </div>

      {shouldShowPath && (
        <div className="mt-2 pt-1.5 border-t border-slate-300/60 dark:border-white/20">
          <div className="flex items-center justify-end gap-2 min-h-[1.5rem]">
            <span
              className={`${textClasses.fileLabel} text-slate-600 dark:text-slate-400 flex-shrink-0`}
            >
              PATH:
            </span>
            <TruncatedPath path={task.path} />
          </div>
        </div>
      )}
    </div>
  );
});
