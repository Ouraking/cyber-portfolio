/** @type {import('tailwindcss').Config} */

/**
 * TAILWIND CONFIGURATION — Cybersecurity Portfolio
 * Theme: "Modern Terminal / Blue Team"
 * Palette: Slate-950 base, Emerald & Cyan accents
 * No gimmicky hacker tropes — clean SaaS-grade clarity.
 */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // ─── Color System ───────────────────────────────────────────────────────
      colors: {
        surface: {
          DEFAULT: '#020617',  // slate-950  — base canvas
          card:    '#0f172a',  // slate-900  — card backgrounds
          border:  '#1e293b',  // slate-800  — subtle borders
          muted:   '#334155',  // slate-700  — muted elements
        },
        accent: {
          // Primary accent — emerald (Blue Team)
          DEFAULT:  '#10b981',  // emerald-500
          dim:      '#064e3b',  // emerald-900 — subtle fills
          bright:   '#34d399',  // emerald-400 — highlights
          // Secondary accent — cyan (Terminal/OSINT)
          cyan:     '#22d3ee',  // cyan-400
          'cyan-dim': '#164e63',  // cyan-900
          // Red — Offensive / Pentesting
          red:      '#f87171',  // red-400
          'red-dim': '#450a0a',  // red-950
        },
        text: {
          primary:  '#f1f5f9',  // slate-100
          secondary:'#94a3b8',  // slate-400
          muted:    '#475569',  // slate-600
        },
      },

      // ─── Typography ─────────────────────────────────────────────────────────
      fontFamily: {
        // Display: geometric sans — refined, not stereotypical "hacker"
        display: ['var(--font-space-grotesk)', 'system-ui', 'sans-serif'],
        // Body: clean readability
        body:    ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
        // Mono: terminal elements, code snippets
        mono:    ['var(--font-jetbrains-mono)', 'Courier New', 'monospace'],
      },

      // ─── Animations ─────────────────────────────────────────────────────────
      keyframes: {
        'fade-up': {
          '0%':   { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0' },
        },
        scan: {
          '0%':   { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        'pulse-border': {
          '0%, 100%': { borderColor: 'rgba(16,185,129,0.3)' },
          '50%':      { borderColor: 'rgba(16,185,129,0.8)' },
        },
        'slide-in-left': {
          '0%':   { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
      animation: {
        'fade-up':        'fade-up 0.6s ease-out forwards',
        'fade-in':        'fade-in 0.4s ease-out forwards',
        'blink':          'blink 1s step-end infinite',
        'scan':           'scan 8s linear infinite',
        'pulse-border':   'pulse-border 2s ease-in-out infinite',
        'slide-in-left':  'slide-in-left 0.5s ease-out forwards',
      },

      // ─── Spacing & Sizing ───────────────────────────────────────────────────
      maxWidth: {
        container: '1200px',
      },
      backgroundImage: {
        // Subtle grid pattern — professional, not gaudy
        'grid-pattern': `linear-gradient(rgba(16,185,129,0.03) 1px, transparent 1px),
                         linear-gradient(90deg, rgba(16,185,129,0.03) 1px, transparent 1px)`,
        // Radial glow for hero
        'hero-glow':    'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(16,185,129,0.15), transparent)',
        'card-glow':    'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(16,185,129,0.08), transparent)',
      },
      backgroundSize: {
        'grid': '32px 32px',
      },
      boxShadow: {
        'emerald-glow': '0 0 20px rgba(16,185,129,0.15), 0 0 60px rgba(16,185,129,0.05)',
        'card':         '0 4px 6px -1px rgba(0,0,0,0.5), 0 2px 4px -2px rgba(0,0,0,0.3)',
        'card-hover':   '0 20px 40px rgba(0,0,0,0.5), 0 0 20px rgba(16,185,129,0.1)',
      },
    },
  },
  plugins: [],
};
