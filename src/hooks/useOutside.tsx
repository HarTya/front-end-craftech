import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'

type Outside = {
	ref: any
	isOpen: boolean
	setIsOpen: Dispatch<SetStateAction<boolean>>
}

export const useOutside = (initialIsOpen: boolean): Outside => {
	const [isOpen, setIsOpen] = useState(initialIsOpen)
	const ref = useRef<HTMLElement>(null)

	const handleClickOutside = (event: any) => {
		if (ref.current && !ref.current.contains(event.target)) setIsOpen(false)
	}

	useEffect(() => {
		document.addEventListener('click', handleClickOutside, true)

		return () => {
			document.removeEventListener('click', handleClickOutside, true)
		}
	})

	return { ref, isOpen, setIsOpen }
}
