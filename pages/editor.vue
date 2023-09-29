<script setup lang="ts">
const store = useEditorStore()
const { top, left } = toRefs(store)
const { setTop, setLeft, setEditor } = store

const x = ref(0)
const y = ref(0)
const { x: mouseX, y: mouseY } = useMouse()
const width = ref(0)
const height = ref(0)

definePageMeta({
  layout: 'editor',
})

onMounted(() => {
  if (process.client) {
    let savedEditor = getFromLocalStorage('editor')
    savedEditor && setEditor(savedEditor)
  }
  width.value = document.querySelector('.editor')?.getBoundingClientRect().width || 0
  height.value = window.innerHeight - (document.querySelector('.editor-navbar')?.clientHeight || 0)
  y.value = height.value * top.value
  x.value = width.value * left.value
})


const handleHorizontalDrag = (e: DragEvent) => {
  let temp = mouseX.value
  if (temp < width.value / 3 || temp >  2 * width.value / 3) return
  x.value = temp
  let leftFraction = temp / width.value
  setLeft(leftFraction)
}

const handleVerticalDrag = (e: DragEvent) => {
  let temp = mouseY.value
  if (temp < height.value / 3 || temp >  2 * height.value / 3) return
  y.value = temp
  let topFraction = temp / height.value
  setTop(topFraction)
}

const handleDragStart = (e: DragEvent) => {
  e.dataTransfer?.setDragImage(new Image(), 0, 0)
}
</script>

<template>
<div class="editor grid h-full relative" :style="`grid-template-columns: ${left}fr ${1 - left}fr`">
  <div class="resizer absolute w-0.5 h-full bg-transparent z-40 hover:cursor-ew-resize" :style="`left: ${x}px`" @dragstart="handleDragStart" @drag="handleHorizontalDrag" draggable="true">

  </div>
    <span>Instructions</span>
  <div class="editor-right grid grid-rows-2 relative" :style="`grid-template-rows: ${top}fr ${1 - top}fr`">
    <div class="editor-code h-full">
      <Editor />
    </div>
    <div class="resizer absolute h-0.5 z-40 hover:cursor-ns-resize w-full" :style="`top: ${y}px`" @dragstart="handleDragStart" @drag="handleVerticalDrag" draggable="true"></div>
    <div class="editor-output h-full bg-green-400">

      <span>Output</span>
    </div>

  </div>
</div>
</template>

<style lang="stylus">
body 
  background #eee
</style>