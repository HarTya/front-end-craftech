import { FC } from 'react'

import { COLORS } from '@/config/variables.config'

const SearchIcon: FC = () => {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width='35'
			height='35'
			viewBox='0 0 35 35'
			fill='none'
		>
			<path
				d='M16.0417 27.7083C22.485 27.7083 27.7083 22.485 27.7083 16.0417C27.7083 9.59834 22.485 4.375 16.0417 4.375C9.59834 4.375 4.375 9.59834 4.375 16.0417C4.375 22.485 9.59834 27.7083 16.0417 27.7083Z'
				stroke={COLORS.accent}
				strokeWidth='3'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
			<path
				d='M30.625 30.625L24.2813 24.2812'
				stroke={COLORS.accent}
				strokeWidth='3'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	)
}

export default SearchIcon
