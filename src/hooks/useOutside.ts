import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'

type Outside = {
	ref: any
	isOpen: boolean
	setIsOpen: Dispatch<SetStateAction<boolean>>
}

export const useOutside = (
	initialIsOpen: boolean,
	timeout?: number
): Outside => {
	const [isOpen, setIsOpen] = useState(initialIsOpen)
	const [isReadyToClose, setIsReadyToClose] = useState(false)

	const ref = useRef<HTMLElement>(null)

	const handleClickOutside = (event: any) => {
		if (timeout) {
			if (ref.current && !ref.current.contains(event.target) && isReadyToClose)
				setIsOpen(false)
		} else if (ref.current && !ref.current.contains(event.target))
			setIsOpen(false)
	}

	useEffect(() => {
		if (timeout) setTimeout(() => setIsReadyToClose(true), timeout)

		document.addEventListener('click', handleClickOutside, true)

		return () => {
			document.removeEventListener('click', handleClickOutside, true)
		}
	})

	return { ref, isOpen, setIsOpen }
}
