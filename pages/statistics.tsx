import { useQuery } from '@tanstack/react-query'

import Layout from '@/layout/Layout'

import Statistics from '@/screens/Statistics'

import { NextPageAuth } from '@/providers/auth-provider/auth-page.types'

import { StatisticsService } from '@/services/statistics.service'

const StatisticsPage: NextPageAuth = () => {
	const { data: statistics, isLoading } = useQuery(
		['get statistics'],
		() => StatisticsService.getMainStatistics(),
		{
			select: ({ data }) => data,
			refetchInterval: 10000,
			refetchIntervalInBackground: true
		}
	)

	return (
		<Layout title='Адмін панель'>
			<Statistics data={statistics || []} isLoading={isLoading} />
		</Layout>
	)
}

StatisticsPage.isOnlyAdmin = true

export default StatisticsPage
