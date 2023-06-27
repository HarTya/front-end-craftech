import { FC } from 'react'

import { COLORS } from '@/config/variables.config'

import { useViewportWidth } from '@/hooks/useViewportWidth'

const FavoriteIconAccentDark: FC<{ fill?: boolean }> = ({ fill }) => {
	const { viewportWidth } = useViewportWidth()

	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width={viewportWidth <= 575 ? 22 : 35}
			height={viewportWidth <= 575 ? 19 : 31}
			viewBox='0 0 35 31'
			fill={fill ? COLORS.accentDark : 'none'}
		>
			<path
				d='M30.3914 4.72289C29.6466 3.97769 28.7622 3.38654 27.7888 2.98322C26.8155 2.5799 25.7722 2.37231 24.7185 2.37231C23.6649 2.37231 22.6216 2.5799 21.6482 2.98322C20.6748 3.38654 19.7905 3.97769 19.0456 4.72289L17.4998 6.26873L15.9539 4.72289C14.4494 3.21834 12.4088 2.37309 10.281 2.37309C8.15326 2.37309 6.11265 3.21834 4.6081 4.72289C3.10355 6.22744 2.2583 8.26805 2.2583 10.3958C2.2583 12.5236 3.10355 14.5642 4.6081 16.0687L6.15393 17.6146L17.4998 28.9604L28.8456 17.6146L30.3914 16.0687C31.1366 15.3239 31.7278 14.4395 32.1311 13.4661C32.5344 12.4927 32.742 11.4494 32.742 10.3958C32.742 9.34218 32.5344 8.29888 32.1311 7.3255C31.7278 6.35212 31.1366 5.46775 30.3914 4.72289Z'
				stroke={COLORS.accentDark}
				strokeWidth='3'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	)
}

export default FavoriteIconAccentDark
