'use client';

import { motion } from 'motion/react';
import { Badge } from '@/components/ui/badge';
import { Rocket } from 'lucide-react';
import { cn } from '@/lib/utils';
import { THEME_COLORS } from '@/lib/theme-colors';

interface TimelineMilestone {
  id: string;
  title: string;
  date: string;
  status: 'completed' | 'current' | 'upcoming';
  description: string;
  icon: React.ReactNode;
  isKubeRocketCI?: boolean;
}

interface ThemedHorizontalTimelineProps {
  milestones: TimelineMilestone[];
  className?: string | undefined;
}

// Themed Container Component
function ThemedTimelineContainer({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'w-full rounded-2xl p-4 sm:p-8',
        'bg-gray-100/90 border border-cyan-300/40 dark:bg-black/50 dark:border-cyan-500/20',
        className,
      )}
    >
      {children}
    </div>
  );
}

// Themed Month Tick Component
function ThemedMonthTick({
  month,
  position,
  index,
}: {
  month: { name: string; fullName: string; position: number };
  position: number;
  index: number;
}) {
  return (
    <motion.div
      className="absolute flex flex-col items-center"
      style={{ left: `${position}%` }}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.3 }}
    >
      {/* Month name above the tick */}
      <div
        className={`text-xs font-mono mb-1 transform -translate-x-1/2 whitespace-nowrap ${THEME_COLORS.text.secondary}`}
      >
        {month.name}
      </div>
      {/* Tick mark extending down to timeline */}
      <div className="w-px h-4 bg-slate-500/80 dark:bg-slate-400/60"></div>
    </motion.div>
  );
}

// Themed Timeline Background Line
function ThemedTimelineBackground() {
  return (
    <div className="absolute top-6 left-8 right-8 h-0.5 hidden sm:block z-0 bg-gradient-to-r from-slate-400 via-cyan-400/70 to-purple-400/70 dark:from-slate-700 dark:via-cyan-500/50 dark:to-purple-500/50"></div>
  );
}

// Themed Progress Line Component
function ThemedProgressLine({ progress }: { progress: number }) {
  return (
    <motion.div
      className="absolute top-6 left-8 h-0.5 rounded-full hidden sm:block z-0 bg-gradient-to-r from-emerald-600 via-cyan-600 to-blue-600 dark:from-green-400 dark:via-cyan-400 dark:to-blue-400"
      initial={{ width: '0%' }}
      animate={{ width: `${Math.max(0, progress - 5)}%` }}
      transition={{ duration: 2, ease: 'easeInOut' }}
      style={{
        right: `${100 - Math.max(0, progress - 5)}%`,
      }}
    >
      {/* Rocket icon positioned at the end of the progress line */}
      <motion.div
        className="absolute right-0 top-0 transform -translate-y-1/2"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2.5, duration: 0.5 }}
      >
        <ThemedRocketIcon />
      </motion.div>
    </motion.div>
  );
}

// Themed Rocket Icon Component
function ThemedRocketIcon() {
  const generateCurrentDateLabel = () => {
    const now = new Date();
    const monthNames = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    const month = monthNames[now.getMonth()];
    const year = now.getFullYear();
    return `${month} ${year}`;
  };

  const currentDateLabel = generateCurrentDateLabel();

  return (
    <div className="relative">
      <motion.div
        className="p-2 rounded-full shadow-lg bg-cyan-600 text-white shadow-cyan-600/50 dark:bg-cyan-400 dark:text-black dark:shadow-cyan-400/50"
        animate={{
          y: [-2, 2, -2],
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 3,
          ease: 'easeInOut',
        }}
      >
        <Rocket className="w-4 h-4" />
      </motion.div>
      <div className="absolute top-14 left-1/2 transform -translate-x-1/2 text-center">
        <ThemedRocketLabel currentDateLabel={currentDateLabel} />
      </div>
    </div>
  );
}

// Themed Rocket Label Component
function ThemedRocketLabel({ currentDateLabel }: { currentDateLabel: string }) {
  return (
    <div className="rounded-lg px-3 py-1 text-xs whitespace-nowrap bg-white/95 border border-cyan-600/50 text-cyan-700 dark:bg-black/90 dark:border-cyan-400/50 dark:text-cyan-300">
      {currentDateLabel} - Now
    </div>
  );
}

