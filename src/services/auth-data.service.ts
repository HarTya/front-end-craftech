import Cookies from 'js-cookie'

import { IAuthResponse, ITokens } from '@/store/user/user.interface'

import { getItemFromLocalStorage } from '@/utils/local-storage'

import { EnumAuthData } from '@/api/api.enum'

export class AuthDataService {
	public getToken(
		token: EnumAuthData.ACCESS_TOKEN | EnumAuthData.REFRESH_TOKEN
	) {
		return Cookies.get(token) || null
	}

	public getUser() {
		return getItemFromLocalStorage(EnumAuthData.USER) || null
	}

	public save(data: IAuthResponse) {
		this.saveTokens(data)
		localStorage.setItem(EnumAuthData.USER, JSON.stringify(data.user))
	}

	public remove() {
		this.removeTokens()
		localStorage.removeItem(EnumAuthData.USER)
	}

	private saveTokens(data: ITokens) {
		Cookies.set(EnumAuthData.ACCESS_TOKEN, data.accessToken)
		Cookies.set(EnumAuthData.REFRESH_TOKEN, data.refreshToken)
	}

	private removeTokens() {
		Cookies.remove(EnumAuthData.ACCESS_TOKEN)
		Cookies.remove(EnumAuthData.REFRESH_TOKEN)
	}
}
