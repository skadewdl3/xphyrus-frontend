<script setup lang="ts">
import { onMounted, ref } from 'vue'

const height = ref(0)

onMounted(() => {
	height.value = window.innerHeight - (document.querySelector('.navbar')?.clientHeight || 0)
})
</script>

<template>
  <Navbar />
	<main class="w-full px-4 2xl:px-60 xl:px-40 lg:px-28 md:px-20 sm:px-10"  :style="`height: ${height}px`">
		<Head>
			<title>.xphyrus - Microservice based OA platform</title>
		</Head>

		<slot />
	</main>
</template>

<style lang="stylus"></style>
