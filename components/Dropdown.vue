<script lang="ts" setup>
const props = defineProps({
  open: Boolean,
})

const height = ref(0)
const width = ref(0)
const open = ref(props.open)

onMounted(() => {
	height.value = (document.querySelector('.dropdown-trigger')?.clientHeight || 0)
	width.value = (document.querySelector('.dropdown-trigger')?.clientWidth || 0)
})


const closeDropdown = () => {
  open.value = false
  document.body.removeEventListener('click', closeDropdown)
}

const toggleDropdown = (e: Event) => {
  open.value = !open.value
  e.stopPropagation()
  if (open.value) document.body.addEventListener('click', closeDropdown)
}

</script>

<template>
<div class="dropdown relative" :style="`height: ${height}px; width: ${width}px`">
  <div class="dropdown-trigger absolute z-0" @click="toggleDropdown">
    <slot class="dropdown-trigger-text" name="name" />
  </div>
  <Transition name="scale">
    <div class="dropdown-trigger-list absolute z-10 origin-top-left rounded overflow-hidden" :style="`top: ${height + 2}px`" v-if="open" >
      <slot  name="items" />
    </div>
  </Transition>
</div>
</template>

<style lang="stylus">

.scale-enter-active,
.scale-leave-active {
  transition: all 0.1s ease;
}

.scale-enter-from,
.scale-leave-to {
  transform: scale(0.95);
  opacity: 0;
}
</style>