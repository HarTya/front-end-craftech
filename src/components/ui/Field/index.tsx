import clsx from 'clsx'
import {
	ForwardRefExoticComponent,
	RefAttributes,
	forwardRef,
	useState
} from 'react'

import Text from '@/ui/Text'

import styles from './Field.module.scss'
import { IField } from './field.interface'

const Field: ForwardRefExoticComponent<
	IField & RefAttributes<HTMLInputElement>
> = forwardRef<HTMLInputElement, IField>(
	(
		{ title, error, prefix, className, type, spellCheck = false, ...rest },
		ref
	) => {
		const [isPasswordShown, setIsPasswordShown] = useState(false)

		return (
			<div
				className={clsx(
					{
						[styles.file]: type === 'file',
						[styles.file_error]: type === 'file' && !!error
					},
					className
				)}
			>
				<label>
					<div
						className={clsx(styles.title, {
							[styles.title_switch]: type === 'password'
						})}
					>
						<Text size='body' color='accent-dark' nowrap>
							{title}
						</Text>
						{type === 'password' && (
							<div
								className={styles.switch}
								onClick={() => setIsPasswordShown(!isPasswordShown)}
							>
								<Text size='caption-medium' color='accent-dark'>
									{isPasswordShown ? 'Сховати' : 'Показати'}
								</Text>
							</div>
						)}
					</div>
					<div
						className={clsx(styles.main, {
							[styles.main_error]: !!error
						})}
					>
						{prefix && (
							<Text className={styles.prefix} size='body' color='accent-dark'>
								{prefix}
							</Text>
						)}
						<input
							ref={ref}
							className={clsx(styles.input, {
								[styles.input_prefix]: prefix
							})}
							type={isPasswordShown ? 'string' : type}
							spellCheck={spellCheck}
							{...rest}
						/>
					</div>
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

export default Field
