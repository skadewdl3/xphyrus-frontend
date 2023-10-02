<script setup lang="ts">
import { sampleMarkdown } from '~/utils/utils';


// Use the editor layout
definePageMeta({
  layout: 'editor',
})

// Get the editor store
const store = useEditorStore()

// Convert top, left to reactive values
const { top, left, theme } = toRefs(store)

// Get setters from store. These don't need to be reactive as they are only used to set the values.
// Use the setters only to modify values as they modify the local storage as well.
const { setTop, setLeft, setEditor } = store

// Gets the current mouse coordinates
const { x: mouseX, y: mouseY } = useMouse()

// Reference to editor DOM element
const editorRef = ref<HTMLElement | null>(null)
const outputRef = ref<HTMLElement | null>(null)

// Get the width and height of the editor
const { width, height } = useElementSize(editorRef)
const { height: outputHeight } = useElementSize(outputRef)

// x and y positions of horizontal and vertical resizers
// are calculated using the width and height of the editor
// and the top and left values
const x = computed(() => width.value * left.value)
const y = computed(() => height.value * top.value)

// Temporary array for test cases
const testCases = [...Array(4)].map((_, i) => i + 1)

// Handles horizontal resizing of the (editor + output)
// and the instructions panels
const handleHorizontalDrag = (e: DragEvent) => {
  let temp = mouseX.value
  if (temp < width.value / 3 || temp >  2 * width.value / 3) return
  let leftFraction = temp / width.value
  setLeft(leftFraction)
}

// Handles vertical resize between the
// code editor and output panels
const handleVerticalDrag = (e: DragEvent) => {
  let temp = mouseY.value
  if (temp < height.value / 3 || temp >  2 * height.value / 3) return
  let topFraction = temp / height.value
  setTop(topFraction)
}

// Hides the ghost image that appears on dragging
const handleDragStart = (e: DragEvent) => {
  e.dataTransfer?.setDragImage(new Image(), 0, 0)
}

const MarkdownRenderer = defineAsyncComponent(() => import('@components/MarkdownRenderer.vue'))
// const Editor = defineAsyncComponent(() => import('@components/Editor.vue'))
const outputMarkdown = `
# This is the output
\`\`\`txt
Output: 1 2 3 4 6 5
Expected Output: 1 2 3 4 5
\`\`\`
`
</script>

<template>
<!-- The left ref controls the grid template columns -->

<div ref="editorRef" class="editor grid h-full relative" :style="`grid-template-columns: ${left}fr ${1 - left}fr;`">
  
  <!-- Place the horizontal resizer between the instrucitons and the (editor+output) panels -->

  <div class="resizer absolute w-2 -translate-x-full h-full bg-transparent z-40 hover:cursor-ew-resize" :style="`left: ${x}px`" @dragstart="handleDragStart" @drag="handleHorizontalDrag" draggable="true"></div>

  <!-- Instrucitons panel is always in left half of grid -->
  <!-- <span>Instructions</span> -->
  <div class="editor-instructions px-8 py-8 scrollbar-none w-[99%] max-h-[99%] mx-0 my-auto rounded-md h-[99%] border-solid border-2 bg-white border-lightgray-400 text-black dark:bg-black dark:border-lightblack-600 dark:text-white overflow-y-auto">
    <MarkdownRenderer :markdown="sampleMarkdown" class="overflow-y-auto" />
  </div>

  <!-- The editor and output panels are in the right half of the grid -->
  <!-- The top ref controls the grid-template-rows -->
  <div class="editor-right grid grid-rows-2 relative w-[100%] my-auto h-[99%]" :style="`grid-template-rows: ${top}fr ${1 - top}fr`">
    
    <!-- Editor is at top of right half of grid -->
    <div class="editor-code h-[99%] mt-0 border-solid border-2 rounded-md dark:bg-black dark:border-lightblack-600 bg-white border-lightgray-400">
      <Editor />
    </div>
    
    <!-- Place the vertical resizer between the editor and output panels -->
    <div class="resizer absolute h-1 z-40 hover:cursor-ns-resize w-full -translate-y-full" :style="`top: ${y}px`" @dragstart="handleDragStart" @drag="handleVerticalDrag" draggable="true"></div>
    
    <!-- Output in at the bottom of right half of grid -->
    <div class="editor-output h-[99%] my-auto relative border-solid border-2 rounded-md dark:bg-black dark:border-lightblack-600 dark:text-white bg-white border-lightgray-400 text-black" ref="outputRef">

      <MarkdownRenderer class="w-full overflow-y-auto absolute top-0 left-0 px-4 py-2 scrollbar-none" :markdown="outputMarkdown" :style="{height: `${outputHeight}px`}" />

      <!-- Tab group for switching between test cases -->
      <!-- Tab group provides the activeIndex ref which is index currently active tab -->
      <div class="output-bottom absolute bottom-0 left-0 w-full flex items-center justify-between dark:bg-lightblack-600 bg-lightgray-100">


        <TabGroup class="mr-2 overflow-auto scrollbar-none">
          <template #tabs="{ activeIndex }">
  
            <p v-for="(caseNum, index) in testCases" class="px-4 py-4 cursor-pointer whitespace-nowrap dark:bg-black bg-white"
            :style="`background: ${activeIndex == index ? theme == 'twilight' ? 'black' : 'white' : 'transparent'}`"
            >
              Case {{ caseNum }}
            </p>
          </template>
        </TabGroup>
        <div class="btns flex itmes-center justify-end mx-2">
          <Button text="Run" type="secondary" class="mr-2" animate />
          <Button text="Submit" type="success" animate />
        </div>
      </div>

    </div>

  </div>
</div>
</template>