import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: "#009688",
        secondary: "#8bc34a",
        accent: "#cddc39",
        error: "#4caf50",
        warning: "#00bcd4",
        info: "#03a9f4",
        success: "#3f51b5",
        darkser: "#2d3436",
        ser: "#1E5128",
        lightser: "#4E9F3D",
        whiteser: "#D8E9A8",
      },
    },
  },
  
  plugins: [],
}
export default config
