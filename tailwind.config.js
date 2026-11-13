/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // WARNA UTAMA: Hijau Rempah Herbal (Deep Organic Herb Green - tidak terlalu terang)
        cinnamon: {
          DEFAULT: '#1E3F2D', // Hijau Rempah Utama
          dark: '#142A1E',    // Hijau Rempah Tua (Hutan & Daun Kering)
          light: '#2E5B42',   // Hijau Daun Rempah Segar
          subtle: '#E8F2EC',  // Latar Halus Herbal
        },
        rempah: {
          DEFAULT: '#1E3F2D', // Hijau Rempah Utama
          dark: '#142A1E',    // Hijau Rempah Tua
          light: '#2E5B42',   // Hijau Daun Rempah
          subtle: '#E8F2EC',
        },
        // WARNA SEKUNDER: Coklat Rempah / Kayu Manis (Warm Cinnamon Bark)
        brown: {
          DEFAULT: '#684126', // Coklat Kayu Manis Hangat
          dark: '#482B16',    // Coklat Sangrai Tua
          light: '#885834',   // Coklat Rempah Hangat
          subtle: '#F6EFEB',  // Krem Coklat Lembut
        },
        turmeric: {
          DEFAULT: '#D49A37',
          hover: '#B88228',
          light: '#FDF4E3',
          gold: '#E5A93C',
        },
        sage: {
          DEFAULT: '#2E5B42',
          dark: '#142A1E',
          light: '#E6EFE9',
        },
        linen: {
          DEFAULT: '#FAF7F2',
          dark: '#F0ECE4',
        },
        ivory: {
          DEFAULT: '#F5F1E8',
          pure: '#FFFFFF',
        },
        roast: {
          DEFAULT: '#1A241E',
          muted: '#4A584E',
          light: '#7A8C80',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'warm-sm': '0 2px 8px rgba(20, 42, 30, 0.08)',
        'warm-md': '0 4px 20px rgba(20, 42, 30, 0.12)',
        'warm-lg': '0 12px 32px rgba(20, 42, 30, 0.18)',
        'glow-gold': '0 0 20px rgba(212, 154, 55, 0.35)',
      }
    },
  },
  plugins: [],
}
