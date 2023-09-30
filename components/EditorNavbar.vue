<script setup lang="ts">
import { UserCircleIcon, SunIcon, MoonIcon } from '@heroicons/vue/24/outline'

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
		:class="{
			'bg-black border-[#222]': themeColor == 'dark',
			'bg-white border-[#ccc]': themeColor == 'light',
		}"
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

			<ClientOnly>
				<Slider class="w-12 mr-4" :size="26" :on="themeColor == 'dark'" @click="setTheme(themeColor == 'light' ? 'twilight' : 'chrome')">
					<template #icon="{ on }">
							<SunIcon
								v-if="!on"
								class="w-4"
								:class="{
									'text-black': themeColor == 'light',
									'text-white': themeColor == 'dark',
								}"
							/>
							<MoonIcon
								v-if="on"
								class="w-4"
								:class="{
									'text-black': themeColor == 'light',
									'text-white': themeColor == 'dark',
								}"
							/>
						
					</template>
				</Slider>
			</ClientOnly>

			<ClientOnly>
				<UserCircleIcon
					class="w-7 rounded-full"
					:class="{
						'text-black': themeColor == 'light',
						'text-[#777]': themeColor == 'dark',
					}"
				/>
			</ClientOnly>
		</div>

		<Teleport to="body">
			<Flyout :open="menu" :toggle="toggleMenu" />
		</Teleport>
	</nav>
</template>
