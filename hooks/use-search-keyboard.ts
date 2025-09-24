import { useEffect } from 'react';
import type { RefObject } from 'react';

/**
 * Configuration options for search keyboard shortcuts
 */
interface SearchKeyboardOptions {
  /** Whether the search input is currently focused */
  isFocused: boolean;
  /** Function to call when clearing filters/search */
  onClearFilters?: () => void;
}

/**
 * Custom hook for managing keyboard shortcuts in search components
 *
 * Handles common keyboard interactions for search functionality:
 * - Ctrl/Cmd+K to focus search input
 * - Escape to blur search input when focused
 *
 * @param searchInputRef - React ref to the search input element
 * @param options - Configuration options for keyboard behavior
 *
 * @example
 * ```typescript
 * function SearchComponent() {
 *   const searchInputRef = useRef<HTMLInputElement>(null);
 *   const [isFocused, setIsFocused] = useState(false);
 *
 *   useSearchKeyboard(searchInputRef, {
 *     isFocused,
 *     onClearFilters: () => {
 *       setQuery('');
 *       setCategory('all');
 *     }
 *   });
 *
 *   return (
 *     <input
 *       ref={searchInputRef}
 *       onFocus={() => setIsFocused(true)}
 *       onBlur={() => setIsFocused(false)}
 *     />
 *   );
 * }
 * ```
 */
export function useSearchKeyboard(
  searchInputRef: RefObject<HTMLInputElement | null>,
  options: SearchKeyboardOptions,
): void {
  const { isFocused, onClearFilters } = options;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl/Cmd+K to focus search input
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
        return;
      }

      // Escape to blur search input when focused
      if (e.key === 'Escape' && isFocused) {
        searchInputRef.current?.blur();
        return;
      }

      // Additional shortcuts can be added here
      // For example: Ctrl/Cmd+Shift+K to clear filters
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'K') {
        e.preventDefault();
        onClearFilters?.();
        searchInputRef.current?.focus();
        return;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isFocused, searchInputRef, onClearFilters]);
}
