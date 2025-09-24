'use client';

import { cn } from '@/lib/utils';
import { ThemedCard, ThemedCardHeader, ThemedCardTitle } from './themed-card';
import { Layers } from 'lucide-react';

interface ThemedArchitectureLayerProps {
  layer: string;
  title: string;
  description: string;
  components: string[];
  className?: string;
}

interface ThemedComponentStatProps {
  icon: React.ReactNode;
  title: string;
  count: string;
  description: string;
  className?: string;
}

interface ThemedArchitectureTableProps {
  children: React.ReactNode;
  className?: string;
}

interface ThemedTableRowProps {
  children: React.ReactNode;
  className?: string;
}

interface ThemedTableCellProps {
  children: React.ReactNode;
  variant?: 'header' | 'agent' | 'role' | 'responsibility' | 'collaboration' | 'output';
  className?: string;
}

/**
 * Architecture layer card with proper light/dark theme styling
 * Follows terminal aesthetic with blue-to-green progression
 */
export function ThemedArchitectureLayer({
  layer,
  title,
  description,
  components,
  className,
}: ThemedArchitectureLayerProps) {
  return (
    <ThemedCard variant="highlight" {...(className ? { className } : {})}>
      <ThemedCardHeader>
        <div className="flex items-center justify-between">
          <ThemedCardTitle className="text-slate-800 dark:text-green-300 flex items-center">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-600 to-cyan-700 dark:from-cyan-400 dark:to-cyan-500 text-white dark:text-black font-bold flex items-center justify-center mr-3">
              {layer}
            </div>
            {title}
          </ThemedCardTitle>
          <Layers className="w-6 h-6 ${THEME_COLORS.accent.secondary}" />
        </div>
        <p className="${THEME_COLORS.text.muted} ml-11">{description}</p>
      </ThemedCardHeader>
      <div className="p-6 pt-4">
        <div className="grid md:grid-cols-4 gap-3">
          {components.map((component, idx) => (
            <div
              key={idx}
              className="bg-gray-100 dark:bg-gray-900 border border-emerald-300/30 dark:border-green-700/30 rounded p-3 text-center"
            >
              <div className="text-emerald-700 dark:text-green-400 text-sm font-mono">
                {component}
              </div>
            </div>
          ))}
        </div>
      </div>
    </ThemedCard>
  );
}

/**
 * Component stat card with icon and metrics
 * Uses themed colors for light/dark compatibility
 */
export function ThemedComponentStat({
  icon,
  title,
  count,
  description,
  className,
}: ThemedComponentStatProps) {
  return (
    <ThemedCard variant="highlight" {...(className ? { className } : {})}>
      <div className="p-4 text-center">
        <div className="${THEME_COLORS.accent.secondary} mb-2 flex justify-center">{icon}</div>
        <div className="text-2xl font-bold text-emerald-700 dark:text-green-300 mb-1">{count}</div>
        <div className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1">{title}</div>
        <div className="text-xs ${THEME_COLORS.text.muted}">{description}</div>
      </div>
    </ThemedCard>
  );
}

/**
 * Architecture table with proper theme styling
 * Maintains readability in both light and dark modes
 */
export function ThemedArchitectureTable({ children, className }: ThemedArchitectureTableProps) {
  return (
    <ThemedCard variant="highlight" {...(className ? { className } : {})}>
      <div className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">{children}</table>
        </div>
      </div>
    </ThemedCard>
  );
}

/**
 * Themed table row with hover effects
 */
export function ThemedTableRow({ children, className }: ThemedTableRowProps) {
  return (
    <tr
      className={cn(
        'border-b border-emerald-200/30 dark:border-gray-700/30 hover:bg-cyan-50/50 dark:hover:bg-gray-800/20',
        className,
      )}
    >
      {children}
    </tr>
  );
}

/**
 * Themed table cell with variant-based styling
 */
export function ThemedTableCell({
  children,
  variant = 'responsibility',
  className,
}: ThemedTableCellProps) {
  const variantStyles = {
    header: 'text-left py-3 px-4 ${THEME_COLORS.accent.primary} font-semibold',
    agent: 'py-3 px-4 font-mono text-emerald-700 dark:text-green-400',
    role: 'py-3 px-4 font-semibold text-slate-800 dark:text-slate-300',
    responsibility: 'py-3 px-4 text-slate-700 dark:text-slate-300',
    collaboration: 'py-3 px-4 text-blue-700 dark:text-blue-300',
    output: 'py-3 px-4 text-purple-700 dark:text-purple-300',
  };

  return <td className={cn(variantStyles[variant], className)}>{children}</td>;
}

/**
 * Themed section background with gradient overlay
 * Provides subtle visual separation between sections
 */
export function ThemedSectionBackground({
  children,
  className,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={cn('py-16 px-4 bg-gray-50/50 dark:bg-gray-900/20', className)}>
      {children}
    </section>
  );
}
