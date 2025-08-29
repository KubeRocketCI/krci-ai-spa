import * as React from 'react';
import { cn } from '@/lib/utils';

interface ThemedPillarIconProps {
  className?: string;
  children: React.ReactNode;
}

interface ThemedPillarTitleProps {
  className?: string;
  children: React.ReactNode;
}

interface ThemedPillarDescriptionProps {
  className?: string;
  children: React.ReactNode;
}

interface ThemedPillarHighlightProps {
  className?: string;
  children: React.ReactNode;
}

export const ThemedPillarIcon = React.forwardRef<HTMLDivElement, ThemedPillarIconProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'w-12 h-12 mb-4 mx-auto',
          // Light theme: keep existing icon colors as they work well
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);
ThemedPillarIcon.displayName = 'ThemedPillarIcon';

export const ThemedPillarTitle = React.forwardRef<HTMLHeadingElement, ThemedPillarTitleProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <h3
        ref={ref}
        className={cn(
          'text-xl font-semibold mb-3',
          // Light theme: dark text for readability
          'text-slate-900 dark:text-white',
          className,
        )}
        {...props}
      >
        {children}
      </h3>
    );
  },
);
ThemedPillarTitle.displayName = 'ThemedPillarTitle';

export const ThemedPillarDescription = React.forwardRef<
  HTMLParagraphElement,
  ThemedPillarDescriptionProps
>(({ className, children, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={cn(
        'text-sm leading-relaxed',
        // Light theme: readable gray text
        'text-slate-600 dark:text-green-300/80',
        className,
      )}
      {...props}
    >
      {children}
    </p>
  );
});
ThemedPillarDescription.displayName = 'ThemedPillarDescription';

export const ThemedPillarHighlight = React.forwardRef<HTMLElement, ThemedPillarHighlightProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <strong
        ref={ref}
        className={cn(
          // Light theme: use darker accent colors for readability
          'text-slate-800 dark:text-cyan-300 dark:text-green-300 dark:text-purple-300',
          className,
        )}
        {...props}
      >
        {children}
      </strong>
    );
  },
);
ThemedPillarHighlight.displayName = 'ThemedPillarHighlight';
