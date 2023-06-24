import { useProfile } from './useProfile'

export const useOrders = () => {
	const { profile, isLoading, isError } = useProfile()

	const orders = profile?.orders

	return {
		orders,
		isLoading,
		discount: !isLoading && !isError && !orders?.length
	}
}
