import clsx from 'clsx'
import { FC, PropsWithChildren } from 'react'

import styles from './Button.module.scss'
import { IButton } from './button.interface'

const Button: FC<PropsWithChildren<IButton>> = ({
	children,
	className,
	size = 'default',
	rounder = false,
	bordered = false,
	hover = false,
	...rest
}) => {
	return (
		<button
			{...rest}
			className={clsx(
				styles.main,
				{
					[styles.default]: size === 'default',
					[styles.medium]: size === 'medium',
					[styles.large]: size === 'large',
					[styles.rounder]: rounder,
					[styles.bordered]: bordered,
					[styles.hover]: !bordered && hover
				},
				className
			)}
		>
			{children}
		</button>
	)
}

export default Button
