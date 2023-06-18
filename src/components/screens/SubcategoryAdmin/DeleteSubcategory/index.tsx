import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { Triangle } from 'react-loader-spinner'
import { toast } from 'react-toastify'

import Button from '@/ui/Button'

import { dynamicAdminPageHref } from '@/config/pages.config'
import { COLORS } from '@/config/variables.config'

import { catchErrorMessage } from '@/api/api.helper'

import styles from './DeleteSubcategory.module.scss'
import { SubcategoryService } from '@/services/subcategory.service'

const DeleteSubcategory: FC<{ subcategoryId: number; categoryId: number }> = ({
	subcategoryId,
	categoryId
}) => {
	const { replace } = useRouter()

	const { mutate, isLoading, isError, isSuccess } = useMutation(
		['delete subcategory'],
		() => SubcategoryService.deleteSubcategory(subcategoryId),
		{
			onSuccess() {
				toast.success('Підкатегорію видалено!')
				setTimeout(() => {
					replace(dynamicAdminPageHref('category', categoryId))
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

export default DeleteSubcategory
