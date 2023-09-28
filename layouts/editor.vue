<script setup lang="ts">
import { onMounted, ref } from 'vue'

const height = ref(0)

onMounted(() => {
	height.value = window.innerHeight - (document.querySelector('.editor-navbar')?.clientHeight || 0)
})
</script>

<template>
  <EditorNavbar />
	<main class="w-full" :style="`height: ${height}px`">
		<Head>
			<title>.xphyrus - Editor</title>
		</Head>

		<slot />
	</main>
</template>

<style lang="stylus"></style>
