/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    extend: {},
  },
  plugins: [
    function({ addUtilities, theme, e }) {
      const newUtilities = {};
      const breakpoints = theme('screens');
      
      Object.keys(breakpoints).forEach((breakpoint) => {
        const value = breakpoints[breakpoint];
        
        // Adding a custom utility for 'xl' breakpoint
        if (breakpoint === 'xl') {
          newUtilities[`.${e(`xl:text-base`)}`] = {
            fontSize: '18px', // Set your desired font size for 'xl' breakpoint
          };
        }
      });

      addUtilities(newUtilities, ['responsive']);
    }
  ],
}
