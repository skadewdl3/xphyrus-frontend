<script setup lang="ts">

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
  <button v-if="props.secondary" class="bg-transparent border-solid border-[1px] border-primary px-4 py-2 rounded text-primary transition-all" :class="{'active:translate-y-0.5': props.animate}">{{ props.text }}</button>
  <button v-else-if="props.primary" class="bg-primary px-4 py-2 rounded text-white hover:bg-white border-solid border-primary border-[1px] hover:text-primary transition-all" :class="{'active:translate-y-0.5': props.animate}">{{ props.text }}</button>
</template>