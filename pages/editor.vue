<script setup lang="ts">
const x = ref(0)
const { x: mouseX } = useMouse()
const left = ref(1)
const right = ref(1)
const width = ref(0)

definePageMeta({
  layout: 'editor',
})

onMounted(() => {
  width.value = document.querySelector('.editor')?.getBoundingClientRect().width || 0
  x.value = width.value / 2
})

const handleDrag = (e: DragEvent) => {
  let temp = mouseX.value
  if (temp < width.value / 3 || temp >  2 * width.value / 3) return
  x.value = temp
  let leftFraction = mouseX.value / width.value
  let rightFraction = 1 - leftFraction
  left.value = leftFraction
  right.value = rightFraction
}

const handleDragStart = (e: DragEvent) => {
  e.dataTransfer?.setDragImage(new Image(), 0, 0)
}
</script>

<template>
<div class="editor grid h-full relative" :style="`grid-template-columns: ${left}fr ${right}fr`">
  <div class="resizer absolute w-1 h-full bg-blue-400 z-40 hover:cursor-ew-resize" :style="`left: ${x}px`" @dragstart="handleDragStart" @drag="handleDrag" draggable="true">

  </div>
    <span>Instructions</span>
  <div class="editor-right grid grid-rows-2">
    <div class="editor-code h-full">
      <ClientOnly>
        <Editor />
      </ClientOnly>

    </div>
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