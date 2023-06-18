import axios from 'axios'

import { EnumAuthData } from './api.enum'
import { catchErrorMessage, getContentType } from './api.helper'
import { AuthDataService } from '@/services/auth-data.service'
import { AuthService } from '@/services/auth.service'

const AuthData = new AuthDataService()

const axiosOptions = {
	baseURL: process.env.API_URL,
	headers: getContentType()
}

export const axiosClassic = axios.create(axiosOptions)

export const instance = axios.create(axiosOptions)

instance.interceptors.request.use(config => {
	const accessToken = AuthData.getToken(EnumAuthData.ACCESS_TOKEN)

	if (config && config.headers && accessToken)
		config.headers.Authorization = `Bearer ${accessToken}`

	return config
})

instance.interceptors.response.use(
	config => config,
	async error => {
		const originalRequest = error.config

		if (
			(error.response?.status === 401 ||
				catchErrorMessage(error) === 'jwt expired' ||
				catchErrorMessage(error) === 'jwt must be provided') &&
			error.config &&
			!error.config._isRetry
		) {
			originalRequest._isRetry = true
			try {
				await AuthService.getNewTokens()
				return instance.request(originalRequest)
			} catch (error) {
				if (catchErrorMessage(error) === 'jwt expired') AuthData.remove()
			}
		}

		throw error
	}
)
