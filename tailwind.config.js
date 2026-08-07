/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cinnamon: {
          DEFAULT: '#4A2E1B',
          dark: '#362113',
          light: '#623D24',
          subtle: '#F4ECE6',
        },
        turmeric: {
          DEFAULT: '#D49A37',
          hover: '#B88228',
          light: '#FDF4E3',
          gold: '#E5A93C',
        },
        sage: {
          DEFAULT: '#4A6B53',
          dark: '#354E3C',
          light: '#E9F0EA',
        },
        linen: {
          DEFAULT: '#FAF6F0',
          dark: '#F2EAE0',
        },
        ivory: {
          DEFAULT: '#F4EFE6',
          pure: '#FFFFFF',
        },
        roast: {
          DEFAULT: '#221C16',
          muted: '#5A4F44',
          light: '#8C7E70',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'warm-sm': '0 2px 8px rgba(74, 46, 27, 0.06)',
        'warm-md': '0 4px 20px rgba(74, 46, 27, 0.08)',
        'warm-lg': '0 12px 32px rgba(74, 46, 27, 0.12)',
        'glow-gold': '0 0 20px rgba(212, 154, 55, 0.35)',
      }
    },
  },
  plugins: [],
}
