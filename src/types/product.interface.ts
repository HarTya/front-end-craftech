import { ICategoryObject } from './category.interface'
import { ICharacteristicObject } from './characteristic.interface'
import { IReviewObjectUser } from './review.interface'
import { ISubcategoryObject } from './subcategory.interface'

export interface IProductObject {
	id: number
	name: string
	slug: string
	description: string
	price: number
	status: string
	images: string[]
	sizes: string
	category: ICategoryObject
	subcategory: ISubcategoryObject
	reviews: IReviewObjectUser[]
}

export interface IProductObjectFullset extends IProductObject {
	characteristics: ICharacteristicObject[]
}

export interface IProduct {
	id: number
	createdAt: string
	updatedAt: string
	name: string
	slug: string
	description: string
	price: number
	status: string
	images: string[]
	sizes: string
	categoryId: number
	subcategoryId: number
	favoriteId: number
	adminId: number
}

export interface IProducts {
	products: IProductObject[]
}

export interface IProductsPagination extends IProducts {
	length: number
}

export interface ICatalog {
	title: string
	backUrl?: string
	additionalTitle?: string
	data: IProducts
	isLoading?: boolean
	sidebar?: boolean
	subcategories?: ISubcategoryObject[]
}

export interface ICatalogPagination {
	title: string
	data: IProductsPagination
}
