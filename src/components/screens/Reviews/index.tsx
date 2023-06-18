import { useMutation } from '@tanstack/react-query'
import clsx from 'clsx'
import Image from 'next/legacy/image'
import { useRouter } from 'next/router'
import { FC, useState } from 'react'
import { TailSpin } from 'react-loader-spinner'
import { Rating } from 'react-simple-star-rating'
import { toast } from 'react-toastify'

import Button from '@/ui/Button'
import Text from '@/ui/Text'
import ArrowIconLeft from '@/ui/icons/Arrow/ArrowIconLeft'
import TrashIcon from '@/ui/icons/Trash/TrashIcon'

import { PAGES } from '@/config/pages.config'
import { COLORS } from '@/config/variables.config'

import { IReviewObjectUser } from '@/types/review.interface'
import { EnumUserRole } from '@/types/user.interface'

import { catchErrorMessage } from '@/api/api.helper'

import styles from './Reviews.module.scss'
import { ReviewService } from '@/services/review.service'

const Reviews: FC<{ data: IReviewObjectUser[]; isLoading: boolean }> = ({
	data,
	isLoading
}) => {
	const { push } = useRouter()

	const [deleted, setDeleted] = useState([] as Array<number>)

	const { mutate, isLoading: isDeleteLoading } = useMutation(
		['delete review admin'],
		(id: string | number) => ReviewService.deleteReview(id),
		{
			onSuccess({ data }) {
				setDeleted([...deleted, data.id])
				toast.success('Відгук видалено!')
			},
			onError(error) {
				toast.error(catchErrorMessage(error))
			}
		}
	)

	return (
		<>
			<div className={styles.title}>
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
						<div
							key={review.id}
							className={clsx(styles.item, {
								[styles.item_deleted]: deleted.find(id => id === review.id)
							})}
						>
							<div className={styles.item_top}>
								<div className={styles.item_image}>
									<Image
										draggable={false}
										src={review.user.avatarPath}
										alt=''
										layout='fill'
										objectFit='cover'
										priority
									/>
								</div>
								<div className={styles.item_info}>
									<Text size='body-medium' color='accent-dark'>
										{review.user.firstName}
									</Text>
									<Text size='body' color='accent'>
										{review.user.role === EnumUserRole.USER
											? 'Відгук від покупця'
											: 'Відгук від адміністратора'}
									</Text>
									<div className={styles.item_rating}>
										<Rating
											readonly
											initialValue={review.rating}
											SVGstyle={{
												display: 'inline-block'
											}}
											size={16}
											allowFraction
											transition
										/>
									</div>
								</div>
								<div
									onClick={() => mutate(review.id)}
									className={styles.item_delete}
								>
									{isDeleteLoading ? (
										<TailSpin
											width={40}
											height={40}
											color={COLORS.accentDark}
										/>
									) : (
										<TrashIcon />
									)}
								</div>
							</div>
							<Text
								size='body'
								color='accent-dark'
								prewrap
								className={styles.item_text}
							>
								{review.text}
							</Text>
						</div>
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
