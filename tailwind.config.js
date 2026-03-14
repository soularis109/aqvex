/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        aqxBlue: '#2A6CFF',
        aqxBlueLight: '#E6F0FF',
        aqxTextPrimary: '#1B2533',
        aqxTextSecondary: '#6B7280',
        aqxBorder: '#E5E7EB',
        aqxBg: '#F5F7FB',
        aqxDiscount: '#FF3B30',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 16px 40px rgba(15, 23, 42, 0.08)',
      },
      borderRadius: {
        card: '24px',
      },
    },
  },
  plugins: [],
}
