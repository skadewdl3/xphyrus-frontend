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
