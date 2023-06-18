import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import {
	IAddToCartPayload,
	ICartInitialState,
	IChangeQuantityPayload,
	ISetQuantityPayload,
	ISetWholesalePricePayload
} from './cart.types'

const initialState: ICartInitialState = {
	items: []
}

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addToCart: (state, action: PayloadAction<IAddToCartPayload>) => {
			const isProductExist = state.items.some(
				item => item.product.id === action.payload.product.id
			)

			if (!isProductExist)
				state.items.push({ ...action.payload, id: state.items.length })
		},
		removeFromCart: (state, action: PayloadAction<{ id: number }>) => {
			state.items = state.items.filter(item => item.id !== action.payload.id)
		},
		changeQuantity: (state, action: PayloadAction<IChangeQuantityPayload>) => {
			const { id, type } = action.payload
			const item = state.items.find(item => item.id === id)
			if (item) type === 'plus' ? item.quantity++ : item.quantity--
		},
		setQuantity: (state, action: PayloadAction<ISetQuantityPayload>) => {
			const { id, value } = action.payload
			const item = state.items.find(item => item.id === id)
			if (item) item.quantity = value
		},
		setWholesalePrice: (
			state,
			action: PayloadAction<ISetWholesalePricePayload>
		) => {
			const { id } = action.payload
			const item = state.items.find(item => item.id === id)
			if (item) {
				switch (!!item.quantity) {
					case item.quantity >= 20:
						item.price = 0
						break
					case item.quantity >= 10:
						item.price = item.product.price
						item.price -= item.price * (10 / 100)
						break
					case item.quantity >= 5:
						item.price = item.product.price
						item.price -= item.price * (5 / 100)
						break
					default:
						item.price = item.product.price
						break
				}
			}
		},
		reset: state => {
			state.items = []
		}
	}
})
