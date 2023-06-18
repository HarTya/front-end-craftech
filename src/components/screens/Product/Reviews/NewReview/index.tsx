import { useMutation, useQueryClient } from '@tanstack/react-query'
import { FC, useEffect, useState } from 'react'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'
import { Triangle } from 'react-loader-spinner'
import { toast } from 'react-toastify'

import Button from '@/ui/Button'
import Modal from '@/ui/Modal'
import Text from '@/ui/Text'
import TextArea from '@/ui/TextArea'

import { COLORS } from '@/config/variables.config'

import { catchErrorMessage } from '@/api/api.helper'

import styles from './NewReview.module.scss'
import { ReviewService } from '@/services/review.service'

const NewReview: FC<{ productId: string | number }> = ({ productId }) => {
	const queryCache = useQueryClient()

	const [isModalOpen, setIsModalOpen] = useState(false)
	const [isCloseModal, setIsCloseModal] = useState(false)

	const [rating, setRating] = useState(0)
	const [text, setText] = useState('')

	const [error, setError] = useState('')

	const { mutate, isLoading } = useMutation(
		['leave review'],
		() => ReviewService.leaveReview(productId, { rating, text }),
		{
			onSuccess() {
				setIsCloseModal(true)
				toast.success('Відгук додано!')
				setTimeout(() => {
					queryCache.invalidateQueries(['get profile'])
					queryCache.invalidateQueries(['get reviews by product'])
				}, 400)
			},
			onError(error) {
				setError(catchErrorMessage(error))
				toast.error(catchErrorMessage(error))
			}
		}
	)

	useEffect(() => setError(''), [rating, text])

	return (
		<>
			<div className={styles.open} onClick={() => setIsModalOpen(true)}>
				<Text size='body-medium' color='accent-dark'>
					Додати відгук
				</Text>
			</div>
			{isModalOpen ? (
				<Modal
					setIsOpen={setIsModalOpen}
					isForeignClose={isCloseModal}
					setIsForeignClose={setIsCloseModal}
					title='Додати відгук'
				>
					<Text size='body' color='accent-dark'>
						Наскільки ви задоволені товаром?
					</Text>
					<div className={styles.rating}>
						{Array.from({ length: 5 }).map((_, index) => {
							const ratingValue = index + 1

							return (
								<div
									key={ratingValue}
									className={styles.star}
									onClick={() => setRating(ratingValue)}
								>
									{ratingValue <= rating ? (
										<AiFillStar size={35} color={COLORS.rating} />
									) : (
										<AiOutlineStar size={35} color={COLORS.rating} />
									)}
								</div>
							)
						})}
					</div>
					<Text size='body' color='accent-dark'>
						Текст відгуку
					</Text>
					<TextArea
						name='text'
						autoComplete='off'
						className={styles.text}
						state={text}
						setState={setText}
					/>
					<Button
						onClick={() => mutate()}
						className={styles.button}
						rounder
						disabled={isLoading || !!error}
					>
						{isLoading ? (
							<Triangle height={45} width={45} color={COLORS.accentDark} />
						) : (
							'Підтвердити'
						)}
					</Button>
				</Modal>
			) : (
				<></>
			)}
		</>
	)
}

export default NewReview
