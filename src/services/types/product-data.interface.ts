export enum EnumProductsSort {
	NEWEST = 'newest',
	LOW_PRICE = 'low-price',
	HIGH_PRICE = 'high-price',
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
