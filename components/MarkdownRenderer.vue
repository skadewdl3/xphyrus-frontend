<script lang="ts" setup>
// import VueMarkdown from 'vue-markdown-render'
import VueMarkdown from 'vue3-markdown-it'
import highlightPlugin from 'markdown-it-highlightjs'

import darkStylesheet from 'github-markdown-css/github-markdown-dark.css?inline'
import lightStylesheet from 'github-markdown-css/github-markdown-light.css?inline'

import highlightDark from 'highlight.js/styles/github-dark.css?inline'
import highlightLight from 'highlight.js/styles/github.css?inline'

const { theme } = toRefs(useEditorStore())

const plugins = [
	{
		plugin: highlightPlugin,
	},
]

const updateStyles = () => {
	console.log('hi mom')
	let stylesheetTag = document.querySelector('.markdown-stylesheet')
	let highlightTag = document.querySelector('.highlight-stylesheet')

	let innerHTML = theme.value == 'twilight' ? darkStylesheet : lightStylesheet
	let highlightInnerHTML =
		theme.value == 'twilight' ? highlightDark : highlightLight

	if (stylesheetTag) stylesheetTag.innerHTML = innerHTML
	else {
		let styleTag = document.createElement('style')
		styleTag.classList.add('markdown-stylesheet')
		styleTag.innerHTML = innerHTML
		document.head.appendChild(styleTag)
	}
	if (highlightTag) highlightTag.innerHTML = highlightInnerHTML
	else {
		let styleTag = document.createElement('style')
		styleTag.classList.add('highlight-stylesheet')
		styleTag.innerHTML = highlightInnerHTML
		document.head.appendChild(styleTag)
	}
}

watch(theme, updateStyles)

onMounted(() => {
	updateStyles()
})

const md = `
### Hello World
##### Hi mom

\`\`\`js
console.log('Hi mom')
\`\`\`
`
const markdown = ref(md)
</script>

<template>
	<ClientOnly>
		<VueMarkdown
			:plugins="plugins"
			class="markdown-body bg-white dark:bg-black"
			:source="markdown"
		/>
	</ClientOnly>
</template>
