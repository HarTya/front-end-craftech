import { IUserObject } from './user.interface'

interface IReviewObject {
	id: number
	createdAt: string
	rating: number
	text: string
}

export interface IReview {
	id: number
	createdAt: string
	updatedAt: string
	rating: number
	text: string
	userId: number
	productId: number
}

export interface IReviewObjectUser extends IReviewObject {
	user: IUserObject
}

export interface IReviewObjectProduct extends IReviewObject {
	product: {
		id: number
		name: string
		slug: string
		description: string
		price: number
		images: string[]
	}
}
