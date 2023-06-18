import {
	ISubcategory,
	ISubcategoryObject,
	ISubcategoryObjectCategory
} from '@/types/subcategory.interface'

import { EnumEntitiesBaseUrl } from '@/api/api.enum'
import { configUrl } from '@/api/api.helper'
import { axiosClassic, instance } from '@/api/api.interceptor'

export const SubcategoryService = {
	async getAllSubcategories() {
		return axiosClassic<ISubcategoryObject[]>({
			url: configUrl(EnumEntitiesBaseUrl.SUBCATEGORIES, '/'),
			method: 'GET'
		})
	},

	async getSubcategoryBySlug(slug: string) {
		return axiosClassic<ISubcategoryObjectCategory>({
			url: configUrl(EnumEntitiesBaseUrl.SUBCATEGORIES, `/by-slug/${slug}`),
			method: 'GET'
		})
	},

	async getSubcategoryById(id: string | number) {
		return instance<ISubcategoryObjectCategory>({
			url: configUrl(EnumEntitiesBaseUrl.SUBCATEGORIES, `/${id}`),
			method: 'GET'
		})
	},

	async createSubcategory(categoryId: string | number) {
		return instance<number>({
			url: configUrl(EnumEntitiesBaseUrl.SUBCATEGORIES, `/add/${categoryId}`),
			method: 'POST'
		})
	},

	async updateSubcategory(id: string | number, subcategoryName: string) {
		return instance<ISubcategory>({
			url: configUrl(EnumEntitiesBaseUrl.SUBCATEGORIES, `/${id}`),
			method: 'PUT',
			data: { name: subcategoryName }
		})
	},

	async deleteSubcategory(id: string | number) {
		return instance<ISubcategory>({
			url: configUrl(EnumEntitiesBaseUrl.SUBCATEGORIES, `/${id}`),
			method: 'DELETE'
		})
	}
}
