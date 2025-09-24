/**
 * Standardized component interfaces
 * Eliminates repeated prop type definitions
 */
import type { ReactNode } from 'react';

// Minimal shared base props actually consumed by themed components
export interface BaseThemedProps {
  children: ReactNode;
  className?: string;
}

// Size variant used by button / badge
export type SizeVariant = 'sm' | 'default' | 'lg';

// State variant only needed where imported (badge)
export type StateVariant = 'success' | 'warning' | 'error' | 'info';

// CommonVariant reduced to only what is in real usage (button / badge / text)
export type CommonVariant = 'primary' | 'secondary' | 'accent' | 'muted';
