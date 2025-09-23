/**
 * Runtime Category Validation Utilities
 */

import type { Categorizable, CategoryValidationResult } from './category-management';
import { ContentType } from './content-types';

/**
 * Validation rule interface for extensible validation logic
 */
export interface ValidationRule {
  /** Rule identifier */
  id: string;
  /** Human-readable description */
  description: string;
  /** Validation function */
  validate: (categories: string[]) => ValidationResult;
  /** Rule severity level */
  severity: 'error' | 'warning' | 'info';
}

/**
 * Individual validation result
 */
export interface ValidationResult {
  /** Whether the validation passed */
  passed: boolean;
  /** Validation message */
  message?: string;
  /** Suggested fix if available */
  suggestion?: string;
}

/**
 * Comprehensive validation report
 */
export interface CategoryValidationReport extends CategoryValidationResult {
  /** Individual rule results */
  ruleResults: Array<{
    rule: ValidationRule;
    result: ValidationResult;
  }>;
  /** Performance metrics */
  performance: {
    validationTimeMs: number;
    rulesExecuted: number;
  };
}

/**
 * Content-specific validation configuration
 */
export interface ContentValidationConfig {
  /** Content type */
  contentType: ContentType;
  /** Allowed categories for this content type */
  allowedCategories?: string[];
  /** Required categories */
  requiredCategories?: string[];
  /** Maximum number of categories */
  maxCategories?: number;
  /** Minimum number of categories */
  minCategories?: number;
  /** Custom validation rules */
  customRules?: ValidationRule[];
}

/**
 * Default validation rules
 */
export const DEFAULT_VALIDATION_RULES: ValidationRule[] = [
  {
    id: 'not-empty',
    description: 'Categories array should not be empty',
    severity: 'warning',
    validate: (categories: string[]) => ({
      passed: categories.length > 0,
      message: categories.length === 0 ? 'No categories specified' : undefined,
      suggestion: 'Add at least one category to improve discoverability',
    }),
  },
  {
    id: 'no-duplicates',
    description: 'Categories should not contain duplicates',
    severity: 'error',
    validate: (categories: string[]) => {
      const unique = new Set(categories);
      const hasDuplicates = unique.size !== categories.length;
      return {
        passed: !hasDuplicates,
        message: hasDuplicates ? 'Duplicate categories found' : undefined,
        suggestion: 'Remove duplicate categories',
      };
    },
  },
  {
    id: 'valid-format',
    description: 'Categories should be properly formatted',
    severity: 'error',
    validate: (categories: string[]) => {
      const invalidCategories = categories.filter(
        cat =>
          typeof cat !== 'string' ||
          cat.trim() === '' ||
          cat.trim() !== cat ||
          /[^a-zA-Z0-9\s-]/.test(cat),
      );
      return {
        passed: invalidCategories.length === 0,
        message:
          invalidCategories.length > 0
            ? `Invalid categories: ${invalidCategories.join(', ')}`
            : undefined,
        suggestion:
          'Categories should be non-empty strings with only letters, numbers, spaces, and hyphens',
      };
    },
  },
  {
    id: 'reasonable-length',
    description: 'Category names should be reasonably short',
    severity: 'warning',
    validate: (categories: string[]) => {
      const longCategories = categories.filter(cat => cat.length > 50);
      return {
        passed: longCategories.length === 0,
        message:
          longCategories.length > 0
            ? `Overly long categories: ${longCategories.join(', ')}`
            : undefined,
        suggestion: 'Consider shorter, more concise category names',
      };
    },
  },
  {
    id: 'title-case',
    description: 'Categories should use proper title case',
    severity: 'info',
    validate: (categories: string[]) => {
      const incorrectCase = categories.filter(cat => {
        const titleCase = cat
          .split(' ')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
          .join(' ');
        return cat !== titleCase;
      });
      return {
        passed: incorrectCase.length === 0,
        message:
          incorrectCase.length > 0
            ? `Non-title-case categories: ${incorrectCase.join(', ')}`
            : undefined,
        suggestion: 'Use title case for better consistency (e.g., "Project Management")',
      };
    },
  },
];

/**
 * Content-specific validation configurations
 */
