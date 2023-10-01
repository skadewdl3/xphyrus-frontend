<script setup lang="ts">
import { onMounted, onBeforeMount, ref, watch, toRefs } from 'vue'
import { getAbsoluteHeight, getFromLocalStorage } from '@utils/utils'
import { useEditorStore } from '@store/editorStore'

const height = ref(0)

const store = useEditorStore()
const { theme } = toRefs(store)
const { setEditor } = store

onBeforeMount(() => {
	if (JSON.parse(localStorage.getItem('editor') || '')?.theme === 'twilight' || (!('editor' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
		document.documentElement.classList.add('dark')
	} else {
		document.documentElement.classList.remove('dark')
	}
})

onMounted(() => {	
	const editor = getFromLocalStorage('editor')
	setEditor(editor)
	height.value = window.innerHeight - (getAbsoluteHeight('.editor-navbar') || 0)
})

watch(theme, () => {
	if (theme.value === 'twilight') {
		document.documentElement.classList.add('dark')
	} else {
		document.documentElement.classList.remove('dark')
	}
})

</script>

<template>
  <EditorNavbar />
	<main class="w-[99%] mx-auto my-auto" :style="`height: ${height}px`">
		<Head>
			<title>.xphyrus - Editor</title>
		</Head>
		<Body class="bg-[#eee] dark:bg-[#111]"></Body>

		<slot />
	</main>
</template>