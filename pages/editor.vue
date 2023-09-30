<script setup lang="ts">

// Use the editor layout
definePageMeta({
  layout: 'editor',
})

// Get the editor store
const store = useEditorStore()

// Load the editor state from local storage if on client
onMounted(() => {
  if (process.client) {
    let savedEditor = getFromLocalStorage('editor')
    savedEditor && setEditor(savedEditor)
  }
})

// Convert top, left to reactive values
const { top, left, primaryColor, secondaryColor, theme } = toRefs(store)
const themeColor = computed(() => themesArray[theme.value].color)

// Get setters from store. These don't need to be reactive as they are only used to set the values.
// Use the setters only to modify values as they modify the local storage as well.
const { setTop, setLeft, setEditor } = store

// Gets the current mouse coordinates
const { x: mouseX, y: mouseY } = useMouse()

// Reference to editor DOM element
const editorRef = ref<HTMLElement | null>(null)

// Get the width and height of the editor
const { width, height } = useElementSize(editorRef)

// x and y positions of horizontal and vertical resizers
// are calculated using the width and height of the editor
// and the top and left values
const x = computed(() => width.value * left.value)
const y = computed(() => height.value * top.value)

// Temporary array for test cases
const testCases = [...Array(4)].map((_, i) => i + 1)

// When theme changes, change the background color
watch(themeColor, () => {
  document.body.style.backgroundColor = themeColor.value == 'dark' ? '#111' : '#eee'
})

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
</script>

<template>
<!-- The left ref controls the grid template columns -->

<div ref="editorRef" class="editor grid h-full relative" :style="`grid-template-columns: ${left}fr ${1 - left}fr;`">
  
  <!-- Place the horizontal resizer between the instrucitons and the (editor+output) panels -->

  <div class="resizer absolute w-2 -translate-x-full h-full bg-transparent z-40 hover:cursor-ew-resize" :style="`left: ${x}px`" @dragstart="handleDragStart" @drag="handleHorizontalDrag" draggable="true"></div>

  <!-- Instrucitons panel is always in left half of grid -->
  <!-- <span>Instructions</span> -->
  <div class="editor-instructions px-4 py-2 w-[99%] mx-0 my-auto rounded-md h-[99%] border-solid border-2 " :class="{'bg-black border-[#222] text-white': themeColor == 'dark', 'bg-white border-[#ccc] tetx-black': themeColor == 'light'}">
  sdfd
  </div>

  <!-- The editor and output panels are in the right half of the grid -->
  <!-- The top ref controls the grid-template-rows -->
  <div class="editor-right grid grid-rows-2 relative w-[100%] my-auto h-[99%]" :style="`grid-template-rows: ${top}fr ${1 - top}fr`">
    
    <!-- Editor is at top of right half of grid -->
    <div class="editor-code h-[99%] mt-0 border-solid border-2 rounded-md" :class="{'bg-black border-[#222]': themeColor == 'dark', 'bg-white border-[#ccc]': themeColor == 'light'}">
      <Editor />
    </div>
    
    <!-- Place the vertical resizer between the editor and output panels -->
    <div class="resizer absolute h-1 z-40 hover:cursor-ns-resize w-full -translate-y-full" :style="`top: ${y}px`" @dragstart="handleDragStart" @drag="handleVerticalDrag" draggable="true"></div>
    
    <!-- Output in at the bottom of right half of grid -->
    <div class="editor-output h-[99%] my-auto relative border-solid border-2 px-4 py-2 rounded-md" :class="{'bg-black border-[#222] text-white': themeColor == 'dark', 'bg-white border-[#ccc] text-black': themeColor == 'light'}">
      <span>Output</span>

      <!-- Tab group for switching between test cases -->
      <!-- Tab group provides the activeIndex ref which is index currently active tab -->
      <div class="output-bottom absolute bottom-0 left-0 w-full flex items-center justify-between" :class="{'bg-[#222]': themeColor == 'dark', 'bg-[#eee]': themeColor == 'light'}">

        <TabGroup class="mr-2 overflow-auto scrollbar-none">
          <template #tabs="{ activeIndex }">
  
            <p v-for="(caseNum, index) in testCases" class="px-4 py-4 cursor-pointer whitespace-nowrap"
            
            :style="`background: ${activeIndex == index ? themeColor == 'dark' ? 'black' : 'white' : 'transparent'}`"
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

<style lang="stylus">
body 
  background #eee
</style>