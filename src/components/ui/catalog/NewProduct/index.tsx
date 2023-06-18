import { useMutation, useQueryClient } from '@tanstack/react-query'
import clsx from 'clsx'
import { FC } from 'react'
import { toast } from 'react-toastify'

import PlusIcon from '@/ui/icons/Plus/PlusIcon'

import { catchErrorMessage } from '@/api/api.helper'

import styles from './NewProduct.module.scss'
import { ProductService } from '@/services/product.service'

const NewProduct: FC = () => {
	const queryCache = useQueryClient()

	const { mutate, isLoading, isError, isSuccess } = useMutation(
		['create product'],
		() => ProductService.createProduct(),
		{
			onSuccess() {
				queryCache.invalidateQueries(['get products'])
				toast.success('Новий товар створено!')
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

export default NewProduct
