import { useRouter } from 'next/router'
import { FC, PropsWithChildren } from 'react'

import { PAGES } from '@/config/pages.config'

import { useAuth } from '@/hooks/useAuth'

import { EnumUserRole } from '@/types/user.interface'

import { ComponentAuthFields } from './auth-page.types'

const CheckRole: FC<PropsWithChildren<ComponentAuthFields>> = ({
	Component: { isOnlyUser, isOnlyAdmin },
	children
}) => {
	const { user } = useAuth()

	const { replace } = useRouter()

	if (isOnlyUser) {
		if (user) return <>{children}</>

		replace(PAGES.auth)
	}

	if (isOnlyAdmin) {
		if (user && user.role === EnumUserRole.ADMIN) return <>{children}</>

		replace(PAGES.notFound)
	}

	return null
}

export default CheckRole
