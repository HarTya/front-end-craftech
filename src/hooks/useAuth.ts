import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { PAGES } from '@/config/pages.config'

import { useTypedSelector } from './useTypedSelector'

export const useAuth = () => useTypedSelector(state => state.user)

export const useAuthRedirect = () => {
	const { user } = useAuth()

	const { replace } = useRouter()

	useEffect(() => {
		if (user) replace(PAGES.home)
	}, [user])
}
