module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        'reveal': {
          '0%': { filter: 'blur(8.0px)' },
          '10%': { filter: 'blur(7.4px)' },
          '20%': { filter: 'blur(6.7px)' },
          '30%': { filter: 'blur(5.9px)' },
          '40%': { filter: 'blur(5pxpx)' },
          '50%': { filter: 'blur(4.0px)' },
          '60%': { filter: 'blur(3.2px)' },
          '70%': { filter: 'blur(2.3px)' },
          '80%': { filter: 'blur(1.5px)' },
          '90%': { filter: 'blur(0.7px)' },
          '100%': { filter: 'blur(0.0px)' },
        },
      },
      animation: {
        'reveal': 'reveal 1500ms linear',
      }
    },
  },
  plugins: [],
}