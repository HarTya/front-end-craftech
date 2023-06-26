import { createSlice } from '@reduxjs/toolkit'

export const menuSlice = createSlice({
	name: 'menu',
	initialState: {
		isMenuOpen: false
	},
	reducers: {
		toggleMenu: state => {
			state.isMenuOpen = !state.isMenuOpen
		},
		closeMenu: state => {
			if (state.isMenuOpen) state.isMenuOpen = false
		}
	}
})