// Themed Milestone Node Component
function ThemedMilestoneNode({
  milestone,
  isCompleted,
  isCurrent,
  isKubeRocketCI,
}: {
  milestone: TimelineMilestone;
  isCompleted: boolean;
  isCurrent: boolean;
  isKubeRocketCI: boolean;
}) {
  return (
    <div
      className={cn(
        'relative z-10 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 sm:mb-0 mb-0 sm:mr-0 mr-4',
        isCompleted &&
          'bg-green-100/90 border-2 border-green-600 dark:bg-green-500/20 dark:border-green-400',
        isCurrent &&
          'bg-cyan-100/90 border-2 border-cyan-600 shadow-lg shadow-cyan-600/40 dark:bg-cyan-500/20 dark:border-cyan-400 dark:shadow-cyan-400/30',
        !isCompleted &&
          !isCurrent &&
          'bg-slate-200/90 border-2 border-slate-500 dark:bg-slate-700/30 dark:border-slate-500',
        isKubeRocketCI && 'ring-4 ring-orange-300/60 dark:ring-orange-400/40',
      )}
    >
      <div
        className={cn(
          isCompleted && 'text-green-700 dark:text-green-400',
          isCurrent && 'text-cyan-700 dark:text-cyan-400',
          !isCompleted && !isCurrent && '${THEME_COLORS.text.muted}',
          isKubeRocketCI &&
            'drop-shadow-[0_0_8px_rgba(234,88,12,0.9)] dark:drop-shadow-[0_0_8px_rgba(251,146,60,0.8)]',
        )}
      >
        {milestone.icon}
      </div>

      {/* KubeRocketCI highlight indicator */}
      {isKubeRocketCI && (
        <motion.div
          className="absolute -top-1 -right-1 w-4 h-4 bg-orange-400 rounded-full flex items-center justify-center"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <div className="w-2 h-2 bg-white rounded-full"></div>
        </motion.div>
      )}
    </div>
  );
}

// Themed Milestone Info Component
function ThemedMilestoneInfo({
  milestone,
  isCompleted,
  isCurrent,
}: {
  milestone: TimelineMilestone;
  isCompleted: boolean;
  isCurrent: boolean;
}) {
  return (
    <div className="sm:mt-4 mt-0 sm:text-center text-left sm:max-w-32 max-w-none flex-1">
      <div
        className={cn(
          'text-sm font-semibold mb-1',
          isCompleted && 'text-green-700 dark:text-green-300',
          isCurrent && '${THEME_COLORS.accent.primary}',
          !isCompleted && !isCurrent && '${THEME_COLORS.text.muted}',
        )}
      >
        {milestone.title}
      </div>
      <div className="text-xs mb-2 ${THEME_COLORS.text.muted}">{milestone.date}</div>
      <ThemedMilestoneBadge milestone={milestone} isCompleted={isCompleted} isCurrent={isCurrent} />

      {/* Description shown inline on mobile */}
      <div className="sm:hidden block mt-2">
        <p className="text-xs leading-relaxed ${THEME_COLORS.text.muted}">
          {milestone.description}
        </p>
      </div>
    </div>
  );
}

// Themed Milestone Badge Component
function ThemedMilestoneBadge({
  milestone,
  isCompleted,
  isCurrent,
}: {
  milestone: TimelineMilestone;
  isCompleted: boolean;
  isCurrent: boolean;
}) {
  return (
    <Badge
      className={cn(
        'text-xs',
        isCompleted &&
          'bg-green-100 text-green-700 border-green-300 dark:bg-green-900/30 dark:text-green-300 dark:border-green-700',
        isCurrent &&
          'bg-cyan-100 text-cyan-700 border-cyan-300 dark:bg-cyan-900/30 dark:text-cyan-300 dark:border-cyan-700',
        !isCompleted &&
          !isCurrent &&
          'bg-slate-200 text-slate-700 border-slate-400 dark:bg-slate-800/30 dark:text-slate-400 dark:border-slate-600',
      )}
    >
      {milestone.status === 'completed'
        ? 'COMPLETED'
        : milestone.status === 'current'
          ? 'EXECUTING'
          : 'PLANNED'}
    </Badge>
  );
}

// Themed Milestone Tooltip Component
function ThemedMilestoneTooltip({ milestone }: { milestone: TimelineMilestone }) {
  return (
    <div className="absolute top-16 left-1/2 transform -translate-x-1/2 opacity-0 hover:opacity-100 transition-opacity duration-300 z-20 pointer-events-none hidden sm:block">
      <div className="rounded-lg p-3 text-xs max-w-48 text-center backdrop-blur-sm bg-white/95 border border-cyan-300/60 text-slate-700 dark:bg-black/90 dark:border-cyan-500/30 dark:text-slate-300">
        {milestone.description}
      </div>
    </div>
  );
}

