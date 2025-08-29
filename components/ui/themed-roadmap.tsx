import { cn } from '@/lib/utils';
import { THEME_COLORS } from '@/lib/theme-colors';

interface ThemedRoadmapDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

export function ThemedRoadmapDescription({ children, className }: ThemedRoadmapDescriptionProps) {
  return (
    <p
      className={cn(
        'text-xl leading-relaxed',
        `${THEME_COLORS.text.secondary}/80`, // Light theme: darker text, Dark theme: preserved
        className,
      )}
    >
      {children}
    </p>
  );
}

interface ThemedRoadmapMetricCardProps {
  icon: React.ReactNode;
  value: string;
  label: string;
  description: string;
  children?: React.ReactNode;
  className?: string;
}

export function ThemedRoadmapMetricCard({
  icon,
  value,
  label,
  description,
  children,
  className,
}: ThemedRoadmapMetricCardProps) {
  return (
    <div className={cn('p-6 text-center', className)}>
      <div className="mb-4 flex justify-center ${THEME_COLORS.accent.secondary}">{icon}</div>
      <div className="text-3xl font-bold mb-2 text-slate-900 dark:text-white">{value}</div>
      <h3 className="text-lg font-semibold mb-2 ${THEME_COLORS.accent.primary}">{label}</h3>
      <p className="text-sm leading-relaxed ${THEME_COLORS.text.muted}">{description}</p>
      {children && <div className="mt-3">{children}</div>}
    </div>
  );
}

interface ThemedRoadmapVisionTextProps {
  children: React.ReactNode;
  className?: string;
}

export function ThemedRoadmapVisionText({ children, className }: ThemedRoadmapVisionTextProps) {
  return (
    <p
      className={cn(
        'text-xl leading-relaxed',
        'text-slate-700 dark:text-slate-300/90', // Light theme: darker text, Dark theme: preserved
        className,
      )}
    >
      {children}
    </p>
  );
}

interface ThemedRoadmapVisionCardTextProps {
  children: React.ReactNode;
  className?: string;
}

export function ThemedRoadmapVisionCardText({
  children,
  className,
}: ThemedRoadmapVisionCardTextProps) {
  return (
    <p
      className={cn(
        'text-lg leading-relaxed',
        'text-slate-700 dark:text-green-300/90', // Light theme: darker text, Dark theme: preserved
        className,
      )}
    >
      {children}
    </p>
  );
}

interface ThemedRoadmapHighlightProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  className?: string;
}

export function ThemedRoadmapHighlight({
  children,
  variant = 'primary',
  className,
}: ThemedRoadmapHighlightProps) {
  const variantStyles = {
    primary: '${THEME_COLORS.accent.primary}', // Light theme: darker cyan, Dark theme: preserved
    secondary: 'text-emerald-700 dark:text-green-300', // Light theme: darker green, Dark theme: preserved
  };

  return <strong className={cn(variantStyles[variant], className)}>{children}</strong>;
}
