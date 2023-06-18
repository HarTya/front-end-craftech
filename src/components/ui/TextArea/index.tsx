import clsx from 'clsx'
import { FC } from 'react'

import styles from './TextArea.module.scss'
import { ITextArea } from './text-area.interface'

const TextArea: FC<ITextArea> = ({
	state,
	setState,
	className,
	spellCheck = false,
	...rest
}) => {
	return (
		<div className={clsx(styles.main, className)}>
			<textarea
				value={state}
				onChange={event => setState(event.target.value)}
				spellCheck={spellCheck}
				{...rest}
			/>
		</div>
	)
}

export default TextArea
