// @ts-nocheck
import 'ace-builds/src-noconflict/ace'


export const getFromLocalStorage = (key: string) => {
	// if (!process.client) return null
	const value = localStorage.getItem(key)
	if (value) {
		return JSON.parse(value)
	}
	return null
}

export const themesArray: {
	[key: string]: { name: string; module: Promise<any>; color: 'light' | 'dark' }
} = {
	chrome: {
		name: 'Light',
		module: import('ace-builds/src-noconflict/theme-chrome'),
		color: 'light',
	},
	twilight: {
		name: 'Dark',
		module: import('ace-builds/src-noconflict/theme-twilight'),
		color: 'dark',
	},
	// tomorrow: {
	// 	name: 'Tomorrow',
	// 	module: import('ace-builds/src-noconflict/theme-tomorrow'),
	// 	color: 'light',
	// },
	// kuroir: {
	// 	name: 'Kuroir',
	// 	module: import('ace-builds/src-noconflict/theme-kuroir'),
	// 	color: 'light',
	// },
	// xcode: {
	// 	name: 'Xcode',
	// 	module: import('ace-builds/src-noconflict/theme-xcode'),
	// 	color: 'light',
	// },
	// textmate: {
	// 	name: 'Textmate',
	// 	module: import('ace-builds/src-noconflict/theme-textmate'),
	// 	color: 'light',
	// },
	// solarized_dark: {
	// 	name: 'Solarized Dark',
	// 	module: import('ace-builds/src-noconflict/theme-solarized_dark'),
	// 	color: 'dark',
	// },
	// solarized_light: {
	// 	name: 'Solarized Light',
	// 	module: import('ace-builds/src-noconflict/theme-solarized_light'),
	// 	color: 'light',
	// },
}

export const modesArray: {
	[key: string]: { name: string; module: Promise<any> }
} = {
	c_cpp: {
		name: 'C/C++',
		module: import('ace-builds/src-noconflict/mode-c_cpp'),
	},
	python: {
		name: 'Python',
		module: import('ace-builds/src-noconflict/mode-python'),
	},
	javascript: {
		name: 'Javascript',
		module: import('ace-builds/src-noconflict/mode-javascript'),
	},
}



export const getAbsoluteHeight = (el: HTMLElement | string): number => {
	// Get the DOM Node if you pass in a string
	el = typeof el === 'string' ? document.querySelector(el) : el

	var styles = window.getComputedStyle(el)
	var margin =
		parseFloat(styles['marginTop']) + parseFloat(styles['marginBottom'])

	return Math.ceil(el.offsetHeight + margin)
}