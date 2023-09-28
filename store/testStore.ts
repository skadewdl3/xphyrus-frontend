export const useTestStore = defineStore('test', () => {
	const count = ref(0)
	const setCount = (newCount: number) => {
		count.value = newCount
	}

	return { count, setCount }
})
