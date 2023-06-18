import { Dispatch, HTMLProps, SetStateAction } from 'react'

export interface ITextArea extends HTMLProps<HTMLTextAreaElement> {
	state: string
	setState: Dispatch<SetStateAction<string>>
}
