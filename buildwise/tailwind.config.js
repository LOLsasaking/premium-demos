/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#050B14',
        panel: '#0B1422',
        panel2: '#101C2D',
        line: '#1D3048',
        blueprint: '#2F6BFF',
        cyan: '#22D3EE',
        build: '#22D3EE',
        mist: '#EAF2FC',
        muted: '#91A4BD',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      fontWeight: {
        300: '300',
        400: '400',
        500: '500',
        600: '600',
        700: '700',
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(59,130,246,.25), 0 20px 60px -20px rgba(59,130,246,.45)',
        soft: '0 20px 50px -24px rgba(0,0,0,.7)',
      },
      keyframes: {
        floaty: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-8px)' } },
        blink: { '0%,100%': { opacity: '.2' }, '50%': { opacity: '1' } },
      },
      animation: {
        floaty: 'floaty 6s ease-in-out infinite',
        blink: 'blink 1.2s infinite',
      },
    },
  },
  plugins: [],
}
