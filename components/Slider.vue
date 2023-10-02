<script setup lang="ts">
const props = defineProps({
  size: {
    type: Number,
    default: 24
  },
  on: {
    type: Boolean,
    default: false
  }
})

const { on: isOn } = toRefs(props)
const on = ref(isOn.value)
watch(isOn, () => {
  on.value = isOn.value
})

</script>

<template>
<div class="slider relative w-12 h-8" @click="on = !on">
  <div class="slider-track absolute top-1/2 h-1/2 -translate-y-1/2 left-0 w-full rounded-md bg-lightgray-400 dark:bg-lightblack-600"></div>

  <div class="slider-thumb absolute top-1/2 -translate-y-1/2 aspect-square h-3/4 border-solid border-2 rounded-full transition-all flex items-center justify-center bg-white border-lightgray-400 dark:bg-black dark:border-lightblack-600" :class="{'left-[-10%]': !on, 'left-full -translate-x-[90%]': on}" :style="{height: `${props.size}px`}">
      <slot name="icon" :on="on"/>
  </div>
</div>
</template>

<style lang="stylus">

</style>