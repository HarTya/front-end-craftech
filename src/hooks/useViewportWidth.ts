import { useEffect, useState } from 'react'

export const useViewportWidth = () => {
	const [viewportWidth, setViewportWidth] = useState(0)

	useEffect(() => {
		if (typeof window !== 'undefined') {
			setViewportWidth(window.innerWidth)

			window.addEventListener('resize', () =>
				setViewportWidth(window.innerWidth)
			)

			return () =>
				window.removeEventListener('resize', () =>
					setViewportWidth(window.innerWidth)
				)
		}
	}, [])

	return { viewportWidth }
}
