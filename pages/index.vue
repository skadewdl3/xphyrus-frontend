<script lang="ts" setup>
const { count, setCount } = toRefs(useTestStore())

definePageMeta({
  layout: 'index' 
})
</script>

<template>

    <!-- <p class="text-8xl">{{ count }}</p>
    <button
      class="bg-blue-400 px-4 py-2 rounded active:translate-y-1 transition-all"
      @click="setCount(count + 1)"
    >
      Increment
    </button> -->

</template>

<style lang="stylus"></style>
