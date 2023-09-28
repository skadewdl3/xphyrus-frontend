export const useTestStore = defineStore('test', () => {
	const count = ref(0)
	const setCount = (newCount: number) => {
		console.log('this ran')
		count.value = newCount
		console.log('count now is: ', count.value)
	}

	return { count, setCount }
})
