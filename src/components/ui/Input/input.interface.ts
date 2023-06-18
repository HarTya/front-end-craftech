import { Dispatch, InputHTMLAttributes, SetStateAction } from 'react'

export interface IInput extends InputHTMLAttributes<HTMLInputElement> {
	state: string
	setState: Dispatch<SetStateAction<string>>
	color?: 'accent' | 'accent-dark'
}
