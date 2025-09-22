'use client';

/**
 * Data card component - uses ThemedCard with category badge
 * Follows templates card pattern for consistency and uses design tokens
 */

import { memo } from 'react';
import {
  ThemedCard,
  ThemedCardContent,
  ThemedCardHeader,
  ThemedCardTitle,
} from '@/components/ui/themed-card';
import { ThemedBadge } from '@/components/ui/themed-badge';
import { DataCardContent } from './data-card-content';
import { getDataCardClasses, DATA_DESIGN_TOKENS } from '@/lib/data-design-tokens';
import type { DataFile } from '@/lib/data';

interface DataCardProps {
  dataFile: DataFile;
  variant?: 'compact' | 'detailed' | 'feature';
  className?: string;
}

export const DataCard = memo(function DataCard({
  dataFile,
  variant = 'feature',
  className,
}: DataCardProps) {
  const cardClasses = getDataCardClasses();

  // No click handler to avoid cursor pointer

  return (
    <article
      role="region"
      aria-labelledby={`data-name-${dataFile.id}`}
      aria-describedby={`data-description-${dataFile.id}`}
    >
      <ThemedCard
        variant={DATA_DESIGN_TOKENS.variants.card}
        className={`${cardClasses.container} cursor-default ${className || ''}`}
      >
        {/* Category Badge - Top Right Corner */}
        <div className={cardClasses.categoryBadge}>
          <ThemedBadge
            variant={DATA_DESIGN_TOKENS.variants.badge.category}
            size={DATA_DESIGN_TOKENS.variants.size.badge}
          >
            {dataFile.categories?.[0] || 'Data'}
          </ThemedBadge>
        </div>

        <ThemedCardHeader
          variant={DATA_DESIGN_TOKENS.variants.cardHeader}
          className={cardClasses.header}
        >
          <ThemedCardTitle
            id={`data-name-${dataFile.id}`}
            variant={DATA_DESIGN_TOKENS.variants.cardTitle}
            className={cardClasses.nameTitle}
          >
            {dataFile.name}
          </ThemedCardTitle>
        </ThemedCardHeader>

        <ThemedCardContent variant={DATA_DESIGN_TOKENS.variants.cardContent}>
          <div id={`data-description-${dataFile.id}`}>
            <DataCardContent dataFile={dataFile} variant={variant} />
          </div>
        </ThemedCardContent>
      </ThemedCard>
    </article>
  );
});
