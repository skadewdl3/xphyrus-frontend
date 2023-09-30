<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getAbsoluteHeight } from '@utils/utils'

const height = ref(0)

onMounted(() => {
	height.value = window.innerHeight - (getAbsoluteHeight('.editor-navbar') || 0)
})
</script>

<template>
  <EditorNavbar />
	<main class="w-[99%] mx-auto my-auto" :style="`height: ${height}px`">
		<Head>
			<title>.xphyrus - Editor</title>
		</Head>

		<slot />
	</main>
</template>

<style lang="stylus"></style>
