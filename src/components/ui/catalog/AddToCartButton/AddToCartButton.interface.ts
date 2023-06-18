import { Dispatch, SetStateAction } from 'react'

import { IProductObject } from '@/types/product.interface'

export interface IAddToCartButton {
	product: IProductObject
	size: string
	setError: Dispatch<SetStateAction<boolean>>
	className?: string
}
