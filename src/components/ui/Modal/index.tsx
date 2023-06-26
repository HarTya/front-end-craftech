import clsx from 'clsx'
import { FC, PropsWithChildren, useEffect, useState } from 'react'

import Text from '@/ui/Text'
import CrossIcon from '@/ui/icons/Cross/CrossIcon'

import { useMenu } from '@/hooks/useMenu'
import { useOutside } from '@/hooks/useOutside'

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
	const { isOpen, ref } = useOutside(true, 400)

	const { isMenuOpen } = useMenu()

	const [isReadyToClose, setIsReadyToClose] = useState(false)
	const [close, setClose] = useState(false)

	useEffect(() => {
		document.body.classList.add('no-scroll')

		setTimeout(() => setIsReadyToClose(true), 400)

		return () => {
			if (!isMenuOpen) document.body.classList.remove('no-scroll')
		}
	}, [])

	const closeModal = () => {
		if (isReadyToClose) {
			setClose(true)

			setTimeout(() => setIsOpen(false), 400)
		}
	}

	useEffect(() => {
		if (!isOpen) closeModal()
	}, [isOpen])

	useEffect(() => {
		if (isForeignClose && setIsForeignClose) {
			closeModal()

			setTimeout(() => setIsForeignClose(false), 400)
		}
	}, [isForeignClose])

	return (
		<section
			ref={ref}
			className={clsx(
				styles.section,
				{
					[styles.section_disappearance]: close
				},
				className
			)}
			onClick={() => closeModal()}
		>
			<div className={styles.main} onClick={event => event.stopPropagation()}>
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
