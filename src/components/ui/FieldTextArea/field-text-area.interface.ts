import { HTMLProps } from 'react'

export interface IFieldTextArea extends HTMLProps<HTMLTextAreaElement> {
	title: string
	error?: string
}
