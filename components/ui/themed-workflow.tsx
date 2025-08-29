import * as React from 'react';
import { cn } from '@/lib/utils';

interface ThemedWorkflowTitleProps {
  className?: string;
  children: React.ReactNode;
}

interface ThemedWorkflowStepProps {
  className?: string;
  children: React.ReactNode;
}

interface ThemedWorkflowStepLabelProps {
  className?: string;
  children: React.ReactNode;
}

interface ThemedWorkflowStepDescriptionProps {
  className?: string;
  children: React.ReactNode;
}

interface ThemedWorkflowArrowProps {
  className?: string;
  children: React.ReactNode;
}

interface ThemedWorkflowDescriptionProps {
  className?: string;
  children: React.ReactNode;
}

interface ThemedWorkflowHighlightProps {
  className?: string;
  children: React.ReactNode;
}

export const ThemedWorkflowTitle = React.forwardRef<HTMLHeadingElement, ThemedWorkflowTitleProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <h3
        ref={ref}
        className={cn(
          'text-2xl font-semibold text-center mb-8',
          // Light theme: use established cyan-700 for consistency
          '${THEME_COLORS.accent.primary}',
          className,
        )}
        {...props}
      >
        {children}
      </h3>
    );
  },
);
ThemedWorkflowTitle.displayName = 'ThemedWorkflowTitle';

export const ThemedWorkflowStep = React.forwardRef<HTMLDivElement, ThemedWorkflowStepProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('flex flex-col items-center text-center', className)} {...props}>
        {children}
      </div>
    );
  },
);
ThemedWorkflowStep.displayName = 'ThemedWorkflowStep';

export const ThemedWorkflowStepLabel = React.forwardRef<
  HTMLSpanElement,
  ThemedWorkflowStepLabelProps
>(({ className, children, ...props }, ref) => {
  return (
    <span
      ref={ref}
      className={cn(
        'font-medium',
        // Light theme: readable dark text
        'text-slate-700 dark:text-green-300',
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
});
ThemedWorkflowStepLabel.displayName = 'ThemedWorkflowStepLabel';

export const ThemedWorkflowStepDescription = React.forwardRef<
  HTMLSpanElement,
  ThemedWorkflowStepDescriptionProps
>(({ className, children, ...props }, ref) => {
  return (
    <span
      ref={ref}
      className={cn(
        'text-xs',
        // Light theme: muted text
        'text-slate-500 dark:text-green-300/60',
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
});
ThemedWorkflowStepDescription.displayName = 'ThemedWorkflowStepDescription';

export const ThemedWorkflowArrow = React.forwardRef<HTMLDivElement, ThemedWorkflowArrowProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'text-xl lg:text-2xl lg:rotate-0 rotate-90',
          // Light theme: use emerald for arrows to maintain progression
          'text-emerald-600 dark:text-green-400',
          className,
        )}
        aria-hidden="true"
        {...props}
      >
        {children}
      </div>
    );
  },
);
ThemedWorkflowArrow.displayName = 'ThemedWorkflowArrow';

export const ThemedWorkflowDescription = React.forwardRef<
  HTMLParagraphElement,
  ThemedWorkflowDescriptionProps
>(({ className, children, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={cn(
        'text-center mt-6 text-sm',
        // Light theme: readable text
        'text-slate-600 dark:text-green-300/70',
        className,
      )}
      {...props}
    >
      {children}
    </p>
  );
});
ThemedWorkflowDescription.displayName = 'ThemedWorkflowDescription';

export const ThemedWorkflowHighlight = React.forwardRef<HTMLElement, ThemedWorkflowHighlightProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <strong
        ref={ref}
        className={cn(
          // Light theme: use cyan-700 for highlights
          '${THEME_COLORS.accent.primary}',
          className,
        )}
        {...props}
      >
        {children}
      </strong>
    );
  },
);
ThemedWorkflowHighlight.displayName = 'ThemedWorkflowHighlight';
