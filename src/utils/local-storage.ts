export const getItemFromLocalStorage = (key: string) => {
	if (typeof localStorage !== 'undefined') {
		const ls = localStorage.getItem(key)
		return ls ? JSON.parse(ls as string) : null
	}
	return null
}
