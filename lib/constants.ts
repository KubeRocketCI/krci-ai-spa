export const FRAMEWORK_METRICS = {
  AGENTS: {
    COUNT: 8,
    DISPLAY: '8+',
    DESCRIPTION: '8+ specialized AI agents',
  },
  TASKS: {
    COUNT: 24,
    DISPLAY: '24+',
  },
  TEMPLATES: {
    COUNT: 14,
    DISPLAY: '14+',
  },
  DATA_FILES: {
    COUNT: 11,
    DISPLAY: '11+',
  },
  BASELINE_TASKS: {
    DISPLAY: '30+',
  },
  INTEGRATED_CODEBASES: {
    DISPLAY: '20+',
  },
  SUPPORTED_IDES: {
    COUNT: 4,
    DISPLAY: '4',
  },
  FRAMEWORKS: {
    COUNT: 1,
    DISPLAY: '1',
  },
} as const;

// ==========================================
// APPLICATION CONSTANTS AND ENUMS
// ==========================================

// ==========================================
// CATEGORY FILTER CONSTANTS
// ==========================================

/** Special value for "show all categories" filter */
export const CATEGORY_ALL_VALUE = 'all' as const;

/** Type for category filter values */
export type CategoryFilterValue = string | typeof CATEGORY_ALL_VALUE;

// ==========================================
// COPY COMMAND IDENTIFIERS
// ==========================================

/** Enum for copy command identifiers */
export enum CopyCommandId {
  BREW = 'brew',
  MACOS = 'macos',
  LINUX = 'linux',
  WINDOWS = 'windows',
  QUICKSTART_1 = 'quickstart-1',
  QUICKSTART_2 = 'quickstart-2',
  QUICKSTART_3 = 'quickstart-3',
  QUICKSTART_4 = 'quickstart-4',
  QUICKSTART_5 = 'quickstart-5',
}

/** Type for copy command values */
export type CopyCommandType = `${CopyCommandId}` | `step-${number}` | null;

// ==========================================
// STATS CARD CONFIGURATION
// ==========================================

/** Enum for special stat labels that have custom behavior */
export enum StatLabel {
  INTEGRATED_CODEBASES = 'Integrated Codebases',
  AGILE_SDLC_ROLES = 'Agile SDLC Roles',
  SUPPORTED_IDES = 'Supported IDEs',
  SDLC_FRAMEWORK = 'SDLC Framework',
}

/** Configuration mapping for stats with special behavior */
export const STAT_SPECIAL_CONFIG: Record<StatLabel, { href?: string; icon?: string }> = {
  [StatLabel.INTEGRATED_CODEBASES]: {
    href: 'https://github.com/topics/kuberocketai',
  },
  [StatLabel.AGILE_SDLC_ROLES]: {
    href: '/agents',
  },
  [StatLabel.SUPPORTED_IDES]: {
    href: '/architecture#supported-ides',
  },
  [StatLabel.SDLC_FRAMEWORK]: {
    href: '/architecture#sdlc-workflow',
  },
};

// ==========================================
// UI COMPONENT VARIANTS
// ==========================================

/** Component size variants */
export enum ComponentSize {
  COMPACT = 'compact',
  DEFAULT = 'default',
  LARGE = 'large',
}

/** Component visual variants */
export enum ComponentVariant {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  TERTIARY = 'tertiary',
  SUCCESS = 'success',
  WARNING = 'warning',
  ERROR = 'error',
  INFO = 'info',
}

/** Layout variants for sections and containers */
export enum LayoutVariant {
  HERO = 'hero',
  FEATURE = 'feature',
  STATS = 'stats',
  CTA = 'cta',
  NOTICE = 'notice',
  DEFAULT = 'default',
}

/** Card display variants */
export enum CardVariant {
  COMPACT = 'compact',
  DEFAULT = 'default',
  DETAILED = 'detailed',
}

// ==========================================
// THEME AND ENVIRONMENT
// ==========================================

/** Theme mode values */
export enum ThemeMode {
  LIGHT = 'light',
  DARK = 'dark',
}

/** Environment values */
export enum Environment {
  DEVELOPMENT = 'development',
  PRODUCTION = 'production',
  TEST = 'test',
}

/** Keyboard keys for consistency */
export enum KeyboardKey {
  ENTER = 'Enter',
  SPACE = ' ',
  ESCAPE = 'Escape',
  ARROW_LEFT = 'ArrowLeft',
  ARROW_RIGHT = 'ArrowRight',
  K = 'k',
  SHIFT_K = 'K',
}

// ==========================================
// CONTENT TYPE DETECTION
// ==========================================

/** Path patterns for content type detection */
export const CONTENT_PATH_PATTERNS = {
  TEMPLATES: 'templates',
  DATA: 'data',
  AGENTS: 'agents',
  TASKS: 'tasks',
} as const;

/** Type for content path pattern values */
export type ContentPathPattern = (typeof CONTENT_PATH_PATTERNS)[keyof typeof CONTENT_PATH_PATTERNS];

// ==========================================
// STATUS AND STATE VALUES
// ==========================================

/** Timeline/milestone status values */
export enum MilestoneStatus {
  COMPLETED = 'completed',
  CURRENT = 'current',
  PENDING = 'pending',
  ACHIEVED = 'achieved',
}

// ==========================================
// ANALYTICS AND TRACKING
// ==========================================

/** Analytics environment hostnames */
export const ANALYTICS_HOSTS = {
  PRODUCTION: 'krci-ai.kuberocketci.io',
  VERCEL: 'vercel.app',
} as const;

export const BASE_URL =
  process.env.NODE_ENV === 'production'
    ? `https://${ANALYTICS_HOSTS.PRODUCTION}`
    : 'http://localhost:3000';

// ==========================================
// UTILITY TYPE HELPERS
// ==========================================

/** Extract the values from a const object as a union type */
export type ValueOf<T> = T[keyof T];

/** Make specific properties required while keeping others optional */
export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

/** Create a type-safe enum checker */
export function isEnumValue<T extends Record<string, string>>(
  enumObject: T,
  value: unknown,
): value is T[keyof T] {
  return typeof value === 'string' && Object.values(enumObject).includes(value as T[keyof T]);
}
