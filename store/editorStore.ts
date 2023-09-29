import { useStorage } from '@vueuse/core'

export const useEditorStore = defineStore('editor', () => {
	const editor = useStorage('editor', {
		mode: 'c_cpp',
		theme: 'chrome',
		fontSize: 14,
		top: 0.5,
		left: 0.5,
		primaryColor: '#ffffff',
		secondaryColor: '#ffffff',
	})

	const theme = ref(editor.value.theme)
	const mode = ref(editor.value.mode)
	const fontSize = ref(editor.value.fontSize)
	const top = ref(editor.value.top)
	const left = ref(editor.value.left)
	const primaryColor = ref(editor.value.primaryColor)
	const secondaryColor = ref(editor.value.secondaryColor)

	const setMode = (newMode: string) => {
		editor.value.mode = newMode
		mode.value = newMode
	}
	const setTheme = (newTheme: string) => {
		editor.value.theme = newTheme
		theme.value = newTheme
		primaryColor.value = getComputedStyle(
			document.querySelector('.ace_editor') as HTMLElement
		).backgroundColor

		secondaryColor.value = getComputedStyle(
			document.querySelector('.ace_gutter') as HTMLElement
		).background
	}
	const setFontSize = (newFontSize: number) => {
		editor.value.fontSize = newFontSize
		fontSize.value = newFontSize
	}
	const setTop = (newTop: number) => {
		editor.value.top = newTop
		top.value = newTop
	}
	const setLeft = (newLeft: number) => {
		editor.value.left = newLeft
		left.value = newLeft
	}
	const setEditor = (newEditor: any) => {
		editor.value = newEditor
		setTheme(newEditor.theme)
		setMode(newEditor.mode)
		setFontSize(newEditor.fontSize)
		setTop(newEditor.top)
		setLeft(newEditor.left)
	}

	return {
		theme,
		mode,
		fontSize,
		top,
		left,
		primaryColor,
		secondaryColor,
		setTheme,
		setMode,
		setFontSize,
		setTop,
		setLeft,
		setEditor,
	}
})
