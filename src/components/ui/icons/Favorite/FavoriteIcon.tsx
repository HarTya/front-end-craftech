import { FC } from 'react'

import { useViewportWidth } from '@/hooks/useViewportWidth'

const FavoriteIcon: FC = () => {
	const { viewportWidth } = useViewportWidth()

	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width={viewportWidth <= 575 ? 22 : 35}
			height={viewportWidth <= 575 ? 22 : 35}
			viewBox='0 0 35 35'
			fill='none'
		>
			<path
				d='M30.3917 6.72289C29.6468 5.97769 28.7625 5.38654 27.7891 4.98322C26.8157 4.5799 25.7724 4.37231 24.7188 4.37231C23.6651 4.37231 22.6218 4.5799 21.6485 4.98322C20.6751 5.38654 19.7907 5.97769 19.0458 6.72289L17.5 8.26873L15.9542 6.72289C14.4496 5.21834 12.409 4.37309 10.2813 4.37309C8.15351 4.37309 6.1129 5.21834 4.60834 6.72289C3.10379 8.22744 2.25854 10.2681 2.25854 12.3958C2.25854 14.5236 3.10379 16.5642 4.60834 18.0687L6.15418 19.6146L17.5 30.9604L28.8458 19.6146L30.3917 18.0687C31.1369 17.3239 31.728 16.4395 32.1313 15.4661C32.5347 14.4927 32.7423 13.4494 32.7423 12.3958C32.7423 11.3422 32.5347 10.2989 32.1313 9.3255C31.728 8.35212 31.1369 7.46775 30.3917 6.72289Z'
				stroke='currentColor'
				strokeWidth='3'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	)
}

export default FavoriteIcon
