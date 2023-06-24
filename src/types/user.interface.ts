import { IOrderObject } from './order.interface'
import { IProductObject } from './product.interface'
import { IReviewObjectProduct } from './review.interface'

export enum EnumUserRole {
	USER = 'USER',
	ADMIN = 'ADMIN'
}

export interface IUserObject {
	id: number
	firstName: string
	role: EnumUserRole
	avatarPath: string
}

export interface IUser {
	id: number
	createdAt: string
	updatedAt: string
	phone: string
	password: string
	lastName: string
	firstName: string
	role: EnumUserRole
	avatarPath: string
}

export interface IProfileObject extends IUserObject {
	favorites: IProductObject[]
	phone: string
	lastName: string
	orders: IOrderObject[]
	reviews: IReviewObjectProduct[]
}
