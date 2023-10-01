<script lang="ts" setup>
// import VueMarkdown from 'vue3-markdown-it'
import highlightPlugin from 'markdown-it-highlightjs'

// Stylesheets for github-style markdown styling 
// import darkStylesheet from 'github-markdown-css/github-markdown-dark.css?inline'
// import lightStylesheet from 'github-markdown-css/github-markdown-light.css?inline'

// Stylesheets for syntax highlighting
// import highlightDark from 'highlight.js/styles/github-dark.css?inline'
// import highlightLight from 'highlight.js/styles/github.css?inline'

const { theme } = toRefs(useEditorStore())


const plugins = [
	{
		plugin: highlightPlugin,
	},
]

const md = `
# Your first assignment!
### Introduction
Welcome to your first assignment. Ths assigment is a dummy assignment which will be used to test the capabilties of .xphyrus. This assignment contains no meaningful code, except for a hello world program. Now, let's learn how to write a **Hello World** program in C.

___

### Hello World
Firstly, we will include the header files needed to print something to the standard output. This header file is called \`<stdio.h>\`. Type out the following line in the code editor:

\`\`\`c
#include <stdio.h>
\`\`\`

Now, we will write the main function. The main function is the entry point of every C program. The main function is defined as follows: 
\`\`\`c
int main() {
	// Code goes here
	return 0;
}
\`\`\`

Now, let's combine the two parts of our code together. Type out the following code in the code editor:
\`\`\`c
#include <stdio.h>

int main() {
	return 0;
}
\`\`\`

When you try running this code, you will see that nothing happens. This is because we haven't written any code to print something to the standard output. To print something to the standard output, we will use the \`printf\` function. 
\`\`\`
printf("Hello World!");
\`\`\`

Now, let's combine the all the parts of our code together. Type out the following code in the code editor:
\`\`\`c
#include <stdio.h>

int main() {
	printf("Hello World!");
	return 0;
}
\`\`\`

Now, when you run this code, you will see that the output \`Hello World!\` is printed to the standard output. Congratulations! You have written your first C program. Now, let's learn how to submit this program to .xphyrus.
\n\n\n  
`
const markdown = ref(md)

let darkStylesheet: any, lightStylesheet: any, highlightDark: any, highlightLight: any

const loadStylesheets = async () => {

	let styleSheetTag = document.querySelector('.markdown-stylesheet')
	let highlightTag = document.querySelector('.highlight-stylesheet')
	let innerHTML = ''
	let highlightInnerHTML = ''

	if (theme.value == 'twilight') {

		if (!darkStylesheet) darkStylesheet = (await import('github-markdown-css/github-markdown-dark.css?inline')).default
		if (!highlightDark) highlightDark =  (await import('highlight.js/styles/github-dark.css?inline')).default
		innerHTML = darkStylesheet
		highlightInnerHTML = highlightDark
	}
	else if (theme.value == 'chrome') {
		if (!lightStylesheet) lightStylesheet =  (await import('github-markdown-css/github-markdown-light.css?inline')).default
		if (!highlightLight) highlightLight = (await import('highlight.js/styles/github.css?inline')).default
		innerHTML = lightStylesheet
		highlightInnerHTML = highlightLight
	}

	if (styleSheetTag) styleSheetTag.innerHTML = innerHTML
	else {
		let style = document.createElement('style')
		style.classList.add('markdown-stylesheet')
		style.innerHTML = innerHTML
		document.head.appendChild(style)
	}

	if (highlightTag) highlightTag.innerHTML = highlightInnerHTML
	else {
		let style = document.createElement('style')
		style.classList.add('highlight-stylesheet')
		style.innerHTML = highlightInnerHTML
		document.head.appendChild(style)
	}
}

watch(theme, async () => {
	await loadStylesheets()
})

onMounted(async () => {
	await loadStylesheets()
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
