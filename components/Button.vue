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
  type: {
    type: String,
    default: 'primary'
  },
  animate: {
    type: Boolean,
    default: false,
  },
  thin: {
    type: Boolean,
    default: false
  },
})

</script>

<template>
  <div class="button-container">
    <!-- Render a secondary button is secondary prop is true -->
    <button v-if="props.type == 'secondary'" class="bg-transparent border-solid border-[1px] border-primary rounded text-primary transition-all" :class="{'active:translate-y-0.5': props.animate, 'px-2 py-0.5': props.thin, 'px-4 py-2': !props.thin}">{{ props.text }}</button>
    
    <!-- Render a primary button by default -->
    <button v-else-if="props.type == 'primary'" class="bg-primary rounded text-white hover:bg-white border-solid border-primary border-[1px] hover:text-primary transition-all" :class="{'active:translate-y-0.5': props.animate, 'px-2 py-0.5': props.thin, 'px-4 py-2': !props.thin}">{{ props.text }}</button>

    <button v-else-if="props.type == 'success'" class="bg-green-400 rounded text-white hover:bg-green-500 border-solid border-green-400 border-[1px] hover:border-green-500 transition-all"  :class="{'active:translate-y-0.5': props.animate, 'px-2 py-0.5': props.thin, 'px-4 py-2': !props.thin}">{{ props.text }}</button>
  </div>
</template>