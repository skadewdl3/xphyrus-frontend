/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./components/**/*.{js,vue,ts}',
		'./layouts/**/*.vue',
		'./pages/**/*.vue',
		'./plugins/**/*.{js,ts}',
		'./app.vue',
	],
	theme: {
		extend: {},
		fontFamily: {
			display: ['Montserrat', 'sans-serif'],
			body: ['Poppins', 'sans-serif'],
		},
	},
	plugins: [],
}
