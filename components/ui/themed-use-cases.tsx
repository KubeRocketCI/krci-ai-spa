import { cn } from '@/lib/utils';

interface ThemedUseCaseTextProps {
  children: React.ReactNode;
  className?: string;
  variant?:
    | 'hero-subtitle'
    | 'hero-description'
    | 'card-title'
    | 'card-subtitle'
    | 'card-benefit'
    | 'section-description'
    | 'value-card-title'
    | 'value-card-text'
    | 'cta-description'
    | 'cta-card-description'
    | 'cta-card-title'
    | 'checkmark';
}

export function ThemedUseCaseText({
  children,
  className = '',
  variant = 'card-benefit',
}: ThemedUseCaseTextProps) {
  const variantStyles = {
    'hero-subtitle':
      'text-lg text-slate-700 dark:text-green-300/90 mb-6 max-w-3xl mx-auto font-medium',
    'hero-description': 'text-xl text-slate-600 dark:text-slate-300/80 mb-8 max-w-2xl mx-auto',
    'card-title': 'text-slate-900 dark:text-green-300 mb-1',
    'card-subtitle': 'text-cyan-700 dark:text-cyan-400 text-sm font-medium',
    'card-benefit': 'text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium',
    'section-description': 'text-lg text-slate-600 dark:text-slate-300/80 max-w-2xl mx-auto',
    'value-card-title': 'text-slate-900 dark:text-green-300 font-semibold mb-2',
    'value-card-text': 'text-sm text-slate-600 dark:text-slate-300',
    'cta-description': 'text-lg text-slate-600 dark:text-slate-300/80 mb-8',
    'cta-card-description': 'text-sm text-slate-500 dark:text-slate-400 mb-4',
    'cta-card-title': 'text-slate-900 dark:text-green-300 font-semibold mb-2',
    checkmark: 'text-green-600 dark:text-green-400 mr-3 mt-0.5',
  };

  return <span className={cn(variantStyles[variant], className)}>{children}</span>;
}

interface ThemedUseCaseSectionProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'highlighted';
}

export function ThemedUseCaseSection({
  children,
  className = '',
  variant = 'default',
}: ThemedUseCaseSectionProps) {
  const variantStyles = {
    default: '',
    highlighted: 'bg-gray-50/50 dark:bg-gray-900/20',
  };

  return (
    <section className={cn('py-16 px-4', variantStyles[variant], className)}>{children}</section>
  );
}

interface ThemedCTACardProps {
  children: React.ReactNode;
  variant?: 'default' | 'purple' | 'green';
  className?: string;
}

export function ThemedCTACard({
  children,
  variant = 'default',
  className = '',
}: ThemedCTACardProps) {
  const variantStyles = {
    default: '',
    purple:
      'border-purple-300/50 hover:border-purple-400/60 dark:border-purple-700/30 dark:hover:border-purple-600/50',
    green:
      'border-green-300/50 hover:border-green-400/60 dark:border-green-700/30 dark:hover:border-green-600/50',
  };

  return <div className={cn(variantStyles[variant], className)}>{children}</div>;
}

// Removed ThemedCTAButton (unused)
