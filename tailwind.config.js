/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'gray-1' : '#E5E5E5',
        'gray-2' : '#DCDDEC',
        'gray-3' : '#F4F8FA',
        'blue' : '#1B31A8',
        'sky' : '#0079FF',
        'black' : '#1E2A32'
      }
    }
  },
  plugins: [],
}
