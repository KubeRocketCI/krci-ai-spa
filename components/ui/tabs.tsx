import * as React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';

import { cn } from '@/lib/utils';

const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      'grid grid-cols-3 h-11 sm:h-12 items-center justify-center rounded-lg bg-gray-200/50 dark:bg-gray-900/50 border border-green-600/30 dark:border-green-700/30 p-0 text-muted-foreground backdrop-blur-sm shadow-sm',
      className,
    )}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      'flex items-center justify-center whitespace-nowrap h-full w-full text-xs sm:text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-600/50 dark:focus-visible:ring-cyan-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-black disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-cyan-600/20 dark:data-[state=active]:bg-cyan-400/20 data-[state=active]:text-cyan-700 dark:data-[state=active]:text-cyan-300 data-[state=active]:shadow-sm data-[state=active]:border data-[state=active]:border-cyan-600/50 dark:data-[state=active]:border-cyan-400/50 data-[state=active]:shadow-cyan-600/20 dark:data-[state=active]:shadow-cyan-400/20 data-[state=active]:rounded-md text-slate-500 dark:text-slate-400 hover:text-cyan-700 dark:hover:text-cyan-200 hover:bg-gray-300/50 dark:hover:bg-gray-800/50 relative overflow-hidden first:rounded-l-lg last:rounded-r-lg',
      className,
    )}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      'mt-4 sm:mt-6 min-h-[140px] sm:min-h-[160px] ring-offset-white dark:ring-offset-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-600/50 dark:focus-visible:ring-cyan-400/50 focus-visible:ring-offset-2 animate-in fade-in-50 duration-200',
      className,
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
