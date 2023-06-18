import { ICharacteristic } from '@/types/characteristic.interface'

import { EnumEntitiesBaseUrl } from '@/api/api.enum'
import { configUrl } from '@/api/api.helper'
import { instance } from '@/api/api.interceptor'

import { ICharacteristicData } from './types/characteristic-data.interface'

export const CharacteristicService = {
	async createCharacteristic(
		productId: string | number,
		data: ICharacteristicData
	) {
		return instance<ICharacteristic>({
			url: configUrl(EnumEntitiesBaseUrl.CHARACTERISTICS, `/add/${productId}`),
			method: 'POST',
			data
		})
	},

	async deleteCharacteristic(id: string | number) {
		return instance<ICharacteristic>({
			url: configUrl(EnumEntitiesBaseUrl.CHARACTERISTICS, `/${id}`),
			method: 'DELETE'
		})
	}
}
