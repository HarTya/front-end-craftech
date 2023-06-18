import { Dispatch, SetStateAction } from 'react'

export interface IModal {
	setIsOpen: Dispatch<SetStateAction<boolean>>
	isForeignClose?: boolean
	setIsForeignClose?: Dispatch<SetStateAction<boolean>>
	title: string
	className?: string
}
