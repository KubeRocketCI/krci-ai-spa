import * as React from 'react';
import { cn } from '@/lib/utils';

interface ThemedContextEngineeringBoxProps {
  className?: string;
  children: React.ReactNode;
}

interface ThemedContextEngineeringTitleProps {
  className?: string;
  children: React.ReactNode;
}

interface ThemedContextEngineeringTextProps {
  className?: string;
  children: React.ReactNode;
}

interface ThemedContextEngineeringHighlightProps {
  className?: string;
  variant?: 'primary' | 'secondary' | 'tertiary';
  children: React.ReactNode;
}

export const ThemedContextEngineeringBox = React.forwardRef<
  HTMLDivElement,
  ThemedContextEngineeringBoxProps
>(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        'rounded-lg p-6 max-w-4xl mx-auto',
        // Light theme: use light background with subtle border
        'bg-yellow-50 border border-yellow-200 dark:bg-black/50 dark:border-yellow-500/30',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
});
ThemedContextEngineeringBox.displayName = 'ThemedContextEngineeringBox';

export const ThemedContextEngineeringTitle = React.forwardRef<
  HTMLHeadingElement,
  ThemedContextEngineeringTitleProps
>(({ className, children, ...props }, ref) => {
  return (
    <h3
      ref={ref}
      className={cn(
        'text-lg font-semibold mb-3',
        // Light theme: darker yellow for better readability
        'text-yellow-700 dark:text-yellow-300',
        className,
      )}
      {...props}
    >
      {children}
    </h3>
  );
});
ThemedContextEngineeringTitle.displayName = 'ThemedContextEngineeringTitle';

export const ThemedContextEngineeringText = React.forwardRef<
  HTMLParagraphElement,
  ThemedContextEngineeringTextProps
>(({ className, children, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={cn(
        'text-sm leading-relaxed',
        // Light theme: readable dark text
        'text-slate-700 dark:text-green-300/80',
        className,
      )}
      {...props}
    >
      {children}
    </p>
  );
});
ThemedContextEngineeringText.displayName = 'ThemedContextEngineeringText';

export const ThemedContextEngineeringHighlight = React.forwardRef<
  HTMLElement,
  ThemedContextEngineeringHighlightProps
>(({ className, variant = 'primary', children, ...props }, ref) => {
  return (
    <strong
      ref={ref}
      className={cn(
        // Light theme: use darker versions of accent colors
        {
          'text-yellow-700 dark:text-yellow-300': variant === 'primary',
          '${THEME_COLORS.accent.primary}': variant === 'secondary',
          'text-blue-700 dark:text-blue-300': variant === 'tertiary',
        },
        className,
      )}
      {...props}
    >
      {children}
    </strong>
  );
});
ThemedContextEngineeringHighlight.displayName = 'ThemedContextEngineeringHighlight';
