<script setup lang="ts">
import { UserOutlined } from '@ant-design/icons-vue'

const store = useEditorStore()
const { theme } = toRefs(store)
const themeColor = computed(() => themesArray[theme.value].color)

const menu = ref(false)
const toggleMenu = () => {
  menu.value = !menu.value
}
</script>

<template>
	<nav
		class="w-[99%] mx-auto px-4 flex items-center justify-between py-2 font-display editor-navbar border-solid border-2 rounded-md my-2"
		:class="{'bg-black border-[#222]': themeColor == 'dark', 'bg-white border-[#ccc]': themeColor == 'light'}"
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
