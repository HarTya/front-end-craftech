import { useMutation, useQueryClient } from '@tanstack/react-query'
import Image from 'next/legacy/image'
import { FC } from 'react'
import { TailSpin } from 'react-loader-spinner'
import { Rating } from 'react-simple-star-rating'
import { toast } from 'react-toastify'

import Text from '@/ui/Text'
import TrashIcon from '@/ui/icons/Trash/TrashIcon'

import { COLORS } from '@/config/variables.config'

import { useAuth } from '@/hooks/useAuth'

import { IReviewObjectUser } from '@/types/review.interface'
import { EnumUserRole } from '@/types/user.interface'

import { catchErrorMessage } from '@/api/api.helper'

import styles from './Review.module.scss'
import { ReviewService } from '@/services/review.service'

const Review: FC<{ data: IReviewObjectUser }> = ({ data }) => {
	const queryCache = useQueryClient()

	const { user } = useAuth()

	const isAuthor = data.user.id === user?.id

	const { mutate, isLoading } = useMutation(
		['delete review'],
		() => ReviewService.deleteReviewUser(data.id),
		{
			onSuccess() {
				queryCache.invalidateQueries(['get profile'])
				queryCache.invalidateQueries(['get reviews by product'])
				toast.success('Відгук видалено!')
			},
			onError(error) {
				toast.error(catchErrorMessage(error))
			}
		}
	)

	return (
		<div className={styles.main}>
			<div className={styles.top}>
				<div className={styles.image}>
					<Image
						draggable={false}
						src={data.user.avatarPath}
						alt=''
						layout='fill'
						objectFit='cover'
						priority
					/>
				</div>
				<div className={styles.info}>
					<Text size='body-medium' color='accent-dark'>
						{data.user.firstName}
					</Text>
					<Text size='body' color='accent'>
						{data.user.role === EnumUserRole.USER
							? 'Відгук від покупця'
							: 'Відгук від адміністратора'}
					</Text>
					<div className={styles.rating}>
						<Rating
							readonly
							initialValue={data.rating}
							SVGstyle={{
								display: 'inline-block'
							}}
							size={16}
							allowFraction
							transition
						/>
					</div>
				</div>
				{isAuthor && (
					<div onClick={() => mutate()} className={styles.delete}>
						{isLoading ? (
							<TailSpin width={40} height={40} color={COLORS.accentDark} />
						) : (
							<TrashIcon />
						)}
					</div>
				)}
			</div>
			<Text size='body' color='accent-dark' prewrap className={styles.text}>
				{data.text}
			</Text>
		</div>
	)
}

export default Review
