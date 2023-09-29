<script lang="ts" setup>
const props = defineProps({
	horizontal: {
		type: Boolean,
		default: true,
	},
	vertical: {
		type: Boolean,
		default: false,
	},
})

const tabGroup = ref<HTMLElement | null>(null)
const activeIndex = ref(0);


onMounted(() => {
  if (tabGroup.value) {
		Array.from(tabGroup.value.children).forEach((el, i) => {
			console.log(i)
			el.addEventListener('click', () => {
				activeIndex.value = i;
			})
		})
  }
})

</script>

<template>
	<div class="tab-group-wrapper">
		<div class="tab-group tab-group-vertical" v-if="props.vertical"></div>
		<div
			class="tab-group tab-group-horizontal flex items-center justify-start"
      ref="tabGroup"
			v-else
		>
			<slot name="tabs" :activeIndex="activeIndex"></slot>
		</div>
	</div>
</template>

<style></style>
