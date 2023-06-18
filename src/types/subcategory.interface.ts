import { IProducts } from './product.interface'

export interface ISubcategoryObject {
	id: number
	name: string
	slug: string
}

export interface ISubcategoryObjectCategory extends ISubcategoryObject {
	category: {
		id: number
		name: string
		slug: string
	}
}

export interface ISubcategory {
	id: number
	createdAt: string
	updatedAt: string
	name: string
	slug: string
	categoryId: number
	adminId: number
}

export interface ISubcategoryPage extends IProducts {
	subcategory: ISubcategoryObjectCategory
}
