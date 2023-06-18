import {
	IProduct,
	IProductObject,
	IProductObjectFullset,
	IProductsPagination
} from '@/types/product.interface'

import { EnumEntitiesBaseUrl } from '@/api/api.enum'
import { configUrl } from '@/api/api.helper'
import { axiosClassic, instance } from '@/api/api.interceptor'

import {
	IProductData,
	IProductsFilterData
} from './types/product-data.interface'

export const ProductService = {
	async getAllProducts(queryData = {} as IProductsFilterData) {
		const { data } = await axiosClassic<IProductsPagination>({
			url: configUrl(EnumEntitiesBaseUrl.PRODUCTS, '/'),
			method: 'GET',
			params: queryData
		})

		return data
	},

	async getAllProductsIncludeNew() {
		const { data } = await instance<IProductObject[]>({
			url: configUrl(EnumEntitiesBaseUrl.PRODUCTS, '/include-new'),
			method: 'GET'
		})

		return data
	},

	async getProductBySlug(slug: string) {
		return axiosClassic<IProductObjectFullset>({
			url: configUrl(EnumEntitiesBaseUrl.PRODUCTS, `/by-slug/${slug}`),
			method: 'GET'
		})
	},

	async getProductById(id: string | number) {
		return instance<IProductObjectFullset>({
			url: configUrl(EnumEntitiesBaseUrl.PRODUCTS, `/${id}`),
			method: 'GET'
		})
	},

	async getProductsByCategory(categorySlug: string) {
		return axiosClassic<IProductObject[]>({
			url: configUrl(
				EnumEntitiesBaseUrl.PRODUCTS,
				`/by-category/${categorySlug}`
			),
			method: 'GET'
		})
	},

	async getProductsBySubcategory(subcategorySlug: string) {
		return axiosClassic<IProductObject[]>({
			url: configUrl(
				EnumEntitiesBaseUrl.PRODUCTS,
				`/by-subcategory/${subcategorySlug}`
			),
			method: 'GET'
		})
	},

	async createProduct() {
		return instance<number>({
			url: configUrl(EnumEntitiesBaseUrl.PRODUCTS, '/'),
			method: 'POST'
		})
	},

	async updateProduct(id: string | number, data: IProductData) {
		return instance<IProduct>({
			url: configUrl(EnumEntitiesBaseUrl.PRODUCTS, `/${id}`),
			method: 'PUT',
			data
		})
	},

	async deleteProduct(id: string | number) {
		return instance<IProduct>({
			url: configUrl(EnumEntitiesBaseUrl.PRODUCTS, `/${id}`),
			method: 'DELETE'
		})
	}
}
