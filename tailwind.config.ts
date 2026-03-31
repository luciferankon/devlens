import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#050508',
        surface: '#0d0d14',
        surface2: '#13131e',
        border: '#1e1e2e',
        gold: '#f5c842',
        blue: '#4f8fff',
        green: '#3ecf8e',
        red: '#ff4f4f',
        muted: '#6b6b88',
        muted2: '#2e2e42',
        fore: '#f0f0f8',
      },
    },
  },
  plugins: [],
}

export default config
