/**
 * Standardized component interfaces
 * Eliminates repeated prop type definitions
 */
import type { ReactNode } from 'react';

// Base props shared by ALL themed components
export interface BaseThemedProps {
  children: ReactNode;
  className?: string;
}

// Common variant types used across components
export type CommonVariant = 'primary' | 'secondary' | 'accent' | 'muted';
export type ButtonVariant = CommonVariant | 'outline' | 'ghost';
export type StateVariant = 'success' | 'warning' | 'error' | 'info';
export type SizeVariant = 'sm' | 'default' | 'lg';

// Frequently repeated prop combinations
export interface ThemedComponentProps extends BaseThemedProps {
  variant?: CommonVariant;
  size?: SizeVariant;
}

export interface ThemedTextProps extends BaseThemedProps {
  variant?: CommonVariant | 'lead' | 'body' | 'caption' | 'date';
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl';
  as?: 'p' | 'span' | 'div' | 'small';
}

export interface ThemedCardProps extends BaseThemedProps {
  variant?: 'feature' | 'terminal' | 'highlight' | 'glass';
  onClick?: () => void;
}

// Badge props used across multiple components
export interface ThemedBadgeProps extends BaseThemedProps {
  variant?: CommonVariant | StateVariant;
  size?: SizeVariant;
}
