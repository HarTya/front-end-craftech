import { FC } from 'react'

import { COLORS } from '@/config/variables.config'

const OpenIcon: FC = () => {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width='30'
			height='30'
			viewBox='0 0 30 30'
		>
			<g
				fill='none'
				stroke={COLORS.accent}
				strokeLinecap='round'
				strokeLinejoin='round'
				strokeWidth='2.5'
			>
				<path d='M22.5 13.125v10.781a2.346 2.346 0 01-2.344 2.344H6.094a2.346 2.346 0 01-2.344-2.344V9.844A2.346 2.346 0 016.094 7.5h9.812M19.688 3.75h6.562v6.563M13.125 16.875L25.781 4.219'></path>
			</g>
		</svg>
	)
}

export default OpenIcon
