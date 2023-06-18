import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { FC, useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Triangle } from 'react-loader-spinner'
import { toast } from 'react-toastify'

import Button from '@/ui/Button'
import Field from '@/ui/Field'
import Text from '@/ui/Text'
import ArrowIconLeft from '@/ui/icons/Arrow/ArrowIconLeft'

import { PAGES } from '@/config/pages.config'
import { COLORS } from '@/config/variables.config'

import { ICategoryObject } from '@/types/category.interface'

import { catchErrorMessage } from '@/api/api.helper'

import styles from './CategoryAdmin.module.scss'
import DeleteCategory from './DeleteCategory'
import Subcategories from './Subcategories'
import { CategoryService } from '@/services/category.service'

const CategoryAdmin: FC<{ data: ICategoryObject }> = ({ data }) => {
	const categoryId = data.id

	const { push } = useRouter()

	const queryCache = useQueryClient()

	const [isEdited, setIsEdited] = useState(false)

	const [isLoading, setIsLoading] = useState(false)

	const [error, setError] = useState('')

	const {
		register: formRegister,
		getValues,
		handleSubmit,
		formState: { errors },
		watch
	} = useForm<{ categoryName: string }>({
		mode: 'onChange',
		defaultValues: {
			categoryName: data.name
		}
	})

	const onSubmit: SubmitHandler<{ categoryName: string }> = async ({
		categoryName
	}) => {
		setIsLoading(true)

		CategoryService.updateCategory(categoryId, categoryName)
			.then(() => {
				setIsLoading(false)
				queryCache.invalidateQueries(['get category admin'])
				toast.success('Категорію оновлено!')
			})
			.catch(error => {
				setIsLoading(false)
				setError(catchErrorMessage(error))
			})
	}

	useEffect(() => {
		setError('')
		if (getValues('categoryName').trim() !== data.name) setIsEdited(true)
		else setIsEdited(false)
	}, [data, watch('categoryName')])

	return (
		<>
			<div className={styles.title}>
				<div className={styles.back} onClick={() => push(PAGES.admin)}>
					<Button rounder hover>
						<ArrowIconLeft />
					</Button>
				</div>
				<Text size='subheading-large' color='accent'>
					{!data.name ? 'Нова категорія' : `Категорія - ${data.name}`}
				</Text>
			</div>
			<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
				<Field
					{...formRegister('categoryName', {
						required: 'Назву категорії не вказано',
						minLength: {
							value: 3,
							message: 'Назва категорії має бути не коротшою за 3 символи'
						},
						maxLength: {
							value: 20,
							message: 'Назва категорії має бути не довшою за 20 символів'
						}
					})}
					className={styles.field}
					title='Назва категорії'
					autoComplete='off'
					placeholder={!data.name ? 'Нова категорія' : data.name}
					error={errors.categoryName?.message || error}
					disabled={isLoading}
				/>
				<Button
					className={styles.button}
					type='submit'
					rounder
					disabled={isLoading || !isEdited || !!error}
				>
					{isLoading ? (
						<Triangle height={45} width={45} color={COLORS.accentDark} />
					) : (
						'Підтвердити'
					)}
				</Button>
			</form>
			<Subcategories categoryId={categoryId} data={data.subcategories} />
			<DeleteCategory categoryId={categoryId} />
		</>
	)
}

export default CategoryAdmin
