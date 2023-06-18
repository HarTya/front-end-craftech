import { FC } from 'react'

import { COLORS } from '@/config/variables.config'

const TrashIcon: FC = () => {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width='40'
			height='40'
			viewBox='0 0 40 40'
			fill='none'
		>
			<path
				d='M5 10H8.33333H35'
				stroke={COLORS.accentDark}
				strokeWidth='3'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
			<path
				d='M31.6668 9.99992V33.3333C31.6668 34.2173 31.3156 35.0652 30.6905 35.6903C30.0654 36.3154 29.2176 36.6666 28.3335 36.6666H11.6668C10.7828 36.6666 9.93493 36.3154 9.30981 35.6903C8.68469 35.0652 8.3335 34.2173 8.3335 33.3333V9.99992M13.3335 9.99992V6.66659C13.3335 5.78253 13.6847 4.93468 14.3098 4.30956C14.9349 3.68444 15.7828 3.33325 16.6668 3.33325H23.3335C24.2176 3.33325 25.0654 3.68444 25.6905 4.30956C26.3156 4.93468 26.6668 5.78253 26.6668 6.66659V9.99992'
				stroke={COLORS.accentDark}
				strokeWidth='3'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
			<path
				d='M16.6665 18.3333V28.3333'
				stroke={COLORS.accentDark}
				strokeWidth='3'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
			<path
				d='M23.3335 18.3333V28.3333'
				stroke={COLORS.accentDark}
				strokeWidth='3'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	)
}

export default TrashIcon
