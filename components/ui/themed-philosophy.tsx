import * as React from 'react';
import { cn } from '@/lib/utils';

interface ThemedPhilosophyTextProps {
  className?: string;
  children: React.ReactNode;
}

interface ThemedPhilosophyHighlightProps {
  className?: string;
  children: React.ReactNode;
}

export const ThemedPhilosophyText = React.forwardRef<
  HTMLParagraphElement,
  ThemedPhilosophyTextProps
>(({ className, children, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={cn(
        'text-xl max-w-4xl mx-auto',
        // Light theme: darker colors for readability
        'text-slate-700 dark:text-green-300/90',
        className,
      )}
      {...props}
    >
      {children}
    </p>
  );
});
ThemedPhilosophyText.displayName = 'ThemedPhilosophyText';

export const ThemedPhilosophyHighlight = React.forwardRef<
  HTMLElement,
  ThemedPhilosophyHighlightProps
>(({ className, children, ...props }, ref) => {
  return (
    <strong
      ref={ref}
      className={cn(
        // Light theme: use the established cyan-700 for readability, dark theme keeps cyan-300
        '${THEME_COLORS.accent.primary}',
        className,
      )}
      {...props}
    >
      {children}
    </strong>
  );
});
ThemedPhilosophyHighlight.displayName = 'ThemedPhilosophyHighlight';
