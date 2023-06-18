import { StatisticsResponse } from '@/types/statistics.interface'

import { EnumEntitiesBaseUrl } from '@/api/api.enum'
import { configUrl } from '@/api/api.helper'
import { instance } from '@/api/api.interceptor'

export const StatisticsService = {
	async getMainStatistics() {
		return instance<StatisticsResponse>({
			url: configUrl(EnumEntitiesBaseUrl.STATISCICS, '/'),
			method: 'GET'
		})
	}
}
