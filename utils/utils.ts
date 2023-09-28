export const getFromLocalStorage = (key: string) => {
	// if (!process.client) return null
	const value = localStorage.getItem(key)
	if (value) {
		return JSON.parse(value)
	}
	return null
}
