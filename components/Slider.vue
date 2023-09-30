<script setup lang="ts">

const store = useEditorStore()
const { theme } = toRefs(store)
const { setTheme } = store
const themeColor = computed(() => themesArray[theme.value].color)

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

const on = ref(props.on)
let shoudlToggle = true

console.log(on.value)

const toggle = () => {
  if (!shoudlToggle) return
  on.value = !on.value
  shoudlToggle = false
  let timeout = setTimeout(() => {
    clearTimeout(timeout)
    shoudlToggle = true
  }, 200)
}

</script>

<template>
<div class="slider relative w-12 h-8" @click="toggle">
  <div class="slider-track absolute top-1/2 h-1/2 -translate-y-1/2 left-0 w-full rounded-md" :class="{'bg-[#ccc]': themeColor == 'light', 'bg-[#222]': themeColor == 'dark'}"></div>

  <div class="slider-thumb absolute top-1/2 -translate-y-1/2 aspect-square h-3/4 border-solid border-2 rounded-full transition-all flex items-center justify-center" :class="{'left-[-10%]': !on, 'left-full -translate-x-[90%]': on, 'bg-white border-[#ccc]': themeColor == 'light', 'bg-black border-[#222]': themeColor == 'dark'}" :style="{height: `${props.size}px`}">
      <slot name="icon" :on="on"/>
  </div>
</div>
</template>

<style lang="stylus">

</style>