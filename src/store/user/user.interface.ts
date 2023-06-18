import { EnumUserRole } from '@/types/user.interface'

import { EnumAuthorizationType } from '@/api/api.enum'

export interface IUserState {
	id: number
	phone: string
	role: EnumUserRole
}

export interface ITokens {
	accessToken: string
	refreshToken: string
}

export interface IInitialState {
	user: IUserState | null
	isLoading: boolean
	error: any
}

interface IUserRegister {
	phone: string
	password: string
	confirmPassword: string
	lastName: string
	firstName: string
}

interface IUserLogin {
	phone: string
	password: string
}

export type AuthorizationType =
	| EnumAuthorizationType.REGISTER
	| EnumAuthorizationType.LOGIN

export type AuthorizationData = IUserRegister & IUserLogin

export interface IUserAuthorization {
	type: AuthorizationType
	data: AuthorizationData
}

export interface IAuthResponse extends ITokens {
	user: IUserState
}
