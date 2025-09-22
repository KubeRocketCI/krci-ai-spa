import { useState, useEffect } from 'react';

/**
 * Custom hook for debouncing a value
 *
 * This hook delays updating the debounced value until after the specified
 * delay has passed since the last time the input value changed.
 *
 * @param value - The value to debounce
 * @param delay - The delay in milliseconds (default: 300)
 * @returns The debounced value
 *
 * @example
 * ```typescript
 * function SearchComponent() {
 *   const [searchQuery, setSearchQuery] = useState('');
 *   const debouncedQuery = useDebouncedValue(searchQuery, 300);
 *
 *   useEffect(() => {
 *     // This effect runs only when debouncedQuery changes
 *     performSearch(debouncedQuery);
 *   }, [debouncedQuery]);
 *
 *   return (
 *     <input
 *       value={searchQuery}
 *       onChange={e => setSearchQuery(e.target.value)}
 *     />
 *   );
 * }
 * ```
 */
export function useDebouncedValue<T>(value: T, delay: number = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}
