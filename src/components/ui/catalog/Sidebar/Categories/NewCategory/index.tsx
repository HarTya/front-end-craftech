import { useMutation, useQueryClient } from '@tanstack/react-query'
import clsx from 'clsx'
import { FC } from 'react'
import { toast } from 'react-toastify'

import PlusIcon from '@/ui/icons/Plus/PlusIcon'

import { catchErrorMessage } from '@/api/api.helper'

import styles from './NewCategory.module.scss'
import { CategoryService } from '@/services/category.service'

const NewCategory: FC = () => {
	const queryCache = useQueryClient()

	const { mutate, isLoading, isError, isSuccess } = useMutation(
		['create category'],
		() => CategoryService.createCategory(),
		{
			onSuccess() {
				queryCache.invalidateQueries(['get categories'])
				toast.success('Нову категорію створено!')
			},
			onError(error) {
				toast.error(catchErrorMessage(error))
			}
		}
	)

	return (
		<div
			className={clsx(styles.create, {
				[styles.disabled]: isLoading || isError || isSuccess
			})}
			onClick={() => mutate()}
		>
			<PlusIcon />
		</div>
	)
}

export default NewCategory
