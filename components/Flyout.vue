<script setup lang="ts">
import { CloseOutlined } from '@ant-design/icons-vue'

const props = defineProps({
	open: Boolean,
  toggle: Function
})
const { open } = toRefs(props)
</script>

<template>
	<nav
		class="flyout-container w-screen bg-primary h-screen fixed top-0 left-0 transition-all ease-in-out z-10 px-4 sm:px-10 py-4 md:hidden block text-white"
		:class="{ 'translate-x-full': !open }"
	>
		<div class="relative flyout w-full flex items-center justify-between font-display">
      <NuxtLink to="/">
        <div class="navbar-logo cursor-pointer">
          <h1 class="text-3xl">.xphyrus</h1>
        </div>
      </NuxtLink>
			<div class="close-container w-full flex items-center justify-end text-xl">
        <!-- <CloseOutlined @click="props.toggle" /> -->
      </div>
		</div>
      <div class="navbar-links flex flex-col items-center justify-end">
			<NuxtLink to="/create" class="mx-4">Create</NuxtLink>
			<NuxtLink to="/assesment" class="mx-4">My Assesment</NuxtLink>
			<NuxtLink to="/joined" class="mx-4 mr-0">Joined</NuxtLink>
		</div>
	</nav>
</template>

<style lang="stylus">
</style>