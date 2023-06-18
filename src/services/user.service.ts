import { IProfileObject, IUser } from '@/types/user.interface'

import { EnumEntitiesBaseUrl } from '@/api/api.enum'
import { configUrl } from '@/api/api.helper'
import { instance } from '@/api/api.interceptor'

import { IPasswordData, IProfileData } from './types/profile-data.interface'

export const UserService = {
	async getProfile() {
		return instance<IProfileObject>({
			url: configUrl(EnumEntitiesBaseUrl.USERS, '/profile'),
			method: 'GET'
		})
	},

	async updateProfile(data: IProfileData) {
		return instance<IUser>({
			url: configUrl(EnumEntitiesBaseUrl.USERS, '/profile'),
			method: 'PUT',
			data
		})
	},

	async changePassword(data: IPasswordData) {
		return instance<IUser>({
			url: configUrl(EnumEntitiesBaseUrl.USERS, '/profile/password'),
			method: 'POST',
			data
		})
	},

	async toggleFavorite(productSlug: string) {
		return instance<{ message: string }>({
			url: configUrl(
				EnumEntitiesBaseUrl.USERS,
				`/profile/favorites/${productSlug}`
			),
			method: 'PATCH'
		})
	}
}
