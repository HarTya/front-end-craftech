import clsx from 'clsx'
import { FC, PropsWithChildren } from 'react'

import styles from './Text.module.scss'
import { IText } from './text.interface'

const Text: FC<PropsWithChildren<IText>> = ({
	children,
	size = 'heading',
	weight = 'bold',
	color,
	topline = false,
	nowrap = false,
	prewrap = false,
	className
}) => {
	return (
		<div className={clsx(styles.main, className)}>
			{topline && (
				<div
					className={clsx(styles.topline, {
						[styles.topline_thinner]:
							size !== 'heading' &&
							size !== 'subheading-large' &&
							size !== 'subheading-medium' &&
							size !== 'subheading'
					})}
				></div>
			)}
			<span
				className={clsx(styles.span, {
					[styles.heading]: size === 'heading',
					[styles.subheading_large]: size === 'subheading-large',
					[styles.subheading_medium]: size === 'subheading-medium',
					[styles.subheading]: size === 'subheading',
					[styles.body_large]: size === 'body-large',
					[styles.body_medium]: size === 'body-medium',
					[styles.body_small]: size === 'body-small',
					[styles.body]: size === 'body',
					[styles.caption_large]: size === 'caption-large',
					[styles.caption_medium]: size === 'caption-medium',
					[styles.caption]: size === 'caption',
					[styles.semibold]: weight === 'semibold',
					[styles.bold]: weight === 'bold',
					[styles.accent]: color === 'accent',
					[styles.accent_dark]: color === 'accent-dark',
					[styles.error]: color === 'error',
					[styles.rating]: color === 'rating',
					[styles.nowrap]: nowrap,
					[styles.prewrap]: prewrap
				})}
			>
				{children}
			</span>
		</div>
	)
}

export default Text
