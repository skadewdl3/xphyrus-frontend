<script setup lang="ts">
import { UserOutlined } from '@ant-design/icons-vue'

const menu = ref(false)
const toggleMenu = () => {
  menu.value = !menu.value
}
</script>

<template>
	<nav
		class="w-full px-4 flex items-center justify-between py-2 font-display editor-navbar"
	>
		<NuxtLink to="/" class="cursor-pointer">
				<h1 class="text-3xl text-primary">.xphyrus</h1>
		</NuxtLink>

		<div class="navbar-links items-center justify-end hidden md:flex cursor-pointer">
			<span class="mr-4">skadewdl3</span>
			<!-- <UserOutlined class="p-3 rounded-full bg-gray-200" /> -->
		</div>


    <Teleport to="body">
      <Flyout :open="menu" :toggle="toggleMenu" />
    </Teleport>
	</nav>
</template>

<style lang="stylus"></style>