export const CONTENT_VALIDATION_CONFIGS: Record<ContentType, ContentValidationConfig> = {
  [ContentType.AGENT]: {
    contentType: ContentType.AGENT,
    allowedCategories: [
      'Development',
      'Testing',
      'Architecture',
      'DevOps',
      'Security',
      'Product Management',
      'Project Management',
      'Analysis',
      'Design',
      'Documentation',
      'Marketing',
      'Sales',
      'Support',
    ],
    minCategories: 1,
    maxCategories: 3,
  },
  [ContentType.TEMPLATE]: {
    contentType: ContentType.TEMPLATE,
    allowedCategories: [
      'Analysis',
      'Architecture',
      'Framework Core',
      'Marketing',
      'Product',
      'Project Management',
      'Testing',
      'Documentation',
      'Development',
      'Process',
      'Planning',
      'Reporting',
    ],
    minCategories: 1,
    maxCategories: 4,
  },
  [ContentType.DATA]: {
    contentType: ContentType.DATA,
    allowedCategories: [
      'Analysis',
      'Architecture',
      'Development',
      'Framework Core',
      'Management',
      'Product',
      'Testing',
      'Standards',
      'Best Practices',
      'Methodologies',
      'Principles',
      'Guidelines',
    ],
    minCategories: 1,
    maxCategories: 3,
  },
  [ContentType.TASK]: {
    contentType: ContentType.TASK,
    allowedCategories: [
      'Development',
      'Testing',
      'Deployment',
      'Analysis',
      'Setup',
      'Configuration',
      'Integration',
      'Automation',
      'Validation',
      'Documentation',
      'Maintenance',
    ],
    minCategories: 1,
    maxCategories: 2,
  },
};

/**
 * Enhanced Category Validator Class
 * Provides comprehensive validation with configurable rules
 */
export class CategoryValidator {
  private rules: ValidationRule[];
  private config?: ContentValidationConfig;

  constructor(
    rules: ValidationRule[] = DEFAULT_VALIDATION_RULES,
    config?: ContentValidationConfig,
  ) {
    this.rules = [...rules];
    this.config = config;

    // Add content-specific rules if config is provided
    if (config) {
      this.addContentSpecificRules(config);
    }
  }

  /**
   * Add content-specific validation rules
   */
  private addContentSpecificRules(config: ContentValidationConfig): void {
    // Add allowed categories rule
    if (config.allowedCategories) {
      this.rules.push({
        id: 'allowed-categories',
        description: `Categories must be from allowed list for ${config.contentType}`,
        severity: 'error',
        validate: (categories: string[]) => {
          const disallowed = categories.filter(cat => !config.allowedCategories!.includes(cat));
          return {
            passed: disallowed.length === 0,
            message:
              disallowed.length > 0 ? `Disallowed categories: ${disallowed.join(', ')}` : undefined,
            suggestion: `Use only allowed categories: ${config.allowedCategories!.join(', ')}`,
          };
        },
      });
    }

    // Add required categories rule
    if (config.requiredCategories) {
      this.rules.push({
        id: 'required-categories',
        description: `Must include required categories for ${config.contentType}`,
        severity: 'error',
        validate: (categories: string[]) => {
          const missing = config.requiredCategories!.filter(req => !categories.includes(req));
          return {
            passed: missing.length === 0,
            message:
              missing.length > 0 ? `Missing required categories: ${missing.join(', ')}` : undefined,
            suggestion: `Include required categories: ${missing.join(', ')}`,
          };
        },
      });
    }

    // Add count validation rules
    if (config.minCategories !== undefined) {
      this.rules.push({
        id: 'min-categories',
        description: `Must have at least ${config.minCategories} categories`,
        severity: 'warning',
        validate: (categories: string[]) => ({
          passed: categories.length >= config.minCategories!,
          message:
            categories.length < config.minCategories!
              ? `Too few categories (${categories.length} < ${config.minCategories})`
              : undefined,
          suggestion: `Add more categories (minimum: ${config.minCategories})`,
        }),
      });
    }

    if (config.maxCategories !== undefined) {
      this.rules.push({
        id: 'max-categories',
        description: `Must have at most ${config.maxCategories} categories`,
        severity: 'warning',
        validate: (categories: string[]) => ({
          passed: categories.length <= config.maxCategories!,
          message:
            categories.length > config.maxCategories!
              ? `Too many categories (${categories.length} > ${config.maxCategories})`
              : undefined,
          suggestion: `Reduce number of categories (maximum: ${config.maxCategories})`,
        }),
      });
    }

    // Add custom rules
    if (config.customRules) {
      this.rules.push(...config.customRules);
    }
  }

