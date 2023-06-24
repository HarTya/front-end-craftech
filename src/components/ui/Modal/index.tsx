import clsx from 'clsx'
import { FC, PropsWithChildren, useEffect, useState } from 'react'

import Text from '@/ui/Text'
import CrossIcon from '@/ui/icons/Cross/CrossIcon'

import styles from './Modal.module.scss'
import { IModal } from './modal.interface'

const Modal: FC<PropsWithChildren<IModal>> = ({
	setIsOpen,
	isForeignClose,
	setIsForeignClose,
	title,
	className,
	children
}) => {
	const [isReadyToClose, setIsReadyToClose] = useState(false)
	const [close, setClose] = useState(false)

	useEffect(() => {
		document.body.classList.add('no-scroll')

		setTimeout(() => setIsReadyToClose(true), 400)

		return () => {
			document.body.classList.remove('no-scroll')
		}
	}, [])

	const closeModal = () => {
		if (isReadyToClose) {
			setClose(true)

			setTimeout(() => setIsOpen(false), 400)
		}
	}

	useEffect(() => {
		if (isForeignClose && setIsForeignClose) {
			closeModal()

			setTimeout(() => setIsForeignClose(false), 400)
		}
	}, [isForeignClose])

	return (
		<section
			className={clsx(styles.section, {
				[styles.section_disappearance]: close
			})}
			onClick={() => closeModal()}
		>
			<div
				className={clsx(styles.main, className)}
				onClick={event => event.stopPropagation()}
			>
				<div className={styles.top}>
					<Text className={styles.title} topline nowrap>
						{title}
					</Text>
					<div className={styles.close} onClick={() => closeModal()}>
						<CrossIcon />
					</div>
				</div>
				<div className={styles.content}>{children}</div>
			</div>
		</section>
	)
}

export default Modal
