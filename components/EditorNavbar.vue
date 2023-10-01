<script setup lang="ts">
import { UserCircleIcon, SunIcon, MoonIcon } from '@heroicons/vue/24/outline'

const store = useEditorStore()
const { theme, mode } = toRefs(store)
const { setMode, setTheme } = store

const menu = ref(false)
const toggleMenu = () => {
	menu.value = !menu.value
}

// onMounted(() => {
// 	// 
// })
</script>

<template>
	<nav
		class="w-[99%] mx-auto px-4 flex items-center justify-between py-2 font-display editor-navbar border-solid border-2 rounded-md mt-1 bg-white border-[#ccc] dark:bg-black dark:border-[#222]"
	>
		<NuxtLink to="/" class="cursor-pointer">
			<h1 class="text-2xl text-primary">.xphyrus</h1>
		</NuxtLink>

		<div class="items-center w-full justify-end hidden md:flex cursor-pointer">
			<!-- Editor Control Buttons -->
			<Dropdown class="mr-4">
				<template #name>
					<Button :text="modesArray[mode].name" type="secondary" thin />
				</template>

				<!-- Dynamically render all mode options from themesArray -->
				<template #items>
					<div
						class="px-4 py-2 cursor-pointer text-black bg-white hover:bg-[#eee] dark:text-white dark:bg-black dark:hover:bg-[#111]"
						v-for="(value, key) in modesArray"
						@click="setMode(key as string)"
					>
						{{ value.name }}
					</div>
				</template>
			</Dropdown>

				<Slider class="w-12 mr-4" :theme="theme" :size="26" :on="theme == 'twilight'" @click="setTheme(theme == 'twilight' ? 'chrome' : 'twilight')">
					<template #icon="{ on }">
							<SunIcon
								v-if="!on"
								class="w-4 text-black dark:text-white"
							/>
							<MoonIcon
								v-if="on"
								class="w-4 text-black dark:text-white"
							/>
						
					</template>
				</Slider>

			<UserCircleIcon
				class="w-7 rounded-full text-[#222] dark:text-[#666]"
			/>
		</div>

		<Teleport to="body">
			<Flyout :open="menu" :toggle="toggleMenu" />
		</Teleport>
	</nav>
</template>
