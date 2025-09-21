'use client';

/**
 * Generic no results component
 */

import type { ReactNode } from 'react';

interface ContentNoResultsProps {
  title?: string;
  description?: string;
  icon?: ReactNode;
  action?: ReactNode;
  className?: string;
}

export function ContentNoResults({
  title = 'No items found',
  description = 'Try adjusting your search or filter criteria',
  icon,
  action,
  className,
}: ContentNoResultsProps) {
  return (
    <div className={`text-center py-12 ${className || ''}`} role="status">
      {icon && (
        <div className="flex justify-center mb-4 text-slate-400 dark:text-slate-500">{icon}</div>
      )}
      <div className="text-slate-500 dark:text-slate-400">
        <p className="text-lg font-medium mb-2">{title}</p>
        <p className="text-sm mb-4">{description}</p>
        {action && <div className="mt-4">{action}</div>}
      </div>
    </div>
  );
}
