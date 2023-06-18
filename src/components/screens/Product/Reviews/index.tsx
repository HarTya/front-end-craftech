import { FC } from 'react'
import { TailSpin } from 'react-loader-spinner'

import Text from '@/ui/Text'

import { COLORS } from '@/config/variables.config'

import { useAuth } from '@/hooks/useAuth'
import { useProfile } from '@/hooks/useProfile'

import { IReviewObjectUser } from '@/types/review.interface'

import NewReview from './NewReview'
import Review from './Review'
import styles from './Reviews.module.scss'

const Reviews: FC<{
	reviews: IReviewObjectUser[]
	productId: string | number
	isReviewsLoading: boolean
}> = ({ reviews, productId, isReviewsLoading }) => {
	const { user } = useAuth()

	const { profile, isLoading } = useProfile()

	const isReviewExists = profile?.reviews.some(
		review => review.product.id === productId
	)

	return (
		<section className={styles.section} id='reviews'>
			{isReviewsLoading ? (
				<TailSpin width={50} height={50} color={COLORS.accent} />
			) : (
				<>
					<div className={styles.top}>
						<Text topline>Відгуки</Text>
						<Text color='accent' className={styles.count}>
							{reviews.length}
						</Text>
						{isLoading ? (
							<TailSpin width={40} height={40} color={COLORS.accentDark} />
						) : (
							user && !isReviewExists && <NewReview productId={productId} />
						)}
					</div>
					<div className={styles.content}>
						{reviews.length ? (
							reviews.map(review => <Review key={review.id} data={review} />)
						) : (
							<Text size='subheading-medium' color='accent-dark'>
								Відгуки відсутні
							</Text>
						)}
					</div>
				</>
			)}
		</section>
	)
}

export default Reviews
