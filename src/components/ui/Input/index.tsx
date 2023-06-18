import clsx from 'clsx'
import { FC } from 'react'

import styles from './Input.module.scss'
import { IInput } from './input.interface'

const Input: FC<IInput> = ({
	state,
	setState,
	color = 'accent',
	className,
	spellCheck = false,
	...rest
}) => {
	return (
		<input
			className={clsx(
				styles.main,
				{
					[styles.accent_dark]: color === 'accent-dark'
				},
				className
			)}
			value={state}
			onChange={event => setState(event.target.value)}
			spellCheck={spellCheck}
			{...rest}
		/>
	)
}

export default Input
