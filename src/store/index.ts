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
import { createPersistStorage } from './persist-storage'
import { userSlice } from './user/user.slice'

const persistStorage = createPersistStorage()

const persistConfig = {
	key: 'root',
	storage: persistStorage,
	whitelist: ['cart']
}

const rootReducer = combineReducers({
	cart: cartSlice.reducer,
	// carousel: carouselSlice.reducer,
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
