import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { Triangle } from 'react-loader-spinner'
import { toast } from 'react-toastify'

import Button from '@/ui/Button'

import { PAGES } from '@/config/pages.config'
import { COLORS } from '@/config/variables.config'

import { catchErrorMessage } from '@/api/api.helper'

import styles from './DeleteCategory.module.scss'
import { CategoryService } from '@/services/category.service'

const DeleteCategory: FC<{ categoryId: number }> = ({ categoryId }) => {
	const { replace } = useRouter()

	const { mutate, isLoading, isError, isSuccess } = useMutation(
		['delete category'],
		() => CategoryService.deleteCategory(categoryId),
		{
			onSuccess() {
				toast.success('Категорію видалено!')
				setTimeout(() => {
					replace(PAGES.admin)
				}, 800)
			},
			onError(error) {
				toast.error(catchErrorMessage(error))
			}
		}
	)

	return (
		<Button
			onClick={() => mutate()}
			className={styles.button}
			rounder
			bordered
			disabled={isLoading || isError || isSuccess}
		>
			{isLoading ? (
				<Triangle height={45} width={45} color={COLORS.accentDark} />
			) : (
				'Видалити'
			)}
		</Button>
	)
}

export default DeleteCategory
