import { ICartItem } from '@/types/cart.interface'

export interface ICartInitialState {
	items: ICartItem[]
}

export interface IAddToCartPayload extends Omit<ICartItem, 'id'> {}

export interface IChangeQuantityPayload extends Pick<ICartItem, 'id'> {
	type: 'minus' | 'plus'
}

export interface ISetQuantityPayload extends Pick<ICartItem, 'id'> {
	value: number
}

export interface ISetWholesalePricePayload extends Pick<ICartItem, 'id'> {}
