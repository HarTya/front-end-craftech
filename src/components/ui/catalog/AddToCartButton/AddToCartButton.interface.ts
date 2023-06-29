import { Dispatch, SetStateAction } from 'react'

import { IProductObject } from '@/types/product.interface'

export interface IAddToCartButton {
	product: IProductObject
	size: string
	error: boolean
	setError: Dispatch<SetStateAction<boolean>>
	className?: string
}