export function ThemedHorizontalTimeline({
  milestones,
  className = '',
}: ThemedHorizontalTimelineProps) {
  // Calculate current progress based on systematic month-by-month approach
  const calculateCurrentProgress = () => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth(); // 0-based (0=Jan, 5=Jun, 7=Aug)
    const currentDay = now.getDate();

    // Timeline: June 2025 (month 0) to March 2026 (month 9) = 10 months total
    // Each month gets exactly 10% of the timeline
    const timelineMonths = [
      { year: 2025, month: 5, name: 'Jun' }, // June 2025 = 0-10%
      { year: 2025, month: 6, name: 'Jul' }, // July 2025 = 10-20%
      { year: 2025, month: 7, name: 'Aug' }, // August 2025 = 20-30%
      { year: 2025, month: 8, name: 'Sep' }, // September 2025 = 30-40%
      { year: 2025, month: 9, name: 'Oct' }, // October 2025 = 40-50%
      { year: 2025, month: 10, name: 'Nov' }, // November 2025 = 50-60%
      { year: 2025, month: 11, name: 'Dec' }, // December 2025 = 60-70%
      { year: 2026, month: 0, name: 'Jan' }, // January 2026 = 70-80%
      { year: 2026, month: 1, name: 'Feb' }, // February 2026 = 80-90%
      { year: 2026, month: 2, name: 'Mar' }, // March 2026 = 90-100%
    ];

    // Find which month we're in
    let monthIndex = -1;
    for (let i = 0; i < timelineMonths.length; i++) {
      const tm = timelineMonths[i];
      if (tm && currentYear === tm.year && currentMonth === tm.month) {
        monthIndex = i;
        break;
      }
    }

    // If before timeline, show at start (5%)
    if (monthIndex === -1) {
      const firstMonth = timelineMonths[0];
      if (
        firstMonth &&
        (currentYear < firstMonth.year ||
          (currentYear === firstMonth.year && currentMonth < firstMonth.month))
      ) {
        return 5;
      }
      // Must be after timeline, show at end (95%)
      return 95;
    }

    // Calculate position within the month
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const positionInMonth = currentDay / daysInMonth; // 0.0 to 1.0

    // Use the SAME positioning system as month ticks
    const timelineMargin = 5; // Same as month ticks
    const monthSpacing = (100 - 2 * timelineMargin) / 9; // Same calculation as month ticks

    // Position rocket using the same system as month ticks
    const baseMonthPosition = timelineMargin + monthSpacing * monthIndex;
    let finalPosition = baseMonthPosition + positionInMonth * monthSpacing;

    // Manual adjustment for proper visual alignment
    finalPosition = finalPosition + 5;

    return finalPosition;
  };

  // Generate monthly ticks from Jun 2025 to Mar 2026 (10 months total)
  const generateMonthTicks = () => {
    const timelineMargin = 5; // 5% margin from each edge of timeline
    const usableTimelineWidth = 100 - 2 * timelineMargin; // 90% usable width
    const monthSpacing = usableTimelineWidth / 9; // 9 intervals between 10 months

    const months = [
      { name: 'Jun', fullName: 'June 2025', position: timelineMargin }, // Start after margin
      { name: 'Jul', fullName: 'July 2025', position: timelineMargin + monthSpacing * 1 },
      { name: 'Aug', fullName: 'August 2025', position: timelineMargin + monthSpacing * 2 },
      { name: 'Sep', fullName: 'September 2025', position: timelineMargin + monthSpacing * 3 },
      { name: 'Oct', fullName: 'October 2025', position: timelineMargin + monthSpacing * 4 },
      { name: 'Nov', fullName: 'November 2025', position: timelineMargin + monthSpacing * 5 },
      { name: 'Dec', fullName: 'December 2025', position: timelineMargin + monthSpacing * 6 },
      { name: 'Jan', fullName: 'January 2026', position: timelineMargin + monthSpacing * 7 },
      { name: 'Feb', fullName: 'February 2026', position: timelineMargin + monthSpacing * 8 },
      { name: 'Mar', fullName: 'March 2026', position: timelineMargin + monthSpacing * 9 }, // End before margin
    ];
    return months;
  };

  const monthTicks = generateMonthTicks();
  const currentProgress = calculateCurrentProgress();

  return (
    <ThemedTimelineContainer className={className}>
      <div className="relative pt-12">
        {/* Month ticks - desktop only, aligned with timeline */}
        <div className="absolute top-0 left-8 right-8 hidden sm:block z-10">
          {monthTicks.map((month, index) => (
            <ThemedMonthTick
              key={month.name}
              month={month}
              position={month.position}
              index={index}
            />
          ))}
        </div>

        {/* Main timeline line - desktop only, with proper margins */}
        <ThemedTimelineBackground />

        {/* Progress line with rocket at the end - animated, desktop only */}
        <ThemedProgressLine progress={currentProgress} />

        {/* Milestones - horizontal on desktop, vertical on mobile */}
        <div className="relative flex flex-col sm:flex-row sm:justify-between sm:items-start items-center pt-10 space-y-8 sm:space-y-0">
          {milestones.map((milestone, index) => {
            const isCompleted = milestone.status === 'completed';
            const isCurrent = milestone.status === 'current';
            const isKubeRocketCI = milestone.isKubeRocketCI ?? false;

            return (
              <motion.div
                key={milestone.id}
                className="relative flex sm:flex-col flex-row sm:items-center items-start w-full sm:w-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
              >
                {/* Milestone node */}
                <ThemedMilestoneNode
                  milestone={milestone}
                  isCompleted={isCompleted}
                  isCurrent={isCurrent}
                  isKubeRocketCI={isKubeRocketCI}
                />

                {/* Milestone info */}
                <ThemedMilestoneInfo
                  milestone={milestone}
                  isCompleted={isCompleted}
                  isCurrent={isCurrent}
                />

                {/* Description tooltip on hover - desktop only */}
                <ThemedMilestoneTooltip milestone={milestone} />
              </motion.div>
            );
          })}
        </div>
      </div>
    </ThemedTimelineContainer>
  );
}
