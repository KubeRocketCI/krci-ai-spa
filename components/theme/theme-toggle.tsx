'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { ThemedButton } from '@/components/ui/themed-button';

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Return a placeholder with the same dimensions to prevent layout shift
    return (
      <ThemedButton variant="ghost" size="sm" className="w-9 h-9">
        <span className="sr-only">Toggle theme</span>
      </ThemedButton>
    );
  }

  return (
    <ThemedButton
      variant="ghost"
      size="sm"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="w-9 h-9"
    >
      {theme === 'dark' ? (
        <Sun className="h-4 w-4 text-yellow-500 dark:text-yellow-400" />
      ) : (
        <Moon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
      )}
      <span className="sr-only">Toggle theme</span>
    </ThemedButton>
  );
}
