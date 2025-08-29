import * as React from 'react';
import { cn } from '@/lib/utils';

interface ThemedIntegrationTitleProps {
  className?: string;
  children: React.ReactNode;
}

interface ThemedIntegrationSubtitleProps {
  className?: string;
  children: React.ReactNode;
}

interface ThemedIntegrationListItemProps {
  className?: string;
  children: React.ReactNode;
}

interface ThemedIntegrationCommandProps {
  className?: string;
  children: React.ReactNode;
}

export const ThemedIntegrationTitle = React.forwardRef<
  HTMLHeadingElement,
  ThemedIntegrationTitleProps
>(({ className, children, ...props }, ref) => {
  return (
    <h3
      ref={ref}
      className={cn(
        'text-xl font-semibold',
        // Light theme: dark text for readability
        'text-slate-900 dark:text-white',
        className,
      )}
      {...props}
    >
      {children}
    </h3>
  );
});
ThemedIntegrationTitle.displayName = 'ThemedIntegrationTitle';

export const ThemedIntegrationSubtitle = React.forwardRef<
  HTMLParagraphElement,
  ThemedIntegrationSubtitleProps
>(({ className, children, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={cn(
        'text-sm',
        // Light theme: use muted colors but still readable
        'text-slate-600 dark:text-cyan-300/80 dark:text-green-300/80',
        className,
      )}
      {...props}
    >
      {children}
    </p>
  );
});
ThemedIntegrationSubtitle.displayName = 'ThemedIntegrationSubtitle';

export const ThemedIntegrationListItem = React.forwardRef<
  HTMLSpanElement,
  ThemedIntegrationListItemProps
>(({ className, children, ...props }, ref) => {
  return (
    <span
      ref={ref}
      className={cn(
        // Light theme: readable text
        'text-slate-600 dark:text-green-300/90',
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
});
ThemedIntegrationListItem.displayName = 'ThemedIntegrationListItem';

export const ThemedIntegrationCommand = React.forwardRef<
  HTMLElement,
  ThemedIntegrationCommandProps
>(({ className, children, ...props }, ref) => {
  return (
    <code
      ref={ref}
      className={cn(
        'text-xs',
        // Light theme: use emerald for commands to maintain brand consistency
        'text-emerald-700 dark:text-green-400',
        className,
      )}
      {...props}
    >
      {children}
    </code>
  );
});
ThemedIntegrationCommand.displayName = 'ThemedIntegrationCommand';
