import { combineReducers, configureStore } from '@reduxjs/toolkit'
import {
	FLUSH,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
	REHYDRATE,
	persistReducer,
	persistStore
} from 'redux-persist'

import { cartSlice } from './cart/cart.slice'
import { menuSlice } from './menu/menu.slice'
import { createPersistStorage } from './persist-storage'
import { userSlice } from './user/user.slice'

const persistStorage = createPersistStorage()

const persistConfig = {
	key: 'root',
	storage: persistStorage,
	whitelist: ['cart']
}

const rootReducer = combineReducers({
	menu: menuSlice.reducer,
	// carousel: carouselSlice.reducer,
	cart: cartSlice.reducer,
	user: userSlice.reducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
	reducer: persistedReducer,
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
			}
		})
})

export const persistor = persistStore(store)

export type TypeRootState = ReturnType<typeof rootReducer>
