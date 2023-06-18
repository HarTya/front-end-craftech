import { FC } from 'react'

import { COLORS } from '@/config/variables.config'

const ArrowIconDownLarge: FC<{
	color?: 'accent' | 'accent-dark'
	error?: boolean
}> = ({ color = 'accent', error = false }) => {
	return color === 'accent' ? (
		<svg
			width='21'
			height='13'
			viewBox='0 0 21 13'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
		>
			<path
				d='M1.75 2.125L10.5 10.875L19.25 2.125'
				stroke={error ? COLORS.error : COLORS.accent}
				strokeWidth='3'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	) : (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width='24'
			height='12'
			viewBox='0 0 24 12'
			fill='none'
		>
			<path
				d='M2 2L12 10L22 2'
				stroke={error ? COLORS.error : COLORS.accentDark}
				strokeWidth='3'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	)
}

export default ArrowIconDownLarge
