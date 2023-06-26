import { useTypedSelector } from './useTypedSelector'

export const useMenu = () => {
	const isMenuOpen = useTypedSelector(state => state.menu.isMenuOpen)

	return { isMenuOpen }
}
