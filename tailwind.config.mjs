/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        helveticaNeue: ["var(--font-helvetica-neue)", "sans-serif"],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        secondary: "var(--secondary)",
        tetriary: "var(--tetriary)",
        dark: "var(--dark)",
        placeholder: "var(--placeholder)",
      },
      fontSize: {
        logo: "var(--20-32)",
        title: "var(--44-104)",
        "title-md": "var(--26-60)",
        "title-sm": "var(--24-32)",
        "txt-sm": "var(--16-20)",
        "title-lg": "var(--24-64)",
        "title-card": "var(--30-38)",
      },
    },
  },
  plugins: [],
};
export default config;
