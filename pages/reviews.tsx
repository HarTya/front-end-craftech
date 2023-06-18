import { useQuery } from '@tanstack/react-query'

import Layout from '@/layout/Layout'

import Reviews from '@/screens/Reviews'

import { NextPageAuth } from '@/providers/auth-provider/auth-page.types'

import { ReviewService } from '@/services/review.service'

const ReviewsPage: NextPageAuth = () => {
	const { data: reviews, isLoading } = useQuery(
		['get reviews'],
		() => ReviewService.getAllReviews(),
		{
			select: ({ data }) => data,
			refetchInterval: 10000,
			refetchIntervalInBackground: true
		}
	)

	return (
		<Layout title='Адмін панель'>
			<Reviews data={reviews || []} isLoading={isLoading} />
		</Layout>
	)
}

ReviewsPage.isOnlyAdmin = true

export default ReviewsPage
