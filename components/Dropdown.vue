<script lang="ts" setup>
import { vOnClickOutside } from '@vueuse/components'

const props = defineProps({
  open: {
    type: Boolean,
    default: false
  }
})

const trigger = ref<HTMLElement | null>(null);
const { width, height } = useElementSize(trigger)

// Whether the dropdown is open or closed
const open = ref(props.open)

// Closes the dropdown
const closeDropdown = () => {
  open.value = false
}

// Toggles dropdown state
const toggleDropdown = (e: Event) => {
  open.value = !open.value
  e.stopPropagation()
}
</script>

<template>
<!-- Relative posisiotned wrapper for the dropdown to keep alignment for outside elements -->
<div class="dropdown relative" :style="`height: ${height}px; width: ${width}px`" ref="dropdown">
  
  <!-- Dropdown trigger. Can be anything specified in the "name" slot -->
  <div class="dropdown-trigger whitespace-nowrap  absolute z-0" ref="trigger" @click="toggleDropdown">
    <slot class="dropdown-trigger-text" name="name"  :style="`height: ${height}px; width: ${width}px`" />
  </div>

  <!-- Transition element which scales the dropdown on open/close -->
  <Transition name="scale">

    <!-- Dropdown items. Can be anything inside the "items" slot -->
    <div class="dropdown-trigger-list absolute z-10 rounded overflow-hidden origin-top-left" v-on-click-outside="closeDropdown" @click="closeDropdown"  :style="`top: ${height + 2}px`" v-if="open" >
      <slot  name="items" />
    </div>
  </Transition>
</div>
</template>

<style lang="stylus">
// Sets dropdown to transition smoothly which scaling
.scale-enter-active,
.scale-leave-active {
  transition: all 0.1s ease;
}

// Dropdown expands from and reduces to scale(0.95) and opeaicty 0
.scale-enter-from,
.scale-leave-to {
  transform: scale(0.95);
  opacity: 0;
}
</style>