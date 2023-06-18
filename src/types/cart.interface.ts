import { IProductObject } from './product.interface'

export interface ICartItem {
	id: number
	size: string
	quantity: number
	price: number
	product: IProductObject
}
