import { FC } from 'react'

import { COLORS } from '@/config/variables.config'

const ArrowIconDownLarge: FC<{
	color?: 'accent' | 'accent-dark'
	error?: boolean
}> = ({ color = 'accent', error = false }) => {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width='24'
			height='12'
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
