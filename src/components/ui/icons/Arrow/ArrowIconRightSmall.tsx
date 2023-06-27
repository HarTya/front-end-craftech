import { FC } from 'react'

import { COLORS } from '@/config/variables.config'

import { useViewportWidth } from '@/hooks/useViewportWidth'

const ArrowIconRightSmall: FC = () => {
	const { viewportWidth } = useViewportWidth()

	return (
		<svg
			width={viewportWidth <= 575 ? 12 : 16}
			height={viewportWidth <= 575 ? 12 : 16}
			fill='none'
			stroke={COLORS.accent}
			strokeLinecap='round'
			strokeLinejoin='round'
			strokeWidth='2.5'
			viewBox='0 0 24 24'
			xmlns='http://www.w3.org/2000/svg'
		>
			<path d='m8.625 5.25 6.75 6.75-6.75 6.75' />
		</svg>
	)
}

export default ArrowIconRightSmall
