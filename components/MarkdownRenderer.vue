<script lang="ts" setup>
// import VueMarkdown from 'vue3-markdown-it'
import highlightPlugin from 'markdown-it-highlightjs'
import { useFetch } from '@vueuse/core';

const props = defineProps({
	markdown: {
		type: String,
		default: null
	}
})


const markdown = computed(() => props.markdown || 'Loading...')


const { theme } = toRefs(useEditorStore())


const plugins = [
	{
		plugin: highlightPlugin,
	},
]


const { data: markdownDark, error, isFetching } =  useFetch<string>('/github-markdown-dark.css')
const { data: markdownLight, error: error2, isFetching: isFetching2 } =  useFetch<string>('/github-markdown-light.css')
const { data: highlightDark, error: error3, isFetching: isFetching3 } =  useFetch(<string>'/github-highlight-dark.css')
const { data: highlightLight, error: error4, isFetching: isFetching4 } =  useFetch<string>('/github-highlight-light.css')


const loadStylesheets = async () => {

	let styleSheetTag = document.querySelector('.markdown-stylesheet')
	let highlightTag = document.querySelector('.highlight-stylesheet')
	let innerHTML = theme.value == 'twilight' ? markdownDark.value : markdownLight.value
	let highlightInnerHTML = theme.value == 'twilight' ? highlightDark.value : highlightLight.value

	if (styleSheetTag) styleSheetTag.innerHTML = innerHTML as string
	else {
		let style = document.createElement('style')
		style.classList.add('markdown-stylesheet')
		style.innerHTML = innerHTML as string
		document.head.appendChild(style)
	}

	if (highlightTag) highlightTag.innerHTML = highlightInnerHTML as string
	else {
		let style = document.createElement('style')
		style.classList.add('highlight-stylesheet')
		style.innerHTML = highlightInnerHTML as string
		document.head.appendChild(style)
	}
}

watch(theme, async () => {
	await loadStylesheets()
})

watch([isFetching, isFetching2, isFetching3, isFetching4], () => {
	if (!isFetching.value && !isFetching2.value && !isFetching3.value && !isFetching4.value) {
		loadStylesheets()
	}
})

onUnmounted(() => {
	let styleSheetTag = document.querySelector('.markdown-stylesheet')
	let highlightTag = document.querySelector('.highlight-stylesheet')

	if (styleSheetTag) styleSheetTag.remove()
	if (highlightTag) highlightTag.remove()
})

const VueMarkdown = defineAsyncComponent(() => import('vue3-markdown-it'))


</script>

<template>
	<div class="markdown-body bg-white dark:bg-black">
		<ClientOnly>
			<VueMarkdown
				:plugins="plugins"
				:source="markdown"
			/>
		</ClientOnly>
	</div>
</template>
