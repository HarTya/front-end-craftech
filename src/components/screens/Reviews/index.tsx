import { useRouter } from 'next/router'
import { FC, useState } from 'react'
import { TailSpin } from 'react-loader-spinner'

import Button from '@/ui/Button'
import Text from '@/ui/Text'
import ArrowIconLeft from '@/ui/icons/Arrow/ArrowIconLeft'

import { PAGES } from '@/config/pages.config'
import { COLORS } from '@/config/variables.config'

import { IReviewObjectUser } from '@/types/review.interface'

import Review from './Review'
import styles from './Reviews.module.scss'

const Reviews: FC<{ data: IReviewObjectUser[]; isLoading: boolean }> = ({
	data,
	isLoading
}) => {
	const { push } = useRouter()

	const [deleted, setDeleted] = useState([] as Array<number>)

	return (
		<>
			<div className={styles.top}>
				<div className={styles.back} onClick={() => push(PAGES.admin)}>
					<Button rounder hover>
						<ArrowIconLeft />
					</Button>
				</div>
				<Text topline nowrap>
					Відгуки
				</Text>
			</div>
			<div className={styles.main}>
				{isLoading ? (
					<TailSpin width={50} height={50} color={COLORS.accentDark} />
				) : data.length ? (
					data.map(review => (
						<Review
							key={review.id}
							data={review}
							deleted={deleted}
							setDeleted={setDeleted}
						/>
					))
				) : (
					<Text size='subheading-large' color='accent-dark' nowrap>
						Відгуки відсутні
					</Text>
				)}
			</div>
		</>
	)
}

export default Reviews
