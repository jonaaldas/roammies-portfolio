/** @type {import('tailwindcss').Config} */
export default {
	content: ['./components/**/*.{js,vue,ts}', './layouts/**/*.vue', './pages/**/*.vue', './plugins/**/*.{js,ts}', './app.vue', './error.vue'],
	theme: {
		container: {
			center: true,
			padding: {
				DEFAULT: '1rem',
				sm: '2rem',
				lg: '4rem',
				xl: '6rem',
				'2xl': '8rem'
			}
		},
		fontFamily: {
			body: ["'DM Sans'", 'sans-serif']
		}
	},
	plugins: [require('daisyui')],
	daisyui: {
		themes: ['cupcake']
	}
};
