'use client';

/**
 * Template card component - uses ThemedCard with category badge
 * Follows agents card pattern for consistency
 */

import { memo } from 'react';
import {
  ThemedCard,
  ThemedCardContent,
  ThemedCardHeader,
  ThemedCardTitle,
} from '@/components/ui/themed-card';
import { ThemedBadge } from '@/components/ui/themed-badge';
import { TemplateCardContent } from './template-card-content';
import { getTemplateCardClasses, TEMPLATES_DESIGN_TOKENS } from '@/lib/templates-design-tokens';
import type { Template } from '@/lib/templates';

interface TemplateCardProps {
  template: Template;
  variant?: 'compact' | 'detailed' | 'feature';
  className?: string;
}

export const TemplateCard = memo(function TemplateCard({
  template,
  variant = 'feature',
  className,
}: TemplateCardProps) {
  const cardClasses = getTemplateCardClasses();

  // No click handler to avoid cursor pointer

  return (
    <article
      role="region"
      aria-labelledby={`template-name-${template.id}`}
      aria-describedby={`template-description-${template.id}`}
    >
      <ThemedCard
        variant={TEMPLATES_DESIGN_TOKENS.variants.card}
        className={`${cardClasses.container} cursor-default ${className || ''}`}
      >
        {/* Category Badge - Top Right Corner */}
        <div className={cardClasses.categoryBadge}>
          <ThemedBadge
            variant={TEMPLATES_DESIGN_TOKENS.variants.badge.category}
            size={TEMPLATES_DESIGN_TOKENS.variants.size.badge}
          >
            {template.categories?.[0] || 'Template'}
          </ThemedBadge>
        </div>

        <ThemedCardHeader
          variant={TEMPLATES_DESIGN_TOKENS.variants.cardHeader}
          className={cardClasses.header}
        >
          <ThemedCardTitle
            id={`template-name-${template.id}`}
            variant={TEMPLATES_DESIGN_TOKENS.variants.cardTitle}
            className={cardClasses.nameTitle}
          >
            {template.name}
          </ThemedCardTitle>
        </ThemedCardHeader>

        <ThemedCardContent variant={TEMPLATES_DESIGN_TOKENS.variants.cardContent}>
          <div id={`template-description-${template.id}`}>
            <TemplateCardContent template={template} variant={variant} />
          </div>
        </ThemedCardContent>
      </ThemedCard>
    </article>
  );
});
