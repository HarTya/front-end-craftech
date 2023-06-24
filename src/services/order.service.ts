import { IOrderObject } from '@/types/order.interface'

import { EnumEntitiesBaseUrl } from '@/api/api.enum'
import { configUrl } from '@/api/api.helper'
import { axiosClassic, instance } from '@/api/api.interceptor'

import {
	IOrderData,
	IOrderUnauthorizedData
} from './types/order-data.interface'

export const OrderService = {
	async placeOrder(data: IOrderData) {
		return instance<IOrderObject>({
			url: configUrl(EnumEntitiesBaseUrl.ORDERS, '/'),
			method: 'POST',
			data
		})
	},

	async placeOrderUnauthorized(data: IOrderUnauthorizedData) {
		return axiosClassic<IOrderObject>({
			url: configUrl(EnumEntitiesBaseUrl.ORDERS, '/unauthorized'),
			method: 'POST',
			data
		})
	}
}
