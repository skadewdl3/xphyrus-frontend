<script setup lang="ts">


definePageMeta({
  layout: 'editor',
})

</script>

<template>
<div class="editor grid grid-cols-[1fr_1fr] h-full">
    <span>Instructions</span>
  <div class="editor-right grid grid-rows-2">
    <div class="editor-code h-full">
      <span><Editor /></span>

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