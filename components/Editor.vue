<script lang="ts" setup>
// @ts-nocheck

import { VAceEditor } from 'vue3-ace-editor'
import modeModule from 'ace-builds/src-noconflict/mode-c_cpp'
import themeModule from 'ace-builds/src-noconflict/theme-twilight'

import { config, edit } from "ace-builds";

const theme = ref('twilight')
const mode = ref('c_cpp')
const content = ref('')

config.setModuleUrl("ace/mode/c_cpp", modeModule);
config.setModuleUrl("ace/theme/twilight", themeModule);

const themes: { [key: string]: { name: string, module: Promise<any> } } = {
  chrome: {
    name: 'Chrome',
    module: import('ace-builds/src-noconflict/theme-chrome')
  },
  twilight: {
    name: 'Twilight',
    module: import('ace-builds/src-noconflict/theme-twilight')
  },
  tomorrow: {
    name: 'Tomorrow',
    module: import('ace-builds/src-noconflict/theme-tomorrow')
  },
  kuroir: {
    name: 'Kuroir',
    module: import('ace-builds/src-noconflict/theme-kuroir')
  },
  xcode: {
    name: 'Xcode',
    module: import('ace-builds/src-noconflict/theme-xcode')
  },
  textmate: {
    name: 'Textmate',
    module: import('ace-builds/src-noconflict/theme-textmate')
  },
  solarized_dark: {
    name: 'Solarized Dark',
    module: import('ace-builds/src-noconflict/theme-solarized_dark')
  },
  solarized_light: {
    name: 'Solarized Light',
    module: import('ace-builds/src-noconflict/theme-solarized_light')
  },
}

const modes: { [key: string]: { name: string, module: Promise<any> } } = {
  c_cpp: {
    name: 'C/C++',
    module: import('ace-builds/src-noconflict/mode-c_cpp')
  },
  python: {
    name: 'Python',
    module: import('ace-builds/src-noconflict/mode-python')
  },
  javascript: {
    name: 'Javascript',
    module: import('ace-builds/src-noconflict/mode-javascript')
  },
}

const changeTheme = async (name) => {
  if (!(name in themes)) return
  let module = await themes[name].module;
  theme.value = name
  config.setModuleUrl(`ace/theme/${name}`, module);
  edit('ace_editor').setTheme(`ace/theme/${name}`);
}

const changeMode = async (name) => {
  if (!(name in modes)) return
  let module = await modes[name].module;
  mode.value = name
  config.setModuleUrl(`ace/mode/${name}`, module);
  edit('ace_editor').getSession().setMode(`ace/mode/${name}`);
}

</script>

<template>
  <div class="editor-options flex items-center justify-start">
    <div class="language-picker">
      <Dropdown :open="false">
        <template #name>
          <button class="bg-white border-solid border-[1px] border-primary px-4 whitespace-nowrap py-2 rounded text-primary">{{ modes[mode].name }}</button>
        </template>
        <template #items>
            <div class="px-4 py-2 bg-white hover:bg-gray-200 cursor-pointer" v-for="value, key in modes" @click="changeMode(key)">
              {{ value.name }}
            </div>
        </template>
      </Dropdown>
    </div>
    <div class="theme-picker">
      <Dropdown :open="false">
        <template #name>
          <button class="bg-white border-solid border-[1px] border-primary px-4 whitespace-nowrap py-2 rounded text-primary">{{ themes[theme].name }}</button>
        </template>
        <template #items>
            <div class="px-4 py-2 bg-white hover:bg-gray-200 cursor-pointer" v-for="value, key in themes" @click="changeTheme(key)">
              {{ value.name }}
            </div>
        </template>
      </Dropdown>
    </div>
  </div>
	<VAceEditor
		v-model:value="content"
		lang="c_cpp"
		:theme="theme"
		style="height: 100%"
    class="text-xl"
    id="ace_editor"
	/>
</template>

<style lang="stylus"></style>
