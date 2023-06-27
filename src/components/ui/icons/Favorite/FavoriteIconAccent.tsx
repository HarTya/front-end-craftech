import { FC } from 'react'

import { COLORS } from '@/config/variables.config'

import { useViewportWidth } from '@/hooks/useViewportWidth'

const FavoriteIconAccent: FC<{ fill?: boolean }> = ({ fill }) => {
	const { viewportWidth } = useViewportWidth()

	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width={viewportWidth <= 575 ? 17 : 30}
			height={viewportWidth <= 575 ? 15 : 27}
			viewBox='0 0 30 27'
			fill={fill ? COLORS.accent : 'none'}
		>
			<path
				d='M25.9029 3.99713C25.27 3.36398 24.5186 2.86172 23.6916 2.51905C22.8646 2.17638 21.9782 2 21.083 2C20.1878 2 19.3013 2.17638 18.4743 2.51905C17.6473 2.86172 16.8959 3.36398 16.2631 3.99713L14.9497 5.31052L13.6363 3.99713C12.358 2.71881 10.6242 2.00066 8.81637 2.00066C7.00856 2.00066 5.27479 2.71881 3.99647 3.99713C2.71815 5.27545 2 7.00922 2 8.81703C2 10.6248 2.71815 12.3586 3.99647 13.6369L5.30986 14.9503L14.9497 24.5901L24.5895 14.9503L25.9029 13.6369C26.536 13.0041 27.0383 12.2527 27.3809 11.4257C27.7236 10.5987 27.9 9.71223 27.9 8.81703C27.9 7.92184 27.7236 7.03541 27.3809 6.2084C27.0383 5.38138 26.536 4.62998 25.9029 3.99713Z'
				stroke={COLORS.accent}
				strokeWidth='3'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	)
}

export default FavoriteIconAccent
