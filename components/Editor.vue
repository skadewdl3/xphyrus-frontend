<script lang="ts" setup>
import { VAceEditor } from 'vue3-ace-editor'
import { config, edit } from 'ace-builds'

// The content of the code editor
const content = ref('')

// Used to correctly size the editor
const height = ref(0)

// Get the editor options from the store
const store = useEditorStore()

// Have to convert the objects to refs
// for reactive updates
const { mode, fontSize, theme, secondaryColor } = toRefs(store)

// Use these setter functions to update the store
// as they update the local storage as well
const { setTheme, setMode, setFontSize } = store

onMounted(async () => {

	// Load the theme and mode from local storage
	// Dynamic import these modules
	let modeModule = await modesArray[mode.value].module
	let themeModule = await themesArray[theme.value].module

	// Set the code editor to use the improted theme and mode
	config.setModuleUrl(`ace/mode/${modesArray[mode.value].name}`, modeModule)
	config.setModuleUrl(`ace/theme/${themesArray[theme.value].name}`, themeModule)
	
	// Set the height to the height of the editor options panel
	// This is used to calculate correct height for the code editor
	height.value = (document.querySelector('.editor-options')?.clientHeight || 0)
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
	<div
		class="editor-options flex items-center justify-between p-2"
		:style="`background: ${secondaryColor};  border-top-right-radius: 0.5rem; border-top-left-radius: 0.5rem`"
	>
		<div class="editor-options-left flex items-center">

			<!-- Dropdown for language mode selection -->

			<Dropdown :open="false" class="mr-2">
				<template #name>
					<Button :text="modesArray[mode].name" secondary />
				</template>

				<!-- Dynamically render all mode options from themesArray -->
				<template #items>
					<div
						class="px-4 py-2 bg-white hover:bg-gray-200 cursor-pointer"
						v-for="(value, key) in modesArray"
						@click="setMode(key as string)"
					>
						{{ value.name }}
					</div>
				</template>
			</Dropdown>

			<!-- Dropdown for theme selection -->

			<Dropdown :open="false" class="mr-2">
				<template #name>
					<Button :text="themesArray[theme].name" secondary />
				</template>

				<!-- Dynamically render all theme options from themesArray -->
				<template #items>
					<div
						class="px-4 py-2 bg-white hover:bg-gray-200 cursor-pointer"
						v-for="(value, key) in themesArray"
						@click="setTheme(key as string)"
					>
						{{ value.name }}
					</div>
				</template>
			</Dropdown>
		</div>

		<!-- Buttons for controlling the font size of the editor -->
		
		<div class="editor-options-right flex items-center">
			
			<Button text="-" class="mr-2" @click="setFontSize(fontSize - 2)" secondary />
			<Button text="+" @click="setFontSize(fontSize + 2)" secondary />
			
		</div>
	</div>

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
		:style="`height: calc(100% - ${height}px); font-size: ${fontSize}px;`"
		id="ace_editor"
	/>
</template>

<style lang="stylus"></style>
