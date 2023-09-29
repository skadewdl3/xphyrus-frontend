<script lang="ts" setup>
import { VAceEditor } from 'vue3-ace-editor'
import { config, edit } from 'ace-builds'

const content = ref('')
const backgroundColor = ref('#fff')

const height = ref(0)

const store = useEditorStore()
const { mode, fontSize, theme } = toRefs(store)
const { setTheme, setMode, setFontSize } = store





onMounted(async () => {
	let el = document.querySelector('.ace_editor')
	if (!el) return
	let modeModule = await modesArray[mode.value].module
	let themeModule = await themesArray[theme.value].module
	config.setModuleUrl(`ace/mode/${modesArray[mode.value].name}`, modeModule)
	config.setModuleUrl(`ace/theme/${themesArray[theme.value].name}`, themeModule)
	backgroundColor.value = getComputedStyle(el).backgroundColor
	height.value = (document.querySelector('.editor-options')?.clientHeight || 0)
})

watch(theme, async () => {
	let name = theme.value
	if (!(name in themesArray)) return
	let module = await themesArray[name].module
	setTheme(name)
	config.setModuleUrl(`ace/theme/${name}`, module)
	edit('ace_editor').setTheme(`ace/theme/${name}`)
	backgroundColor.value = getComputedStyle(
		document.querySelector('.ace_editor') as HTMLElement
	).backgroundColor
})

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
		:style="`background: ${backgroundColor};  border-top-right-radius: 0.5rem; border-top-left-radius: 0.5rem`"
	>
		<div class="editor-options-left flex items-center">
			<Dropdown :open="false" class="mr-2">
				<template #name>
					<Button :text="modesArray[mode].name" secondary />
				</template>
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
			<Dropdown :open="false" class="mr-2">
				<template #name>
					<Button :text="themesArray[theme].name" secondary />
				</template>
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
		<div class="editor-options-right flex items-center">
			
			<Button text="-" class="mr-2" @click="setFontSize(fontSize - 2)" secondary />
			<Button text="+" @click="setFontSize(fontSize + 2)" secondary />
			
		</div>
	</div>
	<VAceEditor
		v-model:value="content"
		:lang="mode"
		:theme="theme"
		:style="`height: calc(100% - ${height}px); font-size: ${fontSize}px; border-bottom-right-radius: 0.5rem; border-bottom-left-radius: 0.5rem`"
		id="ace_editor"
	/>
</template>

<style lang="stylus"></style>
