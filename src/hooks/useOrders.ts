import { useQuery } from '@tanstack/react-query'

import { OrderService } from '@/services/order.service'

export const useOrders = () => {
	const { data, isLoading, isError } = useQuery(
		['get orders'],
		() => OrderService.getAllOrders(),
		{
			select: ({ data }) => data
		}
	)

	return {
		orders: data,
		isLoading,
		discount: !isLoading && !isError && !data?.length
	}
}
