/** @type {import('tailwindcss').Config} */
export default {
    darkMode: "class", // enables dark mode with class strategy
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          primary: {
            light: "#6366F1", // example purple
            DEFAULT: "#4F46E5",
            dark: "#4338CA",
          },
          background: {
            light: "#FFFFFF",
            dark: "#0F172A",
          },
          text: {
            light: "#1E293B",
            dark: "#F8FAFC",
          },
        },
      },
    },
    plugins: [],
  }
  