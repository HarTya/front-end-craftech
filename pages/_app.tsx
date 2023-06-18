import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AppProps } from 'next/app'
import { Montserrat } from 'next/font/google'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { PersistGate } from 'redux-persist/integration/react'

import AuthProvider from '@/providers/auth-provider/AuthProvider'
import { ComponentAuthFields } from '@/providers/auth-provider/auth-page.types'

import '@/assets/styles/globals.scss'

import { persistor, store } from '@/store'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			retry: false
		}
	}
})

const montserrat = Montserrat({
	weight: ['600', '700'],
	subsets: ['cyrillic', 'latin']
})

export default function App({
	Component,
	pageProps
}: AppProps & ComponentAuthFields) {
	return (
		<QueryClientProvider client={queryClient}>
			<Provider store={store}>
				<PersistGate loading={null} persistor={persistor}>
					<AuthProvider
						Component={{
							isOnlyUser: Component.isOnlyUser,
							isOnlyAdmin: Component.isOnlyAdmin
						}}
					>
						<ToastContainer position='bottom-center' newestOnTop />
						<style jsx global>{`
							*,
							*::after,
							*::before {
								font-family: ${montserrat.style.fontFamily};
							}
						`}</style>
						<Component {...pageProps} />
					</AuthProvider>
				</PersistGate>
			</Provider>
		</QueryClientProvider>
	)
}
