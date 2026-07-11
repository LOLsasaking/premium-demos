/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0A0F1C',        // base background (deep architectural navy)
        panel: '#111827',      // raised panel
        panel2: '#161F31',     // secondary panel
        line: '#24304A',       // hairline borders
        blueprint: '#3B82F6',  // blueprint blue (primary accent)
        cyan: '#22D3EE',       // schematic cyan
        build: '#F59E0B',      // build amber (action / warmth)
        mist: '#E6EDF7',       // primary text
        muted: '#8DA0BF',      // secondary text
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
