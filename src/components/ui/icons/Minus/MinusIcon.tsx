import { FC } from 'react'

import { COLORS } from '@/config/variables.config'

const MinusIcon: FC = () => {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width='25'
			height='4'
			viewBox='0 0 25 4'
			fill='none'
		>
			<path
				d='M23 2L2 2'
				stroke={COLORS.accentDark}
				strokeWidth='3'
				strokeLinecap='round'
			/>
		</svg>
	)
}

export default MinusIcon
