import { FC } from 'react'

import { useViewportWidth } from '@/hooks/useViewportWidth'

const CartIcon: FC = () => {
	const { viewportWidth } = useViewportWidth()

	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width={viewportWidth <= 575 ? 22 : 35}
			height={viewportWidth <= 575 ? 22 : 35}
			viewBox='0 0 35 35'
			fill='none'
		>
			<g clipPath='url(#clip0_11_519)'>
				<path
					d='M13.125 32.0833C13.9304 32.0833 14.5834 31.4304 14.5834 30.625C14.5834 29.8195 13.9304 29.1666 13.125 29.1666C12.3196 29.1666 11.6667 29.8195 11.6667 30.625C11.6667 31.4304 12.3196 32.0833 13.125 32.0833Z'
					stroke='currentColor'
					strokeWidth='3'
					strokeLinecap='round'
					strokeLinejoin='round'
				/>
				<path
					d='M29.1666 32.0833C29.9721 32.0833 30.625 31.4304 30.625 30.625C30.625 29.8195 29.9721 29.1666 29.1666 29.1666C28.3612 29.1666 27.7083 29.8195 27.7083 30.625C27.7083 31.4304 28.3612 32.0833 29.1666 32.0833Z'
					stroke='currentColor'
					strokeWidth='3'
					strokeLinecap='round'
					strokeLinejoin='round'
				/>
				<path
					d='M1.45831 1.45837H7.29165L11.2 20.9855C11.3333 21.6569 11.6986 22.26 12.2318 22.6892C12.765 23.1185 13.4322 23.3465 14.1166 23.3334H28.2916C28.976 23.3465 29.6433 23.1185 30.1765 22.6892C30.7097 22.26 31.075 21.6569 31.2083 20.9855L33.5416 8.75004H8.74998'
					stroke='currentColor'
					strokeWidth='3'
					strokeLinecap='round'
					strokeLinejoin='round'
				/>
			</g>
			<defs>
				<clipPath id='clip0_11_519'>
					<rect width='35' height='35' fill='white' />
				</clipPath>
			</defs>
		</svg>
	)
}

export default CartIcon
