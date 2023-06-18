import { ICategory, ICategoryObject } from '@/types/category.interface'

import { EnumEntitiesBaseUrl } from '@/api/api.enum'
import { configUrl } from '@/api/api.helper'
import { axiosClassic, instance } from '@/api/api.interceptor'

export const CategoryService = {
	async getAllCategories() {
		return axiosClassic<ICategoryObject[]>({
			url: configUrl(EnumEntitiesBaseUrl.CATEGORIES, '/'),
			method: 'GET'
		})
	},

	async getAllCategoriesIncludeNew() {
		return instance<ICategoryObject[]>({
			url: configUrl(EnumEntitiesBaseUrl.CATEGORIES, '/include-new'),
			method: 'GET'
		})
	},

	async getCategoryBySlug(slug: string) {
		return axiosClassic<ICategoryObject>({
			url: configUrl(EnumEntitiesBaseUrl.CATEGORIES, `/by-slug/${slug}`),
			method: 'GET'
		})
	},

	async getCategoryById(id: string | number) {
		return instance<ICategoryObject>({
			url: configUrl(EnumEntitiesBaseUrl.CATEGORIES, `/${id}`),
			method: 'GET'
		})
	},

	async createCategory() {
		return instance<number>({
			url: configUrl(EnumEntitiesBaseUrl.CATEGORIES, '/'),
			method: 'POST'
		})
	},

	async updateCategory(id: string | number, categoryName: string) {
		return instance<ICategory>({
			url: configUrl(EnumEntitiesBaseUrl.CATEGORIES, `/${id}`),
			method: 'PUT',
			data: { name: categoryName }
		})
	},

	async deleteCategory(id: string | number) {
		return instance<ICategory>({
			url: configUrl(EnumEntitiesBaseUrl.CATEGORIES, `/${id}`),
			method: 'DELETE'
		})
	}
}
