import { ICartItem } from './cart.interface'
import { IUser } from './user.interface'

enum EnumOrderStatus {
	PENDING = 'PENDING',
	SHIPPED = 'SHIPPED',
	DELIVERED = 'DELIVERED'
}

export interface IOrder {
	id: number
	createdAt: string
	status: EnumOrderStatus
	items: ICartItem[]
	total: number
	user: IUser
}
