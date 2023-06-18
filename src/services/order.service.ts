import { IOrder } from '@/types/order.interface'

import { EnumEntitiesBaseUrl } from '@/api/api.enum'
import { configUrl } from '@/api/api.helper'
import { instance } from '@/api/api.interceptor'

export const OrderService = {
	async getAllOrders() {
		return instance<IOrder[]>({
			url: configUrl(EnumEntitiesBaseUrl.ORDERS, '/'),
			method: 'GET'
		})
	}
}
