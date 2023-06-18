import { FC, useEffect, useState } from 'react'
import { Rating } from 'react-simple-star-rating'

import Text from '@/ui/Text'
import { TextSize } from '@/ui/Text/text.interface'

import { IReviewObjectUser } from '@/types/review.interface'

import { getReviewsPhrase } from '@/utils/get-reviews-phrase'

const ProductRating: FC<{
	reviews: IReviewObjectUser[]
	starSize: number
	textSize: TextSize
	className: string
}> = ({ reviews, starSize, textSize, className }) => {
	const [rating, setRating] = useState<number>(0)

	useEffect(() => {
		setRating(
			Math.round(
				reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
			) || 0
		)
	}, [reviews])

	return (
		<div className={className}>
			<Rating
				readonly
				initialValue={rating}
				SVGstyle={{
					display: 'inline-block'
				}}
				size={starSize}
				allowFraction
				transition
			/>
			<Text size={textSize} color='accent-dark'>
				{getReviewsPhrase(reviews.length)}
			</Text>
		</div>
	)
}

export default ProductRating
