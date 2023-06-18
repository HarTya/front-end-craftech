export enum EnumProductsSort {
	HIGH_PRICE = 'high-price',
	LOW_PRICE = 'low-price',
	NEWEST = 'newest',
	OLDEST = 'oldest'
}

export interface IProductsFilterData extends IProductsPaginationData {
	sort?: EnumProductsSort
	searchTerm?: string
}

export interface IProductsPaginationData {
	page?: number
	perPage?: number
}

export interface IProductData {
	name: string
	description: string
	price: number
	status: string
	images: string[]
	sizes: string
	categoryId: number
	subcategoryId: number
}
