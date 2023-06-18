import { FC } from 'react'

import { COLORS } from '@/config/variables.config'

const ArrowIconRightMedium: FC = () => {
	return (
		<svg
			width='29'
			height='29'
			fill='none'
			stroke={COLORS.accent}
			strokeLinecap='round'
			strokeLinejoin='round'
			strokeWidth='3'
			viewBox='0 0 24 24'
			xmlns='http://www.w3.org/2000/svg'
		>
			<path d='m8.625 5.25 6.75 6.75-6.75 6.75' />
		</svg>
	)
}

export default ArrowIconRightMedium
