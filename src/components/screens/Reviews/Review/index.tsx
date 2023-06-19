import { useMutation } from '@tanstack/react-query'
import clsx from 'clsx'
import Image from 'next/legacy/image'
import { Dispatch, FC, SetStateAction } from 'react'
import { TailSpin } from 'react-loader-spinner'
import { Rating } from 'react-simple-star-rating'
import { toast } from 'react-toastify'

import Text from '@/ui/Text'
import TrashIcon from '@/ui/icons/Trash/TrashIcon'

import { COLORS } from '@/config/variables.config'

import { IReviewObjectUser } from '@/types/review.interface'
import { EnumUserRole } from '@/types/user.interface'

import { catchErrorMessage } from '@/api/api.helper'

import styles from './Review.module.scss'
import { ReviewService } from '@/services/review.service'

const Review: FC<{
	data: IReviewObjectUser
	deleted: number[]
	setDeleted: Dispatch<SetStateAction<number[]>>
}> = ({ data, deleted, setDeleted }) => {
	const { mutate, isLoading } = useMutation(
		['delete review admin'],
		() => ReviewService.deleteReview(data.id),
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
		<div
			className={clsx(styles.main, {
				[styles.main_deleted]: deleted.find(id => id === data.id)
			})}
		>
			<div className={styles.top}>
				<div className={styles.image}>
					<Image
						draggable={false}
						src={data.user.avatarPath}
						alt=''
						layout='fill'
						objectFit='cover'
						placeholder='blur'
						blurDataURL={data.user.avatarPath}
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
				{isLoading ? (
					<TailSpin width={40} height={40} color={COLORS.accentDark} />
				) : (
					<div onClick={() => mutate()} className={styles.delete}>
						<TrashIcon />
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
