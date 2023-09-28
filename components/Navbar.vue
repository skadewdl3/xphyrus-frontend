<script setup lang="ts">
import { MenuOutlined } from '@ant-design/icons-vue'

const menu = ref(false)
const toggleMenu = () => {
  menu.value = !menu.value
}
</script>

<template>
	<nav
		class="navbar w-full px-4 2xl:px-60 xl:px-40 lg:px-28 md:px-20 sm:px-10 flex items-center justify-between py-2 font-display"
	>
		<NuxtLink to="/" class="cursor-pointer">
				<h1 class="text-3xl text-primary">.xphyrus</h1>
		</NuxtLink>

		<div class="navbar-links items-center justify-end hidden md:flex">
			<NuxtLink to="/create" class="mx-4">Create</NuxtLink>
			<NuxtLink to="/assesment" class="mx-4">My Assesment</NuxtLink>
			<NuxtLink to="/joined" class="mx-4 mr-0">Joined</NuxtLink>
		</div>

		<!-- TODO: Make a mobile menu -->
		<div class="navbar-links-menu md:hidden flex items-center cursor-pointer" @click="toggleMenu">
			<!-- <MenuOutlined /> -->
		</div>

    <Teleport to="body">
      <Flyout :open="menu" :toggle="toggleMenu" />
    </Teleport>
	</nav>
</template>

<style lang="stylus"></style>
