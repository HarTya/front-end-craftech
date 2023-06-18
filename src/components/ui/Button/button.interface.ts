import { ButtonHTMLAttributes } from 'react'

type ButtonSize = 'default' | 'medium' | 'large'

export interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
	size?: ButtonSize
	rounder?: boolean
	bordered?: boolean
	hover?: boolean
}
