<script lang="ts" setup>
import { VAceEditor } from 'vue3-ace-editor'
import { config, edit } from 'ace-builds'

// The content of the code editor
const content = ref('')

// Get the editor options from the store
const store = useEditorStore()

// Have to convert the objects to refs
// for reactive updates
const { mode, fontSize, theme } = toRefs(store)

// Use these setter functions to update the store
// as they update the local storage as well
const { setTheme, setMode, setFontSize } = store

onMounted(async () => {
	// Load the theme and mode from local storage
	// Dynamic import these modules

	// set editor base path
	config.set('basePath', '/')

	let modeModule = await modesArray[mode.value].module
	let themeModule = await themesArray[theme.value].module

	// Set the code editor to use the improted theme and mode
	config.setModuleUrl(`ace/mode/${modesArray[mode.value].name}`, modeModule)
	config.setModuleUrl(`ace/theme/${themesArray[theme.value].name}`, themeModule)

})

// Whenever user selects new theme
// Import the theme module and set the theme
watch(theme, async () => {
	let name = theme.value
	if (!(name in themesArray)) return
	let module = await themesArray[name].module
	setTheme(name)
	config.setModuleUrl(`ace/theme/${name}`, module)
	edit('ace_editor').setTheme(`ace/theme/${name}`)
})

// Whenever user selects new language mode
// Import the theme module and set the theme
watch(mode, async () => {
	let name = mode.value
	if (!(name in modesArray)) return
	let module = await modesArray[name].module
	setMode(name)
	config.setModuleUrl(`ace/mode/${name}`, module)
	edit('ace_editor').getSession().setMode(`ace/mode/${name}`)
})
</script>

<template>

	<!--
		The code editor itself. 
		It's height is calculated dynamically as per height of editor-options div.
		The font-size is set dynamically as per value in the store.
		ID of ace_editor has to be specified maually for the config utilities to work
	-->
	<VAceEditor
		v-model:value="content"
		:lang="mode"
		:theme="theme"
		:style="{height: '100%', fontSize: `${fontSize}px`}"
		id="ace_editor"
	/>
</template>

<style lang="stylus"></style>
