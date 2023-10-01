<script lang="ts" setup>
import VueMarkdown from 'vue-markdown-render'
import darkStylesheet from 'github-markdown-css/github-markdown-dark.css?inline'
import lightStylesheet from 'github-markdown-css/github-markdown-light.css?inline'

const { theme } = toRefs(useEditorStore())

watch(theme, () => {
  // let stylesheet = theme.value == 'twilight' ? darkStylesheet : lightStylesheet
  // document.head.appendChild()
  
  let existingTag = document.querySelector('.markdown-stylesheet')
  let innerHTML = theme.value == 'twilight' ? darkStylesheet : lightStylesheet
  if (existingTag) existingTag.innerHTML = innerHTML
  else {
    let styleTag = document.createElement('style')
    styleTag.classList.add('markdown-stylesheet')
    styleTag.innerHTML = innerHTML
    document.head.appendChild(styleTag)
  }
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
  <VueMarkdown class="markdown-body bg-white dark:bg-black" :source="markdown" />
</template>
