<script lang="ts" setup>
// @ts-nocheck

import { VAceEditor } from 'vue3-ace-editor'
import { config, edit } from 'ace-builds'

const content = ref('')
const backgroundColor = ref('#fff')



const themes: { [key: string]: { name: string; module: Promise<any> } } = {
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

const modes: { [key: string]: { name: string; module: Promise<any> } } = {
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


const store = useEditorStore()
const { mode, fontSize, theme } = toRefs(store)
const { setTheme, setMode, setFontSize } = store

let modeModule = await modes[mode.value].module
let themeModule = await themes[theme.value].module
config.setModuleUrl('ace/mode/c_cpp', modeModule)
config.setModuleUrl('ace/theme/twilight', themeModule)

onMounted(async () => {
  backgroundColor.value = getComputedStyle(
    document.querySelector('.ace_editor')
  ).backgroundColor
})


watch(theme, async () => {
  let name = theme.value
  if (!(name in themes)) return
	let module = await themes[name].module
  setTheme(name)
  console.log('this ran for ', name)
	config.setModuleUrl(`ace/theme/${name}`, module)
	edit('ace_editor').setTheme(`ace/theme/${name}`)
	backgroundColor.value = getComputedStyle(
		document.querySelector('.ace_editor')
	).backgroundColor
})

watch(mode, async () => {
  let name = mode.value
  if (!(name in modes)) return
  let module = await modes[name].module
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
					<button
						class="bg-transparent border-solid border-[1px] border-primary px-4 py-2 rounded text-primary"
					>
						{{ modes[mode].name }}
					</button>
				</template>
				<template #items>
					<div
						class="px-4 py-2 bg-white hover:bg-gray-200 cursor-pointer"
						v-for="(value, key) in modes"
						@click="setMode(key)"
					>
						{{ value.name }}
					</div>
				</template>
			</Dropdown>
			<Dropdown :open="false" class="mr-2">
				<template #name>
					<button
						class="bg-transparent border-solid border-[1px] border-primary px-4 py-2 rounded text-primary"
					>
						{{ themes[theme].name }}
					</button>
				</template>
				<template #items>
					<div
						class="px-4 py-2 bg-white hover:bg-gray-200 cursor-pointer"
						v-for="(value, key) in themes"
						@click="setTheme(key)"
					>
						{{ value.name }}
					</div>
				</template>
			</Dropdown>
    </div>
    <div class="editor-options-right flex items-center">
      <!-- two buttons to increase and decrease font size-->
      <button
        class="bg-transparent border-solid border-[1px] border-primary px-4 py-2 rounded text-primary mr-2"
        @click="setFontSize(fontSize - 3)"
      >
        -
      </button>
      <button
        class="bg-transparent border-solid border-[1px] border-primary px-4 py-2 rounded text-primary"
        @click="setFontSize(fontSize + 3)"
      >
        +
      </button>
    </div>
	</div>
	<VAceEditor
		v-model:value="content"
		:lang="mode"
		:theme="theme"
		:style="`height: 100%; font-size: ${fontSize}px; border-bottom-right-radius: 0.5rem; border-bottom-left-radius: 0.5rem`"
		id="ace_editor"
    
	/>
</template>

<style lang="stylus"></style>
