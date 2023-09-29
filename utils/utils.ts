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
	[key: string]: { name: string; module: Promise<any> }
} = {
	chrome: {
		name: 'Chrome',
		module: import('ace-builds/src-noconflict/theme-chrome'),
	},
	twilight: {
		name: 'Twilight',
		module: import('ace-builds/src-noconflict/theme-twilight'),
	},
	tomorrow: {
		name: 'Tomorrow',
		module: import('ace-builds/src-noconflict/theme-tomorrow'),
	},
	kuroir: {
		name: 'Kuroir',
		module: import('ace-builds/src-noconflict/theme-kuroir'),
	},
	xcode: {
		name: 'Xcode',
		module: import('ace-builds/src-noconflict/theme-xcode'),
	},
	textmate: {
		name: 'Textmate',
		module: import('ace-builds/src-noconflict/theme-textmate'),
	},
	solarized_dark: {
		name: 'Solarized Dark',
		module: import('ace-builds/src-noconflict/theme-solarized_dark'),
	},
	solarized_light: {
		name: 'Solarized Light',
		module: import('ace-builds/src-noconflict/theme-solarized_light'),
	},
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
