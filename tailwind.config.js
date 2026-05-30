/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Dark Mode Colors
        'erp-bg': 'var(--erp-bg)',
        'erp-sidebar': 'var(--erp-sidebar)',
        'erp-sidebar-text': 'var(--erp-sidebar-text)',
        'erp-sidebar-text-muted': 'var(--erp-sidebar-text-muted)',
        'erp-card': 'var(--erp-card)',
        'erp-text-main': 'var(--erp-text-main)',
        'erp-text-muted': 'var(--erp-text-muted)',
        'erp-accent': '#3b82f6',
        'erp-success': '#10b981',
        'erp-warning': '#f59e0b',
        'erp-danger': '#ef4444',
        'erp-border': 'var(--erp-border)',
      },
      backgroundImage: {
        'gradient-erp': 'linear-gradient(135deg, #1a2234 0%, #222d44 100%)',
      }
    },
  },
  plugins: [],
}
