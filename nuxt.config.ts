import { resolve } from 'path'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	// Enable devtools in development mode
	devtools: { enabled: process.dev },

	// Configuration for tailwindcss
	css: ['~/assets/main.css'],
	postcss: {
		plugins: {
			tailwindcss: {},
			autoprefixer: {},
		},
	},

	// Modules needed for the app
	modules: ['@pinia/nuxt'],

	// Rendering mode configuration for different routes
	routeRules: {
		'/': { prerender: true },
		'/editor': { ssr: true },
		'/api/**': { cors: true },
	},

	// Configure Auto Imports for Pinia, etc.
	imports: {
		presets: [
			{
				from: 'pinia',
				imports: ['defineStore', 'createPinia', 'storeToRefs'],
			},
		],

		dirs: ['./store/**', './layouts/**'],
	},

	// Setup aliases for easy access to directories
	alias: {
		'@': '/',
		'@components': '/components',
		'@composables': '/composables',
		'@assets': '/assets',
		'@pages': '/pages',
		'@store': '/store',
		// Add more aliases as needed...
	},

	// Enables using stylus global variables and mixins in vue files
	vite: {
		css: {
			preprocessorOptions: {
				stylus: {
					additionalData: `@import "${resolve(
						__dirname,
						'assets',
						'stylus',
						'global.styl'
					)}"`,
				},
			},
		},
	},
})
