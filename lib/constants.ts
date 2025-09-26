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
// ROADMAP TIMELINE DATA
// ==========================================

/** Timeline phase data structure */
export interface TimelinePhase {
  title: string;
  period: string;
  heading: string;
  status: 'success' | 'progress' | 'planned';
  badge: string;
  description: string;
  descriptionWithLink?: boolean;
  items: string[];
  icon: 'CheckCircle' | 'Rocket' | 'Target';
}

/** KubeRocketAI Roadmap Timeline Data */
export const ROADMAP_TIMELINE_DATA: TimelinePhase[] = [
  {
    title: 'Jun-Aug 2025',
    period: 'Jun-Aug 2025',
    heading: 'KubeRocketAI MVP Completion',
    status: 'success',
    badge: 'COMPLETED',
    description:
      'Successfully delivered a proven framework with measurable impact on developer productivity and AI-generated content quality across multiple development teams.',
    items: [
      '✅ 10+ developers actively using framework daily',
      '✅ 15+ KubeRocketCI repositories with agent deployment',
      '✅ 8+ core agents (PM, Architect, Developer, QA, BA, PMM) fully operational',
      '✅ 85% reduction in AI-generated content adjustment time achieved',
    ],
    icon: 'CheckCircle',
  },
  {
    title: 'Sep-Dec 2025',
    period: 'Sep-Dec 2025',
    heading: 'KubeRocketCI Platform Integration',
    status: 'progress',
    badge: 'EXECUTING',
    description:
      'Integrating KubeRocketAI directly into the KubeRocketCI platform, transforming it into an AI-powered DevOps ecosystem. This integration enables developers to leverage AI agents natively within their CI/CD workflows.',
    descriptionWithLink: true,
    items: [
      '🚀 Native KubeRocketAI integration into KubeRocketCI platform core',
      '🚀 AI agents embedded in CI/CD pipeline execution and monitoring',
      '🚀 Automated code quality and security analysis via integrated AI',
      '🚀 Smart deployment recommendations and infrastructure optimization',
      '🚀 Unified developer experience: AI-powered DevOps in single platform',
    ],
    icon: 'Rocket',
  },
  {
    title: 'Jan - Apr 2026',
    period: 'Dec 2025-Mar 2026',
    heading: 'Market Deployment',
    status: 'planned',
    badge: 'PLANNED',
    description:
      'Full market deployment with enterprise-grade features, community adoption, and strategic partnerships that establish KubeRocketAI as the industry standard.',
    items: [
      '🎯 500+ GitHub stars demonstrating community adoption',
      '🎯 3+ development teams using AI-enabled KubeRocketCI platform',
      '🎯 3 major partnership integrations with complementary DevOps tools',
    ],
    icon: 'Target',
  },
] as const;

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

export const BASE_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://krci-ai.kuberocketci.io'
    : 'http://localhost:3000';
