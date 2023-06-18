import { IAuthResponse, IUserAuthorization } from '@/store/user/user.interface'

import { EnumAuthData, EnumEntitiesBaseUrl } from '@/api/api.enum'
import { configUrl } from '@/api/api.helper'
import { axiosClassic } from '@/api/api.interceptor'

import { AuthDataService } from './auth-data.service'

const AuthData = new AuthDataService()

export const AuthService = {
	async authorization(authData: IUserAuthorization) {
		const { type, data } = authData

		const response = await axiosClassic<IAuthResponse>({
			url: configUrl(EnumEntitiesBaseUrl.AUTH, `/${type}`),
			method: 'POST',
			data
		})

		if (response.data.accessToken) AuthData.save(response.data)

		return response.data
	},

	async getNewTokens() {
		const refreshToken = AuthData.getToken(EnumAuthData.REFRESH_TOKEN)

		const response = await axiosClassic<string, { data: IAuthResponse }>({
			url: configUrl(EnumEntitiesBaseUrl.AUTH, '/login/access-token'),
			method: 'POST',
			data: { refreshToken }
		})

		if (response.data.accessToken) AuthData.save(response.data)

		return response
	}
}
