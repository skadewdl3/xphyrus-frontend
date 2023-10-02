/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: 'class',
	content: [
		'./components/**/*.{js,vue,ts}',
		'./layouts/**/*.vue',
		'./pages/**/*.vue',
		'./plugins/**/*.{js,ts}',
		'./app.vue',
	],
	theme: {
		extend: {
			colors: {
				primary: '#6c63ff',
				'lightblack-600': '#222',
				'lightblack-700': '#111',
				'lightgray-400': '#ccc',
				'lightgray-100': '#eee',
			},
		},
		fontFamily: {
			display: ['Montserrat', 'sans-serif'],
			body: ['Poppins', 'sans-serif'],
		},
	},
	plugins: [require('tailwind-scrollbar')],
	// plugins: [require('daisyui')],
	// daisyui: {
	// 	themes: ['business'],
	// },
}
