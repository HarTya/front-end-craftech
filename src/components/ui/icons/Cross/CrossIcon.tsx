import { FC } from 'react'

import { COLORS } from '@/config/variables.config'

import { useViewportWidth } from '@/hooks/useViewportWidth'

const CrossIcon: FC = () => {
	const { viewportWidth } = useViewportWidth()

	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width={viewportWidth <= 575 ? 20 : 40}
			height={viewportWidth <= 575 ? 20 : 40}
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