  /**
   * Validate categories with comprehensive reporting
   */
  validate(categories: string[]): CategoryValidationReport {
    const startTime = performance.now();
    const ruleResults: CategoryValidationReport['ruleResults'] = [];
    const errors: string[] = [];
    const warnings: string[] = [];

    // Execute all validation rules
    for (const rule of this.rules) {
      const result = rule.validate(categories);
      ruleResults.push({ rule, result });

      if (!result.passed && result.message) {
        if (rule.severity === 'error') {
          errors.push(result.message);
        } else if (rule.severity === 'warning') {
          warnings.push(result.message);
        }
      }
    }

    const endTime = performance.now();

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
      ruleResults,
      performance: {
        validationTimeMs: endTime - startTime,
        rulesExecuted: this.rules.length,
      },
    };
  }

  /**
   * Quick validation - returns only basic result
   */
  validateQuick(categories: string[]): CategoryValidationResult {
    const report = this.validate(categories);
    return {
      isValid: report.isValid,
      errors: report.errors,
      warnings: report.warnings,
    };
  }

  /**
   * Validate a content item's categories
   */
  validateContent<T extends Categorizable>(content: T): CategoryValidationReport {
    return this.validate(content.categories || []);
  }

  /**
   * Add a custom validation rule
   */
  addRule(rule: ValidationRule): void {
    this.rules.push(rule);
  }

  /**
   * Remove a validation rule by ID
   */
  removeRule(ruleId: string): boolean {
    const initialLength = this.rules.length;
    this.rules = this.rules.filter(rule => rule.id !== ruleId);
    return this.rules.length < initialLength;
  }

  /**
   * Get all validation rules
   */
  getRules(): ValidationRule[] {
    return [...this.rules];
  }

  /**
   * Get content-specific configuration
   */
  getConfig(): ContentValidationConfig | undefined {
    return this.config;
  }
}

/**
 * Utility functions for quick validation
 */

/**
 * Create a validator for specific content type
 */
export function createContentValidator(contentType: ContentType): CategoryValidator {
  const config = CONTENT_VALIDATION_CONFIGS[contentType];
  return new CategoryValidator(DEFAULT_VALIDATION_RULES, config);
}

/**
 * Quick validation function
 */
export function validateCategories(
  categories: string[],
  contentType?: ContentType,
): CategoryValidationResult {
  const validator = contentType ? createContentValidator(contentType) : new CategoryValidator();

  return validator.validateQuick(categories);
}

/**
 * Validate multiple content items
 */
export function validateContentBatch<T extends Categorizable>(
  items: T[],
  contentType?: ContentType,
): Array<{ item: T; validation: CategoryValidationReport }> {
  const validator = contentType ? createContentValidator(contentType) : new CategoryValidator();

  return items.map(item => ({
    item,
    validation: validator.validateContent(item),
  }));
}

/**
 * Get validation summary for a batch of items
 */
export function getValidationSummary<T extends Categorizable>(
  validationResults: Array<{ item: T; validation: CategoryValidationReport }>,
): {
  totalItems: number;
  validItems: number;
  itemsWithErrors: number;
  itemsWithWarnings: number;
  totalErrors: number;
  totalWarnings: number;
  averageValidationTime: number;
} {
  const totalItems = validationResults.length;
  let validItems = 0;
  let itemsWithErrors = 0;
  let itemsWithWarnings = 0;
  let totalErrors = 0;
  let totalWarnings = 0;
  let totalValidationTime = 0;

  for (const { validation } of validationResults) {
    if (validation.isValid) {
      validItems++;
    }
    if (validation.errors.length > 0) {
      itemsWithErrors++;
      totalErrors += validation.errors.length;
    }
    if (validation.warnings.length > 0) {
      itemsWithWarnings++;
      totalWarnings += validation.warnings.length;
    }
    totalValidationTime += validation.performance.validationTimeMs;
  }

  return {
    totalItems,
    validItems,
    itemsWithErrors,
    itemsWithWarnings,
    totalErrors,
    totalWarnings,
    averageValidationTime: totalItems > 0 ? totalValidationTime / totalItems : 0,
  };
}
