import { EnumOrderPickupType } from '@/types/order.interface'

export interface IOrderData {
	pickupType: EnumOrderPickupType
	day: string
	time: string
	city: string
	postOfficeNumber: number
	items: {
		size: string
		quantity: number
		price: number
		productId: number
	}[]
	total: number
	comment: string
}

export interface IOrderUnauthorizedData extends IOrderData {
	phone: string
	lastName: string
	firstName: string
}
