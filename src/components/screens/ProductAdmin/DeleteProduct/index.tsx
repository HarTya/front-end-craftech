import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { Triangle } from 'react-loader-spinner'
import { toast } from 'react-toastify'

import Button from '@/ui/Button'

import { PAGES } from '@/config/pages.config'
import { COLORS } from '@/config/variables.config'

import { catchErrorMessage } from '@/api/api.helper'

import styles from './DeleteProduct.module.scss'
import { ProductService } from '@/services/product.service'

const DeleteProduct: FC<{ productId: number }> = ({ productId }) => {
	const { replace } = useRouter()

	const { mutate, isLoading, isError, isSuccess } = useMutation(
		['delete product'],
		() => ProductService.deleteProduct(productId),
		{
			onSuccess() {
				toast.success('Товар видалено!')
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

export default DeleteProduct
