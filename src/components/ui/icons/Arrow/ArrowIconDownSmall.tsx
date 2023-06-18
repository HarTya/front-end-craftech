import { FC } from 'react'

import { COLORS } from '@/config/variables.config'

const ArrowIconDownSmall: FC = () => {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width='25'
			height='25'
			viewBox='0 0 25 25'
			fill='none'
		>
			<path
				d='M6.25 9.375L12.5 15.625L18.75 9.375'
				stroke={COLORS.accent}
				strokeWidth='3'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	)
}

export default ArrowIconDownSmall
