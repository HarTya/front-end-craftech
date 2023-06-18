import { createAsyncThunk } from '@reduxjs/toolkit'

import { catchErrorMessage } from '@/api/api.helper'

import { IAuthResponse, IUserAuthorization } from './user.interface'
import { AuthDataService } from '@/services/auth-data.service'
import { AuthService } from '@/services/auth.service'

const AuthData = new AuthDataService()

export const authorization = createAsyncThunk<
	IAuthResponse,
	IUserAuthorization
>('auth', async (thunkData, { rejectWithValue }) => {
	const { type, data } = thunkData
	try {
		const response = await AuthService.authorization({ type, data })
		return response
	} catch (error) {
		return rejectWithValue(catchErrorMessage(error))
	}
})

export const logout = createAsyncThunk('auth/logout', async () => {
	AuthData.remove()
})

export const checkAuth = createAsyncThunk<IAuthResponse>(
	'auth/check-auth',
	async (_, thunkApi) => {
		try {
			const response = await AuthService.getNewTokens()
			return response.data
		} catch (error) {
			if (catchErrorMessage(error) === 'jwt expired') {
				thunkApi.dispatch(logout())
			}

			return thunkApi.rejectWithValue(catchErrorMessage(error))
		}
	}
)
