import { IProducts } from './product.interface'
import { ISubcategoryObject } from './subcategory.interface'

export interface ICategoryObject {
	id: number
	name: string
	slug: string
	subcategories: ISubcategoryObject[]
}

export interface ICategory {
	id: number
	createdAt: string
	updatedAt: string
	name: string
	slug: string
	adminId: number
}

export interface ICategoryPage extends IProducts {
	category: ICategoryObject
}
