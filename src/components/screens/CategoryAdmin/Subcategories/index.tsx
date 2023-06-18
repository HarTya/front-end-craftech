import { useMutation, useQueryClient } from '@tanstack/react-query'
import clsx from 'clsx'
import Link from 'next/link'
import { FC, Fragment } from 'react'
import { toast } from 'react-toastify'

import Text from '@/ui/Text'
import PlusIcon from '@/ui/icons/Plus/PlusIcon'

import { dynamicAdminPageHref } from '@/config/pages.config'

import { ISubcategoryObject } from '@/types/subcategory.interface'

import { catchErrorMessage } from '@/api/api.helper'

import styles from './Subcategories.module.scss'
import { SubcategoryService } from '@/services/subcategory.service'

const Subcategories: FC<{
	categoryId: number
	data: ISubcategoryObject[]
}> = ({ categoryId, data }) => {
	const queryCache = useQueryClient()

	const { mutate, isLoading, isError, isSuccess } = useMutation(
		['create category'],
		() => SubcategoryService.createSubcategory(categoryId),
		{
			onSuccess() {
				queryCache.invalidateQueries(['get category admin'])
				toast.success('Нову підкатегорію створено!')
			},
			onError(error) {
				toast.error(catchErrorMessage(error))
			}
		}
	)

	return (
		<div className={styles.main}>
			<Text size='body' color='accent-dark' nowrap>
				Підкатегорії
			</Text>
			<div
				className={clsx(styles.create, {
					[styles.disabled]: isLoading || isError || isSuccess
				})}
				onClick={() => mutate()}
			>
				<PlusIcon />
			</div>
			{!!data?.length &&
				data.map((subcategory, index) => (
					<Fragment key={subcategory.id}>
						<Link href={dynamicAdminPageHref('subcategory', subcategory.id)}>
							<Text
								className={styles.item}
								size='body-medium'
								color='accent'
								nowrap
							>
								{!subcategory.name ? 'Нова підкатегорія' : subcategory.name}
							</Text>
						</Link>
						{index !== data.length - 1 && <div className={styles.line} />}
					</Fragment>
				))}
		</div>
	)
}

export default Subcategories
