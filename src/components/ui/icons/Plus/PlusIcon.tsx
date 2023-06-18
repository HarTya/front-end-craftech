import { FC } from 'react'

import { COLORS } from '@/config/variables.config'

const PlusIcon: FC = () => {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width='25'
			height='25'
			viewBox='0 0 25 25'
			fill='none'
		>
			<path
				d='M23 12.5L2 12.5M12.5 2L12.5 23'
				stroke={COLORS.accentDark}
				strokeWidth='3'
				strokeLinecap='round'
			/>
		</svg>
	)
}

export default PlusIcon
