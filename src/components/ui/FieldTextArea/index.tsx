import clsx from 'clsx'
import { ForwardRefExoticComponent, RefAttributes, forwardRef } from 'react'

import Text from '@/ui/Text'

import styles from './FieldTextArea.module.scss'
import { IFieldTextArea } from './field-text-area.interface'

const FieldTextArea: ForwardRefExoticComponent<
	IFieldTextArea & RefAttributes<HTMLTextAreaElement>
> = forwardRef<HTMLTextAreaElement, IFieldTextArea>(
	({ title, error, className, spellCheck = false, ...rest }, ref) => {
		return (
			<div className={className}>
				<label>
					<div className={styles.title}>
						<Text size='body' color='accent-dark' nowrap>
							{title}
						</Text>
					</div>
					<textarea
						ref={ref}
						className={clsx(styles.textarea, {
							[styles.textarea_error]: !!error
						})}
						spellCheck={spellCheck}
						{...rest}
					/>
				</label>
				{error && (
					<Text size='caption-large' color='error' weight='semibold'>
						{error}
					</Text>
				)}
			</div>
		)
	}
)

export default FieldTextArea
