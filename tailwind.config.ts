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
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
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
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        // Platform custom colors
        brand: {
          50:  'hsl(221, 100%, 97%)',
          100: 'hsl(221, 95%, 92%)',
          200: 'hsl(221, 90%, 84%)',
          300: 'hsl(221, 85%, 72%)',
          400: 'hsl(221, 80%, 60%)',
          500: 'hsl(221, 75%, 50%)',
          600: 'hsl(221, 75%, 42%)',
          700: 'hsl(221, 75%, 34%)',
          800: 'hsl(221, 75%, 26%)',
          900: 'hsl(221, 75%, 18%)',
          950: 'hsl(221, 80%, 10%)',
        },
        emerald: {
          50:  '#ecfdf5',
          500: '#10b981',
          600: '#059669',
        },
        violet: {
          50:  '#f5f3ff',
          500: '#8b5cf6',
          600: '#7c3aed',
        },
        amber: {
          50:  '#fffbeb',
          500: '#f59e0b',
          600: '#d97706',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'fade-in': {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in-right': {
          from: { opacity: '0', transform: 'translateX(20px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        'scale-in': {
          from: { opacity: '0', transform: 'scale(0.95)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
        shimmer: {
          from: { backgroundPosition: '0 0' },
          to: { backgroundPosition: '-200% 0' },
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        'spin-slow': {
          to: { transform: 'rotate(360deg)' },
        },
        'bounce-light': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 8px hsl(221, 75%, 50%, 0.3)' },
          '50%': { boxShadow: '0 0 20px hsl(221, 75%, 50%, 0.6)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fade-in 0.3s ease-out',
        'slide-in-right': 'slide-in-right 0.3s ease-out',
        'scale-in': 'scale-in 0.2s ease-out',
        shimmer: 'shimmer 2s linear infinite',
        'spin-slow': 'spin-slow 3s linear infinite',
        'bounce-light': 'bounce-light 2s ease-in-out infinite',
        glow: 'glow 2s ease-in-out infinite',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'hero-mesh': 'radial-gradient(at 40% 20%, hsla(221,75%,50%,0.15) 0px, transparent 50%), radial-gradient(at 80% 0%, hsla(265,75%,60%,0.1) 0px, transparent 50%), radial-gradient(at 0% 50%, hsla(200,75%,50%,0.1) 0px, transparent 50%)',
      },
      boxShadow: {
        'brand-sm': '0 1px 3px 0 hsl(221, 75%, 50%, 0.2)',
        'brand-md': '0 4px 12px 0 hsl(221, 75%, 50%, 0.25)',
        'brand-lg': '0 8px 24px 0 hsl(221, 75%, 50%, 0.3)',
        glass: '0 4px 32px 0 rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.08)',
      },
    },
  },
  plugins: [],
}

export default config
