import { cn } from '@/lib/utils';
import { THEME_COLORS } from '@/lib/theme-colors';

interface ThemedValueCardProps {
  children: React.ReactNode;
  className?: string;
}

export function ThemedValueCard({ children, className = '' }: ThemedValueCardProps) {
  return (
    <div
      className={cn(
        'bg-gradient-to-r from-gray-100/80 to-gray-200/60',
        `${THEME_COLORS.border.default}/50 dark:border-green-700/30`,
        'dark:from-gray-900/50 dark:to-black/50',
        className,
      )}
    >
      {children}
    </div>
  );
}

interface ThemedValueIconProps {
  children: React.ReactNode;
  variant?: 'blue' | 'purple' | 'green' | 'yellow';
  className?: string;
}

export function ThemedValueIcon({
  children,
  variant = 'blue',
  className = '',
}: ThemedValueIconProps) {
  const variantStyles = {
    blue: 'bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400',
    purple: 'bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400',
    green: 'bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400',
    yellow:
      'bg-gradient-to-r from-yellow-600 to-orange-600 dark:from-yellow-400 dark:to-orange-400',
  };

  return (
    <div
      className={cn(
        'w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3',
        variantStyles[variant],
        className,
      )}
    >
      <span className="text-white dark:text-black">{children}</span>
    </div>
  );
}
