import { IReview, IReviewObjectUser } from '@/types/review.interface'

import { EnumEntitiesBaseUrl } from '@/api/api.enum'
import { configUrl } from '@/api/api.helper'
import { axiosClassic, instance } from '@/api/api.interceptor'

import { IReviewData } from './types/review-data.interface'

export const ReviewService = {
	async getAllReviews() {
		return instance<IReviewObjectUser[]>({
			url: configUrl(EnumEntitiesBaseUrl.REVIEWS, '/'),
			method: 'GET'
		})
	},

	async getReviewsByProduct(productSlug: string) {
		const { data } = await axiosClassic<IReviewObjectUser[]>({
			url: configUrl(EnumEntitiesBaseUrl.REVIEWS, `/by-product/${productSlug}`),
			method: 'GET'
		})

		return data
	},

	async leaveReview(productId: string | number, data: IReviewData) {
		return instance<IReview>({
			url: configUrl(EnumEntitiesBaseUrl.REVIEWS, `/leave/${productId}`),
			method: 'POST',
			data
		})
	},

	async deleteReviewUser(id: string | number) {
		return instance<IReview>({
			url: configUrl(EnumEntitiesBaseUrl.REVIEWS, `/${id}`),
			method: 'DELETE'
		})
	},

	async deleteReview(id: string | number) {
		return instance<IReview>({
			url: configUrl(EnumEntitiesBaseUrl.REVIEWS, `/admin/${id}`),
			method: 'DELETE'
		})
	}
}
