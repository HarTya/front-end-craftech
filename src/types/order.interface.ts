import { ICartItem } from './cart.interface'

export enum EnumOrderPickupType {
	STORE = 'STORE',
	POST_OFFICE = 'POST_OFFICE'
}

export interface IOrderObject {
	id: number
	createdAt: string
	pickupType: EnumOrderPickupType
	day: string
	time: string
	city: string
	postOfficeNumber: number
	items: ICartItem[]
	total: number
	phone: string
	lastName: string
	firstName: string
	userId: number
}
