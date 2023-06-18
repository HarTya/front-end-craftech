import { createAction, createSlice } from '@reduxjs/toolkit'

import { authorization, checkAuth, logout } from './user.actions'
import { IInitialState } from './user.interface'
import { AuthDataService } from '@/services/auth-data.service'

const AuthData = new AuthDataService()

const initialState: IInitialState = {
	user: AuthData.getUser(),
	isLoading: false,
	error: null
}

export const clearError = createAction('user/clearError')

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(authorization.pending, state => {
				state.isLoading = true
			})
			.addCase(authorization.fulfilled, (state, { payload }) => {
				state.isLoading = false
				state.user = payload.user
			})
			.addCase(authorization.rejected, (state, { payload }) => {
				state.isLoading = false
				state.user = null
				state.error = payload
			})
			.addCase(logout.fulfilled, state => {
				state.isLoading = false
				state.user = null
			})
			.addCase(checkAuth.fulfilled, (state, { payload }) => {
				state.user = payload.user
			})
			.addCase(clearError, state => {
				state.error = null
			})
	}
})
