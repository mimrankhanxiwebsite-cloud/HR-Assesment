import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './index.html',
    './src/**/*.{ts,tsx,js,jsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: '#F8FAFC',
        foreground: '#0F172A',
        primary: {
          DEFAULT: '#2563EB',
          foreground: '#FFFFFF',
        },
        secondary: {
          DEFAULT: '#4F46E5',
          foreground: '#FFFFFF',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: '#10B981',
          foreground: '#FFFFFF',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: '#FFFFFF',
          foreground: '#0F172A',
        },
        // Platform custom colors
        brand: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563EB', // Primary
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554',
        },
        emerald: {
          50:  '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10B981', // Accent
          600: '#059669',
          700: '#047857',
        },
        indigo: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4F46E5', // Secondary
          700: '#4338ca',
          800: '#3730a3',
        },
      },
      borderRadius: {
        lg: '16px',
        xl: '24px',
        md: '12px',
        sm: '8px',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      keyframes: {
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        'float-delayed': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        'fade-in': {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float-delayed 7s ease-in-out infinite 2s',
        'fade-in': 'fade-in 0.3s ease-out',
      },
      backgroundImage: {
        'hero-mesh': 'radial-gradient(at 40% 20%, hsla(221,100%,70%,0.2) 0px, transparent 50%), radial-gradient(at 80% 0%, hsla(245,100%,70%,0.15) 0px, transparent 50%), radial-gradient(at 0% 50%, hsla(160,100%,70%,0.15) 0px, transparent 50%)',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(37, 99, 235, 0.1), inset 0 1px 0 rgba(255,255,255,0.4)',
        'floating': '0 20px 40px -10px rgba(37, 99, 235, 0.15)',
      },
    },
  },
  plugins: [],
}

export default config
