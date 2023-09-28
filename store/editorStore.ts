import { useStorage } from '@vueuse/core'

const getFromLocalStorage = (key: string) => {
	const value = localStorage.getItem(key)
	if (value) {
		return JSON.parse(value)
	}
	return null
}

export const useEditorStore = defineStore('editor', () => {
	const editor = useStorage(
		'editor',
		getFromLocalStorage('editor') || {
			mode: 'c_cpp',
			theme: 'chrome',
			fontSize: 14,
		}
	)

	const theme = ref(editor.value.theme)
	const mode = ref(editor.value.mode)
	const fontSize = ref(editor.value.fontSize)

	const setMode = (newMode: string) => {
		editor.value.mode = newMode
		mode.value = newMode
	}
	const setTheme = (newTheme: string) => {
		editor.value.theme = newTheme
		theme.value = newTheme
	}
	const setFontSize = (newFontSize: number) => {
		editor.value.fontSize = newFontSize
		fontSize.value = newFontSize
	}

	return {
		theme,
		mode,
		fontSize,
		setTheme,
		setMode,
		setFontSize,
	}
})
