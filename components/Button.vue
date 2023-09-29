<script setup lang="ts">

/**
 * Props:
 * @prop {String} text        - The text to display on the button
 * @prop {Boolean} primary    - Whether the button is primary or not
 * @prop {Boolean} secondary  - Whether the button is secondary or not
 * @prop {Boolean} animate    - Whether the button should animate slightly down on click or not
 * 
 */

const props = defineProps({
  text: {
    type: String,
    required: true,
  },
  primary: {
    type: Boolean,
    default: true,
  },
  secondary: {
    type: Boolean,
    default: false,
  },
  animate: {
    type: Boolean,
    default: false,
  },
})

</script>

<template>

  <!-- Render a secondary button is secondary prop is true -->
  <button v-if="props.secondary" class="bg-transparent border-solid border-[1px] border-primary px-4 py-2 rounded text-primary transition-all" :class="{'active:translate-y-0.5': props.animate}">{{ props.text }}</button>
  
  <!-- Render a primary button by default -->
  <button v-else-if="props.primary" class="bg-primary px-4 py-2 rounded text-white hover:bg-white border-solid border-primary border-[1px] hover:text-primary transition-all" :class="{'active:translate-y-0.5': props.animate}">{{ props.text }}</button>
</template>