import { FC } from 'react'

import { COLORS } from '@/config/variables.config'

import { useViewportWidth } from '@/hooks/useViewportWidth'

const ArrowIconDownLarge: FC<{
	color?: 'accent' | 'accent-dark'
	error?: boolean
}> = ({ color = 'accent', error = false }) => {
	const { viewportWidth } = useViewportWidth()

	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width={viewportWidth <= 575 ? 15 : 24}
			height={viewportWidth <= 575 ? 10 : 12}
			viewBox='0 0 24 12'
			fill='none'
		>
			<path
				d='M2 2L12 10L22 2'
				stroke={
					error
						? COLORS.error
						: color === 'accent'
						? COLORS.accent
						: COLORS.accentDark
				}
				strokeWidth='3'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	)
}

export default ArrowIconDownLarge
