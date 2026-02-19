/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        twilight: '#3223BD',
        'design-black': '#1C1C1C',
        'pale-purple': '#D9DCF8',
        'light-grey': '#F3F3F3',
        'purple-pop': '#CC8BFA',
        'teal-pop': '#3EC5BB',
        'persimmon-pop': '#FC5848',
        'purple-tint': '#EBD1FD',
        'teal-tint': '#B2E9E4',
        'persimmon-tint': '#F9D5D0',
      },
      fontFamily: {
        'carbona': ['Carbona', 'system-ui', 'sans-serif'],
        'nunito': ['Nunito Sans', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
