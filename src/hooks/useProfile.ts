import { useQuery } from '@tanstack/react-query'

import { UserService } from '@/services/user.service'

export const useProfile = () => {
	const {
		data: profile,
		isLoading,
		isError
	} = useQuery(['get profile'], () => UserService.getProfile(), {
		select: ({ data }) => data
	})

	return { profile, isLoading, isError }
}
