import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { FC, PropsWithChildren, useEffect } from 'react'

import { useActions } from '@/hooks/useActions'
import { useAuth } from '@/hooks/useAuth'

import { EnumAuthData } from '@/api/api.enum'

import { ComponentAuthFields } from './auth-page.types'
import { AuthDataService } from '@/services/auth-data.service'

const AuthData = new AuthDataService()

const DynamicCheckRole = dynamic(() => import('./CheckRole'), { ssr: false })

const AuthProvider: FC<PropsWithChildren<ComponentAuthFields>> = ({
	Component: { isOnlyUser, isOnlyAdmin },
	children
}) => {
	const { user } = useAuth()
	const { checkAuth, logout } = useActions()

	const { pathname } = useRouter()

	useEffect(() => {
		const accessToken = AuthData.getToken(EnumAuthData.ACCESS_TOKEN)
		if (accessToken) checkAuth()
	}, [])

	useEffect(() => {
		const refreshToken = AuthData.getToken(EnumAuthData.REFRESH_TOKEN)
		if (!refreshToken && user) logout()
	}, [pathname])

	return isOnlyUser || isOnlyAdmin ? (
		<DynamicCheckRole
			Component={{ isOnlyUser, isOnlyAdmin }}
			children={children}
		/>
	) : (
		<>{children}</>
	)
}

export default AuthProvider
