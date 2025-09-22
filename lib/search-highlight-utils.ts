import React, { ReactNode } from 'react';

/**
 * Configuration for text highlighting
 */
export interface HighlightConfig {
  /** Whether highlighting is enabled */
  enabled?: boolean;
  /** CSS classes for highlighted text */
  highlightClass?: string;
  /** Case sensitive matching */
  caseSensitive?: boolean;
  /** Maximum number of highlights per text */
  maxHighlights?: number;
}

/**
 * Default highlighting configuration
 */
export const DEFAULT_HIGHLIGHT_CONFIG: Required<HighlightConfig> = {
  enabled: true,
  highlightClass: 'bg-yellow-200 dark:bg-yellow-900/40 px-1 rounded',
  caseSensitive: false,
  maxHighlights: 10,
};

/**
 * Highlight search terms in text content
 *
 * @param text - The text to highlight
 * @param searchQuery - The search query to highlight
 * @param config - Configuration options for highlighting
 * @returns JSX elements with highlighted terms
 *
 * @example
 * ```typescript
 * const highlighted = highlightSearchTerms(
 *   "This is a sample text",
 *   "sample",
 *   { highlightClass: "bg-yellow-200" }
 * );
 * ```
 */
export function highlightSearchTerms(
  text: string,
  searchQuery: string,
  config: HighlightConfig = {},
): ReactNode[] {
  const finalConfig = { ...DEFAULT_HIGHLIGHT_CONFIG, ...config };

  // Return original text if highlighting is disabled or no query
  if (!finalConfig.enabled || !searchQuery?.trim() || !text) {
    return [text];
  }

  const query = finalConfig.caseSensitive ? searchQuery.trim() : searchQuery.trim().toLowerCase();
  const searchText = finalConfig.caseSensitive ? text : text.toLowerCase();

  // Find all matches
  const matches: Array<{ start: number; end: number }> = [];
  let searchIndex = 0;
  let matchCount = 0;

  while (searchIndex < searchText.length && matchCount < finalConfig.maxHighlights) {
    const index = searchText.indexOf(query, searchIndex);
    if (index === -1) break;

    matches.push({
      start: index,
      end: index + query.length,
    });

    searchIndex = index + query.length;
    matchCount++;
  }

  // If no matches found, return original text
  if (matches.length === 0) {
    return [text];
  }

  // Build result with highlighted parts
  const result: ReactNode[] = [];
  let lastIndex = 0;

  matches.forEach((match, index) => {
    // Add text before the match
    if (match.start > lastIndex) {
      result.push(text.slice(lastIndex, match.start));
    }

    // Add highlighted match
    const matchText = text.slice(match.start, match.end);
    result.push(
      React.createElement(
        'span',
        {
          key: `highlight-${index}`,
          className: finalConfig.highlightClass,
          'data-testid': 'search-highlight',
        },
        matchText,
      ),
    );

    lastIndex = match.end;
  });

  // Add remaining text after last match
  if (lastIndex < text.length) {
    result.push(text.slice(lastIndex));
  }

  return result;
}

/**
 * Create a highlight-aware text component
 *
 * @param text - The text content
 * @param searchQuery - Current search query
 * @param config - Highlighting configuration
 * @returns React component with highlighted text
 *
 * @example
 * ```typescript
 * function SearchResult({ item, searchQuery }) {
 *   return (
 *     <div>
 *       <h3>{createHighlightedText(item.title, searchQuery)}</h3>
 *       <p>{createHighlightedText(item.description, searchQuery)}</p>
 *     </div>
 *   );
 * }
 * ```
 */
export function createHighlightedText(
  text: string,
  searchQuery: string,
  config: HighlightConfig = {},
): ReactNode {
  const highlightedParts = highlightSearchTerms(text, searchQuery, config);

  // If only one part and it's a string, return as-is
  if (highlightedParts.length === 1 && typeof highlightedParts[0] === 'string') {
    return highlightedParts[0];
  }

  // Return as React fragment for multiple parts
  return React.createElement(React.Fragment, {}, ...highlightedParts);
}

/**
 * Extract text content for search highlighting
 *
 * Useful for extracting plain text from complex content for highlighting.
 *
 * @param content - Content that may contain markdown or HTML
 * @returns Plain text suitable for highlighting
 */
export function extractTextForHighlighting(content: string): string {
  return (
    content
      // Remove markdown bold/italic
      .replace(/\*\*(.*?)\*\*/g, '$1')
      .replace(/\*(.*?)\*/g, '$1')

      // Remove markdown headers
      .replace(/^#{1,6}\s+/gm, '')

      // Remove code blocks (keep content)
      .replace(/```[\s\S]*?```/g, match => {
        const codeContent = match.replace(/```[\w]*\n?/g, '').replace(/```$/g, '');
        return codeContent.trim();
      })

      // Remove inline code backticks
      .replace(/`([^`]+)`/g, '$1')

      // Remove markdown links (keep text)
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')

      // Clean up whitespace
      .replace(/\s+/g, ' ')
      .trim()
  );
}

/**
 * Check if text contains search terms for highlighting
 *
 * @param text - Text to check
 * @param searchQuery - Search query
 * @param caseSensitive - Whether to use case sensitive matching
 * @returns True if text contains search terms
 */
export function shouldHighlight(
  text: string,
  searchQuery: string,
  caseSensitive: boolean = false,
): boolean {
  if (!searchQuery?.trim() || !text) return false;

  const query = caseSensitive ? searchQuery.trim() : searchQuery.trim().toLowerCase();
  const searchText = caseSensitive ? text : text.toLowerCase();

  return searchText.includes(query);
}
