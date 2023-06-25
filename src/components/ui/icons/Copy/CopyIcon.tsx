import { FC } from 'react'

import { COLORS } from '@/config/variables.config'

const CopyIcon: FC = () => {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width='24'
			height='18'
			viewBox='0 0 24 18'
			fill='none'
		>
			<path
				d='M13.3849 3.97912L8.97907 8.38494C8.43834 8.92567 8.43835 9.80236 8.97907 10.3431L13.3849 14.7489C13.9256 15.2896 14.8023 15.2896 15.343 14.7489L19.7489 10.3431C20.2896 9.80236 20.2896 8.92567 19.7489 8.38494L15.343 3.97912C14.8023 3.4384 13.9256 3.4384 13.3849 3.97912Z'
				stroke={COLORS.accentDark}
				strokeWidth='1.5'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
			<path
				d='M8.83257 14.3954L8.34303 14.8849C8.08337 15.1446 7.73118 15.2904 7.36396 15.2904C6.99674 15.2904 6.64456 15.1446 6.38489 14.8849L1.97907 10.4791C1.71941 10.2194 1.57353 9.86722 1.57353 9.5C1.57353 9.13278 1.71941 8.78059 1.97907 8.52093L6.38489 4.11511C6.64456 3.85544 6.99674 3.70957 7.36396 3.70957C7.73118 3.70957 8.08337 3.85544 8.34303 4.11511L8.83257 4.60465'
				stroke={COLORS.accentDark}
				strokeWidth='1.5'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	)
}

export default CopyIcon
