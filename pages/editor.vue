<script setup lang="ts">
// @ts-ignore
import VueResizable from 'vue-resizable'

definePageMeta({
  layout: 'editor',
})

defineComponent({
  components: {
    VueResizable,
  },
})

</script>

<template>
<div class="editor grid grid-cols-[1fr_1fr] h-full">
    <span>Instructions</span>
  <!-- <vue-resizable class="editor-left h-full bg-blue-400 resize-x overflow-auto">
  </vue-resizable> -->
  <div class="editor-right grid grid-rows-2">
    <div class="editor-code h-full bg-red-400">
      <span>Code Editor</span>

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