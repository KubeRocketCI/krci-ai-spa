'use client';

/**
 * Generic content grid component
 */

import { memo } from 'react';
import { getContentGridClasses } from '@/lib/content-design-tokens';
import type { BaseContentItem } from '@/lib/content-types';
import type { ReactNode } from 'react';

interface ContentGridProps<T extends BaseContentItem> {
  items: T[];
  variant?: 'compact' | 'detailed' | 'feature';
  renderItem: (item: T, index: number) => ReactNode;
  emptyState?: ReactNode;
  className?: string;
  'aria-label'?: string;
}

function ContentGridComponent<T extends BaseContentItem>({
  items,
  variant = 'feature',
  renderItem,
  emptyState,
  className,
  'aria-label': ariaLabel,
}: ContentGridProps<T>) {
  const gridClasses = getContentGridClasses(variant);

  if (items.length === 0) {
    return (
      <div role="status" aria-label="No items found">
        {emptyState || (
          <div className="text-center py-12">
            <div className="text-slate-500 dark:text-slate-400">
              <p className="text-lg font-medium mb-2">No items found</p>
              <p className="text-sm">Try adjusting your search or filter criteria</p>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      className={`${gridClasses.container} ${className || ''}`}
      role="grid"
      aria-label={ariaLabel || `${items.length} items`}
    >
      {items.map((item, index) => (
        <div key={item.id} role="gridcell">
          {renderItem(item, index)}
        </div>
      ))}
    </div>
  );
}

// Memoized export for performance
export const ContentGrid = memo(ContentGridComponent) as typeof ContentGridComponent;
