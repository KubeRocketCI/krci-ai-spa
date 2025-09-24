import type { Config } from 'tailwindcss';

// Tailwind design surface aligned with existing CSS custom properties and terminal aesthetic.
// KEEPING look/feel identical: utilities still resolve to existing CSS variables via globals.css.
// This file formalizes content scanning and provides a place to consolidate future tokens
// instead of scattering ad-hoc objects.
const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{ts,tsx,js,jsx}',
    './components/**/*.{ts,tsx,js,jsx}',
    './lib/**/*.{ts,tsx,js,jsx}',
    './hooks/**/*.{ts,tsx,js,jsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: 'var(--font-inter)',
        mono: 'var(--font-jetbrains-mono)',
      },
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        card: 'var(--card)',
        'card-foreground': 'var(--card-foreground)',
        popover: 'var(--popover)',
        'popover-foreground': 'var(--popover-foreground)',
        primary: 'var(--primary)',
        'primary-foreground': 'var(--primary-foreground)',
        secondary: 'var(--secondary)',
        'secondary-foreground': 'var(--secondary-foreground)',
        muted: 'var(--muted)',
        'muted-foreground': 'var(--muted-foreground)',
        accent: 'var(--accent)',
        'accent-foreground': 'var(--accent-foreground)',
        destructive: 'var(--destructive)',
        'destructive-foreground': 'var(--destructive-foreground)',
        border: 'var(--border)',
        input: 'var(--input)',
        ring: 'var(--ring)',
        sidebar: 'var(--sidebar)',
        'sidebar-foreground': 'var(--sidebar-foreground)',
        'sidebar-primary': 'var(--sidebar-primary)',
        'sidebar-primary-foreground': 'var(--sidebar-primary-foreground)',
        'sidebar-accent': 'var(--sidebar-accent)',
        'sidebar-accent-foreground': 'var(--sidebar-accent-foreground)',
        'sidebar-border': 'var(--sidebar-border)',
        'sidebar-ring': 'var(--sidebar-ring)',
      },
      boxShadow: {
        'terminal-light': '0 2px 8px rgba(8,145,178,0.12), 0 8px 24px rgba(16,185,129,0.06)',
        'terminal-dark': '0 2px 8px rgba(6,182,212,0.15), 0 8px 24px rgba(34,197,94,0.08)',
      },
      backgroundImage: {
        'terminal-light': 'linear-gradient(135deg,#f0f9ff 0%,#e0f2fe 100%)',
        'terminal-dark': 'linear-gradient(135deg,#1a1a1a 0%,#0a0a0a 100%)',
      },
      keyframes: {
        blink: {
          '0%,50%': { opacity: '1' },
          '51%,100%': { opacity: '0' },
        },
        aurora: {
          from: { backgroundPosition: '50% 50%, 50% 50%' },
          to: { backgroundPosition: '350% 50%, 350% 50%' },
        },
      },
      animation: {
        blink: 'blink 1s infinite',
        aurora: 'aurora 60s linear infinite',
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        DEFAULT: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
      },
    },
  },
  plugins: [],
};

export default config;
