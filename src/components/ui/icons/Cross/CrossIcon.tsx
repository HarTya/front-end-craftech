import { FC } from 'react'

import { COLORS } from '@/config/variables.config'

const CrossIcon: FC = () => {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width='40'
			height='40'
			viewBox='0 0 40 40'
			fill='none'
		>
			<path
				d='M31.6665 6.6665L6.6665 31.6665'
				stroke={COLORS.accentDark}
				strokeWidth='4'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
			<path
				d='M6.6665 6.6665L31.6665 31.6665'
				stroke={COLORS.accentDark}
				strokeWidth='4'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	)
}

export default CrossIcon
