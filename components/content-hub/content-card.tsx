'use client';

/**
 * Generic content card component
 */

import { memo } from 'react';
import {
  ThemedCard,
  ThemedCardContent,
  ThemedCardHeader,
  ThemedCardTitle,
} from '@/components/ui/themed-card';
import { ThemedBadge } from '@/components/ui/themed-badge';
import {
  getContentCardClasses,
  getContentTextClasses,
  CONTENT_DESIGN_TOKENS,
} from '@/lib/content-design-tokens';
import type { BaseContentItem } from '@/lib/content-types';
import type { ReactNode } from 'react';

interface ContentCardProps<T extends BaseContentItem> {
  item: T;
  variant?: 'compact' | 'detailed' | 'feature';
  renderContent: (item: T) => ReactNode;
  renderActions?: (item: T) => ReactNode;
  renderStats?: (item: T) => ReactNode;
  onClick?: (item: T) => void;
  className?: string;
}

function ContentCardComponent<T extends BaseContentItem>({
  item,
  variant = 'feature',
  renderContent,
  renderActions,
  renderStats,
  onClick,
  className,
}: ContentCardProps<T>) {
  const cardClasses = getContentCardClasses(variant);
  const textClasses = getContentTextClasses();

  const handleClick = onClick ? () => onClick(item) : undefined;

  return (
    <article
      role="region"
      aria-labelledby={`content-title-${item.id}`}
      aria-describedby={`content-description-${item.id}`}
    >
      <ThemedCard
        variant={CONTENT_DESIGN_TOKENS.variants.card[variant]}
        className={`${cardClasses.container} ${className || ''}`}
        onClick={handleClick}
      >
        {/* Version Badge - Top Right Corner */}
        {item.version && (
          <div className={cardClasses.badge}>
            <ThemedBadge
              variant={CONTENT_DESIGN_TOKENS.variants.badge.version}
              size={CONTENT_DESIGN_TOKENS.variants.size.small}
            >
              {item.version}
            </ThemedBadge>
          </div>
        )}

        <ThemedCardHeader className={cardClasses.header}>
          <ThemedCardTitle id={`content-title-${item.id}`} className={textClasses.title}>
            {item.name}
          </ThemedCardTitle>

          {variant !== 'compact' && item.description && (
            <p
              id={`content-description-${item.id}`}
              className={textClasses.description}
              title={item.description}
            >
              <span
                className={`block ${CONTENT_DESIGN_TOKENS.content.lineHeight.normal} ${CONTENT_DESIGN_TOKENS.content.maxHeight.description}`}
                style={{
                  display: '-webkit-box',
                  WebkitLineClamp: CONTENT_DESIGN_TOKENS.content.lineClamp.description,
                  WebkitBoxOrient: 'vertical' as const,
                  overflow: 'hidden',
                }}
              >
                {item.description}
              </span>
            </p>
          )}
        </ThemedCardHeader>

        <ThemedCardContent className={cardClasses.content}>
          {renderContent(item)}

          {/* Tags Section */}
          {item.tags && item.tags.length > 0 && (
            <div className="flex flex-wrap gap-2" aria-label={`Tags: ${item.tags.join(', ')}`}>
              {item.tags.slice(0, variant === 'compact' ? 2 : 4).map(tag => (
                <ThemedBadge
                  key={tag}
                  variant={CONTENT_DESIGN_TOKENS.variants.badge.tag}
                  size={CONTENT_DESIGN_TOKENS.variants.size.small}
                >
                  {tag}
                </ThemedBadge>
              ))}
              {item.tags.length > (variant === 'compact' ? 2 : 4) && (
                <ThemedBadge
                  variant={CONTENT_DESIGN_TOKENS.variants.badge.tag}
                  size={CONTENT_DESIGN_TOKENS.variants.size.small}
                >
                  +{item.tags.length - (variant === 'compact' ? 2 : 4)}
                </ThemedBadge>
              )}
            </div>
          )}
        </ThemedCardContent>

        {/* Actions Section */}
        {renderActions && <div className={cardClasses.actions}>{renderActions(item)}</div>}

        {/* Stats Section */}
        {renderStats && (
          <div className={`${cardClasses.footer} ${CONTENT_DESIGN_TOKENS.colors.border.default}`}>
            {renderStats(item)}
          </div>
        )}
      </ThemedCard>
    </article>
  );
}

// Memoized export for performance
export const ContentCard = memo(ContentCardComponent) as typeof ContentCardComponent;
