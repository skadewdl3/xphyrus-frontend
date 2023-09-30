<script setup lang="ts">
import { UserOutlined } from '@ant-design/icons-vue'

const store = useEditorStore()
const { theme, mode } = toRefs(store)
const { setMode, setTheme } = store
const themeColor = computed(() => themesArray[theme.value].color)

const menu = ref(false)
const toggleMenu = () => {
  menu.value = !menu.value
}
</script>

<template>
	<nav
		class="w-[99%] mx-auto px-4 flex items-center justify-between py-2 font-display editor-navbar border-solid border-2 rounded-md mt-1"
		:class="{'bg-black border-[#222]': themeColor == 'dark', 'bg-white border-[#ccc]': themeColor == 'light'}"
	>
		<NuxtLink to="/" class="cursor-pointer">
				<h1 class="text-2xl text-primary">.xphyrus</h1>
		</NuxtLink>

		<div class="items-center w-full justify-end hidden md:flex cursor-pointer">
			<!-- Editor Control Buttons -->
				<Dropdown class="mr-2">
					<template #name>
						<Button :text="modesArray[mode].name" type="secondary" thin />
					</template>
	
					<!-- Dynamically render all mode options from themesArray -->
					<template #items>
						<div
							class="px-4 py-2 cursor-pointer"
							:class="{
								'text-black bg-white hover:bg-[#eee]': themeColor == 'light',
								'text-white bg-black hover:bg-[#111]': themeColor == 'dark',
							}"
							v-for="(value, key) in modesArray"
							@click="setMode(key as string)"
						>
							{{ value.name }}
						</div>
					</template>
				</Dropdown>
	
				<Dropdown class="mr-2">
					<template #name>
						<Button :text="themesArray[theme].name" type="secondary" thin />
					</template>
	
					<!-- Dynamically render all theme options from themesArray -->
					<template #items>
						<div
							class="px-4 py-2 cursor-pointer"
							:class="{
						'text-black bg-white hover:bg-[#eee]': themeColor == 'light',
						'text-white bg-black hover:bg-[#111]': themeColor == 'dark',
					}"
							v-for="(value, key) in themesArray"
							@click="setTheme(key as string)"
						>
							{{ value.name }}
						</div>
					</template>
				</Dropdown>
		
			<ClientOnly>
				<UserOutlined class="p-2 rounded-full" :class="{'bg-gray-200 text-black': themeColor == 'light', 'bg-[#222] text-[#777]': themeColor == 'dark', }" />
			</ClientOnly>
		</div>


    <Teleport to="body">
      <Flyout :open="menu" :toggle="toggleMenu" />
    </Teleport>
	</nav>
</template>

<style lang="stylus"></style>
